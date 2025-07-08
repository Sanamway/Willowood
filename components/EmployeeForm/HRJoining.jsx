import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import * as Yup from "yup";
const HRJoining = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const mob = router?.query?.from;

  const [ctcData, setCtcData] = useState({
    employeeCode: "",
    department: "",
    subDepartment: "",
    designation: "",
    workEmail: "",
    doj: "",
    doc: "",
    rejoin_date: "",
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
    if (!ctcData.company) return;
    getBGInfo(ctcData.company);
  }, [ctcData.company]);

  const [buData, setBUData] = useState([]);

  const getBUInfo = async (company, businessSegmentId) => {
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
    if (!ctcData.bg && !ctcData.company) return;
    getBUInfo(ctcData.company, ctcData.bg);
  }, [ctcData.bg, ctcData.company]);
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
    if (ctcData.bg && ctcData.company && ctcData.bu) {
      getAllZoneData(ctcData.company, ctcData.bg, ctcData.bu);
    } else {
      return;
    }
  }, [ctcData.bg, ctcData.company, ctcData.bu]);

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

  const getReportingOfcData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_office_hq?t_id=${ctcData.territory}&c_id=${cId}`, {
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
    if (ctcData.territory) {
      getReportingOfcData(ctcData.territory);
    } else {
      setRepoOfcData([]);
    }
  }, [ctcData.territory]);

  useEffect(() => {
    if (ctcData.bg && ctcData.company && ctcData.bu && ctcData.zone) {
      getAllRegionData(ctcData.company, ctcData.bg, ctcData.bu, ctcData.zone);
    } else {
      return;
    }
  }, [ctcData.bg, ctcData.company, ctcData.bu, ctcData.zone]);

  useEffect(() => {
    if (ctcData.bg && ctcData.company && ctcData.bu && ctcData.zone && ctcData.region) {
      getAllTerritoryData(ctcData.company, ctcData.bg, ctcData.bu, ctcData.zone, ctcData.region);
    } else {
      return;
    }
  }, [ctcData.bg, ctcData.company, ctcData.bu, ctcData.zone, ctcData.region]);

  // useEffect(() => {
  //   if (ctcData.bg && ctcData.company && ctcData.bu && ctcData.zone && ctcData.region && ctcData.territory ) {
  //     getReportingOfcData(ctcData.bg && ctcData.company && ctcData.bu && ctcData.zone && ctcData.region && ctcData.territory);
  //   } else {
  //     return;
  //   }
  // }, [ctcData.bg, ctcData.company, ctcData.bu, ctcData.zone, ctcData.region, ctcData.territory]);

  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    if (props)
      setCtcData({
        ...ctcData,
        employeeCode: props.data?.empcode || "",
        department: props.data?.dept || "",
        subDepartment: props.data?.sub_dept || "",
        designation: props.data?.design || "",
        workEmail: props.data?.wemail || "",
        rejoin_date: props?.data?.rejoin_date || "",
        // doj: props?.data?.doj || "",
        // doj: props?.data?.joining_date || "",
        doj: (props?.data?.empcode ==(null || undefined )? props?.data?.joining_date : props?.data?.doj) || "",
        // doj:(props?.data?.rejoin_date ?? props?.data?.joining_date) || "",
        doc: (props?.data?.dconfm || "").trim(),
        functionalEmpCode: props?.data?.functionalEmpCode || "",
        functionalManager: props.data?.functionalManager || "",
        repotingManager: props.data?.repotingManager || "",
        reportingEmpCode: props.data?.reportingEmpCode || "",
        zoneEMPCode: props.data?.zoneEMPCode || "",
        zoneReportingManager: props.data?.zoneReportingManager || "",
        hrEMPCode: props.data?.hr_empcode || "",
        sapVendorCode: props.data?.sap_v_code || "",
        agreeRenewalStatus: props.data?.aggrement || "",
        hrManager: props.data?.hr_name || "",
        // repotingManager: props.data?.rp_manager || "",
        reportingOffice: (props?.data?.reporting_hq || "").trim(),
        retirementDate: moment(props?.data?.dob).add(60, "years") || "",
        emp_category: props.data?.emp_category_id || "",
        joiningStatus: props.data?.etype || "",
        // employeeStatus: props.data?.emp_status || "",
        employeeStatus:(props?.data?.empcode === null || props?.data?.empcode === undefined) ? "Active" : props?.data?.emp_status || "",
        
        agreeStartDate: props.data?.agg_startdate || "",
        agreeEndDate: props.data?.agg_enddate || "",
        company: props.data?.c_id || "",
        bg: props.data?.bg_id || "",
        // bu: props.data?.bu_id || "",
        bu: (props?.data?.empcode === null || props?.data?.empcode === undefined)? props?.data?.bu_id : props?.data?.bu_id || "",
        zone: props.data?.z_id || "",
        region: props.data?.r_id || "",
        territory: props.data?.t_id || "",
        remarks: props.data?.remarks || "",

        gpa_policy: props.data?.gpa_policy || "",
        whatsup: props.data?.whatsup || "",
        // approvalFee: props.data?.app_amt || "",
        // approvalFee: (props.data?.in_appl_amt ?? props?.data?.app_amt) || "",
        approvalFee: (props?.data?.empcode === null || props?.data?.empcode === undefined) ? props?.data?.in_appl_amt : props?.data?.app_amt || "",

        // mostExpensiveBudget: props.data?.mon_reimamt || "",
      
        mostExpensiveBudget: (props?.data?.empcode === null || props?.data?.empcode === undefined) ? props?.data?.in_expence_amt : props?.data?.mon_reimamt || "",

        // hr_fest_amount_e: props?.data?.in_fest_amount_e || "",
        // hr_fest_amount_e:(props?.data?.empcode ==(null || undefined ) ? props?.data?.in_fest_amount_e : props?.data?.hr_fest_amount_e) || "",
        hr_fest_amount_e: (props?.data?.empcode === null || props?.data?.empcode === undefined) ? props?.data?.in_fest_amount_e : props?.data?.hr_fest_amount_e || "",

        // hr_special_allowance_e: props.data?.hr_special_allowance_e || "",
        hr_special_allowance_e: (props?.data?.empcode === null || props?.data?.empcode === undefined) ? props?.data?.in_special_allowance_e : props?.data?.hr_special_allowance_e || "",
        // hr_other_amt_e: props.data?.hr_other_amt_e || "",
        hr_other_amt_e: (props?.data?.empcode === null || props?.data?.empcode === undefined) ? props?.data?.in_other_amt_e : props?.data?.hr_other_amt_e || "",
        // hr_bonus_amt_d: props.data?.hr_bonus_amt_d || "",
        hr_bonus_amt_d: props.data?.hr_bonus_amt_d || "",
        // hr_other_amt_d: props.data?.hr_other_amt_d || "",
        hr_other_amt_d: props.data?.hr_other_amt_d || "",
        tds_section: props.data?.tds_section || "",
        tds_percent: props.data?.tds_percent || ""
      });
  }, [props]);

  console.log("dojj", props?.data?.doj, "jod", props?.data?.joining_date)
  console.log("empcode", props?.data?.empcode)

  useEffect(()=>{
    if(ctcData?.doj ){
      setCtcData({...ctcData, doc:moment(ctcData.doj).add(6,"months")})
    }
  },[props])

  console.log("After useEffects ", ctcData?.hr_fest_amount_e)
  console.log("Props ", props?.data?.in_fest_amount_e)

  const [deptData, setDeptData] = useState(null);

  // Getting Company Information for the dropdown values
  const getDeptInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employeedept`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setDeptData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeptInfo();
  }, []);

  const [subDeptData, setSubDeptData] = useState([]);

  // Getting Company Information for the dropdown values
  const getSubDeptInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employeesubdept`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setSubDeptData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubDeptInfo();
  }, []);

  const [desigData, setDesigData] = useState(null);

  // Getting Company Information for the dropdown values
  const getDesignInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employeedesig`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setDesigData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDesignInfo();
  }, []);

  const validationSchema = Yup.object().shape({
    workEmail: Yup.string()
      .required("Email is required")
      .email()
      .matches(/^(?!.*@[^,]*,)/)
  });

  async function whatsAppMsg(recipientMob, emp_name) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        tem_id: "841147",
        placeholders: [emp_name]
      };
      // return;
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("WA", respData);
    } catch (error) {
      console.log("Error", error);
    }
  }

  //WahtsApp Message MR....

  async function whatsAppMsgMR(recipientMob, empcode, emp_name, agg_startdate, agg_enddate) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        tem_id: "840173",
        placeholders: [empcode, emp_name, agg_startdate, agg_enddate]
      };
      // return;
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("WAMR", respData);
    } catch (error) {
      console.log("Error", error);
    }
  }

  const handleEditHistory = async () => {
    try {
      const {
        employeeCode,
        department,
        subDepartment,
        designation,
        workEmail,
        doj,
        doc,
        functionalEmpCode,
        functionalManager,
        sapVendorCode,
        reportingEmpCode,
        repotingManager,
        zoneEMPCode,
        zoneReportingManager,
        hrEMPCode,
        hrManager,
        estatus,
        reportingOffice,
        emp_category,
        employementType,
        employeeStatus,
        retirementDate,
        employementStatus,
        joiningStatus,
        agreeRenewalStatus,
        agreeStartDate,
        agreeEndDate,
        company,
        bg,
        bu,
        zone,
        region,
        territory,
        remarks,
        gpa_policy,
        whatsup,
        approvalFee,
        mostExpensiveBudget,

        hr_fest_amount_e,
        hr_special_allowance_e,
        hr_other_amt_e,
        hr_bonus_amt_d,
        hr_other_amt_d,
        tds_section,
        tds_percent,
        
      } = ctcData;

      const data = {
        empcode: employeeCode,
        dept: department,
        sub_dept: subDepartment,
        design: designation,
        wemail: workEmail,
        doj: doj,
        dconfm: doc,
        fm_empcode: functionalEmpCode,
        functional_mgr: functionalManager,
        rp_empcode: reportingEmpCode,
        rp_manager: repotingManager,
        zdm_empcode: zoneEMPCode,
        zdm_name: zoneReportingManager,
        hr_empcode: hrEMPCode,
        hr_name: hrManager,
        sap_v_code: sapVendorCode,
        // emp_status: employeeStatus ,
        // emp_status: employeeStatus ? employeeStatus : "Active",
        emp_status: employeeStatus ,
        emp_category: emp_category ? emp_category : "1",
        // rdate: retirementDate,
        etype: joiningStatus ? joiningStatus : "New Onbaording",
        app_amt: approvalFee,
        agg_startdate: agreeStartDate,
        agg_enddate: agreeEndDate,
        mon_reimamt: mostExpensiveBudget,
        aggrement: agreeRenewalStatus ? agreeRenewalStatus : "No",
        c_id: company,
        bg_id: bg,
        bu_id: bu,
        z_id: zone,
        r_id: region,
        t_id: territory,
        reporting_hq: reportingOffice,
        remarks: remarks,
        gpa_policy: gpa_policy,
        whatsup: whatsup,
        hr_fest_amount_e,
        hr_special_allowance_e,
        hr_other_amt_e,
        hr_bonus_amt_d,
        hr_other_amt_d,
        tds_section,
        tds_percent,
        app_status: "HR Joining Process Done"
      };
      console.log("datahr", data);

      //Props Data

      const {
        z_mobile_no,
        z_user_Person,
        z_hod_name,
        r_hod_name,
        r_user_Person,
        emergency_conno,
        party_Name,
        address,
        contact_person,
        pmobile,
        pemail,
        pan,
        gst,
        territory_name,
        region_name,
        zone_name,
        business_unit_name,
        fname,
        mname,
        lname,
        phone_number,
        caddress,
        empcode,
        agg_startdate,
        agg_enddate
      } = props?.data;
      const mrname = "TestName";
      const mrtwo = "TestTwo";
      const emp_name = `${fname} ${mname} ${lname}`;
      const bst = `${bu} ${region} ${zone} ${territory}`;

      // whatsAppMsgMR(phone_number, empcode, emp_name, agg_startdate, agg_enddate);

      // return;
      const moAgreeStar = moment(agg_startdate).format("LL")
      const moAgreeEnd = moment(agg_enddate).format("LL")
      const respond = await axios
        .put(`${url}/api/update_history/${router.query.id}`, data, {
          headers: headers
        })
        .then((res) => {
          if (!res) return;
          toast.success("Joining edited successfully!");
          executeOneByOne()
          async function executeOneByOne() {
            await whatsAppMsg(phone_number, emp_name);
            await new Promise((resolve) => setTimeout(resolve, 1200));
            await whatsAppMsgMR(phone_number, empcode, emp_name, moAgreeStar, moAgreeEnd);
          }
          setTimeout(() => {
            // router.push("/table/table_employee");
            mob == "mob" ? router.push("/table/table_employee_mobile") : router.push("/table/table_employee");
          }, 3000);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };

  const empType = ["Contractual", "Permanent", "Consultant", "Wages", "Trainee"];
  const empStatus = [
    "New Onbaording",
    "Probation",
    "Confirmed",
    "Resigned",
    "Relieved",
    "Settled",
    "Re-Joining"
  ];
  const earningList = [
    "Application Fee Amt",
    "Expense Amt",
    "Festival Amt",
    "Spec Incentive Amt",
    "Other Amt"
  ];
  const deductionList = ["Bonus Amt", "Other Amount"];
  const tdsSec = ["194 C - Contractor", "TDS 1%"];

  useEffect(() => {
    if (window.localStorage) {
      const userInfo = JSON?.parse(localStorage?.getItem("userinfo"));
      setRoleId(userInfo?.role_id);
      setcid(userInfo.c_id);
      settid(userInfo.t_id);
    }
  }, [props]);

  ///Generate Employee Code Randomly

  async function generateEmpCode() {
    const res = await axios.get(`${url}/api/autogenerate_empcode?c_id=1&type=emp`, { headers: headers });
    const resdata = await res.data;
    setCtcData((prev) => ({
      ...prev,
      employeeCode: resdata?.data || ""
    }));
  }

  useEffect(() => {
    if (!props?.data?.empcode) {
      generateEmpCode();
    }
  }, [props]);

  //Get Employee Category List

  const [empCatList, setEmpList] = useState(null);
  const getEmpCatList = async () => {
    const res = await axios.get(`${url}/api/get_mr_category?c_id=1`, { headers: headers });
    const resdata = await res.data.data;
    setEmpList(resdata);
  };

  useEffect(() => {
    getEmpCatList();
  }, []);

  useEffect(() => {
    setCtcData((prevData) => ({
      ...prevData,
      gpa_policy: true,
      whatsup:  true,
      tds_percent: "1"
    }));
  }, [props.data]);

  //////////////////// //// Agree Start and End Date /////// ////////////////////

  useEffect(() => {
    if (props.data?.agg_startdate && props.data?.agg_enddate) {
      const startDate = props.data.agg_startdate;
      const correctEndDate = moment(startDate).add(11, "months").subtract(1, "day").format("YYYY-MM-DD");

      setCtcData((prevData) => ({
        ...prevData,
        agreeEndDate: correctEndDate
      }));
    }
  }, [props?.data]);

  // AgreeStatus Start and End

  const originalDatesRef = useRef({
    agreeStartDate: null,
    agreeEndDate: null
  });

  useEffect(() => {
    if (
      ctcData.agreeRenewalStatus === "Yes" &&
      !originalDatesRef.current.agreeStartDate &&
      !originalDatesRef.current.agreeEndDate
    ) {
      originalDatesRef.current = {
        agreeStartDate: ctcData.agreeStartDate,
        agreeEndDate: ctcData.agreeEndDate
      };

      setCtcData((prevData) => ({
        ...prevData,
        // agreeStartDate: prevData.agreeEndDate,
        agreeStartDate: moment(prevData.agreeEndDate).format("YYYY-MM-DD")
      }));
    }
  }, [ctcData.agreeRenewalStatus]);

  useEffect(() => {
    if (ctcData.agreeRenewalStatus === "Yes" && ctcData.agreeStartDate) {
      const newEndDate = moment(ctcData.agreeStartDate)
        .add(11, "months")
        .subtract(1, "day")
        .format("YYYY-MM-DD");

      if (ctcData.agreeEndDate !== newEndDate) {
        setCtcData((prevData) => ({
          ...prevData,
          agreeEndDate: newEndDate
        }));
      }
    }
  }, [ctcData.agreeStartDate, ctcData.agreeRenewalStatus]);

  useEffect(() => {
    if (ctcData.agreeRenewalStatus === "No") {
      const { agreeStartDate, agreeEndDate } = originalDatesRef.current;

      if (agreeStartDate && agreeEndDate) {
        setCtcData((prevData) => ({
          ...prevData,
          agreeStartDate,
          agreeEndDate
        }));
      }
      originalDatesRef.current = {
        agreeStartDate: null,
        agreeEndDate: null
      };
    }
  }, [ctcData.agreeRenewalStatus]);

  // useEffect(()=>{
  //   if(props?.data?.emp_status =="De-Active"){
  //     setCtcData((prevData)=>({
  //       ...prevData,
  //       employeeStatus: "active"
  //     }))
  //   }
  // }, [props])



  ////////////////////////////////////// JSX Start //////////////////////////////////////////////////////////
  return (
    <form className=" bg-white rounded shadow p-4 w-full pb-20" onSubmit={(e) => e.preventDefault()}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 500
        }}
      />

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Employee Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            maxLength={10}
            minLength={10}
            placeholder="Employee Code"
            disabled
            value={ctcData.employeeCode}
            onChange={(e) => setCtcData({ ...ctcData, employeeCode: e.target.value })}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Department
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.department}
            onChange={(e) => setCtcData({ ...ctcData, department: e.target.value })}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {deptData?.map((item) => (
              <option className="focus:outline-none focus:border-b bg-white" value={item.department}>
                {item.department}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Sub department
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.subDepartment}
            onChange={(e) => setCtcData({ ...ctcData, subDepartment: e.target.value })}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {subDeptData.map((item) => (
              <option className="focus:outline-none focus:border-b bg-white" value={item.sub_department}>
                {item.sub_department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.designation}
            onChange={(e) => setCtcData({ ...ctcData, designation: e.target.value })}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {desigData?.map((item) => (
              <option className="focus:outline-none focus:border-b bg-white" value={item.designation}>
                {item.designation}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Work email
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Work email"
            value={ctcData.workEmail}
            onChange={(e) => setCtcData({ ...ctcData, workEmail: e.target.value })}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of joining
          </label>

          {ctcData.doj ? (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              selected={new Date(ctcData.doj)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>
                setCtcData({
                  ...ctcData,
                  doj: date,
                  doc: moment(date).add(6, "months")
                })
              }
            />
          ) : (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>
                setCtcData({
                  ...ctcData,
                  doj: date,
                  doc: moment(date).add(6, "months")
                })
              }
            />
          )}
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Re-Joining
          </label>

          <DatePicker
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            disabled
            selected={ctcData.rejoin_date ? new Date(ctcData.rejoin_date) : null}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
      </div>

      {/* Functional Code  Functional Manager */}

      <div className="flex flex-col gap-2  lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Confirmation
          </label>
          {ctcData.doc ? (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              selected={new Date(ctcData.doc)}
              disabled
            />
          ) : (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              disabled
            />
          )}
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Position Offer
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Functional Manager"
            // value={ctcData.functionalManager}
            value={props?.data?.position_offered}
            // onChange={(e) => setCtcData({ ...ctcData, functionalManager: e.target.value })}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Functional EMP Code
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Functional EMP Code"
            value={ctcData.functionalEmpCode}
            onChange={(e) => {
              if (e.target.value.length > 8) {
                return;
              }
              setCtcData({ ...ctcData, functionalEmpCode: e.target.value });
            }}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Functional Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Functional Manager"
            value={ctcData.functionalManager}
            onChange={(e) => setCtcData({ ...ctcData, functionalManager: e.target.value })}
          />
        </div>
        {/* <div className="w-full  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Reporting Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Reporting Manager"
            value={ctcData.reportingManager}
            onChange={(e) =>
              setCtcData({ ...ctcData, reportingManager: e.target.value })
            }
          />
        </div> */}
      </div>

      {/* Reporting Manager  */}

      <div className="flex flex-col gap-2  lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Territory EMP Code
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            maxLength={8}
            minLength={8}
            placeholder="Reporting EMP Code"
            value={ctcData.reportingEmpCode}
            onChange={(e) => {
              if (e.target.value.length > 8) {
                return;
              }
              setCtcData({ ...ctcData, reportingEmpCode: e.target.value });
            }}
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Territory Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Reporting Manager"
            value={ctcData.repotingManager}
            onChange={(e) => setCtcData({ ...ctcData, repotingManager: e.target.value })}
          />
        </div>
      </div>

      {/* Zone Manager  */}

      <div className="flex flex-col gap-2  lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Zone EMP Code
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            maxLength={8}
            minLength={8}
            placeholder="Zone EMP Code"
            value={ctcData.zoneEMPCode}
            onChange={(e) => {
              if (e.target.value.length > 8) {
                return;
              }
              setCtcData({ ...ctcData, zoneEMPCode: e.target.value });
            }}
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Zone Reporting Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zone Reporting Manager"
            value={ctcData.zoneReportingManager}
            onChange={(e) => setCtcData({ ...ctcData, zoneReportingManager: e.target.value })}
          />
        </div>
      </div>

      {/* HR EMP  */}

      <div className="flex flex-col gap-2  lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> HR EMP Code
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            maxLength={8}
            minLength={8}
            placeholder="HR EMP Code"
            value={ctcData.hrEMPCode}
            onChange={(e) => {
              if (e.target.value.length > 8) {
                return;
              }
              setCtcData({ ...ctcData, hrEMPCode: e.target.value });
            }}
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> HR Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="HR Manager"
            value={ctcData.hrManager}
            onChange={(e) => setCtcData({ ...ctcData, hrManager: e.target.value })}
          />
        </div>
      </div>

      {/* SAP */}

      <div className="flex flex-col gap-2  lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> SAP Vendor Code
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="SAP Vendor Code"
            value={ctcData.sapVendorCode}
            onChange={(e) => setCtcData({ ...ctcData, sapVendorCode: e.target.value })}
          />
        </div>
        <div className="w-full flex items-center justify-between  px-2  lg:w-1/2 ">
          <label
            className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> GPA Policy(1 lac)
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="checkbox"
            id="inputField"
            placeholder="GPA Policy"
            value={ctcData.gpa_policy}
            checked={ctcData?.gpa_policy}
            onChange={(e) => setCtcData({ ...ctcData, gpa_policy: e.target.checked })}
          />
        </div>
        <div className="w-full flex items-center justify-between px-2  lg:w-1/2 ">
          <label
            className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> WhatsApp Communication
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="checkbox"
            id="inputField"
            placeholder="WhatsApp Communication"
            value={ctcData.whatsup}
            checked={ctcData.whatsup}
            onChange={(e) => setCtcData({ ...ctcData, whatsup: e.target.checked })}
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
            placeholder="Application Fee Amt."
            value={ctcData.approvalFee}
            onChange={(e) => setCtcData({ ...ctcData, approvalFee: e.target.value })}
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
            value={ctcData.mostExpensiveBudget}
            onChange={(e) => setCtcData({ ...ctcData, mostExpensiveBudget: e.target.value })}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Festival Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Festival Amt"
            value={ctcData.hr_fest_amount_e}
            onChange={(e) => setCtcData({ ...ctcData, hr_fest_amount_e: e.target.value })}
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
            placeholder="Spec Incentive Amt"
            value={ctcData.hr_special_allowance_e}
            onChange={(e) => setCtcData({ ...ctcData, hr_special_allowance_e: e.target.value })}
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
            value={ctcData.hr_other_amt_e}
            onChange={(e) => setCtcData({ ...ctcData, hr_other_amt_e: e.target.value })}
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
            value={ctcData.hr_bonus_amt_d}
            onChange={(e) => setCtcData({ ...ctcData, hr_bonus_amt_d: e.target.value })}
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
            value={ctcData.hr_other_amt_d}
            onChange={(e) => setCtcData({ ...ctcData, hr_other_amt_d: e.target.value })}
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
            value={ctcData.tds_section}
            onChange={(e) => {
              setCtcData({ ...ctcData, tds_section: e.target.value });
            }}
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
            value={ctcData.tds_percent}
            onChange={(e) => {
              setCtcData({ ...ctcData, tds_percent: e.target.value });
            }}
          >
            {/* <option value="" className="focus:outline-none focus:border-b bg-white">
              --select--
            </option> */}
            {ctcData.tds_section == "" ? <option value="0">0%</option> : <option value="1">1%</option>}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Employment Category
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.emp_category}
            onChange={(e) => {
              const code = e.target.value;
              const codeName = empCatList.find((item) => item.mrc_id == code || "");
              console.log("HeyCatList", codeName.mrc_id);
              setCtcData({ ...ctcData, emp_category: e.target.value, emp_cat_name: codeName });
            }}
          >
            {empCatList?.map((item) => (
              <option className="focus:outline-none focus:border-b bg-white" value={item.mrc_id}>
                {item.mr_Category_name}
              </option>
            ))}
          </select>
        </div>

        <div className=" w-full  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Joining Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.joiningStatus}
            onChange={(e) => setCtcData({ ...ctcData, joiningStatus: e.target.value })}
          >
            {/* <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option> */}
            {empStatus.map((item) => (
              <option className="focus:outline-none focus:border-b bg-white" value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Employment Status
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.employeeStatus}
            onChange={(e) => setCtcData({ ...ctcData, employeeStatus: e.target.value })}
          >
            {/* <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option> */}
            <option val="Active">Active</option>
            <option val="De-active">De-Active</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Agreement Start Date
          </label>

          {ctcData.agreeStartDate ? (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              selected={new Date(ctcData.agreeStartDate)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>
                setCtcData({
                  ...ctcData,
                  agreeEndDate: moment(date).add(11, "months").subtract(1, "day"),
                  agreeStartDate: date
                })
              }
            />
          ) : (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>
                setCtcData({
                  ...ctcData,
                  agreeEndDate: moment(date).add(11, "months").subtract(1, "day"),
                  agreeStartDate: date
                })
              }
            />
          )}
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Agreement End Date
          </label>
          {ctcData.agreeEndDate ? (
            <DatePicker
              selected={new Date(ctcData.agreeEndDate)}
              dateFormat="dd-MM-yyyy"
              disabled
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          ) : (
            <DatePicker
              dateFormat="dd-MM-yyyy"
              disabled
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          )}
        </div>

        <div className=" w-full  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Agreement Renewal Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.agreeRenewalStatus}
            onChange={(e) => setCtcData({ ...ctcData, agreeRenewalStatus: e.target.value })}
          >
            {/* <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option> */}
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
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
            value={ctcData.company}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                company: e.target.value
              })
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
            value={ctcData.bg}
            disabled={!ctcData.company}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                bg: e.target.value
              })
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
            value={ctcData.bu}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                bu: e.target.value
              })
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
            value={ctcData.zone}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                zone: e.target.value
              })
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
            value={ctcData.region}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                region: e.target.value
              })
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
            value={ctcData.territory}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                territory: e.target.value
              })
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
            value={ctcData.reportingOffice || ""}
            onChange={(e) => setCtcData({ ...ctcData, reportingOffice: e.target.value })}
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
            value={ctcData.remarks}
            onChange={(e) => setCtcData({ ...ctcData, remarks: e.target.value })}
          ></textarea>
        </div>
      </div>
      {router.query.type === "Edit" && (
        <div className="flex items-center justify-center w-full gap-4 py-4">
          <button
            className="text-center cursor-pointer rounded-md bg-green-500 text-white py-1 px-4 text-lg"
            onClick={() => props.formType("Approval")}
          >
            Prev
          </button>
          <button
            // disabled={props.data?.app_status =="HR Joining Process Done" ? true:false}
            className=" text-center cursor-pointer rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            onClick={() => handleEditHistory()}
          >
            Final Joining Confirmation
          </button>
        </div>
      )}
    </form>
  );
};

export default HRJoining;
