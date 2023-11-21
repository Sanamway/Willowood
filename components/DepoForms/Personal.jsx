import React, { useState, useEffect } from "react";

const Basic = () => {
  const [formActive, setFormActive] = useState(false);

  return (
    <form
      className=" bg-white rounded shadow p-4 w-full min-h-screen overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex -mx-2 my-2">
        <div className="w-1/2 lg:w-full px-2">
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
      <div className="flex flex-col -mx-2 my-2 lg:flex-row ">
      <div className="flex flex-col -mx-2 my-2 lg:flex-row ">
        <div className="w-1/2 px-2">
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
        <div className="w-1/2 px-2">
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
        </div>
      </div>

      <div className="flex -mx-2 my-2 lg:flex-row flex-col">
        <div className="w-1/2 px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> City
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="City"
            disabled={!formActive}
          />
        </div>
        <div className="w-1/2 px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> District
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="IFSC Code"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex -mx-2 my-2 lg:flex-row flex-col">
        <div className="w-1/2 px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> State
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="City"
            disabled={!formActive}
          />
        </div>
        <div className="w-1/2 px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pin Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="IFSC Code"
            disabled={!formActive}
          />
        </div>
      </div>
     
      <div className="flex -mx-2 my-2">
        <div className="w-1/2 lg:w-full px-2">
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

      <div className="button flex justify-end ">
        {formActive ? (
          <div className="bg-green-700 px-4 py-1 text-white  pointer" onClick={() => setFormActive(true)}>
            Submit
          </div>
        ) : (
          <div className="bg-green-700 px-4 py-1 text-white pointer" onClick={() => setFormActive(true)}>
            Edit
          </div>
        )}
      </div>
    </form>
  );
};

export default Basic;
