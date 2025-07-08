import React, { useState, useEffect } from "react";
import { dummyWorkExperiences } from "@/constants/profdummy";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPlusCircle } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import { headers } from "@/constants/url";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const Professional = (props) => {
  const [isAddExp, setAddExp] = useState(true);
  const [isAddEdu, setAddEdu] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const appExpStatus = "Update Experience";
  const appEduStatus = "Update Education";
  const eId = router.query.id;


  const [roleId, setRoleId] = useState(null);
  useEffect(() => {
    if (window.localStorage) {
      const userInfo = JSON?.parse(localStorage?.getItem("userinfo"));
      setRoleId(userInfo?.role_id);
    }
  }, [props]);

  
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "",
      designation: "",
      fromDate: "",
      toDate: "",
      months: "",
      description: "",
      e_id: eId
    }
  ]);

  const [educations, setEducations] = useState([
    {
      id: 1,
      qualification: "",
      specialization: "",
      qualificationType: "",
      yearofPassing: "",
      university: "",
      school: "",
      cgpa: "",
      e_id: eId
    }
  ]);

  //Handler to Add Work Experience Form on Screen

  const handleAddWorkExp = () => {
    if (experiences.length !== 0) {
      setAddExp(false);
      return;
    }
    const newId = Date.now().toString();
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: newId,
        // _id: newId,
        company: "",
        designation: "",
        fromDate: "",
        toDate: "",
        months: "",
        description: "",
        e_id: eId
      }
    ]);
  };

  //Add Button to Add More Work Experience Forms

  const addExperience = () => {
    const newId = Date.now().toString();
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: newId,
        // _id: newId,
        company: "",
        designation: "",
        fromDate: "",
        toDate: "",
        months: "",
        description: "",
        e_id: eId
      }
    ]);
  };

  //Delete Button to Remove Work Experience Forms

  const removeExperience = async (id) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    if (updatedExperiences.length === 0) {
      setAddExp(true);
    }
    try {
      const res = await axios.get(`${url}/api/delete_employee_profession?_id=${id}`, {
        headers: headers
      });
      const apiRes = await res.data;
      if (apiRes.status == true) {
        toast.error(apiRes.message);
        setExperiences((prevExperiences) => prevExperiences.filter((exp) => exp.id !== id));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //Numbers of Month Calc

  const calculateMonthsDifference = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(0, monthDiff);
  };

  //Handle Inputs of Work Experiences

  const handleInputChange = (id, field, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) => {
        if (exp.id === id || exp._id === id) {
          const updatedExp = { ...exp, [field]: value };

          if (field === "fromDate" || field === "toDate") {
            if (updatedExp.fromDate && updatedExp.toDate) {
              updatedExp.months = calculateMonthsDifference(
                updatedExp.fromDate,
                updatedExp.toDate
              ).toString();
            } else {
              updatedExp.months = "";
            }
          }

          return updatedExp;
        }
        return exp;
      })
    );
  };

  //Hanlder to Add Education Form on Screen

  const handleAddEducation = () => {
    if (educations.length !== 0) {
      setAddEdu(false);
      return;
    }
    const newId = Date.now().toString();

    setEducations((prevEducations) => [
      ...prevEducations,
      {
        id: newId,
        qualification: "",
        specialization: "",
        qualificationType: "",
        yearofPassing: "",
        university: "",
        school: "",
        cgpa: "",
        e_id: eId
      }
    ]);

    // setEducations([
    //   ...educations,
    //   {
    //     id: 1,
    //     qualification: "",
    //     specialization: "",
    //     qualificationType: "",
    //     yearofPassing: "",
    //     university: "",
    //     school: "",
    //     cgpa: ""
    //   }
    // ]);
  };

  //Add Button to Add More Education Forms

  const addEducation = () => {
    const newId = Date.now().toString();

    setEducations((prevEducations) => [
      ...prevEducations,
      {
        id: newId,
        qualification: "",
        specialization: "",
        qualificationType: "",
        yearofPassing: "",
        university: "",
        school: "",
        cgpa: "",
        e_id: eId
      }
    ]);
  };

  //Delete Button to Remove Education Forms

  const removeEducation = async (id) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id);
    setEducations(updatedEducations);
    if (updatedEducations.length === 0) {
      setAddEdu(true);
    }

    try {
      const res = await axios.get(`${url}/api/delete_employee_education?_id=${id}`, {
        headers: headers
      });
      const resdata = await res.data;
      if (resdata.status == true) {
        toast.error(resdata.message);
        setEducations((prevEducations) => prevEducations.filter((edu) => edu.id !== id));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //Handle Inputs of Education
  const handleInputChangeEdu = (id, field, value) => {
    // setEducations(educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
    setEducations((prevEducations) =>
      prevEducations.map((edu) => {
        if (edu.id === id || edu._id === id) {
          const updatedEdu = { ...edu, [field]: value };

          if (field === "fromDate" || field === "toDate") {
            if (updatedEdu.fromDate && updatedEdu.toDate) {
              updatedEdu.months = calculateMonthsDifference(
                updatedEdu.fromDate,
                updatedEdu.toDate
              ).toString();
            } else {
              updatedEdu.months = "";
            }
          }

          return updatedEdu;
        }
        return edu;
      })
    );
  };

  // API Works

  ///////////////////////////////////////////// Submit Work Exp Button API  ///////////////////////////////////////////////////////////////////////

  //Submit Handler For Work Experiences API

  const handleSubmit = async () => {
    const modifiedData =  ![1,8,17].includes(roleId) ? {app_status: appExpStatus } : "";
    let endpoints = modifiedData
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${url}/api/add_employee_profession?${endpoints}&e_id=${eId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            secret: "fsdhfgsfuiweifiowefjewcewcebjw"
          },
          body: JSON.stringify({ experiences })
        }
      );

      const result = await response.json();

      if (result.status == true) {
        toast.success(result.message);
        return;
      }
      if (result.status == false) {
        toast.error(result.message);
        return;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /////////////////////////////////////////////////////////// GET API ///////////////////////////////////////////////////////////////////////////////////

  const getExperiencesData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_employee_profession?c_id=1&e_id=${eId}`, {
        headers: headers
      });
      const apiRes = await res.data.data;
      if (apiRes.length !== 0) {
        const formattedExperiences = apiRes.map((exp) => ({
          ...exp,
          id: exp._id
        }));
        setExperiences(formattedExperiences);
        setAddExp(false);
      } else {
        setAddExp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExperiencesData();
  }, []);

  //Submit Handler For Education API

  const handleSubmitEdu = async () => {
    setIsSubmitting(true);
    const modifiedData =  ![1,8].includes(roleId) ? {app_status: appEduStatus } : "";
    let endpoints = modifiedData
    

    // return
    try {
      const response = await fetch(
        `${url}/api/add_employee_education?${endpoints}&e_id=${eId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            secret: "fsdhfgsfuiweifiowefjewcewcebjw"
          },
          body: JSON.stringify({ educations })
        }
      );

      // if (!response.ok) {
      //   throw new Error("Failed to submit data");
      // }

      const result = await response.json();
      if (result.status == true) {
        toast.success(result.message);
        return;
      }
      if (result.status == false) {
        toast.error(result.message);
        return;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //Getting Educations Data From API
  const getEducationsData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_employee_education?c_id=1&e_id=${eId}`, {
        headers: headers
      });
      const apiRes = await res.data.data;
      if (apiRes.length !== 0) {
        const formattedEductaions = apiRes.map((edu) => ({
          ...edu,
          id: edu._id
        }));
        setEducations(formattedEductaions);
        setAddEdu(false);
      } else {
        setAddEdu(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEducationsData();
  }, []);

  //Handler For the Next and Prev Button

  console.log("ProfLength", educations[0]?.cgpa == "", experiences[0]?.description == "");

  const nextPrevHandler = () => {
    const hasValidEducations = educations[0]?.cgpa == "";
    const hasValidExperiences = experiences[0]?.description == "";
    props.formType("Bank");
    // if (!hasValidEducations && !hasValidExperiences) {
    //   props.formType("Bank");
    // } else {
    //   toast.error("Fill the Experiences and Educations Details First");
    // }
  };

  const specializationOptions = {
    graduation: ["B.Com", "BA", "BSc", "BBA", "BTech"],
    high_school: ["Intermediate", "12th Science", "12th Commerce", "12th Arts"],
    phd: ["Computer Science", "Engineering", "Physics", "Chemistry", "Biology"],
    post_graduation: ["M.Com", "MA", "MSc", "MBA", "MTech"],
    ssc: ["10th Standard"],
    technical: ["Diploma", "ITI", "Vocational Course"]
  };


  const [disableNext, setDisableNext] = useState(false);
  useEffect(() => {
    if (props) {
      try {
        if (
          props?.data?.app_status == "Approved By Region" ||
          props?.data?.app_status == "Approved By Zonal" ||
          props?.data?.app_status == "Approved By Business Unit" ||
          props?.data?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(true);
        }
      } catch (error) {
        // console.log("Error", error);
      }
    }
  }, [props]);

  return (
    <>
      <div className="w-full px-6 py-4 ">
        <Toaster position="bottom-center" reverseOrder={false} />
        {isAddExp && (experiences.length > 0 || experiences.length >= 0) ? (
          // {isAddExp ? (
          <>
            <h2 className="text-md px-4 font-semibold bg-gray-100 text-gray-700 mb-4">Work Experience</h2>
            <div className="mb-8 py-8 flex items-center justify-center w-full">
              <button
                onClick={handleAddWorkExp}
                className="bg-orange-500 text-white font-medium py-2 px-4 rounded flex items-center"
              >
                <FiPlus className="flex mx-2"></FiPlus>
                Add experience
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-md px-4 font-semibold bg-gray-100 text-gray-700 mb-4">Work Experience</h2>
            <div className="bg-white p-1 rounded-lg  no-scrollbar md:px-12 h-[450px] overflow-y-auto w-full">
              {/* <h2 className="text-xl font-bold mb-4">Work Experience</h2> */}

              {experiences.map((exp, index) => (
                <div key={exp.id} className="mb-2 p-3 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{index + 1}.</h3>
                    <div className="buttons flex gap-4">
                      <button
                        onClick={() => removeExperience(exp.id ?? exp._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <RiDeleteBin6Line size={24}></RiDeleteBin6Line>
                      </button>
                      <button onClick={addExperience} className="text-green-500 hover:text-green-700">
                        <GoPlusCircle size={23}></GoPlusCircle>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        id={`company-${exp.id || exp._id}`}
                        value={exp.company}
                        onChange={(e) => handleInputChange(exp.id || exp._id, "company", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Previous Company*"
                      />
                      <label
                        htmlFor={`company-${exp.id}`}
                        className="absolute left-3 top-2.5 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Previous Company*
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id={`designation-${exp.id}`}
                        value={exp.designation}
                        onChange={(e) => handleInputChange(exp.id, "designation", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Previous Designation*"
                      />
                      <label
                        htmlFor={`designation-${exp.id}`}
                        className="absolute left-3 top-2.5 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Previous Designation*
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="date"
                        id={`fromDate-${exp.id}`}
                        value={
                          moment(exp.fromDate) ? moment(exp.fromDate).format("YYYY-MM-DD") : exp.fromDate
                        }
                        onChange={(e) => handleInputChange(exp.id, "fromDate", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="From Date*"
                      />
                      <label
                        htmlFor={`fromDate-${exp.id}`}
                        className="absolute left-3 top-2.5 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        From Date*
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="date"
                        id={`toDate-${exp.id}`}
                        value={moment(exp.toDate) ? moment(exp.toDate).format("YYYY-MM-DD") : exp.toDate}
                        onChange={(e) => handleInputChange(exp.id, "toDate", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="To Date*"
                      />
                      <label
                        htmlFor={`toDate-${exp.id}`}
                        className="absolute left-3 top-2.5 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        To Date*
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        id={`months-${exp.id}`}
                        value={exp.months}
                        onChange={(e) => handleInputChange(exp.id, "months", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Number of Months*"
                      />
                      <label
                        htmlFor={`months-${exp.id}`}
                        className="absolute left-3 top-2.5 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Number of Months*
                      </label>
                    </div>
                  </div>

                  <textarea
                    placeholder="Job description*"
                    value={exp.description}
                    onChange={(e) => handleInputChange(exp.id, "description", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mt-4 h-24 resize-none"
                  ></textarea>
                </div>
              ))}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-4 bg-orange-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}

        {/* Starting the Education JSX  */}

        {isAddEdu && (educations.length > 0 || educations.length >= 0) ? (
          <>
            <h2 className="text-md px-4 font-semibold bg-gray-100 text-gray-700 mb-4">Education</h2>
            <div className="mb-8 py-8 flex items-center justify-center w-full">
              <button
                onClick={handleAddEducation}
                className="bg-orange-500 text-white font-medium py-2 px-4 rounded flex items-center"
              >
                <FiPlus className="flex mx-2"></FiPlus>
                Add Education
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-md px-4 font-semibold bg-gray-100 text-gray-700 mb-4">Education</h2>

            <div className="bg-white p-2 rounded-lg  no-scrollbar md:px-12 h-[470px] overflow-y-auto w-full">
              {educations.map((edu, index) => (
                <div key={edu.id} className="mb-6 p-4 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{index + 1}.</h3>
                    <div className="buttons flex gap-4">
                      <button
                        onClick={() => removeEducation(edu.id ?? edu._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <RiDeleteBin6Line size={24}></RiDeleteBin6Line>
                      </button>
                      <button onClick={addEducation} className="text-green-500 hover:text-green-700">
                        <GoPlusCircle size={23}></GoPlusCircle>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                      <select
                        type="text"
                        id={`qualification-${edu.id || edu._id}`}
                        value={edu.qualification}
                        onChange={(e) =>
                          handleInputChangeEdu(edu.id || edu._id, "qualification", e.target.value)
                        }
                        className=" bg-white text-sm w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                      >
                        <option value="">--Select Option--</option>
                        <option value="graduation">Graduation</option>
                        <option value="high_school">High Secondary</option>
                        <option value="phd">PhD</option>
                        <option value="post_graduation">Post Graduation</option>
                        <option value="ssc">SSC</option>
                        <option value="technical">Technical</option>
                      </select>
                      <label
                        htmlFor={`qualification-${edu.id}`}
                        className="absolute left-3 top-0 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Qualification*
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        type="text"
                        id={`specialization-${edu.id}`}
                        value={edu.specialization}
                        onChange={(e) => handleInputChangeEdu(edu.id, "specialization", e.target.value)}
                        className=" text-sm bg-white w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                      >
                        {/* <option value="">--Select Option--</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="University">University</option> */}

                        <option value="">--Select Option--</option>
                        {edu.qualification &&
                          specializationOptions[edu.qualification].map((spec, index) => (
                            <option key={index} value={spec}>
                              {spec}
                            </option>
                          ))}
                      </select>
                      <label
                        htmlFor={`specialization-${edu.id}`}
                        className="absolute left-3 top-0 text-gray-500 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Specialization*
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        type="text"
                        id={`qualificationType-${edu.id}`}
                        value={edu.qualificationType}
                        onChange={(e) => handleInputChangeEdu(edu.id, "qualificationType", e.target.value)}
                        className=" text-sm bg-white w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                      >
                        <option value="">--Select Option--</option>
                        <option value="full_time">Full Time</option>
                        <option value="online">Online</option>
                        <option value="part_time">Part Time</option>
                      </select>
                      <label
                        htmlFor={`qualificationType-${edu.id}`}
                        className="absolute left-3 top-0 text-gray-800 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Qualification Type*
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        id={`yearofPassing-${edu.id}`}
                        value={edu.yearofPassing}
                        onChange={(e) => handleInputChangeEdu(edu.id, "yearofPassing", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Number of Months*"
                      />
                      <label
                        htmlFor={`yearofPassing-${edu.id}`}
                        className="absolute left-3 top-2.5 text-gray-800 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Year of Passing*
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id={`university-${edu.id}`}
                        value={edu.university}
                        onChange={(e) => handleInputChangeEdu(edu.id, "university", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Number of Months*"
                      />
                      <label
                        htmlFor={`university-${edu.id}`}
                        className="absolute left-3 top-2.5 text-gray-800 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        University/Board*
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id={`school-${edu.id}`}
                        value={edu.school}
                        onChange={(e) => handleInputChangeEdu(edu.id, "school", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Number of Months*"
                      />
                      <label
                        htmlFor={`school-${edu.id}`}
                        className="absolute left-3 top-2.5 text-gray-800 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        School/College*
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        id={`cgpa-${edu.id}`}
                        value={edu.cgpa}
                        onChange={(e) => handleInputChangeEdu(edu.id, "cgpa", e.target.value)}
                        className="w-full px-3 py-2.5 border-b-2 rounded-md peer placeholder-transparent focus:outline-none"
                        placeholder="Number of Months*"
                      />
                      <label
                        htmlFor={`cgpa-${edu.id}`}
                        className="absolute left-3 top-2.5 text-gray-800 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                      >
                        Grade/CGPA/Percentage*
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSubmitEdu}
                disabled={isSubmitting}
                className="mt-4 bg-orange-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
        {router.query.type === "Edit" && (
          <div className="flex items-center justify-center w-full gap-4 py-4">
            <button
              className="text-center cursor-pointer rounded-md bg-green-500 text-white py-1 px-4 text-lg"
              onClick={() => props.formType("Family")}
            >
              Prev
            </button>
            <button
                disabled={disableNext}
              className=" text-center cursor-pointer rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
              onClick={nextPrevHandler}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Professional;
