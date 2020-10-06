import React from "react";
import Input from "../../_Elements/Input";

function CopyLink(props) {
	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<>
			<div className="copy-link" ref={parent}>
				<div className="heading">
					<h2>
						Add to Your Website and Job Postings <span>*</span>
					</h2>
				</div>
				<div className="content">
					<h2 className="thank-you">
						Thank you, You have successfully posted “C.N.A in Warren New Jersey”
					</h2>
					<p className="status">We have sent you a confirmation email.</p>
					<p className="link">Here is the link to the post on CredReady.com</p>
					<Input defaultValue="www.credready.com/jobs/chelsea/2367" />
					<p className="status">
						Please paste this link in your job post. So that they may apply
						through CredReady.
					</p>
					<p className="link">
						Here are the steps to add this link to your website{" "}
					</p>
					<p className="status">
						Let the world know you`re hiring! Add the C.N.A job to any page on
						your website tp promote your open positions!{" "}
					</p>
					<p className="link">1. Copy the code: </p>
					<textarea
						name="link"
						id="link"
						defaultValue={`<a href="www.credready.com/jobs/chelsea/2367" id=“jobs_embed_link” tartget="_black">
Certified Nursing Assistant</a>`}
					></textarea>
					<p className="link">
						2. Paste into your job post to direct applicants to CredReady.
					</p>
				</div>
			</div>
			<div className="cta">
				<button className="primary-btn">Post a Job</button>
			</div>
		</>
	);
}

export default CopyLink;
