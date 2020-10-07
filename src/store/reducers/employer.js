import * as actionTypes from "../actions/actionTypes/employer";
import { updateObject } from "../utility";

const initialState = {
	hiringNeeds: {
        message: "",
        data: ["Option 1", "Option 2", "Option 3", "Option 4"],
        error: "",
        status: ""
	},
	companySize: {
        message: "",
        data: ["Option 1", "Option 2", "Option 3", "Option 4"],
        error: "",
        status: ""
	},
	phoneNumber: "",
	email: "",
	JWT: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_HIRING_NEEDS:
			return updateObject(state, {
				isVerified: {
					termsAndConditions: action.value,
					emailOtp: state.isVerified.emailOtp,
					phoneOtp: state.isVerified.phoneOtp,
				},
			});

		case actionTypes.SET_HIRING_NEEDS:
            const hiringNeedsTemp = state.hiringNeeds;
            hiringNeedsTemp.message = action.value.message;
            hiringNeedsTemp.error = action.value.error;
            hiringNeedsTemp.status = action.value.status;
            hiringNeedsTemp.data = action.value.data.map((value) => value.rangeName);
			return updateObject(state, {
				hiringNeedsTemp
			});

		case actionTypes.SET_COMPANY_SIZE:
            const companySizeTemp = state.companySize;
            companySizeTemp.message = action.value.message;
            companySizeTemp.error = action.value.error;
            companySizeTemp.status = action.value.status;
            companySizeTemp.data = action.value.data.map((value) => value.rangeName);
			return updateObject(state, {
				companySizeTemp
			});

		case actionTypes.SET_PHONE_NUMBER:
			return updateObject(state, {
				phoneNumber: action.value
			});

		case actionTypes.SET_EMAIL:
			return updateObject(state, {
				email: action.value
			});

		default:
			return state;
	}
};

export default reducer;
