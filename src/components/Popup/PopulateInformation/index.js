import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import "./index.scss";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";

function PopulateInformation(props) {
	console.log(props);
	const dispatch = useDispatch();

	const closePopupOverlay = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
		props.history.push("/profile/personal-details");
	};

	return (
		<div className="populate-information">
			<h1>Auto populate information?</h1>
			<div className="content">
				<p>
					Would you like us to auto populate your profile with all the updated
					information from your Resume?
				</p>
				<div className="cta">
					<button
						className="primary-btn blue outline"
						onClick={closePopupOverlay}
					>
						No, I will do it myself
					</button>
					<button className="primary-btn blue" onClick={closePopupOverlay}>
						Yes, do it for me
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(PopulateInformation);
