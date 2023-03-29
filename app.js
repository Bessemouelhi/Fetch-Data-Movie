/*fetch('https://jsonplaceholder.typicode.com/posts/')
    .then((response) => response.json())
    .then((json) => console.log(json[0].title))
    .catch(error => console.log('fichier non trouvé : ' + error));

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/')
        const data = await response.json();
        console.log('fetchData : ');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchData();

fetch('https://jsonplaceholder.typicode.com/posts/')
    .then((response) => response.json())
    .then((json) => console.log(json[1].title))
    .catch(error => console.log('fichier non trouvé : ' + error));*/

/*const myImage = document.getElementById('myImage');
fetch('img/paldea.png')
.then(image => {
    console.log(image);
    const myImage = document.getElementById('myImage');
    myImage.src = image.url;
})*/

//https://api.themoviedb.org/3/movie/550?api_key=0b699565b0417f81c60a035ad7b3c655
//https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher 

console.log('listFilm : ', listFilm);
listFilm.map(film => 
    film.vote_average > 5  ? console.log(film.title, ' : Bon film.') : console.log(film.title, ' : Mauvais film.')
)

let form = document.getElementById('search');
console.log(form);
const input = document.getElementById('name');
const results = document.getElementById('results');
let movies = [];
const apiKey = '0b699565b0417f81c60a035ad7b3c655' 


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = input.value;
    fetchFilm(name);
})
async function fetchFilm(name) {
    try {
        const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&query=" + name)
        const data = await response.json();
        console.log('fetchData movies : ');
        movies = data.results;
        console.log(movies);
        // https://image.tmdb.org/t/p/w200${movie.poster_path}
        results.innerHTML = Object.values(data.results).map((movie, index) => `
            <div class="cards">
                <img id='' src="${movie.poster_path != null ? 'https://image.tmdb.org/t/p/w200'+movie.poster_path : 'img/sans-affiche.png'}" alt="">
                <div>
                    <h2><i>Titre</i> : ${movie.title}</h2>
                    <h3><i>Résumé</i> : ${movie.overview}</h3>
                    <h4><i>Date de sortie</i> : ${movie.release_date}</h4>
                    <h3><i>Note</i> : ${movie.vote_average} / 10 </h3>
                    <button class='popMovie' id='${index}'>Show Details</button>
                </div>
            </div>
        `).join("");

        fillPop();
    } catch (error) {
        console.error(error);
    }
}


///////////////////////////////////////////////////////MODAL///////////////////////////////////////////////////////
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let btnPop = document.getElementsByClassName('popMovie');
console.log(btnPop);
let popTitre = document.getElementById('titre');
let popOriginal = document.getElementById('original');
let popDate = document.getElementById('date');
let popOverview = document.getElementById('overview');
let popDesc = document.getElementById('description');
let popLogo = document.getElementById('logo');
let btnPrevious = document.getElementById('btnPrevious');
let btnNext = document.getElementById('btnNext');

function fillPop() {
    for (let index = 0; index < btnPop.length; index++) {
        let key = btnPop[index].id;
        //console.log(key);
        btnPop[index].addEventListener('click', (e) => {
            //console.log(key);
            //console.log(movies[key]);
            displayModal(key);
    
            //currentModalIndex = index;
        })
    }
}

function displayModal(key) {
    console.log(movies[key].titre);
        modal.style.display = "block";
        popTitre.innerText = movies[key].title;
        popOriginal.innerText = movies[key].original_title;
        popDate.innerText = movies[key].release_date;
        popOverview.innerText = movies[key].overview;
        //popDesc.innerText = movies[key].description;
        popLogo.src = 'https://image.tmdb.org/t/p/w500'+movies[key].poster_path;
        
        //console.log("currentModalIndex : " + currentModalIndex);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// fetch('https://api.themoviedb.org/3/movie/550?api_key=0b699565b0417f81c60a035ad7b3c655')
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch(error => console.log('fichier non trouvé : ' + error));

console.log('Fin du fichier !!!');