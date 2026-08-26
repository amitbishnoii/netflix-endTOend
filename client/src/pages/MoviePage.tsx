import MovieDetails from "@/components/MovieDetails";
import PosterSection from "@/components/PosterSection";
import { getMovieDetails } from "@/services/movieApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetailsObj {
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
    };
    release_date: string;
    runtime: number;
    tagline: string;
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
            setMovieInfo(movieInfo.data);
        };

        fetchDetails();
    }, []);

    return (
        <div className="pt-24 pl-24 min-h-screen w-full bg-black text-white flex gap-24">
            <PosterSection posterUrl={movieInfo?.poster_path} />
            <MovieDetails />
        </div>
    );
};

export default MoviePage;
