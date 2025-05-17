
Fullstack Movie Review Website

A simple fullstack web app where users can browse popular movies and submit reviews.  
The backend uses Node.js, Express, and MongoDB. The frontend is a vanilla JS, HTML, and CSS app that fetches movie data from TMDB API and connects to the backend API for reviews.

---

Features

- Browse popular movies with posters and titles
- Search movies by name
- Submit user reviews for movies
- View all submitted reviews

---

Technologies Used

- Backend: Node.js, Express, MongoDB
- Frontend: HTML, CSS, JavaScript
- External APIs: TMDB API for movie data

---

Setup Instructions

Prerequisites

- Node.js installed
- MongoDB Atlas account or local MongoDB instance
- TMDB API key ([Get one here](https://www.themoviedb.org/documentation/api))

---

Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mateisalajan/fullstack_movie_review_website.git
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder with the following variables:

   ```
   MONGO_USERNAME=your_mongo_username
   MONGO_PASSWORD=your_mongo_password
   MONGO_URI=your_full_mongo_connection_string
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

---

Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Open `script.js` and update the API URL to point to your backend URL, e.g.:

   ```js
   const BACKEND_URL = 'https://your-backend-url.onrender.com';
   ```

3. Open `index.html` in your browser to view the app.

---

Deployment

Backend

* Deployed on [Render](https://render.com)
* URL: `https://moviereviewbackend-v3b0.onrender.com`

Frontend

* Deployed on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
* URL: `https://fullstack-movie-review-website.vercel.app/`

---

Usage

* Browse or search movies.
* Submit reviews using the review form.
* Reviews are stored in MongoDB and fetched from the backend API.

---
