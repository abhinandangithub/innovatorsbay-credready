import React from "react";
import { Link } from "react-router-dom";

import "../index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import ImgWidgetMenu from "../../../../assets/widget-menu.jpg";
import CredReadyIndex from "../../CredReadyIndex";

function ExploreGoal(props) {
	const type = props.goal ? props.goal : props.job;
	const link = props.goal ? `/goals/view/${type.id}` : `/jobs/view/${type.id}`;

	return (
		<div className="widget widget-explore-goals">
			<div className="top">
				<div className="logo">
					<img src={ImgWidgetLogo} alt={type.logo} />
				</div>
				<div className="info">
					<h3>{type.heading}</h3>
					<p>{type.subHeading}</p>
				</div>
				<button className="menu">
					<img src={ImgWidgetMenu} alt="Widget Menu" />
				</button>
			</div>
			<div className="bottom">
				<div className="index">
					<CredReadyIndex index={type.crIndex} />
				</div>
				<div className="content">
					<p>{type.description}</p>
					<p>
						<span className="heading">Job Openings: </span>
						<span className="text">{type.jobOpenings}</span>
					</p>
					<p>
						<span className="heading">Wage: </span>
						<span className="text">
							${type.wage.start} - ${type.wage.end}
						</span>
					</p>
				</div>
			</div>
			<div className="cta">
				<Link to={link} className="primary-btn blue">
					Select
				</Link>
			</div>
		</div>
	);
}

export default ExploreGoal;
