import React, { useState, useEffect } from "react";
import { RiGroupLine } from "react-icons/ri";
import { PiChartLineUpLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const StaCards = () => {

  const allRollingTableData = useSelector((state) => state.rolling.rollingTableData
  );
  const [data, setData] = useState([
    { name: "Total Sales", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].actual).toFixed(2) : 0 },
    { name: "Target", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].target).toFixed(2) : 0 },
    { name: "Acheivement", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].actual / allRollingTableData[0].target * 100).toFixed(2) : 0 }
  ]);


  useEffect(() => {

    setData([
      { name: "Total Sales", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].actual).toFixed(2) : 0 },
      { name: "Target", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].target).toFixed(2) : 0 },
      { name: "Acheivement", data: allRollingTableData.length ? parseFloat(allRollingTableData[0].actual / allRollingTableData[0].target * 100).toFixed(2) : 0 }
    ]);


  }, [allRollingTableData]);

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
    <>
      <div className="flex flex-row justify-between w-full my-4 ">
        {data?.length ? (
          data.map((item, index) => (
            <div key={index} className="flex flex-col  bg-white w-32 justify-center gap-2 rounded-md shadow-md text-white text-center">
              <div className="flex flex-row justify-center px-2 ">
                <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{item.name}</h2>
              </div>
              <div className="flex items-center justify-center w-full px-2">
                <h2 className="text-xl text-[#3B6ADB] font-bold ">{item.data}</h2>
              </div>
            </div>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
};

export default StaCards;
