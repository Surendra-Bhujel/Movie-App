import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, getSearchMovies } from '../services/movieApi';

const MoviesPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchPopularMovies();
      return;
    }

    setIsSearching(true);
    setLoading(true);
    try {
      const results = await getSearchMovies(searchQuery);
      setMovies(results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Movies</h1>
          <div className="w-24 h-1 bg-red-600 rounded-full"></div>
          <p className="text-gray-400 mt-4">Explore our collection of movies</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </form>

        {!loading && (
          <div className="mb-6">
            <p className="text-gray-400">
              {isSearching ? `Search results for "${searchQuery}"` : 'Popular Movies'}
              <span className="ml-2 text-red-600">{movies.length} movies found</span>
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div className="text-center py-20">
            <Film className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No movies found</p>
            {searchQuery && (
              <button
                onClick={fetchPopularMovies}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Show Popular Movies
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;