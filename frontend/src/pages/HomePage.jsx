import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import { getPopularMovies, getTopRatedMovies, getActionMovies } from '../services/movieApi';

const HomePage = () => {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [trending, topRated, action] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getActionMovies()
      ]);
      
      setTrendingMovies(trending || []);
      setTopRatedMovies(topRated || []);
      setActionMovies(action || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <div className="pb-12 -mt-20 relative z-20">
        <MovieRow 
          title="🔥 Now Trending" 
          movies={trendingMovies} 
          onMovieClick={handleMovieClick}
        />
        <MovieRow 
          title="⭐ Top Rated" 
          movies={topRatedMovies} 
          onMovieClick={handleMovieClick}
        />
        <MovieRow 
          title="💥 Action Movies" 
          movies={actionMovies} 
          onMovieClick={handleMovieClick}
        />
      </div>
    </>
  );
};

export default HomePage;