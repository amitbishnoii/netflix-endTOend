import Hls from "hls.js";
import {
    ArrowLeft,
    Pause,
    Play,
    Volume1,
    Volume2,
    VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StreamPage = () => {
    const { movieID } = useParams();
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

    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const streamURL = "http://localhost:3000/hs-test/master.m3u8";
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

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const progressPct = duration ? (elapsedTime / duration) * 100 : 0;

    return (
        <div
            className="bg-black min-h-screen flex flex-col relative group"
            onMouseOver={() => setShowControls(true)}
            onMouseOut={() => setShowControls(false)}
        >
            <button
                onClick={() => navigate(-1)}
                className={`absolute top-0 left-0 z-20 flex items-center gap-2 p-4 text-white/90 hover:text-white transition-opacity duration-300 cursor-pointer ${
                    showControls ? "opacity-100" : "opacity-0"
                }`}
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {buffering && (
                <div className="absolute inset-0 z-40 flex items-center justify-center">
                    <span className="text-white">Loading...</span>
                </div>
            )}

            {errorState && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    Something went wrong. Please try again later.
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
                className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/80 to-transparent px-4 pt-10 pb-4 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="relative w-full h-1.5 mb-3 group/bar">
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
                        className="absolute inset-0 w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600
                            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:opacity-0
                            group-hover/bar:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity"
                    />
                    <div className="absolute inset-0 h-1.5 rounded-full bg-white/25 pointer-events-none" />
                    <div
                        className="absolute h-1.5 rounded-full bg-red-600 pointer-events-none"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>

                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="hover:scale-110 transition-transform cursor-pointer"
                        >
                            {isPlaying ? (
                                <Pause size={22} fill="white" />
                            ) : (
                                <Play size={22} fill="white" />
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
                                className="cursor-pointer"
                            >
                                {volume === 0 ? (
                                    <VolumeX size={20} />
                                ) : volume < 0.5 ? (
                                    <Volume1 size={20} />
                                ) : (
                                    <Volume2 size={20} />
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
                                className="w-0 group-hover/vol:w-20 transition-all duration-200 accent-red-600 cursor-pointer"
                            />
                        </div>

                        <span className="text-xs text-white/80 tabular-nums">
                            {formatTime(elapsedTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-1 backdrop-blur-sm">
                        <button
                            onClick={() => qualitySwitch(-1)}
                            className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${
                                currentQuality === -1
                                    ? "bg-red-600 text-white"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            Auto
                        </button>
                        {levels.map((level) => (
                            <button
                                key={level.levelIndex}
                                onClick={() => qualitySwitch(level.levelIndex)}
                                className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${
                                    currentQuality === level.levelIndex
                                        ? "bg-red-600 text-white"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                {level.height}p
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPage;
