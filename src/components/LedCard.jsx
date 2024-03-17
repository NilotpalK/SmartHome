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


            height: 'auto', // Set the height to 'auto' to adjust based on content
            minHeight: '300px',
            border: '1px solid #ffffff',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            width: '300px', // Fixed width for consistency
            maxWidth: '100%', // Ensure responsiveness
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#1e1e1e',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
            flexDirection: 'column',
        },
        label: {
            marginRight: '10px',
            color: '#ffffff',
        },
        colorInput: {
            marginTop: '16px',
            marginRight: '10px',
            padding: '1px',
            borderRadius: '4px',
            border: '1px solid #28a745',
            backgroundColor: '#1e1e1e',
            width: "50%",
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
            alignSelf: 'flex-start',
        },
        applyButton: {
            marginTop: '16px',
            padding: '6px 1px',
            fontSize: '14px',
            backgroundColor: '#28a745',
            color: '#ffffff',
            border: '1px solid #28a745',
            borderRadius: '4px',
            cursor: 'pointer',
            flexGrow: 1,
            alignSelf: 'stretch',
        },
        loadingText: {
            color: '#28a745', // Change loading text color to green
            marginTop: '8px', // Add some margin to separate from the button
        },
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/led-bulb.png" alt="LED Icon" style={styles.image}/>
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
            {isLoading && <p style={styles.loadingText}>Applying...</p>}
        </div>
    );
};

export default LedCard;
