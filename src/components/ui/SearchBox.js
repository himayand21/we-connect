import React from 'react';
import {Icon} from '../ui';

import '../../styles/search-box.scss';

export const SearchBox = (props) => {
    const {
        handleChange,
        placeholder,
        value
    } = props;
    return (
        <div className="search-box">
            <div className="wc-input-wrapper">
                <input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                />
                <div className="search-icon">
                    <Icon name="search-lite"/>
                </div>
            </div>
        </div>
    );
};
