import express from 'express'
import { getAllMovies, getMovieById, postMovie, deleteMovie, updateMovie } from "../controllers/movieController";
import { verifyToken } from "../middleware/verifyToken";


// router.get('/', verifyToken, getAllMovies)
// router.get('/:id', verifyToken, getMovieById)
// router.post('/', verifyToken, postMovie)
// router.delete("/:id", verifyToken, deleteMovie);
// router.put("/:id", verifyToken, updateMovie);


export default router;