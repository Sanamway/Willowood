import React, { useEffect, useState, useRef } from "react";
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
    dateTime:new Date(),

            dealerData: {
              dealerName:   "",
              address:      "",
              contactPerson:"",
            },
   
    productBrand:[],
    productPositioning:false,
    distribution: false,
    promotionalMaterial:false,
    outStock:false,
    labelTagging:false,
    productFacing:false,
    damageCondtion:false,
    rackConcept:false,
    catPlacement:false,
    displayPop:false,
    currentStock:"",
    shareLife:"",
    competitorBrand:"",
    competitorPrice:"",
   });

   const [dealerData, setDealerData] = useState([]);
   const getDelaerData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dealer`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        },
      });
      const apires = await respond.data.data.map((item)=> { return {
        dealerName:item.d_id,
        address: item.address,
        contactPerson: item.contact_person,
        partyName: item.party_Name
      }});
      setDealerData(apires);
    } catch (error) {
      console.log(error);
    }
  };


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
     getDelaerData();
   }, []);

   const handleSubmit = async () => {
    try {
      const data = {
        f_planogram_no:dplNo,
        f_planogram_date:new Date(),
        dealer_id:formData.dealerData ? formData.dealerData.dealerName :"",
        product_brand:formData.productBrand.map(item => item.value), 
        product_positioning:formData.productPositioning? "Yes" : "No",
        distribution:formData.distribution? "Yes" : "No",
        promotional_material:formData.promotionalMaterial? "Yes" : "No",
        out_of_stock:formData.outStock? "Yes" : "No",
        proper_label_tagging:formData.labelTagging? "Yes" : "No",
        product_facing:formData.productFacing? "Yes" : "No",
        damage_condition:formData.damageCondtion? "Yes" : "No",
        rack_unique_concept:formData.rackConcept? "Yes" : "No",
        category_placement:formData.catPlacement? "Yes" : "No",
        display_pop:formData.displayPop? "Yes" : "No",
        current_stock:formData.currentStock,
        compitor_brand:formData.competitorBrand,
        actual_share_of_life:formData.shareLife,
        compitor_price:formData.competitorPrice,
        emp_code: window.localStorage.getItem("emp_code"),
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      };
      console.log("qop", formData);

      const respond = await axios
        .post(`${url}/api/add_mr_planogram`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
          });
        
          generateEmpCode();
          uploadImage();
          setFormData({
            dateTime:new Date(),

            dealerData: {
              dealerName:   "",
              address:      "",
              contactPerson:"",
            },
   
    productBrand:[],
    productPositioning:false,
    distribution: false,
    promotionalMaterial:false,
    outStock:false,
    labelTagging:false,
    productFacing:false,
    damageCondtion:false,
    rackConcept:false,
    catPlacement:false,
    displayPop:false,
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
        `${dplNo}.${getFileExtension(selectedNewImage)}`
      );

      const response = await axios
        .post(`${url}/api/upload_file`, fd, {
          params: {
            file_path: "planogram",
            dealer_outlet_image_Url: `${dplNo}.${getFileExtension(
              selectedNewImage
            )}`,
            f_planogram_no: dplNo,
          },
        })
        .then(() => {
          setSelectedImage("");
          setSelectedNewImage("");
        });
    } catch (error) {
      console.log("pol", error)
      setSelectedImage("");
      setSelectedNewImage("");
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
        <div className="flex flex-row gap-2">

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
       

          <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date
          </label>
          
          <DatePicker
           className="w-full px-3 py-1  border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
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
            disabled
            
          />
         
        </div>
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
         
            value={JSON.stringify(formData.dealerData)}
            onChange={(e) =>
            {
              let selectedItem= e.target.value ? JSON.parse(e.target.value) :"" ;

              setFormData({
                ...formData,
                dealerData: selectedItem,
              })
            }
              
            }
            
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            
            {dealerData?.map((item, idx) => (
              <option
              key={idx}
              value={JSON.stringify(item)}
            
                className="focus:outline-none focus:border-b bg-white"
              >
                {item.partyName}
              </option>
            ))}
          </select>
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
            value={formData.dealerData ? formData.dealerData.address :""}
          disabled
        
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
            value={formData.dealerData ? formData.dealerData.contactPerson :""}
            
            disabled
          
          />
       
        </div>
        {console.log("zxcv",formData.dealerData)}
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
            value={formData.productBrand}
            onChange={(value) => setFormData({ ...formData, productBrand: value })}
          />
        </div>
      </div>

    

      <h1 className="flex justify-start font-bold m-4">
        {" "}
        <FaUpload className="mr-2 text-blue-400 self-center" />  Click the Tap Photo - Dealer outlet
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
      <div className="container mx-auto px-2  ">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center py-2">
            <span className="flex-1">Product Positioning</span>
            <div className="flex space-x-4">
              <input
                type="radio"
                
                onClick={()=>setFormData({...formData , productPositioning: true})}
                checked={formData.productPositioning===true}
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                
                onClick={()=>setFormData({...formData , productPositioning: false})}
                checked={formData.productPositioning===false}
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
                
                value="Yes"
                className="mr-2"
                onClick={()=>setFormData({...formData , distribution: true})}
                checked={formData.distribution===true}

              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                id="distribution_no"
                name="distribution"
                value="No"
                className="mr-2"
                onClick={()=>setFormData({...formData , distribution: false})}
                checked={formData.distribution===false}
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>
          <li className="flex items-center py-2">
            <span className="flex-1">Promotional Material</span>
            <div className="flex space-x-4">
              <input
                type="radio"
              
               
                className="mr-2"
                onClick={()=>setFormData({...formData , promotionalMaterial: true})}
                checked={formData.promotionalMaterial===true}

              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                
                onClick={()=>setFormData({...formData , promotionalMaterial: false})}
                checked={formData.promotionalMaterial===false}
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
                
                onClick={()=>setFormData({...formData , outStock: true})}
                checked={formData.outStock===true}
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
                
                onClick={()=>setFormData({...formData , outStock: false})}
                checked={formData.outStock===false}
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
                
                onClick={()=>setFormData({...formData , labelTagging: true})}
                checked={formData.labelTagging===true}
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                
                onClick={()=>setFormData({...formData , labelTagging: false})}
                checked={formData.labelTagging===false}
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
                
                onClick={()=>setFormData({...formData , productFacing: true})}
                checked={formData.productFacing===true}
                className="mr-2"
                
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
               
                onClick={()=>setFormData({...formData , productFacing: false})}
                checked={formData.productFacing===false}
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
                
                onClick={()=>setFormData({...formData , damageCondtion: true})}
                checked={formData.damageCondtion===true}
                className="mr-2"
              />
              <label htmlFor="positioning_yes">Yes</label>
              <input
                type="radio"
                
                onClick={()=>setFormData({...formData , damageCondtion: false})}
                checked={formData.damageCondtion===false}
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
                
                onClick={()=>setFormData({...formData , rackConcept: true})}
                checked={formData.rackConcept===true}
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
              
                onClick={()=>setFormData({...formData , rackConcept: false})}
                checked={formData.rackConcept===false}
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
                
                onClick={()=>setFormData({...formData , catPlacement: true})}
                checked={formData.catPlacement===true}
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
               
                onClick={()=>setFormData({...formData , catPlacement: false})}
                checked={formData.catPlacement===false}
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
                
                onClick={()=>setFormData({...formData , displayPop: true})}
                checked={formData.displayPop===true}
                className="mr-2"
              />
              <label htmlFor="distribution_yes">Yes</label>
              <input
                type="radio"
             
                onClick={()=>setFormData({...formData , displayPop: false})}
                checked={formData.displayPop===false}
                className="mr-2"
              />
              <label htmlFor="distribution_no">No</label>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex my-2 flex-row gap-2">
        <div className="fle gap-4 w-full px-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Current Stock
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
          
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
            type="number"
          
            placeholder="Actual Share of Life"
            value={formData.shareLife}
            onChange={(e)=> setFormData({...formData , shareLife: e.target.value})}
          />
        </div>
        </div>
        <div className="flex my-2 flex-row gap-2">
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
            type="number"
         
            placeholder="Compitior Price"
            value={formData.competitorPrice}
            onChange={(e)=> setFormData({...formData, competitorPrice: e.target.value})}
          />
        </div>
        </div>
        
    
      {console.log("njuo", formData)}

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {    
         handleSubmit()
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

// Hydration Error Issue
