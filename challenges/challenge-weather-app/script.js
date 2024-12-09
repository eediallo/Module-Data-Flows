

let isFetching = false;
async function getWeatherData() {
  if (isFetching) {
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
    console.log(weatherData);
  } catch (error) {
    console.error(error.message);
  }
}

getWeatherData();

async function getPhotos() {
  if (isFetching) {
    console.warn("Fetching is in progress. Please wait");
    return;
  }

  const url =
    "https://api.unsplash.com/search/photos?query=snow&client_id=ds-h-C1-el1wmZC5mvMG9sgSp2jkWFbCZSUqKxwPVxo";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }

    const photos = await response.json();
    console.log(photos, '<----photos');
  } catch (error) {
    console.error(error.message);
  }
}

getPhotos();
