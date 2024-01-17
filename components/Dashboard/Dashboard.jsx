import React from "react";
import FilterComponent from "./FilterComponent";
import { FaRegStar } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { GrDocumentTime } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { FcBullish } from "react-icons/fc";
import { GiNetworkBars } from "react-icons/gi";
import { RxBarChart } from "react-icons/rx";
import { SlNotebook } from "react-icons/sl";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
const Dashboard = () => {
  return (
    <>
      <section className="w-full px-6 bg-[#f0eff2] min-h-screen pb-4 font-arial">
        {/* typography  */}
        <div className="flex items-center justify-between w-full px-1">
          <h2 className="font-arial text-lg font-bold text-gray-500 mt-2">Dashboard</h2>
          <h2 className="font-arial text-sm font-bold text-gray-500 mt-2">Any Random Text</h2>
        </div>

        {/* filter options  */}
        <div
          className="filterwrap w-full px-4 mt-2  font-arial  rounded-md bg-white pt-2.5 pb-4"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "7px" }}
        >
          <FilterComponent></FilterComponent>
        </div>
        {/* cards and graphs  */}
        <div className="cardgraphwrapper w-full px- mt-5 flex lg:flex-row flex-col gap-4 font-arial   rounded-md">
          {/* left wrapper  */}
          <div className="leftwrapper lg:w-[56%] rounded-md ">
            {/* four cards  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white p-2.5 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="icon ">
                  <h2 className="text-gray-500 font-bold text-sm whitespace-nowrap ">Active Customers</h2>
                </div>
                <div className="flex items-center justify-between w-full px-2">
                  <h2 className="text-xl text-[#3B6ADB] font-bold ">675</h2>
                  <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md">
                    <RiGroupLine className="text-[#5d7eda] " size={20}></RiGroupLine>
                  </div>
                </div>
              </div>

              <div className="bg-white p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="icon ">
                  <h2 className="text-gray-500 font-bold text-sm whitespace-nowrap ">New Customers</h2>
                </div>
                <div className="flex items-center justify-between w-full px-2">
                  <h2 className="text-xl text-[#3B6ADB] font-bold">96</h2>
                  <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md">
                    <RiGroupLine className="text-[#5d7eda]" size={20}></RiGroupLine>
                  </div>
                </div>
              </div>

              <div className="bg-white p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="icon ">
                  <h2 className="text-gray-500 font-bold h-6 text-[0.84rem] whitespace-nowrap text-left px-1 ">
                    Inactive Customers
                  </h2>
                </div>
                <div className="flex items-center justify-between w-full px-2">
                  <h2 className="text-xl text-[#3B6ADB] font-bold">78</h2>
                  <div className="bg-[#EBEFFD] px-1 py-1 rounded-md">
                    <HiOutlineUserGroup className="text-[#5d7eda]" size={20}></HiOutlineUserGroup>
                  </div>
                </div>
              </div>

              <div className="bg-white p-1 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="icon">
                  <h2 className="text-gray-500 font-bold h-6 text-[0.84rem]  text-left px-2">
                    Customers with Overdue
                  </h2>
                </div>
                <div className="flex items-center justify-between w-full px-2">
                  <h2 className="text-xl text-[#3B6ADB] font-bold">45</h2>
                  <div className="bg-[#EBEFFD] px-1.5 py-1 rounded-md">
                    <IoNewspaperOutline className="text-[#5d7eda]" size={20}></IoNewspaperOutline>
                  </div>
                </div>
              </div>
            </div>

            {/* two cards  */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-4"> */}
            <div className="w-full px- mt-5 flex lg:flex-row flex-col gap-3 font-arial   rounded-md">
              <div className="bg-white p-2 lg:w-[40%] flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="flex items-center justify-between w-full px-1">
                  <div className=" px-1 py-1 rounded-md">
                    <GiNetworkBars className="text-red-400 " size={30}></GiNetworkBars>
                  </div>
                  <div>
                    <h2 className="text-gray-500 text-sm font-bold whitespace-nowrap">Total Sales</h2>
                    <h2 className="text-xl text-[#ADBD5B] font-bold">67 Cr</h2>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2 flex-1 md:flex items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="flex  items-center justify-between w-full gap-2 p-1">
                  <h2 className="text-gray-500 text-sm font-bold"> Diamond: </h2>
                  <h2 className="text-lg text-[#ADBD5B] font-bold whitespace-nowrap">43 Cr</h2>
                </div>
                <div className="flex  items-center justify-between w-full gap-2 md:border-r-[3px] md:p-2 md:border-l-[3px] ">
                  <h2 className="text-gray-500 text-sm font-bold whitespace-nowrap">Gold:</h2>
                  <h2 className="text-lg text-[#ADBD5B] font-bold whitespace-nowrap">23 Cr</h2>
                </div>
                <div className="flex  items-center justify-between w-full gap-2 ">
                  <h2 className="text-gray-500 text-sm font-bold whitespace-nowrap">Bronze:</h2>
                  <h2 className="text-lg text-[#ADBD5B] font-bold whitespace-nowrap">35 Cr</h2>
                </div>
              </div>
            </div>

            {/* sales two cards  */}

            <div className="h-6 bg-white rounded-t-md flex items-center px-2  mt-5">
              <h2 className="text-[0.75rem]">Sales Summary</h2>
            </div>
            <div className="w-full px- mt-1 flex lg:flex-row flex-col gap-3 font-arial rounded-b-md">
              <div className="bg-white p-2 lg:w-1/2  flex flex-col items-center justify-center gap-2 rounded-b-md shadow-md text-white text-center">
                <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600 ">
                  <div className="flex items-center gap-2 ">
                    <div className="bg-blue-100 px-1.5 py-1.5 rounded-full">
                      <FaCalendarAlt size={20} className="text-blue-400 bg-blue-100"></FaCalendarAlt>
                    </div>
                    <div className="flex  items-start flex-col ">
                      <h2 className="">Current Year Till Date Sale</h2>
                      <h2>2023</h2>
                    </div>
                  </div>

                  <h2>$93,485,62</h2>
                </div>

                <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="px-4"></div>
                    <div className="flex  items-start flex-col ">
                      <h2 className="">Last Year Till Date Sale</h2>
                      <h2>2023</h2>
                    </div>
                  </div>
                  <h2>$93,485,62</h2>
                </div>
                <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="px-4"></div>
                    <div className="flex  items-start flex-col ">
                      <h2 className="">Last Year Total Sale</h2>
                      <h2>2023</h2>
                    </div>
                  </div>
                  <h2>$93,485,62</h2>
                </div>
              </div>

              <div className="bg-white p-2 lg:w-1/2  flex flex-col items-center justify-center gap-2 rounded-b-md shadow-md text-white text-center">
                <div className="flex items-center justify-between w-full text-[0.75rem] text-gray-600 ">
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
              </div>

            </div>

            {/* three cards  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              <div className="bg-[#F2F2FE] p-2 flex flex-col items-center justify-center gap-4 rounded-md shadow-md text-white text-center">
                <div className="flex items-start justify-between w-full px-1">
                  <h2 className="text-gray-500 font-bold text-sm ">Sales Summary</h2>
                  <div className=" px-1.5 py-1 bg-[#7480E8] rounded-md">
                    <RxBarChart className="text-[#fff]" size={15}></RxBarChart>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full px-1 pb-2 border-b-[3px]">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">
                      Total Orders
                    </h2>
                    <h2 className="text-[#ADBD5B] font-bold whitespace-nowrap">4535</h2>
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold">Avg Value</h2>
                    <h2 className="text-[#ADBD5B] font-bold">3.5K</h2>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full px-1  ">
                  <div className="flex flex-col items-start justify-center gap-1 ">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">
                      Monthly Target
                    </h2>
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
                  <div className="flex flex-col items-start justify-center gap-1">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">
                      Payment Collection Due
                    </h2>
                    <h2 className="text-[#ADBD5B] font-bold whitespace-nowrap">56.54 Cr</h2>
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold">Overdue Payment</h2>
                    <h2 className="text-[#ADBD5B] font-bold">13.50 Cr</h2>
                  </div>

                  <div className="flex flex-col items-start justify-center">
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
                  <div className="flex flex-col items-start justify-center gap-1.5 ">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">Elite</h2>
                    <div className="flex gap-1 text-[0.7rem]">
                      <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">4.5K Orders</h2>
                      <h2 className="text-[#3B6ADB] border-[#658adf] font-bold whitespace-nowrap border-r-[3px] border-l-[3px] px-1">
                        45 Cr
                      </h2>
                      <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">65%</h2>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-center gap-1.5">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap py-1">
                      Ambassador
                    </h2>
                    <div className="flex gap-1 text-[0.7rem]">
                      <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">4.5K Orders</h2>
                      <h2 className="text-[#3B6ADB]  border-[#658adf] font-bold whitespace-nowrap border-r-[3px] border-l-[3px] px-1">
                        45 Cr
                      </h2>
                      <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">65%</h2>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-center gap-1.5 pb-1 ">
                    <h2 className="text-gray-500 text-[0.7rem] font-semibold whitespace-nowrap">Random</h2>
                    <div className="flex gap-1 text-[0.7rem]">
                      <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">4.5K Orders</h2>
                      <h2 className="text-[#3B6ADB] border-[#658adf] font-bold whitespace-nowrap border-r-[3px] border-l-[3px] px-1">
                        45 Cr
                      </h2>
                      <h2 className="text-[#3B6ADB] font-bold whitespace-nowrap">65%</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right wrapper  */}
          <div className="rightwrapper h-64 flex-1 border mt-2 border-green-400 rounded-md"></div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
