import React, { useState, useEffect, Fragment } from "react";

import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { FaArrowLeftLong } from "react-icons/fa6";

import { Dialog, Transition } from "@headlessui/react";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

const AdditionalInfo = (props) => {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
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
  console.log("farmer", farmerListData);
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
    getDistrict();
    setisOpen(false);
  };
  return (
    <form
      className="bg-white rounded w-full overflow-hidden pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="fixed top-0 w-full flex flex-col h-20 bg-[#fafafa] justify-between px-4  ">
        <div className="flex justify-between w-full">
          <FaArrowLeftLong
            className="self-center mt-2"
            onClick={() =>
              router.push({
                pathname: "MRForm_Farmer_Demo",
              })
            }
          />

          <h2 className="font-bold self-center mt-2">List of Farmer</h2>
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
            className="bg-white border-2 border-blue-400 pl-10 py-1 pr-2 rounded-lg w-full lg:w-auto lg:self-center lg:place-self-center"
            placeholder="Search Farmer"
          />
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-2 items-center justify-center align-center w-full -z-90 lg:flex-row overflow-hidden ">
        <div className="overflow-y-auto w-full lg:w-auto p-2">
          {farmerListData?.map((item) => (
            <div className="flex flex-row w-full p-2  text-sm justify-between   mt-2  rounded-lg lg:hidden">
              <div className="flex flex-col gap-2">
                <span className="font-bold">
                  Farmer Name -{" "}
                  <small className="font-normal text-sm">{item.f_name}</small>{" "}
                  Land Info-{" "}
                  <small className="font-normal text-sm">{item.f_lacre}</small>
                </span>
                <span>{item.f_mobile}</span>
                <span>Farmer Type: {item.f_type}</span>
                <span className="text-xsm">Farmer Cat: {item.f_cat}</span>
                <div className="flex gap-4 w-full">
                  <span>State: {item.st_id}</span>{" "}
                  <span>District: {item.ds_id}</span>{" "}
                  <span>Village: {item.v_id}</span>{" "}
                </div>
              </div>
              <div className="flex flex-col gap-4 self-center">
                <button
                  className="bg-blue-400 p-2 rounded-full "
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
                  onClick={() => handleDeleteFarmer(item?.f_demo_id)}
                >
                  Archive
                </button>
              </div>
              <hr className="bg-gray-200 border-1" />
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
                          {/* {districtData.map((item, idx) => (
                    <option
                      value={item.ds_id}
                      className="focus:outline-none focus:border-b bg-white"
                      key={idx}
                    >
                      {item.district_name}
                    </option>
                  ))} */}

                          <option
                            value={"New"}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            New
                          </option>
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
                          <option
                            value={"Dist"}
                            className="focus:outline-none focus:border-b bg-white"
                          >
                            Dist
                          </option>
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
                  <div className="mt-100 lg:hidden">
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
