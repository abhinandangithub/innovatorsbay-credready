import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import Cookies from "js-cookie";
import { deleteAccount } from "../../../store/thunks/employer";
import { updateLoggedIn } from "../../../store/actions/auth";
import { showToast } from "../../../store/actions/toast";
import {
	deleteWorkExperience,
	deleteEducationExperience,
	deleteCandidateAccount,
	deleteOtherExperience,
	deleteCertificates,
} from "../../../modals/candidateProfile/thunk";

import "./index.scss";

function Delete(props) {
	const dispatch = useDispatch();
	const obj = useSelector(
		(state) =>
			state.popupOverlayReducer &&
			state.popupOverlayReducer.popup &&
			state.popupOverlayReducer.popup.info
	);

	const { popup } = useSelector((state) => state.popupOverlayReducer);

	const closePopupOverlay = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
	};

	const handleDelete = () => {
		if (popup && popup.info) {
			if (popup.info.what === "workExperience") {
				dispatch(deleteWorkExperience(obj.id));
				closePopupOverlay();
			} else if (popup.info.what === "otherExperience") {
				dispatch(deleteOtherExperience(obj.id));
				closePopupOverlay();
			} else if (popup.info.what === "education") {
				dispatch(deleteEducationExperience(obj.id));
				closePopupOverlay();
			} else if (popup.info.what === "certificate") {
				dispatch(deleteCertificates(obj.id));
				closePopupOverlay();
			} else if (popup.info.what === "profileEmployer") {
				closePopupOverlay();
				dispatch(deleteAccount());
				Cookies.remove("JWT");
				localStorage.clear();
				dispatch(updateLoggedIn([false, ""]));
				props.history.push("/login");
				dispatch(showToast({
					message: "Account deleted successfully",
					type: "success",
					isShow: true
				}));
			} else if (popup.info.what === "profileCandidate") {
				closePopupOverlay();
				dispatch(deleteCandidateAccount());
				Cookies.remove("JWT");
				localStorage.clear();
				dispatch(updateLoggedIn([false, ""]));
				props.history.push("/login");
				dispatch(showToast({
					message: "Account deleted successfully",
					type: "success",
					isShow: true
				}));

			}
		}
	};

	const cta = (
		<div className="cta">
			<button className="primary-btn blue" onClick={closePopupOverlay}>
				Cancel
			</button>
			<button className="primary-btn blue outline" onClick={handleDelete}>
				Delete
			</button>
		</div>
	);

	const renderOutput = () => {
		if (
			popup.info.what === "profileEmployer" ||
			popup.info.what === "profileCandidate"
		) {
			return (
				<>
					<h1>Delete your account</h1>
					<div className="content">
						<div className="highlight">
							<h2>Are you sure?</h2>
							<p>
								Once you confirm, all of your account data will be permanently
								deleted.
							</p>
						</div>
						{cta}
					</div>
				</>
			);
		} else if (popup.info.what === "workExperience") {
			return (
				<>
					<h1>Delete Work Experience</h1>
					<div className="content">
						<div className="highlight">
							<h2>Are you sure?</h2>
							<p>
								Once you confirm, your work experience will be permanently
								deleted.
							</p>
						</div>
						{cta}
					</div>
				</>
			);
		} else if (popup.info.what === "otherExperience") {
			return (
				<>
					<h1>Delete Other Experience</h1>
					<div className="content">
						<div className="highlight">
							<h2>Are you sure?</h2>
							<p>
								Once you confirm, your other experience will be permanently
								deleted.
							</p>
						</div>
						{cta}
					</div>
				</>
			);
		} else if (popup.info.what === "certificate") {
			return (
				<>
					<h1>Delete Certificate</h1>
					<div className="content">
						<div className="highlight">
							<h2>Are you sure?</h2>
							<p>
								Once you confirm, your certificate will be permanently deleted.
							</p>
						</div>
						{cta}
					</div>
				</>
			);
		} else if (popup.info.what === "education") {
			return (
				<>
					<h1>Delete Education</h1>
					<div className="content">
						<div className="highlight">
							<h2>Are you sure?</h2>
							<p>
								Once you confirm, your education will be permanently deleted.
							</p>
						</div>
						{cta}
					</div>
				</>
			);
		} else if (popup.info.what === "question") {
			return (
				<>
					<h1>Delete Question</h1>
					<div className="content">
						<div className="highlight">
							<h2>Are you sure?</h2>
							<p>Once you confirm, the question will be permanently deleted.</p>
						</div>
						{cta}
					</div>
				</>
			);
		}
	};

	return <div className="delete-popup">{renderOutput()}</div>;
}

export default withRouter(Delete);
