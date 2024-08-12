import React, { useEffect } from "react";
import { useState } from "react";
import ComplaintStatus from "./ComplaintStatus";
import NewTab from "./NewTab";
import { IoHome } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";


const Support = () => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("NEW");
  const renderForm = () => {
    if (selectedTab === "NEW") {
      return <NewTab />;
    } else if (selectedTab === "COMPLAINT_STATUS") {
      return <ComplaintStatus />;
    }
  };

  
  

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-md">
      <div className="flex justify-between mb-5">
        <div className="pb-2 flex gap-2 font-bold text-lg ">
          <IoIosArrowBack onClick={() => router.back()} className="pt-0" size={26} /> Support
        </div>
        <div>
          <IoHome size={25} className="mr-6" />{" "}
        </div>
      </div>
      <div className="flex gap-18  border-b border-gray-300">
        <button
          className={`py-2 px-20 ${
            selectedTab === "NEW" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("NEW")}
        >
          New
        </button>
        <button
          className={`py-2 px-4 ${
            selectedTab === "COMPLAINT_STATUS" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("COMPLAINT_STATUS")}
        >
          Complaint Status
        </button>
      </div>
      <div className="form-container">{renderForm()}</div>
    </div>
  );
};

export default Support;
