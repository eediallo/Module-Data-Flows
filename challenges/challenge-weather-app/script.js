import { Weather } from "./weather.js";
import { Photos } from "./photos.js";
import { ThumbnailHandler } from "./thumbnailHandler.js";

const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
const conditions = document.querySelector("#conditions");
const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");


//==========EmptyOrNumericCity Class======================
export class EmptyOrNumericCity {
  constructor(city) {
    this.city = city;
  }

  handleEmptyOrNumericCity(dataLoadingMsg) {
    if (this.city === "" || !isNaN(this.city)) {
      loadingMsgEl.textContent =
        "Invalid city: must be a non empty string: eg- London, Conakry, Manchester etc...";
      dataLoadingMsg.styleFeedbackMsg(loadingMsgEl);
      throw new Error(`Invalid city: ${this.city}`);
    }
  }
}

export const emptyOrNumericCity = new EmptyOrNumericCity();

//==========MainImageHandler class======================
class MainImageHandler {
  loadMainImage(url, alt) {
    const mainImg = document.querySelector("#main-img");
    const lowResImg = new Image();
    lowResImg.setAttribute("src", url);
    lowResImg.setAttribute("alt", alt);
    lowResImg.style.position = "absolute";
    lowResImg.style.top = "0";
    lowResImg.style.left = "0";
    lowResImg.style.width = "100%";
    lowResImg.style.height = "100%";
    lowResImg.style.objectFit = "cover";
    mainImg.parentNode.appendChild(lowResImg);

    const highResImg = new Image();
    highResImg.src = url;
    highResImg.onload = () => {
      mainImg.setAttribute("src", url);
      mainImg.setAttribute("alt", alt);
      lowResImg.remove();
    };
  }
}

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

  emptyOrNumericCity.city = weather.city;
  emptyOrNumericCity.handleEmptyOrNumericCity(dataLoadingMsg); // handle empty or numeric string

  weather.isFetching = true;
  dataLoadingMsg.isError = false;
  dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl, false);
  try {
    await weather.fetchWeatherData();

    const photos = new Photos(weather.weatherData);
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
