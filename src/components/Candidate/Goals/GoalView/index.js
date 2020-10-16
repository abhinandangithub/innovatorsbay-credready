import React from "react";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";

import "./index.scss";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";

function GoalView() {
	return (
		<div className="goal-view-cmp">
			<div className="top">
				<div className="index-marginal flex">
					<div className="index">
						<h2>CredReadiness</h2>
						<CredReadyIndex index={80} noSubHeading />
					</div>
					<div className="marginal">
						<h2>Marginal Association</h2>
						<MarginalAssociation />
					</div>
				</div>
				{/* <p>
					<span className="left">Industry: Patient care</span>
					<span className="left">Wage: $32,000</span>
					<span className="right">Job Openings: 3</span>
				</p> */}
				<ul className="table">
					<li className="heading">What Certified Nursing Assistant Do</li>
					<li>
						<span>
							Provide basic patient care under direction of nursing staff.
							Perform duties such as feed, bathe, dress, groom, or move
							patients, or change linens. May transfer or transport patients.
							Includes nursing care attendants, nursing aides, and nursing
							attendants.
						</span>
					</li>
				</ul>
			</div>
			<div className="bottom">
				<h2>Pay</h2>
				<ul className="table">
					<li className="heading">Quick Facts: Certified Nursing Assistant</li>
					<li>
						<span>2019 Median Pay</span>
						<span>$73,300 per year</span>
					</li>
					<li>
						<span>Typical Entry-Level Education</span>
						<span>Bachelor's Degree</span>
					</li>
					<li>
						<span>Work Experience in a Related Occupation</span>
						<span>None</span>
					</li>
					<li>
						<span>On-the-job Training</span>
						<span>None</span>
					</li>
					<li>
						<span>Number of Jobs, 2018-2028</span>
						<span>190,700</span>
					</li>
					<li>
						<span>Projected growth (2018-2028)</span>
						<span>Faster than average (7% to 10%)</span>
					</li>
					<li>
						<span>Employment (2018)</span>
						<span>1,513,200 employees</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default GoalView;
