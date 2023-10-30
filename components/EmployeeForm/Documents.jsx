import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiLightBulb } from "react-icons/hi";
const Documents = () => {
  let [isOpen, setIsOpen] = useState(false);
  const menus = [
    {
      id: 1,
      name: "Bank Details",
    },
    {
      id: 2,
      name: "Declaration Forms",
    },
    {
      id: 2,
      name: "Education Details",
    },
    {
      id: 2,
      name: "Employee Identity Card",
    },
    {
      id: 2,
      name: "Employement Details",
    },
    {
      id: 2,
      name: "Identification Details",
    },
    {
      id: 2,
      name: "Other",
    },
    {
      id: 2,
      name: "Personal Details",
    },
    {
      id: 2,
      name: "Requistion for Visiting Cards",
    },
    {
      id: 2,
      name: "Training Details",
    },
  ];
  const handleUploadImage = (e) => {
    console.log("ys", e.target.files[0]);
    if (e.target.files[0]) {
      setIsOpen(true);
    }
  };
  const [formActive, setFormActive] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-2 pb-24">
      <div className="self-end mt-4 text-sm text-green-700">
        DOWNLOAD ALL DOCUMENTS
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-gray-100 pb-12 pt-4 ">
        <h1 className="text-4xl font-bold text-gray-300">DROP FILES HERE</h1>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-5"
          htmlFor="imageUpload"
        >
          Click to upload
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadImage}
          id="imageUpload"
        />
      </div>

      <table className="min-w-full">
        <thead className="font-arial border-b">
          <tr className="border bg-gray-50 font-arial">
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider ">
              SR NO.
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Document Name
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              File Name
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Last Updated
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Date of expiry
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Download file
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Sample document
            </td>
          </tr>
        </thead>
        <tbody className="font-arial ">
          {menus.map((menu, index) => (
            <tr
              className="bg-white divide-y border divide-gray-200 text-xs"
              key={menu.id}
            >
              <td className="border px-4 py-2 flex items-center gap-4">
                <input type="checkbox" disabled={!formActive} />
                {index + 1}
              </td>
              <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                {menu.name}
              </td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button flex justify-end  gap-3 mt-6">
        {formActive ? (
          <div
            className="bg-green-700 px-4 py-1 text-white  pointer"
            onClick={() => setFormActive(true)}
          >
            Submit
          </div>
        ) : (
          <div
            className="bg-green-700 px-4 py-1 text-white pointer"
            onClick={() => setFormActive(true)}
          >
            Edit
          </div>
        )}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <p className="flex flex-row justify-between px-2 text-slate-500">
                      <small>Upload</small>
                      <small className="flex gap-1">
                        <HiLightBulb className="mt-1  text-red-500" /> Max limit for each file
                        is 10 MB
                      </small>
                    </p>
                  </Dialog.Title>
                  <div className="flex flex-row gap-2 mt-8 mb-8">
                    <p className="text-sm text-gray-500 px-2 w-max flex flex-col gap-2">
                      File
                      <small>aT3DY2X60k_ADf</small>
                    </p>
                    <p className="text-sm text-gray-500 px-2 w-max flex flex-col gap-2">
                      Size<small>230.654 KB</small>
                    </p>
                    <select
                      className="w-1/2 px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="stateSelect"
                      disabled={!formActive}
                    >
                      <option
                        value=""
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select Document
                      </option>
                      <option value="state1">Bank Details</option>
                      <option value="state2">Declaration Form</option>
                      <option value="state2">Education Details</option>
                      <option value="state2">Employee Identity Card</option>
                      <option value="state2">Employement Details</option>
                      <option value="state2">Identification Details</option>
                      <option value="state2">Other</option>
                      <option value="state2">Personal Details</option>
                      <option value="state2">
                        Requisition for Visiting Cards
                      </option>
                      <option value="state2">Traning Details</option>
                    </select>
                  </div>

                  <div className="mt-4 flex flex-row gap-4 justify-end">
                    <button
                      type="button"
                      className="bg-slate-700 px-4 py-1 text-white pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-green-700 px-4 py-1 text-white pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Ok
                    </button>
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

export default Documents;
