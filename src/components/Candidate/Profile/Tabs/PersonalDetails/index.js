import React from "react";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import "./index.scss";
import Input from "../../../../_Elements/Input";
import Dropdown from "../../../../_Elements/Dropdown";
import { updateCandidateDetails, fetchCandidateCurrentStatus, fetchCandidateDetails } from "../../../../../modals/candidateProfile/thunk";
import InputDropdown from "../../../../_Elements/InputDropdown";

const employmentStatus = {
	heading: "Current employment status",
	content: [
		"Employed",
		"Self Employed",
		"Available",
		"On Break",
		"Employed",
		"Self Employed",
		"Available",
		"On Break",
		"Employed",
		"Self Employed",
		"Available",
		"On Break",
	],
};

const joiningDuration = {
	heading: "Select Durations",
	content: ["Immediately", "Less than 2 weeks", "2-3 weeks", "3 weeks to 1 month", "1-3 months", "3-6 months", "6-9 months", "1 year", "more than 1 year"],
};

function PersonalDetails(props) {
	const [prevData, setPrevData] = React.useState(props.candidatePreviousData)
	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		firstName: [],
		lastName: [],
		employmentStatus: [],
		interestedIn: [],
		joiningDuration: [],
		streetAddress: [],
		city: [],
		state: [],
		zipCode: [],

		formValid: false,
	});

	// setFormData(state.formValues);


	const handleSubmit = (e) => {
		e.preventDefault();
		let oldFormData = { ...formData };
		oldFormData.formValid = true;

		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				(oldFormData[field][0] === "" ||
					oldFormData[field][0] === undefined ||
					oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				oldFormData[field].push("Required");
				oldFormData.formValid = false;
			}
		}

		console.log(formData);
		if (oldFormData.formValid) {
			let obj =
			{
				"firstName": formData ? formData.firstName[0] : "",
				"lastName": formData ? formData.lastName[0] : "",
				"openToOtherRoles": formData && (formData.interestedIn[0] === "on") ? true : false,
				"currentEmploymentStatusId": formData ? formData.employmentStatus[0] : "",
				"availableWithin": formData ? formData.joiningDuration[0] : "",
				"streetAddress": formData ? formData.streetAddress[0] : "",
				"state": formData ? formData.state[0] : "",
				"city": formData ? formData.city[0] : "",
				"zipCode": formData ? parseInt(formData.zipCode[0]) : "",
			}
			/* send data to api */
			props.updateCandidateDetails(obj);
			props.history.push("/profile/work-experience");
		}

		setFormData(oldFormData);
	};

	const handleFieldChange = (field, value) => {
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	React.useEffect(() => {
		if (props.currentStatus.length > 1) return;
		props.fetchCandidateCurrentStatus();
		props.fetchCandidateDetails();
	}, []);

	return (
		<div className="personal-details">
			<form onSubmit={(e) => handleSubmit(e)} className="content">
				<div className="content">
					<ul className="listing">
						<li>
							<label htmlFor="firstName">
								First name <span>*</span>
								<span
									className={`error-text ${!formData.firstName[1] && "hidden"}`}
								>
									Required
								</span>
							</label>
							<Input
								type="text"
								placeholder="First name"
								id="firstName"
								defaultValue={formData.firstName[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="lastName">
								Last name <span>*</span>
								<span
									className={`error-text ${!formData.lastName[1] && "hidden"}`}
								>
									Required
								</span>
							</label>
							<Input
								type="text"
								placeholder="Last name"
								id="lastName"
								defaultValue={formData.lastName[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="employmentStatus">
								Current employment status <span>*</span>
								<span
									className={`error-text ${!formData.employmentStatus[1] && "hidden"
										}`}
								>
									Required
								</span>
							</label>
							<Dropdown
								placeholder={employmentStatus.heading}
								content={props.currentStatus.map((val) => ({ val: val.employment_status, id: val.id }))}
								id="employmentStatus"
								onchange={(value) =>
									handleFieldChange("employmentStatus", value)
								}
							/>
						</li>
						<li className="industry">
							<label>
								Are you interested in a different function and industry?{" "}
								<span>*</span>
								<span
									className={`error-text ${!formData.interestedIn[1] && "hidden"
										}`}
								>
									Required
								</span>
							</label>
							<div>
								<input
									className="fancy-toggle"
									id="interestedInYes"
									name="interestedIn"
									type="radio"
									onChange={(e) =>
										handleFieldChange("interestedIn", e.target.value)
									}
								/>
								<label htmlFor="interestedInYes">
									<span className="input"></span>Yes
								</label>
								<input
									className="fancy-toggle no"
									id="interestedInNo"
									name="interestedIn"
									type="radio"
									onChange={(e) =>
										handleFieldChange("interestedIn", e.target.value)
									}
								/>
								<label htmlFor="interestedInNo">
									<span className="input"></span>No
								</label>
							</div>
						</li>
						<li>
							<label htmlFor="joiningDuration">
								How long until you can begin a new role? <span>*</span>
								<span
									className={`error-text ${!formData.joiningDuration[1] && "hidden"
										}`}
								>
									Required
								</span>
							</label>
							<Dropdown
								placeholder={joiningDuration.heading}
								content={joiningDuration.content}
								id="joiningDuration"
								onchange={(value) =>
									handleFieldChange("joiningDuration", value)
								}
							/>
						</li>
						<li>
							<label htmlFor="streetAddress">
								Street address <span>*</span>
								<span
									className={`error-text ${!formData.streetAddress[1] && "hidden"
										}`}
								>
									Required
								</span>
							</label>
							<Input
								type="text"
								placeholder="Street address"
								id="streetAddress"
								defaultValue={formData.streetAddress[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="city">
								City <span>*</span>
								<span className={`error-text ${!formData.city[1] && "hidden"}`}>
									Required
								</span>
							</label>
							<Input
								type="text"
								placeholder="City"
								id="city"
								defaultValue={formData.city[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="state">
								State <span>*</span>
								<span
									className={`error-text ${!formData.state[1] && "hidden"}`}
								>
									Required
								</span>
							</label>
							<Input
								type="text"
								placeholder="State"
								id="state"
								defaultValue={formData.state[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="zipCode">
								Zip code <span>*</span>
								<span
									className={`error-text ${!formData.zipCode[1] && "hidden"}`}
								>
									Required
								</span>
							</label>
							<Input
								type="text"
								placeholder="Zip code"
								id="zipCode"
								defaultValue={formData.zipCode[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
					</ul>
				</div>
				<div className="cta">
					<Link
						to="/profile/resume"
						className="primary-btn outline"
						id="previousLink"
					>
						Previous
					</Link>
					<input
						className="primary-btn"
						type="submit"
						value="Next"
						id="nextLink"
					/>
					{/* <Link
						to="/profile/work-experience"
						className="primary-btn"
						id="nextLink"
					>
						Next
					</Link> */}
				</div>
			</form>
		</div >
	);
}

function mapStateToProps(state) {
	return {
		currentStatus: state.candidateCurrentStatusReducer.data,
		candidatePreviousData: state.candidateSetDataReducer.data
	};
}

const mapDispatchToProps = {
	updateCandidateDetails: updateCandidateDetails,
	fetchCandidateCurrentStatus: fetchCandidateCurrentStatus,
	fetchCandidateDetails: fetchCandidateDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
