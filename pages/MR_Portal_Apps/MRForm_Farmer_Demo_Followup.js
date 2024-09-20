import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";

import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUpload, FaVideo } from "react-icons/fa";
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
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

const AdditionalInfo = (props) => {
  
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [fFollowCode, setFfollowCode] = useState("");
  const generateEmpCode = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_demo_code`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          type: "followup",
        },
      });
      const apires = await respond.data.data;
      setFfollowCode(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateEmpCode();
  }, []);
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
      cId: JSON.parse(window.localStorage.getItem("userinfo"))?.c_id,
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
    dealerName:"",
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
      const respond = await axios.get(`${url}/api/mr_dealer_map`, {
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

  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_product_brand`, {
        headers: headers,
      });
      const apires = await respond.data.data;
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

  const getProductDemoTable = async (fdemo) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_form_demo_crop`, {
        headers: headers,
        params: { f_demo_code: fdemo },
      });
      const apires = await respond.data.data;
      setProductDemoTableData(apires);
    } catch (error) {
      console.log(error);
      setProductDemoTableData([]);
    }
  };

  const getFarmerData = async (fdemo) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_form_demo`, {
        headers: headers,
        params: {
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: window.localStorage.getItem("emp_code"),
          f_demo_code: fdemo,
        },
      });
      const apires = await respond.data.data[0];
      console.log("pop", apires);
      setFormData({
        ...formData,
        purposeDemo: apires.purpose_of_demo,
        dealer: apires.d_id,
        dealerName: apires.dealer_des,
        farmerMobile: apires.farmer_mob_no,
        farmerId: apires.farmer_id,
        farmerName: apires.farmer_name,
        farmerFatherName: apires.farmer_father_name,
        village: apires.village,
        farmerType: apires.farmer_type,
        plotSize: apires.plot_size,
        potentialFarmer:apires.potential_farmer,
        nextVisitDate:apires.next_visit_date,
        status:apires.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDemoTable(router.query.f_demo_code);
    getFarmerData(router.query.f_demo_code);
  }, [router.query.f_demo_code]);
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
    if(!selectedImage && !selectedVideo){
      toast.error("Please Select Image");     
    }
    else {
      try {
        const data = {
          f_demo_follow_no: 1212,
          demo_followup_date: moment().format("YYYY-MM-DD[T00:00:00.000Z]"),
          demo_followup_time: new Date(),
          dealer_id: Number(formData.dealer),
          d_id: Number(formData.dealer),
          farmer_mob_no: Number(formData.farmerMobile),
          farmer_id: Number(formData.farmerId),
          farmer_name: formData.farmerName,
          farmer_father_name: formData.farmerFatherName,
          village: formData.village,
          farmer_type: formData.farmerType,
          farmer_observation: formData.farmerObservation,
          product_rating: formData.productRating,
          plot_size: formData.plotSize,
          demo_photo_url: "https://source.unsplash.com/user/c_v_r/1900x800",
          field_photo_url: "https://source.unsplash.com/user/c_v_r/1900x800",
          location_lat: 12,
          location_long: 21,
          potential_farmer: formData.potentialFarmer,
           follow_up_remarks: formData.remarks,
          hand_testimonials_url: "Test",
          video_testimonials_url: "Test",
          next_followup_date: formData.nextVisitDate,
          status: formData.status,
          f_demo_code: router.query.f_demo_code,
          f_demo_follow_no: fFollowCode,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          emp_code: window.localStorage.getItem("emp_code"),
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        };
  
        const respond = await axios
          .post(`${url}/api/add_farmer_demo_followup`, JSON.stringify(data), {
            headers: headers,
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
          
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

            if(selectedImage)
              {
                uploadImage(); 
              }
            
            if(selectedVideo)
              {
                uploadVideo();
              }
           
            setProductDemoTableData([]);
            router.push({
              pathname: "/MR_Portal_Apps/MR_Farmer_list_demo",
            });
          });
      } catch (errors) {
        const errorMessage = errors?.response?.data?.message;
  
        toast.error(errorMessage);
      }
    }
  
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


 
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

  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };


  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedNewVideo, setSelectedNewVideo] = useState("");
  const videoInputRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedNewVideo(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedVideo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const triggerVideoFileInput = () => {
    videoInputRef.current.click();
  };



  const uploadVideo = async () => {
    
    const getVideoExtension = (filename) => {
      if (typeof filename.name !== "string") {
        console.error("Invalid input. Expected a string.");
        return "Invalid";
      }
      console.log("top", filename)
      const parts = filename.name.split(".");
      if (parts.length > 1) {
        return parts[parts.length - 1];
      } else {
        return "mp4";
      }
    };

    try {
     
      const videoBlob = new Blob([selectedNewVideo], {
        type: selectedNewVideo?.type,
      });
      const fd = new FormData();
      fd.append(
        "VidFile",
        videoBlob,
        `${fFollowCode}.${getVideoExtension(selectedNewVideo)}`
      );
      const response = await axios
        .post(`${url}/api/upload_video`, fd, {
          params: {
            file_path: "mr_followup",
           
            video_testimonials_url: `${fFollowCode}.${getVideoExtension(
              selectedNewVideo
            )}`,
            f_demo_follow_no: fFollowCode,
          },
        })
        .then(() => {
          setSelectedVideo(""), setSelectedNewVideo("");
        });
    } catch (error) {}
  };

  const uploadImage = async () => {
    function getFileExtension(filename) {
      if (typeof filename.name !== "string") {
        console.error("Invalid input. Expected a string.");
        return toast.error("Input a valid Image");
      }
      console.log("lop", filename)
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
        `${fFollowCode}.${getFileExtension(selectedNewImage)}`
      );
    
      const response = await axios
        .post(`${url}/api/upload_file`, fd, {
          params: {
            file_path: "mr_followup",
            hand_testimonials_url: `${fFollowCode}.${getFileExtension(
              selectedNewImage
            )}`,

         
          
            f_demo_follow_no: fFollowCode,
          },
        })
        .then(() => {
          setSelectedImage(""), setSelectedNewImage("");
        });
    } catch (error) {}
  };

  const [allCrop , setAllCrop] = useState([])
  const getAllCropInfo = async () => {
    if (new Date())
      try {
        const respond = await axios.get(`${url}/api/get_crop`, {
          headers: headers,
          params: {
            c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          },
        });
        const apires = await respond.data.data;
        setAllCrop(apires);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(()=>{
    getAllCropInfo();
  },[])
  const [addFarmerModal, setAddFarmerModal] = useState(false);
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
    retailer:""
   
  });
  
  const [farmerCropState, setFarmerCropState] = useState({
   crop:"", 
   area:""
  });

  const handleSaveFarmer = async () => {
    if(allCropGridData.length){
      try {
        const data = {
        
  
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
          retailer: farmerState.retailer,
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
              retailer:""
            });
          });
      } catch (errors) {
        console.log("kop", errors);
        const errorMessage = errors?.response?.data?.message
  
        toast.error(errorMessage);
        const newErrors = {};
        errors?.inner?.forEach((error) => {
          newErrors[error?.path] = error?.message;
        });
      }
    }
    else 
    {
      toast.error("Please Enter atleast one Area/Crop Data to Save Farmer");
    }
  
  };

  const handleSaveFarmerCrop = async () => {
    try {
      const data = {
      cr_id:  farmerCropState.crop,
      area: farmerCropState.area
      };
      const respond = await axios
        .post(`${url}/api/add_farmer_cropinfo`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          setFarmerCropState({
            crop:"", 
            area:""
          });
        });
    } catch (errors) {
     
      const errorMessage = errors?.response?.data?.message

      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };
  const [allState, setAllState] = useState([]);
  const [allStateCityData, setAllStateCityData] = useState([]);
  const getAllState = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dist_state`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setAllStateCityData(apires);

      setAllState([...new Set(apires.map((item) => item.state))]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllState();
  }, []);
  const [allCityStateWise, setAllCityStateWise] = useState([]);
  useEffect(() => {
    if (!farmerState) return;

    setAllCityStateWise(
      allStateCityData
        .filter((item) => item.state === farmerState.state)
        .map((item) => item.district)
    );
  }, [farmerState.state]);


  const [allCropGridData , setAllCropGridData] = useState([])
  


  
  return (
    <form
      className=" bg-white rounded  w-full  overflow-auto pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
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
          <span>Farmer Demo Followup</span>
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
                      className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2   items-center whitespace-nowrap "
                    >
                      <BsCalendar2Month
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      Followup History
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
                    
                  </ul>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </span>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex  flex-row gap-1  lg:flex-col lg:hidden">
        <div className="fle gap-2 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap lg:w-1/4"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F Follow Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="F Follow Code"
            disabled
            value={fFollowCode}
            // disabled={!formActive}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Re-Visit Date
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
            <small className="text-red-600">*</small> Demo Type
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled
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
              value="Product Demo"
              className="focus:outline-none focus:border-b bg-white"
            >
              Product Demo
            </option>
            <option
              value="Tulsi Demo"
              className="focus:outline-none focus:border-b bg-white"
            >
            Tulsi Demo
            </option>
            <option
              value="Pin Demo"
              className="focus:outline-none focus:border-b bg-white"
            >
             Pin Demo
            </option>
            <option
              value="Tray Demo"
              className="focus:outline-none focus:border-b bg-white"
            >
             Tray Demo
            </option>
            <option
              value="Leaf Demo"
              className="focus:outline-none focus:border-b bg-white"
            >
            Leaf Demo
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
            disabled
            value={formData.dealer ? formData.dealer :"Other"}
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
            <option
              value="Other"
              className="focus:outline-none focus:border-b bg-white"
            >
              Other
            </option>
          </select>
          {console.log("zop", formData.dealerName)}
          {formData.dealerName && 
           <input
           className="w-full px-3 py-2 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
        
           id="inputField"
           placeholder="Delaer Name"
           value={formData.dealerName}
          
         />}
         

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
        <div className="w-full px-2 mt-2 md:w-1/2 lg:w-1/2 flex justify-end ">
    
          <input
            className="w-full self-end px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
        <div className="w-full px-2 mt-2 ">   
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
     
     
      <hr className="bg-blue-800 h-2 w-full my-2 mt-4" />
      <h1 className="flex justify-center font-bold mx-4">Product Demo</h1>
      <hr className="bg-blue-800 h-2 w-full my-2 " />
     
      <div className="overflow-x-auto my-6 sm:over<flow-hidden w-full  lg:w-full">
        <table className="min-w-full divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50 border-2">
            <tr className="border-2">
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Crop
              </th>
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Stage
              </th>
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Segment
              </th>
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Product Brand
              </th>
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
              St. Dose/Acre
              </th>
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
              Rec. Dose/Acre
              </th>
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
               Plot Size
              </th>
             
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Water
              </th>
              
              <th
                scope="col"
                className="px-6  text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200  ">
            {productDemoTableData?.map((item) => (
              <tr className="border-2 " key={item.id}>
                <td className="px-6   whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.crop}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.stage}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.segment}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.product_brand}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.dose_acre_tank}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.rec_dose}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.acre_plot}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {item.water_val}
                </td>
                
               
              
               
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                 <button
                  className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap"
                  onClick={() => deleteProductDemoTable(item.f_demo_crop_id)}
                >
                  {
                    <AiOutlineDelete className="hover:text-red-500 self-center"></AiOutlineDelete>
                  }
                </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Farmer Observation
          </label>
          <div className="flex flex-row gap-3 text-sm overflow-wrap ">
          <section className="flex gap-1">
              <input
                type="radio"
                id="outstanding"
                name="farmerObservation"
                value="Outstanding"
                onChange={handleInputChange}
              />
              <label htmlFor="outstanding" className="self-center">
                Outstanding
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="excellent"
                name="farmerObservation"
                value="Excellent"
                onChange={handleInputChange}
              />
              <label htmlFor="excellent" className="self-center">
                Excellent
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="veryGood"
                name="farmerObservation"
                value="Very Good"
                onChange={handleInputChange}
              />
              <label htmlFor="veryGood" className="self-center">
                V.Good
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="good"
                name="farmerObservation"
                value="Good"
                onChange={handleInputChange}
              />
              <label htmlFor="good" className="self-center">
                Good
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="fair"
                name="farmerObservation"
                value="Fair"
                onChange={handleInputChange}
              />
              <label htmlFor="fair" className="self-center">
                Fair
              </label>
            </section>
           
            
            
            
          </div>
        </div>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Product Rating
          </label>
          <div className="flex flex-row justify-between text-sm overflow-auto ">
          <section className="flex gap-1">
              <input
                type="radio"
                id="excellentProduct"
                name="productRating"
                value="Excellent"
                onChange={handleInputChange}
              />
              <label htmlFor="excellentProduct" className="self-center">
                Excellent
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="goodProduct"
                name="productRating"
                value="Good"
                onChange={handleInputChange}
              />
              <label htmlFor="goodProduct" className="self-center">
                Good
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="average"
                name="productRating"
                value="Average"
                onChange={handleInputChange}
              />
              <label htmlFor="average" className="self-center">
                Average
              </label>
            </section>
            <section className="flex gap-1">
              <input
                type="radio"
                id="poor"
                name="productRating"
                value="Poor"
                onChange={handleInputChange}
              />
              <label htmlFor="poor" className="self-center">
                Poor
              </label>
            </section>
          
           
            
          </div>
        </div>
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

      <div className="wrap ">
      <h1 className="flex justify-center font-bold ">
            <FaUpload className="mr-2 text-blue-400 self-center" />  Video
            Testimonials
          </h1>
          <div className="flex items-center justify-center gap-4  my-2 mb-2 lg:flex-row ">
        <div className="wrap ">
          <div className=" w-full px-2 pt-2 profpic relative group bo">
        
            <video
              controls
                className=" rounded  bg-gray-200 w-72 h-60"
              src={selectedVideo}
              onClick={() => triggerVideoFileInput(videoInputRef)}
            />
        

        {!selectedVideo && (  <label
                htmlFor="fileInput "
                className={`text-black text-xs absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer  `}
                onClick={ triggerVideoFileInput}
              >
                <FaVideo
                  size={50}
                  className="mr-2  self-center size-120 text-black-400"
                />
              </label>)}           
        </div>
        </div>
      </div>
        </div>
        <div className="wrap ">
          <h1 className="flex justify-center font-bold ">
            <FaUpload className="mr-2 text-blue-400 self-center" />  Handwritten
            Testimonials
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
      <hr className="bg-blue-400 border-1 w-full my-2 mt-4" />
      <div className="flex  flex-row ">
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
           handleAddDemo()
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Submit
        </button>
        <button
          onClick={() =>
            router.push({
              pathname: "/MR_Portal_Apps/MR_Farmer_list_demo",
            })
          }
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
      <input
        type="file"
        accept="video/*"
        id="videoFileInput"
        className="hidden"
        onChange={handleVideoUpload}
        ref={videoInputRef}
      />
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />

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
                <hr className="bg-blue-600 h-2"/>
                <h3 className="font-bold w-full flex justify-center ">Farmer Registration</h3>
                <hr className="bg-blue-600 h-2 mb-2"/>
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
                        placeholder="Land/Acre Information"
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
                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="Retailer"
                          value={farmerState.retailer}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              retailer: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="w-full px-2 ">
                      
                      </div>
                    </div>
                    <hr className="bg-gray-600 h-2"/>
                    <h3 className="w-full  flex justify-center items-center font-bold">Area / Crop Info</h3>
                    <hr className="bg-gray-600 h-2"/>
                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                      <select
                          className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.crop}
                          onChange={(e) =>
                            setFarmerCropState({
                              ...farmerCropState,
                              crop: e.target.value,
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select Crop
                          </option>
                          {allCrop.map((item) => (
              <option key={item.cr_id} value={item.cr_id}>
                {item.crop_name}
              </option>
            ))}
                        </select>
                      </div>

                      <div className="w-1/2 px-2 ">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="inputField"
                          placeholder="Area"
                          value={farmerCropState.area}
                          onChange={(e) =>
                            setFarmerCropState({
                              ...farmerCropState,
                              area: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="w-1/2  ">
                        <button type="button"
                      className="inline-flex justify-center  text-white rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>handleSaveFarmerCrop()}
                      >Add+</button>
                      </div>
                    </div>
                    <div className="overflow-x-auto my-6 sm:overflow-hidden w-full  lg:w-full">
        <table className="min-w-full  divide-y divide-gray-200 border-2 lg:max-w-1/2">
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
                Season
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Area
              </th>
            
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {/* {farmerContactTableData.map((item, index) => (
              <tr className="border-2" key={item.f_meet_key_person_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.type_relation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.mob_no}
                </td>
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {
                    <AiOutlineDelete
                      className="hover:text-red-500"
                      onClick={() =>
                        handleDeleteContact(item.f_meet_key_person_id)
                      }
                    ></AiOutlineDelete>
                  }
                </button>
              </tr>
            ))} */}
          </tbody>
        </table>
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
    </form>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
