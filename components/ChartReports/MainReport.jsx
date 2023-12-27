import React, { useState, useEffect } from "react";
import Table from "./Table";
import AllCharts from "./AllCharts";
import { useRouter } from "next/router";
const MainReport = () => {
  const [formType, setFormType] = useState("AllCharts");
  const router = useRouter();
  return (
    <>
      <section className="outer w-full px-2  bg-gray-100  min-h-screen">
        <div className="flex items-center justify-center w-full">
          <h2 className="font-arial text-sm font-bold text-teal-500 mt-2">
            Rolling Sales Plan - Dec 2023 - RP-122023
          </h2>
        </div>
        <div className="steps mx-20 mt-2 font-arial ">
          <ul className="tablist flex items-center justify-center gap-4 lg:gap-[8rem] flex-wrap md:flex-nowrap w-full">
            <li className="mb-2" onClick={() => setFormType("AllCharts")}>
              <button
                className={`w-full text-center border-1 rounded-md whitespace-nowrap mx-auto ${
                  formType === "AllCharts" ? "bg-green-500" : "bg-gray-400"
                }  py-1.5 px-2 text-white `}
              >
                <span className="text-sm">Graphical View</span>
              </button>
            </li>

            <li className="mb-2" onClick={() => setFormType("Table")}>
              <button
                className={`w-full text-center border-1 rounded-md whitespace-nowrap mx-auto ${
                  formType === "Table" ? "bg-green-500" : "bg-gray-400"
                }  py-1.5 px-2 text-white `}
              >
                <span className="text-sm ">Table</span>
              </button>
            </li>

            <li className="mb-2" onClick={() => setFormType("ZoneChart")}>
              <button
                className={`w-full text-center border-1 rounded-md whitespace-nowrap mx-auto ${
                  formType === "ZoneChart" ? "bg-green-500" : "bg-gray-400"
                }  py-1.5 px-2 text-white `}
              >
                <span className="text-sm">Zone Chart</span>
              </button>
            </li>
          </ul>
        </div>

        {formType === "AllCharts" && (
          <AllCharts
            formType={setFormType}
            // setTableData={setTableData}
            // files={files}
            // setFiles={setFiles}
          />
        )}
        {formType === "Table" && (
          <Table
            formType={setFormType}
            // tableData={tableData}
            // setTableData={setTableData}
          />
        )}
        {formType === "Zone Chart" && (
          <ZoneChart
            formType={setFormType}
            // tableData={tableData}
          />
        )}
      </section>
    </>
  );
};

export default MainReport;
