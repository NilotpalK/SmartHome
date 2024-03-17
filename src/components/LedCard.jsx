import React, { useState } from 'react';
import axios from 'axios';

const LedCard = ({ teamId, device }) => {
    const [ledColor, setLedColor] = useState('#000000');
    const [isLoading, setIsLoading] = useState(false);

    const handleLedColorChange = (event) => {
        setLedColor(event.target.value);
    };

    const applyLedColor = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post('https://kodessphere-api.vercel.app', {
                teamId,
                device,
                value: ledColor,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching LED color:', error);
        }

        setIsLoading(false);
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
        colorInput: {
            marginRight: '10px',
            padding: '4px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        imageContainer: {
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginBottom: '16px',
        },
        image: {
            maxWidth: '100%',
            maxHeight: '100%',
            alignSelf: 'flex-start', // Align image to the left
        },
        applyButton: {
            padding: '6px 12px', // Smaller button padding
            fontSize: '14px', // Smaller font size
        },
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/rgb.jpeg" alt="LED Icon" style={styles.image}/>
            </div>
            <h2 style={styles.title}>LED Control</h2>

            <div style={styles.inputContainer}>
                <label htmlFor="ledColor" style={styles.label}>
                    LED Color:
                </label>
                <input
                    type="color"
                    id="ledColor"
                    value={ledColor}
                    onChange={handleLedColorChange}
                    style={styles.colorInput}
                />
                <button onClick={applyLedColor} style={styles.applyButton}>Apply</button>
            </div>
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default LedCard;
