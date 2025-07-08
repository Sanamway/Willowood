import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { BsGeoAltFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { FaCartArrowDown, FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { AiTwotoneHome, AiOutlineSearch } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";
import moment from "moment";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import ConfirmationModal from "../modals/ConfirmationModal";
import Image from "next/image";
import Profile from "../../public/userimg.jpg";
import EmpImage from "../../public/EmpImage.jpeg";
import { BiCheckCircle } from "react-icons/bi";
import { IoArrowUndo } from "react-icons/io5";

import * as Yup from "yup";

const Employee_Mobile = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [istid, settid] = useState(null);
  const [rid, setrid] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [searchFilter, setSearchFilter] = useState("option");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState({ selected: 0 });
  const [pageCount, setPageCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [data, setData] = useState([]);
  const [refreshLogin, setRefreshLogin] = useState(false);

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

  const fetchEmployees = async (page, bg, bu, z, r, t, empCode) => {
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
          role_id:JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          position : JSON.parse(window.localStorage.getItem("userinfo")).position,
        }
      });
      const apires = respond.data.data.employeeData;
      const count = respond.data.data.employeeDataCount;

      setEmployees(apires);
      setPageCount(Math.ceil(count / 50));
      setData(apires);
      setPageTotal(count);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  /////////////////// notmycode API cp //////////////////

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
      fetchEmployees(
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

  ////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// Searching //////////////////////////////////////////

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
      setEmployees(resapi);
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

  //////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////// Disabling Delete Button ///////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////////////////

  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteHandler = (id) => {
    setDeleteOpen(true);
    setEmployeeId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const resetData = () => {
    fetchEmployees(
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

  /////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////// Generating EMP //////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////////////////////

  const handleCloseModal = () => {
    setisOpen(false);
    fetchEmployees(
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

  const handlePageChange = (page, bg, bu, z, r, t, empCode) => {
    setCurrentPage(page);
    fetchEmployees( page.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.empCode);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

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
      app_type: "Field Force Apps",
      status: 1,
      position: item.emppos,
      about_me: "About me",
      otp_enable: 0,
      mode: [{ label: "mobile", value: "mobile" }],
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
      // const errMsg = error?.resp?.data?.message;
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

  ///////////////////////////////////////////////////////////////////////////////

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
   
    <div className="bg-gray-200 p-4 min-h-screen">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="flex items-center justify-start gap-14">
        <IoArrowUndo
          onClick={() => {
            router.push("/Sales_App/Home");
          }}
          className="text-black-500"
          size={28}
        />
        <h2 className="font-arial font-semibold text-sm text-center whitespace-nowrap py-2">
          {"MR Employee Onboard"}
        </h2>
        <div></div>
      </div>
      {/* Generate Button  */}
      <div className="flex flex-col items-center justify-between  gap-2 py-2">
        <span className="flex flex-wrap items-center gap-2 cursor-pointer w-1/2 sm:w-auto ">
          {(roleId == 1 || roleId == 5 || roleId == 6 || roleId == 8) && (
            <button
              className="text-white text-xs px-2 sm:text-base py-2 md:px-2 whitespace-nowrap  rounded-md bg-green-500 hover:bg-orange-500 w-full sm:w-auto"
              onClick={() => setisOpen(true)}
            >
              Generate MR Requisition
            </button>
          )}
        </span>
      </div>

      {/* Filters  */}
      <div className="w-full px- py-1">
        <div className="bg-white shadow-lg rounded-lg p-  w-full max-w-full">
          <button
            onClick={toggleFilter}
            className="w-full md:w-full px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-white-600 transition text-sm font-medium flex items-center justify-between gap-2 mb-1"
          >
            {isFilterOpen ? (
              <>
                <span>Filters</span>
                <svg
                  className="w-5 h-5 bg-blue-500 rounded"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <span>Filters</span>
                <svg
                  className="w-5 h-5 bg-blue-500 rounded"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </>
            )}
          </button>

          {isFilterOpen && (
            <div className="flex p-2 ">
              <div className="flex flex-col gap-2 m-2 md:items-center md:justify-between w-full">
                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-col  w-full">
                    <label className="font-semibold text-sm text-gray-500 py-1">Segment</label>
                    <select
                      className="border rounded px-2 py-1.5 w-full h-8 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      id="bgSelect"
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
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="font-semibold text-sm text-gray-500 py-1">Business Unit</label>
                    <select
                      className="border rounded px-3 py-1.5 w-full h-8 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      id="buSelect"
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
                  </div>
                </div>

                {/* Row 2: Zone & Region */}
                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold text-sm text-gray-500 py-1">Zone</label>
                    <select
                      className="border rounded px-3 py-1.5 w-full h-8 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      id="zoneSelect"
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
                            tid: ""
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
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-semibold text-sm text-gray-500 py-1">Region</label>
                    <select
                      className="border rounded px-3 py-1.5 w-full h-8 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      id="regionSelect"
                      value={filterState.rId}
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
                      disabled={filterDisableOption("Region")}
                    >
                      <option value={"All"}>- All Region -</option>
                      {allRegionData.map((item, idx) => (
                        <option value={item.r_id} key={idx}>
                          {item.region_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Territory & Search */}
                <div className="flex flex-row gap-3 w-full flex-wra">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold text-sm text-gray-500 py-1">Territory</label>
                    <select
                      className="border rounded px-3 py-1.5 w-full h-8 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      id="territorySelect"
                      value={filterState.tId}
                      onChange={(e) =>
                        setFilterState({
                          ...filterState,
                          tId: e.target.value
                        })
                      }
                      disabled={filterDisableOption("Territory")}
                    >
                      <option value="All">- All Territory -</option>
                      {allTerritoryData.map((item, idx) => (
                        <option value={item.t_id} key={idx}>
                          {item.territory_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(roleId == 8 || roleId == 1) && (
                    <div className="w-full flex flex-col sm:flex-row gap-2">
                      <div className="flex flex-col w-full">
                        <label className="font-semibold text-sm text-gray-500 py-1">Search By Status</label>
                        <select
                          className="border rounded px-3 py-1.5 w-full h-8 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={searchFilter}
                          onChange={(e) => setSearchFilter(e.target.value)}
                        >
                          <option value="option">Option</option>
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
                      </div>
                    </div>
                  )}
                </div>
                {!["all", "option", "tm_status", "rm_status", "zm_status", "hr_pendency"].includes(
                  searchFilter
                ) && (
                  <div className="flex w-full ">
                    <input
                      className="border-2 flex-grow rounded-l-md px-3 py-1/5 h-8 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.trim())}
                    />
                    <button
                      onClick={handleSearch}
                      type="submit"
                      className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 transition"
                    >
                      <AiOutlineSearch size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination  */}

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
        <div className="w-full flex flex-col md:flex-row items-start justify-between mx-auto px-2 pb- gap-2">
          <div className="flex flex-wrap gap-1 px-2 py-1 mt-4 border border-black rounded-md text-slate-900">
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
          <div className="flex justify-center md:justify-end">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              className="flex flex-wrap gap-2 px-2 py-1 mt-3 border border-black rounded-md"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center py-2">
        {employees?.map((item, index) => (
          <div
            key={index}
            className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col justify-between overflow-hidden"
            style={{ minHeight: "20px" }}
          >
            {/* Top Section */}
            <div>
              <div className="flex items-start justify-between text-gray-800">
                <div className="flex items-center gap-2 ">
                  <div>
                    <h2 className="text-sm font-">
                      <span className="font-semibold text-gray-800">App Status: </span>{" "}
                      <span className="text-xs">{item?.app_status ?? ""}</span>{" "}
                    </h2>
                    <h2 className="text-sm font-">
                      <span className="font-semibold text-gray-800">Employee Code: </span>{" "}
                      <span className="text-xs">{item?.empcode ?? ""}</span>{" "}
                    </h2>
                    <h2 className="text-sm font-">
                      <span className="font-semibold text-gray-800">Name: </span>{" "}
                      <span className="text-xs">{`${item?.fname ?? ""} ${item?.mname ?? ""} ${
                        item?.lname ?? ""
                      }`}</span>{" "}
                    </h2>
                    <h2 className="text-sm">
                      <span className="font-semibold text-gray-800">Address: </span>
                      <p className="text-xs break-words whitespace-pre-line w-full max-h-32 overflow-y-auto">
                        {`${item?.caddress ?? ""} ${item?.pcity ?? ""} ${item?.pstate ?? ""}`}
                      </p>
                    </h2>

                    <h2 className="text-sm font-s">
                      <span className="font-semibold text-gray-800">Reporting Office: </span>{" "}
                      <span className="text-xs text-gray-800">{item?.reporting_hq ?? ""}</span>{" "}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start  gap-4 mt-4">
              <button
                onClick={() => {
                  router.push({
                    pathname: "/employee_details",
                    query: { id: item.e_id, type: "View", from: "mob" }
                  });
                }}
                className="b text-black   hover:text-blue-500  "
              >
                <div className="flex flex-col items-center justify-center">
                  <FaEye className="text-green-700" size={20} />
                  <h2 className="text-xs">View</h2>
                </div>
              </button>
              {/* Edit buttons  */}
              {(() => {
                if (roleId == 1 || roleId == 8) {
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
                              query: { type: "Edit", id: item?.e_id, from: "mob" }
                            });
                          }}
                          className="text-black hover:text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Edit</h2>
                          </div>
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
                              query: { type: "Edit", id: item?.e_id, from: "mob" }
                            });
                          }}
                          className="text-black hover:text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Edit</h2>
                          </div>
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
                              formType: "Assessment",
                              from: "mob"
                            };
                            router.push({
                              pathname: "/employee_details",
                              query: query
                            });
                          }}
                          className="text-black hover:text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Edit</h2>
                          </div>
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
                              formType: "SAP Info",
                              from: "mob"
                            };
                            router.push({
                              pathname: "/employee_details",
                              query: query
                            });
                          }}
                          className="text-black hover:text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Edit</h2>
                          </div>
                        </button>
                      );
                    default:
                      return null;
                  }
                }
              })()}

              {/* Delete Buttons  */}
              {(() => {
                if (roleId === 1 || roleId === 6) {
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
                          <div className="flex flex-col items-center justify-center">
                            <MdDelete className="text-red-700" size={20} />
                            <h2 className="text-xs">Delete</h2>
                          </div>
                        </button>
                      );
                    default:
                      break;
                  }
                }

                // Check for roleId 1 only and specific statuses

                if (roleId === 1 || roleId === 8) {
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
                          <div className="flex flex-col items-center justify-center">
                            <MdDelete className="text-red-700" size={20} />
                            <h2 className="text-xs">Delete</h2>
                          </div>
                        </button>
                      );
                    default:
                      return null;
                  }
                }

                return null;
              })()}

              {/* Extra button added for login */}

              {(() => {
                if (roleId === 1 || roleId === 8) {
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
                          {item.login_created ? (
                            <div className="flex flex-col items-center justify-center">
                              <IoMdLogIn className="text-green-700" size={20} />
                              <h2 className="text-xs">Login Created</h2>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <IoMdLogIn className="text-red-700" size={20} />
                              <h2 className="text-xs">Create Login</h2>
                            </div>
                          )}
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
                                formType: "Approval",
                                from: "mob"
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
                                formType: "Approval",
                                from: "mob"
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
                              formType: "Approval",
                              from: "mob"
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
                              formType: "Approval",
                              from: "mob"
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
                              formType: "Approval",
                              from: "mob"
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

              {/* <FcApproval className="text-red-700" size={20} /> */}
              {/* <IoMdLogIn className="text-red-700" size={20} /> */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination  */}

      {/* Generate Modal  */}

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
                    <Image className="  h-[3.1rem] w-[3.1rem] rounded-full" src={Profile} alt="img" />
                  </div>
                  <Dialog.Panel className="relative max-h-full overflow-hidden  font-arial md:w-[34rem] w-[21rem] mx-12 transform  rounded-2xl bg-white p-3.5 text-left align-middle shadow-xl transition-all">
                    <div>
                      <p className="text-sm  text-gray-500 py-2.5 ">
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

                    <div className="flex flex-col gap-1 justify-center">
                      <div className="flex flex-row gap-6 md:gap-2 justify-between px-2 ">
                        <label
                          className="block text-gray-700 whitespace-nowrap text-sm font-bold justify-center"
                          htmlFor="inputField"
                        >
                          First Name
                        </label>
                        <div className="flex lg:flex flex-row gap-1">
                          {" "}
                          <select
                            className="  text-sm w-2/3 md:px-4 px-2 text-gray-700  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                            className="text-black w-2/3 px-2.5 py-1  text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="block text-gray-700 text-sm font-bold justify-center"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          className="text-black w-2/3 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
    </div>
  );
};

export default Employee_Mobile;
