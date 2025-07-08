import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState} from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import PreviewModal from "./PreviewModal";
import DocsDeleteModal from "./DocsDeleteModal";

function AddViewModal({ onClose, upindex, isOpen, onOpen, userId, title, srcs, shortName, refreshData }) {
  //File Upload Handler

  const [closeBtn, setCloseBtn] = useState(null);
  const [ispabLength, setptabLength] = useState(true);
  const [delID, setDelID] = useState(null);

  const closeButtonHandler = () => {
    onClose(false);
  };

  const [isPrevOpen, setPrevOpen] = useState(false);
  const [prevImgLink, setPrevImgLink] = useState(null);
  const [prevImgTtile, setPrevImgTitle] = useState(null);
  const [isDocsOpen, setisDocsOpen] = useState(false);

  const previewHandler = (item) => {
    setPrevImgLink(item.src);
    setPrevImgTitle(item?.document);
    setPrevOpen(true);
  };

  const deleteHandler = (item) => {
    setDelID(item?._id);
    setisDocsOpen(true);
  };

  const successDel = (status) => {
    refreshData();
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <PreviewModal
        isOpen={isPrevOpen}
        linkSrc={prevImgLink}
        title={prevImgTtile}
        onClose={() => setPrevOpen(false)}
        onOpen={() => setPrevOpen(true)}
      ></PreviewModal>

      <DocsDeleteModal
        isOpen={isDocsOpen}
        onClose={() => setisDocsOpen(false)}
        onOpen={() => setisDocsOpen(true)}
        userId={delID}
        method="get"
        successDel={successDel}
        endpoints="delete_file"
      ></DocsDeleteModal>

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
                <Dialog.Panel className=" font-arial  lg:w-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.14rem] font-bold leading-6 text-center text-gray-900"
                  >
                    View {title}
                  </Dialog.Title>
                  <div className="my-4">
                    <div className="overflow-x-auto chat-scrollbar select-none w-full ">
                      <div className="text-left p-1.5 px-2"></div>
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                        <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
                          <tr className="">
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                              Sr No.
                            </th>

                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                              Name
                            </th>

                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                              Document
                            </th>
                            <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                              View
                            </th>
                            {/* <th className="px-2 py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                              Delete
                            </th> */}
                          </tr>
                        </thead>
                     
                          <tbody className="bg-white divide-y divide-gray-200 break-normal border ">
                            {srcs?.length > 0 ? (
                              srcs?.map((item) => (
                                <tr key={item?.id}>
                                  <td
                                    className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde `}
                                  >
                                    {item?.id}
                                  </td>
                                  <td
                                    className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde `}
                                  >
                                    {item?.name}
                                  </td>

                                  <td
                                    className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde `}
                                  >
                                    {item?.document}
                                  </td>
                                  <td
                                    className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 borde `}
                                  >
                                    <button
                                      onClick={() => previewHandler(item)}
                                      className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                                    >
                                      {<FaEye className="hover:text-blue-500"></FaEye>}
                                    </button>
                                  </td>
                                  {/* <td className="px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 borde">
                                    <button
                                      onClick={() => deleteHandler(item)}
                                      className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                                    >
                                      {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                                    </button>
                                  </td> */}
                                </tr>
                              ))
                            ) : (
                              <>
                                <p>No Data Found</p>
                              </>
                            )}
                          </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-1  flex items-center justify-center py-3">
                    <button
                      type="button"
                      disabled={closeBtn}
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

export default AddViewModal;
