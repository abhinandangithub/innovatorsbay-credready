import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function PostedJobs() {
	const jobsList = [1, 2];

	const list = (
		<>
			<h2 className="heading">Certified Nursing Assistant</h2>
			<p>
				<span>Description: </span>We are a growing company and have multiple
				roles open for a skilled CNA. You will provide outstanding patient care
				and physical support for patients and residents on a daily basis. To do
				well in this role you should have your state certified nursing assistant
				certification…
			</p>
			<ul className="common-skills-list">
				<li>Skills: </li>
				<li>Anatomy</li>
				<li>Patient care</li>
				<li>Diagnostic testing</li>
			</ul>
			<p className="job-openings">
				<span>Job Openings: </span>2
			</p>
			<div className="list-btn">
				<ul className="info">
					<li>Warren, NY</li>
					<li>January 21, 2020</li>
					<li>John Doe</li>
					<li>Candidates applied 12</li>
				</ul>
				<Link to="/candidates-list" className="primary-btn blue">
					View Candidates
				</Link>
			</div>
			<div className="checkboxes">
				<input
					id="emailNotification"
					type="checkbox"
					className="fancy-toggle blue"
				/>
				<label htmlFor="emailNotification">
					<span className="input"></span>Receive Email Notification
				</label>
				<input
					id="smsNotification"
					type="checkbox"
					className="fancy-toggle blue"
				/>
				<label htmlFor="smsNotification">
					<span className="input"></span>Receive SMS Notification
				</label>
			</div>
		</>
	);

	const renderJobsList = (
		<>
			<div className="common-heading-button">
				<h1 className="heading">My Posted Jobs</h1>
				<Link to="/jobs/create-job" className="btn">
					<span></span>Post a Job
				</Link>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Search by Job Title" />
					<input type="text" placeholder="Search by Skills" />
				</div>
			</div>

			<div className="listings">
				<ul>
					{jobsList.map((_, i) => {
						return <li key={i}>{list}</li>;
					})}
				</ul>
			</div>
		</>
	);

	const renderEmptyList = (
		<div className="no-jobs">
			<div className="common-heading-button">
				<h1 className="heading">No Posted Jobs</h1>
			</div>
			<div className="content">
				<p>
					No jobs have been created yet.
					<br />
					Why don't you post a job by clicking on the button below
				</p>
				<div className="common-heading-button">
					<Link to="/jobs/create-job" className="btn">
						<span></span>Post a Job
					</Link>
				</div>
			</div>
		</div>
	);

	return (
		<div className="posted-jobs-page">
			{jobsList.length === 0 ? renderEmptyList : renderJobsList}
		</div>
	);
}

export default PostedJobs;
