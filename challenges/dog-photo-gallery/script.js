const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const btn1 = document.createElement("button");
btn1.textContent = "button 1";
const btn2 = document.createElement("button");
btn2.textContent = "button 2";
const ul = document.createElement("ul");

document.body.append(gallery, btn1, btn2, ul);
console.log(document.body);

const state = {
  dogData: {},
  isFetching: false,
};

async function fetchDogData() {
  const url = "https://dog.ceo/api/breeds/image/random";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}

async function fetchRandomDogImage() {
  state.isFetching = true;
  try {
    const dogData = await fetchDogData();
    state.dogData = dogData;
  } catch (error) {
    console.error(error);
  } finally {
    state.isFetching = false;
  }

  console.log(state);
}

fetchRandomDogImage();
