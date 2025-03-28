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
const CollectionPlans = () => {
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
    if (!JSON.parse(window.localStorage.getItem("userinfo")).role_id === 11)
      return;

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

  const getAllDepotSalesPlan = async (yr, month, wId) => {
    let endPoint;
    endPoint = "api/get_collectiondata_based_on_roll_r";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          w_id: wId === "All" || !wId ? null : wId,
        },
      });

      const apires = await respond.data.data;
      setAllTableData(apires);
    } catch (error) {
      setDownloadLoading(false);
      if (!error) return;
      setAllTableData([]);
    }
  };

  useEffect(() => {
    if (!filterState.yr || !filterState.month || !filterState.wId) return;
    getAllDepotSalesPlan(
      filterState.yr || null,
      filterState.month || null,
      filterState.wId || null
    );
  }, [filterState.yr, filterState.month, filterState.wId]);

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
      case "Region Review Done":
        return "green";
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
    cId: "",
    rId: "",
  });

  const handleSaveDraft = async () => {
    let dataObject;
    if (
      (filterState.rId || filterState.rId === "All") &&
      localStorageItems.roleId === 4
    ) {
      dataObject = {
        t_year: filterState.yr,
        m_year: rejectModalData.mYr,
        plan_id: rejectModalData.planId,
        tran_id: rejectModalData.tranId,
        r_id: Number(rejectModalData.rId),
        rp_status: "Draft Submit",
        remarks: rejectModalData.data,
      };
    } else {
      dataObject = {
        t_year: filterState.yr,
        m_year: rejectModalData.mYr,
        plan_id: rejectModalData.planId,
        tran_id: rejectModalData.tranId,
        t_id: Number(rejectModalData.tId),
        rp_status: "Draft Submit",
        remarks: rejectModalData.data,
      };
    }
    try {
      const respond = await axios.get(`${url}/api/cp_update_status`, {
        headers: headers,
        params: dataObject,
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
      setDownloadLoading(false);
      console.log(error);
    }
  };

  const Loader = () => {
    return (
      <div class="flex space-x-1   justify-center items-center bg-white  ">
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce"></div>
      </div>
    );
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
    bgDes,
    wDes,
    lastSubDate,
    tHodName,
    tHodNum,
    cId
  ) => {
    try {
      switch (status) {
        case "Close Period":
          return (
            <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer ">
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}
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
                    cId,
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
                {viewLoading ? (
                  <Loader />
                ) : (
                  <MdOutlinePreview
                    className="text-slate-400"
                    disabled={viewLoading}
                  />
                )}{" "}
                View
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}
              <li
                className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                onClick={() => {
                  handleDownloadExcel(mYr, planId, tranId, t, tDes, yr, "Edit");
                  router.push({
                    pathname: "/cptransaction",
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
                {editLoading ? (
                  <Loader />
                ) : (
                  <CiEdit className="text-slate-400" disabled={editLoading} />
                )}{" "}
                Edit
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
                    cId,
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
                    cId
                  );
                }}
              >
                {viewLoading ? (
                  <Loader />
                ) : (
                  <MdOutlinePreview
                    className="text-slate-400"
                    disabled={viewLoading}
                  />
                )}{" "}
                View
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}
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
                    cId,
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
                {editLoading ? (
                  <Loader />
                ) : (
                  <CiEdit className="text-slate-400" disabled={editLoading} />
                )}{" "}
                Edit
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
                <MdDelete className="text-slate-400" disabled={downloadLoading} />{" "}
                Delete
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
                    cId,
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
                    cId
                  );
                }}
              >
                {viewLoading ? (
                  <Loader />
                ) : (
                  <MdOutlinePreview
                    className="text-slate-400"
                    disabled={viewLoading}
                  />
                )}{" "}
                View
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
          if (
            JSON.parse(window.localStorage.getItem("userinfo")).role_id === 11
          ) {
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
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>

                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDepotExcelView(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      w,
                      wDes,
                      "All"
                    );
                  }}
                >
                  {viewLoading ? (
                    <Loader />
                  ) : (
                    <MdOutlinePreview
                      className="text-slate-400"
                      disabled={viewLoading}
                    />
                  )}{" "}
                  View All
                </li>

                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() =>
                    handleDownloadExcelDepot(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      w,
                      wDes,
                      "All"
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  All Download CP
                </li>

                <li
                  className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                  onClick={() => {
                    handleDepotExcelView(
                      mYr,
                      planId,
                      tranId,
                      yr,
                      depot,
                      zrt,
                      status,
                      stage,
                      filterState,
                      w,
                      wDes,
                      "Single"
                    );
                  }}
                >
                  {viewLoading ? (
                    <Loader />
                  ) : (
                    <MdOutlinePreview
                      className="text-slate-400"
                      disabled={viewLoading}
                    />
                  )}{" "}
                  View
                </li>
              </ul>
            );
          } else {
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>

                {!(
                  JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                  4 && filterState.rId
                ) && (
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
                          cId,
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
                      {viewLoading ? (
                        <Loader />
                      ) : (
                        <MdOutlinePreview
                          className="text-slate-400"
                          disabled={viewLoading}
                        />
                      )}{" "}
                      View
                    </li>
                  )}

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
                      <VscPreview className="text-green-400" /> Review Decision
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
                          cId: cId,
                        });
                      }}
                    >
                      <FaSkullCrossbones className="text-red-400" /> Reject as
                      Draft
                    </li>
                  )}
                {(filterState.rId || filterState.rId === "All") &&
                  localStorageItems.roleId === 4 && (
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
                          rId: r,
                          cId: cId,
                        });
                      }}
                    >
                      <FaSkullCrossbones className="text-red-400" /> Reject as
                      Draft
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
          }

        case "Region Review Done":
          return (
            <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}

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
                    cId,
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
                    cId
                  );
                }}
              >
                {viewLoading ? (
                  <Loader />
                ) : (
                  <MdOutlinePreview
                    className="text-slate-400"
                    disabled={viewLoading}
                  />
                )}{" "}
                View
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}

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
                        cId,
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
                    {viewLoading ? (
                      <Loader />
                    ) : (
                      <MdOutlinePreview
                        className="text-slate-400"
                        disabled={viewLoading}
                      />
                    )}{" "}
                    View
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
                <VscPreview className="text-green-400" /> Review Decision
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
              {upload && (
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
                      cId,
                      filterState
                    );
                  }}
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}
              {upload &&
                !(
                  JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                  4 && filterState.rId
                ) && (
                  <li
                    className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                    onClick={() => {
                      let last = new Date(lastSubDate);
                      last.setHours(23);
                      last.setMinutes(59);
                      last.setSeconds(59);
                      last.setMilliseconds(999);
                      if (new Date(last) > new Date()) {
                        router.push({
                          pathname: "/cptransaction",
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
                      } else {
                        setIsOpen(true);
                        setModalData({
                          message: `Collection  Plan for the Month of Apr 24 and Closing Date ${lastSubDate.split("T")[0]
                            } .  you can not upload after Closing Date , Please Contact your Business Unit Head for Extend the Closing Date for CP Submission .`,
                          type: "Upload",
                          data: {},
                        });
                      }
                    }}
                  >
                    <FaUpload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />{" "}
                    Upload CP
                  </li>
                )}

              {JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                5 &&
                filterState.tId && (
                  <li
                    className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center whitespace-nowrap"
                    onClick={() =>
                      handleWhatsappApp(mYr, tDes, tHodName, tHodNum, lastSubDate)
                    }
                  >
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}

              {(JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                4 ||
                JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                3 ||
                JSON.parse(window.localStorage.getItem("userinfo")).role_id ===
                10) &&
                upload && (
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
                        cId,
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
                    <FcApproval className="text-green-400" /> Final Approve
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

        case "B.S Review Done":
          return (
            <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}

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
                        cId,
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
                    <FcApprovall className="text-green-400" /> Final Approve
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
                          cId,
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
                      {viewLoading ? (
                        <Loader />
                      ) : (
                        <MdOutlinePreview
                          className="text-slate-400"
                          disabled={viewLoading}
                        />
                      )}{" "}
                      View
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

        case "B.S Approved":
          return (
            <ul className=" text-black text-lg flex flex-col gap-  font-Rale cursor-pointer">
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}

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
                        cId,
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
                    <FcApprovall className="text-green-400" /> Final Approve
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
                          cId,
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
                      {viewLoading ? (
                        <Loader />
                      ) : (
                        <MdOutlinePreview
                          className="text-slate-400"
                          disabled={viewLoading}
                        />
                      )}{" "}
                      View
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}
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
                    cId,
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
                {viewLoading ? (
                  <Loader />
                ) : (
                  <MdOutlinePreview
                    className="text-slate-400"
                    disabled={viewLoading}
                  />
                )}{" "}
                View
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
              {upload && (
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
                      cId,
                      filterState
                    )
                  }
                >
                  {downloadLoading ? (
                    <Loader />
                  ) : (
                    <FaDownload
                      className="text-slate-400"
                      disabled={downloadLoading}
                    />
                  )}{" "}
                  Download CP
                </li>
              )}

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
                        cId,
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
                    <FcApprovall className="text-green-400" /> Final Approve
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
                        cId,
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
                    {viewLoading ? (
                      <Loader />
                    ) : (
                      <MdOutlinePreview
                        className="text-slate-400"
                        disabled={viewLoading}
                      />
                    )}{" "}
                    View
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
                  <VscPreview className="text-green-400" /> Review Decision
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
                    pathname: "/cptransaction",
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
                {editLoading ? (
                  <Loader />
                ) : (
                  <CiEdit className="text-slate-400" disabled={editLoading} />
                )}{" "}
                Edit
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
                    cId,
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
                {viewLoading ? (
                  <Loader />
                ) : (
                  <MdOutlinePreview
                    className="text-slate-400"
                    disabled={viewLoading}
                  />
                )}{" "}
                View
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
    } catch (error) {
      console.log("pop", error)
    }

  };
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

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
    cId,
    filterState
  ) => {
    let paramsData;
    if (filterState?.tId || filterState?.tId === "All") {
      paramsData = {
        c_id: cId,
        t_id: tId,
        t_des: tDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (
      (filterState?.rId || filterState?.rId === "All") &&
      !filterState?.tId
    ) {
      paramsData = {
        c_id: cId,
        r_id: rId,
        r_des: rDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (
      (filterState?.zId || filterState?.zId === "All") &&
      !filterState?.rId
    ) {
      paramsData = {
        c_id: cId,
        z_id: zId,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (filterState?.buId && !filterState?.zId) {
      paramsData = {
        c_id: cId,
        bu_id: buId,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (filterState?.bgId && !filterState?.buId) {
      paramsData = {
        c_id: cId,
        bu_id: buId,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (filterState?.bgId && !filterState?.buId) {
      paramsData = {
        c_id: cId,
        bg_id: bgId,
        bg_des: bgDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    }
    try {
      setDownloadLoading(true);
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/getsapCollectiondata`, {
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
          `CSP_${moment(m_year).format("YYYY-MM")}_${tDes}.xlsx`
        );
      } else if (rDes) {
        XLSX.writeFile(
          wb,
          `CSP_${moment(m_year).format("YYYY-MM")}_${rDes}.xlsx`
        );
      } else if (zDes) {
        XLSX.writeFile(
          wb,
          `CSP_${moment(m_year).format("YYYY-MM")}_${zDes}.xlsx`
        );
      } else if (buDes) {
        XLSX.writeFile(
          wb,
          `CSP_${moment(m_year).format("YYYY-MM")}_${buDes}.xlsx`
        );
      } else if (bgDes) {
        XLSX.writeFile(
          wb,
          `CSP_${moment(m_year).format("YYYY-MM")}_${bgDes}.xlsx`
        );
      }

      setIsOpen(true);
      setModalData({
        message: apires.data.message,
        type: "Download",
        data: {},
      });
      setDownloadLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      setDownloadLoading(false);
    }
  };

  const handleDownloadExcelDepot = async (
    m_year,
    planId,
    tranId,
    yr,
    wId,
    wDes,
    type
  ) => {
    let paramsData;
    if (type === "All") {
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
        download: "all",
        m_year: moment(m_year).format("YYYY-MM"),
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
        w_id: wId,
        d_des: wDes,
        m_year: moment(m_year).format("YYYY-MM"),
        json: true,
      };
    }

    try {
      setDownloadLoading(true);
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/RSP_depot`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(
        wb,
        `CSP_${moment(m_year).format("YYYY-MM")}_${wDes}.xlsx`
      );

      setIsOpen(true);
      setModalData({
        message: apires.data.message,
        type: "Download",
        data: {},
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      setDownloadLoading(false);
    }
  };

  const handleDepotExcelView = async (
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
    if (type === "All") {
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
        download: "all",
        m_year: moment(m_year).format("YYYY-MM"),
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
        w_id: wId,
        d_des: wDes,
        m_year: moment(m_year).format("YYYY-MM"),
        json: true,
      };
    }
    setViewLoading(true);
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/RSP_depot`, {
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
        pathname: "/cptransaction",
        query: {
          planId: planId,
          tranId: tranId,
          yr: yr,
          mYr: m_year,
          depot: depot,
          zrt: zrt,
          status: status,
          stage: stage,

          wId: wId,
          wDes: wDes,
          formType: "View",
          filterState: encodeURIComponent(JSON.stringify(filterState)),
          depotType: type,
        },
      });
      setViewLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      setViewLoading(false);
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
    cId,
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
        c_id: cId,
        t_id: t,
        t_des: tDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (
      (filterState.rId || filterState.rId === "All") &&
      !filterState.tId
    ) {
      paramsData = {
        c_id: cId,
        r_id: r,
        r_des: rDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (filterState.zId && !filterState.rId && !filterState.tId) {
      paramsData = {
        c_id: cId,
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (filterState.buId && !filterState.rId && !filterState.tId) {
      paramsData = {
        c_id: cId,
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else if (filterState.buId && filterState.zId) {
      paramsData = {
        c_id: cId,
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    } else {
      paramsData = {
        c_id: cId,
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
      };
    }

    try {
      setViewLoading(true);
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/getsapCollectiondata`, {
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
        pathname: "/cptransaction",
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
      setViewLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      setViewLoading(false);
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
        m_year: moment(m_year).format("YYYY-MM"),
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
        c_id: c,
        r_id: r,
        r_des: rDes,
        m_year: moment(m_year).format("YYYY-MM"),
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
        c_id: c,
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
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
        c_id: c,
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
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
        c_id: c,
        bu_id: bu,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
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
        c_id: c,
        bu_id: bu,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
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
        c_id: c,
        bu_id: bu,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
        json: true,
      };
    }
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/getsapCollectiondata`, {
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
        pathname: "/cptransaction",
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
      setDownloadLoading(false);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
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
        m_year: moment(m_year).format("YYYY-MM"),
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
        m_year: moment(m_year).format("YYYY-MM"),
        json: true,
      };
    } else {
      paramsData = {};
    }
    try {
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/getsapCollectiondata`, {
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
        pathname: "/cptransaction",
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
      setDownloadLoading(false);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
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
    cId,
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
        t_id: t,
        t_des: tDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    } else if (
      (filterState.rId || filterState.rId === "All") &&
      !filterState.tId
    ) {
      paramsData = {
        r_id: r,
        r_des: rDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    } else if (filterState.zId && !filterState.rId && !filterState.tId) {
      paramsData = {
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    } else if (
      filterState.buId &&
      filterState.zId &&
      !filterState.rId &&
      !filterState.tId
    ) {
      paramsData = {
        z_id: z,
        z_des: zDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    } else if (filterState.buId && !filterState.zId) {
      paramsData = {
        bu_id: bu,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    } else if (filterState.bgId && !filterState.buId) {
      paramsData = {
        bg_id: bg,
        bg_des: bgDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    } else {
      paramsData = {
        bu_id: bu,
        bu_des: buDes,
        m_year: moment(m_year).format("YYYY-MM"),
        c_id: cId,
      };
    }
    try {
      setEditLoading(true);
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/getsapCollectiondata`, {
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
        pathname: "/cptransaction",
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
      setEditLoading(false);
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
      const respond = axios.get(`${url}/api/delete_cp`, {
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
      setDownloadLoading(false);
      const errorMessage = error?.response?.data?.message;
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
    }, [1000]);
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
    if (localStorageItems.roleId === 11) {
      return true;
    } else if (localStorageItems.roleId === 5) {
      return true;
    } else if (localStorageItems.roleId === 4 && !filterState.tId) {
      return true;
    } else if (localStorageItems.roleId === 3 && !filterState.rId) {
      return true;
    } else if (localStorageItems.roleId === 10 && !filterState.zId) {
      return true;
    } else if (localStorageItems.roleId === 6) {
      return true;
    } else {
      return false;
    }
  };

  const handleWhatsappApp = async (mYr, tDes, hod, hodNum, lastsubm_t_date) => {
    let endPoint;
    endPoint = "api/whatsAppChat";
    let data = {
      recipient: "91" + hodNum,
      tem_id: 142351,
      placeholders: [
        tDes,
        hod,
        moment(mYr).format("MMM YYYY"),
        moment(lastsubm_t_date).format("Do"),
      ],
    };
    try {
      const respond = await axios.post(
        `${url}/${endPoint}`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );

      const apires = await respond.data.data;
      console.log("MKL", apires);
    } catch (error) {
      setDownloadLoading(false);
      if (!error) return;
    }
  };
  const [allRejectList, setAllRejectList] = useState([]);
  const getReviewMsgDropDown = async (c) => {
    let endPoint;
    endPoint = "api/get_reason";
    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,
        params: {
          type_of_plan: "cp",
          c_id: c,
        },
      });

      const apires = await respond.data.data;
      setAllRejectList(apires);
    } catch (error) {
      setDownloadLoading(false);
      if (!error) return;
    }
  };

  useEffect(() => {
    if (!rejectModalData.cId) return;
    getReviewMsgDropDown(rejectModalData.cId);
  }, [rejectModalData.cId]);

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

  const getProgressBar = (item) => {
    let percentage = (item.actual / item.target) * 100;
    if (percentage <= 50 || !isFinite(percentage)) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap">
            {item.target}/ {item.actual}
          </span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.target) * 100}%`,
            }}
            className=" bg-red-500 rounded-md flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap  ">
              {(Number(item.actual / item.target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    } else if (percentage > 50 && percentage <= 74) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap">
            {item.target}/ {item.actual}
          </span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.target) * 100}%`,
            }}
            className=" bg-blue-500 rounded-md flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap ">
              {(Number(item.actual / item.target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    } else if (percentage > 74 && percentage <= 90) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap">
            {item.target}/ {item.actual}
          </span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.target) * 100}%`,
            }}
            className=" bg-orange-500 rounded-md flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap ">
              {(Number(item.actual / item.target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    } else if (percentage > 90) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap">
            {item.target}/ {item.actual}
          </span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.target) * 100}%`,
            }}
            className=" bg-green-500 rounded-md  flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap ">
              {(Number(item.actual / item.target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="h-screen  w-full font-arial bg-white">
        <div className="grid justify-items-stretch grid-flow-col px-8 py-2">
          <h2 className="flex font-arial  text-xl  py-2 font-bold  text-teal-400  justify-self-center underline">
            Collection Plan Status
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

            <select
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
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.wId}
              disabled={localStorageItems.roleId !== 11}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  wId: e.target.value,
                })
              }
            >
              <option value={""}>- Depot -</option>
              <option value="All">All Depot</option>
              {depotData.map((item, idx) => (
                <option value={item.w_id} key={idx}>
                  {item.depot_name}
                </option>
              ))}
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
        <div className="bg-white h-screen flex items-start justify-center max-w-full mt-4">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-4 min-h-screen">
            <table className="min-w-full divide-y border- divide-gray-200  ">
              <thead className="">
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider ">
                    Collection Sales Plan
                  </th>

                  <th className="pl-4 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Business Structure (ZRT)
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Collection Sales Target vs Actual Sale
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
                      <div className="flex items-center gap-0">
                        <div className="m-0">
                          {" "}
                          <FcBullish className="h-8 w-8 m-0 p-0" />
                        </div>
                        <div className="ml-1">
                          <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                            C P-({item.tran_id})
                          </p>
                          <p className="text-gray-900 whitespace-no-wrap text-[0.6rem] font-bold">
                            {moment(item.m_year).format("MMM YYYY")} (due date{" "}
                            {moment(item.lastsubm_t_date).format("Do")})
                          </p>
                        </div>
                      </div>
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
                      {getProgressBar(item)}
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
                                  className={`${open ? "block" : "hidden"
                                    } absolute z-40 top-1 right-0 mt-2 w-52 bg-white  text-black border rounded-md shadow-md`}
                                >
                                  {getOptions(
                                    item.upload,
                                    item.plan_id,
                                    item.tran_id,
                                    item.t_year,
                                    item.m_year,
                                    item.depot_name,
                                    [
                                      item.business_segment
                                        ? item.business_segment
                                        : "",
                                      item.business_unit_name
                                        ? item.business_unit_name
                                        : "",
                                      item.zone_name ? item.zone_name : "",
                                      item.region_name ? item.region_name : "",
                                      item.territory_name
                                        ? item.territory_name
                                        : "",
                                    ],
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
                                    item.business_segment,
                                    item.depot_name,

                                    item.lastsubm_t_date,
                                    item.territory_hod_name,
                                    item.territory_mobile_no,
                                    item.c_id
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
                    Collection Plan
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
                    Reject as a Draft
                  </Dialog.Title>
                  <div className="mt-2">
                    <span className="flex w-full justify-center">
                      {" "}
                      Review Message
                    </span>
                    <select
                      className=" w-1/2 max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="stateSelect"
                      value={rejectModalData.data}
                      onChange={(e) =>
                        setRejectModalData({
                          ...rejectModalData,
                          data: e.target.value,
                        })
                      }
                    >
                      <option value="" className="font-bold" disabled={true}>
                        -- Select --
                      </option>
                      {allRejectList.map((item, idx) => (
                        <option value={item.reason_name} key={idx}>
                          {item.reason_name}
                        </option>
                      ))}
                    </select>
                    {/* <textarea
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
                    /> */}
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
                    {modalData.type === "Download" ||
                      modalData.type === "Upload"
                      ? "Collection Plan"
                      : "Delete Collection Plan"}
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
                    {modalData.type === "Upload" && (
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

export default CollectionPlans;
