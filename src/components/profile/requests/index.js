import React, {useContext} from 'react';
import * as firebase from 'firebase/app';
import {StateContext} from '../../../context';
import {REQUESTS, LATEST, SENT, USER_DATA} from '../../../constants';

import {Request} from './Request';
import '../../../styles/requests.scss';

export const Requests = (props) => {
    const {state, ref} = useContext(StateContext);
    const {user} = state;
    const {requests, searchText} = props;

    const approveRequest = (requestId) => {
        ref
            .child(REQUESTS)
            .child(user.id)
            .child(requestId)
            .remove();
        ref
            .child(SENT)
            .child(requestId)
            .child(user.id)
            .remove();
        ref
            .child(LATEST)
            .child(requestId)
            .child(user.id)
            .update({
                date: firebase.database.ServerValue.TIMESTAMP,
                to: requestId,
                from: user.id,
                message: `Say hi...`
            });
        ref
            .child(LATEST)
            .child(user.id)
            .child(requestId)
            .update({
                date: firebase.database.ServerValue.TIMESTAMP,
                to: user.id,
                from: requestId,
                message: `Say hi...`
            });
        ref
            .child(USER_DATA)
            .child(user.id)
            .child('friends')
            .push(requestId);
        ref
            .child(USER_DATA)
            .child(requestId)
            .child('friends')
            .push(user.id);
    };

    const rejectRequest = (requestId) => {
        ref
            .child(REQUESTS)
            .child(user.id)
            .child(requestId)
            .remove();
        ref
            .child(SENT)
            .child(requestId)
            .child(user.id)
            .remove();
    };

    let filteredRequests = requests;
    if (searchText) {
        filteredRequests = requests.filter((request) =>
            request.email.includes(searchText.toLowerCase())
        );
    }
    return (
        <div className="requests-wrapper">
            {requests.length ? (
                <div className="request-container">
                    {filteredRequests.map((request) => {
                        return (
                            <Request
                                request={request}
                                approveRequest={approveRequest}
                                rejectRequest={rejectRequest}
                                key={request.id}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
