import * as t from '../types';

const initialState = {
    isLoading: false,
}

const admin = (state = initialState, action) => {
    switch (action.type) {
        // will be updated with Admin type
        case t.SET_ADMIN_USER_ID:
            return {
                ...state, loggedInUserId: action.payload
            }
        default:
            return { ...state }
    }
}

export default admin;