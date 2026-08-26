import axios from "axios";
import config from "../config/config.js";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${config.VITE_TMDB_API_KEY}` },
});

export const getPopularMovies = async () => {
    try {
        const response = await tmdbApi.get("/movie/popular");
        return response.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.message,
                code: error.code,
                url: error.config?.url,
            };
        } else {
            return {
                success: false,
                message: error instanceof Error ? error.message : error,
            };
        }
    }
};

export const getDetails = async (movieId: number) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.message,
                code: error.code,
                url: error.config?.url,
            };
        } else {
            return {
                success: false,
                message: error instanceof Error ? error.message : error,
            };
        }
    }
};
