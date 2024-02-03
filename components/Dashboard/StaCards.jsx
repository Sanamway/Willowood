import React, { useState, useEffect } from "react";
import { RiGroupLine } from "react-icons/ri";
import { PiChartLineUpLight } from "react-icons/pi";

const StaCards = () => {
  const [data, setData] = useState([]);

  const sampleData = [
    { name: "Total Sales", data: "91 Cr" },
    { name: "Target", data: "97 Cr" },
    { name: "Acheivement", data: "80%" }
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(sampleData);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 ">
        {data?.length ? (
          data.map((item,index) => (
            <div key={index} className="bg-white p-1 flex flex-col items-start justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="icon text-left px-2 ">
                <h2 className="text-gray-500 font-bold text-left text-sm whitespace-nowrap">{item.name}</h2>
              </div>
              <div className="flex items-center justify-between w-full px-2">
                <h2 className="text-xl text-[#3B6ADB] font-bold ">{item.data}</h2>
                <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md">
                  <PiChartLineUpLight className="text-[#5d7eda] " size={18}></PiChartLineUpLight>
                </div>
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
