import React from 'react';

import '../../styles/stair-spinner.scss';

export const StairSpinner = () => {
    return (
        <div className="loader">
            <div className="loader-bar" />
            <div className="loader-bar" />
            <div className="loader-bar" />
            <div className="loader-bar" />
            <div className="loader-bar" />
            <div className="loader-ball" />
        </div>
    );
};