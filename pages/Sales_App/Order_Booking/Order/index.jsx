import React, { useState, useEffect } from "react";

import Layout from "../../Layout";
import { IoIosBasket } from "react-icons/io";

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

const Dashboard = () => {
    const [refresh, setRefresh] = useState(false)
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
    const handleOrderItemModal = async (item) => {
        setOpenModal(true)


        setOrderedItems(item)




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


    const orders = [
        {
            id: "118245",
            trader: "HR Sharma Traders - Shahzadpur",
            address: "Ambala Road, Ambala, 134202, Haryana",
            city: "Shahzadpur",
            postal: "134202",
            phone: "897966064",
        },
        {
            id: "119876",
            trader: "Rajesh Agro Solutions - Karnal",
            address: "Sector 12, Karnal, Haryana, 132001",
            city: "Karnal",
            postal: "132001",
            phone: "9876543210",
        },
        {
            id: "120345",
            trader: "AgriCare Distributors - Panipat",
            address: "GT Road, Panipat, Haryana, 132103",
            city: "Panipat",
            postal: "132103",
            phone: "8765432109",
        },
    ];

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

    return (

        <div className="bg-gray-200">
            {/* Header Section */}
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-400 lg:flex-col">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Home",
                            })
                        }
                    />
                    <span className="flex flex-row gap-2 justify-center items-center">  <FcNews size={32} className="text-indigo-600" /> <span>XYZ General Store</span></span>
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
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2 items-center lg:hidden">
                                            <FaHandsHelping className="text-[#626364] cursor-pointer" size={20} />
                                            Help
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2 items-center lg:flex-col">
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
            <div className="bg-white shadow-md rounded-lg p-4 mb-1  mx-2">
                {/* Header Row */}
                <div className="flex justify-between font-bold border-b pb-2 mb-2">
                    <span>Billing Information</span>  <span>Created Date: {moment().format("DD-MM-YY")}</span>
                </div>

                {/* Billing Details */}
                <div className="text-sm space-y-2">
                    <div className="flex justify-between">

                        <span className="font-bold"> 1212</span>
                    </div>
                    <div className="flex justify-between">
                        <span><strong>Party Name</strong></span>

                    </div>

                    <div>
                        1234, XYZ Street, ABC City, 567890
                    </div>

                    <div className="flex justify-between font-bold">
                        <span><strong>Depot Code:</strong> 1212</span>
                        <span>Warehouse Des XXXXXXX</span>
                    </div>
                </div>
            </div>


            {/* Search & Dropdown Section */}
            <div className="flex justify-center  mx-2 tems-center">
                <select
                    className="w-36 px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="citySelect"
                >
                    <option value={""} className="focus:outline-none focus:border-b bg-white">-- Select --</option>
                    <option value="Option">Option</option>
                    <option value="Option">Option</option>
                    <option value="Option">Option</option>
                </select>

                <div className="relative w-3/4">
                    <input
                        className="w-full px-10 py-1.5 border border-gray-400  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        placeholder="Search"
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 12.65z"
                        />
                    </svg>
                </div>

                <button className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
                    +
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto  mx-2">
                <table className="min-w-full divide-y border divide-gray-200">
                    <thead className="border-b w-max bg-yellow-300">
                        <tr className="font-arial w-max text-gray-700">
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Description</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">UOM</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Qty</th>
                            <th className=" py-2 text-left text-xs font-medium tracking-wider">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Value</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider "></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs">
                        {data?.map((item, idx) => (
                            <tr key={idx} className="border-b">
                                {/* Description with hyperlink */}
                                <td className="px-4 py-2 text-left whitespace-nowrap flex items-center gap-2">
                                    <div>
                                        {item.material_code}{" "}
                                        <a href="#" className="text-blue-600 underline">View More</a>
                                        <br />
                                        <span className="text-gray-500">Material Name XXXX</span>
                                    </div>
                                </td>

                                {/* UOM (disabled) */}
                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 bg-gray-100 border rounded-md cursor-not-allowed text-gray-600"
                                        value={item.uom}
                                        disabled
                                    />
                                </td>

                                {/* Qty (input box) */}
                                <td className="px-1 py-2 text-left whitespace-nowrap  bg-green-200">
                                    <input
                                        type="number"
                                        className="w-full px-2 py-1 border rounded-md"
                                        placeholder="Enter Qty"
                                    />
                                </td>

                                {/* Price (disabled) */}
                                <td className=" px py-2 text-right whitespace-nowrap">
                                    {item.price}
                                </td>

                                {/* Value (disabled) */}
                                <td className="px-4 py-2 text-left whitespace-nowrap  bg-blue-200">
                                    15000.00
                                </td>
                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <IoIosRemoveCircleOutline className="text-red-400" />
                                </td>
                            </tr>
                        ))}

                        {/* Total Row */}
                        <tr className="bg-blue-600 text-white font-bold">
                            {/* Total Description */}
                            <td className="px-4 py-2 text-left" colSpan={2}>
                                Total :  {data.length} ( Items )
                            </td>

                            {/* Empty column for Qty */}
                            <td className="px-4 py-2 text-left">   100 </td>

                            {/* Total Price Calculation */}
                            <td className="px-4 py-2 text-left">
                                -
                            </td>

                            {/* Total Value Calculation */}
                            <td className="px-4 py-2 text-left">
                                12000
                            </td>
                            <td className="px-4 py-2 text-left">
                                -
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* Delivery Address & Special Instructions */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                {/* Header Row */}

                <div className="border border-black rounded-lg">
                    <div className="flex flex-col gap-2">
                        <div className="px-2 border-r border-black">
                            <label className="block font-semibold mb-1">Delivery Address:</label>
                            <span>
                                1234, XYZ Street, ABC City, 567890
                            </span>
                        </div>
                        <div className="px-2">
                            <label className="block font-semibold mb-1">Special Instructions for Orders / Dispatch</label>
                            <textarea className="w-full p-2 border rounded-lg" rows="4" placeholder="Instruction"></textarea>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout for Order Details */}
                <div className=" text-sm">
                    {/* First Row: Territory and Region */}
                    <div className="grid grid-cols-2 gap-6 border border-black p-4 rounded-lg">
                        <div><strong>Territory:</strong> North Zone</div>
                        <div><strong>Region:</strong> West India</div>
                    </div>

                    {/* Second Row: Main Content Box */}
                    <div className="border border-black p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div><strong>Emp Code:</strong> EMP12345</div>
                                <div> John Doe (Employee Name)</div>
                                <div><strong>Order Status:</strong> Pending</div>
                                <div><strong>Upload Documents:</strong>
                                    <input type="file" className="mt-1 block w-full text-sm text-gray-500" />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-2">
                                <div><strong>Payment Terms:</strong> 30</div>
                                <div><strong>Inco Terms:</strong> CIF</div>
                                <div><strong>Inco Location:</strong> Mumbai </div>
                                <div><strong>Order Type:</strong>  <select
                                    className="w-12 px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                                    id="citySelect"
                                >
                                    <option className="focus:outline-none focus:border-b bg-white">-- Select --</option>
                                    <option value="Option">Option</option>
                                    <option value="Option">Option</option>
                                    <option value="Option">Option</option>
                                </select></div>
                            </div>
                        </div>
                    </div>

                    {/* Third Row: Delivery Address and Special Instructions */}

                </div>
                {/* Order Now Button */}
                <div className="flex justify-center mt-2">
                    <button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
                        Order Now
                    </button>
                </div>
            </div>
        </div>



    );
};

export default Dashboard;
