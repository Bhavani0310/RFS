import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import learningApi from "../../apis/learning.api";

const YoutubePlayer = ({ videoId, courseId, totalHours, setTotalHours }) => {
    const [player, setPlayer] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const options = {
        height: "420",
        width: "800",
        autoplay: 0,
        controls: 1,
    };

    const handleOnReady = (event) => {
        setPlayer(event.target);
    };

    const handleStateChange = (event) => {
        const state = event.data;
        if (state === 1) {
            // Video is playing
            setIsPlaying(true);
            setStartTime(Date.now());
        } else if (state === 2 || state === 0) {
            // Video is paused or ended
            const endTime = Date.now();
            const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
            setIsPlaying(false);
            setStartTime(endTime);
            setTotalHours(Math.floor(player.getCurrentTime()));
            learningApi.updateProgress({
                payload: {
                    courseId: courseId,
                    videoId: videoId,
                    progress: elapsedSeconds,
                },
                success: (res) => {
                    console.log("updated progress success", res);
                },
                error: (err) => {
                    console.log("update progress failed", err);
                },
            });
        }
    };

    return (
        <div className="learningVideo_container">
            <YouTube
                opts={options}
                onReady={handleOnReady}
                onStateChange={handleStateChange}
                videoId={videoId}
            />
        </div>
    );
};

export default YoutubePlayer;
