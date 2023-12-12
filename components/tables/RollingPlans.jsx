import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FcBullish } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";

import moment from "moment";

import { AiOutlineSearch } from "react-icons/ai";
const RollingPlans = () => {
  const datas = [
    {
      id: 1,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Approved",
      progress: "20%",
    },

    {
      id: 2,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
      progress: "40%",
    },

    {
      id: 3,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "orange",
      status: "Draft save",
      progress: "60%",
    },

    {
      id: 4,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Submitted by TM/RM/ZM",
      progress: "80%",
    },

    {
      id: 5,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Review stage",
      progress: "100%",
    },

    {
      id: 6,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to sumbit",
      progress: "20%",
    },

    {
      id: 7,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Approved",
      progress: "80%",
    },

    {
      id: 8,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "orange",
      status: "Draft save",
      progress: "30%",
    },

    {
      id: 9,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Review stage",
    },

    {
      id: 10,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Approved",
    },
    {
      id: 11,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "green",
      status: "Draft save",
    },

    {
      id: 12,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
    },

    {
      id: 13,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
    },

    {
      id: 13,
      icon: FcBullish,
      name: "Rolling Sales Plan",
      month: "April 2023",
      depot: "Hyderabad",
      due_date: "due date 5th",
      zone: "South Telagana Hyderabad",
      color: "red",
      status: "Yet to submit",
    },
  ];
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
  });
  const [filterState, setFilterState] = useState({
    bgId: null,
    buId: null,
    zId: null,
    rId: null,
    tId: null,
    yr: null,
    month: null,
  });
  useEffect(() => {
    setLocalStorageItems({
      cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
    });

    setFilterState({
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      yr: null,
      month: null,
    });
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setBgData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesSegmentInfo();
  }, []);

  const [buData, setBuData] = useState([]);

  const getBusinessUnitInfo = async (businessSegmentId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBuData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinessUnitInfo(filterState.bgId);
  }, [filterState.bgId]);

  const [zoneData, setAllZoneData] = useState([]);
  const getAllZoneData = async (segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllZoneData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId) return;
    getAllZoneData(filterState.bgId, filterState.buId);
  }, [filterState.bgId, filterState.buId]);

  const [regionData, setRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setRegionData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId || !filterState.zId) return;
    getAllRegionData(filterState.bgId, filterState.buId, filterState.zId);
  }, [filterState.bgId, filterState.buId, filterState.zId]);

  const [territoryData, setTerritoryData] = useState([]);

  const getAllTerritoryData = async (
    segmentId,
    businessUnitId,
    zoneId,
    regionId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setTerritoryData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (
      !filterState.bgId ||
      !filterState.buId ||
      !filterState.zId ||
      !filterState.rId
    )
      return;
    getAllTerritoryData(
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId
    );
  }, [filterState.bgId, filterState.buId, filterState.zId, filterState.rId]);

  const [allMonthData, setAllMonthData] = useState([]);
  const getAllTransactionPlan = async (yr) => {
    try {
      const respond = await axios.get(`${url}/api/get_rp`, {
        headers: headers,
        params: {
          year: moment(yr).year(),
        },
      });
      const apires = await respond.data.data;

      setAllMonthData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    if (!filterState.year) return;
    getAllTransactionPlan(filterState.year);
  }, [filterState.year]);

  const [allTableData, setAllTableData] = useState([]);
  const getAllSalesPlanStatus = async (yr, month) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_rollingdata_based_on_roll_t`,
        {
          headers: headers,

          params: {
            t_year: moment(yr).year(),
            m_year: month !== "All" ? moment(month).format("YYYY-MM") : null,
            bg_id: filterState.bgId,
            bu_id: filterState.buId,
            z_id: filterState.zId,
            r_id: filterState.rId,
            t_id: filterState.tId,
          },
        }
      );
      console.log("pio", respond.data.data);
      const apires = await respond.data.data;
      setAllTableData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filterState.year) return;
    getAllSalesPlanStatus(filterState.year, filterState.month || null);
  }, [filterState.year, filterState.month]);

  const getStatus = (status) => {
    switch (status) {
      case "Close Period":
        return "black";

      case "Review Stage":
        return "#1c1c84";
      case "Draft Submit":
        return "#f67c41";
      case "Final Submitted":
        return "green";

      case "Yet to Submit":
        return "#f4141c";
      case "Yet to Approve":
        return "green";
      case "Reject":
        return "#f4141c";

      default:
        return "black";
    }
  };

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Rolling Sales Plan Status
          </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>
        <div className="my-4 flex  flex-col w-full gap-4 px-12 ">
          <div className="flex  w-full gap-4">
            <div className="flex flex-col gap-1  w-1/8 ">
              <h4 className=" text-md font-bold ">Year</h4>
              {router.query.type === "View" ? (
                <h2>"Hey"</h2>
              ) : (
                <DatePicker
                  className=" px-2 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  selected={filterState.year}
                  onChange={(date) =>
                    setFilterState({
                      ...filterState,
                      year: date,
                    })
                  }
                  minDate={new Date()}
                  showYearPicker
                  dateFormat="yyyy"
                />
              )}
            </div>

            <div className="flex flex-col gap-1  w-1/8">
              <h4 className=" text-md font-bold ">All/Month</h4>
              {router.query.type === "View" ? (
                <h2>"Hey"</h2>
              ) : (
                <select
                  className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={filterState.month}
                  onChange={(e) =>
                    setFilterState({
                      ...filterState,
                      month: e.target.value,
                    })
                  }
                  disabled={!filterState.year}
                >
                  <option value="All" className="font-bold">
                    All
                  </option>
                  {allMonthData
                    .filter(
                      (item) =>
                        item.clos_status === "Open Period" ||
                        item.clos_status === "Close Period"
                    )
                    .map((item, idx) => (
                      <option value={item.m_year} key={idx}>
                        {moment(item.m_year).format("MMM YYYY")}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <select
              className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.bgId}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                })
              }
              disabled={
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5 ||
                localStorageItems.roleId === 4 ||
                localStorageItems.roleId === 3 ||
                localStorageItems.roleId === 10
              }
            >
              <option value={null} className="font-bold">
                - Business Segment -
              </option>

              {bgData.map((item, idx) => (
                <option value={item.bg_id} key={idx}>
                  {item.business_segment}
                </option>
              ))}
            </select>
            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.buId}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                })
              }
              disabled={
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5 ||
                localStorageItems.roleId === 4 ||
                localStorageItems.roleId === 3
              }
            >
              <option value={null}>- Business Unit -</option>
              <option value="All">All Unit</option>
              {buData.map((item, idx) => (
                <option value={item.bu_id} key={idx}>
                  {item.business_unit_name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.zId}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                })
              }
              disabled={
                localStorageItems.roleId === 6 ||
                localStorageItems.roleId === 5 ||
                localStorageItems.roleId === 4
              }
            >
              <option value={null}>- Zone -</option>
              <option value="All">All Zone</option>
              {zoneData.map((item, idx) => (
                <option value={item.z_id} key={idx}>
                  {item.zone_name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.rId}
              disabled={
                localStorageItems.roleId === 6 || localStorageItems.roleId === 5
              }
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                })
              }
            >
              <option value={null}>- Region -</option>
              <option value="All">All Region</option>
              {regionData.map((item, idx) => (
                <option value={item.r_id} key={idx}>
                  {item.region_name}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={filterState.tId}
              disabled={localStorageItems.roleId === 6}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  tId: e.target.value,
                })
              }
            >
              <option value={null}>- Territory -</option>
              <option value="All">All Territory</option>
              {territoryData.map((item, idx) => (
                <option value={item.t_id} key={idx}>
                  {item.territory_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
            <table className="min-w-full divide-y border- divide-gray-200 ">
              <thead className="">
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Rolling Sales Plan
                  </th>
                  <th className="px- py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Depot
                  </th>
                  <th className="pl-4 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    B.G / B.u / Zone / Region / Territory
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Target Vs Actual
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTableData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      <div className="flex items-center">
                        <div className=""></div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                            Rolling Sales Plan
                          </p>
                          <p className="text-gray-900 whitespace-no-wrap text-[0.6rem]">
                            {moment(item.m_year).format("MMM YYYY")} (due date{" "}
                            {moment(item.lastsubm_t_date).format("Do")})
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px- py-2 border-b border-gray-200 bg-white text-sm ">
                      <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                        Hyderabad
                      </p>
                    </td>
                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">
                        {item.business_segment}/{item.business_unit_name}/
                        {item.zone_name}/{item.region_name}/
                        {item.territory_name}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {/* Progress Bar */}
                      <div className="demo-preview">
                        <div className="progress progress-striped active">
                          <div
                            role="progressbar "
                            style={{ width: "100%" }}
                            className="progress-bar progress-bar-success rounded-md"
                          >
                            <span className="inline-block"></span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm relative flex items-center justify-between">
                      <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          style={{ backgroundColor: getStatus(item.rp_status) }}
                          className="absolute inset-0 opacity-60 rounded-full"
                        ></span>
                        <span className="relative text-white whitespace-no-wrap text-xs font-semibold">
                          {item.rp_status}
                        </span>
                      </span>
                      <div className="popop">
                        <Popover
                          as="div"
                          className="relative border-none outline-none "
                        >
                          {({ open }) => (
                            <>
                              <Popover.Button className="focus:outline-none">
                                <BsThreeDotsVertical
                                  className="text-[#626364] cursor-pointer"
                                  size={20}
                                ></BsThreeDotsVertical>
                              </Popover.Button>

                              <Popover.Panel
                                as="div"
                                className={`${
                                  open ? "block" : "hidden"
                                } absolute z-40 top-1 right-0 mt-2 w-40 bg-white  text-black border rounded-md shadow-md`}
                              >
                                <ul className=" text-black text-xs flex flex-col gap-  font-Rale cursor-pointer">
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    New
                                  </li>
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    Edit
                                  </li>
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    View
                                  </li>
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    Previous Period
                                  </li>
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    Current Period
                                  </li>
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    Future Period
                                  </li>
                                  <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                                    Report
                                  </li>
                                </ul>
                              </Popover.Panel>
                            </>
                          )}
                        </Popover>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RollingPlans;
