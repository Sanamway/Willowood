  import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";
import { url } from "@/constants/url";
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiFarmer } from "react-icons/gi";
import { FaMobileAlt } from "react-icons/fa";
 import moment from "moment";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const AdditionalInfo = () => {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();
  const [farmerListData, setFarmerListData] = useState([]);

  const [allfilterState, setAllFilterState] = useState({
    number: null,
    from:  new Date(moment().startOf("month").format("YYYY-MM-DD")),
    to: new Date(moment().endOf("month").format("YYYY-MM-DD")),
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
    let field = null;
    let order = null;
    if (date === "desc") {
      field = "meeting_date";
      order = "desc";
    } else if (date === "aesc") {
      field = "meeting_date";
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
      const respond = await axios.get(`${url}/api/get_farmer_meet`, {
        headers: headers,
        params: {
          mob_no: mobile,
          from: from ? moment(from).format("YYYY-MM-DD[T00:00:00.000Z]") : null,
          to: to ? moment(to).format("YYYY-MM-DD[T00:00:00.000Z]") : null,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,

          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          sortField: field,
          sortOrder: order,
          emp_code: window.localStorage.getItem("emp_code"),
        },
      });
      const apires = await respond.data.data;
      console.log("moye", respond);
      setFarmerListData(apires);
    } catch (error) {
      setFarmerListData([]);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  return (
    <form
      className="bg-white rounded w-full overflow-hidden pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="fixed top-0 w-full flex flex-col h-32 bg-white justify-between px-4  pb-2 shadow-lg  lg:flex-col   ">
        <div className="flex flex-row gap-4 font-bold w-full items-center h-12">
          <FaArrowLeftLong className="" onClick={() => router.back()} />
          <h2 className="font-bold ">List of Farmer Meet </h2>
          <div></div>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 top-2 pl-3 flex items-center md:relative flex-col lg:hidden ">
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
            placeholder="Enter Mobile Number"
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
        <small>{farmerListData.length} Farmer Meet Retrive</small>
      </div>
      {farmerListData.length > 1 && (
        <div className="flex flex-row justify-around items-center h-10 border-2 border-gray-200   rounded-lg text-sm font-bold text-blue-800">
          {allfilterState.dateShortDecend === "desc" ? (
            <span
              className="flex flex-row gap-2 items-center text-blue-800"
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
              className="flex flex-row gap-2 items-center  text-blue-800"
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
              className="flex flex-row gap-2 items-center  text-blue-800"
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
              className="flex flex-row gap-2 items-center  text-blue-800"
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

      {farmerListData?.map((item) => (
        <div className="flex w-full flex-col gap-2 px-4 mt-4">
          <span className=" font-bold text-sm">
            Farmer Meet Date : {moment(item.meeting_date).format("DD-MM-YYYY")}
          </span>
          <hr className="bg-black border-1 w-full" />
          <span className=" font-bold text-blue-800 text-sm">
            Meeting Type :{" "}
            <small className="font-normal pl-2 text-base">
              {item.meeting_type}
            </small>
          </span>
          <span className=" font-bold text-sm text-blue-800">
            Farmer name :{" "}
            <small className="font-normal pl-2 text-base">
              {item.farmer_name}
            </small>
          </span>
          <div className="flex flex-row gap-10 ">
            <span className="">
              Village :
              <small className="font-normal pl-2 text-base">
                {item.village}
              </small>{" "}
            </span>
            <span className="">
              Plot Sie :
              <small className="font-normal pl-2 text-base">
                {item.plot_size}
              </small>
            </span>
          </div>
          <span className="">
            No of Farmer Available : {item.farmer_available_in_field_day}
          </span>
          <span className=" font-bold text-sm">Focus on product Brand</span>
          <span className=" font-bold text-sm">
            {item.push_product_brand.join(", ")}
          </span>
          <span className=" font-bold text-sm">Venue Address</span>
          <span className=" font-bold text-sm">{item.meeting_address}</span>
          <div className="flex justify-center gap-3">
            <span>
              Territory: <small className="font-bold">{item.t_presence}</small>
            </span>
            <span>
              DevMgr: <small className="font-bold">{item.dm_presence}</small>
            </span>
            <span>
              ZoneDM: <small className="font-bold">{item.zdm_presence}</small>
            </span>
          </div>
          <span className=" font-bold text-sm">Farmer Suggestion</span>
          <span className=" font-bold text-sm">
            {item.farmer_suggestion_opinion_idea}
          </span>

          <button
            className="w-full border border-black font-bold text-blue-800"
            onClick={() => {
              setIsOpen(true);
              setImgUrl(item.farmer_meet_image_Url);
            }}
          >
            {" "}
            View Farmer Meet Image
          </button>
          <hr className="bg-gray-200 border-1 w-full" />
        </div>
      ))}
      <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 ">
        <FaArrowAltCircleUp
          size={42}
          className="self-center size-120 text-blue-800  "
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth", // Smooth scrolling animation
            })
          }
        />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            setImgUrl("");
          }}
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
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Farmer Meet Image
                  </Dialog.Title>

                  <img
                    className="m-2"
                    src={imgUrl}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                  />
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
