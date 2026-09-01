import { Star, User } from "lucide-react";
import type { ReviewsObj } from "./MovieDetails";

const Reviews = ({ movieReviews }: { movieReviews: ReviewsObj[] }) => {
    return (
        <div className="max-h-162.5 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 pr-1">
            {movieReviews?.map((review) => {
                const rating = review.author.rating;
                return (
                    <div
                        key={review.author.username}
                        className="flex gap-4 pb-6 mb-6 border-b border-white/10 last:border-none"
                    >
                        <div className="avatar w-11 h-11 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center shrink-0">
                            {review.author.avatarPath !== "_null" ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${review.author.avatarPath}`}
                                    alt={review.author.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-5 h-5 text-zinc-400" />
                            )}
                        </div>

                        <div className="content flex-1">
                            <div className="flex items-center justify-between">
                                <p className="text-white font-semibold text-sm">
                                    {review.author.username}
                                </p>

                                {rating !== 0 ? (
                                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                        <Star className="w-4 h-4 fill-yellow-400" />
                                        {rating}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                        <Star className="w-4 h-4 fill-yellow-400" />
                                        0
                                    </div>
                                )}
                            </div>

                            <p className="text-zinc-500 text-xs mt-0.5">
                                {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    },
                                )}
                            </p>

                            <p className="text-zinc-300 text-sm leading-relaxed mt-3 line-clamp-6">
                                {review.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Reviews;
