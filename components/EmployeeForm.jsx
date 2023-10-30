import React from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";

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
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Employee </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className="w-[100%] flex ">
          <ul className="flex border-b ">
            <li className="-mb-px mr-1">
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
            <li className="-mb-px mr-1">
              <a
                className={`${
                  formType === "History"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                onClick={() => setFormType("History")}
              >
                History
              </a>
            </li>
          </ul>
        </div>
        {formType === "Snapshot" && <Snapshot />}
        {formType === "Personal" && <Personal />}
        {formType === "Family" && <Family />}
        {formType === "Bank" && <Bank />}
        {formType === "Documents" && <Documents />}
        {formType === "History" && <History />}
      </div>
    </Layout>
  );
};

export default EmployeeForm;
