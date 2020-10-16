import React, { useState, useEffect, useRef } from "react";

import "./index.scss";

function VerifyCode(props) {
	const [otp, setOtp] = useState(new Array(4).fill(""));

	let refs = useRef([
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
	]);

	const handleChange = (e, idx) => {
		let key = e.which,
			t = e.currentTarget,
			nextSib = t.nextElementSibling,
			prevSib = t.previousElementSibling;

		// console.log("key: ", key);

		if (key === 13) {
			console.log("Enter Pressed");
		} else if (key === 8) {
			console.log("Backspace Pressed");
			if (idx !== 0) {
				prevSib.focus();
				prevSib.select();
				if (otp[idx] !== "") {
					setOtp([...otp.map((d, i) => (i === idx ? "" : d))]);
				} else {
					setOtp([...otp.map((d, i) => (i === idx - 1 ? "" : d))]);
				}
			} else {
				setOtp([...otp.map((d, i) => (i === idx ? "" : d))]);
			}
		} else if (key === 37 || key === 40) {
			console.log("Left or Down Pressed");
			if (idx !== 0) {
				prevSib.focus();
				prevSib.select();
			} else {
				refs.current[3].current.focus();
				refs.current[3].current.select();
			}
		} else if (key === 39 || key === 38) {
			console.log("Right or Up Pressed");
			if (idx !== 3) {
				nextSib.focus();
				nextSib.select();
			} else {
				refs.current[0].current.focus();
				refs.current[0].current.select();
			}
		} else if (key === 8) {
			console.log("Backspace Pressed");
		} else if (key > 47 && key < 58) {
			setOtp([...otp.map((d, i) => (i === idx ? key - 48 : d))]);
			if (idx !== 3) {
				nextSib.focus();
				nextSib.select();
			} else {
				refs.current[0].current.focus();
				refs.current[0].current.select();
			}
		}
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	const handleKeyDown = (e) => {
		let val = e.which;
		console.log(e, val);
	};

	useEffect(() => {
		if (props.setOtp) {
			props.setOtp(otp);
		}
	}, [props, otp]);

	useEffect(() => {}, []);

	return (
		<form className="verify-code">
			{otp.map((data, index) => {
				return (
					<input
						key={index}
						value={data}
						type="text"
						maxLength="1"
						ref={refs.current[index]}
						className={`input_${index}`}
						id={
							props.type === "Email"
								? `verifyCodeEmailInput_${index}`
								: `verifyCodePhoneInput_${index}`
						}
						size="1"
						min="0"
						max="9"
						pattern="[0-9]{1}"
						autoFocus={index === 0 ? true : false}
						// autoComplete="nothing"
						autoComplete="off"
						onKeyDown={(e) => handleChange(e, index)}
						onFocus={(e) => handleFocus(e)}
						// onKeyDown={(e) => handleKeyDown(e)}
					/>
				);
			})}
		</form>
	);
}

export default VerifyCode;
