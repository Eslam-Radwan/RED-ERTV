const search = new URLSearchParams(window.location.search)
const movieId = search.get('id')
const apiKey = 'e96d3e0f2b1645440183370c85a0424e'
const movieDiv = document.querySelector('.movie')

async function getMovieObject()
{
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const response = await fetch(`${movieUrl}?api_key=${apiKey}`,{method:"GET",headers:{'Content-Type':'application/json'}})    
    const data = await response.json();
    const movie = {}
    movie.title = data.title;
    movie.genres = data.genres;
    movie.duration = Math.floor(data.runtime / 60) + ' hour ' + (data.runtime % 60) + " minute";
    movie.overview = data.overview;
    movie.actors = await getActors()
    movie.trailer = await getTrailer();
    movie.reviews = await getReviews(1);
    movie.image = data.poster_path;    

    return movie;    
}

async function getTrailer() {

    const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`
    const response = await fetch(`${videosUrl}?api_key=${apiKey}`)
    const data = await response.json();
    const trailers = []
    data.results.forEach((video)=>{
        if(video.type === 'Trailer' && video.site === 'YouTube')
        {
            trailers.push({youtubeKey:video.key})
        }
    });    
    return trailers
}

async function getReviews(page)
{
    const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
    const response = await fetch(`${reviewsUrl}?api_key=${apiKey}&page=${page}`);
    const data = await response.json();
    
    return data.results;

}
async function getActors()
{
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`
    const response = await fetch(`${creditsUrl}?api_key=${apiKey}`);
    const credits = await response.json();
    const actors = []
    credits.cast.forEach((actor) => {
        actors.push({name:actor.name,character:actor.character,img:actor.profile_path})
    });
    return actors;
}

function reviewsDiv(reviews)
{

    console.log(reviews);
    
}
async function createMovieObject()
{
    const currentMovie = await getMovieObject()
    console.log(currentMovie);
    
    const title = document.createElement('h1')
    title.textContent = currentMovie.title

    const image = document.createElement('img')
    image.src = `https://image.tmdb.org/t/p/w400/${currentMovie.image}`

    const leftSection = document.createElement('div');
    leftSection.append(title,image)

    const description = document.createElement('p')
    description.textContent = currentMovie.overview;



    const genreList = document.createElement('ul');
    currentMovie.genres.forEach((genre) => {
        console.log(genre.name);
        const genreListItem = document.createElement('li');
        genreListItem.textContent = genre.name;
        genreList.appendChild(genreListItem);
    })

    const duration = document.createElement('p');
    duration.textContent = "Duration: " + currentMovie.duration

    const trailer = document.createElement('iframe');
    trailer.src = `https://www.youtube.com/embed/${currentMovie.trailer[0].youtubeKey}`
    trailer.width = '600'
    trailer.height = '400'
    trailer.title = currentMovie.title;
    trailer.allow = "accelerometer;autoplay; clipboard-write;encrypted-media; gyroscope;  picture-in-picture; web-share";
    trailer.referrerpolicy = "strict-origin-when-cross-origin"
    trailer.allowFullscreen = true;
    
    const rightSection = document.createElement('div');
    rightSection.append(description, genreList, duration);
    rightSection.style.padding = "40px"
    rightSection.style.width = "500px"
    rightSection.appendChild(trailer)


    const parent = document.createElement('div')
    parent.appendChild(leftSection)
    parent.appendChild(rightSection)
    parent.classList.add('d-flex')
    parent.classList.add('justify-content-around')

    movieDiv.appendChild(parent)
    const cast = document.createElement('div')
    cast.classList.add('d-flex')
    cast.classList.add('flex-wrap')
    cast.classList.add('gap-3')
    currentMovie.actors.forEach((actor)=>{
        const actorName = document.createElement('h3')
        actorName.textContent = actor.name;
        const actorCharacter = document.createElement('p')
        actorCharacter.textContent = actor.character;
        const actorImage = document.createElement('img');
        actorImage.src = `https://image.tmdb.org/t/p/w200/${actor.img}`;
        const actorCard = document.createElement('div');
        actorCard.append(actorName,actorCharacter,actorImage);
        actorCard.style.width = "300px";
        actorCard.style.height = "400px";
        actorCard.style.border = "2px solid black";
        actorCard.style.padding = "10px";

        cast.appendChild(actorCard)
        
    })

    const castHeading = document.createElement('h2')
    castHeading.textContent = 'Cast'
    movieDiv.appendChild(castHeading)
    movieDiv.appendChild(cast);


    movieDiv.appendChild(reviewsDiv(currentMovie.reviews))

    
}

createMovieObject();
