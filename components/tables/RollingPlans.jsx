import React, { useEffect, useState, Fragment } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePreview } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import { AiOutlineStop } from "react-icons/ai";

import { FaSkullCrossbones } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FcBullish } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Dialog, Transition } from "@headlessui/react";
import { MdDelete } from "react-icons/md";
import SubmitModal from "../modals/SubmitModal";

import moment from "moment";

import { AiOutlineSearch } from "react-icons/ai";
const RollingPlans = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const datas = [
    {
      id: 1,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Zone Approved",
      progress: "20%",
    },

    {
      id: 2,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
      progress: "40%",
    },

    {
      id: 3,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "orange",
      status: "Draft save",
      progress: "60%",
    },

    {
      id: 4,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Submitted by TM/RM/ZM",
      progress: "80%",
    },

    {
      id: 5,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Review stage",
      progress: "100%",
    },

    {
      id: 6,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to sumbit",
      progress: "20%",
    },

    {
      id: 7,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Zone Approved",
      progress: "80%",
    },

    {
      id: 8,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "orange",
      status: "Draft save",
      progress: "30%",
    },

    {
      id: 9,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Review stage",
    },

    {
      id: 10,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Zone Approved",
    },
    {
      id: 11,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Draft save",
    },

    {
      id: 12,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
    },

    {
      id: 13,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
    },

    {
      id: 13,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
    },
  ];
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
  });
  const [filterState, setFilterState] = useState({
    bgId: null,
    buId: null,
    zId: null,
    rId: null,

    tId: null,
    yr: moment().year(),
    month: null,
  });
  const [allMonthData, setAllMonthData] = useState([]);
  const [allYearData, setAllYearData] = useState([]);
  const getAllTransactionPlan = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_rp`, {
        headers: headers,
        params: { status: true },
      });
      const apires = await respond.data.data;
      setAllYearData([...new Set(apires.map((item) => item.t_year))]);
    } catch (error) {}
  };

  useEffect(() => {
    getAllTransactionPlan();
  }, []);
  const getAllTransactionYear = async (yr) => {
    try {
      const respond = await axios.get(`${url}/api/get_rp`, {
        headers: headers,
        params: { status: true, year: yr },
      });
      const apires = await respond.data.data;

      setAllMonthData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.yr) return;
    getAllTransactionYear(filterState.yr);
  }, [filterState.yr]);
  console.log("klp", filterState);
  useEffect(() => {
    if (!allYearData.length) return;
    const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

    switch (roleId) {
      case 6:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
      case 5:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,

          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          tId: null,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
      case 4:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: null,

          tId: null,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
      case 3:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: null,
          zId: null,
          tId: null,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
      case 10:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: null,
          rId: null,
          zId: null,
          tId: null,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
      default:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
    }
  }, [allYearData]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
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
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBuData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinessUnitInfo(filterState.bgId);
  }, [filterState.bgId]);

  const [zoneData, setAllZoneData] = useState([]);
  const getAllZoneData = async (segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });

      const apires = await respond.data.data;
      console.log("m", apires);
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

  const [regionData, setRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setRegionData(
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

  const [territoryData, setTerritoryData] = useState([]);

  const getAllTerritoryData = async (
    segmentId,
    businessUnitId,
    zoneId,
    regionId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setTerritoryData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (
      !filterState.bgId ||
      !filterState.buId ||
      !filterState.zId ||
      !filterState.rId
    )
      return;
    getAllTerritoryData(
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId
    );
  }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId]);

  const [allTableData, setAllTableData] = useState([]);
  const getAllSalesPlanStatus = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId
  ) => {
    let endPoint;

    if (bgId && buId && zId && rId && tId) {
      endPoint = "api/get_rollingdata_based_on_roll_t";
    } else if (bgId && buId && zId && rId && !tId) {
      endPoint = "api/get_rollingdata_based_on_roll_r";
    } else if (bgId && buId && zId && !rId && !tId) {
      endPoint = "api/get_rollingdata_based_on_roll_z";
    } else if (bgId && buId && !zId && !rId && !tId) {
      endPoint = "api/get_rollingdata_based_on_roll_bu";
    } else if (bgId && !buId && !zId && !rId && !tId) {
      endPoint = "api/get_rollingdata_based_on_roll_bg";
    } else {
      return;
    }

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          bg_id: bgId === "All" || !bgId ? null : bgId,
          bu_id: buId === "All" || !buId ? null : buId,
          z_id: zId === "All" || !zId ? null : zId,
          r_id: rId === "All" || !rId ? null : rId,
          t_id: tId === "All" || !tId ? null : tId,
        },
      });

      const apires = await respond.data.data;

      setAllTableData(apires);
    } catch (error) {
      if (!error) return;
      setAllTableData([]);
    }
  };

  useEffect(() => {
    getAllSalesPlanStatus(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId
    );
  }, [
    filterState.yr,
    filterState.month,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
  ]);

  const getStatus = (status) => {
    switch (status) {
      case "Close Period":
        return "black";

      case "Review Stage":
        return "#1c1c84";
      case "Draft Submit":
        return "#f67c41";
      case "Final Submitted":
        return "green";

      case "Yet to Submit":
        return "#f4141c";
      case "Yet to Approve":
        return "red";
      case "Zone Approved":
        return "green";
      case "Reject":
        return "red";
      case "Reject":
        return "#f4141c";

      default:
        return "black";
    }
  };

  const [rejectDraftModal, setRejectDraftModal] = useState(false);
  const [rejectModalData, setRejectModalData] = useState({
    data: "",
    tranId: "",
    mYr: "",
    planId: "",
    tId: "",
  });

  const handleSaveDraft = async () => {
    try {
      const respond = await axios.get(`${url}/api/rsp_update_status`, {
        headers: headers,
        params: {
          t_year: filterState.yr,
          m_year: rejectModalData.mYr,
          plan_id: rejectModalData.planId,
          tran_id: rejectModalData.tranId,
          t_id: Number(rejectModalData.tId),
          rp_status: "Draft Submit",
          remarks: rejectModalData.data,
        },
      });
      const apires = await respond.data.data;
      handleDraftClose();
      setSuccessMsg(respond.data.message);
      setSuccessOpen(true);
      getAllSalesPlanStatus(
        filterState.yr || null,
        filterState.month || null,
        filterState.bgId || null,
        filterState.buId || null,
        filterState.zId || null,
        filterState.rId || null,
        filterState.tId
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getOptions = (
    upload,
    planId,
    tranId,
    yr,
    mYr,
    depot,
    zrt,
    status,
    stage,
    bg,
    bu,
    z,
    r,
    t,
    c,
    w,
    tDes,
    rDes,
    zDes,
    buDes,
    bgDes
  ) => {
    switch (status) {
      case "Close Period":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer ">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "Review Stage":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcel(mYr, planId, tranId, t, tDes, yr, "Edit");
                router.push({
                  pathname: "/rptransaction",
                  query: {
                    planId: planId,
                    tranId: tranId,
                    yr: yr,
                    mYr: mYr,
                    depot: depot,
                    zrt: zrt,
                    status: status,
                    stage: stage,
                    bgId: bg,
                    buId: bu,
                    zId: z,
                    rId: r,
                    tId: t,
                    cId: c,
                    wId: w,
                    formType: "Edit",
                  },
                });
              }}
            >
              <CiEdit className="text-slate-400" /> Edit
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );
      case "Draft Submit":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelEdit(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes,
                  buDes
                );
              }}
            >
              <CiEdit className="text-slate-400" /> Edit
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center"
              onClick={() => {
                setIsOpen(true);
                setModalData({
                  message: `You want to delete ${tranId}`,
                  type: "Delete",
                  data: { mYr, planId, tranId, t, tDes, yr, r },
                });
              }}
            >
              <MdDelete className="text-slate-400" /> Delete
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );
      case "Final Submitted":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>
            {(filterState.rId || filterState.rId === "All") &&
              localStorageItems.roleId === 4 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelReview(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes,
                      buDes,
                      bgDes
                    );
                  }}
                >
                  <GrTask className="text-orange-400" /> Review Decision
                </li>
              )}
            {(filterState.tId || filterState.tId === "All") &&
              localStorageItems.roleId === 5 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    setRejectDraftModal(true);
                    setRejectModalData({
                      ...rejectModalData,
                      planId: planId,
                      tranId: tranId,
                      mYr: mYr,
                      tId: t,
                    });
                  }}
                >
                  <FaSkullCrossbones className="text-red-400" /> Reject as Draft
                </li>
              )}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "Region Review Done":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>

            {(filterState.tId || filterState.tId === "All") &&
              localStorageItems.roleId === 5 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    setRejectDraftModal(true);
                    setRejectModalData({
                      ...rejectModalData,
                      planId: planId,
                      tranId: tranId,
                      mYr: mYr,
                      tId: t,
                    });
                  }}
                >
                  <GrTask className="text-orange-400" /> Reject as Draft
                </li>
              )}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );
      case "B.U Review Done":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            {(!JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              4 ||
              JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
                3) && (
              <li
                className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                onClick={() => {
                  handleDownloadExcelView(
                    mYr,
                    planId,
                    tranId,
                    yr,
                    depot,
                    zrt,
                    status,
                    stage,
                    filterState,
                    bg,
                    bu,
                    z,
                    r,
                    t,
                    c,
                    w,
                    tDes,
                    rDes
                  );
                }}
              >
                <MdOutlinePreview className="text-slate-400" /> View
              </li>
            )}

            {(filterState.tId || filterState.tId === "All") &&
              localStorageItems.roleId === 5 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    setRejectDraftModal(true);
                    setRejectModalData({
                      ...rejectModalData,
                      planId: planId,
                      tranId: tranId,
                      mYr: mYr,
                      tId: t,
                    });
                  }}
                >
                  <GrTask className="text-orange-400" /> Reject as Draft
                </li>
              )}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "B.U Approved":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            {JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
              4 &&
              JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
                3 &&
              JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
                10 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelView(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes
                    );
                  }}
                >
                  <MdOutlinePreview className="text-slate-400" /> View
                </li>
              )}

            {(filterState.tId || filterState.tId === "All") &&
              localStorageItems.roleId === 5 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    setRejectDraftModal(true);
                    setRejectModalData({
                      ...rejectModalData,
                      planId: planId,
                      tranId: tranId,
                      mYr: mYr,
                      tId: t,
                    });
                  }}
                >
                  <GrTask className="text-orange-400" /> Reject as Draft
                </li>
              )}

            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelReview(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes,
                  zDes,
                  buDes,
                  bgDes
                );
              }}
            >
              <GrTask className="text-orange-400" /> Review Decision
            </li>

            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "Yet to Submit":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                );
              }}
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>
            {upload && (
              <li
                className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                onClick={() => {
                  router.push({
                    pathname: "/rptransaction",
                    query: {
                      planId: planId,
                      tranId: tranId,
                      yr: yr,
                      mYr: mYr,
                      depot: depot,
                      zrt: zrt,
                      status: status,
                      stage: stage,
                      bgId: bg,
                      buId: bu,
                      zId: z,
                      rId: r,
                      tId: t,
                      cId: c,
                      wId: w,
                      formType: "Add",
                      filterState: encodeURIComponent(
                        JSON.stringify(filterState)
                      ),
                    },
                  });
                }}
              >
                <FaUpload className="text-slate-400" /> Upload RP
              </li>
            )}

            {JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              5 &&
              filterState.tId && (
                <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center whitespace-nowrap">
                  <FaWhatsapp className="text-green-400" /> Whatsapp Reminder
                </li>
              )}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );
      case "Yet to Approve":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            {(JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              4 ||
              JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                3 ||
              JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                10) &&
              upload === true && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelEdit(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes,
                      zDes,
                      buDes,
                      bgDes
                    );
                  }}
                >
                  <FaUpload className="text-slate-400" /> Final Approve
                </li>
              )}
            {JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
              4 ||
              (JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
                3 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelView(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes
                    );
                  }}
                >
                  <MdOutlinePreview className="text-slate-400" /> View
                </li>
              ))}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "B.S Review Done":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            {JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              2 &&
              upload === true && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelEdit(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes,
                      zDes,
                      buDes
                    );
                  }}
                >
                  <FaUpload className="text-slate-400" /> Final Approve
                </li>
              )}
            {JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
              4 ||
              (JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
                3 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelView(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes
                    );
                  }}
                >
                  <MdOutlinePreview className="text-slate-400" /> View
                </li>
              ))}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "Reject":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      case "Zone Approved":
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() =>
                handleDownloadExcelNew(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  t,
                  tDes,
                  r,
                  rDes,
                  z,
                  zDes,
                  bu,
                  buDes,
                  bg,
                  bgDes,
                  filterState
                )
              }
            >
              <FaDownload className="text-slate-400" /> Download RP
            </li>

            {JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
              4 &&
              upload === true && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelEdit(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes,
                      zDes
                    );
                  }}
                >
                  <FaUpload className="text-slate-400" /> Final Approve
                </li>
              )}

            {JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
              4 &&
              JSON.parse(window.localStorage.getItem("userinfo")).role_id !==
                3 && (
                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDownloadExcelView(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      bg,
                      bu,
                      z,
                      r,
                      t,
                      c,
                      w,
                      tDes,
                      rDes
                    );
                  }}
                >
                  <MdOutlinePreview className="text-slate-400" /> View
                </li>
              )}
            {(filterState.zId || filterState.zId === "All") && isRole3 && (
              <li
                className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                onClick={() => {
                  handleDownloadExcelReview(
                    mYr,
                    planId,
                    tranId,
                    yr,
                    depot,
                    zrt,
                    status,
                    stage,
                    filterState,
                    bg,
                    bu,
                    z,
                    r,
                    t,
                    c,
                    w,
                    tDes,
                    rDes,
                    zDes,
                    buDes,
                    bgDes
                  );
                }}
              >
                <GrTask className="text-orange-400" /> Review Decision
              </li>
            )}
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <TbDeviceDesktopAnalytics className="text-orange-400" /> Target
              Vs. Actual
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <CgNotes className="text-blue-400" /> Meeting Note
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              <GrTask className="text-orange-400" /> Task
            </li>
          </ul>
        );

      default:
        return (
          <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                router.push({
                  pathname: "/rptransaction",
                  query: {
                    planId: planId,
                    tranId: tranId,
                    yr: yr,
                    mYr: mYr,
                    depot: depot,
                    zrt: zrt,
                    status: status,
                    stage: stage,
                    bgId: bg,
                    buId: bu,
                    zId: z,
                    rId: r,
                    tId: t,
                    cId: c,
                    wId: w,
                    formType: "Edit",
                  },
                });
              }}
            >
              <CiEdit className="text-slate-400" /> Edit
            </li>
            <li
              className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
              onClick={() => {
                handleDownloadExcelView(
                  mYr,
                  planId,
                  tranId,
                  yr,
                  depot,
                  zrt,
                  status,
                  stage,
                  filterState,
                  bg,
                  bu,
                  z,
                  r,
                  t,
                  c,
                  w,
                  tDes,
                  rDes
                );
              }}
            >
              <MdOutlinePreview className="text-slate-400" /> View
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              Previous Period
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              Current Period
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              Future Period
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center ">
              Target Vs. Actual
            </li>
          </ul>
        );
    }
  };

  const handleDownloadExcelNew = async (
    m_year,
    planId,
    tranId,
    yr,
    tId,
    tDes,
    rId,
    rDes,
    zId,
    zDes,
    buId,
    buDes,
    bgId,
    bgDes,
    filterState
  ) => {
    let paramsData;
    if (filterState?.tId || filterState?.tId === "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        t_id: tId,
        t_des: tDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      (filterState?.rId || filterState?.rId === "All") &&
      !filterState?.tId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        r_id: rId,
        r_des: rDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      (filterState?.zId || filterState?.zId === "All") &&
      !filterState?.rId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: zId,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.buId && !filterState?.zId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: buId,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.bgId && filterState?.buId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: buId,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.bgId && !filterState?.buId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bg_id: bgId,
        bg_des: bgDes,
        m_year: m_year,
        json: true,
      };
    }
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/rsp_download`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      if (tDes) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${tDes}.xlsx`
        );
      } else if (rDes) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${rDes}.xlsx`
        );
      } else if (zDes) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${zDes}.xlsx`
        );
      } else if (buDes) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${buDes}.xlsx`
        );
      } else if (bgDes) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${bgDes}.xlsx`
        );
      }

      setIsOpen(true);
      setModalData({
        message: apires.data.message,
        type: "Download",
        data: {},
      });
    } catch (error) {
      console.log("mlo", error);
    }
  };

  const handleDownloadExcelView = async (
    m_year,
    planId,
    tranId,
    yr,
    depot,
    zrt,
    status,
    stage,
    filterState,
    bg,
    bu,
    z,
    r,
    t,
    c,
    w,
    tDes,
    rDes
  ) => {
    let paramsData;
    if (filterState.tId || filterState.tId === "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        t_id: t,
        t_des: tDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      (filterState.rId || filterState.rId === "All") &&
      !filterState.tId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        r_id: r,
        r_des: rDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.zId && !filterState.rId && !filterState.tId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.buId && !filterState.rId && !filterState.tId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.buId && filterState.zId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    }

    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/rsp_download`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      let keys = Object.keys(apires.data.data[0]);
      // Convert array of objects to array of arrays
      let arrayOfArrays = [
        keys, // First array with keys
        ...apires.data.data.map((obj) => keys.map((key) => obj[key])),
      ];
      localStorage.setItem("RSP", JSON.stringify(arrayOfArrays));
      router.push({
        pathname: "/rptransaction",
        query: {
          planId: planId,
          tranId: tranId,
          yr: yr,
          mYr: m_year,
          depot: depot,
          zrt: zrt,
          status: status,
          stage: stage,
          bgId: bg,
          buId: bu,
          zId: z,
          rId: r,
          tId: t,
          cId: c,
          wId: w,
          formType: "View",
          filterState: encodeURIComponent(JSON.stringify(filterState)),
        },
      });
    } catch (error) {
      console.log("mlo", error);
    }
  };

  const handleDownloadExcelReview = async (
    m_year,
    planId,
    tranId,
    yr,
    depot,
    zrt,
    status,
    stage,
    filterState,
    bg,
    bu,
    z,
    r,
    t,
    c,
    w,
    tDes,
    rDes,
    zDes,
    buDes,
    bgDes
  ) => {
    let paramsData;
    console.log("mjj", filterState.buId);
    if (filterState.tId || filterState.tId === "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        t_id: t,
        t_des: tDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      (filterState.rId || filterState.rId === "All") &&
      !filterState.tId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        r_id: r,
        r_des: rDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.zId && !filterState.rId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.buId && filterState.zId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.buId && !filterState.zId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: bu,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      filterState.bgId &&
      (filterState.buId || filterState.buId === "All")
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: bu,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    } else {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: bu,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    }
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/rsp_download`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      let keys = Object.keys(apires.data.data[0]);
      // Convert array of objects to array of arrays
      let arrayOfArrays = [
        keys, // First array with keys
        ...apires.data.data.map((obj) => keys.map((key) => obj[key])),
      ];
      localStorage.setItem("RSP", JSON.stringify(arrayOfArrays));
      router.push({
        pathname: "/rptransaction",
        query: {
          planId: planId,
          tranId: tranId,
          yr: yr,
          mYr: m_year,
          depot: depot,
          zrt: zrt,
          status: status,
          stage: stage,
          bgId: bg,
          buId: bu,
          zId: z,
          rId: r,
          tId: t,
          cId: c,
          wId: w,
          formType: "Review",
          filterState: encodeURIComponent(JSON.stringify(filterState)),
        },
      });
    } catch (error) {
      console.log("mlo", error);
    }
  };

  const handleDownloadExcel = async (
    m_year,
    planId,
    tranId,
    yr,
    depot,
    zrt,
    status,
    stage,
    filterState,
    bg,
    bu,
    z,
    r,
    t,
    c,
    w,
    tDes,
    rDes
  ) => {
    let paramsData;
    if (filterState.tId || filterState.tId === "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        t_id: t,
        t_des: tDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      (filterState.rId || filterState.rId === "All") &&
      !filterState.tId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        r_id: r,
        r_des: rDes,
        m_year: m_year,
        json: true,
      };
    } else {
      paramsData = {};
    }
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/rsp_download`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      let keys = Object.keys(apires.data.data[0]);
      // Convert array of objects to array of arrays
      let arrayOfArrays = [
        keys, // First array with keys
        ...apires.data.data.map((obj) => keys.map((key) => obj[key])),
      ];
      localStorage.setItem("RSP", JSON.stringify(arrayOfArrays));
      router.push({
        pathname: "/rptransaction",
        query: {
          planId: planId,
          tranId: tranId,
          yr: yr,
          mYr: m_year,
          depot: depot,
          zrt: zrt,
          status: status,
          stage: stage,
          bgId: bg,
          buId: bu,
          zId: z,
          rId: r,
          tId: t,
          cId: c,
          wId: w,
          formType: "Review",
        },
      });
    } catch (error) {
      console.log("mlo", error);
    }
  };

  const handleDownloadExcelEdit = async (
    m_year,
    planId,
    tranId,
    yr,
    depot,
    zrt,
    status,
    stage,
    filterState,
    bg,
    bu,
    z,
    r,
    t,
    c,
    w,
    tDes,
    rDes,
    zDes,
    buDes,
    bgDes
  ) => {
    let paramsData;
    if (filterState.tId || filterState.tId === "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        t_id: t,
        t_des: tDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      (filterState.rId || filterState.rId === "All") &&
      !filterState.tId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        r_id: r,
        r_des: rDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.zId && !filterState.rId && !filterState.tId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (
      filterState.buId &&
      filterState.zId &&
      !filterState.rId &&
      !filterState.tId
    ) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        z_id: z,
        z_des: zDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.buId && !filterState.zId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: bu,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    } else if (filterState.bgId && !filterState.buId) {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bg_id: bg,
        bg_des: bgDes,
        m_year: m_year,
        json: true,
      };
    } else {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(m_year)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(m_year).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(m_year).format("YYYY-MM"),
        year_3_nm: moment(m_year).add(1, "months").format("YYYY-MM"),
        plan_id: planId,
        tran_id: tranId,
        bu_id: bu,
        bu_des: buDes,
        m_year: m_year,
        json: true,
      };
    }
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/rsp_download`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      let keys = Object.keys(apires.data.data[0]);
      // Convert array of objects to array of arrays
      let arrayOfArrays = [
        keys, // First array with keys
        ...apires.data.data.map((obj) => keys.map((key) => obj[key])),
      ];
      localStorage.setItem("RSP", JSON.stringify(arrayOfArrays));
      router.push({
        pathname: "/rptransaction",
        query: {
          planId: planId,
          tranId: tranId,
          yr: yr,
          mYr: m_year,
          depot: depot,
          zrt: zrt,
          status: status,
          stage: stage,
          bgId: bg,
          buId: bu,
          zId: z,
          rId: r,
          tId: t,
          cId: c,
          wId: w,
          formType: "Edit",
          filterState: encodeURIComponent(JSON.stringify(filterState)),
        },
      });
    } catch (error) {
      console.log("mlo", error);
    }
  };

  const handleDeleteRps = async (data) => {
    try {
      let paramsData;
      if (filterState.tId || filterState.tId === "All") {
        paramsData = {
          plan_id: data.planId,
          tran_id: data.tranId,
          t_year: data.yr,
          m_year: data.mYr,
          t_id: data.t,
          tm: true,
        };
      } else if (
        (filterState.rId || filterState.rId === "All") &&
        !filterState.tId
      ) {
        paramsData = {
          plan_id: data.planId,
          tran_id: data.tranId,
          t_year: data.yr,
          m_year: data.mYr,
          r_id: data.r,
          rm: true,
        };
      } else {
        paramsData = {};
      }
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/delete_rolling_tm`, {
        headers: headers,

        params: paramsData,
      });
      const apires = await respond;
      console.log("noye", apires.data.message);
      setIsOpen(true);
      setModalData({
        message: apires.data.message,
        type: "DeleteRes",
        data: {},
      });
      getAllSalesPlanStatus(
        filterState.yr || null,
        filterState.month || null,
        filterState.bgId || null,
        filterState.buId || null,
        filterState.zId || null,
        filterState.rId || null,
        filterState.tId
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      setModalData({
        message: errorMessage,
        type: "DeleteRes",
        data: {},
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    message: "",
    type: "",
    data: {},
  });

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalData({
        message: "",
        type: "",
        data: {},
      });
    }, [10]);
  };

  const handleDraftClose = () => {
    setRejectDraftModal(false);
    setRejectModalData({
      data: "",
      tranId: "",
      mYr: "",
      planId: "",
      tId: "",
    });
  };
  const isRole56 =
    localStorageItems.roleId === 6 || localStorageItems.roleId === 5;
  const isRole3 = localStorageItems.roleId === 3;
  const isRole10 = localStorageItems.roleId === 10;
  const isRole2 = localStorageItems.roleId === 2;

  const getMenuButton = () => {
    console.log("Chandan Kr", localStorageItems.roleId);
    if (localStorageItems.roleId === 6) {
      return true;
    } else if (localStorageItems.roleId === 5) {
      return true;
    } else if (localStorageItems.roleId === 4 && !filterState.tId) {
      return true;
    } else if (localStorageItems.roleId === 3 && !filterState.rId) {
      return true;
    } else if (localStorageItems.roleId === 10 && !filterState.zId) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Layout>
      <div className="h-screen  w-full font-arial bg-white  ">
        <div className="grid justify-items-stretch grid-flow-col px-8 py-2">
          <h2 className="flex font-arial  text-xl  py-2 font-bold  text-teal-400  justify-self-center underline">
            Rolling Sales Plan Status
          </h2>
        </div>
        <div className="my-4 flex  flex-col w-full gap-4 px-12 ">
          <div className="flex gap-4 w-full">
            <select
              className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.yr}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  yr: e.target.value,
                })
              }
              disabled={!filterState.yr}
            >
              <option value="All" className="font-bold" disabled={true}>
                -- Select --
              </option>
              {allYearData.map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.month}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  month: e.target.value,
                })
              }
              disabled={!filterState.yr}
            >
              <option value="All" className="font-bold">
                All
              </option>
              {allMonthData.map((item, idx) => (
                <option value={item.m_year} key={idx}>
                  {moment(item.m_year).format("MMM YYYY")}
                </option>
              ))}
            </select>
            <select
              className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.bgId}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                  buId: null,
                  zId: null,
                  rId: null,
                  tId: null,
                })
              }
              disabled={
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5 ||
                localStorageItems.roleId === 4 ||
                localStorageItems.roleId === 3 ||
                localStorageItems.roleId === 10
              }
            >
              <option value={""} className="font-bold">
                - Business Segment -
              </option>
              <option value={"All"}>All Segment</option>
              {bgData.map((item, idx) => (
                <option value={item.bg_id} key={idx}>
                  {item.business_segment}
                </option>
              ))}
            </select>
            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.buId}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  buId: e.target.value,

                  zId: "",
                  rId: "",
                  tId: "",
                })
              }
              disabled={
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5 ||
                localStorageItems.roleId === 4 ||
                localStorageItems.roleId === 3
              }
            >
              <option value={""}>- Business Unit -</option>
              <option value={"All"}>All Unit</option>
              {buData.map((item, idx) => (
                <option value={item.bu_id} key={idx}>
                  {item.business_unit_name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.zId}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  rId: "",
                  tId: "",
                })
              }
              disabled={
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5 ||
                localStorageItems.roleId === 4
              }
            >
              <option value={""}>- Zone -</option>
              <option value={"All"}>All Zone</option>
              {zoneData.map((item, idx) => (
                <option value={item.z_id} key={idx}>
                  {item.zone_name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.rId}
              disabled={
                localStorageItems.roleId === 6 || localStorageItems.roleId === 5
              }
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "",
                })
              }
            >
              <option value={""}>- Region -</option>
              <option value={"All"}>All Region</option>
              {regionData.map((item, idx) => (
                <option value={item.r_id} key={idx}>
                  {item.region_name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.tId}
              disabled={localStorageItems.roleId === 6}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  tId: e.target.value,
                })
              }
            >
              <option value={""}>- Territory -</option>
              <option value="All">All Territory</option>
              {territoryData.map((item, idx) => (
                <option value={item.t_id} key={idx}>
                  {item.territory_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-4 min-h-screen">
            <table className="min-w-full divide-y border- divide-gray-200  ">
              <thead className="">
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider ">
                    Rolling Sales Plan
                  </th>
                  <th className="px- py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Depot
                  </th>
                  <th className="pl-4 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Segment / Unit / Zone / Region / Territory
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Actual Sale vs Rolling Sales Target
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Stage
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTableData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      <div className="flex items-center">
                        <div className=""></div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                            R S P-({item.tran_id})
                          </p>
                          <p className="text-gray-900 whitespace-no-wrap text-[0.6rem] font-bold">
                            {moment(item.m_year).format("MMM YYYY")} (due date{" "}
                            {moment(item.lastsubm_t_date).format("Do")})
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px- py-2 border-b border-gray-200 bg-white text-sm ">
                      <p className="text-gray-900 whitespace-no-wrap text-xs ">
                        {item.depot_name}
                      </p>
                    </td>
                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-xs">
                        {item.business_segment}
                        {item.business_unit_name && "/"}
                        {item.business_unit_name}
                        {item.zone_name && "/"}
                        {item.zone_name}
                        {item.region_name && "/"}
                        {item.region_name}
                        {item.territory_name && "/"}
                        {item.territory_name}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      <div className="demo-preview">
                        <div className="progress progress-striped active flex flex-row justify-between  ">
                          <div
                            role="progressbar "
                            style={{
                              width: `${(item.actual / item.target) * 100}%`,
                            }}
                            className="progress-bar progress-bar-success rounded-md"
                          >
                            <span className="inline-block text-xs font-bold whitespace-nowrap">
                              {(
                                Number(item.actual / item.target) * 100
                              ).toFixed(2)}{" "}
                              %
                            </span>
                          </div>
                          <span className="font-bold text-xs whitespace-nowrap">
                            {item.actual} / {item.target}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          style={{
                            backgroundColor: getStatus(item.rp_status),
                          }}
                          className="absolute inset-0 opacity-60 rounded-full"
                        ></span>
                        <span className="relative text-white whitespace-no-wrap text-xs font-semibold">
                          {item.rp_status}
                        </span>
                      </span>
                    </td>

                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm relative flex items-center justify-between">
                      <span className="relative inline-block px-2 py-1 italic text-green-900 leading-tight">
                        {item.count}
                      </span>

                      <div className="popop">
                        {console.log("chandan", getMenuButton())}
                        {getMenuButton() && (
                          <Popover
                            as="div"
                            className="relative border-none outline-none "
                          >
                            {({ open }) => (
                              <>
                                <Popover.Button className="focus:outline-none">
                                  <BsThreeDotsVertical
                                    className="text-[#626364] cursor-pointer"
                                    size={20}
                                  ></BsThreeDotsVertical>
                                </Popover.Button>

                                <Popover.Panel
                                  as="div"
                                  className={`${
                                    open ? "block" : "hidden"
                                  } absolute z-40 top-1 right-0 mt-2 w-52 bg-white  text-black border rounded-md shadow-md`}
                                >
                                  {getOptions(
                                    item.upload,
                                    item.plan_id,
                                    item.tran_id,
                                    item.t_year,
                                    item.m_year,
                                    item.depot_name,
                                    `${
                                      item.business_segment
                                        ? item.business_segment
                                        : ""
                                    } 
                                      ${
                                        item.business_unit_name
                                          ? item.business_unit_name
                                          : ""
                                      }  
                                      ${item.zone_name ? item.zone_name : ""} 
                                      ${
                                        item.region_name ? item.region_name : ""
                                      }
                                       ${
                                         item.territory_name
                                           ? item.territory_name
                                           : ""
                                       }`,
                                    item.rp_status,
                                    item.count || "",

                                    item.bg_id,
                                    item.bu_id,
                                    item.z_id,
                                    item.r_id,
                                    item.t_id,
                                    item.c_id,
                                    item.w_id,
                                    item.territory_name,
                                    item.region_name,
                                    item.zone_name,
                                    item.business_unit_name,
                                    item.business_segment
                                  )}
                                </Popover.Panel>
                              </>
                            )}
                          </Popover>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Transition appear show={successOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setSuccessOpen(false);
            setSuccessMsg("");
          }}
        >
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Rolling Plan
                  </Dialog.Title>
                  <div className="mt-2">{successMsg}</div>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setSuccessOpen(false);
                        setSuccessMsg("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={rejectDraftModal} as={Fragment} size="lg">
        <Dialog
          as="div"
          className="relative z-10"
          onClose={handleDraftClose}
          style={{ maxHeight: "100vh", maxWidth: "3xl" }}
        >
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial  w-[75%] h-[75%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.25rem]  font-medium leading-6 text-center text-gray-900"
                  >
                    Review Message
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      className="w-full  px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      maxLength={256}
                      placeholder="Comment Please"
                      value={rejectModalData.data}
                      onChange={(e) =>
                        setRejectModalData({
                          ...rejectModalData,
                          data: e.target.value,
                        })
                      }

                      // disabled={!formActive}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-start gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSaveDraft}
                      disabled={!rejectModalData.data}
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDraftClose}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.99rem] font-medium leading-6 text-center text-gray-900"
                  >
                    {modalData.type === "Download"
                      ? "Rolling Plan"
                      : "Delete Rollng Plan"}
                  </Dialog.Title>
                  <div className="mt-2">
                    {modalData.type === "Download" && (
                      <p className="text-md text-center text-gray-500 italic">
                        {modalData.message}
                      </p>
                    )}
                    {modalData.type === "Delete" && (
                      <p className="text-md text-center text-gray-500">
                        {modalData.message}
                      </p>
                    )}
                    {modalData.type === "DeleteRes" && (
                      <p className="text-md text-center text-gray-500">
                        {modalData.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-4">
                    {modalData.type === "Delete" && (
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-white-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => handleDeleteRps(modalData.data)}
                      >
                        Yes
                      </button>
                    )}
                    {modalData.type === "Delete" ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleClose}
                      >
                        No
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default RollingPlans;
