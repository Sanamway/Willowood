import React, { useState, useEffect } from "react";
import { url } from "@/constants/url";

import { IoIosBasket } from "react-icons/io";
import { TbFileDownload } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import moment from "moment";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { FcNews } from "react-icons/fc";
import { IoLocationOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { FcNeutralTrading } from "react-icons/fc";
import axios from "axios";
import Select from "react-select";

import * as FileSaver from 'file-saver'
import * as  XLSX from 'xlsx'

const Dashboard = () => {

    const data = [
        {
            material_code: "MAT001",
            uom: "KG",
            price: "120.50",
            value: "0.00", // This can be calculated dynamically based on Qty
        },
        {
            material_code: "MAT002",
            uom: "Litre",
            price: "80.75",
            value: "0.00",
        },
        {
            material_code: "MAT003",
            uom: "Piece",
            price: "45.00",
            value: "0.00",
        },
        {
            material_code: "MAT004",
            uom: "Box",
            price: "250.00",
            value: "0.00",
        },
    ];

    const [modalData, setModalData] = useState({})


    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [localStorage, setLocalStorage] = useState({
        zone: "",
        region: "",
        businessUnit: "",
        businessSegment: "",
        empCode: "",
        empName: ""
    })

    useEffect(() => {
        if (!isClient) return;

        const userInfo = JSON.parse(window.localStorage.getItem("userinfo") || "{}");
        const roleId = userInfo?.role_id;
        const uid = JSON.parse(window.localStorage.getItem("uid") || "null");

        const storageData = {
            roleId: userInfo?.role_id,
            zone: userInfo.zone_name,
            region: userInfo.region_name,
            businessUnit: userInfo.business_unit_name,
            businessSegment: userInfo.business_segment_name,
            empCode: window.localStorage.getItem("emp_code"),
            empName: window.localStorage.getItem("user_name"),
            bgId: userInfo?.bg_id,
            buId: userInfo?.bu_id || null,
            rId: userInfo?.r_id || null,
            zId: userInfo?.z_id || null,
            tId: userInfo?.t_id || null,
            uId: uid,
        };

        switch (roleId) {
            case 5:
                setLocalStorage(storageData);
                getAllDepotData({ region_name: userInfo.region_name, r_id: userInfo?.r_id, });
                break;
            case 4:
                setLocalStorage(storageData);
                getAllDepotData({ zone_name: userInfo.zone_name, z_id: userInfo?.z_id });
                break;
            case 3:
                setLocalStorage(storageData);
                getAllDepotData({ business_unit_name: userInfo.business_unit_name, bu_id: userInfo?.bu_id });
                break;
            case 10:
                setLocalStorage({ ...storageData, buId: null, rId: null, zId: null, tId: null });
                getAllDepotData({ business_segment_name: userInfo.business_segment_name, bg_id: userInfo?.bg_id });
                break;
            default:
                setLocalStorage(storageData);
                break;
        }
    }, [isClient]);

    const getUserPosition = () => {
        if (!isClient) return
        const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

        switch (roleId) {

            case 5:


                return <span><strong>Region</strong>: {localStorage.region}</span>
                break;
            case 4:


                return <span><strong>Zone</strong>: {localStorage.zone}</span>
                break;
            case 3:


                return <span><strong>Business Unit</strong>: {localStorage.businessUnit}</span>
                break;
            case 10:

                return <span><strong>Business Segment</strong>: {localStorage.businessSegment}</span>
                break;
            default:

                return
                <span><strong>Region</strong>: XXXXXX</span>
                break;
        }

    }


    const [filtersData, setFiltersData] = useState({
        depotCode: "",
        storeLocation: "",
    })


    const [wareHouseFilterOptions, setWarehouseFilterOptions] = useState([])

    const getAllDepotData = async (data) => {
        console.log("zaq", data)
        try {
            const respond = await axios.get(`${url}/api/get_dipot`, {
                headers: headers,
                params: data,
            });

            const apires = await respond.data.data;
            setWarehouseFilterOptions(apires);
            if (data.region_name) {
                setFiltersData({ ...filtersData, depotCode: apires[0].depot_code })
                getAllStoreLocationData(apires[0].depot_code)
            }


        } catch (error) {
            console.log("zyui", error)
        }
    };

    const [storeLocationOptions, setStoreLocationOptions] = useState([])
    const getAllStoreLocationData = async (data) => {


        try {
            const respond = await axios.get(`${url}/api/get_warehousestockdata`, {
                headers: headers,
                params: {
                    depot_code: data
                },
            });

            const apires = await respond.data.data;
            setStoreLocationOptions(apires);




        } catch (error) {
            console.log("zyui", error)
        }
    };



    console.log("pop", filtersData)








    const [openModal, setOpenModal] = useState(false)


    const [inputFilter, setInputFilter] = useState("")
    const [searchBy, setSearchBy] = useState("")
    const [tableOption, setTableOption] = useState([])


    const getSearchData = async (value) => {
        let params
        switch (searchBy) {
            case "all":
                params = {
                    c_id: 1,
                    depot_code: filtersData.depotCode,
                    warehouse_code: filtersData.storeLocation
                }
                break;
            case "brand":
                params = {
                    c_id: 1,
                    brand: value,
                    depot_code: filtersData.depotCode,
                    warehouse_code: filtersData.storeLocation
                }
                break;
            case "category":
                params = {
                    c_id: 1,
                    category: value,
                    depot_code: filtersData.depotCode,
                    warehouse_code: filtersData.storeLocation
                }
                break;

            case "material_name":
                params = {
                    c_id: 1,
                    material_name: value,
                    depot_code: filtersData.depotCode,
                    warehouse_code: filtersData.storeLocation
                }
                break;
            case "material_code":
                params = {
                    c_id: 1,
                    material_code: value,
                    depot_code: filtersData.depotCode,
                    warehouse_code: filtersData.storeLocation
                }
                break;


            default:
                break;
        }
        try {
            const response = await axios.get(`${url}/api/get_warehousestockdata`, {
                params: params,
                headers,
            });

            const apires = response.data.data;

            setTableOption(apires)


        } catch (error) {
            console.error("Error fetching data:", error);
            setTableOption([]);
        }
    };


    useEffect(() => {
        getSearchData()

    }, [
        filtersData.depotCode, filtersData.storeLocation
    ])



    const handledownloadBrandExcel = (data) => {
        console.log("mlop", data);
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `Live_Stock.xlsx`);
    };

    return (

        <div className="bg-gray-200">
            {/* Header Section */}
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-400 ">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Home",
                            })
                        }
                    />
                    <span className="flex flex-row gap-2 justify-center items-center">   <span>Warehouse Live Stock Report</span></span>
                </span>
                <span className="text-white self-center">
                    <Popover as="div" className="relative border-none outline-none mt-2">
                        {({ open }) => (
                            <>
                                <Popover.Button className="focus:outline-none"></Popover.Button>
                                <Popover.Panel
                                    as="div"
                                    className={`${open ? "block" : "hidden"} absolute z-40 top-1 right-0 mt-2 w-36 bg-white text-black border rounded-md shadow-md`}
                                >
                                    <ul className="text-black text-sm flex flex-col gap-4 py-4 cursor-pointer">
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2 items-center">
                                            <FaHandsHelping className="text-[#626364] cursor-pointer" size={20} />
                                            Help
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2 items-center ">
                                            <IoSettingsOutline className="text-[#626364] cursor-pointer" size={20} />
                                            Setting
                                        </li>
                                    </ul>
                                </Popover.Panel>
                            </>
                        )}
                    </Popover>
                </span>
            </div>

            {/* Billing Information Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-1  mx-2 mt-2">
                {/* Header Row */}

                {/* Billing Details */}
                <div className="text-sm space-y-2">

                    <div className="flex justify-between ">
                        {getUserPosition()}
                    </div>
                    <div className="flex    justify-between w-full ">
                        {/* Warehouse Code */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold">Warehouse Code</span>
                            <select
                                className="w-32 px-3 py-2 h-8 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                                value={filtersData.depotCode}
                                disabled={localStorage.roleId === 5}
                                onChange={(e) => {
                                    getAllStoreLocationData(e.target.value)
                                    setFiltersData({ ...filtersData, depotCode: e.target.value })
                                }}
                            >
                                <option value="">-- Select --</option>
                                {wareHouseFilterOptions.map((item, index) => (
                                    <option key={index} value={item.depot_code}>{item.depot_code}</option>
                                ))}
                            </select>
                        </div>

                        {/* Store Location */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold">Store Location</span>
                            <select
                                className="w-32 px-3 py-2  h-8  border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                                value={filtersData.storeLocation}

                                onChange={(e) => {
                                    setFiltersData({ ...filtersData, storeLocation: e.target.value })
                                }}
                            >
                                <option value="">-- Select --</option>
                                {storeLocationOptions.map((item, index) => (
                                    <option key={index} value={item.warehouseCode}>{item.warehouseCode}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span><strong>Warehouse Name</strong>: {wareHouseFilterOptions.filter((item) => item.depot_code === filtersData.depotCode)[0]?.depot_name}</span>
                        <span><TbFileDownload size={28} className="text-green-400" onClick={() => handledownloadBrandExcel(tableOption)} /></span>
                    </div>


                </div>
            </div>


            {/* Search & Dropdown Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-1  mx-2 mt-2 flex flex-row gap-4 ">
                <select
                    className="w-36 px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-indigo-500"
                    id="citySelect"
                    value={searchBy}
                    onChange={(e) => {
                        const selectedValue = e.target.value.trim();
                        setTableOption([])
                        setSearchBy(selectedValue);
                    }}

                >

                    <option value="">All Material</option>
                    <option value="brand">Brand</option>
                    <option value="category">Category</option>
                    <option value="material_name">Material Name</option>
                    <option value="mat_code">Mat Code</option>

                </select>

                <div className="relative w-3/4">

                    <input
                        className="w-full px-3 py-1.5 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b-2 focus:border-indigo-500"
                        value={inputFilter}

                        disabled={searchBy === ""}
                        onChange={(e) => {
                            setInputFilter(e.target.value)
                            getSearchData(e.target.value)
                        }} />


                </div>

                {console.log("lop", tableOption)}
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto  mx-2">
                <table className="min-w-full divide-y border divide-gray-200">
                    <thead className="border-b w-max bg-yellow-300">
                        <tr className="font-arial w-max text-gray-700">
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Item Description</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">UOM</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Case</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Qty</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider"></th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs">
                        {tableOption?.map((item, idx) => (
                            <tr key={idx} className="border-b">

                                <td className="px-4 py-2 text-left whitespace-nowrap flex items-center gap-2">
                                    <div>

                                        {item.materialNumber}  - {item.brandDesc} -  {item.categoryDesc}
                                        <br />
                                    </div>
                                </td>


                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 bg-gray-100 border rounded-md cursor-not-allowed text-gray-600"
                                        value={item?.material_result?.uom}
                                        disabled
                                    />
                                </td>


                                <td className="px-4 py-2 text-left whitespace-nowrap  ">
                                    {item.case}
                                </td>


                                <td className="px-4 py-2 text-left whitespace-nowrap   ">
                                    {item.quantity}
                                </td>


                                <td className="px-4 py-2 text-left whitespace-nowrap text-xs ">
                                    <button
                                        onClick={() => {
                                            setOpenModal(true)
                                            setModalData(item)
                                        }


                                        }
                                        className="text-blue-500  hover:text-blue-700 font-semibold py-2 px-2 border rounded-md bg-transparent border-blue-500 hover:bg-blue-500 hover:text-white"
                                    >
                                        View Details
                                    </button>
                                </td>

                            </tr>
                        ))}


                    </tbody>

                </table>


            </div>
            <span className="italic ml-2 bg-white-400 ml-2 text-xs">
                {tableOption.length ? `Live Stock updated: ${moment(tableOption[0].liveDateTime).format("DD-MM-YYYY")} Time: ${moment(tableOption[0].liveDateTime).format("hh:mm A")}` : `Live Stock updated: - Time: -`}
            </span>

            {/* Delivery Address & Special Instructions */}

            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpenModal(false)}>
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {/* Modal Title */}
                                    <Dialog.Title className="text-[1.1rem] font-bold leading-6 text-center text-gray-900 lg:text-[1.5rem]">
                                        View Details - Material Code
                                    </Dialog.Title>

                                    {/* Scrollable Table Container */}
                                    <div className="mt-4 overflow-x-auto">
                                        <div className="min-w-max w-full">
                                            {/* Header */}
                                            <div className="grid grid-cols-10 bg-blue-600 text-white font-semibold p-2 rounded-t-lg text-xs md:text-sm">
                                                <div className="px-2 py-2 text-center">Loc</div>
                                                <div className="px-2 py-2 text-center">Batch</div>
                                                <div className="px-2 py-2 text-center">Case</div>
                                                <div className="px-2 py-2 text-center">Qty</div>
                                                <div className="px-2 py-2 w-24 text-center">Exp Date</div>
                                                <div className="px-2 py-2 w-24 text-center">MFG Date</div>
                                                <div className="px-2 py-2 text-center">6M</div>
                                                <div className="px-2 py-2 text-center">12M</div>
                                                <div className="px-2 py-2 text-center">1Y</div>
                                                <div className="px-2 py-2 text-center">Status</div>
                                            </div>

                                            {/* Table Rows */}
                                            <div className="divide-y divide-gray-300 bg-white">
                                                <div className="grid grid-cols-10 p-2 border-b text-center text-xs md:text-sm">
                                                    <div className="px-2 py-2">{modalData.loc}</div>
                                                    <div className="px-2 py-2">{modalData.batch}</div>
                                                    <div className="px-2 py-2">{modalData.case}</div>
                                                    <div className="px-2 py-2">{modalData.quantity}</div>
                                                    <div className="px-2 py-2 w-24">{moment(modalData.expDate).format("DD-MM-YYYY")}</div>
                                                    <div className="px-2 py-2 w-24">{moment(modalData.mfgDate).format("DD-MM-YYYY")}</div>
                                                    <div className="px-2 py-2">{modalData.sixMonths}</div>
                                                    <div className="px-2 py-2">{modalData.twelveMonths}</div>
                                                    <div className="px-2 py-2">{modalData.greaterThanOneYear}</div>
                                                    <div className={`px-2 py-2 ${modalData.quantity ? "text-green-500" : "text-red-500"}`}>
                                                        {modalData.quantity ? "Yes" : "No"}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>

                </Dialog>
            </Transition>
        </div>



    );
};

export default Dashboard;
