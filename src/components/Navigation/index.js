import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ImgDashboard from "../../assets/dashboard.png";
import ImgJobs from "../../assets/jobs.png";
import ImgGoals from "../../assets/goals.png";
import ImgProfile from "../../assets/profile.png";
import ImgTnc from "../../assets/tnc.png";

import "./index.scss";

function Navigation(props) {
	const auth = useSelector((state) => state.authReducer);

	return (
		<nav className="navigation">
			<ul className="top">
				{auth.loggedIn.as === "candidate" && (
					<li>
						<NavLink className="flex" to="/goals">
							<span className="icon flex">
								<img src={ImgGoals} alt="Link 3" />
								<span>My Goals</span>
							</span>
							<span className="text">My Goals</span>
						</NavLink>
					</li>
				)}
				<li>
					<NavLink className="flex" to={"/dashboard"}>
						<span className="icon flex">
							<img src={ImgDashboard} alt="Applications" />
							<span>Applications</span>
						</span>
						<span className="text">Applications</span>
					</NavLink>
				</li>
				<li>
					<NavLink className="flex" to="/jobs">
						<span className="icon flex">
							<img src={ImgJobs} alt="Link 2" />
							<span>My Jobs</span>
						</span>
						<span className="text">My Jobs</span>
					</NavLink>
				</li>
				<li>
					<NavLink className="flex" to="/profile">
						<span className="icon flex">
							<img src={ImgProfile} alt="Link 4" />
							<span>Profile</span>
						</span>
						<span className="text">Profile</span>
					</NavLink>
				</li>
			</ul>
			<ul className="bottom">
				<li>
					<NavLink className="flex" to="/term-and-conditions">
						<span className="icon flex">
							<img src={ImgTnc} alt="Link 1" />
							<span>T & C</span>
						</span>
						<span className="text">Term & Conditions</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
