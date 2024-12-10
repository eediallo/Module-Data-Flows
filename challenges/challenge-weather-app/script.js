const state = {
  weatherData: {},
  photos: {},
  isFetching: false,
  weatherAPIKey: config.weather_API_Key,
  unsplashAccessKey: config.unsplash_access_key,
};

async function getWeatherData() {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${state.weatherAPIKey}`;
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

async function fetchData() {
  state.isFetching = true;
  try {
    const weatherData = await getWeatherData();
    state.weatherData = weatherData;

    const photos = await getPhotos();
    state.photos = photos;

    updateUI();
  } catch (error) {
    console.error(error.message);
  } finally {
    state.isFetching = false;
  }
}

fetchData();

const thumbs = document.querySelector("#thumbs");
const mainPhoto = document.querySelector("#photo");
console.log(mainPhoto, "<====main photo");

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
  thumbCard.style.backgroundColor = "red";

  // Add click event listener to load full image
  aEl.addEventListener("click", (event) => {
    event.preventDefault(); 
    loadMainImage(photo.urls.full, photo.alt_description);
  });

  return thumbCard;
}

function updateUI() {
  const thumbCards = state.photos.results.map(createThumbCard);
  thumbs.append(...thumbCards);
}
function loadMainImage(url, alt) {
  const mainImg = document.querySelector("#main-img");
  mainImg.setAttribute("src", url);
  mainImg.setAttribute("alt", alt);
}