import React, { useState, useEffect, useRef } from "react";

import AllCharts from "./AllCharts";
import { useRouter } from "next/router";

import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import * as XLSX from "xlsx";
import CollectionChartPopup from "./CollectionChartPopup";
import SaleChartPopup from "./SaleChartPopup";

const MainReport = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [tabType, setTabType] = useState("Table");
  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
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
    yr: moment().year(),
    month: [],
  });

  // All Year Month Data
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
    } catch (error) { }
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

      setAllMonthData([...new Set(apires.map((item) => item.m_year))]);
    } catch (error) { }
  };

  useEffect(() => {
    if (!filterState.yr) return;
    getAllTransactionYear(filterState.yr);
  }, [filterState.yr]);

  useEffect(() => {
    if (!allYearData.length) return;
    // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All",
      yr: "",
      month: "",
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
          yr: Math.max(...allYearData),
          month: allMonthData[allMonthData.length - 1],
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
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
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
          yr: Math.max(...allYearData),
          month: allMonthData[allMonthData.length - 1],
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
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
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
          yr: Math.max(...allYearData),
          month: allMonthData[allMonthData.length - 1],
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
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
              "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
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
          yr: Math.max(...allYearData),
          month: allMonthData[allMonthData.length - 1],
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
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
              "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
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
          yr: Math.max(...allYearData),
          month: allMonthData[allMonthData.length - 1],
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
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
              "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
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
          month: allMonthData[allMonthData.length - 1],
        });
        break;
    }
  }, [allYearData, allMonthData]);

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

  const [allZoneData, setAllZoneData] = useState([]);
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

  const [allRegionData, setAllRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllRegionData(apires);
      setAllRegionData(
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

  const [allTerritoryData, setAllTerritoryData] = useState([]);

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

      setAllTerritoryData(
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

  const [busniessSegmentData, setBusinessSegmentData] = useState([]);
  const getAllBusinessSegmentData = async (filterState) => {
    const { yr, month, bgId } = filterState;

    if (!yr || !month || !bgId) return;
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_bg";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          bg_id: bgId === "All" || !bgId ? null : bgId,
        },
      });

      const apires = await respond.data.data;
      setBusinessSegmentData(apires);
    } catch (error) {
      if (!error) return;
      setBusinessSegmentData([]);
    }
  };

  const [businessUnitData, setBusinessUnitData] = useState([]);
  const getAllBusinessUnitData = async (filterState) => {
    const { yr, month, bgId, buId } = filterState;
    if (!yr || !month || !bgId || !buId) return;
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_bu";

    let params = {
      t_year: yr || null,
      m_year:
        month === "All" || !month ? null : moment(month).format("YYYY-MM"),
      bu_id: buId === "All" || !buId ? null : buId,
      bg_id: bgId === "All" || !bgId ? null : bgId,
    };

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          bu_id: buId === "All" || !buId ? null : buId,
          bg_id: bgId === "All" || !bgId ? null : bgId,
        },
      });

      const apires = await respond.data.data;

      setBusinessUnitData(apires);
    } catch (error) {
      if (!error) return;
      setBusinessUnitData([]);
    }
  };

  const [zoneData, setZoneData] = useState([]);
  const getAllZonetData = async (filterState) => {
    const { yr, month, bgId, buId, zId } = filterState;
    if (!yr || !month || !bgId || !buId) return;
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_z";
    let params = {
      t_year: yr || null,
      m_year:
        month === "All" || !month ? null : moment(month).format("YYYY-MM"),
    };
    if (zId && zId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        z_id: zId,
      };
    } else if (zId === "All" && buId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        bu_id: buId,
      };
    }

    try {
      setZoneData([]);
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: params,
      });

      const apires = await respond.data.data;

      setZoneData(apires);
    } catch (error) {
      if (!error) return;
      setZoneData([]);
    }
  };

  const [regionData, setRegionData] = useState([]);
  const getRegionData = async (filterState) => {
    const { yr, month, bgId, buId, zId, rId } = filterState;
    if (!yr || !month || !bgId || !buId || !zId) return;
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_r";
    let params = {
      t_year: yr || null,
      m_year:
        month === "All" || !month ? null : moment(month).format("YYYY-MM"),
    };
    if (rId && rId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        r_id: rId,
      };
    } else if (rId === "All" && zId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        z_id: zId,
      };
    } else if (zId && zId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        z_id: zId,
      };
    } else if (zId === "All" && buId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        bu_id: buId,
      };
    }

    try {
      setRegionData([]);
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: params,
      });

      const apires = await respond.data.data;

      setRegionData(apires);
    } catch (error) {
      if (!error) return;
      setRegionData([]);
    }
  };

  const [territoryData, setTerritoryData] = useState([]);

  const getTerritoryData = async (filterState) => {
    const { yr, month, bgId, buId, zId, rId, tId } = filterState;
    if (!yr || !month || !bgId || !buId || !zId) return;
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_t";
    let params = {
      t_year: yr || null,
      m_year:
        month === "All" || !month ? null : moment(month).format("YYYY-MM"),
    };

    if (tId && tId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        t_id: tId,
      };
    } else if (tId === "All" && rId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        r_id: rId,
      };
    } else if (rId && rId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        r_id: rId,
      };
    } else if (rId === "All" && zId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        z_id: zId,
      };
    } else if (zId && zId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        z_id: zId,
      };
    } else if (zId === "All" && buId !== "All") {
      params = {
        t_year: yr || null,
        m_year:
          month === "All" || !month ? null : moment(month).format("YYYY-MM"),
        bu_id: buId,
      };
    }
    try {
      setTerritoryData([]);
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: params,
      });

      const apires = await respond.data.data;

      setTerritoryData(apires);
    } catch (error) {
      if (!error) return;
      setTerritoryData([]);
    }
  };

  const [tableLoading, setTableLoading] = useState(false);
  const [segmentData, setSegmentData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const getSegmentData = async (filterState) => {
    const { bgId, buId, zId, rId, tId, month, yr } = filterState;
    let paramsData = {
      year_1: yr - 2,
      year_2: yr - 1,
      year_3: yr,
      year_2_nm: moment(month)
        .subtract(1, "years")
        .add(1, "months")
        .format("YYYY-MM"),
      year_2_cm: moment(month).subtract(1, "years").format("YYYY-MM"),
      year_3_cm: moment(month).format("YYYY-MM"),
      year_3_nm: moment(month).add(1, "months").format("YYYY-MM"),
      t_des: "Moga",
      t_id: filterState.tId,
      plan_id: 1,
      tran_id: "RP-122023",
      m_year: moment(month).format("YYYY-MM"),
      json: true,
      analytical_key: "Product Segment",
    };
    if (bgId && buId && zId && rId && tId && tId !== "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(month)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(month).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(month).format("YYYY-MM"),
        year_3_nm: moment(month).add(1, "months").format("YYYY-MM"),
        t_des: allTerritoryData.filter(
          (item) => Number(item.t_id) === Number(filterState.tId)
        )[0]?.territory_name,
        t_id: filterState.tId,

        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else if (bgId && buId && zId && rId && rId !== "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(month)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(month).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(month).format("YYYY-MM"),
        year_3_nm: moment(month).add(1, "months").format("YYYY-MM"),
        r_des: allRegionData.filter(
          (item) => Number(item.r_id) === Number(filterState.rId)
        )[0]?.region_name,
        r_id: filterState.rId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else if (bgId && buId && zId && zId !== "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(month)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(month).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(month).format("YYYY-MM"),
        year_3_nm: moment(month).add(1, "months").format("YYYY-MM"),
        z_des: allZoneData.filter(
          (item) => Number(item.z_id) === Number(filterState.zId)
        )[0]?.zone_name,
        z_id: filterState.zId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else if (bgId && buId && buId !== "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(month)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(month).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(month).format("YYYY-MM"),
        year_3_nm: moment(month).add(1, "months").format("YYYY-MM"),
        bu_des: buData.filter(
          (item) => Number(item.bu_id) === Number(filterState.buId)
        )[0]?.business_unit_name,
        bu_id: filterState.buId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else if (bgId && bgId !== "All") {
      paramsData = {
        year_1: yr - 2,
        year_2: yr - 1,
        year_3: yr,
        year_2_nm: moment(month)
          .subtract(1, "years")
          .add(1, "months")
          .format("YYYY-MM"),
        year_2_cm: moment(month).subtract(1, "years").format("YYYY-MM"),
        year_3_cm: moment(month).format("YYYY-MM"),
        year_3_nm: moment(month).add(1, "months").format("YYYY-MM"),
        bg_des: bgData.filter(
          (item) => Number(item.bg_id) === Number(filterState.bgId)
        )[0]?.business_segment,
        bg_id: filterState.bgId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else {
      return;
    }
    let endPoint = "api/RSP_downloadAnalytical";
    try {
      setSegmentData([]);
      setBrandData([]);
      setCategoryData([]);
      setTableLoading(true);
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond.data.data;
      setSegmentData(apires.data_to_exports_excel_seg);
      setCategoryData(apires.data_to_exports_excel_cat);
      setBrandData(apires.data_to_exports_excel_brand);
      setTableLoading(false);
    } catch (error) {
      console.log("pop", error);
      if (!error) return;

      setTableLoading(false);
    }
  };

  const [downloadExcelLoading, setDownloadExcelLoading] = useState(false);
  const handleDownloadExcelNew = async (m_year, planId, tranId, yr) => {
    if (downloadExcelLoading) return;
    setDownloadExcelLoading(true);
    let paramsData;
    let endPoint = "api/rsp_download";
    if (JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 6) {
      endPoint = "api/rsp_download";
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
        t_id: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
        t_des: JSON.parse(window.localStorage.getItem("userinfo"))
          ?.territory_name,
        m_year: m_year,
        json: true,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 5
    ) {
      endPoint = "api/rsp_download_all_region";
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
        r_id: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
        r_des: JSON.parse(window.localStorage.getItem("userinfo"))?.region_name,
        m_year: m_year,
        json: true,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 4
    ) {
      endPoint = "api/rsp_download_all";
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
        z_id: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
        z_des: JSON.parse(window.localStorage.getItem("userinfo"))?.zone_name,
        m_year: m_year,
        json: true,
      };
    } else if (
      JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 3
    ) {
      endPoint = "api/rsp_download_all";
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
        bu_id: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
        bu_des: JSON.parse(window.localStorage.getItem("userinfo"))
          ?.business_unit_name,
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
        bu_id: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
        bu_des: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_name,
        m_year: m_year,
        json: true,
      };
    }

    try {
      setDownloadExcelLoading(true);
      localStorage.setItem("RSP", JSON.stringify([]));
      const respond = axios.get(`${url}/${endPoint}`, {
        headers: headers,
        params: paramsData,
      });
      const apires = await respond;
      const ws = XLSX.utils.json_to_sheet(apires.data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      if (JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 6) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${JSON.parse(window.localStorage.getItem("userinfo"))?.territory_name
          }.xlsx`
        );
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 5
      ) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${JSON.parse(window.localStorage.getItem("userinfo"))?.region_name
          }.xlsx`
        );
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 4
      ) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${JSON.parse(window.localStorage.getItem("userinfo"))?.zone_name
          }.xlsx`
        );
      } else if (
        JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 3
      ) {
        XLSX.writeFile(
          wb,
          `RSP_${moment(m_year).format("YYYY-MM")}_${JSON.parse(window.localStorage.getItem("userinfo"))?.bu_name
          }.xlsx`
        );
      } else {
        return;
      }

      setDownloadExcelLoading(false);
    } catch (error) {
      console.log("mlo", error);
      setDownloadExcelLoading(false);
    }
  };
  const [downloadExcelData, setDownloadExcelData] = useState({
    yr: null,
    mYr: null,
    tranId: null,
    planId: null,
  });

  const [brandData, setBrandData] = useState([]);

  const [summaryData, setSummaryData] = useState({
    actual: 0,
    budget: 0,
    target: 0,

    actualH1: 0,
    budgetH1: 0,
    targetH1: 0,

    actualH2: 0,
    budgetH2: 0,
    targetH2: 0,

    actualCurrent: 0,
    budgetCurrent: 0,
    targetCurrent: 0,
  });

  const getAllSalesPlanStatus = async (filterState) => {
    let endPoint;
    const { bgId, buId, zId, rId, tId, month, yr } = filterState;
    console.log("lop", filterState);


    const isAllOrEmpty = (value) => !value || value === "All";

    if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && !isAllOrEmpty(zId) && !isAllOrEmpty(rId) && !isAllOrEmpty(tId)) {
      endPoint = "api/get_rollingdata_based_on_roll_t";
    } else if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && !isAllOrEmpty(zId) && !isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_rollingdata_based_on_roll_r";
    } else if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && !isAllOrEmpty(zId) && isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_rollingdata_based_on_roll_z";
    } else if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && isAllOrEmpty(zId) && isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_rollingdata_based_on_roll_bu";
    } else if (!isAllOrEmpty(bgId) && isAllOrEmpty(buId) && isAllOrEmpty(zId) && isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_rollingdata_based_on_roll_bg";
    } else {
      return;
    }

    try {
      setSummaryData({
        actual: 0,
        budget: 0,
        target: 0,
        actualH1: 0,
        budgetH1: 0,
        targetH1: 0,
        actualH2: 0,
        budgetH2: 0,
        targetH2: 0,
        actualCurrent: 0,
        budgetCurrent: 0,
        targetCurrent: 0,
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

      let actualValue = 0;
      let budgetValue = 0;
      let targetValue = 0;
      let actualValueH1 = 0;
      let budgetValueH1 = 0;
      let targetValueH1 = 0;
      let actualValueH2 = 0;
      let budgetValueH2 = 0;
      let targetValueH2 = 0;
      let actualValueCurrent = 0;
      let budgetValueCurrent = 0;
      let targetValueCurrent = 0;
      setDownloadExcelData({
        planId: apires[0].plan_id,
        mYr: apires[0].m_year,
        tranId: apires[0].tran_id,
        yr: apires[0].t_year,
      });
      apires.forEach((element) => {
        actualValue = Number(actualValue) + Number(element.actual);
        budgetValue = Number(budgetValue) + Number(element.budget);
        targetValue = Number(targetValue) + Number(element.target);
        if (Number(moment(element.m_year).format("M")) === 4) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 5) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 6) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 7) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 8) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 9) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 10) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 11) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 12) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 1) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 2) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 3) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
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
        }

        setSummaryData({
          actual: actualValue,
          budget: budgetValue,
          target: targetValue,
          actualH1: actualValueH1,
          budgetH1: budgetValueH1,
          targetH1: targetValueH1,
          actualH2: actualValueH2,
          budgetH2: budgetValueH2,
          targetH2: targetValueH2,
          actualCurrent: actualValueCurrent,
          budgetCurrent: budgetValueCurrent,
          targetCurrent: targetValueCurrent,
        });
      });
    } catch (error) {
      if (!error) return;
    }
  };

  const [collectionSummaryData, setCollectionSummaryData] = useState({
    actual: 0,
    budget: 0,
    target: 0,

    actualH1: 0,
    budgetH1: 0,
    targetH1: 0,

    actualH2: 0,
    budgetH2: 0,
    targetH2: 0,

    actualCurrent: 0,
    budgetCurrent: 0,
    targetCurrent: 0,
  });

  const getAllCollectionSalesPlanStatus = async (filterState) => {
    let endPoint;
    const { bgId, buId, zId, rId, tId, month, yr } = filterState;
    const isAllOrEmpty = (value) => !value || value === "All";

    if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && !isAllOrEmpty(zId) && !isAllOrEmpty(rId) && !isAllOrEmpty(tId)) {
      endPoint = "api/get_collectiondata_based_on_roll_t";
    } else if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && !isAllOrEmpty(zId) && !isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_collectiondata_based_on_roll_r";
    } else if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && !isAllOrEmpty(zId) && isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_collectiondata_based_on_roll_z";
    } else if (!isAllOrEmpty(bgId) && !isAllOrEmpty(buId) && isAllOrEmpty(zId) && isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_collectiondata_based_on_roll_bu";
    } else if (!isAllOrEmpty(bgId) && isAllOrEmpty(buId) && isAllOrEmpty(zId) && isAllOrEmpty(rId) && isAllOrEmpty(tId)) {
      endPoint = "api/get_collectiondata_based_on_roll_bg";
    } else {
      return;
    }
    console.log("zop", filterState, endPoint)
    try {
      setCollectionSummaryData({
        actual: 0,
        budget: 0,
        target: 0,
        actualH1: 0,
        budgetH1: 0,
        targetH1: 0,
        actualH2: 0,
        budgetH2: 0,
        targetH2: 0,
        actualCurrent: 0,
        budgetCurrent: 0,
        targetCurrent: 0,
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

      let actualValue = 0;
      let budgetValue = 0;
      let targetValue = 0;
      let actualValueH1 = 0;
      let budgetValueH1 = 0;
      let targetValueH1 = 0;
      let actualValueH2 = 0;
      let budgetValueH2 = 0;
      let targetValueH2 = 0;
      let actualValueCurrent = 0;
      let budgetValueCurrent = 0;
      let targetValueCurrent = 0;
      apires.forEach((element) => {
        actualValue = Number(actualValue) + Number(element.actual);
        budgetValue = Number(budgetValue) + Number(element.budget);
        targetValue = Number(targetValue) + Number(element.target);
        if (Number(moment(element.m_year).format("M")) === 4) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 5) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 6) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 7) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 8) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 9) {
          actualValueH1 = Number(actualValueH1) + Number(element.actual);
          budgetValueH1 = Number(budgetValueH1) + Number(element.budget);
          targetValueH1 = Number(targetValueH1) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 10) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 11) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 12) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 1) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 2) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
        } else if (Number(moment(element.m_year).format("M")) === 3) {
          actualValueH2 = Number(actualValueH2) + Number(element.actual);
          budgetValueH2 = Number(budgetValueH2) + Number(element.budget);
          targetValueH2 = Number(targetValueH2) + Number(element.target);
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
        }
        setCollectionSummaryData({
          actual: actualValue,
          budget: budgetValue,
          target: targetValue,
          actualH1: actualValueH1,
          budgetH1: budgetValueH1,
          targetH1: targetValueH1,
          actualH2: actualValueH2,
          budgetH2: budgetValueH2,
          targetH2: targetValueH2,
          actualCurrent: actualValueCurrent,
          budgetCurrent: budgetValueCurrent,
          targetCurrent: targetValueCurrent,
        });
      });
    } catch (error) {
      if (!error) return;
      console.log("collection", error);
    }
  };

  const [showSalesModal, setShowSalesModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  return (
    <section className="outer  w-full px-2  bg-black/5   min-h-screen">
      <div className="flex flex-col gap-2 py-4 lg:flex-row py-4">
        <div className="flex flex-row gap-4 ">
          <select
            className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500 "
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
              Select
            </option>
            {allMonthData.map((item, idx) => {
              return (
                <option value={item} key={idx}>
                  {moment(item).format("MMM YYYY")}
                </option>
              );
            })}
          </select>
          <select
            className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={filterState.bgId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                  buId: "",
                  zId: "",
                  rId: "",
                  tId: "",
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3 ||
              localStorageItems.roleId === 10
            }
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

        <div className="flex flex-row gap-4">
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={filterState.buId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,

                  zId: "",
                  rId: "",
                  tId: "",
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3
            }
          >
            <option value={"All"}>- All Business Unit -</option>

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
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  rId: "",
                  tId: "",
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4
            }
          >
            <option value={"All"}>- All Zone -</option>

            {allZoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
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
            <option value="All">- All Territory -</option>

            {allTerritoryData.map((item, idx) => (
              <option value={item.t_id} key={idx}>
                {item.territory_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="bg-blue-500 px-4 py-1 text-white cursor-pointer"
        onClick={() => {
          getAllCollectionSalesPlanStatus(filterState);
          getAllSalesPlanStatus(filterState);
          getSegmentData(filterState);

          getAllBusinessSegmentData(filterState);

          getAllBusinessUnitData(filterState);

          getAllZonetData(filterState);

          getRegionData(filterState);

          getTerritoryData(filterState);
        }}
      >
        View Data
      </button>
      <div className="hey">
        <AllCharts
          cSummaryData={collectionSummaryData}
          summaryData={summaryData}
          businessSegmentData={busniessSegmentData}
          businessUnitData={businessUnitData}
          zoneData={zoneData}
          regionData={regionData}
          territoryData={territoryData}
          productSegmentData={segmentData}
          productCategoryData={categoryData}
          productBrandData={brandData}
          loading={tableLoading}
          tabType={tabType}
          setTabType={setTabType}
          downloadExcelLoading={downloadExcelLoading}
          setShowSalesModal={setShowSalesModal}
          setShowCollectionModal={setShowCollectionModal}
          handleDownloadExcelNew={() =>
            handleDownloadExcelNew(
              downloadExcelData.mYr,
              downloadExcelData.planId,
              downloadExcelData.tranId,
              downloadExcelData.yr
            )
          }
          filterState={filterState}
        />
      </div>
      {console.log("njkl", filterState)}
      {showSalesModal && (
        <SaleChartPopup
          handleClose={() => setShowSalesModal(false)}
          backgorundFilters={filterState}
          bgData={bgData}
          buData={buData}
          zoneData={allZoneData}
          regionData={allRegionData}
          tData={allTerritoryData}
        />
      )}
      {showCollectionModal && (
        <CollectionChartPopup
          handleClose={() => setShowCollectionModal(false)}
          backgorundFilters={filterState}
          bgData={bgData}
          buData={buData}
          zoneData={allZoneData}
          regionData={allRegionData}
          tData={allTerritoryData}
        />
      )}
    </section>
  );
};

export default MainReport;
