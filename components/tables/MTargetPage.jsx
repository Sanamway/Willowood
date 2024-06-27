import React, { useEffect, useState, Fragment } from "react";
import Layout from "../Layout";
import { FaDownload } from "react-icons/fa";
import { FcApprovall } from "react-icons/io";
import { FcApproval } from "react-icons/fc";
import { FaUpload } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePreview } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import { FaSkullCrossbones } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { Dialog, Transition } from "@headlessui/react";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { FcBullish } from "react-icons/fc";
const MTarget = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  // const endDate = new Date(2024, 4, 16);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
  });
  const [gridType, setGridType] = useState("");
  const [filterState, setFilterState] = useState({
    bgId: null,
    buId: null,
    zId: null,
    rId: null,
    wId: null,
    wDes: null,
    tId: null,
    yr: moment().year(),
    month: null,
  });
  const [allMonthData, setAllMonthData] = useState([]);
  const [allYearData, setAllYearData] = useState([]);
  const getAllTransactionPlan = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_cp`, {
        headers: headers,
        params: { status: true },
      });
      const apires = await respond.data.data;
      setAllYearData([...new Set(apires.map((item) => item.t_year))]);
    } catch (error) {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactionPlan();
  }, []);
  const getAllTransactionYear = async (yr) => {
    try {
      const respond = await axios.get(`${url}/api/get_cp`, {
        headers: headers,
        params: { status: true, year: yr },
      });
      const apires = await respond.data.data;

      setAllMonthData([...new Set(apires.map((item) => item.m_year))]);
    } catch (error) {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    if (!filterState.yr) return;
    getAllTransactionYear(filterState.yr);
  }, [filterState.yr]);

  useEffect(() => {
    if (!allYearData.length) return;
    const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

    switch (roleId) {
      case 6:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: Math.max(...allYearData),
          month: null,
        });
        break;
    }
  }, [allYearData]);

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      console.log("Bye", window.localStorage.getItem("userinfo").c_id);
      setBgData(
        apires.filter(
          (item) =>
            item.isDeleted === false &&
            Number(item.c_id) ===
              JSON.parse(window.localStorage.getItem("userinfo")).c_id
        )
      );
    } catch (error) {
      setDownloadLoading(false);
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
      setDownloadLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filterState.bgId) return;
    getBusinessUnitInfo(filterState.bgId);
  }, [filterState.bgId]);

  const [zoneData, setAllZoneData] = useState([]);
  const getAllZoneData = async (segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllZoneData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {
      setDownloadLoading(false);
    }
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
    } catch (error) {
      setDownloadLoading(false);
    }
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
      const currentDate = new Date();

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
    } catch (error) {
      setDownloadLoading(false);
    }
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

  const [depotData, setDepotData] = useState([]);

  const getAllDepotData = async (cId) => {
    try {
      const respond = await axios.get(`${url}/api/get_warehousedepot`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setDepotData(apires.filter((item) => item.c_id === cId));
    } catch (error) {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    if (!JSON.parse(window.localStorage.getItem("userinfo")).c_id) return;
    getAllDepotData(JSON.parse(window.localStorage.getItem("userinfo")).c_id);
  }, []);

  const [allTableData, setAllTableData] = useState([]);
  const getAllRollingSalesPlanStatus = async (
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

      let actualValue = 0;
      let budgetValue = 0;
      let targetValue = 0;
      let mtargetValue = 0;
      let actualValueH1 = 0;
      let budgetValueH1 = 0;
      let targetValueH1 = 0;
      let mtargetValueH1 = 0;
      let actualValueH2 = 0;
      let budgetValueH2 = 0;
      let targetValueH2 = 0;
      let mtargetValueH2 = 0;
      let actualValueCurrent = 0;
      let budgetValueCurrent = 0;
      let targetValueCurrent = 0;
      let mtargetValueCurrent = 0;
      apires.forEach((element) => {
        actualValue = Number(actualValue) + Number(element.actual);
        budgetValue = Number(budgetValue) + Number(element.budget);
        targetValue = Number(targetValue) + Number(element.target);
        mtargetValue = Number(mtargetValue) + Number(element.m_target);
        if (Number(moment(element.m_year).format("M")) === 4) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 5) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 6) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 7) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 8) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 9) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 10) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 11) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 12) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 1) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 2) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 3) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        }

        if (
          moment(element.m_year).format("M") === moment(new Date()).format("M")
        ) {
          actualValueCurrent =
            Number(actualValueCurrent) + Number(element.actual);
          budgetValueCurrent =
            Number(budgetValueCurrent) + Number(element.budget);
          targetValueCurrent =
            Number(targetValueCurrent) + Number(element.target);
          mtargetValueCurrent =
            Number(mtargetValueCurrent) + Number(element.m_target);
        }
        setCollectionSummaryData({
          actual: actualValue,
          budget: budgetValue,
          target: targetValue,
          mTarget: mtargetValue,
          actualH1: actualValueH1,
          budgetH1: budgetValueH1,
          targetH1: targetValueH1,
          mTargetH1: mtargetValueH1,
          actualH2: actualValueH2,
          budgetH2: budgetValueH2,
          targetH2: targetValueH2,
          mTargetH2: mtargetValueH2,
          actualCurrent: actualValueCurrent,
          budgetCurrent: budgetValueCurrent,
          targetCurrent: targetValueCurrent,
          mTargetCurrent: mtargetValueCurrent,
        });
      });
    } catch (error) {
      if (!error) return;
      setAllTableData([]);
    }
  };
  const getAllSalesPlanStatus = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId
  ) => {
    const currentDate = new Date();

    let endPoint;
    console.log("salesplan", yr, month, bgId, buId, zId, rId, tId);
    if (bgId && buId && zId && rId && tId) {
      endPoint = "api/get_collectiondata_based_on_roll_t";
    } else if (bgId && buId && zId && rId && !tId) {
      endPoint = "api/get_collectiondata_based_on_roll_r";
    } else if (bgId && buId && zId && !rId && !tId) {
      endPoint = "api/get_collectiondata_based_on_roll_z";
    } else if (bgId && buId && !zId && !rId && !tId) {
      endPoint = "api/get_collectiondata_based_on_roll_bu";
    } else if (bgId && !buId && !zId && !rId && !tId) {
      endPoint = "api/get_collectiondata_based_on_roll_bg";
    } else {
      return;
    }

    try {
      console.log("dataBlog", {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        bg_id: bgId === "All" || !bgId ? null : bgId,
        bu_id: buId === "All" || !buId ? null : buId,
        z_id: zId === "All" || !zId ? null : zId,
        r_id: rId === "All" || !rId ? null : rId,
        t_id: tId === "All" || !tId ? null : tId,
      });
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
      let actualValue = 0;
      let budgetValue = 0;
      let targetValue = 0;
      let mtargetValue = 0;
      let actualValueH1 = 0;
      let budgetValueH1 = 0;
      let targetValueH1 = 0;
      let mtargetValueH1 = 0;
      let actualValueH2 = 0;
      let budgetValueH2 = 0;
      let targetValueH2 = 0;
      let mtargetValueH2 = 0;
      let actualValueCurrent = 0;
      let budgetValueCurrent = 0;
      let targetValueCurrent = 0;
      let mtargetValueCurrent = 0;
      apires.forEach((element) => {
        actualValue = Number(actualValue) + Number(element.actual);
        budgetValue = Number(budgetValue) + Number(element.budget);
        targetValue = Number(targetValue) + Number(element.target);
        mtargetValue = Number(mtargetValue) + Number(element.m_target);
        if (Number(moment(element.m_year).format("M")) === 4) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 5) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 6) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 7) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 8) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 9) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
          mtargetValueH1 = Number(mtargetValueH1) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 10) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 11) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 12) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 1) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 2) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        } else if (Number(moment(element.m_year).format("M")) === 3) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
          mtargetValueH2 = Number(mtargetValueH2) + Number(element.m_target);
        }

        if (
          moment(element.m_year).format("M") === moment(new Date()).format("M")
        ) {
          actualValueCurrent =
            Number(actualValueCurrent) + Number(element.actual);
          budgetValueCurrent =
            Number(budgetValueCurrent) + Number(element.budget);
          targetValueCurrent =
            Number(targetValueCurrent) + Number(element.target);
          mtargetValueCurrent =
            Number(mtargetValueCurrent) + Number(element.m_target);
        }
        setCollectionSummaryData({
          actual: actualValue,
          budget: budgetValue,
          target: targetValue,
          mTarget: mtargetValue,
          actualH1: actualValueH1,
          budgetH1: budgetValueH1,
          targetH1: targetValueH1,
          mTargetH1: mtargetValueH1,
          actualH2: actualValueH2,
          budgetH2: budgetValueH2,
          targetH2: targetValueH2,
          mTargetH2: mtargetValueH2,
          actualCurrent: actualValueCurrent,
          budgetCurrent: budgetValueCurrent,
          targetCurrent: targetValueCurrent,
          mTargetCurrent: mtargetValueCurrent,
        });
      });
    } catch (error) {
      setDownloadLoading(false);
      if (!error) return;
      setAllTableData([]);
    }
  };

  useEffect(() => {
    if (gridType === "Rolling") {
      getAllRollingSalesPlanStatus(
        filterState.yr || null,
        filterState.month || null,
        filterState.bgId || null,
        filterState.buId || null,
        filterState.zId || null,
        filterState.rId || null,
        filterState.tId
      );
    } else {
      getAllSalesPlanStatus(
        filterState.yr || null,
        filterState.month || null,
        filterState.bgId || null,
        filterState.buId || null,
        filterState.zId || null,
        filterState.rId || null,
        filterState.tId
      );
    }
  }, [
    filterState.yr,
    filterState.month,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
    gridType,
  ]);

  const [collectionSummaryData, setCollectionSummaryData] = useState({
    actual: 0,
    budget: 0,
    target: 0,
    mTarget: 0,

    actualH1: 0,
    budgetH1: 0,
    targetH1: 0,
    mTargetH1: 0,

    actualH2: 0,
    budgetH2: 0,
    targetH2: 0,
    mTargetH2: 0,

    actualCurrent: 0,
    budgetCurrent: 0,
    targetCurrent: 0,
    mTargetCurrent: 0,
  });

  return (
    <Layout>
      <div className="h-screen  w-full font-arial bg-white">
        <div className="grid justify-items-stretch grid-flow-col px-8 py-2">
          <h2 className="flex font-arial  text-xl  py-2 font-bold  text-teal-400  justify-self-center underline">
            Management Target Status
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
                <option value={item} key={idx}>
                  {moment(item).format("MMM YYYY")}
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
                localStorageItems.roleId === 11 ||
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
                localStorageItems.roleId === 11 ||
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
                localStorageItems.roleId === 11 ||
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
                localStorageItems.roleId === 11 ||
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5
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

            {/* <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.tId}
              disabled={
                localStorageItems.roleId === 11 ||
                localStorageItems.roleId === 6
              }
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
            </select> */}

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={gridType}
              onChange={(e) => setGridType(e.target.value)}
            >
              <option value={""}>- Grid Type -</option>

              <option value="Rolling">Rolling Plan</option>
              <option value="Collection">Collection Plan</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between px-12 ">
          <h2 className="flex  font-bold text-xs">
            Total Summary Collection Plan (in Lac){" "}
          </h2>
          <div className="flex flex-row px-2 items-center gap-4 font-bold text-xs">
            <span>Target Ach </span>{" "}
            <span className="flex h-3 w-3 bg-red-500"></span>
            {"< = 50"}
            <span className="flex h-3 w-3 bg-blue-500"></span>
            {"51 to 74  %"}
            <span className="flex h-3 w-3 bg-orange-500"></span>
            {"75 to 90 %"}
            <span className="flex h-3 w-3 bg-green-500"></span>
            {" > 90 %"}
          </div>
        </div>
        <div className="hidden lg:flex flex-col mt-2 text-sm px-12">
          <div className="grid grid-cols-4  text-sm ">
            <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200 ">
              YTD
            </div>
            <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
              H1 - (April - Sept)
            </div>
            <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
              H2 - (Oct - March)
            </div>
            <div className="border border-gray-300 py-1 flex justify-center items-center font-bold text-xs bg-gray-200">
              Current Month-MTD
            </div>
          </div>

          <div className="grid grid-cols-4  text-sm  font-bold text-xs ">
            <div className="border border-gray-300  flex justify-between items-center">
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                C.Target
              </span>
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                M.Target
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                Actual
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                C.Ach%
              </span>
              <span className=" flex items-center justify-center   border-gray-300 w-20">
                M.Ach %
              </span>
            </div>
            <div className="border border-gray-300  flex justify-between items-center">
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                C.Target
              </span>
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                M.Target
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                Actual
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                C.Ach%
              </span>
              <span className=" flex items-center justify-center   border-gray-300 w-20">
                M.Ach %
              </span>
            </div>
            <div className="border border-gray-300  flex justify-between items-center">
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                C.Target
              </span>
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                M.Target
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                Actual
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                C.Ach%
              </span>
              <span className=" flex items-center justify-center   border-gray-300 w-20">
                M.Ach %
              </span>
            </div>
            <div className="border border-gray-300 flex justify-between items-center">
              <span className="flex items-center  justify-center  border-r border-gray-300 w-20">
                C.Target
              </span>
              <span className="flex items-center  justify-center  border-r border-gray-300 w-20">
                M.Target
              </span>

              <span className="flex items-center  justify-center border-r border-gray-300 w-20">
                Actual
              </span>
              <span className="flex items-center  justify-center border-r border-gray-300 w-20">
                C.Ach%
              </span>
              <span className="flex items-center justify-center   border-gray-300 w-20">
                M.Ach %
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4  text-sm bg-white ">
            <div className="border border-gray-300  flex justify-between items-center">
              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.target.toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.mTarget.toFixed(2)}
              </span>

              <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                {collectionSummaryData.actual.toFixed(2)}
              </span>

              <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                {(
                  (collectionSummaryData.actual /
                    collectionSummaryData.target) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actual.toFixed(2) /
                    collectionSummaryData.target.toFixed(2)) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actual /
                        collectionSummaryData.target) *
                      100
                    ).toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center  border-gray-300 w-20">
                {(
                  (collectionSummaryData.actual /
                    collectionSummaryData.mTarget) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actual /
                    collectionSummaryData.mTarget) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actual /
                        collectionSummaryData.mTarget) *
                      100
                    ).toFixed(2)}
              </span>
            </div>
            <div className="border border-gray-300  flex justify-between items-center">
              <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                {collectionSummaryData.targetH1.toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.mTargetH1.toFixed(2)}
              </span>

              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                {collectionSummaryData.actualH1.toFixed(2)}
              </span>

              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                {(
                  (collectionSummaryData.actualH1 /
                    collectionSummaryData.targetH1) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actualH1.toFixed(2) /
                    collectionSummaryData.targetH1.toFixed(2)) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actualH1 /
                        collectionSummaryData.targetH1) *
                      100
                    ).toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center  border-gray-300 w-20">
                {(
                  (collectionSummaryData.actualH1 /
                    collectionSummaryData.mTargetH1) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actualH1 /
                    collectionSummaryData.mTargetH1) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actualH1 /
                        collectionSummaryData.mTargetH1) *
                      100
                    ).toFixed(2)}
              </span>
            </div>
            <div className="border border-gray-300  flex justify-between items-center">
              <span className=" flex items-center justify-center  border-r border-gray-300 w-20">
                {collectionSummaryData.targetH2.toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.mTargetH2.toFixed(2)}
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.actualH2.toFixed(2)}
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {(
                  (collectionSummaryData.actualH2 /
                    collectionSummaryData.targetH2) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actualH2.toFixed(2) /
                    collectionSummaryData.targetH2.toFixed(2)) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actualH2 /
                        collectionSummaryData.targetH2) *
                      100
                    ).toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center  border-gray-300 w-20">
                {(
                  (collectionSummaryData.actualH2 /
                    collectionSummaryData.mTargetH2) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actualH2 /
                    collectionSummaryData.mTargetH2) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actualH2 /
                        collectionSummaryData.mTargetH2) *
                      100
                    ).toFixed(2)}
              </span>
            </div>
            <div className="border border-gray-300  flex justify-between items-center ">
              <span className=" flex items-center  justify-center  border-r border-gray-300 w-20">
                {collectionSummaryData.targetCurrent.toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.mTargetCurrent.toFixed(2)}
              </span>

              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {collectionSummaryData.actualCurrent.toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center border-r border-gray-300 w-20">
                {(
                  (collectionSummaryData.actualCurrent /
                    collectionSummaryData.targetCurrent) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actualCurrent.toFixed(2) /
                    collectionSummaryData.targetCurrent.toFixed(2)) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actualCurrent /
                        collectionSummaryData.targetCurrent) *
                      100
                    ).toFixed(2)}
              </span>
              <span className=" flex items-center  justify-center  border-gray-300 w-20">
                {(
                  (collectionSummaryData.actualCurrent /
                    collectionSummaryData.mTargetCurrent) *
                  100
                ).toFixed(2) === "NaN" ||
                (
                  (collectionSummaryData.actualCurrent /
                    collectionSummaryData.mTargetCurrent) *
                  100
                ).toFixed(2) === "Infinity"
                  ? 0
                  : (
                      (collectionSummaryData.actualCurrent /
                        collectionSummaryData.mTargetCurrent) *
                      100
                    ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full px-12 gap-2 mt-2">
          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            Upload
          </button>
          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            Download
          </button>
        </div>
        <div className="bg-white h-screen flex items-start justify-center max-w-full mt-4">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-4 min-h-screen">
            <table className="min-w-full divide-y border- divide-gray-200  ">
              <thead className="">
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Month-Year
                  </th>

                  <th className="pl-4 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white">
                    Segment
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Unit
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Zone
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Region
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Budget
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    RSP
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    M.Target
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Sale
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    B.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    R.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    M.Ach
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTableData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {moment(item.m_year).format("MMM YYYY")}
                    </td>

                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.business_segment}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      {item.business_unit_name}
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.zone_name}
                    </td>

                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {item.region_name}
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {item.budget}
                    </td>

                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.target}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      <input
                        className="border-2 border-solid border-black-500 px-2 py-2"
                        placeholder="Enter M.Target"
                        value={item.m_target}
                      />
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.target}
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {((item.actual / item.m_target) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.m_target) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.m_target) * 100).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {(
                        (collectionSummaryData.actualH2 /
                          collectionSummaryData.mTargetH2) *
                        100
                      ).toFixed(2) === "NaN" ||
                      (
                        (collectionSummaryData.actualH2 /
                          collectionSummaryData.mTargetH2) *
                        100
                      ).toFixed(2) === "Infinity"
                        ? 0
                        : (
                            (collectionSummaryData.actualH2 /
                              collectionSummaryData.mTargetH2) *
                            100
                          ).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {((item.actual / item.m_target) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.m_target) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.m_target) * 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex items-center justify-start gap-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-start gap-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Send
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Close
        </button>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  );
};

export default MTarget;
