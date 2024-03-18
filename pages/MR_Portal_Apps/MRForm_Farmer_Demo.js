import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { url } from "@/constants/url";
import axios, { formToJSON } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
import { FaArrowAltCircleUp } from "react-icons/fa";

const AdditionalInfo = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");

  const currentYear = new Date().getFullYear();
  const nextYears = Array.from(
    { length: 10 },
    (_, index) => currentYear + index
  );

  const [formData, setFormData] = useState({
    purposeDemo: "",
    dealer: "",
    farmerMobile: "",
    farmerId: "",
    farmerName: "",
    farmerFatherName: "",
    village: "",
    farmerType: "",
    plotSize: "",
    potentialFarmer: "",
    nextVisitDate: "",
    status: "Open",
  });
  const [productDemoState, setProductDemoState] = useState({
    crop: "",
    cropName: "",
    stage: "",
    acre: "",
    segment: "",
    productBrand: "",
    water: "",
    dose: "",
  });

  const [productDemoTableData, setProductDemoTableData] = useState([]);

  const [dealerData, setDealerData] = useState([]);
  const [productBrandData, setProductBrandData] = useState([]);
  const [cropData, setCropData] = useState([]);
  const [stageData, setStageData] = useState([]);

  const getDelaerData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dealer`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setDealerData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_product_brand`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      console.log("lkl", apires);
      setProductBrandData(apires);
    } catch (error) {
      console.log(error);
    }
  };
  const getCropInfo = async () => {
    if (new Date())
      try {
        const respond = await axios.get(`${url}/api/get_crop_profile`, {
          headers: headers,
        });
        const apires = await respond.data.data;
        setCropData(apires);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    getCompanyInfo();
    getDelaerData();
    getCropInfo();
  }, []);

  const getProductDemoTable = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_form_demo_crop`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setProductDemoTableData(apires);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddProductDemo = async () => {
    try {
      const data = {
        crop_profile_id: Number(productDemoState.crop),
        crop: "Crop_1",
        stage: productDemoState.stage,
        acre_plot: productDemoState.acre,
        segment: productDemoState.segment,
        product_brand: productDemoState.productBrand,
        dose_acre_tank: Number(productDemoState.dose),
        water_val: Number(productDemoState.water),
      };

      const respond = await axios
        .post(`${url}/api/add_mr_form_demo_crop`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Submitted");
          getProductDemoTable();
        });
    } catch (errors) {
      console.log(errors);
    }
  };

  const getStageInfo = async (cropId) => {
    try {
      const respond = await axios.get(`${url}/api/get_crop_segment`, {
        headers: headers,
        params: { crop_profile_id: cropId },
      });
      const apires = await respond.data.data;
      setStageData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStageInfo(productDemoState.crop);
  }, [productDemoState.crop]);

  const handleAddDemo = async () => {
    try {
      const data = {
        f_demo_id: 1212,
        f_demo_code: 2132,
        demo_date: new Date(),
        demo_time: new Date(),
        dealer_id: Number(formData.dealer),
        purpose_of_demo: formData.purposeDemo,
        d_id: formData.dealer,
        farmer_mob_no: formData.farmerMobile,
        farmer_id: Number(formData.farmerId),
        farmer_name: formData.farmerName,
        farmer_father_name: formData.farmerFatherName,
        village: formData.village,
        farmer_type: formData.farmerType,
        plot_size: formData.plotSize,
        demo_photo_url: "https://source.unsplash.com/user/c_v_r/1900x800",
        field_photo_url: "https://source.unsplash.com/user/c_v_r/1900x800",
        location_lat: 12,
        location_long: 21,
        potential_farmer: formData.potentialFarmer,
        next_visit_date: formData.nextVisitDate,
        status: formData.status,
      };

      const respond = await axios
        .post(`${url}/api/add_mr_form_demo`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Submitted");
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
          });
          setFormData({
            purposeDemo: "",
            dealer: "",
            farmerMobile: "",
            farmerId: "",
            farmerName: "",
            farmerFatherName: "",
            village: "",
            farmerType: "",
            plotSize: "",
            potentialFarmer: "",
            nextVisitDate: "",
            status: "",
          });
          setProductDemoState({
            crop: "",
            cropName: "",
            stage: "",
            acre: "",
            segment: "",
            productBrand: "",
            water: "",
            dose: "",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
  };
  return (
    <form
      className=" bg-white rounded  p-4 w-full  overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <Navbar />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2 flex-row gap-2 mt-12">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F Demo Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="F Demo Code"
            disabled
            // disabled={!formActive}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date & Time of Demo
          </label>

          {/* <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="dd/mm/yyyy"
            disabled={true}
          /> */}
          <DatePicker
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            selected={new Date()}
            peekNextMonth
            showMonthDropdown
            disabled
            showYearDropdown
            dropdownMode="select"
          />
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Purpose of Demo
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={formData.purposeDemo}
            onChange={(e) =>
              setFormData({ ...formData, purposeDemo: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            <option
              value="New One"
              className="focus:outline-none focus:border-b bg-white"
            >
              New One
            </option>
            <option
              value="Odd One"
              className="focus:outline-none focus:border-b bg-white"
            >
              Odd One
            </option>
            <option
              value="Old One"
              className="focus:outline-none focus:border-b bg-white"
            >
              Old One
            </option>
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Dealer
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={formData.dealer}
            onChange={(e) =>
              setFormData({
                ...formData,
                dealer: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            {dealerData?.map((item) => (
              <option
                value={item.d_id}
                className="focus:outline-none focus:border-b bg-white"
              >
                {item.party_Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 flex flex-row"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Mobile No
          </label>
          <div className="flex flex-row ">
            {" "}
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              id="inputField"
              placeholder="Farmer Mobile No"
              value={formData.farmerMobile}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (input.length <= 10) {
                  setFormData({
                    ...formData,
                    farmerMobile: input,
                  });
                }
              }}
            />
            <AiOutlineFileAdd
              size={42}
              className="  self-center size-120 text-black-400 text-blue-400"
            />
          </div>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer ID
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Farmer ID"
            value={formData.farmerId}
            onChange={(e) =>
              setFormData({
                ...formData,
                farmerId: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Name"
            value={formData.farmerName}
            onChange={(e) =>
              setFormData({
                ...formData,
                farmerName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full px-2  mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Father Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Father Name"
            value={formData.farmerFatherName}
            onChange={(e) =>
              setFormData({
                ...formData,
                farmerFatherName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full px-2  mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Village
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Village"
            value={formData.village}
            onChange={(e) =>
              setFormData({
                ...formData,
                village: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Type
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Type"
            value={formData.farmerType}
            onChange={(e) =>
              setFormData({
                ...formData,
                farmerType: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Plot Size
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Plot Size"
            value={formData.plotSize}
            onChange={(e) =>
              setFormData({
                ...formData,
                plotSize: e.target.value,
              })
            }
          />
        </div>
      </div>

      <h1 className="flex justify-start font-bold m-4">Product Demo</h1>

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Crop
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={productDemoState.crop}
            onChange={(e) =>
              setProductDemoState({ ...productDemoState, crop: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {cropData.map((item) => (
              <option key={item.crop_profile_id} value={item.crop_profile_id}>
                {item.crop_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Stage
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={productDemoState.stage}
            onChange={(e) =>
              setProductDemoState({
                ...productDemoState,
                stage: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {stageData.map((item) => (
              <option value={item.crop_stage}>{item.crop_stage}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Acre / Plot Size
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Acre / Plot Size"
            value={productDemoState.acre}
            onChange={(e) => {
              setProductDemoState({
                ...productDemoState,
                acre: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Segment
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={productDemoState.segment}
            onChange={(e) =>
              setProductDemoState({
                ...productDemoState,
                segment: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {stageData.map((item) => (
              <option value={item.crop_segment}>{item.crop_segment}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Product Brand
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={productDemoState.productBrand}
            onChange={(e) =>
              setProductDemoState({
                ...productDemoState,
                productBrand: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>

            {productBrandData.map((item) => (
              <option key={item.brand_code} value={item.brand_code}>
                {item.brand_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Water
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Water"
            value={productDemoState.water}
            onChange={(e) =>
              setProductDemoState({
                ...productDemoState,
                water: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Dose / Acre
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Dose / Acre"
            value={productDemoState.dose}
            onChange={(e) =>
              setProductDemoState({
                ...productDemoState,
                dose: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full px-2 mt-2 flex items-end">
          <button
            onClick={() => {
              handleAddProductDemo();
            }}
            className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
          >
            Add +
          </button>
        </div>
      </div>

      <div className="flex w-full justify-end"></div>
      {/* <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600"></small>Shop & Establishment No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Shop & Establishment No."
            // disabled={!formActive}
          />
        </div>
      </div> */}

      {/* <div className="flex my-2 mb-2 lg:flex-row flex-col items-center  ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
            <span className="flex gap-1">
              {" "}
              <small className="text-red-600"></small> Shop Status : Please Tick
              Mark <BsCheck2Circle className="text-green-500" fontSize={20} />
            </span>
          </label>
        </div>
        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ownedCheckbox"
              className="mr-2"
              //   checked={isOwned}
            />
            <label htmlFor="ownedCheckbox">Owned</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rentedCheckbox"
              className="mr-2"
              //   checked={isRented}
            />
            <label htmlFor="rentedCheckbox">Rented</label>
          </div>
        </div>
      </div> */}

      {/* <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 pt-2"
            htmlFor="inputField"
          >
            <small className="text-red-600"></small> If Owner Required any
            Government approved document
            <h6 className="text-xs font-thin">
              (Electricity/Water Bill in name of Proprietor)
            </h6>
          </label>
        </div>
        <div className="w-full px-2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 pt-2"
            htmlFor="inputField"
          >
            <small className="text-red-600"></small> If Rented Required Rent
            Agreement in name of Proprietor
            <h6 className="text-xs font-thin">
              (Govt. approved documents of the same premises)
            </h6>
          </label>
        </div>
      </div> */}

      {/* new input fields  */}

      {/* <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <small className="text-red-600">* </small>Constitution
        </label>
      </div> */}

      {/* <div className="flex justify-start items-center  w-full my-4">
        <h2 className="font-arial font-normal text-center lg:text-left text-xl py-2 border-dashed  border-t-2 mx-2 w-full border-b-2 border-l-0 border-r-0">
          <small className="text-red-600">* </small>Constitution
        </h2>
      </div> */}

      {/* <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Name of Partner
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Name of Partner"
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Profit Sharing Ratio.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Profit Sharing Ratio"
          />
        </div>
      </div> */}

      {/* <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Relationship
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="resident_individual">Father</option>
            <option value="domestic_company">Mother</option>
            <option value="proprietary_concern">Son</option>
            <option value="partner_firm">Daughter</option>
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Son Of
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Son of"
          />
        </div>
      </div> */}

      {/* <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> PAN No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="PAN No."
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> AADHAR No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="AADHAR No."
          />
        </div>
      </div> */}

      {/* <div className="w-full px-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="inputField"
        >
          <small className="text-red-600">*</small> Address
        </label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          type="text"
          id="inputField"
          placeholder="Address"
          // disabled={!formActive}
        />
      </div> */}

      {/* <div className="my-3 flex items-center justify-end">
        <button
          onClick={() => {
            // deleteHandler("");
          }}
          className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Add +
        </button>
      </div> */}

      {/* tables */}

      <div className="overflow-x-auto my-6 sm:over<flow-hidden w-full  lg:w-full">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Crop
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Field Stage
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Acre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Segment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Product Brand
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Water
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Dose/Acre (kg/lt)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {productDemoTableData?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.crop}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.stage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.dose_acre_tank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.segment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.product_brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.water_val}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.dose_acre_tank}
                </td>
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {
                    <AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>
                  }
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4  my-2 mb-2 flex-col">
        <div className="wrap ">
          <h1 className="flex justify-start font-bold m-4">
            Capture Demo Photo
          </h1>
          <div className=" w-full px-2 profpic relative group bo">
            <Image
              src={""}
              className=" rounded  bg-gray-200"
              alt="img"
              width={300}
              height={200}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput "
              className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer  `}
            >
              <FaCameraRetro
                size={50}
                className="mr-2  self-center size-120 text-black-400"
              />
            </label>
          </div>
        </div>
        <div className="wrap ">
          <h1 className="flex justify-start font-bold m-4">
            Capture Fields Photo
          </h1>
          <div className=" w-full px-2 profpic relative group">
            <Image
              src={""}
              className=" rounded bg-gray-200"
              alt="img"
              width={300}
              height={200}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput "
              className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer  `}
            >
              <FaCameraRetro
                size={50}
                className="mr-2  self-center size-120 text-black-400"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Potential Farmer
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={formData.potentialFarmer}
            onChange={(e) =>
              setFormData({
                ...formData,
                potentialFarmer: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option
              value="Yes"
              className="focus:outline-none focus:border-b bg-white"
            >
              Yes
            </option>
            <option
              value="No"
              className="focus:outline-none focus:border-b bg-white"
            >
              No
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Next Visit Date
          </label>

          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            dateFormat="dd-MM-yyyy"
            selected={
              formData.nextVisitDate ? new Date(formData.nextVisitDate) : ""
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                nextVisitDate: moment(date).format("LL"),
              })
            }
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option
              value="Open"
              className="focus:outline-none focus:border-b bg-white"
            >
              Open
            </option>
            <option
              value="Close"
              className="focus:outline-none focus:border-b bg-white"
            >
              Close
            </option>
          </select>
        </div>
      </div>

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {
            handleAddDemo();
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Submit
        </button>
        <button
          onClick={() => {
            router.push("/MR_Portal_Apps/MRHome");
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Close
        </button>
      </div>
      <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 ">
        <FaArrowAltCircleUp
          size={42}
          className="self-center size-120 text-black-400 text-blue-400 "
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth", // Smooth scrolling animation
            })
          }
        />
      </div>
    </form>
  );
};

export default AdditionalInfo;
