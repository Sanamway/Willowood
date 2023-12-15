import React,{useState, useEffect} from "react";
import { TbFileDownload } from "react-icons/tb";

const RPSummary = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (checkboxId) => {
    if (!formActive) {
      setSelectedCheckbox(checkboxId);
    }
  };


  return (
    <section className="mt-1 mb-24 outer flex flex-col items-center justify-center w-full font-arial ">
      <div className=" flex justify-center w-full my-">
        {/* <div className="bcbtn px-2">
          <button className="px-4 py-1 bg-white border-2 border-teal-400 rounded-md text-teal-400">Back</button>
        </div> */}
        <div className="headingtext">
          {/* <h2 className="text-lg text-teal-400 font-bold">Rolling Sales Plan - Apr 2023</h2> */}
        </div>
        {/* <div className="bcbtn px-2">
        <button className="px-4 py-1 bg-white border-2 border-teal-400 rounded-md text-teal-400">Next</button>
        </div> */}
      </div>

      {/* options  */}

      <div className="options flex items-center justify-between w-full px-2 py-">
        <div className="zrtdepoty flex items-center justify-between w-full">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs text-gray-700">ZRT</h2>
            <h2 className="font-bold text-xs text-gray-700 ">South Region All Territories</h2>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs text-gray-700">Depot :</h2>
            <h2 className="font-bold text-xs text-gray-700">Hyderabad</h2>
          </div>
        </div>
        {/* <div className="categoryoptions flex items-center justify-center w-full">
          <div className="category flex items-center justify-center px-2">
            <h2 className="text-xs text-gray-700 font-bold">Segment</h2>
            <select
              className="w-full text-xs text-gray-700 px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
            >
              <option value="" className="focus:outline-none focus:border-b bg-white">
                Option
              </option>
              <option value="Cat1">Cat1</option>
              <option value="Cat2">Cat2</option>
              <option value="Cat3">Cat3</option>
            </select>
          </div>
          <div className="category flex items-center justify-center px-2">
            <h2 className="text-xs text-gray-700 font-bold">Brand</h2>
            <select
              className="w-full px-3 text-xs text-gray-700 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
            >
              <option value="" className="focus:outline-none focus:border-b bg-white">
                Option
              </option>
              <option value="Prod">Prod 1</option>
              <option value="Prod">Prod 1</option>
              <option value="Prod">Prod 1</option>
            </select>
          </div>
        </div> */}
        <div className="flex items-center justify-center w-full text-xs font-bold">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center whitespace-nowrap ">
                <input
                  type="checkbox"
                  id="fairCheckbox"
                  className="mr-2 "
                  disabled={formActive}
                  checked={selectedCheckbox === "fair"}
                  onChange={() => handleCheckboxChange("fair")}
                />
                <label htmlFor="fairCheckbox">Product Segment</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="goodCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={selectedCheckbox === "good"}
                  onChange={() => handleCheckboxChange("good")}
                />
                <label htmlFor="goodCheckbox">Product Brand</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center whitespace-nowrap">
                <input
                  type="checkbox"
                  id="goodCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={selectedCheckbox === "cat"}
                  onChange={() => handleCheckboxChange("cat")}
                />
                <label htmlFor="goodCheckbox">Category</label>
              </div>
            </div>
          </div>
        <div className="status xls download flex items-center justify-end w-full">
          <div className="status flex gap-1">
            <h2 className="text-xs text-gray-700">Status :</h2>
            <h2 className="font-bold text-xs text-gray-700">4/10 Territories Submitted</h2>
          </div>
         
        </div>
      </div>

      {/* table layout */}

      <div className="table mb-4 w-full">
        {/* <h3>Table Layout</h3> */}
        <section className="bg-white p-2">
          {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12"> */}
          <div className="mx-auto max-w-full px- ">
            {/* Start coding here */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 text-center bg-orange-300  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-black">
                        Product Name Sku Wise
                      </th>
                      {/* <th scope="col" className="px-2 py-1 text-black">
                        Product Code
                      </th> */}
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales 21-23
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        FY Sales 22-23
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        Annual Budget Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        YTD Net Sale Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 23-24 Budget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 FSCT Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        Apr 22-23 Revised FCT
                      </th>
                      <th scope="col" className="px-2 py-1 text-black border-l-2 border-r-2 border-red-400">
                        Apr 22-23 Revised FCT
                      </th>
                      <th scope="col" className="px-2 py-1 text-black border-l-2 border-r-2 border-red-400">
                        Apr 22-23 Urget Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black ">
                        May 22-23 Sale Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        May Budget Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black">
                        May Net FCST Qty 23-24
                      </th>
                      <th scope="col" className="px-2 py-1 text-black border-l-2 border-r-2 border-red-400 ">
                        May 22-23 FCST Qty
                      </th>
                      <th scope="col" className="px-2 py-1 text-black border-l-2 border-r-2 border-red-400">
                        Expected Sale Return Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs  ">
                      <th scope="row" className="px-4  py-1 font-medium whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-white text-gray-600 text-xs ">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>

                     <tr className="border-b dark:border-gray-700 bg-white  text-xs text-gray-700">
                      <th scope="row" className="px-4 py-1 font-medium text-gray-600 whitespace-nowrap ">
                        Apple iMac 27"
                      </th>
                      {/* <td className="px-4 py-1">PC</td> */}
                      <td className="px-4 py-1">Apple</td>
                      <td className="px-4 py-1">300</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1">$2999</td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                      <td className="px-4 py-1 border-l-2 border-r-2 border-red-400">
                       $2999
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">1000</span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
              <li>
                  <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span class="sr-only">Previous</span>
                      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                  <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                  <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                  <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
              </li>
              <li>
                  <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
              </li>
              <li>
                  <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span class="sr-only">Next</span>
                      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                  </a>
              </li>
          </ul>
      </nav> */}
            </div>
          </div>
        </section>
      </div>
      {/* <div className="mt-12 flex self-end">
        <button
          onClick={() => props.formType("Upload")}
          className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
        >
          Next
        </button>
      </div> */}

      <div className="my-2 flex self-end ">
        <div className="flex items-center justify-end w-full gap-2 ">
          <button
            onClick={() => props.formType("RPTable")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-sm`}
          >
            Prev
          </button>
          <button
            onClick={() => props.formType("RPSummary")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-blue-500"
            }  text-white py-1 px-4 text-sm`}
          >
            Save as Draft
          </button>
          <button
            onClick={() => props.formType("Upload")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default RPSummary;
