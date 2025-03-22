import React, { useState, useEffect } from "react";
import { IoIosBasket } from "react-icons/io";

const Collection = () => {
    const [collectionDate, setCollectionDate] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [mode, setMode] = useState("");


    return (

        <div className="bg-white shadow-md rounded-lg p-1 mb-2 mx-1 mt-2">
            {/* Header */}
            <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                Party Information
            </div>

            {/* Party Information */}
            <div className="p-2 border-b border-gray-300">
                <div className="flex">
                    <span className="font-medium w-[160px]">SAP Code</span>

                </div>
                <div className="flex">
                    <span className="font-medium w-[160px]">Party Name</span>

                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <span className="font-medium ">Territory</span>
                        <span>: NorthXXXXX</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium ">Region</span>
                        <span>: WestXXXXXXXX</span>
                    </div>
                </div>

            </div>

            {/* Outstanding Information */}
            <div className=" border-b border-gray-300">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Outstanding Information
                </div>

                <div className="p-2 border-b border-gray-300">
                    <div className="flex">
                        <span className="font-medium min-w-[160px]">Total Outstanding</span>
                        <span>: 123456</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium min-w-[160px]">Total Overdue</span>
                        <span>: 1919291</span>
                    </div>
                    <div className="flex">
                        <span className="font-medium min-w-[160px]">Super Cash</span>
                        <span>: 1231</span>
                    </div>

                </div>


            </div>

            {/* Payment Collection Input */}
            <div className="border-b border-gray-300 ">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Payment Collection Input
                </div>
                <div className="p-2 border-b border-gray-300">

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Collection Date</label>
                        <span>:</span>
                        <input type="date" className="border rounded p-1 ml-2 flex-1" />
                    </div>



                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Payment Date</label>
                        <span>:</span>
                        <input type="date" className="border rounded p-1 ml-2 flex-1" />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Amount Closed</label>
                        <span>:</span>
                        <input type="text" className="border rounded p-1 ml-2 flex-1" />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Mode</label>
                        <span>:</span>
                        <select className="border rounded p-1 ml-2 flex-1">
                            <option value="">Select Mode</option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Cheque/UTR No</label>
                        <span>:</span>
                        <input type="text" className="border rounded p-1 ml-2 flex-1" />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Date</label>
                        <span>:</span>
                        <input type="date" className="border rounded p-1 ml-2 flex-1" />
                    </div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="p-4">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Upload Image
                </div>
                <div className="border-dashed border-2 border-gray-400 rounded-lg h-40 flex flex-col justify-center items-center mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <IoIosBasket className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-gray-600">Click to Upload</span>
                        <input id="file-upload" type="file" className="hidden" />
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 p-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Submit</button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg">Close</button>

            </div>
        </div>



    );
};

export default Collection;
