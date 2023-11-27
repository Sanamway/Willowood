import React, { useState } from "react";

const Approval = (props) => {
  const [formActive, setFormActive] = useState(false);

  return (
    <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Party Name
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

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Territory Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Territory Person"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Submission
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Territory Person"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Approval
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      <div className="flex w-full justify-center gap-4 text-white py-4">
        <button className="bg-yellow-600 px-3 py-1.5 rounded-sm">Submit</button>
        <button className="bg-green-600 px-3 py-1.5 rounded-sm">Approval</button>
      </div>

      {/* Zone Manager */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Zone A/c Manager
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zone A/c Manager"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Submission
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Territory Person"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Approval
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      {/* checkbox  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="ownedCheckbox ">All Furnished Information checked</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="rentedCheckbox">Security Deposit to be received/realised</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="rentedCheckbox" className="mr-2 " disabled={formActive} />
            <label htmlFor="rentedCheckbox">3 blanks cheque received</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="rentedCheckbox">3 Letter head received</label>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-4 text-white py-4">
        <button className="bg-green-600 px-3 py-1 rounded-sm">Approval</button>
        <button className="bg-red-600 px-3 py-1 rounded-sm">Reject</button>
      </div>

      {/* Zonal Manager  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Regional Manager
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zone A/c Manager"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Submission
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Territory Person"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Approval
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      {/* checkbox  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="ownedCheckbox ">I am visited</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-4 text-white py-4">
        <button className="bg-green-600 px-3 py-1 rounded-sm">Approval</button>
        <button className="bg-red-600 px-3 py-1 rounded-sm">Reject</button>
      </div>


    {/* zonal manager  */}
      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Zonal Manager
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zonal Manager"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Submission
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Territory Person"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Approval
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      {/* checkbox  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 py-4 ">
        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="ownedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="ownedCheckbox ">I am visited</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
            <label htmlFor="rentedCheckbox">Verified the all info. documents</label>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-4 text-white py-4">
        <button className="bg-green-600 px-3 py-1 rounded-sm">Approval</button>
        <button className="bg-red-600 px-3 py-1 rounded-sm">Reject</button>
      </div>


      {/* Unit Head */}
      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Unit Head
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Zonal Manager"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Submission
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Territory Person"
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Date of Approval
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="Designation"
          />
        </div>
      </div>


      <div className="flex w-full justify-center gap-4 text-white py-4">
        <button className="bg-green-600 px-3 py-1 rounded-sm">Approval</button>
        <button className="bg-red-600 px-3 py-1 rounded-sm">Reject</button>
      </div>







      {/* buttons */}
      <div className="my-6 flex items-center justify-end ">
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            onClick={() => props.formType("Assessment")}
            className={`text-center rounded-md hover:bg-green-500 ${
              formActive ? "bg-green-400" : "bg-gray-400"
            }  text-white py-1 px-4 text-lg`}
          >
            Prev
          </button>
          <button
            onClick={() => props.formType("Documents")}
            className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Approval;
