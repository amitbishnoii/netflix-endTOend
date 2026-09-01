const PageSkeleton = () => {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-zinc-700 border-t-white rounded-full animate-spin" />
        </div>
    );
};

export default PageSkeleton;
