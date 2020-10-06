import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./index.scss";
import ProfileOverview from "../../_Elements/ProfileOverview";
import Edit from "./Edit";
import View from "./View";

function Profile() {
	return (
		<div className="profile flex">
			<ProfileOverview type="employer" />
			<Switch>
				<Redirect exact from="/profile" to="/profile/view" />
				<Route path="/profile/view" component={View} />
				<Route path="/profile/edit" component={Edit} />
			</Switch>
		</div>
	);
}

export default Profile;
