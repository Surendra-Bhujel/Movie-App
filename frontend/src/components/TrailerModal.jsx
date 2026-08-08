import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TrailerModal = ({ videoKey, onClose }) => {
  if (!videoKey) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl aspect-video"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            duration: 0.3,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* YouTube Trailer */}
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TrailerModal;
