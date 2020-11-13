import React, {useContext, useState} from 'react';
import {StateContext} from '../../context';

import '../../styles/nav-bar.scss';
import {NavMenu, NavList} from '../navBar';
import {Icon} from '../ui';

export const NavBar = (props) => {
    const {signOut, currentReceiver} = props;
    const {history, actions, state} = useContext(StateContext);
    const {active, userDetails, darkTheme} = state;
    const {userLogOut, setActive, changeTheme} = actions;

    const [menuFlag, setMenuFlag] = useState(false);

    const logOut = async () => {
        await signOut();
        await history.push('/signin');
        userLogOut();
    };

    const closeMenu = () => setMenuFlag(false);

    return (
        <nav className={`nav-container ${currentReceiver.id && active === 'Chats' ? 'nav-small-screen-none' : ''}`}>
            <div className="nav-brand">
                <span className="brand-name">WeConnect</span>
            </div>
            <NavList
                active={active}
                setActive={setActive}
            />
            <div className="nav-menu" onClick={() => setMenuFlag(true)}>
                <div className="nav-menu-icon">
                    <Icon name="ellipsis-solid"/>
                </div>
            </div>
            {menuFlag ?
                <NavMenu
                    closeMenu={closeMenu}
                    changeTheme={changeTheme}
                    logOut={logOut}
                    darkTheme={darkTheme}
                    user={userDetails}
                    active={active}
                    setActive={setActive}
                /> : null}
        </nav>
    );
};