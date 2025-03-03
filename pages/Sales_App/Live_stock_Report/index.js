import React, { useState, useEffect } from "react";


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

    const modalData = [
        {
            loc: "A1",
            batch: "B123",
            case: 5,
            qty: 100,
            expDate: "-",
            mfgDate: "-",
            sixMonth: "Pass",
            twelveMonth: "Pass",
            oneYear: "Fail",
            status: "Av"
        },
        {
            loc: "A2",
            batch: "B456",
            case: 10,
            qty: 200,
            expDate: "-",
            mfgDate: "-",
            sixMonth: "Pass",
            twelveMonth: "Pass",
            oneYear: "Pass",
            status: "Out "
        },
        {
            loc: "B3",
            batch: "C789",
            case: 7,
            qty: 150,
            expDate: "-",
            mfgDate: "-",
            sixMonth: "Fail",
            twelveMonth: "Pass",
            oneYear: "Pass",
            status: "Av"
        },
        {
            loc: "C4",
            batch: "D012",
            case: 3,
            qty: 50,
            expDate: "-",
            mfgDate: "-",
            sixMonth: "Pass",
            twelveMonth: "Fail",
            oneYear: "Fail",
            status: "Out "
        },
        {
            loc: "D5",
            batch: "E345",
            case: 12,
            qty: 300,
            expDate: "-",
            mfgDate: "-",
            sixMonth: "Pass",
            twelveMonth: "Pass",
            oneYear: "Pass",
            status: "Av"
        }
    ];


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
                        <span><strong>Region</strong>: XXXXXX</span>
                        <span><strong>Zone</strong>: XXXX</span>

                    </div>
                    <div className="flex justify-between">
                        <span><strong>Warehouse Code</strong>: XXXX</span>
                        <span><strong>Store Location</strong>: XXXX</span>

                    </div>
                    <div className="flex justify-between">
                        <span><strong>Warehouse Name</strong>: XXXXXX</span>
                        <span><TbFileDownload size={28} className="text-green-400" /></span>
                    </div>


                </div>
            </div>


            {/* Search & Dropdown Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-1  mx-2 mt-2 flex flex-row ">
                <select
                    className="w-24 px-3 py-2 border border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500 text-xs"
                    id="citySelect"
                >
                    <option value={""} className="focus:outline-none focus:border-b bg-white text-xs">-- Select --</option>
                    <option value="Option">Option</option>
                    <option value="Option">Option</option>
                    <option value="Option">Option</option>
                </select>

                <div className="relative w-full">
                    <input
                        className="w-full h-10 px-10 py-1.5 border border-gray-400  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
                        {data?.map((item, idx) => (
                            <tr key={idx} className="border-b">
                                {/* Description with hyperlink */}
                                <td className="px-4 py-2 text-left whitespace-nowrap flex items-center gap-2">
                                    <div>

                                        Material Code  - Brand Code -  Category
                                        <br />
                                        XXXXXXXXXX    </div>
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
                                <td className="px-4 py-2 text-left whitespace-nowrap  ">
                                    Case
                                </td>

                                {/* Price (disabled) */}
                                <td className="px-4 py-2 text-left whitespace-nowrap   ">
                                    1200
                                </td>

                                {/* Value (disabled) */}
                                <td className="px-4 py-2 text-left whitespace-nowrap text-xs ">
                                    <button
                                        onClick={() => setOpenModal(true)}
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
                Live Stock updated: 12-06-2024 Time: 11:00 AM
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
                                            <div className="grid grid-cols-10 bg-blue-600 text-white font-semibold p-2 rounded-t-lg text-xs ml-4 md:text-sm">
                                                <div className="px-2 py-1">Loc</div>
                                                <div className="px-2 py-1">Batch</div>
                                                <div className="px-2 py-1">Case</div>
                                                <div className="px-2 py-1">Qty</div>
                                                <div className="px-2 py-1">Exp Date</div>
                                                <div className="px-2 py-1">MFG Date</div>
                                                <div className="px-2 py-1">6M</div>
                                                <div className="px-2 py-1">12M</div>
                                                <div className="px-2 py-1">1Y</div>
                                                <div className="px-2 py-1">Status</div>
                                            </div>

                                            {/* Table Rows */}
                                            <div className="divide-y divide-gray-300 bg-white ">
                                                {modalData?.map((item, idx) => (
                                                    <div key={idx} className="grid grid-cols-10 p-2  border-b text-center text-xs md:text-sm">
                                                        <div>{item.loc}</div>
                                                        <div>{item.batch}</div>
                                                        <div>{item.case}</div>
                                                        <div>{item.qty}</div>
                                                        <div>{item.expDate}</div>
                                                        <div>{item.mfgDate}</div>
                                                        <div>{item.sixMonth}</div>
                                                        <div>{item.twelveMonth}</div>
                                                        <div>{item.oneYear}</div>
                                                        <div className={item.status === "Available" ? "text-green-500" : "text-red-500"}>
                                                            {item.status}
                                                        </div>
                                                    </div>
                                                ))}
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
