import React from "react";
import Topbar from "@/components/RPTransaction/Topbar";
import MainReport from "@/components/ChartReports/MainReport";
import Layout from "@/components/Layout";
const ChartReports = () => {
  return (
    <>
      <Topbar></Topbar>
      {/* <Layout> */}
        <MainReport ></MainReport>
      {/* </Layout> */}
    </>
  );
};

export default ChartReports;
