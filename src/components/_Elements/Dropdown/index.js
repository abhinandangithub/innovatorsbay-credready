import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import InputRange from "react-input-range";

import "./index.scss";

function Dropdown({
	id,
	placeholder,
	content,
	selected,
	onchange,
	callback = undefined,
}) {
	const [active, setactive] = useState(false);
	const [value, setvalue] = useState(selected);
	const [isChanged, setIsChanged] = useState(false);
	const [sliderValue, setSliderValue] = useState(40);
	const dropDownEl = React.useRef();

	const handleItemClick = (item) => {
		onchange && onchange(item.id ? item.id : item);
		setvalue(item.val ? item.val : item);
		setactive(false);
		setIsChanged(true);
		if (callback) {
			callback();
		}
	};

	const renderContent = () => {
		if (content === "slider") {
			return (
				<div className="content slider">
					<InputRange
						minValue={0}
						maxValue={100}
						value={sliderValue}
						onChange={(value) => setSliderValue(value)}
					/>
				</div>
			);
		} else {
			return (
				<ul className="content">
					{content &&
						content.map((item, key) => {
							return (
								<li onClick={() => handleItemClick(item)} key={key}>
									{item.val ? item.val : item}
								</li>
							);
						})}
				</ul>
			);
		}
	};

	const handleClickOutside = (e) => {
		if (e.target.closest(".common-dropdown") !== dropDownEl.current)
			setactive(false);
	};

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [active]);

	return (
		<div
			className={`common-dropdown ${active ? "active" : ""}  ${
				isChanged || selected ? "changed" : ""
			}`}
			id={id && id}
			ref={dropDownEl}
		>
			<div className="heading" onClick={() => setactive(!active)}>
				{value ? value : placeholder}
				<FontAwesomeIcon
					icon={active ? faChevronUp : faChevronDown}
					className="arrow"
				/>
			</div>

			{renderContent()}
		</div>
	);
}

export default Dropdown;
