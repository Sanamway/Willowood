import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
const SaleSummary = () => {
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
                <h2 className="text-[#3A322E]">Current Year Till Date Sale</h2>
                <h2>2023</h2>
              </div>
            </div>

            <h2>$93,485,62</h2>
          </div>

          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[#3A322E]">Last Year Till Date Sale</h2>
                <h2>2023</h2>
              </div>
            </div>
            <h2>$93,485,62</h2>
          </div>
          <div className="flex items-center justify-between w-full text-[0.75rem] text-[#3A322E]">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="text-[#3A322E]">Last Year Total Sale</h2>
                <h2>2023</h2>
              </div>
            </div>
            <h2>$93,485,62</h2>
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
                <h2 className="">Current Month Till Date Sale</h2>
                <h2>2023</h2>
              </div>
            </div>

            <h2>$93,485,62</h2>
          </div>

          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="">Last Month Till Date Sale</h2>
                <h2>2023</h2>
              </div>
            </div>
            <h2>$93,485,62</h2>
          </div>
          <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="px-4"></div>
              <div className="flex  items-start flex-col ">
                <h2 className="">Last Month Total Sale</h2>
                <h2>2023</h2>
              </div>
            </div>
            <h2>$93,485,62</h2>
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
