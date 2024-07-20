import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
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

const AdditionalInfo = () => {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();
  const [farmerListData, setFarmerListData] = useState([]);

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
    let field = null;
    let order = null;
    if (date === "desc") {
      field = "demo_date";
      order = "desc";
    } else if (date === "aesc") {
      field = "demo_date";
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
      const respond = await axios.get(`${url}/api/get_mr_form_demo`, {
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
      const apires = await respond.data.data.MR_demo;
      console.log("moye", respond);
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
          <h2 className="font-bold ">List of Field Day</h2>
          <div></div>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center md:relative flex-col lg:hidden ">
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
        <small>{farmerListData.length} Demo Retrive</small>
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

      {farmerListData?.map((item) => (
        <div className="flex w-full flex-col gap-1 px-4 mt-4">
          <span className=" font-bold text-sm">
            Mobile Number :{" "}
            <small className="font-normal pl-2 text-lg">7505086466</small>
          </span>
          <span className=" font-bold text-sm">
            Farmer name :{" "}
            <small className="font-normal pl-2 text-lg">New name</small>
          </span>
          <div className="flex flex-row gap-2 justify-between ">
            <span className=" font-bold text-sm">
              Village :
              <small className="font-normal pl-2 text-lg">New Village</small>{" "}
            </span>
            <span className=" font-bold text-sm">
              Plot Sie :<small className="font-normal pl-2 text-lg">12</small>
            </span>
          </div>
          <span className="  text-sm">Crop: Demo</span>
          <span className=" font-bold text-sm">Product Demo Info</span>
          <span className=" font-bold text-sm">
            Filed Remarks: XXXXXXXXXXXXXX
          </span>
          <button className="w-full border border-indigo-600 ">
            {" "}
            View Filed Day Image
          </button>
          <hr className="bg-gray-200 border-1 w-full" />
        </div>
      ))}
      <div className="fixed bottom-12 right-9  rounded-full animate-pulse z-9999 ">
        <FaArrowAltCircleUp
          size={42}
          className="self-center size-120 text-blue-400  "
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
