import { ADD_QUESTION } from '../actions/events';

const questions = (state = [], action) => {
    switch (action.type) {
        case ADD_QUESTION:
            return [...action.data];
        default:
            return state;
    }
};

export default questions;