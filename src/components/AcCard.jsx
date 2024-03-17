import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcCard = ({ teamId, device }) => {
    const [acSettings, setAcSettings] = useState({ temp: 22, state: 0 });
    const [isLoading, setIsLoading] = useState(false);

    const handleTempChange = (event) => {
        setAcSettings((prevSettings) => ({
            ...prevSettings,
            temp: parseInt(event.target.value, 10),
        }));
    };

    const handleStateChange = () => {
        setAcSettings((prevSettings) => ({
            ...prevSettings,
            state: prevSettings.state === 1 ? 0 : 1,
        }));
    };

    const fetchAcSettings = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post('https://kodessphere-api.vercel.app', {
                teamId,
                device,
                value: acSettings,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching AC settings:', error);
        }

        setIsLoading(false);
    };

    const styles = {
        card: {
            border: '1px solid #ffffff',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            width: '300px',
            height: 'auto',
            minHeight: '300px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#1e1e1e',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        },
        title: {
            textAlign: 'center',
            marginBottom: '16px',
            fontWeight: 'bold',
            color: '#ffffff',
        },
        rangeInput: {
            marginRight: '10px',
            background: '#4caf50',
        },
        span: {
            marginRight: '10px',
            color: '#ffffff',
        },
        sliderButtonContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
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
        applyButton: {
            marginTop: '16px',
            padding: '6px 1px',
            fontSize: '14px',
            color: acSettings.state === 0 ? '#4caf50' : '#ffffff',
            backgroundColor: acSettings.state === 0 ? 'transparent' : '#28a745',
            border: `1px solid ${acSettings.state === 0 ? '#4caf50' : '#28a745'}`,
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100px',
        },
    };

    useEffect(() => {
        fetchAcSettings();
    }, [acSettings]);

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/air-conditioner.png" alt="AC Icon" style={styles.image} />
            </div>
            <h2 style={styles.title}>AC Control</h2>
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
                <div style={styles.sliderButtonContainer}>
                    <label htmlFor="acState" style={styles.label}>

                    </label>
                    <button
                        id="acState"
                        onClick={handleStateChange}
                        style={styles.applyButton}
                    >
                        {acSettings.state === 0 ? 'Off' : 'On'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcCard;
