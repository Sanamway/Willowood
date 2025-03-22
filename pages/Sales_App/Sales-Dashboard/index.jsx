import React from "react";
import FilterComponent from "./FilterComponent";
import SaleCards from "./SaleCards";
import CustomerCards from "./CustomerCards";
import SaleSummary from "./SaleSummary";
import { useState } from "react";
import CreditBalance from "./CreditBalance";
import TotalCards from "./TotalCards";
import RecentOrder from "./RecentOrder";
import RollingCards from "./RollingCards";
import GraphCard from "./GraphCard";
import ProductCards from "./ProductCards";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { Popover, Switch } from "@headlessui/react";
import ViewCard from "./ViewCards";
import ChartOne from "../ChartOne";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <>
      <section className="w-full px-3 bg-[#f0eff2] min-h-screen  pb-12 font-arial">

        <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
          <span className="text-black flex flex-row gap-4 font-bold   ">
            <FaArrowLeftLong
              className="self-center "
              onClick={() =>
                router.push({
                  pathname: "/Sales_App/Home",
                })
              }
            />
            <span>Sales Dashboard</span>
          </span>{" "}
          <span className="text-white self-center">
            <Popover as="div" className="relative border-none outline-none mt-2">
              {({ open }) => (
                <>
                  <Popover.Button className="focus:outline-none">
                    <PiDotsThreeOutlineVerticalFill
                      className="text-[#626364] cursor-pointer"
                      size={20}
                    />
                  </Popover.Button>

                  <Popover.Panel
                    as="div"
                    className={`${open ? "block" : "hidden"
                      } absolute z-40 top-1 right-0 mt-2 w-36 bg-white  text-black border rounded-md shadow-md`}
                  >
                    <ul className=" text-black text-sm flex flex-col gap-4 py-4  font-Rale cursor-pointer ">
                      <li
                        className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2   items-center whitespace-nowrap "
                        onClick={() =>
                          router.push({
                            pathname: "/MR_Portal_Apps/MRHome",
                          })
                        }
                      >
                        <BsCalendar2Month
                          className="text-[#626364] cursor-pointer"
                          size={20}
                        />{" "}
                        Approval Req.
                      </li>

                      <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:hidden ">
                        <FaHandsHelping
                          className="text-[#626364] cursor-pointer"
                          size={20}
                        />{" "}
                        Help
                      </li>
                      <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:flex-col ">
                        <IoSettingsOutline
                          className="text-[#626364] cursor-pointer"
                          size={20}
                        />{" "}
                        Setting
                      </li>
                    </ul>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </span>
        </div>


        <div
          className="w-full px-4 mt-2  font-arial  rounded-md bg-white pt-2.5 pb-4"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "7px" }}
        >
          <FilterComponent></FilterComponent>
        </div>

        <div className="cardgraphwrapper w-full px- mt-4 flex lg:flex-row flex-col gap-3 font-arial   rounded-md">

          <div className="leftwrapper lg:w-[65%]  rounded-md">


            <CustomerCards></CustomerCards>

            <RollingCards></RollingCards>


            <SaleCards></SaleCards>
            <SaleSummary></SaleSummary>



          </div>




          <div className="rightwrapper h-64 flex-1  mt- border-green rounded-md">

            <CreditBalance></CreditBalance>




            <ChartOne></ChartOne>


            <GraphCard></GraphCard>



            <RecentOrder></RecentOrder>
          </div>
        </div>


        <div className="h- bg-white rounded-l-md rounded-r-md flex justify-between w-full items-center px-2  mt-3">
          <h2 className="text-[0.85rem] font-semibold py-2 ">Top Sale Products</h2>
          <button className="flex items-center bg-[#9BB456] rounded-sm py-1 px-1 gap-1">
            <LiaFileDownloadSolid className="text-white" size={20}></LiaFileDownloadSolid>
            <h2 className="text-white text-[0.7rem] font-bold">Export Excel</h2>
          </button>
        </div>
        <div
          className="filterwrap w-full flex items-center justify-center  font-arial  rounded-b-md bg-white  py-1 "
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <ProductCards></ProductCards>
        </div>

        {/* View Cards  */}

      </section>
    </>
  );
};

export default Dashboard;
