const PageSkeleton = () => {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                <span className="w-3 h-3 rounded-full bg-white animate-bounce" />
            </div>
            <p className="text-sm text-zinc-500 font-medium tracking-wide">
                Loading
            </p>
        </div>
    );
};

export default PageSkeleton;
