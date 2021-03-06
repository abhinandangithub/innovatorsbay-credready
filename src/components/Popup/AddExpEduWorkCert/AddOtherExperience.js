import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { useDispatch, useSelector } from "react-redux";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";
import InputDropdown from "../../_Elements/InputDropdown";
import Textarea from "../../_Elements/Textarea";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import { addOtherWorkExperience, fetchCandidateExperienceType } from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";


function AddOtherExperience() {
	const experiences = useSelector(
		(state) => state.setCandidateExperienceTypeReducer.data ? state.setCandidateExperienceTypeReducer.data : "")
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

			var obj = {
				// experienceType: formData.experienceType[0],
				experienceType: formData.experienceType[0],
				organizationName: formData.organizationName[0],
				title: formData.title[0],
				from: formatDate(formData.startDate[0]),
				to: formatDate(formData.endDate[0]),
				location: formData.location[0],
				description: formData.description[0],
				// skills: [],
				careerPath: "work",
			};

			if (info) {
				obj.id = info.id;
			}

			dispatch(addOtherWorkExperience(obj));
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

	React.useEffect(() => {
		dispatch(fetchCandidateExperienceType())
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
						placeholder="Select Experience Type"
						content={experiences.length > 0 && experiences.map((val) => ({
							val: val.experience_type,
							id: val.id,
						}))}
						selected={
							experiences &&
							experiences[
							findIndexOfObjInArr(experiences, "id", formData.experienceType[0])
							] &&
							experiences[
								findIndexOfObjInArr(experiences, "id", formData.experienceType[0])
							].experience_type
						}
						onchange={(value) => handleFieldChange("experienceType", value)}
					/>
				</li>
				<li>
					<label htmlFor="organisationName">
						Organization Name <span>*</span>
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
							<CustomDatePicker
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
							<CustomDatePicker
								selected={endDate}
								minDate={startDate}
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

export default AddOtherExperience;
