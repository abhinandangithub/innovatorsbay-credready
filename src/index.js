import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./index.scss";
import App from "./App";
import authReducer from "./store/reducers/auth";
import commonReducer from "./store/reducers/common";
import popupOverlayReducer from "./store/reducers/popup_overlay";
import employerReducer from "./store/reducers/employer";
import {
	candidateSetDataReducer,
	setAllFunctionsReducer,
	setAllIndustriesReducer,
	setCandidateCertificateTitlesReducer,
	setCandidateAllAnswersReducer,
	candidateCurrentStatusReducer,
	setCandidateJobsReducer,
	setCandidateAppliedJobsDataReducer,
	setCandidateExperienceTypeReducer,
	setCandidateDegreeTitlesReducer,
	setCandidateInstitutionTypeReducer,
	setCandidateJobViewDataReducer,
} from "./modals/candidateProfile/index";

const rootReducer = combineReducers({
	authReducer,
	popupOverlayReducer,
	candidateSetDataReducer,
	candidateCurrentStatusReducer,
	setCandidateAppliedJobsDataReducer,
	setCandidateExperienceTypeReducer,
	setCandidateDegreeTitlesReducer,
	setCandidateInstitutionTypeReducer,
	setCandidateAllAnswersReducer,
	setCandidateJobViewDataReducer,
	setCandidateJobsReducer,
	employerReducer,
	setCandidateCertificateTitlesReducer,
	setAllFunctionsReducer,
	setAllIndustriesReducer,
	commonReducer
});

/* Middleware */
const logger = (store) => {
	return (next) => {
		return (action) => {
			// console.log("[Middleware] Dispatcing", action);
			const result = next(action);
			// console.log("[Middleware] next state", store.getState());
			return result;
		};
	};
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
);

store.subscribe(() => {
	// console.log("[subscribe]", store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>,
	document.getElementById("root")
);
