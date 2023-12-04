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
import { AiFillBank } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { BiSolidUserDetail } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { BiChild } from "react-icons/bi";
import { AiOutlineCluster } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";
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
  useEffect(() => {
    getDataById();
  }, [formType]);
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white pb-22">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl py-2">Employee </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_employee");
              }}
              className="text-gray-400"
              size={35}
            />
          </span>
        </div>

        <div className="w-[100%] flex ">
          <ul className="flex border-b  px-2 overflow-x-auto w-2/3 lg:flex border-b overflow-hidden ">
            <li className="ml-2 lg:-mb-px mr-1 lg:-mb-px mr-1">
              <button
                className={`${
                  formType === "Snapshot"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2  bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Snapshot")}
                disabled={router.query.type === "Edit"}
              >
                <BiSolidUser className="mt-1" /> Snapshot
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "Personal"
                    ? "  flex  gap-2  inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "  flex  gap-2 bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Personal")}
                disabled={router.query.type === "Edit"}
              >
                {" "}
                <BiSolidUserDetail className="mt-1" /> Personal
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "Family"
                    ? "flex  gap-2  inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "flex  gap-2 bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Family")}
                disabled={router.query.type === "Edit"}
              >
                {" "}
                <BiChild className="mt-1" /> Family
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "Bank"
                    ? "flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "flex  gap-2 bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Bank")}
                disabled={router.query.type === "Edit"}
              >
                {" "}
                <AiFillBank className="mt-1" /> Bank
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "History"
                    ? "flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white  whitespace-nowrap"
                    : "flex  gap-2 bg-white inline-block   rounded-t py-2 px-4 font-semibold whitespace-nowrap"
                }`}
                onClick={() => setFormType("History")}
              >
                <AiOutlineCluster className="mt-1" /> Joining
              </button>
            </li>
            <li className="-mb-px mr-1 ">
              <button
                className={`${
                  formType === "Documents"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2 bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Documents")}
              >
                <BsCloudUpload className="mt-1" /> Documents
              </button>
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
