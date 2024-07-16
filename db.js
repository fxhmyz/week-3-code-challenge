document.addEventListener('DOMContentLoaded', () => {
    const filmList = document.getElementById('films');
    const movieDetails = {
        poster: document.getElementById('poster'),
        title: document.getElementById('title'),
        runtime: document.getElementById('runtime'),
        showtime: document.getElementById('showtime'),
        description: document.getElementById('description'),
        availableTickets: document.getElementById('available-tickets'),
        buyButton: document.getElementById('buy-ticket')
    };

    // Fetch and display the first movie's details
    fetch('http://localhost:4000/films/1')
        .then(response => response.json())
        .then(data => displayMovieDetails(data));


    // Fetch and display the list of movies
    fetch('http://localhost:4000/films')
        .then(response => response.json())
        .then(data => displayFilmList(data));

    function displayMovieDetails(movie) {
        movieDetails.poster.src = movie.poster;
        movieDetails.title.textContent = movie.title;
        movieDetails.runtime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieDetails.showtime.textContent = `Showtime: ${movie.showtime}`;
        movieDetails.description.textContent = movie.description;
        const availableTickets = movie.capacity - movie.tickets_sold;
        movieDetails.availableTickets.textContent = Math.max(availableTickets, 0);

        movieDetails.buyButton.addEventListener("click", () => {
            if (availableTickets > 0) {
                movie.tickets_sold++;
                movieDetails.availableTickets.textContent = movie.capacity - movie.tickets_sold;
                displayMovieDetails(movie)
            } else {
                alert('Sold Out!');
            }
        })
    }

    function displayFilmList(films) {
        filmList.innerHTML = '';
        films.forEach(film => {
            const li = document.createElement('li');
            li.textContent = film.title;
            li.classList.add('film', 'item');
            li.onclick = () => fetch(`http://localhost:4000/films/${film.id}`)
                .then(response => response.json())
                .then(data => displayMovieDetails(data));
            filmList.appendChild(li);
        });
    }
});

