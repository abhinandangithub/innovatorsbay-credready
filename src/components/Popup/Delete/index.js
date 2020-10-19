import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import { deleteAccount } from "../../../store/thunks/employer";
import { deleteWorkExperience, deleteEducationExperience, deleteOtherExperience, deleteCertificates } from "../../../modals/candidateProfile/thunk";

import "./index.scss";

function Delete(props) {
	const dispatch = useDispatch();
	const obj = useSelector(state => state.popupOverlayReducer && state.popupOverlayReducer.popup && state.popupOverlayReducer.popup.info)

	const closePopupOverlay = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
	};

	const handleDelete = () => {
		console.log(obj)
		if (props.what === "workExperience") {
			dispatch(deleteWorkExperience(obj.id))
		}
		if (props.what === "otherExperience") {
			dispatch(deleteOtherExperience(obj.id))
		}
		if (props.what === "education") {
			dispatch(deleteEducationExperience(obj.id))
		}
		if (props.what === "certificate") {
			dispatch(deleteCertificates(obj.id))
		}
		dispatch(deleteAccount());
	}

	const cta = (
		<div className="cta">
			<button className="primary-btn blue" onClick={closePopupOverlay}>
				Cancel
			</button>
			<button className="primary-btn blue outline" onClick={handleDelete}>Delete</button>
		</div>
	);

	const renderOutput = () => {
		if (props.what === "profile") {
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
		} else if (props.what === "workExperience") {
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
		} else if (props.what === "otherExperience") {
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
		} else if (props.what === "certificate") {
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
		} else if (props.what === "education") {
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
		}
	};

	return <div className="delete-popup">{renderOutput()}</div>;
}

export default Delete;
