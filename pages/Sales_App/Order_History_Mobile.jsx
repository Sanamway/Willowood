import React, { useState, useEffect } from "react";
import FilterComponent from "../../components/Sales_Portal_Apps/OrderHistoryFilterComponent";

import { FcInTransit } from "react-icons/fc";

import { useRouter } from "next/router";

import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import moment from "moment";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { url } from "@/constants/url";
import axios from "axios";
import * as XLSX from "xlsx";
import { IoDownloadOutline } from "react-icons/io5";

import { IoEyeOutline } from "react-icons/io5";
const Dashboard = () => {
    const [refresh, setRefresh] = useState(false)


    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const router = useRouter();
    const [allOrderInfoData, setAllOrderInfoData] = useState([
    ]);
    const allOrderData = useSelector(
        (state) => state.allOrdersInfo.allOrderInfoData
    );
    useEffect(() => {
        setAllOrderInfoData(allOrderData)
    }, [allOrderData])



    const [orderedItems, setOrderedItems] = useState({});

    const [openModal, setOpenModal] = useState(false)
    const handleOrderItemModal = async (item, type) => {
        if (type === "View Order Item") {
            setOpenModal(true)
            setOrderedItems(item)
        }
        else if (
            type === "View Order Activity"
        ) {
            router.push({
                pathname: "/Sales_App/Order_Treking",
                query: {
                    sap_code: item.kunnr_sold || "",
                    order_no: item.order_no || "",
                    party_name: item.party_name || "",
                    address: item.del_address || "",
                    amount: item.order_value || "",
                    delCode: item.kunnr_ship || "",
                    delParty: item.party_name || "",
                    delAddress: item.postal_ship || "",
                    depotCode: item.werks || "",
                    depotName: item.depot_name || ""


                },
            });
        }
        else {
            return
        }
    };
    const handleApproveOrder = (item) => {

        router.push({
            pathname: "/Sales_App/Order_Approval",
            query: {
                sap_code: item.kunnr_sold || "",
                order_no: item.order_no || "",
                party_name: item.party_name || "",
                address: item.del_address || "",
                amount: item.order_value || "",
                delCode: item.kunnr_ship || "",
                delParty: item.party_name || "",
                delAddress: item.postal_ship || "",
                depotCode: item.werks || "",
                depotName: item.depot_name || ""


            },
        })

    }



    const dowloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(allOrderInfoData.map((item) => {
            return {
                ["SAP Code"]: item.kunnr_sold,
                ["Order No"]: item.order_no,
                ["Order Date"]: moment(item.order_dt).format("DD-MM-YYYY"),
                ["Delivery Date"]: moment(item.expected_del_date).format("DD-MM-YYYY"),
                ["Buyer"]: item.party_name,
                ["Total Items"]: item.orderItems.length,
                ["Order Amount"]: item.order_value,
                ["Status"]: item.ord_status,
            }
        }));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `Order_history_mobile.xlsx`);
    }


    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");




    return (

        <div className="flex flex-col gap-2 ">
            <div className=" font-bold text-lg h-4 flex flex-col  ">
                <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4 bg-blue-600  shadow-lg lg:flex-col  ">
                    <span className="text-black flex flex-row gap-4 font-bold text-white  ">
                        <FaArrowLeftLong
                            className="self-center "
                            onClick={() =>
                                router.push({
                                    pathname: "/Sales_App/Home",
                                })
                            }
                        />
                        <FcInTransit
                            size={25}
                            className="self-center "

                        />
                        <span className="text-sm self-center"> My Order List</span>
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
                <div className="p-2 flex flex-row gap-2  w-full  justify-end flex-wrap font-normal text-[8px]">

                    <button
                        onClick={() => { dowloadExcel() }}
                        className=" h-8 text-[12px] bg-blue-600 flex items-center text-white-500 whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        <LuRefreshCw className="mr-2" />    Generate Report
                    </button>

                    <button
                        onClick={() => setRefresh(!refresh)}
                        className=" h-8 text-[12px]  bg-blue-600 flex items-center text-white-500 whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        <LuRefreshCw className="mr-2" />   Refresh
                    </button>

                </div>{" "}

                <div className="w-full text-[12px]">
                    <FilterComponent refresh={refresh} />
                </div>

                <h5 className="ml-2">List of Order</h5>
                <div className="flex flex-col justify-between m-2 gap-4  ">
                    <div className="grid gap-4">
                        {allOrderInfoData?.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col gap-2 text-sm bg-gray-100 shadow-lg rounded-md p-4"
                            >
                                {/* Header with Color Code */}
                                <div className={`${item.status_details?.color_code} flex justify-between w-full p-2 rounded-md text-white font-bold`}>
                                    <span>SAP Code: {item.kunnr_sold}</span>
                                    <span>Order No: {item.order_no}</span>
                                </div>

                                {/* Order Info */}
                                <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                    <span>
                                        SAP Order No.:<br />{item.sap_order_no}
                                    </span>
                                    <span>
                                        Order Date:<br />{moment(item.order_dt).format("DD-MM-YYYY")}
                                    </span>
                                    <span>
                                        Delivery Date:<br />{moment(item.expected_del_date).format("DD-MM-YYYY")}
                                    </span>
                                </div>

                                {/* Buyer Info */}
                                <div className="flex w-full justify-between border-b border-gray-300 pb-2">
                                    <h5>Buyer: {item.party_name}</h5>
                                </div>

                                {/* Total Items and Qty */}
                                <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                    <span>Total Items: {item.orderItems.length}</span>
                                    <span>
                                        Total Qty:{" "}
                                        {item.orderItems.reduce((sum, currentItem) => {
                                            return parseInt(sum) + parseInt(currentItem.qty);
                                        }, 0)}
                                    </span>
                                </div>

                                {/* Order Value */}
                                <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                    <span>Order Amount</span>
                                    <span>₹{item.order_value}</span>
                                </div>

                                {/* Status */}
                                <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                    <span>Status</span>
                                    <span>{item.ord_status}</span>
                                </div>

                                {/* Footer Buttons with Download */}
                                <div className="p-2 flex flex-row gap-1 justify-center w-full flex-wrap font-normal text-[8px]">
                                    {["View Order Item", "View Order Activity"].map((btnText) => (
                                        <button
                                            key={btnText}
                                            className="h-8 bg-blue-600 text-[12px] flex items-center justify-end text-white px-2 py-1 rounded-sm shadow-md"
                                            onClick={() => handleOrderItemModal(item, btnText)}
                                        >
                                            {btnText}
                                        </button>
                                    ))}
                                    {item.ord_status === "Order Credit Block" && <button

                                        className="h-8 bg-blue-600 text-[12px] flex items-center justify-end text-white px-2 py-1 rounded-sm shadow-md"
                                        onClick={() => handleApproveOrder(item)}
                                    >
                                        Approve Order
                                    </button>}

                                    {item.image_url && (
                                        <a
                                            href={item.image_url}
                                            download
                                            className="h-8 bg-blue-600 text-[12px] text-white px-2 py-1 rounded-sm shadow-md flex items-center"
                                            title="Download File"
                                        >
                                            Download File
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>





            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setOpenModal(false)}>
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

                    <div className="fixed inset-0 flex items-center justify-center w-full h-screen p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full h-full max-w-none bg-white p-2 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-semibold text-center text-gray-900">
                                    Orders Info
                                </Dialog.Title>

                                <div className="flex-1 h-[96%] overflow-y-auto bg-gray-100 text-gray-700 p-2 mt-1 scrollbar-hidecvc">
                                    <div className="container mx-auto py-1">
                                        <div className="w-full">
                                            {/* Order Summary */}
                                            <div className="bg-white p-2 rounded shadow mb-2">
                                                <label className="flex items-center border rounded p-2 hover:bg-gray-50">
                                                    <div className="flex w-full justify-between text-xs gap-2">
                                                        <div>
                                                            <h2 className="font-semibold">Order Number:</h2>
                                                            <h2 className="text-gray-500 whitespace-nowrap">{orderedItems.order_no}</h2>
                                                        </div>
                                                        <div>
                                                            <h2 className="font-semibold">Date:</h2>
                                                            <h2 className="text-gray-500 whitespace-nowrap">
                                                                {moment(orderedItems.creation_date).format("DD-MM-YYYY")}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </label>

                                                {/* Billing Address */}
                                                <label className="flex items-start p-2 border rounded cursor-pointer hover:bg-gray-50 mt-1">
                                                    <div className="flex flex-col w-full text-xs">
                                                        <h2 className="font-semibold mb-1">Billing Address</h2>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex gap-1">
                                                                <h2 className="font-bold">SAP Code:</h2>
                                                                <h2 className="text-gray-500 font-bold">{orderedItems.kunnr_sold}</h2>
                                                            </div>
                                                            <h2 className="font-semibold">{orderedItems.party_name}</h2>
                                                            <h3 className="text-gray-500 font-semibold">{orderedItems.del_address}</h3>
                                                            <div className="flex gap-1">
                                                                <h2 className="font-semibold">Phone:</h2>
                                                                <h2 className="text-gray-500">{orderedItems.phone_no}</h2>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <h2 className="font-semibold">Depot Code:</h2>
                                                                <h2 className="text-gray-500">{orderedItems.werks}</h2>
                                                                <h2 className="font-semibold pl-2">Depot Desc:</h2>
                                                                <h2 className="text-gray-500">{orderedItems.depot_name}</h2>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </label>
                                            </div>

                                            {/* Items Table */}
                                            <div className="bg-white p-2 rounded shadow mb-2">
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full text-xs border-collapse">
                                                        <thead>
                                                            <tr className="border-b bg-yellow-400">
                                                                <th className="py-1 px-2 text-left">Item</th>
                                                                <th className="py-1 px-2 text-left">UOM</th>
                                                                <th className="py-1 px-2 text-left">Pkg Std</th>
                                                                <th className="py-1 px-2 text-left">Qty</th>
                                                                <th className="py-1 px-2 text-left">Per UOM</th>
                                                                <th className="py-1 px-2 text-left">Total UOM</th>
                                                                <th className="py-1 px-2 text-left">Rate</th>
                                                                <th className="py-1 px-2 text-left">Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orderedItems?.orderItems?.map((item, idx) => (
                                                                <tr
                                                                    key={idx}
                                                                    className={`border-b ${item.selected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-100"}`}
                                                                >
                                                                    <td className="py-1 px-2 whitespace-nowrap">
                                                                        {item.matnr}
                                                                        <br />
                                                                        {item.material_name}
                                                                    </td>
                                                                    <td className="py-1 px-2">{item.uom}</td>

                                                                    <td className="py-1 px-2 whitespace-nowrap">{item.pkg_std}</td>

                                                                    <td className="py-1 px-2">{item.qty}</td>
                                                                    <td className="py-1 px-2">{item.per_uom}</td>
                                                                    <td className="py-1 px-2 whitespace-nowrap">{item.total_uom}</td>
                                                                    <td className="py-1 px-2 whitespace-nowrap">{item.price.toLocaleString()}</td>
                                                                    <td className="py-1 px-2">{item.net_value.toLocaleString()}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="border-t font-semibold">
                                                                <td className="py-1 px-2">Total ({orderedItems?.orderItems?.length})</td>
                                                                <td className="py-1 px-2">-</td>
                                                                <td className="py-1 px-2">-</td>
                                                                <td className="py-1 px-2">{orderedItems?.orderItems?.reduce((curr, acc) => curr + Number(acc.qty), 0)}</td>
                                                                <td className="py-1 px-2">-</td>
                                                                <td className="py-1 px-2">-</td>
                                                                <td className="py-1 px-2">-</td>
                                                                <td className="py-1 px-2">{orderedItems?.orderItems?.reduce((curr, acc) => curr + Number(acc.net_value), 0)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Delivery Address */}
                                            <div className="bg-white p-2 rounded shadow mb-2 text-xs w-full">
                                                <h2 className="font-semibold  mb-1 text-xs">Delivery Address</h2>
                                                <label className="flex items-start p-2 border rounded cursor-pointer hover:bg-gray-50 mt-1 text-xs">



                                                    <div className="bg-white shadow-md rounded-lg  text-xs w-full">


                                                        {/* Billing Details */}
                                                        <div className="space-y-2 w-full">
                                                            <div className="flex justify-between">

                                                                <span className="font-bold text-xs">{orderedItems.kunnr_ship}</span>
                                                            </div>
                                                            <div className="flex justify-between text-xs ">
                                                                <span><strong>{orderedItems.party_name}</strong></span>
                                                            </div>

                                                            <div className="flex justify-between text-xs">
                                                                {orderedItems.postal_ship}
                                                            </div>

                                                            <div className="flex flex-row gap-2  justify-between font-bold text-xs">
                                                                <span><strong>Depot Code:</strong>
                                                                    <br />{orderedItems.werks}</span>

                                                                <span>Warehouse Des:
                                                                    <br /> {orderedItems.depot_name}</span>
                                                                {/* <span><HiOutlineExternalLink onClick={() => setShowDuplicatePopup(true)} size={28} className="self-center" /></span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>


                                            {/* Territory and Employee Details */}
                                            <div className="bg-white p-2 rounded shadow mb-2 text-xs">
                                                <div className="flex justify-between gap-2 mb-1">
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Territory:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.territory_name}</h2>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Region:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.region_name}</h2>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between gap-2 mb-1">
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Payment Terms:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.pay_terms}</h2>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Inco Terms:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.inco_terms}</h2>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between gap-2 mb-1">
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Emp Code:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.Emp_code}</h2>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Inco Location:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.inco_location}</h2>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between gap-2">
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Name:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.name}</h2>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <h2 className="font-semibold">Order Status:</h2>
                                                        <h2 className="text-gray-500">{orderedItems.ord_status}</h2>
                                                    </div>
                                                </div>

                                                <div className="w-full flex justify-center mt-2">
                                                    <button
                                                        onClick={() => setOpenModal(false)}
                                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>

                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={showImageModal} as={Fragment}>
                <Dialog as="div" className="z-10" onClose={() => setShowImageModal(false)}>
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
                                <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                                    >
                                        Payment Image
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt="Payment Proof"
                                                className="rounded bg-gray-200 w-full h-auto"
                                            />
                                        ) : (
                                            <p className="text-center text-gray-500">No image available</p>
                                        )}
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
