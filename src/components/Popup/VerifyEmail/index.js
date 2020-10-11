import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateEmailOtp } from "../../../store/actions/auth";
import { togglePopup, toggleOverlay } from "../../../store/actions/popup_overlay";
import VerifyCode from "../../_Elements/VerifyCode";
import { calculateTimeLeft } from "../../../assets/js/Utility";
import { verifyOtp } from "../../../store/thunks/auth";

let timerDuration = 10 * 60; // in seconds

function VerifyEmail(props) {
	const dispatch = useDispatch();
	const [otp, setOtp] = useState([]);
	const [isCodeError, setIsCodeError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerDuration));
	let timerDisplay = "";

	const handleClick = () => {
		let data = {
			"type": "email",
			"contact": "+16173837817",
			"verification_code": otp.join("")
		}
		if (
			otp.filter((i) => i.length > 0).length === 4 &&
			otp.join("") === "0000"
		) {
			dispatch(updateEmailOtp(true));
			dispatch(verifyOtp(data));
			// dispatch(togglePopup([true, "phoneOtp"]));
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
			setIsCodeError(false);
		} else {
			setIsCodeError(true);
		}
	};

	useEffect(() => {
		setIsCodeError(false);
	}, [otp]);

	useEffect(() => {
		setTimeout(() => {
			timerDuration--;
			setTimeLeft(calculateTimeLeft(timerDuration));
		}, 1000);
	}, [timerDuration]);

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}
		timerDisplay = `${timeLeft["m"]} : ${timeLeft["s"]}`;
	});

	return (
		<div className="verify-email-phone-code">
			<h1>Verify your account</h1>
			<div className="content">
				<p className="info">
					We have sent a verification code on your email.
					<br />
					To proceed, enter the verification code | 0000
				</p>
				<div className="code-box flex">
					<p>
						Email code <span>*</span>
					</p>
					<div className="code">
						<VerifyCode setOtp={(otp) => setOtp(otp)} type="Email" />
					</div>
				</div>
				<button className="primary-btn" onClick={handleClick} id="submitBtn">
					Validate
				</button>
				{isCodeError && timerDisplay !== "" ? (
					<p className="error-code">Code is incorrect, try again!</p>
				) : (
					""
				)}
				{timerDisplay !== "" ? (
					<p className="status">
						Verification Code Expires in
						<span className="time"> {timerDisplay} minutes</span>
					</p>
				) : (
					<p className="status resend" id="resendVerificationCodeLink">
						Resend Verification Code
					</p>
				)}
			</div>
		</div>
	);
}

export default VerifyEmail;
