import React from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../../_Elements/CustomDatePicker";
import InputRange from "react-input-range";

import { findIndex, isAnswer } from "./index";

function WorkHistory({ data, onchange, calHeight, noHeading, ...props }) {
	const [appliedDate, setAppliedDate] = React.useState();
	const parent = React.useRef();
	const [value1, setValue1] = React.useState(data[findIndex(data, 1)].answer);
	const [value2, setValue2] = React.useState(data[findIndex(data, 2)].answer);

	const selectAppliedDate = (date) => {
		let i = findIndex(data, 3); // 1 is question_id
		let a = data.length > 0 && data[i].answer;
		let d = date ? new Date(date) : new Date(a);
		setAppliedDate(d);
	};

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [props]);

	React.useEffect(() => {
		selectAppliedDate();
	}, []);

	return (
		<div className="work-history" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Work History</h2>
				</div>
			) : (
					""
				)}
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">How many jobs have you held?</h2>
						<div className="options slider">
							<InputRange
								minValue={0}
								maxValue={15}
								value={value1}
								onChange={(value) => {
									setValue1(value);
									onchange(1, value);
								}}
							/>
						</div>
						{value1 > 0 && (
							<ul className="level_2">
								<li className="general-question border">
									<h2 className="question">
										How long were you in your most recent job?
									</h2>
									<div className="options slider">
										<InputRange
											minValue={0}
											maxValue={10}
											value={value2}
											onChange={(value) => {
												setValue2(value);
												onchange(2, value);
											}}
										/>
									</div>
								</li>
								<li className="general-question border">
									<h2 className="question">
										When did you start your first job?
									</h2>
									<div className="options">
										<CustomDatePicker
											selected={appliedDate}
											placeholderText="Select Date"
											onChange={(date) => {
												setAppliedDate(date);
												onchange(3, date.toString());
											}}
										/>
									</div>
								</li>
								<li className="general-question border">
									<h2 className="question">Have you worked as a CNA before?</h2>
									<div className="options">
										<input
											className="fancy-toggle blue yes radio"
											name="cnaBefore"
											type="radio"
											id="cnaBeforeYes"
											defaultChecked={isAnswer(data, 4, 1)}
											onChange={() => {
												onchange(4, 1);
											}}
										/>
										<label htmlFor="cnaBeforeYes">
											<span className="input"></span>Yes
										</label>
										<input
											className="fancy-toggle no radio"
											name="cnaBefore"
											type="radio"
											id="cnaBeforeNo"
											defaultChecked={isAnswer(data, 4, 2)}
											onChange={() => {
												onchange(4, 2);
											}}
										/>
										<label htmlFor="cnaBeforeNo">
											<span className="input"></span>No
										</label>
									</div>
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default WorkHistory;
