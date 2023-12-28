import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import { businessSegment, chartData,businessUnit, zoneData, regionData } from "./sample";
import { zonelabel ,regionLable, territoryLable} from "./labels";
import ChartThree from "./ChartThree";
const AllCharts = (props) => {
  const router = useRouter();

  //dynamic labels

  const labelNameOne = ["B-2-B", "B-2-C"];
  const labelNameTwo = ["India 1", "India 2", "India 3"];

 


  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial ">
        <div className="mt-2 lg:mt-2 md:flex items-start justify-center gap-4 ">
          <ChartOne title={"Business Segments"} color={"bg-blue-500"} lab={labelNameOne} datasets={businessSegment || []} ></ChartOne>
          {/* <ChartTwo title={"Business Zone"} color={"bg-pink-500"} lab={zonelabel} datasets={zoneData || []}></ChartTwo> */}
          <ChartTwo title={"Business Units"} color={"bg-violet-500"}lab={labelNameTwo} datasets={businessUnit || []} ></ChartTwo>
        </div>
        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          {/* <ChartOne title={"Business Segments"} color={"bg-blue-500"} lab={labelNameOne} datasets={businessSegment || []} ></ChartOne> */}
          {/* <ChartOne title={"Business Segments"} color={"bg-blue-500"} lab={labelNameOne} datasets={businessSegment || []} ></ChartOne> */}
          {/* <ChartTwo title={"Depot Warehouse"} color={"bg-pink-500"} lab={zonelabel} datasets={zoneData || []}></ChartTwo> */}
          <ChartTwo title={"Business Zone"} color={"bg-pink-500"} lab={zonelabel} datasets={zoneData || []}></ChartTwo>

        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
        <ChartThree title={"Business Region"} color={"bg-teal-400"} lab ={regionLable}  datasets={regionData || []}></ChartThree>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4">
        <ChartThree title={"Territory"} color={"bg-rose-500"} lab ={territoryLable}  datasets={regionData || []} ></ChartThree>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne title={"Customer Wise"} color={"bg-sky-500"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          {/* <ChartOne title={"Product Category"} color={"bg-[#15283c]"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          <ChartOne title={"Product Brand"} color={"bg-indigo-500"} lab={labelNameTwo} datasets={chartData || []}></ChartOne> */}
          <ChartTwo title={"Customer Wise Data View"} color={"bg-sky-500"}lab={labelNameTwo} datasets={businessUnit || []} ></ChartTwo>
        </div>

        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          <ChartOne title={"Product Segment"} color={"bg-orange-500"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          {/* <ChartOne title={"Product Category"} color={"bg-[#15283c]"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          <ChartOne title={"Product Brand"} color={"bg-indigo-500"} lab={labelNameTwo} datasets={chartData || []}></ChartOne> */}
          <ChartTwo title={"Product Segment Data View"} color={"bg-orange-500"}lab={labelNameTwo} datasets={businessUnit || []} ></ChartTwo>
        </div>
        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
          {/* <ChartOne title={"Product Segment"} color={"bg-orange-500"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne> */}
          <ChartOne title={"Product Category"} color={"bg-[#15283c]"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne>
          <ChartTwo title={"Product Category Data View"} color={"bg-[#15283c]"}lab={labelNameTwo} datasets={businessUnit || []} ></ChartTwo>
         
          {/* <ChartOne title={"Product Brand"} color={"bg-indigo-500"} lab={labelNameTwo} datasets={chartData || []}></ChartOne> */}
        </div>
        <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">

          {/* <ChartOne title={"Product Segment"} color={"bg-orange-500"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne> */}
          {/* <ChartOne title={"Product Category"} color={"bg-[#15283c]"} lab={labelNameTwo} datasets={chartData || []} ></ChartOne> */}
          <ChartOne title={"Product Brand"} color={"bg-indigo-500"} lab={labelNameTwo} datasets={chartData || []}></ChartOne>
        <ChartTwo title={"Product Brand Data View"} color={"bg-indigo-500"}lab={labelNameTwo} datasets={businessUnit || []} ></ChartTwo>
        </div>

       
        


   { /* buttons */}


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
