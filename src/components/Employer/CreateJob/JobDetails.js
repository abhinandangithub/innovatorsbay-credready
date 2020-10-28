import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
	getEmploymentType,
	getIndustry,
	getFunction,
	getLocations,
} from "../../../store/thunks/employer";
import { setNewJob } from "../../../store/actions/employer";
import { Link, useParams } from "react-router-dom";

import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";
import InputDropdown from "../../_Elements/InputDropdown";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";

const employmentTypes = {
	heading: "Employment Type",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const industry = {
	heading: "Select Industry",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const _function = {
	heading: "Select Function",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

function CreateJob(props) {

	const parent = React.useRef();
	let { jobId } = useParams();

	const [location, setLocation] = useState(props.locationData);
	const [employmentType, setEmploymentType] = useState(
		props.employmentTypeData
	);
	const [industryType, setIndustryType] = useState(props.industryData);
	const [functions, setFunctions] = useState(props.functionData);
	const [updaeJob, setUpdatejob] = useState(props.jobToUpdate);
	const [disableCtrl, setDisableCtrl] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(jobToUpdate(jobId));
		if (props.jobToUpdate.count_of_applied_candidates && jobId)
			setDisableCtrl(true)
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmploymentType());
		dispatch(getIndustry());
		dispatch(getFunction());
		dispatch(getLocations());
	}, [dispatch]);

	React.useEffect(() => {
		setLocation(props.locationData);
	}, [props.locationData]);

	React.useEffect(() => {
		setEmploymentType(props.employmentTypeData);
	}, [props.employmentTypeData]);

	React.useEffect(() => {
		setIndustryType(props.industryData);
	}, [props.industryData]);

	React.useEffect(() => {
		setFunctions(props.functionData);
	}, [props.functionData]);

	React.useEffect(() => {
		if (!!props.jobToUpdate && !!jobId) {
			console.log('props.jobToUpdate ', props.jobToUpdate);
			console.log('props.jobToUpdate.industry ', props.jobToUpdate.industry, props.jobToUpdate.industry && props.jobToUpdate.industry.id);
			console.log('props.jobToUpdate.industry ', props.jobToUpdate.function_name);

			// setUpdatejob(props.jobToUpdate);
			setFormData({
				title: [props.jobToUpdate.job_title],
				employment: [
					props.employmentTypeData &&
					props.employmentTypeData.length > 0 &&
					props.employmentTypeData.find(
						(val) => val.id === props.jobToUpdate.employment_type
					),
				],
				industry: [
					props.jobToUpdate.industry
				],
				function: [
					props.jobToUpdate.function
				],
				position: [props.jobToUpdate.open_positions],
				location: [props.jobToUpdate.address]
				// &&
				// props.jobToUpdate.address.street_address + ", " +
				// props.jobToUpdate.address.city + ", " +
				// props.jobToUpdate.address.state + ", " +
				// props.jobToUpdate.address.zip_code + ", "
			})
		}

	}, [props.jobToUpdate]);

	const [formData, setFormData] = React.useState(() => {
		let initialState = {};
		initialState.title = [];
		initialState.employment = [];
		initialState.industry = [];
		initialState.function = [];
		initialState.position = [];
		initialState.location = [];

		console.log(initialState);
		return initialState;
	});

	const handleChangeEmpType = (item, id) => {
		//	if (typeof item !== "number") return;

		handleFieldChange(id, item);
		if (typeof item === "number") {
			dispatch(setNewJob({ employmentType: item }));
		}
	};

	const handleChangeIndustry = (item, id) => {
		handleFieldChange(id, item);
		if (typeof item === "number") {
			dispatch(setNewJob({ industry: item }))
		}
	};
	const handleChangeFunction = (item, id) => {
		console.log('function ', item);
		handleFieldChange(id, item);
		if (typeof item === "number") {
			dispatch(setNewJob({ function: item }));
		}
	};
	const handleChangeJobTile = (e) => {
		handleFieldChange(e.target.id, e.target.value);
		dispatch(setNewJob({ jobTitle: e.target.value }));
	};
	const handleChangeLocation = (e) => {
		// if (typeof e !== "number") return;
		// dispatch(setNewJob({ location: e }));
		console.log('location ', e);
		handleFieldChange("location", e);
		if (typeof e === "number") {
			dispatch(setNewJob({ location: e }));
		}
	};
	const handleChangeOpenPosition = (e) => {
		handleFieldChange("position", e.target.value);
		dispatch(setNewJob({ openPositions: e.target.value }));
	};

	const handleFieldChange = (field, value) => {
		console.log('address ', field, value);
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
		<div className="job-details" ref={parent}>
			<div className="heading">
				<h2>
					Job Details <span>*</span>
				</h2>
			</div>
			<div className="content">
				<ul>
					<li>
						<label>
							Job Title <span>*</span>
						</label>
						<Input type="text"
							onChange={handleChangeJobTile}
							id="title"
							value={formData.title[0]}
							// onChange={(e) => handleChangeJobTile(e.target.id, e.target.value)}
							autoFocus
							disabled={disableCtrl} />
					</li>
					<li>
						<label>
							Job Location <span>*</span>
						</label>
						<InputDropdown
							placeholder="Zip or city, state"
							content={location.map((val) => ({
								val:
									val.street_address +
									", " +
									val.city +
									", " +
									val.state +
									", " +
									val.zip_code,
								id: val.id,
							}))}
							id="location"
							search_term
							// selected={formData.location[0] &&
							// 	formData.location[0].street_address + ", " +
							// 	formData.location[0].city + ", " +
							// 	formData.location[0].state + ", " +
							// 	formData.location[0].zip_code + ", "
							// }
							onchange={(value) => {
								handleChangeLocation(value);
							}}
							disable={disableCtrl}
						// onchange={(value) => {
						// 	handleChangeLocation(value);
						// }}
						/>
					</li>
					<li>
						<label>
							Employment Type <span>*</span>
						</label>

						<InputDropdown
							placeholder={employmentTypes.heading}
							content={employmentType.map((val) => ({
								val: val.employment_status,
								id: val.id,
							}))}
							search_term="employment_status"
							id="employment"
							selected={formData.employment[0] && formData.employment[0].employment_status}
							onchange={(value) => {
								handleChangeEmpType(value, "employment");
							}}
							// disable={disableCtrl}
						/>
					</li>
					<li>
						<label>
							Industry <span>*</span>
						</label>

						<InputDropdown
							placeholder={industry.heading}
							content={industryType.map((val) => ({
								val: val.industry_name,
								id: val.id,
							}))}
							id="industry"
							search_term="industry_name"
							selected={formData.industry[0] && formData.industry[0].industry_name}
							onchange={(value) => {
								handleChangeIndustry(value, "industry");
								// handleIndustrySearch(value);
							}}
							disable={disableCtrl}
						/>
					</li>
					<li>
						<label>
							Function <span>*</span>
						</label>

						<InputDropdown
							placeholder={_function.heading}
							content={functions.map((val) => ({
								val: val.function_name,
								id: val.id,
							}))}
							search_term="function_name"
							id="function"
							selected={formData.function[0] && formData.function[0].function_name}
							onchange={(value) => {
								handleChangeFunction(value, "function");
							}}
							disable={disableCtrl}
						/>
					</li>
					<li>
						<label>How many Open Positions Are There?</label>
						<Input type="text" 
						// disabled={disableCtrl} 
						id="position" value={formData.position[0]} onChange={handleChangeOpenPosition} />
					</li>
				</ul>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		jobToUpdate: state.employerReducer.jobToUpdate,
		employmentType: state.employerReducer.employmentType.data,
		functionType: state.employerReducer.functionType.data,
		industry: state.employerReducer.industry.data,
		locations: state.employerReducer.locationNames,
		locationData: state.employerReducer.locations.data,
		employmentTypeData: state.employerReducer.employmentKeys,
		industryData: state.employerReducer.industryKeys,
		functionData: state.employerReducer.functionKeys,
	};
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);
