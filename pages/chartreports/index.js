import React from "react";
import Topbar from "@/components/RPTransaction/Topbar";
import MainReport from "@/components/ChartReports/MainReport";
import Layout from "@/components/Layout";
const index = () => {
  return (
    <>
      <Topbar></Topbar>
      {/* <Layout> */}
        <MainReport></MainReport>
      {/* </Layout> */}
    </>
  );
};

export default index;
