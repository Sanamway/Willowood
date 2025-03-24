import React, { useState, useEffect, Fragment } from "react";

import { useSelector } from "react-redux";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

const History = (props) => {
    const [propsData, setPropsData] = useState("")


    useEffect(() => {
        setPropsData(props)
    }, [props])
    const reports = [
        {
            collectionDate: "XXXXX",
            paymentDate: "XXXXX",
            amountCollected: "XXX",
            mode: "Cheque",
            chequeUtrNo: "XXXXX",
            date: "XXX",
        },
        {
            collectionDate: "XXXXX",
            paymentDate: "XXXXX",
            amountCollected: "XXX",
            mode: "Cash",
            chequeUtrNo: "XXXXX",
            date: "XXX",
        },
        {
            collectionDate: "XXXXX",
            paymentDate: "XXXXX",
            amountCollected: "XXX",
            mode: "Bank Transfer",
            chequeUtrNo: "XXXXX",
            date: "XXX",
        },
    ];
    const [showImageModal, setShowImageModal] = useState(false)
    return (

        <div className="bg-white shadow-md rounded-lg p-2 mb-2 mx-1 mt-2">
            {/* Party Information Section */}
            <div className="border-b border-gray-300">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Party Information
                </div>
                <div className="p-2 border-b border-gray-300">
                    <div className="flex">
                        <span className="font-medium w-[160px]">SAP Code</span>
                        <span>: {propsData.data?.sapCode}</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium w-[160px]">Party Name</span>
                        <span>: {propsData.data?.partyName}</span>
                    </div>

                </div>
                <div className="flex gap-2 mt-2 items-center justify-center">
                    <div className="  flex items-center">
                        <input type="date" className="border rounded  w-full p-1  flex-1" />
                    </div>
                    <span className="font-medium ">To</span>
                    <div className="  flex items-center">

                        <input type="date" className="border rounded  w-full p-1  flex-1" />
                    </div>

                </div>
                <div className="flex w-full justify-center text-white items-center  mb-2">
                    <button className="flex  justify-center w-16 bg-blue-400 h-8 items-center mt-2">View</button>

                </div>

            </div>

            {/* Payment Collection Reports */}
            <div className="p-2">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Payment Collection Reports
                </div>

                {/* Report Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {reports.map((report, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                            {/* Eye Icon in the Top-Right Corner */}
                            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={() => setShowImageModal(true)}>
                                <IoEyeOutline size={32} className="text-red-400" />
                            </button>

                            {/* Report Fields */}
                            <div className="flex items-center mb-2">
                                <span className="font-medium min-w-[140px]">Collection Date</span>
                                <span>: {report.collectionDate}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-medium min-w-[140px]">Payment Date</span>
                                <span>: {report.paymentDate}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-medium min-w-[140px]">Amount Collected</span>
                                <span>: {report.amountCollected}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-medium min-w-[140px]">Mode</span>
                                <span>: {report.mode}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-medium min-w-[140px]">Cheque/UTR No</span>
                                <span>: {report.chequeUtrNo}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-medium min-w-[140px]">Date</span>
                                <span>: {report.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <Transition appear show={showImageModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="z-10"
                    onClose={() => setShowImageModal(false)}
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
                                        Image
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <Image
                                            src={""}
                                            className=" rounded bg-gray-200"
                                            width={300}
                                            height={200}
                                        />
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

export default History;
