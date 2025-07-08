import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const GridThree = (props) => {
    const { datas, heading } = props;
    const { gridData } = props;
    const [height, setHeight] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [collapsed, setCollapsed] = useState(false); // ✅ NEW state to track collapse

    useEffect(() => {
        setCollapsed(false)
    }, [gridData])
    console.log("_iop", collapsed)

    return (
        <div
            className={`wrapper mt-2 lg:mt-0 flex-1 ${!height ? "h-full " : "h-full"
                } lg:w-[55%] bg-white rounded-lg border border-gray-200 flex flex-col ${fullScreen
                    ? "fixed min-w-[100%] h-auto lg:h-full top-8 mx-auto"
                    : "h-full"
                }`}
        >
            {/* Heading */}
            <div className="px-4 py-2 border-b border-gray-200 bg-blue-600 rounded-t-lg flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Order Overview</h2>

                {/* Toggle Button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white hover:text-gray-200 focus:outline-none"
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    {collapsed ? (
                        <FiChevronDown size={20} />
                    ) : (
                        <FiChevronUp size={20} />
                    )}
                </button>
            </div>

            {/* Content */}
            {!collapsed && (
                <div
                    className={`overflow-x-auto chat-scrollbar select-none ${["ab"].length > 10 ? "h-full" : "h-[16rem]"
                        }`}
                >
                    <table className="w-full text-sm text-left text-gray-500 h-full">
                        <thead className="text-xs text-gray-900 text-center bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    SKU
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Item Name
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    RSP Qty
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Ordered Qty
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Shipped Qty
                                </th>
                                <th className="px-4 py-2 text-left text-[0.7rem] font-bold text-gray-800 border">
                                    Balance Qty
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200 break-normal">
                            {
                                gridData?.map((item) =>
                                    <tr>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">{item.sku}</td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border whitespace-nowrap">{item.itemName}</td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">{item.rspQty}</td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">{item.orderedQty}</td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">{item.shippedQty}</td>
                                        <td className="px-4 py-2 text-left text-[0.65rem] text-gray-900 border">{item.balanceQty}</td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GridThree;