import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
import ResignModal from "../modals/ResignModal";
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
import AcceptFanF from "../modals/AcceptFandF";

const EmployeeResign = () => {
  const csvHeaders = [
    { label: "Prefix", key: "prefix" },
    { label: "App Status", key: "app_status" },
    { label: "App No.", key: "appl_no" },
    { label: "App Date", key: "appl_dt" },
    { label: "Emp No", key: "e_id" },
    { label: "Employee Code", key: "empcode" },
    { label: "Employee Name", key: "fname" },
    { label: "Request Date", key: "resignation_request_date" },
    { label: "Last Working Date", key: "last_working_date" },
    { label: "Reason", key: "reason" },
    { label: "Proposed LWD", key: "proposed_lwd" },
    { label: "Remarks", key: "remarks" },
    { label: "Company Info", key: "cmpny_name" },
    { label: "Business Segment", key: "business_segment" },
    { label: "Business Unit Division", key: "business_unit_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Region", key: "region_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Reporting Office", key: "reporting_hq" },
    { label: "Territory Person", key: "t_user_Person" },
    { label: "Designation", key: "t_id_desig" },
    { label: "Date of Approval", key: "t_app_date" },
    { label: "Status", key: "t_id_status_resig" },

    { label: "Region Person", key: "r_user_Person" },
    { label: "Designation", key: "r_id_desig" },
    { label: "Date of Approval", key: "r_app_date" },
    { label: "Status", key: "r_id_status_resig" },

    { label: "Zonal Manager", key: "z_user_Person" },
    { label: "Designation", key: "z_id_desig" },
    { label: "Date of Approval", key: "z_app_date" },
    { label: "Status", key: "z_id_status_resig" },

    { label: "Unit", key: "bu_user_Person" },
    { label: "Designation", key: "bu_id_desig" },
    { label: "Date of Approval", key: "bu_app_date" },
    { label: "Bu Status", key: "bu_id_status_resig" },
    { label: "Status", key: "isDeleted" }
  ];

  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const [roleId, setRoleId] = useState(null);
  //Pagination

  // const [currentPage, setCurrentPage] = useState({ selected: 0 }); // Current page number
  // const [pageCount, setPageCount] = useState(0);

  // const [pageTotal, setPageTotal] = useState({selected:0})
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);

  // };

  // const handlePageTotal = (pageData)=>{
  //   setPageTotal(pageData)
  // }

  // const [data, setData] = useState([]);
  // const getAllEmployees = async (currentPage, bg, bu, z, r, t, empCode) => {
  //   try {
  //     const respond = await axios.get(`${url}/api/get_employee`, {
  //       headers: headers,
  //       params: {
  //         t_id: t === "All" ? null : t,
  //         bg_id: bg === "All" ? null : bg,
  //         bu_id: bu === "All" ? null : bu,
  //         z_id: z === "All" ? null : z,
  //         r_id: r === "All" ? null : r,
  //         c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
  //         paging: true,
  //         page: currentPage,
  //         size: 50,
  //         bst: true,
  //         empcode: empCode
  //       }
  //     });
  //     const apires = await respond.data.data.employeeData;
  //     console.log("EMPList", respond);
  //     const count = await respond.data.data.employeeDataCount;
  //     setPageCount(Math.ceil(count / 50));
  //     setData(apires);
  //     setPageTotal(count)
  //   } catch (error) {}
  // };

  const [userPosition, setUserPosition] = useState(null);

  const [currentPage, setCurrentPage] = useState({ selected: 0 });
  const [pageCount, setPageCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [data, setData] = useState([]);
  const [zrtID, setZrtid] = useState(true);
  const [userID, setUserID] = useState(null);

  const getAllEmployees = async (page, bg, bu, z, r, t, zrtID) => {
    console.log("CALLCHECK", zrtID);
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          paging: true,
          page: page,
          size: 50,
          bst: true,
          empcode: empCode,
          resignation: true,
          role_id: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          position: JSON.parse(window.localStorage.getItem("userinfo")).position,
          t: roleId == 6 ? zrtID : null,
          r: roleId == 5 ? zrtID : null
          // z:roleId ==4 ? zrtID :null,
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
  const [empCode, setEmpCode] = useState(null);
  const [empData, setEmpData] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteHandler = (id) => {
    setDeleteOpen(true);
    setEmployeeId(id);
  };

  const [resignOpen, setResignOpen] = useState(false);
  const [acceptfnfOpen, setacceptfnfOpen] = useState(false);
  const [isAcOpen, setIsAcOpen] = useState(false);

  const resignHandler = (item) => {
    setResignOpen(true);
    setEmployeeId(item?.e_id);
    setEmpCode(item?.empcode);
    setEmpData(item);
  };

  const acceptfnfHandler = (item) => {
    setacceptfnfOpen(true);
    setEmployeeId(item?.e_id);
    setEmpCode(item?.empcode);
    setEmpData(item);
    setIsAcOpen(true);
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
  // Getting Territory Information for the dropdown values
  const [allTerritory, setAllTerritory] = useState([]);
  const getTerritoryInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers
      });
      const apires = await respond.data.data;

      setAllTerritory(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
      setAllTerritory([]);
    }
  };

  useEffect(() => {
    getTerritoryInfo();
    getCompanyInfo();
  }, []);

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

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = window.localStorage.getItem("userinfo");
      if (userinfo) {
        const user = JSON.parse(userinfo);
        setRoleId(user?.role_id);
        setUserPosition(user?.position);
        setUserID(user?.user_id);
      }
    }
  }, []);

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
      case "hr_pendency_res":
        break;
      case "tm_status_resig":
        value = "pending";
        break;
      case "rm_status_resig":
        value = "pending";
        break;
      case "zm_status_resig":
        value = "pending";
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
          [key]: key === "tm_status_resig" ? "tm_status_resig" : value,
          [key]: key === "rm_status_resig" ? "rm_status_resig" : value,
          [key]: key === "zm_status_resig" ? "zm_status_resig" : value,
          [key]: key === "hr_pendency_res" ? "hr_pendency_res" : value,
          resignation: true
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
  };

  useEffect(() => {
    if (
      ["all", "hr_pendency_res", "tm_status_resig", "rm_status_resig", "zm_status_resig"].includes(
        searchFilter
      )
    ) {
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
            JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          empCode:
            JSON.parse(window.localStorage.getItem("userinfo"))?.emp_code === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.emp_code
        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo"))?.t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id
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
        zrtID,
        roleId
      );
    }
  }, [
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId
    // searchFilter,
    // refreshLogin
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

  const filterDisableOption = (currentFilter) => {
    function getLastAssignedKey(filterState) {
      // Define an array of keys in the order you want to check
      const keys = ["bgId", "buId", "zId", "rId", "tId"];

      // Iterate through the keys in reverse order
      for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        if (typeof filterState[key] === "number" && !isNaN(filterState[key])) {
          return key;
        }
      }

      // If no valid number is found, return null or undefined
      return null;
    }

    const role = localStorageItems.roleId;

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
          <h2 className="font-arial font-normal text-3xl  py-2">
            {name ? name : "Employee Resignation Process"}
          </h2>
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
              <CSVLink data={data} headers={csvHeaders}>
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
            {/* {(roleId == 1 || roleId == 5 || roleId == 6 || roleId == 8) && (
              <button
                className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
                onClick={() => setisOpen(true)}
              >
                Generate MR Requisition
              </button>
            )} */}
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
                  zId: e.target.value
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

          {(roleId == 1 || roleId == 8) && (
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
                <option value="tm_status_resig">TM Pending Status</option>
                <option value="rm_status_resig">RM Pending Status</option>
                <option value="zm_status_resig">ZM Pending Status</option>
                <option value="hr_pendency_res">Resignation Pendency By HR</option>
              </select>

              {searchFilter === "all" ||
              searchFilter === "option" ||
              searchFilter === "tm_status_resig" ||
              searchFilter === "rm_status_resig" ||
              searchFilter === "zm_status_resig" ||
              searchFilter === "hr_pendency_res" ? (
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
                    App No.
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp No
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employee Code
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Request Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Last Wkng Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Reson
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Proposed LWD
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Remarks
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company Info
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Business Sgement
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
                    BU Status
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Resig By
                  </th>

                  {/* prev */}

                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2" key={idx}>
                    <td className="  px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/employee_resign",
                            query: { id: item.e_id, type: "View" }
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>

                      {/* Put Resignation condition */}

                      {(() => {
                        // For testing role id 1 otherwise 8
                        if (roleId == 1 || roleId == 8 || roleId == 6) {
                          switch (item.app_status) {
                            case "HR Joining Process Done":
                              return (
                                <button
                                  onClick={() => {
                                    resignHandler(item);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Put Resignation
                                </button>
                              );
                            default:
                              return null;
                          }
                        }
                      })()}

                      {(() => {
                        
                        if (roleId == 8) {
                          switch (item.app_status) {
                            case "Resignation Accepted By RM":
                            case "Resignation Accepted By TM":
                            case "Resignation Recommended By RDM":
                            case "Resignation Recommended By ZDM":
                            case "Resignation Submitted":
                              return (
                                <button
                                  onClick={() => {
                                    resignHandler(item);
                                  }}
                                  className="text-black hover:text-red-500 ml-2"
                                >
                                  Put Resignation
                                </button>
                              );
                            default:
                              return null;
                          }
                        }
                      })()}

                      {/* Structured Code Switch and If conditions */}

                      {/* Approve Options For Outer Grid  */}
                      {(() => {
                        switch (item.app_status) {
                          // commented on 12 may
                          // case "Submitted By Territory":
                          case "Resignation Submitted":
                            if (roleId === 6) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditResAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "ApprovalResign"
                                    };
                                    router.push({
                                      pathname: "/employee_resign",
                                      query: query
                                    });
                                  }}
                                  className="b text-bla font-semibold text-red-500 ml-2"
                                >
                                  Approve Resignation
                                </button>
                              );
                            } else {
                              return null;
                            }
                          //Handle RDM
                          case "Resignation Accepted By TM":
                            if (roleId === 9) {
                              if (userPosition == "RDM") {
                                return (
                                  <button
                                    onClick={() => {
                                      let query = {
                                        type: "EditResAp",
                                        role: roleId,
                                        id: item?.e_id,
                                        formType: "ApprovalResign"
                                      };
                                      router.push({
                                        pathname: "/employee_resign",
                                        query: query
                                      });
                                    }}
                                    className="b text-bla font-semibold text-red-500 ml-2"
                                  >
                                    Approve Resignation
                                  </button>
                                );
                              } else {
                                return null;
                              }
                            } else {
                              return null;
                            }
                          case "Resignation Accepted By RM":
                            if (roleId === 9) {
                              if (userPosition == "ZDM") {
                                return (
                                  <button
                                    onClick={() => {
                                      let query = {
                                        type: "EditResAp",
                                        role: roleId,
                                        id: item?.e_id,
                                        formType: "ApprovalResign"
                                      };
                                      router.push({
                                        pathname: "/employee_resign",
                                        query: query
                                      });
                                    }}
                                    className="b text-bla font-semibold text-red-500 ml-2"
                                  >
                                    Approve Resignation
                                  </button>
                                );
                              } else {
                                return null;
                              }
                            } else {
                              return null;
                            }
                          // case "Submitted By Territory":
                          case "Resignation Accepted By TM":
                          case "Resignation Submitted":
                          // case "Recommended By RDM":
                          case "Resignation Recommended By RDM":
                            if (roleId === 5) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditResAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "ApprovalResign"
                                    };
                                    router.push({
                                      pathname: "/employee_resign",
                                      query: query
                                    });
                                  }}
                                  className="b text-bla font-semibold text-red-500 ml-2"
                                >
                                  Approve Resignation
                                </button>
                              );
                            } else {
                              return null;
                            }

                          case "Resignation Recommended By ZDM":
                            if (roleId === 4) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditResAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "ApprovalResign"
                                    };
                                    router.push({
                                      pathname: "/employee_resign",
                                      query: query
                                    });
                                  }}
                                  className="b text-bl font-semibold text-red-500  ml-2"
                                >
                                  Approve Resignation
                                </button>
                              );
                            } else {
                              return null;
                            }
                          // case "Approved By Zonal":
                          case "Resignation Accepted By ZM":
                          case "Resignation Submitted":
                            if (roleId === 3) {
                              return (
                                <button
                                  onClick={() => {
                                    let query = {
                                      type: "EditResAp",
                                      role: roleId,
                                      id: item?.e_id,
                                      formType: "ApprovalResign"
                                    };
                                    router.push({
                                      pathname: "/employee_resign",
                                      query: query
                                    });
                                  }}
                                  className="b text-b font-semibold text-red-500 ml-2"
                                >
                                  Approve Resignation
                                </button>
                              );
                            } else {
                              return null;
                            }
                          default:
                            return null;
                        }
                      })()}

                      {/* Some other FNF condition */}

                      {(() => {
                        switch (item.app_status) {
                          case "Resignation Accepted By BU":
                          case "Resignation Accepted By ZM":
                            if (roleId === 1 || roleId === 8) {
                              return (
                                <button
                                  onClick={() => {
                                    acceptfnfHandler(item);
                                  }}
                                  className="font-semibold text-red-500 ml-2"
                                >
                                  Accept F&F
                                </button>
                              );
                            } else {
                              return null;
                            }

                          case "Accept FNF":
                            if (roleId === 1 || roleId === 8) {
                              return (
                                <button
                                  onClick={() => {
                                    // resignHandler(item);
                                  }}
                                  className="font-semibold text-green-500 ml-2"
                                  disabled
                                >
                                  Accepted F&F
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
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.appl_no}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.appl_dt ? moment(item.appl_dt).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.e_id}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.empcode}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {`${item.fname} ${item.mname} ${item.lname}`}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.resignation_request_date && moment(item.resignation_request_date).isValid()
                        ? moment(item.resignation_request_date).format("DD/MM/YYYY")
                        : ""}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.last_working_date && moment(item.last_working_date).isValid()
                        ? moment(item.last_working_date).format("DD/MM/YYYY")
                        : ""}
                    </td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.reason}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.proposed_lwd && moment(item.proposed_lwd).isValid()
                        ? moment(item.proposed_lwd).format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.remarks}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.cmpny_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.business_segment}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.business_unit_name}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.zone_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.region_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.territory_name}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.reporting_hq}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.t_app_date ? moment(item.t_app_date_resig).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.t_id_status_resig}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.r_app_date_resig ? moment(item.r_app_date_resig).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.r_id_status_resig}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.z_app_date_resig ? moment(item.z_app_date_resig).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.z_id_status_resig}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_user_Person}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_id_desig}</td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.bu_app_date_resig ? moment(item.bu_app_date_resig).format("DD/MM/Y") : ""}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.bu_id_status_resig}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.resig_done_by}</td>
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
        searchFilter !== "tm_status_resig" &&
        searchFilter !== "rm_status_resig" &&
        searchFilter !== "zm_status_resig" &&
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
                        <input
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
                        />
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
      <ResignModal
        isOpen={resignOpen}
        onClose={() => setResignOpen(false)}
        onOpen={() => setResignOpen(true)}
        id={employeeId}
        empdata={filterState}
        empCode={empCode}
        empData={empData}
        userID={userID}
        method={roleId == 8 ? "put" : "post"}
        endpoints={roleId == 8 ? "update_resignation_status" : "update_resignation"}
        onDeletedData={resetData}
      />
      <AcceptFanF
        isOpen={acceptfnfOpen}
        isAcOpen={() => setIsAcOpen(true)}
        onClose={() => setacceptfnfOpen(false)}
        onOpen={() => setacceptfnfOpen(true)}
        id={employeeId}
        empdata={filterState}
        empCode={empCode}
        empData={empData}
        method="put"
        endpoints={"update_resignation_status"}
        onDeletedData={resetData}
      />
    </>

    // </Layout>
  );
};

export default EmployeeResign;
