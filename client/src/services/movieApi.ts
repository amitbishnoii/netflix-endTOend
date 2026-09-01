import axios from "axios";

const movieApi = axios.create({
    baseURL: "http://localhost:3000/api/movies",
});

export const getPopularMovies = async () => {
    const popularMovies = await movieApi.get("/popularMovies");
    return popularMovies.data.movies.data;
};

export const getMovieDetails = async (movieID: number) => {
    const movieDetails = await movieApi.get(`/movieDetails/${movieID}`);
    return movieDetails.data.data.data;
};

export const getMovieReviews = async (movieID: number) => {
    const movieReviews = await movieApi.get(`/reviews/${movieID}`);
    if (movieReviews.data.data.length === 0) {
        return "No Reviews";
    }
    return movieReviews.data.data;
};
