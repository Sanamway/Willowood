import React, { useState, useEffect } from "react";
import { url } from "@/constants/url";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCollectionTableData } from "@/utils/collectionSlice";
import toast from "react-hot-toast";
import { setRollingTableData } from "@/utils/rollingSlice";
import { setDelaerCountData } from "@/utils/dealerCountSlice";
import { setRSPAnalyticalData } from "@/utils/rspAnalyticalSlice";
import { setSingleRollingTableData } from "@/utils/singleRollingSlice";

const FilterComponent = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const dispatch = useDispatch(); // Access the dispatch function

  const [localStorageItems, setLocalStorageItems] = useState({
    uId: "",
    cId: "",
    bgId: "",
    buId: "",
    rId: "",
    zId: "",
    tId: "",
    roleId: "",
    empCode: "",
    tDes: ""
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
    month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    partyName: ""
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
    } catch (error) { }
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
    } catch (error) { }
  };

  useEffect(() => {
    if (!filterState.yr) return;
    getAllTransactionYear(filterState.yr);
  }, [filterState.yr]);
  console.log("zz", filterState.month, allMonthData)

  useEffect(() => {

    const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

    switch (roleId) {
      case 6:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,
          tDes: JSON.parse(window.localStorage.getItem("userinfo"))?.territory_name,
          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          yr: Math.max(...allYearData),
          month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        });
        break;
      case 5:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,

          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,

          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          yr: Math.max(...allYearData),
          month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        });
        break;
      case 4:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,
          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          yr: Math.max(...allYearData),
          month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        });
        break;
      case 3:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,
          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          yr: Math.max(...allYearData),
          month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        });
        break;
      case 10:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,
          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: null,
          rId: null,
          zId: null,
          tId: null,
          yr: Math.max(...allYearData),
          month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        });
        break;
      default:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo"))?.role_id,
          clName: window.localStorage.getItem("user_name"),
          ulName: window.localStorage.getItem("phone_number"),
          empCode: window.localStorage.getItem("emp_code"),
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
          reportingManager: JSON.parse(window.localStorage.getItem("userinfo")).rp_manager,
          developmentManager: JSON.parse(window.localStorage.getItem("userinfo")).functional_mgr,
          hrManager: JSON.parse(window.localStorage.getItem("userinfo")).hr_name,
          reportingHQ: JSON.parse(window.localStorage.getItem("userinfo")).reporting_hq
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
          yr: Math.max(...allYearData),
          month: moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
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
            JSON.parse(window.localStorage.getItem("userinfo"))?.c_id
        )
      );
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
    } catch (error) { }
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
    } catch (error) { }
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
    } catch (error) { }
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









  const handleDownloadExcelNew = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId,
  ) => {
    let paramsData;
    if (tId) {
      // Call for territory data
      paramsData = {
        c_id: 1,
        t_id: tId,
        t_des: territoryData.find(item => Number(item.t_id) === Number(tId))?.territory_name || '',
        m_year: moment(month).format("YYYY-MM"),
      };
    }

    else if (!rId && zId) {
      // Call for zone data
      paramsData = {
        c_id: 1,
        z_id: zId,
        z_des: zoneData.filter((item) => Number(item.z_id) === Number(zId))[0]?.zone_name,
        m_year: moment(month).format("YYYY-MM"),
      };
    }

    else if (!tId && rId) {
      console.log('r is calling')
      paramsData = {
        c_id: 1,
        r_id: rId,
        r_des: regionData.find(item => Number(item.r_id) === Number(rId))?.region_name || '',
        m_year: moment(month).format("YYYY-MM"),
      };
    }

    else if (!zId && buId) {
      // Call for business unit data
      paramsData = {
        c_id: 1,
        bu_id: buId,
        bu_des: buData.filter((item) => item.bu_id === buId)[0]?.business_unit_name,
        m_year: moment(month).format("YYYY-MM"),
      };
    }
    else {
      return
    }
    try {

      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/api/getsapCollectiondata`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;

      dispatch(setCollectionTableData(apires.data.data)); // Dispatch the action with data
    } catch (error) {
      console.log("zxc", error)
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);

    }
  };
  useEffect(() => {
    const { yr, month, bgId, buId, zId, rId, tId } = filterState;

    // Call the API based on the conditions
    if (tId && territoryData.length > 0) {
      // Call for territory data
      dispatch(setCollectionTableData([]));
      handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
      return;
      // Exit after handling this condition
    }

    else if (zId && zoneData.length > 0) {
      // Call for zone data
      dispatch(setCollectionTableData([]));
      handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
      return; // Exit after handling this condition
    }

    else if (rId && regionData.length > 0) {
      // Call for region data
      dispatch(setCollectionTableData([]));
      handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
      return; // Exit after handling this condition
    }

    else if (buId && buData.length > 0) {
      // Call for business unit data
      dispatch(setCollectionTableData([]));
      handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
      return; // Exit after handling this condition
    }
    else {
      return
    }
  }, [
    filterState.yr,
    filterState.month,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
    territoryData,
    zoneData,
    regionData,
    buData
  ]);


  const bsLabelData = ["Apr-24",
    "May-24",
    "Jun-24",
    "Jul-24",
    "Aug-24",
    "Sep-24",
    "Oct-24",
    "Nov-24",
    "Dec-24",
    "Jan-25",
    "Feb-25",
    "Mar-25"];

  const [bsGraphData, setBsGraphData] = useState([
    {
      label: "Budget",
      backgroundColor: "rgba(34, 197, 94, 1)",  // Full opacity (green-400)
      backgroundColor: "rgba(34, 197, 94, 0.6)", // 60% opacity
      data: 0,
    },
    {
      label: "RSP Budget",
      backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
      backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
      data: 0,
    },
    {
      label: "Total Sales",
      backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
      borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
      data: 0,
    }

  ])

  // const [allTableData, setAllTableData] = useState([]);


  const getDealerCount = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId,

  ) => {
    let endPoint;

    if (bgId && buId && zId && rId && tId) {
      endPoint = "api/get_dealer_count";
    } else if (bgId && buId && zId && rId && !tId) {
      endPoint = "api/get_dealer_count";
    } else if (bgId && buId && zId && !rId && !tId) {
      endPoint = "api/get_dealer_count";
    } else if (bgId && buId && !zId && !rId && !tId) {
      endPoint = "api/get_dealer_count";
    } else if (bgId && !buId && !zId && !rId && !tId) {
      endPoint = "api/get_dealer_count";
    } else {
      return;
    }

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          c_id: 1,
          bg_id: bgId === "All" || !bgId ? null : bgId,
          bu_id: buId === "All" || !buId ? null : buId,
          z_id: zId === "All" || !zId ? null : zId,
          r_id: rId === "All" || !rId ? null : rId,
          t_id: tId === "All" || !tId ? null : tId,

        },
      });

      const apires = await respond.data.data;

      // setAllTableData(apires);
      dispatch(setDelaerCountData(apires));

    } catch (error) {
      if (!error) return;
      // setAllTableData([]);
    }
  };
  const getAllSalesPlanStatus = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId,

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

      // setAllTableData(apires);
      dispatch(setRollingTableData(apires));

    } catch (error) {
      if (!error) return;
      // setAllTableData([]);
    }
  };


  // const getRSPAnalatycal = async (
  //   yr,
  //   month,
  //   bgId,
  //   buId,
  //   zId,
  //   rId,
  //   tId,

  // ) => {
  //   let endPoint = "api/SA_Analytical_Dashboard";;

  //   console.log("lmjk", buData.filter((item) => item.bu_id === buId)[0]?.business_unit_name)

  //   try {
  //     const respond = await axios.get(`${url}/${endPoint}`, {
  //       headers: headers,

  //       params: {
  //         year: yr || null,
  //         m_year:
  //           month === "All" || !month ? null : moment(month).format("YYYY-MM"),
  //         bg_id: bgId === "All" || !bgId ? null : bgId,
  //         bg_des: bgId === "All" || !bgId ? null : bgData.filter((item) => item.bg_id === bgId)[0]?.business_segment,

  //         bu_id: buId === "All" || !buId ? null : buId,
  //         bu_des: buId === "All" || !buId ? null : buData.filter((item) => item.bu_id === buId)[0]?.business_unit_name,

  //         z_id: zId === "All" || !zId ? null : zId,
  //         z_des: zId === "All" || !zId ? null : zoneData.filter((item) => item.z_id === zId)[0]?.zone_name,


  //         r_id: rId === "All" || !rId ? null : rId,
  //         r_des: rId === "All" || !rId ? null : regionData.filter((item) => item.r_id === rId)[0]?.region_name,

  //         t_id: tId === "All" || !tId ? null : tId,
  //         t_des: tId === "All" || !tId ? null : territoryData.filter((item) => item.t_id === tId)[0]?.territory_name,


  //       },
  //     });

  //     const apires = await respond.data.data;

  //     // setAllTableData(apires);
  //     dispatch(setRSPAnalyticalData(apires));

  //   } catch (error) {
  //     if (!error) return;
  //     // setAllTableData([]);
  //   }
  // };
  const getSapSales = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId,

  ) => {
    let endPoint = "api/SA_sales_data_dashboard";;



    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          year: yr || null,
          c_id: 1,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          bg_id: bgId === "All" || !bgId ? null : bgId,
          bg_des: bgId === "All" || !bgId ? null : bgData.filter((item) => item.bg_id === bgId)[0]?.business_segment,

          bu_id: buId === "All" || !buId ? null : buId,
          bu_des: buId === "All" || !buId ? null : buData.filter((item) => item.bu_id === buId)[0]?.business_unit_name,

          z_id: zId === "All" || !zId ? null : zId,
          z_des: zId === "All" || !zId ? null : zoneData.filter((item) => item.z_id === zId)[0]?.zone_name,


          r_id: rId === "All" || !rId ? null : rId,
          r_des: rId === "All" || !rId ? null : regionData.filter((item) => item.r_id === rId)[0]?.region_name,

          t_id: tId === "All" || !tId ? null : tId,
          t_des: tId === "All" || !tId ? null : territoryData.filter((item) => item.t_id === tId)[0]?.territory_name,

        },
      });

      const apires = await respond.data.data;
      console.log("iop", apires)

      // setAllTableData(apires);
      dispatch(setRSPAnalyticalData(apires));

    } catch (error) {
      if (!error) return;
      console.log("opo", error)
    }
  };

  useEffect(() => {


    // getRSPAnalatycal(
    //   filterState.yr || null,
    //   filterState.month || null,
    //   filterState.bgId || null,
    //   filterState.buId || null,
    //   filterState.zId || null,
    //   filterState.rId || null,
    //   filterState.tId
    // );

    getSapSales(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId
    );
    getAllSalesPlanStatus(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId
    );

    getDealerCount(
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


  const getOneTimeSalesPlan = async (
    yr,
    month,
    bgId,
    buId,
    zId,
    rId,
    tId,

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
          // m_year:
          //   month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          bg_id: bgId === "All" || !bgId ? null : bgId,
          bu_id: buId === "All" || !buId ? null : buId,
          z_id: zId === "All" || !zId ? null : zId,
          r_id: rId === "All" || !rId ? null : rId,
          t_id: tId === "All" || !tId ? null : tId,

        },
      });

      const apires = await respond.data.data;

      // setAllTableData(apires);
      dispatch(setSingleRollingTableData(apires));

    } catch (error) {
      if (!error) return;
      // setAllTableData([]);
    }
  };

  useEffect(() => {




    getOneTimeSalesPlan(
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
  // useEffect(() => {
  //   if (!allTableData.length) return
  //   setBsGraphData(
  //     [
  //       {
  //         label: "Budget",
  //         backgroundColor: "rgba(34, 197, 94, 1)",  // Full opacity (green-400)
  //         backgroundColor: "rgba(34, 197, 94, 0.6)", // 60% opacity
  //         data: allTableData.map((item) => item.budget),
  //       },
  //       {
  //         label: "RSP Budget",
  //         backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
  //         backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
  //         data: allTableData.map((item) => item.target),
  //       },
  //       {
  //         label: "Total Sales",
  //         backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
  //         borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
  //         data: allTableData.map((item) => item.actual),
  //       }





  //     ]
  //   )
  // }, [
  //   allTableData
  // ])


  return (

    <div className="flex gap-2 flex-wrap w-full flex-row justify-around">
      <div className="w-[46%] flex flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Year</label>
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
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
            </option>))}

        </select>
      </div>
      <div className="w-[46%] flex  flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Month</label>
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
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
              {moment(item).format('MMM YYYY')}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[46%] flex flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Segment</label>
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.bgId}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              bgId: e.target.value,
              buId: '',
              zId: '',
              rId: '',
              tId: '',
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
      </div>
      <div className="w-[46%] flex flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Business Unit</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.buId}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              buId: e.target.value,

              zId: '',
              rId: '',
              tId: '',
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

          {buData.map((item, idx) => (
            <option value={item.bu_id} key={idx}>
              {item.business_unit_name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[46%] flex flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Zone</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.zId}
          onChange={(e) =>
            setFilterState({
              ...filterState,
              zId: e.target.value,
              rId: '',
              tId: '',
            })
          }
          disabled={
            localStorageItems.roleId === 6 ||
            localStorageItems.roleId === 5 ||
            localStorageItems.roleId === 4
          }

        >
          <option value={""}>- Zone -</option>

          {zoneData.map((item, idx) => (
            <option value={item.z_id} key={idx}>
              {item.zone_name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[46%] flex flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Region</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.rId}
          disabled={
            localStorageItems.roleId === 6 || localStorageItems.roleId === 5
          }
          onChange={(e) =>
            setFilterState({
              ...filterState,
              rId: e.target.value,
              tId: '',
            })
          }
        >
          <option value={""}>- Region -</option>
          {regionData.map((item, idx) => (
            <option value={item.r_id} key={idx}>
              {item.region_name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[46%] flex flex-col gap-1.5 ">
        <label className="text-gray-500 font-bold text-[0.85rem]">Teritory</label>
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"
          value={filterState.tId}
          disabled={
            localStorageItems.roleId === 11 || localStorageItems.roleId === 6
          }
          onChange={(e) =>
            setFilterState({
              ...filterState,
              tId: e.target.value,
            })
          }
        >
          <option value={""}>- Territory -</option>
          {territoryData.map((item, idx) => (
            <option value={item.t_id} key={idx}>
              {item.territory_name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[46%] flex flex-col gap-1.5 ">

      </div>
    </div>

  );
};

export default FilterComponent;
