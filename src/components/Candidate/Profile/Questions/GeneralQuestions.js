import React from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../../_Elements/CustomDatePicker"

function GeneralQuestions(props) {
	const [appliedDate, setAppliedDate] = React.useState();
	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="general-questions-page" ref={parent}>
			<div className="heading">
				<h2>General Questions</h2>
			</div>
			<div className="content">
				<ul className="general-questions">
					<li className="general-question applied">
						<h2 className="question">
							Have you applied here previously? Is so, when?
						</h2>
						<div className="info">
							<label>When you applied?</label>
							<CustomDatePicker
								selected={appliedDate}
								onChange={(date) => setAppliedDate(date)}
								placeholderText="Select Date"
							/>
							<span style={{ margin: "0 15px" }}>Or</span>
							<input
								className="fancy-toggle no radio"
								name="applied"
								type="radio"
								id="appliedBefore"
							/>
							<label htmlFor="appliedBefore">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Are you over 18 years old?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="over18Years"
								type="radio"
								id="over18YearsYes"
							/>
							<label htmlFor="over18YearsYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="over18Years"
								type="radio"
								id="over18YearsNo"
							/>
							<label htmlFor="over18YearsNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Are you eligible to work in the U.S.?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="eligible"
								type="radio"
								id="eligibleYes"
							/>
							<label htmlFor="eligibleYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="eligible"
								type="radio"
								id="eligibleNo"
							/>
							<label htmlFor="eligibleNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Will you require relocation assistance?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="requireRelocation"
								type="radio"
								id="requireRelocationYes"
							/>
							<label htmlFor="requireRelocationYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="requireRelocation"
								type="radio"
								id="requireRelocationNo"
							/>
							<label htmlFor="requireRelocationNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Do you require or will you require a work authorization?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="workAuthorization"
								type="radio"
								id="workAuthorizationYes"
							/>
							<label htmlFor="workAuthorizationYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="workAuthorization"
								type="radio"
								id="workAuthorizationNo"
							/>
							<label htmlFor="workAuthorizationNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							If you believe you belong to any of the categories of protected
							veterans listed above, please indicate by checking the appropriate
							box below. If you are not a veteran, select box 1 OR select the
							box(s) that apply to your veteran status.
						</h2>
						<div className="options vetran-status coloumn">
							<input
								className="fancy-toggle blue yes radio full"
								name="isVeteran"
								type="radio"
								id="isVeteran"
							/>
							<label htmlFor="isVeteran">
								<span className="input"></span>I am not a veteran. (I did not
								serve in the military.)
							</label>
							<input
								className="fancy-toggle yes radio blue full"
								name="isVeteran"
								type="radio"
								id="protectedVeteran"
							/>
							<label htmlFor="protectedVeteran">
								<span className="input"></span>I belong to the following
								classifications of protected veterans (Choose all that apply):
							</label>
							<ul>
								<li>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="disabledVeteran"
									/>
									<label htmlFor="disabledVeteran">
										<span className="input"></span>DISABLED VETERAN
									</label>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="separatedVeteran"
									/>
									<label htmlFor="separatedVeteran">
										<span className="input"></span>
										RECENTLY SEPARATED VETERAN
									</label>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="activeVeteran"
									/>
									<label htmlFor="activeVeteran">
										<span className="input"></span>
										ACTIVE WARTIME OR CAMPAIGN BADGE VETERAN
									</label>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="medalVeteran"
									/>
									<label htmlFor="medalVeteran">
										<span className="input"></span>
										ARMED FORCES SERVICE MEDAL VETERAN
									</label>
								</li>
							</ul>
							<input
								className="fancy-toggle yes radio blue full"
								name="isVeteran"
								type="radio"
								id="notProtectedVeteran"
							/>
							<label htmlFor="notProtectedVeteran">
								<span className="input"></span>I am NOT a protected veteran. (I
								served in the military but do not fall into any veteran
								categories listed above.)
							</label>
							<input
								className="fancy-toggle yes radio blue full"
								name="isVeteran"
								type="radio"
								id="noVeteranStatus"
							/>
							<label htmlFor="noVeteranStatus">
								<span className="input"></span>I choose not to identify my
								veteran status.
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default GeneralQuestions;
