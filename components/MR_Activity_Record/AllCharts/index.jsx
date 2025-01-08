import React, { useState, useEffect } from "react";
import ChartOne from "./ChartOne";
const AllCharts = (props) => {
  return (
    <div className="w-full flex flex-col  md:flex w-1/2 flex-row lg:w-full flex flex-col ">
      {props.loading && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <img
            className="w-20 h-20 animate-spin"
            src="https://www.svgrepo.com/show/448500/loading.svg"
            alt="Loading icon"
          />
        </div>
      )}

      <div className="mt-2 lg:mt- md:flex items-start justify-center gap-4 ">
        <ChartOne
          title={"Month Wise Activity Summary"}
          color={"bg-blue-500"}
          lab={"Hey"}
          datasets={[] || []}
        />
      </div>

      <div className="mt-2 lg:mt- md:flex items-start justify-center gap-4 ">
        <ChartOne
          title={"Month Wise - Area wise (Territory to BU) Activity Summary"}
          color={"bg-blue-500"}
          lab={"Hey"}
          datasets={[] || []}
        />
      </div>

      <div className="mt-2 lg:mt- md:flex items-start justify-center gap-4 ">
        <ChartOne
          title={"Area wise (Territory to BU) Activity Summary"}
          color={"bg-blue-500"}
          lab={"Hey"}
          datasets={[] || []}
        />
      </div>
    </div>
  );
};
export default AllCharts;
