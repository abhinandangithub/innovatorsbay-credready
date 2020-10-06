import React from "react";

import "./index.scss";

function CreateEmailTemplate() {
	return (
		<div className="create-email-template">
			<h1>Add Email Template</h1>
			<div className="content">
				<ul>
					<li>
						<label htmlFor="templateName">
							Template Name <span>*</span>
						</label>
						<input type="text" id="templateName" />
					</li>
					<li>
						<label htmlFor="">Tags</label>
						<ul>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert1"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert1">Job Title</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert2"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert2">Recruiter Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert3"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert3">Candidate First Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert4"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert4">Job Description</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert5"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert5">Job Title</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert6"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert6">Recruiter Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert7"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert7">Candidate First Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert8"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert8">Job Description</label>
							</li>
						</ul>
					</li>
					<li>
						<textarea
							name="template"
							id="template"
							cols="30"
							rows="10"
							value={`Hello {candidate_first_name} {candidate_last_name}\nWe are looking out fpr {job_title} for our organisation located at {location}.\n\nRegards,\n{recruiter_name}`}
						></textarea>
					</li>
				</ul>
				<div className="cta">
					<button className="primary-btn">Add</button>
				</div>
			</div>
		</div>
	);
}

export default CreateEmailTemplate;
