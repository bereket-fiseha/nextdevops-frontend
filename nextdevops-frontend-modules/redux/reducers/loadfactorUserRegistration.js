import * as t from '../types';

const initialState = {
    isLoading: false,
}

const loadfactor = (state = initialState, action) => {
    switch (action.type) {
        // will be updated with load factor type
        case t.SET_LOADFACTOR_USER_ID:
            return {
                ...state, loggedInUserId: action.payload
            }
        default:
            return { ...state }
    }
}

export default loadfactor;