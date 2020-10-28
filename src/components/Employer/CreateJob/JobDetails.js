import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
	getEmploymentType,
	getIndustry,
	getFunction,
	getLocations,
} from "../../../store/thunks/employer";
import { setNewJob } from "../../../store/actions/employer";

import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";
import InputDropdown from "../../_Elements/InputDropdown";

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
	const [location, setLocation] = useState(props.locationData);
	const [employmentType, setEmploymentType] = useState(
		props.employmentTypeData
	);
	const [industryType, setIndustryType] = useState(props.industryData);
	const [functions, setFunctions] = useState(props.functionData);
	const dispatch = useDispatch();

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

	const handleLocationSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.locationData.filter((val) => {
			if (
				(
					val.street_address +
					", " +
					val.city +
					", " +
					val.state +
					", " +
					val.zip_code
				)
					.toLowerCase()
					.includes(value.toLowerCase())
			) {
				return {
					id: val.id,
					val:
						val.street_address +
						", " +
						val.city +
						", " +
						val.state +
						", " +
						val.zip_code,
				};
			}
		});
		setLocation([...filteredData]);
	};

	const handleEmpTypeSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.employmentTypeData.filter((val) => {
			if (val.employment_status.toLowerCase().includes(value.toLowerCase())) {
				return {
					id: val.id,
					val: val.employment_status,
				};
			}
		});
		setEmploymentType([...filteredData]);
	};

	const handleIndustrySearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.industryData.filter((val) => {
			if (val.industry_name.toLowerCase().includes(value.toLowerCase())) {
				return {
					id: val.id,
					val: val.industry_name,
				};
			}
		});
		setIndustryType([...filteredData]);
	};

	const handleFunctionSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.functionData.filter((val) => {
			if (val.function_name.toLowerCase().includes(value.toLowerCase())) {
				return {
					id: val.id,
					val: val.function_name,
				};
			}
		});
		setFunctions([...filteredData]);
	};

	const handleChangeEmpType = (item) => {
		if (typeof item !== "number") return;
		dispatch(setNewJob({ employmentType: item }));
	};
	const handleChangeIndustry = (item) => {
		if (typeof item !== "number") return;
		dispatch(setNewJob({ industry: item }));
	};
	const handleChangeFunction = (item) => {
		if (typeof item !== "number") return;
		dispatch(setNewJob({ function: item }));
	};
	const handleChangeJobTile = (e) => {
		dispatch(setNewJob({ jobTitle: e.target.value }));
	};
	const handleChangeLocation = (e) => {
		if (typeof e !== "number") return;
		dispatch(setNewJob({ location: e }));
	};
	const handleChangeOpenPosition = (e) => {
		dispatch(setNewJob({ openPositions: e.target.value }));
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
						<Input type="text" onChange={handleChangeJobTile} autoFocus />
					</li>
					<li>
						<label>
							Job Location <span>*</span>
						</label>
						{/* <Input type="text" placeholder="Zip or city, state" onChange={handleChangeLocation}/> */}
						{/* <Dropdown
							placeholder="Zip or city, state"
							content={props.locations}
							onchange={(item) => handleChangeLocation(item)}
						/> */}
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
							// selected={institution.content[formData.institution[0]]}
							onchange={(value) => {
								handleChangeLocation(value);
								// handleLocationSearch(value);
							}}
						/>
					</li>
					<li>
						<label>
							Employment Type <span>*</span>
						</label>
						{/* <Dropdown
							placeholder={employmentType.heading}
							content={props.employmentType}
							onchange={(item) => handleChangeEmpType(item)}
						/> */}
						<InputDropdown
							placeholder={employmentTypes.heading}
							content={employmentType.map((val) => ({
								val: val.employment_status,
								id: val.id,
							}))}
							search_term="employment_status"
							id="employment"
							// selected={institution.content[formData.institution[0]]}
							onchange={(value) => {
								handleChangeEmpType(value);
								// handleEmpTypeSearch(value);
							}}
						/>
					</li>
					<li>
						<label>
							Industry <span>*</span>
						</label>
						{/* <Dropdown
							placeholder={industry.heading}
							content={props.industry}
							onchange={(item) => handleChangeIndustry(item)}
						/> */}
						<InputDropdown
							placeholder={industry.heading}
							content={industryType.map((val) => ({
								val: val.industry_name,
								id: val.id,
							}))}
							id="industry"
							search_term="industry_name"
							// selected={institution.content[formData.institution[0]]}
							onchange={(value) => {
								handleChangeIndustry(value);
								// handleIndustrySearch(value);
							}}
						/>
					</li>
					<li>
						<label>
							Function <span>*</span>
						</label>
						{/* <Dropdown
							placeholder={_function.heading}
							content={props.functionType}
							onchange={(item) => handleChangeFunction(item)}
						/> */}
						<InputDropdown
							placeholder={_function.heading}
							content={functions.map((val) => ({
								val: val.function_name,
								id: val.id,
							}))}
							search_term="function_name"
							id="function"
							// selected={institution.content[formData.institution[0]]}
							onchange={(value) => {
								handleChangeFunction(value);
								// handleFunctionSearch(value);
							}}
						/>
					</li>
					<li>
						<label>How many Open Positions Are There?</label>
						<Input type="text" onChange={handleChangeOpenPosition} />
					</li>
				</ul>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
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