import { dogGallery, loadMsgEl, ul } from "./dogGallery.js";

const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const displayDogBtn = document.createElement("button");
displayDogBtn.textContent = "Click to display random dog";

document.body.append(gallery, displayDogBtn, ul, loadMsgEl);

// Event listener
displayDogBtn.addEventListener(
  "click",
  dogGallery.displayDogImage.bind(dogGallery)
);
