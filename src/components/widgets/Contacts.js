import React, {useState, useEffect, useContext} from 'react';

import {ContactDetails, StaticContactDetails} from '../contact';
import {TYPING, UNREAD_COUNT} from '../../constants';
import {StateContext} from '../../context';

import {SearchBox} from '../ui';
import '../../styles/contacts.scss';

export const Contacts = (props) => {
    const {state, ref} = useContext(StateContext);
    const {user, latest: buddies} = state;
    const {currentReceiver, active, setCurrentReceiver} = props;

    const [searchText, handleSearchText] = useState();
    const [typing, setTyping] = useState({});
    const [unreadCount, setUnreadCount] = useState({});

    useEffect(() => {
        if (user) {
            ref.child(`${TYPING}/${user.id}`).on('value', (snapshot) => {
                if (snapshot.val()) setTyping(snapshot.val());
            });
            ref.child(`${UNREAD_COUNT}/${user.id}`).on('value', (snapshot) => {
                if (snapshot.val()) setUnreadCount(snapshot.val());
            });
        }
        return () => {
            if (user) {
                ref.child(`${TYPING}/${user.id}`).off();
                ref.child(`${UNREAD_COUNT}/${user.id}`).off();
            }
        };
    }, []);

    const filterBuddies = (buddyList) => {
        return buddyList.filter((buddy) => {
            const {receiver} = buddy;
            if (!searchText) return true;
            if (receiver.displayName) {
                return receiver.displayName
                    .toUpperCase()
                    .includes(searchText.toUpperCase());
            }
            return receiver.email.toUpperCase().includes(searchText.toUpperCase());
        });
    };

    const friends = (user && user.friends) ? Object.keys(user.friends) : [];
    return (
        <div
            className={
                active === 'Profile'
                    ? 'contacts contacts-profile-hidden'
                    : currentReceiver.id
                        ? 'contacts contacts-hidden'
                        : 'contacts'
            }
        >
            <SearchBox
                placeholder={'Search your buddies...'}
                handleChange={handleSearchText}
                value={searchText}
            />
            {(buddies && buddies.length) ? (
                <div className="contacts-wrapper">
                    {filterBuddies(buddies).map((buddy) => {
                        return (
                            <ContactDetails
                                key={'buddy-' + buddy.receiver.id}
                                currentReceiver={currentReceiver}
                                buddy={buddy}
                                setCurrentReceiver={setCurrentReceiver}
                                typing={typing}
                                unreadCount={unreadCount}
                            />
                        );
                    })}
                </div>
            ) :
                friends.length ?
                    <div className="contacts-wrapper">
                        {friends.map((friend, index) => <StaticContactDetails key={'friend-' + index} />)}
                    </div> : null
            }
        </div>
    );
};
