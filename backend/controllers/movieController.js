import Movie from '../models/movieModel.js'

export const getAllMovies = async (req, res) =>{
    try {
        const movies = await Movie.find();
        res.status(200).json({
            message: "All Movies Generated",
            data: movies
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.find({_id:req.params.id})

        if(!movie){
            res.status(404).json({
                message: "Movie Not Found"
            })
        }
        res.status(200).json({
            message: "Movie Found Successfully",
            data: movie
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const postMovie = async (req,res) =>{
    try {
        const movie = await Movie.create(req.body);
        res.status(200).json({
            message: "Movie created successfully",
            data: movie
        })
    } catch (error) {
        console.log(error)
        
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if(!movie){
            return res.status(404).json({
                success: false,
                message: "Movie Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${movie.title} deleted successfully`,
        });
        
    } catch (error) {
    return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,

        })  
    }
}

export const updateMovie = async (req, res) => {
   try {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        return res.status(404).json({
            message:"Movie Not Found",
        })
    }

    const allowedUpdates = [
        'title', 'description', 'movieImage', 'genre', 'duration', 
        'releaseYear', 'rating', 'videoUrl', 'cast', 'director', 'language',
        'isAvailable'
    ];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).json({
            success: false,
            message: "Invalid fields provided for update",
        });
    }

    const updateMovie = await Movie.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new: true, runValidators: true});

        res.status(200).json({
            success: true,
            message: `${updateMovie.title} updated successfully`,
            data: updateMovie,
        });
    
   } catch (error) {
    console.log(error)
   }
}