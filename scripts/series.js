const apiKey = 'e96d3e0f2b1645440183370c85a0424e'


const search = new URLSearchParams(window.location.search)
const id = search.get('id')
const seriesDiv = document.querySelector('.series')
const seriesUrl = `https://api.themoviedb.org/3/tv/${id}`;

async function getMovieObject() {
    const response = await fetch(`${seriesUrl}?api_key=${apiKey}`)
    const data = await response.json();
    
    const series = {}
    series.title = data.name;
    series.genres = data.genres;
    series.overview = data.overview;
    series.actors = await getActors()
    series.image = data.poster_path;

    return series;
}


async function getActors() {
    const creditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits`
    const response = await fetch(`${creditsUrl}?api_key=${apiKey}`);
    const credits = await response.json();
    const actors = []
    credits.cast.forEach((actor) => {
        actors.push({ name: actor.name, character: actor.character, img: actor.profile_path })
    });
    return actors;
}

async function createMovieObject() {
    const currentMovie = await getMovieObject()
    console.log(currentMovie);

    const title = document.createElement('h1')
    title.textContent = currentMovie.title

    const image = document.createElement('img')
    image.src = `https://image.tmdb.org/t/p/w400/${currentMovie.image}`

    const leftSection = document.createElement('div');
    leftSection.append(title, image)

    const description = document.createElement('p')
    description.textContent = currentMovie.overview;



    const genreList = document.createElement('ul');
    currentMovie.genres.forEach((genre) => {
        console.log(genre.name);
        const genreListItem = document.createElement('li');
        genreListItem.textContent = genre.name;
        genreList.appendChild(genreListItem);
    })

  
    const rightSection = document.createElement('div');
    rightSection.append(description, genreList);
    rightSection.style.padding = "40px"
    rightSection.style.width = "500px"


    const parent = document.createElement('div')
    parent.appendChild(leftSection)
    parent.appendChild(rightSection)
    parent.classList.add('d-flex')
    parent.classList.add('justify-content-around')
    seriesDiv.appendChild(parent)


    const cast = document.createElement('div')
    cast.classList.add('d-flex')
    cast.classList.add('flex-wrap')
    cast.classList.add('gap-3')
    currentMovie.actors.forEach((actor) => {
        const actorName = document.createElement('h3')
        actorName.textContent = actor.name;
        const actorCharacter = document.createElement('p')
        actorCharacter.textContent = actor.character;
        const actorImage = document.createElement('img');
        actorImage.src = `https://image.tmdb.org/t/p/w200/${actor.img}`;
        const actorCard = document.createElement('div');
        actorCard.append(actorName, actorCharacter, actorImage);
        actorCard.style.width = "300px";
        actorCard.style.height = "400px";
        actorCard.style.border = "2px solid black";
        actorCard.style.padding = "10px";

        cast.appendChild(actorCard)

    })

    const castHeading = document.createElement('h2')
    castHeading.textContent = 'Cast'
    seriesDiv.appendChild(castHeading)
    seriesDiv.appendChild(cast);



}

createMovieObject();
