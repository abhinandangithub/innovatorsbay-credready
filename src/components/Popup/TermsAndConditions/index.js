import React from "react";
import { useForm } from "react-hook-form";
import { Scrollbars } from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";

import { updateTermsAndConditions } from "../../../store/actions/auth";
import { togglePopup } from "../../../store/actions/popup_overlay";

import "./index.scss";
import { signUpUser, verifyUserCode } from "../../../store/thunks/auth";

let scrollBarStyle = {
	width: "700px",
	height: "450px",
};

function TermsAndConditions(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const signupDetails = auth.signUp;
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		let boolValue = data.termsandconditions && data.allowContact;

		if (auth.loggedIn.as === "employer") {
			boolValue = data.termsandconditions;
		}

		dispatch(updateTermsAndConditions(boolValue));
		if (!boolValue) return;
		//	dispatch(signUpUser(signupDetails));
		if (auth.loggedIn.as === "candidate") {
			dispatch(togglePopup([true, "emailOtp"]));
		} else {
			dispatch(togglePopup([true, "phoneOtp"]));
		}
	};

	return (
		<div className="terms-and-conditions">
			<h1>Term and Conditions</h1>
			<div className="wrapper">
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
					<form className="content" onSubmit={handleSubmit(onSubmit)}>
						<p className="info">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
							<br />
							<br />
							It has survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
							<br />
							<br />
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
							<br />
							<br />
							It has survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
							<br />
							<br />
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
							<br />
							<br />
							It has survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
							<br />
							<br />
						</p>
						<div className="check-boxes">
							<div className="check-box">
								<input
									type="checkbox"
									name="termsandconditions"
									id="termsandconditions"
									className="fancy-toggle checkbox"
									value={true}
									ref={register({
										required: "Required field.",
									})}
								/>
								<label htmlFor="termsandconditions">
									<span className="input"></span>I agree to the CredReady Terms
									and Conditions <span>*</span>
								</label>
							</div>
							{errors.termsandconditions && (
								<p className="error-message">
									{errors.termsandconditions.message}
								</p>
							)}
							{auth.loggedIn.as === "candidate" && (
								<div className="check-box">
									<input
										className="fancy-toggle checkbox"
										type="checkbox"
										name="allowContact"
										id="allowContact"
										ref={register({
											required: "Required field.",
										})}
									/>
									<label htmlFor="allowContact">
										<span className="input"></span>Allow recruiters to contact
										you for more details <span>*</span>
									</label>
								</div>
							)}
							{errors.allowContact && (
								<p className="error-message">{errors.allowContact.message}</p>
							)}
						</div>
						<input
							className="primary-btn"
							type="submit"
							value="Submit"
							id="submitBtn"
						/>
					</form>
				</Scrollbars>
			</div>
		</div>
	);
}

export default TermsAndConditions;
