import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BrandChart from "./BrandChart";
import BusinessChart from "./BusinessChart";
import ProductChart from "./ProductChart";
import RegionChart from "./RegionChart";
import TerritoryChart from "./TerritoryChart";
import ZoneChart from "./ZoneChart";

const AllCharts = (props) => {
  const router = useRouter();
  return (
    <>
      <section className="wrapper w-full px-2 mt-2 font-arial">
        <div className="mt-6 md:flex items-start justify-center gap-6  ">
          <BusinessChart></BusinessChart>
          <ZoneChart></ZoneChart>
        </div>
        {/* <ProductChart></ProductChart>
        <RegionChart></RegionChart>
        <BrandChart></BrandChart>
        <TerritoryChart></TerritoryChart> */}

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
