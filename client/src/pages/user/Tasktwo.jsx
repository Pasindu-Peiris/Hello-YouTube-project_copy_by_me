import React, { useState, useEffect } from "react";
import "../../assets/pagecss/Tasktwo.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Tasktwo = () => {
  const [watchedTimes, setWatchedTimes] = useState([0, 0, 0, 0, 0]);
  const [allVideosWatched, setAllVideosWatched] = useState(false);
  const [videoTasks, setVideoTasks] = useState([]);
  const userID = 1; // Replace with actual user ID

  useEffect(() => {
    // Fetch video tasks for the user
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
    // Check if all videos have been watched for at least 1 minute
    const allWatched = watchedTimes.every(time => time >= 60);
    setAllVideosWatched(allWatched);
  }, [watchedTimes]);

  const handleTimeUpdate = (index, time) => {
    const newWatchedTimes = [...watchedTimes];
    newWatchedTimes[index] = time;
    setWatchedTimes(newWatchedTimes);
  };

  const handleNextTask = async () => {
    try {
      // Update task status to completed
      await axios.put(`http://localhost:4005/api/v1/videos/update/${userID}/${videoTasks[0].taskVideoID}`, {
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
      <div className="video-list">
        {videoTasks.map((task, index) => (
          <div key={index} className="video-item">
            <h3>Video {index + 1}</h3>
            <YouTubePlayer
              videoId={extractYouTubeVideoId(task.videoLink)}
              onTimeUpdate={(time) => handleTimeUpdate(index, time)}
            />
            <p>Watched: {Math.floor(watchedTimes[index])} seconds</p>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      {allVideosWatched && (
        <button className="next-button" onClick={handleNextTask}>Next Task</button>
      )}
    </div>
  );
};

// Helper function to extract YouTube video ID from URL
const extractYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// YouTube Player Component
const YouTubePlayer = ({ videoId, onTimeUpdate }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Load YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        events: {
          onReady: (event) => {
            setPlayer(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              // Start tracking time when video starts playing
              const interval = setInterval(() => {
                const currentTime = newPlayer.getCurrentTime();
                onTimeUpdate(currentTime);
              }, 1000);

              // Cleanup interval on unmount or when video stops
              return () => clearInterval(interval);
            }
          },
        },
        origin: window.location.origin, // Set the origin to match your app's URL
      });
    };
  }, [videoId, onTimeUpdate]);

  return (
    <div>
      <div id={`youtube-player-${videoId}`}></div>
    </div>
  );
};

export default Tasktwo;