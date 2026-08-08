import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie.id);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
            {movie.title}
          </h3>

          <p className="text-gray-300 text-xs">
            {movie.release_date?.split('-')[0]}
          </p>

          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-xs">⭐</span>

            <span className="text-white text-xs ml-1">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Play button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <motion.div
          className="bg-red-600 rounded-full p-3"
          animate={{
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Play className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;