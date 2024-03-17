import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FanCard = ({ teamId, device }) => {
    const [fanSpeed, setFanSpeed] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedFanSpeed, setDebouncedFanSpeed] = useState(fanSpeed);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFanSpeed(fanSpeed);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [fanSpeed]);

    useEffect(() => {
        const fetchFanSpeed = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post('https://kodessphere-api.vercel.app', {
                    teamId,
                    device,
                    value: debouncedFanSpeed,
                });

                console.log(response.data);
            } catch (error) {
                console.error('Error fetching fan speed:', error);
            }
            setIsLoading(false);
        };

        fetchFanSpeed();
    }, [teamId, device, debouncedFanSpeed]);

    const handleFanSpeedChange = (event) => {
        setFanSpeed(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <h2>Fan Card</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="fanSpeed">Fan Speed:</label>
                    <input
                        type="range"
                        id="fanSpeed"
                        min="0"
                        max="5"
                        value={fanSpeed}
                        onChange={handleFanSpeedChange}
                    />
                    <span>{fanSpeed}</span>
                </div>
            )}
        </div>
    );
};

export default FanCard;
