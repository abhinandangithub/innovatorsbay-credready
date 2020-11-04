import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VerifyCode from "../_Elements/VerifyCode";
import { calculateTimeLeft } from "../../assets/js/Utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

let timerDuration = 10 * 60; // in seconds

function ForgotPassword() {
	const [otp, setOtp] = useState([]);
	const [isCodeError, setIsCodeError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerDuration));
	const [isEmailValid, setisEmailValid] = useState(false);
	const [isOtpValid, setisOtpValid] = useState(false);
	const [isPasswordReset, setisPasswordReset] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);

	let timerDisplay = "";

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
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

	const sendVerificationCode = () => {
		console.log("sendVerificationCode");
		setisEmailValid(true);
	};

	const verifyCode = () => {
		console.log("verifyCode");

		console.log("otp: ", otp);

		if (otp.length === 4) {
			setIsCodeError(false);
		} else {
			setIsCodeError(true);
		}

		setisOtpValid(true);
	};

	const resetPassword = () => {
		console.log("sendVerificationCode");
		setisPasswordReset(true);
	};

	const renderEmail = (
		<>
			<h3>Forgot Password</h3>
			<p className="sub_heading">
				Enter your registered email address below and we will send you a
				verification code to reset your password
			</p>
			<ul className="fields">
				<li>
					<label htmlFor="email">
						E-mail <span>*</span>
					</label>
					<input
						id="email"
						name="email"
						type="emai"
						autoComplete="off"
						placeholder="Enter your active Email ID"
					/>
				</li>
			</ul>

			<div className="cta">
				<Link to="/login" className="primary-btn outline">
					Back to Login
				</Link>
				<button
					className="primary-btn blue disabled!"
					onClick={sendVerificationCode}
				>
					Send verification code
				</button>
			</div>
		</>
	);
	const renderOTP = (
		<>
			<h3>Forgot Password</h3>
			<p className="sub_heading">
				We have sent a verification code to your email.
				<br />
				To proceed, enter the verification code below.
			</p>
			<div className="code-box flex">
				<p>
					Email code <span>*</span>
				</p>
				<div className="code">
					<VerifyCode setOtp={(otp) => setOtp(otp)} type="Email" />
				</div>
			</div>
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
			<div className="cta">
				<Link to="/login" className="primary-btn outline">
					Back to Login
				</Link>
				<button className="primary-btn blue disabled!" onClick={verifyCode}>
					Verify Code
				</button>
			</div>
		</>
	);
	const renderReset = (
		<>
			<h3>Reset Password</h3>
			<p className="sub_heading">
				We have sent a verification code to your email. <br />
				To proceed, enter the verification code below.....??
			</p>
			<ul className="fields">
				<li>
					<label htmlFor="email">
						New Password <span>*</span>
					</label>
					<div className="password">
						<input
							id="password"
							name="password"
							type={passwordShown ? "text" : "password"}
							autoComplete="nothing"
							placeholder="Enter your password"
						/>
						<span
							className="toggle"
							onClick={togglePasswordVisiblity}
							id="togglePasswordVisiblity"
						>
							<FontAwesomeIcon
								icon={passwordShown ? faEye : faEyeSlash}
								className="lines"
							/>
						</span>
					</div>
				</li>
				<li>
					<label htmlFor="email">
						Confirm Password <span>*</span>
					</label>
					<div className="password">
						<input
							id="password"
							name="password"
							type={passwordShown ? "text" : "password"}
							autoComplete="nothing"
							placeholder="Enter your password"
						/>
						<span
							className="toggle"
							onClick={togglePasswordVisiblity}
							id="togglePasswordVisiblity"
						>
							<FontAwesomeIcon
								icon={passwordShown ? faEye : faEyeSlash}
								className="lines"
							/>
						</span>
					</div>
				</li>
			</ul>

			<div className="cta">
				<button className="primary-btn blue" onClick={resetPassword}>
					Reset Password
				</button>
			</div>
		</>
	);
	const renderSuccess = (
		<>
			<h3>Password Changed</h3>
			<p className="sub_heading" style={{ marginBottom: "10px" }}>
				Your password has been changed successfully <br />
				Login using your new password
			</p>

			<div className="cta">
				<Link className="primary-btn blue" to="/login">
					Login
				</Link>
			</div>
		</>
	);
	return (
		<div className="content forgot_password">
			{isPasswordReset
				? renderSuccess
				: isOtpValid
				? renderReset
				: isEmailValid
				? renderOTP
				: renderEmail}
		</div>
	);
}

export default ForgotPassword;
