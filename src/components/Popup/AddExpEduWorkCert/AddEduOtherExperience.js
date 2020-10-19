import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector, connect } from "react-redux";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";
import Textarea from "../../_Elements/Textarea";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import {
	addOtherEducationExperience,
	fetchCandidateExperienceType,
} from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";

function AddEduOtherExperience(props) {
	const dispatch = useDispatch();

	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.additional_experiences
	);

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const [formData, setFormData] = useState({
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

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

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
				oldFormData.formValid = false;
				if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
			}
		}

		if (oldFormData.formValid) {
			console.log("submitting form...");

			var obj = {
				id: info.id,
				experienceType: formData.description[0],
				organizationName: formData.organizationName[0],
				title: formData.title[0],
				from: formatDate(formData.startDate[0]),
				to: formatDate(formData.endDate[0]),
				location: formData.location[0],
				description: formData.description[0],
				skills: [],
				careerPath: "EDUCATION",
			};

			dispatch(addOtherEducationExperience(obj));
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, ""]));
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

	const experienceType = {
		heading: "Select Experience Type",
		content: ["Music", "Teaching", "Software", "Consultant"],
	};

	React.useEffect(() => {
		if (props.experienceType.length === 0) props.fetchCandidateExperienceType();

		if (info) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];

			setFormData({
				...formData,
				experienceType: [arr.experience_type],
				organizationName: [arr.organization_name],
				title: [arr.title],
				startDate: [arr.employed_from],
				endDate: [arr.employed_till],
				location: [arr.location],
				description: [arr.description],
			});

			setStartDate(new Date(arr.employed_from));
			setEndDate(new Date(arr.employed_till));
		}
	}, []);

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Other Experience</h1>
			) : (
				<h1>Add Other Experience</h1>
			)}
			<ul className="listing">
				<li>
					<label htmlFor="experienceType">
						Experience Type <span>*</span>
						<span
							className={`error-text ${!formData.experienceType[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<Dropdown
						id="experienceType"
						placeholder={experienceType.heading}
						content={props.experienceType.map((val) => ({
							val: val.experience_type,
							id: val.id,
						}))}
						defaultValue={formData.experienceType[0]}
						onchange={(value) => handleFieldChange("experienceType", value)}
					/>
				</li>
				<li>
					<label htmlFor="organizationName">
						Organisation Name <span>*</span>
						<span
							className={`error-text ${!formData.organizationName[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<Input
						id="organizationName"
						type="text"
						defaultValue={formData.organizationName[0]}
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
					<label>
						Date <span>*</span>
						<span
							className={`error-text ${!formData.startDate[1] && !formData.endDate[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<div className="date-outer">
						<div className="date">
							<DatePicker
								selected={startDate}
								placeholderText="Start Date"
								id="startDate"
								onChange={(date) => {
									setStartDate(date);
									handleFieldChange("startDate", date);
								}}
							/>
						</div>
						<span>to</span>
						<div className="date">
							<DatePicker
								selected={endDate}
								placeholderText="End Date"
								id="endDate"
								onChange={(date) => {
									setEndDate(date);
									handleFieldChange("endDate", date);
								}}
							/>
						</div>
					</div>
				</li>
				<li>
					<label htmlFor="location">
						Location <span>*</span>
						<span className={`error-text ${!formData.location[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Input
						id="location"
						type="text"
						defaultValue={formData.location[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<label htmlFor="strengths">Strengths</label>
					<Input id="strengths" type="text" />
				</li>
				<li>
					<label htmlFor="description">
						Description <span>*</span>
						<span
							className={`error-text ${!formData.description[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<Textarea
						id="description"
						defaultValue={formData.description[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
			</ul>
			<div className="cta">
				<button className="primary-btn" id="submitBtn" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		experienceType: state.setCandidateExperienceTypeReducer.data,
	};
}

const mapDispatchToProps = {
	fetchCandidateExperienceType: fetchCandidateExperienceType,
	addOtherEducationExperience: addOtherEducationExperience,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddEduOtherExperience);
