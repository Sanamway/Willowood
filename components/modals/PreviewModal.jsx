import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const PreviewModal = ({ onClose, isOpen, linkSrc, title }) => {

  const isImage = typeof linkSrc === 'string' && (linkSrc.toLowerCase().endsWith('.png') || linkSrc.toLowerCase().endsWith('.jpg'));

  const closeButtonHandler = () => {
    onClose(false);
  };

  return (
    <>
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
                <Dialog.Panel className="w-[100%] md:w-[80%]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 w-full  ">
                    <p className="text-sm text-gray-500">
                      {isImage ? (
                        <img style={{ width: "100%" }} src={linkSrc} alt="Image" />
                      ) : (
                        <iframe title="PDF Viewer" src={linkSrc} width="100%" height="500px" />
                      )}
                    </p>
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
};

export default PreviewModal;
