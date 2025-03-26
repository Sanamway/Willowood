import React, { useState, useEffect, Fragment } from "react";

import { useSelector } from "react-redux";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { url } from "@/constants/url";
import axios from "axios";
const History = (props) => {
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const [propsData, setPropsData] = useState("")


    useEffect(() => {
        setPropsData(props)
    }, [props])


    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [paymentCollectionData, setPaymentCollectionData] = useState(null);

    const getPaymentCollectionData = async () => {
        let paramsData;
        const userInfo = JSON.parse(window.localStorage.getItem("userinfo"));
        paramsData = {
            c_id: 1,
            kunnr: propsData.data?.sapCode,
            from: startDate,
            to: endDate,
        }

        try {

            const response = await axios.get(`${url}/api/get_payment_collection`, {
                headers: headers,
                params: paramsData,
            });
            setPaymentCollectionData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };




    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
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
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="border rounded w-full p-1 flex-1"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select start date"
                        />
                    </div>
                    <span className="font-medium ">To</span>
                    <div className="  flex items-center">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="border rounded w-full p-1 flex-1"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select end date"
                        />
                    </div>

                </div>
                <div className="flex w-full justify-center text-white items-center  mb-2">
                    <button className="flex  justify-center w-16 bg-blue-400 h-8 items-center mt-2" onClick={() => getPaymentCollectionData()}>View</button>

                </div>

            </div>
            {/* Payment Collection Reports */}
            <div className="p-2">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Payment Collection Reports
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {paymentCollectionData.length > 0 ? (
                        paymentCollectionData.map((report, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                                {/* Eye Icon for Viewing Image */}
                                {report.payment_image && (
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                        onClick={() => {
                                            setSelectedImage(report.payment_image);
                                            setShowImageModal(true);
                                        }}
                                    >
                                        <IoEyeOutline size={32} className="text-red-400" />
                                    </button>
                                )}

                                {/* Report Fields */}
                                <div className="flex items-center mb-2">
                                    <span className="font-medium min-w-[140px]">Collection Date</span>
                                    <span>: {new Date(report.collection_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="font-medium min-w-[140px]">Payment Date</span>
                                    <span>: {new Date(report.payment_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="font-medium min-w-[140px]">Amount Collected</span>
                                    <span>: {report.amount_collected}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="font-medium min-w-[140px]">Mode</span>
                                    <span>: {report.mode}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="font-medium min-w-[140px]">Cheque/UTR No</span>
                                    <span>: {report.cheque_utr_no}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">No reports found.</p>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            <Transition appear show={showImageModal} as={Fragment}>
                <Dialog as="div" className="z-10" onClose={() => setShowImageModal(false)}>
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
                                <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                                    >
                                        Payment Image
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {selectedImage ? (
                                            <img
                                                src={`data:image/png;base64,${selectedImage}`}
                                                alt="Payment Proof"
                                                className="rounded bg-gray-200 w-full h-auto"
                                            />
                                        ) : (
                                            <p className="text-center text-gray-500">No image available</p>
                                        )}
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
