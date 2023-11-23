import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
const Family = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [addChildrenArray, setAddChildrenArray] = useState([]);

  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Parental Information
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
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
            disabled={!formActive}
          />
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Mother Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Mother Name"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Martial Status & Children Details
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Maritial Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={!formActive}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="state1">Married</option>
            <option value="state1">Seprated</option>
            <option value="state1">Single</option>
            <option value="state1">Widow / Widower</option>
          </select>
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Spause Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Spause Name"
            disabled={!formActive}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date of Marriage
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Date of Marriage"
            disabled={!formActive}
          />
        </div>
      </div>
      {addChildrenArray?.map((item, index) => (
        <div>
          <div className="flex -mx-2 mb-8" key={index}>
            <small className="font-bold">{index + 1}.</small>
            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Child Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Dependent Name"
                disabled={!formActive}
              />
            </div>
            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Child D.O.B
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Child D.O.B"
                disabled={!formActive}
              />
            </div>
            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Child Gender
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder=" Child Gender"
                disabled={!formActive}
              />
            </div>
            <div className="flex flex-col gap-4 items-center p-4">
              <AiOutlineDelete
                fontSize={26}
                className="text-red-500  cursor-pointer"
                onClick={() =>
                  setAddChildrenArray(
                    addChildrenArray.filter((el, io) => index !== io)
                  )
                }
              />
              {addChildrenArray.length === index + 1 && (
                <IoMdAddCircle
                  fontSize={26}
                  className="text-green-500 cursor-pointer"
                  onClick={() =>
                    setAddChildrenArray([...addChildrenArray, "hey"])
                  }
                />
              )}
            </div>
          </div>
          <div className="flex -mx-2 mb-8">
            <div className="w-1/3 px-2">
              <span className="pr-8 my-2">
                <input className="mr-4 self-center" type="checkbox" />
                Dependent
              </span>
            </div>
            <div className="w-1/3 px-2">
              <span className="pr-8 my-2">
                <input className="mr-4 self-center" type="checkbox" />
                Go to school
              </span>
            </div>
            <div className="w-1/3 px-2">
              <span className="pr-8 my-2">
                <input className="mr-4 self-center" type="checkbox" />
                Stay in hostel
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="flex w-full justify-center m-4">
        <button
          onClick={() => {
            setAddChildrenArray([...addChildrenArray, "hey"]);
          }}
          disabled={!formActive}
          className=" text-white py-2 px-2 rounded-md bg-green-500 hover:bg-orange-500 cursor-pointer"
        >
          + Add Children
        </button>
      </div>

      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Other Dependents
      </div>

      <div className="flex w-full justify-center m-4">
        <button
          onClick={() => {
            setAddChildrenArray([...addChildrenArray, "hey"]);
          }}
          disabled={!formActive}
          className=" text-white py-2 px-2 rounded-md bg-green-500 hover:bg-orange-500 cursor-pointer"
        >
          + Add Other
        </button>
      </div> */}

      {/* <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2">
        Nominee Details
      </div>
      {addNomineeArray?.map((item, index) => (
        <div>
          <div className="flex -mx-2 mb-8" key={index}>
            <small className="font-bold">{index + 1}.</small>
            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Nominee for
              </label>
              <select
                className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                id="stateSelect"
                disabled={!formActive}
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
            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Nominee Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Nominee Name"
                disabled={!formActive}
              />
            </div>
            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Nominee Relation
              </label>
              <select
                className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                id="stateSelect"
                disabled={!formActive}
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
            <div className="flex flex-col gap-4 items-center p-4">
              <AiOutlineDelete
                fontSize={26}
                className="text-red-500 "
                onClick={() =>
                  setAddNomineeArray(
                    addNomineeArray.filter((el, io) => index !== io)
                  )
                }
              />
              {addNomineeArray.length === index + 1 && (
                <IoMdAddCircle
                  fontSize={26}
                  className="text-green-500"
                  onClick={() =>
                    setAddNomineeArray([...addNomineeArray, "hey"])
                  }
                />
              )}
            </div>
          </div>

          <div className="flex -mx-2 mb-8">
            <div className="w-1/3 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Nominee D.O.B
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Nominee D.O.B"
                disabled={!formActive}
              />
            </div>
            <div className="w-1/3 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Nominee Gender
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Nominee Gender"
                disabled={!formActive}
              />
            </div>
            <div className="w-1/3 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Percentage Share
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Percentage Share"
                disabled={!formActive}
              />
            </div>
          </div>
          <div className="flex -mx-2 mb-8">
            <div className="w-1/3 px-2">
              <span className="pr-8 my-2">
                <input className="mr-4 self-center" type="checkbox" />
                Minor
              </span>
            </div>
            <div className="w-1/3 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Address
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                id="textareaField"
                placeholder="Address"
              ></textarea>
            </div>
            <div className="w-1/3 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Nominee Remarks
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Nominee Remarks"
                disabled={!formActive}
              />
            </div>
          </div>
        </div>
      ))} */}
      {/* <div className="flex w-full justify-center m-4">
        <div className="flex w-full justify-center m-4">
          <button
            onClick={() => {
              setAddNomineeArray([...addNomineeArray, "hey"]);
            }}
            disabled={!formActive}
            className=" text-white py-2 px-2 rounded-md bg-green-500 hover:bg-orange-500 cursor-pointer"
          >
            + Add Nominee
          </button>
        </div>
      </div> */}
      <div className="flex justify-between  gap-2 w-2/3 mt-12  flex gap-1 lg:w-1/2   overflow-hidden  px-4 py-1 text-white  pointer">
        <div
          className="w-full  text-center  bg-green-700 px-4 py-1 text-white cursor-pointer"
          onClick={() => props.formType("Personal")}
        >
          ...Prev
        </div>
        <div
          className=" w-full text-center bg-orange-400 px-4 py-1 text-white cursor-pointer"
          onClick={() => props.formType("Bank")}
        >
          Next..
        </div>
      </div>
    </form>
  );
};

export default Family;
