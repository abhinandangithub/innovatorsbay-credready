import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getHiringNeeds } from '../../../../store/actions/employer';
import { getHiringNeedsThunk, getCompanySizeThunk, updateProfileThunk } from '../../../../store/thunks/employer';

import "./index.scss";
import Input from "../../../_Elements/Input";
import Dropdown from "../../../_Elements/Dropdown";

const hiringNeed = {
	heading: "Hires needed in the next 6 monts",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};
const companySize = {
	heading: "Current employees",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};
const socialMedia = {
	heading: "Social Media",
	content: ["TV", "Social (Facebook, LinkedIn, Instagram, etc.)", "Radio (AM/FM/XM)", 
			  "Billboard", "Search Engine", "Streaming Audio (Pandore, Spotify, etc.)",
			  "In the mall", "Podcast", "Other"],
};

function Details(props) {
	const dispatch = useDispatch();
	
	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		experienceType: [],
		organizationName: [],
		title: [],
		startDate: [],
		endDate: [],
		location: [],
		description: [],

		formValid: false,
	});

	useEffect(() => {
		dispatch(getHiringNeedsThunk());
		dispatch(getCompanySizeThunk());
	}, [dispatch]);

	const handleSubmit = () => {
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

		if (oldFormData.formValid) {
			console.log("submitting form...");
			/* send data to api */
		}
		console.log("addOtherExperieces", formData);
		setFormData(oldFormData);
		let profileData = {
			"addresses": [
				{
				  "city": "247 King St.",
				  "id": 0,
				  "state": "New Jersey",
				  "streetAddress": "08817",
				  "zip": 123456
				}
			  ],
			  "companySize": 1,
			  "errors": {},
			  "hiresRequired": 1,
			  "name": "John Doe",
			  "reference": "Co-Worker",
			  "title": "Human Resource Management",
			  "website": "chelseaseniorliving.com"
		};
		dispatch(updateProfileThunk(null, profileData));
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

	return (
		<div className="profile-details">
			Welcome Aboard! Please fill in the details below about your company to get
			started.
			<div className="content">
				<ul className="listing">
					<li>
						<label>
							Full Name <span>*</span>
							<span
								className={`error-text ${
									!formData.organizationName[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>
							Title <span>*</span>
							<span
								className={`error-text ${
									!formData.organizationName[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>
							Company Website <span>*</span>
							<span
								className={`error-text ${
									!formData.organizationName[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>Hiring Needs</label>
						<Dropdown 
							placeholder={hiringNeed.heading}
							content={props.hiringNeeds}
						/>
					</li>
					<li>
						<label>Company Size</label>
						<Dropdown
							placeholder={companySize.heading}
							content={props.companySize}
						/>
					</li>
					<li>
						<label>How did you hear about us?</label>
						<Dropdown
							placeholder={socialMedia.heading}
							content={socialMedia.content}
						/>
					</li>
					<li>
						<ul className="listing">
							<li className="divider">
								<span>Address 1</span>
							</li>
							<li>
								<label>
									Street Address <span>*</span>
									<span
										className={`error-text ${
											!formData.organizationName[1] && "hidden"
										}`}
									>
										Required
									</span>
								</label>
								<Input type="text" />
							</li>
							<li>
								<label>
									City <span>*</span>
									<span
										className={`error-text ${
											!formData.organizationName[1] && "hidden"
										}`}
									>
										Required
									</span>
								</label>
								<Input type="text" />
							</li>
							<li>
								<label>
									State <span>*</span>
									<span
										className={`error-text ${
											!formData.organizationName[1] && "hidden"
										}`}
									>
										Required
									</span>
								</label>
								<Input type="text" />
							</li>
							<li>
								<label>
									Zip Code <span>*</span>
									<span
										className={`error-text ${
											!formData.organizationName[1] && "hidden"
										}`}
									>
										Required
									</span>
								</label>
								<Input type="text" />
							</li>
						</ul>
					</li>
				</ul>
				<button className="add-address">
					<span className="text">Add Address</span> <span>*</span>
					<span
						className={`error-text ${
							!formData.organizationName[1] && "hidden"
						}`}
					>
						Required
					</span>
				</button>
			</div>
			<div className="cta">
				<button className="primary-btn" id="onSubmit" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}

function mapStateToProps (state ) {
	return {
		hiringNeeds: state.employerReducer.hiringNeeds.data,	
		companySize: state.employerReducer.companySize.data	
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getHiringNeeds: bindActionCreators(dispatch, getHiringNeeds)
	}
}

// export default Details;
export default connect(mapStateToProps, mapDispatchToProps)(Details);
