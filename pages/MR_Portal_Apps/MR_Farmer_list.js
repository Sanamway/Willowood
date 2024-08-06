import React, { useState, useEffect, Fragment } from "react";

import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { FaArrowLeftLong } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
import { Dialog, Transition } from "@headlessui/react";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { FaMobileRetro } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { FaArrowAltCircleUp } from "react-icons/fa";

const AdditionalInfo = (data) => {
  console.log("pop", data);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();
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
    // postOffice: "",
  });

  const handleSaveFarmer = async () => {
    if (farmerState.mobile.length < 10) {
      toast.error("Please Enter 10 digit Mobile Number");
      return;
    }
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
        st_id: farmerState.state,
        c_name: localStorageItems.clName,
        ul_name: localStorageItems.ulName,
      };

      console.log("New Data", data);
      const respond = await axios
        .post(`${url}/api/add_farmer`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          console.log("nji", res);

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
  const [farmerListData, setFarmerListData] = useState([]);
  const getFarmerDetails = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_farmer`, {
        headers: headers,
        params: {
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        },
      });

      const apires = await respond.data.data;
      setFarmerListData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getFarmerDetails();
  }, []);

  const handleDeleteFarmer = (id) => {
    setisOpen(true);
    setFarmerId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [farmerId, setFarmerId] = useState(null);

  const resetData = () => {
    getFarmerDetails();
    setisOpen(false);
  };

  const [allfilterState, setAllFilterState] = useState({
    number: null,
    from: null,
    to: null,
    dateShortDecend: "desc",
    mobShortDecend: "",
    nameShortDecend: "",
    villShortDecend: "",
  });

  useEffect(() => {
    getFarmerDetailsByNumber(
      allfilterState.number,
      allfilterState.from,
      allfilterState.to,
      allfilterState.dateShortDecend,
      allfilterState.mobShortDecend,
      allfilterState.nameShortDecend,
      allfilterState.villShortDecend
    );
  }, [
    allfilterState.number,
    allfilterState.from,
    allfilterState.to,
    allfilterState.dateShortDecend,
    allfilterState.mobShortDecend,
    allfilterState.nameShortDecend,
    allfilterState.villShortDecend,
  ]);

  const getFarmerDetailsByNumber = async (
    mobile,
    from,
    to,
    date,
    mob,
    name,
    vill
  ) => {
    console.log("Awaj ", mobile, from, to, date, mob, name, vill);
    let field = null;
    let order = null;
    if (date === "desc") {
      field = "createdAt";
      order = "desc";
    } else if (date === "aesc") {
      field = "createdAt";
      order = "aesc";
    } else if (mob === "desc") {
      field = "farmer_mob_no";
      order = "desc";
    } else if (mob === "aesc") {
      field = "farmer_mob_no";
      order = "aesc";
    } else if (name === "desc") {
      field = "farmer_name";
      order = "desc";
    } else if (name === "aesc") {
      field = "farmer_name";
      order = "aesc";
    } else if (vill === "desc") {
      field = "village";
      order = "desc";
    } else if (vill === "aesc") {
      field = "village";
      order = "aesc";
    }

    try {
      const respond = await axios.get(`${url}/api/get_farmer`, {
        headers: headers,
        params: {
          mob_no: mobile,
          from: from ? moment(from).format("YYYY-MM-DD[T00:00:00.000Z]") : null,
          to: to ? moment(to).format("YYYY-MM-DD[T00:00:00.000Z]") : null,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,

          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          sortField: field,
          sortOrder: order,
        },
      });
      const apires = await respond.data.data;
      setFarmerListData(apires);
    } catch (error) {
      setFarmerListData([]);
    }
  };
  return (
    <form
      className="bg-white rounded w-full overflow-hidden pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="fixed top-0 w-full flex flex-col h-32 bg-white justify-between px-4  pb-2 shadow-lg  lg:flex-col   ">
        <div className="flex flex-row gap-4 font-bold w-full items-center h-12">
          <FaArrowLeftLong className="" onClick={() => router.back()} />
          <h2 className="font-bold ">List of Farmer </h2>
          <div></div>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            {/* Your icon component goes here */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            disabled
            className="bg-white border-2 border-blue-400 pl-10 py-1 pr-2 rounded-lg w-full lg:w-auto lg:self-center lg:place-self-center"
            placeholder="Enter Name or Mobile Number"
            onChange={(e) => getFarmerDetailsByNumber(e.target.value)}
            maxLength={10}
          />
        </div>

        <div className="flex  gap-20 w-full  justify-center  w-full">
          <div className="flex flex-row gap-4">
            <DatePicker
              className="w-24 px-3 text-xs h-8  rounded-lg  border-2 border-blue-400 focus:outline-none focus:border-indigo-500 "
              dateFormat="dd-MM-yyyy"
              selected={allfilterState.from}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              onChange={(date) =>
                setAllFilterState({
                  ...allfilterState,
                  from: date ? new Date(date) : "",
                })
              }
              dropdownMode="select"
            />

            <span>To</span>
            <DatePicker
              className="w-24 px-3 text-xs h-8  rounded-lg border-2 border-blue-400 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              selected={allfilterState.to}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              onChange={(date) =>
                setAllFilterState({
                  ...allfilterState,
                  to: date ? new Date(date) : "",
                })
              }
              dropdownMode="select"
            />
          </div>
        </div>
      </div>

      <div className="flex bg-gray-200 h-8 mt-36 justify-between items-center px-2">
        <small className="font-bold">Sort By</small>
        <small>{farmerListData.length} Farmers Retrive</small>
      </div>
      {farmerListData.length > 1 && (
        <div className="flex flex-row justify-around items-center h-10 border-2 border-gray-200   rounded-lg text-sm font-bold text-blue-400">
          {allfilterState.dateShortDecend === "desc" ? (
            <span
              className="flex flex-row gap-2 items-center text-blue-400"
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  dateShortDecend: "aesc",
                  mobShortDecend: "",
                  nameShortDecend: "",
                  villShortDecend: "",
                })
              }
            >
              Date {allfilterState.dateShortDecend !== "" && <FaArrowDown />}
            </span>
          ) : (
            <span
              className="flex flex-row gap-2 items-center"
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  dateShortDecend: "desc",
                  mobShortDecend: "",
                  nameShortDecend: "",
                  villShortDecend: "",
                })
              }
            >
              Date {allfilterState.dateShortDecend !== "" && <FaArrowUp />}
            </span>
          )}
          <div className="h-8 bg-gray-400 w-px"></div>
          {allfilterState.mobShortDecend === "desc" ? (
            <span
              className="flex flex-row gap-2 items-center  text-blue-400"
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  mobShortDecend: "aesc",
                  dateShortDecend: "",
                  nameShortDecend: "",
                  villShortDecend: "",
                })
              }
            >
              Mobile No{" "}
              {allfilterState.mobShortDecend !== "" && <FaArrowDown />}
            </span>
          ) : (
            <span
              className="flex flex-row gap-2 items-center "
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  mobShortDecend: "desc",
                  dateShortDecend: "",
                  nameShortDecend: "",
                  villShortDecend: "",
                })
              }
            >
              Mobile No
              {allfilterState.mobShortDecend !== "" && <FaArrowUp />}
            </span>
          )}{" "}
          <div className="h-8 bg-gray-400 w-px"></div>{" "}
          {allfilterState.nameShortDecend === "desc" ? (
            <span
              className="flex flex-row gap-2 items-center  text-blue-400"
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  mobShortDecend: "",
                  dateShortDecend: "",
                  nameShortDecend: "aesc",
                  villShortDecend: "",
                })
              }
            >
              Name {allfilterState.nameShortDecend !== "" && <FaArrowDown />}
            </span>
          ) : (
            <span
              className="flex flex-row gap-2 items-center "
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  mobShortDecend: "",
                  dateShortDecend: "",
                  nameShortDecend: "desc",
                  villShortDecend: "",
                })
              }
            >
              Name {allfilterState.nameShortDecend !== "" && <FaArrowUp />}
            </span>
          )}{" "}
          <div className="h-8 bg-gray-400 w-px"></div>
          {allfilterState.villShortDecend === "desc" ? (
            <span
              className="flex flex-row gap-2 items-center  text-blue-400"
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  mobShortDecend: "",
                  dateShortDecend: "",
                  nameShortDecend: "",
                  villShortDecend: "aesc",
                })
              }
            >
              Village
              {allfilterState.villShortDecend !== "" && <FaArrowDown />}
            </span>
          ) : (
            <span
              className="flex flex-row gap-2 items-center"
              onClick={() =>
                setAllFilterState({
                  ...allfilterState,
                  mobShortDecend: "",
                  dateShortDecend: "",
                  nameShortDecend: "",
                  villShortDecend: "desc",
                })
              }
            >
              Village
              {allfilterState.villShortDecend !== "" && <FaArrowUp />}
            </span>
          )}
        </div>
      )}

      <div className=" flex flex-col gap-2 items-center justify-center align-center w-full -z-90 lg:flex-row overflow-hidden ">
        <div className="overflow-y-auto w-full lg:w-auto p-2">
          {farmerListData?.map((item) => (
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-row w-full p-2  text-sm justify-between   mt-2  rounded-lg lg:hidden">
                <div className="flex flex-col gap-2">
                  <span className="font-bold flex flex-row gap-4">
                    <GiFarmer
                      className="text-[#626364] cursor-pointer text-green-500"
                      size={20}
                    />
                    <small className="text-[#4285F4] text-sm">
                      {item.f_name}
                    </small>
                  </span>

                  <span className="font-bold flex flex-row gap-4 font-normal text-xs">
                    <GiIsland
                      className="text-[#626364] cursor-pointer text-green-500"
                      size={20}
                    />{" "}
                    Land Info: {item.f_lacre}
                  </span>
                  <span className="font-bold flex flex-row gap-4 font-normal text-xs">
                    <FaMobileRetro
                      className="text-black-400 cursor-pointer "
                      size={20}
                    />{" "}
                    +91 -{item.f_mobile}
                  </span>
                  <div className="justify-between w-full">
                    <span>Farmer Type</span>{" "}
                    <small className="text-sm">: {item.f_type}</small>
                  </div>
                  <div className="justify-between">
                    <span className="pr-2">Farmer Cat</span>{" "}
                    <small className="text-sm">: {item.f_cat}</small>{" "}
                  </div>
                  <div className="flex gap-4 w-full">
                    <span>State: {item.st_id}</span>{" "}
                    <span>District: {item.ds_id}</span>{" "}
                    <span>Village: {item.v_id}</span>{" "}
                  </div>
                </div>
                <div className="flex flex-col gap-4 self-center">
                  <button
                    className="bg-[#4285F4] p-2 rounded-full text-white font-bold"
                    onClick={() => {
                      setAddFarmerModal(true);
                      setFarmerState({
                        farmerName: item.f_name,
                        fatherName: item.ff_name,
                        farmerAddress: item.f_address,
                        farmerTypes: item.f_type,
                        farmerCategory: item.f_cat,
                        landInfo: item.f_lacre,
                        mobile: item.f_mobile,
                        state: item.st_id,
                        district: item.ds_id,
                        village: item.v_id,
                        pinCode: item.f_pin,
                      });
                    }}
                  >
                    Open{" "}
                  </button>
                  <button
                    className="bg-red-400 p-2 rounded-full"
                    onClick={() => handleDeleteFarmer(item?.f_id)}
                  >
                    Archive
                  </button>
                </div>
              </div>
              <hr className="bg-gray-200 border-1 w-full" />
            </div>
          ))}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        id={farmerId}
        type="Farmer"
        onDeletedData={resetData}
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
                  <div className="w-1/2 px-2 relative  md:flex lg:flex">
                    <input
                      disabled
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
                    <div className="flex flex-row my-2 mb-2 md:flex-col lg:flex-col  ">
                      <div className="w-full px-2">
                        <input
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
                          className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                          id="userSelect"
                          value={farmerState.farmerTypes}
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
                          disabled
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
                        disabled
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
                        <input
                          disabled
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="State"
                           value={farmerState.state}
                        />
                      </div>

                      <div className="w-full px-2 ">
                        <input
                          disabled
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          placeholder="District"
                          value={farmerState.district}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row my-2 mb-2 ">
                      <div className="w-full px-2">
                        <input
                          disabled
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
                          disabled
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
                  <div className="mt-100 lg:hidden flex gap-2">
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
