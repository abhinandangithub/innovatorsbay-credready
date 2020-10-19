import React from "react";
import { connect, useDispatch } from 'react-redux';
import { getEmploymentType, getIndustry, getFunction, getLocations } from '../../../store/thunks/employer';
import { setNewJob } from '../../../store/actions/employer';

import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";
import InputDropdown from '../../_Elements/InputDropdown';

const employmentType = {
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

	const handleChangeEmpType = (item) => {
		dispatch(setNewJob({ "employmentType": item }));
		console.log(props.industryData);
	}
	const handleChangeIndustry = (item) => {
		dispatch(setNewJob({ "industry": item }));
	}
	const handleChangeFunction = (item) => {
		dispatch(setNewJob({ "function": item }));
	}
	const handleChangeJobTile = (e) => {
		dispatch(setNewJob({ "jobTitle": e.target.value }));
	}
	const handleChangeLocation = (e) => {
		dispatch(setNewJob({ "location": e }));
	}
	const handleChangeOpenPosition = (e) => {
		dispatch(setNewJob({ "openPositions": e.target.value }));
	}

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
						<Input type="text" onChange={handleChangeJobTile} />
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
						content={props.locationData.map((val) => ({
							val: val.street_address + ", " + val.city + ", " + val.state + ", " + val.zip_code,
							id: val.id,
						}))}
						id="location"
						// selected={institution.content[formData.institution[0]]}
						onchange={(value) => {
							handleChangeLocation(value);
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
						placeholder={employmentType.heading}
						content={props.employmentTypeData.map((val) => ({
							val: val.employment_status,
							id: val.id,
						}))}
						id="employment"
						// selected={institution.content[formData.institution[0]]}
						onchange={(value) => {
							handleChangeEmpType(value);
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
							content={props.industryData.map((val) => ({
										val: val.industry_name,
										id: val.id,
									}))}
							id="industry"
							// selected={institution.content[formData.institution[0]]}
							onchange={(value) => {
										handleChangeIndustry(value);
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
							content={props.functionData.map((val) => ({
										val: val.function_name,
										id: val.id,
									}))}
							id="function"
							// selected={institution.content[formData.institution[0]]}
							onchange={(value) => {
										handleChangeFunction(value);
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
		functionData: state.employerReducer.functionKeys
	}
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);