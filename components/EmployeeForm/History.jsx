import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import * as Yup from "yup";
const History = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [ctcData, setCtcData] = useState({
    employeeCode: "",
    department: "",
    subDepartment: "",
    designation: "",
    workEmail: "",
    doj: "",
    doc: "",
    functionalManager: "",
    reportingManager: "",
    retirementDate: "",
    employementType: "",
    employementStatus: "",
    approvalFee: "",
    mostExpensiveBudget: "",
    agreeStartDate: "",
    agreeEndDate: "",
    company: "",
    bg: "",
    bu: "",
    zone: "",
    region: "",
    territory: "",
    remarks: "",
  });
  const [companyData, setCompanyData] = useState([]);

  // Getting Company Information for the dropdown values
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
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
      const respond = await axios.get(
        `${url}/api/get_company_wise_business_segment/${company}`,
        {
          headers: headers,
        }
      );
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
    console.log(
      company,
      businessSegmentId,
      "Kiska h ye tumko intzar me hu na!!"
    );
    try {
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
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
        headers: headers,
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
        headers: headers,
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
  const getAllTerritoryData = async (
    company,
    segmentId,
    businessUnitId,
    zone,
    region
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
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

  useEffect(() => {
    if (ctcData.bg && ctcData.company && ctcData.bu && ctcData.zone) {
      getAllRegionData(ctcData.company, ctcData.bg, ctcData.bu, ctcData.zone);
    } else {
      return;
    }
  }, [ctcData.bg, ctcData.company, ctcData.bu, ctcData.zone]);

  useEffect(() => {
    if (
      ctcData.bg &&
      ctcData.company &&
      ctcData.bu &&
      ctcData.zone &&
      ctcData.region
    ) {
      getAllTerritoryData(
        ctcData.company,
        ctcData.bg,
        ctcData.bu,
        ctcData.zone,
        ctcData.region
      );
    } else {
      return;
    }
  }, [ctcData.bg, ctcData.company, ctcData.bu, ctcData.zone, ctcData.region]);
  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    if (props)
      setCtcData({
        employeeCode: props.data?.empcode || "",
        department: props.data?.dept || "",
        subDepartment: props.data?.sub_dept || "",
        designation: props.data?.design || "",
        workEmail: props.data?.wemail || "",
        doj: props.data?.doj || "",
        doc: props.data?.dconfm || "",
        functionalManager: props.data?.functional_mgr || "",
        reportingManager: props.data?.Reporting_mgr || "",
        retirementDate: props.data?.rdate || "",
        employementType: props.data?.etype || "",
        employementStatus: props.data?.estatus || "",
        approvalFee: props.data?.app_amt || "",
        mostExpensiveBudget: props.data?.mon_reimamt || "",
        agreeStartDate: props.data?.agg_startdate || "",
        agreeEndDate: props.data?.agg_enddate || "",
        company: props.data?.c_id || "",
        bg: props.data?.bg_id || "",
        bu: props.data?.bu_id || "",
        zone: props.data?.z_id || "",
        region: props.data?.r_id || "",
        territory: props.data?.t_id || "",
        remarks: props.data?.remarks || "",
      });
  }, [props]);

  const [deptData, setDeptData] = useState([]);

  // Getting Company Information for the dropdown values
  const getDeptInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employeedept`, {
        headers: headers,
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
        headers: headers,
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

  const [desigData, setDesigData] = useState([]);

  // Getting Company Information for the dropdown values
  const getDesignInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employeedesig`, {
        headers: headers,
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
      .matches(/^(?!.*@[^,]*,)/),
  });

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
        functionalManager,
        reportingManager,
        retirementDate,
        employementType,
        employementStatus,
        approvalFee,
        mostExpensiveBudget,
        agreeStartDate,
        agreeEndDate,
        company,
        bg,
        bu,
        zone,
        region,
        territory,
        remarks,
      } = ctcData;

      const data = {
        empcode: employeeCode,
        dept: department,
        sub_dept: subDepartment,
        design: designation,
        wemail: workEmail,
        doj: doj,
        dconfm: doc,
        functional_mgr: functionalManager,
        Reporting_mgr: reportingManager,
        rdate: retirementDate,
        etype: employementType,
        estatus: employementStatus,
        app_amt: approvalFee,
        mon_reimamt: mostExpensiveBudget,
        agg_startdate: agreeStartDate,
        agg_enddate: agreeEndDate,
        c_id: company,
        bg_id: bg,
        bu_id: bu,
        z_id: zone,
        r_id: region,
        t_id: territory,
        remarks: remarks,
        emp_status: "Update History",
      };
      const respond = await axios
        .put(
          `${url}/api/update_history/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Joining edited successfully!");
          setTimeout(() => {
            props.formType("Documents");
          }, [1000]);
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

  const empType = [
    "Permanent",
    "Consultant",
    "Wages",
    "Trainee",
    "Contractual",
  ];
  const empStatus = [
    "New Onbaording",
    "Probation",
    "Confirmed",
    "Resigned",
    "Relieved",
    "Settled",
  ];
  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Employee Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Employee Code"
            value={ctcData.employeeCode}
            onChange={(e) =>
              setCtcData({ ...ctcData, employeeCode: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Department
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.department}
            onChange={(e) =>
              setCtcData({ ...ctcData, department: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {deptData.map((item) => (
              <option
                className="focus:outline-none focus:border-b bg-white"
                value={item.department}
              >
                {item.department}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Sub department
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.subDepartment}
            onChange={(e) =>
              setCtcData({ ...ctcData, subDepartment: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {subDeptData.map((item) => (
              <option
                className="focus:outline-none focus:border-b bg-white"
                value={item.sub_department}
              >
                {item.sub_department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Designation
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.designation}
            onChange={(e) =>
              setCtcData({ ...ctcData, designation: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {desigData.map((item) => (
              <option
                className="focus:outline-none focus:border-b bg-white"
                value={item.designation}
              >
                {item.designation}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Work email
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Work email"
            value={ctcData.workEmail}
            onChange={(e) =>
              setCtcData({ ...ctcData, workEmail: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date of joining
          </label>

          <DatePicker
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            value={moment(ctcData.doj).format("LL")}
            onChange={(date) =>
              setCtcData({
                ...ctcData,
                doj: moment(date).format("LL"),
                doc: moment(date).add(6, "months"),
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date of Confirmation
          </label>

          <DatePicker
            value={moment(ctcData.doc).format("LL")}
            disabled
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Functional Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Functional Manager"
            value={ctcData.functionalManager}
            onChange={(e) =>
              setCtcData({ ...ctcData, functionalManager: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
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
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Retirement date
          </label>

          <DatePicker
            value={moment(ctcData.retirementDate).format("LL")}
            onChange={(date) =>
              setCtcData({
                ...ctcData,
                retirementDate: moment(date).format("LL"),
              })
            }
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Employment Type
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.employementType}
            onChange={(e) =>
              setCtcData({ ...ctcData, employementType: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {empType.map((item) => (
              <option
                className="focus:outline-none focus:border-b bg-white"
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Employment Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.employementStatus}
            onChange={(e) =>
              setCtcData({ ...ctcData, employementStatus: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {empStatus.map((item) => (
              <option
                className="focus:outline-none focus:border-b bg-white"
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Approval Fee Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Approval Fee Amt."
            value={ctcData.approvalFee}
            onChange={(e) =>
              setCtcData({ ...ctcData, approvalFee: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  lg:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
            disabled={!formActive}
          >
            <small className="text-red-600">*</small> Monthly Expense Budget
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder=" Monthy Expensive Budget"
            value={ctcData.mostExpensiveBudget}
            onChange={(e) =>
              setCtcData({ ...ctcData, mostExpensiveBudget: e.target.value })
            }
          />
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Agreement Start Date
          </label>
          <DatePicker
            value={moment(ctcData.agreeStartDate).format("LL")}
            onChange={(date) =>
              setCtcData({
                ...ctcData,

                agreeEndDate: moment(date).add(6, "months"),
                agreeStartDate: moment(date).format("LL"),
              })
            }
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Agreement End Date
          </label>
          <DatePicker
            value={moment(ctcData.agreeEndDate).format("LL")}
            disabled
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Business Structure
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Company Info
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="citySelect"
            value={ctcData.company}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                company: e.target.value,
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
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
                bg: e.target.value,
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Business Unit Division
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="userSelect"
            value={ctcData.bu}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                bu: e.target.value,
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Zone
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="userSelect"
            value={ctcData.zone}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                zone: e.target.value,
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Region
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="userSelect"
            value={ctcData.region}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                region: e.target.value,
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Territory
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.territory}
            onChange={(e) =>
              setCtcData({
                ...ctcData,
                territory: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            {territoryData.map((item, idx) => (
              <option
                value={item.t_id}
                className="focus:outline-none focus:border-b bg-white"
                key={idx}
              >
                {item.territory_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Remarks
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="textareaField"
            placeholder="Remarks"
            value={ctcData.remarks}
            onChange={(e) =>
              setCtcData({ ...ctcData, remarks: e.target.value })
            }
          ></textarea>
        </div>
      </div>
      {router.query.type === "Edit" && (
         <div className="flex justify-between  gap-2 w-2/3 mt-12  flex gap-1 lg:w-1/2   overflow-hidden  px-4 py-1 text-white  pointer">
         <div
           className="w-full  text-center  bg-green-700 px-4 py-1 text-white cursor-pointer"
           onClick={() => props.formType("Bank")}
         >
           ...Prev
         </div>
         <div
           className=" w-full text-center bg-orange-400 px-4 py-1 text-white cursor-pointer"
           onClick={() => handleEditHistory()}
         >
           Next..
         </div>
       </div>
      )}
    
    </form>
  );
};

export default History;
