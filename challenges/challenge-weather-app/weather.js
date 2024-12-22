import { keys } from "./apiKeys.js";

export class Weather {
  constructor(isFetching = false, weatherData = {}, city = "") {
    this.weatherData = weatherData;
    this.city = city;
    this.isFetching = isFetching;
  }

  static weatherAPIKey = keys.weather_API_Key;

  async fetchWeatherData() {
    try {
      this.handleEmptyOrNumericCity();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${Weather.weatherAPIKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      this.weatherData = await response.json();
    } catch (error) {
      console.error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  handleEmptyOrNumericCity() {
    if (this.city === "" || !isNaN(this.city)) {
      throw new Error(`Invalid city: ${this.city}`);
    }
  }
}
