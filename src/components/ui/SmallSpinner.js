import React from 'react';
import '../../styles/small-spinner.scss';

export const SmallSpinner = (props) => {
    const {
        size = 5,
        color = 'blue'
    } = props;
    const wrapperStyle = {
        height: size,
        width: size * 5
    };
    const circleStyle = {
        height: size,
        width: size
    };
    const circleClasses = ['ball-1', 'ball-2', 'ball-3'];
    return (
        <div className={`small-spinner ${color}`} style={wrapperStyle}>
            {circleClasses.map((circleClass, index) => (
                <div
                    key={circleClass}
                    className={circleClass}
                    style={{
                        ...circleStyle,
                        left: size * 2 * index,
                    }}
                />
            ))}
        </div>
    );
};
