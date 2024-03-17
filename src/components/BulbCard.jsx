import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BulbCard = ({ teamId, device }) => {
    const [bulbState, setBulbState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBulbState = async () => {
            setIsLoading(true);

            try {
                const response = await axios.post('https://kodessphere-api.vercel.app', {
                    teamId,
                    device,
                    value: bulbState,
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching bulb state:', error);
            }

            setIsLoading(false);
        };

        fetchBulbState();
    }, [teamId, device, bulbState]);

    const handleBulbStateChange = (event) => {
        setBulbState(event.target.checked ? 1 : 0);
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

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/img_1.png" alt="Bulb Icon" style={styles.image} />
            </div>
            <h2 style={styles.title}>Bulb Control</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={styles.inputContainer}>
                    <label htmlFor="bulbState" style={styles.label}>
                        Bulb State:
                    </label>
                    <input
                        type="checkbox"
                        id="bulbState"
                        checked={bulbState === 1}
                        onChange={handleBulbStateChange}
                        style={styles.checkbox}
                    />
                    <span>{bulbState === 1 ? 'On' : 'Off'}</span>
                </div>
            )}
        </div>
    );
};

export default BulbCard;