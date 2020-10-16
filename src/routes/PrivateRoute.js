// If user is loggedin, they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { updateJwtToken, updateLoggedIn } from "../store/actions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	// const userType = localStorage.getItem("user_type")
	const token = Cookies.get("JWT");
	if (token && !auth.JWT) {
		console.log("abhi ", JSON.parse(token).map.user_type);
		dispatch(updateJwtToken(JSON.parse(token)));
		let userType = JSON.parse(token).map.user_type;
		if (userType === "jobseeker") {
			userType = "candidate";
		}
		dispatch(updateLoggedIn([true, userType]));
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				token ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
