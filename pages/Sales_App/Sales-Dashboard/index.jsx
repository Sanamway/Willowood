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
import ViewCard from "./ViewCards";
import ChartOne from "../ChartOne";

const Dashboard = () => {
  return (
    <>
      <section className="w-full px-3 bg-[#f0eff2] min-h-screen  pb-12 font-arial">

        <div className="flex items-center justify-center w-full px-1">

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
