import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { url } from "@/constants/url";
import axios from "axios";
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
  const [fShcCode, setShcCode] = useState("");
  const generateShcCode = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_demo_code`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          type: "SHC",
        },
      });
      const apires = await respond.data.data;
      setShcCode(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateShcCode();
  }, []);

  const [formData, setFormData] = useState({
    farmerMobile: "",
    farmerId: "",
    farmerName: "",
    farmerFatherName: "",
    farmerType: "",
    plotSize: "",
    village: "",
    district:"",
    subDis:"",
    state:"",
    farmerType: "",
    plotSize: "",
    schNo: "",
    schDate: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    ec: "",
    organicCarbon: "",
    sulphur: "",
    zinc: "",
    boron: "",
    iron: "",
    magnese: "",
    copper: "",
  });

  const handleAddFarmerShc = async () => {
    try {
      const data = {
        f_shc_no: fShcCode,
        shc_date: moment().format("YYYY-MM-DD[T00:00:00.000Z]"),
        farmer_mob_no: farmerMobileNumber ? Number(farmerMobileNumber) : "",
        farmer_id: Number(formData.farmerId),
        farmer_name: formData.farmerName,
        farmer_father_name: String(formData.farmerFatherName),
        village: formData.village,
        farmer_type: formData.farmerType,
        plot_size: formData.plotSize,

        nitrogen: formData.nitrogen,

        phosphorus: formData.phosphorus,
        potassium: formData.potassium,
        ph: formData.ph,
        ec: formData.ec,
        organic_carbon: formData.organicCarbon,
        sulphur: formData.sulphur,
        zinc: formData.zinc,
        boron: formData.boron,
        iron: formData.iron,

        manganese: formData.magnese,

        copper: formData.copper,

        emp_code: window.localStorage.getItem("emp_code"),
        t_id: Number(localStorageItems.tId),
        c_id: Number(localStorageItems.cId),
      };

      const respond = await axios
        .post(`${url}/api/add_mr_shc`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Submitted");
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
          });
          setFarmerMobileNumber("");
          generateShcCode();
          setFormData({
            farmerId: "",
            farmerName: "",
            farmerFatherName: "",
            village: "",
            state:"",
            district:"",
            subDis:"",
            farmerType: "",
            plotSize: "",
            schNo: "",
            schDate: "",
            nitrogen: "",
            phosphorus: "",
            potassium: "",
            ph: "",
            ec: "",
            organicCarbon: "",
            sulphur: "",
            zinc: "",
            boron: "",
            iron: "",
            magnese: "",
            copper: "",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
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

  const [addFarmerModal, setAddFarmerModal] = useState(false);
  
 
  const [farmerState, setFarmerState] = useState({
    farmerName: "",
    fatherName: "",
    farmerAddress: "",
    email:"",
    farmerTypes: "Subsistence Farming",
    farmerCategory: "Marginal-Below 1.00 hectare",
    landInfo: "",
    mobile: "",
    state: "",
    subDistrict: "",
    district: "",
    village: "",
    pinCode: "",
    retailer:""
   
  });
  


   
  const handleSaveFarmer = async () => {
    if(cropGridData.length){
      try {
        const data = {   
          fr_id: autoFarmer, 
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
          email:  farmerState.email,
          f_address: farmerState.farmerAddress,
          f_cat: farmerState.farmerCategory,
          f_pin: farmerState.pinCode,
          retailer: farmerState.retailer,
          st_id: farmerState.state,
          sub_district:farmerState.subDistrict,
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
              email:"",
              farmerTypes: "Subsistence Farming",
              farmerCategory: "Marginal-Below 1.00 hectare",
              landInfo: "",
              mobile: "",
              state: "",
              subDistrict:"",
              district: "",
              village: "",
              pinCode: "",
              retailer:""
            });
            setCropGridData([])
            getAutoFarmerId()
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
 
  const [allState, setAllState] = useState([]);
  const [allDist, setAllDist] = useState([]);
  const [allSubDist, setAllSubDist] = useState([]);
  const [allVillage, setAllVillage] = useState([]);
  const getAllState = async (state, district, subDis , village) => {
    try {
      const respond = await axios.get(`${url}/api/get_dist_state`, {
        headers: headers,
        params:{
          state:state,
          district:district, 
          sub_district:subDis,
          village:village
        }
      });
      const apires = await respond.data.data;   
      if(!state && !district && !subDis){
        setAllState(apires);
      }
      else if(state && !district && !subDis && !village)
     {
      console.log("pop", apires)
      setAllDist([...new Set(apires.map((item) => item.district))])

     }
     else if(state && district && !subDis && !village)
      {
       console.log("pop", apires)
       setAllSubDist([...new Set(apires.map((item) => item.sub_district))])
 
      }
      else if(state && district && subDis && !village )
        {
         console.log("pop", apires)
         setAllVillage([...new Set(apires.map((item) => item.village))])
   
        }
        else if(state && district && subDis && village )
         
          {
         
           setFarmerState({...farmerState ,  pinCode: apires[0].pin_code})
     
          }
    } catch (error) {
      console.log(error);
    }
  };
 
 
useEffect(()=>{
  getAllState(farmerState.state, farmerState.district,  farmerState.subDistrict, farmerState.village)
},[farmerState.state, farmerState.district, farmerState.subDistrict, farmerState.village])
 


  const [farmerMobileNumber, setFarmerMobileNumber] = useState("");
  const handleChangeFarmerNumber = async (number) => {
    setFarmerMobileNumber(number);

    if (number.length === 10) {
      try {
        const respond = await axios.get(`${url}/api/get_farmer`, {
          headers: headers,
          params: {
            mob_no: number,
          },
        });
        const apires = await respond.data.data[0];

        setFormData({
          ...formData,
          purposeMeet: formData.purposeMeet,
          meetType: formData.meetType,
          farmerMobile: number,
          farmerId: apires.f_id,
          farmerName: apires.f_name,
          farmerFatherName: apires.ff_name,
          farmerType: apires.f_type,
          plotSize: apires.f_lacre,
          village: apires.v_id,
           state:apires.st_id,
            district:apires.ds_id,
            subDis:apires.sub_district,
        });
      } catch (error) {
        setFormData({
          ...formData,
        });
      }
    } else {
      setFormData({
        ...formData,
        farmerMobile: "",
        farmerId: "",
        farmerName: "",
        farmerFatherName: "",
        farmerType: "",
        plotSize: "",
        village: "",
      });
    }
  };

  //Retailer Name  
  const [cropData, setCropData] = useState([]);
  const [allCropData, setAllCropData] = useState([]);

  const getCropInfo = async () => {
    if (new Date())
      try {
        const respond = await axios.get(`${url}/api/get_crop`, {
          headers: headers,
        });
        const apires = await respond.data.data;
        setCropData(
          apires.map((item) => {
            return { value: item.crop_name, label: item.crop_name };
          })
        );
        setAllCropData(apires)
      } catch (error) {
        console.log(error);
      }
  };

  const [autoFarmer , setAutoFarmer] = useState("")
  const getAutoFarmerId = async() =>{
    try {
      const respond = await axios.get(`${url}/api/get_farmer_id`, {
        headers: headers,
        params:{
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          type:"Farmer",
          emp_code: window.localStorage.getItem("emp_code"),
        }
      });

      const apires = await respond.data.data;  
      setAutoFarmer(apires)
     
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
      if(!addFarmerModal) return
      getAutoFarmerId()
    },[addFarmerModal])
    const [addFarmerCrop , setAddFarmerCrop] = useState({
      cropId : '',
      area : ''
    })

    const handleAddFarmerAreaCrop = async () => {
      try {
        const data = {
          cr_id: addFarmerCrop.cropId,
          area: addFarmerCrop.area,
          fr_id: autoFarmer,
          season_name:allCropData.filter((item)=> Number(item.cr_id) === Number(addFarmerCrop.cropId))[0].season_name,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        };
  
        const respond = await axios
          .post(`${url}/api/add_farmer_cropinfo`, JSON.stringify(data), {
            headers: headers,
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
            getCropGrid(autoFarmer)
            setAddFarmerCrop({
              cropId : '',
              area : ''
            })
          });
      } catch (errors) {
        const errorMessage = errors?.response?.data?.message;
     
        toast.error(errorMessage);
       
      }
    };
    useEffect(()=>{
getCropInfo()
      getCropGrid(autoFarmer)
    },[autoFarmer])
  const [cropGridData, setCropGridData] = useState([])
    const getCropGrid = async (fId) => {
      if(!fId) return
      try {
        const respond = await axios.get(`${url}/api/get_farmer_cropinfo`, {
          headers: headers,
          params: {  c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id, 
            fr_id: fId,
           },
        });
  
        const apires = await respond.data.data;
        setCropGridData(apires);
      } catch (error) {
        setCropGridData([]);
        console.log(error);
      }
    };

    const handleDeleteAreaInfo = async (cropId) => {
      try {
        respond = await axios
          .delete(`${url}/api/delete_farmer_cropinfo`, {
            headers: headers,
            params: { c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id, 
              fr_id: autoFarmer, 
            cr_id: cropId},
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
            getCropGrid(autoFarmer)
          });
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      }
    };
  
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
          <span>Farmer Soil Health Card</span>
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
                      onClick={() =>
                        router.push({
                          pathname: "MRFarmer_SHC_list",
                        })
                      }
                    >
                      <BsCalendar2Month
                        className="text-[#626364] cursor-pointer"
                        size={20}
                      />{" "}
                      List of SHC
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
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2 flex-row ">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F. SHC No
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="F Demo Code"
            value={fShcCode}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> SHC Date
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

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
        <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
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
              value={farmerMobileNumber}
              onChange={(e) => {
                handleChangeFarmerNumber(e.target.value)
              }}   />
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
            placeholder="State"
            value={formData.state}
            disabled
            
          />
        </div>
      </div>
      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-full px-2 mt-2">
          
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="District"
            value={formData.district}
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
            placeholder="Sub Dsitrict"
            value={formData.subDis}
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
           
          />
        </div>
      </div>

      <hr className="bg-blue-800 h-2 w-full my-2 mt-4" />
      <h1 className="flex justify-center font-bold mx-4">  Soil Sample Details</h1>
      <hr className="bg-blue-800 h-2 w-full my-2 " />
     
      <div className="flex flex-col ">
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Nitrogen:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.nitrogen}
            onChange={(e) =>
              setFormData({
                ...formData,
                nitrogen: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="kg/HA"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Phosphorus:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.phosphorus}
            onChange={(e) =>
              setFormData({
                ...formData,
                phosphorus: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="kg/HA"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Potassium:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.potassium}
            onChange={(e) =>
              setFormData({
                ...formData,
                potassium: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="kg/HA"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">PH: </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.ph}
            onChange={(e) =>
              setFormData({
                ...formData,
                ph: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value=""
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">EC: </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.ec}
            onChange={(e) =>
              setFormData({
                ...formData,
                ec: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="DS/M"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Organic Carbon:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.organicCarbon}
            onChange={(e) =>
              setFormData({
                ...formData,
                organicCarbon: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="W%"
            disabled
          />
        </div>
        {/* <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Sulphur:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.sulphur}
            onChange={(e) =>
              setFormData({
                ...formData,
                sulphur: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Zinc:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.zinc}
            onChange={(e) =>
              setFormData({
                ...formData,
                zinc: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Boron:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.boron}
            onChange={(e) =>
              setFormData({
                ...formData,
                boron: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Iron:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.iron}
            onChange={(e) =>
              setFormData({
                ...formData,
                iron: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Maganese:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.magnese}
            onChange={(e) =>
              setFormData({
                ...formData,
                magnese: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div>

        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Copper:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28 text-right"
            value={formData.copper}
            onChange={(e) =>
              setFormData({
                ...formData,
                copper: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="text-sm  bg-gray-200 text-gray-600 border border-gray-300 rounded-md px-2 py-1 w-16"
            value="PPM"
            disabled
          />
        </div> */}
      </div>

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {
            handleAddFarmerShc();
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Submit
        </button>
        <button
         onClick={() =>
          router.push({
            pathname: "/MR_Portal_Apps/MRHome",
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
                
                  <div className=" flex flex-row gap-2 w-full px-2 relative ">
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder="Auto  Gen."
                      value={autoFarmer}
                     
                    />
                   
                  </div>
                  <div className=" flex flex-row gap-2 w-full px-2 relative mt-2 ">
                   
                    <input
                      className="w-1/2 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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
                          rows="2"
                          value={farmerState.farmerAddress}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              farmerAddress: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="w-full px-2 ">
                      <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Email"
                  value={farmerState.email}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      email: e.target.value,
                    })
                  }
                />
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
                          className="w-full text-sm px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.state}
                          onChange={(e) =>
                          {
                            setFarmerState({
                              ...farmerState,
                              state: e.target.value,
                              district: "",
                              subDistrict:"",
                              village:"",
                              pinCode:""
                            })
                          
                          }
                            
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
                          className="w-full text-sm px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.district}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              district: e.target.value,
                              subDistrict:"",
                              village:"",
                              pinCode:""
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select District
                          </option>
                          {allDist.map((item) => (
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
                        <select
                          className="w-full px-3 text-sm py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.subDistrict}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              subDistrict: e.target.value,
                              village:"",
                              pinCode:""
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select Sub District
                          </option>
                          {allSubDist?.map((item, idx) => (
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
                          className="w-full text-sm px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={farmerState.village}
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              village: e.target.value,
                              pinCode:""
                             
                            })
                          }
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select Village
                          </option>
                          {allVillage.map((item) => (
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
                     

                      <div className="w-full px-2 ">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="inputField"
                          placeholder="Pin Code"
                          value={farmerState.pinCode  }
                          onChange={(e) =>
                            setFarmerState({
                              ...farmerState,
                              pinCode: e.target.value,
                            })
                          }
                        />
                      </div>
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
                    </div>
                    <div className="flex flex-row my-2 mb-2 ">
                   

                      <div className="w-full px-2 ">
                      
                      </div>
                    </div>
                    <hr className="bg-gray-600 h-2"/>
                    <h3 className="w-full  flex justify-center items-center font-bold">Area / Crop Info</h3>
                    <hr className="bg-gray-600 h-2"/>
                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                      <select
                          className="w-full text-sm px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          id="stateSelect"
                          value={addFarmerCrop.cropId}
                          onChange={(e)=> setAddFarmerCrop({...addFarmerCrop , cropId: e.target.value})}
                        >
                          <option
                            value={""}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Select Crop
                          </option>
                          {allCropData.map((item) => (
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
                          value={addFarmerCrop.area}
                          onChange={(e)=> setAddFarmerCrop({...addFarmerCrop , area: e.target.value})}
                        />
                      </div>

                      <div className="w-1/2  ">
                        <button type="button"
                      className="inline-flex justify-center  text-white rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium "
                      onClick={()=>handleAddFarmerAreaCrop()}
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                
              </th>
            
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {cropGridData.map((item, index) => (
              <tr className="border-2" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.cropName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.season_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.area}
                </td>
                <button className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                  {
                    <AiOutlineDelete
                      className="hover:text-red-500"
                      onClick={() =>
                        handleDeleteAreaInfo(item.cr_id)
                      }
                    ></AiOutlineDelete>
                  }
                </button>
              </tr>
            ))}
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
