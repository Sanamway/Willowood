import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { TbFileDownload } from "react-icons/tb";

import * as XLSX from "xlsx";

import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import { data } from "autoprefixer";

const GridOne = (props) => {
    console.log("formattedTracking data:", props.orderDashboardData.formattedTracking);

    const { orderDashboardData } = props;

    const [height, setHeight] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

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
                    <h2 className="text-lg font-semibold text-white">Order Tracking</h2>
                </div>

                <div
                    className={`overflow-x-auto overflow-y-hidden chat-scrollbar select-none max-h-36`}
                >
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-900 text-center bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Order No
                                </th>
                                <th className="px-20 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Party Name
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Order Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orderDashboardData?.formattedTracking?.length > 0 ? (
                                orderDashboardData.formattedTracking.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                            {item.orderNo}
                                        </td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                            {item.partyName}
                                        </td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">
                                            {item.orderStatus}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
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

export default GridOne;
