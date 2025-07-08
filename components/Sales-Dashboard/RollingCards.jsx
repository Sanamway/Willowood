import React, { useState, useEffect } from "react";
import { RiGroupLine } from "react-icons/ri";
import { PiChartLineUpLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const StaCards = () => {

  const allRollingTableData = useSelector((state) => state.rolling.rollingTableData
  );


  const [data, setData] = useState([
    { name: "Budget", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].budget).toFixed(2) : 0 },
    { name: "Total Sales", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].actual).toFixed(2) : 0 },
    { name: "RSP", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].target).toFixed(2) : 0 },
    { name: "Managment", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].m_target).toFixed(2) : 0 },
    {
      name: "B.Ach",
      data: allRollingTableData.length && isFinite(allRollingTableData[0].actual / allRollingTableData[0].budget)
        ? `${parseFloat(allRollingTableData[0].actual / allRollingTableData[0].budget * 100).toFixed(2)} %`
        : "-"
    },
    {
      name: "M.Ach",
      data: allRollingTableData.length && isFinite(allRollingTableData[0].actual / allRollingTableData[0].m_target)
        ? `${parseFloat(allRollingTableData[0].actual / allRollingTableData[0].m_target * 100).toFixed(2)} %`
        : "-"
    },
    {
      name: "R.Ach",
      data: allRollingTableData.length && isFinite(allRollingTableData[0].actual / allRollingTableData[0].target)
        ? `${parseFloat(allRollingTableData[0].actual / allRollingTableData[0].target * 100).toFixed(2)} %`
        : "-"
    },
  ]);


  const [effectiveData, setEffectiveData] = useState("")

  useEffect(() => {
    setEffectiveData(allRollingTableData)
    setData([
      { name: "Budget", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].budget).toFixed(2) : 0 },
      { name: "Total Sales", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].actual).toFixed(2) : 0 },
      { name: "RSP", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].target).toFixed(2) : 0 },
      { name: "Managment", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].m_target).toFixed(2) : 0 },


      {
        name: "B.Ach",
        data: allRollingTableData.length && isFinite(allRollingTableData[0].actual / allRollingTableData[0].budget)
          ? `${parseFloat(allRollingTableData[0].actual / allRollingTableData[0].budget * 100).toFixed(2)} %`
          : "-"
      },
      {
        name: "M.Ach",
        data: allRollingTableData.length && isFinite(allRollingTableData[0].actual / allRollingTableData[0].m_target)
          ? `${parseFloat(allRollingTableData[0].actual / allRollingTableData[0].m_target * 100).toFixed(2)} %`
          : "-"
      },
      {
        name: "R.Ach",
        data: allRollingTableData.length && isFinite(allRollingTableData[0].actual / allRollingTableData[0].target)
          ? `${parseFloat(allRollingTableData[0].actual / allRollingTableData[0].target * 100).toFixed(2)} %`
          : "-"
      },

    ]);


  }, [allRollingTableData]);
  console.log("az", effectiveData)
  function Skeleton() {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex items-start justify-start w-full px-1 p-1">
              <div className="w-3/4 px-4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between w-full px-2">
              <div className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="felx flex-col ">
      <div className="h-8 bg-white rounded-t-md flex items-center   ">
        <h2 className="text-[0.75rem] text-black px-2">Target vs Actual achievement</h2>
      </div>
      <div className="flex flex-row gap-2 w-full my-2 justify-between ">


        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[0].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[0].data}</h2>
          </div>
        </div>
        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[3].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[3].data}</h2>
          </div>
        </div>
        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[2].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[2].data}</h2>
          </div>
        </div>



      </div>
      <div className="flex flex-row gap-2 w-full my-2 h-16 justify-center ">

        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[1].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[1].data}</h2>
          </div>
        </div>

      </div>
      <div className="flex flex-row gap-2 w-full my-2 justify-between ">


        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[4].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[4].data}</h2>
          </div>
        </div>
        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[5].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[5].data}</h2>
          </div>
        </div>
        <div className="flex flex-col  bg-white w-40 justify-center gap-2 rounded-md shadow-md text-white text-center">
          <div className="flex flex-row justify-center px-2 ">
            <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{data[6].name}</h2>
          </div>
          <div className="flex items-center justify-center w-full px-2">
            <h2 className="text-xl text-[#3B6ADB] font-bold ">{data[6].data}</h2>
          </div>
        </div>



      </div>
    </div>
  );

};

export default StaCards;
