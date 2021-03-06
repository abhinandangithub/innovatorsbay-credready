import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { getHiringNeeds } from "../../../../store/actions/employer";
import {
	getHiringNeedsThunk,
	getCompanySizeThunk,
	updateProfileThunk,
	getGeographyThunk,
	getProfileThunk,
} from "../../../../store/thunks/employer";

import "./index.scss";
import Input from "../../../_Elements/Input";
import Dropdown from "../../../_Elements/Dropdown";
import InputDropdown from "../../../_Elements/InputDropdown";
import Spinner from "../../../_Elements/Spinner";
import { findIndexOfObjInArr } from "../../../../assets/js/Utility";

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
	content: [
		"TV",
		"Social (Facebook, LinkedIn, Instagram, etc.)",
		"Radio (AM/FM/XM)",
		"Billboard",
		"Search Engine",
		"Streaming Audio (Pandore, Spotify, etc.)",
		"In the mall",
		"Podcast",
		"Other",
	],
};

function Details(props) {
	const dispatch = useDispatch();

	const [addressCount, setAddressCount] = React.useState([""]);
	const [city, setCity] = React.useState(() => {
		// 	let cty;
		// 	for(let i = 0; i < props.profile.org.address.length; i++) {
		// 	cty =	props.geographyKeys &&
		// 	props.geographyKeys[
		// 	findIndexOfObjInArr(props.geographyKeys, "city", formData[`city_${i}`][0])
		// 	] &&
		// 	props.geographyKeys[
		// 		findIndexOfObjInArr(props.geographyKeys, "city", formData[`city_${i}`][0])
		// 	].city
		// 	}
		// 	return cty;
	});
	const [state, setState] = React.useState([]);
	const [isAddAddressClicked, setIsAddAddressClicked] = React.useState(false);
	const [uniqueStates, setUniqueStates] = React.useState([]);

	useEffect(() => {
		let obj = props.geographyKeys.map((o) => {
			return o.state;
		});
		console.log("setUniqueStates ", obj);
		setUniqueStates([...new Set(obj)]);
	}, [props.geographyKeys]);

	const [formData, setFormData] = React.useState(() => {
		console.log("props.profile.org.address ", props.profile.org.address);
		let initialState = {};
		initialState.name = [props.profile.name];
		initialState.title = [props.profile.title];
		initialState.website = [props.profile.org.website];
		initialState.hiringNeeds = [
			props.profile.org.hires_required &&
			props.hiringKeys.length > 0 &&
			props.hiringKeys.find(
				(val) => val.id === props.profile.org.hires_required
			).range_display_value,
		];
		initialState.companySize = [
			props.profile.org.company_size &&
			props.companySizeKeys.length > 0 &&
			props.companySizeKeys.find(
				(val) => val.id === props.profile.org.company_size
			).range_display_value,
		];
		initialState.reference = [props.profile.org.reference_source];

		if (props.profile.org.address.length === 0) {
			initialState["street_0"] = [""];
			initialState["city_0"] = [""];
			initialState["state_0"] = [""];
			initialState["zipCode_0"] = [""];
		} else {
			for (let i = 0; i < props.profile.org.address.length; i++) {
				initialState["id_" + i] = [props.profile.org.address[i].id];
				initialState["street_" + i] = [
					props.profile.org.address[i].street_address,
				];
				// initialState["city_" + i] = [props.geographyKeys.find(c => c.city === props.profile.org.address[i].city).id];
				initialState["city_" + i] = [props.profile.org.address[i].city];
				initialState["state_" + i] = [props.profile.org.address[i].state];
				initialState["zipCode_" + i] = [props.profile.org.address[i].zip_code];
			}
		}

		console.log(initialState);
		return initialState;
	});

	useEffect(() => {
		let addCnt = [];
		dispatch(getProfileThunk());
		dispatch(getHiringNeedsThunk());
		dispatch(getCompanySizeThunk());
		dispatch(getGeographyThunk());
		if (props.profile.org.address.length === 0) {
			addCnt.push("");
		} else {
			for (let i = 0; i < props.profile.org.address.length; i++) {
				addCnt.push(i);
			}
		}

		setAddressCount(addCnt);
	}, [dispatch]);

	useEffect(() => {
		let initialState = {};
		initialState.name = [props.profile.name];
		initialState.title = [props.profile.title];
		initialState.website = [props.profile.org.website];
		initialState.hiringNeeds = [
			props.profile.org.hires_required &&
			props.hiringKeys.length > 0 &&
			props.hiringKeys.find(
				(val) => val.id === props.profile.org.hires_required
			).range_display_value,
		];
		initialState.companySize = [
			props.profile.org.company_size &&
			props.companySizeKeys.length > 0 &&
			props.companySizeKeys.find(
				(val) => val.id === props.profile.org.company_size
			).range_display_value,
		];
		initialState.reference = [props.profile.org.reference_source];

		if (props.profile.org.address.length === 0) {
			initialState["street_0"] = [""];
			initialState["city_0"] = [""];
			initialState["state_0"] = [""];
			initialState["zipCode_0"] = [""];
		} else {
			for (let i = 0; i < props.profile.org.address.length; i++) {
				initialState["id_" + i] = [props.profile.org.address[i].id];
				initialState["street_" + i] = [
					props.profile.org.address[i].street_address,
				];
				// initialState["city_" + i] = [props.geographyKeys.find(c => c.city === props.profile.org.address[i].city).id];
				initialState["city_" + i] = [props.profile.org.address[i].city];
				initialState["state_" + i] = [props.profile.org.address[i].state];
				initialState["zipCode_" + i] = [props.profile.org.address[i].zip_code];
			}
		}
		console.log(initialState);
		setFormData(initialState);
	}, [props.profile]);

	useEffect(() => {
		console.log("props.geography ", props.geographyKeys);
		let city = props.geographyKeys.map((c) => {
			return c.city;
		});
	}, [props.geography, props.geographyKeys]);

	const handleSubmit = () => {
		let _formData = { ...formData };
		_formData.formValid = true;

		for (var field in _formData) {
			let skip =
				field === "hiringNeeds" ||
					field === "companySize" ||
					field === "reference"
					? false
					: true;

			if (
				_formData.hasOwnProperty(field) &&
				field !== "formValid" &&
				skip &&
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

		let profileData = {
			name: _formData["name"][0],
			title: _formData["title"][0],
			website: _formData["website"][0],
			hiresRequired: _formData["hiringNeeds"][0],
			companySize: _formData["companySize"][0],
			reference: _formData["reference"][0],
			addresses: [],
		};

		for (let i = 0; i < addressCount.length; i++) {
			let address = {};
			// address.id = i;
			if (_formData["id_" + i]) {
				address.id = _formData["id_" + i][0];
			}
			address.streetAddress = _formData["street_" + i][0];
			address.city = _formData["city_" + i][0];
			// address.city = props.geographyKeys.find((c) => c.id === _formData["city_" + i][0]).city;
			address.state = _formData["state_" + i][0];
			address.zip = _formData["zipCode_" + i][0].toString();
			profileData.addresses.push(address);
		}

		/* IF FORM IS VALID */
		if (_formData.formValid) {
			/* SEND DATA TO API */
			console.log("profileData", profileData);
			dispatch(updateProfileThunk(null, profileData));
			props.history.push("/profile/view");
		}

		setFormData(_formData);
	};

	const handleFieldChange = (field, value) => {
		console.log("address ", field, value);
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	const handleFieldChangeCityState = (field, value, property) => {
		console.log("city state ", field, value);
		let msg = value === "" || value === null ? "Required" : "";

		let temp = "";
		if (property === "city") {
			let obj = props.geographyKeys.find((val) => val.id === value);
			temp = obj ? obj[property] : value;
			console.log("obj ", obj);
		} else {
			let obj = uniqueStates.find((val) => val === value);
			temp = obj ? obj : value;
		}
		let arr = [];
		arr[0] = temp;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	const handleFieldChangeCity = (field, value, stateField) => {
		if (typeof value !== "number") return;
		let msg = value === "" || value === null ? "Required" : "";
		let obj = props.geographyKeys.find((c) => {
			return c.id === value;
		});

		if (!obj) {
			msg = "Required";
		}

		// setState(obj.state);
		let city = [];
		// city[0] = value;
		city[0] = obj.city;
		city[1] = msg;

		let state = [];
		state[0] = obj.state;
		state[1] = msg;

		setFormData({
			...formData,
			[field]: city,
			[stateField]: state,
		});

		// setFormData({
		// 	...formData,
		// 	[stateField]: state,
		// });
		// console.log(formData);
	};

	const handleFieldSearchCity = (field, value) => {
		if (typeof value !== "number") return;
		let msg = value === "" || value === null ? "Required" : "";

		let city = [];
		// city[0] = value;
		city[0] = value;
		city[1] = msg;
		setFormData({
			...formData,
			[field]: city,
		});
	};

	const handleFieldSearchState = (field, value) => {
		if (typeof value === "number") return;
		let msg = value === "" || value === null ? "Required" : "";

		let state = [];
		// city[0] = value;
		state[0] = value;
		state[1] = msg;
		setFormData({
			...formData,
			[field]: state,
		});
	};

	const renderAddresses = () => {
		console.log("form data ", formData);
		return addressCount.map((address, index) => {
			let i = index;
			return (
				<ul className="listing" key={index}>
					<li className="divider">
						<span>Address {i + 1}</span>
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
							value={formData[`street_${i}`][0]}
							autoFocus={isAddAddressClicked}
							// value={address.street_address}
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
						{/* <Input
							id={`city_${i}`}
							type="text"
							value={formData[`city_${i}`][0]}
							// value={address.city}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/> */}
						<InputDropdown
							id={`city_${i}`}
							placeholder="city"
							content={props.geographyKeys.map((val) => ({
								val: val.city,
								id: val.id,
							}))}
							search_term="city"
							selected={formData[`city_${i}`][0]}
							onchange={(value) =>
								handleFieldChangeCityState(`city_${i}`, value, "city")
							}

						// onchange={(value) => {
						// 	handleFieldChangeCity(`city_${i}`, value, `state_${i}`);
						// 	handleFieldSearchCity(`city_${i}`, value);
						// }}
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
						{/* <InputDropdown
							placeholder={socialMedia.heading}
							content={socialMedia.content}
							selected={formData.reference[0]}
							onchange={(value) => handleFieldChange("reference", value)}
						/> */}
						<InputDropdown
							id={`state_${i}`}
							placeholder="state"
							content={uniqueStates}
							// search_term="state"
							selected={formData[`state_${i}`][0]}
							onchange={(value) =>
								handleFieldChangeCityState(`state_${i}`, value, "state")
							}
						// onchange={(value) => {
						// 	// handleFieldChangeCity(`city_${i}`, value, `state_${i}`);
						// 	handleFieldSearchState(`state_${i}`, value);
						// }}
						/>
					</li>
					<li style={{ marginBottom: "30px" }}>
						<label htmlFor={`zipCode_${i}`}>
							Zip Code <span>*</span>
							<span
								className={`error-text ${
									!formData[`zipCode_${i}`][1] && "hidden"
									}`}
							>
								Required
							</span>
						</label>
						<Input
							id={`zipCode_${i}`}
							type="text"
							value={formData[`zipCode_${i}`][0]}
							// value={address.zip_code}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
				</ul>
			);
		});
	};

	const addAdress = () => {
		setIsAddAddressClicked(true);
		let _addressCount = [...addressCount];
		_addressCount.push("");
		setAddressCount(_addressCount);
		console.log(_addressCount);

		/* update form values as well */
		let i = _addressCount.length - 1;
		setFormData({
			...formData,
			[`street_${i}`]: [],
			[`city_${i}`]: [],
			[`state_${i}`]: [],
			[`zipCode_${i}`]: [],
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
		// !props.loading ?
		// 	< Spinner /> :
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
							autoFocus
							value={formData.name[0]}
							// defaultValue={formData.name[0]}
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
							value={formData.title[0]}
							// defaultValue={formData.title[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="company">
							Company Website <span>*</span>
							<span
								className={`error-text ${!formData.website[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Input
							id="website"
							type="text"
							defaultValue={formData.website[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label>Hiring Needs</label>
						<InputDropdown
							placeholder={hiringNeed.heading}
							content={props.hiringNeeds}
							selected={formData.hiringNeeds[0]}
							onchange={(value) => handleFieldChange("hiringNeeds", value)}
						/>
					</li>
					<li>
						<label>Company Size</label>
						<InputDropdown
							placeholder={companySize.heading}
							content={props.companySize}
							selected={formData.companySize[0]}
							onchange={(value) => handleFieldChange("companySize", value)}
						/>
					</li>
					<li>
						<label>How did you hear about us?</label>
						<InputDropdown
							placeholder={socialMedia.heading}
							content={socialMedia.content}
							selected={formData.reference[0]}
							onchange={(value) => handleFieldChange("reference", value)}
						/>
					</li>
					{renderAddresses()}
					<li className="addresses"></li>
				</ul>
				<button className="add-address" id="addAdressBtn" onClick={addAdress}>
					<span className="text">Add Address</span>
				</button>
			</div>
			<div className="cta">
				<button
					className="primary-btn blue"
					id="onSubmit"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		hiringNeeds: state.employerReducer.hiringNeeds.data,
		companySize: state.employerReducer.companySize.data,
		profile: state.employerReducer.profile.data,
		companySizeKeys: state.employerReducer.companySizeKeys,
		hiringKeys: state.employerReducer.hiringKeys,
		geographyKeys: state.employerReducer.geographyKeys,
		geography: state.employerReducer.geography.data,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getHiringNeeds: bindActionCreators(dispatch, getHiringNeeds),
	};
}

// export default Details;
export default connect(mapStateToProps, mapDispatchToProps)(Details);
