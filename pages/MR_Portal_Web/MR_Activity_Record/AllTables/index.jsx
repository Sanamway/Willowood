import React, { useState, useEffect } from "react";

import MonthWiseTable from "./MonthWiseTable";
import ProductWiseTable from "./ProductWiseTable";

const AllTables = (props) => {
  const { monthlyData,
    teritoryData,
    empData, prductWiseDemo, loading } = props
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
          heading={"Geo Area"}
          title={"Month wise - Area wise ( Territory to BU ) Activity Summary"}
          color={"bg-white"}
          datas={teritoryData}

        ></MonthWiseTable>
      </div>

      <div className="mt-2 lg:mt-6 md:flex items-start justify-center gap-4  ">
        {/* Product Segment Table  */}

        <MonthWiseTable
          heading={"Employee"}
          title={
            "Area wise ( Territory to BU ) Activity Summary"
          }
          color={"bg-white"}
          datas={empData}

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

        <ProductWiseTable
          heading={"Month wise - Crop & Product Wise Demo ( Kg )"}
          title={
            "Month wise - Crop & Product Wise Demo ( Kg )"
          }
          color={"bg-white"}
          datas={prductWiseDemo || []}
          filterState={prductWiseDemo}
        ></ProductWiseTable>
      </div>

    </div>
  );
};
export default AllTables;
