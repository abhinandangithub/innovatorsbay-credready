import React from "react";
import { Link } from "react-router-dom";

import "../index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import ImgWidgetMenu from "../../../../assets/widget-menu.jpg";

function LatestOpenings(props) {
	return (
		<div className="widget widget-latest-opening" to="/">
			<div className="top">
				<div className="logo">
					<img src={ImgWidgetLogo} alt={props.job.logo} />
				</div>
				<div className="info">
					<h3>{props.job.heading}</h3>
					<p>{props.job.subHeading}</p>
				</div>
				<button className="menu">
					<img src={ImgWidgetMenu} alt="Widget Menu" />
				</button>
			</div>
			<div className="bottom">
				<div className="content">
					<div className="info flex">
						<span className="experience">1-3 Yrs</span>
						<span className="locatoin">Warren, NJ</span>
					</div>
					<p>{props.job.description}</p>
				</div>
			</div>
			<div className="cta flex">
				<Link to={`/jobs/view/${props.job.id}`} className="primary-btn">
					View
				</Link>
			</div>
		</div>
	);
}

export default LatestOpenings;
