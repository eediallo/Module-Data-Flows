const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const displayDogBtn = document.createElement("button");
displayDogBtn.textContent = "Click to display random dog";
const ul = document.createElement("ul");
const loadMsgEl = document.querySelector(".loading-msg");

document.body.append(gallery, displayDogBtn, ul);

class Dog {
  constructor(dogData, isFetching) {
    this.dogData = {};
    this.isFetching = false;
  }

  async fetchDogData() {
    const url = "https://dog.ceo/api/breeds/image/random";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  }
}

class LoadingMsgHandler {
  constructor(isLoading) {
    this.isLoading = isLoading;
  }

  displayDataLoadingStatus() {
    const loadingMsg = this.isLoading
      ? "Data is loading. Please wait!"
      : "Data failed to load. Please try again";
    loadMsgEl.textContent = loadingMsg;
  }
}

const dog = new Dog();
const loadingMsg = new LoadingMsgHandler(true);

async function displayDogImage() {
  dog.isFetching = true;
  loadingMsg.displayDataLoadingStatus();
  try {
    const randomDogImage = await dog.fetchDogData();
    dog.dogData = randomDogImage;
    addDogImageToGallery();
    loadMsgEl.remove();
  } catch (error) {
    console.error(error);
    loadingMsg.displayDataLoadingStatus(false);
  } finally {
    dog.isFetching = false;
  }
}

function addDogImageToGallery() {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.setAttribute("src", dog.dogData.message);
  li.append(img);
  li.style.listStyle = "none";
  ul.append(li);
}

displayDogBtn.addEventListener("click", displayDogImage);
