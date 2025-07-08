import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import Snapshot from "../EmployeeForm/Snapshot";
import Personal from "../EmployeeForm/Personal";
import Family from "../EmployeeForm/Family";
import Bank from "../EmployeeForm/Bank";
import HRJoining from "../EmployeeForm/HRJoining";
import Documents from "../EmployeeForm/Documents";
import Agreement from "../EmployeeForm/Agreement";
import Interview from "../EmployeeForm/Interview";
import Approval from "../EmployeeForm/Approval";
import { url } from "@/constants/url";
import axios from "axios";
import { AiFillBank } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { BiSolidUserDetail } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { BiChild } from "react-icons/bi";
import { AiOutlineCluster } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";
import Professional from "../EmployeeForm/Professional";
import ApprovalResign from "../EmployeeForm/ApprovalResign";

const EmployeeResignForm = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };


  useEffect(() => {
    switch (router.query.formType) {
      case "Assessment":
        setTimeout(() => {
          setFormType("Assessment");
          // scrollRef.current?.scrollIntoView()
        }, 1000);
        break;
      case "SAP Info":
        setTimeout(() => {
          setFormType("SAP Info");
          // scrollRef.current?.scrollIntoView()
        }, 1000);
        break;
      case "ApprovalResign":
        setTimeout(() => {
          setFormType("ApprovalResign");
          // scrollRef.current?.scrollIntoView()
        }, 1000);
      default:
        break;
    }
  }, [router.query.formType]);
  
  const [employeeData, setEmployeeData] = useState(null);
  const [roleId, setRoleId] = useState(null);


  const getDataById = async () => {
    if (router.query.id == undefined) {
      return;
    }
    let params = { e_id: router.query.id, additional_data: true };

    try {
      const respond = await axios.get(`${url}/api/get_employee`, { headers: headers, params: params });
      const apires = await respond.data.data;
      setEmployeeData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById(router.query.id);
  }, [router, router.query.id]);

  const [formType, setFormType] = useState("Snapshot");

  useEffect(() => {
    getDataById();
  }, [formType]);



  useEffect(() => {
    if (window.localStorage) {
      const userinfo = window.localStorage.getItem("userinfo");
      if (userinfo) {
        const user = JSON.parse(userinfo);
        setRoleId(user?.role_id);
      }
    }
  }, []);

  console.log("roleId", roleId)


  const shouldShowHRJoiningTab = 
  (roleId === 1 || roleId === 8) &&
  (employeeData?.z_id_status == "Approved" || employeeData?.bu_id_status == "Approved");




  

  ////////////////////////////////////////////////////  JSX ///////////////////////////////////////////////////////////
  return (
    // <Layout>
      <div className="min-h-screen overflow-auto w-full font-arial bg-white pb-22">
        <div className="flex flex-row justify-between px-5">
          <h2 className="font-arial font-normal text-3xl py-2">MR Employee Onboard</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_employee_resign");
              }}
              className="text-gray-400"
              size={35}
            />
          </span>
        </div>

        <div className="w-full flex  items-center justify-center">
          <ul className="flex border-b overflow-scroll no-scrollbar max-w-sm lg:max-w-[75rem] items-center justify-between lg:justify-between">
            <li className="ml-2 lg:-mb-px  mr-1">
              <button
                className={`${
                  formType === "Snapshot"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2  bg-white  text-black rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Snapshot")}
                // disabled={router.query.type === "Edit"}
              >
                <BiSolidUser className="mt-1" /> Snapshot
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "Personal"
                    ? "  flex  gap-2  inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "  flex  gap-2 bg-white inline-block  text-black rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Personal")}
                // disabled={router.query.type === "Edit"}
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
                    : "flex  gap-2 bg-white inline-block  text-black rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Family")}
                // disabled={router.query.type === "Edit"}
              >
                {" "}
                <BiChild className="mt-1" /> Family
              </button>
            </li>
            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "Professional"
                    ? "flex  gap-2  inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "flex  gap-2 bg-white inline-block  text-black rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Professional")}
                // disabled={router.query.type === "Edit"}
              >
                {" "}
                <BiChild className="mt-1" /> Professional
              </button>
            </li>

            <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "Bank"
                    ? "flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "flex  gap-2 bg-white inline-block text-black  rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Bank")}
                // disabled={router.query.type === "Edit"}
              >
                {" "}
                <AiFillBank className="mt-1" /> Bank
              </button>
            </li>
           
            <li className="-mb-px mr-5 ">
              <button
                className={`${
                  formType === "Documents"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2 bg-white inline-block text-black  rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Documents")}
              >
                <BsCloudUpload className="mt-1" /> Documents
              </button>
            </li>
            <li className="-mb-px mr-5 ">
              <button
                className={`${
                  formType === "Interview"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2 bg-white inline-block text-black  rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Interview")}
              >
                <BsCloudUpload className="mt-1" /> Interview
              </button>
            </li>
            <li className="-mb-px mr-5 ">
              <button
                className={`${
                  formType === "Agreement"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2 bg-white inline-block text-black  rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Agreement")}
              >
                <BsCloudUpload className="mt-1" /> Agreement
              </button>
            </li>

            {/* <li className="-mb-px mr-5 ">
              <button
                className={`${
                  formType === "Approval"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2 bg-white inline-block text-black  rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("Approval")}
              >
                <BsCloudUpload className="mt-1" /> Approval
              </button>
            </li> */}

            <li className="-mb-px mr-5 whitespace-nowrap ">
              <button
                className={`${
                  formType === "ApprovalResign"
                    ? " flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : " flex  gap-2 bg-white inline-block text-black  rounded-t py-2 px-4 font-semibold"
                }`}
                onClick={() => setFormType("ApprovalResign")}
              >
                <BsCloudUpload className="mt-1" /> Resign Approval
              </button>
            </li>
           {shouldShowHRJoiningTab ? (
           <li className="-mb-px mr-1">
              <button
                className={`${
                  formType === "HRJoining"
                    ? "flex  gap-2 inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white  whitespace-nowrap"
                    : "flex  gap-2 bg-white inline-block  text-black rounded-t py-2 px-4 font-semibold whitespace-nowrap"
                }`}
                onClick={() => setFormType("HRJoining")}
              >
                <AiOutlineCluster className="mt-1" /> HR Joining
              </button>
            </li>
           ):null}
          </ul>
        </div>
        {formType === "Snapshot" && <Snapshot formType={setFormType} data={employeeData} />}
        {formType === "Personal" && <Personal formType={setFormType} data={employeeData} />}
        {formType === "Family" && <Family formType={setFormType} data={employeeData} />}
        {formType === "Professional" && <Professional formType={setFormType} data={employeeData} />}
        {formType === "Bank" && <Bank formType={setFormType} data={employeeData} />}
        {formType === "Documents" && <Documents formType={setFormType} data={employeeData} />}
        {formType === "Agreement" && <Agreement formType={setFormType} data={employeeData} />}
        {formType === "Interview" && <Interview formType={setFormType} data={employeeData} />}
        {/* {formType === "Approval" && <Approval formType={setFormType} data={employeeData} />} */}
        {formType === "HRJoining" && <HRJoining formType={setFormType} data={employeeData} />}
        {formType === "ApprovalResign" && <ApprovalResign formType={setFormType} data={employeeData} />}
      </div>
    //</Layout>
  );
};

export default EmployeeResignForm;
