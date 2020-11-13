import React from 'react';

import {socialMedia} from '../../constants';
import {Icon} from '../ui';

export const Footer = () => {
    return (
        <div className="form-footer">
            <div className="form-subheader">
            Created by <span className="created-by">Himayan</span>
            </div>
            <div className="social-media">
                <div>
                    {socialMedia.map((icon) => (
                        <a href={icon.link} target="_blank" rel="noopener noreferrer" key={icon.name}>
                            <Icon name={icon.iconKey} className="icons"/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};