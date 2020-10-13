import React from "react";

import { isAnswer, findIndex } from "./index";

const courses = ["Biology I", "Chemistry I", "Geometry", "Algebra II"];
const languages = ["French", "Spanish", "German", "Latin", "Other"];
// const years = ["1st year", "2nd year", "3rd year", "4th year"];

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

	React.useEffect(() => { }, [props]);

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
											{courses.map((course, i) => {
												return (
													<>
														<input
															id={`course_${i}`}
															name="course"
															type="checkbox"
															className="block-toggle blue"
															defaultChecked={isAnswer(data, 2, {
																sub_question_id: i + 1,
															})}
															onChange={(e) => {
																onchange(2, {
																	sub_question_id: i + 1,
																});
															}}
														/>
														<label htmlFor={`course_${i}`}>{course}</label>
													</>
												);
											})}
										</div>
									</li>
								</ul>
								{data[findIndex(data, 2)]["answer"].length > 0 && (
									<ul className="level_3">
										{data[findIndex(data, 2)]["answer"].map((ques, i) => {
											let course =
												ques.sub_question_id === 1
													? "Biology I"
													: ques.sub_question_id === 2
														? "Chemistry 1"
														: ques.sub_question_id === 3
															? "Geometry"
															: "Algebra II";
											return (
												<li className="general-question border" key={i}>
													<h2 className="question">
														In which year did you take {course} ?
													</h2>
													<div className="options">
														<input
															className="fancy-toggle blue  radio"
															type="radio"
															name={`year_1${i}`}
															id={`year_1${i}`}
															defaultChecked={isAnswer(data, 2, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 1,
															})}
															onChange={(e) => {
																onchange(2, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 1,
																});
															}}
														/>
														<label htmlFor={`year_1${i}`}>
															<span className="input"></span>1st year
														</label>
														<input
															className="fancy-toggle blue radio"
															name={`year_1${i}`}
															type="radio"
															id={`year_2${i}`}
															defaultChecked={isAnswer(data, 2, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 2,
															})}
															onChange={(e) => {
																onchange(2, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 2,
																});
															}}
														/>
														<label htmlFor={`year_2${i}`}>
															<span className="input"></span>2nd year
														</label>
														<input
															className="fancy-toggle blue radio"
															name={`year_1${i}`}
															type="radio"
															id={`year_3${i}`}
															defaultChecked={isAnswer(data, 2, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 3,
															})}
															onChange={(e) => {
																onchange(2, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 3,
																});
															}}
														/>
														<label htmlFor={`year_3${i}`}>
															<span className="input"></span>3rd year
														</label>
														<input
															className="fancy-toggle blue radio"
															name={`year_1${i}`}
															type="radio"
															id={`year_4${i}`}
															defaultChecked={isAnswer(data, 2, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 4,
															})}
															onChange={(e) => {
																onchange(2, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 4,
																});
															}}
														/>
														<label htmlFor={`year_4${i}`}>
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
											{languages.map((language, i) => {
												return (
													<>
														<input
															id={`language_${i}`}
															name="language"
															type="checkbox"
															className="block-toggle blue"
															defaultChecked={isAnswer(data, 4, {
																sub_question_id: i + 1,
															})}
															onChange={(e) => {
																onchange(4, {
																	sub_question_id: i + 1,
																});
															}}
														/>
														<label htmlFor={`language_${i}`}>{language}</label>
													</>
												);
											})}
										</div>
									</li>
								</ul>
								{data[findIndex(data, 4)]["answer"].length > 0 && (
									<ul className="level_3">
										{data[findIndex(data, 4)]["answer"].map((ques, i) => {
											let lang =
												ques.sub_question_id === 1
													? "French"
													: ques.sub_question_id === 2
														? "Spanish"
														: ques.sub_question_id === 3
															? "Germal"
															: ques.sub_question_id === 4
																? "Latin"
																: "Other";
											return (
												<li className="general-question border" key={i}>
													<h2 className="question">
														In which year did you take {lang} ?
													</h2>
													<div className="options">
														<input
															className="fancy-toggle blue  radio"
															type="radio"
															name={`year_2${i}`}
															id={`year_11${i}`}
															defaultChecked={isAnswer(data, 4, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 1,
															})}
															onChange={(e) => {
																onchange(4, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 1,
																});
															}}
														/>
														<label htmlFor={`year_11${i}`}>
															<span className="input"></span>1st year
														</label>
														<input
															className="fancy-toggle blue radio"
															type="radio"
															name={`year_2${i}`}
															id={`year_22${i}`}
															defaultChecked={isAnswer(data, 4, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 2,
															})}
															onChange={(e) => {
																onchange(4, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 2,
																});
															}}
														/>
														<label htmlFor={`year_22${i}`}>
															<span className="input"></span>2nd year
														</label>
														<input
															className="fancy-toggle blue radio"
															type="radio"
															name={`year_2${i}`}
															id={`year_33${i}`}
															defaultChecked={isAnswer(data, 4, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 3,
															})}
															onChange={(e) => {
																onchange(4, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 3,
																});
															}}
														/>
														<label htmlFor={`year_33${i}`}>
															<span className="input"></span>3rd year
														</label>
														<input
															className="fancy-toggle blue radio"
															type="radio"
															name={`year_2${i}`}
															id={`year_44${i}`}
															defaultChecked={isAnswer(data, 4, {
																sub_question_id_2: ques.sub_question_id,
																sub_answer: 4,
															})}
															onChange={(e) => {
																onchange(4, {
																	sub_question_id_2: ques.sub_question_id,
																	sub_answer: 4,
																});
															}}
														/>
														<label htmlFor={`year_44${i}`}>
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
			</div >
		</div >
	);
}

export default CourseWork;
