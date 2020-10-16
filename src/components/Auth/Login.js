import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateLoggedIn } from "../../store/actions/auth";
import { tryLogin } from "../../store/thunks/auth";
import { setLogin } from "../../store/actions/employer";

function Login(props) {
	const auth = useSelector((state) => state.authReducer);
	const redirectURL = useSelector((state) => state.employerReducer.redirectURL);
	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();

	const [loginRemeber, setLoginRemeber] = useState(false);
	const [loginType, setLoginType] = useState("candidate");
	const [passwordShown, setPasswordShown] = useState(false);
	const [pwError, setPwError] = useState(false);
	const [authError, setAuthError] = useState(null);

	// const pw = "123";
	// console.log(auth.loggedIn);

	const onSubmit = (data) => {
		dispatch(
			tryLogin({
				username: data.email,
				password: data.password,
				remember_me: loginRemeber,
			})
		);

		console.log(auth);
		if (redirectURL !== "") {
			dispatch(setLogin(true));
			props.history.push(redirectURL);
		} else {
			props.history.push("/dashboard");
		}

		// console.log(data);
		// if (data.password !== pw) {
		//   setPwError(true);
		// } else {
		//   if (data.email === "candidate@gmail.com") {
		//     console.log("c");
		//     dispatch(updateLoggedIn([true, "candidate"]));
		//   } else if (data.email === "employer@gmail.com") {
		//     console.log("e");
		//     dispatch(updateLoggedIn([true, "employer"]));
		//   }
		// }
		// dispatch(updateLoggedIn([true, loginType]));
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleLoginTypeToggle = (id) => {
		setLoginType(id);
	};

	const toggleLoginRemeberme = (event) => {
		if (!event.target) return;
		setLoginRemeber(event.target.checked);
	};

	useEffect(() => {
		// console.log("auth ", auth.loggedIn);
		if (auth.loggedIn.value === null) {
			// setAuthError(true);
		} else {
			setAuthError(false);
			if (auth.loggedIn.value) {
				if (auth.loggedIn.as === "candidate") {
					props.history.push("/profile/resume");
				} else {
					props.history.push("/");
				}
			}
		}
		return () => {
			// cleanup
		};
	}, [auth, props]);

	// useEffect(() => {
	// 	console.log("auth ", auth.loggedIn);
	// 	if (auth.loggedIn.value === null) {
	// 		setAuthError(true);
	// 	} else {
	// 		setAuthError(false);
	// 	}
	// 	return () => {
	// 		// cleanup
	// 	};
	// }, [auth]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="content">
			<h3 style={{ marginBottom: "40px" }}>Login to your account</h3>
			<ul className="user-type flex hidden">
				<li>
					<input
						className="fancy-toggle"
						id="candidate"
						name="userType"
						type="radio"
						defaultChecked
						onChange={(e) => handleLoginTypeToggle(e.target.id)}
					/>
					<label htmlFor="candidate">Candidate</label>
				</li>
				<li>
					<input
						className="fancy-toggle"
						id="employer"
						name="userType"
						type="radio"
						onChange={(e) => handleLoginTypeToggle(e.target.id)}
					/>
					<label htmlFor="employer">Employer</label>
				</li>
			</ul>
			{authError && <p className="error">Wrong credentials</p>}
			{errors.email && errors.email && (
				<p className="error">Enter an valid email-id</p>
			)}
			{!errors.email && errors.password && (
				<p className="error">Please enter a valid password</p>
			)}
			{pwError && <p className="error">Enter valid password</p>}

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
						onChange={() => setAuthError(false)}
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
							onChange={() => setAuthError(false)}
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
				<a href="/" className="forgot" id="forgotPasswordLink">
					Forgot password?
				</a>
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

export default Login;
