'use strict';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e638000e4942632c0f66e657d8dcadb4&page=1'; //api url to popular movies
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

// localStorage.clear();
console.log(localStorage.getItem("searchTerm"));
if (localStorage.getItem("searchTerm")) {
    const movies = getMovie(SEARCH_API + localStorage.getItem("searchTerm"));
    localStorage.removeItem("searchTerm");
} else {
    //load popular movies on page load 
    const movies = getMovie(API_URL);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});

async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results);

    showMovies(data.results);
}

function showMovies(movies) {

    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>`
        movieElement.addEventListener('click', function () {
            console.log(title);
            localStorage.setItem("movieInfo", JSON.stringify(movie));
            window.location.href = "movie.html";
        });

        main.appendChild(movieElement);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}