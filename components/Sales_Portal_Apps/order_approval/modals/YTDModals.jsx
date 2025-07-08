import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

import { useRouter } from "next/router";

function YTDModal({
  onClose,
  upindex,
  isOpen,
  onOpen,
  userId,
  title,
  shortName,
  refreshData,
  deleteType,
  ytdData
}) {
  const [closeBtn, setCloseBtn] = useState(null);
  const [ispabLength, setptabLength] = useState(true);
  const [delID, setDelID] = useState(null);
  const router = useRouter();

  const srcs = [
    { id: 1, name: currentDate(), document: 23 },
    { id: 2, name: currentDate(), document: 24 },
    { id: 3, name: currentDate(), document: 34 },
    { id: 4, name: currentDate(), document: 56 }
  ];

  const closeButtonHandler = () => {
    onClose(false);
  };

  const successDel = (status) => {
    refreshData();
  };

  function currentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }


  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <Dialog.Panel className=" font-arial  w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.14rem] font-bold leading-6 text-center text-gray-900"
                  >
                    YTD Collection
                  </Dialog.Title>
                  <div className="my-4">
                    <div className="overflow-x-auto chat-scrollbar select-none w-full">
                      <h2 className="text-xs">Last Credit Date : {currentDate()} </h2>
                      <div className="text-left p-1.5 px-2"></div>
                      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 rounded-full">
                        <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md">
                          <tr>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                              Month
                            </th>
                            <th className="px-2 py-1 text-end lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                              Collection Amt
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200 break-normal border">
                          {ytdData?.monthly_sum ? (
                            <>
                              {Object?.entries(ytdData?.monthly_sum)?.map(([key, value]) => (
                                <tr key={key}>
                                  <td className="px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900">
                                    {key}
                                  </td>
                                  <td className="px-2 text-end whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900">
                                    {value}
                                  </td>
                                </tr>
                              ))}

                              <tr className="bg-blue-100 font-bold">
                                <td colSpan="2" className="px-2  text-end py-1 text-[0.6rem] text-gray-900">
                                  Total :{" "}
                                  {/* {srcs.reduce((total, item) => total + (Number(item?.document) || 0), 0)} */}
                                  {Object.entries(ytdData?.monthly_sum).map(([key, value]) => {
                                    return value;
                                  }).reduce((total, item) => total + (Number(item) || 0), 0)}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-2 py-2 text-center text-gray-600">
                                No Data Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-1  flex items-center justify-center py-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => closeButtonHandler()}
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

export default YTDModal;
