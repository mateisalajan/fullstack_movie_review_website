const APILINK =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=35f28433a3c91d03793cc51b97a3eb1d&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=35f28433a3c91d03793cc51b97a3eb1d&query=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

// Load popular movies on start
returnMovies(APILINK);

async function returnMovies(url) {
  main.innerHTML = ''; // Clear previous results
  const res = await fetch(url);
  const data = await res.json();

  data.results.forEach(async (element) => {
    const div_card = document.createElement('div');
    div_card.setAttribute('class', 'card');

    const title = document.createElement('h3');
    title.textContent = element.title;

    const center = document.createElement('div');
    center.style.textAlign = 'center';

    const image = document.createElement('img');
    image.setAttribute('class', 'thumbnail');
    image.src = IMG_PATH + element.poster_path;
    image.alt = element.title;

    center.appendChild(image);
    div_card.appendChild(center);
    div_card.appendChild(title);

    // Create review form
    const reviewForm = document.createElement('form');
    reviewForm.classList.add('review-form');
    reviewForm.innerHTML = `
      <input type="text" name="user" placeholder="Your name" required />
      <textarea name="review" placeholder="Your review" required></textarea>
      <button type="submit">Submit Review</button>
    `;

    // Submit review handler
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(reviewForm);
      const user = formData.get('user');
      const review = formData.get('review');
      const movieId = element.id; // TMDB movie ID

      try {
        const response = await fetch('http://localhost:8002/api/v1/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movieId, user, review }),
        });
        const result = await response.json();
        alert(result.message || 'Review submitted!');
        reviewForm.reset();
        // Optionally, fetch and update reviews display here
        await loadReviews(movieId, div_card);
      } catch (err) {
        alert('Error submitting review.');
      }
    });

    div_card.appendChild(reviewForm);

    // Load existing reviews for this movie
    await loadReviews(element.id, div_card);

    main.appendChild(div_card);
  });
}

async function loadReviews(movieId, container) {
  // Remove existing reviews displayed before loading new
  const existingReviews = container.querySelectorAll('.review-text');
  existingReviews.forEach((el) => el.remove());

  try {
    const res = await fetch('http://localhost:8002/api/v1/reviews');
    const reviews = await res.json();
    const movieReviews = reviews.filter(
      (r) => r.movieId === movieId.toString()
    );

    movieReviews.forEach((r) => {
      const reviewText = document.createElement('p');
      reviewText.classList.add('review-text');
      reviewText.textContent = `${r.user}: ${r.review}`;
      container.appendChild(reviewText);
    });
  } catch {
    // silently fail or show message if you want
  }
}

// Handle search submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchItem = search.value.trim();
  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = '';
  }
});
