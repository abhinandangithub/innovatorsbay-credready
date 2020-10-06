import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./Details.scss";

import Tabs from "../Tabs";

import Resume from "../Tabs/Resume";
import PersonalDetails from "../Tabs/PersonalDetails";
import WorkExperience from "../Tabs/WorkExperience";
import Education from "../Tabs/Education";
import Strengths from "../Tabs/Strengths";
import Preview from "../Tabs/Preview";

function Details() {
	return (
		<div className="profile-details">
			<Tabs />

			<Switch>
				<Redirect exact from="/profile" to="/profile/resume" />
				<Route path="/profile/resume" component={Resume} />
				<Route path="/profile/personal-details" component={PersonalDetails} />
				<Route path="/profile/work-experience" component={WorkExperience} />
				<Route path="/profile/education" component={Education} />
				<Route path="/profile/strengths" component={Strengths} />
				<Route path="/profile/preview" component={Preview} />
			</Switch>
		</div>
	);
}

export default Details;
