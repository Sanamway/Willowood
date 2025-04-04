import React, { useState, useEffect, useRef } from "react";
// import { Bar, Chart } from "react-chartjs-2";
import { TbFileDownload } from "react-icons/tb";
import GraphTable from "./GraphTable";
import * as FileSaver from 'file-saver'
import * as  XLSX from 'xlsx'
import { FiMaximize, FiMinimize, FiMinus, FiPlus } from "react-icons/fi";

const TableChart = (props) => {
  const { lab, datas, heading } = props;
  const [height, setHeight] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);


  //excel export download
  const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;chartset=UTF-8`;
  const fileExtension = `.xlsx`;
  const exportExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(datas);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${heading}${fileExtension}`);
  };
  console.log("mlop", heading)
  return (
    <>

      <div
        className={`wrapper mt-2 lg:mt-0 ${
          !height ? "h-72 " : "h-auto"
        } lg:w-[100%] bg-white  rounded-lg border border-gray-200 flex flex-col ${
          fullScreen ? "fixed min-w-[100%]  h-auto lg:min-h-[84%]  top-8 mx-auto" : " h-auto"
        } `}
      >
        <div className={`flex text-blue-500 items-center justify-between rounded-t-md  p-2 ${props.color} `}>
          <div className="font flex flex-col ">
            <h2 className="text-xs font-bold font-arial">{props.title}</h2>
          </div>

          <div className="btns flex items-center gap-2">
            <button >
              <TbFileDownload onClick={(e) => exportExcel(heading)} size={20}></TbFileDownload>
            </button>
            {fullScreen ? (
              <button className="lg:block hidden" onClick={() => setFullScreen(false)}>
                <FiMinimize></FiMinimize>
              </button>
            ) : (
              <button className="lg:block hidden" onClick={() => setFullScreen(true)}>
                <FiMaximize></FiMaximize>
              </button>
            )}
            {!height ? (
              <button className={`${fullScreen && "hidden"}`} onClick={() => setHeight(true)}>
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
          < GraphTable
            className={`min-w-full lg:max-h-64  ${fullScreen ? "lg:max-h-[84%]" : ""} px-2`}
            data={datas}
            heading={props.heading}
          />
        )}
      </div>

    </>
  );
};

export default TableChart;
