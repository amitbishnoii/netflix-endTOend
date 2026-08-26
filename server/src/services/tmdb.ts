import axios from "axios";
import config from "../config/config.js";
import https from "https";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${config.VITE_TMDB_API_KEY}` },
    httpsAgent: new https.Agent({ family: 4, keepAlive: true }),
    timeout: 10000,
});

export const fetchPopularMovies = async () => {
    try {
        const response = await tmdbApi.get("/movie/popular");
        return { success: true, data: response.data.results };
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
                axiosError: false,
                message: error instanceof Error ? error.message : error,
            };
        }
    }
};

export const fetchDetails = async (movieId: number) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return { success: true, data: response.data };
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
                axiosError: false,
                message: error instanceof Error ? error.message : error,
            };
        }
    }
};

export const fetchReviews = async (movieId: number) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
        return { success: true, data: response.data };
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
                axiosError: false,
                message: error instanceof Error ? error.message : error,
            };
        }
    }
};
