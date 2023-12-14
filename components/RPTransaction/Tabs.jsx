import React, { useState, useEffect } from "react";
import Basic from "../DealerForms/Basic";
import Personal from "../DealerForms/Personal";
import Upload from "./Upload";
import DragAndDrop from "./UploadTest";

const Tabs = () => {
  const [formType, setFormType] = useState("Basic");

  return (
    <>
      <div className="w-full bg-white text-black mb-12 mt-4 font-arial">
        <div className="flex items-center justify-center lg:justify-between lg:w-full ">
          <div className="buttons flex items-center gap-1 lg:gap-  lg:px-2 overflow-scroll no-scrollbar w-auto flex-wrap lg:w-full justify-center">
            <button
              onClick={() => setFormType("Basic")}
              className={`${
                formType === "Basic"
                  ? "py-1 px-2 text-sm rounded-sm text-white  bg-orange-500"
                  : "py-1 px-2 text-sm rounded-sm text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 lg:font-bold whitespace-nowrap">
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
                Upload XLS RP
              </div>
            </button>
            <button
              onClick={() => setFormType("Personal")}
              className={`${
                formType === "Personal"
                  ? "py-1 px-2 text-sm rounded-sm  text-white  bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 lg:font-bold whitespace-nowrap">
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
                Validate Rolling Plan
              </div>
            </button>
            <button
              onClick={() => setFormType("Personal")}
              className={`${
                formType === "Personal"
                  ? "py-1 px-2 text-sm rounded-sm  text-white  bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 lg:font-bold whitespace-nowrap">
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
                Validate Rolling Plan
              </div>
            </button>
          </div>
        </div>
        {formType === "Basic" && <DragAndDrop formType={setFormType} />}
        {formType === "Personal" && <DragAndDrop formType={setFormType} />}
      </div>
    </>
  );
};

export default Tabs;
