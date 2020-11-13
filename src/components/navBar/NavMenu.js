import React, {useEffect, useRef} from 'react';
import {Icon} from '../ui';

export const NavMenu = (props) => {
    const {
        closeMenu,
        logOut,
        user,
        active,
        setActive,
        changeTheme,
        darkTheme
    } = props;

    const useOutsideClick = (ref) => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeMenu();
            }
        };
        useEffect(() => {
            document.addEventListener('mousedown', handleOutsideClick);
            return (() => document.removeEventListener('mousedown', handleOutsideClick));
        }, []);
    };

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    const {photoURL, displayName, email} = user;

    const showProfile = () => {
        setActive('Profile');
        closeMenu();
    };

    return (
        <div className="nav-menu-modal" ref={wrapperRef}>
            {active !== 'Profile' ?
                <div className="wc-contact-wrapper" onClick={showProfile}>
                    <div className="contact-image wc-image">
                        <img src={photoURL} alt={''} className="wc-thumbnail" />
                    </div>
                    <div className="wc-contact-details">
                        <div className="wc-contact-name">{displayName || 'Hey there...'}</div>
                        <div className="wc-contact-info">{email}</div>
                    </div>
                    <div className="arrow-right-profile"><Icon name="chevron-right-pro" /></div>
                </div> : null}
            <div className="nav-menu-list">
                <div className="nav-menu-link">
                    <span onClick={logOut}>Log Out</span>
                </div>
                <div className="nav-menu-link">
                    <span onClick={changeTheme}>
						Switch to {`${darkTheme ? 'Light' : 'Dark'}`} Theme
                    </span>
                </div>
            </div>
        </div>
    );
};