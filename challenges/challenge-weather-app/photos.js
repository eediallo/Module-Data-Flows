import { Weather } from "./weather.js";
export class Photos {
  constructor(weatherData) {
    this.weatherData = weatherData;
    this.photos = {};
  }

  static unsplashAccessKey = config.unsplash_access_key;

  async fetchPhotos() {
    const url = `https://api.unsplash.com/search/photos?query=${this.weatherData.weather[0].description}&client_id=${Photos.unsplashAccessKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }
    this.photos = await response.json();
  }
}
