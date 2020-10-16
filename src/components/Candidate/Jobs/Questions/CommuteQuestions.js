import React from "react";

import Input from "../../../_Elements/Input";
import { isAnswer, findIndex } from "./index";

function CommuteQuestions({ data, onchange, calHeight, noHeading, ...props }) {
	const parent = React.useRef();
	const [addressCount, setAddressCount] = React.useState([""]);

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [props]);

	const addAdress = () => {
		let _addressCount = [...addressCount];
		_addressCount.push("");
		setAddressCount(_addressCount);
		props.newAddress(_addressCount);
	};

	return (
		<div className="commute-questions" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Commute Questions</h2>
				</div>
			) : (
				""
			)}
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">What is your home address?</h2>
						<div className="options">
							<Input
								type="text"
								placeholder="247 King St. Warren, NJ"
								defaultValue={data[findIndex(data, 1)]["answer"]}
								onChange={(e) => {
									onchange(1, e.target.value);
								}}
							/>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Do you have any other jobs that you plan continue with?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="otherJob"
								type="radio"
								id="otherJobYes"
								defaultChecked={isAnswer(data, 2, 1)}
								onChange={() => {
									onchange(2, 1);
								}}
							/>
							<label htmlFor="otherJobYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="otherJob"
								type="radio"
								id="otherJobNo"
								defaultChecked={isAnswer(data, 2, 2)}
								onChange={() => {
									onchange(2, 2);
								}}
							/>
							<label htmlFor="otherJobNo">
								<span className="input"></span>No
							</label>
						</div>
						{isAnswer(data, 2, 1) && (
							<ul className="level_2">
								<li>Please enter the addresses of your other Jobs.</li>
								{addressCount.map((address, i) => {
									return (
										<li className="general-question border" key={i}>
											<ul className="address">
												<li>Adress {i + 1}</li>
												<li>
													<label htmlFor="street">Street Adress</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`street_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `street_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
												<li>
													<label htmlFor="street">City</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`city_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `city_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
												<li>
													<label htmlFor="street">State</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`state_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `state_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
												<li>
													<label htmlFor="street">Zip Code</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`zipCode_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `zipCode_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
											</ul>
										</li>
									);
								})}
								<li
									id="addAddressBtn"
									className="add-address"
									onClick={addAdress}
								>
									Add Another Address
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CommuteQuestions;
