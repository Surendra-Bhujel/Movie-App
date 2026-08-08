# 🎬 Movie-App

A full-stack movie discovery and management application built with modern web technologies. Browse movies, manage your watchlist, and explore detailed information about your favorite films.

## ✨ Features

- 🎞️ **Movie Discovery** - Browse and search through a vast collection of movies
- 🔐 **User Authentication** - Secure login and registration with JWT
- ⭐ **Watchlist Management** - Add/remove movies to your personal watchlist
- 🎨 **Responsive Design** - Beautiful UI that works seamlessly on all devices
- 🚀 **Fast Performance** - Optimized frontend with Vite bundler
- 📱 **Modern Stack** - Built with React, Express, and MongoDB

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library for building dynamic interfaces
- **Vite** - Next-generation build tool for blazingly fast development
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router v7** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library
- **Motion** - Animation library for smooth transitions

### Backend
- **Node.js** - JavaScript runtime for server-side logic
- **Express.js** - Lightweight web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **Bcrypt** - Password hashing for security
- **CORS** - Cross-origin request handling
- **Cookie Parser** - Session management

### Development Tools
- **Nodemon** - Auto-restart server during development
- **ESLint** - Code quality and style checking
- **Vite** - Lightning-fast build tool

---

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- MongoDB (local or cloud instance)
- API key for movie data (if using external API)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Surendra-Bhujel/Movie-App.git
cd Movie-App
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and configure
cp .env.example .env
# Add your MongoDB URI and other configurations

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Configure API endpoint and other settings

# Start development server
npm run dev

# App runs on http://localhost:5173
```

---

## 📁 Project Structure

```
Movie-App/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication & validation
│   ├── controllers/      # Business logic
│   ├── app.js           # Express server setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context API state
│   │   ├── hooks/        # Custom hooks
│   │   ├── styles/       # Tailwind CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/           # Static assets
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Movies
- `GET /api/movies` - Get all movies with pagination
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/search?query=...` - Search movies

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist/:movieId` - Add to watchlist
- `DELETE /api/watchlist/:movieId` - Remove from watchlist

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 Available Scripts

### Backend
```bash
npm start      # Run production server
npm run dev    # Run with nodemon (auto-restart)
```

### Frontend
```bash
npm run dev    # Start Vite development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

---

## 🎯 Key Features Explained

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Session management with cookies

### Movie Management
- Efficient database queries with MongoDB
- Pagination for large datasets
- Search and filter capabilities
- Detailed movie information display

### User Experience
- Smooth animations and transitions
- Responsive design for mobile, tablet, desktop
- Fast load times with Vite optimization
- Intuitive navigation with React Router

---

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test
```

---

## 🔄 Performance Optimizations

- **Code Splitting** - Lazy loading of routes and components
- **Image Optimization** - Efficient image loading and caching
- **API Optimization** - Pagination, filtering, and search
- **Bundle Size** - Optimized dependencies and minification
- **Caching** - Browser and server-side caching strategies

---

## 🐛 Known Issues & Future Improvements

- [ ] Add movie ratings and reviews
- [ ] Implement recommendation algorithm
- [ ] Add social features (follow friends, share lists)
- [ ] Mobile app using React Native
- [ ] Advanced filtering and sorting options
- [ ] Unit and integration tests
- [ ] CI/CD pipeline with GitHub Actions

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate documentation.

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👤 Author

**Surendra Bhujel**
- GitHub: [@Surendra-Bhujel](https://github.com/Surendra-Bhujel)

---

## 💬 Support & Questions

If you have questions or run into issues:
1. Check existing [GitHub Issues](https://github.com/Surendra-Bhujel/Movie-App/issues)
2. Create a new issue with detailed description
3. Include relevant code snippets and error messages

---

## 🎉 Acknowledgments

- Thanks to all open-source library maintainers
- Movie data provided by [API Source]
- Inspired by modern web development practices

---

<div align="center">

**[⬆ back to top](#-movie-app)**

Stars ⭐ and forks are appreciated!

</div>
