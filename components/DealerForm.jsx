import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import Basic from "./DealerForms/Basic";
import Personal from "./DealerForms/Personal";
import SecurityDeposit from "./DealerForms/SecurityDeposit";
import AdditionalInfo from "./DealerForms/AdditionalInfo";
import BusinessInfo from "./DealerForms/BusinessInfo";
import Assessment from "./DealerForms/Assessment";
import Approval from "./DealerForms/Approval";
import Documents from "./DealerForms/Documents";

const DealerForm = () => {
  const [formType, setFormType] = useState("Basic");
  return (
    <Layout>
      <div className="   w-full font-arial bg-white text-black mb-12 ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-xl lg:text-3xl  py-2">Dealer Details </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        {/* <div className="w-1/3 flex mx-2 ">
          <ul className="flex border-b ">
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Basic"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Basic")}
              >
                {" "}
                Basic
              </a>
            </li>
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Personal"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Personal")}
              >
                {" "}
                Personal
              </a>
            </li>
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "AdditionalInfo"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("AdditionalInfo")}
              >
                Additional
              </a>
            </li>
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Security"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Security")}
              >
                {" "}
                Security
              </a>
            </li>

            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "BusinessInfo"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("BusinessInfo")}
              >
                {" "}
                Business
              </a>
            </li>

            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Assessment"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Assessment")}
              >
                {" "}
                Assessment
              </a>
            </li>

            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Approval"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Approval")}
              >
                {" "}
                Approval
              </a>
            </li>

            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Documents"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Documents")}
              >
                {" "}
                Documents
              </a>
            </li>
          
          </ul>
        </div> */}

        <div className=" flex items-center justify-center lg:justify-between lg:w-full ">
          <div className="buttons flex items-center gap-1 lg:gap-  lg:px-2 overflow-scroll no-scrollbar w-[340px] lg:w-full ">
            <button
              onClick={() => setFormType("Basic")}
              className={`${
                formType === "Basic"
                  ? "py-1 px-2 text-sm rounded-sm text-white  bg-orange-500"
                  : "py-1 px-2 text-sm rounded-sm text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 lg:font-bold">
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
                Basic
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
              <div className="flex items-center justify-center gap-1 lg:font-bold">
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
                Personal
              </div>
            </button>

            <button
              onClick={() => setFormType("AdditionalInfo")}
              className={`${
                formType === "AdditionalInfo"
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
                Additional
              </div>
            </button>

            <button
              onClick={() => setFormType("Security")}
              className={`${
                formType === "Security"
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
                Security
              </div>
            </button>

           
           

            <button
              onClick={() => setFormType("BusinessInfo")}
              className={`${
                formType === "BusinessInfo"
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
                BusinessInfo
              </div>
            </button>
            <button
              onClick={() => setFormType("Assessment")}
              className={`${
                formType === "Assessment"
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
                Assessment
              </div>
            </button>
            <button
              onClick={() => setFormType("Approval")}
              className={`${
                formType === "Approval"
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
                Approval
              </div>
            </button>
            <button
              onClick={() => setFormType("Documents")}
              className={`${
                formType === "Documents"
                  ? "py-1 px-2 text-sm rounded-2 text-white shadow-md bg-orange-500"
                  : "py-1 px-2 text-sm rounded-2 text-black shadow-md bg-white"
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
                Documents
              </div>
            </button>
          </div>
        </div>

        {formType === "Basic" && <Basic formType={setFormType} />}
        {formType === "Personal" && <Personal formType={setFormType} />}
        {formType === "AdditionalInfo" && <AdditionalInfo formType={setFormType} />}
        {formType === "Security" && <SecurityDeposit formType={setFormType} />}
        {formType === "BusinessInfo" && <BusinessInfo formType={setFormType} />}
        {formType === "Assessment" && <Assessment formType={setFormType} />}
        {formType === "Approval" && <Approval formType={setFormType} />}
        {formType === "Documents" && <Documents formType={setFormType} />}
      </div>
    </Layout>
  );
};

export default DealerForm;
