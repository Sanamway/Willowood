import React, { useState, useEffect, useRef, Fragment } from "react";
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
import { FaArrowLeftLong } from "react-icons/fa6";
import { Popover } from "@headlessui/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsCalendar2Month } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
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
  const [fMeetCode, setFMeetCode] = useState("");
  const generateEmpCode = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_demo_code`, {
        headers: headers,
        params: {
          emp_code: window.localStorage.getItem("emp_code"),
          type: "meet",
        },
      });
      const apires = await respond.data.data;
      setFMeetCode(apires);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateEmpCode();
  }, []);

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

  const [productBrandData, setProductBrandData] = useState([]);
  const getProductDemo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_product_brand`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setProductBrandData(
        apires.map((item) => {
          return { value: item.brand_code, label: item.brand_name };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDemo();
    getCropInfo();
  }, []);

  const currentYear = new Date().getFullYear();
  const nextYears = Array.from(
    { length: 10 },
    (_, index) => currentYear + index
  );

  const [formData, setFormData] = useState({
    purposeMeet: "Farmer Meet",
    meetType: "Individual Farmer Contact (IFC)",
    farmerMobile: "",
    farmerId: "",
    farmerName: "",
    farmerFatherName: "",
    farmerType: "",
    plotSize: "",
    village: "",
    district: "",
    subDis: "",
    state: "",

    farmerProblems: "",
    cause: "",
    possibleSoln: "",
    techFarmer: "",
    productBrand: [],
    farmerSuggestion: "",
    expense: "",
    remarks: "",
    potentialFarmer: "Yes",
    nextVisitDate: new Date(),
    status: "Open",
    farmerAvailable: 0,
    venueAddress: "",
    territoryPresence: "",
    regionPresence: "",
    devManagerPresence: "",
    zoneManagerPresence: "",
  });

  const [farmerContactInfo, setFarmerContactInfo] = useState({
    type: "",
    name: "",
    mobileNo: "",
  });

  const handleAddFarmerMeet = async () => {
    try {
      const data = {
        f_meet_no: fMeetCode,
        meeting_date: moment().format("YYYY-MM-DD[T00:00:00.000Z]"),
        purpose_of_meeting: formData.purposeMeet,
        meeting_type: formData.meetType,
        farmer_mob_no: farmerMobileNumber ? Number(farmerMobileNumber) : null,
        farmer_id: formData.farmerId ? Number(formData.farmerId) : null,
        farmer_name: formData.farmerName,
        farmer_father_name: String(formData.farmerFatherName),
        village: formData.village,
        farmer_type: formData.farmerType,

        plot_size: formData.plotSize,

        farmer_crop_focus: formData.crop.map((item) => item.value),

        potential_farmer: formData.potentialFarmer,
        farmer_problem_or_challange_face: formData.farmerProblems,

        cause: formData.cause,
        possible_sol: formData.possibleSoln,
        tech_the_techniques_to_farmer: formData.techFarmer,
        push_product_brand: formData.productBrand.map((item) => item.value),
        farmer_suggestion_opinion_idea: formData.farmerSuggestion,
        expenses_occured_during_meeting: formData.expense,

        remarks: formData.remarks,

        next_visit_date: formData.nextVisitDate ? moment(formData.nextVisitDate).format(
          "YYYY-MM-DD[T00:00:00.000Z]"
        ) : "",
        status: formData.status,
        emp_code: window.localStorage.getItem("emp_code"),
        t_id: Number(localStorageItems.tId),
        c_id: Number(localStorageItems.cId),
        how_many_farmer: formData.farmerAvailable,
        meeting_address: formData.venueAddress,

        t_presence: formData.territoryPresence,
        r_presence: formData.regionPresence,
        dm_presence: formData.devManagerPresence,
        zdm_presence: formData.zoneManagerPresence,
      };


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
          uploadImage();
          uploadImageFull();
          setFarmerMobileNumber("");
          generateEmpCode();
          setFormData({
            purposeMeet: "",
            meetType: "",
            farmerMobile: "",
            farmerId: "",
            farmerName: "",
            farmerFatherName: "",
            farmerType: "",
            plotSize: "",
            village: "",
            district: "",
            subDis: "",
            state: "",

            crop: [],
            district: "",
            subDis: "",
            state: "",

            farmerProblems: "",
            cause: "",
            possibleSoln: "",
            techFarmer: "",
            productBrand: [],
            farmerSuggestion: "",
            expense: "",
            remarks: "",
            potentialFarmer: "Yes",
            nextVisitDate: "",
            status: "Open",
            farmerAvailable: 0,
            venueAddress: "",
            territoryPresence: "",
            regionPresence: "",
            devManagerPresence: "",
            zoneManagerPresence: "",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
  };


  const [addFarmerModal, setAddFarmerModal] = useState(true);


  const [farmerState, setFarmerState] = useState({
    farmerName: "",
    fatherName: "",
    farmerAddress: "",
    email: "",
    farmerTypes: "Comercial Farming",
    farmerCategory: "Marginal-Below 1.00 hectare",
    landInfo: "",
    mobile: "",
    state: "",
    subDistrict: "",
    district: "",
    subDistrict: "",
    village: "",
    pinCode: "",
    retailer: ""

  });



  const handleSaveFarmer = async () => {
    if (cropGridData.length) {
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
          email: farmerState.email,
          f_address: farmerState.farmerAddress,
          f_cat: farmerState.farmerCategory,
          f_pin: farmerState.pinCode,
          retailer: farmerState.retailer,
          st_id: farmerState.state,
          sub_district: farmerState.subDistrict,
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
            whatsAppMsg(farmerState.farmerName, farmerState.mobile);
            setFarmerState({
              farmerName: "",
              fatherName: "",
              farmerAddress: "",
              email: "",
              farmerTypes: "Subsistence Farming",
              farmerCategory: "Marginal-Below 1.00 hectare",
              landInfo: "",
              mobile: "",
              state: "",
              subDistrict: "",
              district: "",
              village: "",
              pinCode: "",
              retailer: ""
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
    else {
      toast.error("Please Enter atleast one Area/Crop Data to Save Farmer");
    }

  };

  async function whatsAppMsg(
    farmerName, farmerMobile
  ) {
    try {
      const payLoad = {
        recipient: farmerMobile,
        tem_id: "717553",
        placeholders: [
          farmerName,
          farmerMobile,
        ]
      };
      // return;
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("WA", respData);
    } catch (error) {
      console.log("Error", error);
    }
  }

  const [allState, setAllState] = useState([]);
  const [allDist, setAllDist] = useState([]);
  const [allSubDist, setAllSubDist] = useState([]);
  const [allVillage, setAllVillage] = useState([]);
  const getAllState = async (state, district, subDis, village) => {
    try {
      const respond = await axios.get(`${url}/api/get_dist_state`, {
        headers: headers,
        params: {
          state: state,
          district: district,
          sub_district: subDis,
          village: village
        }
      });
      const apires = await respond.data.data;
      if (!state && !district && !subDis) {
        setAllState(apires);
      }
      else if (state && !district && !subDis && !village) {
        console.log("pop", apires)
        setAllDist([...new Set(apires.map((item) => item.district))])

      }
      else if (state && district && !subDis && !village) {
        console.log("pop", apires)
        setAllSubDist([...new Set(apires.map((item) => item.sub_district))])

      }
      else if (state && district && subDis && !village) {
        console.log("pop", apires)
        setAllVillage([...new Set(apires.map((item) => item.village))])

      }
      else if (state && district && subDis && village) {

        setFarmerState({ ...farmerState, pinCode: apires[0].pin_code })

      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllState(farmerState.state, farmerState.district, farmerState.subDistrict, farmerState.village)
  }, [farmerState.state, farmerState.district, farmerState.subDistrict, farmerState.village])


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
        const apires = await respond.data?.data[0];
        console.log("nop", apires);

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
          state: apires.st_id,
          district: apires.ds_id,
          subDis: apires.ds_id,
          village: apires.v_id,

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
        district: "",
        subDis: "",
        state: ""
      });
    }
  };

  const handleAddFarmerContactInfo = async () => {
    try {
      const data = {
        f_meet_no: fMeetCode,
        type_relation: farmerContactInfo.type,
        name: farmerContactInfo.name,
        mob_no: farmerContactInfo.mobileNo,
      };

      const respond = await axios
        .post(`${url}/api/add_farmer_meet_key_person`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Submitted");
          setFarmerContactInfo({ type: "", name: "", mobileNo: "" });
          getFarmerContactTableData(fMeetCode);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      setFarmerContactInfo({ type: "", name: "", mobileNo: "" });
      toast.error(errorMessage);
      getFarmerContactTableData(fMeetCode);
    }
  };

  const [farmerContactTableData, setFarmerContactTableData] = useState([]);

  const getFarmerContactTableData = async (code) => {
    try {
      const respond = await axios.get(`${url}/api/get_farmer_meet_key_person`, {
        headers: headers,
        params: { f_meet_no: code },
      });

      const apires = await respond.data.data;
      setFarmerContactTableData(apires);
    } catch (error) {
      setFarmerContactTableData([]);
      console.log(error);
    }
  };
  useEffect(() => {
    getFarmerContactTableData(fMeetCode);
  }, [fMeetCode]);
  const handleDeleteContact = async (id) => {
    try {
      respond = await axios
        .get(`${url}/api/delete_farmer_meet_key_person`, {
          headers: headers,
          params: { f_meet_key_person_id: id },
        })
        .then((res) => {
          if (!res) return;
          toast.success("Contact deleted successfully!");
          getFarmerContactTableData(fMeetCode);
        });
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
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
        `${fMeetCode}.${getFileExtension(selectedNewImage)}`
      );

      const response = await axios
        .post(`${url}/api/upload_file`, fd, {
          params: {
            file_path: "mr_meet",
            farmer_meet_image_Url: `${fMeetCode}.${getFileExtension(
              selectedNewImage
            )}`,
            f_meet_no: fMeetCode,
          },
        })
        .then(() => {
          setSelectedImage(""), setSelectedNewImage("");
        });
    } catch (error) { }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };




  const [selectedImageFull, setSelectedImageFull] = useState("");
  const [selectedNewImageFull, setSelectedNewImageFull] = useState("");
  const fileInputRefFull = useRef(null);
  const handleImageUploadFull = (event) => {
    const file = event.target.files[0];

    setSelectedNewImageFull(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImageFull(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImageFull = async () => {
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
      const renamedBlob = new Blob([selectedNewImageFull], {
        type: selectedNewImageFull?.type,
      });

      const fd = new FormData();
      fd.append(
        "myFile",
        renamedBlob,
        `${fMeetCode}.${getFileExtension(selectedNewImageFull)}`
      );

      const response = await axios
        .post(`${url}/api/upload_file`, fd, {
          params: {
            file_path: "mr_meet_attendance",
            farmer_meet_attendance_img: `${fMeetCode}.${getFileExtension(
              selectedNewImageFull
            )}`,
            f_meet_no: fMeetCode,
          },
        })
        .then(() => {
          setSelectedImageFull(""), setSelectedNewImageFull("");
        });
    } catch (error) { }
  };
  const triggerFileInputFull = () => {
    fileInputRefFull.current.click();
  };
  const [autoFarmer, setAutoFarmer] = useState("")
  const getAutoFarmerId = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_farmer_id`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          type: "Farmer",
          emp_code: window.localStorage.getItem("emp_code"),
        }
      });

      const apires = await respond.data.data;
      setAutoFarmer(apires)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!addFarmerModal) return
    getAutoFarmerId()
  }, [addFarmerModal])
  const [addFarmerCrop, setAddFarmerCrop] = useState({
    cropId: { value: "", label: "Select Crop", isDisabled: true },
    area: ''
  })







  const handleAddFarmerAreaCrop = async () => {
    try {
      const data = {
        cr_id: addFarmerCrop.cropId.value,
        area: addFarmerCrop.area,
        fr_id: autoFarmer,
        season_name: allCropData.filter((item) => Number(item.cr_id) === Number(addFarmerCrop.cropId.value))[0].season_name,
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
            cropId: '',
            area: ''
          })
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);

    }
  };
  useEffect(() => {

    getCropGrid(autoFarmer)
  }, [autoFarmer])
  const [cropGridData, setCropGridData] = useState([])
  const getCropGrid = async (fId) => {
    if (!fId) return
    try {
      const respond = await axios.get(`${url}/api/get_farmer_cropinfo`, {
        headers: headers,
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
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
          params: {
            c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
            fr_id: autoFarmer,
            cr_id: cropId
          },
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
      <Toaster position="bottom-center" reverseOrder={false} />


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
                  <hr className="bg-blue-600 h-2" />
                  <h3 className="font-bold w-full flex justify-center ">Farmer Registration</h3>
                  <hr className="bg-blue-600 h-2 mb-2" />

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
                          <option value="Less than 1 Acre">
                            Less than 1 Acre
                          </option>
                          <option value="1 - 5 Acre ">
                            1 - 5 Acre
                          </option>
                          <option value="5-20 Acre">
                            5-20 Acre
                          </option>
                          <option value="Greater than 20 Acre">
                            Greater than 20 Acre
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
                          onChange={(e) => {
                            setFarmerState({
                              ...farmerState,
                              state: e.target.value,
                              district: "",
                              subDistrict: "",
                              village: "",
                              pinCode: ""
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
                              subDistrict: "",
                              village: "",
                              pinCode: ""
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
                              village: "",
                              pinCode: ""
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
                              pinCode: ""

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
                          value={farmerState.pinCode}
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
                    <hr className="bg-gray-600 h-2" />
                    <h3 className="w-full  flex justify-center items-center font-bold">Area / Crop Info</h3>
                    <hr className="bg-gray-600 h-2" />
                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">

                        {/* <Select
                          options={[
                            { value: "", label: "Select Crop", isDisabled: true }, // ✅ Default placeholder option
                            ...allCropData?.map((item) => ({ value: item.cr_id, label: item.crop_name }))
                          ]}
                          placeholder="Select Crop" // ✅ Sets the placeholder

                          className="w-full text-sm  border border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          value={allCropData?.find((item) => item.cr_id === addFarmerCrop.cropId) || { value: "", label: "Select Crop" }} // ✅ Ensure the selected value matches format
                          onChange={(item) => setAddFarmerCrop({ ...addFarmerCrop, cropId: item.value })}
                        /> */}
                        {console.log("nmk", addFarmerCrop)}
                        <Select
                          options={[
                            { value: "", label: "Select Crop", isDisabled: true }, // Default disabled option
                            ...allCropData?.map((item) => ({ value: item.cr_id, label: item.crop_name }))
                          ]}

                          className="w-full text-sm  border border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                          value={addFarmerCrop.cropId}
                          onChange={(item) => {


                            setAddFarmerCrop({ ...addFarmerCrop, cropId: item })
                          }
                          }

                        />

                      </div>

                      <div className="w-1/2 px-2 ">
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="inputField"
                          placeholder="Area"
                          value={addFarmerCrop.area}
                          onChange={(e) => setAddFarmerCrop({ ...addFarmerCrop, area: e.target.value })}
                        />
                      </div>

                      <div className="w-1/2  ">
                        <button type="button"
                          className="inline-flex justify-center  text-white rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium "
                          onClick={() => {
                            handleAddFarmerAreaCrop()

                          }}
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
                      onClick={() => {
                        handleSaveFarmer()
                      }
                      }
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center text-white rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium  hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        router.push({
                          pathname: "/MR_Portal_Apps/MRHome",
                        })
                      }
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
