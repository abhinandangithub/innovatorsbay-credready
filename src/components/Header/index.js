import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faBars,
	faTimes,
	faAngleDown,
	faHome,
	faUser,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import ImgLogo from "../../assets/logo-blue.png";
import ImgUserPlaceholder from "../../assets/user-placeholder.jpg";
import { updateLoggedIn, clearAuthState } from "../../store/actions/auth";
import { clearEmployerState } from "../../store/actions/employer";

import "./index.scss";

function Header(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);

	const onLogout = () => {
		Cookies.remove("JWT");
		localStorage.clear();
		// dispatch(updateLoggedIn([false, ""]));
		dispatch(clearEmployerState(null));
		dispatch(clearAuthState(null));
	};

	return (
		<header className="header flex">
			<div className="left flex">
				<div className="menu_outer">
					<button className="menu" onClick={props.onMenuClick}>
						<FontAwesomeIcon icon={faBars} className="lines" />
						<FontAwesomeIcon icon={faAngleLeft} className="arrow" />
						<FontAwesomeIcon icon={faTimes} className="close" />
					</button>
				</div>
				<Link to="/dashboard" className="logo">
					<img src={ImgLogo} alt="CredReady" />
				</Link>
			</div>
			<div className="right flex">
				<Link className="notification flex" to="/dashboard">
					<div className="icon">
						{/* <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
            </svg>
            <span className="count flex">4</span> */}
						<FontAwesomeIcon icon={faHome} className="close" /> Home
					</div>
				</Link>
				<div className="user flex">
					<div className="user-info flex">
						<img className="pic" src={ImgUserPlaceholder} alt="John Doe" />
						<div className="user-name">{/* Your Name */}</div>
						<FontAwesomeIcon className="arrow" icon={faAngleDown} />
					</div>
					<ul className="user-nav">
						<li>
							<Link
								to={
									auth.loggedIn.as === "candidate"
										? "/profile/personal-details"
										: "/profile/edit"
								}
							>
								<FontAwesomeIcon icon={faUser} /> Edit Profile
							</Link>
						</li>
						<li>
							<Link to="/login" onClick={onLogout}>
								<FontAwesomeIcon icon={faSignOutAlt} /> Log out
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
