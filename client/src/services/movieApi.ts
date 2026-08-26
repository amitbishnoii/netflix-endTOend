import axios from "axios";

const movieApi = axios.create({
    baseURL: "http://localhost:3000/api/movies",
});

export const getPopularMovies = async () => {
    const data = await movieApi.get("/popularMovies");
    return data;
};

export const getMovieDetails = async (movieID: number) => {
    const data = await movieApi.get(`/movieDetails/${movieID}`);
    return data.data;
};
