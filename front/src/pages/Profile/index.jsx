import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Select from '../../components/FromElements/Select'
import Input from '../../components/FromElements/Input';
import Checkbox from '../../components/FromElements/Checkbox';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import { getProfile } from '../../services/auth';
import { authLogout } from '../../redux/features/AuthSlice';

const Profile = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.userData)

    const [activaTab, setActiveTab] = useState(1);
    const [academicData, setAcademicData] = useState({});
    const [totalCompletedTask, setTotalCompletedTask] = useState(0);

    const userData = useSelector(state => state.auth.userData);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(authLogout());
    }

    const stpeFormHeading = (heading, stepNo) => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{heading}</h3>
        <h3 style={{ letterSpacing: "4px", color: "#FF1949" }}>{stepNo}/6</h3>
    </div>

    const changeSteps = (stepNo) => {
        setActiveTab(stepNo)
    }

    const updateFormStep = (data) => {
        let stepNo = 1;
        if(data?.academicBackground){
            stepNo = 1
        }
        if(data?.studyPreferences){
            stepNo = 2
        }
        if(data?.studyPreferences){
            stepNo = 3
        }
        if(data?.studyGoalsAndCareerAspirations){
            stepNo = 4
        }
        if(data?.additionalInformation){
            stepNo = 5
        }
        if(data?.consentAndAgreement?.consentToUsePersonalInformation){
            stepNo = 6;
        }
        setActiveTab(stepNo);
        setTotalCompletedTask(stepNo)
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    // EP

    const fetchProfile = async () => {
        try {
            const data = { "email": userData.email };
            const response = await getProfile(data)
            console.log("response >>", response);
            setAcademicData(response.data.user)
            // console.log(Object.values(response.data.user.consentAndAgreement));

            updateFormStep(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="profile-body my-4">

                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3 w-100">
                                            <h4>Hi, {user.fullName}</h4>
                                            <p className="text-secondary mb-1">{user.email}</p>
                                            <p className="font-size-sm" style={{ color: "#FF1949", fontWeight: 500, letterSpacing: "0.4px" }}>{totalCompletedTask} of 6 tasks completed</p>
                                            {/* <button className="btn btn-primary">Follow</button>
                                            <button className="btn btn-outline-primary">Message</button> */}
                                            <a href='#' onClick={handleLogout}>Logout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                        <span className="text-secondary">@bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {/* <ul id="progressbar">
                                        <li className="active">Academic Background</li>
                                        <li>Study Preferences</li>
                                        <li>University Preferences</li>
                                        <li>Study Goals and Career Aspirations</li>
                                    </ul> */}
                                    {activaTab === 1 && <div>
                                        {stpeFormHeading("Academic Background", 1)}
                                        <hr />
                                        <p style={{ lineHeight: 1.4, fontSize: "13px" }}>Discover English-taught Master's programs in your field worldwide by answering a few questions.</p>
                                        <Step1
                                            changeSteps={changeSteps}
                                            academicData={academicData}
                                        />
                                    </div>}

                                    {activaTab === 2 && <div>
                                        {stpeFormHeading("Study Preferences", 2)}
                                        <hr />
                                        <Step2
                                            changeSteps={changeSteps}
                                            academicData={academicData}
                                        />
                                    </div>}

                                    {activaTab === 3 && <div>
                                        {stpeFormHeading("University Preferences", 3)}
                                        <Step3
                                            changeSteps={changeSteps}
                                            academicData={academicData}
                                        />
                                    </div>}

                                    {activaTab === 4 && <div>
                                        {stpeFormHeading("Study Goals and Career Aspirations", 4)}
                                        <hr />
                                        <Step4
                                            changeSteps={changeSteps}
                                            academicData={academicData}
                                        />
                                    </div>}

                                    {activaTab === 5 && <div>
                                        {stpeFormHeading("Additional Information", 5)}
                                        <hr />
                                        <Step5
                                            changeSteps={changeSteps}
                                            academicData={academicData}
                                        />
                                    </div>}

                                    {activaTab === 6 && <div>
                                        {stpeFormHeading("Consent and Agreement", 6)}
                                        <hr />
                                        <Step6
                                            changeSteps={changeSteps}
                                            academicData={academicData}
                                        />
                                    </div>}
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile