import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/Sales_Portal_Apps/Layout";
import { IoIosBasket } from "react-icons/io";

import { CiBookmark } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi"
import { IoOpenOutline } from "react-icons/io5";
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
import grid from "@/pages/table/table_user_profile";
import toast, { Toaster } from "react-hot-toast";

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


    const [showConfirmModal, setShowConfirmModal] = useState(false);


    const handleNavigation = () => {
        if (gridData.length > 0) {
            setShowConfirmModal(true); // Show confirmation modal if gridData has items
        } else {
            router.push({
                pathname: "/Sales_App/Order_Booking/Delaer_List",
            });
        }
    };

    const confirmNavigation = () => {
        setShowConfirmModal(false);
        router.push({
            pathname: "/Sales_App/Order_Booking/Delaer_List",
        });
    };

    useEffect(() => {


        const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

        switch (roleId) {
            case 6:


                setLocalStorage({
                    teritory: JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
                    region: JSON.parse(window.localStorage.getItem("userinfo")).region_name,
                    empCode: window.localStorage.getItem("emp_code"),
                    empName: window.localStorage.getItem("user_name"),
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                    uId: JSON.parse(window.localStorage.getItem("uid")),
                });
                break;
            case 5:


                setLocalStorage({
                    teritory: JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
                    region: JSON.parse(window.localStorage.getItem("userinfo")).region_name,
                    empCode: window.localStorage.getItem("emp_code"),
                    empName: window.localStorage.getItem("user_name"),
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                    uId: JSON.parse(window.localStorage.getItem("uid")),
                });
                break;
            case 4:


                setLocalStorage({
                    teritory: JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
                    region: JSON.parse(window.localStorage.getItem("userinfo")).region_name,
                    empCode: window.localStorage.getItem("emp_code"),
                    empName: window.localStorage.getItem("user_name"),
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                    uId: JSON.parse(window.localStorage.getItem("uid")),
                });
                break;
            case 3:


                setLocalStorage({
                    teritory: JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
                    region: JSON.parse(window.localStorage.getItem("userinfo")).region_name,
                    empCode: window.localStorage.getItem("emp_code"),
                    empName: window.localStorage.getItem("user_name"),
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bu_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                    uId: JSON.parse(window.localStorage.getItem("uid")),
                });
                break;
            case 10:

                setLocalStorage({
                    teritory: JSON.parse(window.localStorage.getItem("userinfo")).territory_name,
                    region: JSON.parse(window.localStorage.getItem("userinfo")).region_name,
                    empCode: window.localStorage.getItem("emp_code"),
                    empName: window.localStorage.getItem("user_name"),
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: null,
                    rId: null,
                    zId: null,
                    tId: null,
                    uId: JSON.parse(window.localStorage.getItem("uid")),
                });
                break;
            default:


                setLocalStorage({
                    teritory: JSON.parse(window.localStorage.getItem("userinfo"))?.territory_name,
                    region: JSON.parse(window.localStorage.getItem("userinfo"))?.region_name,
                    empCode: window.localStorage.getItem("emp_code"),
                    empName: window.localStorage.getItem("user_name"),
                    bgId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    buId: JSON.parse(window.localStorage.getItem("userinfo"))?.bg_id,
                    rId: JSON.parse(window.localStorage.getItem("userinfo"))?.r_id,
                    zId: JSON.parse(window.localStorage.getItem("userinfo"))?.z_id,
                    tId: JSON.parse(window.localStorage.getItem("userinfo"))?.t_id,
                    uId: JSON.parse(window.localStorage.getItem("uid")),
                });
                break;
        }
    }, []);


    const [dealerData, setDealerData] = useState([])

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







    const [searchBy, setSearchBy] = useState("Name")
    const [filterState, setFilterState] = useState("")
    const [gridData, setGridData] = useState([])
    const [searchText, setSearchText] = useState(""); // New state for input text

    const [dropDownOption, setDropDownOption] = useState([])



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
            case "pack_size":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    pack_size: value,
                }
                break;
            case "Dealer":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    customer_code: value,
                }
                break;
            case "Segment":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    segment: value,
                }
                break;
            case "technical_name":
                params = {
                    search: true,
                    c_id: 1,
                    bg_id: 1,
                    technical_name: value,
                }
                break;
            case "material_code":
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

            let options = apires.map((item) => ({
                value: item.mat_name,
                label: item.mat_name,
                image: item.product_banner, // Assuming this is the image URL
                ...item
            }));

            options.length ? setDropDownOption([...options]) : setDropDownOption([]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setDropDownOption([]);
        }
    };

    console.log("xcop", dropDownOption)


    // Custom Single Option Component (Selected Value)
    const customSingleValue = ({ data }) => (
        <div className="flex items-center">
            {data.image && <img src={data.image} alt={data.label} className="w-6 h-6 rounded-full mr-2" />}
            <span>({data.matnr}) {data.label} </span>
        </div>
    );

    // Custom Dropdown Option Component
    const customOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="flex items-center px-2 py-2 hover:bg-gray-200 cursor-pointer">
                {data.image && <img src={data.image} alt={data.label} className="w-8 h-8 rounded-md mr-2" />}
                <span>({data.matnr}) {data.label}</span>
            </div>
        );
    };
    const [showPopup, setShowPopup] = useState(false)
    const [showDuplicatePopup, setShowDuplicatePopup] = useState(false)

    const handleQtyChange = (idx, value) => {
        const updatedData = [...gridData];
        updatedData[idx] = {
            ...updatedData[idx],
            qty: Number(value) || 0,  // Ensure qty is a number
        };
        setGridData(updatedData);
    };

    const totalQty = gridData.reduce((sum, item) => sum + (item.qty || 0), 0);
    const totalPrice = gridData.reduce((sum, item) => sum + (item.budget_price || 0), 0);
    const totalValue = gridData.reduce((sum, item) => sum + ((item.qty || 0) * (item.budget_price || 0)), 0);



    const [showConfirmPopup, setShowConfirmPopup] = useState(false);


    const handleOrderClick = () => {
        setShowConfirmPopup(true);
    };



    const handleCancel = () => {
        setShowConfirmPopup(false);
    };



    const [orderData, setOrderData] = useState({
        orderType: "ZDOR",
        specialIns: "",
        orderBooking: "Shop"
    })

    const [uploadDocument, setUploadDocument] = useState("")
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            setUploadDocument(file); // Update state with the file object
        }
    };



    const handleConfirm = async () => {
        setShowConfirmPopup(false);

        try {
            const data = {
                order_type: orderData.orderType,
                order_booking: orderData.orderBooking,
                order_dt: new Date().toISOString().split("T")[0], // Removes time
                kunnr_sold: dynamicAddress.SAP_customerSAPNo,
                kunnr_ship: dynamicAddress.SAP_customerSAPNo,
                SAP_sync: "N",
                cus_po_ref: "Willowood Delight",
                cus_po_ref_dt: new Date().toISOString().split("T")[0], // Removes time
                del_address: dynamicAddress.postal_Address,
                pay_terms: dealerData.SAP_Payterm,
                inco_terms: dealerData.SAP_incoterms,
                inco_location: dealerData.SAP_incoterms_location,
                expected_del_date: new Date().toISOString().split("T")[0], // Removes time
                ord_status: "Order Draft",
                werks: dealerData?.depotResult?.depot_code,
                t_id: localStorage.tId,
                r_id: localStorage.rId,
                z_id: localStorage.zId,
                bu_id: localStorage.buId,
                bg_id: localStorage.bgId,
                c_id: 1,
                order_item: gridData.map((item) => ({
                    matnr: item.matnr,
                    uom: item.uom,
                    qty: item.qty,
                    price: item.budget_price,
                    net_value: item.budget_price * item.qty,
                })),
                Emp_code: localStorage.empCode,
                creation_date: new Date().toISOString().split("T")[0], // Removes time
                Cuser_id: localStorage.uId,
            };

            const response = await axios.post(`${url}/api/add_order_info`, JSON.stringify(data), {
                headers: headers,
            });

            if (response && response.data) {
                toast.success("Order added successfully!");
                uploadImage(response)


                setTimeout(() => {
                    router.push({
                        pathname: "/Sales_App/Order_Booking/Delaer_List",
                    });
                }, 3000);
            }
        } catch (errors) {
            console.log("zas", errors.response.data.message)
            let err = errors.response.data.message
            toast.error(err);

        }
    };

    const uploadImage = async (res) => {
        console.log("im", res.data.data.order_id);

        if (!uploadDocument) {
            toast.error("No file selected");
            return;
        }

        try {
            const renamedBlob = new Blob([uploadDocument], {
                type: uploadDocument.type,
            });

            const fd = new FormData();
            fd.append("myFile", renamedBlob, uploadDocument.name); // Use uploadDocument instead

            const response = await axios.post(`${url}/api/upload_file`, fd, {
                params: {
                    order_no: res.data.data.order_id,
                    file_path: "order_info"
                },
            });

            if (response && response.data) {
                toast.success("File uploaded successfully!");
                setUploadDocument(null); // Clear uploaded file state
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("File upload failed");
        }
    };

    const [showModal, setShowModal] = useState(false);

    // Open the modal when the "Change Address" hyperlink is clicked
    const openModal = () => {
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedDealer(null)
    };

    const [dynamicAddress, setDynamicAddress] = useState([])
    const gettingDynamicDelaer = async (sapCode) => {
        try {
            const resp = await axios.get(`${url}/api/get_dealer`, {
                headers: headers,
                params: { customer_code: sapCode },
            });
            const respData = await resp.data.data;
            setDynamicAddress(respData);
        } catch (error) {
            console.log(error);
            setDynamicAddress([]);
        }
    };
    console.log("dynamic", dynamicAddress)
    useEffect(() => {
        if (!router.query.sap_code) return
        gettingDynamicDelaer(router.query.sap_code)
    }, [router.query.sap_code])

    const [allDelaerList, setAllDealerList] = useState([])

    const gettingAllDealerData = async () => {
        const { bgId, buId, rId, zId, tId, partyName } = localStorage

        try {
            const resp = await axios.get(`${url}/api/get_dealer`, {
                headers: headers,
                params: {
                    c_id: 1,
                    bg_id: bgId || null,
                    bu_id: buId || null,
                    r_id: rId || null,
                    z_id: zId || null,
                    t_id: tId || null,
                    party_name: partyName || null,
                    bst_new: true,

                }
            });
            const respData = await resp.data.data.dealerData;
            setAllDealerList(respData);
        } catch (error) {
            console.log(error);
            setAllDealerList([]);
        }
    };


    useEffect(() => {


        gettingAllDealerData();

    }, [localStorage]);

    const [selectedDealer, setSelectedDealer] = useState(null);

    const handleSelect = (sapNo) => {
        setSelectedDealer((prev) => (prev === sapNo ? null : sapNo)); // toggle selection
    };

    useEffect(() => {
        if (!selectedDealer) return
        gettingDynamicDelaer(selectedDealer)
    }, [
        selectedDealer
    ])
    const [modalFilter, setModalFilter] = useState("")

    const gettingDealerDatabyModalFilter = async (partyName) => {
        const { bgId, buId, rId, zId, tId, } = localStorage

        try {
            const resp = await axios.get(`${url}/api/get_dealer`, {
                headers: headers,
                params: {
                    c_id: 1,
                    bg_id: bgId || null,
                    bu_id: buId || null,
                    r_id: rId || null,
                    z_id: zId || null,
                    t_id: tId || null,
                    party_name: partyName || null,
                    bst_new: true,

                }
            });
            const respData = await resp.data.data.dealerData;
            setAllDealerList(respData);
        } catch (error) {
            console.log("nju", error);
            setAllDealerList([]);
        }
    };


    useEffect(() => {
        if (!modalFilter) return


        gettingDealerDatabyModalFilter(modalFilter);

    }, [modalFilter]);
    return (

        <div className="bg-gray-200">
            {/* Header Section */}

            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-400 lg:flex-col">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={handleNavigation}
                    />
                    <span className="flex flex-row gap-2 justify-center items-center">  <FcNews size={32} className="text-indigo-600" /> <span>{dealerData.party_Name}</span></span>
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

                    <div className="flex flex-row gap-2 font-bold">
                        <span><strong>Depot Code:</strong> {dealerData?.depotResult?.depot_code}</span>
                        <span>Warehouse Des {dealerData?.depotResult?.depot_name}</span>
                        <span><HiOutlineExternalLink onClick={() => setShowDuplicatePopup(true)} size={28} className="self-center" /></span>
                    </div>
                </div>
            </div>

            {/* <button
                className=" p-2  my-2 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 ml-4"
                onClick={() => setShowDuplicatePopup(true)} // Open modal
            >
                Select Modal
            </button> */}
            <div className="flex justify-center mx-2 items-center">
                <div className="relative w-full">
                    <Select
                        className="w-full px-3 py-1.5 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b-2 focus:border-indigo-500"
                        value={filterState || (searchText ? { label: searchText, value: searchText } : null)}
                        isSearchable={true}
                        isMulti={false}
                        options={dropDownOption}
                        placeholder="Willowood Product"
                        getOptionLabel={(e) => (
                            <div className="flex items-center">
                                {e.image && <img src={e.image} alt={e.label} className="w-6 h-6 rounded-full mr-2" />}
                                <span>{e.label}</span>
                            </div>
                        )}
                        isClearable={true}
                        components={{ SingleValue: customSingleValue, Option: customOption }}
                        onInputChange={(searchValue, { action }) => {
                            if (action === "input-change") {
                                setSearchText(searchValue); // Update search text state
                                getSearchData(searchValue); // Fetch API data
                            }
                        }}
                        onChange={(selectedOption) => {
                            setFilterState(selectedOption);
                            setSearchText(""); // Clear input after selection
                        }}
                    />
                </div>

                {/* Add Material Button */}
                <button
                    className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
                    onClick={() => {
                        if (!filterState) return; // Prevent adding empty selection

                        const isDuplicate = gridData.some((item) => item.mat_id === filterState.mat_id);

                        if (isDuplicate) {
                            setShowPopup(true); // Show pop-up message for duplicate
                            setTimeout(() => setShowPopup(false), 2000); // Auto-hide after 2 seconds
                        } else {
                            setGridData([...gridData, filterState]); // Add new material
                            setFilterState(""); // Reset dropdown
                        }
                    }}
                >
                    +
                </button>

                {/* Open Modal Button */}

            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mx-2">
                <table className="min-w-full divide-y border divide-gray-200">
                    <thead className="border-b w-max bg-yellow-300">
                        <tr className="font-arial w-max text-gray-700">
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Description</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">UOM</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Qty</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Value</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs">
                        {gridData?.map((item, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="px-2 py-2 text-left text-black-400 whitespace-nowrap flex items-center gap-2">
                                    <div>
                                        {item.mat_}{" "}


                                        <span className="">{item.matnr}</span>
                                        <br />
                                        <span className="">{item.mat_name}</span>
                                        <br />

                                    </div>
                                </td>
                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <span className="px-2 py-1 bg-gray-100 border rounded-md text-gray-600">{item.uom}</span>
                                </td>
                                <td className="px-1 py-2 text-left whitespace-nowrap bg-green-200">
                                    <input
                                        type="number"
                                        className="w-full px-2 py-1 border rounded-md"
                                        placeholder="Enter Qty"
                                        value={item.qty || ""}
                                        onChange={(e) => handleQtyChange(idx, e.target.value)}
                                    />
                                </td>
                                <td className="px-4 py-2 text-left whitespace-nowrap">{item.budget_price}</td>
                                <td className="px-4 py-2 text-left whitespace-nowrap bg-blue-200">
                                    {((item.qty || 0) * (item.budget_price || 0)).toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-left whitespace-nowrap">
                                    <IoIosRemoveCircleOutline
                                        className="text-red-400 cursor-pointer"
                                        onClick={() => setGridData(gridData.filter((_, i) => i !== idx))}
                                    />
                                </td>
                            </tr>
                        ))}

                        {/* Total Row */}
                        <tr className="bg-blue-600 text-white font-bold">
                            <td className="px-4 py-2 text-left" colSpan={2}>Total: {gridData?.length} (Items)</td>
                            <td className="px-4 py-2 text-left">{totalQty}</td>
                            <td className="px-4 py-2 text-left">-</td>
                            <td className="px-4 py-2 text-left">{totalValue.toFixed(2)}</td>
                            <td className="px-4 py-2 text-left">-</td>
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
                            <div className="w-full flex justify-between"> <label className="block font-semibold mb-1">Delivery Address:</label>      <button
                                type="button"
                                className="block text-sm font-bold text-indigo-600 hover:underline font-italic hyperlink mb-1"
                                onClick={openModal}
                            >
                                Change Address
                            </button></div>
                            <span className="font-bold text-sm">{dynamicAddress.SAP_customerSAPNo}</span>
                            <br />
                            <div className="flex justify-between text-sm">
                                <span><strong>{dynamicAddress.party_Name}</strong></span>
                            </div>

                            <span className="text-sm">
                                {dynamicAddress.postal_Address}
                            </span>
                        </div>
                        <div className="px-2">
                            <label className="block font-semibold mb-1">Special Instructions for Orders / Dispatch</label>
                            <textarea className="w-full p-2 border rounded-lg" rows="4" placeholder="Instruction"
                                value={orderData.specialIns}
                                onChange={(e) => setOrderData({ ...orderData, specialIns: e.target.value })}></textarea>
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
                        <div className="flex flex-row w-full justify-between">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div><strong>Emp Code:</strong>
                                    <br /> {localStorage.empCode}</div>
                                <div> {localStorage.empName}</div>
                                <div><strong>Order Status:</strong>
                                    <br /> Order Draft</div>
                                <div><strong>Upload Documents:</strong>
                                    <input
                                        type="file"
                                        className="mt-1 block w-full text-sm text-gray-500"
                                        accept=".pdf, .jpg, .jpeg, .png, .gif, .doc, .docx, .xls, .xlsx, .txt"
                                        onChange={handleFileChange}
                                    />


                                </div>
                                <div><strong>Order Booking:</strong>
                                    <br />
                                    <select
                                        className="px-3 py-2 border-b border-gray-500 rounded-md bg-white text-xs focus:outline-none focus:border-b focus:border-indigo-500"
                                        id="citySelect"
                                        value={orderData.orderBooking}
                                        onChange={(e) => setOrderData({ ...orderData, orderBooking: e.target.value })}
                                    >
                                        <option className="focus:outline-none focus:border-b bg-white" value="Shop">Shop</option>
                                        <option value="What up">What up</option>
                                        <option value="Telephonic">Telephonic</option>
                                        <option value="Mails">Mails</option>
                                        <option value="Verbal">Verbal</option>
                                    </select>
                                </div>


                            </div>

                            {/* Right Column */}

                            <div className="space-y-2">
                                <div><strong>Pay Terms:</strong>
                                    <br /> {dealerData.SAP_Payterm}</div>
                                <div><strong>Inco Terms:</strong>
                                    <br /> {dealerData.SAP_incoterms}</div>
                                <div><strong>Inco Loc:</strong>
                                    <br />{dealerData.SAP_incoterms_location}</div>
                                <div><strong>Order Type:</strong>
                                    <br /> <select
                                        className="px-3 py-2 border-b border-gray-500 rounded-md bg-white text-xs focus:outline-none focus:border-b focus:border-indigo-500"
                                        id="citySelect"
                                        value={orderData.orderType}
                                        onChange={(e) => setOrderData({ ...orderData, orderType: e.target.value })}

                                    >
                                        <option className="focus:outline-none focus:border-b bg-white" value="ZDOR">ZDOR</option>

                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>

                <div className="flex justify-center mt-2">
                    <button
                        className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
                        onClick={handleOrderClick}
                    >
                        Order Now
                    </button>
                </div>
                {showConfirmPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <p className="text-black font-bold mb-4">Do you want to submit the order?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    onClick={handleConfirm}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    onClick={handleCancel}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow-lg">
                            <p className="text-red-600 font-bold">Material already exists in current order!</p>
                        </div>
                    </div>
                )}

                {showConfirmModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <p className="text-black font-bold mb-4">
                                Do you want to discard the booking?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    onClick={confirmNavigation}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDuplicatePopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center w-full sm:w-96 relative">
                            {/* Close button */}
                            <button
                                className="absolute top-2 right-2 text-black font-bold text-xl"
                                onClick={() => setShowDuplicatePopup(false)} // Close the modal when clicked
                            >
                                &times;
                            </button>

                            <p className="text-black font-bold mb-4">Please Select</p>

                            {/* Select dropdown inside the duplicate modal */}
                            <div className="relative w-full mb-4">
                                <select
                                    className="w-36 px-3 py-2 border-b border-gray-500 bg-white focus:outline-none focus:border-indigo-500"
                                    id="citySelect"
                                    value={searchBy}
                                    onChange={(e) => {
                                        const selectedValue = e.target.value.trim();
                                        setDropDownOption([]); // Clear options if necessary
                                        setSearchBy(selectedValue);
                                    }}
                                >
                                    <option value="Name">Name</option>
                                    <option value="Category">Category</option>
                                    <option value="Brand">Brand</option>
                                    <option value="pack_size">Pack Size</option>
                                    <option value="Dealer">Dealer</option>
                                    <option value="Segment">Segment</option>
                                    <option value="technical_name">Technical Name</option>
                                    <option value="material_code">Material Code</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-full h-full md:w-3/4 md:h-3/4 rounded-lg p-6 overflow-auto">
                            <button
                                className="absolute top-4 right-4 text-black text-xl font-bold"
                                onClick={closeModal}
                            >
                                X
                            </button>
                            <div className="flex justify-center mt-4">
                                <div className="relative w-3/4">
                                    <input
                                        className="w-full px-10 py-1.5 border border-gray-400 rounded-lg bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                                        id="stateSelect"
                                        placeholder="Search"
                                        value={modalFilter}
                                        onChange={(e) => setModalFilter(e.target.value)}
                                    />
                                    <svg
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 12.65z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Add your address form or content here */}



                                {allDelaerList?.map((item) => {
                                    const isSelected = selectedDealer === item.SAP_customerSAPNo;
                                    return (
                                        <div
                                            key={item.SAP_customerSAPNo}
                                            className="flex m-2 flex-col gap-3 text-sm bg-white shadow-lg rounded-md p-5"
                                        >
                                            <div className="w-full flex justify-between">
                                                <span className="font-bold text-base text-black">
                                                    {item.SAP_customerSAPNo}
                                                </span>

                                            </div>

                                            <span className="font-semibold text-gray-700">{item.party_Name}</span>

                                            <div className="inline-flex flex-wrap gap-2">
                                                <span className="font-semibold text-black whitespace-nowrap">Address:</span>
                                                <span className="text-gray-500 flex-1 min-w-0 break-words">{item.postal_Address}</span>
                                            </div>

                                            <div className="flex flex-row gap-4">
                                                <div className="flex flex-row gap-2">
                                                    <span className="font-semibold text-black">City:</span>
                                                    <span className="text-gray-500">{item.city}</span>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <span className="font-semibold text-black">Postal:</span>
                                                    <span className="text-gray-500">{item.pincode}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-row gap-2">
                                                <span className="font-semibold text-black">Phone:</span>
                                                <span className="text-gray-500">{item.pmobile}</span>
                                            </div>


                                            <button
                                                onClick={() => {
                                                    handleSelect(item.SAP_customerSAPNo)
                                                    setShowModal(false);

                                                }}
                                                className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${isSelected ? 'bg-green-600' : 'bg-blue-600'}`}
                                            >
                                                {isSelected ? 'Selected' : 'Select'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>



    );
};

export default Dashboard;
