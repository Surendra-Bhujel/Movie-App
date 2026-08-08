import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMoviesByGenre } from '../services/movieApi'; 
import { genreMap } from '../services/genreMap'; 

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const GenrePage = () => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      const genreId = genreMap[genreName?.toLowerCase()];

      if (!genreId) {
        setError('Unknown genre');
        setLoading(false);
        return;
      }

      try {
        const results = await getMoviesByGenre(genreId);
        setMovies(results);
      } catch (err) {
        console.error(err);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreName]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen text-white">
        Loading {genreName} movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">
        {genreName} Movies
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies found for this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="group"
            >
              <div className="rounded-lg overflow-hidden bg-gray-900">
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="text-white text-sm mt-2 truncate">{movie.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;