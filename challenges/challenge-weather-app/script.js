import { weather, thumbnailHandler, dataLoadingMsgHandler } from "./config.js";
import { Photos } from "./photos.js";

const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");

//Event listener
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  weather.city = searchTerm.value;

  try {
    weather.handleEmptyOrNumericCity(); // handle empty or numeric string
    weather.isFetching = true;
    dataLoadingMsgHandler.isFetching = true;
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl);

    await weather.fetchWeatherData();

    const photos = new Photos(weather.weatherData);
    await photos.fetchPhotos();

    thumbnailHandler.updateUI(weather.weatherData, photos.photos);
    dataLoadingMsgHandler.isFetching = false;
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl);

    loadingMsgEl.innerHTML = "";
  } catch (error) {
    dataLoadingMsgHandler.isFetching = false;
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl);
    console.error(error);
  } finally {
    weather.isFetching = false;
    dataLoadingMsgHandler.isFetching = false;
  }
});
