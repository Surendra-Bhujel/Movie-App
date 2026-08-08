import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick }) => {
  const scrollRef = useRef(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount =
        direction === 'left'
          ? -scrollRef.current.offsetWidth
          : scrollRef.current.offsetWidth;

      scrollRef.current.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
      } = scrollRef.current;

      setShowLeftArrow(scrollLeft > 0);

      setShowRightArrow(
        scrollLeft + clientWidth < scrollWidth - 10
      );
    }
  };

  useEffect(() => {
    const current = scrollRef.current;

    if (current) {
      current.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        current.removeEventListener('scroll', handleScroll);
      };
    }
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group py-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 px-4 md:px-8">
        {title}
      </h2>

      <div className="relative">

        {showLeftArrow && isHovered && (
          <motion.button
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-r-lg"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </motion.button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 md:gap-4 px-4 md:px-8 pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              className="flex-none w-[150px] md:w-[200px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieClick}
              />
            </motion.div>
          ))}
        </div>

        {showRightArrow && isHovered && (
          <motion.button
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-l-lg"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </motion.button>
        )}

      </div>
    </motion.div>
  );
};

export default MovieRow;