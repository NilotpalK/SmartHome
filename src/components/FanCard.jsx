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

        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/img_2.png" alt="AC Icon" style={styles.image}/>
            </div>
            <h2 style={styles.title}>Fan Card</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="fanSpeed" style={styles.label}>Fan Speed:</label>
                    <input
                        type="range"
                        id="fanSpeed"
                        min="0"
                        max="5"
                        value={fanSpeed}
                        onChange={handleFanSpeedChange}
                        style={styles.rangeInput}
                    />
                    <span>{fanSpeed}</span>
                </div>
            )}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
        width: '300px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: '16px',
        fontWeight: 'bold',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    },
    label: {
        marginRight: '10px',
    },
    checkbox: {
        marginRight: '10px',
    },
    imageContainer: {
        width: '64px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
};

export default FanCard;
