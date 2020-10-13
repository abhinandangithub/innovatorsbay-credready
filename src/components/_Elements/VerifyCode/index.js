import React, { useState, useEffect } from "react";

import "./index.scss";

function VerifyCode(props) {
	const [otp, setOtp] = useState(new Array(4).fill(""));

	const handleChange = (e, idx) => {
		let key = e.which,
			t = e.target,
			sib = t.nextElementSibling;

		if (key !== 9 && (key < 48 || key > 57)) {
			e.preventDefault();
			return false;
		}

		if (key === 9) {
			return true;
		}

		setOtp([...otp.map((d, i) => (i === idx ? t.value : d))]);

		if (idx === 3) return false;

		sib.focus();
		sib.select();
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	useEffect(() => {
		if (props.setOtp) {
			props.setOtp(otp);
		}
	}, [props, otp]);

	return (
		<form className="verify-code">
			{otp.map((data, index) => {
				return (
					<input
						key={index}
						value={data}
						type="text"
						maxLength="1"
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
						autoComplete="nothing"
						onChange={(e) => handleChange(e, index)}
						onFocus={(e) => handleFocus(e)}
					/>
				);
			})}
		</form>
	);
}

export default VerifyCode;
