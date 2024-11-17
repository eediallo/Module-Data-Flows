const film =   {
    title: "Killing of Flower Moon",
    director: "Martin Scorsese",
    times: ["15:35"],
    certificate: "15",
    duration: 112,
  }


// sub goal: create a film card
// 1. create a film card (section)
// 2. append it to the dom


// next: render title
// create h1
// set title content to title of film
const filmCard = document.createElement('section')
const body = document.body
const title = document.createElement('h1')
title.textContent = film.title
filmCard.appendChild(title)
body.appendChild(filmCard)
