import React, { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const BusinessInfo = (props) => {
  const [formActive, setFormActive] = useState(false);

  const currentYear = new Date().getFullYear();
  const nextYears = Array.from({ length: 10 }, (_, index) => currentYear + index);

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
    <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
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

      {/* new fields add  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Product
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="product1">Product 1</option>
            <option value="product2">Product 2</option>
          </select>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Volume
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="volume"
            disabled={!formActive}
          />
        </div>

        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Value
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="value"
            disabled={!formActive}
          />
        </div>
      </div>

      {/* new add button  */}

      <div className="my-3 flex items-center justify-end w-full px-2">
        <button
          onClick={() => {
            // deleteHandler("");
          }}
          className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Add +
        </button>
      </div>

      {/* table  */}

      <div className="overflow-x-auto my-6 sm:overflow-hidden w-[300px] lg:w-full">
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
              <th scope="col" className="text-sm font-medium text-gray-900  text-center"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.profit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <tr className="border-2 flex justify-end w-full">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Value</td>
        </tr>
      </div>

      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2 ">
          <span className="flex gap-1 items-center">
            <small className="text-red-600 text-lg text-center ">*</small>Credit Evaluation
          </span>
        </label>
        <h2 className="flex flex-col lg:flex-row items-center gap-2">
          Maximum Credit Limit ={" "}
          <input className="border-b-2 outline-none" type="text" id="inputField" placeholder="" />% of total
          sales planned Rs{" "}
          <input
            disabled={true}
            className="border-b-2 outline-none text-center"
            type="text"
            id="inputField"
            placeholder="Value"
          />
          Lacs
        </h2>
      </div>

      <div className="w-full px-2 mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <span className="flex gap-1 items-center">
            <small className="text-red-600 text-lg ">*</small> Particulars of the Pesticides Business For Last
            4 Years
          </span>
        </label>
      </div>

      {/* new fields added  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Name of the Company
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Name of the Company"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> No of Years
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="No of Years"
            disabled={!formActive}
          />
        </div>
      </div>


      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Years 2021
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {nextYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Year 2022
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {nextYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Years 2021
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {nextYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Ratio of Cash vs Credit
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Ratio Cash Credit"
            disabled={!formActive}
          />
        </div>
      </div>

        {/* second add button  */}
        
      <div className="my-3 flex items-center justify-end w-full px-2">
        <button
          onClick={() => {
            // deleteHandler("");
          }}
          className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Add +
        </button>
      </div>

      {/* second table  */}

      <div className="overflow-x-auto my-6 sm:overflow-hidden w-[300px] lg:w-full">
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
              <th scope="col" className="text-sm font-medium text-gray-900  text-center"></th>
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
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <tr className="border-2 flex justify-end w-full">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
        </tr>
      </div>

      {/* buttons */}
      <div className="my-6 flex items-center justify-end ">
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
