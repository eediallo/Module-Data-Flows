import { mainImageHandler } from "./mainImageHandler.js";

let activeThumbnail = document.querySelector('[data-active="true"]');
const creditUser = document.querySelector("#credit-user");

export class ThumbnailHandler {
  constructor() {
    this.thumbCards = [];
    this.dataAttribute = "data-active";
  }

  createThumbCard(photo) {
    const thumbCard = document.createElement("section");
    const aEl = document.createElement("a");
    aEl.setAttribute("href", photo.urls.full);
    aEl.classList.add("id", "to-main-img");
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.thumb);
    img.setAttribute("alt", photo.alt_description);
    aEl.append(img);
    thumbCard.append(aEl);
    thumbCard.classList.add("thumb-card");
    // Add click event listener to load full image
    aEl.addEventListener("click", (event) => {
      event.preventDefault();

      this.handleActiveThumbnail(thumbCard);

      mainImageHandler.loadMainImage(photo.urls.full, photo.alt_description);
      // Display user name and link to portfolio
      creditUser.textContent = `${photo.user.first_name} ${photo.user.last_name}`;
      creditUser.setAttribute("href", photo.user.links.portfolio);
    });

    return thumbCard;
  }

  handleActiveThumbnail(thumbCard) {
    if (activeThumbnail) {
      activeThumbnail.removeAttribute(this.dataAttribute);
      activeThumbnail.style.border = "";
    }
    thumbCard.setAttribute(this.dataAttribute, "true");
    thumbCard.style.border = "3px solid white";
    // Update the activeThumbnail reference
    activeThumbnail = thumbCard;
  }

  updateUI(weather, photos) {
    this.thumbCards = photos.results.map((photo) =>
      this.createThumbCard(photo)
    );
    thumbs.append(...this.thumbCards);
    conditions.textContent = weather.weather[0].description;
  }
}