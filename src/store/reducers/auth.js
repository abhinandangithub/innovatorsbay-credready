import * as actionTypes from "../actions/actionTypes/auth";
import { updateObject } from "../utility";

const initialState = {
	isVerified: {
		termsAndConditions: false,
		emailOtp: null,
		phoneOtp: null,
	},
	loggedIn: {
		value: false,
		as: "",
		// as: "candidate",
	},
	singUp: {
		email: null,
		password: null,
		phone: null,
	},
	JWT: null,
};

const stateCopy = JSON.parse(JSON.stringify(initialState));

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
			let data = {
				email: action.details.email,
				password: action.details.password,
				phone: action.details.phone,
				user_type: action.details.user_type,
			};
			if (action.details.user_type === "employer") {
				if (action.details.organisation) {
					data.organisation = action.details.organisation;
				} else {
					data.orgId = action.details.orgId;
				}
			}
			return updateObject(state, {
				signUp: data,
			});

		case actionTypes.UPDATE_JWT_TOKEN:
		console.log('JWT ', action.JWT);
			return updateObject(state, {
				JWT: action.JWT,
			});

		case actionTypes.CLEAR_AUTH_STATE:
			return stateCopy

		default:
			return state;
	}
};

export default reducer;
