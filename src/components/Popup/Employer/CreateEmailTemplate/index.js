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
// defaultText = "";

function CreateEmailTemplate(props) {
	const myEditorEl = useRef();
	const contentEditable = React.createRef();
	const dispatch = useDispatch();
	const { popup } = useSelector((state) => state.popupOverlayReducer);

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
			return {
				el: childNodes[index].parentElement,
				pos: range.startOffset + rangeCount,
			};
		}
		return -1;
	}

	const handleDefaultChecked = (tag) => {
		return formData.body[0].includes(tag.text);
	};

	const handleInputChange = (e, tag) => {
		let editor = document.getElementById("myEditor");

		if (e.target.checked) {
			var textToInsert = ` {${tag.text}} `;
			if (_cursorInfo.pos > -1) {
				let output = [
					_cursorInfo.el.innerHTML.slice(0, _cursorInfo.pos),
					textToInsert,
					_cursorInfo.el.innerHTML.slice(_cursorInfo.pos),
				].join("");
				_cursorInfo.el.innerHTML = output;

				_cursorInfo.pos = -1;

				setFormData({
					...formData,
					body: [editor.innerHTML],
				});
			}
		} else {
			var textToSearch = `${tag.text}`;
			var stringWithTag = myEditorEl.current.lastHtml;
			var regex = new RegExp("\\{" + textToSearch + "\\}", "g");
			let output = stringWithTag.replace(regex, " ");

			setFormData({
				...formData,
				body: [output],
			});
		}
	};

	const getCursorPos = () => {
		_cursorInfo = getCaretPosition();
		return _cursorInfo;
	};

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

	const handleSubmit = (type = "add") => {
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
			/* create obj which needs to send to api */
			// let obj = {
			// 	name: formData ? formData.name[0] : "",
			// 	email: formData ? formData.email[0] : "",
			// };
			/* send data to api */
			// props.updateCandidateDetails(obj);
			// props.history.push("/profile/work-experience");
			console.log("formData ", formData);
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
		console.log("updateTemplate");
		handleSubmit("edit");
	};

	const saveAsNewTemplate = () => {
		console.log("saveAsNewTemplate");
		handleSubmit("add");
	};

	const addTemplate = () => {
		console.log("addTemplate");
		handleSubmit("add");
	};

	return (
		<div className="create-email-template">
			{popup.info.type === "add" ? (
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
							Tags<span>*</span>
							<span className={`error-text ${!formData.body[1] && "hidden"}`}>
								Required
							</span>
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
						<ContentEditable
							ref={myEditorEl}
							innerRef={contentEditable}
							defaultValue={formData.body[0]}
							onChange={(e) => {
								console.log(myEditorEl);
								// handleFieldChange("body", myEditorEl.current.lastHtml);
							}}
							// onBlur={() =>
							// 	handleFieldChange("body", myEditorEl.current.lastHtml)
							// }
							html={formData.body[0]}
							disabled={false}
							tagName="div"
							className="my_editor"
							id="myEditor"
							onMouseUp={getCursorPos}
							onKeyUp={getCursorPos}
						/>
					</li>
				</ul>
				{popup.info.type === "add" ? (
					<div className="cta">
						<button className="primary-btn blue" onClick={addTemplate}>
							Add
						</button>
					</div>
				) : (
					<div className="cta">
						<button
							className="primary-btn blue outline"
							onClick={updateTemplate}
						>
							Update Template
						</button>
						<button className="primary-btn blue" onClick={saveAsNewTemplate}>
							Save as new Template
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default CreateEmailTemplate;
