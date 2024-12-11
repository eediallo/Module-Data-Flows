const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
const conditions = document.querySelector("#conditions");
const creditUser = document.querySelector("#credit-user");
const searchTerm = document.querySelector("#search-tf");
const searchBtn = document.querySelector(".search__btn");
const loadingMsgEl = document.querySelector(".loading-msg");
const activeThumbnail = document.querySelector('[data-active="true"]');

const state = {
  weatherData: {},
  photos: {},
  isFetching: false,
  weatherAPIKey: config.weather_API_Key,
  unsplashAccessKey: config.unsplash_access_key,
  city: "",
  feedbackService: {
    hasDataLoadSuccessfully: true,
    feedbackMsg: this.hasDataLoadSuccessfully
      ? "Data is loading. Please wait!"
      : "Data fetching failed! Please refresh the page and try again",
    styleFeedbackMsg: (element) => {
      element.style.textAlign = "center";
      element.style.fontSize = "20px";
      element.style.color = this.hasDataLoadSuccessfully ? "black" : "red";
    },
  },
  thumbnail: {
    activeThumbnail: activeThumbnail,
    handleActiveThumbnail: (thumbCard) => {
      if (this.activeThumbnail) {
        // Remove data-active attribute from any previously active thumbnail
        activeThumbnail.removeAttribute("data-active");
        activeThumbnail.style.border = "";
      }
      // Set data-active attribute on the clicked thumbnail
      thumbCard.setAttribute("data-active", "true");
      thumbCard.style.border = "3px solid white";
    },
  },
};

// set city on clicked before fetching data
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  state.city = searchTerm.value;
  fetchData();
});

async function getWeatherData() {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=${state.weatherAPIKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Response status: ${response.status}`);
  }
  return response.json();
}

async function getPhotos() {
  const url = `https://api.unsplash.com/search/photos?query=${state.weatherData.weather[0].description}&client_id=${state.unsplashAccessKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Response status: ${response.status}`);
  }
  return await response.json();
}

function msgToUser(element, isError) {
  if (!isError) {
    element.textContent = state.feedbackService.feedbackMsg;
    state.feedbackService.styleFeedbackMsg(element);
  } else {
    element.textContent = state.feedbackService.feedbackMsg;
    state.feedbackService.styleFeedbackMsg(element);
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

    state.thumbnail.handleActiveThumbnail(thumbCard);

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
