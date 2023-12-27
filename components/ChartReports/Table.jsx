import React, { useState, useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

const Table = (props) => {
  const router = useRouter()
  return (
    <>
    {/* add table here  */}
      <div>Table</div> 
{/* add table here  */}
      <div className="mt-12 flex items-center justify-end mx-8 gap-4">
        <button
          onClick={() => {
            router.push("/chartreports");
          }}
          className="text-center rounded-md bg-blue-500 text-white py-1 px-4 text-sm"
        >
          Back 
        </button>
        <button
          onClick={() => {
            props.formType("BusinessChart");
          }}
          className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
