import React from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./index.scss";
import ProfileOverview from "../../_Elements/ProfileOverview";
import Details from "./Details/Details";
import Questions from "../Jobs/Questions";
import { fetchCandidateDetails } from "../../../modals/candidateProfile/thunk";

function Profile(props) {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(fetchCandidateDetails());
	}, [])
	return (
		<div className="profile flex">
			{props.location.pathname === "/profile/questions" ? (
				<Route
					path="/profile/questions"
					exact
					render={(props) => (
						<Questions showEmployerQuestions={false} {...props} />
					)}
				/>
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
