import React, { useState, useRef, useEffect } from "react";
import "../../assets/pagecss/Tasktwo.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import YouTube from 'react-youtube';

const Tasktwo = () => {

    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const playerRef = useRef(null);

    const [channelLinks, setChannelLinks] = useState([]);

    const YoutubechnanleLink = [
        { channelLink: "https://www.youtube.com/watch?v=oj1QAkvmXVw" },
        { channelLink: "https://www.youtube.com/watch?v=q5FO8KC-zbE" },
        { channelLink: "https://www.youtube.com/watch?v=Ec08db2hP10" },
        { channelLink: "https://www.youtube.com/watch?v=Ec08db2hP18" },
        { channelLink: "https://www.youtube.com/watch?v=Ec08db2hP19" },
    ];

    // Extract video IDs from the links
    const videoIds = YoutubechnanleLink.map(link => {
        try {
            const url = new URL(link.channelLink);
            const videoId = url.searchParams.get("v");
            if(!videoId) throw new Error("Invalid video ID");
            return videoId;
        } catch (error) {
            console.error("Invalid URL:", link.channelLink);
            return null;
        }
    }).filter(id => id !== null);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    useEffect(() => {
        return () => {
            if(timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // YouTube player options
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            enablejsapi: 1,
            origin: window.location.origin
        }
    };

    // Handle player ready event
    const onReady = (event) => {
        playerRef.current = event.target;
        setIsNextDisabled(true);
        
        // Force play and prevent pause
        event.target.playVideo();
        
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
            playerRef.current.pauseVideo();
            handleNextVideo();
        }, 10000);
    };

    // Block all player interactions
    const onStateChange = (event) => {
        // YouTube player states
        const PLAYER_STATES = {
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5
        };

        if(event.data === PLAYER_STATES.PAUSED || 
           event.data === PLAYER_STATES.BUFFERING) {
            playerRef.current.playVideo();
        }
    };

    const onError = (error) => {
        console.error("YouTube Player Error:", error);
        toast.error("Error loading video");
    };

    const handleNextVideo = () => {
        if (currentVideoIndex < videoIds.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
            setIsNextDisabled(false);
        } else {
            toast.success("All videos completed!");
            navigate("/user-dashboard");
        }
    };

    return (
        <div id="headtaskone">
            <div className="backbuttontaskone headtasktwo">
                <button 
                    onClick={() => navigate("/user-dashboard")} 
                    className="buttoncompletetasksubtaskone"
                >
                    Back
                </button>

                <button
                    onClick={handleNextVideo}
                    className="buttoncompletetasksubtaskone"
                    id="nextbuttontwo"
                    disabled={isNextDisabled}
                >
                    Next Video
                </button>
            </div>
            
            <div id="taskone">
                <section id="taskonecontent">
                    {videoIds[currentVideoIndex] && (
                        <div className="video-container">
                            <YouTube
                                key={videoIds[currentVideoIndex]}
                                videoId={videoIds[currentVideoIndex]}
                                opts={opts}
                                onReady={onReady}
                                onError={onError}
                                onStateChange={onStateChange}
                            />
                            <div className="video-overlay"></div>
                        </div>
                    )}
                </section>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default Tasktwo;