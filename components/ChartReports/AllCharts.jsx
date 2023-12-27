import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";

const AllCharts = (props) => {
  const router = useRouter();

  //dynamic labels

  const labelNameOne = ["B-2-B", "B-2-C"];
  const labelNameTwo = ["India 1", "India 2", "India 3"];

  //dynamic chart data

  const chartData = [
    {
      label: "Budget",
      backgroundColor: "blue",
      borderColor: "rgb(255, 99, 132)",
      data: [200, 150,90],
    },
    {
      label: "Rolling Plan",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [180, 120,70],
    },
    {
      label: "Actual Sale",
      backgroundColor: "green",
      borderColor: "rgb(255, 99, 132)",
      data: [200, 100,80],
    },
  ]



  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial ">
        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4 ">
          <ChartOne title={"Business Segments"} color={"bg-blue-500"} lab={labelNameOne} datasets={chartData || []} ></ChartOne>
          <ChartTwo title={"Business Zone"} color={"bg-pink-500"}></ChartTwo>
        </div>
        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne title={"Business Units"} color={"bg-violet-500"}lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          <ChartTwo title={"Business Region"} color={"bg-teal-400"}></ChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne title={"Product Segment"} color={"bg-orange-500"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          <ChartTwo title={"Business Territory"} color={"bg-lime-500"}></ChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne title={"Product Category"} color={"bg-[#15283c]"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          <ChartTwo title={"Business Territory"} color={"bg-lime-500"}></ChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne title={"Product Brand"} color={"bg-indigo-500"} lab={labelNameTwo} datasets={chartData || []}></ChartOne>
          <ChartTwo title={"Territory"} color={"bg-rose-500"}></ChartTwo>
        </div>

        <div className="mt-12 flex items-center justify-end mx-8 gap-4 pb-4">
          <button
            onClick={() => {
              router.push("/chartreports");
            }}
            className="text-center  rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
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
