import React, {useState, useRef, useEffect, useContext} from 'react';
import '../../styles/progress-ring.scss';
import {StateContext} from '../../context';

export const ProgressRing = ({percentage = 0,
    size = 50,
    color = 'rgba(63, 147, 177)',
    textSize = size * 0.35,
    textColor,
    strokeWidth = 5
}) => {
    const getOffset = (percentage, size) => {
        const r = size / 2;
        const c = Math.PI * (r * 2);
        const pct = ((100 - percentage) / 100) * c;
        return pct;
    };
    const {state} = useContext(StateContext);
    const {darkTheme} = state;
    const [dashOffset, setDashOffset] = useState(getOffset(0, size));
    const [animation, setAnimation] = useState(true);

    const indicatorTextColor = textColor ? textColor : darkTheme ? 'lightgray' : 'gray';
    const prevPercentage = usePrevious(percentage);
    const dashArray = getOffset(0, size);

    useEffect(() => {
        if (prevPercentage > percentage) {
            setAnimation(false);
        } else setAnimation(true);
        setDashOffset(getOffset(percentage, size));
    }, [percentage]);

    return (
        <div>
            <div
                className = "ring-container"
                data-pct={percentage}
                style={{
                    height: size,
                    width: size,
                    fontSize: textSize,
                    color: indicatorTextColor}}>
                <svg
                    className="ring-svg"
                    style={{height: size, width: size}}
                >
                    <circle
                        r={size / 2}
                        cx="50%"
                        cy="50%"
                        fill="transparent"
                        strokeDasharray={`${dashArray}`}
                        strokeDashoffset={0}
                        strokeWidth = {strokeWidth}
                        stroke={`${darkTheme ? '' : 'light'}gray`}
                        className="circle"
                    />
                    <circle
                        r={size / 2}
                        cx="50%"
                        cy="50%"
                        className={`circle ${animation ? 'animated-circle' : ''}`}
                        fill="transparent"
                        strokeDasharray={`${dashArray}`}
                        strokeDashoffset={`${dashOffset}`}
                        stroke={color}
                        strokeWidth = {strokeWidth}
                    />
                </svg>
            </div>

        </div>
    );
};

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
