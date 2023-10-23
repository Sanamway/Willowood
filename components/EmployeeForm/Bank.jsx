import React from "react";

const Bank = () => {
  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20 h-[80%]"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Bank Information
      </div>
      <div className="flex -mx-2 mb-8">
        <div className="w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Salary Pay Mode
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="state1">Mr.</option>
            <option value="state2">Mrs.</option>
          </select>
        </div>
      </div>
      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Reimbursement
      </div>
      <div className="flex -mx-2 mb-8">
        <div className="w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Reimbursement
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="state1">Mr.</option>
            <option value="state2">Mrs.</option>
          </select>
        </div>
      </div>

      <div className="button flex justify-end  gap-3 mt-6">
        <div className="bg-green-700 px-4 py-1 text-white">Edit</div>
      </div>
    </form>
  );
};

export default Bank;
