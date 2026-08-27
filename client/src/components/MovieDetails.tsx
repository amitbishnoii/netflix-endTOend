import type { MovieDetailsObj } from "@/pages/MoviePage";
import { getMovieCredits, getMovieReviews } from "@/services/movieApi";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import Cast from "./Cast";
import Crew from "./Crew";

type Tab = "Overview" | "Images" | "Reviews" | "Cast" | "Crew";

export interface MovieCast {
    original_name: string;
    character: string;
    profile_path: string;
}

export interface MovieCrew {
    original_name: string;
    job: string;
    profile_path: string;
}

export interface ReviewsObj {
    author_details: {
        avatar_path: string;
        name: string;
        username: string;
        rating: string;
    };
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
}

const MovieDetails = (props: Omit<MovieDetailsObj, "poster_path">) => {
    const [currentTab, setCurrentTab] = useState<Tab>("Overview");
    const [reviews, setReviews] = useState<ReviewsObj[]>([]);
    const [movieCast, setMovieCast] = useState<MovieCast[]>([]);
    const [movieCrew, setMovieCrew] = useState<MovieCrew[]>([]);

    const hours = Math.floor(props.runtime / 60);
    const minutes = props.runtime % 60;

    useEffect(() => {
        if (currentTab === "Reviews" && reviews?.length === 0) {
            const fetchReviews = async () => {
                const movieReviews = await getMovieReviews(props.id);
                setReviews(movieReviews);
            };
            fetchReviews();
        }
        if (currentTab === "Cast" && movieCast.length === 0) {
            const fetchCredits = async () => {
                const movieCredits = await getMovieCredits(props.id);
                const trimmedCast: MovieCast[] = movieCredits.data.cast.map(
                    (person: {
                        original_name: string;
                        character: string;
                        profile_path: string;
                        [key: string]: unknown;
                    }) => ({
                        original_name: person.original_name,
                        character: person.character,
                        profile_path: person.profile_path,
                    }),
                );
                const trimmedCrew: MovieCrew[] = movieCredits.data.crew.map(
                    (person: {
                        original_name: string;
                        job: string;
                        profile_path: string;
                        [key: string]: unknown;
                    }) => ({
                        original_name: person.original_name,
                        job: person.job,
                        profile_path: person.profile_path,
                    }),
                );
                setMovieCast(trimmedCast);
                setMovieCrew(trimmedCrew);
            };
            fetchCredits();
        }
    }, [currentTab]);

    const formatBudget = (amount: number): string => {
        if (!amount || amount === 0) return "Not disclosed";

        if (amount >= 1_000_000_000) {
            return `$${(amount / 1_000_000_000).toFixed(1)}B`;
        }
        if (amount >= 1_000_000) {
            return `$${(amount / 1_000_000).toFixed(1)}M`;
        }
        if (amount >= 1_000) {
            return `$${(amount / 1_000).toFixed(1)}K`;
        }
        return `$${amount}`;
    };

    return (
        <div className="main w-full pr-20 flex flex-col">
            <div className="title flex justify-between mb-11">
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl">{props.original_title}</h1>
                    <span className="text-[14px] text-gray-500 ml-2">
                        {props.release_date?.slice(0, 4)} &nbsp;&nbsp; |
                        &nbsp;&nbsp; {hours}h {minutes}
                        min &nbsp;&nbsp; | &nbsp;&nbsp; {props.vote_count}{" "}
                        Ratings
                    </span>
                </div>

                <div className="flex items-center flex-col gap-1 mt-2">
                    <div className="flex items-center gap-1">
                        <span className="text-4xl">
                            {props.vote_average.toFixed(1)}
                        </span>
                        <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            </div>

            <div className="flex gap-8 border-b-2 border-white/20 mb-3">
                {(
                    ["Overview", "Reviews", "Images", "Cast", "Crew"] as Tab[]
                ).map((tab) => {
                    return (
                        <button
                            key={tab}
                            onClick={() => setCurrentTab(tab)}
                            className={`cursor-pointer pb-3 text-sm font-medium transition-colors ${
                                currentTab === tab
                                    ? "text-white border-b-2 border-white"
                                    : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {currentTab === "Overview" && (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-semibold text-xl italic">
                            {props.tagline}
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            {props.overview}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {props.genres.map((genre) => (
                            <span
                                key={genre.name}
                                className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-zinc-800 pt-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-zinc-500 text-xs uppercase tracking-wide">
                                Visit
                            </span>
                            <a
                                className="text-white text-sm underline underline-offset-2 hover:text-zinc-300 transition-colors truncate"
                                href={props.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {props.original_title}
                            </a>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-zinc-500 text-xs uppercase tracking-wide">
                                Budget
                            </span>
                            <span className="text-white text-sm">
                                {formatBudget(props.budget)}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-zinc-500 text-xs uppercase tracking-wide">
                                Country of Origin
                            </span>
                            <span className="text-white text-sm">
                                {props.origin_country.join(", ")}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 col-span-2 sm:col-span-3">
                            <span className="text-zinc-500 text-xs uppercase tracking-wide">
                                Production
                            </span>
                            <span className="text-white text-sm">
                                {props.production_companies
                                    .map(
                                        (comp) =>
                                            `${comp.name} (${comp.origin_country})`,
                                    )
                                    .join(", ")}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {currentTab === "Reviews" && <Reviews movieReviews={reviews} />}
            {currentTab === "Cast" && <Cast movieCast={movieCast} />}
            {currentTab === "Crew" && <Crew movieCrew={movieCrew} />}
        </div>
    );
};

export default MovieDetails;
