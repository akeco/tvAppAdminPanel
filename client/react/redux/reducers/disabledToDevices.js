import { DISABLED_TO_DEVICES } from '../actions/events';

const activeQuestion = (state = false, action) => {
    switch (action.type) {
        case DISABLED_TO_DEVICES:
            return action.data;
        default:
            return state;
    }
};

export default activeQuestion;