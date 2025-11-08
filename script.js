const inputTake = document.getElementById('input');
const searchBtn = document.getElementById('search');
const movieCard = document.getElementById('movie-card');

const apiKey = 'd8acf989';
const apiUrl =  `https://www.omdbapi.com/?apikey=`;

async function movieName(movie) {
  const api = await fetch(apiUrl + `${apiKey}&s=` + movie);
  const data = await api.json();

  movieCard.innerHTML = '';

  if (data.Response === "True") {
   data.Search.forEach(movieItem => {
      const html = `
        <div class="bg-slate-700 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img 
            src="${movieItem.Poster !== 'N/A' ? movieItem.Poster : 'https://via.placeholder.com/150'}"
            alt="${movieItem.Title}" 
            class="w-full h-70 object-cover"
          >
          <div class="p-4">
            <h2 class="text-2xl font-semibold mb-2">${movieItem.Title}</h2>
            <p class="text-gray-300">Released: <span class="text-white">${movieItem.Year}</span></p> 
            <p class="text-gray-300 mb-4">Type: <span class="text-white">${movieItem.Type}</span></p>
            <a 
              href="#" 
              class="inline-block bg-blue-600 text-white px-4 py-2 rounded pointer hover:bg-blue-700 transition-colors duration-200" id="review-link"
            >
              Read Reviews
            </a>
          </div>
        </div>
      `;
      movieCard.innerHTML += html;
    });
  } else {
    movieCard.innerHTML = "<p class='text-white text-lg'>Movie not found!</p>";
  } 
}

searchBtn.addEventListener('click', () => {
  movieName(inputTake.value);
});

inputTake.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    movieName(inputTake.value);
  }
});

