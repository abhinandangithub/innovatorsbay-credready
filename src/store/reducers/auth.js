import * as actionTypes from "../actions/actionTypes/auth";
import { updateObject } from "../utility";

const initialState = {
	isVerified: {
		termsAndConditions: false,
		emailOtp: false,
		phoneOtp: false,
	},
	loggedIn: {
		value: false,
		as: "employer",
	},
	singUp: {
		email: null,
		password: null,
		phone: null,
	},
	JWT: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_TERMSANDCONDITIONS:
			return updateObject(state, {
				isVerified: {
					termsAndConditions: action.value,
					emailOtp: state.isVerified.emailOtp,
					phoneOtp: state.isVerified.phoneOtp,
				},
			});

		case actionTypes.UPDATE_EMAILOTP:
			return updateObject(state, {
				isVerified: {
					termsAndConditions: state.isVerified.termsAndConditions,
					emailOtp: action.value,
					phoneOtp: state.isVerified.phoneOtp,
				},
			});

		case actionTypes.UPDATE_PHONEOTP:
			return updateObject(state, {
				isVerified: {
					termsAndConditions: state.isVerified.termsAndConditions,
					emailOtp: state.isVerified.emailOtp,
					phoneOtp: action.value,
				},
			});

		case actionTypes.UPDATE_LOGGEDIN:
			return updateObject(state, {
				loggedIn: {
					value: action.value[0],
					as: action.value[1],
				},
			});

		case actionTypes.UPDATE_SINGUP_DETAILS:
			return updateObject(state, {
				signUp: {
					email: action.details.email,
					password: action.details.password,
					phone: action.details.phone,
				},
			});

		case actionTypes.UPDATE_JWT_TOKEN:
			return updateObject(state, {
				JWT: action.JWT,
			});
		default:
			return state;
	}
};

export default reducer;
