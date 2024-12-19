const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
const conditions = document.querySelector("#conditions");
const creditUser = document.querySelector("#credit-user");
const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");
let activeThumbnail = document.querySelector('[data-active="true"]');

//==========Weather Class======================
class Weather {
  constructor(isFetching) {
    this.isFetching = isFetching;
    this.weatherData = {};
    this.city = "";
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

//==========Photos Class======================
class Photos {
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

//==========ThumbnailHandler class======================
class ThumbnailHandler {
  constructor() {
    this.thumbCards = [];
    this.dataAttribute = "data-active";
  }

  createThumbCard(photo) {
    const thumbCard = document.createElement("section");
    const aEl = document.createElement("a");
    aEl.setAttribute("href", photo.urls.full);
    aEl.classList.add("id", "to-main-img");
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.thumb);
    img.setAttribute("alt", photo.alt_description);
    aEl.append(img);
    thumbCard.append(aEl);
    thumbCard.classList.add("thumb-card");
    // Add click event listener to load full image
    aEl.addEventListener("click", (event) => {
      event.preventDefault();

      this.handleActiveThumbnail(thumbCard);

      mainImageHandler.loadMainImage(photo.urls.full, photo.alt_description);
      // Display user name and link to portfolio
      creditUser.textContent = `${photo.user.first_name} ${photo.user.last_name}`;
      creditUser.setAttribute("href", photo.user.links.portfolio);
    });

    return thumbCard;
  }

  handleActiveThumbnail(thumbCard) {
    if (activeThumbnail) {
      activeThumbnail.removeAttribute(this.dataAttribute);
      activeThumbnail.style.border = "";
    }
    thumbCard.setAttribute(this.dataAttribute, "true");
    thumbCard.style.border = "3px solid white";
    // Update the activeThumbnail reference
    activeThumbnail = thumbCard;
  }

  updateUI(weather, photos) {
    this.thumbCards = photos.results.map((photo) =>
      this.createThumbCard(photo)
    );
    thumbs.append(...this.thumbCards);
    conditions.textContent = weather.weather[0].description;
  }
}

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
  updateDataLoadingStatus(element, isError) {
    const feedbackService = new DataLoadingMsg(isError);
    if (!isError) {
      element.textContent = feedbackService.feedbackService;
      feedbackService.styleFeedbackMsg(element);
    } else {
      element.textContent = feedbackService.feedbackService;
      feedbackService.styleFeedbackMsg(element);
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

  get feedbackService() {
    return this.hasDataLoadSuccessfully
      ? DataLoadingMsg.loadingMsg
      : DataLoadingMsg.errorLoadingMsg;
  }

  styleFeedbackMsg(element) {
    element.style.textAlign = "center";
    element.style.fontSize = "20px";
    element.style.color = !this.hasDataLoadSuccessfully ? "black" : "red";
  }
}

//==========Instantiation======================
const weather = new Weather();
const thumbnailHandler = new ThumbnailHandler();
const mainImageHandler = new MainImageHandler();
const dataLoadingMsgHandler = new DataLoadingMsgHandler();

//Event listener
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  weather.city = searchTerm.value;
  weather.isFetching = true;
  dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl, false);
  try {
    await weather.fetchWeatherData();
    const photos = new Photos(weather.weatherData);
    await photos.fetchPhotos();
    thumbnailHandler.updateUI(weather.weatherData, photos.photos);
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl, false);
    loadingMsgEl.remove();
  } catch (error) {
    dataLoadingMsgHandler.updateDataLoadingStatus(loadingMsgEl, true);
  } finally {
    weather.isFetching = false;
  }
});
