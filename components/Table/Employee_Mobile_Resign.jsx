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
import { MdOutlineDone } from "react-icons/md";
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
import { FaHourglassEnd } from "react-icons/fa";
import { IoArrowUndo } from "react-icons/io5";
import ResignModal from "../modals/ResignModal";
import AcceptFanF from "../modals/AcceptFandF";

import * as Yup from "yup";

const Employee_Mobile_Resign = () => {
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
  const [zrtID, setZrtid] = useState(true);
  const [userID, setUserID] = useState(null);

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
        setUserID(user?.user_id);
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
          resignation: true,
          role_id:JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          position : JSON.parse(window.localStorage.getItem("userinfo")).position,
          t: roleId == 6 ? zrtID : null,
          r: roleId == 5 ? zrtID : null
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

  useEffect(() => {
    fetchEmployees();
  }, []);

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
        zrtID,
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
          resignation:true
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
    if (
      ["all", "hr_pendency_res", "tm_status_resig", "rm_status_resig", "zm_status_resig"].includes(
        searchFilter
      )
    ) {
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

  const handlePageChange = (page, bg, bu, z, r, t, zrtID) => {
    setCurrentPage(page);
    fetchEmployees( page.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      zrtID);
  };


  /////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  //WhatsApp Handler 

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

  const [resignOpen, setResignOpen] = useState(false);
  const [acceptfnfOpen, setacceptfnfOpen] = useState(false);
  const [isAcOpen, setIsAcOpen] = useState(false);
  const [empData, setEmpData] = useState(null);
  const [empCode, setEmpCode] = useState(null);

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="bg-gray-200 p-4 min-h-screen">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="flex items-center justify-start gap-10 py-2">
        <IoArrowUndo
          onClick={() => {
            router.push("/Sales_App/Home");
          }}
          className="text-black-500"
          size={28}
        />
        <h2 className="font-arial font-semibold text-sm text-center whitespace-nowrap py-2">
          {"Employee Resignation Process"}
        </h2>
        <div></div>
      </div>
      {/* Generate Button  */}
      {/* <div className="flex flex-col items-center justify-between  gap-2 py-2">
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
      </div> */}

      {/* Filters  */}
      <div className="w-full px- py-2">
        <div className="bg-white shadow-lg rounded-lg p  w-full max-w-full">
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
                          <option value="tm_status_resig">TM Pending Status</option>
                          <option value="rm_status_resig">RM Pending Status</option>
                          <option value="zm_status_resig">ZM Pending Status</option>
                          <option value="hr_pendency_res">Resignation Pendency By HR</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                {![
                  "all",
                  "option",
                  "tm_status_resig",
                  "rm_status_resig",
                  "zm_status_resig",
                  "hr_pendency_res"
                ].includes(searchFilter) && (
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
      searchFilter !== "tm_status_resig" &&
      searchFilter !== "rm_status_resig" &&
      searchFilter !== "zm_status_resig" &&
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
                    pathname: "/employee_resign",
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
              {/* Second Reg buttons  */}
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
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Put Resignation</h2>
                          </div>
                        </button>
                      );
                    default:
                      return null;
                  }
                }
                // new condition
              })()}

              {/* third buttons */}
              {(() => {
                switch (item.app_status) {
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
                              formType: "ApprovalResign",
                              from: "mob"
                            };
                            router.push({
                              pathname: "/employee_resign",
                              query: query
                            });
                          }}
                          className="b text-bla font-semibold text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Approve Resignation</h2>
                          </div>
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
                                formType: "ApprovalResign",
                                from: "mob"
                              };
                              router.push({
                                pathname: "/employee_resign",
                                query: query
                              });
                            }}
                            className="b text-bla font-semibold text-red-500 ml-2"
                          >
                            <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Approve Resignation</h2>
                          </div>
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
                                formType: "ApprovalResign",
                                from: "mob"
                              };
                              router.push({
                                pathname: "/employee_resign",
                                query: query
                              });
                            }}
                            className="b text-bla font-semibold text-red-500 ml-2"
                          >
                            <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Approve Resignation</h2>
                          </div>
                          </button>
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return null;
                    }

                  case "Resignation Accepted By TM":
                  case "Resignation Submitted":

                  case "Resignation Recommended By RDM":
                    if (roleId === 5) {
                      return (
                        <button
                          onClick={() => {
                            let query = {
                              type: "EditResAp",
                              role: roleId,
                              id: item?.e_id,
                              formType: "ApprovalResign",
                              from: "mob"
                            };
                            router.push({
                              pathname: "/employee_resign",
                              query: query
                            });
                          }}
                          className="b text-bla font-semibold text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Approve Resignation</h2>
                          </div>
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
                              formType: "ApprovalResign",
                              from: "mob"
                            };
                            router.push({
                              pathname: "/employee_resign",
                              query: query
                            });
                          }}
                          className="b text-bl font-semibold text-red-500  ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Approve Resignation</h2>
                          </div>
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
                              formType: "ApprovalResign",
                              from: "mob"
                            };
                            router.push({
                              pathname: "/employee_resign",
                              query: query
                            });
                          }}
                          className="b text-b font-semibold text-red-500 ml-2"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CiEdit className="text-green-700" size={20} />
                            <h2 className="text-xs">Approve Resignation</h2>
                          </div>
                        </button>
                      );
                    } else {
                      return null;
                    }
                  default:
                    return null;
                }
              })()}

              {/* Some other FNF condition  */}
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
                          <div className="flex flex-col items-center justify-center">
                            <FaHourglassEnd className="text-red-700" size={20} />
                            <h2 className="text-xs">Accept F&F</h2>
                          </div>
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
                          className="font-semibold text-sm text-green-500 ml-2"
                          disabled
                        >
                          <div className="flex flex-col items-center justify-center">
                            <MdOutlineDone className="text-green-700" size={20} />
                            <h2 className="text-xs">Accepted F&F</h2>
                          </div>
                         
                          {/* Accepted F&F */}
                        </button>
                      );
                    } else {
                      return null;
                    }

                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination  */}

      {/* Generate Modal  */}

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
    </div>
  );
};

export default Employee_Mobile_Resign;
