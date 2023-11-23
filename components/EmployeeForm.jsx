import React from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";

import Snapshot from "./EmployeeForm/Snapshot";
import Personal from "./EmployeeForm/Personal";
import Family from "./EmployeeForm/Family";
import Bank from "./EmployeeForm/Bank";
import History from "./EmployeeForm/History";
import Documents from "./EmployeeForm/Documents";
import { useState } from "react";
const EmployeeForm = () => {
  const [formType, setFormType] = useState("Personal");
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white pb-22">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Employee </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div> 

        <div className="w-[100%] flex ">
          <ul className="flex border-b  px-2 overflow-x-auto w-2/3 lg:flex border-b overflow-hidden ">
            <li className="ml-2 lg:-mb-px mr-1 lg:-mb-px mr-1">
              <a
                className={`${
                  formType === "Snapshot"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Snapshot")}
              >
                {" "}
                Snapshot
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
                  formType === "Family"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Family")}
              >
                Family
              </a>
            </li>
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "Bank"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Bank")}
              >
                {" "}
                Bank
              </a>
            </li>
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "History"
                    ? "inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white  whitespace-nowrap"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold whitespace-nowrap"
                }`}
                href="#"
                onClick={() => setFormType("History")}
              >
                CTC 
              </a>
            </li>
            <li className="-mb-px mr-1 ">
              <a
                className={`${
                  formType === "Documents"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("Documents")}
              >
                Documents
              </a>
            </li>
          </ul>
        </div>
        {formType === "Snapshot" && <Snapshot formType={setFormType} />}
        {formType === "Personal" && <Personal formType={setFormType} />}
        {formType === "Family" && <Family formType={setFormType} />}
        {formType === "Bank" && <Bank formType={setFormType} />}
        {formType === "Documents" && <Documents formType={setFormType} />}
        {formType === "History" && <History formType={setFormType} />}
      </div>
    </Layout>
  );
};

export default EmployeeForm;
