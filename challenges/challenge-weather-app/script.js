const state = {
  weatherData: {},
  photos: {},
  isFetching: false,
};

async function getWeatherData() {
  if (state.isFetching) {
    console.warn("Fetching is in progress. Please wait");
    return;
  }

  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=london&appid=3b3e64be7a14413a3311c4198bbe9582";

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

  const url =
    `https://api.unsplash.com/search/photos?query=${state.weatherData.weather[0].description}&client_id=ds-h-C1-el1wmZC5mvMG9sgSp2jkWFbCZSUqKxwPVxo`;

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

fetchData()