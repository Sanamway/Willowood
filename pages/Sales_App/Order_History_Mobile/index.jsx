import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import Layout from "../Layout";
import { IoIosBasket } from "react-icons/io";

import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
const Dashboard = () => {
    const [refresh, setRefresh] = useState(false)
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

                <div className="p-2 flex flex-row gap-1  w-full  flex-wrap font-normal text-[8px]">

                    <button

                        className=" h-4 bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        + Add New
                    </button>

                    <button

                        className=" h-4 bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm border-sm border-green-500"
                    >
                        <IoIosBasket className="mr-2" />  Order Cart(s)
                    </button>

                    <button

                        className=" h-4 bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        <CiBookmark className="mr-2" />  Order Actions
                    </button>

                    <button
                        onClick={() => { setDownloadExcel() }}
                        className=" h-4 bg-white flex items-center justify-center whitespace-nowrap text-pink-500 px-2 py-1 rounded-sm border border-pink-500"
                    >
                        <LuRefreshCw className="mr-2" /> Generate Report
                    </button>

                    <button
                        onClick={() => setRefresh(!refresh)}
                        className=" h-4 bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        <LuRefreshCw className="mr-2" />   Refresh
                    </button>

                </div>{" "}
                <div className="w-full text-[12px]">
                    <FilterComponent refresh={refresh} />
                </div>

                <h5 className="ml-2">List of Order</h5>
                <div className="flex flex-col justify-between m-2 gap-4  ">
                    <div className="flex flex-col gap-2 text-sm bg-gray-100 shadow-lg rounded-md p-4">
                        <h5 className="bg-green-400 p-2 rounded-md text-white font-bold">Order No: XXXXXXXX</h5>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Order Date: XXXXXXXXXX</span> <span>Delivery Date: XXX</span>
                        </div>

                        <h5 className="border-b border-gray-300 pb-2">Buyer: XXXXXXXX</h5>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Total Items: 4</span> <span>Total Count: 556</span>
                        </div>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Order Amount</span> <span>₹12345</span>
                        </div>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Status</span> <span>Pending</span>
                        </div>

                        <div className="p-2 flex flex-row gap-1 justify-center w-full flex-wrap font-normal text-[8px]">
                            {["View Order Activity", "Download XLS", "Download PDF", "Preview PDF"].map((btnText) => (
                                <button
                                    key={btnText}
                                    className="h-4 bg-pink-500 flex items-center justify-center text-white px-2 py-1 rounded-sm  shadow-md"
                                >
                                    {btnText}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-sm bg-gray-100 shadow-lg rounded-md p-4">
                        {/* Order Header with Wider Width */}
                        <h5 className="bg-red-400 p-3 rounded-md text-white font-bold w-full">
                            Order No: XXXXXXXX
                        </h5>

                        {/* Order Details with Borders */}
                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Order Date: XXXXXXXXXX</span>
                            <span>Delivery Date: XXX</span>
                        </div>

                        <h5 className="border-b border-gray-300 pb-2">Buyer: XXXXXXXX</h5>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Total Items: 4</span>
                            <span>Total Count: 556</span>
                        </div>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Order Amount</span>
                            <span>₹12345</span>
                        </div>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Status</span>
                            <span>Pending</span>
                        </div>

                        {/* Buttons without Borders */}
                        <div className="p-2 flex flex-row gap-1 justify-center w-full flex-wrap font-normal text-[8px]">
                            {["View Order Activity", "Download XLS", "Download PDF", "Preview PDF"].map((btnText) => (
                                <button
                                    key={btnText}
                                    className="h-4 bg-pink-500 flex items-center justify-center text-white px-2 py-1 rounded-sm  shadow-md"
                                >
                                    {btnText}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-sm bg-gray-100 shadow-lg rounded-md p-4">
                        {/* Order Header with Wider Width */}
                        <h5 className="bg-yellow-400 p-3 rounded-md text-white font-bold w-full">
                            Order No: XXXXXXXX
                        </h5>

                        {/* Order Details with Borders */}
                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Order Date: XXXXXXXXXX</span>
                            <span>Delivery Date: XXX</span>
                        </div>

                        <h5 className="border-b border-gray-300 pb-2">Buyer: XXXXXXXX</h5>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Total Items: 4</span>
                            <span>Total Count: 556</span>
                        </div>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Order Amount</span>
                            <span>₹12345</span>
                        </div>

                        <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                            <span>Status</span>
                            <span>Pending</span>
                        </div>

                        {/* Buttons without Borders */}
                        <div className="p-2 flex flex-row gap-1 justify-center w-full flex-wrap font-normal text-[8px]">
                            {["View Order Activity", "Download XLS", "Download PDF", "Preview PDF"].map((btnText) => (
                                <button
                                    key={btnText}
                                    className="h-4 bg-pink-500 flex items-center justify-center text-white px-2 py-1 rounded-sm  shadow-md"
                                >
                                    {btnText}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>


            </div>


            {/* Main Content - Takes Remaining Space */}














        </div>



    );
};

export default Dashboard;
