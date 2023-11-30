import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import Snapshot from "../EmployeeForm/Snapshot";
import Personal from "../EmployeeForm/Personal";
import Family from "../EmployeeForm/Family";
import Bank from "../EmployeeForm/Bank";
import History from "../EmployeeForm/History";
import Documents from "../EmployeeForm/Documents";
import { url } from "@/constants/url";
import axios from "axios";
const EmployeeForm = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [employeeData, setEmployeeData] = useState(null);
  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: { e_id: router.query.id },
      });
      const apires = await respond.data.data;
      console.log("jl", apires)
      setEmployeeData(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, [router]);
  const [formType, setFormType] = useState("Snapshot");
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
        {formType === "Snapshot" && (
          <Snapshot formType={setFormType} data={employeeData} />
        )}
        {formType === "Personal" && (
          <Personal formType={setFormType} data={employeeData} />
        )}
        {formType === "Family" && (
          <Family formType={setFormType} data={employeeData} />
        )}
        {formType === "Bank" && (
          <Bank formType={setFormType} data={employeeData} />
        )}
        {formType === "Documents" && (
          <Documents formType={setFormType} data={employeeData} />
        )}
        {formType === "History" && (
          <History formType={setFormType} data={employeeData} />
        )}
      </div>
    </Layout>
  );
};

export default EmployeeForm;
