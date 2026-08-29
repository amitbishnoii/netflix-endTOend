import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StreamPage = () => {
    const { movieID } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [volume, setVolume] = useState(1);

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamURL = "http://localhost:3000/hls-test/master.m3u8";
    const navigate = useNavigate();

    useEffect(() => {
        if (!videoRef.current) return;
        const hls = new Hls();

        hls.loadSource(streamURL);
        hls.attachMedia(videoRef.current);

        return () => {
            hls.destroy();
        };
    }, []);

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

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <button
                onClick={() => navigate(-1)}
                className="text-white p-4 self-start cursor-pointer"
            >
                ← Back
            </button>
            <video
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() =>
                    setElapsedTime(videoRef.current?.currentTime ?? 0)
                }
                onLoadedMetadata={() =>
                    setDuration(videoRef.current?.duration ?? 0)
                }
                ref={videoRef}
                className="w-full flex-1"
            />

            <input
                type="range"
                name=""
                min={0}
                max={duration}
                value={elapsedTime}
                onChange={(e) => {
                    if (videoRef.current) {
                        videoRef.current.currentTime = Number(e.target.value);
                    }
                    setElapsedTime(Number(e.target.value));
                }}
                className="w-full"
            />

            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                onChange={(e) => {
                    if (videoRef.current) {
                        videoRef.current.volume = Number(e.target.value);
                    }
                    setVolume(Number(e.target.value));
                }}
            />

            <div className="text-white">
                {volume * 100}% {formatTime(elapsedTime)} / {formatTime(duration)}
            </div>

            <button className="text-white" onClick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default StreamPage;
