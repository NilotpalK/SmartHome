import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LedCard = ({ teamId, device }) => {
    const [ledColor, setLedColor] = useState('#000000');
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedColor, setDebouncedColor] = useState(ledColor);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedColor(ledColor);
        }, 500); // Adjust debounce delay as needed

        return () => {
            clearTimeout(timer);
        };
    }, [ledColor]);

    useEffect(() => {
        const fetchLedColor = async () => {
            setIsLoading(true);

            try {
                const response = await axios.post('https://kodessphere-api.vercel.app', {
                    teamId,
                    device,
                    value: debouncedColor,
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching LED color:', error);
            }

            setIsLoading(false);
        };

        fetchLedColor();
    }, [teamId, device, debouncedColor]);

    const handleLedColorChange = (event) => {
        setLedColor(event.target.value);
    };

    return (
        <div>
            <h2>LED Card</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="ledColor">LED Color:</label>
                    <input
                        type="color"
                        id="ledColor"
                        value={ledColor}
                        onChange={handleLedColorChange}
                    />
                    <span>{ledColor}</span>
                </div>
            )}
        </div>
    );
};

export default LedCard;
