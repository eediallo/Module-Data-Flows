import { dogGallery, loadMsgEl, ul } from "./dogGallery.js";

const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const displayDogBtn = document.createElement("button");
displayDogBtn.textContent = "Click to display random dog";
const removeDogGalleryBtn = document.createElement("button");
removeDogGalleryBtn.textContent = "Remove Dog Gallery";

document.body.append(
  gallery,
  displayDogBtn,
  ul,
  loadMsgEl,
  removeDogGalleryBtn
);

// Event listener
displayDogBtn.addEventListener(
  "click",
  dogGallery.displayDogImage.bind(dogGallery)
);

removeDogGalleryBtn.addEventListener("click", () => {
  document.querySelector("ul").innerHTML = "";
});
