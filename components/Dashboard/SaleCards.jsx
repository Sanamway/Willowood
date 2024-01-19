import React, { useState, useEffect } from "react";
import { GiNetworkBars } from "react-icons/gi";

const SaleCards = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const sampleData = [{ name: "Total Sales", data: "67Cr" }];
  const sampleData2 = [
    { name: "Diamond", data: "43 Cr" },
    { name: "Gold", data: "23 Cr" },
    { name: "Bronze", data: "35 Cr" }
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(sampleData);
      setData2(sampleData2);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function Skeleton() {
    return (
      <>
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="bg-white p-2 lg:w-[40%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
            <div className="flex items-center justify-between w-full  px-1">
              <div className=" px-1 py-1 rounded-md">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-20 h-3 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  function Skeleton2() {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between w-full  px-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-[4.75rem] h-3 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-4"> */}
      <div className="w-full px- mt-4 flex lg:flex-row flex-col gap-3 font-arial   rounded-md">
        {data.length ? (
          data.map((item,index) => (
            <div key={index} className="bg-white p-2 lg:w-[40%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="flex items-center justify-between w-full px-1">
                <div className=" px-1 py-1 rounded-md">
                  <GiNetworkBars className="text-red-400 " size={30}></GiNetworkBars>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm font-bold whitespace-nowrap">{item.name}</h2>
                  <h2 className="text-xl text-[#ADBD5B] font-bold">67 Cr</h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Skeleton />
        )}

        <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
          {data2.length ? (
            data2.map((item, index) => (
              <div
              key={index}
                className={`flex  items-center justify-between w-full gap-2 p-1 ${
                  index == 1 ? "md:border-r-2 md:border-l-2 px-2" : ""
                }`}
              >
                <h2 className="text-gray-500 text-sm font-bold"> {item.name}: </h2>
                <h2 className="text-lg text-[#ADBD5B] font-bold whitespace-nowrap">{item.data}</h2>
              </div>
            ))
          ) : (
            <Skeleton2></Skeleton2>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleCards;
