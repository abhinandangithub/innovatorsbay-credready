import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.scss";
import Login from "./Login";
import Signup from "./Signup";
import ThankYou from "./ThankYou";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyAndPolicy from "./PrivacyAndPolicy";

import ImgLogo from "../../assets/logo.png";

function LoginSignupPage(props) {
	const auth = useSelector((state) => state.authReducer);
	const [show_tnc, setShow_tnc] = React.useState(false);
	const [show_pnp, setShow_pnp] = React.useState(false);

	/* redirect user to User Profile page if phone otp is verified */
	useEffect(() => {
		if (auth.isVerified.phoneOtp) {
			props.history.push("/thank-you");
		}
	}, [auth.isVerified.phoneOtp, props.history]);

	return (
		<div className="auth-page flex">
			<div className="left flex">
				<a href="/" className="logo">
					<img src={ImgLogo} alt="Cred Ready" />
				</a>
				<div className="content">
					<h2>Welcome to</h2>
					<h1>CredReady</h1>
					<p>
						CredReady is a marketplace that unbundles workforce credentials from
						the institutions that issue them. Backed by 25 years of proprietary
						data, our first product is a platform that provides individuals with
						personalized pathways to credentials for in-demand middle-skill jobs
						and allows employers to find jobready cnadidates.
					</p>
				</div>
			</div>
			<div className="right flex">
				{show_tnc && <TermsAndConditions show_tnc={setShow_tnc} />}
				{show_pnp && <PrivacyAndPolicy show_pnp={setShow_pnp} />}
				<Route path="/login" exact component={Login} />
				<Route
					path="/signup"
					exact
					render={(props) => (
						<Signup
							show_tnc={(val) => setShow_tnc(val)}
							show_pnp={(val) => setShow_pnp(val)}
							{...props}
						/>
					)}
				/>
				<Route path="/thank-you" exact component={ThankYou} />
			</div>
		</div>
	);
}

export default LoginSignupPage;
