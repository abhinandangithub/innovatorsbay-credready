import React from "react";

import "./index.scss";
import Input from "../../../_Elements/Input";
import Dropdown from "../../../_Elements/Dropdown";

const hiringNeed = {
	heading: "Hires needed in the next 6 monts",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};
const companySize = {
	heading: "Current employees",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};
const socialMedia = {
	heading: "Social Media",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

function Details() {
	return (
		<div className="profile-details">
			Welcome Aboard! Please fill in the details below about your company to get
			started.
			<div className="content">
				<ul className="listing">
					<li>
						<label>
							Full Name <span>*</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>
							Title <span>*</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>
							Company Website <span>*</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>Hiring Needs</label>
						<Dropdown
							placeholder={hiringNeed.heading}
							content={hiringNeed.content}
						/>
					</li>
					<li>
						<label>Company Size</label>
						<Dropdown
							placeholder={companySize.heading}
							content={companySize.content}
						/>
					</li>
					<li>
						<label>How did you hear about us?</label>
						<Dropdown
							placeholder={socialMedia.heading}
							content={socialMedia.content}
						/>
					</li>
					<li>
						<ul className="listing">
							<li className="divider">
								<span>Address 1</span>
							</li>
							<li>
								<label>
									Street Address <span>*</span>
								</label>
								<Input type="text" />
							</li>
							<li>
								<label>
									City <span>*</span>
								</label>
								<Input type="text" />
							</li>
							<li>
								<label>
									State <span>*</span>
								</label>
								<Input type="text" />
							</li>
							<li>
								<label>
									Zip Code <span>*</span>
								</label>
								<Input type="text" />
							</li>
						</ul>
					</li>
				</ul>
				<button className="add-address">
					<span className="text">Add Address</span> <span>*</span>
				</button>
			</div>
			<div className="cta">
				<button className="primary-btn">Submit</button>
			</div>
		</div>
	);
}

export default Details;
