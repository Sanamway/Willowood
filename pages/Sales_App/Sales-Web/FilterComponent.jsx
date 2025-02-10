import React, { useState, useEffect } from "react";
import { url } from "@/constants/url";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
const FilterComponent = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const dispatch = useDispatch(); // Access the dispatch function
  const [openModal, setOpenModal] = useState(false)


  return (

    <div className="flex flex-row gap-3 bg-blue-500 p-2 items-center">

      <div className="flex  flex-col gap-1.5 ">

        <span value="All" className="w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500">
          7
        </span>


      </div>
      <div className="w-[10%] flex flex-col gap-1.5 ">
        <select
          className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"



        >
          <option value={""} className="font-bold">
            - 25 -
          </option>

        </select>
      </div>
      <div className="w-[25%] flex flex-col gap-1.5 ">
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"


        >
          <option value={""}>- Confirmed -</option>


        </select>
      </div>
      <div className="w-[25%] flex flex-col gap-1.5 ">
        <select
          className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
          id="stateSelect"


        >
          <option value={""}>- Modification Date -</option>


        </select>
      </div>
      <div className="flex flex-col gap-1.5 ">
        <FaSearch className="text-white " size={20} />
      </div>
      <div className=" flex flex-col gap-1.5 ">
        <IoFilterOutline className="text-white" size={25} onClick={() => setOpenModal(true)} />
      </div>

      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpenModal(false)
          }}

        >
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
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Filters
                  </Dialog.Title>
                  <div className="flex gap-2 flex-wrap w-full flex-row justify-around">
                    <div className="w-[46%] flex flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">From</label>
                      <select
                        className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"


                      >

                        <option value="All" className="font-bold" disabled={true}>
                          -- Select --
                        </option>


                      </select>
                    </div>
                    <div className="w-[46%] flex  flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">To</label>
                      <select
                        className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"

                      >
                        <option value="All" className="font-bold">
                          All
                        </option>

                      </select>
                    </div>
                    <div className="w-[46%] flex flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">Party</label>
                      <select
                        className=" w-full max px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"


                      >
                        <option value={""} className="font-bold">
                          - Business Segment -
                        </option>

                      </select>
                    </div>
                    <div className="w-[46%] flex flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">Matrial Code</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"


                      >
                        <option value={""}>- Business Unit -</option>


                      </select>
                    </div>
                    <div className="w-[46%] flex flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">Material Search</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"


                      >
                        <option value={""}>- Depot -</option>


                      </select>
                    </div>
                    <div className="w-[46%] flex flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">Region</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"

                      >
                        <option value={""}>- SAP Order No -</option>

                      </select>
                    </div>
                    <div className="w-[46%] flex flex-col gap-1.5 ">
                      <label className="text-gray-500 font-bold text-[0.85rem]">Teritory</label>
                      <select
                        className="w-full px-3 py-1.5 border-[1px] border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b focus:border-indigo-500"
                        id="stateSelect"

                      >
                        <option value={""}>- Territory -</option>

                      </select>
                    </div>
                    <div className="w-[46%] flex flex-col gap-1.5 ">

                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  );
};

export default FilterComponent;
