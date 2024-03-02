import React, { useState } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import Select from "react-select";
import { FaCameraRetro } from "react-icons/fa";
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
      aadhar: "X",
    },
    {
      id: 2,
      name: "Example B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "Product Brand",
      aadhar: "X",
    },
    {
      id: 2,
      name: "Example B",
      profit: "Commercial",
      relation: 5,
      son_of: "$500,000",
      pan: "Product Brand",
      aadhar: "X",
    },
  ];

  return (
    <form
      className=" bg-white rounded  p-4 w-full  overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex my-2 flex-row ">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F .SCH No
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="F Demo Code"
            disabled
            // disabled={!formActive}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> SCH Date
          </label>

          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="dd/mm/yyyy"
            // disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex flex-col my-2 ">
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
      <h2 className="whitespace-nowrap w-48 self-center font-bold">
        Soil Sample Details
      </h2>
      <div className="flex flex-col ">
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Nitrogen:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="kg/HA"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Phosphorus:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="kg/HA"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Potassium:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="kg/HA"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">PH: </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value=""
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">EC: </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="DS/M"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Organic Carbon:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="W%"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Sulphur:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Zinc:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Boron:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Iron:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Maganese:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>

        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Copper:{" "}
          </h2>

          <input
            type="text"
            className=" border-gray-300 border rounded-md w-28"
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
      </div>

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {
            // deleteHandler("");
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
