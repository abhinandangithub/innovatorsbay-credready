import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import { updatePhoneOtp } from "../../../store/actions/auth";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import VerifyCode from "../../_Elements/VerifyCode";
import { calculateTimeLeft } from "../../../assets/js/Utility";
import { signUpUser, verifyUserCode } from "../../../store/thunks/auth";
import { resendVerificationCode } from "../../../store/thunks/auth";

let duration = 10 * 60;
let timerDuration = duration; // in seconds

function VerifyPhone(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const [otp, setOtp] = useState([]);
	const [isCodeError, setIsCodeError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerDuration));
	let timerDisplay = "";
	const [isOtpVerifying, setIsOtpVerifying] = useState(false);

	const handleClick = async () => {
		console.log("otp ", otp);
		if (
			// otp.filter((i) => i.length > 0).length === 4
			otp.filter((i) => i !== "").length === 4
		) {
			setIsOtpVerifying(true);
			dispatch(verifyUserCode("phone", otp.join("")));
			//	dispatch(updatePhoneOtp(true));
			//	dispatch(toggleOverlay(false));
			//	dispatch(togglePopup(false));
			setIsCodeError(false);
		} else {
			setIsCodeError(true);
			setIsOtpVerifying(false);
		}
	};

	useEffect(() => {
		if (props.isVerified.phoneOtp) {
			setIsOtpVerifying(false);
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
		} else {
			setIsCodeError(true);
			setIsOtpVerifying(false);
		}
	}, [props.isVerified.phoneOtp]);

	useEffect(() => {
		setIsCodeError(false);
	}, [otp]);

	useEffect(() => {
		return () => {
			// console.log("Reseting OTP");
			timerDuration = duration;
		};
	}, []);

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

	const resendCode = () => {
		timerDuration = duration;
		dispatch(resendVerificationCode());
	};

	return (
		<div className="verify-email-phone-code">
			<h1>Verify your account</h1>
			<div className="content">
				<p className="info">
					We have sent a verification code on your phone and email
					<br />
					To proceed, enter the verification code
					<br />
					If you have not received the email in inbox, please check spam.
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
				<button
					className="primary-btn"
					disabled={isOtpVerifying}
					onClick={handleClick}
					id="submitBtn"
				>
					{!isOtpVerifying ? "Validate" : "Validating..."}
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
					<p
						className="status resend"
						id="resendVerificationCodeLink"
						onClick={resendCode}
					>
						Resend Verification Code
					</p>
				)}
			</div>
		</div>
	);
}

// export default VerifyPhone;

function mapStateToProps(state) {
	return {
		isVerified: state.authReducer.isVerified,
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(VerifyPhone);
