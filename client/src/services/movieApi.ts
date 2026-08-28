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
    return movieReviews.data.data.results;
};

export const getMovieCredits = async (movieID: number) => {
    const movieCredits = await movieApi.get(`/movieCredits/${movieID}`);
    return movieCredits.data;
};
