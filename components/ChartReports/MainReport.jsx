import React, { useState, useEffect, useRef } from "react";
import Table from "./Table";
import AllCharts from "./AllCharts";
import { useRouter } from "next/router";
import { MdBarChart } from "react-icons/md";
import { FaTable } from "react-icons/fa";


const MainReport = () => {
  const [formType, setFormType] = useState("AllCharts");
  const [tableData, setTableData] = useState([]);
  const [files, setFiles] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.formType === "Add") {
      setFormType("Upload");
    } else {
      setFormType("RPTable");
      if (JSON.parse(window.localStorage.getItem("RSP")).length) {
        setTableData(JSON.parse(window.localStorage.getItem("RSP")));
      } else {
        setTableData([]);
      }
    }
  }, []);

  useEffect(()=>{
    setFormType("AllCharts")
  },[])

  const elementRef = useRef()

  useEffect(() => {
    function getGridButton() {
      const ele = elementRef.current;
      const button = ele.querySelectorAll("Button");
      // button.ref()
    }

    getGridButton();
  }, []); 

  return (
    <>
      <section className="outer  w-full px-2  bg-black/5   min-h-screen">
        <div className="flex items-center justify-center w-full">
          <h2 className="font-arial text-sm font-bold text-teal-500 mt-2">
            Target Vs Achievement - Dec 2023 - RP-122023
          </h2>
        </div>
       
        <div className="buttons mt-3  mb-3 flex items-center w-full justify-center gap-4 font-arial" ref={elementRef}>
            <button
              onClick={() => setFormType("AllCharts")}
              className={`${
                formType === "AllCharts"
                  ? "py-1 px-2 text-sm rounded-sm text-white  bg-orange-500"
                  : "py-1 px-2 text-sm rounded-sm text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 ">
                <MdBarChart></MdBarChart>
                All Charts
              </div>
            </button>
            <button
              onClick={() => setFormType("Table")}
              className={`${
                formType === "Table"
                  ? "py-1 px-2 text-sm rounded-sm  text-white  bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 ">
                <FaTable></FaTable>
                Table
              </div>
            </button>

            <button
              onClick={() => setFormType("Summary")}
              className={`${
                formType === "Summary"
                  ? "py-1 px-2 text-sm  text-white  bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 9h10v2H7zm0 4h5v2H7z"
                  ></path>
                </svg>
                Summary
              </div>
            </button>
           
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
            tableData={tableData}
            setTableData={setTableData}
          />
        )}
        {formType === "Summary" && (
          <Table
            formType={setFormType}
            tableData={tableData}
          />
        )}
      </section>
    </>
  );
};

export default MainReport;
