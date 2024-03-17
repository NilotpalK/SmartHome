import React from 'react';
import LedCard from './LedCard';
import AcCard from './AcCard';
import FanCard from './FanCard';
import BulbCard from './BulbCard';

const CardWrapper = ({ teamId, device }) => {
    return (
        <div style={styles.wrapper}>
            <LedCard teamId={teamId} device={device} />
            <AcCard teamId={teamId} device={device} />
            <FanCard teamId={teamId} device={device} />
            <BulbCard teamId={teamId} device={device} />
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'space-around', // Adjust as needed
        alignItems: 'center',
        flexWrap: 'wrap', // Allow cards to wrap if screen size is too small
    },
};

export default CardWrapper;
