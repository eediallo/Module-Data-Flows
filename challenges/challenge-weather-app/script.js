import { Weather } from "./weather.js";
import { Photos } from "./photos.js";
import { ThumbnailHandler } from "./thumbnailHandler.js";

const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
const conditions = document.querySelector("#conditions");
const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");

//==========DataLoadingMsgHandler class======================
class DataLoadingMsgHandler {
  constructor(isError) {
    this.isError = isError;
  }
  updateDataLoadingStatus(element) {
    const dataLoadingMsg = new DataLoadingMsg();
    if (!this.isError) {
      element.textContent = dataLoadingMsg.getDataLoadingMsg;
      dataLoadingMsg.styleFeedbackMsg(element);
    } else {
      element.textContent = dataLoadingMsg.getDataLoadingMsg;
      dataLoadingMsg.styleFeedbackMsg(element);
    }
  }
}

//==========DataLoadingMsg class======================
class DataLoadingMsg {
  constructor(hasDataLoadSuccessfully) {
    this.hasDataLoadSuccessfully = hasDataLoadSuccessfully;
  }
  static loadingMsg =
    "Data fetching failed! Please refresh the page and try again";
  static errorLoadingMsg = "Data is loading. Please wait!";

  get getDataLoadingMsg() {
    return this.hasDataLoadSuccessfully
      ? DataLoadingMsg.loadingMsg
      : DataLoadingMsg.errorLoadingMsg;
  }

  styleFeedbackMsg(element) {
    element.style.textAlign = "center";
    element.style.fontSize = "30px";
    element.style.color = !this.hasDataLoadSuccessfully ? "black" : "red";
  }
}

//==========Instantiation======================
const weather = new Weather();
const thumbnailHandler = new ThumbnailHandler();
const dataLoadingMsgHandler = new DataLoadingMsgHandler();
const dataLoadingMsg = new DataLoadingMsg();

//Event listener
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  weather.city = searchTerm.value;

  try {
    weather.handleEmptyOrNumericCity(); // handle empty or numeric string

    weather.isFetching = true;
    dataLoadingMsg.isError = false;
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl, false);

    await weather.fetchWeatherData();

    const photos = new Photos(weather.weatherData, weather.city);
    await photos.fetchPhotos();

    thumbnailHandler.updateUI(weather.weatherData, photos.photos);
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl);

    loadingMsgEl.remove();
  } catch (error) {
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl);
  } finally {
    weather.isFetching = false;
    dataLoadingMsg.isError = true;
  }
});
