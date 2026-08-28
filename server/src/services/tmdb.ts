import axios from "axios";
import config from "../config/config.js";
import https from "https";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${config.VITE_TMDB_API_KEY}` },
    httpsAgent: new https.Agent({ family: 4, keepAlive: true }),
    timeout: 10000,
});

type ServiceResult<T> =
    | {
          success: false;
          message: string;
      }
    | {
          success: true;
          data: T;
      };

const errorRes = (error: unknown): ServiceResult<never> => {
    if (axios.isAxiosError(error)) {
        return {
            success: false,
            message: error.message,
        };
    } else {
        return {
            success: false,
            message: (error as Error).message,
        };
    }
};

export const fetchPopularMovies = async (): Promise<ServiceResult<any>> => {
    try {
        const response = await tmdbApi.get("/movie/popular");
        return { success: true, data: response.data.results };
    } catch (error) {
        return errorRes(error);
    }
};

export const fetchDetails = async (
    movieId: number,
): Promise<ServiceResult<any>> => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return errorRes(error);
    }
};

export const fetchReviews = async (
    movieId: number,
): Promise<ServiceResult<any>> => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
        return { success: true, data: response.data };
    } catch (error) {
        return errorRes(error);
    }
};

export const fetchCredits = async (
    movieId: number,
): Promise<ServiceResult<any>> => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}/credits`);
        return { success: true, data: response.data };
    } catch (error) {
        return errorRes(error);
    }
};
