import React from "react";

import "./index.scss";

function ChoosePrivateQuestions() {
	return (
		<div className="choose-private-question">
			<h1>Choose from Private Questions</h1>
			<div className="content">
				<div className="search-panel">
					<div className="searches">
						<input type="text" placeholder="Job Title" />
						<input type="text" placeholder="Skills" />
					</div>
				</div>
				<ul className="common-questions-outer">
					<li className="inner">
						<h2 className="question">Location?</h2>
						<div className="options">
							<input type="text" className="full" />
						</div>
					</li>
					<li className="inner">
						<h2 className="question">Acceptable Shifts?</h2>

						<div className="options">
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="7-3"
							/>
							<label htmlFor="7-3">
								<span className="input"></span>7am – 3pm
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="3-11"
							/>
							<label htmlFor="3-11">
								<span className="input"></span>3pm – 11pm
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="11-3"
							/>
							<label htmlFor="11-3">
								<span className="input"></span>11pm - 3am
							</label>
						</div>
					</li>
					<li className="inner">
						<h2 className="question">Verbal English Fluency?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="Limited"
							/>
							<label htmlFor="Limited">
								<span className="input"></span>Limited
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="Working"
							/>
							<label htmlFor="Working">
								<span className="input"></span>Working
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="Fluent"
							/>
							<label htmlFor="Fluent">
								<span className="input"></span>Fluent
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="Native"
							/>
							<label htmlFor="Native">
								<span className="input"></span>Native
							</label>
						</div>
					</li>
					<li className="inner input-blocks">
						<h2 className="question">Certifications?</h2>
						<div className="options">
							<input
								className="block-toggle blue checkbox"
								id="cert1"
								name="cert"
								type="checkbox"
							/>
							<label htmlFor="cert1">Certified Nursing Assistant</label>
							<input
								className="block-toggle blue checkbox"
								id="cert2"
								name="cert"
								defaultChecked
								type="checkbox"
							/>
							<label htmlFor="cert2">Home Health Aid</label>
							<input
								className="block-toggle blue checkbox"
								id="cert3"
								name="cert"
								type="checkbox"
							/>
							<label htmlFor="cert3">Certified Nursing Aid</label>
							<input
								className="block-toggle blue checkbox"
								id="cert4"
								name="cert"
								type="checkbox"
							/>
							<label htmlFor="cert4">Other</label>
						</div>
					</li>
					<li className="inner">
						<h2 className="question">Years of CNA experience?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="0"
							/>
							<label htmlFor="0">
								<span className="input"></span>0
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="1"
							/>
							<label htmlFor="1">
								<span className="input"></span>1
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="2"
							/>
							<label htmlFor="2">
								<span className="input"></span>2
							</label>
							<input
								className="fancy-toggle blue checkbox"
								name="cna"
								type="checkbox"
								id="3+"
							/>
							<label htmlFor="3+">
								<span className="input"></span>3+
							</label>
						</div>
					</li>
					<li className="inner input-blocks">
						<h2 className="question">Education</h2>
						<div className="options">
							<input
								className="block-toggle blue checkbox"
								id="edu1"
								name="edu"
								type="checkbox"
								defaultChecked
							/>
							<label htmlFor="edu1">High School Diploma</label>
							<input
								className="block-toggle blue checkbox"
								id="edu2"
								name="edu"
								type="checkbox"
								c
							/>
							<label htmlFor="edu2">College Degree</label>
						</div>
					</li>
					<li className="inner">
						<h2 className="question">
							Do you understand that these are some of the tasks you will
							perform as a CNA?
						</h2>
						<ul className="info">
							<li>Changing diapers</li>
							<li>Cleaning beds</li>
							<li>Mealtime cleanup</li>
						</ul>
						<div className="options">
							<input
								className="fancy-toggle blue radio"
								id="yes1"
								name="interestedIn1"
								type="radio"
							/>
							<label htmlFor="yes1">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle blue radio"
								id="no1"
								name="interestedIn1"
								type="radio"
								defaultChecked
							/>
							<label htmlFor="no1">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="inner">
						<h2 className="question">
							The posted wage is $13.50 per hour. This may increase with
							experience. Do you understand this wage expectation?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue"
								id="yes"
								name="interestedIn"
								defaultChecked
								type="radio"
							/>
							<label htmlFor="yes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle blue"
								id="no"
								name="interestedIn"
								type="radio"
							/>
							<label htmlFor="no">
								<span className="input"></span>No
							</label>
						</div>
					</li>
				</ul>
				<div className="cta">
					<button className="primary-btn">Add</button>
				</div>
			</div>
		</div>
	);
}

export default ChoosePrivateQuestions;
