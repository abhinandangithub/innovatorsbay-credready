import React, { useState } from "react";

import "./index.scss";

function InputDropdown({ id, placeholder, content, selected, onchange }) {
	const [active, setactive] = useState(false);
	const [value, setvalue] = useState(selected);
	const [isChanged, setIsChanged] = useState(false);
	const dropDownEl = React.useRef();

	const handleItemClick = (item) => {
		onchange && onchange(item.id ? item.id : item);
		setvalue(item.val ? item.val : item);
		setactive(false);
		setIsChanged(true);
	};

	const renderContent = () => {
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
			className={`common-dropdown common-input-dropdown ${
				active ? "active" : ""
			}  ${isChanged || selected ? "changed" : ""}`}
			id={id && id}
			ref={dropDownEl}
		>
			<div className="heading" onClick={() => setactive(!active)}>
				<input
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						setvalue(e.target.value);
						onchange && onchange(e.target.value);
					}}
				/>
			</div>

			{renderContent()}
		</div>
	);
}

export default InputDropdown;
