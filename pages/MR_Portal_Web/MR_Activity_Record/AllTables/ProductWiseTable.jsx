import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { TbFileDownload } from "react-icons/tb";

import * as XLSX from "xlsx";

import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import { data } from "autoprefixer";

const ProductWiseTable = (props) => {
    const { datas, heading } = props;

    const [height, setHeight] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const handledownloadExcel = () => {
        let excelData;

        excelData = datas.map((item, idx) => ({
            "Product Brand": item[Object.keys(item)[0]],
            "FY Sales Val 21-22": item[Object.keys(item)[2]],
            "FY Sales Val 22-23": item[Object.keys(item)[4]],
            "Annual Budget Qty": item[Object.keys(item)[5]],
            "Annual Budget Val": item[Object.keys(item)[6]],
            "MTD Sale Qty": "",
            "MTD Budget Val": item[Object.keys(item)[11]],
            "MTD RSP Value": item[Object.keys(item)[15]],
            "MTD Actual Sale Value": item[Object.keys(item)[23]],
            "MTD Budget Achivement %":
                item[Object.keys(item)[11]] !== 0
                    ? (
                        (item[Object.keys(item)[23]] / item[Object.keys(item)[11]]) *
                        100
                    ).toFixed(2) + " %"
                    : "0 %",
            "MTD RSP Achivement %":
                item[Object.keys(item)[15]] !== 0
                    ? (
                        (item[Object.keys(item)[23]] / item[Object.keys(item)[15]]) *
                        100
                    ).toFixed(2) + " %"
                    : "0 %",
            "YTD Sale Qty": item[Object.keys(item)[7]],
            "YTD Budget Value": item[Object.keys(item)[25]],
            "YTD Actual Sale Value": item[Object.keys(item)[8]],
            "YTD Budget Achivement %":
                item[Object.keys(item)[25]] !== 0
                    ? (
                        (item[Object.keys(item)[8]] / item[Object.keys(item)[25]]) *
                        100
                    ).toFixed(2) + " %"
                    : "0 %",
            "YTD RSP Achivement %": "0%",
            "Anual Qty Achivement %":
                item[Object.keys(item)[5]] !== 0
                    ? (
                        (item[Object.keys(item)[7]] / item[Object.keys(item)[5]]) *
                        100
                    ).toFixed(2) + " %"
                    : "0 %",
            "Anual Value Achivement %":
                item[Object.keys(item)[6]] !== 0
                    ? (
                        (item[Object.keys(item)[8]] / item[Object.keys(item)[6]]) *
                        100
                    ).toFixed(2) + " %"
                    : "0 %",
        }));


        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const excelBlob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const filename = `${heading}.xlsx`;
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // For IE
            window.navigator.msSaveOrOpenBlob(excelBlob, filename);
        } else {
            // For other browsers
            const url = window.URL.createObjectURL(excelBlob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };
    const getFirstColumn = (item) => {
        if (heading === "Month") {
            return item.month_year
        }
        else if (heading === "Geo Area") {
            return item.territory_name.territory_name

        }
        else if (heading === "Employee") { }
        return item.emp_code
    }
    return (
        <>
            <div
                className={`wrapper mt-2  lg:mt-0 flex-1 ${!height ? "h-full " : "h-full"
                    } lg:w-[55%] bg-white  rounded-lg border border-gray-200 flex flex-col ${fullScreen
                        ? "fixed min-w-[100%]  h-auto lg:h-full  top-8 mx-auto"
                        : " h-full"
                    } `}
            >
                <div
                    className={`flex text-blue-500 items-center justify-between rounded-t-md  p-2 `}
                >
                    <div className="font flex flex-col ">
                        <h2 className="text-xs font-bold font-arial">{props.title}</h2>
                    </div>

                    <div className="btns flex items-center gap-2">
                        <button onClick={() => setHeight(false)}>
                            <TbFileDownload
                                onClick={(e) => handledownloadExcel()}
                                size={20}
                            ></TbFileDownload>
                        </button>
                        {fullScreen ? (
                            <button
                                className="lg:block hidden"
                                onClick={() => setFullScreen(false)}
                            >
                                <FiMinimize></FiMinimize>
                            </button>
                        ) : (
                            <button
                                className="lg:block hidden"
                                onClick={() => setFullScreen(true)}
                            >
                                <FiMaximize></FiMaximize>
                            </button>
                        )}
                        {!height ? (
                            <button
                                className={`${fullScreen && "hidden"}`}
                                onClick={() => setHeight(true)}
                            >
                                <FiMinus></FiMinus>
                            </button>
                        ) : (
                            <button onClick={() => setHeight(false)}>
                                <FiPlus></FiPlus>
                            </button>
                        )}
                    </div>
                </div>
                {!height && (
                    <div
                        className={`overflow-x-auto chat-scrollbar select-none ${["ab"].length > 10 ? "h-full" : "h-[16rem]"
                            }`}
                    >
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-full">
                            <thead className="text-xs text-gray-900 text-center bg-gray-100">
                                <tr>
                                    <th className="px-4 py-1 text-center text-[0.6rem] border font-medium text-gray-800">
                                        Crop
                                    </th>

                                    {/* Get the products from the crop with the largest product array */}
                                    {(() => {
                                        // Find the crop with the largest 'products' array
                                        const maxProductsCrop = datas.reduce((max, current) => {
                                            return current.products.length > max.products.length ? current : max;
                                        }, datas[0]);

                                        // Return product names as headers
                                        return maxProductsCrop?.products.map((el) => (
                                            <th
                                                key={el.product}
                                                className="px-2 py-1 text-center text-[0.6rem] border font-medium text-gray-800"
                                            >
                                                {el.product}
                                            </th>
                                        ));
                                    })()}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 break-normal">
                                {datas.map((item, idx) => (
                                    <tr key={idx}>
                                        {/* Crop Name Column */}
                                        <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                                            {item.crop}
                                        </td>

                                        {/* Display the count of products for each crop based on the header products */}
                                        {(() => {
                                            const maxProductsCrop = datas.reduce((max, current) => {
                                                return current.products.length > max.products.length ? current : max;
                                            }, datas[0]);
                                            // Find the matching product count for each product in the current crop
                                            return maxProductsCrop.products.map((product) => {
                                                const matchingProduct = item.products.find(
                                                    (prod) => prod.product === product.product
                                                );
                                                return (
                                                    <td
                                                        key={product.product}
                                                        className="px-2 py-1 text-center text-[0.6rem] text-gray-900 border"
                                                    >
                                                        {matchingProduct ? props.title === "Month wise - Crop & Product Wise Demo ( Nos )" ? matchingProduct.count : matchingProduct.recDoseSum : 0}
                                                    </td>
                                                );
                                            });
                                        })()}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductWiseTable;
