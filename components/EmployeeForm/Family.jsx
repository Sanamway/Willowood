import React from "react";

const Family = () => {
  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Parental Information
      </div>
      <div className="flex -mx-2 mb-8">
        <div className="w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Father Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Father Name"
          />
        </div>
        <div className="w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Father date of birth
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Father D.O.B"
          />
        </div>
        <div className="w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Mother Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Mother Name"
          />
        </div>
      </div>
      <div className="flex -mx-2 mb-8">
        <div className="w-1/3 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Mother D.O.B
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Passport Expiry"
          />
        </div>
      </div>

      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Martial Status & Children Details
      </div>
      <div className="w-1/3 px-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="inputField"
        >
         <small className="text-red-600">*</small>  Maritial Status
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
      <div className="flex w-full justify-center m-4">
        <button
          onClick={() => {
            router.push("/form/business_unit_division_form");
          }}
          className=" text-white py-2 px-2 rounded-md bg-green-500 hover:bg-orange-500"
        >
          + Add Children
        </button>
      </div>


      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Nominee Details
      </div>
      
      <div className="flex w-full justify-center m-4">
        <button
          onClick={() => {
            router.push("/form/business_unit_division_form");
          }}
          className=" text-white py-2 px-2 rounded-md bg-green-500 hover:bg-orange-500"
        >
          + Add Nominee
        </button>
      </div>



      

      <div className="button flex justify-end  gap-3 mt-6">
        <div className="bg-green-700 px-4 py-1 text-white">Edit</div>
      </div>
    </form>
  );
};

export default Family;
