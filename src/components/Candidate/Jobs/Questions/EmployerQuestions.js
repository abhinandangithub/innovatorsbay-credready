import React from "react";

import { isAnswer } from "./index";
import Input from "../../../_Elements/Input";
import JobSpecificQuestions from '../JobSpecificQuestions';

function EmployerQuestions({ data, onchange, calHeight, noHeading, employerQuestions, ...props }) {
	console.log('abhi employerQuestions ', employerQuestions);
	const parent = React.useRef();
	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [props]);

	const empQues = {
		"questions": props.empQuestions ? props.empQuestions : []
	}

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
					<JobSpecificQuestions questions={employerQuestions} />
					{empQues.questions && empQues.questions.map((ques, index) => {
						return (
							<li className="general-question" key={index}>
								<h2 className="question">{ques.question_name}</h2>
								<div className="options">
									{ques.question_type === 'text-input' ? <Input
										id={`ques${index}`}
										type="text"
										// defaultChecked={isAnswer(data, 1, [1])}
										onChange={(e) => {
											onchange(ques.question_id, e.target.value);
										}}
									/> : <>
											{
												ques.option_choices.map((option, ind) => {
													return (
														<>
															<input
																className="fancy-toggle blue"
																id={`ques${index}${ind}`}
																name={`ques${index}`}
																type="radio"
																// defaultChecked={isAnswer(data, 1, [1])}
																onChange={() => {
																	onchange(ques.question_id, [ind + 1]);
																}}
															/>
															<label htmlFor={`ques${index}${ind}`}>
																<span className="input">

																</span>
																{option.option_choice_name}
															</label>
														</>
													)
												})
											}
										</>
									}

								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

export default EmployerQuestions;
