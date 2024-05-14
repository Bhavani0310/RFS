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
      setStartTime(player.getCurrentTime());
    } else if (state === 2 || state === 0) {
      // Video is paused or ended
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    let interval;
    if (player) {
      interval = setInterval(() => {
        if (isPlaying) {
          const currentTime = player.getCurrentTime();
          const elapsedHours = Math.floor(currentTime - startTime); // / 3600; //  60 seconds * 60 minutes = hour
          setTotalHours((prevTotalHours) => prevTotalHours + elapsedHours);
          setStartTime(currentTime);
        }
      }, 1000);
    }
    return () => {
      // Cleanup function to clear interval when component unmounts or player changes
      clearInterval(interval);
    };
  }, [player, isPlaying, startTime, setTotalHours]);

  useEffect(() => {
    // Update progress when component unmounts or totalHours changes
    return () => {
      learningApi.updateProgress({
        payload: {
          courseId: courseId,
          videoId: videoId,
          progress: totalHours,
        },
        success: (res) => {
          console.log("updated progress success", res);
        },
        error: (err) => {
          console.log("update progress failed", err);
        },
      });
    };
  }, [totalHours, courseId, videoId]);

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
