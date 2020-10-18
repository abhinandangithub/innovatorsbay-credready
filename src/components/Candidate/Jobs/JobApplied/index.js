import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";
import { getCandidateJobDetails } from "../../../../store/thunks/candidate";
import Input from '../../../_Elements/Input';

function JobApplied(props) {
  let { id } = useParams();
  const [labelsArr, setLabelsArr] = useState([]);
  const [valuesArr, setValuesArr] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidateJobDetails(id));
  }, [id]);

  useEffect(() => {
    setLabelsArr(
      props.candidateJobDetails.candidateJobApplication.marginal_associations.map(
        (val) => val.metric
      )
    );
    setValuesArr(
      props.candidateJobDetails.candidateJobApplication.marginal_associations.map(
        (val) => val.score
      )
    );
  }, [props.candidateJobDetails]);

  var isLoggedIn = true;

  function WorkExperienceComponent({ experience }) {
    return (
      <>
        <div className="details">
          <h2>{experience.title}</h2>
          <p>
            <span className="heading">{experience.company ? experience.company : experience.organization_name}</span>
            {" - "}
            <span className="text">{experience.location}</span>
          </p>
          <p>
            <span className="heading">{experience.employment_from ? experience.employment_from : experience.employed_from}</span>
            {" to "}
            <span className="text">{experience.employment_to ? experience.employment_to : experience.employed_till}</span>
          </p>
          <p>
            <span className="heading">Current employment status: </span>
            <span className="text">Employed</span>
          </p>
          <p>
            <span className="heading">Skills: </span>
            <span className="text">
              Patient Care & Safety, Medical Terminology, Electronic Medical
              Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
              Medication Administration, Patient Advocacy and Support.
            </span>
          </p>
        </div>
      </>
    );
  }

  function EducationExperienceComponent({experience}) {
	  return (
		<>
		<div className="details">
        	<h2>{experience.title}</h2>
            	<p>
                  <span className="heading">{experience.education_description ? experience.education_description : experience.description}</span>
                  {" - "}
                  <span className="text">{experience.institution ? experience.institution : experience.organization_name}</span>
                </p>
                <p>
                  <span className="text">{experience.attended_from ? experience.attended_from : experience.employed_from}</span>
                  {" to "}
                  <span className="text">{experience.attended_till ? experience.attended_till : experience.employed_till}</span>
                </p>
              </div>
		</>
	  );
  }

  function CertificationComponent({experience}) {
	  return (
		<>
		<div className="details">
                <h2>GHI Nursing Certificate</h2>
                <p>
                  <span className="heading">Description: </span>
                  {" - "}
                  <span className="text">
                    {/* Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support. */}
					{experience.description}
                  </span>
                </p>
                <p>
                  <span className="heading">Issued Date: </span>
                  {" to "}
                  <span className="text">{experience.issued_date}</span>
                </p>
                <p>
                  <span className="heading">Certificate link: </span>
                  <span className="text">
                    <Link to="/">
                      {/* https://www.certificatelink.com/certi.pdf */}
					  {experience.certificate_link}
                    </Link>
                  </span>
                </p>
                <p>
                  <span className="heading">Certificate Image: </span>
                  <span className="text">Image here</span>
                </p>
              </div>
		</>
	  );
  }

  return (
    <>
      <div
        className={`job-view-cmp flex ${isLoggedIn ? "" : "login_required"}`}
      >
        <div className="left">
          <div className="top">
            <div className="logo">
              <img src={ImgWidgetLogo} alt="" />
            </div>
            <div className="info">
              {/* <h3>Certified Nursing Assistent</h3> */}
              <h3>{props.candidateJobDetails.jobDetails.jobTitle}</h3>
              {/* <p>Hospital to Five Star Nursing</p> */}
              <p>{props.candidateJobDetails.jobDetails.orgName}</p>
            </div>
            <div className="short-info">
              {/* <p>1-3 Years</p> */}
              <p>
                {props.candidateJobDetails.jobDetails.minExp}-
                {props.candidateJobDetails.jobDetails.maxExp} Years
              </p>
              <p>{props.candidateJobDetails.jobDetails.location}</p>
            </div>
          </div>
          <div className="bottom">
            <p>
              <span className="heading">Job Description: </span>
              <span className="text">
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. */}
                {props.candidateJobDetails.jobDetails.jobDescription}
              </span>
            </p>
            <p>
              <span className="heading">Certificates: </span>
              <span className="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </span>
            </p>
            <h2>A {props.candidateJobDetails.jobDetails.jobTitle}'s Job</h2>
            <h3>Responsibilities</h3>
            <ul>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="meter">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has.
            </p>
            <CredReadyIndex
              index={
                props.candidateJobDetails.candidateJobApplication
                  .readiness_index
              }
            />
            <div className={`${isLoggedIn ? "hidden" : "login_screen"}`}>
              <p>Not enough information to calculate your CredReady score.</p>
              <p>
                <Link to="/login">Login</Link> and enter your profile details to
                view your score
              </p>
            </div>
          </div>
          <div className="marginal">
            <h3>Top 5 Contributors to CredREadiness</h3>
            <MarginalAssociation labelsArr={labelsArr} valuesArr={valuesArr} />
            <div className={`${isLoggedIn ? "hidden" : "login_screen"}`}></div>
          </div>
        </div>
      </div>
      <div className="preview_info">
        <div className="content">
          <div className="group">
            <div className="top">
              <h1>Resume</h1>
              <FontAwesomeIcon
                className="action-btn edit"
                icon={faPen}
                onClick={() => alert(`Editing`)}
              />
              <FontAwesomeIcon
                className="action-btn delete"
                icon={faTrash}
                onClick={() => alert(`Deleting`)}
              />
            </div>
            <div className="bottom">
              <p>
                <Link to="/">marryjane_cv.pdf</Link>
              </p>
            </div>
          </div>
          <div className="group">
            <div className="top">
              <h1>Personal Details</h1>
              <FontAwesomeIcon
                className="action-btn edit"
                icon={faPen}
                onClick={() => alert(`Editing`)}
              />
              <FontAwesomeIcon
                className="action-btn delete"
                icon={faTrash}
                onClick={() => alert(`Deleting`)}
              />
            </div>
            <div className="bottom">
              <p>
                First Name : {props.candidateJobDetails.candidate.first_name}
              </p>
              <p>Last Name : {props.candidateJobDetails.candidate.last_name}</p>
              <p>Current employment status : Employed</p>
              <p>
                How long would you begin a new role? :{" "}
                {props.candidateJobDetails.candidate.available_within}
              </p>
              <p>
                Are you interested in a different function and industry? : Yes
              </p>
              <p>Empathy : 35</p>
              <p>Patient : 80 </p>
            </div>
          </div>
          <div className="group">
            <div className="top">
              <h1>Experience</h1>
              <FontAwesomeIcon
                className="action-btn edit"
                icon={faPen}
                onClick={() => alert(`Editing`)}
              />
              <FontAwesomeIcon
                className="action-btn delete"
                icon={faTrash}
                onClick={() => alert(`Deleting`)}
              />
            </div>

            <div className="bottom">
				{props.candidateJobDetails.candidate.work_experience.map(val => {
					return <WorkExperienceComponent experience={val}></WorkExperienceComponent>
				})}
				{props.candidateJobDetails.candidate.additional_experiences.map(val => {
					if(val.career_path === "work"){
						return <WorkExperienceComponent experience={val}></WorkExperienceComponent>
					}
				})}
              {/* <div className="details">
                <h2>Certified Nursing Assistant</h2>
                <p>
                  <span className="heading">ABC Staffing Company</span>
                  {" - "}
                  <span className="text">New York</span>
                </p>
                <p>
                  <span className="heading">March 2012</span>
                  {" to "}
                  <span className="text">Present</span>
                </p>
                <p>
                  <span className="heading">Current employment status: </span>
                  <span className="text">Employed</span>
                </p>
                <p>
                  <span className="heading">Skills: </span>
                  <span className="text">
                    Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support.
                  </span>
                </p>
              </div>
              <div className="details">
                <h2>Certified Nursing Assistant</h2>
                <p>
                  <span className="heading">ABC Staffing Company</span>
                  {" - "}
                  <span className="text">New York</span>
                </p>
                <p>
                  <span className="heading">March 2012</span>
                  {" to "}
                  <span className="text">Present</span>
                </p>
                <p>
                  <span className="heading">Current employment status: </span>
                  <span className="text">Employed</span>
                </p>
                <p>
                  <span className="heading">Skills: </span>
                  <span className="text">
                    Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support.
                  </span>
                </p>
              </div> */}
            </div>
          </div>
          <div className="group ">
            <div className="top">
              <h1>Education</h1>
              <FontAwesomeIcon
                className="action-btn edit"
                icon={faPen}
                onClick={() => alert(`Editing`)}
              />
              <FontAwesomeIcon
                className="action-btn delete"
                icon={faTrash}
                onClick={() => alert(`Deleting`)}
              />
            </div>
            <div className="bottom">
              {/* <div className="details">
                <h2>ABC School, Sometown, CT</h2>
                <p>
                  <span className="heading">Nurse’s Aide Program:</span>
                  {" - "}
                  <span className="text">ABC University</span>
                </p>
                <p>
                  <span className="text">FROM 2010</span>
                  {" to "}
                  <span className="text">1012</span>
                </p>
              </div> */}
			  {props.candidateJobDetails.candidate.education_experience.map(val => {
				  return <EducationExperienceComponent experience={val}></EducationExperienceComponent>
			  })}
			  {props.candidateJobDetails.candidate.additional_experiences.map(val => {
					if(val.career_path === "EDUCATION"){
						return <EducationExperienceComponent experience={val}></EducationExperienceComponent>
					}
				})}
            </div>
          </div>
          <div className="group ">
            <div className="top">
              <h1>Certifications</h1>
              <FontAwesomeIcon
                className="action-btn edit"
                icon={faPen}
                onClick={() => alert(`Editing`)}
              />
              <FontAwesomeIcon
                className="action-btn delete"
                icon={faTrash}
                onClick={() => alert(`Deleting`)}
              />
            </div>
            <div className="bottom">
				{props.candidateJobDetails.candidate.certificate.map(val => {
					return <CertificationComponent experience={val}></CertificationComponent>
				})}
              {/* <div className="details">
                <h2>GHI Nursing Certificate</h2>
                <p>
                  <span className="heading">Description: </span>
                  {" - "}
                  <span className="text">
                    Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support.
                  </span>
                </p>
                <p>
                  <span className="heading">Issued Date: </span>
                  {" to "}
                  <span className="text">2014</span>
                </p>
                <p>
                  <span className="heading">Certificate link: </span>
                  <span className="text">
                    <Link to="/">
                      https://www.certificatelink.com/certi.pdf
                    </Link>
                  </span>
                </p>
                <p>
                  <span className="heading">Certificate Image: </span>
                  <span className="text">Image here</span>
                </p>
              </div> */}
              {/* <div className="details">
                <h2>GHI Nursing Certificate</h2>
                <p>
                  <span className="heading">Description: </span>
                  {" - "}
                  <span className="text">
                    Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support.
                  </span>
                </p>
                <p>
                  <span className="heading">Issued Date: </span>
                  {" to "}
                  <span className="text">2014</span>
                </p>
                <p>
                  <span className="heading">Certificate link: </span>
                  <span className="text">
                    <Link to="/">
                      https://www.certificatelink.com/certi.pdf
                    </Link>
                  </span>
                </p>
                <p>
                  <span className="heading">Certificate Image: </span>
                  <span className="text">Image here</span>
                </p>
              </div> */}
            </div>
          </div>
          <div className="group ">
            <div className="top">
              <h1>Strengths</h1>
              <FontAwesomeIcon
                className="action-btn edit"
                icon={faPen}
                onClick={() => alert(`Editing`)}
              />
              <FontAwesomeIcon
                className="action-btn delete"
                icon={faTrash}
                onClick={() => alert(`Deleting`)}
              />
            </div>
            <div className="bottom">
              <div className="details">
                <h2>Communication</h2>
                <p>
                  <span className="heading">Typing: </span>
                  {" - "}
                  <span className="text">80% Mastery, 7 Years</span>
                </p>
                <p>
                  <span className="heading">Customer Support: </span>
                  {" to "}
                  <span className="text">70% Mastery, 4 Years</span>
                </p>
                <p>
                  <span className="heading">Patient: </span>
                  <span className="text">40% Patience, 2 Years</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="employer-questions">
        <div className="heading">
          <h2>Employer Questions</h2>
        </div>
        <div className="content">
		<ul className="general-questions">
				{props.candidateJobDetails.submittedAnswer.employerQuestions.map((question, i) => {
					return (
						<li className="general-question" key={i}>
							<h2 className="question">{question.question_name}</h2>
							<div className="options">
								{question.question_type === "text-input" ? (
									<Input type="text" />
								) : question.question_type === "mcq" ? (
									<>
										{question.option_choices.map((option, i) => {
											if (option.question_type === "checkbox") {
												return (
													<div key={i}>
														<input
															key={i}
															className="block-toggle blue"
															id={`${option.id}${option.question_id}`}
															name={`${option.question_id}`}
															type="checkbox"
															disabled
														/>
														<label
															htmlFor={`${option.id}${option.question_id}`}
														>
															{option.option_choice_name}
														</label>
													</div>
												);
											} else if (option.question_type === "boolean") {
												return (
													<div key={i}>
														<input
															key={i}
															className={`fancy-toggle blue ${
																i === 0 ? "yes" : "no"
															}`}
															id={`${option.id}${option.question_id}`}
															name={`${option.question_id}`}
															type="radio"
															disabled
														/>
														<label
															htmlFor={`${option.id}${option.question_id}`}
														>
															<span className="input"></span>
															{option.option_choice_name}
														</label>
													</div>
												);
											}
										})}
									</>
								) : null}
							</div>
						</li>
					);
				})}
			</ul>
          {/* <ul className="general-questions">
            <li className="general-question">
              <h2 className="question">Acceptable Shifts?</h2>
              <div className="options">
                <input
                  className="block-toggle blue"
                  id="shift_7_3"
                  name="shift"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="shift_7_3">7am - 3pm</label>
                <input
                  className="block-toggle blue"
                  id="shift_3_11"
                  name="shift"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="shift_3_11">3pm - 11pm</label>
                <input
                  className="block-toggle blue"
                  id="shift_11_7"
                  name="shift"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="shift_11_7">11pm - 7am</label>
              </div>
            </li>
            <li className="general-question">
              <h2 className="question">Written English Ability?</h2>
              <div className="options">
                <input
                  className="block-toggle blue"
                  id="engAbility_none"
                  name="engAbility"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="engAbility_none">None</label>
                <input
                  className="block-toggle blue"
                  id="engAbility_limited"
                  name="engAbility"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="engAbility_limited">Limited</label>
                <input
                  className="block-toggle blue"
                  id="engAbility_working"
                  name="engAbility"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="engAbility_working">Working</label>
                <input
                  className="block-toggle blue"
                  id="engAbility_fluent"
                  name="engAbility"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="engAbility_fluent">Fluent & Native</label>
              </div>
            </li>
            <li className="general-question">
              <h2 className="question">Certifications?</h2>
              <div className="options">
                <input
                  className="block-toggle blue"
                  id="certifications_cna"
                  name="certifications"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="certifications_cna">
                  Certified Nursing Assistant
                </label>
                <input
                  className="block-toggle blue"
                  id="certifications_hha"
                  name="certifications"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="certifications_hha">Home Health Aid</label>
                <input
                  className="block-toggle blue"
                  id="certifications_cma"
                  name="certifications"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="certifications_cma">
                  Certified Medication Aid
                </label>
                <input
                  className="block-toggle blue"
                  id="certifications_others"
                  name="certifications"
                  type="checkbox"
                  disabled
                />
                <label htmlFor="certifications_others">Others</label>
              </div>
            </li>
            <li className="general-question">
              <h2 className="question">
                Are you Comfortable with the Posted Wage?
              </h2>
              <div className="options">
                <input
                  className="fancy-toggle blue yes radio"
                  name="highSchoolGraduate"
                  type="radio"
                  id="highSchoolGraduateYes"
                  disabled
                />
                <label htmlFor="highSchoolGraduateYes">
                  <span className="input"></span>Yes
                </label>
                <input
                  className="fancy-toggle no radio"
                  name="highSchoolGraduate"
                  type="radio"
                  id="highSchoolGraduateNo"
                  disabled
                />
                <label htmlFor="highSchoolGraduateNo">
                  <span className="input"></span>No
                </label>
              </div>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    candidateJobDetails: state.candidateReducer.jobDetails.data,
  };
}

export default connect(mapStateToProps)(JobApplied);
