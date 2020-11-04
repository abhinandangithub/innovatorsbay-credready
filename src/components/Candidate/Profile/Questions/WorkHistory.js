import React from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../../_Elements/CustomDatePicker";
import InputRange from "react-input-range";

function WorkHistory(props) {
	const [appliedDate, setAppliedDate] = React.useState();
	const parent = React.useRef();
	const [value1, setValue1] = React.useState(5);
	const [value2, setValue2] = React.useState(6);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="work-history" ref={parent}>
			<div className="heading">
				<h2>Work History</h2>
			</div>
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">How many jobs have you held?</h2>
						<div className="options slider">
							<InputRange
								minValue={0}
								maxValue={15}
								value={value1}
								onChange={(value) => setValue1(value)}
							/>
						</div>
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
										onChange={(value) => setValue2(value)}
									/>
								</div>
							</li>
							<li className="general-question border">
								<h2 className="question">When did you start your first job?</h2>
								<div className="options">
									<CustomDatePicker
										selected={appliedDate}
										onChange={(date) => setAppliedDate(date)}
										placeholderText="Select Date"
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
									/>
									<label htmlFor="cnaBeforeYes">
										<span className="input"></span>Yes
									</label>
									<input
										className="fancy-toggle no radio"
										name="cnaBefore"
										type="radio"
										id="cnaBeforeNo"
									/>
									<label htmlFor="cnaBeforeNo">
										<span className="input"></span>No
									</label>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default WorkHistory;
