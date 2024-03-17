import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FanCard = ({ teamId, device }) => {
    const [fanSpeed, setFanSpeed] = useState(0);
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
        };

        fetchFanSpeed();
    }, [teamId, device, debouncedFanSpeed]);

    const handleFanSpeedChange = (event) => {
        setFanSpeed(parseInt(event.target.value, 10));
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/fan.gif" alt="AC Icon" style={styles.image}/>
            </div>
            <h2 style={styles.title}>Fan Card</h2>
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
        </div>
    );
};

const styles = {
    card: {
        height: 'auto',
        minHeight: '300px',
        border: '1px solid #ffffff',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
        width: '300px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    },
    title: {
        textAlign: 'center',
        marginBottom: '16px',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    },
    label: {
        marginRight: '10px',
        color: '#ffffff',
    },
    rangeInput: {
        marginRight: '10px',
        background: '#4caf50',
        color: '#ffffff', // Change slider value color to white

    },
    span: {
        marginRight: '10px',
        color: '#ffffff',
    },
    imageContainer: {
        width: '128px', // Increased width
        height: '128px', // Increased height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
    },
    image: {
        maxWidth: '100%', // Ensure the image fits within the container
        maxHeight: '100%', // Ensure the image fits within the container
    },
};

export default FanCard;
