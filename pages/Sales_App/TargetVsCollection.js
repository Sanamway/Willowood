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
import ChartOne from "../../components/Sales_Portal_Apps/ChartOne";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";




import { BsCashCoin } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import TotalOutStandPop from "../../components/Sales_Portal_Apps/TargetVsCollection/TotalOsPopup";

import TotalOverDueAmtPop from "../../components/Sales_Portal_Apps/TargetVsCollection/TotalOverDueAmtPop";

const AdditionalInfo = (props) => {
    const router = useRouter();
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };

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

    // const toggleDropdown = () => {
    //   setIsDropdownOpen(!isDropdownOpen);
    // };

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

    const [depotData, setDepotData] = useState([]);

    const getAllDepotData = async (bgId, buId, zId, rId) => {
        try {
            const respond = await axios.get(`${url}/api/get_dipot`, {
                headers: headers,
                params: {
                    bg_id: bgId,
                    bu_id: buId,
                    z_id: zId,
                    r_id: rId,
                },
            });

            const apires = await respond.data.data;
            setDepotData(apires);
        } catch (error) { }
    };

    useEffect(() => {
        getAllDepotData(
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
        tId,

    ) => {
        let endPoint;

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
            const respond = await axios.get(`${url}/${endPoint}`, {
                headers: headers,

                params: {
                    t_year: yr || null,
                    // m_year:
                    //     month === "All" || !month ? null : moment(month).format("YYYY-MM"),
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

    const [allTeamData, setAllTeamData] = useState([]);

    const getAllTeamStatus = async (
        yr,
        month,
        bgId,
        buId,
        zId,
        rId,
        tId
    ) => {
        let endPoint;
        console.log("mjklo", yr,
            month,
            bgId,
            buId,
            zId,
            rId,
            tId)
        if (bgId && buId && zId && rId && tId) {

            endPoint = "api/get_collectiondata_based_on_roll_t";
        } else if (bgId && buId && zId && rId && !tId) {
            if (tId === "" || tId === 0 || tId === null) {
                endPoint = "api/get_collectiondata_based_on_roll_t"; // tId is an empty string
            } else {
                endPoint = "api/get_collectiondata_based_on_roll_r"; // tId holds some value
            }

        } else if (bgId && buId && zId && !rId && !tId) {
            if (rId === "" || rId === 0 || rId === null) {
                endPoint = "api/get_collectiondata_based_on_roll_r"; // tId is an empty string
            } else {
                endPoint = "api/get_collectiondata_based_on_roll_z"; // tId holds some value
            }

        } else if (bgId && buId && !zId && !rId && !tId) {
            if (zId === "" || zId === 0 || zId === null) {
                endPoint = "api/get_collectiondata_based_on_roll_z"; // tId is an empty string
            } else {
                endPoint = "api/get_collectiondata_based_on_roll_bu"; // tId holds some value
            }
        } else if (bgId && !buId && !zId && !rId && !tId) {
            if (buId === "" || buId === 0 || buId === null) {
                endPoint = "api/get_collectiondata_based_on_roll_bu"; // tId is an empty string
            } else {
                endPoint = "api/get_collectiondata_based_on_roll_bg"; // tId holds some value
            }
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

            setAllTeamData(apires);

        } catch (error) {
            if (!error) return;
            setAllTeamData([]);
        }
    };


    useEffect(() => {
        if (!allTableData.length) return
        setBsGraphData(
            [

                {
                    label: "Target",
                    backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
                    backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
                    data: allTableData.map((item) => item.target),
                },
                {
                    label: "Total Collections",
                    backgroundColor: "rgba(249, 115, 22, 1)",  // Full opacity (orange)
                    borderColor: "rgba(249, 115, 22, 0.6)",    // 60% opacity
                    data: allTableData.map((item) => item.actual),
                }

            ]
        )
    }, [
        allTableData
    ])
    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem("userinfo"))?.role_id === 11)
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

        getAllTeamStatus(
            filterState.yr || null,
            filterState.month || null,
            filterState.bgId || null,
            filterState.buId || null,
            filterState.zId || null,
            filterState.rId || null,
            filterState.tId
        )
    }, [
        filterState.yr,
        filterState.month,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
    ]);



    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [isCollapsed, setIsCollapsed] = useState(false); // State to manage collapsibility

    // Function to toggle collapsibility
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [isCollapsed2, setIsCollapsed2] = useState(false); // State to manage collapsibility

    // Function to toggle collapsibility
    const toggleCollapse2 = () => {
        setIsCollapsed2(!isCollapsed2);
    };

    const [isCollapsed3, setIsCollapsed3] = useState(true); // State to manage collapsibility

    // Function to toggle collapsibility
    const toggleCollapse3 = () => {
        setIsCollapsed3(!isCollapsed3);
    };


    const [isCollapsed4, setIsCollapsed4] = useState(true); // State to manage collapsibility

    // Function to toggle collapsibility
    const toggleCollapse4 = () => {
        setIsCollapsed4(!isCollapsed4);
    };



    // Calculate the total for a specific data
    const totalRow = (data) => {
        return Object.values(data).reduce((acc, val) => acc + Number(val), 0);
    };

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


    const totalOverall = {
        target: 0,
        achievement: 0,
        percentage: 0
    };

    const [partySaleData, setPartySaleData] = useState([]);
    const [allPartySaleData, setAllPartySaleData] = useState([]);
    const getSaleData = async (yr, month, bgId, buId, zId, rId, tId, pName) => {
        let paramsData
        const tName = territoryData.find(item => Number(item.t_id) === Number(tId))?.territory_name || '';
        const rName = regionData.find(item => Number(item.r_id) === Number(rId))?.region_name || '';
        const zName = zoneData.find(item => Number(item.z_id) === Number(zId))?.zone_name || '';
        const buName = buData.find(item => Number(item.bu_id) === Number(buId))?.business_unit_name || '';
        if (filterState.tId && filterState.tId !== "All") {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                r_id: rId === "All" || !rId ? null : rId,
                t_id: tId === "All" || !tId ? null : tId,
                t_des: tName,
                c_id: 1,

            };
        } else if (
            (filterState.rId && !filterState.tId)
        ) {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                r_id: rId === "All" || !rId ? null : rId,

                r_des: rName,
                c_id: 1,
                party_name: pName
            };
        } else if ((filterState.zId && !filterState.rId)) {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                z_des: zName,
                c_id: 1,
                party_name: pName
            };
        } else if ((filterState.buId && !filterState.zId)) {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                bu_des: buName,
                c_id: 1,
                party_name: pName
            };
        } else {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                bu_des: buName,
                c_id: 1,
                party_name: pName

            };
        }

        try {
            const respond = await axios.get(`${url}/api/SA_sales_target`, {
                headers: headers,
                params: paramsData,
            });
            const apires = await respond.data.data;
            console.log("pop", apires)
            setPartySaleData(apires)
            setAllPartySaleData(apires.map(item => item.customer_name))
        } catch (error) {
            console.log("pp", error)
            setPartySaleData([])
        }
    };
    const [brandData, setBrandData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [segmentData, setSegementData] = useState([]);

    const getThreeTableData = async (
        yr, month, bgId, buId, zId, rId, tId

    ) => {
        let endPoint = "SA_sales_Analytical";
        let paramsData
        const tName = territoryData.find(item => Number(item.t_id) === Number(tId))?.territory_name || '';
        const rName = regionData.find(item => Number(item.r_id) === Number(rId))?.region_name || '';
        const zName = zoneData.find(item => Number(item.z_id) === Number(zId))?.zone_name || '';
        const buName = buData.find(item => Number(item.bu_id) === Number(buId))?.business_unit_name || '';
        if (filterState.tId && filterState.tId !== "All") {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                r_id: rId === "All" || !rId ? null : rId,
                t_id: tId === "All" || !tId ? null : tId,
                t_des: tName,
                c_id: 1,

            };
        } else if (
            (filterState.rId && !filterState.tId)
        ) {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                r_id: rId === "All" || !rId ? null : rId,
                r_des: rName,
                c_id: 1,

            };
        } else if ((filterState.zId && !filterState.rId)) {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                z_des: zName,
                c_id: 1,

            };
        } else if ((filterState.buId && !filterState.zId)) {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                bu_des: buName,
                c_id: 1,

            };
        } else {
            paramsData = {
                year: yr || null,
                month:
                    month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                bu_des: buName,
                c_id: 1,


            };
        }

        try {
            const respond = await axios.get(`${url}/api/${endPoint}`, {
                headers: headers,

                params: paramsData,
            });

            const apires = await respond.data.data;
            console.log("plki", apires)
            setBrandData(apires.combined_brand)
            setCategoryData(apires.combined_category)
            setSegementData(apires.combined_segment)


        } catch (error) {

            if (!error) return;
            console.log("vbn", error)

        }
    };

    const [collectionTableData, setCollectionTableData] = useState([])

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

            setCollectionTableData(apires.data.data)
        } catch (error) {
            console.log("zxc", error)
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage);

        }
    };
    useEffect(() => {
        if (localStorageItems.roleId === 6 || localStorageItems.roleId === 5) {

            if (territoryData.length &&
                zoneData.length &&
                regionData.length &&
                buData.length) {
                getSaleData(filterState.yr || null,
                    filterState.month || null,
                    filterState.bgId || null,
                    filterState.buId || null,
                    filterState.zId || null,
                    filterState.rId || null,
                    filterState.tId || null,
                    filterState.partyName || null);
            }
            else {
                return
            }
        }


    }, [

        filterState.yr,
        filterState.month,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.partyName,
        territoryData,
        zoneData,
        regionData,
        buData
    ])


    useEffect(() => {

        getThreeTableData(filterState.yr || null,
            filterState.month || null,
            filterState.bgId || null,
            filterState.buId || null,
            filterState.zId || null,
            filterState.rId || null,
            filterState.tId || null,
            filterState.partyName || null);



    }, [

        filterState.yr,
        filterState.month,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.partyName,
        territoryData,
        zoneData,
        regionData,
        buData

    ])




    // useEffect(() => {
    //     if (filterState.zId &&
    //         filterState.rId &&
    //         filterState.tId) {

    //         if (territoryData.length && zoneData.length && regionData.length) {
    //             setCollectionTableData([])
    //             handleDownloadExcelNew(filterState.yr || null,
    //                 filterState.month || null,
    //                 filterState.bgId || null,
    //                 filterState.buId || null,
    //                 filterState.zId || null,
    //                 filterState.rId || null,
    //                 filterState.tId || null,
    //             );
    //         }
    //     }
    //     else {
    //         setCollectionTableData([])
    //         handleDownloadExcelNew(filterState.yr || null,
    //             filterState.month || null,
    //             filterState.bgId || null,
    //             filterState.buId || null,
    //             filterState.zId || null,
    //             filterState.rId || null,
    //             filterState.tId || null,
    //         );
    //     }






    // }, [

    //     filterState.yr,
    //     filterState.month,
    //     filterState.bgId,
    //     filterState.buId,
    //     filterState.zId,
    //     filterState.rId,
    //     filterState.tId,

    //     territoryData,
    //     zoneData,
    //     regionData,
    //     buData

    // ])
    useEffect(() => {
        const { yr, month, bgId, buId, zId, rId, tId } = filterState;
        console.log("zbnm", yr, month, bgId, buId, zId, rId, tId, !rId && zId && zoneData.length > 0, tId && territoryData.length > 0, !tId && rId && regionData.length > 0, !zId && buId && buData.length > 0)
        // Call the API based on the conditions
        if (tId && territoryData.length > 0) {
            // Call for territory data
            console.log('t is calling')
            setCollectionTableData([])
            handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
            return; // Exit after handling this condition
        }

        else if (!rId && zId && zoneData.length > 0) {
            // Call for zone data
            console.log('z is calling')
            setCollectionTableData([])
            handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
            return; // Exit after handling this condition
        }

        else if (!tId && rId && regionData.length > 0) {
            console.log('r is calling')
            setCollectionTableData([])
            handleDownloadExcelNew(yr || null, month || null, bgId || null, buId || null, zId || null, rId || null, tId || null);
            return; // Exit after handling this condition
        }

        else if (!zId && buId && buData.length > 0) {
            // Call for business unit data
            console.log('bu is calling')
            setCollectionTableData([])

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

    const totalTarget = totalRow(allTableData.map(item => item.target));
    const totalBudget = totalRow(allTableData.map(item => item.budget));
    const totalActual = totalRow(allTableData.map(item => item.actual));
    const totalPercentage = (totalActual / totalTarget * 100).toFixed(2);
    const TeamTarget = totalRow(allTeamData.map(item => item.target));
    const TeamActual = totalRow(allTeamData.map(item => item.actual));
    const TeamPercentage = (TeamActual / TeamTarget * 100).toFixed(2);


    const productYtd = totalRow(brandData.map(item => item.
        total_ytd_new_budget_price_value
    ));
    const productMtd = totalRow(brandData.map(item => item.total_mtd_new_budget_price_value
    ));
    const productToday = totalRow(brandData.map(item => item.total_today_new_budget_price));

    const brandYtd = totalRow(segmentData.map(item => item.total_ytd_new_budget_price_value));
    const brandMtd = totalRow(segmentData.map(item => item.total_mtd_new_budget_price_value));
    const brandToday = totalRow(segmentData.map(item => item.total_today_new_budget_price));

    const segementYtd = totalRow(categoryData.map(item => item.total_ytd_new_budget_price_value));
    const segementMtd = totalRow(categoryData.map(item => item.total_mtd_new_budget_price_value));
    const segementToday = totalRow(categoryData.map(item => item.total_today_new_budget_price));

    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);

    const closeModal = () => {
        setOpen(false);
        setOpenTwo(false);
    };

    const handlePopup = (param) => {
        if (param == "Total Outstanding") {
            setOpen(true);
        }
        if (param == "Total Overdue") {
            setOpenTwo(true);
        }
    };

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
                    <span>Target VS Collection</span>
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
                    <div className="flex flex-col gap-4 text-[10px]">
                        {/* Your select filters */}
                        <div className="flex flex-row gap-4">
                            <select
                                className="w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                                className="w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                            <select
                                className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                                <option value={''} className="font-bold">
                                    - Business Segment -
                                </option>

                                {bgData.map((item, idx) => (
                                    <option value={item.bg_id} key={idx}>
                                        {item.business_segment}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-row gap-4 mb-4">

                            <select
                                className="w-1/2 px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                                <option value={''}>- Business Unit -</option>

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
                                <option value={''}>- Zone -</option>

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
                                        tId: '',
                                    })
                                }
                            >
                                <option value={''}>- Region -</option>

                                {regionData.map((item, idx) => (
                                    <option value={item.r_id} key={idx}>
                                        {item.region_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-row gap-4">
                            <select
                                className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                                <option value={''}>- Territory -</option>

                                {territoryData.map((item, idx) => (
                                    <option value={item.t_id} key={idx}>
                                        {item.territory_name}
                                    </option>
                                ))}
                            </select>
                            {Number(localStorageItems.roleId) === 6 || Number(localStorageItems.roleId) === 5
                                ?
                                <select
                                    className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                                    id="stateSelect"
                                    value={filterState.partyName}

                                    onChange={(e) =>
                                        setFilterState({
                                            ...filterState,
                                            partyName: e.target.value,
                                        })
                                    }
                                >
                                    <option value={''}>-Party -</option>

                                    {allPartySaleData.map(item => <option value={item}>
                                        {item}
                                    </option>)}
                                </select>
                                : ""
                            }



                        </div>
                    </div>
                )}
            </div>



            <div className="mt-4">


                <div className="overflow-x-auto">
                    <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center ">
                        <span className="flex-grow text-center">Target Vs Collection</span>

                        {isCollapsed ? (
                            <button onClick={toggleCollapse} className="ml-auto">
                                <FiPlus />
                            </button>
                        ) : (
                            <button onClick={toggleCollapse} className="ml-auto">
                                <FiMinus />
                            </button>
                        )}
                    </h1>

                    {!isCollapsed && (

                        <>
                            <div className=" bg-gray-200  flex flex-col">
                                <div className="creditwrapper mt-2 flex flex-col gap-2 ">
                                    <div className="h-6 bg-white rounded-t-md flex items-center px-2 ">
                                        <h2 className="text-[0.95rem] text-gray-600 font-bold">Credit Balance Details</h2>
                                    </div>

                                    <div className="flex-row flex-col gap-3 font-arial   rounded-md bg-white ">
                                        <div className="flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                                            <div className="flex-col  items-start justify-between w-full gap-2 p-1">
                                                <h2 className="text-[0.75rem] text-gray-600 font-semibold font-arial whitespace-nowrap">
                                                    Allocated Credit Limit{" "}
                                                </h2>
                                                <h2 className="text-sm text-[#ADBD5B] font-bold whitespace-nowrap">&#8377;{parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["Credit Limit "], 0).toFixed(2))}</h2>
                                            </div>
                                            <div className="flex-col items-start justify-between w-full gap-2 p-1 border-l-[3px] ">
                                                <h2 className="text-[0.75rem] text-gray-600 font-semibold whitespace-nowrap">
                                                    Utilized Credit Limit
                                                </h2>
                                                <h2 className="text-sm text-[#F5A05D] font-bold whitespace-nowrap">&#8377;{parseFloat(parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["Credit Limit "], 0).toFixed(2)) - parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0).toFixed(2))).toFixed(2)}</h2>
                                            </div>
                                            <div className="flex-col items-start justify-between w-full gap-2 p-1 border-l-[3px] ">
                                                <h2 className="text-[0.75rem] text-gray-600 font-semibold whitespace-nowrap">
                                                    Balance Credit Limit
                                                </h2>
                                                <h2 className="text-sm text-[#E55769] font-bold whitespace-nowrap">&#8377;{
                                                    parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0).toFixed(2))}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="totalwrapper mb-2">
                                    <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                                        <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                                            <div className="flex items-center justify-between w-full text-gray-600">
                                                <div className="flex items-center justify-center gap-1 ">
                                                    <div className="px-2 py-2 rounded-full bg-blue-50 ">
                                                        <BsCashCoin className="text-blue-500" size={20}></BsCashCoin>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-center">
                                                        <h2 className="text-[0.75rem] text-gray-600 font-semibold">Total Outstanding</h2>
                                                        <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;{parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0).toFixed(2))}</h2>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => handlePopup("Total Outstanding")}
                                                    className="rounded-full shadow-md cursor-pointer"
                                                >
                                                    <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                                        <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                                            <div className="flex items-center justify-between w-full text-gray-600">
                                                <div className="flex items-center justify-center gap-1 ">
                                                    <div className="px-2 py-2 rounded-full bg-blue-50 ">
                                                        <GiAlarmClock className="text-blue-500" size={20}></GiAlarmClock>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-center">
                                                        <h2 className="text-[0.75rem] text-gray-600 font-semibold">Total Overdue</h2>
                                                        <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;{parseFloat(parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["180-365"], 0).toFixed(2)) + parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["366-720"], 0).toFixed(2)) + parseFloat(collectionTableData.reduce((acc, curr) => acc + curr["720 And Above"], 0).toFixed(2))).toFixed(2)

                                                        }</h2>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => handlePopup("Total Overdue")}
                                                    className="rounded-full shadow-md cursor-pointer"
                                                >
                                                    <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                                        <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                                            <div className="flex items-center justify-between w-full text-gray-600">
                                                <div className="flex items-center justify-center gap-1 ">
                                                    <div className="px-2 py-2 rounded-full bg-blue-50 ">
                                                        <FaMoneyBillTrendUp className="text-blue-500" size={20}></FaMoneyBillTrendUp>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-center">
                                                        <h2 className="text-[0.75rem] text-gray-600 font-semibold">Super Cash Overdue</h2>
                                                        <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;0.00</h2>
                                                    </div>
                                                </div>
                                                <div className="rounded-full shadow-md cursor-pointer">
                                                    <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {open && <TotalOutStandPop closeModal={closeModal} dueData={collectionTableData || []}></TotalOutStandPop>}
                                    {openTwo && <TotalOverDueAmtPop closeModal={closeModal} dueData={collectionTableData || []}></TotalOverDueAmtPop>}
                                </div>
                            </div>
                            <table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-blue-800 text-white">
                                        <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Month</th>

                                        <th className="border border-gray-200 px-2 py-2">Target</th>
                                        <th className="border border-gray-200 px-2 py-2">Total Collection</th>
                                        <th className="border border-gray-200 px-2 py-2">ACH%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTableData.map((item) => (
                                        <tr className="font-bold">
                                            <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
                                                {
                                                    moment(item.m_year).format('MMMM')
                                                }

                                            </td>

                                            <td className="border border-gray-200  px-2 py-2">{item.target}</td>

                                            <td className="border border-gray-200  px-2 py-2">{item.actual}</td>

                                            <td className="border border-gray-200  px-2 py-2">
                                                {(item.actual / item.target * 100).toFixed(2)} %

                                            </td>
                                        </tr>
                                    ))}



                                    {/* Row for Totals (appears at the end) */}
                                    <tr className="font-bold bg-blue-800 text-white">
                                        <td className="border border-gray-200 px-2 py-2">YTD Total</td>

                                        <td className="border border-gray-200 px-2 py-2">
                                            {Number(totalTarget).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-2">
                                            {Number(totalActual).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-2">
                                            {totalPercentage} %
                                        </td>
                                    </tr>

                                </tbody>
                            </table></>


                    )}
                </div>



                <div className="overflow-x-auto ">
                    <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center px-4">
                        <span className="flex-grow text-center">My Team</span>

                        {isCollapsed2 ? (
                            <button onClick={toggleCollapse2} className="ml-auto">
                                <FiPlus />
                            </button>
                        ) : (
                            <button onClick={toggleCollapse2} className="ml-auto">
                                <FiMinus />
                            </button>
                        )}
                    </h1>
                    {!isCollapsed2 && (<table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                        <thead>
                            <tr className="bg-blue-800 text-white">
                                <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Month</th>
                                <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">BST</th>

                                <th className="border border-gray-200  py-2">Target</th>
                                <th className="border border-gray-200  py-2">Total Collection</th>
                                <th className="border border-gray-200  py-2">ACH%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTeamData.map((item) => (
                                <tr className="font-bold">
                                    <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
                                        {
                                            moment(item.m_year).format('MMMM')
                                        }

                                    </td>
                                    <td className="border border-gray-200 w-48 px-2 py-2">
                                        {[item.business_segment || ""
                                            ,
                                        item.business_unit_name || ""
                                            ,
                                        item.zone_name || ""
                                            ,
                                        item.region_name || ""
                                            ,
                                        item.territory_name
                                        || ""].reverse().find(value => value !== "")}
                                        -
                                        {[item.business_segment || ""
                                            ,
                                        item.business_unit_hod_name || ""
                                            ,
                                        item.zone_hod_name || ""
                                            ,
                                        item.region_hod_name || ""
                                            ,
                                        item.territory_hod_name || ""].reverse().find(value => value !== "")}




                                    </td>
                                    <td className="border border-gray-200  py-2">{item.target}</td>
                                    <td className="border border-gray-200 py-2">{item.actual}</td>

                                    <td className="border border-gray-200  py-2">
                                        {(item.actual / item.target * 100).toFixed(2)} %

                                    </td>
                                </tr>
                            ))}



                            {/* Row for Totals (appears at the end) */}
                            <tr className="font-bold bg-blue-800 text-white">
                                <td className="border border-gray-200 px-2 py-2">MTD Total</td>
                                <td className="border border-gray-200 px-2 py-2">

                                </td>
                                <td className="border border-gray-200 py-2">
                                    {Number(TeamTarget).toFixed(2)}
                                </td>
                                <td className="border border-gray-200  py-2">
                                    {Number(TeamActual).toFixed(2)}
                                </td>
                                <td className="border border-gray-200  py-2">
                                    {TeamPercentage} %
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    )}
                </div>

            </div>



            {localStorageItems.roleId === 6 || localStorageItems.roleId === 5
                ?
                <div>
                    <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center px-4">
                        <span className="flex-grow text-center">My Party</span>

                        {isCollapsed3 ? (
                            <button onClick={toggleCollapse3} className="ml-auto">
                                <FiPlus />
                            </button>
                        ) : (
                            <button onClick={toggleCollapse3} className="ml-auto">
                                <FiMinus />
                            </button>
                        )}
                    </h1>
                    <div className="wrapper w-full overflow-hidden overflow-x-auto">
                        {!isCollapsed3 && (
                            <table className="border-collapse border border-gray-200 text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-blue-800 text-white">
                                        <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">
                                            Party Name
                                        </th>
                                        <th className="border border-gray-200 px-2 py-2">MTD Collection</th>
                                        <th className="border border-gray-200 px-2 py-2">Today's Collection</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {partySaleData?.map((item, idx) => {
                                        // Calculate the total for each item
                                        const totalFy = item.category_result?.reduce((acc, categoryItem) => acc + (parseFloat(categoryItem.fy) || 0), 0);
                                        const totalTodaySale = item.category_result?.reduce((acc, categoryItem) => acc + (parseFloat(categoryItem.today_sale) || 0), 0);

                                        return (
                                            <tr key={idx} className="font-bold">
                                                <td className="border border-gray-200 ">{item.customer_name}</td>



                                                <td className="border border-gray-200">
                                                    {item.category_result?.map((categoryItem, index) => (
                                                        <li key={index} className="border-b-2 border-black flex justify-left text-black p-1">
                                                            <input className="p-0 w-14 text h-6" value={categoryItem.fy} disabled />
                                                        </li>
                                                    ))}
                                                    <li className="border-b-2 border-black flex justify-left text-black p-1 bg-yellow-200">
                                                        <input className="p-0 w-14 text h-6" value={totalFy.toFixed(2)} disabled /> {/* Total FY Value */}
                                                    </li>
                                                </td>

                                                <td className="border border-gray-200">
                                                    {item.category_result?.map((categoryItem, index) => (
                                                        <li key={index} className="border-b-2 border-black flex justify-left text-black p-1">
                                                            <input className="p-0 w-14 text h-6" value={categoryItem.today_sale} disabled />
                                                        </li>
                                                    ))}
                                                    <li className="border-b-2 border-black flex justify-left text-black p-1 bg-yellow-200">
                                                        <input className="p-0 w-14 text h-6" value={totalTodaySale.toFixed(2)} disabled /> {/* Total Today's Sale */}
                                                    </li>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {/* Add the final row that shows the grand total */}
                                    <tr className="font-bold bg-gray-100">
                                        <td className="border border-gray-200">Grand Total</td>
                                        <td className="border border-gray-200">
                                            {/* Empty because category names don't have a total */}
                                        </td>
                                        <td className="border border-gray-200">
                                            <input
                                                className="p-0 w-14 text h-6"
                                                ue={partySaleData?.reduce((acc, item) => acc + item.category_result?.reduce((innerAcc, categoryItem) => innerAcc + (parseFloat(categoryItem.fy) || 0), 0), 0).toFixed(2)} // Grand total FY value
                                                disabled
                                            />
                                        </td>
                                        <td className="border border-gray-200">
                                            <input
                                                className="p-0 w-14 text h-6"
                                                value={partySaleData?.reduce((acc, item) => acc + item.category_result?.reduce((innerAcc, categoryItem) => innerAcc + (parseFloat(categoryItem.today_sale) || 0), 0), 0).toFixed(2)} // Grand total today's sale
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}

                    </div>

                </div>
                : ""
            }





            <h1 className=" font-bold text-center  bg-yellow-300">
                Monthly Graph
            </h1>

            <ChartOne
                title={"Target Vs Collection"}
                color={"bg-blue-800"}
                lab={bsLabelData}
                datasets={bsGraphData || []}
            />
            <div className="flex justify-end w-full">
                <FaArrowAltCircleUp
                    size={42}
                    className="self-center size-120 text-black-400 text-blue-400  "
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth", // Smooth scrolling animation
                        })
                    }
                />
            </div>
        </form >
    );
};

export default AdditionalInfo;
