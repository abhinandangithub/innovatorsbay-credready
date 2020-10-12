import React from "react";
import { Link } from "react-router-dom";

import "../index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import ImgWidgetMenu from "../../../../assets/widget-menu.jpg";

function AppliedRelatedJobs(props) {
	const type = props.applied ? props.applied : props.related;
	const link = props.applied
		? `/jobs/preview/${type.jobId}`
		: `/jobs/view/${type.jobId}`;

	const content = (
		<>
			<div className="top">
				<div className="logo">
					<img src={ImgWidgetLogo} alt={type.logo} />
				</div>
				<div className="info">
					<h3>{type.jobTitle}</h3>
					<p>{type.jobDescription}</p>
				</div>
				<button className="menu">
					<img src={ImgWidgetMenu} alt="Widget Menu" />
				</button>
			</div>
			<div className="bottom">
				<div className="content">
					<div className="info flex">
						<span className="experience">{type.minExp}-{type.maxExp} Yrs</span>
						<span className="locatoin">{type.location}</span>
					</div>
					{/* <p className="skills">
						<b>Skills: </b>
						{type.skills}
					</p> */}
					<p>
						<b>Description: </b>
						{type.jobDescription}
					</p>
				</div>
			</div>
		</>
	);

	return (
		<>
			{props.applied ? (
				<Link className="widget widget-applied-related-jobs" to={link}>
					{content}
					<div className="cta applied">
						<span className="common-check-icon active"></span>Applied
					</div>
				</Link>
			) : (
					<div className="widget widget-applied-related-jobs">
						{content}
						<div className="cta related">
							<Link to={link} className="primary-btn blue">
								View
						</Link>
						</div>
					</div>
				)}
		</>
	);
}

export default AppliedRelatedJobs;