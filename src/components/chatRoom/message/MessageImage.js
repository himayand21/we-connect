import React, {useState, useEffect} from 'react';
import {Icon} from '../../ui';

export const MessageImage = (props) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const buffer = new Image();
        buffer.onload = () => setReady(true);
        buffer.src = props.attachment.attachmentLink;
    }, []);

    const {
        attachment,
        handleClick,
        handleForwardImageClick
    } = props;
    const {
        attachmentLink,
        attachmentType,
        height,
        aspectRatio
    } = attachment;

    const element = document.getElementById('chat-wrapper');
    const widthLimit = element.offsetWidth;
    const width = aspectRatio * height;
    const maxWidth = 0.7 * widthLimit;
    const exceedsWidth = width > maxWidth;
    const exceedsHeight = height > 250;

    let imgWidth = width;
    let imgHeight = height;

    if (!exceedsHeight && !exceedsWidth) {
        imgWidth = width;
        imgHeight = height;
    } else if (exceedsHeight && !exceedsWidth) {
        imgHeight = 300;
        imgWidth = aspectRatio * 300;
    } else if (exceedsWidth && !exceedsHeight) {
        imgWidth = maxWidth;
        imgHeight = imgWidth / aspectRatio;
    } else {
        const widthRatio = maxWidth / width;
        const heightRatio = 300 / height;
        if (widthRatio < heightRatio) {
            imgWidth = maxWidth;
            imgHeight = maxWidth / aspectRatio;
        } else {
            imgHeight = 300;
            imgWidth = 300 * aspectRatio;
        }
    }

    const handleForwardClick = () => {
        handleForwardImageClick({
            modalFlag: true,
            imgHeight,
            imgWidth,
            ...attachment
        });
    };

    return (
        <div className="message-image-container">
            <div
                className={'message-image-wrapper wc-bg-light-cam'}
                onClick={handleClick}
                style={{
                    width: Math.floor(imgWidth),
                    height: Math.floor(imgHeight),
                    cursor: 'pointer'
                }}>
                {ready ?
                    <img
                        src={attachmentLink}
                        alt={attachmentType}
                        id="message-image"
                        className="message-image"
                    /> : null}
            </div>
            <div className="wc-icon forward-icon" onClick={handleForwardClick}>
                <Icon name="share-send"/>
            </div>
        </div>

    );
};

// todo

// wc-bg-light-cam class is not used currently for avoiding important