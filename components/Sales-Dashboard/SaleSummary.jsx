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
  const lastYrCurrentMonth = useSelector((state) => state.rspAnalytics.rspAnalyticalData.lastyearCurrentmonthDataR?.[0]?.totalNewPriceValue || 0)

  const additionalReduxData = useSelector((state) => state.additionalData.additionalData)

  const [additionalData, setAdditionalData] = useState({})

  useEffect(() => {
    setAdditionalData(additionalReduxData)
  }, [additionalReduxData])
  useEffect(() => {
    setData(
      [{ name: "Last Yr Till", data: allLastyeartilldata },
      { name: "Last Yr", data: allLastyeardata },
      { name: "This Yr", data: allThisyeartilldata }]

    );
  }, [allLastyeartilldata, allThisyeartilldata, allLastyeardata]);
  const [data2, setData2] = useState(
    [{ name: "Current Month", data: 0 },
    { name: "Last Month", data: 0 },
    { name: "This Month", data: 0 },
    { name: "Prev", data: 0 },]

  );
  useEffect(() => {
    setData2(
      [{ name: "Current Month", data: allCurrentmonthtilldata },
      { name: "Last Month", data: allLastmonthtilldata },
      { name: "This Month", data: allLastmonthdata },
      { name: "Prev", data: lastYrCurrentMonth },
      ],



    );
  }, [allCurrentmonthtilldata, allLastmonthtilldata, allLastmonthdata]);


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
                <h2>{additionalData.yr}  ({moment().format("DD MMMM")})</h2>
              </div>
            </div>

            <h2 className="font-bold">₹{data[2].data}</h2>
          </div>

          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Year Till Date Sale</h2>
                <h2>{additionalData.yr - 1}  ({moment().format("DD MMMM")})</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data[0].data}</h2>
          </div>
          <div className="flex items-center justify-between w-full text-[0.75rem] text-[#3A322E]">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Year Total Sale</h2>
                <h2>{additionalData.yr - 1}</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data[1].data}</h2>
          </div>

          {(() => {
            const lastYrSale = Number(data[0]?.data) || 0;
            const currentYrSale = Number(data[2]?.data) || 1; // prevent divide by zero
            const percentChange = 100 - (lastYrSale / currentYrSale * 100);
            console.log("hui", 100 - (lastYrSale / currentYrSale * 100))
            const isDecrease = percentChange < 0;
            const formattedPercent = Math.abs(percentChange).toFixed(2);

            return (
              <div className={`flex items-center justify-end w-full ${isDecrease ? "text-red-600" : "text-green-600"}`}>
                <h2 className="text-[0.6rem]">
                  {isDecrease ? "Decrease by" : "Increase by"}{" "}
                  <span className="bg-[#ECF9F4] px-1 py-1 rounded-md">
                    {formattedPercent}%
                  </span>{" "}
                  this year
                </h2>
              </div>
            );
          })()}
        </div>

        <div className="bg-white p-2 lg:w-1/2  flex flex-col items-center justify-center gap-2 rounded-b-md shadow-md text-white text-center">
          <div className="flex items-center justify-between w-full text-[0.75rem] text-[#3A322E] ">
            <div className="flex items-center gap-2 ">
              <div className="bg-orange-100 px-1.5 py-1.5 rounded-full">
                <LuCalendarClock size={20} className="text-orange-400"></LuCalendarClock>
              </div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Current Month Till Date Sale</h2>
                <h2>{moment(additionalData.month).format("MMMM")} ({moment().format("DD")} {additionalData.yr})</h2>
              </div>
            </div>

            <h2 className="font-bold">₹{data2[0].data}</h2>
          </div>

          {/* <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Month Till Date Sale</h2>
                <h2>{moment(additionalData.month).subtract(1, 'months').format("MMMM")}  ({moment().format("DD")} {additionalData.yr})</h2>
              </div>
            </div>
            <h2 className="font-bold">₹{data2[1].data}</h2>
          </div> */}
          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Prev Year - Current Month Till date sale</h2>
                <h2>{moment(additionalData.month).format("MMMM")} ({moment().format("DD")} {additionalData.yr - 1})</h2>
              </div>

            </div>
            <h2 className="font-bold">₹{data2[3].data}</h2>
          </div>
          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[0.75rem] text-gray-600 font-semibold">Last Month Total Sale</h2>
                <h2>{moment(additionalData.month).subtract(1, 'months').format("MMMM")} ({additionalData.yr})</h2>
              </div>

            </div>
            <h2 className="font-bold">₹{data2[2].data}</h2>
          </div>


          {(() => {
            const tillDateSale = Number(data2[1]?.data) || 0;
            const totalSale = Number(data2[0]?.data) || 1; // avoid division by zero
            const percentChange = 100 - (tillDateSale / totalSale * 100);
            const isDecrease = percentChange < 0;
            const formattedPercent = Math.abs(percentChange).toFixed(2);

            return (
              <div className={`flex items-center justify-end w-full ${isDecrease ? "text-red-600" : "text-green-600"}`}>
                <h2 className="text-[0.6rem]">
                  {isDecrease ? "Decrease by" : "Increase by"}{" "}
                  <span className="bg-[#ECF9F4] px-1 py-1 rounded-md">
                    {formattedPercent}%
                  </span>{" "}
                  this month
                </h2>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
};

export default SaleSummary;
