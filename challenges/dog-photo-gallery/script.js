import { dogGallery, loadMsgEl, ul } from "./dogGallery.js";

const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const displayDogBtn = document.createElement("button");
displayDogBtn.textContent = "Click to display random dog";

document.body.append(
  gallery,
  displayDogBtn,
  ul,
  loadMsgEl
  // removeDogGalleryBtn
);

// Event listener
displayDogBtn.addEventListener("click", () => {
  dogGallery.displayDogImage.call(dogGallery);
  
  if (!document.querySelector(".remove-dog-gallery-btn")) {
    const removeDogGalleryBtn = document.createElement("button");
    removeDogGalleryBtn.textContent = "Remove Dog Gallery";
    removeDogGalleryBtn.classList.add("remove-dog-gallery-btn");
    document.body.append(removeDogGalleryBtn);
    removeDogGalleryBtn.addEventListener("click", () => {
      document.querySelector("ul").innerHTML = "";
    });
  }
});
