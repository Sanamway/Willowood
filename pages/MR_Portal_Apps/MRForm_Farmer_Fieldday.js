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
    farmerNumber: "",
    farmerObservation: "",
    productRating: "",
    remarks: "",
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
  const [followTableData, setFollowTableData] = useState([]);
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
    getProductDemoTable();
    getFollowDemoTable();
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

  const getFollowDemoTable = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_farmer_demo_followup`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setFollowTableData(apires);
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
        f_demo_field_no: 1212,
        demo_field_date: new Date(),
        demo_field_time: new Date(),
        dealer_id: Number(formData.dealer),

        d_id: Number(formData.dealer),
        farmer_mob_no: Number(formData.farmerMobile),
        farmer_id: Number(1212),
        farmer_name: formData.farmerName,
        farmer_father_name: formData.farmerFatherName,
        village: formData.village,
        farmer_type: formData.farmerType,

        plot_size: formData.plotSize,
        field_day_image_Url: "https://source.unsplash.com/user/c_v_r/1900x800",
        farmer_available_in_field_day: formData.farmerNumber,
        location_lat: 12,
        location_long: 21,
        potential_farmer: formData.potentialFarmer,
        field_day_remarks: formData.remarks,

        next_visit_date: formData.nextVisitDate,
        status: formData.status,
      };

      const respond = await axios
        .post(`${url}/api/add_farmer_demo_fields`, JSON.stringify(data), {
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
            farmerObservation: "",
            productRating: "",
            remarks: "",
            potentialFarmer: "",
            nextVisitDate: "",
            status: "Open",
          });
          setProductDemoTableData([]);
          setFollowTableData([]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      className=" bg-white rounded  p-4 w-full  overflow-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <Navbar />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2 flex-row gap-1 mt-12">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F. Field Code
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
            <small className="text-red-600">*</small> Field Date
          </label>

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
      <div className="overflow-x-auto my-6 sm:overflow-hidden w-full  lg:w-full">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="flex justify-start font-bold m-4">Follow Up</h1>
      <div className="overflow-x-auto my-6 sm:overflow-hidden w-full  lg:w-full">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Sr. No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider overflow-wrap"
              >
                Farmer Observation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Product Rating
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Follow up Remarks
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider  overflow-wrap"
              >
                Next Re-Visit Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {followTableData?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.demo_followup_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.farmer_observation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.product_rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.follow_up_remarks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.next_followup_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full px-2 mt-2 flex flex-row gap-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 flex flex-row self-center"
          htmlFor="inputField"
        >
          <small className="text-red-600">*</small> How many Farmer available
        </label>
        <input
          className=" px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 w-12"
          type="number"
          id="inputField"
          value={formData.farmerNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              farmerNumber: e.target.value,
            })
          }
        />
      </div>

      <div className="w-full px-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="inputField"
        >
          <small className="text-red-600">*</small>Remarks
        </label>
        <textarea
          rows="4"
          className="w-full border border-black-100 border-2"
          value={formData.remarks}
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
        ></textarea>
      </div>
      <h1 className="flex justify-start font-bold m-4">
        {" "}
        <FaUpload className="mr-2 text-blue-400 self-center" /> Upload the field
        day Image
      </h1>
      <div className="flex items-center justify-center gap-4  my-2 mb-2 lg:flex-row ">
        <div className="wrap ">
          <div className=" w-full px-2 profpic relative group">
            <Image
              src={""}
              className="h-32 w-full rounded bg-gray-200"
              width={250}
              height={100}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput "
              className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                userImage == "" ? "opacity-50" : "opacity-0"
              } ${
                userImage !== ""
                  ? "group-hover:opacity-100"
                  : "group-hover:opacity-0"
              }  transition-opacity duration-300`}
            >
              <span className="text-red-500 whitespace-nowrap text-xs">*</span>{" "}
              Upload the field day Image
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

// Hydration Error Issue
