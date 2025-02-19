import React, { useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { setPageChange } from "@/utils/allOrderInfoSlice";
import { url } from "@/constants/url";
import axios from "axios";
const OrderTable = () => {
    const [allOrderInfoData, setAllOrderInfoData] = useState([
    ]);

    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const allOrderData = useSelector(
        (state) => state.allOrdersInfo.allOrderInfoData
    );
    const count = useSelector(
        (state) => state.allOrdersInfo.pageCount
    );
    const pageCurrent = useSelector(
        (state) => state.allOrdersInfo.currentpage
    );

    // console.log("pop", allOrderData, count, pageCurrent)
    const router = useRouter();

    const [orderedItems, setOrderedItems] = useState({});

    const [openModal, setOpenModal] = useState(false)
    const handleOrderItemModal = async (item) => {
        setOpenModal(true)


        setOrderedItems(item)




    };




    console.log("zxc", orderedItems)

    const dispatch = useDispatch(); // Access the dispatch function


    useEffect(() => {

        setAllOrderInfoData(allOrderData)
        setDataCount(count)
        setCurrentPage(pageCurrent)
        setPageCount(Math.ceil(count / 50));
    }, [allOrderData, count, pageCurrent])




    const [pageCount, setPageCount] = useState(0);
    const [dataCount, setDataCount] = useState([]);
    const [currentPage, setCurrentPage] = useState({ selected: 0 }); // Current page number

    const handlePageChange = (pageNumber) => {
        dispatch(setPageChange(pageNumber));
    };





    return (

        <div className=" w-full  font-arial ">
            <div className="overflow-y-auto h-full w-full">
                <table className="min-w-full divide-y border divide-gray-200 text-white-400 ">
                    <thead className="border-b w-max bg-blue-400">
                        <tr className=" font-arial w-max">
                            <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-white  tracking-wider">

                            </th>
                            <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                                Date
                            </th>
                            <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-white  tracking-wider">
                                Order No
                            </th>
                            <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                                Company
                            </th>
                            <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                                Order Total
                            </th>
                            <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                                Item Count
                            </th>
                            <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-white  tracking-wider">
                                Last Modified
                            </th>

                            <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-white tracking-wider">

                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y  divide-gray-200 text-xs ">
                        {allOrderInfoData?.map((item) =>
                            <tr className="dark:border-2">
                                <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs">
                                    <button
                                        className="b text-black hover:text-red-500 ml-2"
                                        type="checkbox"></button>
                                </td>
                                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                    {moment(item.creation_date).format("DD-MM-YYYY")}
                                </td>
                                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                    {item["SAP_order_no"]}
                                </td>
                                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                    <small className="font-bold text-md">{item.party_name}</small>
                                    <br />
                                    {item.del_address}
                                </td>
                                <td className="px-4 py-2 dark:border-2 whitespace-nowrap text-center">
                                    {parseFloat(item.order_value).toFixed(2)}
                                </td>
                                <td className="px-4 py-2 dark:border-2 whitespace-nowrap text-center">
                                    {item.orderItems?.length}
                                </td>
                                <td className="px-4  py-2 dark:border-2 whitespace-nowrap text-center">
                                    {moment(item.modifi_date).format("DD-MM-YYYY")}
                                </td>

                                <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                                    <button
                                        className="bg-white flex items-center justify-center whitespace-nowrap text-blue-500 px-2 py-1 rounded-sm border border-blue-500"
                                        onClick={() => handleOrderItemModal(item)}
                                    >
                                        More Info
                                    </button>
                                </td>

                            </tr>
                        )}

                    </tbody>
                </table>
                <div className="w-full flex flex-row justify-between mx-4 pr-12 pb-10  bg-white z-10">
                    <div className="flex flex-row gap-1 px-2 py-1 mt-4 border border-black rounded-md text-slate-400">
                        Showing <small className="font-bold px-2 self-center text-black">1</small> to{" "}
                        <small className="font-bold px-2 self-center text-black">{allOrderInfoData.length}</small> of{" "}
                        <small className="font-bold px-2 self-center text-black">{dataCount}</small> results
                    </div>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination flex flex-row gap-2"} // Container styling
                        activeClassName={"text-white bg-blue-500 rounded px-2"} // Active page styling
                        className="flex flex-row gap-2 px-2 py-1 mt-4 border border-black rounded-md"
                        forcePage={currentPage.selected} // Set the current page
                    />
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
                            <Dialog.Panel className="w-full h-full max-w-none bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-[1.78rem] font-bold leading-6 text-center text-gray-900">
                                    Orders Info Modal
                                </Dialog.Title>
                                <div className="flex-1 h-[96%] overflow-y-auto bg-gray-100 text-gray-700 p-6 mt-4 scrollbar-hidecvc                                                                 ">
                                    <div className="container mx-auto py-8">
                                        <h1 className="lg:text-3xl text-2xl font-bold mb-6 px-4">Order Info</h1>

                                        <div className="w-full">




                                            <div className="bg-white p-6 p-1.5 rounded-lg shadow-md mb-4">
                                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                                <div className="space-y-4">
                                                    <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                                                        <div className="flex lg:flex  gap-1 justify-between w-full ">

                                                            <div className="flex text-xs lg:text-sm gap-1">
                                                                <h2 className="font-semibold">Date: </h2>
                                                                <h2 className="text-gray-500 whitespace-nowrap">{moment(orderedItems.creation_date).format("DD-MM-YYYY")}</h2>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                        <div className="flex gap-1 justify-between w-full">
                                                            <div className="flex items-start justify-center w-full flex-col ">
                                                                <h2 className="text-xl font-semibold mb-">Billing Address</h2>
                                                                <div className="flex lg:flex-row flex-col w-full items-center flex-wrap justify-center">
                                                                    <div className="flex text-xs lg:text-sm gap- w-full py-1">
                                                                        <h2 className="font-semibold whitespace-nowrap "> </h2>
                                                                        <h3 className="text-gray-500 whitespace-nowrap font-semibold">

                                                                            {orderedItems.del_address}
                                                                        </h3>
                                                                    </div>

                                                                    <div className="flex text-xs lg:text-sm gap-1 w-full gap-x-2  ">
                                                                        <h2 className="font-semibold whitespace-nowrap  ">City: </h2>
                                                                        <h2 className="text-gray-500  ">{orderedItems.city}</h2>
                                                                        <div className="flex px-2 gap-x-2">
                                                                            <h2 className="font-semibold whitespace-nowrap ">Postal: </h2>
                                                                            <h2 className="text-gray-500">{orderedItems.postal}</h2>
                                                                        </div>
                                                                        <div className="flex px-2 gap-x-2">
                                                                            <h2 className="font-semibold whitespace-nowrap ">Phone: </h2>
                                                                            <h2 className="text-gray-500 ">{orderedItems.phone_no
                                                                            }</h2>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex lg:flex-row flex-col w-full items-center flex-wrap justify-center">
                                                                    <div className="flex text-xs lg:text-sm gap- w-full py-2 gap-x-2">
                                                                        <h2 className="font-semibold whitespace-nowrap ">SAP Code : </h2>
                                                                        <h2 className="text-gray-500">{orderedItems.SAP_order_no}</h2>
                                                                    </div>
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
                                                            {/* <div>
                      <h2 className="font-semibold">Date: </h2>
                      <h2 className="text-gray-500">{new Date().toDateString()}</h2>
                    </div> */}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Order Preference Section */}

                                            <div className="bg-white p-1.5 p-5 rounded-lg shadow-md mb-4">
                                                <h2 className="text-xl font-semibold mb-4">Items List : </h2>

                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="border-b text-xs">
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
                                                                    <td className="py-2 px-2 whitespace-nowrap">

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

                                                                    Total
                                                                </td>
                                                                <td className="py-2 px-2">{"-"}</td>
                                                                <td className="py-2 px-2">{"-"}</td>
                                                                <td className="py-2 px-2 whitespace-nowrap">₹ {orderedItems?.orderItems?.reduce((curr, acc) => { return curr += acc.price }, 0)}</td>


                                                                <td className="py-2 px-2"> {orderedItems?.orderItems?.reduce((curr, acc) => { return curr += acc.net_value }, 0)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {allOrderInfoData.some((item) => item.selected) && (
                                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                        <h3 className="font-medium mb-2">Selected Items Order:</h3>
                                                        <ol className="list-decimal list-inside space-y-1">
                                                            {allOrderInfoData
                                                                .filter((item) => item.selected)
                                                                .map((item) => (
                                                                    <li key={item.id} className="text-gray-600">
                                                                        {item.name}
                                                                    </li>
                                                                ))}
                                                        </ol>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Delivery Address */}
                                            <div className="bg-white p-6 rounded-lg shadow-md">
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
                                                                    <h2 className="">{orderedItems.emp_code}</h2>
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
                                    {/* <OrderSuccessModal isOpen={isOpen} setOpen={() => setIsOpen(!isOpen)}></OrderSuccessModal> */}
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>

                    </div>
                </Dialog>
            </Transition>
        </div>


    );
};

export default OrderTable;
