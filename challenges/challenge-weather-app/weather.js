import { config } from "./config.js";

export class Weather {
  constructor(isFetching = false, weatherData = {}, city = "") {
    this.weatherData = weatherData;
    this.city = city;
    this.isFetching = isFetching;
  }

  static weatherAPIKey = config.weather_API_Key;

  async fetchWeatherData() {
    this.handleEmptyOrNumericCity();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${Weather.weatherAPIKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }
    this.weatherData = await response.json();
  }

  handleEmptyOrNumericCity() {
    if (this.city === "" || !isNaN(this.city)) {
      throw new Error(`Invalid city: ${this.city}`);
    }
  }
}
