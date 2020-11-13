import {
    SAVE_USER,
    RESET_USER,
    SHOW_SPINNER,
    HIDE_SPINNER,
    SET_ACTIVE,
    ADD_NEW_RECEIVER,
    UPDATE_CHANGED_RECEIVER,
    OPEN_MODAL,
    CLOSE_MODAL,
    UPDATE_LATEST,
    SET_USER_DETAILS,
    CHANGE_THEME,
    SET_THEME
} from '../constants';

export const rootReducer = (state, action) => {
    switch (action.type) {
        case SAVE_USER: {
            return {
                ...state,
                user: action.user,
                active: 'Chats'
            };
        }
        case RESET_USER: {
            return {
                spinnerFlag: false,
                latest: [],
                modalFlag: false
            };
        }
        case SHOW_SPINNER: {
            return {
                ...state,
                spinnerFlag: true
            };
        }
        case HIDE_SPINNER: {
            return {
                ...state,
                spinnerFlag: false
            };
        }

        case ADD_NEW_RECEIVER: {
            const userExists = state.latest.find((eachUser) => eachUser.receiver.id === action.receiver.id);
            if (userExists) return state;
            const localLatest = [{
                receiver: action.receiver,
                messageDetails: action.messageDetails
            }, ...state.latest];
            const latest = localLatest.sort((first, second) =>
                second.messageDetails.date - first.messageDetails.date
            );
            return {
                ...state,
                latest
            };
        }

        case UPDATE_LATEST: {
            const {latest} = action;
            return {
                ...state,
                latest
            };
        }

        case UPDATE_CHANGED_RECEIVER: {
            const localLatest = state.latest.map(
                (latestUser) => {
                    if (latestUser.receiver.id === action.receiver.id) {
                        return ({
                            receiver: action.receiver,
                            messageDetails: latestUser.messageDetails
                        });
                    }
                    return latestUser;
                });
            return {
                ...state,
                latest: localLatest
            };
        }

        case SET_USER_DETAILS : {
            const {userDetails} = action;
            return {
                ...state,
                userDetails
            };
        }

        case SET_ACTIVE: {
            return {
                ...state,
                active: action.active
            };
        }
        case OPEN_MODAL: {
            return {
                ...state,
                modalFlag: true
            };
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalFlag: false
            };
        }
        case CHANGE_THEME: {
            const {darkTheme} = state;
            localStorage.setItem('darkTheme', !darkTheme);
            return {
                ...state,
                darkTheme: !darkTheme
            };
        }
        case SET_THEME: {
            const {darkTheme} = action;
            return {
                ...state,
                darkTheme: JSON.parse(darkTheme)
            };
        }
        default:
            return state;
    }
};