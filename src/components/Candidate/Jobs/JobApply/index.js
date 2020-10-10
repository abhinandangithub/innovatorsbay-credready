import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import ImgMarginalAssociation from "../../../../assets/widget-2.jpg";

function JobView() {
	var isLoggedIn = true;

	return (
		<div className={`job-view-cmp flex ${isLoggedIn ? "" : "login_required"}`}>
			<div className="left">
				<div className="top">
					<div className="logo">
						<img src={ImgWidgetLogo} alt="" />
					</div>
					<div className="info">
						<h3>Certified Nursing Assistent</h3>
						<p>Hospital to Five Star Nursing</p>
					</div>
					<div className="short-info">
						<p>1-3 Years</p>
						<p>New York</p>
					</div>
				</div>
				<div className="bottom">
					<p>
						<span className="heading">Job Description: </span>
						<span className="text">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged.
						</span>
					</p>
					<p>
						<span className="heading">Skills: </span>
						<span className="text">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged.
						</span>
					</p>
					<h2>A Certified Nursing Assistant's Job</h2>
					<h3>Responsibilities</h3>
					<ul>
						<li>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged.
						</li>
						<li>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged.
						</li>
						<li>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged.
						</li>
					</ul>
					<div className="cta flex">
						<p>Are you interested to apply for this possition?</p>
						<Link className="primary-btn" to="/jobs/questions">
							Apply
						</Link>
					</div>
				</div>
			</div>
			<div className="right">
				<div className="meter">
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has.
					</p>
					<CredReadyIndex index={82} />
					<div className={`${isLoggedIn ? "hidden" : "login_screen"}`}>
						<p>Not enough information to calculate your CredReady score.</p>
						<p>
							<Link to="/login">Login</Link> and enter your profile details to
							view your score
						</p>
					</div>
				</div>
				<div className="marginal">
					<h3>Top 5 Contributors to CredREadiness</h3>
					<img src={ImgMarginalAssociation} alt="Marginal Association" />
					<div className={`${isLoggedIn ? "hidden" : "login_screen"}`}></div>
				</div>
			</div>
		</div>
	);
}

export default JobView;
