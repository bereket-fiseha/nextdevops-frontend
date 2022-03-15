import * as t from '../types';

const initialState = {
    shipperInfo: {
        shipperId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        shipperCompName: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        address2: '',
        companyAddress: false,
    },
    isLoading: false,
}

const shipperRegistration = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_SHIPPER_DETAILS_REQUEST:
            return {
                ...state, isLoading: action.isLoading
            }
        case t.SET_SHIPPER_DETAILS:
            return {
                ...state, shipperInfo: action.payload !== undefined ? action.payload : initialState, isLoading: false
            };
        case t.SET_SHIPPER_ID:
            return {
                ...state, loggedInUserId: action.payload
            }
        case t.SET_SHIPPER_DETAILS_COMPLETED:
            return {
                ...state, isLoading: false
            }
        case t.SET_SHIPPER_REQUEST_QUOTES_DETAILS:
            return {
                ...state, requestForQuotes: action.payload
            }

        default:
            return { ...state }
    }
}

export default shipperRegistration;