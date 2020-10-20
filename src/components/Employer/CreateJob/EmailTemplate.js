import React, { useState } from "react";

import Dropdown from "../../_Elements/Dropdown";
import { getEmailTemplate } from "../../../store/thunks/employer";
import { connect, useDispatch } from "react-redux";
import { setNewJob } from "../../../store/actions/employer";
import InputDropdown from '../../_Elements/InputDropdown';

const employmentStatus = {
	heading: "Select Employment Type",
	content: ["Employed", "Self Employed", "Available", "On Break"],
};

function EmailTemplate(props) {
	const parent = React.useRef();
	const dispatch = useDispatch();
	const [emailBody, setEmailBody] = useState("");
	const [templateID, setTemplateID] = useState(0);
	const [emailTemplates, setEmailTemplates] = useState(props.emailTemplate);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmailTemplate());
	}, [dispatch]);

	React.useEffect(() => {
		setEmailTemplates(props.emailTemplate);
	}, [props.emailTemplate]);

	React.useEffect(() => {
		dispatch(setNewJob({ emailTemplateId: templateID }));
		// setEmailBody(props.emailTemplate[0].email_body);
	}, [dispatch, templateID]);

	const handleTemplateChange = (item) => {
		if (typeof item !== "number") return;
		setEmailBody(
			props.emailTemplate.find((x) => x.public_template_id === item).email_body
		);
		// if (
		// 	props.emailTemplate.find((x) => x.template_name === item).template_id ===
		// 	undefined
		// ) {
		// 	setTemplateID(
		// 		props.emailTemplate.find((x) => x.template_name === item)
		// 			.public_template_id
		// 	);
		// } else {
		// 	setTemplateID(
		// 		props.emailTemplate.find((x) => x.template_name === item).template_id
		// 	);
		// }
		setTemplateID(item);
	};

	const handleTemplateSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.emailTemplate.filter(
			(val) => {
				if(val.template_name.includes(value)) {
					return {
						id: val.public_template_id,
						val: val.template_name
					}
				}
			}
		);
		setEmailTemplates([...filteredData]);
	}

	return (
		<div className="email-templates" ref={parent}>
			<div className="heading">
				<h2>
					Email Template<span>*</span>
				</h2>
			</div>
			<div className="content">
				<h2 className="sub-heading">Attach Email</h2>
				<p>Select / Modify Introduction Email Template</p>
				{/* <Dropdown
					placeholder={employmentStatus.heading}
					// content={employmentStatus.content}
					content={props.emailTemplateNames}
					onchange={(item) => handleTemplateChange(item)}
				/> */}
				<InputDropdown
					placeholder={employmentStatus.heading}
					content={emailTemplates.map((val) => ({
								val: val.template_name,
								id: val.public_template_id,
							}))}
					id="emailtemplate"
					// selected={institution.content[formData.institution[0]]}
					onchange={(value) => {
								handleTemplateChange(value);
								handleTemplateSearch(value);
							}}
				/>
				<h2 className="sub-heading">Email</h2>
				<textarea
					name="email"
					id="email"
					// 					defaultValue="Hi {candidate_name},
					// Thanks for applying for the position of {job_title}, we will review your profile and share an update on the next steps soon."
					// defaultValue={props.emailTemplate.email_body}
					// defaultValue={emailBody}
					onChange={(e) => setEmailBody(e.target.value)}
					value={emailBody}
				></textarea>
			</div>
		</div>
	);
}

// export default EmailTemplate;

function mapStateToProps(state) {
	return {
		employmentType: state.employerReducer.employmentType.data,
		emailTemplate: state.employerReducer.emailTemplate,
		emailTemplateNames: state.employerReducer.emailTemplateNames,
	};
}

export default connect(mapStateToProps)(EmailTemplate);