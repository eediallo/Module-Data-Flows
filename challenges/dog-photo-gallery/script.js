const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const displayDogBtn = document.createElement("button");
displayDogBtn.textContent = "Click to display random dog";
const ul = document.createElement("ul");
const loadMsgEl = document.querySelector(".loading-msg");

document.body.append(gallery, displayDogBtn, ul);

const state = {
  dogData: {},
  isFetching: false,
};

function displayDataLoadingStatus(isLoading) {
  const loadingMsg = isLoading
    ? "Data is loading. Please wait!"
    : "Data failed to load. Please try again";
  loadMsgEl.textContent = loadingMsg;
}

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
  displayDataLoadingStatus(true);
  try {
    const dogData = await fetchDogData();
    state.dogData = dogData;

    displayDogImage();
    loadMsgEl.remove();
  } catch (error) {
    console.error(error);
    displayDataLoadingStatus(false);
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

displayDogBtn.addEventListener("click", fetchRandomDogImage);
