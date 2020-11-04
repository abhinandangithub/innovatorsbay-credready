import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
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
	fetchAllMajorMinor,
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

const _majorMinorData = [
	{
		id: 11,
		name: "One",
	},
	{
		id: 22,
		name: "Two",
	},
	{
		id: 33,
		name: "Three",
	},
	{
		id: 44,
		name: "Four",
	},
];

function AddEducation(props) {
	var data = props.candidateInstiType;
	const majorMinorData = useSelector(
		(state) => state.setAllMajorMinorReducer.data
	);
	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.education_experience
	);

	const dispatch = useDispatch();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [institutions, setInstitutions] = useState(data);
	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		degreeTitle: [], // 'value' is id
		institution: [], // 'value' is id
		startDate: [],
		endDate: [],
		majors: [[null]], // 'value' is array of id's
		minors: [[null]], // 'value' is array of id's
		// strengths: [],
		comments: [], // 'value' is string
		degreeGranted: [],

		formValid: false,
	});

	const handleAddMajorMinor = (type, operator, i) => {
		let arr = type === "majors" ? [...formData.majors] : [...formData.minors];

		if (operator === "add") {
			arr[0].push(null);
		} else if (operator === "remove") {
			arr[0].splice(i, 1);
		}
		arr[1] = "";

		setFormData({
			...formData,
			[type]: arr,
			formValid: false,
		});
	};

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
		let _formData = { ...formData };
		_formData.formValid = true;

		for (var field in _formData) {
			if (field === "majors" || field === "minors") {
				for (let i = 0; i < _formData[field][0].length; i++) {
					if (_formData[field][0][i] === null) {
						_formData.formValid = false;
						if (_formData[field][1] === "") {
							_formData[field][1] = "Required";
						} else if (_formData[field][1] !== "Required") {
							_formData[field].push("Required");
						}
					}
				}
			} else if (
				_formData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "degreeGranted" &&
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
			var obj = {
				titleOfDegree: _formData.degreeTitle[0],
				institution: _formData.institution[0],
				attendedFrom: formatDate(_formData.startDate[0]),
				attendedTill: formatDate(_formData.endDate[0]),
				// majors: major,
				// minors: minor,
				majors: _formData.majors[0],
				minors: _formData.minors[0],
				educationDescription: _formData.comments[0],
				isUnfinished: _formData.degreeGranted[0] === "on" ? false : true,
			};

			if (info) {
				obj.id = info.id;
			}

			dispatch(addEducationExperience(obj));
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, ""]));
		}

		console.log(_formData);
		setFormData(_formData);
	};

	const handleFieldChange = (field, value) => {
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		if (field === "majors") {
			arr = [...formData.majors];
			arr[0][value.index] = value.id;
		} else if (field === "minors") {
			arr = [...formData.minors];
			arr[0][value.index] = value.id;
		}
		arr[1] = "";

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	React.useEffect(() => {
		if (props.candidateInstiType.length === 0)
			dispatch(fetchCandidateInstituteType());
		if (props.candidateDegreeTitles.length === 0)
			dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchAllMajorMinor());

		if (info && dataArr) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];
			console.log("arr....", arr);

			let mj = [];
			let mn = [];

			for (let i = 0; i < arr.education_major.length; i++) {
				mj.push(arr.education_major[i].id);
			}
			for (let i = 0; i < arr.education_minor.length; i++) {
				mn.push(arr.education_minor[i].id);
			}

			setFormData({
				...formData,
				degreeTitle: [arr.title],
				institution: [arr.institution],
				startDate: [arr.attended_from],
				endDate: [arr.attended_till],
				majors: [mj],
				minors: [mn],
				// strengths: [arr.],
				comments: [arr.education_description],
				// degreeGranted: [arr.],
			});
			setStartDate(new Date(arr.attended_from));
			setEndDate(new Date(arr.attended_till));
		}
	}, []);

	const renderMajorMinor = (type, m, i) => {
		let _i =
			type === "majors"
				? formData.majors[0].length - 1 - i
				: formData.minors[0].length - 1 - i;

		console.log("type....", type);

		return (
			<div className="input" key={i}>
				<InputDropdown
					placeholder={type === "majors" ? "Add Major" : "Add Minor"}
					content={majorMinorData.map((val) => ({
						val: val.name,
						id: val.id,
					}))}
					search_term
					selected={
						m && majorMinorData[findIndexOfObjInArr(majorMinorData, "id", m)]
							? majorMinorData[findIndexOfObjInArr(majorMinorData, "id", m)]
									.name
							: ""
					}
					onchange={(value) => {
						if (typeof value !== "number") return;

						handleFieldChange(type, {
							index: i,
							id: value,
						});
					}}
				/>
				{_i === 0 ? (
					<button
						className="circle-btn"
						id="addMajorBtn"
						onClick={() => handleAddMajorMinor(type, "add")}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				) : (
					<button
						className="circle-btn"
						id="addMajorBtn"
						onClick={() => handleAddMajorMinor(type, "remove", i)}
					>
						<FontAwesomeIcon icon={faMinus} />
					</button>
				)}
			</div>
		);
	};

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
						selected={
							props.candidateDegreeTitles &&
							props.candidateDegreeTitles[
								findIndexOfObjInArr(
									props.candidateDegreeTitles,
									"id",
									+formData.degreeTitle[0]
								)
							] &&
							props.candidateDegreeTitles[
								findIndexOfObjInArr(
									props.candidateDegreeTitles,
									"id",
									+formData.degreeTitle[0]
								)
							].title
						}
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
						selected={
							props.candidateInstiType &&
							props.candidateInstiType[
								findIndexOfObjInArr(
									props.candidateInstiType,
									"id",
									formData.institution[0]
								)
							] &&
							props.candidateInstiType[
								findIndexOfObjInArr(
									props.candidateInstiType,
									"id",
									formData.institution[0]
								)
							].institute_name
						}
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
							className={`error-text ${
								!formData.startDate[1] && !formData.endDate[1] && "hidden"
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
							<span className={`error-text ${!formData.majors[1] && "hidden"}`}>
								Required
							</span>
						</label>
					</div>
					<div className="inputs">
						{formData.majors[0].map((m, i) => {
							return renderMajorMinor("majors", m, i);
						})}
					</div>
				</li>
				<li className="major-minor">
					<div className="label">
						<label>
							Minor <span>*</span>
							<span className={`error-text ${!formData.minors[1] && "hidden"}`}>
								Required
							</span>
						</label>
					</div>
					<div className="inputs">
						{formData.minors[0].map((m, i) => {
							return renderMajorMinor("minors", m, i);
						})}
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
				<button
					className="primary-btn blue"
					id="submitBtn"
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
		candidateInstiType: state.setCandidateInstitutionTypeReducer.data,
		candidateDegreeTitles: state.setCandidateDegreeTitlesReducer.data,
	};
}

export default connect(mapStateToProps)(AddEducation);
