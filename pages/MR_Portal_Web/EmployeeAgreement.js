import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import nmg from "./banner.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import Layout from "@/components/Layout1";
import moment from "moment";
import * as XLSX from "xlsx";
import { TbFileDownload } from "react-icons/tb";
const EmployeeAgreement = () => {
    const router = useRouter();
    const [data, setData] = useState([]);

    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };

    const getGridData = async () => {
        const { bgId,
            buId,
            zId,
            rId,
            tId,
            empCode, agreementLastDate } = filterState
        try {
            const respond = await axios.get(`${url}/api/get_emp_agreement_expire`, {
                headers: headers,
                params: {
                    t_id: tId ? tId : null,
                    bg_id: bgId ? bgId : null,
                    bu_id: buId ? buId : null,
                    z_id: zId ? zId : null,
                    r_id: rId ? rId : null,
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    emp_code: empCode ? empCode : null,
                    agreement_expire_days: agreementLastDate
                },
            });
            const apires = await respond.data.data;
            setData(apires)
            setSelectedRows({})


        } catch (error) {
            console.log("zaq", error)

            toast.error(error.response?.data?.message)

            setData([])
            setSelectedRows({})

        }
    };



    const [filterState, setFilterState] = useState({
        bgId: null,
        buId: null,
        zId: null,
        rId: null,
        tId: null,
        empCode: null,
        agreementLastDate: null
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

    const [allEmployee, setAllEmployee] = useState([]);
    const getAllEmployeeData = async (bgId, buId, zId, rId, tId) => {
        try {
            const respond = await axios.get(`${url}/api/get_employee`, {
                headers: headers,
                params: {

                    t_id: tId ? tId : null,
                    bg_id: bgId ? bgId : null,
                    bu_id: buId ? buId : null,
                    z_id: zId ? zId : null,
                    r_id: rId ? rId : null,
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    zrt: true,


                },
            });
            const apires = await respond.data.data;
            setAllEmployee(apires);
        } catch (error) { }
    };
    useEffect(() => {
        getAllEmployeeData(
            filterState.bgId,
            filterState.buId,
            filterState.zId,
            filterState.rId,
            filterState.tId
        );
    }, [
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
    ]);
    const { name } = router.query;
    const [selectedRows, setSelectedRows] = useState({});
    const handleCheckboxChange = (empcode) => {
        setSelectedRows((prev) => ({
            ...prev,
            [empcode]: !prev[empcode],
        }));
    };

    console.log("zzc", selectedRows)


    const handleUpdate = async () => {

        const selectedData = data.filter(item => selectedRows[item.empcode] === true);

        try {
            let endPoint = "api/update_emp_agreement_expire";
            const data = selectedData.map(item => ({
                emp_code: item.empcode,
                agg_start_date: moment(item.agg_enddate).add(1, 'days').toISOString(),
                accept_the_policy: false,
                agg_end_date: moment(item.agg_enddate)
                    .add(11, 'months')
                    .toISOString(),
                agreement: "Yes",
                user_name: window.localStorage.getItem("user_name"),
                renewal_date: moment()
                    .toISOString(),
            }));

            const respond = await axios
                .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
                    headers: headers,
                })
                .then((res) => {
                    if (!res) return;
                    toast.success(res.data.message);
                    router.push("/");
                });
        } catch (errors) {
            console.log("pop", errors)

        }
    }


    return (
        <Layout>
            <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
                <Toaster position="bottom-center" reverseOrder={false} />
                <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
                    <h2 className="font-arial font-normal text-3xl  py-2">
                        {name ? name : "Employee Agreement"}
                    </h2>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="search gap-2 mx-8">
                            <div className="container">

                            </div>
                        </div>
                        <h2>
                            <AiTwotoneHome
                                className="text-black-500"
                                size={34}
                                onClick={() => {
                                    router.push("/");
                                }}
                            ></AiTwotoneHome>
                        </h2>
                    </div>
                </div>

                <div className="flex flex-row gap-4  px-4 pr-8 pb-2">
                    <select
                        className="border rounded px-2 py-1  w-1/2 h-8"
                        id="stateSelect"
                        value={filterState.bgId}
                        onChange={(e) => {

                            setFilterState({
                                ...filterState,
                                bgId: e.target.value,
                                buId: "",
                                zId: "",
                                rId: "",
                                tId: "",
                            });

                        }}

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
                        className="border rounded px-2 py-1  w-1/2 h-8"
                        id="stateSelect"
                        value={filterState.buId}
                        onChange={(e) => {

                            setFilterState({
                                ...filterState,
                                buId: e.target.value,
                                zId: "",
                                rId: "",
                                tId: "",
                            });

                        }}

                    >
                        <option value={""}>- All Business Unit -</option>

                        {buData.map((item, idx) => (
                            <option value={item.bu_id} key={idx}>
                                {item.business_unit_name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border rounded px-2 py-1  w-1/2 h-8"
                        id="stateSelect"
                        value={filterState.zId}
                        onChange={(e) => {

                            setFilterState({
                                ...filterState,
                                zId: e.target.value,
                                rId: "",
                                tId: "",
                            });

                        }}

                    >

                        <option value={""}>- All Zone -</option>
                        {allZoneData.map((item, idx) => (
                            <option value={item.z_id} key={idx}>
                                {item.zone_name}
                            </option>
                        ))}

                    </select>

                    <select
                        className="border rounded px-2 py-1  w-1/2 h-8"
                        id="stateSelect"
                        value={filterState.rId}

                        onChange={(e) => {

                            setFilterState({
                                ...filterState,
                                rId: e.target.value,
                                tId: "",
                            });

                        }}
                    >
                        <option value={""}>-All Region -</option>

                        {allRegionData.map((item, idx) => (
                            <option value={item.r_id} key={idx}>
                                {item.region_name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border rounded px-2 py-1 w-1/2 h-8"
                        id="stateSelect"
                        value={filterState.tId}

                        onChange={(e) =>
                            setFilterState({
                                ...filterState,
                                tId: e.target.value,
                            })
                        }
                    >
                        <option value="">- All Territory -</option>

                        {allTerritoryData.map((item, idx) => (
                            <option value={item.t_id} key={idx}>
                                {item.territory_name}
                            </option>
                        ))}
                    </select>
                    <select
                        id="attendanceType"
                        className="border rounded px-2 py-1 w-full h-8"
                        value={filterState.empCode}
                        onChange={(e) =>
                            setFilterState({ ...filterState, empCode: e.target.value })
                        }
                    >
                        <option value={""}>MR Executive</option>
                        {allEmployee.map((item) => (
                            <option value={item.empcode}>
                                {item.fname} {item.mname} {item.lname} {item.empcode}
                            </option>
                        ))}
                    </select>

                    <input
                        id="attendanceType"
                        className="border rounded px-2 py-1 w-12 h-8"
                        value={filterState.agreementLastDate}
                        onChange={(e) =>
                            setFilterState({ ...filterState, agreementLastDate: e.target.value })
                        }

                    />

                    <button
                        type="button"
                        className="border rounded  py-1  px-2 w-16 h-8 bg-blue-400"
                        onClick={() => getGridData()}
                    >
                        View
                    </button>


                </div>

                <div className=" overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-[98%] mx-4 no-scrollbar">
                    <table className="min-w-full divide-y border- divide-gray-200 ">
                        <thead className="border-b w-max">
                            <tr className="bg-gray-50 font-arial w-max">

                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Emp Code
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Name
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Joining Date
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Teritory
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Head Quater
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Start Date
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    End Date
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Agreement Status
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    User Accepted
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Renew
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Period
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Start Date
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    End Date
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Agreement Status
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    User Accepted
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    User Name
                                </th>
                                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                                    Renewal Date
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                            {data.map((item, idx) => (
                                <tr className="dark:border-2" key={idx}>
                                    <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs">
                                        {item.empcode}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {item.fname + item.mname + item.lname}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {moment(item.joining_date).format("DD MM YYYY")}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {item.t_des}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {item.reporting_hq}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {moment(item.agg_startdate).format("DD MM YYYY")}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {moment(item.agg_enddate).format("DD MM YYYY")}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {item.aggrement}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        {item.accept_the_policy}
                                    </td>
                                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedRows[item.empcode]}
                                            onChange={() => handleCheckboxChange(item.empcode)}
                                        />
                                    </td>
                                    {selectedRows[item.empcode] && (
                                        <>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                11
                                            </td>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                {moment(item.agg_enddate).add(1, 'days').format("DD MM YYYY")}
                                            </td>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                {moment(item.agg_enddate)
                                                    .add(11, 'months')
                                                    .format("DD MM YYYY")}
                                            </td>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                Yes
                                            </td>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                false
                                            </td>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                {window.localStorage.getItem("user_name")}
                                            </td>
                                            <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                                {moment().format("DD MM YYYY")}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-start gap-2 mb-4">
                        <button
                            className="bg-green-700 px-4 py-1 text-white cursor-pointer"
                            onClick={() => {
                                handleUpdate()
                            }}>Update</button> <button className="bg-red-700 px-4 py-1 text-white cursor-pointer" onClick={() => router.push("/")}>Close</button>
                    </div>
                </div>

            </div>


        </Layout >
    );
};

export default EmployeeAgreement;
