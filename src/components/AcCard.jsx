import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcCard = ({ teamId, device }) => {
    const [acSettings, setAcSettings] = useState({ temp: 22, state: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSettings, setDebouncedSettings] = useState(acSettings);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSettings(acSettings);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [acSettings]);

    useEffect(() => {
        const fetchAcSettings = async () => {
            setIsLoading(true);

            try {
                const response = await axios.post('https://kodessphere-api.vercel.app', {
                    teamId,
                    device,
                    value: debouncedSettings,
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching AC settings:', error);
            }

            setIsLoading(false);
        };

        fetchAcSettings();
    }, [teamId, device, debouncedSettings]);

    const handleTempChange = (event) => {
        setAcSettings((prevSettings) => ({
            ...prevSettings,
            temp: parseInt(event.target.value, 10),
        }));
    };

    const handleStateChange = (event) => {
        setAcSettings((prevSettings) => ({
            ...prevSettings,
            state: parseInt(event.target.value, 10),
        }));
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
        rangeInput: {
            marginRight: '10px',
        },
        span: {
            marginRight: '10px',
        },
        select: {
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

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/path/to/your/image.png" alt="AC Icon" style={styles.image} />
            </div>
            <h2 style={styles.title}>AC Control</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="acTemp" style={styles.label}>
                        Temperature:
                    </label>
                    <input
                        type="range"
                        id="acTemp"
                        min="16"
                        max="30"
                        value={acSettings.temp}
                        onChange={handleTempChange}
                        style={styles.rangeInput}
                    />
                    <span style={styles.span}>{acSettings.temp}°C</span>
                    <br />
                    <label htmlFor="acState" style={styles.label}>
                        State:
                    </label>
                    <select
                        id="acState"
                        value={acSettings.state}
                        onChange={handleStateChange}
                        style={styles.select}
                    >
                        <option value="0">Off</option>
                        <option value="1">On</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default AcCard;