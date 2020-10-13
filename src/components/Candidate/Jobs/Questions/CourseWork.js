import React from "react";

import { isAnswer } from "./index";
import { findIndex } from "./index";

function CourseWork({ data, onchange, calHeight, noHeading, ...props }) {
	const parent = React.useRef();
	const [highSchool, setHighSchool] = React.useState({
		show: false,
		options: {
			bio1: false,
			chem: false,
			geo: false,
			alg: false,
		},
	});

	const updateHighSchool = (key, value) => {
		let _highSchool = { ...highSchool };

		if (key === "show") {
			_highSchool[key] = value;
		} else {
			_highSchool["options"][key] = value === "on" ? true : false;
		}
		setHighSchool(_highSchool);
	};

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, []);

	React.useEffect(() => {
		console.log("data: ", data[findIndex(data, 2)]["answer"].length);
	}, [props]);

	return (
		<div className="course_works" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Course Work</h2>
				</div>
			) : (
				""
			)}
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">Are you a High School graduate?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateYes"
								defaultChecked={isAnswer(data, 1, 1)}
								onChange={() => {
									onchange(1, 1);
								}}
							/>
							<label htmlFor="highSchoolGraduateYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateNo"
								defaultChecked={isAnswer(data, 1, 2)}
								onChange={() => {
									onchange(1, 2);
								}}
							/>
							<label htmlFor="highSchoolGraduateNo">
								<span className="input"></span>No
							</label>
						</div>
						{isAnswer(data, 1, 1) && (
							<>
								<ul className="level_2">
									<li className="general-question border">
										<h2 className="question">
											Which of these High School course have you taken?
										</h2>
										<div className="options">
											<input
												id="course_1"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 2, [1])}
												onChange={(e) => {
													onchange(2, [1]);
												}}
											/>
											<label htmlFor="course_1">Biology I</label>
											<input
												id="course_2"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 2, [2])}
												onChange={(e) => {
													onchange(2, [2]);
												}}
											/>
											<label htmlFor="course_2">Chemistry I</label>
											<input
												id="course_3"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 2, [3])}
												onChange={(e) => {
													onchange(2, [3]);
												}}
											/>
											<label htmlFor="course_3">Geometry</label>
											<input
												id="course_4"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 2, [4])}
												onChange={(e) => {
													onchange(2, [4]);
												}}
											/>
											<label htmlFor="course_4">Algebra II</label>
										</div>
									</li>
								</ul>
								{data[findIndex(data, 2)]["answer"].length > 0 && (
									<ul className="level_3">
										{data[findIndex(data, 2)]["answer"].map((ques, i) => {
											let course =
												ques === 1
													? "Biology I"
													: ques === 2
													? "Chemistry 1"
													: ques === 3
													? "Geometry"
													: "Algebra II";
											return (
												<li className="general-question border">
													<h2 className="question">
														In which year did you take {course} ?
													</h2>
													<div className="options">
														<input
															className="fancy-toggle blue  radio"
															name="year1"
															type="radio"
															id="year1"
														/>
														<label htmlFor="year1">
															<span className="input"></span>1st year
														</label>
														<input
															className="fancy-toggle blue radio"
															name="year1"
															type="radio"
															id="year2"
														/>
														<label htmlFor="year2">
															<span className="input"></span>2nd year
														</label>
														<input
															className="fancy-toggle blue radio"
															name="year1"
															type="radio"
															id="year3"
														/>
														<label htmlFor="year3">
															<span className="input"></span>3rd year
														</label>
														<input
															className="fancy-toggle blue radio"
															name="year1"
															type="radio"
															id="year4"
														/>
														<label htmlFor="year4">
															<span className="input"></span>4th year
														</label>
													</div>
												</li>
											);
										})}
									</ul>
								)}
							</>
						)}
					</li>
					<li className="general-question">
						<h2 className="question">Did you take a Foreign language?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="foreignLanguage"
								type="radio"
								id="foreignLanguageYes"
								defaultChecked={isAnswer(data, 3, 1)}
								onChange={() => {
									onchange(3, 1);
								}}
							/>
							<label htmlFor="foreignLanguageYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="foreignLanguage"
								type="radio"
								id="foreignLanguageNo"
								defaultChecked={isAnswer(data, 3, 2)}
								onChange={() => {
									onchange(3, 2);
								}}
							/>
							<label htmlFor="foreignLanguageNo">
								<span className="input"></span>No
							</label>
						</div>
						{isAnswer(data, 3, 1) && (
							<>
								<ul className="level_2">
									<li className="general-question border">
										<h2 className="question">Which language ?</h2>
										<div className="options coloumn">
											<input
												id="lanuguage_1"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 4, [1])}
												onChange={(e) => {
													onchange(4, [1]);
												}}
											/>
											<label htmlFor="lanuguage_1">French</label>
											<input
												id="lanuguage_2"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 4, [2])}
												onChange={(e) => {
													onchange(4, [2]);
												}}
											/>
											<label htmlFor="lanuguage_2">Spanish</label>
											<input
												id="lanuguage_3"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 4, [3])}
												onChange={(e) => {
													onchange(4, [3]);
												}}
											/>
											<label htmlFor="lanuguage_3">German</label>
											<input
												id="lanuguage_4"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 4, [4])}
												onChange={(e) => {
													onchange(4, [4]);
												}}
											/>
											<label htmlFor="lanuguage_4">Latin</label>
											<input
												id="lanuguage_4"
												type="checkbox"
												className="block-toggle blue"
												defaultChecked={isAnswer(data, 4, [5])}
												onChange={(e) => {
													onchange(4, [5]);
												}}
											/>
											<label htmlFor="lanuguage_4">Other</label>
										</div>
									</li>
								</ul>
								<ul className="level_3">
									{data[findIndex(data, 4)]["answer"].map((ques, i) => {
										let course =
											ques === 1
												? "French"
												: ques === 2
												? "Spanish"
												: ques === 3
												? "Germal"
												: ques === 4
												? "Latin"
												: "Other";
										return (
											<li className="general-question border">
												<h2 className="question">
													In which year did you take {course} ?
												</h2>
												<div className="options">
													<input
														className="fancy-toggle blue  radio"
														name="year1"
														type="radio"
														id="year1"
													/>
													<label htmlFor="year1">
														<span className="input"></span>1st year
													</label>
													<input
														className="fancy-toggle blue radio"
														name="year1"
														type="radio"
														id="year2"
													/>
													<label htmlFor="year2">
														<span className="input"></span>2nd year
													</label>
													<input
														className="fancy-toggle blue radio"
														name="year1"
														type="radio"
														id="year3"
													/>
													<label htmlFor="year3">
														<span className="input"></span>3rd year
													</label>
													<input
														className="fancy-toggle blue radio"
														name="year1"
														type="radio"
														id="year4"
													/>
													<label htmlFor="year4">
														<span className="input"></span>4th year
													</label>
												</div>
											</li>
										);
									})}
								</ul>
							</>
						)}
					</li>
					<li className="general-question">
						<h2 className="question">
							Do you have any education beyond a high school degree?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="afterHighSchoolDegree"
								type="radio"
								id="afterHighSchoolDegreeYes"
								defaultChecked={isAnswer(data, 5, 1)}
								onChange={() => {
									onchange(5, 1);
								}}
							/>
							<label htmlFor="afterHighSchoolDegreeYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="afterHighSchoolDegree"
								type="radio"
								id="afterHighSchoolDegreeNo"
								defaultChecked={isAnswer(data, 5, 2)}
								onChange={() => {
									onchange(5, 2);
								}}
							/>
							<label htmlFor="afterHighSchoolDegreeNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CourseWork;
