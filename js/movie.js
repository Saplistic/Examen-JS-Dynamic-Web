const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(search.value);
    localStorage.setItem("searchTerm", search.value);
    window.location.href = "index.html";
});
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

function displayMovie() {
    const movie = JSON.parse(localStorage.getItem('movieInfo'));
    const { title, poster_path, vote_average, overview } = movie;

    document.getElementById("movieCover").src = IMG_PATH + poster_path;
    document.getElementById("moviePageTitle").innerText = title;
    document.getElementById("rating").innerText = vote_average;
    document.getElementById("moviePageOverview").innerText = overview;

    const stars = document.getElementById("star-rating").children;

    for (i = 0; i < Math.round(vote_average); i++) {
        stars[i].src = "image/star.png";
    }

}   