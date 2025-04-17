
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCashCoin } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import TotalOutStandPop from "./TotalOsPopup";

import TotalOverDueAmtPop from "./TotalOverDueAmtPop";

const CreditBalance = () => {
  const allCollectionTableData = useSelector((state) => state.collection.collectionTableData
  );

  const [data, setData] = useState([])
  useEffect(() => { setData(allCollectionTableData) }, [allCollectionTableData])


  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setOpenTwo(false);
  };

  const handlePopup = (param) => {
    if (param == "Total Outstanding") {
      setOpen(true);
    }
    if (param == "Total Overdue") {
      setOpenTwo(true);
    }
  };

  return (
    <div className=" bg-gray-200  flex flex-col">
      <div className="creditwrapper mt-2 flex flex-col gap-2 ">
        <div className="h-6 bg-white rounded-t-md flex items-center px-2 ">
          <h2 className="text-[0.70rem] text-gray-600 font-bold">Customer Ageing Insight</h2>
        </div>

        <div className="flex-row flex-col gap-3 font-arial   rounded-md bg-white ">
          <div className="flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex-col  items-start justify-between w-full gap-2 p-1">
              <h2 className="text-[0.59rem] text-gray-600 font-semibold font-arial whitespace-nowrap">
                Allocated Credit Limit{" "}
              </h2>
              <h2 className="text-sm text-[#ADBD5B] font-bold whitespace-nowrap">&#8377;{parseFloat(data.reduce((acc, curr) => acc + curr["Credit Limit "], 0).toFixed(2))}</h2>
            </div>
            <div className="flex-col items-start justify-between w-full gap-2 p-1 border-l-[3px] ">
              <h2 className="text-[0.59rem] text-gray-600 font-semibold whitespace-nowrap">
                Utilized Credit Limit
              </h2>
              <h2 className="text-sm text-[#F5A05D] font-bold whitespace-nowrap">&#8377;{parseFloat(parseFloat(data.reduce((acc, curr) => acc + curr["Credit Limit "], 0).toFixed(2)) - parseFloat(data.reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0).toFixed(2))).toFixed(2)}</h2>
            </div>
            <div className="flex-col items-start justify-between w-full gap-2 p-1 border-l-[3px] ">
              <h2 className="text-[0.59rem] text-gray-600 font-semibold whitespace-nowrap">
                Balance Credit Limit
              </h2>
              <h2 className="text-sm text-[#E55769] font-bold whitespace-nowrap">&#8377;{
                parseFloat(data.reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0).toFixed(2))}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="totalwrapper mb-2">
        <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
          <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-between w-full text-gray-600">
              <div className="flex items-center justify-center gap-1 ">
                <div className="px-2 py-2 rounded-full bg-blue-50 ">
                  <BsCashCoin className="text-blue-500" size={20}></BsCashCoin>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-[0.69rem] text-gray-600 font-semibold">Total Outstanding</h2>
                  <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;{parseFloat(data.reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0).toFixed(2))}</h2>
                </div>
              </div>
              <div
                onClick={() => handlePopup("Total Outstanding")}
                className="rounded-full shadow-md cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
          <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-between w-full text-gray-600">
              <div className="flex items-center justify-center gap-1 ">
                <div className="px-2 py-2 rounded-full bg-blue-50 ">
                  <GiAlarmClock className="text-blue-500" size={20}></GiAlarmClock>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-[0.69rem] text-gray-600 font-semibold">Total Overdue</h2>
                  <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;{parseFloat(parseFloat(data.reduce((acc, curr) => acc + curr["180-365"], 0).toFixed(2)) + parseFloat(data.reduce((acc, curr) => acc + curr["366-720"], 0).toFixed(2)) + parseFloat(data.reduce((acc, curr) => acc + curr["720 And Above"], 0).toFixed(2))).toFixed(2)

                  }</h2>
                </div>
              </div>
              <div
                onClick={() => handlePopup("Total Overdue")}
                className="rounded-full shadow-md cursor-pointer"
              >
                <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
          <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-between w-full text-gray-600">
              <div className="flex items-center justify-center gap-1 ">
                <div className="px-2 py-2 rounded-full bg-blue-50 ">
                  <FaMoneyBillTrendUp className="text-blue-500" size={20}></FaMoneyBillTrendUp>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-[0.69rem] text-gray-600 font-semibold">Super Cash Overdue</h2>
                  <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;0.00</h2>
                </div>
              </div>
              <div className="rounded-full shadow-md cursor-pointer">
                <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
              </div>
            </div>
          </div>
        </div>
        {open && <TotalOutStandPop closeModal={closeModal} dueData={data || []}></TotalOutStandPop>}
        {openTwo && <TotalOverDueAmtPop closeModal={closeModal} dueData={data || []}></TotalOverDueAmtPop>}
      </div>
    </div>
  );
};

export default CreditBalance;
