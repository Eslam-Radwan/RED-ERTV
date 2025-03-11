const apiKey = 'e96d3e0f2b1645440183370c85a0424e'

const moviesDiv = document.querySelector('.movies')
const seriesDiv = document.querySelector('.series')



async function loadHomePage()
{
    const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/top_rated'
    const popularTvList = `https://api.themoviedb.org/3/tv/top_rated`;

    getList(popularMoviesUrl,moviesDiv,true);
    getList(popularTvList,seriesDiv,false);

}
loadHomePage()

async function getList(url,div,isMovie) {
    const response = await fetch(`${url}?api_key=${apiKey}`)
    const data = await response.json();
    data.results.forEach(element => {        
        const obj = {}
        obj.title = isMovie ?element.title:element.name;
        obj.image = element.poster_path;
        obj.id = element.id;
        card = createCard(obj);
        isMovie ? card.addEventListener('click',navigateMovie):card.addEventListener('click',navigateSeries)
        div.appendChild(card)
    });

}

function createCard(obj)
{
    const card = document.createElement('div');

    const name = document.createElement('p')
    name.classList.add('card-title')
    name.classList.add('mx-auto')
    name.classList.add('p-2')
    name.textContent = obj.title;

    const image = document.createElement('img')
    image.src = `https://image.tmdb.org/t/p/w200/${obj.image}`
    image.classList.add('card-img-top')
    image.style.objectFit = 'cover'
    image.style.height = '100%'

    const imageContainer = document.createElement('div')
    imageContainer.style.width = '200px';
    imageContainer.style.height = '600px';
    imageContainer.appendChild(image);

 
    card.appendChild(imageContainer);
    card.appendChild(name);

    card.classList.add('card')
    card.classList.add('me-3')
    card.classList.add('mb-5')
    card.id = obj.id;

    card.style.width = '200px'
    card.style.height = '400px'
    card.style.cursor = 'pointer'

    return card;
}

function navigateMovie(e)
{

    location.href = `movie.html?id=${e.currentTarget.id}`
}

function navigateSeries(e)
{

    location.href = `series.html${e.currentTarget.id}`
}