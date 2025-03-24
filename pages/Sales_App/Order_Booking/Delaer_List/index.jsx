import React, { useState, useEffect } from "react";
import FilterComponent from "./FilterComponent";
import Layout from "../../Layout";
import { IoIosBasket } from "react-icons/io";
import { useRouter } from "next/router";

import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";


import { IoCallOutline } from "react-icons/io5";


import { IoLocationOutline } from "react-icons/io5";

import { FcNeutralTrading } from "react-icons/fc";
import { FcNews } from "react-icons/fc";
import { FcMultipleSmartphones } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { url } from "@/constants/url";
import axios from "axios";
const Dashboard = () => {

    const router = useRouter();
    const [dealerData, setDealerData] = useState([]);

    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };

    const [filterState, setFilterState] = useState({
        bgId: null,
        buId: null,
        zId: null,
        rId: null,
        wId: null,
        wDes: null,
        tId: null,
        partyName: ""
    });


    useEffect(() => {
        const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
        switch (roleId) {
            case 6:


                setFilterState({
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                });
                break;
            case 5:


                setFilterState({
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                });
                break;
            case 4:


                setFilterState({
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                });
                break;
            case 3:


                setFilterState({
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                });
                break;
            case 10:

                setFilterState({
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: null,
                    rId: null,
                    zId: null,
                    tId: null,
                });
                break;
            default:


                setFilterState({
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                });
                break;
        }
    }, []);



    const gettingDealerData = async () => {
        const { bgId, buId, rId, zId, tId, partyName } = filterState

        try {
            const resp = await axios.get(`${url}/api/get_dealer`, {
                headers: headers,
                params: {
                    c_id: 1,
                    bg_id: bgId || null,
                    bu_id: buId || null,
                    r_id: rId || null,
                    z_id: zId || null,
                    t_id: tId || null,
                    party_name: partyName || null,
                    bst_new: true,

                }
            });
            const respData = await resp.data.data.dealerData;
            setDealerData(respData);
        } catch (error) {
            console.log(error);
            setDealerData([]);
        }
    };


    useEffect(() => {
        if (filterState.bgId !== null) { // Prevent calling on the first render before state update

            gettingDealerData(filterState.partyName);
        }
    }, [filterState]);















    return (

        <div className="bg-gray-200">
            <div className="w-full flex h-12  justify-between items-center px-4  shadow-lg lg:flex-col  ">
                <span className="text-black flex flex-row gap-4 font-bold   ">
                    <FaArrowLeftLong
                        className="self-center "
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Home",
                            })
                        }
                    />
                    <span>List of Dealer</span>
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
            <div className="flex justify-center mt-4">
                <div className="relative w-3/4">
                    <input
                        className="w-full px-10 py-1.5 border border-gray-400 rounded-lg bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"
                        placeholder="Search"
                        value={filterState.partyName}
                        onChange={(e) => setFilterState({ ...filterState, partyName: e.target.value })}
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

            {dealerData?.map((item, idx) => (
                <div key={idx} className="flex m-2 flex-col gap-3 text-sm bg-white shadow-lg rounded-md p-5">
                    <div className="w-full flex justify-between">
                        <span className="font-bold text-base text-black">{item.SAP_customerSAPNo
                        }</span> {/* Reduced font size */}
                        <IoCallOutline size={32} className="text-purple-600" />
                    </div>

                    <span className="font-semibold text-gray-700">{item.party_Name}</span>

                    {/* Address Row */}
                    <div className="inline-flex flex-wrap gap-2">
                        <span className="font-semibold text-black whitespace-nowrap">Address:</span>
                        <span className="text-gray-500 flex-1 min-w-0 break-words">{item.postal_Address}</span>
                    </div>

                    {/* City and Postal in one row */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-row gap-2">
                            <span className="font-semibold text-black">City:</span>
                            <span className="text-gray-500">{item.city}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="font-semibold text-black">Postal:</span>
                            <span className="text-gray-500">{item.pincode
                            }</span>
                        </div>
                    </div>

                    {/* Phone Number Row */}
                    <div className="flex flex-row gap-2">
                        <span className="font-semibold text-black">Phone:</span>
                        <span className="text-gray-500">{item.pmobile}</span>
                    </div>

                    <div className="flex justify-between items-center bg-white mx-2 mt-2">
                        <div className="flex flex-col items-center cursor-pointer"
                            onClick={() => {
                                router.push({
                                    pathname: "/Sales_App/Order_Booking/Order",
                                    query: { sap_code: item.SAP_customerSAPNo },
                                });
                            }} >

                            <FcNews size={32} className="text-indigo-600" />
                            <span className="text-xs text-gray-700 mt-1">Order</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer">
                            <FcNeutralTrading size={32} className="text-green-600" />
                            <span className="text-xs text-gray-700 mt-1">Sale Return</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer"



                        >
                            <FcMultipleSmartphones size={32} className="text-blue-600" />
                            <span className="text-xs text-gray-700 mt-1">Stock</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer"
                            onClick={() => {
                                router.push({
                                    pathname: "/Sales_App/Payment_Collection",
                                    query: {
                                        sap_code: item.SAP_customerSAPNo,
                                        party_name: item.party_Name
                                    },
                                });
                            }}
                        >
                            <FcCurrencyExchange size={32} className="text-purple-600" />
                            <span className="text-xs text-gray-700 mt-1">Payment</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer"

                        >
                            <IoLocationOutline size={32} className="text-red-600" />
                            <span className="text-xs text-gray-700 mt-1">Geo Tag</span>
                        </div>

                    </div>
                </div>
            ))}
        </div>



    );
};

export default Dashboard;
