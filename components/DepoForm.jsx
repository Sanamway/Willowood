import React,{useState, useEffect} from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import Basic from "./DepoForms/Basic";
import Personal from './DepoForms/Personal'

const DepoForm = () => {
    const [formType, setFormType] = useState("Basic");
  return (
    <Layout>
       <div className="   w-full font-arial bg-white text-black  ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Dealer Details </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className=" flex mx-2 ">
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
                  formType === "Family"
                    ? " inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold  bg-orange-500 text-white"
                    : "bg-white inline-block   rounded-t py-2 px-4 font-semibold"
                }`}
                href="#"
                // onClick={() => setFormType("Family")}
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
                // onClick={() => setFormType("Bank")}
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
                // onClick={() => setFormType("Documents")}
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
                // onClick={() => setFormType("History")}
              >
                History
              </a>
            </li>
          </ul>
        </div>

        {formType === "Basic" && <Basic formType={setFormType} />}
        {formType === "Personal" && <Personal formType={setFormType} />}
        {formType === "Family" && <Family />}
        {formType === "Bank" && <Bank />}
        {formType === "Documents" && <Documents />}
        {formType === "History" && <History />} 
      </div>
    </Layout>
  );
};

export default DepoForm;
