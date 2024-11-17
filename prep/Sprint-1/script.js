const films =  [ 
  {
    title: "Killing of Flower Moon",
    director: "Martin Scorsese",
    times: ["15:35"],
    certificate: "15",
    duration: 112,
  }, 
  {
    title: "Typist Artist Pirate King",
    directory: "Carol Morley",
    times: ["15:00", "20:00"],
    certificate: "12A",
    duration: 108,
  }
]

// Goal: build an array of film card and append them to the DOM


function createFilmCard(film){
  const filmCard = document.getElementById('film-card-template').content.cloneNode(true)
  filmCard.querySelector('h3').textContent = film.title
  filmCard.querySelector('[data-director]').textContent =`Director: ${film.title}`
  filmCard.querySelector('time').textContent =`Duration: ${film.times}`
   filmCard.querySelector('[data-certificate]').textContent =`Certificate: ${film.certificate}`
  return filmCard
}

const filmsCard = films.map(createFilmCard)
document.body.append(...filmsCard)