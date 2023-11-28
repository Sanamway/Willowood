import React, { useState } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
const AdditionalInfo = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");

  const currentYear = new Date().getFullYear();
  const nextYears = Array.from({ length: 10 }, (_, index) => currentYear + index);

  //dummyData

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
            // disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Year of Establishment
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
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="inputField">
            <small className="text-red-600 ">*</small> Nature of Firm
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="state1">Nature Firm 1</option>
            <option value="state2">Nature Firm 2</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> PAN No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="PAN No."
            // disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> GST Registration No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="GST Registration No."
            // disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col gap-2">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pesticide License No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Pesticide License No."
            // disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Valid to
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Fertilizer License No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Fertilizer License No."
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Valid to
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

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small>Shop & Establishment No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Shop & Establishment No."
            // disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col items-center  ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
           <span className="flex gap-1"> <small className="text-red-600"></small> Shop Status : Please Tick Mark <BsCheck2Circle className="text-green-500" fontSize={20}/></span>
          </label>
        </div>
        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ownedCheckbox"
              className="mr-2"
              //   checked={isOwned}
            />
            <label htmlFor="ownedCheckbox">Owned</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rentedCheckbox"
              className="mr-2"
              //   checked={isRented}
            />
            <label htmlFor="rentedCheckbox">Rented</label>
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> If Owner Required any Government approved document
            <h6 className="text-xs font-thin">(Electricity/Water Bill in name of Proprietor)</h6>
          </label>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> If Rented Required Rent Agreement in name of Proprietor
            <h6 className="text-xs font-thin">(Govt. approved documents of the same premises)</h6>
          </label>
        </div>
      </div>

      <div className="my-3 flex items-center justify-end">
        <button
          onClick={() => {
            deleteHandler("");
          }}
          className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Add +
        </button>
      </div>


      {/* tables */}

      <div className="overflow-x-auto my-6 sm:overflow-hidden w-[300px] lg:w-full">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Name of Adddress of All Partners
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Profit Sharing Ratio
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Relationship
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Son of
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Pan No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Aadhar No.
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.profit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.relation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.son_of}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.aadhar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* photos */}
      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <small className="text-red-600">* </small>Shop Photograph with Proprietor & Company Staff
          <h6 className="text-xs font-thin">(Shop board must appear in photograph)</h6>
        </label>
      </div>
      <div className="flex items-center justify-center gap-4  my-2 mb-2 lg:flex-row ">
        <div className="wrap ">
          <div className=" w-full px-2 profpic relative group">
            <Image src={""} className="h-32 w-32 rounded bg-gray-200" width={100} height={100} />
            <input type="file" accept="image/*" style={{ display: "none" }} id="fileInput" />
            <label
              htmlFor="fileInput "
              className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                userImage == "" ? "opacity-50" : "opacity-0"
              } ${
                userImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
              }  transition-opacity duration-300`}
            >
              <span className="text-red-500 whitespace-nowrap">*</span> Front
            </label>
          </div>
        </div>
        <div className="wrap ">
          <div className=" w-full px-2 profpic relative group">
            <Image src={""} className="h-32 w-32 rounded bg-gray-200" width={100} height={100} />
            <input type="file" accept="image/*" style={{ display: "none" }} id="fileInput" />
            <label
              htmlFor="fileInput "
              className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                userImage == "" ? "opacity-50" : "opacity-0"
              } ${
                userImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
              }  transition-opacity duration-300`}
            >
              <span className="text-red-500 whitespace-nowrap">*</span> Inner Shop
            </label>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Remarks
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Remarks"
          />
        </div>
      </div>

      {/* buttons */}
      <div className="my-6 flex items-center justify-end">
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => props.formType("Personal")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-lg`}
          >
            Prev
          </button>
          <button
            onClick={() => props.formType("Security")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdditionalInfo;
