import React, { useState, useEffect } from "react";
import DragAndDrop from "./UploadTest";
import RPTable from "./RPTable";
import RPSummary from "./RPSummary";
import { useRouter } from "next/router";
import moment from "moment";
const TabsTwo = () => {
  const [formType, setFormType] = useState("Upload");
  const [tableData, setTableData] = useState([]);
  const [resultTable, setResultTable] = useState([]);
  const router = useRouter();
  return (
    <>
      <section className="outer w-full px-2 mt-1">
        <div className="flex items-center justify-center w-full">
          <h2 className="font-arial text-sm font-bold text-teal-500">
            Rolling Sales Plan - {moment(router.query.myr).format("MMM YYYY")} -{" "}
            {router.query.tranId}
          </h2>
        </div>
        <div className="steps mx-20 mt-2 font-arial">
          <ul className="tablist flex items-center justify-center gap-4 lg:gap-[8rem] flex-wrap md:flex-nowrap w-full">
            <li className="mb-2" onClick={() => setFormType("Upload")}>
              <a
                className={`w-1/5 text-center border-1 rounded-md whitespace-nowrap mx-auto ${
                  formType === "Upload" ? "bg-green-500" : "bg-gray-400"
                }  py-1.5 px-2 text-white `}
                href="#"
              >
                <span className="text-sm "> 1. Upload RSP XLS</span>
              </a>
            </li>
            <li className="mb-2" onClick={() => setFormType("RPTable")}>
              <a
                className={`w-1/5 text-center border-1 rounded-md whitespace-nowrap mx-auto ${
                  formType === "RPTable" ? "bg-green-500" : "bg-gray-400"
                }  py-1.5 px-2 text-white `}
                href="#"
              >
                <span className="text-sm">2. Validate RSP Plan</span>
              </a>
            </li>
            <li className="mb-2" onClick={() => setFormType("RPSummary")}>
              <a
                className={`w-1/5 text-center border-1 rounded-md whitespace-nowrap mx-auto ${
                  formType === "RPSummary" ? "bg-green-500" : "bg-gray-400"
                }  py-1.5 px-2 text-white `}
                href="#"
              >
                <span className="text-sm">3. Summary Sheet</span>
              </a>
            </li>
            {/* <li className="mb-5">
                  <a className={`w-1/5 text-center border-1 whitespace-nowrap mx-auto bg-teal-500 py-1.5 px-2 text-white `} href="#">
                    <span className="text-sm">Upload RP XLS</span>
                  </a>
                </li> */}
          </ul>
        </div>
        {formType === "Upload" && (
          <DragAndDrop formType={setFormType} setTableData={setTableData} />
        )}
        {formType === "RPTable" && (
          <RPTable
            formType={setFormType}
            tableData={tableData}
            setResultTable={setResultTable}
          />
        )}
        {formType === "RPSummary" && (
          <RPSummary
            formType={setFormType}
            tableData={tableData}
            resultTable={resultTable}
          />
        )}
      </section>
    </>
  );
};

export default TabsTwo;
