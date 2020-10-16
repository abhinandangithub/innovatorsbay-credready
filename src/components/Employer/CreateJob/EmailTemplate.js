import React, { useState } from "react";

import Dropdown from "../../_Elements/Dropdown";
import { getEmailTemplate } from "../../../store/thunks/employer";
import { connect, useDispatch } from "react-redux";
import { setNewJob } from "../../../store/actions/employer";

const employmentStatus = {
	heading: "Select Employment Type",
	content: ["Employed", "Self Employed", "Available", "On Break"],
};

function EmailTemplate(props) {
	const parent = React.useRef();
	const dispatch = useDispatch();
	const [emailBody, setEmailBody] = useState("");
	const [templateID, setTemplateID] = useState(0);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmailTemplate());
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(setNewJob({ emailTemplateId: templateID }));
		// setEmailBody(props.emailTemplate[0].email_body);
	}, [dispatch, templateID]);

	const handleTemplateChange = (item) => {
		setEmailBody(
			props.emailTemplate.find((x) => x.template_name === item).email_body
		);
		if (
			props.emailTemplate.find((x) => x.template_name === item).template_id ===
			undefined
		) {
			setTemplateID(
				props.emailTemplate.find((x) => x.template_name === item)
					.public_template_id
			);
		} else {
			setTemplateID(
				props.emailTemplate.find((x) => x.template_name === item).template_id
			);
		}
	};

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
				<Dropdown
					placeholder={employmentStatus.heading}
					// content={employmentStatus.content}
					content={props.emailTemplateNames}
					onchange={(item) => handleTemplateChange(item)}
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