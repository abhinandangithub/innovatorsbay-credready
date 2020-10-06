import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import ImgUserPlaceholder from "../../../assets/user-placeholder.jpg";
import CredReadyIndex from "../../_Elements/CredReadyIndex";
import ImgWidget2 from "../../../assets/widget-2.jpg";
import JobSpecificQuestions from "../../Candidate/Jobs/JobSpecificQuestions";
import Accordion from "../../_Elements/Accordion";

function CandidateView() {
	return (
		<div className="candidate-view">
			<div className="common-heading-button flex">
				<h1 className="heading">Candidate View</h1>
				<Link to="/" className="btn">
					Download Resume
				</Link>
			</div>
			<div className="main-info">
				<div className="top flex">
					<div className="left">
						<img src={ImgUserPlaceholder} alt="UserName" />
					</div>
					<div className="right">
						<h2>Your Name</h2>
						<h3>Certified Nursing Assistant</h3>
						<ul className="flex">
							<li>212-639-9675</li>
							<li>marryjane123@gmail.com</li>
							<li>New York</li>
							<li>2 years</li>
							<li>5 miles </li>
							<li>ABC STAFFING COMPANY</li>
						</ul>
					</div>
				</div>
				<div className="bottom">
					<ul className="common-skills-list">
						<li>Skills: </li>
						<li>Helping with meals</li>
						<li>Transferring using assistive devices</li>
						<li>Grooming</li>
						<li>Bathing</li>
						<li>Changing diapers</li>
						<li>Dressing</li>
					</ul>
				</div>
			</div>
			<div className="widgets flex">
				<div className="widget">
					<div className="heading">CreadReadiness Index</div>
					<div className="content">
						<CredReadyIndex index="80" noHeading noSubHeading />
						{/* <img src={ImgWidget1} alt="" /> */}
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Top 5 contributors to the CredReadiness Index
					</div>
					<div className="content">
						{/* <CredReadyIndex index="80" /> */}
						<img src={ImgWidget2} alt="" />
					</div>
				</div>
			</div>
			<Accordion className="blank" type="blank">
				<ul className="info flex for-click">
					<li>
						Title : <span>Certified Nursing Assistant</span>
					</li>
					<li>
						Duration : <span>Jan 2019 - Present</span>
					</li>
					<li>
						Organizatioin : <span>Trumbull Regional Medical Center</span>
					</li>
				</ul>
				<ul className="info flex">
					<li>
						Industry : <span>Homecare / hospitality</span>
					</li>
					<li>
						Function : <span>Certified Nursing Assistant / Nursing Staff</span>
					</li>
					<li className="full">
						Description :{" "}
						<span>
							Reliable, service-focused nursing professional with excellent
							patient-care and charting skills gained through five years of
							experience as a CNA. Compassionate and technically skilled in
							attending to patients in diverse healthcare settings. BLS and CPR
							certified (current). We strongly recommend that your first
							paragraph be a short, 2-3 sentence introduction to your company.
							Tell your prospective CNA job candidate about your unique company
							and what you have to offer new hires. You want to talk about your
							value proposition to employees that sets you apart from other
							companies.Reliable, service-focused nursing professional with
							excellent patient-care and charting skills gained through five
							years of experience as a CNA. Compassionate and technically
							skilled in attending to patients in diverse healthcare settings.
							BLS and CPR certified (current).
						</span>
					</li>
					<li>
						Supervisor Name : <span>John Robert</span>
					</li>
					<li>
						Supervisor Phone Number : <span>212-645-6754</span>
					</li>
				</ul>
			</Accordion>
			<JobSpecificQuestions />
			<div className="cta flex">
				<p>
					Applied on : <span>20 June 2020</span>
				</p>
				<button className="primary-btn">Send Email</button>
			</div>
		</div>
	);
}

export default CandidateView;
