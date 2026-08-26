import MovieDetails from "@/components/MovieDetails";
import PosterSection from "@/components/PosterSection";
import { getMovieDetails } from "@/services/movieApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface MovieDetailsObj {
    budget: number;
    id: number;
    genres: {
        id: string;
        name: string;
    }[];
    homepage: string;
    origin_country: string[];
    original_title: string;
    overview: string;
    poster_path: string;
    production_companies: {
        logo: string;
        name: string;
        origin_country: string;
    }[];
    release_date: string;
    runtime: number;
    tagline: string;
    vote_average: number;
    vote_count: number;
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
                    <PosterSection posterUrl={movieInfo.poster_path} />
                    <MovieDetails
                        id={movieInfo.id}
                        original_title={movieInfo.original_title}
                        release_date={movieInfo.release_date}
                        runtime={movieInfo.runtime}
                        vote_count={movieInfo.vote_count}
                        vote_average={movieInfo.vote_average}
                        overview={movieInfo.overview}
                        tagline={movieInfo.tagline}
                        genres={movieInfo.genres}
                        homepage={movieInfo.homepage}
                        origin_country={movieInfo.origin_country}
                        budget={movieInfo.budget}
                        production_companies={movieInfo.production_companies}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MoviePage;
