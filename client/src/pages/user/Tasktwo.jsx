import React, { useState, useEffect } from "react";
import "../../assets/pagecss/Tasktwo.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Tasktwo = () => {
  const [watchedTime, setWatchedTime] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoTasks, setVideoTasks] = useState([]);
  const userID = 1; // Replace with actual user ID

  useEffect(() => {
    const fetchVideoTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:4005/api/v1/videos/get/user/${userID}`);
        setVideoTasks(response.data);
      } catch (error) {
        console.error("Error fetching video tasks:", error);
        toast.error("Failed to fetch video tasks.");
      }
    };

    fetchVideoTasks();
  }, [userID]);

  useEffect(() => {
    if (watchedTime >= 60 && currentVideoIndex < videoTasks.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setWatchedTime(0); // Reset watch time for the next video
    }
  }, [watchedTime, currentVideoIndex, videoTasks.length]);

  const handleTimeUpdate = (time) => {
    setWatchedTime(time);
  };

  const handleNextTask = async () => {
    try {
      await axios.put(`http://localhost:4005/api/v1/videos/update/${userID}/${videoTasks[currentVideoIndex].taskVideoID}`, {
        status: "completed",
      });
      toast.success("Task completed successfully.");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete the task.");
    }
  };

  return (
    <div className="video-task">
      <Toaster />
      <h1>Daily Task 02</h1>
      <p>Watch at least 1 minute of each video to proceed.</p>
      {videoTasks.length > 0 && (
        <div className="video-item">
          <h3>Video {currentVideoIndex + 1}</h3>
          <YouTubePlayer
            videoId={extractYouTubeVideoId(videoTasks[currentVideoIndex].videoLink)}
            onTimeUpdate={handleTimeUpdate}
          />
          <p>Watched: {Math.floor(watchedTime)} seconds</p>
          <p>{videoTasks[currentVideoIndex].description}</p>
        </div>
      )}
      {watchedTime >= 60 && (
        <button className="next-button" onClick={handleNextTask}>Next Task</button>
      )}
    </div>
  );
};

const extractYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const YouTubePlayer = ({ videoId, onTimeUpdate }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        events: {
          onReady: (event) => {
            setPlayer(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const interval = setInterval(() => {
                const currentTime = newPlayer.getCurrentTime();
                onTimeUpdate(currentTime);
              }, 1000);
              return () => clearInterval(interval);
            }
          },
        },
        origin: window.location.origin,
      });
    };
  }, [videoId, onTimeUpdate]);

  return <div id={`youtube-player-${videoId}`}></div>;
};

export default Tasktwo;