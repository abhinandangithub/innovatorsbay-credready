import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import { Link } from "react-router-dom";

function Preview() {
	return (
		<div className="preview">
			<div className="content">
				<div className="group">
					<div className="top">
						<h1>Resume</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => alert(`Editing`)}
						/>
						<FontAwesomeIcon
							className="action-btn delete"
							icon={faTrash}
							onClick={() => alert(`Deleting`)}
						/>
					</div>
					<div className="bottom">
						<p>
							<Link to="/">marryjane_cv.pdf</Link>
						</p>
					</div>
				</div>
				<div className="group">
					<div className="top">
						<h1>Personal Details</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => alert(`Editing`)}
						/>
						<FontAwesomeIcon
							className="action-btn delete"
							icon={faTrash}
							onClick={() => alert(`Deleting`)}
						/>
					</div>
					<div className="bottom">
						<p>First Name : Marry</p>
						<p>Last Name : Jane</p>
						<p>Current employment status : Employed</p>
						<p>How long would you begin a new role? : 6 Months</p>
						<p>
							Are you interested in a different function and industry? : Yes
						</p>
						<p>Empathy : 35</p>
						<p>Patient : 80 </p>
					</div>
				</div>
				<div className="group">
					<div className="top">
						<h1>Experience</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => alert(`Editing`)}
						/>
						<FontAwesomeIcon
							className="action-btn delete"
							icon={faTrash}
							onClick={() => alert(`Deleting`)}
						/>
					</div>
					<div className="bottom">
						<div className="details">
							<h2>Certified Nursing Assistant</h2>
							<p>
								<span className="heading">ABC Staffing Company</span>
								{" - "}
								<span className="text">New York</span>
							</p>
							<p>
								<span className="heading">March 2012</span>
								{" to "}
								<span className="text">Present</span>
							</p>
							<p>
								<span className="heading">Current employment status: </span>
								<span className="text">Employed</span>
							</p>
							<p>
								<span className="heading">Skills: </span>
								<span className="text">
									Patient Care & Safety, Medical Terminology, Electronic Medical
									Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
									Medication Administration, Patient Advocacy and Support.
								</span>
							</p>
						</div>
						<div className="details">
							<h2>Certified Nursing Assistant</h2>
							<p>
								<span className="heading">ABC Staffing Company</span>
								{" - "}
								<span className="text">New York</span>
							</p>
							<p>
								<span className="heading">March 2012</span>
								{" to "}
								<span className="text">Present</span>
							</p>
							<p>
								<span className="heading">Current employment status: </span>
								<span className="text">Employed</span>
							</p>
							<p>
								<span className="heading">Skills: </span>
								<span className="text">
									Patient Care & Safety, Medical Terminology, Electronic Medical
									Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
									Medication Administration, Patient Advocacy and Support.
								</span>
							</p>
						</div>
					</div>
				</div>
				<div className="group ">
					<div className="top">
						<h1>Education</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => alert(`Editing`)}
						/>
						<FontAwesomeIcon
							className="action-btn delete"
							icon={faTrash}
							onClick={() => alert(`Deleting`)}
						/>
					</div>
					<div className="bottom">
						<div className="details">
							<h2>ABC School, Sometown, CT</h2>
							<p>
								<span className="heading">Nurse’s Aide Program:</span>
								{" - "}
								<span className="text">ABC University</span>
							</p>
							<p>
								<span className="text">FROM 2010</span>
								{" to "}
								<span className="text">1012</span>
							</p>
						</div>
					</div>
				</div>
				<div className="group ">
					<div className="top">
						<h1>Certifications</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => alert(`Editing`)}
						/>
						<FontAwesomeIcon
							className="action-btn delete"
							icon={faTrash}
							onClick={() => alert(`Deleting`)}
						/>
					</div>
					<div className="bottom">
						<div className="details">
							<h2>GHI Nursing Certificate</h2>
							<p>
								<span className="heading">Description: </span>
								{" - "}
								<span className="text">
									Patient Care & Safety, Medical Terminology, Electronic Medical
									Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
									Medication Administration, Patient Advocacy and Support.
								</span>
							</p>
							<p>
								<span className="heading">Issued Date: </span>
								{" to "}
								<span className="text">2014</span>
							</p>
							<p>
								<span className="heading">Certificate link: </span>
								<span className="text">
									<Link to="/">https://www.certificatelink.com/certi.pdf</Link>
								</span>
							</p>
							<p>
								<span className="heading">Certificate Image: </span>
								<span className="text">Image here</span>
							</p>
						</div>
						<div className="details">
							<h2>GHI Nursing Certificate</h2>
							<p>
								<span className="heading">Description: </span>
								{" - "}
								<span className="text">
									Patient Care & Safety, Medical Terminology, Electronic Medical
									Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
									Medication Administration, Patient Advocacy and Support.
								</span>
							</p>
							<p>
								<span className="heading">Issued Date: </span>
								{" to "}
								<span className="text">2014</span>
							</p>
							<p>
								<span className="heading">Certificate link: </span>
								<span className="text">
									<Link to="/">https://www.certificatelink.com/certi.pdf</Link>
								</span>
							</p>
							<p>
								<span className="heading">Certificate Image: </span>
								<span className="text">Image here</span>
							</p>
						</div>
					</div>
				</div>
				<div className="group ">
					<div className="top">
						<h1>Strengths</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => alert(`Editing`)}
						/>
						<FontAwesomeIcon
							className="action-btn delete"
							icon={faTrash}
							onClick={() => alert(`Deleting`)}
						/>
					</div>
					<div className="bottom">
						<div className="details">
							<h2>Communication</h2>
							<p>
								<span className="heading">Typing: </span>
								{" - "}
								<span className="text">80% Mastery, 7 Years</span>
							</p>
							<p>
								<span className="heading">Customer Support: </span>
								{" to "}
								<span className="text">70% Mastery, 4 Years</span>
							</p>
							<p>
								<span className="heading">Patient: </span>
								<span className="text">40% Patience, 2 Years</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="check-boxes">
				<div className="check-box">
					<input
						className="fancy-toggle checkbox"
						type="checkbox"
						name="termsandconditions"
						id="allowContact"
						defaultChecked
					/>
					<label htmlFor="allowContact">
						<span className="input"></span>
						Allow recruiters to contact you for more details
					</label>
				</div>
				<div className="check-box">
					<input
						className="fancy-toggle checkbox"
						type="checkbox"
						name="termsandconditions"
						id="confirm"
					/>
					<label htmlFor="confirm">
						<span className="input"></span>I confirm that the information given
						in this form is true, complete and accurate.
					</label>
				</div>
			</div>

			<div className="cta">
				{/* <button className="primary-btn ">Proceed to questions</button> */}
				<Link
					to="/profile/questions"
					className="primary-btn flex"
					id="profileQuestionsLink"
				>
					Proceed to questions
				</Link>
			</div>
		</div>
	);
}

export default Preview;
