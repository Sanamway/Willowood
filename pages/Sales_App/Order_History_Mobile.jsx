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
const Dashboard = () => {
    const [refresh, setRefresh] = useState(false)
    const router = useRouter();
    const [allOrderInfoData, setAllOrderInfoData] = useState([
    ]);
    const allOrderData = useSelector(
        (state) => state.allOrdersInfo.allOrderInfoData
    );
    useEffect(() => {
        setAllOrderInfoData(allOrderData)
    }, [allOrderData])

    console.log("pop", allOrderInfoData)

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
    const getExcelsheet = async (

    ) => {


        const ws = XLSX.utils.json_to_sheet(allOrderInfoData.map((item) => {
            return {

                ["Date"]: moment(item.creation_date).format("DD-MM-YYYY"),
                ["Order No"]: item["SAP_order_no"],
                ["Company"]: item.del_address,
                ["Order Total"]: parseFloat(item.order_value).toFixed(2),
                ["Item Count"]: item.orderItems?.length,
                ["Last Modified"]: moment(item.modifi_date).format("DD-MM-YYYY")





            }
        }));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `Indent.xlsx`);




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

                <div className="p-2 flex flex-row gap-2  w-full  justify-center flex-wrap font-normal text-[8px]">

                    <button

                        className=" h-8 bg-pink-500 flex items-center justify-end whitespace-nowrap text-white px-2 py-1 rounded-sm"
                    >
                        + Add New
                    </button>




                    <button
                        onClick={() => { getExcelsheet() }}
                        className=" h-8 bg-white flex items-center text-pink-500 px-2 py-1 rounded-sm border border-pink-500"
                    >
                        <LuRefreshCw className="mr-2" /> Generate Report
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
                            <h5 className="bg-green-400 p-2 rounded-md text-white font-bold">Order No: {item.order_no}</h5>

                            <div className="flex flex-row justify-between border-b border-gray-300 pb-2">
                                <span>Order Date: {moment(item.creation_date).format("DD-MM-YYYY")}</span> <span>Delivery Date: {moment(item.expected_del_date).format("DD-MM-YYYY")}</span>
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


            {/* Main Content - Takes Remaining Space */}














        </div>



    );
};

export default Dashboard;
