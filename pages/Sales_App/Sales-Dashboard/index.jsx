import React from "react";
import FilterComponent from "../../../components/Sales-Dashboard/FilterComponent";
import SaleCards from "../../../components/Sales-Dashboard/SaleCards";
import CustomerCards from "../../../components/Sales-Dashboard/CustomerCards";
import SaleSummary from "../../../components/Sales-Dashboard/SaleSummary";
import { useState } from "react";
import CreditBalance from "../../../components/Sales-Dashboard/CreditBalance";

import RecentOrder from "../../../components/Sales-Dashboard/RecentOrder";
import RollingCards from "../../../components/Sales-Dashboard/RollingCards";
import GraphCard from "../../../components/Sales-Dashboard/GraphCard";
import ProductCards from "../../../components/Sales-Dashboard/ProductCards";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { Popover, Switch } from "@headlessui/react";
import ViewCard from "../../../components/Sales-Dashboard/ViewCards";
import ChartOne from "../../../components/Sales_Portal_Apps/ChartOne";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import RollingTable from "@/components/Sales-Dashboard/RollingTable";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
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
            <span>My KPI Dashboard</span>
          </span>{" "}

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

            <RollingTable></RollingTable>
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
          <h2 className=" font-semibold py-2 text-[0.7rem]">Top 20 Products Trends</h2>

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
  ); 1
};

export default Dashboard;
