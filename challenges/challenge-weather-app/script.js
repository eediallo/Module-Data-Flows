const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
const conditions = document.querySelector("#conditions");
const creditUser = document.querySelector("#credit-user");
const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");
const activeThumbnail = document.querySelector('[data-active="true"]');

class State {
  constructor(
    isFetching,
    hasDataLoadSuccessfully,
    city = "",
    weatherData = {},
    photos = {}
  ) {
    this.isFetching = isFetching;
    this.hasDataLoadSuccessfully = hasDataLoadSuccessfully;
    this.city = city;
    this.weatherData = weatherData;
    this.photos = photos;
  }

  static weatherAPIKey = config.weather_API_Key;
  static unsplashAccessKey = config.unsplash_access_key;
  static unsuccessMsg =
    "Data fetching failed! Please refresh the page and try again";
  static successMsg = "Data is loading. Please wait!";

  get feedbackService() {
    return this.hasDataLoadSuccessfully ? State.successMsg : State.unsuccessMsg;
  }

  styleFeedbackMsg(element) {
    element.style.textAlign = "center";
    element.style.fontSize = "20px";
    element.style.color = this.hasDataLoadSuccessfully ? "black" : "red";
  }
}

class ActiveThumbnail {
  constructor(activeThumbnail, dataAttribute) {
    this.activeThumbnail = activeThumbnail;
    this.dataAttribute = dataAttribute;
  }

  handleActiveThumbnail(thumbCard) {
    if (this.activeThumbnail) {
      // Remove data-active attribute from any previously active thumbnail
      this.activeThumbnail.removeAttribute(this.dataAttribute);
      this.activeThumbnail.style.border = "";
    }
    // Set data-active attribute on the clicked thumbnail
    thumbCard.setAttribute(this.dataAttribute, "true");
    thumbCard.style.border = "3px solid white";
    // Update the activeThumbnail reference
    this.activeThumbnail = thumbCard;
  }
}

const state = new State(false, true);

const aThumbnail = new ActiveThumbnail(activeThumbnail, "data-active");

// set city on clicked before fetching data
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  state.city = searchTerm.value;
  fetchData();
});

async function getWeatherData() {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=${State.weatherAPIKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Response status: ${response.status}`);
  }
  return response.json();
}

async function getPhotos() {
  const url = `https://api.unsplash.com/search/photos?query=${state.weatherData.weather[0].description}&client_id=${State.unsplashAccessKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Response status: ${response.status}`);
  }
  return await response.json();
}

function msgToUser(element, isError) {
  if (!isError) {
    element.textContent = state.feedbackService;
    state.styleFeedbackMsg(element);
  } else {
    element.textContent = state.feedbackService;
    state.styleFeedbackMsg(element);
  }
}

async function fetchData() {
  msgToUser(loadingMsgEl, false);
  state.isFetching = true;
  try {
    const weatherData = await getWeatherData();
    state.weatherData = weatherData;

    const photos = await getPhotos();
    state.photos = photos;

    updateUI();
    loadingMsgEl.remove(); // Remove loading message only if there is no error
  } catch (error) {
    msgToUser(loadingMsgEl, true);
    console.error(error);
  } finally {
    state.isFetching = false;
  }
}

function createThumbCard(photo) {
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

    aThumbnail.handleActiveThumbnail(thumbCard);

    loadMainImage(photo.urls.full, photo.alt_description);
    //display user name et link to portfolio
    creditUser.textContent = `${photo.user.first_name} ${photo.user.last_name}`;
    creditUser.setAttribute("href", photo.user.links.portfolio);
  });

  return thumbCard;
}

function updateUI() {
  const thumbCards = state.photos.results.map(createThumbCard);
  thumbs.append(...thumbCards);
  conditions.textContent = state.weatherData.weather[0].description;
}
function loadMainImage(url, alt) {
  const mainImg = document.querySelector("#main-img");
  mainImg.setAttribute("src", url);
  mainImg.setAttribute("alt", alt);
}
