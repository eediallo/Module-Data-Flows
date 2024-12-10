const state = {
  weatherData: {},
  photos: {},
  isFetching: false,
  weatherAPIKey: config.weather_API_Key,
  unsplashAccessKey: config.unsplash_access_key,
};

const weatherAPIKey = config.weather_API_Key;
console.log(weatherAPIKey);
async function getWeatherData() {
  if (state.isFetching) {
    console.warn("Fetching is in progress. Please wait");
    return;
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${state.weatherAPIKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }

    const weatherData = await response.json();
    state.weatherData = weatherData;
    // console.log(weatherData);
  } catch (error) {
    console.error(error.message);
  }
}

async function getPhotos() {
  if (state.isFetching) {
    console.warn("Fetching is in progress. Please wait");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?query=${state.weatherData.weather[0].description}&client_id=${state.unsplashAccessKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }

    const photos = await response.json();
    state.photos = photos;
    // console.log(photos, "<----photos");
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchData() {
  await getWeatherData();
  await getPhotos();
  console.log(state);
}

fetchData();
