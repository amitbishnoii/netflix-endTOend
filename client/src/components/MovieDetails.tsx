import type { MovieDetailsObj } from "@/pages/MoviePage";
import { Star } from "lucide-react";
import { useState } from "react";

type MovieDetailsProps = Omit<MovieDetailsObj, "poster_path">;

type Tab = "Overview" | "Images" | "Reviews" | "Details";

const MovieDetails = (props: MovieDetailsProps) => {
    const [currentTab, setCurrentTab] = useState<Tab>("Overview");

    const hours = Math.floor(props.runtime / 60);
    const minutes = props.runtime % 60;

    return (
        <div className="main w-full pr-20 flex flex-col">
            <div className="title flex justify-between mb-11">
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl">{props.original_title}</h1>
                    <span className="text-[14px] text-gray-500 ml-2">
                        {props.release_date?.slice(0, 4)} | {hours}h {minutes}
                        min | {props.vote_count} Ratings
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
                <div className="flex flex-col gap-4">
                    <p className="text-white font-semibold text-xl italic">
                        {props.tagline}
                    </p>

                    <p className="text-zinc-400 leading-relaxed">
                        {props.overview}
                    </p>

                    <p className="text-zinc-500 text-sm">
                        Genre:{" "}
                        <span className="text-white">
                            {props.genres.map((genre) => genre.name).join(", ")}
                        </span>
                    </p>

                    <p className="text-zinc-500 text-sm">
                        Visit:{" "}
                        <a
                            className="text-white underline underline-offset-2 hover:text-zinc-300 transition-colors"
                            href={props.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {props.original_title}
                        </a>
                    </p>
                </div>
            )}

            {currentTab === "Reviews"}
        </div>
    );
};

export default MovieDetails;
