import express from 'express'
import { deleteMovie, getAllMovies, getMovieById, postMovie, updateMovie } from '../controllers/movieController.js';

const router = express.Router();

router.get('/',getAllMovies);
router.get('/:id', getMovieById);
router.post('/', postMovie);
router.delete('/:id', deleteMovie);
router.put('/:id', updateMovie);

export default router;
