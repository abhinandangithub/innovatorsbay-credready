import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getProfileThunk } from '../../../../store/thunks/employer';

import "./index.scss";

function View(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileThunk());
	}, [dispatch]);

	return (
		<div className="profile-view">
			<div className="content">
				<ul className="listing">
					<li>
						<p>Full Name</p>
						<p>{props.profile.name}</p>
					</li>
					<li>
						<p>Title</p>
						<p>{props.profile.title}</p>
					</li>
					<li>
						<p>Company Website</p>
						<p>{props.profile.org.website}</p>
					</li>
					<li>
						<p>Hiring Needs</p>
						<p>{props.profile.org.hires_required}</p>
					</li>
					<li>
						<p>Company Size</p>
						<p>{props.profile.org.company_size}</p>
					</li>
					<li>
						<p>How did you hear about us?</p>
						<p>{props.profile.org.reference_source}</p>
					</li>
					<li>
						{props.profile.org.address.map((address) => {
							return(
							<ul className="listing">
							<li className="divider">
								<span>{'Address '+address.id}</span>
							</li>
							<li>
								<p>Street Address</p>
								<p>{address.street_address}</p>
							</li>
							<li>
								<p>City</p>
								<p>{address.city}</p>
							</li>
							<li>
								<p>State</p>
								<p>{address.state}</p>
							</li>
							<li>
								<p>Zip Code</p>
								<p>{address.zip_code}</p>
							</li>
						</ul>);
						})}
					</li>
				</ul>
				<Link to="/profile/edit" className="edit" id="editBtn">
					<FontAwesomeIcon icon={faPencilAlt} />
				</Link>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		profile: state.employerReducer.profile.data
	}
}

// export default View;
export default connect(mapStateToProps)(View);
