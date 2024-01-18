import React from "react";

import { RxBarChart } from "react-icons/rx";
import { SlNotebook } from "react-icons/sl";
import { IoSpeedometerOutline } from "react-icons/io5";

const SapCards = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        <div className="bg-[#F2F2FE] p-2 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
          <div className="flex items-start justify-between w-full px-1">
            <h2 className="text-gray-500 font-bold text-sm ">Sales Summary</h2>
            <div className=" px-1.5 py-1 bg-[#7480E8] rounded-md">
              <RxBarChart className="text-[#fff]" size={15}></RxBarChart>
            </div>
          </div>

          <div className="flex items-center justify-between w-full px-1 pb-2 border-b-[3px]">
            <div className="flex flex-col items-start justify-center gap-1">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">Total Orders</h2>
              <h2 className="text-[#ADBD5B] font-bold whitespace-nowrap">4535</h2>
            </div>

            <div className="flex flex-col items-start justify-center">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold">Avg Value</h2>
              <h2 className="text-[#ADBD5B] font-bold">3.5K</h2>
            </div>
          </div>

          <div className="flex items-center justify-between w-full px-1  ">
            <div className="flex flex-col items-start justify-center gap-1 ">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">Monthly Target</h2>
              <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">67 Cr</h2>
            </div>

            <div className="flex flex-col items-start justify-center">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold">Achieved</h2>
              <h2 className="text-[#3B6ADB] font-bold">74 Cr</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF4E8] p-2 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
          <div className="flex items-center justify-between w-full px-1 ">
            <h2 className="text-gray-500 font-bold text-sm  ">Account Summary</h2>
            <div className=" px-1.5 py-1 bg-[#F99116] rounded-md">
              <SlNotebook className="text-[#fff]" size={15}></SlNotebook>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between w-full px-1  ">
            <div className="flex md:flex-col items-start justify-between w-full md:justify-center gap-1">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">
                Payment Collection Due
              </h2>
              <h2 className="text-[#ADBD5B] font-bold whitespace-nowrap">56.54 Cr</h2>
            </div>

            <div className="flex md:flex-col items-start justify-between w-full md:justify-center">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold">Overdue Payment</h2>
              <h2 className="text-[#ADBD5B] font-bold">13.50 Cr</h2>
            </div>

            <div className="flex md:flex-col items-start justify-between w-full md:justify-center">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold">Due Claim Amount</h2>
              <h2 className="text-[#ADBD5B] font-bold">13.50 Cr</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#F2F2FE] p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
          <div className="flex items-start justify-between w-full px-1 ">
            <h2 className="text-gray-500 font-bold text-sm ">Performance</h2>
            <div className=" px-1.5 py-1 bg-[#05D395] rounded-md ">
              <IoSpeedometerOutline className="text-[#fff]" size={15}></IoSpeedometerOutline>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between w-full px-1 ">
            <div className="flex md:flex-col items-start justify-between w-full md:justify-center gap-1.5 ">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">Elite</h2>
              <div className="flex gap-1 text-[0.7rem]">
                <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">4.5K Orders</h2>
                <h2 className="text-[#3B6ADB] border-[#658adf] font-bold whitespace-nowrap md:border-r-[3px] md:border-l-[3px] px-1">
                  45 Cr
                </h2>
                <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">65%</h2>
              </div>
            </div>

            <div className="flex md:flex-col items-start justify-between w-full md:justify-center gap-1.5">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap md:py-1">
                Ambassador
              </h2>
              <div className="flex gap-1 text-[0.7rem]">
                <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">4.5K Orders</h2>
                <h2 className="text-[#3B6ADB]  border-[#658adf] font-bold whitespace-nowrap md:border-r-[3px] md:border-l-[3px] px-1">
                  45 Cr
                </h2>
                <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">65%</h2>
              </div>
            </div>

            <div className="flex md:flex-col items-start justify-between w-full md:justify-center gap-1.5 pb-1 ">
              <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">Random</h2>
              <div className="flex gap-1 text-[0.7rem]">
                <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">4.5K Orders</h2>
                <h2 className="text-[#3B6ADB] border-[#658adf] font-bold whitespace-nowrap md:border-r-[3px] md:border-l-[3px] px-1">
                  45 Cr
                </h2>
                <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">65%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SapCards;
