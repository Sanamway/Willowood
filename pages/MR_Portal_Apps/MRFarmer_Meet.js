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
import { IoSettingsOutline } from "react-icons/io5";
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

  const getCropInfo = async () => {
    if (new Date())
      try {
        const respond = await axios.get(`${url}/api/get_crop_profile`, {
          headers: headers,
        });
        const apires = await respond.data.data;
        setCropData(
          apires.map((item) => {
            return { value: item.crop_profile_id, label: item.crop_name };
          })
        );
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
    purposeMeet: "",
    meetType: "",
    farmerId: "",
    farmerName: "",
    farmerFatherName: "",
    village: "",
    farmerType: "",
    plotSize: "",
    crop: [],

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
        farmer_mob_no: Number(farmerMobileNumber),
        farmer_id: Number(formData.farmerId),
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

        next_visit_date: moment(formData.nextVisitDate).format(
          "YYYY-MM-DD[T00:00:00.000Z]"
        ),
        status: formData.status,
        emp_code: window.localStorage.getItem("emp_code"),
        t_id: Number(localStorageItems.tId),
        c_id: Number(localStorageItems.cId),
        how_many_farmer: formData.farmerAvailable,
        meeting_address: formData.venueAddress,

        t_presence: formData.territoryPresence,
        dm_presence: formData.devManagerPresence,
        zdm_presence: formData.zoneManagerPresence,
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
          uploadImage();
          setFarmerMobileNumber("");
          generateEmpCode();
          setFormData({
            purposeMeet: "",
            meetType: "",
            farmerId: "",
            farmerName: "",
            farmerFatherName: "",
            village: "",
            farmerType: "",
            plotSize: "",
            crop: [],

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
            devManagerPresence: "",
            zoneManagerPresence: "",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
    }
  };

  const [allState, setAllState] = useState([]);
  const [allStateCityData, setAllStateCityData] = useState([]);
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
  });

  const handleSaveFarmer = async () => {
    try {
      const data = {
        f_demo_code: fMeetCode,
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
            purposeMeet: "",
            meetType: "",
            farmerId: "",
            farmerName: "",
            farmerFatherName: "",
            village: "",
            farmerType: "",
            plotSize: "",
            // crop: [],

            farmerProblems: "",
            cause: "",
            possibleSoln: "",
            techFarmer: "",
            // productBrand: [],
            farmerSuggestion: "",
            expense: "",
            remarks: "",
            potentialFarmer: "Yes",
            nextVisitDate: "",
            status: "Open",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
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
    } catch (error) {}
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
          <span>Farmer Meet</span>
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
      <div className="flex my-2 flex-row gap-2">
        <div className="fle gap-4 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> F Meet Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="F Meet Code"
            value={fMeetCode}
          />
        </div>
        <div className="fle gap-4 w-full px-2 pt-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Meeting Date
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
        <div className="w-full px-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Purpose of Meet
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={formData.purposeMeet}
            onChange={(e) =>
              setFormData({ ...formData, purposeMeet: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Select
            </option>
            <option
              value="Farmer Meet"
              className="focus:outline-none focus:border-b bg-white"
            >
              Farmer Meet
            </option>
            <option
              value="Camapaign Programme"
              className="focus:outline-none focus:border-b bg-white"
            >
              Camapaign Programme
            </option>
            <option
              value="Project Driven Programme"
              className="focus:outline-none focus:border-b bg-white"
            >
              Project Driven Programme
            </option>
            <option
              value="Traning"
              className="focus:outline-none focus:border-b bg-white"
            >
              Traning
            </option>
            <option
              value="Others"
              className="focus:outline-none focus:border-b bg-white"
            >
              Others
            </option>
          </select>
        </div>
        <div className="w-full px-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Meeting Type
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={formData.meetType}
            onChange={(e) => {
              if (
                e.target.value === "Farmer Group Meeting (FGM)" ||
                e.target.value === "Organised Farmer Meeting (OFM)" ||
                e.target.value === "Mega Farmer Meeting (MFM)"
              ) {
                setFormData({
                  ...formData,
                  meetType: e.target.value,
                  territoryPresence: "Yes",
                  devManagerPresence: "Yes",
                  zoneManagerPresence: "Yes",
                });
              } else {
                setFormData({
                  ...formData,
                  meetType: e.target.value,
                  territoryPresence: "No",
                  devManagerPresence: "No",
                  zoneManagerPresence: "No",
                });
              }
            }}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="Individual Farmer Contact (IFC)">
              Individual Farmer Contact (IFC)
            </option>
            <option value="Farmer Group Meeting (FGM)">
              Farmer Group Meeting (FGM)
            </option>
            <option value="Organised Farmer Meeting (OFM)">
              Organised Farmer Meeting (OFM)
            </option>
            <option value="Mega Farmer Meeting (MFM)">
              Mega Farmer Meeting (MFM)
            </option>
            <option value="Retailer Traning Programme (RTP)">
              Retailer Traning Programme (RTP)
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 pt-2 mt-2">
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
              type="text"
              id="inputField"
              placeholder="Farmer Mobile No"
              value={farmerMobileNumber}
              onChange={(e) => {
                handleChangeFarmerNumber(e.target.value);
              }}
            />
            <AiOutlineFileAdd
              size={42}
              className="  self-center size-120 text-black-400 text-blue-400"
              onClick={() => setAddFarmerModal(true)}
            />
          </div>
        </div>

        <div className="w-full px-2 pt-2">
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer ID"
            value={formData.farmerId}
            disabled={true}
          />
        </div>
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 ">
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
        <div className="w-full px-2 pt-2  ">
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
        <div className="w-full px-2 pt-2  ">
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
        <div className="w-full px-2  ">
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
        <div className="w-full px-2  ">
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

      <h1 className="flex justify-start font-bold m-4">
        Farmer Key Person Contact Info
      </h1>

      <div className="flex flex-row my-2 mb-2 ">
        <div className="w-[100%] pl-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Type/Relation
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={farmerContactInfo.type}
            onChange={(e) =>
              setFarmerContactInfo({
                ...farmerContactInfo,
                type: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>

            <option value={"One Farmer"}>One Farmer</option>
            <option value={"Two Farmer"}>Two Farmer</option>
            <option value={"Three Farmer"}>Three Farmer</option>
          </select>
        </div>
        <div className="w-full pr-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2  "
            htmlFor="inputField"
          >
            <small className="text-red-600 ">*</small> Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 lg:w-1/4 px-2 py-2 "
            type="text"
            id="inputField"
            placeholder="Name"
            value={farmerContactInfo.name}
            onChange={(e) =>
              setFarmerContactInfo({
                ...farmerContactInfo,
                name: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-row my-2 mb-2 ">
        <div className="px-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 flex flex-row lg:flex-col "
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Mobile No
          </label>
          <div className="flex flex-row gap-12 lg:mt-12">
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Mobile No"
              value={farmerContactInfo.mobileNo}
              onChange={(e) =>
                setFarmerContactInfo({
                  ...farmerContactInfo,
                  mobileNo: e.target.value,
                })
              }
            />{" "}
            <button
              onClick={() => {
                handleAddFarmerContactInfo();
              }}
              className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm "
            >
              Add +
            </button>
          </div>
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
                Type / Relation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              >
                Mobile No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider sm:tracking-wider md:tracking-wider lg:tracking-wider xl:tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 my-2 ">
            {farmerContactTableData.map((item, index) => (
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
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="flex justify-start font-bold m-4">
        Farmer Meeting Information
      </h1>
      <div className="w-full px-2 pt-2 mt-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2  "
          htmlFor="inputField"
        >
          <small className="text-red-600 ">*</small> Farmer Crop Focus
        </label>
        <Select
          className="basic-single border border-balck-100"
          classNamePrefix="select"
          isMulti={true}
          name="color"
          value={formData.crop}
          options={cropData}
          onChange={(value) => setFormData({ ...formData, crop: value })}
        />
        {console.log("mklj", formData)}
      </div>

      <div className="flex flex-col my-2 mb-2 ">
        <div className="w-full px-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer Problems /
            Challenge Face
          </label>
          <input
            className="w-full h-28 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Problems / Challenge Face"
            value={formData.farmerProblems}
            onChange={(e) =>
              setFormData({ ...formData, farmerProblems: e.target.value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Cause
          </label>
          <input
            className="w-full h-28 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Cause"
            value={formData.cause}
            onChange={(e) =>
              setFormData({ ...formData, cause: e.target.value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Possible Solution
          </label>
          <input
            className="w-full h-28 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Possible Solution"
            value={formData.possibleSoln}
            onChange={(e) =>
              setFormData({ ...formData, possibleSoln: e.target.value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Teach the Techniques to
            Farmer
          </label>
          <input
            className="w-full h-28 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Teach the Techniques to Farmer"
            value={formData.techFarmer}
            onChange={(e) =>
              setFormData({ ...formData, techFarmer: e.target.value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>Push Product Brand
          </label>
          <Select
            className="basic-single border border-balck-100"
            classNamePrefix="select"
            isMulti={true}
            name="color"
            value={formData.productBrand}
            options={productBrandData}
            onChange={(value) =>
              setFormData({ ...formData, productBrand: value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>
            Farmer Suggestion / Opinion / Idea
          </label>
          <input
            className="w-full h-28 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Farmer Suggestion / Opinion / Idea"
            value={formData.farmerSuggestion}
            onChange={(e) =>
              setFormData({ ...formData, farmerSuggestion: e.target.value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>
            How many Farmer Available
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Teach the Techniques to Farmer"
            value={formData.farmerAvailable}
            onChange={(e) =>
              setFormData({ ...formData, farmerAvailable: e.target.value })
            }
          />
        </div>
        <div className="w-full px-2 pt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small>
            Venue Address
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="inputField"
            rows="3"
            placeholder="Enter Address"
            value={formData.venueAddress}
            onChange={(e) =>
              setFormData({ ...formData, venueAddress: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-around ">
          <div className="w-full px-2 pt-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small>
              Territory Presence
            </label>
            <select
              className="w-full px-3  border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 "
              id="userSelect"
              value={formData.territoryPresence}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  territoryPresence: e.target.value,
                })
              }
            >
              <option
                value={""}
                className="focus:outline-none focus:border-b bg-white"
              >
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-full px-2 pt-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small>
              Dev Manager Presence
            </label>
            <select
              className="w-full px-3  border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500  "
              id="userSelect"
              value={formData.devManagerPresence}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  devManagerPresence: e.target.value,
                })
              }
            >
              <option
                value={""}
                className="focus:outline-none focus:border-b bg-white"
              >
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-around ">
          <div className="w-full px-2 pt-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small>
              Zone Dev Manager
            </label>
            <select
              className="w-full px-3  border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 "
              id="userSelect"
              value={formData.zoneManagerPresence}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zoneManagerPresence: e.target.value,
                })
              }
            >
              <option
                value={""}
                className="focus:outline-none focus:border-b bg-white"
              >
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-full px-2 pt-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small>
              Expenses Occurred
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Expenses Occurred"
              value={formData.expense}
              onChange={(e) =>
                setFormData({ ...formData, expense: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <h1 className="flex justify-start font-bold m-4">
        {" "}
        <FaUpload className="mr-2 text-blue-400 self-center" /> Farmer Meet
        Image
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

      <div className="w-full px-2 pt-2">
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
      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Potential Farmer
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
        <div className="w-full px-2 pt-2 mt-2">
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
        <div className="w-full px-2 pt-2 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
            {nextYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex w-full justify-center gap-4 mt-4 ">
        <button
          onClick={() => {
            handleAddFarmerMeet();
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
                      <div className="w-full px-2 pt-2">
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
                      <div className="w-full px-2 pt-2 ">
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
                      <div className="w-full px-2 pt-2 ">
                        <textarea
                          className="w-full px-2 pt-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
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
                      <div className="w-full px-2 pt-2">
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

                      <div className="w-full px-2 pt-2 ">
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

                    <div className="w-full px-2 pt-2">
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
                      <div className="w-full px-2 pt-2">
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

                      <div className="w-full px-2 pt-2 ">
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
                      <div className="w-full px-2 pt-2">
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

                      <div className="w-full px-2 pt-2 ">
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
                      onClick={() => {
                        setAddFarmerModal(false);
                        router.push({
                          pathname: "/MR_Portal_Apps/MRFarmer_Meet",
                        });
                      }}
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
