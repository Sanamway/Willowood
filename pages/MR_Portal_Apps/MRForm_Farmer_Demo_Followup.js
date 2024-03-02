import React, { useState } from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";

const AdditionalInfo = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");

  const currentYear = new Date().getFullYear();
  const nextYears = Array.from(
    { length: 10 },
    (_, index) => currentYear + index
  );

  //dummyData

  const data = [
    {
      id: 1,
      name: "Example A",
      profit: "New",
      relation: 10,
      son_of: "$1,000,000",
      pan: "Product Brand",
      aadhar: "X MS Tree",
    },
    {
      id: 2,
      name: "Example B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "Product Brand",
      aadhar: "X MS Tree",
    },
    {
      id: 2,
      name: "Example B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "New Product Brand",
      aadhar: "X MS Tree",
    },
  ];

  return (
    <form
      className=" bg-white rounded  p-4 w-full  overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex my-2 flex-row gap-2">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F Follow Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="F Demo Code"
            disabled
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Re-Visit Date
          </label>

          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="dd/mm/yyyy"
          />
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Purpose of Demo
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {nextYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Dealer
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="resident_individual">Residential Individual</option>
            <option value="domestic_company">Domestic Company</option>
            <option value="proprietary_concern">Proprietary Concern</option>
            <option value="partner_firm">Partner Firm</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 flex flex-row"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Mobile No
          </label>
          <div className="flex flex-row ">
            {" "}
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Farmer Mobile No"
              // disabled={!formActive}
            />
            <AiOutlineFileAdd
              size={42}
              className="  self-center size-120 text-black-400 text-blue-400"
            />
          </div>
        </div>
        <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer ID
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer ID"
          />
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Name"
          />
        </div>
        <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Father Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Father Name"
          />
        </div>
        <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Village
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Village"
          />
        </div>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Farmer Type
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Type"
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Plot Size
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Type"
          />
        </div>
      </div>

      <h1 className="flex justify-start font-bold m-4">Product Demo</h1>
      <div className="overflow-x-auto my-6 sm:overflow-hidden w-full  lg:w-full">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Crop
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Field Stage
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Acre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Segment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Product Brand
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Water
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Dose/Acre (kg/lt)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.profit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.relation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.son_of}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.pan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.aadhar}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.aadhar}
                </td>
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {
                    <AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>
                  }
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Farmer Observation
          </label>
          <div className="flex flex-row gap-2 text-sm overflow-wrap ">
            <section className="flex gap-1">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Fair</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Good</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Very Good</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Excellent</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Outstanding</em>
            </section>
          </div>
        </div>
      </div>

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Product Rating
          </label>
          <div className="flex flex-row justify-between text-sm overflow-auto ">
            <section className="flex gap-1">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Poor</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Average</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Good</em>
            </section>
            <section className="flex gap-2">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <em className="self-center">Excellent</em>
            </section>
          </div>
        </div>
      </div>
      <div className="w-full px-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="inputField"
        >
          <small className="text-red-600">*</small>Remarks
        </label>
        <textarea rows="4" className="w-full border border-black-100 border-2">
          This is the default text inside the textarea.
        </textarea>
      </div>
      <div className="wrap ">
        <h1 className="flex justify-start font-bold m-4">
          <FaUpload className="mr-2 text-blue-400 self-center" /> Video
          Testimonials
        </h1>
        <div className=" w-full px-2 profpic relative group">
          <Image
            src={""}
            className="rounded bg-gray-200"
            width={300}
            height={200}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label
            htmlFor="fileInput "
            className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
              userImage == "" ? "opacity-50" : "opacity-0"
            } ${
              userImage !== ""
                ? "group-hover:opacity-100"
                : "group-hover:opacity-0"
            }  transition-opacity duration-300`}
          >
            <span className="text-red-500 whitespace-nowrap">*</span>
          </label>
        </div>
      </div>

      <div className="wrap ">
        <h1 className="flex justify-start font-bold m-4">
          <FaUpload className="mr-2 text-blue-400 self-center" /> Handwritten
          Testimonials
        </h1>
        <div className=" w-full px-2 profpic relative group">
          <Image
            src={""}
            className=" rounded bg-gray-200"
            width={300}
            height={200}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label
            htmlFor="fileInput "
            className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
              userImage == "" ? "opacity-50" : "opacity-0"
            } ${
              userImage !== ""
                ? "group-hover:opacity-100"
                : "group-hover:opacity-0"
            }  transition-opacity duration-300`}
          >
            <span className="text-red-500 whitespace-nowrap text-xs">*</span>{" "}
            Image
          </label>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Potential Farmer
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
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

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Next Visit Date
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {nextYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            2
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
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

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Submit
        </button>
        <button
          onClick={() => {}}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
