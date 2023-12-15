import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

function SubmitModal({ onClose, isOpen, onOpen, userId, onDeletedData, method, endpoints }) {
  console.log("frmmod", userId)
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const methodDelete = async (userId) => {
    console.log("coming", userId)
    try {
      const resp = await axios[method](`${url}/api/${endpoints}/${userId}`, { headers });
      const respdata = await resp.data.data;
      const respData = await resp.data
      console.log("neww", respData)
      console.log("modres", respdata)
      if (respdata) {
        onDeletedData();
        onClose();
      }
      const msgg = respData.message
      if(msgg){
        toast.error(msgg)
        onClose();
      }
    } catch (error) {
      console.log("moderr", error?.response?.data.message)
      const errMsg = error?.response?.data.message
      if(errMsg){
        toast.error(errMsg)
        onClose()
      }
      // toast.error(error)
      console.log(error)
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
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
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Api Success Response
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">Api Success Message Should be Here</p>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
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

export default SubmitModal;
