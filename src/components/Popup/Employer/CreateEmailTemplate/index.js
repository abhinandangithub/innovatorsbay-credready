import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RichTextEditor from "react-rte";
import ContentEditable from "react-contenteditable";

import "./index.scss";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";
import {
	addEmailTemplate,
	updateEmailTemplate,
} from "../../../../store/thunks/employer";

const tags = [
	{
		label: "Job Title",
		text: "job_title",
	},
	{
		label: "Recruiter Name",
		text: "recruiter_name",
	},
	{
		label: "Location",
		text: "location",
	},
	{
		label: "Job Description",
		text: "job_description",
	},
	{
		label: "Candidate First Name",
		text: "candidate_first_name",
	},
	{
		label: "Candidate Last Name",
		text: "candidate_last_name",
	},
	{
		label: "Years Experience Required",
		text: "years_experience_required",
	},
	{
		label: "Skills",
		text: "skills",
	},
	{
		label: "Certificates",
		text: "certificates",
	},
];

let _cursorInfo = {
	el: null,
	pos: -1,
};

let defaultText = `<p>Hello {candidate_first_name} {candidate_last_name}</p>
<p>We are looking out for {job_title} for our organization located at {location}.</p>
<div><br/></div>
<p>Regards,</p>
<p>{recruiter_name}</p>`;
defaultText = "";

