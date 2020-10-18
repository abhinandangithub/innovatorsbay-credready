import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';

import "./index.scss";
import ImgWidgetLogo from "../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../_Elements/CredReadyIndex";
import ImgMarginalAssociation from "../../../assets/widget-2.jpg";
import { getJobDetails } from '../../../store/thunks/employer';

function JobView(props) {
	let { id } = useParams();
	var isLoggedIn = false;
	const dispatch = useDispatch();
	console.log(id);

	useEffect(() => {
		dispatch(getJobDetails(id));
	}, [id]);

	return (
		<div className={`job-view-cmp flex ${props.isLoggedIn ? "" : "login_required"}`}>
			<div className="left">
				<div className="top">
					<div className="logo">
						<img src={ImgWidgetLogo} alt="" />
					</div>
					<div className="info">
						<h3>{props.jobDetails.job_title}</h3>
						<p>{props.jobDetails.org_name}</p>
					</div>
					<div className="short-info">
						<p>{props.jobDetails.min_experience + '-' + props.jobDetails.max_experience + ' years'}</p>
						<p>{props.jobDetails.location}</p>
					</div>
				</div>
				<div className="bottom">
					<p>
						<span className="heading">Job Description: </span>
						<span className="text">
							{props.jobDetails.job_description}
						</span>
					</p>
					<p>
						{/* <span className="heading">Skills: </span> */}
						<span className="text">
							{/* {props.jobDetails.strengths.map((value) => value.name + ', ')} */}
						</span>
					</p>
					<h2>{'A ' + props.jobDetails.job_title + '\'s Job'}</h2>
					<h3>Responsibilities</h3>
					<ul>
						{props.jobDetails.job_description}
					</ul>
					<div className="cta flex">
						{props.isLoggedIn ? (
							<>
								<p>Are you interested to apply for this possition?</p>
								<Link className="primary-btn" to="/jobs/application">
									Apply
								</Link>
							</>
						) : (
								<>
									<p>
										Your CredReadiness for this job is unknown, login to check if
										you are CredReady for this job
								</p>
									<Link className="primary-btn blue" to="/login">
										Login to apply
								</Link>
								</>
							)}
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
					<div className={`${props.isLoggedIn ? "hidden" : "login_screen"}`}>
						<p>Not enough information to calculate your CredReady score.</p>
						<p>
							<Link to="/login">Login</Link> and enter your profile details to
							view your score
						</p>
					</div>
				</div>
				<div className="marginal">
					<h3>Top 5 Contributors to CredReadiness</h3>
					<img src={ImgMarginalAssociation} alt="Marginal Association" />
					<div className={`${props.isLoggedIn ? "hidden" : "login_screen"}`}></div>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.employerReducer.isLoggedIn,
		loggedInAs: state.authReducer.loggedIn.as,
		jobDetails: state.employerReducer.jobDetails.data
	}
}

export default connect(mapStateToProps)(JobView);