import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Film } from "lucide-react";
import { motion } from "framer-motion";

import { getPopularMovies, getMovieTrailer } from "../services/movieApi";

import TrailerModal from "./TrailerModal";

const HeroSection = () => {
  const navigate = useNavigate();

  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const movies = await getPopularMovies();

        if (movies && movies.length > 0) {
          setHeroMovie(movies[0]);
        }
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroMovie();
  }, []);

  const handleViewDetails = () => {
    if (!heroMovie) return;

    navigate(`/movie/${heroMovie.id}`);
  };

  const handleWatchTrailer = async () => {
    if (!heroMovie) return;

    try {
      const trailer = await getMovieTrailer(heroMovie.id);

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer not available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Unable to load trailer.");
    }
  };

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!heroMovie) {
    return null;
  }

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden bg-black">
      {/* Background Image */}
      <motion.img
        src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
        alt={heroMovie.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{
          scale: 1.08,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      {/* Dark Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            className="max-w-2xl"
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Movie Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
            >
              {heroMovie.title}
            </motion.h1>

            {/* Movie Overview */}
            <motion.p
              className="text-gray-300 text-base md:text-lg mb-6 line-clamp-3"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
            >
              {heroMovie.overview}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
            >
              {/* View Details */}
              <motion.button
                onClick={handleViewDetails}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Film className="w-5 h-5" />
                <span>View Details</span>
              </motion.button>

              {/* Watch Trailer */}
              <motion.button
                onClick={handleWatchTrailer}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
              >
                <Play className="w-5 h-5" />
                <span>Watch Trailer</span>
              </motion.button>
            </motion.div>

            {/* Rating + Release Year */}
            <motion.div
              className="mt-6 flex items-center gap-4 text-sm text-gray-400"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.8,
              }}
            >
              <span>⭐ {heroMovie.vote_average?.toFixed(1)}/10</span>

              <span>
                🎬{" "}
                {heroMovie.release_date
                  ? new Date(heroMovie.release_date).getFullYear()
                  : "N/A"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-1 h-3 bg-red-600 rounded-full mt-2"
          />
        </div>
      </motion.div>

      {/* Trailer Modal */}
      <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
};

export default HeroSection;
