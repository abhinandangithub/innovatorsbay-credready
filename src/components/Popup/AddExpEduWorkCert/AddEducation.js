import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector, connect } from "react-redux";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Textarea from "../../_Elements/Textarea";
import Dropdown from "../../_Elements/Dropdown";
import InputDropdown from "../../_Elements/InputDropdown";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import {
	addEducationExperience,
	fetchCandidateInstituteType,
	fetchCandidateDegreeTitles,
} from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";

const degreeTitle = {
	heading: "Select Title of Degree",
	content: ["Degree 1", "Degree 2", "Degree 3", "No Degree"],
};

const institution = {
	heading: "Select Institution",
	content: [
		"Institution 1",
		"Institution 2",
		"Institution 3",
		"No Institution",
	],
};

function AddEducation(props) {
	var data = props.candidateInstiType;
	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.education_experience
	);

	const dispatch = useDispatch();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [major, setMajor] = useState([null]);
	const [minor, setMinor] = useState([null]);
	const [institutions, setInstitutions] = useState(data);

	const handleAddMajorMinor = (type) => {
		if (type === "major") {
			setMajor([...major, null]);
		} else {
			setMinor([...minor, null]);
		}
	};

	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		degreeTitle: [],
		institution: [],
		startDate: [],
		endDate: [],
		major: [],
		minor: [],
		// strengths: [],
		comments: [],
		degreeGranted: [],

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
				field !== "degreeGranted" &&
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
				titleOfDegree: formData.degreeTitle[0],
				institution: formData.institution[0],
				attendedFrom: formatDate(formData.startDate[0]),
				attendedTill: formatDate(formData.endDate[0]),
				// majors: major,
				// minors: minor,
				majors: [731, 732],
				minors: [741, 742],
				educationDescription: formData.comments[0],
				isUnfinished: formData.degreeGranted[0] === "on" ? false : true,
			};

			if (info) {
				obj.id = info.id;
			}

			dispatch(addEducationExperience(obj));
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

	const handleInstitutionSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = data.filter(
			({ institute_name }) =>
				institute_name.toUpperCase().indexOf(value.toUpperCase()) > -1
		);
		setInstitutions([...filteredData]);
	};

	React.useEffect(() => {
		if (props.candidateInstiType.length === 0)
			dispatch(fetchCandidateInstituteType());
		if (props.candidateDegreeTitles.length === 0)
			dispatch(fetchCandidateDegreeTitles());
	}, []);

	React.useEffect(() => {
		if (info) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];
			console.log(arr.institution);
			setFormData({
				...formData,
				degreeTitle: [arr.title],
				institution: [arr.institution],
				startDate: [arr.attended_from],
				endDate: [arr.attended_till],
				major: [arr.education_major],
				minor: [arr.education_minor],
				// strengths: [arr.],
				comments: [arr.education_description],
				// degreeGranted: [arr.],
			});

			setMajor(arr.education_major);
			setMinor(arr.education_minor);
			setStartDate(new Date(arr.attended_from));
			setEndDate(new Date(arr.attended_till));
		}
	}, []);

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Education</h1>
			) : (
					<h1>Add Education</h1>
				)}

			<ul className="listing">
				<li>
					<label>
						Title of Degree <span>*</span>
						<span
							className={`error-text ${!formData.degreeTitle[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<InputDropdown
						placeholder={degreeTitle.heading}
						content={props.candidateDegreeTitles.map((val) => ({
							val: val.title,
							id: val.id,
						}))}
						selected={props.candidateDegreeTitles.reduce((val) => {
							if (val.id === +formData.degreeTitle[0]) {
								return val.title;
							}
						})}
						search_term="title"
						id="degreeTitle"
						onchange={(value) => handleFieldChange("degreeTitle", value)}
					/>
				</li>
				<li>
					<label>
						Institution <span>*</span>
						<span
							className={`error-text ${!formData.institution[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<InputDropdown
						placeholder={institution.heading}
						content={props.candidateInstiType.map((val) => ({
							val: val.institute_name,
							id: val.id,
						}))}
						search_term="institute_name"
						id="institution"
						selected={institution.content[formData.institution[0]]}
						onchange={(value) => {
							handleFieldChange("institution", value);
							// handleInstitutionSearch(value);
						}}
					/>
				</li>
				<li>
					<label>
						Attend <span>*</span>
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
				<li className="major-minor">
					<div className="label">
						<label>
							Major <span>*</span>
							<span className={`error-text ${!formData.major[1] && "hidden"}`}>
								Required
							</span>
						</label>
					</div>
					<div className="inputs">
						{major.map((m, i) => {
							return (
								<Input
									type="text"
									key={i}
									id={`major_${i}`}
									value={m && m.name}
									onChange={(e) => handleFieldChange("major", e.target.value)}
								/>
							);
						})}
					</div>
					<div className="button">
						<button
							className="circle-btn"
							id="addMajorBtn"
							onClick={() => handleAddMajorMinor("major")}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</li>
				<li className="major-minor">
					<div className="label">
						<label>
							Minor <span>*</span>
							<span className={`error-text ${!formData.minor[1] && "hidden"}`}>
								Required
							</span>
						</label>
					</div>
					<div className="inputs">
						{minor.map((m, i) => {
							return (
								<Input
									type="text"
									key={i}
									id={`minor_${i}`}
									value={m && m.name}
									onChange={(e) => handleFieldChange("minor", e.target.value)}
								/>
							);
						})}
					</div>
					<div className="button">
						<button
							className="circle-btn"
							id="addMinorBtn"
							onClick={() => handleAddMajorMinor("minor")}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</li>
				{/* <li>
					<label htmlFor="strengths">
						Strengths <span>*</span>
						<span
							className={`error-text ${!formData.strengths[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<Input
						id="strengths"
						type="text"
						defaultValue={formData.strengths[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li> */}
				<li>
					<label htmlFor="comments">
						Additional Comments <span>*</span>
						<span className={`error-text ${!formData.comments[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Textarea
						id="comments"
						defaultValue={formData.comments[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<input
						className="fancy-toggle checkbox"
						type="checkbox"
						name="termsandconditions"
						id="degreeGranted"
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
					<label htmlFor="degreeGranted">
						<span className="input"></span>Degree Granted
					</label>
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
		candidateInstiType: state.setCandidateInstitutionTypeReducer.data,
		candidateDegreeTitles: state.setCandidateDegreeTitlesReducer.data,
	};
}

export default connect(mapStateToProps)(AddEducation);
