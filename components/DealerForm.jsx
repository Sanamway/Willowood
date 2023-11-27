import React,{useState, useEffect} from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import Basic from "./DealerForms/Basic";
import Personal from './DealerForms/Personal'
import SecurityDeposit from "./DealerForms/SecurityDeposit";
import AdditionalInfo from "./DealerForms/AdditionalInfo";
import BusinessInfo from "./DealerForms/BusinessInfo";
import Assessment from "./DealerForms/Assessment";
import Approval from "./DealerForms/Approval";

const DealerForm = () => {
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

        <div className="w-1/3 flex mx-2 ">
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
          
          </ul>
        </div>

        {formType === "Basic" && <Basic formType={setFormType} />}
        {formType === "Personal" && <Personal formType={setFormType} />}
        {formType === "AdditionalInfo" && <AdditionalInfo formType={setFormType} />}
        {formType === "Security" && <SecurityDeposit formType={setFormType} />}
        {formType === "BusinessInfo" && <BusinessInfo formType={setFormType} />}
        {formType === "Assessment" && <Assessment formType={setFormType} />}
        {formType === "Approval" && <Approval formType={setFormType} />}
        
      </div>
    </Layout>
  );
};

export default DealerForm;
