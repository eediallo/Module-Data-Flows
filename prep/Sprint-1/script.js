const film =   {
    title: "Killing of Flower Moon",
    director: "Martin Scorsese",
    times: ["15:35"],
    certificate: "15",
    duration: 112,
  }


// sub goal: refactor to use template


const filmCard = document.getElementById('film-card-template').content.cloneNode(true)


console.log(filmCard)