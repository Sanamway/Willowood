import React, { useState, useEffect, useRef } from "react";
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
import BrandChart from "@/components/Sales_Portal_Apps/BrandChart";
import PPChart from "@/components/Sales_Portal_Apps/PPChart";
import SegementChart from "@/components/Sales_Portal_Apps/SegmentChart";
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import MyTeam from "@/components/Sales_Portal_Apps/MyTeamChart";
import TargetVsSales from "@/components/Sales_Portal_Apps/TargetVsSales";

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
        setAllTeamData([]); // clear old
        let endPoint;

        if (bgId && buId && zId && rId && tId) {

            endPoint = "api/get_rollingdata_based_on_roll_t";
        } else if (bgId && buId && zId && rId && !tId) {
            if (tId === "" || tId === 0 || tId === null) {
                endPoint = "api/get_rollingdata_based_on_roll_t"; // tId is an empty string
            } else {
                endPoint = "api/get_rollingdata_based_on_roll_r"; // tId holds some value
            }

        } else if (bgId && buId && zId && !rId && !tId) {
            if (rId === "" || rId === 0 || rId === null) {
                endPoint = "api/get_rollingdata_based_on_roll_r"; // tId is an empty string
            } else {
                endPoint = "api/get_rollingdata_based_on_roll_z"; // tId holds some value
            }

        } else if (bgId && buId && !zId && !rId && !tId) {
            if (zId === "" || zId === 0 || zId === null) {
                endPoint = "api/get_rollingdata_based_on_roll_z"; // tId is an empty string
            } else {
                endPoint = "api/get_rollingdata_based_on_roll_bu"; // tId holds some value
            }
        } else if (bgId && !buId && !zId && !rId && !tId) {
            if (buId === "" || buId === 0 || buId === null) {
                endPoint = "api/get_rollingdata_based_on_roll_bu"; // tId is an empty string
            } else {
                endPoint = "api/get_rollingdata_based_on_roll_bg"; // tId holds some value
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
                    label: "Budget",
                    backgroundColor: "rgba(34, 197, 94, 1)",  // Full opacity (green-400)
                    backgroundColor: "rgba(34, 197, 94, 0.6)", // 60% opacity
                    data: allTableData.map((item) => item.budget),
                },
                {
                    label: "Budget",
                    backgroundColor: "rgba(59, 130, 246, 1)",  // Full opacity (blue)
                    backgroundColor: "rgba(59, 130, 246, 0.6)", // 60% opacity
                    data: allTableData.map((item) => item.target),
                },
                {
                    label: "Sales",
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

        if (typeof window === "undefined") return;

        const userInfo = JSON.parse(window.localStorage.getItem("userinfo"));


        if (userInfo?.role_id === 11) return;

        getAllSalesPlanStatus(
            filterState.yr || null,
            filterState.month || null,
            filterState.bgId || null,
            filterState.buId || null,
            filterState.zId || null,
            filterState.rId || null,
            filterState.tId || null,
        );

        getAllTeamStatus(
            filterState.yr || null,
            filterState.month || null,
            filterState.bgId || null,
            filterState.buId || null,
            filterState.zId || null,
            filterState.rId || null,
            filterState.tId || null,
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

    const [isCollapsed3, setIsCollapsed3] = useState(false); // State to manage collapsibility

    // Function to toggle collapsibility
    const toggleCollapse3 = () => {
        setIsCollapsed3(!isCollapsed3);
    };


    const [isCollapsed4, setIsCollapsed4] = useState(false); // State to manage collapsibility

    // Function to toggle collapsibility
    const toggleCollapse4 = () => {
        setIsCollapsed4(!isCollapsed4);
    };



    // Calculate the total for a specific data
    const totalRow = (data) => {
        return Object.values(data).reduce((acc, val) => acc + Number(val), 0);
    };

    const [bsLabelData, setBsLabelData] = useState(["Apr-24",
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
        "Mar-25"]);

    const generateFiscalLabels = (year) => {

        const labels = [];

        // Fiscal year starts in April of the given year
        for (let i = 3; i < 15; i++) {
            const date = moment(`${year}-04-01`).add(i - 3, 'months');
            labels.push(date.format("MMM-YY"));
        }
        setBsLabelData(labels)

    };
    useEffect(() => {
        generateFiscalLabels(filterState.yr)
    }, [filterState.yr])



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
    console.log("zxcv", localStorageItems)

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



    const getThreeTableData = async (yr, month, bgId, buId, zId, rId, tId) => {
        let endPoint = "SA_sales_Analytical";
        let paramsData;

        const tName = territoryData.find(item => Number(item.t_id) === Number(tId))?.territory_name || '';
        const rName = regionData.find(item => Number(item.r_id) === Number(rId))?.region_name || '';
        const zName = zoneData.find(item => Number(item.z_id) === Number(zId))?.zone_name || '';
        const buName = buData.find(item => Number(item.bu_id) === Number(buId))?.business_unit_name || '';

        // 🚫 Prevent API call if required descriptive names are missing
        if (
            (filterState.tId && filterState.tId !== "All" && !tName) ||
            (filterState.rId && !filterState.tId && !rName) ||
            (filterState.zId && !filterState.rId && !zName) ||
            (filterState.buId && !filterState.zId && !buName)
        ) {
            console.warn("Required descriptive name missing. API call aborted.");
            return;
        }

        // ✅ Build paramsData based on filters
        if (filterState.tId && filterState.tId !== "All") {
            paramsData = {
                year: yr || null,
                month: month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                r_id: rId === "All" || !rId ? null : rId,
                t_id: tId === "All" || !tId ? null : tId,
                t_des: tName,
                c_id: 1,
            };
        } else if (filterState.rId && !filterState.tId) {
            paramsData = {
                year: yr || null,
                month: month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                r_id: rId === "All" || !rId ? null : rId,
                r_des: rName,
                c_id: 1,
            };
        } else if (filterState.zId && !filterState.rId) {
            paramsData = {
                year: yr || null,
                month: month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                z_id: zId === "All" || !zId ? null : zId,
                z_des: zName,
                c_id: 1,
            };
        } else if (filterState.buId && !filterState.zId) {
            paramsData = {
                year: yr || null,
                month: month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                bu_des: buName,
                c_id: 1,
            };
        } else {
            paramsData = {
                year: yr || null,
                month: month === "All" || !month ? null : moment(month).format("YYYY-MM-DD"),
                bg_id: bgId === "All" || !bgId ? null : bgId,
                bu_id: buId === "All" || !buId ? null : buId,
                bu_des: buName,
                c_id: 1,
            };
        }

        // ✅ Safe to make API call now
        try {
            const respond = await axios.get(`${url}/api/${endPoint}`, {
                headers: headers,
                params: paramsData,
            });

            const apires = respond.data.data;
            console.log("plki", apires);

            setBrandData(apires.combined_brand);
            setCategoryData(apires.combined_category);
            setSegementData(apires.combined_segment);
        } catch (error) {
            console.log("vbn", error);
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

    const hasCalledAPI = useRef(false);

    useEffect(() => {
        const isBrowser = typeof window !== 'undefined';

        const hasAnyData =
            territoryData?.length > 0 ||
            zoneData?.length > 0 ||
            regionData?.length > 0 ||
            buData?.length > 0;

        if (isBrowser && hasAnyData && !hasCalledAPI.current) {
            const {
                yr = null,
                month = null,
                bgId = null,
                buId = null,
                zId = null,
                rId = null,
                tId = null,
                partyName = null,
            } = filterState;

            getThreeTableData({ yr, month, bgId, buId, zId, rId, tId, partyName });

            hasCalledAPI.current = true; // Prevent further calls
        }
    }, [
        territoryData,
        zoneData,
        regionData,
        buData,
        filterState.yr,
        filterState.month,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.partyName,
    ]); // empty dependency array ensures it runs only once


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

    const [userImg, setUserImg] = useState(null);
    useEffect(() => {
        // Ensure this runs only on the client
        if (typeof window === "undefined") return;
        setUserImg(localStorage.getItem("ImageLink"));
    }, []);


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
                    <span>Target VS Sales</span>
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
                    <img src={userImg} className="h-20 w-20 rounded-full text-orange-500 mt-4" size={80}></img>
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
                                        month: "All"
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
                {/* Collapsible Button */}
                {/* <button
                    className="px-4 py-2 mb-4 bg-blue-500 text-white rounded"
                    onClick={toggleCollapse}
                >
                    {isCollapsed ? 'Show Table' : 'Hide Table'}
                </button> */}

                {/* Table (Collapsible) */}

                <div className="overflow-x-auto">
                    <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center ">
                        <span className="flex-grow text-center">Target VS Sales</span>

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
                    {!isCollapsed && (<table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                        <thead>
                            <tr className="bg-blue-800 text-white">
                                <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Month</th>
                                <th className="border border-gray-200 px-2 py-2">Total Budget</th>
                                <th className="border border-gray-200 px-2 py-2">RSP Target</th>
                                <th className="border border-gray-200 px-2 py-2">Total Sales</th>
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
                                    <td className="border border-gray-200  px-2 py-2">{item.budget}</td>

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
                                    {Number(totalBudget).toFixed(2)}
                                </td>
                                <td className="border border-gray-200 px-2 py-2">
                                    {Number(totalTarget).toFixed(2)}
                                </td>
                                <td className="border border-gray-200 px-2 py-2">
                                    {Number(totalActual).toFixed(2) || "-"}
                                </td>
                                <td className="border border-gray-200 px-2 py-2">
                                    {totalPercentage} %
                                </td>
                            </tr>

                        </tbody>
                    </table>
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
                    {!isCollapsed2 && (

                        <div key={allTeamData.length}>
                            <table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-blue-800 text-white">
                                        <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Month</th>
                                        <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">BST</th>

                                        <th className="border border-gray-200  py-2">RSP Target</th>
                                        <th className="border border-gray-200  py-2">Total Sales</th>
                                        <th className="border border-gray-200  py-2">ACH%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTeamData.map((item) => (

                                        <tr className="font-bold" key={item.id || item.m_year}>

                                            <td className="border border-gray-200 w-24 px-2 py-2 whitespace-nowrap">
                                                {moment(item.m_year).format('MMMM')}
                                            </td>
                                            <td className="border border-gray-200 w-32 px-2 py-2">
                                                {
                                                    [
                                                        item.business_segment || "",
                                                        item.business_unit_name || "",
                                                        item.zone_name || "",
                                                        item.region_name || "",
                                                        item.territory_name || ""
                                                    ].reverse().find(value => value !== "")
                                                }
                                                <br />
                                                {
                                                    [
                                                        item.business_segment || "",
                                                        item.business_unit_hod_name || "",
                                                        item.zone_hod_name || "",
                                                        item.region_hod_name || "",
                                                        item.territory_hod_name || ""
                                                    ].reverse().find(value => value !== "")
                                                }


                                            </td>
                                            <td className="border border-gray-200 py-2">{item.target}</td>
                                            <td className="border border-gray-200 py-2">{item.actual}</td>
                                            <td className="border border-gray-200 py-2">
                                                {(item.actual / item.target * 100).toFixed(2)} %
                                            </td>
                                        </tr>
                                    ))}


                                    <tr className="font-bold bg-blue-800 text-white">
                                        <td className="border border-gray-200 w-24 px-2 py-2">MTD Total</td>
                                        <td className="border border-gray-200 w-32 px-2 py-2"></td>
                                        <td className="border border-gray-200 py-2">
                                            {Number(TeamTarget).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-200 py-2">
                                            {Number(TeamActual).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-200 py-2">
                                            {TeamPercentage} %
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    )}
                    <MyTeam
                        title={"Target Vs Sales"}
                        color={"bg-blue-800"}
                        data={allTeamData}
                    />
                </div>

            </div>

            <div className="overflow-x-auto">
                <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center ">
                    <span className="flex-grow text-center">Product Performance</span>

                    {isCollapsed4 ? (
                        <button onClick={toggleCollapse4} className="ml-auto">
                            <FiPlus />
                        </button>
                    ) : (
                        <button onClick={toggleCollapse4} className="ml-auto">
                            <FiMinus />
                        </button>
                    )}
                </h1>

                {!isCollapsed4 && (
                    <div>
                        <table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Category</th>
                                    <th className="border border-gray-200 px-2 py-2">YTD Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">MTD Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">Today Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">Contri %</th>


                                </tr>
                            </thead>
                            <tbody>
                                {categoryData.map((item) => (
                                    <tr className="font-bold">
                                        <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
                                            {item.product_category}

                                        </td>
                                        <td className="border border-gray-200  px-2 py-2">{item.total_ytd_new_budget_price_value
                                        }</td>

                                        <td className="border border-gray-200  px-2 py-2">{item.
                                            total_mtd_new_budget_price_value}</td>



                                        <td className="border border-gray-200  px-2 py-2">
                                            {item.total_today_new_budget_price_value}

                                        </td>
                                        <td className="border border-gray-200  px-2 py-2">
                                            {(item.total_ytd_new_budget_price_value / Number(productYtd).toFixed(2) * 100).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}



                                <tr className="font-bold bg-blue-800 text-white">
                                    <td className="border border-gray-200 px-2 py-2">Total</td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {productYtd != null && !isNaN(Number(productYtd)) ? Number(productYtd).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {productMtd != null && !isNaN(Number(productMtd)) ? Number(productMtd).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {productToday != null && !isNaN(Number(productToday)) ? Number(productToday).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        -
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <PPChart
                            title={"Target Vs Sales"}
                            color={"bg-blue-800"}
                            data={categoryData}
                        />



                        <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center ">
                            <span className="flex-grow text-center">Brand</span>


                        </h1>
                        <table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Brand</th>
                                    <th className="border border-gray-200 px-2 py-2">YTD Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">MTD Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">Today Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">Contri %</th>

                                </tr>
                            </thead>
                            {console.log("zzz", brandData)}
                            <tbody>
                                {brandData.map((item) => (
                                    <tr className="font-bold">
                                        <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
                                            {item.product_brand}

                                        </td>
                                        <td className="border border-gray-200  px-2 py-2">{item.total_ytd_new_budget_price_value
                                        }</td>

                                        <td className="border border-gray-200  px-2 py-2">{item.
                                            total_mtd_new_budget_price_value}</td>



                                        <td className="border border-gray-200  px-2 py-2">
                                            {item.total_today_new_budget_price_value}

                                        </td>
                                        <td className="border border-gray-200  px-2 py-2">
                                            {(item.total_ytd_new_budget_price_value / Number(brandYtd).toFixed(2) * 100).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}



                                {/* Row for Totals (appears at the end) */}
                                <tr className="font-bold bg-blue-800 text-white">
                                    <td className="border border-gray-200 px-2 py-2">Total</td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {brandYtd != null && !isNaN(Number(brandYtd)) ? Number(brandYtd).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {brandMtd != null && !isNaN(Number(brandMtd)) ? Number(brandMtd).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {brandToday != null && !isNaN(Number(brandToday)) ? Number(brandToday).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        -
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <BrandChart
                            title={"Target Vs Sales"}
                            color={"bg-blue-800"}
                            data={brandData}
                        />


                        <h1 className="font-bold text-center bg-yellow-300 flex justify-between items-center ">
                            <span className="flex-grow text-center">Segment</span>


                        </h1>
                        <table className="w-full border-collapse border border-gray-200 text-[10px] font-bold">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th className="border border-gray-200 px-2 py-2 whitespace-nowrap font-bold">Segment</th>
                                    <th className="border border-gray-200 px-2 py-2">YTD Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">MTD Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">Today Sale</th>
                                    <th className="border border-gray-200 px-2 py-2">Contri %</th>

                                </tr>
                            </thead>
                            <tbody>
                                {segmentData.map((item) => (
                                    <tr className="font-bold">
                                        <td className="border border-gray-200  px-2 py-2 whitespace-nowrap ">
                                            {item.product_segment
                                            }

                                        </td>
                                        <td className="border border-gray-200  px-2 py-2">{item.total_ytd_new_budget_price_value
                                        }</td>

                                        <td className="border border-gray-200  px-2 py-2">{item.
                                            total_mtd_new_budget_price_value}</td>



                                        <td className="border border-gray-200  px-2 py-2">
                                            {item.total_today_new_budget_price_value}

                                        </td>
                                        <td className="border border-gray-200  px-2 py-2">
                                            {(item.total_ytd_new_budget_price_value / Number(segementYtd).toFixed(2) * 100).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}



                                {/* Row for Totals (appears at the end) */}
                                <tr className="font-bold bg-blue-800 text-white">
                                    <td className="border border-gray-200 px-2 py-2">Total</td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {segementYtd != null && !isNaN(Number(segementYtd)) ? Number(segementYtd).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {segementMtd != null && !isNaN(Number(segementMtd)) ? Number(segementMtd).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        {segementToday != null && !isNaN(Number(segementToday)) ? Number(segementToday).toFixed(2) : "-"}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2">
                                        -
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <SegementChart
                            title={"Target Vs Sales"}
                            color={"bg-blue-800"}
                            data={segmentData}
                        />
                    </div>)}

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
                                        <th className="border border-gray-200 px-2 py-2">Product Cat</th>
                                        <th className="border border-gray-200 px-2 py-2">MTD Sale</th>
                                        <th className="border border-gray-200 px-2 py-2">Today's Sale</th>
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
                                                    <ul>
                                                        {item.category_result?.map((categoryItem, index) => (
                                                            <li key={index} className="border-b-2 border-black flex justify-left text-black p-1">
                                                                <input className="p-0 w-14 text h-6" value={categoryItem.category_name} disabled />
                                                            </li>
                                                        ))}
                                                        <li className="border-b-2 border-black flex justify-left text-black p-1 bg-yellow-200">
                                                            <input className="p-0 w-14 text h-6" value="Total" disabled />
                                                        </li>
                                                    </ul>
                                                </td>

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
                                                value={partySaleData?.reduce((acc, item) => acc + item.category_result?.reduce((innerAcc, categoryItem) => innerAcc + (parseFloat(categoryItem.fy) || 0), 0), 0).toFixed(2)} // Grand total FY value
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

            <TargetVsSales
                title={"Target Vs Sales"}
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
