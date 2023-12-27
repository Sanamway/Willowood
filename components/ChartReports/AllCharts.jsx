import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";

const AllCharts = (props) => {
  const router = useRouter();
  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial">
        <div className="mt-6 md:flex items-start justify-center gap-6  ">
          <ChartOne title={"Business Segments"}></ChartOne>
          <ChartTwo title={"Zone"}></ChartTwo>
        </div>
        <div className="mt-6 md:flex items-start justify-center gap-6  ">
          <ChartOne title={"Business Units"}></ChartOne>
          <ChartTwo title={"Region"}></ChartTwo>
        </div>

        <div className="mt-12 flex items-center justify-end mx-8 gap-4">
          <button
            onClick={() => {
              router.push("/chartreports");
            }}
            className="text-center rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
          >
            Back
          </button>
          <button
            onClick={() => {
              props.formType("Table");
            }}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default AllCharts;
