import React from "react";

function CreateJob(props) {
	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="job-description" ref={parent}>
			<div className="heading">
				<h2>
					Job Description <span>*</span>
				</h2>
			</div>
			<div className="content">
				<textarea
					name="email"
					id="email"
					defaultValue="Provides for activities of daily living by assisting with serving meals, feeding patients as necessary and ambulating, turning, and positioning patients; and providing fresh water and nourishment between meals.
						Provides adjunct care by administering enemas, douches, non-sterile dressings, surgical preps, ice packs, heat treatments, sitz and therapeutic baths; and applying restraints.
						Maintains patient stability by checking vital signs and weight; testing urine and recording intake and output information.
						Provides patient comfort by utilizing resources and materials; transporting patients; answering patients’ call lights and requests; and reporting observations of the patient to nursing supervisor.
						Documents actions by completing forms, reports, logs, and records.
						Maintains work operations by following policies and procedures.
						Protects organisation’s value by keeping patient information confidential.
						Serves and protects the hospital community by adhering to professional standards, hospital policies and procedures; federal, state, and local requirements; and jcaho standards.
						Updates job knowledge by participating in educational opportunities, reading professional publications, participating in professional organisations, and maintaining licensure.
						Enhances nursing department and hospital reputation by accepting ownership for accomplishing new and different requests; and exploring opportunities to add value to job accomplishments."
				></textarea>
				<h2 className="sub-heading">
					Required Strengths <span>*</span>
				</h2>
				<ul className="added-items">
					<li>
						Communication <span></span>{" "}
					</li>
					<li>
						Patient Care <span></span>{" "}
					</li>
					<li className="btn"></li>
				</ul>
			</div>
		</div>
	);
}

export default CreateJob;
