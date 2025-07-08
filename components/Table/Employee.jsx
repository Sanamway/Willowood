import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
import { BiCheckCircle } from "react-icons/bi";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import Image from "next/image";
import EmpImage from "../../public/EmpImage.jpeg";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { BsCheck2Square } from "react-icons/bs";
import Profile from "../../public/userimg.jpg";
import moment from "moment";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Employee = () => {
  const csvHeaders = [
    { label: "Prefix", key: "prefix" },
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "mname" },
    { label: "Last Nsme", key: "lname" },
    { label: "Age", key: "age" },
    { label: "D.O.B", key: "dob" },
    { label: "Gender", key: "gen" },
    { label: "Grade", key: "grade" },
    { label: "Blood Group", key: "blgrp" },
    { label: "Nationality", key: "nationa" },
    { label: "Skill", key: "skilltype" },
    { label: "H Qual", key: "hgtqual" },
    { label: "Total Experience", key: "tot_exp" },
    { label: "pan", key: "pan" },
    { label: "adhar", key: "adhar" },
    { label: "Passport", key: "passport" },
    { label: "Driving License", key: "passport" },
    { label: "Contact Name", key: "emergency_con" },
    { label: "Contact Num", key: "emergency_conno" },
    { label: "Mobile", key: "phone_number" },
    { label: "Emp Status", key: "emp_status" },
    { label: "App no", key: "appl_no" },
    { label: "App Status", key: "app_status" },
    { label: "Emp Position", key: "emppos" },
    { label: "DL", key: "dlno" },
    { label: "Email", key: "pemail" },
    { label: "Relation", key: "relation" },
    { label: "Current Address", key: "caddress" },
    { label: "Current Country", key: "ccountry" },
    { label: "Current State", key: "cstate" },
    { label: "Current City", key: "ccity" },
    { label: "Current Pin", key: "cpin" },
    { label: "Permanent Address", key: "paddress" },
    { label: "Permanent Country", key: "pcountry" },
    { label: "Permanent State", key: "pstate" },
    { label: "Permanent City", key: "pcity" },
    { label: "Permanent Pin", key: "ppin" },
    { label: "Father Name", key: "ffname" },
    { label: "Mother Name", key: "mothername" },
    { label: "Maritial Status", key: "mstatus" },
    { label: "Spouse Name", key: "spouse" },
    { label: "DOM", key: "dateofmar" },
    { label: "Emp Code", key: "empcode" },
    { label: "Department", key: "dept" },
    { label: "Sub Department", key: "sub_dept" },
    { label: "Designstion", key: "designstion" },
    { label: "Work Email", key: "workEmail" },
    { label: "H-D.O.J", key: "doj" },
    { label: "D.O.C", key: "doc" },
    { label: "Permanent State", key: "pstate" },

    { label: "Bank Name", key: "bank_name" },
    { label: "Beneficiary Name", key: "benef_name" },
    { label: "Acc No.", key: "baccount_no", type: "string" },
    { label: "Branch", key: "baccount_branch" },
    { label: "IFSC", key: "ifsc_code" },
    { label: "Reimbursement", key: "reimburse_P_mode" },
    { label: "Salary", key: "Salary_P_mode" },
    { label: "Name", key: "fname" },
    { label: "Interview Date", key: "interview_date" },
    { label: "Interview Mode", key: "interview_mode" },
    { label: "Position", key: "emppos" },
    { label: "Rating", key: "interview_rating" },

    { label: "first Interview Taken", key: "first_interview_taken_by" },
    { label: "first Interview Status", key: "first_interview_status" },
    { label: "first Interview Date", key: "first_interview_date" },
    { label: "first Interview Sign", key: "first_interview_sign" },

    { label: "second Interview Taken", key: "second_interview_taken_by" },
    { label: "second Interview Status", key: "second_interview_status" },
    { label: "second Interview Date", key: "second_interview_date" },
    { label: "second Interview Sign", key: "second_interview_sign" },

    { label: "final Interview Taken", key: "final_interview_taken_by" },
    { label: "final Interview Status", key: "final_interview_status" },
    { label: "final Interview Date", key: "final_interview_date" },
    { label: "final Interview Sign", key: "final_interview_sign" },

    { label: "Current Position ", key: "current_position" },
    { label: "Position Offered", key: "position_offered" },
    { label: "Expected CTC", key: "expected_ctc" },
    { label: "I-Joining Date", key: "joining_date" },
    { label: "Actual Date of Joining", key: "actual_date_of_joining" },
    { label: "Accept the Policy", key: "accept_the_policy" },

    { label: "Employee Name ", key: "fname" },
    { label: "Territory Person", key: "t_user_Person" },
    { label: "Designation", key: "t_id_desig" },
    { label: "Approval Date", key: "t_app_date" },
    { label: "Status", key: "t_id_status" },

    { label: "Regional Person", key: "r_user_Person" },
    { label: "Designation", key: "r_id_desig" },
    { label: "Approval Date", key: "r_app_date" },
    { label: "Status", key: "r_id_status" },

    { label: "Zonal Manager", key: "z_user_Person" },
    { label: "Designation", key: "z_id_desig" },
    { label: "Approval Date", key: "z_app_date" },
    { label: "Status", key: "z_id_status" },

    { label: "Unit Head", key: "bu_user_Person" },
    { label: "Designation", key: "bu_id_desig" },
    { label: "Approval Date", key: "z_app_date" },
    { label: "Status", key: "z_id_status" },

    { label: "Functional EMP Code", key: "fm_empcode" },
    { label: "Functional Manager", key: "functional_mgr" },
    { label: "Reporting EMP Code", key: "rp_empcode" },
    { label: "Reporting Manager", key: "rp_manager" },

    { label: "Zone EMP Code", key: "zdm_empcode" },
    { label: "Zone Reporting", key: "zdm_name" },
    { label: "HR EMP Code", key: "hr_empcode" },
    { label: "HR Manager", key: "hr_name" },
    { label: "SAP Vendor Code", key: "sap_v_code" },
    { label: "Employment Status", key: "emp_status" },
    { label: "Employment Category", key: "emp_category" },
    { label: "Joining Status", key: "etype" },
    { label: "Agreement Start Date", key: "agg_startdate" },
    { label: "Agreement End Date", key: "agg_enddate" },
    { label: "Agreement Status", key: "aggrement" },

    { label: "Retirement Date", key: "rdate" },
    { label: "H-Approval Fee", key: "app_amt" },
    { label: "H-Month Exp. Budget", key: "mon_reimamt" },
    { label: "I-Application Fee Amt", key: "in_appl_amt" },
    { label: "I-Monthly Expense", key: "in_expence_amt" },

    { label: "Company", key: "cmpny_name" },
    { label: "Business Segment", key: "business_segment" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Region", key: "region_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Reporting Office", key: "reporting_hq" },
    { label: "Remarks", key: "remarks" },

    { label: "Mobile No", key: "phone_number" },
    { label: "Email ID", key: "pemail" },
    { label: "Position", key: "emppos" },
    { label: "Territory", key: "territory_name" },
    { label: "Company", key: "cmpny_name" }
  ];

  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const [roleId, setRoleId] = useState(null);

  const [userPosition, setUserPosition] = useState(null);

  const [currentPage, setCurrentPage] = useState({ selected: 0 });
  const [pageCount, setPageCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [data, setData] = useState([]);
  const [refreshLogin, setRefreshLogin] = useState(false);

  const [istid, settid] = useState(null);
  const [rid, setrid] = useState(null);

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = window.localStorage.getItem("userinfo");
      if (userinfo) {
        const user = JSON.parse(userinfo);
        setRoleId(user?.role_id);
        setUserPosition(user?.position);
        settid(user.t_id);
        setrid(user.r_id);
      }
    }
  }, []);

  console.log("TID", istid);

  // console.log("Datdfdfda", data);

  const formattedData = data.map((row) => ({
    ...row,
    baccount_no: `'${row.baccount_no}`
  }));

  const getAllEmployees = async (page, bg, bu, z, r, t, empCode,) => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          c_id: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          paging: true,
          page: page,
          size: 50,
          bst: true,
          empcode: empCode,
          role_id:JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          position : JSON.parse(window.localStorage.getItem("userinfo")).position,
        }
      });

      const apires = respond.data.data.employeeData;
      const count = respond.data.data.employeeDataCount;

      setPageCount(Math.ceil(count / 50));
      setData(apires);
      setPageTotal(count);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getAllEmployees(
      page.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.empCode
    );
  };

  //Search Datas Variables

  const [searchData, setSearchData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("option");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteHandler = (id) => {
    setDeleteOpen(true);
    setEmployeeId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const resetData = () => {
    getAllEmployees(
      currentPage.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.empCode
    );
    setDeleteOpen(false);
  };

  const [employeeDetails, setEmployeeDetails] = useState({
    appNo: "",
    firstName: "",
    midName: "",
    lastName: "",
    prefix: "",
    mobile: "",
    email: "",
    position: "",
    commpany: "",
    territory: ""
  });

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    midName: Yup.string().required("Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    prefix: Yup.string().required("Prefix is required"),
    mobile: Yup.number()
      .transform((value, originalValue) => {
        if (originalValue === "") return undefined;
        return Number(value);
      })

      .test("is-valid-number", "Please Enter 10 digit Number", (value) => {
        if (!value) return false;
        const stringValue = value.toString();
        return /^[6-9]\d{9}$/.test(stringValue);
      })
      .typeError("Mobile No must be a valid number"),
    email: Yup.string()
      .required("Email is required")
      .email()
      .matches(/^(?!.*@[^,]*,)/),
    position: Yup.string().required("Position is required"),
    commpany: Yup.string().required("Company is required"),
    territory: Yup.string().required("Territory is required")
  });

  const [empIdState, setEmpIdState] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);

  const handleGenerateEmployee = async () => {
    setGenerateLoading(true);
    try {
      // await validationSchema.validate(employeeDetails, {
      //   abortEarly: false
      // });
      const data = {
        c_id: Number(employeeDetails.commpany),

        t_id: Number(employeeDetails.territory),
        app_status: "Generate Application",
        appl_dt: new Date(),
        prefix: employeeDetails.prefix,
        fname: employeeDetails.firstName,
        mname: employeeDetails.midName,
        lname: employeeDetails.lastName,
        phone_number: employeeDetails.mobile,
        pemail: employeeDetails.email,
        emppos: employeeDetails.position
      };
      // console.log("data", data)
      // return
      const respond = await axios
        .post(`${url}/api/add_employee`, JSON.stringify(data), {
          headers: headers
        })
        .then((res) => {
          if (!res) return;
          toast.success("Employee added successfully!");

          setEmployeeDetails({
            appNo: res.data.data.appl_no,
            company: res.data.data.c_id,
            territory: res.data.data.t_id,
            prefix: res.data.data.prefix,
            firstName: res.data.data.fname,
            midName: res.data.data.mname,
            lastName: res.data.data.lname,
            mobile: res.data.data.phone_number,
            email: res.data.data.pemail,
            position: res.data.data.emppos
          });
          setEmpIdState(res.data.data.e_id);
        });
    } catch (errors) {
      console.log("CheckError", errors);
      const errorMessage = errors?.response?.data?.error;
      const errorMessageBE = errors?.response?.data?.message;
      if (errorMessageBE) {
        toast.error(errorMessageBE);
      }
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("phone_number")) {
        toast.error("Mobile No. already exist");
      } else if (errorMessage) {
        toast.error(errorMessage);
      }

      errors?.inner?.forEach((error) => {
        toast.error(error?.message);
      });
    } finally {
      setGenerateLoading(false);
    }
  };

  const [allCompany, setAllCompany] = useState([]);
  // Getting Company Information for the dropdown values
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setAllCompany(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };
  //Getting Territory List

  const [allTerritory, setAllTerritory] = useState([]);
  const getTerritoryInfo = async (tid, rid) => {
    let endpoints = "";
    if (rid !== null && tid == null) {
      endpoints = `get_territory_by_regionId/${rid}`;
    } else if (tid !== null) {
      endpoints = `get_territory?t_id=${tid}`;
    }
    try {
      const respond = await axios.get(`${url}/api/${endpoints}`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setAllTerritory(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
      setAllTerritory([]);
    }
  };
  // Getting Position List

  const [positionList, setPositionList] = useState(null);

  const getEmpCatList = async () => {
    try {
      const res = await axios.get(`${url}/api/get_mr_category?c_id=1`, { headers: headers });
      const resdata = await res.data.data;
      setPositionList(resdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpCatList();
  }, []);

  useEffect(() => {
    getTerritoryInfo(istid, rid);
    getCompanyInfo();
  }, [istid, rid]);

  const handleCloseModal = () => {
    setisOpen(false);
    getAllEmployees(
      currentPage.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.empCode
    );
    setEmployeeDetails({
      appNo: "",
      firstName: "",
      midName: "",
      lastName: "",
      prefix: "",
      mobile: "",
      email: "",
      position: "",
      commpany: "",
      territory: ""
    });
    setEmpIdState(null);
  };

  console.log("ROLLL", roleId);

  const { name } = router.query;

  //Searching API

  const searchAPI = async (key, value) => {
    switch (key) {
      case "empcode":
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(value)) {
          toast.error(`${key.replace("_", " ")} must be a valid number`);
          return;
        }
        break;
      case "phone_number":
        if (!/^\d{10}$/.test(value)) {
          toast.error(`${key.replace("_", " ")} must be a 10-digit number.`);
          return;
        }
        break;
      case "pan":
        if (!/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(value)) {
          toast.error(`${key.replace("_", " ")} must be a valid PAN card number`);
          return;
        }
        break;
      case "account":
        if (!/^\d{3,}$/.test(value)) {
          toast.error(`${key.replace("_", " ")} must be a valid bank account number.`);
          return;
        }
        break;
      case "adhar":
        if (!/^\d{12}$/.test(value)) {
          toast.error(`${key.replace("_", " ")} must be a valid Aadhar number.`);
          return;
        }
        break;
      case "status":
        if (typeof value !== "string" || value.trim() === "") {
          toast.error(`${key.replace("_", " ")} must be a valid non-empty string.`);
          return;
        }
        break;

      case "all":
        break;
      case "hr_pendency":
        break;
      case "tm_status":
        value = "pending";
        break;
      case "rm_status":
        value = "pending";
        break;
      case "zm_status":
        value = "pending";
        break;
      case "hr_pendency":
        break;
      default:
        if (!value || !/^[a-zA-Z\s]+$/.test(value.trim())) {
          toast.error(`Please enter a valid search term for ${key.replace("_", " ")}.`);
          return;
        }
        break;
    }
    try {
      const res = await axios.get(`${url}/api/get_employee`, {
        params: {
          search: true,
          [key]: key === "all" ? "all" : value,
          [key]: key === "tm_status" ? "tm_status" : value,
          [key]: key === "rm_status" ? "rm_status" : value,
          [key]: key === "zm_status" ? "zm_status" : value,
          [key]: key === "hr_pendency" ? "hr_pendency" : value
        },
        headers
      });
      const resapi = await res.data.data;
      console.log("SearchData", resapi);
      setData(resapi);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = () => {
    searchAPI(searchFilter, searchTerm);
    // handlePageChange()
  };

  useEffect(() => {
    if (["all", "hr_pendency", "tm_status", "rm_status", "zm_status"].includes(searchFilter)) {
      searchAPI(searchFilter, searchTerm);
    }
  }, [searchFilter]);

  //////////////////////////////////////////////////////// Start JSX ///////////////////////////////////////////////////////////////////////////////////////////

  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null
  });

  // All Filters
  const [filterState, setFilterState] = useState({
    bgId: null,
    buId: null,
    zId: null,
    rId: null,
    tId: null,
    tDes: null,
    rDes: null,
    zDes: null,
    buDes: null,
    bgDes: null,
    empCode: null
  });

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setBgData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesSegmentInfo();
  }, []);

  const [buData, setBuData] = useState([]);

  const getBusinessUnitInfo = async (businessSegmentId) => {
    try {
      const respond = await axios.get(`${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setBuData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinessUnitInfo(filterState.bgId);
  }, [filterState.bgId]);

  const [allZoneData, setAllZoneData] = useState([]);
  const getAllZoneData = async (segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers
      });

      const apires = await respond.data.data;

      setAllZoneData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId) return;
    getAllZoneData(filterState.bgId, filterState.buId);
  }, [filterState.bgId, filterState.buId]);

  const [allRegionData, setAllRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers
      });

      const apires = await respond.data.data;

      setAllRegionData(apires);
      setAllRegionData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId || !filterState.zId) return;
    getAllRegionData(filterState.bgId, filterState.buId, filterState.zId);
  }, [filterState.bgId, filterState.buId, filterState.zId]);

  const [allTerritoryData, setAllTerritoryData] = useState([]);

  const getAllTerritoryData = async (segmentId, businessUnitId, zoneId, regionId) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers
      });

      const apires = await respond.data.data;

      setAllTerritoryData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId || !filterState.zId || !filterState.rId) return;
    getAllTerritoryData(filterState.bgId, filterState.buId, filterState.zId, filterState.rId);
  }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId]);
  const [allEmployee, setAllEmployee] = useState([]);
  const getAllEmployeeData = async (bg, bu, z, r, t) => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          zrt: true,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id
        }
      });
      const apires = await respond.data.data;
      setAllEmployee(apires);
    } catch (error) {}
  };

  // useEffect(() => {
  //   getAllEmployeeData(filterState.bgId, filterState.buId, filterState.zId, filterState.rId, filterState.tId);
  // }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId, filterState.tId]);

  useEffect(() => {
    // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All"
    };
    switch (roleId) {
      case 6:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id
        });

        setFilterState(filterState);

        break;
      case 5:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          tId: "All",
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
        });

        setFilterState(filterState);

        break;
      case 4:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId: "All",
          tId: "All",
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id || "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo")).emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).emp_code
        });

        setFilterState(filterState);

        break;
      case 3:
        filterState = {
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id || "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id
        });

        setFilterState(filterState);

        break;
      case 10:
        filterState = {
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id || "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id || "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id
        });

        setFilterState(filterState);

        break;
      default:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        });
        setFilterState(filterState);

        break;
    }
  }, []);

  useEffect(() => {
    setCurrentPage({ selected: 0 });
    
    if (filterState.bgId) {
      getAllEmployees(
        1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.empCode,
        roleId
      );
    }
  }, [
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
    // searchFilter,
    refreshLogin
  ]);

  /// Disabling Delete Button

  const [delDisable, setDelDisable] = useState(null);
  useEffect(() => {
    switch (roleId) {
      case 12:
      case 5:
      case 4:
      case 3:
        setDelDisable(true);
        break;
      default:
        break;
    }
  }, [roleId]);

  console.log("SearchData", searchFilter);
  console.log("data", data.length);

  //creating Login handler

  const createLogin = async (item) => {
    const data = {
      t_user: "MR",
      user_name: item?.fname + "" + item?.lname,
      address: item?.caddress,
      city: item?.pcity,
      state: item?.pcountry,
      phone_number: item?.phone_number,
      password: "admin1234",
      confirm_password: "admin1234",
      email: item.pemail,
      app_type:"Field Force Apps",
      status: 1,
      position: item.emppos,
      about_me: "About me",
      otp_enable: 0,
      mode: [{label:"mobile", value:"mobile"}],
      c_id: [
        {
          label: "Willowood Chemicals Limited",
          value: 1
        }
      ],
      role_id: 7,
      emp_code: item?.empcode,
      c_name: "dummy",
      ul_name: item?.fname,
      login_status: 0
    };

    console.log("yupp", data);
    // return
    try {
      const res = await axios.post(`${url}/api/create_user`, data, {
        headers: headers
      });
      const resp = await res.data;
      console.log("respEMP", resp);
      if (resp) {
        toast.success(resp.message);
        setRefreshLogin(true);
        whatsAppMsg(data.phone_number, data.user_name);
      }
    } catch (error) {
      // const errMsg = error.resp.data.message;
      // toast.error(errMsg);
    }
  };

  async function whatsAppMsg(phone, username) {
    try {
      const payLoad = {
        recipient: phone.toString(),
        tem_id: "142599",
        placeholders: [username, phone.toString(), "http://digital.willowood.com"]
      };
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("Image", respData?.data?.image_url);
      setUserImage(respData?.data?.image_url);
    } catch (error) {
      console.log("Error", error);
    }
  }

  const filterDisableOption = (currentFilter) => {
    function getLastAssignedKey(filterState) {
      const keys = ["bgId", "buId", "zId", "rId", "tId"];

      for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        if (typeof filterState[key] === "number" && !isNaN(filterState[key])) {
          return key;
        }
      }

      return null;
    }

    console.log("zpo", currentFilter);
    const role = localStorageItems.roleId;
    console.log("pop", role);

    if (role === 9) {
      switch (currentFilter) {
        case "Teritory":
          if (getLastAssignedKey(filterState) === "tId") {
            return true;
          } else {
            return false;
          }
        case "Region":
          if (getLastAssignedKey(filterState) === "tId" || getLastAssignedKey(filterState) === "rId") {
            return true;
          } else {
            return false;
          }
        case "Zone":
          if (
            getLastAssignedKey(filterState) === "tId" ||
            getLastAssignedKey(filterState) === "rId" ||
            getLastAssignedKey(filterState) === "zId"
          ) {
            return true;
          } else {
            return false;
          }
        case "BU":
          if (
            getLastAssignedKey(filterState) === "tId" ||
            getLastAssignedKey(filterState) === "rId" ||
            getLastAssignedKey(filterState) === "zId" ||
            getLastAssignedKey(filterState) === "buId"
          ) {
            return true;
          } else {
            return false;
          }
        case "BG":
          if (
            getLastAssignedKey(filterState) === "tId" ||
            getLastAssignedKey(filterState) === "rId" ||
            getLastAssignedKey(filterState) === "zId" ||
            getLastAssignedKey(filterState) === "buId" ||
            getLastAssignedKey(filterState) === "bgId"
          ) {
            return true;
          } else {
            return false;
          }
      }
    } else {
      switch (currentFilter) {
        case "Territory":
          if (role === 6) {
            return true;
          } else {
            return false;
          }
        case "Region":
          if (role === 6 || role === 5) {
            return true;
          } else {
            return false;
          }
        case "Zone":
          if (role === 6 || role === 5 || role === 4) {
            return true;
          } else {
            return false;
          }
        case "BU":
          if (role === 6 || role === 5 || role === 4 || role === 3) {
            return true;
          } else {
            false;
          }
        case "BG":
          if (role === 6 || role === 5 || role === 4 || role === 3 || role === 10) {
            return true;
          } else {
            return false;
          }
      }
    }
  };

  return (
    // <Layout>
    <>
      <div className=" w-full font-arial bg-white ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">{name ? name : "MR Employee Onboard"}</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <span className="flex flex-row">
              <input
                type="search"
                placeholder="Search"
                className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
              />
              <button type="submit" className="bg-blue-500 text-white rounded-r-md p-1 ">
                <AiOutlineSearch className="mx-2 my-1" size={20} />
              </button>
            </span>
            <h2>
              {/* <CSVLink data={data} headers={csvHeaders}> */}
              <CSVLink data={formattedData} headers={csvHeaders}>
                <TbFileDownload className="text-green-600" size={34}></TbFileDownload>
              </CSVLink>
            </h2>
            <AiTwotoneHome
              onClick={() => {
                router.push("/");
              }}
              className="text-red-500"
              size={34}
            />
            {(roleId == 1 || roleId == 5 || roleId == 6 || roleId == 8) && (
              <button
                className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
                onClick={() => setisOpen(true)}
              >
                Generate MR Requisition
              </button>
            )}
          </span>
        </div>

        <div className="flex flex-row gap-4  px-4 w-vw pb-2">
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.bgId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                  buId: "All",
                  zId: "All",
                  rId: "All",
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value
                });
              }
            }}
            disabled={filterDisableOption("BG")}
          >
            <option value={"All"} className="font-bold">
              - All Business Segment -
            </option>

            {bgData.map((item, idx) => (
              <option value={item.bg_id} key={idx}>
                {item.business_segment}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.buId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,

                  zId: "All",
                  rId: "All",
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value
                });
              }
            }}
            disabled={filterDisableOption("BU")}
          >
            <option value={"All"}>- All Business Unit -</option>

            {buData.map((item, idx) => (
              <option value={item.bu_id} key={idx}>
                {item.business_unit_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.zId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  rId: "All",
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  tid:""
                });
              }
            }}
            disabled={filterDisableOption("Zone")}
          >
            <option value={"All"}>- All Zone -</option>

            {allZoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.rId}
            disabled={filterDisableOption("Region")}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "All"
                });
              } else {
                setFilterState({
                  ...filterState,
                  rId: e.target.value
                });
              }
            }}
          >
            <option value={"All"}>-All Region -</option>

            {allRegionData.map((item, idx) => (
              <option value={item.r_id} key={idx}>
                {item.region_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-1/2 h-8"
            id="stateSelect"
            value={filterState.tId}
            disabled={filterDisableOption("Territory")}
            onChange={(e) =>
              setFilterState({
                ...filterState,
                tId: e.target.value
              })
            }
          >
            <option value="All">- All Territory -</option>

            {allTerritoryData.map((item, idx) => (
              <option value={item.t_id} key={idx}>
                {item.territory_name}
              </option>
            ))}
          </select>

          {(roleId == 8 || roleId == 1) && (
            <div className="flex flex-row gap-2  items-center ">
              <select
                className="border rounded px-2 py-1  h-8"
                id="stateSelect"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              >
                <option value="option" className="focus:outline-none focus:border-b bg-white">
                  Option
                </option>
                <option value="all">All</option>
                <option value="empcode">Employee Code</option>
                <option value="phone_number">Mobile</option>
                <option value="emp_name">Full Name</option>
                <option value="adhar">Aadhar No.</option>
                <option value="pan">Pan No.</option>
                <option value="reporting_hq">Reporting HQ</option>
                <option value="account">Bank Account No.</option>
                <option value="tm_status">TM Pending Status</option>
                <option value="rm_status">RM Pending Status</option>
                <option value="zm_status">ZM Pending Status</option>
                <option value="hr_pendency">Onboarding Pendency By HR</option>
              </select>

              {searchFilter === "all" ||
              searchFilter === "option" ||
              searchFilter === "tm_status" ||
              searchFilter === "rm_status" ||
              searchFilter === "zm_status" ||
              searchFilter === "hr_pendency" ? (
                <>
                  <div>{null}</div>
                </>
              ) : (
                <div className="">
                  <span className="flex flex-row">
                    <input
                      className="border-2 rounded px-2 py-1   h-8"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value.trim());
                      }}
                    />
                    <button
                      onClick={() => {
                        handleSearch();
                      }}
                      type="submit"
                      className="bg-blue-500 text-white rounded-r-md p-1 "
                    >
                      <AiOutlineSearch className="mx-1.5" size={20} />
                    </button>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white  mb-2 flex items-start justify-center maxwful w-vw mx-4">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto  w-vw p-2">
            <table className=" border divide-gray-200 table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial w-max">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Status
                  </th>
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Rejection Reason
                  </th>
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Rejection Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employee Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    SAP Vendor Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile No
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PAN No
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit Division
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reporting Office
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reporting EMP Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reporting Manager
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region Person
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Designation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Approval
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date Of Joining
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Actual Date Of Joining
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Account No.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Branch
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    IFSC Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Application Fee Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Expense Amt.
                  </th>

                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App No.
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp No
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp Name
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GRADE
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Nationality
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Skill Type
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Highest Qualification
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Total Experience
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    PAN No
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Aadhar No.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Passport No.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    D.L. Number
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Personal Email
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile No
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emergency Contact Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emergency Contact No.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Relation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Current Address
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Current City
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Current State
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Current Country
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Current Pin
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Permanent Address
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Permanent City
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Permanent State
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Permanent Country
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Permanent Pin
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Father Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mother Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Marital Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Spouse Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Marriage
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bank Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Beneficiary Name
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Account No.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Branch
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    IFSC Code
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Salary Pay Mode
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reimbursement Pay Mode
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employee Name
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Interview
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Interview Mode
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Position
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Application Fee Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Expense Amt.
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Festival Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Spec Incentive Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Other Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bonus Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Other Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Type of TDS
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    TDS %
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Interview Rating
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    First Interview
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    First Interview Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    First Interview Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    First Interview Sign
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Second Interview
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Second Interview Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Second Interview Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Second Interview Sign
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Final Interview
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Final Interview Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Final Interview Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Final Interview Sign
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Current Position
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Position Offered
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Expected CTC
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date Of Joining
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Actual Date Of Joining
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Agreement
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory Person
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Designation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Approval
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>

                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region Person
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Designation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Approval
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zonal Manager
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Designation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Approval
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Unit
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Designation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Date of Approval
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>

                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employee Code
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Sub Department
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Designation
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Work Email
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    HR Joing Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    HR Date of Confirmation
                  </th>

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Functional EMP Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Functional Manager
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reporting EMP Code
                  </th> */}
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reporting Manager
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone EMP Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone Reporting Manager
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    HR EMP Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    HR Manager
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    SAP Vendor Code
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    GPA Policy
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    WhatsApp
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Application Fee Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Expense Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Festival Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Spec Incentive Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Other Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Bonus Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Other Amt.
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Type of TDS
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    TDS %
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employment Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employment Category
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Joining Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Agreement Start Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Agreement End Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Agreement Renewal Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company Info
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Sgement
                  </th>
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Unit Division
                  </th> */}
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Zone
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Region
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th> */}
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reporting Office
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Remarks
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Document
                  </th>

                  {/* prev */}

                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile No
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Email Id
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Position
                  </th> */}
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th> */}
                  {/* <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp Status
                  </th> */}
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  // console.log("EMPLOO", item),
                  <tr className="dark:border-2" key={idx}>
                    <td className="  px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/employee_details",
                            query: { id: item.e_id, type: "View" }
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      {/* Edit Options Outer Grid  */}

                      {(() => {
                        if (roleId == 1 || roleId == 8 || roleId===17) {
                          switch (item.app_status) {
                            case "Generate Application":
                            case "Update Snapshot":
                            case "Update Personal":
                            case "Update Family":
                            case "Update Bank":
                            case "Update Interview":
                            case "Update Agreement":
                            case "Update Experience":
                            case "Update Education":
                            case "MR Dealer Map":
                            case "Submitted By Territory":
                            case "Approved By Business Unit":
                            case "Approved By Region":
                            case "Approved By Zonal":
                            case "Approved By Zonal A/c Manager":
                            case "HR Joining Process Done":
                            case "Recommended By ZDM":
                            case "Recommended By RDM":
                              return (
                                <button
                                  onClick={() => {
                                    router.push({
                                      pathname: "/employee_details",
                                      query: { type: "Edit", id: item?.e_id }
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        }
                        // new condition
                        else if (roleId == 6) {
                          switch (item.app_status) {
                            case "Generate Application":
                            case "Update Snapshot":
                            case "Update Personal":
                            case "Update Education":
                            case "Update Experience":
                            case "Update Family":
                            case "MR Dealer Map":
                            case "Update Bank":
                            case "Update Interview":
                            case "Update Agreement":
                              return (
                                <button
                                  onClick={() => {
                                    router.push({
                                      pathname: "/employee_details",
                                      query: { type: "Edit", id: item?.e_id }
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        } else if (roleId == 5) {
                          switch (item.app_status) {
                            case "Update Assessment":
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "Assessment"
                                    };
                                    router.push({
                                      pathname: "/employee_details",
                                      query: query
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        } else if (roleId == 12) {
                          switch (item.app_status) {
                            case "Update SAP Info":
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "SAP Info"
                                    };
                                    router.push({
                                      pathname: "/employee_details",
                                      query: query
                                    });
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Edit
                                </button>
                              );
                            default:
                              return null;
                          }
                        }
                      })()}
                      {/* Delete Options For Outer Grid  */}
                      {/* <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.e_id);
                        }}
                      >
                        Delete
                      </button> */}
                      {/* {(() => {
                        switch (item.app_status) {
                          case "Generate Application":
                          case "Update Snapshot":
                          case "Update Personal":
                          case "Update Family":
                          case "Update Bank":
                          case "Update Interview":
                          case "Update Agreement":
                            if (roleId == 6 || 1) {
                              return (
                                <button
                                  disabled={delDisable}
                                  onClick={() => {
                                    deleteHandler(item?.e_id);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Delete
                                </button>
                              );
                            } else {
                              return null;
                            }
                          case "Update Bank":
                          case "Update Agreement":
                          case "Update Interview":
                          case "Approved By Business Unit":
                          case "Submitted By Territory":
                          case "Approved By Region":
                          case "Approved By Zonal":
                          case "Approved By Zonal A/c Manager":
                          case "Generate Application":
                            if (roleId == 1) {
                              return (
                                <button
                                  disabled={delDisable}
                                  onClick={() => {
                                    deleteHandler(item?.e_id);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Delete
                                </button>
                              );
                            } else {
                              return null;
                            }
                          default:
                            return null;
                        }
                      })()} */}

                      {/* Structured Code Switch and If conditions */}

                      {(() => {
                        if (roleId === 1 || roleId === 6 || roleId===17) {
                          // Handle the statuses for both roleId 1 and 6
                          switch (item.app_status) {
                            case "Generate Application":
                            case "Update Snapshot":
                            case "Update Personal":
                            case "Update Education":
                            case "Update Experience":
                            case "Update Family":
                            case "MR Dealer Map":
                            case "Update Bank":
                            case "Update Interview":
                            case "Update Agreement":
                              return (
                                <button
                                  disabled={delDisable}
                                  onClick={() => {
                                    deleteHandler(item?.e_id);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Delete
                                </button>
                              );
                            default:
                              break;
                          }
                        }

                        // Check for roleId 1 only and specific statuses

                        if (roleId === 1 || roleId === 8 || roleId===17) {
                          switch (item.app_status) {
                            case "Submitted By Territory":
                            case "Approved By Business Unit":
                            case "Approved By Region":
                            case "Approved By Zonal":
                            case "Approved By Zonal A/c Manager":
                            case "HR Joining Process Done":
                            case "Generate Application":
                            case "Update Snapshot":
                            case "Update Personal":
                            case "Update Family":
                            case "Update Bank":
                            case "Update Education":
                            case "Update Experience":
                            case "Update Interview":
                            case "Update Agreement":
                            case "Recommended By ZDM":
                            case "Recommended By RDM":
                            case "MR Dealer Map":
                              return (
                                <button
                                  disabled={delDisable}
                                  onClick={() => {
                                    deleteHandler(item?.e_id);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Delete
                                </button>
                              );
                            default:
                              return null;
                          }
                        }

                        // If none of the conditions match, return null
                        return null;
                      })()}

                      {/* Extra button added for login */}

                      {(() => {
                        if (roleId === 1 || roleId === 8 || roleId ===17) {
                          switch (item.app_status) {
                            case "HR Joining Process Done":
                              return (
                                <button
                                  disabled={item.login_created === true}
                                  onClick={() => {
                                    createLogin(item);
                                  }}
                                  className={`text-black ${
                                    item.login_created ? "text-green-500" : "text-red-500"
                                  } ml-2`}
                                >
                                  {item.login_created ? "Login Created" : "Create Login"}
                                </button>
                              );
                            default:
                              return null;
                          }
                        }
                        return null;
                      })()}
                      {/* Approve Options For Outer Grid  */}
                      {(() => {
                        switch (item.app_status) {
                          // case "Submitted By Territory":
                          // case "Approved By Zonal A/c Manager":
                          // case "Approved By Zonal":
                          //   if (roleId === 12) {
                          //     return (
                          //       <button
                          //         onClick={() => {
                          //           let query = {
                          //             type: "EditAp",
                          //             role: roleId,
                          //             id: item?.e_id,
                          //             formType: "SAP Info"
                          //           };
                          //           router.push({
                          //             pathname: "/employee_details",
                          //             query: query
                          //           });
                          //         }}
                          //         className="b text-black hover:text-red-500 ml-2"
                          //       >
                          //         Approve
                          //       </button>
                          //     );
                          //   } else {
                          //     return null;
                          //   }
                          // case "Approved By Zonal A/c Manager":

                          //New Condition RDM Approval
                          case "Submitted By Territory":
                            if (roleId === 9) {
                              if (userPosition == "RDM") {
                                return (
                                  <button
                                    onClick={() => {
                                      let query = {
                                        type: "EditAp",
                                        role: roleId,
                                        id: item?.e_id,
                                        formType: "Approval"
                                      };
                                      router.push({
                                        pathname: "/employee_details",
                                        query: query
                                      });
                                    }}
                                    className="b text-bla font-semibold text-red-500 ml-2"
                                  >
                                    Approve MR Requisition
                                  </button>
                                );
                              } else {
                                return null;
                              }
                            } else {
                              return null;
                            }

                          case "Approved By Region":
                            if (roleId === 9) {
                              if (userPosition == "ZDM") {
                                return (
                                  <button
                                    onClick={() => {
                                      let query = {
                                        type: "EditAp",
                                        role: roleId,
                                        id: item?.e_id,
                                        formType: "Approval"
                                      };
                                      router.push({
                                        pathname: "/employee_details",
                                        query: query
                                      });
                                    }}
                                    className="b text-bla font-semibold text-red-500 ml-2"
                                  >
                                    Approve MR Requisition
                                  </button>
                                );
                              } else {
                                return null;
                              }
                            } else {
                              return null;
                            }

                          // case "Submitted By Territory":
                          case "Recommended By RDM":
                            if (roleId === 5) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "Approval"
                                    };
                                    router.push({
                                      pathname: "/employee_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-bla font-semibold text-red-500 ml-2"
                                >
                                  Approve MR Requisition
                                </button>
                              );
                            } else {
                              return null;
                            }
                          // case "Approved By Region":
                          case "Recommended By ZDM":
                            if (roleId === 4) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "Approval"
                                    };
                                    router.push({
                                      pathname: "/employee_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-bl font-semibold text-red-500  ml-2"
                                >
                                  Approve MR Requisition
                                </button>
                              );
                            } else {
                              return null;
                            }
                          case "Approved By Zonal":
                            if (roleId === 3) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "Approval"
                                    };
                                    router.push({
                                      pathname: "/employee_details",
                                      query: query
                                    });
                                  }}
                                  className="b text-b font-semibold text-red-500 ml-2"
                                >
                                  Approve MR Requisition
                                </button>
                              );
                            } else {
                              return null;
                            }
                          default:
                            return null;
                        }
                      })()}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.app_status}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{(item.rdm_r_reason || item.rm_r_reason || item.zdm_r_reason || item.zm_r_reason || item.bu_r_reason) ?? ""}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.rdm_r_date || item.rm_r_date || item.zdm_r_date || item.zm_r_date || item.bu_r_date ? moment(item?.rdm_r_date || item?.rm_r_date || item?.zdm_r_date || item?.zm_r_date || item?.bu_r_date).format("DD/MM/YYYY"):""}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.empcode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.sap_v_code}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {`${item.fname} ${item.mname} ${item.lname}`}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.phone_number}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pan}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.business_unit_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zone_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.region_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.territory_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.reporting_hq}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.rp_empcode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.rp_manager}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_app_date ? moment(item.r_app_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.joining_date ? moment(item.joining_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.actual_date_of_joining
                        ? moment(item.actual_date_of_joining).format("DD/MM/Y")
                        : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.baccount_no}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.baccount_branch}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.ifsc_code}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_appl_amt}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_expence_amt}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.appl_no}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.appl_dt ? moment(item.appl_dt).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.e_id}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {`${item.fname} ${item.mname} ${item.lname}`}
                    </td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.dob ? moment(item.dob).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.grade}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.gen}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.blgrp}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.nationa}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.skilltype}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hgtqual}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tot_exp}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pan}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.adhar}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.passport}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.dlno}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pemail}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.phone_number}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emergency_con}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emergency_conno}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.relation}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.caddress}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.ccity}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.cstate}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.ccountry}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.cpin}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.paddress}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pcity}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pstate}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pcountry}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.ppin}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.ffname}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.mothername}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.mstatus}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.spouse}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.dateofmar ? moment(item.dateofmar).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bank_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.benef_name}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.baccount_no}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.baccount_branch}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.ifsc_code}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.Salary_P_mode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.reimburse_P_mode}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.fname + item.mname + item.lname}
                    </td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.interview_date ? moment(item.interview_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.interview_mode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emppos}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_appl_amt}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_expence_amt}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_fest_amount_e}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.in_special_allowance_e}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_other_amt_e}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_bonus_amt_d}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.in_other_amt_d}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tds_section}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tds_percent}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.interview_rating}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.first_interview_taken_by}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.first_interview_status}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.first_interview_date ? moment(item.first_interview_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.first_interview_sign}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.second_interview_taken_by}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.second_interview_status}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.second_interview_date ? moment(item.second_interview_date).format("DD/MM/Y") : ""}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.second_interview_sign}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.final_interview_taken_by}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.final_interview_status}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.final_interview_date ? moment(item.final_interview_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.final_interview_sign}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.current_position}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.position_offered}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.expected_ctc}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.joining_date ? moment(item.joining_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.actual_date_of_joining
                        ? moment(item.actual_date_of_joining).format("DD/MM/Y")
                        : ""}
                    </td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.accept_the_policy=="true" ? "Accepted" : "Not Accepted"}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.fname}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.t_app_date ? moment(item.t_app_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_id_status}</td>

                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_app_date ? moment(item.r_app_date).format("DD/MM/Y") : ""}
                    </td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_status}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_app_date ? moment(item.z_app_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_id_status}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bu_app_date ? moment(item.bu_app_date).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_id_status}</td>

                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.empcode}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.dept}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.sub_dept}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.design}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.wemail}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.doj ? moment(item.doj).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.dconfm ? moment(item.dconfm).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.fm_empcode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.functional_mgr}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.functional_mgr}</td> */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.rp_empcode}</td> */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.rp_manager}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zdm_empcode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zdm_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hr_empcode}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hr_name}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.sap_v_code}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.gpa_policy ? "Enabled" : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.whatsup ? "Enabled" : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.app_amt}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.mon_reimamt}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hr_fest_amount_e}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.hr_special_allowance_e}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hr_other_amt_e}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hr_bonus_amt_d}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.hr_other_amt_d}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tds_section}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.tds_percent}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emp_status}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emp_category}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap joining">{item.etype}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.agg_startdate ? moment(item.agg_startdate).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.agg_enddate ? moment(item.agg_enddate).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.aggrement}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.cmpny_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.business_segment}</td>
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.business_unit_name}</td> */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zone_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.region_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.territory_name}</td> */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.reporting_hq}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.remarks}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.has_docs ? "Attached" : "Not Attached"}
                    </td>

                    {/* prev */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.phone_number}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.pemail}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emppos}</td> */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.territory_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.cmpny_name}</td> */}
                    {/* <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.emp_status}</td> */}
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted == false ? "Enabled" : "Disabled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {searchFilter !== "empcode" &&
        searchFilter !== "phone_number" &&
        searchFilter !== "all" &&
        searchFilter !== "emp_name" &&
        searchFilter !== "adhar" &&
        searchFilter !== "pan" &&
        searchFilter !== "reporting_hq" &&
        searchFilter !== "account" &&
        searchFilter !== "tm_status" &&
        searchFilter !== "rm_status" &&
        searchFilter !== "hr_pendency" &&
        searchFilter !== "hr_pendency_res" &&
        searchFilter !== "zm_status" ? (
          <div className="w-full flex flex-row justify-between mx-auto px-2  pb-4 bg-white ">
            <div className="flex flex-row gap-1 px-2 py-1 mt-4 border border-black rounded-md text-slate-400">
              Showing{" "}
              <small className="font-bold px-2 self-center text-black">
                {data.length > 0 ? currentPage?.selected * 50 + 1 : 0}
              </small>{" "}
              to{" "}
              <small className="font-bold px-2 self-center text-black">
                {currentPage?.selected * 50 + data.length}
              </small>{" "}
              of <small className="font-bold px-2 self-center text-black">{pageTotal}</small> results
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              className="flex flex-row gap-2 px-2 py-1 mt-4 border border-black rounded-md"
            />
          </div>
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10   " onClose={() => handleCloseModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto mt-2 ">
            <div className="flex h-full items-center justify-center p-4 text-center  ">
              <Toaster position="bottom-center" reverseOrder={false} />
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="relative  z-20 flex items-center justify-center ">
                  <div className="absolute z-40 flex  -top-6 ">
                    <Image className="  h-[3.1rem] w-[3.1rem] rounded-full   " src={Profile} alt="img" />
                  </div>
                  <Dialog.Panel className="relative max-h-full overflow-hidden  font-arial  max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <p className="text-sm  text-gray-500 ">
                        Its incredible to have a young, fresh and talented mew member join our team. By
                        working together, we can take the company a great heights, Welcome Aboard!
                      </p>
                    </div>

                    <hr className="mt-1 mb-1" />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-center text-gray-500">Welcome!</h4>
                      <h3 className="text-center text-gray-500 text-lg">
                        {employeeDetails.firstName} {employeeDetails.midName} {employeeDetails.lastName}
                      </h3>
                    </div>
                    {!empIdState && (
                      <div className="flex justify-center">
                        <Image
                          className="max-w-full "
                          height={100}
                          src={EmpImage}
                          alt="Picture of the author"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row gap-2 justify-between px-2 ">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          First Name
                        </label>
                        <div className="flex lg:flex flex-row gap-1">
                          {" "}
                          <select
                            className="  text-sm   text-gray-700  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            id="stateSelect"
                            value={employeeDetails.prefix}
                            disabled={empIdState}
                            onChange={(e) =>
                              setEmployeeDetails({
                                ...employeeDetails,
                                prefix: e.target.value
                              })
                            }
                          >
                            <option value="" className="focus:outline-none focus:border-b bg-white">
                              -- Prefix --
                            </option>

                            <option value="Mr." className="focus:outline-none focus:border-b bg-white">
                              Mr.
                            </option>
                            <option value="Dr." className="focus:outline-none focus:border-b bg-white">
                              Dr.
                            </option>
                            <option value="Mrs." className="focus:outline-none focus:border-b bg-white">
                              Mrs.
                            </option>
                            <option value="Miss." className="focus:outline-none focus:border-b bg-white">
                              Miss.
                            </option>
                            <option value="Master." className="focus:outline-none focus:border-b bg-white">
                              Master
                            </option>
                          </select>
                          <input
                            className="text-black px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="small-input"
                            placeholder="First Name"
                            value={employeeDetails.firstName}
                            disabled={empIdState}
                            onChange={(e) =>
                              setEmployeeDetails({
                                ...employeeDetails,
                                firstName: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Mid Name
                        </label>
                        <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Middle Name"
                          value={employeeDetails.midName}
                          disabled={empIdState}
                          onChange={(e) =>
                            setEmployeeDetails({
                              ...employeeDetails,
                              midName: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Last Name
                        </label>
                        <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Last Name"
                          value={employeeDetails.lastName}
                          disabled={empIdState}
                          onChange={(e) =>
                            setEmployeeDetails({
                              ...employeeDetails,
                              lastName: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Mobile No
                        </label>
                        <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="small-input"
                          placeholder="Mobile No"
                          value={employeeDetails.mobile}
                          maxLength={10}
                          minLength={10}
                          disabled={empIdState}
                          onChange={(e) => {
                            if (e.target.value.length > 10) {
                              return;
                            }
                            setEmployeeDetails({
                              ...employeeDetails,
                              mobile: e.target.value
                            });
                          }}
                        />
                      </div>
                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Email
                        </label>
                        <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Email"
                          value={employeeDetails.email}
                          disabled={empIdState}
                          onChange={(e) =>
                            setEmployeeDetails({
                              ...employeeDetails,
                              email: e.target.value
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Position
                        </label>
                        {/* <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Position"
                          value={employeeDetails.position}
                          disabled={empIdState}
                          onChange={(e) =>
                            setEmployeeDetails({
                              ...employeeDetails,
                              position: e.target.value
                            })
                          }
                        /> */}

                        <select
                          className="text-black w-3/4 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          id="stateSelect"
                          value={employeeDetails.position}
                          onChange={(e) => {
                            const code = e.target.value;
                            const codeName = positionList.find((item) => item?.mrc_id == code || "");
                            setEmployeeDetails({
                              ...employeeDetails,
                              position: e.target.value,
                              emp_cat_name: codeName
                            });
                          }}
                        >
                          <option value="" className="focus:outline-none focus:border-b bg-white">
                            Select
                          </option>
                          {positionList?.map((item) => (
                            <option
                              className="focus:outline-none focus:border-b bg-white"
                              value={item.mrc_id}
                            >
                              {item.mr_Category_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Territory
                        </label>
                        <select
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          id="stateSelect"
                          value={employeeDetails.territory}
                          disabled={empIdState}
                          onChange={(e) =>
                            setEmployeeDetails({
                              ...employeeDetails,
                              territory: e.target.value
                            })
                          }
                        >
                          <option value="" className="focus:outline-none focus:border-b bg-white">
                            Select
                          </option>
                          {allTerritory.map((item, idx) => (
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

                      <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Company
                        </label>
                        <select
                          className="text-black w-[70%] px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          id="stateSelect"
                          value={employeeDetails.commpany}
                          disabled={empIdState}
                          onChange={(e) =>
                            setEmployeeDetails({
                              ...employeeDetails,
                              commpany: e.target.value
                            })
                          }
                        >
                          <option value="" className="focus:outline-none focus:border-b bg-white">
                            Select
                          </option>
                          {allCompany.map((item, idx) => (
                            <option
                              value={item.c_id}
                              className="focus:outline-none focus:border-b bg-white"
                              key={idx}
                            >
                              {item.cmpny_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {empIdState && (
                        <div className="flex flex-row gap-2 justify-between px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold justify-self-center"
                            htmlFor="inputField"
                          >
                            Application No.
                          </label>

                          <input
                            className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="small-input"
                            placeholder="Position"
                            value={employeeDetails.appNo}
                            disabled={empIdState}
                            onChange={(e) =>
                              setEmployeeDetails({
                                ...employeeDetails,
                                appNo: e.target.value
                              })
                            }
                          />
                        </div>
                      )}
                      {empIdState && (
                        <div className="flex flex-col items-center gap-1 w-full mt-3">
                          <BiCheckCircle className="text-green-500 text-4xl" />

                          <p className="text-lg font-bold">Thankyou for filling out the form</p>
                          <small className="text-center">
                            Please don'nt forget your employee application refrence number to your fill the
                            form
                            <br />
                            For any furthur inquery please, contact{" "}
                            <a href="mailto: hr@willowood.com" className="underline">
                              hr@willowood.com
                            </a>
                          </small>
                        </div>
                      )}
                      {empIdState ? (
                        <div className="flex justify-center mt-2">
                          <div
                            className="text-center w-40   bg-green-700 px-4 py-1 text-white  cursor-pointer"
                            onClick={() => handleCloseModal()}
                          >
                            Close
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center  my-4 rounded-sm w-full">
                          <button
                            type="button"
                            className="text-white rounded-md mx-2  py-1 bg-green-500 w-20"
                            onClick={() => handleGenerateEmployee()}
                            disabled={generateLoading}
                          >
                            Generate
                          </button>

                          <button
                            type="button"
                            className="text-white rounded-md mx-2  py-1 bg-orange-500 w-20"
                            onClick={() => handleCloseModal()}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onOpen={() => setDeleteOpen(true)}
        id={employeeId}
        type="Employee"
        onDeletedData={resetData}
      />
    </>

    // </Layout>
  );
};

export default Employee;
