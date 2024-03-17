import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BulbCard = ({ teamId, device }) => {
    const [bulbState, setBulbState] = useState(0);

    const handleBulbStateChange = () => {
        setBulbState(bulbState === 0 ? 1 : 0);
    };

    const fetchBulbState = async () => {
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
            backgroundColor: bulbState === 1 ? '#28a745' : 'transparent',
            color: bulbState === 1 ? '#ffffff' : '#28a745',
            border: '1px solid #28a745',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100px',
        },
    };

    useEffect(() => {
        fetchBulbState();
    }, [bulbState]);

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img src="/icons/idea.png" alt="Bulb Icon" style={styles.image} />
            </div>
            <h2 style={styles.title}>Bulb Control</h2>
            <div style={styles.inputContainer}>

                <button
                    id="bulbState"
                    onClick={handleBulbStateChange}
                    style={styles.applyButton}
                >
                    {bulbState === 1 ? 'On' : 'Off'}
                </button>
            </div>
        </div>
    );
};

export default BulbCard;
