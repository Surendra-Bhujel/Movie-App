import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Film,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  const genres = [
    { name: "Action", path: "/genre/action" },
    { name: "Comedy", path: "/genre/comedy" },
    { name: "Horror", path: "/genre/horror" },
    { name: "Sci-Fi", path: "/genre/sci-fi" },
    { name: "Romance", path: "/genre/romance" },
    { name: "Thriller", path: "/genre/thriller" },
    { name: "Drama", path: "/genre/drama" },
    { name: "Animation", path: "/genre/animation" },
  ];

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Movies",
      path: "/movies",
      icon: Film,
    },
    {
      name: "Releases",
      path: "/releases",
      icon: Calendar,
    },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
    setGenreOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <Film className="w-7 h-7 text-red-600" />
            <span>
              Cine<span className="text-red-600">verse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-red-600"
                      : "text-gray-300 hover:text-red-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}

            {/* Genres Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
              >
                Genres
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    genreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {genreOpen && (
                <div className="absolute top-full left-0 mt-3 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                  {genres.map((genre) => (
                    <Link
                      key={genre.path}
                      to={genre.path}
                      className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-red-500 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <Link
              to="/movies"
              className="text-gray-300 hover:text-red-500 transition-colors"
              title="Search Movies"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "text-red-600"
                      : "text-gray-300 hover:text-red-500"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? "bg-red-600/10 text-red-600"
                        : "text-gray-300 hover:bg-gray-900 hover:text-red-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Genres */}
              <div>
                <button
                  onClick={() => setGenreOpen(!genreOpen)}
                  className="w-full flex items-center justify-between px-3 py-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Film className="w-5 h-5" />
                    Genres
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      genreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {genreOpen && (
                  <div className="ml-8 mt-1 flex flex-col">
                    {genres.map((genre) => (
                      <Link
                        key={genre.path}
                        to={genre.path}
                        className="px-3 py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/movies"
                className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Search className="w-5 h-5" />
                Search Movies
              </Link>

              <div className="border-t border-gray-800 my-2" />

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-3 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="mx-3 mt-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-center font-semibold rounded-lg transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
