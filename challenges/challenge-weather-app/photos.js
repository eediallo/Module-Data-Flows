import { keys } from "./apiKeys.js";

export class Photos {
  constructor(weatherData) {
    this.weatherData = weatherData;
    this.photos = {};
  }

  static unsplashAccessKey = keys.unsplash_access_key;

  async fetchPhotos() {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${this.weatherData.weather[0].description}&client_id=${Photos.unsplashAccessKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching photos: ${response.statusText}`);
      }
      this.photos = await response.json();
    } catch (error) {
      console.error(`Failed to fetch photos: ${error.message}`);
    }
  }
}
