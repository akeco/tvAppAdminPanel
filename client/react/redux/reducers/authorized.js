import { ADD_LOGIN_USER } from '../actions/events';

const authorized = (state = null, action) => {
    switch (action.type) {
        case ADD_LOGIN_USER:
            return action.data;
        default:
            return state;
    }
};

export default authorized;