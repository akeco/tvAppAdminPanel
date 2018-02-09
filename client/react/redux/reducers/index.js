import { combineReducers } from 'redux';
import questions from './questions';
import authorized from './authorized';
import currentDate from './currentDate';
import activeQuestion from './activeQuestion';
import socket from './socket';
import disabledToDevices from './disabledToDevices';

const reducers = combineReducers({
    questions,
    authorized,
    currentDate,
    activeQuestion,
    socket,
    disabledToDevices
});

export default reducers;