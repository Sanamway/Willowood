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
    farmerId: "",
    farmerName: "",
    farmerFatherName: "",
    village: "",
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
        shc_date: moment(new Date()).format("YYYY-MM-DD[T00:00:00.000Z]"),
        farmer_mob_no: Number(farmerMobileNumber),
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
        f_demo_code: fShcCode,

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
        });
    } catch (errors) {
      console.log("kop", errors);
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
        const respond = await axios.get(`${url}/api/get_mr_form_demo`, {
          headers: headers,
          params: {
            mob_no: number,

            t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,

            c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,

            emp_code: window.localStorage.getItem("emp_code"),
          },
        });
        const apires = await respond.data.data.MR_demo[0];
        setFormData({
          ...formData,

          farmerId: apires.farmer_id,
          farmerName: apires.farmer_name,
          farmerFatherName: apires.farmer_father_name,
          village: apires.village,
          farmerType: apires.farmer_type,
          plotSize: apires.plot_size,
        });
      } catch (error) {
        setFormData({
          ...formData,
        });
      }
    } else {
      setFormData({
        farmerId: "",
        farmerName: "",
        farmerFatherName: "",
        village: "",
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
                      // onClick={() =>
                      //   router.push({
                      //     pathname: "MR_Farmer_list_demo",
                      //   })
                      // }
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
            <small className="text-red-600">*</small> F .SHC No
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

      <div className="flex flex-col my-2 ">
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

        <div className="w-full px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Farmer ID
          </label>
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

      <h2 className="whitespace-nowrap w-48 self-center font-bold ml-2">
        Soil Sample Details
      </h2>
      <div className="flex flex-col ">
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Nitrogen:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
        <div className="w-full px-2 mt-2 flex flex-row gap-1">
          <h2 className="whitespace-nowrap w-48 self-center font-bold">
            Sulphur:{" "}
          </h2>

          <input
            type="number"
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
            className=" border-gray-300 border rounded-md w-28"
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
        </div>
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
          onClick={() => {}}
          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
        >
          Close
        </button>
      </div>

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
                      onClick={() => {
                        setAddFarmerModal(false);
                        router.push({
                          pathname: "/MR_Portal_Apps/MRFarmer_SHC",
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
    </form>
  );
};

export default AdditionalInfo;
