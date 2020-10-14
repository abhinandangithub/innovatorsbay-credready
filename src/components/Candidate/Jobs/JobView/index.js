import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";

function JobView() {
	return (
		<div className="job-view-cmp flex">
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
						<Link className="primary-btn" to="/jobs/general-questions">
							Apply
						</Link>
					</div>
				</div>
			</div>
			<div className="right">
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged.
				</p>
				<div className="meter">
					<CredReadyIndex index={82} />
				</div>
				<div className="marginal">
					<h3>Top 5 Contributors to CredREadiness</h3>
					<MarginalAssociation />
				</div>
			</div>
		</div>
	);
}

export default JobView;
