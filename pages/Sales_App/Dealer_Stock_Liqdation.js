import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
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
import { MdOutlineAddCircle } from "react-icons/md";
import { IoNewspaperSharp } from "react-icons/io5";
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
import CropModal from "@/components/Sales_Portal_Apps/CropModal";
import AsyncSelect from 'react-select/async';
import { FcMultipleSmartphones } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";

const Dealer_Stock_Liqdation = () => {
    const customStyles = {
        control: (base) => ({
            ...base,
            fontSize: '0.875rem', // Adjust the font size as needed
        }),
        menu: (base) => ({
            ...base,
            fontSize: '0.875rem',
        }),
        option: (base) => ({
            ...base,
            fontSize: '0.875rem',
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: '0.875rem',
        }),
        singleValue: (base) => ({
            ...base,
            fontSize: '0.875rem',
        }),
    };
    const router = useRouter();
    const loadOptions = async (inputValue) => {
        if (!inputValue) {
            return [];
        }

        const params = {
            c_id: 1,
            bg_id: 1,
            brand_name: inputValue,
        };

        try {
            const response = await axios.get(`${url}/api/get_product_brand`, {
                params,
                headers,
            });

            const apires = response.data.data;

            return apires.map((item) => ({
                value: item.brand_code,
                label: item.brand_name,
                image: item.image_name,
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

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








    const [filterState, setFilterState] = useState("")



    const [dropDownOption, setDropDownOption] = useState([])



    const getSearchData = async (value) => {
        let params
        params = {

            c_id: 1,
            bg_id: 1,
            brand_name: value,
        }
        try {
            const response = await axios.get(`${url}/api/get_product_brand`, {
                params: params,
                headers,
            });

            const apires = response.data.data;

            let options = apires.map((item) => ({
                value: item.brand_code,
                label: item.brand_name,
                image: item.image_name,

            }));

            options.length ? setDropDownOption([...options]) : setDropDownOption([]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setDropDownOption([]);
        }
    };
    useEffect(() => { getSearchData() }, [])



    // Custom Single Option Component (Selected Value)
    const customSingleValue = ({ data }) => (
        <div className="flex items-center">
            {data.image && <img src={data.image} alt={data.label} className="w-6 h-6 rounded-full mr-2" />}
            <span>{data.label} </span>
        </div>
    );

    // Custom Dropdown Option Component
    const customOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="flex items-center px-2 py-2 hover:bg-gray-200 cursor-pointer">
                {data.image && <img src={data.image} alt={data.label} className="w-8 h-8 rounded-md mr-2" />}
                <span> {data.label}</span>
            </div>
        );
    };

    const [showDuplicatePopup, setShowDuplicatePopup] = useState(false)





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
        const transformed = [];
        Object.entries(rowCrops).forEach(([brand_code, crops]) => {
            console.log("zer", crops)

            crops.forEach(crop => {
                const [brandCode, yearMonth] = String(brand_code).split("_");
                console.log("qer", crop)
                transformed.push({
                    cr_id: crop.cr_id,
                    liq_qty: crop.quantity,
                    brand_code: String(brandCode),
                    closing_stock: crop.quantity,
                    kunnr: dealerData.SAP_customerSAPNo,
                    month: moment(`${yearMonth}-01`).format("YYYY-MM-DD"),
                    year: moment(yearMonth, "YYYY-MM").format("YYYY"),
                });
            });
        })
        console.log("pop", transformed)



        try {
            const data = {





                dealerStockinfoData: {
                    dealerstock_type: orderData.orderType,
                    // order_booking: orderData.orderBooking,
                    dealerstock_dt: new Date().toISOString().split("T")[0], // Removes time
                    kunnr_sold: dynamicAddress.SAP_customerSAPNo,
                    kunnr_ship: dynamicAddress.SAP_customerSAPNo,
                    // SAP_sync: "N",
                    cus_po_ref: "Willowood Delight",
                    cus_po_ref_dt: new Date().toISOString().split("T")[0], // Removes time
                    // dealerstock_value:"",
                    del_address: dynamicAddress.postal_Address,
                    pay_terms: dealerData.SAP_Payterm,
                    inco_terms: dealerData.SAP_incoterms,
                    inco_location: dealerData.SAP_incoterms_location,
                    expected_del_date: new Date().toISOString().split("T")[0], // Removes time
                    // ord_status: "Order Draft",
                    // dealerstock_Sub_status:"",
                    dealerstock_booking: orderData.orderBooking,
                    werks: dealerData?.depotResult?.depot_code,
                    t_id: localStorage.tId,
                    r_id: localStorage.rId,
                    z_id: localStorage.zId,
                    bu_id: localStorage.buId,
                    bg_id: localStorage.bgId,
                    c_id: 1,
                    Cuser_id: localStorage.uId,
                    Emp_code: localStorage.empCode,
                    creation_date: new Date().toISOString().split("T")[0], // Removes time
                    m_year: `2025-${selectedMonth.value}-01`,
                    year: "2025"

                },
                dealerStockitemData: gridData.map((item) => {
                    return {
                        brand_code: item.brandValue,
                        closing_stock: item.closingStock,
                        kunnr: dealerData.SAP_customerSAPNo,
                        month: moment(`${item.m_year}-01`).format("YYYY-MM-DD"),
                        year: moment(item.m_year, "YYYY-MM").format("YYYY"),
                        liq_qty: Number(item.openStock) + Number(item.mtd) - Number(item.closingStock),
                        mtd_sales_qty: JSON.stringify(item.mtd)
                    }
                })
                ,
                CropLiquadationData: transformed
                ,
            };

            const response = await axios.post(`${url}/api/createdealerstocks`, JSON.stringify(data), {
                headers: headers,
            });

            if (response && response.data) {
                toast.success("Stock added successfully!");




                setTimeout(() => {
                    router.push({
                        pathname: "/Sales_App/Order_Booking/Delaer_List",
                    });
                }, 3000);
            }
        } catch (errors) {
            ``
            console.log("ert", errors.response?.data?.message)
            toast.error(errors.response?.data?.message);

        }
    };


    const uploadImage = async (res) => {
        console.log("im", res.data.data.order_no);

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
                    order_no: res.data.data.order_no,
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

    const [selectedMonth, setSelectedMonth] = useState(null);
    useEffect(() => {
        if (!modalFilter) return


        gettingDealerDatabyModalFilter(modalFilter);

    }, [modalFilter]);

    // Get current date
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // 0-based in JS, so +1
    const currentYear = today.getFullYear();

    // Define full financial year months
    const allMonths = [
        { label: 'April', value: '04', monthNum: 4, fyShift: 0 },
        { label: 'May', value: '05', monthNum: 5, fyShift: 0 },
        { label: 'June', value: '06', monthNum: 6, fyShift: 0 },
        { label: 'July', value: '07', monthNum: 7, fyShift: 0 },
        { label: 'August', value: '08', monthNum: 8, fyShift: 0 },
        { label: 'September', value: '09', monthNum: 9, fyShift: 0 },
        { label: 'October', value: '10', monthNum: 10, fyShift: 0 },
        { label: 'November', value: '11', monthNum: 11, fyShift: 0 },
        { label: 'December', value: '12', monthNum: 12, fyShift: 0 },
        { label: 'January', value: '01', monthNum: 1, fyShift: 1 },
        { label: 'February', value: '02', monthNum: 2, fyShift: 1 },
        { label: 'March', value: '03', monthNum: 3, fyShift: 1 },
    ];

    // Build options dynamically with disabling logic
    const monthOptions = allMonths.map((month) => {
        const monthYear = currentMonth >= 4
            ? currentYear + month.fyShift
            : currentYear - 1 + month.fyShift;

        const isFuture =
            (monthYear > currentYear) ||
            (monthYear === currentYear && month.monthNum > currentMonth);

        return {
            label: month.label,
            value: month.value,
            isDisabled: isFuture,
        };
    });



    const [gridData, setGridData] = useState([])

    const getGridData = async () => {
        if (!filterState || !filterState.label) {
            alert("Please select a brand.");
            return;
        }

        const brandName = filterState.label;
        const brandValue = filterState.value;

        // Check for duplicate brand
        const isDuplicate = gridData.some(item => item.brandName === brandName);
        if (isDuplicate) {
            alert("This brand has already been added.");
            return;
        }

        try {
            const resp = await axios.get(`${url}/api/get_brand_details`, {
                headers: headers,
                params: {
                    customer_code: router.query.sap_code,
                    brand_code: filterState.value,
                    m_year: moment({ year: 2025, month: selectedMonth.value - 1 }).format('YYYY-MM'),
                    year: 2025
                }
            });

            const respData = resp.data.data;

            // Construct new brand data object
            const newBrandData = {
                brandName: brandName,
                brandValue: brandValue,
                openStock: respData.opening_stock || 0,
                mtd: respData.mtd_and_ytd_sales?.[0]?.sales_value || 0,
                closingStock: 0,
                m_year: moment({ year: 2025, month: selectedMonth.value - 1 }).format('YYYY-MM')
            };

            // Update gridData state
            setGridData(prevData => [...prevData, newBrandData]);


        } catch (error) {
            console.error("Error fetching brand details:", error);
        }
    };


    const handleQtyChange = (index, value) => {
        setGridData(prevData =>
            prevData.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        closingStock: value,
                        liquidation: ((item.qty || 0) * (item.budget_price || 0)).toFixed(2),
                    }
                    : item
            )
        );
    };



    const [allCrop, setAllCrop] = useState([])
    const getCropData = async () => {
        try {
            const respond = await axios.get(`${url}/api/get_crop`, {
                headers: headers,
                params: { c_id: 1 },
            });
            const apires = await respond.data.data;
            setAllCrop(apires)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCropData();
    }, []);
    const [rowCrops, setRowCrops] = useState({}); // key: idx, value: array of crops
    const [currentRowIdx, setCurrentRowIdx] = useState(null);
    const [pogLiquidation, setPogLiquidation] = useState(null);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState('');
    console.log("zzzx", rowCrops)



    const [monthPreData, setMonthPreData] = useState("")
    const monthAPI = async (month) => {
        console.log("qaz", month)
        setSelectedMonth(month)

        try {
            const respond = await axios.get(`${url}/api/get_dealer_stock`, {
                headers: headers,
                params: {
                    customer_code: dynamicAddress.SAP_customerSAPNo,
                    m_year: `2025-${month.value}`,
                    year: 2025,
                    c_id: 1
                },
            });
            const apires = await respond.data.data;

            const isCurrentMonth = month.value === String(new Date().getMonth() + 1).padStart(2, '0');
            if (isCurrentMonth) {
                console.log("zxc", apires)
                // const newBrandData = {
                //     brandName: brandName,
                //     brandValue: brandValue,
                //     openStock: respData.opening_stock || 0,
                //     mtd: respData.mtd_and_ytd_sales?.[0]?.sales_value || 0,
                //     closingStock: 0,
                //     m_year: moment({ year: 2025, month: selectedMonth.value - 1 }).format('YYYY-MM')
                // };

                // Update gridData state
                setGridData(apires[0].dealerstockItems.map((item) => {
                    return {
                        brandName: item.brand_name,
                        brandValue: item.brand_code,
                        openStock: item.opening_stock || 0,
                        mtd: item.mtd_sales_qty
                            || 0,
                        closingStock: item.closing_stock,
                        m_year: moment({ year: 2025, month: selectedMonth.value - 1 }).format('YYYY-MM')
                    }
                }));
                const apiRes = apires[0]; // your API response
                const currentYear = 2025;
                const currentMonth = "05"; // Or dynamically get from new Date()

                const cropsByBrandAndMonth = {};

                apiRes.dealerstockItems.forEach((item) => {
                    const key = `${item.brand_code}_${currentYear}-${currentMonth}`;

                    if (!cropsByBrandAndMonth[key]) {
                        cropsByBrandAndMonth[key] = [];
                    }

                    item.cropsDetails.forEach((crop) => {
                        cropsByBrandAndMonth[key].push({
                            cr_id: crop.cr_id,
                            crop_name: crop.crop_name,
                            quantity: String(crop.liq_qty ?? 0),
                        });
                    });
                });
                console.log("xcc", cropsByBrandAndMonth)
                setRowCrops(cropsByBrandAndMonth);

                setMonthPreData([])
                return
            }
            else {
                setMonthPreData(apires)
            }

        } catch (error) {
            console.log(error);
        }
    }
    console.log("zfgh", rowCrops)

    useEffect(() => {
        if (!dynamicAddress) return
        monthAPI({ label: 'May', value: '05', monthNum: 5, fyShift: 0 })
    }, [dynamicAddress])


    const [showPreCropModal, setShowPreCropModal] = useState(false)
    const [preCropModalData, setPreCropModalData] = useState([])



    console.log("pop", gridData, rowCrops)
    return (

        <div className="bg-gray-200">
            {/* Header Section */}

            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="w-full flex h-12 justify-between items-center px-4 shadow-lg bg-blue-600 lg:flex-col">
                <span className="text-black flex flex-row gap-4 font-bold">
                    <FaArrowLeftLong
                        className="self-center cursor-pointer"
                        onClick={handleNavigation}
                    />
                    <span className="flex flex-row gap-2 justify-center items-center text-white text-xs">  <FcMultipleSmartphones size={32} className="text-indigo-600" /> <span>{dealerData.party_Name}</span></span>
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
                    <span>Stock Information</span>  <span>

                        <Select
                            className="w-full border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b-2 focus:border-indigo-500"
                            options={monthOptions}
                            placeholder="Select"
                            value={selectedMonth}
                            onChange={(option) => {
                                monthAPI(option);
                                setFilterState("");
                                setGridData([]);
                                setPreCropModalData([]);
                            }}
                            isClearable={true}
                            styles={customStyles}
                        />

                    </span>
                </div>

                {/* Billing Details */}
                <div className="text-sm space-y-2">
                    <div className="flex justify-between">

                        <span className="font-bold">{dealerData.SAP_customerSAPNo}</span>
                        <span className="font-bold">  Created Date: {moment().format("DD-MM-YY")}</span>
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
                        {/* <span><HiOutlineExternalLink onClick={() => setShowDuplicatePopup(true)} size={28} className="self-center" /></span> */}
                    </div>
                </div>
            </div>

            {/* <button
                className=" p-2  my-2 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 ml-4"
                onClick={() => setShowDuplicatePopup(true)} // Open modal
            >
                Select Modal
            </button> */}
            <div className="flex space-x-2">
                {/* Month Dropdown */}


                {/* Product Dropdown */}
                <div className="flex w-full space-x-2">
                    <div className="flex-grow">
                        <AsyncSelect
                            className="w-full px-3 py-1.5 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:border-b-2 focus:border-indigo-500"
                            cacheOptions
                            loadOptions={loadOptions}
                            placeholder="Willowood Product"
                            defaultOptions
                            value={filterState}
                            onChange={(selectedOption) => {
                                setFilterState(selectedOption);

                            }}
                            isClearable
                            isSearchable
                            isMulti={false}
                            disabled={monthPreData.length}

                            getOptionLabel={(e) => (
                                <div className="flex items-center">
                                    {e.image && (
                                        <img
                                            src={e.image}
                                            alt={e.label}
                                            className="w-2 h-2 rounded-full mr-2"
                                        />
                                    )}
                                    <span>{e.label}</span>
                                </div>
                            )}
                            components={{ SingleValue: customSingleValue, Option: customOption }}
                            styles={customStyles}
                        />
                    </div>

                    <div className="flex items-center">
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
                            disabled={monthPreData.length}
                            onClick={() => {
                                getGridData()
                                setFilterState("");
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}

            {monthPreData.length ? <div className="overflow-x-auto mx-2">
                <table className="min-w-full divide-y border divide-gray-200">
                    <thead className="border-b w-max bg-yellow-300">
                        <tr className="font-arial w-max text-gray-700">
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Brand Description</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Open Stock</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">MTD Sale</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Close STK</th>

                            <th className="px-4 py-2 text-center text-xs font-medium tracking-wider">POG Qty</th>
                            <th className="px-4 py-2 text-center text-xs font-medium tracking-wider">Crop Total</th>
                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Action</th>


                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 text-xs">
                        {monthPreData[0]?.dealerstockItems?.map((item, idx) => {


                            return (
                                <tr key={idx} className="border-b">
                                    {/* Existing columns */}
                                    <td className="px-2 py-2 text-left text-black-400 whitespace-nowrap flex items-center gap-2">
                                        <div>
                                            <span className="">{item.brand_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <span className="">{item.opening_stock}</span>
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <span className="">{item.mtd_ytd_sales}</span>
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <input
                                            type="number"
                                            className="w-28 px-2 py-1 border rounded-md"
                                            placeholder="Closing Stock"
                                            disabled
                                            value={item.closing_stock}

                                        />
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">{item.liq_qty}</td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        {item.cropsDetails.reduce((sum, item) => sum + (item.liq_qty || 0), 0)}
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap"> <button
                                        className="w-5 h-5 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
                                        onClick={() => {
                                            setPreCropModalData(item.cropsDetails.map(crop => ({
                                                ...crop,
                                                pog_qty: item.liq_qty, // overwrite or add `liq_qty` as an empty string
                                            })))
                                            setShowPreCropModal(true)
                                        }}
                                    >
                                        +
                                    </button></td>


                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> :
                <div className="overflow-x-auto mx-2">
                    <table className="min-w-full divide-y border divide-gray-200">
                        <thead className="border-b w-max bg-yellow-300">
                            <tr className="font-arial w-max text-gray-700">
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Brand Description</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Open Stock</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">MTD Sale</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Close STK</th>

                                <th className="px-4 py-2 text-center  text-xs font-medium tracking-wider">POG Qty</th>
                                <th className="px-4 py-2 text-center text-xs font-medium tracking-wider">Crop Total</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider">Action</th>


                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200 text-xs">
                            {gridData?.map((item, idx) => {

                                const openStock = Number(item.openStock) || 0;
                                const mtdSale = Number(item.mtd) || 0;
                                const closingStock = Number(item.closingStock) || 0;
                                const liquidation = openStock + mtdSale - closingStock;

                                return (
                                    <tr key={idx} className="border-b">
                                        {/* Existing columns */}
                                        <td className="px-2 py-2 text-left text-black-400 whitespace-nowrap flex items-center gap-2">
                                            <div>


                                                <span className="">{item.brandName}</span>

                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-right whitespace-nowrap">
                                            <span className="">{item.openStock}</span>
                                        </td>
                                        <td className="px-4 py-2 text-right whitespace-nowrap">
                                            <span className="">{item.mtd}</span>
                                        </td>
                                        <td className="px-4 py-2 text-right whitespace-nowrap">
                                            <input
                                                type="number"
                                                className="w-14 px-2 py-1 border rounded-md"
                                                placeholder="Closing Stock"
                                                disabled={rowCrops[`${item.brandValue}_${2025}-${selectedMonth.value}`]?.reduce((sum, crop) => sum + Number(crop.quantity || 0), 0) === liquidation}
                                                value={item.closingStock || ""}
                                                onChange={(e) => handleQtyChange(idx, e.target.value)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-right whitespace-nowrap"> {Math.max(0, liquidation)}</td>

                                        <td className="px-4 py-2 text-right whitespace-nowrap">
                                            {
                                                rowCrops[`${item.brandValue}_${2025}-${selectedMonth.value}`]?.reduce((sum, crop) => sum + Number(crop.quantity || 0), 0)
                                            }
                                        </td>

                                        <td className="px-4 py-2 text-right whitespace-nowrap flex flex-row gap-2">

                                            <span>
                                                <IoNewspaperSharp
                                                    className="text-blue-400 cursor-pointer"
                                                    size={20}
                                                    onClick={() => {
                                                        if (Math.max(0, liquidation) === 0) {
                                                            window.alert("POG Qty can not be 0")
                                                            return
                                                        }
                                                        else {
                                                            setCurrentRowIdx(`${item.brandValue}_${2025}-${selectedMonth.value}`);
                                                            setIsCropModalOpen(true);
                                                            setSelectedCrop('');
                                                            setPogLiquidation(liquidation.toFixed(2));

                                                        }

                                                    }}
                                                />
                                            </span>
                                            <span>
                                                <FaTrash
                                                    className="text-red-400 cursor-pointer"
                                                    size={20}
                                                    onClick={() => {
                                                        setGridData(gridData.filter((_, i) => i !== idx))
                                                        setRowCrops({})
                                                    }}
                                                />
                                            </span>

                                        </td>


                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}



            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                {/* Header Row */}

                <div className="border border-black rounded-lg">
                    <div className="flex flex-col gap-2">
                        {/* <div className="px-2 border-r border-black">
                            <div className="w-full flex justify-between"> <label className="block font-semibold mb-1">Delivery Address:</label>      <button
                                type="button"
                                className="block text-sm font-bold text-indigo-600 hover:underline font-italic hyperlink mb-1"

                            >

                            </button></div>
                            <span className="font-bold text-sm">{dynamicAddress.SAP_customerSAPNo}</span>
                            <br />
                            <div className="flex justify-between text-sm">
                                <span><strong>{dynamicAddress.party_Name}</strong></span>
                            </div>

                            <span className="text-sm">
                                {dynamicAddress.postal_Address}
                            </span>
                        </div> */}
                        <div className="px-2">
                            <label className="block font-semibold mb-1">Special Instructions for Stock Updation</label>
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
                        <div><strong>Territory:</strong> <br />{localStorage.teritory ? localStorage.teritory : "-"}</div>
                        <div><strong>Region:</strong>  <br /> {localStorage.region ? localStorage.region : "-"}</div>
                    </div>

                    {/* Second Row: Main Content Box */}
                    <div className="border border-black p-4 rounded-lg">
                        <div className="flex flex-row w-full justify-between">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div><strong>Emp Code:</strong>
                                    <br /> {localStorage.empCode}</div>
                                <div> {localStorage.empName}</div>





                            </div>

                            {/* Right Column */}

                            <div className="space-y-2">
                                <div><strong> Status:</strong>
                                    <br /> Stock Draft</div>
                                <div><strong>Stock Updation:</strong>
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


                        </div>
                    </div>



                </div>

                <div className="flex justify-center mt-2">
                    <button
                        className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
                        onClick={handleOrderClick}
                        disabled={monthPreData.length}
                    >
                        Stcok Update
                    </button>
                </div>
                {showConfirmPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <p className="text-black font-bold mb-4">Do you want to submit the Stock?</p>
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

                {showConfirmModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <p className="text-black font-bold mb-4">
                                Do you want to discard the Stock Updation?
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
            {console.log("zxs", preCropModalData)}
            <Transition appear show={showPreCropModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowPreCropModal(false)}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Crop and Liquidation Quantity
                                    </Dialog.Title>

                                    {/* Crop Select and Add Button */}

                                    <div className="mt-4 text-right text-sm text-gray-700">
                                        <strong>POG Quantity:</strong>{" "}
                                        {
                                            preCropModalData[0]?.pog_qty
                                        }
                                    </div>
                                    {/* Crop List Table */}
                                    <table className="min-w-full mt-4 divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Crop</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Liquidation Qty</th>

                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 text-xs">
                                            {preCropModalData.map((crop, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-2">
                                                        {crop.crop_name}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {crop.liq_qty}
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Total */}
                                    <div className="mt-4 text-right text-sm text-gray-700">
                                        <strong>Total Quantity:</strong>{" "}
                                        {
                                            preCropModalData.reduce((sum, item) => sum + (item.liq_qty || 0), 0)
                                        }
                                    </div>

                                    {/* Close Button */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => setShowPreCropModal(false)}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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
            <CropModal
                isCropModalOpen={isCropModalOpen}
                setIsCropModalOpen={setIsCropModalOpen}
                selectedCrop={selectedCrop}
                setSelectedCrop={setSelectedCrop}
                allCrop={allCrop}
                rowCrops={rowCrops}
                setRowCrops={setRowCrops}
                currentRowIdx={currentRowIdx}
                pogLiquidation={pogLiquidation}
            />
        </div>



    );
};

export default Dealer_Stock_Liqdation;
