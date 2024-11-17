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
  filmCard.querySelector('p').textContent = film.director

  return filmCard
}

const filmsCard = []
for(let film of films){
  const card = createFilmCard(film)
  filmsCard.push(card)
}

document.body.append(...filmsCard)