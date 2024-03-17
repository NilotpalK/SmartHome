import React, { useState, useEffect } from 'react';
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

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>LED Control</h2>
            <div style={styles.inputContainer}>
                <label htmlFor="ledColor" style={styles.label}>LED Color:</label>
                <input
                    type="color"
                    id="ledColor"
                    value={ledColor}
                    onChange={handleLedColorChange}
                    style={styles.colorInput}
                />
                <button onClick={applyLedColor}>Apply</button>
            </div>
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '20px',
        width: '300px', // Adjust width as needed
    },
    title: {
        textAlign: 'left',
        marginBottom: '10px',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        marginRight: '10px',
    },
    colorInput: {
        marginRight: '10px',
    },
};

export default LedCard;
