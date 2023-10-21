import React from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";

import Snapshot from "./EmployeeForm/Snapshot";
import Personal from "./EmployeeForm/Personal";
import Family from "./EmployeeForm/Family";
import Bank from "./EmployeeForm/Bank";
import Documents from "./EmployeeForm/Documents";
const EmployeeForm = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Employee </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_user_profile");
              }}
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className="w-[100%] flex  justify-center">
          <ul className="flex border-b gap-12">
            <li className="-mb-px mr-1">
              <a
                className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                href="#"
              >
                {" "}
                Snapshot
              </a>
            </li>
            <li className="mr-1">
              <a
                className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                href="#"
              >
                {" "}
                Personal
              </a>
            </li>
            <li className="mr-1">
              <a
                className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                href="#"
              >
                Family
              </a>
            </li>
            <li className="mr-1">
              <a
                className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                href="#"
              >
                {" "}
                Bank
              </a>
            </li>
            <li className="mr-1">
              <a
                className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                href="#"
              >
                Documents
              </a>
            </li>
            <li className="mr-1">
              <a
                className="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
                href="#"
              >
                History
              </a>
            </li>
          </ul>
        </div>
        <Documents />
      </div>
    </Layout>
  );
};

export default EmployeeForm;
