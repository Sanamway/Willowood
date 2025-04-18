import React, { useState, useEffect } from "react";

import MonthWiseTable from "./MonthWiseTable";
import ProductWiseTable from "./ProductWiseTable";
import ChartOne from "./ChartOne";
const AllTables = (props) => {
  const { monthlyData,
    teritoryData,
    empData, graphData, prductWiseDemo, loading, filterState } = props


  const getGeoHeading = () => {
    console.log("nop", typeof filterState.bgId)
    if (typeof filterState.bgId === "number" && filterState.buId === "All") {
      return "Business Unit"
    }
    else if (typeof filterState.buId === "number" && filterState.zId === "All") {
      return "Zone"
    }
    else if (typeof filterState.zId === "number" && filterState.rId === "All") {
      return "Region"
    }
    else if (typeof filterState.rId === "number" && filterState.tId === "All") {
      return "Territory"
    }
    else if (typeof filterState.tId === "number") {
      return "Territory"
    }


  }
  const graphLabelData = ["Apr-24",
    "May-24",
    "Jun-24",
    "Jul-24",
    "Aug-24",
    "Sep-24",
    "Oct-24",
    "Nov-24",
    "Dec-24",
    "Jan-25",
    "Feb-25",
    "Mar-25"];
  return (
    <div className="w-full flex flex-col  md:flex w-1/2 flex-row lg:w-full flex flex-col mb-20 ">
      {loading && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <img
            className="w-20 h-20 animate-spin"
            src="https://www.svgrepo.com/show/448500/loading.svg"
            alt="Loading icon"
          />
        </div>
      )}

      <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
        {/* Product Category Table  */}

        <MonthWiseTable
          heading={"Month"}
          title={"Month wise Activity Summary"}
          color={"bg-white"}
          datas={monthlyData}
        />
      </div>

      <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
        {/* Product Brand Table  */}

        <MonthWiseTable
          heading={getGeoHeading()}
          title={"Month wise - Area wise ( Territory to BU ) Activity Summary"}
          color={"bg-white"}
          datas={teritoryData}

        ></MonthWiseTable>
      </div>


      <div className="mt-2  lg:mt-6 md:flex items-start justify-center gap-4  ">
        {/* Product Segment Table  */}

        <ProductWiseTable
          heading={"Month wise - Crop & Product Wise Demo ( Nos )"}
          title={
            "Month wise - Crop & Product Wise Demo ( Nos )"
          }
          color={"bg-white"}
          datas={prductWiseDemo || []}
          filterState={prductWiseDemo}
        ></ProductWiseTable>
      </div>

      <div className="mt-2  lg:mt-6 md:flex items-start justify-center gap-4  ">
        {/* Product Segment Table  */}

        <ChartOne
          title={"Monthly Graph"}
          color={"bg-blue-800"}
          lab={graphLabelData}
          datasets={graphData || []}
        />
      </div>



    </div>
  );
};
export default AllTables;
