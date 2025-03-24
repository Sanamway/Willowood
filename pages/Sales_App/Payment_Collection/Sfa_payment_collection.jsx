import React, { useState, useEffect } from "react";
import { IoIosBasket } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
const Collection = (props) => {
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    console.log("uio", props)
    const [localStorageItems, setLocalStorage] = useState({})


    const [formData, setFormData] = useState({
        collectionDate: null,
        paymentDate: null,
        amountClosed: "",
        mode: "",
        chequeUtrNo: "",
        date: null,
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };


    const [propsData, setPropsData] = useState("")


    useEffect(() => {
        setPropsData(props)
    }, [props])



    const getBstData = () => {
        if (typeof window === "undefined") return
        const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

        switch (roleId) {
            case 6:
                return <div className="flex flex-row justify-between">
                    <div className="flex">

                        <span className="font-medium  w-[160px]">Territory</span>
                        <span>: {JSON.parse(window.localStorage.getItem("userinfo")).territory_name}</span>
                    </div>

                </div>

                break;
            case 5:

                return <div className="flex flex-row justify-between">
                    <div className="flex">
                        <span className="font-medium w-[160px]">Region</span>
                        <span>: {JSON.parse(window.localStorage.getItem("userinfo")).region_name}</span>
                    </div>

                </div>

                break;
            case 4:



                break;
            case 3:



                break;
            case 10:


                break;
            default:



                break;
        }
    }



    const handleSave = async () => {
        try {
            const data = {
                kunnr: 123456,
                collection_date: formData.collectionDate,
                payment_date: formData.paymentDate,
                amount_collected: formData.amountClosed,
                mode: formData.mode,
                cheque_utr_no: formData.chequeUtrNo,
                utr_chq_date: formData.collectionDate,
                payment_image: "base64-encoded-string",
                user_id: window.localStorage.getItem("uid"),
                emp_code: window.localStorage.getItem("emp_code"),
                creation_date: new Date(),



            };


            const respond = await axios
                .post(`${url}/api/create_payment_collection`, JSON.stringify(data), {
                    headers: headers,
                })
                .then((res) => {
                    if (!res) return;


                    toast.success(res.data.message)

                });
        } catch (errors) {

        }
    };


    const [collectionPlanData, setCollectionPlanData] = useState({})
    const getCollectionData = async (
    ) => {
        let paramsData;


        const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
        switch (roleId) {
            case 6:
                paramsData = {
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
                    t_des: JSON.parse(window.localStorage.getItem("userinfo")).territory_name || '',
                    m_year: moment().format("YYYY-MM"),
                    party_code: propsData.data?.sapCode
                };
                break;
            case 5:

                paramsData = {
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    r_id: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
                    r_des: JSON.parse(window.localStorage.getItem("userinfo")).region_name || '',
                    m_year: moment().format("YYYY-MM"),
                    party_code: propsData.data?.sapCode
                };


                break;
            case 4:

                paramsData = {
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    z_id: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
                    z_des: JSON.parse(window.localStorage.getItem("userinfo")).zone_name || '',
                    m_year: moment().format("YYYY-MM"),
                    party_code: propsData.data?.sapCode
                };

                break;
            case 3:

                paramsData = {
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    bu_id: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
                    bu_des: JSON.parse(window.localStorage.getItem("userinfo")).business_unit_name || '',
                    m_year: moment().format("YYYY-MM"),
                    party_code: propsData.data?.sapCode
                };

                break;
            case 10:
                paramsData = {
                    c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
                    bg_id: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
                    bg_des: JSON.parse(window.localStorage.getItem("userinfo")).business_segment_name || '',
                    m_year: moment().format("YYYY-MM"),
                    party_code: propsData.data?.sapCode
                };


                break;
            default:



                break;
        }
        try {

            localStorage.setItem("RSP", JSON.stringify([]));
            const respond = axios.get(`${url}/api/getsapCollectiondata`, {
                headers: headers,
                params: paramsData,
            });
            const apires = await respond;
            setCollectionPlanData(apires.data.data[0])

        } catch (error) {
            console.log("zxc", error)
            const errorMessage = error?.response?.data?.message;


        }
    };


    useEffect(() => {
        if (typeof window === "undefined") return
        getCollectionData()
    }, [propsData])

    return (
        <div className="bg-white shadow-md rounded-lg p-1 mb-2 mx-1 mt-2">
            <Toaster position="bottom-center" reverseOrder={false} />
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
                {getBstData()}
            </div>
            <div className=" border-b border-gray-300">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Outstanding Information
                </div>
                <div className="p-2 border-b border-gray-300">
                    <div className="flex">
                        <span className="font-medium min-w-[160px]">Total Outstanding</span>
                        <span>: {collectionPlanData["Net Balance Amt(INR)"]} </span>
                    </div>

                    <div className="flex">
                        <span className="font-medium min-w-[160px]">Total Overdue</span>
                        <span>: {collectionPlanData["366-720"] + collectionPlanData["720 And Above"]} </span>
                    </div>

                    <div className="flex">
                        <span className="font-medium min-w-[160px]">Super Cash</span>
                        <span>:  0.00 </span>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-300">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Payment Collection Input
                </div>
                <div className="p-2 border-b border-gray-300">
                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Collection Date</label>
                        <span>:</span>
                        <DatePicker
                            selected={formData.collectionDate}
                            onChange={(date) => handleDateChange(date, "collectionDate")}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Payment Date</label>
                        <span>:</span>
                        <DatePicker
                            selected={formData.paymentDate}
                            onChange={(date) => handleDateChange(date, "paymentDate")}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Amount Closed</label>
                        <span>:</span>
                        <input
                            type="text"
                            name="amountClosed"
                            value={formData.amountClosed}
                            onChange={handleInputChange}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Mode</label>
                        <span>:</span>
                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleInputChange}
                            className="border rounded p-1 ml-2 flex-1"
                        >
                            <option value="">Select Mode</option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Cheque/UTR No</label>
                        <span>:</span>
                        <input
                            type="text"
                            name="chequeUtrNo"
                            value={formData.chequeUtrNo}
                            onChange={handleInputChange}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Date</label>
                        <span>:</span>
                        <DatePicker
                            selected={formData.date}
                            onChange={(date) => handleDateChange(date, "date")}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>
                </div>
            </div>


            <div className="p-4">
                <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                    Upload Image
                </div>
                <div className="border-dashed border-2 border-gray-400 rounded-lg h-40 flex flex-col justify-center items-center mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <IoIosBasket className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-gray-600">Click to Upload</span>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 p-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => handleSave()}>Submit</button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg">Close</button>

            </div>
        </div>



    );
};

export default Collection;
