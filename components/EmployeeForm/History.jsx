import React from "react";

const History = () => {
  return (
    <div className="flex flex-col  gap-6 w-full items-center justify-center mt-5">
      <div class=" rounded overflow-hidden shadow-lg bg-slate-100 self-center  w-[90%]">
        <div class="px-6 py-4 w-[70%]">
          <p class="font-bold  mb-2">Timeline</p>
          <hr className="h-1 w-full" />
          <div class="text-gray-700 text-base mt-2">
            <div className="bg-green-700 px-4 py-1 text-white w-28">
              Probation
            </div>
            <p className="mt-4 self-center text-sm">13 Oct 2023</p>
          </div>
        </div>
      </div>
      <div class="rounded overflow-hidden shadow-lg bg-slate-100 self-center  w-[90%]">
        <div className="flex justify-between my-4 mx-4">
          <p class="font-bold  mb-2">History</p>
          <div className="flex flex-col w-1/4">
            <p class="mb-2 text-slate-400 self-center">Type</p>
           
            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
            >
              <option
                value=""
                className="focus:outline-none focus:border-b bg-white"
              >
                All Updates
              </option>
              <option value="state1">Mr.</option>
              <option value="state2">Mrs.</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
