import moment from "moment";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { useSelector } from "react-redux";
const SaleSummary = () => {



  const [data, setData] = useState(
    [{ name: "Last Yr Till", data: "0" },
    { name: "Last Yr", data: "0" },
    { name: "This Yr", data: "0" }]

  );
  const allLastyeartilldata = useSelector((state) => state.rspAnalytics.rspAnalyticalData.querylastyeartilldataR?.[0]?.totalNewPriceValue)
  const allThisyeartilldata = useSelector((state) => state.rspAnalytics.rspAnalyticalData.querythisyearR?.[0]?.totalNewPriceValue);
  const allLastyeardata = useSelector((state) => state.rspAnalytics.rspAnalyticalData.querylastyearR?.[0]?.totalNewPriceValue)

  const allCurrentmonthtilldata = useSelector((state) => state.rspAnalytics.rspAnalyticalData.CurrentmonthDataR?.[0]?.totalNewPriceValue || 0);
  const allLastmonthtilldata = useSelector((state) => state.rspAnalytics.rspAnalyticalData.lastmonthDataR?.[0]?.totalNewPriceValue || 0)
  const allLastmonthdata = useSelector((state) => state.rspAnalytics.rspAnalyticalData.lastmonththisyearR?.[0]?.totalNewPriceValue || 0)
  useEffect(() => {
    setData(
      [{ name: "Last Yr Till", data: allLastyeartilldata },
      { name: "Last Yr", data: allThisyeartilldata },
      { name: "This Yr", data: allThisyeartilldata }]

    );
  }, [allLastyeartilldata, allThisyeartilldata, allLastyeardata]);
  const [data2, setData2] = useState(
    [{ name: "Current Month", data: 0 },
    { name: "Last Month", data: 0 },
    { name: "This Month", data: 0 }]

  );
  useEffect(() => {
    setData2(
      [{ name: "Current Month", data: allCurrentmonthtilldata },
      { name: "Last Month", data: allLastmonthtilldata },
      { name: "This Month", data: allLastmonthdata }]

    );
  }, [allCurrentmonthtilldata, allLastmonthtilldata, allLastmonthdata]);

  console.log("jkl", data)
  return (
    <>
      <div className="h-6 bg-white rounded-t-md flex items-center px-2  mt-4">
        <h2 className="text-[0.75rem]">Sales Summary</h2>
      </div>
      <div className="w-full px- mt-[3px] flex lg:flex-row flex-col gap-2 font-arial rounded-b-md">
        <div className="bg-white p-2 lg:w-1/2  flex flex-col items-center justify-center gap-2 rounded-b-md shadow-md text-white text-center">
          <div className="flex items-center justify-between w-full text-[0.75rem] text-[#3A322E] ">
            <div className="flex items-center gap-2 ">
              <div className="bg-blue-50 px-1.5 py-1.5 rounded-full">
                <FaCalendarAlt size={20} className="text-blue-400 bg-blue-100"></FaCalendarAlt>
              </div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Current Year Till Date Sale</h2>
                <h2>{moment().format("YYYY")}</h2>
              </div>
            </div>

            <h2 className="font-bold">₹{data[2].data}</h2>
          </div>

          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Year Till Date Sale</h2>
                <h2>{moment().format("YYYY")}</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data[0].data}</h2>
          </div>
          <div className="flex items-center justify-between w-full text-[0.75rem] text-[#3A322E]">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Year Total Sale</h2>
                <h2>{moment().format("YYYY")}</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data[1].data}</h2>
          </div>

          <div className="flex items-center justify-end w-full text-gray-600">
            <h2 className="text-[0.6rem]">
              Increase by <span className="bg-[#ECF9F4] px-1 py-1 rounded-md"> 0%</span> this month
            </h2>
          </div>
        </div>

        <div className="bg-white p-2 lg:w-1/2  flex flex-col items-center justify-center gap-2 rounded-b-md shadow-md text-white text-center">
          <div className="flex items-center justify-between w-full text-[0.75rem] text-[#3A322E] ">
            <div className="flex items-center gap-2 ">
              <div className="bg-orange-100 px-1.5 py-1.5 rounded-full">
                <LuCalendarClock size={20} className="text-orange-400"></LuCalendarClock>
              </div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Current Month Till Date Sale</h2>
                <h2>December</h2>
              </div>
            </div>

            <h2 className="font-bold">₹{data2[0].data}</h2>
          </div>

          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Month Till Date Sale</h2>
                <h2>26-12-2022</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data2[1].data}</h2>
          </div>
          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Month Total Sale</h2>
                <h2>12-2022</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data2[2].data}</h2>
          </div>
          <div className="flex items-center justify-end w-full text-gray-600">
            <h2 className="text-[0.6rem]">
              Decrease by <span className="bg-[#ECF9F4] px-1 py-1 rounded-md">81.82%</span> this month
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleSummary;
