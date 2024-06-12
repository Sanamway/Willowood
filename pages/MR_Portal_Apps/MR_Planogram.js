import React, { useState } from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import Select from "react-select";
import { FaCameraRetro } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
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

  const colourOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AS", label: "American Samoa" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FM", label: "Federated States Of Micronesia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "GU", label: "Guam" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MH", label: "Marshall Islands" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "MP", label: "Northern Mariana Islands" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PW", label: "Palau" },
    { value: "PA", label: "Pennsylvania" },
    { value: "PR", label: "Puerto Rico" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VI", label: "Virgin Islands" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  return (
    <form
      className=" bg-white rounded  p-4 w-full  overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex my-2 flex-col gap-2">
        <div className="fle gap-4 w-full px-2 md: gap-40">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> D.PL.Visit No
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="D.PL.Visit No"
          />
        </div>
        <div className="fle gap-4 w-full px-2 md:hidden">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date & In Time
          </label>

          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Dealer Mobile No
          </label>

          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="Number"
            id="inputField"
          />
        </div>

        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            // disabled={!formActive}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Contact Person
          </label>
          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="Number"
            id="inputField"
            val009
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Product Brand
          </label>
          <Select
            className="basic-single border border-balck-100"
            classNamePrefix="select"
            defaultValue={colourOptions[0]}
            isMulti={true}
            name="color"
            options={colourOptions}
          />
        </div>
      </div>

      <h1 className="flex justify-start font-bold m-4">
        Click the Tap Photo - Dealer outlet
      </h1>

      <div className="flex items-center justify-center gap-4  my-2 mb-2 lg:flex-row ">
        <div className="wrap ">
          <div className=" w-full px-2 profpic relative group bo">
            <Image
              src={""}
              className=" rounded  bg-gray-200"
              alt="img"
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
              className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer  `}
            >
              <IoMdCloudUpload
                size={50}
                className="mr-2  self-center size-120 text-blue-400"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2  ">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center py-2">
            <span className="flex-1">Product Positioning</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Distribution</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Promotional Material</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Out of Stock</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Proper Label Tagging</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Product Facing</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Damage Condition</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Rack Unique Concept</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Category Placement</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Display POP</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex my-2 flex-col gap-2">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Current Stock
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Current Stock"
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Actual Share of Life
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Actual Share of Life"
          />
        </div>

        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Compitior Brand
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Compitior Brand"
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Compitior Price
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Compitior Price"
          />
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
