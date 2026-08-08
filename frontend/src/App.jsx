import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ReleasesPage from "./pages/ReleasesPage";
import GenrePage from "./pages/GenrePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MoviePage />} />

          <Route path="/movie/:id" element={<MovieDetailsPage />} />

          <Route path="/releases" element={<ReleasesPage />} />

          <Route path="/genre/:genreName" element={<GenrePage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
