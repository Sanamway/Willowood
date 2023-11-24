import React, { useState, useEffect } from "react";
import Image from "next/image";
import DepoAddModal from "../modals/DepoAddModal";

const Personal = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [secondForm, setSecondForm] = useState({
    assets: "",
    category: "",
    areas: "",
    market_valuation: ""
  });

  const [secondTableData, setSecondTabData] = useState([]);

  const [isOpen, setisOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const data = [
    { id: 1, assets: "Property A", category: "Real Estate", areas: 10, market_valuation: "$1,000,000" },
    { id: 2, assets: "Property B", category: "Commercial", areas: 5, market_valuation: "$500,000" },
    { id: 2, assets: "Property B", category: "Commercial", areas: 5, market_valuation: "$500,000" },
    { id: 2, assets: "Property B", category: "Commercial", areas: 5, market_valuation: "$500,000" },
    { id: 2, assets: "Property B", category: "Commercial", areas: 5, market_valuation: "$500,000" },
    { id: 2, assets: "Property B", category: "Commercial", areas: 5, market_valuation: "$500,000" }
  ];

  // console.log("form", secondForm)

  const secondFormArray = Object.entries(secondForm).map(([key, value]) => ({ [key]: value }));

  const secondFormHandler = (e) => {
    e.preventDefault();
    // setSecondTabData(secondFormArray);
  };

  return (
    <form className=" bg-white rounded shadow p-4 w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="flex my-2">
        <DepoAddModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="delete"
          endpoints="delete_product_category"
        ></DepoAddModal>
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
      <div className="flex flex-col  my-2 mb-2 lg:flex-row  justify-center">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Name"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            disabled={!formActive}
          />
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
              <span className="text-red-500 whitespace-nowrap">*</span> Upload Image
            </label>
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> City
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="state1">City 1</option>
            <option value="state2">City 2</option>
          </select>
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="inputField">
            <small className="text-red-600 ">*</small> District
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="state1">District 1</option>
            <option value="state2">District 2</option>
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> State
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="state1">State 1</option>
            <option value="state2">State 2</option>
          </select>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pin Code
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="state1">Pin 1</option>
            <option value="state2">Pin 2</option>
          </select>
        </div>
      </div>

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Contact Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Contact Person"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Primary Mobile
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Primary Mobile"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Secondary Mobile
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Secondary Mobile"
            disabled={!formActive}
          />
        </div>
      </div>
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            id="inputField"
            placeholder="Email"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> DOB
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Email"
            disabled={formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Marital Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="state1">Married</option>
            <option value="state2">Unmarried</option>
            <option value="state2">Divorced</option>
          </select>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Anniversary
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Secondary Mobile"
            disabled={formActive}
          />
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

      {/* table  */}

      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Assets
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Category/Urban Semi-Urban
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Acres/Area
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Market Valuation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data.map((item) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.assets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.areas}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.market_valuation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* seconds form  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Assets
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={secondForm?.assets}
            placeholder="Assets"
            onChange={(e) => {
              setSecondForm({
                ...secondForm,
                assets: e.target.value
              });
            }}
            disabled={formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Categoty
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={secondForm?.category}
            placeholder="Categoty"
            disabled={formActive}
            onChange={(e) => {
              setSecondForm({
                ...secondForm,
                category: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Acres/Area
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Acres Area"
            value={secondForm?.areas}
            disabled={formActive}
            onChange={(e) => {
              setSecondForm({
                ...secondForm,
                areas: e.target.value
              });
            }}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Market Valuation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Market Valuation"
            value={secondForm?.market_valuation}
            disabled={formActive}
            onChange={(e) => {
              setSecondForm({
                ...secondForm,
                market_valuation: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="my-3 flex items-center justify-end">
        <button
          // onClick={() => {
          //   deleteHandler("");
          // }}
          onClick={secondFormHandler}
          className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Add +
        </button>
      </div>
      {/* tables */}
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Assets
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Category/Urban Semi-Urban
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Acres/Area
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Market Valuation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {data?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.assets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.areas}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.market_valuation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* buttons */}
      <div className="my-5 flex items-center justify-end mx-4 ">
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => props.formType("Basic")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-lg`}
          >
            Prev
          </button>
          <button
            onClick={() => props.formType("AdditionalInfo")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Personal;
