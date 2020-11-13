import React, {
    useState,
    useContext,
    useEffect
} from 'react';
import {StateContext} from '../../context';
import {REQUESTS, USER_DATA, SENT} from '../../constants';
import {Finder, Requests, ProfileDetails} from '../profile';

import {SearchBox} from '../ui';
import '../../styles/profile.scss';

export const Profile = () => {
    const {state, ref} = useContext(StateContext);
    const {user, active, latest = [], userDetails} = state;
    const [requests, setRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [screen, setScreen] = useState('');

    let receivers = latest.map((latestUsers) => {
        const {receiver} = latestUsers;
        return receiver.id;
    });
    const sentRequestsIds = sentRequests.map((sentRequest) => sentRequest.id);
    const receiverRequestsIds = requests.map((request) => request.id);
    if (user) {
        receivers = [
            ...receivers,
            ...sentRequestsIds,
            ...receiverRequestsIds,
            user.id
        ];
    }

    useEffect(() => {
        if (user) {
            ref
                .child(REQUESTS)
                .child(user.id)
                .orderByChild('date')
                .on('value', function(snapshot) {
                    let requests = [];
                    snapshot.forEach((element) => {
                        const requestDetails = element.val();
                        requests = [...requests, requestDetails];
                    });
                    setRequests(requests);
                });
            ref
                .child(SENT)
                .child(user.id)
                .orderByChild('date')
                .on('value', function(snapshot) {
                    let sentRequests = [];
                    snapshot.forEach((element) => {
                        const requestDetails = element.val();
                        sentRequests = [...sentRequests, requestDetails];
                    });
                    setSentRequests(sentRequests);
                });
        }
    }, []);

    useEffect(() => {
        if (active !== 'Profile') {
            setScreen('');
        }
    }, [active]);

    const handleSearchText = (text) => {
        setSearchText(text);
        if (text.length > 2) {
            ref
                .child(USER_DATA)
                .orderByChild('email')
                .startAt(text.toLowerCase())
                .limitToFirst(10)
                .on('value', function(snapshot) {
                    let users = [];
                    snapshot.forEach((element) => {
                        const userDetails = element.val();
                        users = [...users, userDetails];
                    });
                    setUsers(users);
                });
        } else setUsers([]);
    };

    const getClassName = () => {
        if (screen === 'requests') return 'people-container people-container-forward';
        if (screen === 'sent') return 'people-container people-container-reverse';
        return 'people-container';
    };

    if (user) {
        return (
            <div className={active === 'Profile' ? 'profile' : 'profile-hidden'}>
                <ProfileDetails user={userDetails} />
                <div className="requests-container">
                    <div className={getClassName()}>
                        <span className="requests-label" onClick={() => setScreen('requests')}>Friend Requests</span>
                        <span className="find-friends-label" onClick={() => setScreen('sent')}>Find Friends</span>
                    </div>
                    <SearchBox
                        vaue={searchText}
                        placeholder={'Search...'}
                        handleChange={handleSearchText}
                    />
                    {screen === 'sent' ?
                        <Finder
                            users={users}
                            receivers={receivers}
                            mainUser={userDetails}
                        /> :
                        <Requests
                            requests={requests}
                            searchText={searchText}
                        />}
                </div>
            </div>
        );
    } return null;
};