function CreateEmailTemplate(props) {
	const myEditorEl = useRef();
	const contentEditable = React.createRef();
	const dispatch = useDispatch();
	const { popup } = useSelector((state) => state.popupOverlayReducer);
	let type = popup.info.type;
	// type = "add";

	function getCaretPosition() {
		if (window.getSelection && window.getSelection().getRangeAt) {
			var range = window.getSelection().getRangeAt(0);
			var selectedObj = window.getSelection();
			var rangeCount = 0;
			var childNodes = selectedObj.anchorNode.parentNode.childNodes;
			let index = null;
			for (var i = 0; i < childNodes.length; i++) {
				if (childNodes[i] === selectedObj.anchorNode) {
					index = i;
					break;
				}
				if (childNodes[i].outerHTML) {
					rangeCount += childNodes[i].outerHTML.length;
					index = i;
				} else if (childNodes[i].nodeType === 3) {
					rangeCount += childNodes[i].textContent.length;
					index = i;
				}
			}

			_cursorInfo = {
				el: childNodes[index].parentElement,
				pos: range.startOffset + rangeCount,
			};

			if (_cursorInfo.el.tagName === "LI") _cursorInfo.pos = -1;

			return _cursorInfo;
		}

		_cursorInfo = {
			el: null,
			pos: -1,
		};
		return -1;
	}

	const handleDefaultChecked = (tag) => {
		return formData.body[0].includes(tag.text);
	};

	const handleInputChange = (e, tag) => {
		let editor = document.getElementById("myEditor");

		if (e.target.checked) {
			let textToInsert = ` {${tag.text}} `;

			if (_cursorInfo.pos > -1) {
				let elHtml = _cursorInfo.el.innerHTML.replace(/&nbsp;+/g, " ");

				let output = [
					elHtml.slice(0, _cursorInfo.pos),
					textToInsert,
					elHtml.slice(_cursorInfo.pos),
				].join("");

				_cursorInfo.el.innerHTML = output;
			} else {
				let output = [
					editor.innerHTML.slice(0, 0),
					textToInsert,
					editor.innerHTML.slice(0),
				].join("");

				editor.innerHTML = output;
			}

			_cursorInfo.pos = -1;
			setFormData({
				...formData,
				body: [editor.innerHTML],
			});
		} else {
			let textToSearch = `${tag.text}`;
			let stringWithTag = myEditorEl.current.lastHtml;
			let regex = new RegExp("\\{" + textToSearch + "\\}", "g");
			let output = stringWithTag.replace(regex, " ");

			setFormData({
				...formData,
				body: [output],
			});
		}
	};

	const [bodyError, setBodyError] = React.useState(null);

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		name: [],
		email: [],
		body: [defaultText],

		formValid: false,
	});

	useEffect(() => {
		if (!!props.info.data) {
			setFormData({
				name: [props.info.data.template_name],
				email: [props.info.data.from_email || "test@gmail.com"],
				body: [props.info.data.email_body],
				formValid: true,
			});
		} else {
			setFormData({
				name: [],
				email: [],
				body: [defaultText],
				formValid: false,
			});
		}
	}, [props.info.data]);

	useEffect(() => {
		if (bodyError === true && formData.body[0].trim().length > 0) {
			setBodyError(false);
		} else if (bodyError === false && formData.body[0].trim().length === 0) {
			setBodyError(true);
		}
		return () => {};
	}, [formData]);

	const handleSubmit = (type = "add") => {
		let oldFormData = { ...formData };
		oldFormData.formValid = true;
		oldFormData.body[0] = myEditorEl.current.lastHtml.replace(/&nbsp;+/g, " ");

		if (bodyError === null && formData.body[0].trim().length === 0) {
			setBodyError(true);
		}

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

		if (oldFormData.formValid && !bodyError) {
			/* create obj which needs to send to api */
			// let obj = {
			// 	name: formData ? formData.name[0] : "",
			// 	email: formData ? formData.email[0] : "",
			// };
			/* send data to api */
			// props.updateCandidateDetails(obj);
			// props.history.push("/profile/work-experience");
			if (type === "add") {
				dispatch(addEmailTemplate(formData));
			} else {
				let obj = { ...formData, templateId: props.info.data.template_id };
				dispatch(updateEmailTemplate(obj));
			}
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
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

	const updateTemplate = () => {
		// console.log("updateTemplate");
		handleSubmit("edit");
	};

	const addTemplate = () => {
		// console.log("addTemplate");
		handleSubmit("add");
	};

	return (
		<div className="create-email-template">
			{type === "add" ? (
				<h1>Add Email Template</h1>
			) : (
				<h1>Edit Email Template</h1>
			)}

			<div className="content">
				<ul>
					<li>
						<label htmlFor="name">
							Template Name <span>*</span>
							<span className={`error-text ${!formData.name[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<input
							type="text"
							id="name"
							defaultValue={formData.name[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="email">
							Reply To Email Address <span>*</span>
							<span className={`error-text ${!formData.email[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<input
							type="email"
							id="email"
							defaultValue={formData.email[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="body">
							Tags
							{/* <span>*</span> */}
						</label>
						<ul>
							{tags.map((tag, i) => {
								let isChecked = handleDefaultChecked(tag);
								return (
									<li key={i}>
										<input
											className="block-toggle blue checkbox"
											id={`tag_${i}`}
											name="tag"
											type="checkbox"
											// disabled
											checked={isChecked}
											onChange={(e) => handleInputChange(e, tag)}
										/>
										<label htmlFor={`tag_${i}`} data-text={tag.text}>
											{tag.label}
										</label>
									</li>
								);
							})}
						</ul>
					</li>
					<li>
						<span className={`error-text body ${!bodyError && "hidden"}`}>
							Required
						</span>
						<ContentEditable
							ref={myEditorEl}
							innerRef={contentEditable}
							defaultValue={formData.body[0]}
							onChange={(e) => {
								// console.log(myEditorEl.current.lastHtml);
							}}
							// onBlur={() =>
							// 	handleFieldChange("body", myEditorEl.current.lastHtml)
							// }
							html={formData.body[0]}
							disabled={false}
							tagName="div"
							className="my_editor"
							id="myEditor"
							onMouseUp={getCaretPosition}
							onKeyUp={() => {
								getCaretPosition();

								if (
									myEditorEl.current.lastHtml.length > 0 &&
									bodyError === true
								) {
									setBodyError(false);
									setFormData({
										...formData,
										body: [myEditorEl.current.lastHtml],
									});
								} else if (
									myEditorEl.current.lastHtml.length === 0 &&
									bodyError === false
								) {
									setBodyError(true);
									setFormData({
										...formData,
										body: [myEditorEl.current.lastHtml],
									});
								}
							}}
						/>
					</li>
				</ul>
				{type === "add" ? (
					<div className="cta">
						<button className="primary-btn blue" onClick={addTemplate}>
							Add
						</button>
					</div>
				) : (
					<div className="cta">
						<button className="primary-btn blue" onClick={updateTemplate}>
							Update Template
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default CreateEmailTemplate;
