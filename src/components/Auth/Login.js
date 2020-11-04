import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector, connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { tryLogin } from "../../store/thunks/auth";
import { setLogin } from "../../store/actions/employer";
import { updateLoggedIn } from "../../store/actions/auth";
import { fetchAllAnswers } from "../../modals/candidateProfile/thunk";
import Spinner from "../_Elements/Spinner";

function Login(props) {
	const auth = useSelector((state) => state.authReducer);
	const redirectURL = useSelector((state) => state.employerReducer.redirectURL);
	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();
	const { addToast } = useToasts();

	const [loginRemeber, setLoginRemeber] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);

	const onSubmit = (data) => {
		dispatch(
			tryLogin({
				username: data.email,
				password: data.password,
				remember_me: loginRemeber,
			})
		);
		if (localStorage.getItem("jobId"));
		dispatch(fetchAllAnswers());

		if (redirectURL !== "") {
			dispatch(setLogin(true));
			props.history.push(redirectURL);
		} else {
			props.history.push("/dashboard");
		}
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const toggleLoginRemeberme = (event) => {
		if (!event.target) return;
		setLoginRemeber(event.target.checked);
	};

	useEffect(() => {
		console.log("auth ", auth.loggedIn);

		if (auth.loggedIn.as === "error") {
			addToast(auth.loggedIn.value, {
				appearance: "error", //error, success, warning, info
				autoDismiss: true,
			});
			dispatch(updateLoggedIn(["", ""]));
		} else if (auth.loggedIn.value && auth.loggedIn.value !== "") {
			if (localStorage.getItem("jobId")) {
				props.history.push("/profile/questions");
			} else if (auth.loggedIn.as === "candidate") {
				props.history.push("/profile/resume");
			} else {
				props.history.push("/");
			}
		}
		return () => {
			// cleanup
		};
	}, [auth]);

	return props.loading ? (
		<Spinner />
	) : (
		<form onSubmit={handleSubmit(onSubmit)} className="content">
			<h3 style={{ marginBottom: "40px" }}>Login to your account</h3>
			{errors.email && errors.email && (
				<p className="error">Enter an valid email-id</p>
			)}
			{!errors.email && errors.password && (
				<p className="error">Please enter a valid password</p>
			)}

			<ul className="fields">
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
					<label htmlFor="password">
						Password<span>*</span>
					</label>
					<div className="password">
						<input
							id="password"
							name="password"
							type={passwordShown ? "text" : "password"}
							autoComplete="nothing"
							placeholder="Enter your password"
							ref={register({
								required: "required",
								pattern: {
									value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
								},
							})}
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
			<div className="help-block flex">
				<span>
					<input
						className="fancy-toggle checkbox blue"
						id="rememberMe"
						name="rememberMe"
						type="checkbox"
						onChange={toggleLoginRemeberme}
					/>
					<label htmlFor="rememberMe">
						<span className="input"></span>Remember Me
					</label>
				</span>
				<Link to="/forgot-password" className="forgot" id="forgotPasswordLink">
					Forgot password?
				</Link>
			</div>
			<input
				className="primary-btn blue"
				type="submit"
				value="Login"
				id="loginSubmit"
			/>
			<p>
				Don't have an account?{" "}
				<Link to="/signup" id="signupLink">
					Create an account
				</Link>
			</p>
		</form>
	);
}

// export default Login;

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
	};
}

// export default CreateJob;
export default connect(mapStateToProps)(Login);
