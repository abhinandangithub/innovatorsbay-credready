import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePopup, toggleOverlay } from "../../store/actions/popup_overlay";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";

/* popups */
import Delete from "./Delete";
import TermsAndConditions from "./TermsAndConditions";
import VerifyEmail from "./VerifyEmail";
import VerifyPhone from "./VerifyPhone";
import Certificate from "./Certificate";
import PopulateInformation from "./PopulateInformation";
import AddWorkExperience from "./AddExpEduWorkCert/AddWorkExperience";
import AddOtherExperience from "./AddExpEduWorkCert/AddOtherExperience";
import AddEducation from "./AddExpEduWorkCert/AddEducation";
import AddCertificate from "./AddExpEduWorkCert/AddCertificate";
import AddEduOtherExperience from "./AddExpEduWorkCert/AddEduOtherExperience";
import AddStrength from "./AddStrength";
import CreateEmailTemplate from "./Employer/CreateEmailTemplate";
import CreateNewQuestion from "./Employer/CreateNewQuestion";
import ChoosePrivateQuestions from "./Employer/ChoosePrivateQuestions";
import ChoosePublicQuestions from "./Employer/ChoosePublicQuestions";
import AddNewQuestion from "./Employer/AddNewQuestion";
import JobApplied from "./JobApplied";

let scrollBarStyle = {
	width: "100vw",
	height: "100vh",
};

function Popup(props) {
	const dispatch = useDispatch();
	const { popup } = useSelector((state) => state.popupOverlayReducer);

	let info = null;
	if (popup.info) {
		info = popup.info;
	}

	/* render popups based on conditions */
	const renderPopup = () => {
		switch (popup.which) {
			case "termsAndConditions":
				return <TermsAndConditions />;
			case "emailOtp":
				return <VerifyEmail />;
			case "phoneOtp":
				return <VerifyPhone />;
			case "delete":
				return <Delete what={info.what} />;
			case "certificate":
				return <Certificate certificate={info.certificate} />;
			case "addWorkExperience":
				return <AddWorkExperience />;
			case "addOtherExperience":
				return <AddOtherExperience />;
			case "addEducation":
				return <AddEducation />;
			case "addCertificate":
				return <AddCertificate />;
			case "addEduOtherExperience":
				return <AddEduOtherExperience />;
			case "addStrength":
				return <AddStrength heading={info.heading} />;
			case "createEmailTemplate":
				return <CreateEmailTemplate />;
			case "createNewQuestion":
				return <CreateNewQuestion type={info.type} />;
			case "choosePrivateQuestions":
				return <ChoosePrivateQuestions />;
			case "choosePublicQuestions":
				return <ChoosePublicQuestions />;
			case "addNewQuestion":
				return <AddNewQuestion />;
			case "populateInformation":
				return <PopulateInformation />;
			case "jobApplied":
				return <JobApplied />;
			default:
				return null;
		}
	};

	const closePopupOverlay = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false));
	};

	return (
		<div className={`popup-scroll-area ${props.active ? "active" : ""}`}>
			<Scrollbars
				className="custom-scrollbar"
				style={scrollBarStyle}
				// autoHide
				autoHideTimeout={1000}
				autoHideDuration={600}
				renderTrackVertical={({ style, ...props }) => (
					<div
						{...props}
						className="bar"
						style={{
							...style,
						}}
					/>
				)}
			>
				<div className={`popup ${popup.which ? "popup-" + popup.which : ""}`}>
					{renderPopup()}
					<button
						className="close"
						id="closePopupBtn"
						onClick={closePopupOverlay}
					></button>
				</div>
			</Scrollbars>
		</div>
	);
}

export default Popup;
