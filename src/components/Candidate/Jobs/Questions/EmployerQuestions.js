import React from "react";

import { isAnswer } from "./index";

function EmployerQuestions({ data, onchange, calHeight, noHeading, ...props }) {
	const parent = React.useRef();

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [props]);

	return (
		<div className="employer-questions" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Employer Questions</h2>
				</div>
			) : (
				""
			)}

			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">Acceptable Shifts?</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="shift_7_3"
								name="shift"
								type="checkbox"
								defaultChecked={isAnswer(data, 1, [1])}
								onChange={() => {
									onchange(1, [1]);
								}}
							/>
							<label htmlFor="shift_7_3">7am - 3pm</label>
							<input
								className="block-toggle blue"
								id="shift_3_11"
								name="shift"
								type="checkbox"
								defaultChecked={isAnswer(data, 1, [2])}
								onChange={() => {
									onchange(1, [2]);
								}}
							/>
							<label htmlFor="shift_3_11">3pm - 11pm</label>
							<input
								className="block-toggle blue"
								id="shift_11_7"
								name="shift"
								type="checkbox"
								defaultChecked={isAnswer(data, 1, [3])}
								onChange={() => {
									onchange(1, [3]);
								}}
							/>
							<label htmlFor="shift_11_7">11pm - 7am</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Written English Ability?</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="engAbility_none"
								name="engAbility"
								type="checkbox"
								defaultChecked={isAnswer(data, 2, [1])}
								onChange={() => {
									onchange(2, [1]);
								}}
							/>
							<label htmlFor="engAbility_none">None</label>
							<input
								className="block-toggle blue"
								id="engAbility_limited"
								name="engAbility"
								type="checkbox"
								defaultChecked={isAnswer(data, 2, [2])}
								onChange={() => {
									onchange(2, [2]);
								}}
							/>
							<label htmlFor="engAbility_limited">Limited</label>
							<input
								className="block-toggle blue"
								id="engAbility_working"
								name="engAbility"
								type="checkbox"
								defaultChecked={isAnswer(data, 2, [3])}
								onChange={() => {
									onchange(2, [3]);
								}}
							/>
							<label htmlFor="engAbility_working">Working</label>
							<input
								className="block-toggle blue"
								id="engAbility_fluent"
								name="engAbility"
								type="checkbox"
								defaultChecked={isAnswer(data, 2, [4])}
								onChange={() => {
									onchange(2, [4]);
								}}
							/>
							<label htmlFor="engAbility_fluent">Fluent & Native</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Certifications?</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="certifications_cna"
								name="certifications"
								type="checkbox"
								defaultChecked={isAnswer(data, 3, [1])}
								onChange={() => {
									onchange(3, [1]);
								}}
							/>
							<label htmlFor="certifications_cna">
								Certified Nursing Assistant
							</label>
							<input
								className="block-toggle blue"
								id="certifications_hha"
								name="certifications"
								type="checkbox"
								defaultChecked={isAnswer(data, 3, [2])}
								onChange={() => {
									onchange(3, [2]);
								}}
							/>
							<label htmlFor="certifications_hha">Home Health Aid</label>
							<input
								className="block-toggle blue"
								id="certifications_cma"
								name="certifications"
								type="checkbox"
								defaultChecked={isAnswer(data, 3, [3])}
								onChange={() => {
									onchange(3, [3]);
								}}
							/>
							<label htmlFor="certifications_cma">
								Certified Medication Aid
							</label>
							<input
								className="block-toggle blue"
								id="certifications_others"
								name="certifications"
								type="checkbox"
								defaultChecked={isAnswer(data, 3, [4])}
								onChange={() => {
									onchange(3, [4]);
								}}
							/>
							<label htmlFor="certifications_others">Others</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Which languages are you comfortable with?
						</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								name="postedWages"
								type="checkbox"
								id="postedWages1"
								defaultChecked={isAnswer(data, 4, [1])}
								onChange={() => {
									onchange(4, [1]);
								}}
							/>
							<label htmlFor="postedWages1">
								<span className="input"></span>English
							</label>
							<input
								className="block-toggle blue"
								name="postedWages"
								type="checkbox"
								id="postedWages2"
								defaultChecked={isAnswer(data, 4, [2])}
								onChange={() => {
									onchange(4, [2]);
								}}
							/>
							<label htmlFor="postedWages2">
								<span className="input"></span>German
							</label>
							<input
								className="block-toggle blue"
								name="postedWages"
								type="checkbox"
								id="postedWages3"
								defaultChecked={isAnswer(data, 4, [3])}
								onChange={() => {
									onchange(4, [3]);
								}}
							/>
							<label htmlFor="postedWages3">
								<span className="input"></span>Spanish
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default EmployerQuestions;
