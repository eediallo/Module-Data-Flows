const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const displayBogBtn = document.createElement("button");
displayBogBtn.textContent = "Click to display random dog";
const ul = document.createElement("ul");

document.body.append(gallery, displayBogBtn, ul);

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

    displayDogImage();
  } catch (error) {
    console.error(error);
  } finally {
    state.isFetching = false;
  }
}

function displayDogImage() {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.setAttribute("src", state.dogData.message);
  li.append(img);
  li.style.listStyle = "none";
  ul.append(li);
}

displayBogBtn.addEventListener("click", fetchRandomDogImage);
