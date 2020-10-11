import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getProfileThunk, getHiringNeedsThunk, getCompanySizeThunk } from '../../../../store/thunks/employer';
import Spinner from "../../../_Elements/Spinner";

import "./index.scss";

function View(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileThunk());
		dispatch(getHiringNeedsThunk());
		dispatch(getCompanySizeThunk());
	}, [dispatch]);

	return (
		props.loading ?
			< Spinner /> : (
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
								<p>{props.hiringKeys.length > 0 && props.hiringKeys.find(val => val.id === props.profile.org.hires_required).range_display_value}</p>
							</li>
							<li>
								<p>Company Size</p>
								<p>{props.companySizeKeys.length > 0 && props.companySizeKeys.find(val => val.id === props.profile.org.company_size).range_display_value}</p>
							</li>
							<li>
								<p>How did you hear about us?</p>
								<p>{props.profile.org.reference_source}</p>
							</li>
							<li>
								{props.profile.org.address.map((address) => {
									return (
										<ul className="listing" key={address.id}>
											<li className="divider">
												<span>{'Address ' + address.id}</span>
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
			)
	);
}

function mapStateToProps(state) {
	return {
		profile: state.employerReducer.profile.data,
		companySizeKeys: state.employerReducer.companySizeKeys,
		hiringKeys: state.employerReducer.hiringKeys,
		loading: state.commonReducer.apiCallsInProgress
	}
}

// export default View;
export default connect(mapStateToProps)(View);
