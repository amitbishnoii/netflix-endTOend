import MovieDetails from "@/components/MovieDetails";
import PosterSection from "@/components/PosterSection";
import { getMovieDetails } from "@/services/movieApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface MovieDetailsObj {
    budget: number;
    tmdbID: number;
    genre: string[];
    homepage: string;
    originCountry: string[];
    title: string;
    overview: string;
    posterPath: string;
    productionCompanies: string[];
    releaseDate: string;
    runtime: number;
    tagLine: string;
    rating: number;
    ratingCount: number;
}

const MoviePage = () => {
    const params = useParams();
    const [movieInfo, setMovieInfo] = useState<MovieDetailsObj>();

    useEffect(() => {
        if (typeof params.movieID === "undefined") {
            return;
        }
        const fetchDetails = async () => {
            const movieInfo = await getMovieDetails(Number(params.movieID));
            setMovieInfo(movieInfo);
            document.title = movieInfo.title || "Movie";
        };

        fetchDetails();
    }, []);

    return (
        <div className="min-h-screen w-full bg-black px-4 pt-20 pb-3 text-white flex flex-col gap-10 sm:px-8 sm:pt-24 lg:flex-row lg:gap-24 lg:pl-24">
            {movieInfo ? (
                <>
                    <PosterSection posterUrl={movieInfo.posterPath} />
                    <MovieDetails
                        tmdbID={movieInfo.tmdbID}
                        title={movieInfo.title}
                        releaseDate={movieInfo.releaseDate}
                        runtime={movieInfo.runtime}
                        ratingCount={movieInfo.ratingCount}
                        rating={movieInfo.rating}
                        overview={movieInfo.overview}
                        tagLine={movieInfo.tagLine}
                        genre={movieInfo.genre}
                        homepage={movieInfo.homepage}
                        originCountry={movieInfo.originCountry}
                        budget={movieInfo.budget}
                        productionCompanies={movieInfo.productionCompanies}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MoviePage;
