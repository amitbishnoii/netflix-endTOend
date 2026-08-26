import type { MovieDetailsObj } from "@/pages/MoviePage";
import { getMovieReviews } from "@/services/movieApi";
import { Star, User } from "lucide-react";
import { useEffect, useState } from "react";

type MovieDetailsProps = Omit<MovieDetailsObj, "poster_path">;
type Tab = "Overview" | "Images" | "Reviews" | "Details";

interface Reviews {
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

const MovieDetails = (props: MovieDetailsProps) => {
    const [currentTab, setCurrentTab] = useState<Tab>("Overview");
    const [reviews, setReviews] = useState<Reviews[]>([]);

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
                {(["Overview", "Reviews", "Images", "Details"] as Tab[]).map(
                    (tab) => {
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
                    },
                )}
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

            <div className="max-h-162.5 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 pr-1">
                {currentTab === "Reviews" &&
                    reviews?.map((review) => {
                        const rating = review.author_details.rating;

                        return (
                            <div
                                key={review.author_details.username}
                                className="flex gap-4 pb-6 mb-6 border-b border-white/10 last:border-none"
                            >
                                <div className="avatar w-11 h-11 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center shrink-0">
                                    {review.author_details.avatar_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                                            alt={review.author_details.username}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 text-zinc-400" />
                                    )}
                                </div>

                                <div className="content flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-white font-semibold text-sm">
                                            {review.author_details.username}
                                        </p>

                                        {rating && (
                                            <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                                <Star className="w-4 h-4 fill-yellow-400" />
                                                {rating}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-zinc-500 text-xs mt-0.5">
                                        {new Date(
                                            review.created_at,
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>

                                    <p className="text-zinc-300 text-sm leading-relaxed mt-3 line-clamp-6">
                                        {review.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div>{currentTab === "Details" && (<div>

                </div>)}</div>
        </div>
    );
};

export default MovieDetails;
