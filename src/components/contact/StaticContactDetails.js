import React from 'react';

import '../../styles/static-contacts.scss';

export const StaticContactDetails = () => {
    return (
        <div
            className="static-contact-buddy"
        >
            <div className="static-buddy-img" />
            <div className="static-buddy-details-wrapper">
                <div className="static-buddy-details">
                    <div className="static-buddy-name" />
                    <div className=" static-buddy-text" />
                </div>
            </div>
        </div>
    );
};