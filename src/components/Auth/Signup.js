import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { togglePopup, toggleOverlay } from "../../store/actions/popup_overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getVerificationCode } from "../../store/thunks/auth";

import { updateLoggedIn, updateSignupDetails } from "../../store/actions/auth";

function Signup(props) {
	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm();

	const [signupType, setSignupType] = useState("candidate");
	const [passwordShown, setPasswordShown] = useState(false);

	const onSubmit = (data) => {
		data.user_type = signupType === "candidate" ? "jobseeker" : signupType;
		// data.phone = "+"+ data.phone;
		dispatch(getVerificationCode(data));
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "termsAndConditions"]));
		dispatch(updateLoggedIn([false, signupType]));
		dispatch(updateSignupDetails(data));
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleSignupTypeToggle = (id) => {
		setSignupType(id);
	};

	useEffect(() => {
		return () => {
			// cleanup
		};
	}, [signupType]);

	const showErrorMessage = () => {
		if (errors.name) {
			return <p className="error">Name is required.</p>;
		} else if (errors.email) {
			return <p className="error">Enter an valid email-id</p>;
		} else if (errors.phone) {
			return <p className="error">Your phone no. is invalid.</p>;
		} else if (errors.password) {
			return (
				<p className="error">
					The password needs to be a least 8 characters with at least one upper
					case, one lowercase, 1 number and 1 special character.
				</p>
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="content">
			<h3>Create your account</h3>

			{showErrorMessage()}

			<ul className="fields">
				<li>
					<label>Are you a</label>
					<div className="user-type">
						<input
							className="block-toggle blue"
							id="candidateRadioInput"
							name="userType"
							type="radio"
							defaultChecked
							onChange={(e) => handleSignupTypeToggle("candidate")}
						/>
						<label htmlFor="candidateRadioInput">Candidate</label>
						<span>Or</span>
						<input
							className="block-toggle blue"
							id="employerRadioInput"
							name="userType"
							type="radio"
							onChange={(e) => handleSignupTypeToggle("employer")}
						/>
						<label htmlFor="employerRadioInput">Employer</label>
					</div>
				</li>

				{signupType === "employer" ? (
					<li>
						<label htmlFor="organisation">
							Organisation Name <span>*</span>
						</label>
						<input
							id="organisation"
							name="organisation"
							type="text"
							autoComplete="nothing"
							placeholder="Enter Organisation Name"
							autoFocus
							ref={register({
								required: "Required",
							})}
						/>
					</li>
				) : null}
				<li>
					<label htmlFor="email">
						E-mail<span>*</span>
					</label>
					<input
						id="email"
						name="email"
						type="emai"
						autoComplete="off"
						placeholder="Enter your active Email ID"
						ref={register({
							required: "Required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							},
						})}
					/>
				</li>
				<li>
					<label htmlFor="phone">
						Phone number<span>*</span>
					</label>
					<input
						id="phone"
						name="phone"
						type="text"
						autoComplete="nothing"
						placeholder="123-456-7890"
						// defaultValue="1234567890"
						ref={register({
							required: "required",
							pattern: {
								value: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
							},
						})}
					/>
				</li>
				<li>
					<label htmlFor="password">
						Password<span>*</span>
					</label>
					<div className="password">
						<input
							id="password"
							name="password"
							type={passwordShown ? "text" : "password"}
							autoComplete="off"
							placeholder="Enter your password"
							// defaultValue="12#@sdfSDF"
							ref={register({
								required: "required",
								pattern: {
									value: /^(?=.*\d)(?=.*[a-z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
								},
							})}
						/>
						<span className="toggle" onClick={togglePasswordVisiblity}>
							<FontAwesomeIcon
								icon={passwordShown ? faEye : faEyeSlash}
								className="lines"
							/>
						</span>
					</div>
					<p className="hint">
						Use 8 or more characters with a one upper case and one lower case
						and one special character.
					</p>
					<div className="agree">
						<input
							className="fancy-toggle checkbox blue"
							id="agree"
							name="agree"
							type="checkbox"
						/>
						<label htmlFor="agree">
							<span className="input"></span>I agree to the &nbsp;
							<Link to="#" onClick={() => props.show_tnc(true)}>
								Terms and Conditions
							</Link>
							&nbsp; and &nbsp;
							<Link to="#" onClick={() => props.show_pnp(true)}>
								Privacy Policy
							</Link>
						</label>
					</div>
				</li>
			</ul>

			<input className="primary-btn blue" type="submit" value="Create" />

			<p>
				Already have an account?{" "}
				<Link to="/login" id="loginLink">
					Login
				</Link>
			</p>
		</form>
	);
}

export default Signup;
