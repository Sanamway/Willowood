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
import Collection from "./Sfa_payment_collection";
import History from "./Sfa_payment_history";
import { useRouter } from "next/router";

const Dashboard = () => {

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

    const [tabType, setTabType] = useState("Payment")

    return (

        <div className="bg-gray-200">
            {/* Header Section */}
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-400 ">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Order_Booking/Delaer_List"
                            })
                        }
                    />
                    <span className="flex flex-row gap-2 justify-center items-center"> {tabType === "Payment" ? <span>Payment Collection</span> : <span>Report Analysis</span>}   </span>
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

            <div className="flex w-full border-black border-b-2 items-start gap-8 mt-2">
                <button
                    className={`${tabType === "Payment"
                        ? " flex  gap-2 inline-block  rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm bg-black/5"
                        : " flex  gap-2  inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm bg-black/8"
                        }`}
                    onClick={() => setTabType("Payment")}
                >
                    Payment Collection
                </button>{" "}
                <button
                    className={`${tabType === "Report"
                        ? " flex  gap-2 inline-block rounded-t py-2 px-4 font-semibold  border-b-2 border-orange-500 text-black text-sm bg-black/5"
                        : " flex  gap-2   inline-block  text-black rounded-t py-2 px-4 font-semibold  text-sm bg-black/8"
                        }`}
                    onClick={() => setTabType("Report")}
                >
                    Report Analysys
                </button>
            </div>


            {tabType === "Payment" ? (

                <Collection data={{ sapCode: router.query.sap_code, partyName: router.query.party_name }} />

            ) : (

                <History data={{ sapCode: router.query.sap_code, partyName: router.query.party_name }} />

            )}
        </div>



    );
};

export default Dashboard;
