import axios from "axios";
import config from "../config/config.js";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${config.VITE_TMDB_API_KEY}` },
});

export const getPopularMovies = async () => {
    const response = await tmdbApi.get("/movie/popular");
    return response.data.results;
};

export const searchMovie = async (query: string) => {
    const response = await tmdbApi.get("search/movie", { params: { query } });
    console.log("response of search movie: ", response);
};
