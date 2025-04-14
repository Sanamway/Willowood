import React, { useState, useEffect } from "react";
import { IoIosBasket } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { useRouter } from "next/router";
const Collection = (props) => {
    const router = useRouter()
    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };

    const [formData, setFormData] = useState({
        collectionDate: new Date(),
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


    const [loading, setLoading] = useState(false)
    const handleSave = async () => {
        setLoading(true)
        try {
            const data = {
                kunnr: propsData.data?.sapCode,
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
                    setLoading(false)
                    console.log("pop", res.data.data.pay_no)
                    uploadImage(res.data.data.pay_no)
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


    const [uploadDocument, setUploadDocument] = useState("")
    const [image, setImage] = useState()

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            setUploadDocument(file); // Update state with the file object
            setImage(URL.createObjectURL(file))
        }

    };

    const uploadImage = async (data) => {
        function getFileExtension(filename) {
            if (typeof filename.name !== "string") {
                console.error("Invalid input. Expected a string.");
                return toast.error("Input a valid Image");
            }

            const parts = filename.name.split(".");
            if (parts.length > 1) {
                return parts[parts.length - 1];
            } else {
                return "jpg";
            }
        }

        try {
            const renamedBlob = new Blob([uploadDocument], {
                type: uploadDocument?.type,
            });

            const fd = new FormData();
            fd.append(
                "myFile",
                renamedBlob,
                `${getFileExtension(uploadDocument)}`
            );

            const response = await axios
                .post(`${url}/api/upload_file`, fd, {
                    params: {
                        file_path: "payment_collection",
                        payment_image: `${data}.${getFileExtension(
                            uploadDocument
                        )}`,
                        pay_no: data,
                    },
                })
                .then(() => {
                    setUploadDocument("")
                    router.push({
                        pathname: "/Sales_App/Order_Booking/Delaer_List"
                    })
                    setFormData(
                        {
                            collectionDate: null,
                            paymentDate: null,
                            amountClosed: "",
                            mode: "",
                            chequeUtrNo: "",
                            date: null,
                            file: null,
                        }
                    )
                    toast.success("Image added successfully!");
                });
        } catch (error) {

            console.log("ooo", error)
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-1 mb-2 mx-1 mt-2">
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="bg-yellow-400 text-black text-center font-semibold py-2 rounded-t-lg">
                Party Information
            </div>
            <div className="p-2 border-b border-gray-300">
                <div className="flex">
                    <span className="font-medium w-[160px]">SAP Code</span>
                    <span>: {propsData.data?.sapCode}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium w-[160px]">Party Name :</span>
                    <span>{propsData.data?.partyName}</span>
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
                            dateFormat="dd-MM-yyyy"
                            onChange={(date) => handleDateChange(date, "collectionDate")}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Payment Date</label>
                        <span>:</span>
                        <DatePicker
                            selected={formData.paymentDate}
                            dateFormat="dd-MM-yyyy"
                            onChange={(date) => handleDateChange(date, "paymentDate")}
                            className="border rounded p-1 ml-2 flex-1"
                        />
                    </div>

                    <div className="mb-2 flex items-center">
                        <label className="font-medium min-w-[160px]">Collection Amount</label>
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
                            dateFormat="dd-MM-yyyy"
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
                {console.log("opo", uploadDocument)}
                {image ? (
                    <label htmlFor="file-upload">
                        <img
                            src={image}
                            alt="Uploaded Image"
                            className="border-dashed border-2 border-gray-400 rounded-lg h-40 w-full object-cover cursor-pointer"

                        />
                    </label>
                ) : (
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
                )}

            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 p-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => handleSave()} disabled={loading}>Submit</button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => {
                    if (window.confirm("Do you want to close")) {
                        router.push({
                            pathname: "/Sales_App/Order_Booking/Delaer_List"
                        })
                    }
                    else {
                        return
                    }
                }
                }
                >Close</button>

            </div>
        </div>



    );
};

export default Collection;
