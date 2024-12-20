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

class LoadingMsgHandler extends Dog {
  constructor(isFetching) {
    super(isFetching);
  }

  displayDataLoadingStatus() {
    const loadingMsg = this.isFetching
      ? "Data is loading. Please wait!"
      : "Data failed to load. Please try again";
    loadMsgEl.textContent = loadingMsg;
  }
}

const loadingMsg = new LoadingMsgHandler();

class DisplayDog {
  constructor(dog) {
    this.dog = new Dog();
  }

  async displayDogImage() {
    console.log("THis is : ", this);
    this.dog.isFetching = true;
    loadingMsg.displayDataLoadingStatus();
    try {
      const randomDogImage = await this.dog.fetchDogData();
      this.dog.dogData = randomDogImage;
      this.addDogImageToGallery();
      loadMsgEl.remove();
    } catch (error) {
      console.error(error);
      loadingMsg.displayDataLoadingStatus();
    } finally {
      this.dog.isFetching = false;
    }
  }

  addDogImageToGallery() {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", this.dog.dogData.message);
    li.append(img);
    li.style.listStyle = "none";
    ul.append(li);
  }
}

const displayDog = new DisplayDog();

displayDogBtn.addEventListener(
  "click",
  displayDog.displayDogImage.bind(displayDog)
);
