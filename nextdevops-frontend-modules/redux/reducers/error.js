import * as t from '../types';

const initialState = {
    error: null,
    isLoading: false
}

const errorHandle = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_ERROR:
            return {
                error: action.error,
                isLoading: action.isLoading
            };
        case t.HIDE_ERROR:
            return {
                error: null
            }
        default:
            return { ...state }
    }
}

export default errorHandle;