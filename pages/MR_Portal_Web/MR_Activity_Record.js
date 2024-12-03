import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

import { useRouter } from "next/router";
import AllTables from "../../components/MR_Activity_Record/AllTables";
import AllCharts from "../../components/MR_Activity_Record/AllCharts";
import Layout from "@/components/Layout1";
import axios from "axios";
import { url } from "@/constants/url";

const ChartReports = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const monthToNumber = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
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
    yr: "2024",
    month: "",
    empCode: "",
  });






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

  const [allEmployee, setAllEmployee] = useState([])
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
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });
      const apires = await respond.data.data;
      setAllEmployee(apires);
    } catch (error) { }
  }
  useEffect(() => {

    getAllEmployeeData(
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId
    );
  }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId, filterState.tId]);



  useEffect(() => {

    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All",
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
          yr: "2024",
          month: "",
          empCode: "",
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
          yr: "2024",
          month: "",
          empCode: ""
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
          yr: "2024",
          month: "",
          empCode: ""
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
          yr: "2024",
          month: "",
          empCode: ""
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



        break;
      case 10:
        filterState = {
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",
          yr: "2024",
          month: "",
          empCode: ""
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



        break;
      default:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        });

        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: "2024",
          month: "",
          empCode: ""
        });


        break;
    }
    setFilterState(filterState);
  }, []);


  const [mrActivityScoreMonthly, setMrActivityScoreMonthly] = useState([])
  const [mrActivityScoreTeritory, setMrActivityScoreTeritory] = useState([])
  const [mrActivityScoreEmp, setMrActivityScoreEmp] = useState([])

  const [tableLoading, setTableLoading] = useState(false)
  const getMrActivityScoreMonthly = async (

  ) => {
    const {
      bgId,
      buId,
      zId,
      rId,
      tId,
      tDes,
      rDes,
      zDes,
      buDes,
      bgDes,
      yr,
      month,
      empCode
    } = filterState
    try {
      setTableLoading(true)
      const respond = await axios.get(`${url}/api/mr_activity_report_monthly`, {
        headers: headers,
        params: {
          t_id: tId === "All" ? null : tId,
          bg_id: bgId === "All" ? null : bgId,
          bu_id: buId === "All" ? null : buId,
          z_id: zId === "All" ? null : zId,
          r_id: rId === "All" ? null : rId,
          month: monthToNumber[month],
          year: yr,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          count_type: "year",
          emp_code: empCode


        },
      });
      const apires = await respond.data.data;
      setTableLoading(false)
      setMrActivityScoreMonthly(apires)


    } catch (error) {
      console.log(error)

    }
  };


  const getMrActivityScoreTeritory = async (

  ) => {
    try {

      const {
        bgId,
        buId,
        zId,
        rId,
        tId,
        tDes,
        rDes,
        zDes,
        buDes,
        bgDes,
        yr,
        month,
        empCode
      } = filterState
      const respond = await axios.get(`${url}/api/mr_activity_report_territory`, {
        headers: headers,
        params: {
          t_id: tId === "All" ? null : tId,
          bg_id: bgId === "All" ? null : bgId,
          bu_id: buId === "All" ? null : buId,
          z_id: zId === "All" ? null : zId,
          r_id: rId === "All" ? null : rId,
          month: monthToNumber[month],
          year: yr,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode




        },
      });
      const apires = await respond.data.data;

      setMrActivityScoreTeritory(apires)


    } catch (error) {
      console.log(error)

    }
  };

  const getMrActivityScoreEmp = async (

  ) => {
    try {
      console.log("zopo", filterState)
      const {
        bgId,
        buId,
        zId,
        rId,
        tId,
        tDes,
        rDes,
        zDes,
        buDes,
        bgDes,
        yr,
        month,
        empCode

      } = filterState
      const respond = await axios.get(`${url}/api/mr_activity_report_emp`, {
        headers: headers,
        params: {
          t_id: tId === "All" ? null : tId,
          bg_id: bgId === "All" ? null : bgId,
          bu_id: buId === "All" ? null : buId,
          z_id: zId === "All" ? null : zId,
          r_id: rId === "All" ? null : rId,
          month: monthToNumber[month],
          year: yr,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode




        },
      });
      const apires = await respond.data.data;

      setMrActivityScoreEmp(apires)


    } catch (error) {
      console.log(error)

    }
  };
  const [cropWiseTable, setCropWiseTable] = useState([])
  const getCropProductCount = async (
  ) => {
    try {
      console.log("zopo", filterState)
      const {
        bgId,
        buId,
        zId,
        rId,
        tId,
        tDes,
        rDes,
        zDes,
        buDes,
        bgDes,
        yr,
        month,
        empCode

      } = filterState
      const respond = await axios.get(`${url}/api/crop_product_demo_count`, {
        headers: headers,
        params: {
          t_id: tId === "All" ? null : tId,
          bg_id: bgId === "All" ? null : bgId,
          bu_id: buId === "All" ? null : buId,
          z_id: zId === "All" ? null : zId,
          r_id: rId === "All" ? null : rId,
          month: monthToNumber[month],
          year: yr,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode || null




        },
      });
      const apires = await respond.data.data;

      setCropWiseTable(apires)


    } catch (error) {
      console.log(error)

    }
  };
  console.log("qwer", cropWiseTable)



  const handleGetAllData = () => {
    getMrActivityScoreMonthly()
    getMrActivityScoreTeritory()
    getMrActivityScoreEmp()
    getCropProductCount();

  }

  console.log("pol", filterState)
  const filterDisableOption = (currentFilter) => {
    function getLastAssignedKey(filterState) {
      // Define an array of keys in the order you want to check
      const keys = ['bgId', 'buId', 'zId', 'rId', 'tId'];

      // Iterate through the keys in reverse order
      for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        if (typeof filterState[key] === 'number' && !isNaN(filterState[key])) {
          return key;
        }
      }

      // If no valid number is found, return null or undefined
      return null;
    }

    console.log("zpo", currentFilter)
    const role = localStorageItems.roleId
    console.log("pop", getLastAssignedKey(filterState) === "tId")
    if (role === 9) {

      switch (currentFilter) {
        case "Teritory": if (
          getLastAssignedKey(filterState) === "tId") { return true }
        else {
          return false

        }
        case "Region": if (
          getLastAssignedKey(filterState) === "tId" || getLastAssignedKey(filterState) === "rId") { return true }
        else {
          return false

        }
        case "Zone": if (
          getLastAssignedKey(filterState) === "tId" ||
          getLastAssignedKey(filterState) === "rId" ||
          getLastAssignedKey(filterState) === "zId") { return true }
        else {
          return false

        }
        case "BU": if (
          getLastAssignedKey(filterState) === "tId" ||
          getLastAssignedKey(filterState) === "rId" ||
          getLastAssignedKey(filterState) === "zId" || getLastAssignedKey(filterState) === "buId") { return true }
        else {
          return false

        }
        case "BG": if (
          getLastAssignedKey(filterState) === "tId" ||
          getLastAssignedKey(filterState) === "rId" ||
          getLastAssignedKey(filterState) === "zId" || getLastAssignedKey(filterState) === "buId" || getLastAssignedKey(filterState) === "bgId") { return true }
        else {
          return false

        }
      }

    }
    else {
      switch (currentFilter) {
        case "Territory": if (
          role === 6) { return true }
        else {
          return false

        }
        case "Region": if (role === 6 || role === 5
        ) { return true }
        else { return false }
        case "Zone": if (role === 6 ||
          role === 5 ||
          role === 4) {
          return true
        }
        else { return false }
        case "BU": if (role === 6 ||
          role === 5 ||
          role === 4 ||
          role === 3) {
          return true
        }
        else {
          false
        }
        case "BG": if (role === 6 ||
          role === 5 ||
          role === 4 ||
          role === 3 ||
          role === 10) {
          return true
        }
        else {
          return false
        }

      }

    }

  }
  return (
    <Layout>
      <div className="h-[100%] overflow-x-auto">
        <section className="outer  w-full px-2  bg-black/5   ">
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

              >
                <option value="All" className="font-bold" disabled={true}>
                  -- Select --
                </option>
                {["2024", "2023"].map((item, idx) => (
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

              >
                <option value="All" className="font-bold">
                  Select
                </option>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((item, idx) => {
                  return (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <select
                className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                id="stateSelect"
                value={filterState.bgId}
                disabled={
                  filterDisableOption("BG")
                }

                onChange={(e) => {
                  if (e.target.value === "All") {
                    setFilterState({
                      ...filterState,
                      bgId: Number(e.target.value),
                      buId: "All",
                      zId: "All",
                      rId: "All",
                      tId: "All",
                    });
                  } else {
                    setFilterState({
                      ...filterState,
                      bgId: Number(e.target.value),
                      buId: "All",
                      zId: "All",
                      rId: "All",
                      tId: "All",
                    });
                  }
                }}

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
                      buId: Number(e.target.value),

                      zId: "All",
                      rId: "All",
                      tId: "All",
                    });
                  } else {
                    setFilterState({
                      ...filterState,
                      buId: Number(e.target.value),
                      zId: "All",
                      rId: "All",
                      tId: "All",
                    });
                  }
                }}
                disabled={
                  filterDisableOption("BU")
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
                      zId: Number(e.target.value),
                      rId: "All",
                      tId: "All",
                    });
                  } else {
                    setFilterState({
                      ...filterState,
                      zId: Number(e.target.value),
                      rId: "All",
                      tId: "All",
                    });
                  }
                }}
                disabled={
                  filterDisableOption("Zone")
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
                value={filterState.rId}
                disabled={
                  filterDisableOption("Region")
                }
                onChange={(e) => {
                  if (e.target.value === "All") {
                    setFilterState({
                      ...filterState,
                      rId: Number(e.target.value),
                      tId: "All",
                    });
                  } else {
                    setFilterState({
                      ...filterState,
                      rId: Number(e.target.value),
                      tId: "All",
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
                className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                id="stateSelect"
                value={filterState.tId}
                disabled={
                  filterDisableOption("Territory")
                }
                onChange={(e) =>
                  setFilterState({
                    ...filterState,
                    tId: Number(e.target.value),
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
              <select
                className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                id="stateSelect"
                value={filterState.empCode}
                onChange={(e) =>
                  setFilterState({ ...filterState, empCode: e.target.value })
                }
              >
                <option value="All">- All Employees -</option>

                {allEmployee.map((item) => (
                  <option value={item.empcode}>
                    {item.fname} {item.mname} {item.lname} {item.empcode}
                  </option>))}
              </select>
            </div>
          </div>
          <button
            className="bg-blue-500 px-4 py-1 text-white cursor-pointer"
            onClick={() => {
              handleGetAllData()
            }}
          >
            View Data
          </button>
          <div className="hey">
            <div className="flex w-full border-black border-b-2 items-start gap-8 mt-2">
              <button
                className={`${tabType === "Table"
                  ? " flex  gap-2 inline-block  rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm bg-black/5"
                  : " flex  gap-2  inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm bg-black/8"
                  }`}
                onClick={() => setTabType("Table")}
              >
                Table
              </button>{" "}
              <button
                className={`${tabType === "Chart"
                  ? " flex  gap-2 inline-block rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm bg-black/5"
                  : " flex  gap-2   inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm bg-black/8"
                  }`}
                onClick={() => setTabType("Chart")}
              >
                Chart
              </button>
            </div>

            {tabType === "Chart" ? (
              <div className="w-full flex flex-col gap-2">
                <AllCharts />
              </div>
            ) : (
              <div className="w-full flex flex-col   md:flex w-1/2 flex-row lg:w-full flex flex-col ">
                <AllTables
                  monthlyData={mrActivityScoreMonthly}
                  teritoryData={mrActivityScoreTeritory}
                  empData={mrActivityScoreEmp}
                  prductWiseDemo={cropWiseTable}
                  loading={tableLoading}
                  filterState={filterState}

                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* </Layout> */}
    </Layout>
  );
};

export default ChartReports;
