import React, { useState, useRef, useEffect } from "react";
import "../../assets/pagecss/Tasktwo.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import YouTube from 'react-youtube';
import axios from "axios";

const Tasktwo = () => {

    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const playerRef = useRef(null);

    const apiUrl = process.env.REACT_APP_API_URL;


    const [tasksub, setTasksub] = useState([]);
    const userID = localStorage.getItem("user");

    const displayMessageClick = () => {
        toast((t) => (
            <span className="toast-tasktwo">
               <p>One video must be watched in one minute. You must watch 5 videos to complete the task.</p>
            </span>
        ), {
            position: "top-center",
            duration: 4000,
            style: {
                borderRadius: '10px',
                background: '#181717',
                color: '#fff',
            },
        });
    }

    const getAllSubTasks = async () => {


        let counttaskVideo = localStorage.getItem("videoTask");


        await axios.get(`${apiUrl}/videos/only-get-not-done/${userID}`).then((response) => {

            console.log(response.data);
            const first20Tasks = response.data.videos.slice(0, JSON.parse(counttaskVideo).value);

            setTasksub(first20Tasks);

            console.log(tasksub)
            displayMessageClick()


            if (JSON.parse(counttaskVideo).value === 0) {
                toast((t) => (
                    <span className="toast-tasktwo">
                        <p> Your task is completed, you can now proceed to the next task after 24HR</p>
                    </span>
                ), {
                    position: "top-center",
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                setTimeout(() => {
                    navigate("/user-dashboard");
                }, 5000);
            }

        }).catch((error) => {
            console.log(error);
            toast.error("Failed to fetch data. Please try again.", {
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    height: "60px",
                    background: "#171617",
                    color: "#fff",
                },
            });
        })


    };


    useEffect(() => {
        getAllSubTasks();
    }, []);


    const videoIds = tasksub.map(link => {
        try {
            const url = new URL(link.videoLink);
            const videoId = url.searchParams.get("v");
            if (!videoId) throw new Error("Invalid video ID");
            return videoId;
        } catch (error) {
            console.error("Invalid URL:", link.videoLink);
            return null;
        }
    }).filter(id => id !== null);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    
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

    
    const onReady = (event) => {
        playerRef.current = event.target;
        setIsNextDisabled(true);

        
        event.target.playVideo();

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            playerRef.current.pauseVideo();

            const currentVideoId = tasksub[currentVideoIndex].taskVideoID;
            submitCompletevideo(currentVideoId);
            updateCompletecount(currentVideoId);
            setTimeout(() => {
                handleNextVideo();
            }, 2000);
        }, 60000);
    };

  
    const onStateChange = (event) => {
       
        const PLAYER_STATES = {
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5
        };

        if (event.data === PLAYER_STATES.PAUSED ||
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
            toast.success("All Videos Task completed!", {
                duration: 2000,
                style: {
                    borderRadius: "10px",
                    height: "60px",
                    background: "#171617",
                    color: "#fff",
                }
            });

            const now = new Date().getTime(); // Current time in milliseconds
            const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day in milliseconds

            localStorage.setItem("videoTask",
                JSON.stringify({
                    value: 0,
                    expiresAt: expirationTime,
                }))


            setTimeout(() => {
                navigate("/user-dashboard");
            }, 2000)
        }
    };

    const submitCompletevideo = async (taskVideoID) => {

        await axios.post(`${apiUrl}/completed-videos/add-comvideo/${userID}`, {
            taskVideoID: taskVideoID
        }).then((response) => {

            updateLocalSubTask()
            toast.success("task complete.", {
                duration: 2000,
                style: {
                    borderRadius: "10px",
                    height: "60px",
                    background: "#171617",
                    color: "#fff",
                }
            });


        }).catch((error) => {
            console.log(error);
            toast.error("task not complete.", {
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    height: "60px",
                    background: "#171617",
                    color: "#fff",
                },
            });
        })



    }


    const updateLocalSubTask = () => {

        const now = new Date().getTime(); // Current time in milliseconds
        const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day in milliseconds

        let counttaskVideoGet = localStorage.getItem("videoTask");

        let newCount = JSON.parse(counttaskVideoGet).value - 1;

        localStorage.setItem("videoTask",
            JSON.stringify({
                value: newCount,
                expiresAt: expirationTime,
            }))

    }

    const updateCompletecount = async (id) => {

        await axios.post(`${apiUrl}/videos/update-completedcount/${id}`).then((response) => {
            console.log('don complete count')
        }).catch((error) => {
            console.log(error);

        })

    }

    return (
        <div id="headtaskone">
            <div className="backbuttontaskone headtasktwo">
                <button
                    onClick={() => {
                        toast.error("Your task is not complete", {
                            duration: 3000,
                            style: {
                                borderRadius: "10px",
                                height: "60px",
                                background: "#171617",
                                color: "#fff",
                            },
                        });

                        setTimeout(() => {
                            navigate("/user-dashboard");
                        }, 2000)
                    }}
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