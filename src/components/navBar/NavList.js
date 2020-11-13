import React from 'react';
import {navBarLabels} from '../../constants';

export const NavList = (props) => {
    const {active, setActive} = props;
    return (
        <ul className="nav-list-wrapper">
            {navBarLabels.map((navBarLabel) => (
                <li
                    key={'navbar-' + navBarLabel}
                    className={navBarLabel === active ? 'nav-list-item active-list' : 'nav-list-item'}
                    onClick={() => setActive(navBarLabel)}
                >
                    <span className="nav-link">
                        <span>{navBarLabel}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
};
