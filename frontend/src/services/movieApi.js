import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// TMDB API FUNCTIONS

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const getSearchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
  );
  return await response.json();
};

export const getMovieTrailer = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  
  const trailer =
    data.results.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        video.official
    ) ||
    data.results.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube"
    ) ||
    data.results.find(
      (video) => video.site === "YouTube"
    );
  
  return trailer || null;
};

// GENRE FUNCTIONS

export const getMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const getHorrorMovies = () => getMoviesByGenre(27);
export const getSciFiMovies = () => getMoviesByGenre(878);
export const getComedyMovies = () => getMoviesByGenre(35);
export const getActionMovies = () => getMoviesByGenre(28);

// BACKEND API CONFIGURATION

export const apiRequest = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR - ADD TOKEN TO EVERY REQUEST
apiRequest.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("cineverseToken");
    
    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - HANDLE 401 ERRORS
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, clear token and user data
    if (error.response?.status === 401) {
      console.log("Unauthorized - Token may be expired");
      
      // Clear tokens and user data
      localStorage.removeItem("cineverseToken");
      localStorage.removeItem("cineverseUser");
      
      // Optional: Redirect to login page
      // window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);