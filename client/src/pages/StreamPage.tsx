import Hls from "hls.js";
import {
    ArrowLeft,
    Maximize,
    Minimize,
    Pause,
    Play,
    Volume1,
    Volume2,
    VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StreamPage = () => {    
    const { movieName } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [levels, setLevels] = useState<
        { height: number; levelIndex: number }[]
    >([]);
    const [currentQuality, setCurrentQuality] = useState<number | undefined>(
        -1,
    );
    const [showControls, setShowControls] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const streamURL = "http://localhost:3000/api/movies/master";
    const navigate = useNavigate();

    useEffect(() => {
        if (!videoRef.current) return;
        const hls = new Hls();

        hlsRef.current = hls;

        hls.loadSource(streamURL);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            const qualities = hls.levels.map((level, index) => {
                return {
                    height: level.height,
                    levelIndex: index,
                };
            });
            setLevels(qualities);
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, () => {
            setCurrentQuality(hlsRef.current?.currentLevel);
        });

        hls.on(Hls.Events.ERROR, (_, err) => {
            if (!err.fatal) {
                return;
            }

            switch (err.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    console.log("Network error, trying to fix....");
                    hls.startLoad();
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log("Media error, trying to recover....");
                    hls.recoverMediaError();
                    break;
                default:
                    console.log("destroying hls player...");
                    hls.destroy();
                    setErrorState(true);
                    break;
            }
        });

        return () => {
            hls.destroy();
        };
    }, []);

    const qualitySwitch = (levelIndex: number) => {
        if (!hlsRef.current) {
            return;
        }
        hlsRef.current.currentLevel = levelIndex;
    };

    const togglePlay = () => {
        if (!videoRef.current) {
            return;
        }
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;
        }

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }

    const progressPct = duration ? (elapsedTime / duration) * 100 : 0;

    return (
        <div
            className="bg-black min-h-screen flex flex-col relative group overflow-hidden select-none"
            onMouseOver={() => setShowControls(true)}
            onMouseOut={() => setShowControls(false)}
        >
            <button
                onClick={() => navigate(-1)}
                className={`absolute top-5 left-5 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-xl
        bg-black/30 backdrop-blur-md border border-white/10
        text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20
        shadow-lg shadow-black/20
        transition-all duration-300 ease-out cursor-pointer
        ${
            showControls
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
            >
                <ArrowLeft size={18} strokeWidth={2} />
                <span className="text-sm font-medium">Back</span>
            </button>

            <h1
                className={`absolute top-6 left-1/2 -translate-x-1/2 z-20
        max-w-[60%] truncate
        text-white/90 text-3xl font-medium tracking-wide
        drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
        transition-all duration-300
        ${
            showControls
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
        }`}
            >
                {movieName}
            </h1>

            {buffering && (
                <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                    <div
                        className="h-10 w-10 rounded-full
                border-[3px] border-white/10 border-t-white
                animate-spin shadow-xl shadow-black/40"
                    />
                </div>
            )}

            {errorState && (
                <div
                    className="absolute inset-0 z-40 flex items-center justify-center
            text-white/90 text-sm bg-black/60 backdrop-blur-sm"
                >
                    <div
                        className="px-5 py-3 rounded-xl
                bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        Something went wrong. Please try again later.
                    </div>
                </div>
            )}

            <video
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() =>
                    setElapsedTime(videoRef.current?.currentTime ?? 0)
                }
                onLoadedMetadata={() =>
                    setDuration(videoRef.current?.duration ?? 0)
                }
                onWaiting={() => setBuffering(true)}
                onPlaying={() => setBuffering(false)}
                onClick={togglePlay}
                ref={videoRef}
                className="w-full flex-1 min-h-0 max-h-screen object-contain bg-black cursor-pointer"
            />

            <div
                className={`absolute bottom-0 left-0 right-0 z-20
        px-5 sm:px-7 pb-5 pt-20
        bg-linear-to-t from-black via-black/80 to-transparent
        transition-all duration-500 ease-out
        ${
            showControls
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3 pointer-events-none"
        }`}
            >
                <div className="relative w-full h-1.5 mb-5 group/bar">
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={elapsedTime}
                        onChange={(e) => {
                            const val = Number(e.target.value);

                            if (videoRef.current)
                                videoRef.current.currentTime = val;

                            setElapsedTime(val);
                        }}
                        className="
                    absolute inset-0 w-full h-1.5
                    appearance-none bg-transparent
                    cursor-pointer z-10

                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3.5
                    [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)]
                    [&::-webkit-slider-thumb]:opacity-0
                    group-hover/bar:[&::-webkit-slider-thumb]:opacity-100
                    [&::-webkit-slider-thumb]:transition-opacity
                "
                    />

                    <div
                        className="
                    absolute inset-0 h-1.5
                    rounded-full
                    bg-white/25
                    pointer-events-none
                    transition-all duration-200
                    group-hover/bar:h-2
                "
                    />

                    <div
                        className="
                    absolute left-0 top-0
                    h-1.5 rounded-full
                    bg-red-600
                    pointer-events-none
                    shadow-[0_0_8px_rgba(220,38,38,0.4)]
                    transition-[height] duration-200
                    group-hover/bar:h-2
                "
                        style={{ width: `${progressPct}%` }}
                    />
                </div>

                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="
                        flex items-center justify-center
                        w-10 h-10 rounded-full
                        bg-white/10 hover:bg-white/20
                        border border-white/10 hover:border-white/20
                        backdrop-blur-md
                        hover:scale-105 active:scale-95
                        transition-all duration-200
                        cursor-pointer
                    "
                        >
                            {isPlaying ? (
                                <Pause size={19} fill="white" />
                            ) : (
                                <Play
                                    size={19}
                                    fill="white"
                                    className="ml-0.5"
                                />
                            )}
                        </button>

                        <div className="flex items-center gap-2 group/vol">
                            <button
                                onClick={() => {
                                    const v = volume > 0 ? 0 : 1;

                                    if (videoRef.current)
                                        videoRef.current.volume = v;

                                    setVolume(v);
                                }}
                                className="
                            flex items-center justify-center
                            w-9 h-9 rounded-full
                            text-white/80 hover:text-white
                            hover:bg-white/10
                            transition-all duration-200
                            cursor-pointer
                        "
                            >
                                {volume === 0 ? (
                                    <VolumeX size={19} />
                                ) : volume < 0.5 ? (
                                    <Volume1 size={19} />
                                ) : (
                                    <Volume2 size={19} />
                                )}
                            </button>

                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={(e) => {
                                    const v = Number(e.target.value);

                                    if (videoRef.current)
                                        videoRef.current.volume = v;

                                    setVolume(v);
                                }}
                                className="
                            w-0 group-hover/vol:w-20
                            transition-all duration-300 ease-out
                            accent-red-600
                            cursor-pointer
                        "
                            />
                        </div>

                        <span
                            className="
                        text-xs sm:text-sm
                        text-white/70
                        tabular-nums
                        tracking-wide
                        whitespace-nowrap
                    "
                        >
                            {formatTime(elapsedTime)}
                            <span className="mx-1.5 text-white/30">/</span>
                            {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div
                            className="
                        flex items-center gap-0.5
                        bg-white/8
                        border border-white/10
                        rounded-xl
                        p-1
                        backdrop-blur-xl
                        shadow-lg shadow-black/20
                    "
                        >
                            <button
                                onClick={() => qualitySwitch(-1)}
                                className={`text-[11px] sm:text-xs
                        font-medium px-3 py-1.5 rounded-lg
                        transition-all duration-200 cursor-pointer
                        ${
                            currentQuality === -1
                                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                            >
                                Auto
                            </button>

                            {levels.map((level) => (
                                <button
                                    key={level.levelIndex}
                                    onClick={() =>
                                        qualitySwitch(level.levelIndex)
                                    }
                                    className={`text-[11px] sm:text-xs
                            font-medium px-3 py-1.5 rounded-lg
                            transition-all duration-200 cursor-pointer
                            ${
                                currentQuality === level.levelIndex
                                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                                >
                                    {level.height}p
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={toggleFullscreen}
                            className="
                        flex items-center justify-center
                        w-10 h-10 rounded-xl
                        bg-white/8 hover:bg-white/15
                        border border-white/10 hover:border-white/20
                        backdrop-blur-md
                        text-white/80 hover:text-white
                        hover:scale-105 active:scale-95
                        transition-all duration-200
                        cursor-pointer
                    "
                        >
                            {isFullscreen ? (
                                <Minimize size={19} />
                            ) : (
                                <Maximize size={19} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPage;
