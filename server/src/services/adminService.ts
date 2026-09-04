import axios from "axios";
import config from "../config/config.js";
import type { IMovie } from "../models/Movie.js";

const adminApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${config.VITE_TMDB_API_KEY}` },
    timeout: 10000,
});

export const fetchMovieFromTMDB = async (movieId: number) => {
    try {
        const response = await adminApi.get(`/movie/${movieId}`);
        const movieData: Partial<IMovie> = {
            tmdbID: movieId,
            title: response.data.original_title,
            releaseDate: response.data.release_date,
            genre: response.data.genres.map(
                (genre: { name: string }) => genre.name,
            ),
            overview: response.data.overview,
            tagLine: response.data.tagline,
            posterPath: response.data.poster_path,
            budget: response.data.budget,
            homepage: response.data.homepage,
            originCountry: response.data.origin_country,
            productionCompanies: response.data.production_companies.map(
                (company: { name: string }) => company.name,
            ),
            runtime: response.data.runtime,
            rating: response.data.vote_average,
            ratingCount: response.data.vote_count,
        };

        return { success: true, data: movieData };
    } catch (error) {
        return { success: false, error };
    }
};
