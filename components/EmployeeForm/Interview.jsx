import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import { headers } from "@/constants/url";
import { useRouter } from "next/router";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const Interview = (props) => {
  const router = useRouter();
  const eId = router.query.id;
  const appStatus = "Update Interview";
  const [ratingScale, setRatingScale] = useState({
    poor: false,
    fair: false,
    average: false,
    good: false,
    excellent: false
  });
  const defaultLength = 5;
  const expertiseOptions = [
    "Party Rapport",
    "Potential Farmer Data Bank",
    "Communication Skills",
    "Experience of same H.Q.",
    "Career Optimism"
  ];
  const [formData, setFormData] = useState({
    name: "",
    interview_date: "",
    interview_mode: "Face to Face",
    interview_rating: "",
    position: "",
    // interviews: { interviews: [] },
    // interviews: { interviews: Array.from({ length: defaultLength }, () => ({})) },
    interviews: {
      interviews: expertiseOptions.map((option) => ({
        area_of_expertise: option,
        rating: "",
        remarks: ""
      }))
    },
    first_interview_taken_by: "",
    first_interview_status: "",
    first_interview_date: "",
    first_interview_sign: "",
    second_interview_taken_by: "",
    second_interview_status: "",
    second_interview_date: "",
    second_interview_sign: "",
    final_interview_taken_by: "",
    final_interview_status: "",
    final_interview_date: "",
    final_interview_sign: "",
    current_position: "",
    current_ctc: "",
    position_offered: "",
    expected_ctc: "",
    joining_date: "",
    actual_date_of_joining: "",
    ratingScale: {
      poor: false,
      fair: false,
      average: false,
      good: false,
      excellent: false
    },
    app_status: "Update Interview",
    approvalFee: "",
    mostExpensiveBudget: "",
    in_fest_amount_e: "",
    in_special_allowance_e: "",
    in_other_amt_e: "",
    in_bonus_amt_d: "",
    in_other_amt_d: "",
    tds_section: "",
    tds_percent: "",

    functionalEmpCode: "",
    functionalManager: "",
    reportingEmpCode: "",
    repotingManager: "",
    zoneEMPCode: "",
    zoneReportingManager: "",

    company: "",
    bg: "",
    bu: "",
    zone: "",
    region: "",
    territory: "",
    reportingOffice: "",
    remarks: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log("tds_section", formData);

  const handleExpertiseChange = (index, field, value) => {
    const newExpertise = [...formData.interviews.interviews];
    if (!newExpertise[index]) {
      newExpertise[index] = {
        c_id: 1,
        e_id: Number(eId)
      };
    }
    newExpertise[index] = {
      ...newExpertise[index],
      [field]: value,
      c_id: 1,
      e_id: Number(eId)
    };
    setFormData((prevState) => ({
      ...prevState,
      interviews: { interviews: newExpertise }
    }));
  };

  const handleRatingScaleChange = (rating) => {
    // const newRatingScale = {
    //   poor: false,
    //   fair: false,
    //   average: false,
    //   good: false,
    //   excellent: false,
    //   [rating]: true
    // };

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   ratingScale: newRatingScale,
    //   interview_rating: rating
    // }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      interview_rating: rating
    }));
  };

  useEffect(() => {
    if (formData.tds_section === "" || formData.tds_section === undefined) {
      setFormData((prev) => ({ ...prev, tds_percent: "0" }));
    } else {
      setFormData((prev) => ({ ...prev, tds_percent: "1" }));
    }
  }, [formData.tds_section]);

  useEffect(() => {
    if (window.localStorage) {
      const userInfo = JSON?.parse(localStorage?.getItem("userinfo"));
      setRoleId(userInfo?.role_id);
      setcid(userInfo.c_id);
      settid(userInfo.t_id);
    }
  }, [props]);

  ///////////////////////////////// API WORK ////////////////////////////////////////////

  // const interViewPostHandle = async () => {
  //   console.log("formDaad", formData)

  //   // return
  //   try {
  //     const res = await axios.post(
  //       `${url}/api/add_employee_interview?e_id=${eId}&c_id=1&interview_date=${
  //         formData?.interview_date === undefined ? new Date() : formData?.interview_date
  //       }&interview_mode=${
  //         formData.interview_mode === undefined ? "Face to Face" : formData.interview_mode
  //       }&position=${formData.position === undefined ? "" : formData.position}&first_interview_taken_by=${
  //         formData.first_interview_taken_by === undefined ? "" : formData.first_interview_taken_by
  //       }&second_interview_taken_by=${
  //         formData.second_interview_taken_by === undefined ? "" : formData.second_interview_taken_by
  //       }&final_interview_taken_by=${
  //         formData.final_interview_taken_by === undefined ? "" : formData.final_interview_taken_by
  //       }&first_interview_status=${
  //         formData.first_interview_status === undefined ? "" : formData.first_interview_status
  //       }&second_interview_status=${
  //         formData.second_interview_status === undefined ? "" : formData.second_interview_status
  //       }&final_interview_status=${
  //         formData.final_interview_status === undefined ? "" : formData.final_interview_status
  //       }&current_position=${
  //         formData.current_position === undefined ? "" : formData.current_position
  //       }&current_ctc=${formData.current_ctc === undefined ? "" : formData.current_ctc}&position_offered=${
  //         formData.position_offered === undefined ? "" : formData.position_offered
  //       }&expected_ctc=${formData.expected_ctc === undefined ? "" : formData.expected_ctc}&joining_date=${
  //         formData.joining_date === undefined ? new Date() : formData?.joining_date
  //       }&actual_date_of_joining=${
  //         formData.actual_date_of_joining === undefined ? new Date() : formData.actual_date_of_joining
  //       }&interview_rating=${
  //         formData.interview_rating === undefined ? "" : formData.interview_rating
  //       }&first_interview_date=${
  //         formData.first_interview_date === undefined ? "" : formData.first_interview_date
  //       }&second_interview_date=${
  //         formData.second_interview_date === undefined ? "" : formData.second_interview_date
  //       }&final_interview_date=${
  //         formData.final_interview_date === undefined ? "" : formData.final_interview_date
  //       }&first_interview_sign=${
  //         formData.first_interview_sign === undefined ? "" : formData.first_interview_sign
  //       }&second_interview_sign=${
  //         formData.second_interview_sign === undefined ? "" : formData.second_interview_sign
  //       }&final_interview_sign=${
  //         formData.final_interview_sign === undefined ? "" : formData.final_interview_sign
  //       }&app_status=${appStatus}&in_appl_amt=${
  //         formData.approvalFee === undefined ? "" : formData.approvalFee
  //       }&in_expence_amt=${
  //         formData.mostExpensiveBudget === undefined ? "" : formData.mostExpensiveBudget
  //       }&in_fest_amount_e=${
  //         formData.in_fest_amount_e === (undefined || null) ? 0 : formData.in_fest_amount_e
  //       }&in_special_allowance_e=${
  //         formData.in_special_allowance_e === undefined ? 0 : formData.in_special_allowance_e
  //       }&in_other_amt_e=${
  //         formData.in_other_amt_e === undefined ? 0 : formData.in_other_amt_e
  //       }&in_bonus_amt_d=${
  //         formData.in_bonus_amt_d === undefined ? "" : formData.in_bonus_amt_d
  //       }&in_other_amt_d=${
  //         formData.in_other_amt_d === undefined ? "" : formData.in_other_amt_d
  //       }&tds_section=${formData.tds_section === undefined ? "" : formData.tds_section}&tds_percent=${
  //         formData.tds_percent === undefined ? "" : formData.tds_percent
  //       }
  //       &functionalEmpCode=${
  //         formData.functionalEmpCode === undefined ? "" : formData.functionalEmpCode
  //       }&functionalManager=${formData.functionalManager === undefined ? "" : formData.functionalManager}

  //       &reportingEmpCode=${
  //         formData.reportingEmpCode === undefined ? "" : formData.reportingEmpCode
  //       }&repotingManager=${formData.repotingManager === undefined ? "" : formData.repotingManager}

  //       &zoneEMPCode=${formData.zoneEMPCode === undefined ? "" : formData.zoneEMPCode}&zoneReportingManager=${
  //         formData.zoneReportingManager === undefined ? "" : formData.zoneReportingManager
  //       }

  //       &company=${formData.company === undefined ? "" : formData.company}

  //       &bg=${formData.bg === undefined ? "" : formData.bg}

  //       &bu=${formData.bu === undefined ? "" : formData.bu}
  //       &region=${formData.region === undefined ? "" : formData.region}

  //       &territory=${formData.territory === undefined ? "" : formData.territory}
  //       &reporting_hq=${formData.reportingOffice === undefined ? "" : formData.reportingOffice}
  //       &remarks=${formData.remarks === undefined ? "" : formData.remarks}

  //       `,
  //       JSON.stringify(formData.interviews),
  //       { headers: headers }
  //     );
  //     const resAPI = await res.data;
  //     console.log("Hello API", resAPI);
  //     if (!resAPI) {
  //       return;
  //     }
  //     toast.success(resAPI.message);
  //     setTimeout(() => {
  //       props.formType("DealerMap");
  //     }, 1500);
  //   } catch (error) {
  //     const errorMessage = error?.response?.data?.message;
  //     if (errorMessage) {
  //       toast.error(errorMessage);
  //     }
  //     console.log("error", error);
  //   }
  // };

  const interViewPostHandle = async () => {
    try {
      // Create base URL with required parameters
      let apiUrl = `${url}/api/add_employee_interview?e_id=${eId}&c_id=1`;

      // Create params object without app_status
      const baseParams = {
        interview_date: formData?.interview_date === undefined ? new Date() : formData?.interview_date,
        interview_mode: formData.interview_mode === undefined ? "Face to Face" : formData.interview_mode,
        position: formData.position === undefined ? "" : formData.position,
        first_interview_taken_by:
          formData.first_interview_taken_by === undefined ? "" : formData.first_interview_taken_by,
        second_interview_taken_by:
          formData.second_interview_taken_by === undefined ? "" : formData.second_interview_taken_by,
        final_interview_taken_by:
          formData.final_interview_taken_by === undefined ? "" : formData.final_interview_taken_by,
        first_interview_status:
          formData.first_interview_status === undefined ? "" : formData.first_interview_status,
        second_interview_status:
          formData.second_interview_status === undefined ? "" : formData.second_interview_status,
        final_interview_status:
          formData.final_interview_status === undefined ? "" : formData.final_interview_status,
        current_position: formData.current_position === undefined ? "" : formData.current_position,
        current_ctc: formData.current_ctc === undefined ? "" : formData.current_ctc,
        position_offered: formData.position_offered === undefined ? "" : formData.position_offered,
        expected_ctc: formData.expected_ctc === undefined ? "" : formData.expected_ctc,
        joining_date: formData.joining_date === undefined ? new Date() : formData?.joining_date,
        actual_date_of_joining:
          formData.actual_date_of_joining === undefined ? new Date() : formData.actual_date_of_joining,
        interview_rating: formData.interview_rating === undefined ? "" : formData.interview_rating,
        first_interview_date:
          formData?.first_interview_date === undefined || formData.first_interview_date == null
            ? ""
            : formData?.first_interview_date,
        second_interview_date:
          formData.second_interview_date === undefined || formData.second_interview_date == null
            ? ""
            : formData.second_interview_date,
        final_interview_date:
          formData.final_interview_date === undefined || formData.final_interview_date == null
            ? ""
            : formData.final_interview_date,
        first_interview_sign:
          formData.first_interview_sign === undefined ? "" : formData.first_interview_sign,
        second_interview_sign:
          formData.second_interview_sign === undefined ? "" : formData.second_interview_sign,
        final_interview_sign:
          formData.final_interview_sign === undefined ? "" : formData.final_interview_sign,
        in_appl_amt: formData.approvalFee === undefined ? "" : formData.approvalFee,
        in_expence_amt: formData.mostExpensiveBudget === undefined ? "" : formData.mostExpensiveBudget,
        in_fest_amount_e: formData.in_fest_amount_e === (undefined || null) ? 0 : formData.in_fest_amount_e,
        in_special_allowance_e:
          formData.in_special_allowance_e === undefined ? 0 : formData.in_special_allowance_e,
        in_other_amt_e: formData.in_other_amt_e === undefined ? 0 : formData.in_other_amt_e,
        in_bonus_amt_d: formData.in_bonus_amt_d === undefined ? "" : formData.in_bonus_amt_d,
        in_other_amt_d: formData.in_other_amt_d === undefined ? "" : formData.in_other_amt_d,
        tds_section: formData.tds_section === undefined ? "" : formData.tds_section,
        tds_percent: formData.tds_percent === undefined ? "" : formData.tds_percent,
        functionalEmpCode: formData.functionalEmpCode === undefined ? "" : formData.functionalEmpCode,
        functionalManager: formData.functionalManager === undefined ? "" : formData.functionalManager,
        reportingEmpCode: formData.reportingEmpCode === undefined ? "" : formData.reportingEmpCode,
        repotingManager: formData.repotingManager === undefined ? "" : formData.repotingManager,
        zoneEMPCode: formData.zoneEMPCode === undefined ? "" : formData.zoneEMPCode,
        zoneReportingManager:
          formData.zoneReportingManager === undefined ? "" : formData.zoneReportingManager,
        company: formData.company === undefined ? "" : formData.company,
        bg: formData.bg === undefined ? "" : formData.bg,
        bu: formData.bu === undefined ? "" : formData.bu,
        region: formData.region === undefined ? "" : formData.region,
        territory: formData.territory === undefined ? "" : formData.territory,
        reporting_hq: formData.reportingOffice === undefined ? "" : formData.reportingOffice,
        remarks: formData.remarks === undefined ? "" : formData.remarks
      };

      const params = ![9, 4, 5, 1,8, 17].includes(roleId) ? { ...baseParams, app_status: appStatus } : baseParams;

      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const fullUrl = `${apiUrl}&${queryString}`;

      const res = await axios.post(fullUrl, JSON.stringify(formData.interviews), { headers: headers, params:{roleId} });

      const resAPI = await res.data;
      if (!resAPI) {
        return;
      }
      toast.success(resAPI.message);
      setTimeout(() => {
        props.formType("DealerMap");
      }, 1500);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
      console.log("error", error);
    }
  };

  const getInterviewData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: { c_id: 1, e_id: eId, interview: true }
      });
      const resApi = res.data.data;
      const employeeData = resApi.employeeData;
      const interviewData = resApi.interviews;

      // const filledInterviewData =
      //   interviewData.length === 0
      //     ? Array.from({ length: defaultLength }, () => ({ length: defaultLength }))
      //     : interviewData;

      // const filledInterviewData = Array.from({ length: defaultLength }, (_, index) => ({
      //   ...interviewData[index]
      // }));

      // const filledInterviewData = expertiseOptions.map((option, index) => ({
      //   area_of_expertise: option,
      //   rating: interviewData[index]?.rating || "",
      //   remarks:interviewData[index]?.remarks || "",
      //   c_id:interviewData?.c_id || "",
      //   e_id:interviewData?.e_id || "",
      // }));

      const filledInterviewData = expertiseOptions.map((option, index) => {
        const interview = interviewData?.find((data) => data.area_of_expertise === option) || {};
        return {
          area_of_expertise: option,
          rating: interview.rating || "",
          remarks: interview.remarks || "",
          c_id: interview.c_id || "",
          e_id: interview.e_id || ""
        };
      });

      setFormData({
        ...formData,
        name: (employeeData.fname || "") + (employeeData.mname || "") + (employeeData.lname || ""),
        interviews: { interviews: filledInterviewData },
        position: employeeData.emppos,
        interview_date: employeeData.interview_date,
        interview_mode: employeeData.interview_mode,
        // interview_rating: employeeData.interview_rating,
        first_interview_taken_by: employeeData.first_interview_taken_by,
        first_interview_status: employeeData.first_interview_status,
        first_interview_date: employeeData?.first_interview_date,
        first_interview_sign: employeeData.first_interview_sign,
        second_interview_taken_by: employeeData.second_interview_taken_by,
        second_interview_status: employeeData.second_interview_status,
        second_interview_date: employeeData.second_interview_date,
        second_interview_sign: employeeData.second_interview_sign,
        final_interview_taken_by: employeeData.final_interview_taken_by,
        final_interview_status: employeeData.final_interview_status,
        final_interview_date: employeeData.final_interview_date,
        final_interview_sign: employeeData.final_interview_sign,
        current_position: employeeData.current_position,
        current_ctc: employeeData.current_ctc,
        position_offered: employeeData.position_offered,
        expected_ctc: employeeData.expected_ctc,
        joining_date: employeeData.joining_date,
        actual_date_of_joining: employeeData.actual_date_of_joining,

        functionalEmpCode: employeeData.functionalEmpCode,
        functionalManager: employeeData.functionalManager,
        reportingEmpCode: employeeData.reportingEmpCode,
        repotingManager: employeeData.repotingManager,
        zoneEMPCode: employeeData.zoneEMPCode,
        zoneReportingManager: employeeData.zoneReportingManager,

        company: employeeData.c_id,
        bg: employeeData.bg_id,
        bu: employeeData.bu_id,
        region: employeeData.r_id,
        zone: employeeData.z_id,
        territory: employeeData.t_id,
        reportingOffice: employeeData?.reporting_hq,
        remarks: employeeData.remarks,

        approvalFee: employeeData.in_appl_amt,
        mostExpensiveBudget: employeeData.in_expence_amt,
        in_fest_amount_e: employeeData.in_fest_amount_e ?? 0,
        in_special_allowance_e: employeeData.in_special_allowance_e,
        in_other_amt_e: employeeData.in_other_amt_e,
        in_bonus_amt_d: employeeData.in_bonus_amt_d,
        in_other_amt_d: employeeData.in_other_amt_d,
        tds_section: employeeData.tds_section,
        tds_percent: employeeData.tds_percent
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        ...employeeData,
        name: employeeData.fname + " " + employeeData.mname + " " + employeeData.lname,
        interviews: { interviews: filledInterviewData },
        interview_rating: employeeData.interview_rating || "",
        reportingOffice: (employeeData?.reporting_hq || "").trim()
      }));

      console.log("APIRES", formData.interview_rating);
    } catch (error) {
      console.error("Error fetching interview data", error);
    }
  };

  useEffect(() => {
    getInterviewData();
  }, []);

  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     tds_percent:"0"
  //   }));
  // }, []);

  const [disableNext, setDisableNext] = useState(false);
  // useEffect(() => {
  //   if (props) {
  //     try {
  //       if (
  //         props?.data?.app_status == "Approved By Region" ||
  //         props?.data?.app_status == "Approved By Zonal" ||
  //         props?.data?.app_status == "Approved By Business Unit" ||
  //         props?.data?.app_status == "Approved By Zonal A/c Manager"
  //       ) {
  //         setDisableNext(true);
  //       }
  //       if (roleId == 9 || roleId == 5 || roleId == 4 || roleId == 8 || roleId == 1) {
  //         setDisableNext(false);
  //       }
  //     } catch (error) {
  //       // console.log("Error", error);
  //     }
  //   }
  // }, [props]);

  

  //Auto Calculate the Rating on the Basis of Rating Marks

  const ratingScaleMapping = {
    1: "poor",
    2: "fair",
    3: "average",
    4: "good",
    5: "excellent"
  };

  const calculateAverageRating = () => {
    const ratings = formData.interviews.interviews
      .map((interview) => parseFloat(interview.rating))
      .filter((rating) => !isNaN(rating));
    if (ratings.length === 0) return 0;

    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };

  useEffect(() => {
    const averageRating = calculateAverageRating();

    const closestRating = Math.round(averageRating);

    const selectedRatingScale = ratingScaleMapping[closestRating] || "poor";

    setFormData((prevData) => ({
      ...prevData,
      ratingScale: {
        poor: selectedRatingScale === "poor",
        fair: selectedRatingScale === "fair",
        average: selectedRatingScale === "average",
        good: selectedRatingScale === "good",
        excellent: selectedRatingScale === "excellent"
      },
      interview_rating: selectedRatingScale
    }));
  }, [formData.interviews]);

  console.log("OFRMF", props);

  //////////////////////////////////////////////////////////// Extra tabs from HR tab ///////////////////////////////////////////////////////////////////

  const [ctcData, setCtcData] = useState({
    employeeCode: "",
    department: "",
    subDepartment: "",
    designation: "",
    workEmail: "",
    doj: "",
    doc: "",
    functionalEmpCode: "",
    functionalManager: "",
    retirementDate: "",
    sapVendorCode: "",
    reportingEmpCode: "",
    repotingManager: "",
    zoneEMPCode: "",
    zoneReportingManager: "",
    hrEMPCode: "",
    hrManager: "",
    reportingOffice: "",
    emp_category: "",
    employementType: "",
    employeeStatus: "",
    joiningStatus: "",
    agreeStartDate: "",
    agreeEndDate: "",
    agreeRenewalStatus: "",
    company: "",
    estatus: "",
    bg: "",
    bu: "",
    zone: "",
    region: "",
    territory: "",
    remarks: "",

    gpa_policy: true,
    whatsup: true,
    approvalFee: "",
    mostExpensiveBudget: "",
    hr_fest_amount_e: "",
    hr_special_allowance_e: "",
    hr_other_amt_e: "",
    hr_bonus_amt_d: "",
    hr_other_amt_d: "",
    tds_section: "",
    tds_percent: ""
  });

 

  const [companyData, setCompanyData] = useState([]);

  const [roleId, setRoleId] = useState(null);
  const [cId, setcid] = useState(null);
  const [tId, settid] = useState(null);

  const [tidd, settidd] = useState(null);

  // Getting Company Information for the dropdown values
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setCompanyData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const [bgData, setBGData] = useState([]);
  // Getting Company Information for the dropdown values
  const getBGInfo = async (company) => {
    try {
      const respond = await axios.get(`${url}/api/get_company_wise_business_segment/${company}`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setBGData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
      setBGData([]);
    }
  };

  useEffect(() => {
    if (!formData.company) return;
    getBGInfo(formData.company);
  }, [formData.company]);

  const [buData, setBUData] = useState([]);

  const getBUInfo = async (company, businessSegmentId) => {
    console.log(company, businessSegmentId, "Kiska h ye tumko intzar me hu na!!");
    try {
      const respond = await axios.get(`${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setBUData(apires.filter((item) => Number(item.c_id) === Number(company)));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!formData.bg && !formData.company) return;
    getBUInfo(formData.company, formData.bg);
  }, [formData.bg, formData.company]);

  const [zoneData, setAllZoneData] = useState([]);

  const getAllZoneData = async (company, segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers
      });

      const apires = await respond.data.data;

      setAllZoneData(
        apires
          .filter((item) => Number(item.c_id) === Number(company))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (formData.bg && formData.company && formData.bu) {
      getAllZoneData(formData.company, formData.bg, formData.bu);
    } else {
      return;
    }
  }, [formData.bg, formData.company, formData.bu]);

  const [regionData, setAllRegionData] = useState([]);
  const getAllRegionData = async (company, segmentId, businessUnitId, zone) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers
      });

      const apires = await respond.data.data;

      setAllRegionData(
        apires
          .filter((item) => Number(item.c_id) === Number(company))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zone))
      );
    } catch (error) {}
  };

  const [territoryData, setTerritoryData] = useState([]);
  const getAllTerritoryData = async (company, segmentId, businessUnitId, zone, region) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers
      });

      const apires = await respond.data.data;

      setTerritoryData(
        apires
          .filter((item) => Number(item.c_id) === Number(company))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zone))
          .filter((item) => Number(item.r_id) === Number(region))
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const [repoOfcData, setRepoOfcData] = useState([]);

  const getReportingOfcData = async (tid, cId) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_office_hq?t_id=${tid}&c_id=${cId}`, {
        headers: headers
      });
      const status = await respond.data;
      const apires = await respond.data.data;
      if (status.status) {
        setRepoOfcData(apires);
      }

      console.log("Get Reporting", apires);
    } catch (error) {
      setRepoOfcData([]);
    }
  };

  useEffect(() => {
    if ((props?.data?.t_id, props?.data?.c_id)) {
      getReportingOfcData(props?.data?.t_id, props?.data?.c_id);
    } else {
      setRepoOfcData([]);
    }
  }, [props]);

  useEffect(() => {
    if (formData.bg && formData.company && formData.bu && formData.zone) {
      getAllRegionData(formData.company, formData.bg, formData.bu, formData.zone);
    } else {
      return;
    }
  }, [formData.bg, formData.company, formData.bu, formData.zone]);

  useEffect(() => {
    if (formData.bg && formData.company && formData.bu && formData.zone && formData.region) {
      getAllTerritoryData(formData.company, formData.bg, formData.bu, formData.zone, formData.region);
    } else {
      return;
    }
  }, [formData.bg, formData.company, formData.bu, formData.zone, formData.region]);


  useEffect(() => {
    switch (roleId) {
      case 1:
      case 4:
      case 5:
      case 8:
      case 9:
        if (
          props?.data?.app_status == "Approved By Region" ||
          props?.data?.app_status == "Approved By Zonal" ||
          props?.data?.app_status == "Approved By Business Unit" ||
          props?.data?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(false);
        }
        break;
      default:
        if (
          props?.data?.app_status == "Approved By Region" ||
          props?.data?.app_status == "Approved By Zonal" ||
          props?.data?.app_status == "Approved By Business Unit" ||
          props?.data?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(true);
        }
    }
  }, [props]);

  return (
    <div className="container mx-auto p-2 sm:p-4 text-sm sm:text-base">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 500
        }}
      />
      <h1 className="text-xl text-center sm:text-lg font-bold mb-4">INTERVIEW ASSESSMENT</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            disabled
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Date of Interview:</label>
          <input
            type="date"
            name="interview_date"
            value={
              moment(formData.interview_date)
                ? moment(formData.interview_date).format("YYYY-MM-DD")
                : formData.interview_date
            }
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Interview Mode:</label>
          <input
            type="text"
            name="interview_mode"
            value={formData.interview_mode}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Position:</label>
          <input
            type="text"
            name="position"
            disabled
            value={formData.position}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
      </div>

      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Earning
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Application Fee Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            name="approvalFee"
            placeholder="Application Fee Amt."
            value={formData.approvalFee}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Expense Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Expense Amt."
            name="mostExpensiveBudget"
            value={formData.mostExpensiveBudget}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"> </small> Festival Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Festival Amt"
            name="in_fest_amount_e"
            disabled
            value={formData.in_fest_amount_e ?? 0}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Spec Incentive Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            name="in_special_allowance_e"
            placeholder="Spec Incentive Amt"
            disabled
            value={formData.in_special_allowance_e ?? 0}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Other Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Other Amt."
            name="in_other_amt_e"
            disabled
            value={formData.in_other_amt_e ?? 0}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Deduction
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Bonus Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Bonus"
            name="in_bonus_amt_d"
            value={formData.in_bonus_amt_d}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Other Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Other Amt"
            name="in_other_amt_d"
            value={formData.in_other_amt_d}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        TDS
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Type of TDS
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            name="tds_section"
            value={formData.tds_section}
            onChange={handleInputChange}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              --select--
            </option>
            <option value="194_c">194 C - Contractor</option>
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> TDS %
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            name="tds_percent"
            value={formData.tds_percent}
            onChange={handleInputChange}
          >
            {/* <option value="" className="focus:outline-none focus:border-b bg-white">
              --select--
            </option> */}
            {formData.tds_section == "" || formData.tds_section == undefined ? (
              <option value="0">0%</option>
            ) : (
              <option value="1">1%</option>
            )}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-1 sm:p-2">Expertise/Systems/Training</th>
              <th className="border p-1 sm:p-2">Rating</th>
              <th className="border p-1 sm:p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formData.interviews.interviews.map((item, index) => (
              <tr key={index}>
                {/* <td className="border p-1 sm:p-2">
                  <input
                    type="text"
                    name="area_of_expertise"
                    value={item.area_of_expertise || ""}
                    onChange={(e) => handleExpertiseChange(index, "area_of_expertise", e.target.value)}
                    className="w-full text-xs sm:text-sm"
                  />
                </td> */}
                <td className="border p-1 sm:p-2">
                  <span className="text-xs sm:text-sm font-medium">{item.area_of_expertise}</span>
                </td>
                <td className="border p-1 sm:p-2">
                  <input
                    type="number"
                    name="rating"
                    value={item?.rating || ""}
                    // onChange={(e) => handleExpertiseChange(index, "rating", e.target.value)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 1 && value <= 5) {
                        handleExpertiseChange(index, "rating", value);
                      } else {
                        handleExpertiseChange(index, "rating", "");
                      }
                    }}
                    min="1"
                    max="5"
                    step="1"
                    className="w-full text-xs sm:text-sm outline-none"
                  />
                </td>
                <td className="border p-1 sm:p-2">
                  <input
                    type="text"
                    name="remarks"
                    value={item?.remarks || ""}
                    onChange={(e) => handleExpertiseChange(index, "remarks", e.target.value)}
                    className="w-full text-xs sm:text-sm outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4 text-xs sm:text-sm">
        {Object.entries(formData.ratingScale).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              id={key}
              // checked={formData.interview_rating ? formData.interview_rating : value}
              checked={formData.interview_rating === key}
              onChange={() => handleRatingScaleChange(key)}
              className="mr-1 sm:mr-2"
            />
            <label htmlFor={key} className="capitalize">
              {key}
            </label>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">First Interview:</label>
          <input
            type="text"
            name="first_interview_taken_by"
            value={formData.first_interview_taken_by}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Status:</label>
          <select
            name="first_interview_status"
            value={formData.first_interview_status}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          >
            <option value="">Select</option>
            <option value="Suitable">Suitable</option>
            <option value="Not Suitable">Not Suitable</option>
            <option value="Hold">Hold</option>
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Date:</label>
          <input
            type="date"
            name="first_interview_date"
            placeholder="DD/MM/YYYY"
            // value={
            //   moment(formData.first_interview_date)
            //     ? moment(formData.first_interview_date).format("YYYY-MM-DD")
            //     : formData.first_interview_date
            // }
            value={
              formData.first_interview_date ? moment(formData.first_interview_date).format("YYYY-MM-DD") : ""
            }
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Sign:</label>
          <input
            type="text"
            name="first_interview_sign"
            value={formData.first_interview_sign}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Second Interview:</label>
          <input
            type="text"
            name="second_interview_taken_by"
            value={formData.second_interview_taken_by}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Status:</label>
          <select
            name="second_interview_status"
            value={formData.second_interview_status}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          >
            <option value="">Select</option>
            <option value="Suitable">Suitable</option>
            <option value="Not Suitable">Not Suitable</option>
            <option value="Hold">Hold</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Date:</label>
          <input
            type="date"
            name="second_interview_date"
            // value={
            //   moment(formData.second_interview_date)
            //     ? moment(formData.second_interview_date).format("YYYY-MM-DD")
            //     : formData.second_interview_date
            // }
            value={
              formData.second_interview_date
                ? moment(formData.second_interview_date).format("YYYY-MM-DD")
                : ""
            }
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Sign:</label>
          <input
            type="text"
            name="second_interview_sign"
            value={formData.second_interview_sign}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Final Interview:</label>
          <input
            type="text"
            name="final_interview_taken_by"
            value={formData.final_interview_taken_by}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Status:</label>
          <select
            name="final_interview_status"
            value={formData.final_interview_status}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          >
            <option value="">Select</option>
            <option value="Suitable">Suitable</option>
            <option value="Not Suitable">Not Suitable</option>
            <option value="Hold">Hold</option>
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Date:</label>
          <input
            type="date"
            name="final_interview_date"
            // value={
            //   moment(formData.final_interview_date)
            //     ? moment(formData.final_interview_date).format("YYYY-MM-DD")
            //     : formData.final_interview_date
            // }
            value={
              formData.final_interview_date ? moment(formData.final_interview_date).format("YYYY-MM-DD") : ""
            }
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Sign:</label>
          <input
            type="text"
            name="final_interview_sign"
            value={formData.final_interview_sign}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* End Final Interview */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Current Position:</label>
          <input
            type="text"
            name="current_position"
            value={formData.current_position}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Current CTC:</label>
          <input
            type="text"
            name="current_ctc"
            value={formData.current_ctc}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Position Offered:</label>
          <input
            type="text"
            name="position_offered"
            value={formData.position_offered}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Expected CTC:</label>
          <input
            type="text"
            name="expected_ctc"
            value={formData.expected_ctc}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Date of Joining:</label>
          <input
            type="date"
            name="joining_date"
            value={
              moment(formData.joining_date)
                ? moment(formData.joining_date).format("YYYY-MM-DD")
                : formData.joining_date
            }
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Actual Date of Joining:</label>
          <input
            type="date"
            name="actual_date_of_joining"
            value={
              moment(formData.actual_date_of_joining)
                ? moment(formData.actual_date_of_joining).format("YYYY-MM-DD")
                : formData.actual_date_of_joining
            }
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>

        {/* Adding extra fields  */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Functional EMP Code:</label>
          <input
            type="text"
            name="functionalEmpCode"
            value={formData.functionalEmpCode}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Functional Manager:</label>
          <input
            type="text"
            name="functionalManager"
            value={formData.functionalManager}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Territory EMP Code:</label>
          <input
            type="text"
            name="reportingEmpCode"
            value={formData.reportingEmpCode}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Territory Manager:</label>
          <input
            type="text"
            name="repotingManager"
            value={formData.repotingManager}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Zone EMP Code:</label>
          <input
            type="text"
            name="zoneEMPCode"
            value={formData.zoneEMPCode}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1">Zone Manager:</label>
          <input
            type="text"
            name="zoneReportingManager"
            value={formData.zoneReportingManager}
            onChange={handleInputChange}
            className="w-full border p-1 sm:p-2 text-xs sm:text-sm"
          />
        </div>
      </div>
      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Business Structure
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Company Info
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="citySelect"
            name="company"
            disabled
            value={formData.company}
            onChange={
              // (e) =>
              // setCtcData({
              //   ...ctcData,
              //   company: e.target.value
              // })
              handleInputChange
            }
          >
            <option value="" disabled>
              - Select -
            </option>
            {companyData.map((item, idx) => (
              <option value={item.c_id} key={idx}>
                {item.cmpny_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Business Segment
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled
            name="bg"
            value={formData.bg || ""}
            // disabled={!formData.company}
            onChange={
              // (e) =>
              // setCtcData({
              //   ...ctcData,
              //   bg: e.target.value
              // })
              handleInputChange
            }
          >
            <option value="" disabled>
              - Select -
            </option>
            {bgData.map((item, idx) => (
              <option value={item.bg_id} key={idx}>
                {item.business_segment}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Business Unit Division
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="userSelect"
            disabled
            name="bu"
            value={formData.bu || ""}
            onChange={
              // (e) =>
              // setCtcData({
              //   ...ctcData,
              //   bu: e.target.value
              // })
              handleInputChange
            }
          >
            <option value="" disabled>
              - Select -
            </option>
            {buData.map((item, idx) => (
              <option value={item.bu_id} key={idx}>
                {item.business_unit_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Zone
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="userSelect"
            name="zone"
            disabled
            value={formData.zone || ""}
            onChange={
              // (e) =>
              // setCtcData({
              //   ...ctcData,
              //   zone: e.target.value
              // })
              handleInputChange
            }
          >
            <option value={""}>- Select -</option>
            {zoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Region
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="userSelect"
            name="region"
            disabled
            value={formData.region || ""}
            onChange={
              // (e) =>
              // setCtcData({
              //   ...ctcData,
              //   region: e.target.value
              // })
              handleInputChange
            }
          >
            <option value={""}>- Select -</option>
            {regionData.map((item, idx) => (
              <option value={item.r_id} key={idx}>
                {item.region_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Territory
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            name="territory"
            disabled
            value={formData.territory || ""}
            onChange={
              // (e) =>
              // // setCtcData({
              // //   ...ctcData,
              // //   territory: e.target.value
              // // })
              handleInputChange
            }
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Select
            </option>
            {territoryData.map((item, idx) => (
              <option value={item.t_id} className="focus:outline-none focus:border-b bg-white" key={idx}>
                {item.territory_name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Head Quarter
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            name="reportingOffice"
            value={formData?.reportingOffice || ""}
            onChange={
              // (e) => setCtcData({ ...ctcData, reportingOffice: e.target.value })
              handleInputChange
            }
          >
            <option value={""}>- Select -</option>
            {repoOfcData.map((item) => (
              <option
                className="focus:outline-none focus:border-b bg-white"
                value={item.reporting_office_name}
              >
                {item.reporting_office_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Remarks
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="textareaField"
            placeholder="Remarks"
            name="remarks"
            value={formData.remarks || ""}
            onChange={
              // (e) => setCtcData({ ...ctcData, remarks: e.target.value })
              handleInputChange
            }
          ></textarea>
        </div>
      </div>
      {router.query.type === "Edit" && (
        <div className="flex items-center justify-center w-full gap-4 py-4">
          <button
            className="text-center cursor-pointer rounded-md bg-green-500 text-white py-1 px-4 text-lg"
            // onClick={() => props.formType("Family")}
          >
            Prev
          </button>
          <button
            disabled={disableNext}
            className=" text-center cursor-pointer rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            onClick={() => interViewPostHandle()}
          >
            Next
          </button>
        </div>
      )}
      {router.query.type === "View" || router.query.type === "Edit" ? (
        false
      ) : roleId == 5 || roleId == 4 || roleId == 9 || roleId == 1 || roleId == 8 ? (
        <div className="flex items-center justify-center w-full gap-4 py-4">
          <button
            className="text-center cursor-pointer rounded-md bg-green-500 text-white py-1 px-4 text-lg"
            // onClick={() => props.formType("Family")}
          >
            Prev
          </button>
          <button
            disabled={disableNext}
            className=" text-center cursor-pointer rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            onClick={() => interViewPostHandle()}
          >
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Interview;
