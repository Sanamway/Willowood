import React, { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";

const BusinessInfo = (props) => {
  const [formActive, setFormActive] = useState(false);

  //dummydata
  const data = [
    {
      id: 1,
      name: "Property A",
      profit: "Real Estate",
      relation: 10,
      son_of: "$1,000,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    },
    {
      id: 2,
      name: "Property B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "EJHVFBVERG5Y6",
      aadhar: "7658756865"
    }
  ];

  return (
    <form className=" bg-white rounded shadow p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Party Name"
            disabled={!formActive}
          />
        </div>
      </div>
      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <span className="flex gap-1">
            <small className="text-red-600">*</small> Focus Product Sales with Willowood
          </span>
        </label>
      </div>

      {/* table  */}

      <div className="overflow-x-auto my-6 sm:overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Volume
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.profit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <tr className="border-2 flex justify-end w-full">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Voul</td>
        </tr>
      </div>

      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2 ">
          <span className="flex gap-1">
            <small className="text-red-600 text-lg text-center ">*</small>Credit Evaluation
          </span>
        </label>
          <h2>
            Maximum Credit Limit = <input className="border-b-2 outline-none" type="text" id="inputField" placeholder="" />% of total sales planned Rs <input className="border-b-2 outline-none" type="text" id="inputField" placeholder="" />Lacs
          </h2>
      </div>


      <div className="w-full px-2 mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <span className="flex gap-1">
            <small className="text-red-600 text-lg ">*</small> Particulars of the Pesticides Business For Last 4 Years
          </span>
        </label>
      </div>

      {/* second table  */}

      <div className="overflow-x-auto my-6 sm:overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Name of the Company
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                No of Years
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Years 2020
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Years 2020
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Years 2020
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
               Ratio of Cash vs Credit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.profit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <tr className="border-2 flex justify-end w-full">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Voul</td> */}
        </tr>
      </div>

      {/* buttons */}
      <div className="my-5 flex items-center justify-end mx-4 ">
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => props.formType("Security")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-lg`}
          >
            Prev.
          </button>
          <button
            onClick={() => props.formType("Assessment")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default BusinessInfo;
