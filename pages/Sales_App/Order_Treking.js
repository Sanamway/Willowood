import React, { useState } from 'react';
import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import { url } from '@/constants/url';
import moment from 'moment';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";
import { FaUserNinja } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FcBusinessman } from "react-icons/fc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiOnTarget } from "react-icons/gi";
import { FcBullish } from "react-icons/fc";
import { VscFeedback } from "react-icons/vsc";
import { TbView360Number } from "react-icons/tb";
import { RxText } from "react-icons/rx";
import { FcCalendar } from "react-icons/fc";
import { GiExitDoor } from "react-icons/gi";
import { GiGrass } from "react-icons/gi";
import { FcSportsMode } from "react-icons/fc";
import { IoWalkSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiPlantRoots } from "react-icons/gi";
import { PiPresentationChartLight } from "react-icons/pi";
import { FcRules } from "react-icons/fc";
import { CiBoxes } from "react-icons/ci";
import { BiCartDownload } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { FiClipboard } from 'react-icons/fi';
import { GiTimeSynchronization } from 'react-icons/gi';
import { FaBitcoinSign } from 'react-icons/fa6';
import { FiSettings } from "react-icons/fi";
import { GiFactory } from "react-icons/gi";
import { FaPrescription, FaCuttlefish, FaFileInvoice } from "react-icons/fa";
import { FcInTransit } from "react-icons/fc";
import { MdOutlineInventory2 } from "react-icons/md";
const iconComponents = {
    FiSettings,
    GiFactory,
    FcInTransit,
    FaPrescription,
    FaCuttlefish,
    FaFileInvoice,
    MdOutlineInventory2,
    FaBitcoinSign,
    GiTimeSynchronization,
    FiClipboard,
    MdOutlineQrCodeScanner,
    RiContactsBookFill,
    PiBankFill,
    FaUserNinja,
    CiBank,
    CiWallet,
    SlNotebook,
    HiOutlineBanknotes,
    FcBusinessman,
    FaRegCircleCheck,
    GiOnTarget,
    FcBullish,
    VscFeedback,
    TbView360Number,
    RxText,
    FcCalendar,
    GiExitDoor,
    GiGrass,
    FcSportsMode,
    IoWalkSharp,
    FaPeopleGroup,
    GiPlantRoots,
    PiPresentationChartLight,
    FcRules,
    CiBoxes,
    BiCartDownload,
    BsImages,
};
const statuses = [
    {
        title: "Order Rescheduled",
        description: "Delivery on pause",
        date: "3rd February, 11:19 PM",
        location: "San Francisco, CA",
        completed: false,
    },
    {
        title: "Order Planned",
        description: "Order Packed and ready for dispatch",
        date: "3rd February, 11:19 PM",
        location: "San Francisco, CA",
        completed: true,
    },
    {
        title: "Order Confirmed",
        description: "Order Confirmed by the store.",
        date: "3rd February, 11:19 PM",
        location: "San Francisco, CA",
        completed: true,
    },
];


const OrderStatus = () => {
    const router = useRouter()

    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const [orderStatus, setOrderStatus] = useState([])

    const gettingDealerData = async (orderNo) => {
        try {
            const resp = await axios.get(`${url}/api/get_order_status_list`, {
                headers: headers,
                params: {
                    sap_order_no: orderNo

                }
            });
            const respData = await resp.data.data;
            setOrderStatus(respData)
        } catch (error) {
            console.log(error);
            setOrderStatus([])
        }
    };

    console.log("cvnm", orderStatus)

    const [orderDetails, setOrderDetails] = useState({})
    useEffect(() => {
        if (!orderDetails.order_no) return
        gettingDealerData(orderDetails.order_no)
    }, [orderDetails.order_no])


    useEffect(() => {
        if (!router.query) return
        setOrderDetails(router.query)
    }, [router.query])
    console.log("LKJ", orderDetails)
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-400 mb-4">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Order_History_Mobile",
                            })
                        }
                    />
                    Delivery Status List
                </span>
            </div>

            {/* Order Details Section */}
            <div className="bg-blue-50 p-4 border rounded-md mb-4 text-sm">
                <div className="flex justify-between font-semibold">
                    <span>SAP Code</span>
                    <span>Order No</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>{orderDetails.sap_code}</span>
                    <span>{orderDetails.order_no}</span>
                </div>

                <div className="font-semibold">Party Name</div>
                <div className="mb-2">{orderDetails.party_name}</div>

                <div className="font-semibold">Delivery Address</div>
                <div className="whitespace-pre-wrap mb-2">{orderDetails.address}</div>

                <div className="font-semibold flex justify-between">
                    <span>SAP Order Amount</span>
                    <span>{orderDetails.amount}</span>
                </div>
            </div>

            {/* Order Status List */}
            <div className="p-4">
                {



                    orderStatus.map(item => {
                        console.log("vcx", { item })
                        return [item].map((status, index) => (
                            <div
                                key={index}
                                className="flex gap-3 items-start border-l-4 pl-4 mb-4 last:mb-0"
                                style={{ borderColor: status.completed ? "#10b981" : "#3b82f6" }}
                            >
                                {/* {status.completed ? (
                                    <IoCheckmarkCircle className={status.status_details?.color_code} size={24} />
                                ) : (
                                    <IoEllipseOutline className="text-blue-500" size={24} />
                                )} */}

                                {status.status_details?.icon && iconComponents[status.status_details?.icon]
                                    ? React.createElement(iconComponents[status.status_details?.icon], {
                                        className: `${status.status_details?.color_code} mt-4`,
                                        size: 24
                                    })
                                    : null}
                                {/* <IoCheckmarkCircle className={status.status_details?.color_code} size={24} /> */}
                                <div>
                                    <h3 className="font-semibold text-gray-800">{status.order_status}</h3>
                                    <p className="text-gray-600 text-sm">{status.status_details?.detail_desc}</p>
                                    <p className="text-gray-400 text-xs">{status.location} - {moment(status.transact_date_time).format('Do MMMM, hh:mm A')}</p>
                                </div>
                            </div>
                        ))
                    }

                    )
                }
            </div>
        </div>
    );
};

export default OrderStatus;