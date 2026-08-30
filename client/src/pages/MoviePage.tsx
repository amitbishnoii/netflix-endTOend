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
        };

        fetchDetails();
    }, []);

    return (
        <div className="pt-24 pl-24 min-h-screen w-full bg-black text-white flex gap-24">
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
