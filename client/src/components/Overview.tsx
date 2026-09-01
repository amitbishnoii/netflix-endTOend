const Overview = (props: {
    tagLine: string;
    overview: string;
    genre: string[];
    homepage: string;
    title: string;
    budget: number;
    originCountry: string[];
    productionCompanies: string[];
}) => {
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
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <p className="text-white font-semibold text-xl italic">
                    {props.tagLine}
                </p>
                <p className="text-zinc-400 leading-relaxed">
                    {props.overview}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {props.genre.map((genre) => (
                    <span
                        key={genre}
                        className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700"
                    >
                        {genre}
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
                        {props.title}
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
                        {props.originCountry.join(", ")}
                    </span>
                </div>

                <div className="flex flex-col gap-1 col-span-2 sm:col-span-3">
                    <span className="text-zinc-500 text-xs uppercase tracking-wide">
                        Production
                    </span>
                    <span className="text-white text-sm">
                        {props.productionCompanies
                            .map((comp) => `${comp}`)
                            .join(", ")}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Overview;
