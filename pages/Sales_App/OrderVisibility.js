import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Doughnut, Bar } from 'react-chartjs-2';
import GridOne from '@/components/Sales_Portal_Apps/OrderVisibility/GridOne';
import GridThree from '@/components/Sales_Portal_Apps/OrderVisibility/GridThree';
import GridTwo from '@/components/Sales_Portal_Apps/OrderVisibility/GridTwo';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Popover } from "@headlessui/react";
import OrdersDashboard from '@/components/Sales_Portal_Apps/OrderVisibility/OrderDashboard';
import InventoryDashboard from '@/components/Sales_Portal_Apps/OrderVisibility/InventoryDashboard';
import LateOrders from '@/components/Sales_Portal_Apps/OrderVisibility/LateOrders';
import { url } from "@/constants/url";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title

);

const OrderVisibility = () => {

    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    // Data for Doughnut Chart (Risks)
    // Colors are chosen to reflect a blueish theme as seen in the image's doughnut chart
    const doughnutChartData = {
        labels: [
            'Pickup Delay Risk',
            'Delivery Delay Risk',
            'Order Cut Predicted',
            'Tracking at Risk',
        ],
        datasets: [
            {
                label: 'Risks',
                data: [300, 500, 100, 200], // Example data
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)', // Light Blue
                    'rgba(25, 118, 210, 0.7)', // Medium Blue
                    'rgba(13, 71, 161, 0.7)',  // Dark Blue
                    'rgba(0, 47, 108, 0.7)',   // Darkest Blue / Alternative
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(25, 118, 210, 1)',
                    'rgba(13, 71, 161, 1)',
                    'rgba(0, 47, 108, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // We are using a custom legend
            },
        },
    };

    // Data for Bar Chart (Order Risks by Status)
    // Using example data and colors inspired by the image
    const barChartData = {
        labels: ['Open', 'Updated', 'Pre-Dispatch', 'Dispatch', 'In-Transit', 'Delivered'],
        datasets: [
            {
                label: 'Low Risk', // Example, image doesn't specify legend for bar stacks
                data: [65, 59, 80, 81, 56, 55], // Example data
                backgroundColor: 'rgba(220, 220, 220, 0.7)', // Light Grayish
                borderColor: 'rgba(220, 220, 220, 1)',
                borderWidth: 1,
            },
            {
                label: 'Medium Risk',
                data: [28, 48, 40, 19, 86, 27], // Example data
                backgroundColor: 'rgba(255, 159, 64, 0.7)', // Orange/Yellowish
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
            {
                label: 'High Risk',
                data: [12, 30, 25, 50, 45, 30], // Example data
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // Reddish
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', // Or 'bottom', 'left', 'right'
                labels: {
                    boxWidth: 10,
                    font: {
                        size: 10,
                    }
                }
            },
            title: {
                display: false, // Title is handled by our own h3
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    }
                }
            },
            y: {
                stacked: true,
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)', // Light grid lines
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    beginAtZero: true,
                }
            },
        },
    };

    const orderRiskData = {
        labels: ["At Risk", "Safe"],
        datasets: [
            {
                data: [1475, 5317 - 1475],
                backgroundColor: ["#ff6b6b", "#4bc0c0"],
                borderWidth: 0,
            },
        ],
    };

    const inventoryDonutData = {
        labels: ["On-Hand", "In-Transit"],
        datasets: [
            {
                data: [30, 21],
                backgroundColor: ["#36a2eb", "#9ad0f5"],
                borderWidth: 0,
            },
        ],
    };


    const [filterState, setFilterState] = useState({
        bgId: null,
        buId: null,
        zId: null,
        rId: null,
        wId: null,
        wDes: null,
        tId: null,
        yr: "",
        month: "", // e.g., "Jun"
        partyName: ""
    });
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
                    yr: moment().year(),
                    month: moment().format('MMM'), // e.g., "Jun"
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
                    yr: moment().year(),
                    month: moment().format('MMM'), // e.g., "Jun"
                });
                break;
            case 4:
                setLocalStorageItems({
                    cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id || "",
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id || "",
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id || "",
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id || "",
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id || "",
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id || "",
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
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id || "",
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id || "",
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id || "",
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id || "",
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id || "",
                    yr: moment().year(),
                    month: moment().format('MMM'), // e.g., "Jun"
                });
                break;
            case 3:
                setLocalStorageItems({
                    cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id || "",
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id || "",
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id || "",
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id || "",
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id || "",
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id || "",
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
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id || "",
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id || "",
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id || "",
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id || "",
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id || "",
                    yr: moment().year(),
                    month: moment().format('MMM'), // e.g., "Jun"
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
                    yr: moment().year(),
                    month: moment().format('MMM'), // e.g., "Jun"
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
                    yr: moment().year(),
                    month: moment().format('MMM'), // e.g., "Jun"
                });
                break;
        }
    }, []);

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





    // const toggleDropdown = () => {
    //   setIsDropdownOpen(!isDropdownOpen);
    // };

    const [isFilterVisible, setIsFilterVisible] = useState(false);


    const [orderDashboardData, setOrderDashboardData] = useState([])
    const getOrderDashboardData = async (yr, month, bgId, buId, zId, rId, tId) => {
        console.log("Selected Month:", month);
        const monthMap = {
            Jan: 1,
            Feb: 2,
            Mar: 3,
            Apr: 4,
            May: 5,
            Jun: 6,
            Jul: 7,
            Aug: 8,
            Sep: 9,
            Oct: 10,
            Nov: 11,
            Dec: 12,
        };

        let monthValue = null;


        monthValue = moment(month).format("YYYY-MM-DD");


        const paramsData = {
            year: yr || null,
            month: monthValue,
            bg_id: bgId === "All" || !bgId ? null : bgId,
            bu_id: buId === "All" || !buId ? null : buId,
            z_id: zId === "All" || !zId ? null : zId,
            r_id: rId === "All" || !rId ? null : rId,
            t_id: tId === "All" || !tId ? null : tId,
            c_id: 1,
        };

        try {
            const respond = await axios.get(`${url}/api/get_order_visibilty_data`, {
                headers: headers,
                params: paramsData,
            });
            const apires = respond.data.data;
            console.log("API Response:", apires);
            setOrderDashboardData(apires);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        if (filterState.yr && filterState.month) {
            getOrderDashboardData(filterState.yr || null,
                filterState.month || null,
                filterState.bgId || null,
                filterState.buId || null,
                filterState.zId || null,
                filterState.rId || null,
                filterState.tId || null,
                filterState.partyName || null);
        }
        else { return }

    }, [

        filterState.yr,
        filterState.month,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,


    ])

    console.log("cvf", orderDashboardData)

    const [overviewData, setOverviewData] = useState([])

    const [allMonthData, setAllMonthData] = useState([])
    const getAllTransactionYear = async (yr) => {
        try {
            const respond = await axios.get(`${url}/api/get_rp`, {
                headers: headers,
                params: { status: true, year: yr },
            });
            const apires = await respond.data.data;


            // Get unique months
            const uniqueMonths = [...new Set(apires.map((item) => item.m_year))];

            setAllMonthData(uniqueMonths);

            // Get last item safely
            const lastMonth = uniqueMonths.length > 0 ? uniqueMonths[uniqueMonths.length - 1] : "";

            // Update filterState
            setFilterState((prev) => ({
                ...prev,
                month: lastMonth
            }));
        } catch (error) { }



    };

    useEffect(() => {
        if (!filterState.yr) return;
        getAllTransactionYear(filterState.yr || moment().format("YYYY"));

    }, [filterState.yr]);
    return (
        <div className="max-w-md mx-auto  bg-white rounded-xl shadow-xl space-y-6 border border-gray-200">

            <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col bg-blue-600  ">
                <span className="text-black flex flex-row gap-4 font-bold   ">
                    <FaArrowLeftLong
                        className="self-center text-white "
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Home",
                            })
                        }
                    />
                    <span className="text-white">Order Visibility</span>
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
            <div className='max-w-md mx-auto p-4 bg-white rounded-xl shadow-xl space-y-6 border border-gray-200'>
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

                                >
                                    <option value="" className="font-bold" >
                                        -- Select --
                                    </option>
                                    <option value="2024" className="font-bold" >
                                        2024
                                    </option>
                                    <option value="2025" className="font-bold" >
                                        2025
                                    </option>
                                    <option value="2026" className="font-bold" >
                                        2026
                                    </option>

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

                                >
                                    <option value="" className="font-bold">
                                        -- Select --
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
                <OrdersDashboard orderDashboardData={orderDashboardData} />
                <InventoryDashboard orderDashboardData={orderDashboardData} filterState={filterState} />
                <div className='h-80'>
                    <GridTwo orderDashboardData={orderDashboardData} setNewData={setOverviewData} />
                </div>
                <GridThree gridData={overviewData} />

                <GridOne orderDashboardData={orderDashboardData} />

                <LateOrders />
            </div>


        </div>
    );
};

export default OrderVisibility;