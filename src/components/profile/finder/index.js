import React, {useContext} from 'react';
import * as firebase from 'firebase/app';
import {StateContext} from '../../../context';
import {REQUESTS, SENT} from '../../../constants';

import {OtherUser} from './OtherUser';

export const Finder = (props) => {
    const {state, ref} = useContext(StateContext);
    const {user} = state;
    const {users, receivers, mainUser} = props;

    const getMutualFriends = (friends, userFriends) => {
        const friendsArray = Object.values(friends);
        const userFriendsArray = Object.values(userFriends);
        return friendsArray.filter((friend) => userFriendsArray.includes(friend));
    };
    const sendRequest = (receiver) => {
        ref
            .child(REQUESTS)
            .child(receiver.id)
            .child(user.id)
            .update({
                date: firebase.database.ServerValue.TIMESTAMP,
                ...user
            });
        ref
            .child(SENT)
            .child(user.id)
            .child(receiver.id)
            .update({
                date: firebase.database.ServerValue.TIMESTAMP,
                ...receiver
            });
    };

    return (
        <div className="requests-wrapper">
            {users.length ? (
                <div className="request-container">
                    {users.map((eachUser) => {
                        const {id, friends} = eachUser;
                        const {friends: userFriends} = mainUser;
                        const mutualFriendsCount = (!friends || !userFriends) ?
                            0 : getMutualFriends(friends, userFriends).length;
                        let mutualFriendsString;
                        if (!mutualFriendsCount) mutualFriendsString = 'No mutual friends';
                        else if (mutualFriendsCount === 1) mutualFriendsString = '1 mutual friend';
                        else mutualFriendsString = `${mutualFriendsCount} mutual friends`;

                        return (
                            <OtherUser
                                eachUser={eachUser}
                                mutualFriendsString={mutualFriendsString}
                                sendRequest={sendRequest}
                                key={id}
                                receivers={receivers}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
