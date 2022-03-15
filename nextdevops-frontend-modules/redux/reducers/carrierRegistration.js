import * as t from '../types';

const initialState = {
    carrierInfo: {
        carrierId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        carrierCompName: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        address2: '',
        companyAddress: false,
    },
    isLoading: false,
}

const carrierRegistration = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_CARRIER_DETAILS_REQUEST:
            return {
                ...state, isLoading: action.isLoading
            }
        case t.SET_CARRIER_DETAILS:
            return {
                ...state, carrierInfo: action.payload !== undefined ? action.payload : initialState, isLoading: false
            };
        case t.SET_CARRIER_ID:
            return {
                ...state, loggedInUserId: action.payload
            }
        case t.SET_CARRIER_DETAILS_COMPLETED:
            return {
                ...state, isLoading: false
            }
        default:
            return { ...state }
    }
}

export default carrierRegistration;