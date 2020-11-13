import React from 'react';

export const ReadOnly = (props) => {
    const {user} = props;

    const {
        photoURL,
        email,
        displayName,
        bio
    } = user;

    return (
        <div className="modal-body-container">
            <span className="modal-img-wrapper">
                <div className="profile-image wc-image">
                    <img
                        src={photoURL}
                        alt={''}
                        className="wc-thumbnail"
                    />
                </div>
            </span>
            <div className="modal-form-item">
                <label className="modal-form-label">EMAIL</label>
                <div
                    className="modal-form-input"
                >{email || 'N/A'}</div>
            </div>
            <div className="modal-form-item">
                <label className="modal-form-label">NAME</label>
                <div
                    className="modal-form-input"
                >{displayName || 'N/A'}</div>
            </div>
            <div className="modal-form-item">
                <label className="modal-form-label">BIO</label>
                <div
                    className="modal-form-input profile-form-textarea"
                >{bio || 'N/A'}</div>
            </div>
        </div>
    );
};