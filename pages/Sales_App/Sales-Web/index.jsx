import React from "react";
import FilterComponent from "./FilterComponent";


import OrderTable from "./OrderTable";
const Dashboard = () => {
  return (

    <div className="flex flex-col gap-2">

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
            Order Cart(s)
          </button>
          <button

            className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
          >
            Order Actions
          </button>
          <button

            className="bg-white flex items-center justify-center whitespace-nowrap text-pink-500 px-2 py-1 rounded-sm "
          >
            Generate Report
          </button>
          <button

            className="bg-pink-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1 rounded-sm"
          >
            Refresh
          </button>

        </div>{" "}

      </div>


      <div
        className=""
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "7px" }}
      >
        <FilterComponent></FilterComponent>
      </div>
      <div
        className=""
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "7px" }}
      >
        <OrderTable />
      </div>




    </div>

  );
};

export default Dashboard;
