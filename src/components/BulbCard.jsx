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

    return (
        <div>
            <h2>Bulb Card</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="bulbState">Bulb State:</label>
                    <input
                        type="checkbox"
                        id="bulbState"
                        checked={bulbState === 1}
                        onChange={handleBulbStateChange}
                    />
                    <span>{bulbState === 1 ? 'On' : 'Off'}</span>
                </div>
            )}
        </div>
    );
};

export default BulbCard;