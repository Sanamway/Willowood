import React, { useState, useEffect } from "react";
import { RiGroupLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";

const CustomerCards = () => {
  const [data, setData] = useState([]);

  const sampleData = [
    { name: "Active Members", data: "675" },
    { name: "New Customers", data: "675" },
    { name: "Inactive Customers", data: "675" },
    { name: "Customers Overdue", data: "675" },
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(sampleData);
    }, 9000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function Skeleton() {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
        {data?.length ? (
          data.map((item, index) => (
            <div key={index} className="bg-white p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
              <div className="icon ">
                <h2 className="text-gray-500 font-bold  text-sm whitespace-nowrap">{item.name}</h2>
              </div>
              <div className="flex items-center justify-between w-full px-2">
                <h2 className="text-xl text-[#3B6ADB] font-bold ">675</h2>
                <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md">
                  <RiGroupLine className="text-[#5d7eda] " size={18}></RiGroupLine>
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

export default CustomerCards;
