import React, { useState, useEffect } from "react";
import FilterComponent from "../../components/Sales_Portal_Apps/OrderHistoryFilterComponent";
import Layout from "../../components/Sales_Portal_Apps/Layout";
import { IoIosBasket } from "react-icons/io";
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
                    amount: item.order_value || ""


                },
            });
        }
        else {
            return
        }






    };


    return (

        <div className="flex flex-col gap-2 ">
            <div className=" font-bold text-lg h-4 flex flex-col  ">
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
                        <span>Order List</span>
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
                        onClick={() => { getExcelsheet() }}
                        className=" h-8 bg-pink-400 flex items-center text-white-500 whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        <LuRefreshCw className="mr-2" />    Generate Report
                    </button>

                    <button
                        onClick={() => setRefresh(!refresh)}
                        className=" h-8 bg-pink-400 flex items-center text-white-500 whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        <LuRefreshCw className="mr-2" />   Refresh
                    </button>

                </div>{" "}

                <div className="w-full text-[12px]">
                    <FilterComponent refresh={refresh} />
                </div>

                <h5 className="ml-2">List of Order</h5>
                <div className="flex flex-col justify-between m-2 gap-4  ">
                    {allOrderInfoData?.map(item =>
                        <div className="flex flex-col gap-2 text-sm bg-gray-100 shadow-lg rounded-md p-4">
                            <div className={`${item.status_details?.color_code} flex justify-between w-full p-2 rounded-md text-white font-bold`}>
                                <span>SAP Code: {item.kunnr_sold}</span>

                                <span>Order No: {item.order_no}</span>

                            </div>


                            <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                <span>Order Date: {moment(item.order_dt).format("DD-MM-YYYY")}</span> <span>Delivery Date: {moment(item.expected_del_date).format("DD-MM-YYYY")}</span>
                            </div>

                            <h5 className="border-b border-gray-300 pb-2">Buyer: {item.party_name}</h5>

                            <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                <span>Total Items: {item.orderItems.length}</span> <span >Total Count: {item.orderItems.length}</span>
                            </div>

                            <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                <span>Order Amount</span> <span>₹{item.order_value}</span>
                            </div>

                            <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                <span>Status</span> <span>{item.ord_status}</span>
                            </div>


                            <div className="p-2 flex flex-row gap-1 justify-center w-full flex-wrap font-normal text-[8px]">
                                {["View Order Item", "View Order Activity", "Download PDF"].map((btnText) => (
                                    <button
                                        key={btnText}
                                        className="h-8 bg-pink-500 flex items-center justify-end text-white px-2 py-1 rounded-sm  shadow-md"
                                        onClick={() =>



                                            handleOrderItemModal(item, btnText)}

                                    >
                                        {btnText}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}




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
                                <Dialog.Title as="h3" className="text-[1.78rem] font-bold leading-6 text-center text-gray-900">
                                    Orders Info
                                </Dialog.Title>
                                <div className="flex-1 h-[96%] overflow-y-auto bg-gray-100 text-gray-700 p-2 mt-2 scrollbar-hidecvc                                                                 ">
                                    <div className="container mx-auto py-2">
                                        <div className="w-full">
                                            <div className="bg-white p-2 p-1.5 rounded-lg shadow-md mb-4">
                                                <h2 className="text-xl font-semibold mb-4"></h2>
                                                <div className="space-y-4">
                                                    <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                                                        <div className="flex lg:flex  gap-1 justify-between w-full ">

                                                            <div className="flex w-full  justify-between text-xs lg:text-sm gap-1">
                                                                <div>
                                                                    <h2 className="font-semibold">Order Number:</h2>
                                                                    <h2 className="text-gray-500 whitespace-nowrap">{orderedItems.order_no}</h2>
                                                                </div>
                                                                <div>
                                                                    <h2 className="font-semibold">Date: </h2>
                                                                    <h2 className="text-gray-500 whitespace-nowrap">{moment(orderedItems.creation_date).format("DD-MM-YYYY")}</h2>

                                                                </div>



                                                            </div>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                        <div className="flex gap-1 justify-between w-full">
                                                            <div className="flex items-start justify-center w-full flex-col ">
                                                                <h2 className="text-xl font-semibold mb-">Billing Address</h2>
                                                                <div className="flex lg:flex-row flex-col w-full items-center flex-wrap justify-center">
                                                                    <div className="flex flex-col text-xs lg:text-sm gap- w-full py-1">
                                                                        <div className="flex text-xs lg:text-sm gap- w-full py-2 gap-x-2">
                                                                            <h2 className="font-bold whitespace-nowrap ">SAP Code : </h2>
                                                                            <h2 className="text-gray-500  font-bold">{orderedItems.kunnr_sold}</h2>
                                                                        </div>
                                                                        <h2 className="font-semibold whitespace-nowrap "> {orderedItems.party_name}</h2>

                                                                        <h3 className="text-gray-500 font-semibold">

                                                                            {orderedItems.del_address}
                                                                        </h3>
                                                                    </div>

                                                                    <div className="flex text-xs lg:text-sm gap-1 w-full gap-x-2  ">

                                                                        <div className="flex  gap-x-2">
                                                                            <h2 className="font-semibold whitespace-nowrap ">Phone: </h2>
                                                                            <h2 className="text-gray-500 ">{orderedItems.phone_no
                                                                            }</h2>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex lg:flex-row flex-col w-full items-center flex-wrap justify-center">

                                                                    <div className="flex text-xs lg:text-sm gap-1 w-full  ">
                                                                        <h2 className="font-semibold whitespace-nowrap gap-x-2  ">Depot Code : </h2>
                                                                        <h2 className="text-gray-500  ">{orderedItems.werks}</h2>
                                                                        <div className="flex px-2 gap-x-2">
                                                                            <h2 className="font-semibold whitespace-nowrap ">Depot Desc : </h2>
                                                                            <h2 className="text-gray-500  ">{orderedItems.depot_name}</h2>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="bg-white p-1.5 p-5 rounded-lg shadow-md mb-4">


                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full table-auto border-collapse">
                                                        <thead >
                                                            <tr className="border-b text-xs  bg-yellow-400">
                                                                <th className="py-2 px-2 text-left">Item Name</th>
                                                                <th className="py-2 px-2 text-left">UOM</th>
                                                                <th className="py-2 px-2 text-left">Qty</th>
                                                                <th className="py-2 px-2 text-left">Rate</th>
                                                                <th className="py-2 px-2 text-left">Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orderedItems?.orderItems?.map((item, idx) => (
                                                                <tr
                                                                    key={idx}
                                                                    className={`border-b text-xs lg:text-sm ${item.selected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-100"
                                                                        }`}
                                                                >
                                                                    <td className="py-2 px-2 w-24 ">
                                                                        {item?.matnr}
                                                                        <br />
                                                                        {item?.material_name}
                                                                    </td>
                                                                    <td className="py-2 px-2">{item.uom}</td>
                                                                    <td className="py-2 px-2">{item.qty}</td>
                                                                    <td className="py-2 px-2 whitespace-nowrap">₹ {item.price.toLocaleString()}</td>
                                                                    <td className="py-2 px-2">{(item.net_value).toLocaleString()}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="border-t font-semibold text-sm  ">

                                                                <td className="py-2 px-2 whitespace-nowrap">

                                                                    Total ({orderedItems?.orderItems?.length})
                                                                </td>
                                                                <td className="py-2 px-2 ">{"-"} </td>
                                                                <td className="py-2 px-2">{"-"} </td>
                                                                <td className="py-2 px-2 whitespace-nowrap">₹ {orderedItems?.orderItems?.reduce((curr, acc) => { return curr += Number(acc.price) }, 0)}</td>
                                                                <td className="py-2 px-2">{orderedItems?.orderItems?.reduce((curr, acc) => { return curr += Number(acc.net_value) }, 0)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {allOrderInfoData?.some((item) => item.selected) && (
                                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                        <h3 className="font-medium mb-2" >Selected Items Order:</h3>
                                                        <ol className="list-decimal list-inside space-y-1">
                                                            {allOrderInfoData
                                                                ?.filter((item) => item.selected)
                                                                ?.map((item) => (
                                                                    <li key={item.id} className="text-gray-600">
                                                                        {item.name}
                                                                    </li>
                                                                ))}
                                                        </ol>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Delivery Address */}
                                            <div className="bg-white p-2 rounded-lg shadow-md">
                                                <h2 className="text-xl font-semibold lg:mb-4 mb-2">Delivery Address </h2>
                                                <div className="space-y-4">
                                                    <div className="address flex gap-1  flex-wrap">
                                                        <div>
                                                            <h2>
                                                                {orderedItems.SAP_order_no}
                                                                <br />
                                                                {orderedItems.party_name}
                                                                <br />
                                                                {orderedItems.del_address}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Territory EMP Details  */}
                                            <div className="bg-white lg:p-4 p-1.5 rounded-lg shadow-md mt-4">
                                                <div className="space-y-4">
                                                    <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                                                        <div className="flex lg:flex-row flex-col gap-1 justify-between w-full">
                                                            <div className="flex gap-1">
                                                                <h2 className="font-semibold">Territory: </h2>
                                                                <h2 className="text-gray-500">{orderedItems.territory_name}</h2>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <h2 className="font-semibold">Region: </h2>
                                                                <h2 className="text-gray-500">{orderedItems.region_name}</h2>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                                                        <div className="flex  flex-col gap-1 justify-between w-full">
                                                            <div className="flex lg:flex-row flex-col gap-2 py-2 justify-between w-full">
                                                                <div className="flex gap-1">
                                                                    <h2 className="font-semibold">Payment Terms: </h2>
                                                                    <h2 className="text-gray-500">{orderedItems.pay_terms}</h2>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <h2 className="font-semibold">Inco Terms: </h2>
                                                                    <h2 className="">{orderedItems.inco_terms
                                                                    }</h2>
                                                                </div>
                                                            </div>

                                                            <div className="flex lg:flex-row flex-col gap-1 justify-between w-full">
                                                                <div className="flex gap-1">
                                                                    <h2 className="font-semibold">Employee Code: </h2>
                                                                    <h2 className="">{orderedItems.Emp_code}</h2>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <h2 className="font-semibold">Inco Location: </h2>
                                                                    <h2 className="text-gray-500">{orderedItems.inco_location}</h2>
                                                                </div>
                                                            </div>
                                                            <div className="flex lg:flex-row flex-col gap-1 justify-between w-full">
                                                                <div className="flex gap-1">
                                                                    <h2 className="font-semibold">Name: </h2>
                                                                    <h2 className="">{orderedItems.name}</h2>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <h2 className="font-semibold">Order Status: </h2>
                                                                    <h2 className="text-gray-500">{orderedItems.ord_status}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="w-full flex justify-center mt-2">
                                                    <button
                                                        onClick={() => setOpenModal(false)}
                                                        className=" bg-red-500 text-white p-3 rounded-md shadow-lg hover:bg-red-600 "
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















        </div>



    );
};

export default Dashboard;
