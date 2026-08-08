import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Star, Calendar, Clock, Play } from "lucide-react";

import { motion } from "framer-motion";

import { getMovieDetails } from "../services/movieApi";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovieDetails(id);

        if (!data || data.success === false) {
          throw new Error("Movie not found");
        }

        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const handleWatchTrailer = () => {
    if (!movie) return;

    const searchQuery = encodeURIComponent(`${movie.title} official trailer`);

    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
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

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-2xl font-bold text-white mb-6"
        >
          {error || "Movie not found"}
        </motion.h2>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Go Back Home
        </motion.button>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;

  const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="relative h-[450px] md:h-[550px] overflow-hidden"
      >
        {backdropUrl ? (
          <motion.img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{
              scale: 1.08,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 z-10 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto md:mx-0 flex-shrink-0"
          >
            {posterUrl ? (
              <motion.img
                whileHover={{
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                }}
                src={posterUrl}
                alt={movie.title}
                className="w-48 md:w-64 rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-48 md:w-64 h-72 bg-gray-900 rounded-lg flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </motion.div>

          {/* Movie Details */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="flex-1"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-gray-400 italic mb-4">"{movie.tagline}"</p>
            )}

            {/* Movie Information */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />

                <span>{movie.vote_average?.toFixed(1)}/10</span>

                <span className="text-gray-400">
                  ({movie.vote_count || 0} votes)
                </span>
              </div>

              {/* Release Date */}
              {movie.release_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5 text-gray-400" />

                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              )}

              {/* Runtime */}
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-400" />

                  <span>
                    {runtimeHours}h {runtimeMinutes}m
                  </span>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <motion.span
                    key={genre.id}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors"
                  >
                    {genre.name}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Overview</h2>

              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Watch Trailer */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handleWatchTrailer}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 font-semibold rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </motion.button>

              {/* Back */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 font-semibold rounded-lg border border-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {movie.credits?.cast?.length > 0 && (
          <div className="mt-16 pb-16">
            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-2xl font-bold mb-6"
            >
              Top Cast
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.credits.cast.slice(0, 6).map((actor, index) => (
                <motion.div
                  key={actor.cast_id || actor.credit_id || actor.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="text-center"
                >
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-900 rounded-lg mb-2 flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}

                  <p className="font-semibold text-sm">{actor.name}</p>

                  <p className="text-gray-400 text-xs mt-1">
                    {actor.character}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
