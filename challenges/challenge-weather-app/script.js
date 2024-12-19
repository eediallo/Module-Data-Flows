const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
const conditions = document.querySelector("#conditions");
const creditUser = document.querySelector("#credit-user");
const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");
let activeThumbnail = document.querySelector('[data-active="true"]');

class State {
  constructor(isFetching, city = "", weatherData = {}, photos = {}) {
    this.isFetching = isFetching;
    this.city = city;
    this.weatherData = weatherData;
    this.photos = photos;
  }

  static weatherAPIKey = config.weather_API_Key;
  static unsplashAccessKey = config.unsplash_access_key;

  async fetchWeatherData() {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${State.weatherAPIKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }
    this.weatherData = await response.json();
  }

  async fetchPhotos() {
    const url = `https://api.unsplash.com/search/photos?query=${this.weatherData.weather[0].description}&client_id=${State.unsplashAccessKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }
    return await response.json();
  }
}

class UI {
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

      this.loadMainImage(photo.urls.full, photo.alt_description);
      //display user name et link to portfolio
      creditUser.textContent = `${photo.user.first_name} ${photo.user.last_name}`;
      creditUser.setAttribute("href", photo.user.links.portfolio);
    });

    return thumbCard;
  }

  handleActiveThumbnail(thumbCard) {
    if (activeThumbnail) {
      // Remove data-active attribute from any previously active thumbnail
      activeThumbnail.removeAttribute(this.dataAttribute);
      activeThumbnail.style.border = "";
    }
    // Set data-active attribute on the clicked thumbnail
    thumbCard.setAttribute(this.dataAttribute, "true");
    thumbCard.style.border = "3px solid white";
    // Update the activeThumbnail reference
    activeThumbnail = thumbCard;
  }

  updateUI(state) {
    this.thumbCards = state.photos.results.map((photo) =>
      this.createThumbCard(photo)
    );
    thumbs.append(...this.thumbCards);
    conditions.textContent = state.weatherData.weather[0].description;
  }

  updateDataLoadingStatus(element, isError) {
    const feedbackService = new FeedbackServices(isError);
    if (!isError) {
      element.textContent = feedbackService.feedbackService;
      feedbackService.styleFeedbackMsg(element);
    } else {
      element.textContent = feedbackService.feedbackService;
      feedbackService.styleFeedbackMsg(element);
    }
  }

  loadMainImage(url, alt) {
    const mainImg = document.querySelector("#main-img");
    const lowResImg = document.createElement("img");
    lowResImg.setAttribute("src", url.replace("full", "thumb")); // Assuming the URL structure allows this
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

class FeedbackServices {
  constructor(hasDataLoadSuccessfully) {
    this.hasDataLoadSuccessfully = hasDataLoadSuccessfully;
  }
  static loadingMsg =
    "Data fetching failed! Please refresh the page and try again";
  static errorLoadingMsg = "Data is loading. Please wait!";

  get feedbackService() {
    return this.hasDataLoadSuccessfully
      ? FeedbackServices.loadingMsg
      : FeedbackServices.errorLoadingMsg;
  }

  styleFeedbackMsg(element) {
    element.style.textAlign = "center";
    element.style.fontSize = "20px";
    element.style.color = !this.hasDataLoadSuccessfully ? "black" : "red";
  }
}

const state = new State(false, true);
const ui = new UI();

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  state.city = searchTerm.value;
  state.isFetching = true;
  ui.updateDataLoadingStatus(loadingMsgEl, false);
  try {
    await state.fetchWeatherData();
    const photos = await state.fetchPhotos();
    state.photos = photos;
    ui.updateUI(state);
    loadingMsgEl.remove();
  } catch (error) {
    ui.updateDataLoadingStatus(loadingMsgEl, true);
  } finally {
    state.isFetching = false;
  }
});
