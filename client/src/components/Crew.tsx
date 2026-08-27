import type { MovieCrew } from "./MovieDetails";

const Crew = ({ movieCrew }: { movieCrew: MovieCrew[] }) => {
    return (
        <div className="max-h-162.5 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 pr-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movieCrew.map((crewMember) => {
                    const imageUrl = crewMember.profile_path
                        ? `https://image.tmdb.org/t/p/w185${crewMember.profile_path}`
                        : null;
                    return (
                        <div
                            key={crewMember.original_name + crewMember.job}
                            className="flex flex-col gap-2"
                        >
                            <div className="aspect-2/3 rounded-lg overflow-hidden bg-zinc-800">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={crewMember.original_name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <p className="text-white text-sm font-medium truncate">
                                    {crewMember.original_name}
                                </p>
                                <p className="text-zinc-500 text-xs truncate">
                                    {crewMember.job}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Crew;
