import React from "react";

function CourseWork(props) {
	const parent = React.useRef();

	React.useEffect(() => {
		// props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="course_works" ref={parent}>
			<div className="heading">
				<h2>Course Work</h2>
			</div>
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
							/>
							<label htmlFor="highSchoolGraduateYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateNo"
							/>
							<label htmlFor="highSchoolGraduateNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Which of these High School course have you taken?
						</h2>
						<div className="options">
							<input
								id="course_1"
								type="checkbox"
								className="block-toggle blue"
								defaultChecked
							/>
							<label htmlFor="course_1">Biology I</label>
							<input
								id="course_2"
								type="checkbox"
								className="block-toggle blue"
							/>
							<label htmlFor="course_2">Chemistry I</label>
							<input
								id="course_3"
								type="checkbox"
								className="block-toggle blue"
								defaultChecked
							/>
							<label htmlFor="course_3">Geometry</label>
							<input
								id="course_4"
								type="checkbox"
								className="block-toggle blue"
							/>
							<label htmlFor="course_4">Algebra II</label>
						</div>
						<ul className="level_2">
							<li className="general-question border">
								<h2 className="question">
									In which year did you take Biology I ?
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
							<li className="general-question border">
								<h2 className="question">
									In which year did you take Geometry ?
								</h2>
								<div className="options">
									<input
										className="fancy-toggle blue  radio"
										name="year2"
										type="radio"
										id="year5"
									/>
									<label htmlFor="year5">
										<span className="input"></span>1st year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="year2"
										type="radio"
										id="year6"
									/>
									<label htmlFor="year6">
										<span className="input"></span>2nd year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="year2"
										type="radio"
										id="year7"
									/>
									<label htmlFor="year7">
										<span className="input"></span>3rd year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="year2"
										type="radio"
										id="year8"
									/>
									<label htmlFor="year8">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
						</ul>
					</li>
					<li className="general-question">
						<h2 className="question">Did you take a Foreign language?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="foreignLanguage"
								type="radio"
								id="foreignLanguageYes"
							/>
							<label htmlFor="foreignLanguageYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="foreignLanguage"
								type="radio"
								id="foreignLanguageNo"
							/>
							<label htmlFor="foreignLanguageNo">
								<span className="input"></span>No
							</label>
						</div>
						<ul className="level_2">
							<li className="general-question border">
								<h2 className="question">Which language ?</h2>
								<div className="options coloumn">
									<input
										id="lanuguage_1"
										type="checkbox"
										className="block-toggle blue"
										defaultChecked
									/>
									<label htmlFor="lanuguage_1">French</label>
									<input
										id="lanuguage_2"
										type="checkbox"
										className="block-toggle blue"
									/>
									<label htmlFor="lanuguage_2">Spanish</label>
									<input
										id="lanuguage_3"
										type="checkbox"
										className="block-toggle blue"
										defaultChecked
									/>
									<label htmlFor="lanuguage_3">German</label>
									<input
										id="lanuguage_4"
										type="checkbox"
										className="block-toggle blue"
									/>
									<label htmlFor="lanuguage_4">Latin</label>
									<input
										id="lanuguage_4"
										type="checkbox"
										className="block-toggle blue"
									/>
									<label htmlFor="lanuguage_4">Other</label>
								</div>
							</li>
						</ul>
						<ul className="level_3">
							<li className="general-question border">
								<h2 className="question">
									How many years of foreign language?
								</h2>
								<div className="options">
									<input
										className="fancy-toggle blue  radio"
										name="foreign1"
										type="radio"
										id="foreign1"
									/>
									<label htmlFor="foreign1">
										<span className="input"></span>1 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign2"
									/>
									<label htmlFor="foreign2">
										<span className="input"></span>2 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign3"
									/>
									<label htmlFor="foreign3">
										<span className="input"></span>3 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign4"
									/>
									<label htmlFor="foreign4">
										<span className="input"></span>4 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign4"
									/>
									<label htmlFor="foreign4">
										<span className="input"></span>5 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign4"
									/>
									<label htmlFor="foreign4">
										<span className="input"></span>6 year
									</label>
								</div>
							</li>
							<li className="general-question border">
								<h2 className="question">What was your last year of French?</h2>
								<div className="options">
									<input
										className="fancy-toggle blue  radio"
										name="french2"
										type="radio"
										id="french5"
									/>
									<label htmlFor="french5">
										<span className="input"></span>1st year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="french2"
										type="radio"
										id="french6"
									/>
									<label htmlFor="french6">
										<span className="input"></span>2nd year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="french2"
										type="radio"
										id="french7"
									/>
									<label htmlFor="french7">
										<span className="input"></span>3rd year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="french2"
										type="radio"
										id="french8"
									/>
									<label htmlFor="french8">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
							<li className="general-question border">
								<h2 className="question">What was your last year of German?</h2>
								<div className="options">
									<input
										className="fancy-toggle blue  radio"
										name="german2"
										type="radio"
										id="german5"
									/>
									<label htmlFor="german5">
										<span className="input"></span>1st year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="german2"
										type="radio"
										id="german6"
									/>
									<label htmlFor="german6">
										<span className="input"></span>2nd year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="german2"
										type="radio"
										id="german7"
									/>
									<label htmlFor="german7">
										<span className="input"></span>3rd year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="german2"
										type="radio"
										id="german8"
									/>
									<label htmlFor="german8">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
						</ul>
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
							/>
							<label htmlFor="afterHighSchoolDegreeYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="afterHighSchoolDegree"
								type="radio"
								id="afterHighSchoolDegreeNo"
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
