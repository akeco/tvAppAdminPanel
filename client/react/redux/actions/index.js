import {
    ADD_QUESTION,
    ADD_LOGIN_USER,
    ADD_CURRENT_DATE,
    CHANGE_ACTIVE_QUESTION,
    ADD_SOCKET,
    DISABLED_TO_DEVICES
} from './events';

export const addQuestion = data => {
    return ({
        type: ADD_QUESTION,
        data
    })
};

export const addLoginUser = data => {
    return ({
        type: ADD_LOGIN_USER,
        data
    })
};

export const addCurrentDate = data => {
    return ({
        type: ADD_CURRENT_DATE,
        data
    })
};

export const changeActiveQuestion = data => {
    return ({
        type: CHANGE_ACTIVE_QUESTION,
        data
    })
};

export const addSocket = data => {
    return ({
        type: ADD_SOCKET,
        data
    })
};

export const changeDisabledDevicesState = data => {
    return ({
        type: DISABLED_TO_DEVICES,
        data
    })
};