import React from "react";
import Topbar from "@/components/RPTransaction/Topbar";
import MainReport from "@/components/ChartReports/MainReport";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import chartStore from "../api/chartStore";

const ChartReports = () => {
  return (
    <Provider store={chartStore}>
      <Topbar></Topbar>
      {/* <Layout> */}
      <MainReport></MainReport>
      {/* </Layout> */}
    </Provider>
  );
};

export default ChartReports;
