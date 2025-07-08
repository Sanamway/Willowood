import React, { useState, useEffect,useRef } from "react";
import Image from "next/image";
import DepoAddModal from "../modals/DepoAddModal";
import { AiOutlineDelete } from "react-icons/ai";
import Select from "react-select";
import axios from "axios";
import { url, url2 } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import DealerPersonal from "../modals/DealerPersonal";
import AssetPersonal from "../modals/AssetPersonal";
import { MdCancel } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import PersonalTabModal from "../modals/PersonalTabModal";

const Personal = (props) => {
  const router = useRouter();
  const inputRef = useRef(null)
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [secondForm, setSecondForm] = useState({
    assets: "",
    category: "",
    areas: "",
    market_valuation: ""
  });

  const [noPart, setNoPart] = useState(null);
  const [linkSRC, setlinkSRC] = useState(null)
  const[imgPrv, setImgPrv] = useState(null)


  const [personalData, setPersonalData] = useState({
    party_Name: "",
    name: "",
    pmobile: "",
    smobile: "",
    pemailid: "",
    contact_person: "",
    address: "",
    postal_Address: "",
    searchCity: {
      value: "",
      label: "",
      state: "",
      country: ""
    },
    pin: "",
    dob_date: "",
    doa: "",
    pmartial: "",
    d_id: "",
    appl_no: "",
    app_date: "",
    desig: "",
    imageSrc: "",
    district: ""
  });

  useEffect(() => {
    if (props)
      setPersonalData({
        ...personalData,
        d_id: props?.data?.[0]?.d_id || "",
        appl_no: props?.data?.[0]?.appl_no || "",
        app_date: props?.data?.[0]?.app_date || "",
        party_Name: props?.data?.[0]?.party_Name || "",
        imageSrc:""
      });
  }, [props]);

  //Adding Data Api

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [reload, setReload] = useState(false);

  const handleAddPersonal = async () => {
    
    if (personalData?.pmobile.length < 10) {
      setTimeout(() => {
        toast.error("Enter the valid number");
      }, 1500);
    }
    try {
      const data = {
        d_id: personalData?.d_id,
        appl_no: personalData?.appl_no,
        app_date: personalData?.app_date,
        party_Name: personalData?.party_Name,
        name: personalData?.name,
        pmobile: personalData?.pmobile,
        pemailid: personalData?.pemailid,
        address: personalData?.address,
        postal_Address: personalData.postal_Address,
        city: personalData?.searchCity?.label,
        state: personalData?.searchCity?.state,
        country: personalData?.searchCity?.country,
        pin: personalData.pin,
        contact_person: personalData.contact_person,
        smobile: personalData.smobile,
        dob_date: personalData?.dob_date,
        doa: personalData?.doa,
        pmartial: personalData?.pmartial,
        desig: personalData?.desig,
        district: personalData?.district,
        imageSrc: personalData?.imageSrc,
        app_status: "Update Personal"
      };
      console.log("addd", data);
      // return
      const res = await axios.post(`${url}/api/add_dealerpersonal`, JSON.stringify(data), {
        headers: headers
      });
      const resp = await res.data;
      if (!res) return;
      toast.success("New Personal Added Successfully");
      setTimeout(() => {
        setPersonalData({
          ...personalData,
          name: "",
          address: "",
          postal_Address: "",
          contact_person: "",
          pmartial: "",
          pmobile: "",
          smobile: "",
          dob_date: "",
          pemailid: "",
          desig: "",
          searchCity: {
            value: "",
            label: "",
            state: "",
            country: ""
          },
          pin: "",
          district: "",
          imageSrc:""
        });
        setReload(!reload);
        setfileOption(false);
        props.formType("Personal");
      }, [2000]);
      // console.log("apipers", resp);
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      if (newErrors.mobile) toast.error(newErrors.mobile);
    }
  };

  //getting personal dealer
  const [ptableData, setPTableData] = useState([]);
  const [ispabLength, setptabLength] = useState(false);

  const personalGetDetails = async () => {
    try {
      const res = await axios.get(`${url}/api/get_dealerpersonal?d_id=${router.query.id}`, {
        headers: headers
      });
      const apiRes = await res.data.data;
      setPTableData({
        ...ptableData,
        name: apiRes[0]?.name || "",
        dob_date: apiRes[0]?.dob_date,
        pmartial: apiRes[0]?.pmartial,
        address: apiRes[0]?.address,
        postal_Address: apiRes[0]?.postal_Address,
        city: apiRes[0]?.searchCity?.label,
        state: apiRes[0]?.searchCity?.state,
        country: apiRes[0]?.searchCity?.country,
        pin: apiRes[0]?.pin,
        contact_person: apiRes[0]?.contact_person,
        smobile: apiRes[0]?.smobile,
        doa: apiRes[0]?.doa,
        pmartial: apiRes[0]?.pmartial,
        district: apiRes[0]?.district,
        imageSrc: apiRes[0]?.imageSrc,
        app_status: "Update Personal"
      });
      setPTableData(apiRes);
      // console.log("getttt", apiRes);
      setptabLength(true);
    } catch (error) {
      // console.log("getDealer", error?.response?.data);
      if (error?.response?.data?.message) {
        setReload(true);
        setptabLength(false);
      }
    }
  };

  useEffect(() => {
    personalGetDetails();
  }, [props, reload]);

  const [isOpen, setisOpen] = useState(false);
  const [isOpenTwo, setisOpenTwo] = useState(false);
  const [isOpenThree, setisOpenThree] = useState(false);
  const [userId, setUserId] = useState(null);
  const [assetId, setAssetId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const AssetdeleteHandler = (id) => {
    setisOpenTwo(true);
    setAssetId(id);
  };

  function openImageHandler(id){
    console.log("iddd", id);
    // if(id){
      setisOpenThree(true);
      console.log("Checkss", id)
      const newImg = linkSRC[id]?.src 
      // setImgPrv(newImg)
      newImg !==null ?  setImgPrv(newImg) :null
    // }

  }

  const [citySearch, setCitySearch] = useState("");
  const [filteredCity, setFilteredCity] = useState([]);

  const getCityData = async (city) => {
    try {
      const resp = await axios.get(`${url}/api/get_citystate`, {
        params: { city: city, search: true },
        headers: headers
      });
      const response = await resp.data.data;
      setFilteredCity(
        response.map((item) => {
          return {
            value: item?.city,
            label: item?.city,
            state: item?.state,
            country: item?.country
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (citySearch) {
      getCityData(citySearch);
    }
  }, [citySearch]);

  const resetData = () => {
    personalGetDetails();
    setisOpen(false);
  };

  /////......................Assets................./////

  const [assetsForm, setAssetsForm] = useState({
    asset_name: "",
    asset_cat: "",
    acrearea: "",
    market_val: ""
  });

  const [secondTableData, setSecondTabData] = useState([]);
  const [assetRender, setAssetRender] = useState(false);
  const [isLength, setLength] = useState(true);

  const addAssetsHanlder = async () => {
    try {
      const data = {
        d_id: props?.data?.[0]?.d_id || "",
        asset_name: assetsForm.asset_name,
        asset_cat: assetsForm.asset_cat,
        acrearea: assetsForm.acrearea,
        market_val: assetsForm.market_val,
        app_status: "Update Personal"
      };
      console.log("apiassdata", data);
      // return
      const resp = await axios.post(`${url}/api/add_dealerfixedasset`, JSON.stringify(data), {
        headers: headers
      });
      const apiRes = await resp.data.data;

      if (!apiRes) return;
      toast.success(resp?.data?.message);
      setTimeout(() => {
        setAssetsForm({
          ...assetsForm,
          asset_name: "",
          asset_cat: "",
          acrearea: "",
          market_val: ""
        });
        setAssetRender(!assetRender);
      }, 1000);
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      if (newErrors.mobile) toast.error(newErrors.mobile);
    }
  };

  const [assetsCategory, setAssetCategories] = useState([]);

  async function assetCategory() {
    try {
      const res = await axios.get(`${url}/api/get_asset_category`, { headers: headers });
      const resp = await res.data.data;
      setAssetCategories(resp);
    } catch (error) {
      console.log("assetCat", error);
    }
  }

  const getassetDealer = async () => {
    try {
      const res = await axios.get(`${url}/api/get_dealerfixedasset?d_id=${router.query.id}`, {
        headers: headers
      });
      const resp = await res.data.data;
      setSecondTabData(resp);
      setLength(true);
    } catch (error) {
      if (error?.response?.data?.message) {
        setLength(false);
      }
    }
  };

  useEffect(() => {
    getassetDealer();
  }, [props, assetRender]);

  useEffect(() => {
    assetCategory();
  }, []);

  const resetassetData = () => {
    getassetDealer();
    setisOpenTwo(false);
  };

  ///*******************************Update Personal Handler************************ */

  const handleUpdatePersonal = async () => {
    if (!props.data?.[0]?.address) {
      toast.error("Update the basic details first");
      return;
    }
    try {
      const data = {
        party_Name: props?.data?.[0]?.party_Name || "",
        pmobile: props.data?.[0]?.pmobile || "",
        smobile: props.data?.[0]?.smobile || "",
        pemail: props.data?.[0]?.pemail || "",
        contact_person: props.data?.[0]?.contact_person || "",
        address: props.data?.[0]?.address || "",
        postal_Address: props.data?.[0]?.postal_Address || "",
        district: props.data?.[0]?.district || "",
        pincode: props.data?.[0]?.pincode || "",
        city: props.data?.[0]?.city || "",
        country: props.data?.[0]?.country || "",
        state: props.data?.[0]?.state || "",
        app_status: "Update Personal"
      };

      console.log("updateData", data);
      const respond = await axios
        .put(`${url}/api/update_dealerbasic/${router.query.id}`, JSON.stringify(data), {
          headers: headers
        })
        .then((res) => {
          if (!res) return;
          toast.success("Personal Details Updated!!");
          setTimeout(() => {
            props.formType("BusinessInfo");
          }, [2000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  const nextTabHandler = () => {
    // if (secondTableData.length > 0 && isLength && ptableData?.length > 0 && ispabLength) {
    if (ptableData?.length > 0 && ispabLength) {
      if (ptableData.length < noPart) {
        toast.error("Add Atleast the Desired Number of Details", noPart);
        return;
      }
      //this handleUpdate commented because update dealer endpoint is same and checking the basic fields where
      // validation is required... So can't invoke this handler for personal update for app status.
      // handleUpdatePersonal();
      props.formType("BusinessInfo");
    } else {
      // toast.error("Atleast one record required for Personal or Asset information ");
      toast.error("Atleast one record required for Personal information ");
    }
  };

  const [mainText, setMainText] = useState("Personal");

  useEffect(() => {
    if (props?.data?.[0]?.nature_firm == "Residential Individual") {
      setMainText("Personal Info");
    }
    if (props?.data?.[0]?.nature_firm == "Domestic Company") {
      setMainText("Company Info");
    }
    if (props?.data?.[0]?.nature_firm == "Proprietary Concern") {
      setMainText("Proprietar Info");
    }
    if (props?.data?.[0]?.nature_firm == "Partnership Firm") {
      setMainText("Partner Info");
    }
  }, [props]);

  // console.log("PerProps", props);

  useEffect(() => {
    if (props) {
      setNoPart(props?.data[0]?.no_part);
    }
  }, [props]);

  //Uploading Image

  const checkFileSize = (file) => {
    const maxSize = 400000;
    if (file.size > maxSize) {
      toast.error("Image Size Must be Less than 200 KB");
      return false;
    }
    return true;
  };

  //State for the Files Upload
  const [isFrontFile, setFrontFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  //handler for Front Image Upload
  const max_Length = 1;
  const [fileOption, setfileOption] = useState(false);

  const handleFrontImage = (e) => {
    try {
      const file = e.target.files[0];
      if (!checkFileSize(file)) {
        return;
      }
      setFrontFile(file);

      if (file) {
        // setfileOption(true)
        setUserImage(URL.createObjectURL(file));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


 

  //delete file handlers

  const handleDeleteFileFront = (e) => {
    setUserImage("");
  };

  //Upload Front File Handler
  const config = {
    onUploadProgress: (progressEvent) => {
      setProgress((prev) => {
        return { ...prev, pc: progressEvent.progress * 100 };
      });
    }
  };
  //Max Length For File Upload
  const handleUploadFront = () => {
    try {
      if (!isFrontFile) {
        toast.error("No File Selected");
        return;
      }

      if (!checkFileSize(isFrontFile)) {
        return;
      }

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      const renamedBlob = new Blob([isFrontFile], { type: isFrontFile?.type });
      // const genrandomID = crypto.randomUUID();
      // const randomID = genrandomID.substring(4, 11);
      const fd = new FormData();
      fd.append(
        "myFile",
        renamedBlob,
        `${"PF" + "_" + props?.data?.[0]?.appl_no}.${getFileExtension(isFrontFile?.name)}`
      );
      setMsg("Uploading....");
      setProgress((prev) => {
        return { ...prev, started: true };
      });
      axios
        .post(
          `${url}/api/upload_file/?file_path=dealer&c_id=${"1"}&d_id=${router.query.id}&app_date=${
            props?.data?.[0]?.app_date
          }&appl_no=${props?.data?.[0]?.appl_no}&doc_type=PTAB_FRONT`,
          fd,
          config
        )
        .then((res) => {
          setMsg("Upload Successful");
          setfileOption(true);
          toast.success("Uploaded Successfully");
          setTimeout(() => {
            setProgress({ started: false, pc: 0 });
            setUserImage("");
            inputRef.current.value = ""
            setFrontFile(null);
            setMsg(null);
          }, 2000);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("ee", error);
    }
  };

  //Getting the Uploaded Images
  const getUploadedImages = async (d_id, doc_type) => {
    try {
      const res = await axios.get(
        `${url}/api/get_image?file_path=dealer&c_id=1&d_id=${d_id}&doc_type=${doc_type}`
      );
      const apiRes = await res.data.data.src[0].src;
      const apires = await res.data.data.src;
      setPersonalData({
        ...personalData,
        imageSrc:apiRes
      })
  
      setlinkSRC(apires)
    
      console.log("PartnerImg", apires);
    } catch (error) {}
  };
  useEffect(() => {
    if(fileOption || (isOpenThree || assetId)){
      getUploadedImages(router.query.id, "PTAB_FRONT");
    }
  }, [fileOption ,isOpenThree]);


  //disbaling next button

  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    if (props) {
      try {
        if (
          props?.data[0]?.app_status == "Approved By Region" ||
          props?.data[0]?.app_status == "Approved By Zonal" ||
          props?.data[0]?.app_status == "Approved By Business Unit" ||
          props?.data[0]?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, [props]);


  //getting some ids from localStorage
  const [localObj, setLocalObj] = useState({});


  useEffect(() => {
    if (window) {
      const localData = localStorage?.getItem("userinfo");
      const parsedData = JSON.parse(localData) || {};
      setLocalObj({
        c_id: parsedData?.c_id || "",
        b_id: parsedData?.bg_id || "",
        bu_id: parsedData?.bu_id || "",
        z_id: parsedData?.z_id || "",
        r_id: parsedData?.r_id || "",
        t_id: parsedData?.t_id || ""
      });
    }
  }, [props]);

 
  const [districtList, setDistrictList] = useState(null);
  const getDistrictLis = async () => {
    const res = await axios.get(`${url}/api/get_dist_state?c_id=${localObj?.c_id}`, { headers });
    const apiRes = await res?.data?.data;
    console.log("District List", apiRes);
    setDistrictList(apiRes);
  };

  useEffect(() => {
    getDistrictLis();
  }, [props]);


  ///////////////////////////.........JSX starts.............../////////////////////////

  return (
    <form className=" bg-white rounded  p-4 w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2">
        <DealerPersonal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="get"
          onDeletedData={resetData}
          endpoints="delete_dealerpersonal"
        ></DealerPersonal>

        <AssetPersonal
          isOpen={isOpenTwo}
          onClose={() => setisOpenTwo(false)}
          onOpen={() => setisOpenTwo(true)}
          userId={assetId}
          method="get"
          onDeletedData={resetassetData}
          endpoints="delete_dealerfixedasset"
        ></AssetPersonal>

        <PersonalTabModal
        isOpen={isOpenThree}
        onClose={() => setisOpenThree(false)}
        onOpen={()=>setisOpenThree(true)}
        linkSrc={imgPrv}
        >
        </PersonalTabModal>

        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Party Name"
            value={personalData.party_Name}
            onChange={(e) => setPersonalData({ ...personalData, party_Name: e.target.value })}
            disabled
          />
        </div>
      </div>

      <div className="flex justify-start items-center  w-full my-4">
        <h2 className="font-arial font-normal text-center lg:text-left text-xl py-2 border-dashed mx-2  border-t-2 w-full border-b-2 border-l-0 border-r-0">
          {/* Personal Information :{" "} */}
          {mainText}
        </h2>
      </div>

      <div className="flex flex-col  my-2 mb-2 lg:flex-row  justify-center">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Name"
            value={personalData.name}
            onChange={(e) => {
              const inputValue = e.target.value;
              const re = /^[A-Za-z\s]*$/;
              if (re.test(inputValue) || inputValue === "") {
                setPersonalData({ ...personalData, name: inputValue });
              }
            }}
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Address"
            value={personalData.address}
            onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> City
          </label>
          <Select
            className="w-full px-2  border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            value={personalData?.searchCity}
            isSearchable={true}
            name="color"
            options={filteredCity}
            onChange={(value) =>
              setPersonalData({
                ...personalData,
                searchCity: value
              })
            }
            onInputChange={(searchVal) => setCitySearch(searchVal)}
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="inputField">
            <small className="text-red-600 ">*</small> District
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData?.district}
            onChange={(e) => {
              setPersonalData({
                ...personalData,
                district: e.target.value
              });
            }}
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {/* <option value="District One">District One</option>
            <option value="District Two">District Two</option>
            <option value="District Three">District Three</option>
            <option value="District Four">District Four</option> */}
            {districtList?.map((district, index) => (
              <option key={index} value={district.district}>
                {district.district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> State
          </label>
          <input
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData?.searchCity?.state}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                state: value
              })
            }
            disabled
          ></input>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Country
          </label>
          <input
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData?.searchCity?.country}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                state: value
              })
            }
            disabled
          ></input>
        </div>
      </div>

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pin Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Pin Code"
            maxLength={6}
            value={personalData.pin}
            onChange={(e) => {
              if (e.target.value.length > 6) {
                return;
              }
              setPersonalData({ ...personalData, pin: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Contact Person
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Contact Person"
            value={personalData.contact_person}
            onChange={(e) => {
              const inputValue = e.target.value;
              const re = /^[A-Za-z\s]*$/;
              if (re.test(inputValue) || inputValue === "") {
                setPersonalData({ ...personalData, contact_person: inputValue });
              }
            }}
          />
        </div>

        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Designation
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData?.desig}
            onChange={(e) => {
              setPersonalData({
                ...personalData,
                desig: e.target.value
              });
            }}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="Residential Individual">Residential Individual</option>
            <option value="Domestic Company">Domestic Company</option>
            <option value="Proprietary Concern">Proprietary Concern</option>
            <option value="Partnership Firm">Partnership Firm</option>
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Primary Mobile
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Primary Mobile"
            maxLength={10}
            minLength={10}
            value={personalData.pmobile}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                return;
              }
              setPersonalData({ ...personalData, pmobile: e.target.value });
            }}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> Secondary Mobile
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Secondary Mobile"
            value={personalData.smobile}
            maxLength={10}
            minLength={10}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                return;
              }
              setPersonalData({ ...personalData, smobile: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            id="inputField"
            placeholder="Email"
            value={personalData.pemailid}
            onChange={(e) => setPersonalData({ ...personalData, pemailid: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> DOB
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="date"
            id="inputField"
            placeholder="date"
            // value={moment(personalData?.dob_date).format("YYYY-MM-DD")}
            value={personalData?.dob_date}
            onChange={(e) => setPersonalData({ ...personalData, dob_date: e.target.value })}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Marital Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={personalData.pmartial}
            onChange={(e) => setPersonalData({ ...personalData, pmartial: e.target.value })}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>
        {personalData.pmartial == "married" ? (
          <div className="w-full px-2 ">
            <label className="block text- text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Date of Anniversary
            </label>
            <input
              className=" w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="date"
              id="inputField"
              placeholder="Anniversary Date"
              value={personalData.doa}
              onChange={(e) => setPersonalData({ ...personalData, doa: e.target.value })}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex  items-center justify-center">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Upload
          </label>
          <div className="flex gap-4 flex-col">
            <input
              className="w-full px-3  py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="file"
              ref={inputRef}
              disabled={fileOption}
              id="inputField"
              accept=".jpeg,.jpg, .png"
              placeholder="date"
              onChange={handleFrontImage}
            />
            {userImage !== "" && (
              <div className="flex items-center justify-center">
                <button className="bg-red-100 px-2 py-1 my-2 rounded-md" onClick={handleUploadFront}>
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {router.query.type === "Edit" && (
        <div className="my-3 flex items-center justify-end w-full px-2">
          <button
            onClick={() => {
              handleAddPersonal();
            }}
            className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
          >
            Add +
          </button>
        </div>
      )}

      {/* table  */}

      {/* <div className="overflow-x-auto chat-scrollbar select-none w-full h-36"> */}
      <div className="overflow-x-auto chat-scrollbar select-none w-full md:w-full md:relative h-30">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
          <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
            <tr className="">
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                Name
              </th>

              <th className="px-4 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Contact
              </th>

              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Primary Mob
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Designation
              </th>
              <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Image
              </th>
              <th className="px-2 py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          {!ispabLength ? (
            <h2>No Data Found</h2>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200 break-normal ">
              {ptableData?.length > 0 ? (
                ptableData?.map((item, index) => (
                  <tr key={item?.id}>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.name}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.contact_person}
                    </td>

                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.pmobile}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.desig}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                     <button
                        onClick={() => openImageHandler(index)}
                        className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                      >
                        {<FaEye className="hover:text-red-500"></FaEye>}
                      </button>
                    </td>
                    <td className="px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                      <button
                        onClick={() => deleteHandler(item)}
                        className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                      >
                        {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // <Skeleton></Skeleton>
                <>
                  <p>No Data Found</p>
                </>
              )}
            </tbody>
          )}
        </table>
      </div>

      <div className="flex justify-start items-center  w-full  mt-10 md:mt-12">
        <h2 className="font-arial font-normal text-center lg:text-left text-xl py-2 border-dashed  border-t-2 mx-2 w-full border-b-2 border-l-0 border-r-0">
          Assets Information :{" "}
        </h2>
      </div>

      {/* seconds form  */}

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">* </small> Assets
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={assetsForm?.asset_name}
            placeholder="Assets"
            onChange={(e) => {
              setAssetsForm({
                ...assetsForm,
                asset_name: e.target.value
              });
            }}
            disabled={formActive}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">* </small> Category
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={assetsForm.asset_cat || ""}
            onChange={(e) => {
              setAssetsForm({
                ...assetsForm,
                asset_cat: e.target.value
              });
            }}
            disabled={formActive}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            {assetsCategory.map((option) => (
              <option
                value={option?.asset_cat}
                onChange={(e) => {
                  setAssetsForm({
                    ...assets,
                    asset_cat: e.target.value
                  });
                }}
                className="focus:outline-none focus:border-b bg-white"
              >
                {option?.asset_category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"> </small> Acres/Area
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Acres Area"
            value={assetsForm?.acrearea}
            onChange={(e) => {
              setAssetsForm({
                ...assetsForm,
                acrearea: e.target.value
              });
            }}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">* </small>Market Valuation
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Market Valuation"
            value={assetsForm?.market_val}
            onChange={(e) => {
              setAssetsForm({
                ...assetsForm,
                market_val: e.target.value
              });
            }}
          />
        </div>
      </div>

      {router.query.type === "Edit" && (
        <div className="my-3 flex items-center justify-end px-2">
          <button
            // onClick={() => {
            //   deleteHandler("");
            // }}
            onClick={() => {
              addAssetsHanlder();
            }}
            className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
          >
            Add +
          </button>
        </div>
      )}

      {/* tables */}

      <div className="overflow-x-auto chat-scrollbar select-none w-full h-36">
        <div className="text-left p-1.5 px-2">
          {/* <h2 className="text-[0.78rem] text-gray-600 font-bold">Recent Order Status</h2> */}
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
          <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
            <tr className="">
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                Asset
              </th>
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Category
              </th>
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Acres/Area
              </th>
              <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                Market Valuation
              </th>
              <th className="px-2 py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          {!isLength ? (
            <p>No data found</p>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200 break-normal ">
              {secondTableData?.length ? (
                secondTableData?.map((item) => (
                  <tr key={item?.id}>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.asset_name}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.asset_cat}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.acrearea}
                    </td>
                    <td
                      className={`px-2 text-left whitespace-nowrap py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                    >
                      {item?.market_val}
                    </td>
                    <td className="px-2 text-center whitespace-nowrap py-1 text-[0.6rem] text-gray-900 border">
                      <button
                        onClick={() => AssetdeleteHandler(item)}
                        className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                      >
                        {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* upload image  */}

      {/* <div className="flex my-2 items-center justify-center w-full py-4">
        <div className="wrap flex flex-col items-center  ">
          <div className="profpic relative group">
            <img
              src={userImage ? userImage : userImage}
              className="h-32 w-32 bg-gray-200"
              alt="front image"
              width={100}
              height={100}
            />
            <input
              type="file"
              accept=".jpeg,.jpg, .png"
              // onChange={handleFrontImage}
              style={{ display: "none" }}
              id="fileInput"
              disabled={router.query.type == "view"}
            />
            <label
              htmlFor="fileInput"
              className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                userImage == "" ? "opacity-50" : "opacity-0"
              } ${
                userImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
              }  transition-opacity duration-300`}
            >
              <span
                className={`text-red-500 flex items-center absolute -top-14 right-0 justify-center ${
                  userImage == "" ? "group-hover:opacity-0" : "group-hover:opacity-100"
                }`}
              >
                <MdCancel
                  onClick={handleDeleteFileFront}
                  className={`${userImage == "" ? "hidden" : "block"}`}
                  size={29}
                ></MdCancel>
              </span>{" "}
              <span
                className={`${
                  userImage !== "" ? "group-hover:opacity-0" : "group-hover:opacity-100"
                } text-xs whitespace-nowrap`}
              >
                Upload Front Image
              </span>
            </label>
          </div>
          {userImage !== "" && (
            <button className="bg-red-100 px-2 py-1 my-2 rounded-md" onClick={handleUploadFront}>
              Upload
            </button>
          )}
        </div>
      </div> */}

      {/* buttons */}
      {router.query.type === "Edit" && (
        <div className="my-6 flex items-center justify-center  ">
          <div className="flex items-center justify-center w-full gap-4 ">
            <button
              onClick={() => props.formType("AdditionalInfo")}
              className={`text-center rounded-md hover:bg-green-500 ${
                formActive ? "bg-green-400" : "bg-gray-400"
              }  text-white py-1 px-4 text-lg`}
            >
              Prev
            </button>
            <button
              disabled={disableNext}
              onClick={nextTabHandler}
              className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Personal;
