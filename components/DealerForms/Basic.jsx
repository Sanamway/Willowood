import React, { useState, useEffect } from "react";

const Basic = (props) => {
  const [formActive, setFormActive] = useState(false);

  return (
    <form
      className=" bg-white rounded p-4 w-full  overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
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
      <div className="flex flex-col  my-2 mb-2 lg:flex-row ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Postal Address"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Postal Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            disabled={!formActive}
          />
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
            <small className="text-red-600">*</small> Country
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="count 1">Country 1</option>
            <option value="count 2">Country 2</option>
          </select>
        </div>
      </div>

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pin code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Pin code"
            disabled={!formActive}
          />
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
            <small className="text-red-600"></small> Secondary Mobile
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

      <div className="flex justify-start items-center  w-full my-4">
        <h2 className="font-arial font-normal text-xl py-2 border-dashed  border-t-2 w-full border-b-2 border-l-0 border-r-0">
          Business Structure Info:{" "}
        </h2>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> District
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="District"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Territory
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Territory"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Region
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Region"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Zone
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zone"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Business Unit
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Business Unit"
            disabled={!formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Segment
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Segment"
            disabled={!formActive}
          />
        </div>
      </div>


      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Company
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Company"
            disabled={!formActive}
          />
        </div>
      </div>


      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Territory Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Territory Person"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Region Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Region Person"
            disabled={!formActive}
          />
        </div>
      </div>


      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Zonal Head
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zonal Head"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Unit Head
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Unit Head"
            disabled={!formActive}
          />
        </div>
      </div>

      {/* buttons */}
      <div className="my-5 flex items-center justify-end">
        <button
          onClick={() => props.formType("Personal")}
          className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Basic;
