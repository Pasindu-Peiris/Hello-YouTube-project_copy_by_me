import React, { useState, useEffect } from 'react';
import '../../assets/pagecss/Timecount.css';

const Timecounter = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let endTime = localStorage.getItem('endTime');
        let initialRemaining = 0;

        if (!endTime) {
            // Set endTime to 24 hours from now
            endTime = Date.now() + 86400 * 1000; // 86400 seconds = 24h
            localStorage.setItem('endTime', endTime.toString());
            initialRemaining = Math.floor((endTime - Date.now()) / 1000);
        } else {
            endTime = parseInt(endTime, 10);
            initialRemaining = Math.floor((endTime - Date.now()) / 1000);
            if (initialRemaining < 0) {
                initialRemaining = 0;
                localStorage.removeItem('endTime');
            }
        }

        setTime(initialRemaining);

        const timer = setInterval(() => {
            const currentTime = Date.now();
            const remaining = Math.floor((endTime - currentTime) / 1000);

            if (remaining <= 0) {
                setTime(0);
                clearInterval(timer);
                localStorage.removeItem('endTime');
            } else {
                setTime(remaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            <div className="time-counter">
                <div className="timer-container">
                <h2>The remaining time for the next tasks.</h2>
                    <div className="timer-circle">
                        <div className="timer-text">
                            <div className="time-display">{formatTime(time)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timecounter;