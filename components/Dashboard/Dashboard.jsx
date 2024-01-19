import React from "react";
import FilterComponent from "./FilterComponent";
import SaleCards from "./SaleCards";
import CustomerCards from "./CustomerCards";
import SaleSummary from "./SaleSummary";
import SapCards from "./SapCards";
import CreditBalance from "./CreditBalance";
import TotalCards from "./TotalCards";
import RecentOrder from "./RecentOrder";
import StaCards from "./StaCards";
import GraphCard from "./GraphCard";
import ProductCards from "./ProductCards";

const Dashboard = () => {
  return (
    <>
      <section className="w-full px-6 bg-[#f0eff2] min-h-screen  pb-12 font-arial">
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
        <div className="cardgraphwrapper w-full px- mt-4 flex lg:flex-row flex-col gap-4 font-arial   rounded-md">
          {/* left wrapper  */}
          <div className="leftwrapper lg:w-[60%]  rounded-md ">
            {/* customer four cards  */}

            <CustomerCards></CustomerCards>

            {/* sale target achiev  */}
            <StaCards></StaCards>

            {/* two cards  */}

            <SaleCards></SaleCards>

            {/* sales summary two cards  */}

            <SaleSummary></SaleSummary>

            {/* three cards  */}

            <SapCards></SapCards>

            <div className="h-20">
              <SaleCards></SaleCards>
            </div>
          </div>

          {/* right wrapper  */}

          <div className="rightwrapper h-64 flex-1    mt- border-green rounded-md">
            {/* credit balance  */}

            <CreditBalance></CreditBalance>

            {/* total cash  */}

            <TotalCards></TotalCards>

            {/* graph cards  */}

            <GraphCard></GraphCard>

            {/* recent order cards  */}

            <RecentOrder></RecentOrder>
          </div>
        </div>

        {/* bottom sale products  */}
        <div className="h- bg-white rounded-l-md rounded-r-md flex items-center px-2  mt-3">
        <h2 className="text-[0.85rem] font-semibold py-2 ">Top Sale Products</h2>
      </div>
        <div className="filterwrap w-full px-4 mt- h-32  font-arial  rounded-b-md bg-white pt-2.5 pb-4"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <ProductCards></ProductCards>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
