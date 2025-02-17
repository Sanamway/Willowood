import React from "react";
import FilterComponent from "./FilterComponent";
import Layout from "../Layout";
import { IoIosBasket } from "react-icons/io";
import OrderTable from "./OrderTable";
import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";

const Dashboard = () => {



  return (
    <Layout>
      <div className="flex flex-col gap-2 h-screen">

        <div className=" font-bold text-lg h-12 flex items-center justify-between ">
          <span className="p-2">

            Orders
          </span>{" "}
          <div className="p-2 flex flex-row gap-2 font-normal">

            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
            >
              + Add New
            </button>

            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm border-sm border-green-500"
            >
              <IoIosBasket className="mr-2" />  Order Cart(s)
            </button>
            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
            >
              <CiBookmark className="mr-2" />  Order Actions
            </button>
            <button

              className="bg-white flex items-center justify-center whitespace-nowrap text-pink-500 px-2 py-1 rounded-sm border border-pink-500"
            >
              <LuRefreshCw className="mr-2" /> Generate Report
            </button>
            <button

              className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
            >
              <LuRefreshCw className="mr-2" />   Refresh
            </button>

          </div>{" "}

        </div>


        {/* Main Content - Takes Remaining Space */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Filter Component - Does Not Expand */}
          <div className="shadow-md rounded-lg">
            <FilterComponent />
          </div>

          {/* Order Table - Takes Up All Remaining Space */}
          <div className="shadow-md rounded-lg flex-1 overflow-y-auto">
            <OrderTable />
          </div>
        </div>




      </div>
    </Layout>


  );
};

export default Dashboard;
