import axios, { isAxiosError } from "axios";
import config from "../config/config.js";
import https from "https";
import Movie, { type IMovie } from "../models/Movie.js";
import Review, { type MovieReview } from "../models/Reviews.js";

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
    if (isAxiosError(error)) {
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

const fetchWithRetires = async (
    movieId: number,
    retries: number = 3,
): Promise<any> => {
    try {
        console.log("trying to fetch movie on line 42");
        return await tmdbApi.get(`/movie/${movieId}`);
    } catch (error) {
        console.log("TMDB fetch failed. Retries left:", retries);

        if (axios.isAxiosError(error) && !error.response && retries > 0) {
            console.log("Retrying...");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetchWithRetires(movieId, retries - 1);
        }

        console.log("Giving up, throwing error");
        throw error;
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
): Promise<ServiceResult<IMovie>> => {
    try {
        const movieExists = await Movie.findOne({ tmdbID: movieId });
        if (movieExists) {
            return { success: true, data: movieExists };
        } else {
            console.log("movie didnt found in db so fetching from tmdb");
            try {
                const response = await fetchWithRetires(movieId);
                console.log("fetching from fetchWithRetires: ", response);
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
                const savedMovie = await Movie.create(movieData);

                return { success: true, data: savedMovie };
            } catch (error) {
                console.log("error occured at line 95");
                return errorRes(error);
            }
        }
    } catch (error) {
        return errorRes(error);
    }
};

export const fetchReviews = async (
    movieId: number,
): Promise<ServiceResult<MovieReview[]>> => {
    try {
        const reviewsExists = await Review.find({ movieID: movieId });
        if (reviewsExists.length > 0) {
            return { success: true, data: reviewsExists };
        } else {
            const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
            const reviewsToSave: MovieReview[] = response.data.results.map(
                (review) => ({
                    reviewID: review.id,
                    movieID: movieId,
                    author: {
                        name: review.author_details.name || "_null",
                        username: review.author_details.username,
                        avatarPath:
                            review.author_details.avatar_path ?? "_null",
                        rating: review.author_details.rating ?? 0,
                    },
                    content: review.content,
                    createdAt: review.created_at,
                    updatedAt: review.updated_at,
                }),
            );

            const savedReviews = await Review.insertMany(reviewsToSave);
            return { success: true, data: savedReviews };
        }
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
