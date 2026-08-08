import { Link } from "react-router-dom";
import { Film, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const genres = [
    "Action",
    "Comedy",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Drama",
    "Animation",
  ];

  const exploreLinks = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "Releases", path: "/releases" },
  ];

  const getGenrePath = (genre) => `/genre/${genre.toLowerCase()}`;

  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-white">Cineverse</span>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Your ultimate destination for discovering movies, trailers,
              ratings, genres, and cinematic experiences.
            </p>

            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm"
              >
                Facebook
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm"
              >
                Twitter
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Explore</h3>

            <ul className="space-y-2">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Genres</h3>

            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <Link
                  key={genre}
                  to={getGenrePath(genre)}
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />

                <span className="text-gray-400 text-sm">
                  Pokhara, Gandaki Province, Nepal
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600" />

                <a
                  href="mailto:info@cineverse.com"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  info@cineverse.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />

                <a
                  href="tel:+9779856776565"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  +977 9856776565
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center mt-8">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Cineverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
