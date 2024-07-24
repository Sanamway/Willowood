import React, { useState, useEffect, Fragment, useRef } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { url } from "@/constants/url";
import { Popover } from "@headlessui/react";
import axios, { formToJSON } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
import { FaArrowAltCircleUp, FaUpload } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import CameraComponent from "@/components/Camera";

const AdditionalInfo = (props) => {
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
  const router = useRouter();
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
    potentialFarmer: "Yes",
    nextVisitDate: new Date(),
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
  const [allStageData, setAllStageData] = useState([]);
  const [allSegmentData, setAllSegmentData] = useState([]);
  const [allBrandData, setAllBrandData] = useState([]);

  const getDelaerData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dealer`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        },
      });
      const apires = await respond.data.data;
      setDealerData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  const getCropInfo = async () => {
    if (new Date())
      try {
        const respond = await axios.get(`${url}/api/get_crop_profile`, {
          headers: headers,
          params: {
            c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
            t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          },
        });
        const apires = await respond.data.data;
        setCropData(apires);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    getDelaerData();
    getCropInfo();

    getAllState();
  }, []);

  const getStageInfo = async (cropId, cropStage, cropSegment, productBrand) => {
    try {
      const respond = await axios.get(`${url}/api/get_crop_segment`, {
        headers: headers,
        params: {
          cr_id: cropId,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });
      const apires = await respond.data.data;

      setAllStageData([
        ...new Set(apires.map((item) => String(item.crop_stage))),
      ]);

      setAllSegmentData([
        ...new Set(
          apires
            .filter((item) => item.crop_stage === cropStage)
            .map((item) => String(item.crop_segment))
        ),
      ]);

      setAllBrandData([
        ...new Set(
          apires
            .filter((item) => item.crop_stage === cropStage)
            .filter((item) => item.crop_segment === cropSegment)
            .map((item) => String(item.product_brand))
        ),
      ]);
      setProductDemoState({
        ...productDemoState,
        dose: apires
          .filter((item) => item.crop_stage === cropStage)
          .filter((item) => item.crop_segment === cropSegment)
          .filter((item) => item.product_brand === productBrand)[0].dose_acre,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStageInfo(
      productDemoState.crop,
      productDemoState.stage,
      productDemoState.segment,
      productDemoState.productBrand
    );
  }, [
    productDemoState.crop,
    productDemoState.stage,
    productDemoState.segment,
    productDemoState.productBrand,
  ]);

  const deleteProductDemoTable = async (id) => {
    try {
      const respond = await axios.get(`${url}/api/delete_mr_form_demo_crop`, {
        headers: headers,
        params: { f_demo_crop_id: Number(id) },
      });
      const apires = await respond.data.data;
      getProductDemoTable(fDemoCode);

      toast.success("Deleted");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
    }
  };
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const handleAddDemo = async () => {
    setSubmitFormLoading(true);
    try {
      const data = {
        demo_date: moment().format("YYYY-MM-DD[T00:00:00.000Z]"),
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

        location_lat: 12,
        location_long: 21,
        potential_farmer: formData.potentialFarmer,
        next_visit_date: formData.nextVisitDate,
        status: formData.status,
        t_id: Number(localStorageItems.tId),
        f_demo_code: fDemoCode,
        c_id: Number(localStorageItems.cId),
        emp_code: window.localStorage.getItem("emp_code"),
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
          uploadImage();
          generateEmpCode();

          setSubmitFormLoading(false);
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
            potentialFarmer: "Yes",
            nextVisitDate: new Date(),
            status: "Open",
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
      generateEmpCode();
      toast.error(errorMessage);
      setSubmitFormLoading(false);
    }
  };

  const [addFarmerModal, setAddFarmerModal] = useState(false);

  const [localStorageItems, setLocalStorageItems] = useState({
    cId: "",
    bgId: "",
    buId: "",
    rId: "",
    zId: "",
    tId: "",
    roleId: "",
  });
  useEffect(() => {
    setLocalStorageItems({
      cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      clName: window.localStorage.getItem("user_name"),
      ulName: window.localStorage.getItem("phone_number"),
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
    });
  }, []);

  const [farmerState, setFarmerState] = useState({
    farmerName: "",
    fatherName: "",
    farmerAddress: "",
    farmerTypes: "Subsistence Farming",
    farmerCategory: "Marginal-Below 1.00 hectare",
    landInfo: "",
    mobile: "",
    state: "",
    district: "",
    village: "",
    pinCode: "",
  });

  const handleSaveFarmer = async () => {
    if (farmerState.mobile.length < 10) {
      toast.error("Please Enter 10 digit Mobile Number");
      return;
    }

    try {
      const data = {
        f_demo_code: fDemoCode,
        c_id: Number(localStorageItems.cId),
        bu_id: Number(localStorageItems.buId),
        bg_id: Number(localStorageItems.bgId),
        z_id: Number(localStorageItems.zId),
        r_id: Number(localStorageItems.rId),
        t_id: Number(localStorageItems.tId),
        ds_id: farmerState.district,
        v_id: farmerState.village,
        f_name: farmerState.farmerName,
        f_lacre: farmerState.landInfo,
        f_mobile: farmerState.mobile,
        f_type: farmerState.farmerTypes,
        ff_name: farmerState.fatherName,
        f_address: farmerState.farmerAddress,
        f_cat: farmerState.farmerCategory,
        f_pin: farmerState.pinCode,
        st_id: farmerState.state,
        c_name: localStorageItems.clName,
        ul_name: localStorageItems.ulName,
      };
      const respond = await axios
        .post(`${url}/api/add_farmer`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          setFarmerState({
            farmerName: "",
            fatherName: "",
            farmerAddress: "",
            farmerTypes: "Subsistence Farming",
            farmerCategory: "Marginal-Below 1.00 hectare",
            landInfo: "",
            mobile: "",
            state: "",
            district: "",
            village: "",
            pinCode: "",
          });
          generateEmpCode();
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      console.log("plo", errors?.response?.data);
      console.log("Please Enter 10 digit Mobile Number");
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };

  const getFarmerDetails = async (item) => {
    console.log("Item", item);
    setFormData({
      ...formData,
      farmerMobile: item,
    });

    if (item.length === 10) {
      try {
        const respond = await axios.get(`${url}/api/get_farmer`, {
          headers: headers,
          params: { mob_no: Number(item) },
        });

        const apires = await respond.data.data[0];

        setFormData({
          ...formData,
          farmerMobile: item,
          farmerId: apires.f_id,
          farmerName: apires.f_name,
          farmerFatherName: apires.ff_name,
          farmerType: apires.f_type,
          plotSize: apires.f_lacre,
          village: apires.v_id,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      setFormData({
        ...formData,
        farmerMobile: item,
        farmerId: "",
        farmerName: "",
        farmerFatherName: "",
        farmerType: "",
        plotSize: "",
        village: "",
      });
    }
  };
  const [fDemoCode, setFDemoCode] = useState("");
  const generateEmpCode = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_demo_code`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
        },
      });
      const apires = await respond.data.data;
      setFDemoCode(apires);
      getProductDemoTable(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateEmpCode();
  }, []);
  const handleAddProductDemo = async () => {
    try {
      const data = {
        f_demo_code: fDemoCode,
        cr_id: Number(productDemoState.crop),
        crop: cropData.filter(
          (item) => item.crop_profile_id === Number(productDemoState.crop)
        )[0].crop_name,
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
          getProductDemoTable(fDemoCode);
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
      console.log(errors);
      toast.error(errors.response?.data.message);
    }
  };

  const [allState, setAllState] = useState([]);
  const [allStateCityData, setAllStateCityData] = useState([]);
  const [img, setImg] = useState([]);
  const [newImg, setNewImg] = useState([]);
  const [imgType, setImgType] = useState("");

  const getAllState = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dist_state`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setAllStateCityData(apires);
      console.log(
        "plk",
        apires.map((item) => item.state)
      );
      setAllState([...new Set(apires.map((item) => item.state))]);
    } catch (error) {
      console.log(error);
    }
  };
  const [allCityStateWise, setAllCityStateWise] = useState([]);
  useEffect(() => {
    if (!farmerState) return;

    setAllCityStateWise(
      allStateCityData
        .filter((item) => item.state === farmerState.state)
        .map((item) => item.district)
    );
  }, [farmerState.state]);

  const getProductDemoTable = async (fdemo) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_form_demo_crop`, {
        headers: headers,
        params: { f_demo_code: fDemoCode },
      });
      const apires = await respond.data.data;
      setProductDemoTableData(apires);
    } catch (error) {
      console.log(error);
      setProductDemoTableData([]);
    }
  };
  useEffect(() => {
    getProductDemoTable(fDemoCode);
  }, [fDemoCode]);
  const [showCamera, setShowCamera] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedNewImage, setSelectedNewImage] = useState("");
  const fileInputRef = useRef(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    setSelectedNewImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
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
      const renamedBlob = new Blob([selectedNewImage], {
        type: selectedNewImage?.type,
      });

      const fd = new FormData();
      fd.append(
        "myFile",
        renamedBlob,
        `${fDemoCode}.${getFileExtension(selectedNewImage)}`
      );

      const response = await axios
        .post(`${url}/api/upload_file`, fd, {
          params: {
            file_path: "mr_demo",
            field_photo_url: `${fDemoCode}.${getFileExtension(
              selectedNewImage
            )}`,
            f_demo_code: fDemoCode,
          },
        })
        .then(() => {
          setSelectedImage("");
          setSelectedNewImage("");
        });
    } catch (error) {
      console.log("NOP", error);
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <form
      className=" bg-white rounded  w-full  overflow-auto pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Transition
        appear
        show={showCamera}
        as={Fragment}
        onClose={() => setShowCamera(false)}
      >
        <Dialog as="div" className="relative z-10 ">
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
            <div className=" w-full h-full flex justify-center items-center bg-green-400">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="font-arial h-full ">
                  <CameraComponent
                    setImg={setImg}
                    setNewImg={setNewImg}
                    type={imgType}
                    handleClose={() => setShowCamera(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* <div className="fixed top-0 left-0 w-full h-full bg-gray-900 flex justify-center items-center bg-green-400">
        <div className="relative z-9999999 ">
          <CameraComponent />
        </div>
      </div> */}
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
        <span className="text-black flex flex-row gap-4 font-bold   ">
          <FaArrowLeftLong
            className="self-center "
            onClick={() =>
              router.push({
                pathname: "/MR_Portal_Apps/MRHome",
              })
            }
          />
          <span>Register the Farmer Demo</span>
        </span>{" "}
        <span className="text-white self-center">
          <Popover as="div" className="relative border-none outline-none mt-2">
            {({ open }) => (
              <>
                <Popover.Button className="focus:outline-none">
                  <PiDotsThreeOutlineVerticalFill
                    className="text-[#626364] cursor-pointer"
                    size={20}
                  />
                </Popover.Button>

                <Popover.Panel
                  as="div"
                  className={`${
                    open ? "block" : "hidden"
                  } absolute z-40 top-1 right-0 mt-2 w-36 bg-white  text-black border rounded-md shadow-md`}
                >
                  <ul className=" text-black text-sm flex flex-col gap-4 py-4  font-Rale cursor-pointer ">
                    <li
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2   items-center whitespace-nowrap"
                      onClick={() =>
                        router.push({
                          pathname: "MR_Farmer_list_demo",
                        })
                      }
                    >
                      <IoTodayOutline
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      List of Demo
                    </li>
                    <li
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                      onClick={() =>
                        router.push({
                          pathname: "MR_Farmer_list",
                        })
                      }
                    >
                      <IoTodayOutline
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      List of Farmer
                    </li>
                    <li
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center "
                      onClick={() => setAddFarmerModal(true)}
                    >
                      <GiFarmer
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      New Farmer
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:hidden ">
                      <FaHandsHelping
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Help
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2  items-center lg:flex-col ">
                      <IoSettingsOutline
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Setting
                    </li>
                  </ul>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </span>
      </div>
      <div className="flex  flex-row gap-1  lg:flex-col lg:hidden">
        <div className="fle gap-2 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap lg:w-1/4"
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
            value={fDemoCode}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date
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

      <div className="flex flex-row my-2 mb-2 lg:flex-col ">
        <div className="w-1/2 px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Purpose
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

      <div className="flex flex-row my-2 mb-2 ">
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
                const input = e.target.value.replace(/\D/g, "");
                console.log("lop", input.length);
                if (input.length <= 10) {
                  getFarmerDetails(input);
                }
              }}
            />
            <AiOutlineFileAdd
              size={42}
              className="  self-center size-120 text-black-400 text-blue-400"
              onClick={() => setAddFarmerModal(true)}
            />
          </div>
        </div>
        <div className="w-full px-2 mt-2 md:w-1/2 lg:w-1/2 ">
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
            disabled
            onChange={(e) =>
              setFormData({
                ...formData,
                farmerId: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-row my-2 mb-2 md:flex-col lg:flex-col ">
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
            disabled
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
            disabled
            onChange={(e) =>
              setFormData({
                ...formData,
                farmerFatherName: e.target.value,
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
            disabled
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
            disabled
            onChange={(e) =>
              setFormData({
                ...formData,
                plotSize: e.target.value,
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
            disabled
            onChange={(e) =>
              setFormData({
                ...formData,
                village: e.target.value,
              })
            }
          />
        </div>
      </div>

      <h1 className="flex justify-start font-bold mx-4">Product Demo</h1>

      <div className="flex flex-row  mb-2 ">
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
            {allStageData.map((item) => (
              <option value={item}>{item}</option>
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
            {allSegmentData.map((item) => (
              <option value={item}>{item}</option>
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

            {allBrandData.map((item) => (
              <option value={item}>{item}</option>
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
                Stage
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
                Dose/Acre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200  ">
            {productDemoTableData?.map((item, index) => (
              <tr className="border-2" key={item.id}>
                <td className="px-6   whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.crop}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.stage}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.dose_acre_tank}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.segment}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.product_brand}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.water_val}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.dose_acre_tank}
                </td>
                <button
                  className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap"
                  onClick={() => deleteProductDemoTable(item.f_demo_crop_id)}
                >
                  {
                    <AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>
                  }
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4   flex-col">
        <div className="wrap ">
          <h1 className="flex justify-center font-bold ">Capture Demo Photo</h1>
          <div className=" w-full px-2 profpic relative group bo">
            <Image
              src={img}
              className=" rounded  bg-gray-200"
              alt="img"
              width={300}
              height={200}
              onClick={() => {
                setShowCamera(true);
                setImgType("Old");
              }}
            />

            {!img && (
              <label
                htmlFor="fileInput "
                className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer  `}
              >
                <FaCameraRetro
                  size={50}
                  className="mr-2  self-center size-120 text-black-400"
                />
              </label>
            )}
          </div>
        </div>
        <div className="wrap ">
          <h1 className="flex justify-center font-bold m-4">
            <FaUpload className="mr-2 text-blue-400 self-center" /> Upload the
            field day Image
          </h1>
          <div className="flex items-center justify-center gap-4  my-2 mb-2 lg:flex-row ">
            <div className="wrap ">
              <div className=" w-full px-2 pt-2 profpic relative group bo">
                <img
                  src={selectedImage}
                  className=" rounded  bg-gray-200 w-72 h-60"
                  alt="img"
                  onClick={triggerFileInput}
                />

                {!selectedImage && (
                  <label
                    htmlFor="fileInput "
                    className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer  `}
                    onClick={triggerFileInput}
                  >
                    <FaCameraRetro
                      size={50}
                      className="mr-2  self-center size-120 text-black-400"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  flex-row ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Potential
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
            minDate={new Date()}
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
          disabled={submitFormLoading}
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

      <Transition appear show={addFarmerModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => setAddFarmerModal(false)}
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
                  <div className="w-1/2 px-2 relative ">
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder="Mobile"
                      value={farmerState.mobile}
                      onChange={(e) => {
                        const input = e.target.value.replace(/\D/g, "");
                        if (input.length <= 10) {
                          setFarmerState({
                            ...farmerState,
                            mobile: input,
                          });
                        }
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex flex-row my-2 mb-2  ">
                      <div className="w-full px-2">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Farmer Name"
                          value={farmerState.farmerName}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              farmerName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="w-full px-2 ">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Farmer Father Name"
                          value={farmerState.fatherName}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              fatherName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <div className="w-full px-2 ">
                        <textarea
                          className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                          id="textareaField"
                          placeholder="Farmer Address"
                          rows="3"
                          value={farmerState.farmerAddress}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              farmerAddress: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                          id="userSelect"
                          value={farmerState.farmerTypes}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              farmerTypes: e.target.value,
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Farmer Type
                          </option>
                          <option value="Subsistence Farming">
                            Subsistence Farming
                          </option>
                          <option value="Comercial Farming">
                            Comercial Farming
                          </option>
                          <option value="Home Farming">Home Farming</option>
                        </select>
                      </div>

                      <div className="w-full px-2 ">
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                          id="userSelect"
                          value={farmerState.farmerCategory}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              farmerCategory: e.target.value,
                            })
                          }
                        >
                          <option
                            value=""
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select Category
                          </option>
                          <option value="Marginal-Below 1.00 hectare">
                            Marginal-Below 1.00 hectare
                          </option>
                          <option value="Small 1.00-2.00 hectare">
                            Small 1.00-2.00 hectare
                          </option>
                          <option value="Semi-Medium 2.00-4.00 hectare">
                            Semi-Medium 2.00-4.00 hectare
                          </option>
                          <option value="Medium 4.00-10.00 hectare">
                            Medium 4.00-10.00 hectare
                          </option>
                          <option value="Large 10.00 hectare">
                            Large 10.00 hectare
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full px-2">
                      <input
                        className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        placeholder="Land Information"
                        value={farmerState.landInfo}
                        onChange={(e) =>
                          setFarmerState({
                            ...farmerState,
                            landInfo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.state}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              state: e.target.value,
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select State
                          </option>
                          {allState?.map((item, idx) => (
                            <option
                              value={item}
                              className="focus:outline-none focus:border-b bg-white"
                              key={idx}
                            >
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full px-2 ">
                        <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.district}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              district: e.target.value,
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select District
                          </option>
                          {allCityStateWise.map((item) => (
                            <option
                              value={item}
                              className="focus:outline-none focus:border-b bg-white"
                            >
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Village"
                          value={farmerState.village}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              village: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="w-full px-2 ">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="inputField"
                          placeholder="Pin Code"
                          value={farmerState.pinCode}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              pinCode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-100  flex flex-row gap-2 justify-center lg:hidden">
                    <button
                      type="button"
                      className="inline-flex justify-center  text-white rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleSaveFarmer()}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center text-white rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium  hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setAddFarmerModal(false)}
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
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />
    </form>
  );
};

export default AdditionalInfo;
