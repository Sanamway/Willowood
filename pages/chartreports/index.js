import React from "react";
import Topbar from "@/components/RPTransaction/Topbar";
import MainReport from "@/components/ChartReports/MainReport";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import imageStore from "../api/imageStore";

const ChartReports = () => {
  return (
    <Provider store={imageStore}>
      <Topbar></Topbar>
      {/* <Layout> */}
      <MainReport></MainReport>
      {/* </Layout> */}
    </Provider>
  );
};

export default ChartReports;
