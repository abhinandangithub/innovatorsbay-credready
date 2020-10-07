import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { getPostedJobs, sendNotification } from '../../../store/thunks/employer';

import { Link } from "react-router-dom";

import "./index.scss";

function PostedJobs(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostedJobs());
	}, [dispatch]);

	const handleSendEmail = (e) => {
		if(e.target.checked) {
			dispatch(sendNotification({
				"errors": {},
  				"jobId": 0,
  				"optStatus": true,
  				"source": "Email"
			}));
		}
	}

	const handleSendSMS = (e) => {
		if(e.target.checked) {
			dispatch(sendNotification({
				"errors": {},
  				"jobId": 0,
  				"optStatus": true,
  				"source": "SMS"
			}));
		}
	}

	const jobsList = [1, 2];

	const list = (
		<>
			{/* <h2 className="heading">Certified Nursing Assistant</h2> */}
			<h2 className="heading">{props.postedJobs.job_title}</h2>
			<p>
				<span>Description: </span>{props.postedJobs.job_description}
			</p>
			<ul className="common-skills-list">
				<li>Skills: </li>
				{props.postedJobs.strengths.map((val,i) => {
					return <li key={i}>{val.name}</li>
				})}
			</ul>
			<p className="job-openings">
				<span>Job Openings: </span>{props.postedJobs.open_positions}
			</p>
			<div className="list-btn">
				<ul className="info">
					{/* <li>Warren, NY</li> */}
					<li>{props.postedJobs.address.city}, {props.postedJobs.address.state}</li>
					{/* <li>January 21, 2020</li> */}
					<li>{props.postedJobs.modified_on}</li>
					<li>{props.postedJobs.modified_by}</li>
					<li>Candidates applied {props.postedJobs.count_of_applied_candidates}</li>
				</ul>
				<Link to="/jobs/candidates-list" className="primary-btn blue">
					View Candidates
				</Link>
			</div>
			<div className="checkboxes">
				<input
					id="emailNotification"
					type="checkbox"
					className="fancy-toggle blue"
					onChange={handleSendEmail}
				/>
				<label htmlFor="emailNotification">
					<span className="input"></span>Receive Email Notification
				</label>
				<input
					id="smsNotification"
					type="checkbox"
					className="fancy-toggle blue"
					onChange={handleSendSMS}
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

function mapStateToProps(state) {
	return {
		postedJobs: state.employerReducer.postedJobs.data[0]
	}
}

// export default PostedJobs;
export default connect(mapStateToProps)(PostedJobs);