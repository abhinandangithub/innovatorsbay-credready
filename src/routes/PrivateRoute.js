// If user is loggedin, they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { updateJwtToken } from "../store/actions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const token = Cookies.get("JWT");
	if (token && !auth.JWT) dispatch(updateJwtToken(token));

	return (
		<Route
			{...rest}
			render={(props) =>
				true ? (
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
