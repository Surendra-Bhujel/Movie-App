import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { getUpcomingMovies } from '../services/movieApi';

const ReleasesPage = () => {
  const navigate = useNavigate();

  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    setLoading(true);

    try {
      const upcoming = await getUpcomingMovies();
      setReleases(upcoming || []);
    } catch (error) {
      console.error('Error fetching releases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMovies = () => {
    const today = new Date();

    const thisWeek = new Date(today);
    thisWeek.setDate(today.getDate() + 7);

    const thisMonth = new Date(today);
    thisMonth.setMonth(today.getMonth() + 1);

    return releases.filter((movie) => {
      const releaseDate = new Date(movie.release_date);

      if (filter === 'upcoming') {
        return releaseDate > today;
      }

      if (filter === 'this-week') {
        return releaseDate <= thisWeek && releaseDate > today;
      }

      if (filter === 'this-month') {
        return releaseDate <= thisMonth && releaseDate > today;
      }

      return true;
    });
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="min-h-screen bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Coming Soon
          </h1>

          <p className="text-gray-400 mt-2">
            Upcoming movies and recent releases
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            ['upcoming', 'Upcoming'],
            ['this-week', 'This Week'],
            ['this-month', 'This Month'],
          ].map(([value, label]) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(value)}
              className={`px-6 py-2 rounded-lg font-semibold ${
                filter === value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {!loading && (
          <p className="text-gray-400 mb-6">
            {filteredMovies.length} movies found
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Movies */}
        {!loading && filteredMovies.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMovies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-600 transition-colors"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                        : 'https://via.placeholder.com/185x278?text=No+Image'
                    }
                    alt={movie.title}
                    className="w-24 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white line-clamp-2">
                      {movie.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />

                        <span className="text-gray-400">
                          {new Date(
                            movie.release_date
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />

                        <span className="text-white">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                      {movie.overview}
                    </p>

                    <span className="inline-block mt-3 px-2 py-1 bg-red-600/20 text-red-600 text-xs rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No results */}
        {!loading && filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Calendar className="w-20 h-20 text-gray-600 mx-auto mb-4" />

            <p className="text-gray-400 text-lg">
              No upcoming releases found
            </p>

            <button
              onClick={() => setFilter('upcoming')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              View All Upcoming
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReleasesPage;