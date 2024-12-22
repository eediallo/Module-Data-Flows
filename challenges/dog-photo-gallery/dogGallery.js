const loadMsgEl = document.createElement("div");
loadMsgEl.classList.add("loading-msg");
const ul = document.createElement("ul");

class DogGallery {
  constructor() {
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

  displayLoadingStatus() {
    loadMsgEl.textContent = this.isFetching
      ? "Data is loading. Please wait!"
      : "Data failed to load. Please try again";
  }

  async displayDogImage() {
    this.isFetching = true;
    this.displayLoadingStatus();
    try {
      const randomDogImage = await this.fetchDogData();
      this.dogData = randomDogImage;
      this.addDogImageToGallery();
      loadMsgEl.textContent = "";
    } catch (error) {
      console.error(error);
      this.displayLoadingStatus();
    } finally {
      this.isFetching = false;
    }
  }

  addDogImageToGallery() {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", this.dogData.message);
    li.append(img);
    li.style.listStyle = "none";
    ul.append(li);
  }
}

const dogGallery = new DogGallery();
export { loadMsgEl, dogGallery, ul };
