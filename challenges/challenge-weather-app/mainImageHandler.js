class MainImageHandler {
  loadMainImage(url, alt) {
    const mainImg = document.querySelector("#main-img");
    const lowResImg = new Image();
    lowResImg.setAttribute("src", url);
    lowResImg.setAttribute("alt", alt);
    lowResImg.style.position = "absolute";
    lowResImg.style.top = "0";
    lowResImg.style.left = "0";
    lowResImg.style.width = "100%";
    lowResImg.style.height = "100%";
    lowResImg.style.objectFit = "cover";
    mainImg.parentNode.appendChild(lowResImg);

    const highResImg = new Image();
    highResImg.src = url;
    highResImg.onload = () => {
      mainImg.setAttribute("src", url);
      mainImg.setAttribute("alt", alt);
      lowResImg.remove();
    };
  }
}

export const mainImageHandler = new MainImageHandler();
