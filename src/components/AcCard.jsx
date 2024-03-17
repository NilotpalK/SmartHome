import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcCard = ({ teamId, device }) => {
    const [acSettings, setAcSettings] = useState({ temp: 22, state: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSettings, setDebouncedSettings] = useState(acSettings);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSettings(acSettings);
        }, 500); // Adjust debounce delay as needed

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

    return (
        <div>
            <h2>AC Card</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="acTemp">Temperature:</label>
                    <input
                        type="range"
                        id="acTemp"
                        min="16"
                        max="30"
                        value={acSettings.temp}
                        onChange={handleTempChange}
                    />
                    <span>{acSettings.temp}°C</span>
                    <br />
                    <label htmlFor="acState">State:</label>
                    <select id="acState" value={acSettings.state} onChange={handleStateChange}>
                        <option value="0">Off</option>
                        <option value="1">On</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default AcCard;
