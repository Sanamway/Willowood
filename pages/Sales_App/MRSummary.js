
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { url } from "@/constants/url";
import axios from "axios";

import moment from "moment";
import { useRouter } from "next/router";

import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";

import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";


import Profile from "../../public/userimg.jpg";
import { FaArrowAltCircleUp } from "react-icons/fa";
import ChartOne from "./ChartOne";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";

import AllTables from "./AllTables";


import { BsCashCoin } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import TotalOutStandPop from "./TotalOsPopup";
import { totalOsData } from "./sampleData";
import TotalOverDueAmtPop from "./TotalOverDueAmtPop";

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
        yr: "2025",
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
                    yr: "2025",
                    month: "",
                    empCode: "",
                };
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
                    yr: "2025",
                    month: "",
                    empCode: ""
                };
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
                    yr: "2025",
                    month: "",
                    empCode: ""
                };
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
                    yr: "2025",
                    month: "",
                    empCode: ""
                };
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


                break;
            case 10:
                filterState = {
                    bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
                    rId: "All",
                    tId: "All",
                    yr: "2025",
                    month: "",
                    empCode: ""
                };
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

                break;
            default:
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
                    bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
                    yr: "2025",
                    month: "",
                    empCode: ""
                });


                break;
        }
        setFilterState(filterState);
    }, []);


    const [mrActivityScoreMonthly, setMrActivityScoreMonthly] = useState([])
    const [mrActivityScoreTeritory, setMrActivityScoreTeritory] = useState([])

    const [bsGraphData, setBsGraphData] = useState([

        {
            label: "Target",
            backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
            backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
            data: 0,
        },
        {
            label: "Total Collections",
            backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
            borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
            data: 0,
        }

    ])
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
            let adjustedYear = (monthToNumber[month] <= 3) ? yr - 1 : yr;
            setTableLoading(true)
            const respond = await axios.get(`${url}/api/mr_activity_report_monthly`, {
                headers: headers,
                params: {
                    t_id: tId === "All" ? null : tId,
                    bg_id: bgId === "All" ? null : bgId,
                    bu_id: buId === "All" ? null : buId,
                    z_id: zId === "All" ? null : zId,
                    r_id: rId === "All" ? null : rId,

                    year: adjustedYear,
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
    useEffect(() => {
        if (!mrActivityScoreMonthly.length) return
        setBsGraphData(
            [

                {
                    label: "Demo",
                    backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
                    backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
                    data: mrActivityScoreMonthly.map((item) => item.demo),
                },
                {
                    label: "Field Day",
                    backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
                    borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
                    data: mrActivityScoreMonthly.map((item) => item.f_day),
                },
                {
                    label: "OFM + FGM",
                    backgroundColor: "rgb(98, 239, 22)",  // Full opacity (orange)
                    borderColor: "rgb(98, 239, 22)",    // 60% opacity
                    data: mrActivityScoreMonthly.map((item) => item.ofm + item.fgm),
                }

            ]
        )
    }, [
        mrActivityScoreMonthly
    ])


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






    const handleGetAllData = () => {
        setMrActivityScoreMonthly([])
        setMrActivityScoreTeritory([])

        getMrActivityScoreMonthly()
        getMrActivityScoreTeritory()

        getCropProductCount();

    }

    console.log("pol", filterState)
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
    const { name } = router.query;
    const getUserItem = () => {
        let role = localStorageItems.roleId
        switch (role) {
            case 1: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Business Segment
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_segment
                }</span>
            </div>

            case 3: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Business Unit
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_unit_name}</span>
            </div>

            case 4: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Zone
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.zone_name}</span>
            </div>

            case 5: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Region
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.region_name
                }</span>
            </div>

            case 6: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Territory
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{localStorageItems.tDes}</span>
            </div>
            case 10: return <div className="flex w-full  w-28">
                <div className="flex">
                    <p className=" font-bold text-sm text-blue-800 w-24">
                        Business Segment
                    </p>
                    <span>:</span>
                </div>
                <span className="w-32 ml-3">{JSON.parse(window.localStorage.getItem("userinfo"))?.business_segment
                }</span>
            </div>


        }
    }

    const [isFilterVisible, setIsFilterVisible] = useState(false);

    return (
        <form
            className=" bg-white rounded  w-full  overflow-auto pb-4"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
                <span className="text-black flex flex-row gap-4 font-bold   ">
                    <FaArrowLeftLong
                        className="self-center "
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Home",
                            })
                        }
                    />
                    <span>MR Summary</span>
                </span>{" "}
                <span className="text-white self-center">
                    <Popover as="div" className="relative border-none outline-none mt-2">
                        {({ open }) => (
                            <>
                                <Popover.Button className="focus:outline-none">

                                </Popover.Button>

                                <Popover.Panel
                                    as="div"
                                    className={`${open ? "block" : "hidden"
                                        } absolute z-40 top-1 right-0 mt-2 w-36 bg-white  text-black border rounded-md shadow-md`}
                                >
                                    <ul className=" text-black text-sm flex flex-col gap-4 py-4  font-Rale cursor-pointer ">
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:hidden ">
                                            <FaHandsHelping
                                                className="text-[#626364] cursor-pointer"
                                                size={20}
                                            />{" "}
                                            Help
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:flex-col ">
                                            <IoSettingsOutline
                                                className="text-[#626364] cursor-pointer"
                                                size={20}
                                            />{" "}
                                            Setting
                                        </li>
                                    </ul>
                                </Popover.Panel>
                            </>
                        )}
                    </Popover>
                </span>
            </div>

            <div className="flex mb-4 mt-2 mb-8">
                <div className="w-40 h-30 flex justify-center items-center">
                    <Image
                        className="h-[5.1rem] w-[5.1rem] rounded-full mt-2"
                        src={Profile}
                        alt="img"
                    />
                </div>

                <div className="flex  flex-col  w-full mt-4 md:hidden">
                    <div className="flex w-full  w-28">
                        <div className="flex">
                            <p className=" font-bold text-sm text-blue-800 w-24">
                                Emp Code
                            </p>
                            <span>:</span>
                        </div>
                        <span className="w-32 ml-3">{localStorageItems.empCode}</span>
                    </div>
                    <div className="flex   w-full  w-28 ">
                        <div className="flex">
                            <p className=" font-bold text-sm text-blue-800 w-24">Name</p>
                            <span>:</span>
                        </div>
                        <span className="w-32 ml-3 whitespace-nowrap"> {localStorageItems.clName}</span>
                    </div>
                    {getUserItem()}
                </div>
            </div>
            <div className="flex flex-col gap-2  w-full text-[14px]">
                {/* Button to toggle visibility of the filter section */}
                <button
                    onClick={() => setIsFilterVisible(!isFilterVisible)} // Toggle visibility
                    className=" bg-blue-500 text-white rounded-md w-28 self-end h-8"
                >
                    {isFilterVisible ? 'Hide Filter' : 'All Filter'} {/* Button text changes based on visibility */}
                </button>

                {/* Conditional rendering: If isFilterVisible is true, show the filter section */}
                {isFilterVisible && (
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
                                {["2030", "2029", "2028", "2027", "2026", "2025", "2024", "2023"].map((item, idx) => (
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
                                {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((item, idx) => {
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

                        </div>
                    </div>
                )}
            </div>

            <section className="outer  w-full px-2  bg-black/5   ">
                <div className="flex justify-end w-100 ">
                    <button
                        className="bg-blue-500 px-4 py-1 text-white cursor-pointer  mt-2"
                        onClick={() => {
                            handleGetAllData()
                        }}
                    >
                        View Data
                    </button>
                </div>

                <div className="hey">



                    <div className="w-full flex flex-col   md:flex w-1/2 flex-row lg:w-full flex flex-col ">
                        <AllTables
                            monthlyData={mrActivityScoreMonthly}
                            teritoryData={mrActivityScoreTeritory}
                            loading={tableLoading}
                            filterState={filterState}
                            prductWiseDemo={cropWiseTable}
                            graphData={bsGraphData}
                        />
                    </div>

                </div>
            </section>

        </form>



    );
};

export default ChartReports;
