import React, { useState, useEffect, useRef } from "react";
import Table from "./Table";
import AllCharts from "./AllCharts";
import { useRouter } from "next/router";
import { MdBarChart } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import { businessSegment } from "./sample";

const MainReport = () => {
  const router = useRouter();
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

    tId: null,
    tDes: null,
    rDes: null,
    zDes: null,
    buDes: null,
    bgDes: null,
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

      setAllMonthData([...new Set(apires.map((item) => item.m_year))]);
    } catch (error) {}
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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
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
    } catch (error) {}
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
    } catch (error) {}
  };
  console.log("lmjk", allTerritoryData);
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

  // const [allTableData, setAllTableData] = useState([]);
  // const getAllSalesPlanStatus = async (
  //   yr,
  //   month,
  //   bgId,
  //   buId,
  //   zId,
  //   rId,
  //   tId
  // ) => {
  //   let endPoint;

  //   if (bgId && buId && zId && rId && tId) {
  //     endPoint = "api/get_rollingdata_based_on_roll_t";
  //   } else if (bgId && buId && zId && rId && !tId) {
  //     endPoint = "api/get_rollingdata_based_on_roll_r";
  //   } else if (bgId && buId && zId && !rId && !tId) {
  //     endPoint = "api/get_rollingdata_based_on_roll_z";
  //   } else if (bgId && buId && !zId && !rId && !tId) {
  //     endPoint = "api/get_rollingdata_based_on_roll_bu";
  //   } else if (bgId && !buId && !zId && !rId && !tId) {
  //     endPoint = "api/get_rollingdata_based_on_roll_bg";
  //   } else {
  //     return;
  //   }

  //   try {
  //     const respond = await axios.get(`${url}/${endPoint}`, {
  //       headers: headers,

  //       params: {
  //         t_year: yr || null,
  //         m_year:
  //           month === "All" || !month ? null : moment(month).format("YYYY-MM"),
  //         bg_id: bgId === "All" || !bgId ? null : bgId,
  //         bu_id: buId === "All" || !buId ? null : buId,
  //         z_id: zId === "All" || !zId ? null : zId,
  //         r_id: rId === "All" || !rId ? null : rId,
  //         t_id: tId === "All" || !tId ? null : tId,
  //       },
  //     });

  //     const apires = await respond.data.data;

  //     setAllTableData(apires);
  //   } catch (error) {
  //     if (!error) return;
  //     setAllTableData([]);
  //   }
  // };

  // useEffect(() => {
  //   getAllSalesPlanStatus(
  //     filterState.yr || null,
  //     filterState.month || null,
  //     filterState.bgId || null,
  //     filterState.buId || null,
  //     filterState.zId || null,
  //     filterState.rId || null,
  //     filterState.tId
  //   );
  // }, [
  //   filterState.yr,
  //   filterState.month,
  //   filterState.bgId,
  //   filterState.buId,
  //   filterState.zId,
  //   filterState.rId,
  //   filterState.tId,
  // ]);

  const [busniessSegmentData, setBusinessSegmentData] = useState([]);
  const getAllBusinessSegmentData = async (yr, month, bgId) => {
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

  useEffect(() => {
    getAllBusinessSegmentData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null
    );
  }, [filterState.yr, filterState.month, filterState.bgId]);

  const [businessUnitData, setBusinessUnitData] = useState([]);
  const getAllBusinessUnitData = async (yr, month, bgId, buId) => {
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_bu";

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

  useEffect(() => {
    getAllBusinessUnitData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null
    );
  }, [filterState.yr, filterState.month, filterState.bgId, filterState.buId]);

  const [zoneData, setZoneData] = useState([]);
  const getAllZonetData = async (yr, month, bgId, buId, zId) => {
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_z";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          z_id: zId === "All" || !zId ? null : zId,
          bu_id: buId === "All" || !buId ? null : buId,
        },
      });

      const apires = await respond.data.data;

      setZoneData(apires);
    } catch (error) {
      if (!error) return;
      setZoneData([]);
    }
  };

  useEffect(() => {
    getAllZonetData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null
    );
  }, [
    filterState.yr,
    filterState.month,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
  ]);

  const [regionData, setRegionData] = useState([]);
  const getRegionData = async (yr, month, bgId, buId, zId, rId) => {
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_r";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          r_id: rId === "All" || !rId ? null : rId,
          z_id: rId === "All" || !zId ? null : zId,
        },
      });

      const apires = await respond.data.data;

      setRegionData(apires);
    } catch (error) {
      if (!error) return;
      setRegionData([]);
    }
  };

  useEffect(() => {
    getRegionData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null
    );
  }, [
    filterState.yr,
    filterState.month,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
  ]);

  const [territoryData, setTerritoryData] = useState([]);
  const getTerritoryData = async (yr, month, bgId, buId, zId, rId, tId) => {
    let endPoint;

    endPoint = "api/get_rollingdata_based_on_roll_t";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: {
          t_year: yr || null,
          m_year:
            month === "All" || !month ? null : moment(month).format("YYYY-MM"),
          t_id: tId === "All" || !tId ? null : tId,
          r_id: rId === "All" || !rId ? null : rId,
        },
      });

      const apires = await respond.data.data;

      setTerritoryData(apires);
    } catch (error) {
      if (!error) return;
      setTerritoryData([]);
    }
  };

  useEffect(() => {
    getTerritoryData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId || null
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

  const [segmentData, setSegmentData] = useState([]);
  const getSegmentData = async (yr, month, bgId, buId, zId, rId, tId) => {
    if (!yr || !month || !bgId || !buId || !zId || !rId || !tId) return;
    console.log(
      "jio",
      allZoneData.filter(
        (item) => Number(item.z_id) === Number(filterState.zId)
      )
    );
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
    if (bgId && !buId) {
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
        bg_des: busniessSegmentData.filter(
          (item) => Number(item.bg_id) === Number(filterState.bgId)
        )[0]?.business_segment,
        bg_id: filterState.bgId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else if (buId && !zId) {
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
        bu_des: businessUnitData.filter(
          (item) => Number(item.bu_id) === Number(filterState.buId)
        )[0]?.business_unit_name,
        bu_id: filterState.buId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Segment",
      };
    } else if (zId && !rId) {
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
    } else if (rId && !tId) {
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
    } else if (tId) {
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
    }

    let endPoint;

    endPoint = "api/RSP_downloadAnalytical";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: paramsData,
      });

      const apires = await respond.data.data;

      setSegmentData(apires);
    } catch (error) {
      if (!error) return;
      setSegmentData([]);
    }
  };

  useEffect(() => {
    getSegmentData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId || null
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

  const [categoryData, setCategoryData] = useState([]);
  const getCategoryData = async (yr, month, bgId, buId, zId, rId, tId) => {
    console.log(
      "jio",
      allZoneData.filter(
        (item) => Number(item.z_id) === Number(filterState.zId)
      )
    );
    if (!yr || !month || !bgId || !buId || !zId || !rId || !tId) return;
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
      analytical_key: "Product Category",
    };
    if (bgId && !buId) {
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
        bg_des: busniessSegmentData.filter(
          (item) => Number(item.bg_id) === Number(filterState.bgId)
        )[0]?.business_segment,
        bg_id: filterState.bgId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Category",
      };
    } else if (buId && !zId) {
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
        bu_des: businessUnitData.filter(
          (item) => Number(item.bu_id) === Number(filterState.buId)
        )[0]?.business_unit_name,
        bu_id: filterState.buId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Product Category",
      };
    } else if (zId && !rId) {
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
        analytical_key: "Product Category",
      };
    } else if (rId && !tId) {
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
        analytical_key: "Product Category",
      };
    } else if (tId) {
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
        analytical_key: "Product Category",
      };
    }

    let endPoint;

    endPoint = "api/RSP_downloadAnalytical";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: paramsData,
      });

      const apires = await respond.data.data;

      setCategoryData(apires);
    } catch (error) {
      if (!error) return;
      setCategoryData([]);
    }
  };

  useEffect(() => {
    getCategoryData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId || null
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

  const [brandData, setBrandData] = useState([]);
  const getBrandData = async (yr, month, bgId, buId, zId, rId, tId) => {
    if (!yr || !month || !bgId || !buId || !zId || !rId || !tId) return;
    console.log(
      "jio",
      allZoneData.filter(
        (item) => Number(item.z_id) === Number(filterState.zId)
      )
    );
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
      analytical_key: "Brand Desc",
    };
    if (bgId && !buId) {
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
        bg_des: busniessSegmentData.filter(
          (item) => Number(item.bg_id) === Number(filterState.bgId)
        )[0]?.business_segment,
        bg_id: filterState.bgId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Brand Desc",
      };
    } else if (buId && !zId) {
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
        bu_des: businessUnitData.filter(
          (item) => Number(item.bu_id) === Number(filterState.buId)
        )[0]?.business_unit_name,

        bu_id: filterState.buId,
        m_year: moment(month).format("YYYY-MM"),
        json: true,
        analytical_key: "Brand Desc",
      };
    } else if (zId && !rId) {
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
        analytical_key: "Brand Desc",
      };
    } else if (rId && !tId) {
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
        analytical_key: "Brand Desc",
      };
    } else if (tId) {
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
        analytical_key: "Brand Desc",
      };
    }

    let endPoint;

    endPoint = "api/RSP_downloadAnalytical";

    try {
      const respond = await axios.get(`${url}/${endPoint}`, {
        headers: headers,

        params: paramsData,
      });

      const apires = await respond.data.data;

      setBrandData(apires);
    } catch (error) {
      if (!error) return;
      setBrandData([]);
    }
  };

  useEffect(() => {
    getBrandData(
      filterState.yr || null,
      filterState.month || null,
      filterState.bgId || null,
      filterState.buId || null,
      filterState.zId || null,
      filterState.rId || null,
      filterState.tId || null
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
  console.log("mln", filterState);

  return (
    <>
      <section className="outer  w-full px-2  bg-black/5   min-h-screen">
        <div className="flex items-center justify-center w-full">
          <h2 className="font-arial text-sm font-bold text-teal-500 mt-2">
            Target Vs Achievement - {filterState.month && filterState.month}
          </h2>
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => {
              router.push("/rollingplans");
            }}
            className="text-center rounded-md bg-blue-500 text-white py-1 px-6 h-12 text-sm"
          >
            Back to Rolling Page
          </button>
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
                Select
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
                - All Business Segment -
              </option>

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
              <option value={""}>- All Business Unit -</option>

              {buData.map((item, idx) => (
                <option value={item.bu_id} key={idx}>
                  {item.business_unit_name}
                </option>
              ))}
            </select>
            {console.log("qkl", filterState)}
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
              <option value={""}>- All Zone -</option>

              {allZoneData.map((item, idx) => (
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
              <option value={""}>-All Region -</option>

              {allRegionData.map((item, idx) => (
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
              <option value={""}>- All Territory -</option>

              {allTerritoryData.map((item, idx) => (
                <option value={item.t_id} key={idx}>
                  {item.territory_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="hey">
          <AllCharts
                   businessSegmentData =   {busniessSegmentData}
                   businessUnitData    =   {businessUnitData}
                   zoneData            =   {zoneData}
                   regionData          =   {regionData}
                   territoryData       =   {territoryData}
                   productSegmentData  =   {segmentData}
                   productCategoryData =   {categoryData}
                   productBrandData    =   {brandData}
          />
        </div>
      </section>
    </>
  );
};

export default MainReport;
