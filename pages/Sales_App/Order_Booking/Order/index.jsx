import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../Layout";
import { IoIosBasket } from "react-icons/io";

import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import moment from "moment";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { FcNews } from "react-icons/fc";
import { IoLocationOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { FcNeutralTrading } from "react-icons/fc";
import axios from "axios";
import { url } from "@/constants/url";
import Select from "react-select";
const Dashboard = () => {

    const router = useRouter();

    const headers = {
        "Content-Type": "application/json",
        secret: "fsdhfgsfuiweifiowefjewcewcebjw",
    };
    const [localStorage, setLocalStorage] = useState({
        teritory: "",
        region: "",
        empCode: "",
        empName: ""
    })
    useEffect(() => {
        setLocalStorage(
            {
                teritory: JSON.parse(window.localStorage.getItem("userinfo")).teritory_name,
                region: JSON.parse(window.localStorage.getItem("userinfo")).region_name,
                empCode: window.localStorage.getItem("emp_code"),
                empName: window.localStorage.getItem("user_name")


            }
        )
    }, [])
    const [dealerData, setDealerData] = useState([])
    console.log("pop", router)
    const gettingDealerData = async () => {
        try {
            const resp = await axios.get(`${url}/api/get_dealer`, {
                headers: headers,
                params: { customer_code: router.query.sap_code },
            });
            const respData = await resp.data.data;
            setDealerData(respData);
        } catch (error) {
            console.log(error);
            setDealerData([]);
        }
    };
    useEffect(() => {
        if (!router.query.sap_code) return
        gettingDealerData()
    }, [router.query.sap_code])






    const data = [
        {
            material_code: "MAT001",
            uom: "KG",
            price: "120.50",
            value: "0.00", // This can be calculated dynamically based on Qty
        },
        {
            material_code: "MAT002",
            uom: "Litre",
            price: "80.75",
            value: "0.00",
        },
        {
            material_code: "MAT003",
            uom: "Piece",
            price: "45.00",
            value: "0.00",
        },
        {
            material_code: "MAT004",
            uom: "Box",
            price: "250.00",
            value: "0.00",
        },
    ];

    const [searchBy, setSearchBy] = useState("Name")
    const [filterState, setFilterState] = useState("")
    const [dropDownOption, setDropDownOption] = useState([])
    // API call to fetch dropdown options


    const getSearchData = async (value) => {
        let params
        switch (searchBy) {
            case "Name":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    name: value,
                }

                break;
            case "Category":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    category: value,
                }

                break;
            case "Brand":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    brand: value,
                }

                break;
            case "Pack_Size":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    pack_size: value,
                }
            case "Dealer":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    dealer: value,
                }
            case "Segment":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    segment: value,
                }
            case "Technical_Name":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    technical_name: value,
                }
            case "Material_Code":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    material_code: value,
                }

                break;

            default:
                break;
        }
        try {
            const response = await axios.get(`${url}/api/get_product_material_sku`, {
                params: params,
                headers,
            });

            const apires = response.data.data;
            console.log("API Response:", apires);

            // Map API response to include images
            let options = apires.map((item) => ({
                value: item.mat_name,
                label: item.mat_name,
                image: item.product_banner, // Assuming this is the image URL
            }));

            setDropDownOption(options);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Custom Single Option Component (Selected Value)
    const customSingleValue = ({ data }) => (
        <div className="flex items-center">
            {data.image && <img src={data.image} alt={data.label} className="w-6 h-6 rounded-full mr-2" />}
            <span>{data.label}</span>
        </div>
    );

    // Custom Dropdown Option Component
    const customOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="flex items-center px-2 py-2 hover:bg-gray-200 cursor-pointer">
                {data.image && <img src={data.image} alt={data.label} className="w-8 h-8 rounded-md mr-2" />}
                <span>{data.label}</span>
            </div>
        );
    };

    return (

        <div className="bg-gray-200">
            {/* Header Section */}
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-400 lg:flex-col">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={() =>
                            router.push({
                                pathname: "/Sales_App/Home",
                            })
                        }
                    />
                    <span className="flex flex-row gap-2 justify-center items-center">  <FcNews size={32} className="text-indigo-600" /> <span>XYZ General Store</span></span>
                </span>
                <span className="text-white self-center">
                    <Popover as="div" className="relative border-none outline-none mt-2">
                        {({ open }) => (
                            <>
                                <Popover.Button className="focus:outline-none"></Popover.Button>
                                <Popover.Panel
                                    as="div"
                                    className={`${open ? "block" : "hidden"} absolute z-40 top-1 right-0 mt-2 w-36 bg-white text-black border rounded-md shadow-md`}
                                >
                                    <ul className="text-black text-sm flex flex-col gap-4 py-4 cursor-pointer">
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2 items-center lg:hidden">
                                            <FaHandsHelping className="text-[#626364] cursor-pointer" size={20} />
                                            Help
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2 items-center lg:flex-col">
                                            <IoSettingsOutline className="text-[#626364] cursor-pointer" size={20} />
                                            Setting
                                        </li>
                                    </ul>
                                </Popover.Panel>
                            </>
                        )}
                    </Popover>
                </span>
            </div>

            {/* Billing Information Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-1  mx-2">
                {/* Header Row */}
                <div className="flex justify-between font-bold border-b pb-2 mb-2">
                    <span>Billing Information</span>  <span>Created Date: {moment().format("DD-MM-YY")}</span>
                </div>

                {/* Billing Details */}
                <div className="text-sm space-y-2">
                    <div className="flex justify-between">

                        <span className="font-bold">{dealerData.SAP_customerSAPNo}</span>
                    </div>
                    <div className="flex justify-between">
                        <span><strong>{dealerData.party_Name}</strong></span>

                    </div>

                    <div>
                        {dealerData.postal_Address
                        }
                    </div>

                    <div className="flex justify-between font-bold">
                        <span><strong>Depot Code:</strong> {dealerData?.depotResult?.r_w_id}</span>
                        <span>Warehouse Des {dealerData?.depotResult?.depot_name}</span>
                    </div>
                </div>
            </div>


            {/* Search & Dropdown Section */}
            <div className="flex justify-center  mx-2 tems-center">
                <select
                    className="w-36 px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="citySelect"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                >

                    <option value="Name">Name</option>
                    <option value="Category">Category</option>
                    <option value="Brand">Brand</option>
                    <option value="Pack_Size">Pack Size</option>
                    <option value="Dealer"> Dealer</option>
                    <option value="Segment">Segment</option>
                    <option value="Technical_Name"> Technical Name</option>
                    <option value="Material_Code">Material Code</option>


                </select>

                <div className="relative w-3/4">
                    <Select
                        className="w-full px-3 py-1.5 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b-2 focus:border-indigo-500"
                        value={filterState || ""}
                        isSearchable={true}
                        isMulti={false}
                        options={dropDownOption}
                        placeholder="SAP Code"
                        getOptionLabel={(e) => (
                            <div className="flex items-center">
                                {e.image && <img src={e.image} alt={e.label} className="w-6 h-6 rounded-full mr-2" />}
                                <span>{e.label}</span>
                            </div>
                        )}
                        components={{ SingleValue: customSingleValue, Option: customOption }}
                        onInputChange={(searchValue, { action }) => {
                            if (action === "input-change") {
                                getSearchData(searchValue); // Direct API call on input change
                            }
                        }}
                        onChange={(selectedOption) => {
                            setFilterState(selectedOption);
                        }}
                    />
                </div>

                <button className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
                    +
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto  mx-2">
                <table className="min-w-full divide-y border divide-gray-200">
                    <thead className="border-b w-max bg-yellow-300">
                        <tr className="font-arial w-max text-gray-700">
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Description</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">UOM</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Qty</th>
                            <th className=" py-2 text-left text-xs font-medium tracking-wider">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Value</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider "></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs">
                        {/* {data?.map((item, idx) => (
                            <tr key={idx} className="border-b">
                             
                                <td className="px-4 py-2 text-left whitespace-nowrap flex items-center gap-2">
                                    <div>
                                        {item.material_code}{" "}
                                        <a href="#" className="text-blue-600 underline">View More</a>
                                        <br />
                                        <span className="text-gray-500">Material Name XXXX</span>
                                    </div>
                                </td>

                             
                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 bg-gray-100 border rounded-md cursor-not-allowed text-gray-600"
                                        value={item.uom}
                                        disabled
                                    />
                                </td>

                               
                                <td className="px-1 py-2 text-left whitespace-nowrap  bg-green-200">
                                    <input
                                        type="number"
                                        className="w-full px-2 py-1 border rounded-md"
                                        placeholder="Enter Qty"
                                    />
                                </td>

                               
                                <td className=" px py-2 text-right whitespace-nowrap">
                                    {item.price}
                                </td>

                             
                                <td className="px-4 py-2 text-left whitespace-nowrap  bg-blue-200">
                                    15000.00
                                </td>
                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <IoIosRemoveCircleOutline className="text-red-400" />
                                </td>
                            </tr>
                        ))} */}


                        <tr className="bg-blue-600 text-white font-bold">

                            <td className="px-4 py-2 text-left" colSpan={2}>
                                Total :  {data.length} ( Items )
                            </td>


                            <td className="px-4 py-2 text-left">   100 </td>


                            <td className="px-4 py-2 text-left">
                                -
                            </td>


                            <td className="px-4 py-2 text-left">
                                12000
                            </td>
                            <td className="px-4 py-2 text-left">
                                -
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* Delivery Address & Special Instructions */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                {/* Header Row */}

                <div className="border border-black rounded-lg">
                    <div className="flex flex-col gap-2">
                        <div className="px-2 border-r border-black">
                            <label className="block font-semibold mb-1">Delivery Address:</label>
                            <span>
                                {dealerData.postal_Address}
                            </span>
                        </div>
                        <div className="px-2">
                            <label className="block font-semibold mb-1">Special Instructions for Orders / Dispatch</label>
                            <textarea className="w-full p-2 border rounded-lg" rows="4" placeholder="Instruction"></textarea>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout for Order Details */}
                <div className=" text-sm">
                    {/* First Row: Territory and Region */}
                    <div className="grid grid-cols-2 gap-6 border border-black p-4 rounded-lg">
                        <div><strong>Territory:</strong> {localStorage.teritory ? localStorage.teritory : "-"}</div>
                        <div><strong>Region:</strong>  {localStorage.region ? localStorage.region : "-"}</div>
                    </div>

                    {/* Second Row: Main Content Box */}
                    <div className="border border-black p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div><strong>Emp Code:</strong> {localStorage.empCode}</div>
                                <div> {localStorage.empName}</div>
                                <div><strong>Order Status:</strong> O Booking</div>
                                <div><strong>Upload Documents:</strong>
                                    <input type="file" className="mt-1 block w-full text-sm text-gray-500" />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-2">
                                <div><strong>Payment Terms:</strong> {dealerData.SAP_Payterm}</div>
                                <div><strong>Inco Terms:</strong> {dealerData.SAP_incoterms}</div>
                                <div><strong>Inco Location:</strong> {dealerData.SAP_incoterms_location}</div>
                                <div><strong>Order Type:</strong>
                                    <select
                                        className="w-12 px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                                        id="citySelect"
                                    >
                                        <option className="focus:outline-none focus:border-b bg-white" value="Shop">Shop</option>
                                        <option value="What up">What up</option>
                                        <option value="Telephonic">Telephonic</option>
                                        <option value="Mails">Mails</option>
                                        <option value="Verbal">Verbal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

                <div className="flex justify-center mt-2">
                    <button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
                        Order Now
                    </button>
                </div>
            </div>
        </div>



    );
};

export default Dashboard;
