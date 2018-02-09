import { CHANGE_ACTIVE_QUESTION } from '../actions/events';

const activeQuestion = (state = 0, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_QUESTION:
            return action.data;
        default:
            return state;
    }
};

export default activeQuestion;