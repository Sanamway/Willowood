import React, { useState, useEffect } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { FaFileDownload } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RxCodesandboxLogo } from "react-icons/rx";
import { PiQrCode } from "react-icons/pi";
const ViewCard = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const sampleData = [
    { name: "Download Ledger", data: "67Cr", icon: FaFileDownload },
    { name: "View Orders", data: "67Cr", icon: LuClipboardList },
    { name: "View Products", data: "67Cr", icon: RxCodesandboxLogo },
    { name: "View Schemes", data: "67Cr", icon: PiQrCode }
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(sampleData);
      //   setData2(sampleData2);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function Skeleton() {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-2 lg:w-[25%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center"
          >
            <div className="flex items-center justify-between w-full  px-1">
              <div className=" px-1 py-1 rounded-md">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex  items-center justify-start gap-2">
                <div className="w-24 h-3 mx-2 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
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
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-2 lg:w-[25%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center"
            >
              <div className="flex items-center justify-between w-full px-1">
                <div className=" px-1 py-1 rounded-md">
                  {<item.icon className="text-[#7799B5] " size={30} />}
                </div>
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-[#7799B5] text-sm font-bold whitespace-nowrap">{item.name}</h2>
                  <button className="transition duration-300 ease-in-out">
                    <FaArrowRight className="text-xl text-[#8B8B8B] font-bold cursor-pointer "></FaArrowRight>
                  </button>
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

export default ViewCard;
