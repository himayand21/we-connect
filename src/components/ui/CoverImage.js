import React, {useEffect, useState}  from 'react';
import BigImage from '../../assets/app-background.jpg';
import SmallImage from '../../assets/app-bg-small-min.jpg';

import '../../styles/cover-image.scss';

export const CoverImage = () => {

    const bigImage = document.getElementById('form-image-actual');

    useEffect(() => {
        checkLoaded();
    }, [bigImage]);

    const [imageLoaded, setImageLoaded] = useState(false);

    const checkLoaded = () => {
        setImageLoaded (bigImage && bigImage.complete);
    };

    return (
        <div className="form-image" data-large={BigImage}>
            {imageLoaded &&
                <div className="app-title animate-pop-in">
                    WeConnect .
                </div>
            }
            <img src={SmallImage} className="preloader-form-image" alt=""/>
            <img src={BigImage} onLoad={checkLoaded} className={`form-image-actual ${imageLoaded ? 'visible-image' : ''}`} id="form-image-actual" alt=""/>
        </div>
    );
};
