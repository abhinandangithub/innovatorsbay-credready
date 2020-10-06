import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import Dropdown from "../../_Elements/Dropdown";
import SortIcon from "../../_Elements/SortIcon";
import Pagination from "../../_Elements/Pagination";
import ImgUser from "../../../assets/user-placeholder.jpg";
import ImgMeter from "../../../assets/meter.jpg";
import ImgMail from "../../../assets/mail.jpg";
import ImgDownload from "../../../assets/download.jpg";
import Input from "../../_Elements/Input";

const faker = require("faker");

function CandidateList() {
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
			status: "Viewed",
			currentOrganisation: "One Springfield",
			credReadiness: 82,
		},
		{
			name: "William",
			currentPosition: "Home Health Aid",
			experience: 4,
			status: "Phone",
			currentOrganisation: "XYZ Company",
			credReadiness: 73,
		},
		{
			name: "Charlotte",
			currentPosition: "CNA",
			experience: 2,
			status: "Viewed",
			currentOrganisation: "ABC Company",
			credReadiness: 73,
		},
		{
			name: "Marry jane",
			currentPosition: "Certified Nursing Assistant",
			experience: 5,
			status: "Offer",
			currentOrganisation: "ABC Company",
			credReadiness: 50,
		},
		{
			name: "Kris Connor",
			currentPosition: "CNA",
			experience: 1,
			status: "Hired",
			currentOrganisation: "ABC Company",
			credReadiness: 40,
		},
		{
			name: "Mary jane",
			currentPosition: "Home Health Aid",
			experience: 2,
			status: "Hired",
			currentOrganisation: "ABC Company",
			credReadiness: 35,
		},
		{
			name: "Mary jane",
			currentPosition: "CNA",
			experience: 4,
			status: "Viewed",
			currentOrganisation: "ABC Company",
			credReadiness: 35,
		},
		{
			name: "Charlotte",
			currentPosition: "Certified Nursing Assistant",
			experience: 5,
			status: "Emailed",
			currentOrganisation: "ABC Company",
			credReadiness: 35,
		},
		{
			name: "Kris Connor",
			currentPosition: "Home Health Aid",
			experience: 5,
			status: "Viewed",
			currentOrganisation: "ABC Company",
			credReadiness: 35,
		},
	];

	const renderCandidateList = candidateList.map((candidate, i) => {
		return (
			<ul key={i}>
				<li>
					<input className="fancy-toggle" id="10" type="checkbox" />
					<label htmlFor="10">
						<span className="input"></span>
					</label>
				</li>
				<li>
					<img src={faker.image.avatar()} alt="User" />
					{candidate.name}
				</li>
				<li>{candidate.currentPosition}</li>
				<li>{candidate.experience}</li>
				<li>
					<Dropdown
						placeholder={status.heading}
						content={status.content}
						selected={candidate.status}
					/>
				</li>
				<li>{candidate.currentOrganisation}</li>
				<li>
					{candidate.credReadiness}
					<Link to="/" className="meter">
						<img src={ImgMeter} alt="Meter" />
					</Link>
					<Link to="/" className="mail">
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
				<h1>Candidates for ‘Certified Nursing Assistant</h1>
				<h3>CredReadiness Index for this job is 82</h3>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Candidate Name" />
					<Dropdown placeholder={crRange.heading} content="slider" />
					<Dropdown placeholder={status.heading} content={status.content} />
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
								<ul>
									<li>Status</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>New
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Applied
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Viewed
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Emailed
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Phone
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Interviewed
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Job Offered
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Hired
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>Rejected
										</label>
									</li>
								</ul>
								<ul>
									<li>Experience</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>10+ years
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>6 to 9 years
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>3 to 5 years
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>0 to 2 years
										</label>
									</li>
								</ul>
								<ul>
									<li>Last Update</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>1 Week
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>2 Weeks
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>3 Weeks
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>4 Weeks +
										</label>
									</li>
								</ul>
								<ul>
									<li>CredReadiness Range</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>70 to 100 (Ready)
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>41 to 70 (Almost Ready)
										</label>
									</li>
									<li>
										<input type="checkbox" className="fancy-toggle blue" />
										<label htmlFor="1">
											<span className="input"></span>0 to 40 (Getting Started)
										</label>
									</li>
								</ul>
							</div>
							<div className="cta">
								<button className="primary-btn blue outline">Cancel</button>
								<button className="primary-btn blue">Done</button>
							</div>
						</div>
					</div>
				</div>
				<div className="actions">
					<div className="left">
						<Link to="/">Send Email</Link>
						&nbsp;&nbsp;{" |  "}&nbsp;&nbsp;
						<Link to="/">Change Status</Link>
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
								Title <SortIcon />
							</li>
							<li>
								Exp (in years) <SortIcon />
							</li>
							<li>
								Status <SortIcon />
							</li>
							<li>
								Current Organisation <SortIcon />
							</li>
							<li>
								CredReadiness Index <SortIcon />
							</li>
						</ul>
						{renderCandidateList}
					</li>
				</ul>
			</div>
			<Pagination />
		</div>
	);
}

export default CandidateList;
