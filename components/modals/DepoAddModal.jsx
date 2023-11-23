import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";

function DepoAddModal({ onClose, isOpen, onOpen, userId, onDeletedData, method, endpoints }) {
  console.log("frmmod", userId);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial min-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    
                  </Dialog.Title>
                  <form
                    className=" bg-white rounded shadow p-4 w-full h-screen overflow-auto"
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
                        />
                      </div>
                    </div>
                    <div className="flex my-2 mb-2 lg:flex-row flex-col">
                      <div className="w-full px-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                          <small className="text-red-600">*</small> City
                        </label>
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
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
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
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
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600">*</small> State
                        </label>
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                        >
                          <option value="" className="focus:outline-none focus:border-b bg-white">
                            Option
                          </option>
                          <option value="state1">State 1</option>
                          <option value="state2">State 2</option>
                        </select>
                      </div>
                      <div className="w-full px-2 ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600">*</small> Pin Code
                        </label>
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
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
                        />
                      </div>
                    </div>
                    <div className="flex my-2 mb-2 lg:flex-row flex-col ">
                      <div className="w-full px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600">*</small> Primary Mobile
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Primary Mobile"
                        />
                      </div>
                      <div className="w-full px-2 ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600">*</small> Secondary Mobile
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Secondary Mobile"
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
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600"></small> District
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="District"
                        />
                      </div>
                      <div className="w-full px-2 ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600"></small> Territory
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Territory"
                        />
                      </div>
                    </div>
                    <div className="flex my-2 mb-2 lg:flex-row flex-col ">
                      <div className="w-full px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600"></small> Region
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Region"
                        />
                      </div>
                      <div className="w-full px-2 ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600"></small> Zone
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Zone"
                        />
                      </div>
                    </div>
                    <div className="flex my-2 mb-2 lg:flex-row flex-col ">
                      <div className="w-full px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600"></small> Business Unit
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Business Unit"
                        />
                      </div>
                      <div className="w-full px-2 ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 pt-2"
                          htmlFor="inputField"
                        >
                          <small className="text-red-600"></small> Segment
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Segment"
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
                        />
                      </div>
                    </div>
                  </form>
                  ;
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        methodDelete(userId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DepoAddModal;
