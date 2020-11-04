import React from "react";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import { months } from "../../../assets/js/Utility";

const range = (start, end) => {
	return new Array(end - start).fill().map((d, i) => i + start);
};

function CustomDatePicker(props) {
	var now = new Date();

	const years = range(1990, getYear(now) + 1, 1);

	var currentMonth = months[now.getMonth()];

	return (
		<DatePicker
			{...props}
			peekNextMonth
			showMonthDropdown
			showYearDropdown
			dropdownMode="select"
			autoComplete="off"
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				increaseYear,
				decreaseYear,
			}) => (
				<div
					style={{
						margin: 10,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<button onClick={decreaseYear} disabled={date.getFullYear() <= 1990}>
						{"<<"}
					</button>
					<button
						onClick={decreaseMonth}
						disabled={
							date.getFullYear() <= 1990 &&
							months[date.getMonth()] === "January"
						}
					>
						{"<"}
					</button>
					<select
						value={getYear(date)}
						onChange={({ target: { value } }) => changeYear(value)}
					>
						{years.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					<select
						value={months[date.getMonth()]}
						onChange={({ target: { value } }) =>
							changeMonth(months.indexOf(value))
						}
					>
						{months.map((option) => {
							if (
								date.getFullYear() >= getYear(new Date()) &&
								months.indexOf(option) > now.getMonth()
							) {
								return (
									<option key={option} value={option} disabled>
										{option}
									</option>
								);
							}
							return (
								<option key={option} value={option}>
									{option}
								</option>
							);
						})}
					</select>
					<button
						onClick={increaseMonth}
						disabled={
							date.getFullYear() >= getYear(new Date()) &&
							months[date.getMonth()] === currentMonth
						}
					>
						{">"}
					</button>
					<button
						onClick={increaseYear}
						disabled={date.getFullYear() >= getYear(new Date())}
					>
						{">>"}
					</button>
				</div>
			)}
		/>
	);
}

export default CustomDatePicker;
