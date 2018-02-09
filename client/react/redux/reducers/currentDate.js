import { ADD_CURRENT_DATE } from '../actions/events';
import moment from 'moment';

const currentDate = (state = moment(), action) => {
    switch (action.type) {
        case ADD_CURRENT_DATE:
            return action.data;
        default:
            return state;
    }
};

export default currentDate;