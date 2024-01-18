import React from 'react'
import { BsCashCoin } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const TotalCards = () => {
  return (
    <>
     <div className="totalwrapper mt-2">
              <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                  <div className="flex items-center justify-between w-full text-gray-600">
                    <div className="flex items-center justify-center gap-1 ">
                      <div className="px-2 py-2 rounded-full bg-blue-50 ">
                        <BsCashCoin className="text-blue-500" size={20}></BsCashCoin>
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h2 className="text-[0.75rem] text-gray-600 font-semibold">Total Outstanding</h2>
                        <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;24,96,843.55</h2>
                      </div>
                    </div>
                    <div className="rounded-full shadow-md cursor-pointer">
                      <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                  <div className="flex items-center justify-between w-full text-gray-600">
                    <div className="flex items-center justify-center gap-1 ">
                      <div className="px-2 py-2 rounded-full bg-blue-50 ">
                        <GiAlarmClock className="text-blue-500" size={20}></GiAlarmClock>
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h2 className="text-[0.75rem] text-gray-600 font-semibold">Total Overdue</h2>
                        <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;23,29,150.85</h2>
                      </div>
                    </div>
                    <div className="rounded-full shadow-md cursor-pointer">
                      <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                  <div className="flex items-center justify-between w-full text-gray-600">
                    <div className="flex items-center justify-center gap-1 ">
                      <div className="px-2 py-2 rounded-full bg-blue-50 ">
                        <FaMoneyBillTrendUp className="text-blue-500" size={20}></FaMoneyBillTrendUp>
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h2 className="text-[0.75rem] text-gray-600 font-semibold">Super Cash Overdue</h2>
                        <h2 className="text-[0.78rem] text-gray-600 font-bold">&#8377;0.00</h2>
                      </div>
                    </div>
                    <div className="rounded-full shadow-md cursor-pointer">
                      <MdKeyboardArrowRight className="text-gray-800" size={22}></MdKeyboardArrowRight>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default TotalCards