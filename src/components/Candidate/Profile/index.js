import React from "react";
import { Route } from "react-router-dom";

import "./index.scss";
import ProfileOverview from "../../_Elements/ProfileOverview";
import Details from "./Details/Details";
import Questions from "../Profile/Questions";

function Profile(props) {
	return (
		<div className="profile flex">
			{props.location.pathname === "/profile/questions" ? (
				<Route path="/profile/questions" component={Questions} />
			) : (
				<>
					<ProfileOverview type="candidate" />
					<Details />
				</>
			)}
		</div>
	);
}

export default Profile;
