import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePhoneOtp } from "../../../store/actions/auth";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import VerifyCode from "../../_Elements/VerifyCode";
import { calculateTimeLeft } from "../../../assets/js/Utility";
import { verifyOtp } from "../../../store/thunks/auth";

let timerDuration = 10 * 60; // in seconds

function VerifyPhone(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const [otp, setOtp] = useState([]);
	const [isCodeError, setIsCodeError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerDuration));
	let timerDisplay = "";

	const handleClick = () => {
		let data = {
			"type": "phone",
			"contact": "+16173837817",
			"verification_code": otp.join("")
		}
		if (
			otp.filter((i) => i.length > 0).length === 4 &&
			otp.join("") === "1111"
		) {
			dispatch(updatePhoneOtp(true));
			dispatch(verifyOtp(data));
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
					We have sent a verification code on your phone{" "}
					{auth.loggedIn.as === "employer" && "and email"}.
					<br />
					To proceed, enter the verification code | 1111
				</p>
				<div className="code-box flex">
					<p>
						{auth.loggedIn.as === "employer" ? "Code " : "Phone code "}
						<span>*</span>
					</p>
					<div className="code">
						<VerifyCode setOtp={(otp) => setOtp(otp)} type="Phone" />
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

export default VerifyPhone;
