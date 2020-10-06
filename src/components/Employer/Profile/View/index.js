import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function View() {
	return (
		<div className="profile-view">
			<div className="content">
				<ul className="listing">
					<li>
						<p>Full Name</p>
						<p>John Doe</p>
					</li>
					<li>
						<p>Title</p>
						<p>Human Resource Management</p>
					</li>
					<li>
						<p>Company Website</p>
						<p>chelseaseniorliving.com</p>
					</li>
					<li>
						<p>Hiring Needs</p>
						<p>1 - 5 employees</p>
					</li>
					<li>
						<p>Company Size</p>
						<p>50 - 99 employees</p>
					</li>
					<li>
						<p>How did you hear about us?</p>
						<p>Co-Worker</p>
					</li>
					<li>
						<ul className="listing">
							<li className="divider">
								<span>Address 1</span>
							</li>
							<li>
								<p>Street Address</p>
								<p>08817</p>
							</li>
							<li>
								<p>City</p>
								<p>247 King St.</p>
							</li>
							<li>
								<p>State</p>
								<p>New Jersey</p>
							</li>
							<li>
								<p>Zip Code</p>
								<p>123456</p>
							</li>
						</ul>
					</li>
				</ul>
				<Link to="/profile/edit" className="edit" id="editBtn">
					<FontAwesomeIcon icon={faPencilAlt} />
				</Link>
			</div>
		</div>
	);
}

export default View;
