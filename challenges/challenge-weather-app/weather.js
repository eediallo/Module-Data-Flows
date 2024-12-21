//import { EmptyOrNumericCity } from "./script.js";
import {emptyOrNumericCity} from "./script.js";
export class Weather {
  constructor(isFetching, city = "") {
    this.isFetching = isFetching;
    this.weatherData = {};
    this.city = city;
    emptyOrNumericCity.handleEmptyOrNumericCity(this.city);
  }

  static weatherAPIKey = config.weather_API_Key;

  async fetchWeatherData() {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${Weather.weatherAPIKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }
    this.weatherData = await response.json();
  }
}
