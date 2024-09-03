import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import moment from "moment";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { url } from "@/constants/url";
import { FaCameraRetro } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import Profile from "../../public/userimg.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { IoTodayOutline } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import axios from "axios";
const AdditionalInfo = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
 

  const [productBrand, setProductBrand] = useState([]);

  const gettingPrdBrand = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_brand`, {
        headers: headers,
      });
      const respData = await resp.data.data;
      setProductBrand(respData.map((item)=> {return {label: item.brand_name, value: item.brand_name
      }}));
    } catch (error) {
      console.log("err", error);
    }
  };


  useEffect(()=>{
   gettingPrdBrand()
  },[])
  


  const [formData, setFormData] = useState({
    
    dateTime:"",
    mobileNo:"",
    address:"",
    contactPerson:"",
    productBrand:[],
    productPositioning:null,
    distribution: null,
    promotionalMaterial:"",
    outStock:"",
    labelTagging:"",
    productFacing:"",
    damageCondtion:"",
    rackConcept:"",
    catPlacement:"",
    displayPop:"",
    currentStock:"",
    shareLife:"",
    competitorBrand:"",
    competitorPrice:"",
    
 
   });
 
   const [dplNo, setDplNo] = useState("");
   const generateEmpCode = async () => {
     try {
       const respond = await axios.get(`${url}/api/get_demo_code`, {
         headers: headers,
         params: {
           emp_code: window.localStorage.getItem("emp_code"),
           type: "planogram",
         },
       });
       const apires = await respond.data.data;
       setDplNo(apires);
     } catch (error) {
       console.log(error);
     }
   };
   useEffect(() => {
     generateEmpCode();
   }, []);

   const handleAddFarmerMeet = async () => {
    try {
      const data = {
        

    dateTime:"",
    mobileNo:"",
    address:"",
    contactPerson:"",
    productBrand:[],
    productPositioning:null,
    distribution: null,
    promotionalMaterial:"",
    outStock:"",
    labelTagging:"",
    productFacing:"",
    damageCondtion:"",
    rackConcept:"",
    catPlacement:"",
    displayPop:"",
    currentStock:"",
    shareLife:"",
    competitorBrand:"",
    competitorPrice:"",
      };
      console.log("qop", formData);

      const respond = await axios
        .post(`${url}/api/add_farmer_meet`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Submitted");
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
          });
     
          generateEmpCode();
          setFormData({
            dateTime:"",
    mobileNo:"",
    address:"",
    contactPerson:"",
    productBrand:[],
    productPositioning:null,
    distribution: null,
    promotionalMaterial:"",
    outStock:"",
    labelTagging:"",
    productFacing:"",
    damageCondtion:"",
    rackConcept:"",
    catPlacement:"",
    displayPop:"",
    currentStock:"",
    shareLife:"",
    competitorBrand:"",
    competitorPrice:"",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
  };
  return (
    <form
    className=" bg-white rounded  w-full  overflow-auto pb-4"
    onSubmit={(e) => e.preventDefault()}
  >
    <div className="w-full flex h-12 bg-white-800 justify-between items-center px-4  shadow-lg lg:flex-col  ">
      <span className="text-black flex flex-row gap-4 font-bold  md:flex-col lg:flex-col ">
        <FaArrowLeftLong
          className="self-center "
          onClick={() =>
            router.push({
              pathname: "/MR_Portal_Apps/MRHome",
            })
          }
        />
        <span>Planogram</span>
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
                } absolute z-40 top-1 right-0 mt-2 w-86 bg-white  text-black border rounded-md shadow-md`}
              >
                <ul className=" text-black text-sm flex flex-col gap-4 py-4  font-Rale cursor-pointer ">
                  <li
                    className="hover:bg-gray-100 px-2 py-1 rounded-md flex flex-row gap-2   items-center whitespace-nowrap  "
                    onClick={() =>
                      router.push({
                        pathname: "MRFarmer_Meet_list",
                      })
                    }
                  >
                    <IoTodayOutline
                      className="text-[#626364] cursor-pointer"
                      size={20}
                    />{" "}
                    List of Farmer Meet
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
      <div className="flex my-2 flex-col gap-2">
        <div className="fle gap-4 w-full px-2 md: gap-40">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> D.PL.Visit No
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="D.PL.Visit No"
            value={dplNo}
        
          />
        </div>
       

          <div className="w-full px-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date & In Time
          </label>
          
          <DatePicker
 className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
 dateFormat="dd-MM-yyyy"         
            selected={
              formData.dateTime ? new Date(formData.dateTime) : ""
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                dateTime: moment(date).format("LL"),
              })
            }
            minDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            
          />
         
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Dealer Mobile No
          </label>

          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="Number"
            id="inputField"
            value={formData.mobileNo}
            onChange={(e)=> setFormData({...formData, mobileNo:e.target.value})}
          />
        </div>

        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            value={formData.address}
            onChange={(e)=> setFormData({...formData, address:e.target.value})}
        
            // disabled={!formActive}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Contact Person
          </label>
          <input
            className="w-full px-3 py-1.5 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
           
            id="inputField"
            value={formData.contactPerson}
            onChange={(e)=> setFormData({...formData, contactPerson:e.target.value})}
        
          
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Product Brand
          </label>
     
          <Select
            className="basic-single border border-balck-100"
            classNamePrefix="select"
    
            isMulti={true}
            name="color"
            options={productBrand}
          />
        </div>
      </div>

      <h1 className="flex justify-start font-bold m-4">
        Click the Tap Photo - Dealer outlet
      </h1>

      <div className="flex items-center justify-center gap-4  my-2 mb-2 lg:flex-row ">
        <div className="wrap ">
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
              <IoMdCloudUpload
                size={50}
                className="mr-2  self-center size-120 text-blue-400"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2  ">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center py-2">
            <span className="flex-1">Product Positioning</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value={formData.productPositioning}
              
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value={formData.distribution}
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Distribution</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Promotional Material</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Out of Stock</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Proper Label Tagging</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Product Facing</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
                
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Damage Condition</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="positioning_yes"
                name="positioning"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                id="positioning_no"
                name="positioning"
                value="No"
                className="mr-2"
              />
              <label htmlFor="positioning_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Rack Unique Concept</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Category Placement</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>

          <li className="flex items-center py-2">
            <span className="flex-1">Display POP</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="distribution_yes"
                name="distribution"
                value="Yes"
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex my-2 flex-col gap-2">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Current Stock
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Current Stock"
            value={formData.currentStock}
            onChange={(e)=> setFormData({...formData , currentStock: e.target.value})}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Actual Share of Life
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Actual Share of Life"
            value={formData.shareLife}
            onChange={(e)=> setFormData({...formData , shareLife: e.target.value})}
          />
        </div>

        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Compitior Brand
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Compitior Brand"
            value={formData.competitorBrand}
            onChange={(e)=> setFormData({...formData, competitorBrand: e.target.value})}
          />
        </div>
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Compitior Price
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Compitior Price"
            value={formData.competitorPrice}
            onChange={(e)=> setFormData({...formData, competitorPrice: e.target.value})}
          />
        </div>
      </div>

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Submit
        </button>
        <button
          onClick={() => {}}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default AdditionalInfo;

// Hydration Error Issue
