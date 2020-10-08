import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { sendEmail, updateStatus, getCandidatesList } from '../../../store/thunks/employer';

import "./index.scss";
import Dropdown from "../../_Elements/Dropdown";
import SortIcon from "../../_Elements/SortIcon";
import Pagination from "../../_Elements/Pagination";
import ImgUser from "../../../assets/user-placeholder.jpg";
import ImgMail from "../../../assets/mail.jpg";
import ImgDownload from "../../../assets/download.jpg";
import Input from "../../_Elements/Input";

const faker = require("faker");

function CandidateList(props) {

	const dispatch = useDispatch();

	const handleUpdateStatus = (e, job_app_id) => {
			dispatch(updateStatus({
  				"jobAppId": job_app_id,
  				"status": e
			}));
	}

	const handleSendEmail = (candidate_id, template_id) => {
			dispatch(sendEmail({
				"candidateId": candidate_id,
  				"emailTemplateId": template_id
			}));
	}

	// useEffect(() => {
	// 	dispatch(getCandidatesList());
	// }, [dispatch]);

	const [filterOptions, setFilterOptions] = React.useState(false);

	const crRange = {
		heading: "CreadReadines Range",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const status = {
		heading: "Status",
		content: [
			"Viewed",
			"Emailed",
			"Phone",
			"Interviewed",
			"Offer",
			"Hired",
			"Rejected",
		],
	};
	const experience = {
		heading: "Experience",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const currentOrganisation = {
		heading: "Current Organisation",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const candidateList = [
		{
			name: "Mary Jane",
			currentPosition: "CNA",
			experience: 5,
			credReadiness: 82,
			currentOrganisation: "One Springfield",
			lastUpdate: "9/15/2020",
			status: "Viewed",
		},
		{
			name: "William",
			currentPosition: "Home Health Aid",
			experience: 4,
			credReadiness: 73,
			currentOrganisation: "XYZ Company",
			lastUpdate: "9/15/2020",
			status: "Phone",
		},
		{
			name: "Charlotte",
			currentPosition: "CNA",
			experience: 2,
			credReadiness: 73,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Viewed",
		},
		{
			name: "Marry jane",
			currentPosition: "Certified Nursing Assistant",
			experience: 5,
			credReadiness: 50,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Offer",
		},
		{
			name: "Kris Connor",
			currentPosition: "CNA",
			experience: 1,
			credReadiness: 40,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Hired",
		},
		{
			name: "Mary jane",
			currentPosition: "Home Health Aid",
			experience: 2,
			credReadiness: 35,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Hired",
		},
		{
			name: "Mary jane",
			currentPosition: "CNA",
			experience: 4,
			credReadiness: 35,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Viewed",
		},
		{
			name: "Charlotte",
			currentPosition: "Certified Nursing Assistant",
			experience: 5,
			credReadiness: 35,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Emailed",
		},
		{
			name: "Kris Connor",
			currentPosition: "Home Health Aid",
			experience: 5,
			credReadiness: 35,
			currentOrganisation: "ABC Company",
			lastUpdate: "9/15/2020",
			status: "Viewed",
		},
	];

	const filtersList = [
		{
			title: "Status",
			options: [
				"New",
				"Applied",
				"Viewed",
				"Emailed",
				"Phone",
				"Interviewed",
				"Job",
				"Hired",
				"Rejected",
			],
		},
		{
			title: "Experience",
			options: ["10+ years", "6 to 9 years", "3 to 5 years", "0 to 2 years"],
		},
		{
			title: "Last Update",
			options: ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks +"],
		},
		{
			title: "CredReadiness Range",
			options: [
				"70 to 100 (Ready)",
				"41 to 70 (Almost Ready)",
				"0 to 40 (Getting Started)",
			],
		},
	];

	const renderCandidateList = props.candidatesList.map((candidate, i) => {
		let index = candidate.readiness_index;
		let crColor = index < 40 ? "red" : index > 70 ? "green" : "yellow";
		return (
			<ul key={i}>
				<li>
					<input className="fancy-toggle" id={`row_${i}`} type="checkbox" />
					<label htmlFor={`row_${i}`}>
						<span className="input"></span>
					</label>
				</li>
				<li>
					<Link to="/jobs/candidate-view">
						<img src={faker.image.avatar()} alt="User" />
						{candidate.candidate_name}
					</Link>
				</li>
				<li>{candidate.title}</li>
				<li>{candidate.candidate_experience} years</li>
				<li>
					<span className={`cr_index ${crColor}`}>
						{candidate.readiness_index}
					</span>
				</li>
				<li>{candidate.current_organization}</li>
				<li>{candidate.modified_on}</li>
				<li>
					<Dropdown
						placeholder={status.heading}
						content={status.content}
						selected={candidate.status}
						callback={() => handleUpdateStatus(candidate.status, candidate.job_app_id)}
					/>
				</li>
				<li>
					<Link to="/" className="mail" onClick={() => handleSendEmail(candidate.candidate_id, candidate.email_template_id)}>
						<img src={ImgMail} alt="Email" />
					</Link>
					<Link to="/" className="download">
						<img src={ImgDownload} alt="Download" />
					</Link>
				</li>
			</ul>
		);
	});

	return (
		<div className="candidate-list">
			<div className="top-heading">
				<h1>
					Candidates for “Certified Nursing Assistant - in Warren New Jersey”
				</h1>
				<h3>CredReadiness Index for this job is 82</h3>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Candidate Name" />
					<Dropdown placeholder={crRange.heading} content="slider" />
					<Dropdown placeholder={status.heading} content={status.content} onchange={handleUpdateStatus} />
					<Dropdown
						placeholder={experience.heading}
						content={experience.content}
					/>
					<Dropdown
						placeholder={currentOrganisation.heading}
						content={currentOrganisation.content}
					/>
				</div>
			</div>
			<div className="lists-outer">
				<div className="heading flex">
					<h2>List of Candidate</h2>
					{/* <p>Showing Result 1-10 of 200</p> */}
					<div className="search_filter flex">
						<Input type="text" placeholder="Search by name/position..." />
						<button
							className="primary-btn blue"
							onClick={() => setFilterOptions(!filterOptions)}
						>
							Filter
						</button>
						<div className={`options ${filterOptions ? "on" : "off"}`}>
							<div className="listing">
								{filtersList.map((filter, i) => {
									let trimTitle = filter.title.replace(/ /g, "");
									return (
										<ul key={i}>
											<li>{filter.title}</li>
											{filter.options.map((option, i) => {
												return (
													<li key={i}>
														<input
															id={`${trimTitle}_${i}`}
															type="checkbox"
															className="fancy-toggle blue"
														/>
														<label htmlFor={`${trimTitle}_${i}`}>
															<span className="input"></span>
															{option}
														</label>
													</li>
												);
											})}
										</ul>
									);
								})}
							</div>
							<div className="cta">
								<button
									className="primary-btn blue outline"
									onClick={() => setFilterOptions(false)}
								>
									Cancel
								</button>
								<button
									className="primary-btn blue"
									onClick={() => setFilterOptions(false)}
								>
									Done
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="actions">
					<div className="left">
						<Link to="/" onClick={handleSendEmail}>Send Email</Link>
						&nbsp;&nbsp;{" |  "}&nbsp;&nbsp;
						<Link to="/" onClick={handleUpdateStatus}>Change Status</Link>
					</div>
					<div className="right">
						<input
							className="fancy-toggle"
							id="viewRejectedCandidate"
							type="checkbox"
						/>
						<label htmlFor="viewRejectedCandidate">
							<span className="input"></span>View Rejected Candidates
						</label>
					</div>
				</div>
				<ul className="lists">
					<li className="list">
						<ul className="head">
							<li>
								<input className="fancy-toggle" id="1" type="checkbox" />
								<label htmlFor="1">
									<span className="input"></span>
								</label>
							</li>
							<li>
								<img src={ImgUser} alt="User" />
								Name <SortIcon active="up" />
							</li>
							<li>
								Current Position <SortIcon />
							</li>
							<li>
								Exp (in years) <SortIcon />
							</li>
							<li>
								CreadReadines <SortIcon />
							</li>
							<li>
								Current Organization <SortIcon />
							</li>
							<li>
								Last Update <SortIcon />
							</li>
							<li>
								Status <SortIcon />
							</li>
							<li>Action</li>
						</ul>
						{renderCandidateList}
					</li>
				</ul>
			</div>
			<Pagination />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		candidatesList: state.employerReducer.candidatesList.data
	}
}

// export default CandidateList;
export default connect(mapStateToProps)(CandidateList);
