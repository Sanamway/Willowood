import React, { useState, useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { TbFileDownload } from "react-icons/tb";

import * as XLSX from "xlsx";

import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";
import { data } from "autoprefixer";

const MonthWiseTable = (props) => {
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
        className={`wrapper mt-2 lg:mt-0 flex-1 ${!height ? "h-full " : "h-full"
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
              <thead className="text-xs text-gray-900 text-center bg-gray-100 ">
                <tr className="">
                  <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    {props.heading}
                  </th>

                  <th className="px-4 py-1 text-center text-[0.6rem]  border font-medium text-gray-800 t">
                    Demo
                  </th>

                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    Area Cover
                  </th>

                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    No of Follow Up
                  </th>

                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    Field Day
                  </th>
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    Farmer Paric
                  </th>
                  <th className="px-2 py-1 text-center text-[0.6rem]   border font-medium text-gray-800   ">
                    FGM
                  </th>
                  <th className="px-2 py-1 text-center text-[0.6rem]   border font-medium text-gray-800   ">
                    OFM
                  </th>
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    MFM
                  </th>

                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    RTP
                  </th>

                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    DV
                  </th>
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    NFR
                  </th>
                  <th className="px-2 py-1 text-center text-[0.6rem]  border font-medium text-gray-800   ">
                    Exp.
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 break-normal ">
                {datas.map((item, idx) =>
                  <tr key={idx}>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {getFirstColumn(item)}


                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.demo}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.area_cover}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.no_of_followup}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.f_day}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.farmer_participate}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.fgm}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.ofm}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.mfm}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.rtp}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.dv}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.nfr}
                    </td>
                    <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border">
                      {item.exp}
                    </td>
                  </tr>)}
                {datas.length ? <tr>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    Total
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.demo || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.area_cover || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.no_of_followup || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.f_day || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.farmer_participate || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.fgm || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.ofm || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.mfm || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.rtp || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.dv || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.nfr || 0), 0)}
                  </td>
                  <td className="px-2 text-center py-1 text-[0.6rem] text-gray-900 border font-bold">
                    {datas.reduce((sum, item) => sum + (item.exp || 0), 0)}
                  </td>
                </tr> : ""}

              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MonthWiseTable;
