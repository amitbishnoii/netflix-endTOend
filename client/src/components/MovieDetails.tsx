import type { MovieDetailsObj } from "@/pages/MoviePage";
import { getMovieReviews } from "@/services/movieApi";
import { ArrowRight, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";
import Overview from "./Overview";
import { useAuth } from "@/hooks/useAuth";
import { addFavourite } from "@/services/userApi";

type Tab = "Overview" | "Reviews";

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
    author: {
        avatarPath: string;
        name: string;
        username: string;
        rating: number;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
}

const MovieDetails = (props: Omit<MovieDetailsObj, "posterPath">) => {
    const [currentTab, setCurrentTab] = useState<Tab>("Overview");
    const [reviews, setReviews] = useState<ReviewsObj[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsNull, setReviewsNull] = useState(false);
    const [favouriteOrNot, setFavouriteOrNot] = useState(false);

    const hours = Math.floor(props.runtime / 60);
    const minutes = props.runtime % 60;
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (currentTab === "Reviews" && reviews?.length === 0) {
            const fetchReviews = async () => {
                setReviewsLoading(true);
                const movieReviews = await getMovieReviews(props.tmdbID);
                if (movieReviews === "No Reviews") {
                    setReviewsNull(true);
                    setReviewsLoading(false);
                } else {
                    setReviews(movieReviews);
                    setReviewsLoading(false);
                }
            };
            fetchReviews();
        }
    }, [currentTab]);

    const handleFavourites = async () => {
        try {
            if (!user) {
                return;
            }
            const added = await addFavourite(
                props.tmdbID,
                user?.username,
                user?.accessToken,
            );
            setFavouriteOrNot(added);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main w-full pr-20 flex flex-col">
            <div className="title flex justify-between mb-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl">{props.title}</h1>
                    <span className="text-[14px] text-gray-500 ml-2">
                        {props.releaseDate?.slice(0, 4)} &nbsp;&nbsp; |
                        &nbsp;&nbsp; {hours}h {minutes}
                        min &nbsp;&nbsp; | &nbsp;&nbsp; {props.ratingCount}{" "}
                        Ratings
                    </span>
                </div>

                <div className="flex items-center flex-col gap-1 mt-2">
                    <div className="flex items-center gap-1">
                        <span className="text-4xl">
                            {props.rating.toFixed(1)}
                        </span>
                        <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mb-5">
                <div
                    className="
            w-40 h-12 bg-white text-black rounded-xl
            flex justify-center items-center gap-2
            font-bold group
            transition-all duration-300 ease-out
            hover:w-44 hover:shadow-lg cursor-pointer hover:bg-gray-300
        "
                >
                    <button
                        onClick={() => navigate(`/stream/${props.tmdbID}`)}
                        className="cursor-pointer"
                    >
                        Watch for Free
                    </button>
                    <span
                        className="
                opacity-0 -translate-x-2
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-300 cursor-pointer
            "
                    >
                        <ArrowRight size={20} />
                    </span>
                </div>

                <button
                    onClick={handleFavourites}
                    className={`
            w-12 h-12 rounded-xl flex justify-center items-center
            border transition-all duration-300 ease-out cursor-pointer
            ${
                favouriteOrNot
                    ? "bg-white/10 border-white/40 text-red-500"
                    : "bg-transparent border-white/20 text-white hover:border-white/40 hover:bg-white/5"
            }
        `}
                >
                    <Heart
                        size={20}
                        className={
                            favouriteOrNot ? "fill-red-500" : "fill-none"
                        }
                    />
                </button>
            </div>

            <div className="flex gap-8 border-b-2 border-white/20 mb-3">
                {(["Overview", "Reviews"] as Tab[]).map((tab) => {
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
                <Overview
                    title={props.title}
                    overview={props.overview}
                    originCountry={props.originCountry}
                    productionCompanies={props.originCountry}
                    budget={props.budget}
                    homepage={props.homepage}
                    tagLine={props.tagLine}
                    genre={props.genre}
                />
            )}

            {currentTab === "Reviews" &&
                (reviewsLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 space-y-2.5"
                            >
                                <div className="relative h-4 w-1/4 rounded-md bg-gray-700 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-gray-500/40 to-transparent" />
                                </div>
                                <div className="relative h-3 w-full rounded-md bg-gray-700 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-gray-500/40 to-transparent" />
                                </div>
                                <div className="relative h-3 w-3/4 rounded-md bg-gray-700 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-gray-500/40 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : reviewsNull ? (
                    <div>No Reviews!</div>
                ) : (
                    <Reviews movieReviews={reviews} />
                ))}
        </div>
    );
};

export default MovieDetails;
