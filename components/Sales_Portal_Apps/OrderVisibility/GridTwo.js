import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { TbFileDownload } from "react-icons/tb";

import * as XLSX from "xlsx";

import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import { data } from "autoprefixer";
import axios from "axios";
import { url } from "@/constants/url";

const GridTwo = (props) => {
    console.log("rolling_sales_plan data:", props.orderDashboardData.rolling_sales_plan);
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const { orderDashboardData, setNewData } = props;
    const [height, setHeight] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const handleOnclick = async (code) => {
        try {
            const respond = await axios.get(`${url}/api/get_order_visibilty_matnr_details`, {
                headers: headers,
                params: {
                    brand_code: code
                }
            });
            const apires = await respond.data.data.materialDetails;

            setNewData(apires);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div
                className={`wrapper mt-2 lg:mt-0 flex-1 ${!height ? "h-full" : "h-full"
                    } lg:w-[55%] bg-white rounded-lg border border-gray-200 flex flex-col ${fullScreen
                        ? "fixed min-w-[100%] h-auto lg:h-full top-8 mx-auto"
                        : "h-full"
                    }`}
            >
                {/* Heading */}
                <div className="px-4 py-2 border-b border-gray-200 bg-blue-600 rounded-lg">
                    <h2 className="text-lg font-semibold text-white">Short Supply - Rolling Sales Plan</h2>
                </div>

                <div
                    className={`overflow-x-auto chat-scrollbar select-none ${orderDashboardData?.rolling_sales_plan?.length > 10
                        ? "h-full"
                        : "h-[8rem]"
                        }`}
                >
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-900 text-center bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Product Name
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    RSP Qty
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Sales Qty
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Stock In Hand
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Short Supply
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">

                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orderDashboardData?.rolling_sales_plan?.length > 0 ? (
                                orderDashboardData.rolling_sales_plan
                                    .filter((item) => item.shortSupply > 0).map((item) => (
                                        <tr key={item.brand_code}>
                                            <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border whitespace-nowrap">
                                                {item.brand_name}
                                            </td>
                                            <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                                {Math.floor(item.rspQty)}
                                            </td>
                                            <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                                {Math.floor(item.actualQty)}
                                            </td>
                                            <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                                {Math.floor(item.stockInHand)}
                                            </td>
                                            <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                                {Math.floor(item.shortSupply)}
                                            </td>
                                            <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                                <button className="text-blue-600 hover:underline focus:outline-none" onClick={() => handleOnclick(item.brand_code)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default GridTwo;