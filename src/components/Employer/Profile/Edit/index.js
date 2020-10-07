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

	const [addressCount, setAddressCount] = React.useState([""]);

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		name: [],
		title: [],
		company: [],
		street_1: [],
		city_1: [],
		state_1: [],
		description_1: [],

		formValid: false,
	});

	useEffect(() => {
		dispatch(getHiringNeedsThunk());
		dispatch(getCompanySizeThunk());
	}, [dispatch]);

	const handleSubmit = () => {
		let _formData = { ...formData };
		_formData.formValid = true;

		for (var field in _formData) {
			if (
				_formData.hasOwnProperty(field) &&
				field !== "formValid" &&
				(_formData[field][0] === "" ||
					_formData[field][0] === undefined ||
					_formData[field][0] === null)
			) {
				_formData[field][0] = "";
				_formData.formValid = false;
				if (_formData[field][1] !== "Required") {
					_formData[field].push("Required");
				}
			}
		}

		if (_formData.formValid) {
			console.log("submitting form...", _formData);
			/* SEND DATA TO API */
		}
		console.log("addOtherExperieces", _formData);
		// setFormData(oldFormData);
		setFormData(_formData);

		let profileData = {
			"addresses": [
				{
					"city": "247 King St.",
					"id": 0,
					"state": "New Jersey",
					"streetAddress": "08817",
					"zip": 12345
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

	const renderAddresses = () => {
		return addressCount.map((address, index) => {
			let i = ++index;
			return (
				<ul className="listing" key={index}>
					<li className="divider">
						<span>Address {i}</span>
					</li>
					<li>
						<label htmlFor={`street_${i}`}>
							Street Address <span>*</span>
							<span
								className={`error-text ${
									!formData[`street_${i}`][1] && "hidden"
									}`}
							>
								Required
							</span>
						</label>
						<Input
							id={`street_${i}`}
							type="text"
							defaultValue={formData[`street_${i}`][0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor={`city_${i}`}>
							City <span>*</span>
							<span
								className={`error-text ${
									!formData[`city_${i}`][1] && "hidden"
									}`}
							>
								Required
							</span>
						</label>
						<Input
							id={`city_${i}`}
							type="text"
							defaultValue={formData[`city_${i}`][0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor={`state_${i}`}>
							State <span>*</span>
							<span
								className={`error-text ${
									!formData[`state_${i}`][1] && "hidden"
									}`}
							>
								Required
							</span>
						</label>
						<Input
							id={`state_${i}`}
							type="text"
							defaultValue={formData[`state_${i}`][0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li style={{ marginBottom: "30px" }}>
						<label htmlFor={`description_${i}`}>
							Zip Code <span>*</span>
							<span
								className={`error-text ${
									!formData[`description_${i}`][1] && "hidden"
									}`}
							>
								Required
							</span>
						</label>
						<Input
							id={`description_${i}`}
							type="text"
							defaultValue={formData[`description_${i}`][0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
				</ul>
			);
		});
	};

	const addAdress = () => {
		let _addressCount = [...addressCount];
		_addressCount.push("");
		setAddressCount(_addressCount);

		/* update form values as well */
		let i = _addressCount.length;
		setFormData({
			...formData,
			[`street_${i}`]: [],
			[`city_${i}`]: [],
			[`state_${i}`]: [],
			[`description_${i}`]: [],
		});
	};

	React.useEffect(() => {
		// effect
		// console.log(formData);
		return () => {
			// cleanup
		};
	}, [formData]);

	return (
		<div className="profile-details">
			Welcome Aboard! Please fill in the details below about your company to get
			started.
			<div className="content">
				<ul className="listing">
					<li>
						<label htmlFor="name">
							Full Name <span>*</span>
							<span className={`error-text ${!formData.name[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Input
							id="name"
							type="text"
							defaultValue={formData.name[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="title">
							Title <span>*</span>
							<span className={`error-text ${!formData.title[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Input
							id="title"
							type="text"
							defaultValue={formData.title[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="company">
							Company Website <span>*</span>
							<span
								className={`error-text ${!formData.company[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Input
							id="company"
							type="text"
							defaultValue={formData.company[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
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
					<li className="addresses">{renderAddresses()}</li>
				</ul>
				<button className="add-address" id="addAdressBtn" onClick={addAdress}>
					<span className="text">Add Address</span>
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

function mapStateToProps(state) {
	return {
		hiringNeeds: state.employerReducer.hiringNeeds.data,
		companySize: state.employerReducer.companySize.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getHiringNeeds: bindActionCreators(dispatch, getHiringNeeds)
	}
}

// export default Details;
export default connect(mapStateToProps, mapDispatchToProps)(Details);
