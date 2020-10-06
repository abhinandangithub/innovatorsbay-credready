import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

import "./index.scss";

function GeneralQuestions() {
	const [appliedDate, setAppliedDate] = useState();

	return (
		<div className="general-questions">
			<h1 className="heading">General Questions</h1>

			<ul className="outer">
				<li className="inner applied">
					<h2 className="question">
						Have you applied here previously? Is so, when?
					</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied"
							type="radio"
							id="appliedYes"
						/>
						<label htmlFor="appliedYes">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied"
							type="radio"
							id="appliedNo"
							defaultChecked
						/>
						<label htmlFor="appliedNo">No</label>
					</div>
					<div className="info">
						<label>When you applied?</label>
						<DatePicker
							selected={appliedDate}
							onChange={(date) => setAppliedDate(date)}
							placeholderText="Select Date"
						/>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied1"
							type="radio"
							id="appliedYes1"
						/>
						<label htmlFor="appliedYes1">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied1"
							type="radio"
							id="appliedNo1"
							defaultChecked
						/>
						<label htmlFor="appliedNo1">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied2"
							type="radio"
							defaultChecked
							id="appliedYes2"
						/>
						<label htmlFor="appliedYes2">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied2"
							type="radio"
							id="appliedNo2"
						/>
						<label htmlFor="appliedNo2">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied3"
							type="radio"
							id="appliedYes3"
						/>
						<label htmlFor="appliedYes3">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied3"
							type="radio"
							id="appliedNo3"
							defaultChecked
						/>
						<label htmlFor="appliedNo3">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied4"
							type="radio"
							defaultChecked
							id="appliedYes4"
						/>
						<label htmlFor="appliedYes4">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied4"
							type="radio"
							id="appliedNo4"
						/>
						<label htmlFor="appliedNo4">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied5"
							type="radio"
							id="appliedYes5"
							defaultChecked
						/>
						<label htmlFor="appliedYes5">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied5"
							type="radio"
							id="appliedNo5"
						/>
						<label htmlFor="appliedNo5">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied6"
							type="radio"
							id="appliedYes6"
						/>
						<label htmlFor="appliedYes6">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied6"
							type="radio"
							id="appliedNo6"
							defaultChecked
						/>
						<label htmlFor="appliedNo6">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied7"
							type="radio"
							id="appliedYes7"
							defaultChecked
						/>
						<label htmlFor="appliedYes7">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied7"
							type="radio"
							id="appliedNo7"
						/>
						<label htmlFor="appliedNo">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied8"
							type="radio"
							id="appliedYes8"
						/>
						<label htmlFor="appliedYes8">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied8"
							type="radio"
							id="appliedNo8"
							defaultChecked
						/>
						<label htmlFor="appliedNo8">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied9"
							type="radio"
							id="appliedYes9"
						/>
						<label htmlFor="appliedYes9">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied9"
							type="radio"
							id="appliedNo9"
							defaultChecked
						/>
						<label htmlFor="appliedNo9">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied13"
							type="radio"
							id="appliedYes13"
						/>
						<label htmlFor="appliedYes13">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied13"
							type="radio"
							id="appliedNo13"
							defaultChecked
						/>
						<label htmlFor="appliedNo13">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied10"
							type="radio"
							id="appliedYes10"
						/>
						<label htmlFor="appliedYes10">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied10"
							type="radio"
							id="appliedNo10"
							defaultChecked
						/>
						<label htmlFor="appliedNo10">No</label>
					</div>
				</li>
				<li className="inner">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="yes-no-toggle yes radio"
							name="applied11"
							type="radio"
							id="appliedYes11"
						/>
						<label htmlFor="appliedYes11">Yes</label>
						<input
							className="yes-no-toggle no radio"
							name="applied11"
							type="radio"
							id="appliedNo11"
							defaultChecked
						/>
						<label htmlFor="appliedNo11">No</label>
					</div>
				</li>
			</ul>

			<div className="cta">
				<Link className="primary-btn" to="/jobs/job-specefic-questions">
					Next
				</Link>
			</div>
		</div>
	);
}

export default GeneralQuestions;
