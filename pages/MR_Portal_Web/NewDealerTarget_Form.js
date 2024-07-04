import React, { useState, useEffect } from "react";

import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";
import Navbar from "@/components/MR_Portal_Apps/Navbar";
import moment from "moment";

const DealerTarget = () => {
  const csvHeaders = [
    { label: "Id", key: "bg_id" },
    { label: "Business Segment", key: "business_segment" },
    { label: "Company", key: "cmpny_name" },
    { label: "Email", key: "email_id" },
    { label: "H.O.D.", key: "hod_name" },
    { label: "Mobile No.", key: "mobile_no" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [filterState, setFilterState] = useState({
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    yr: null,
    roleId: null,
  });

  useEffect(() => {
    const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;

    switch (roleId) {
      case 6:
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: null,
        });
        break;
      case 5:
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: null,
        });
        break;
      case 4:
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: null,
        });
        break;
      case 3:
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: null,
        });
        break;
      case 10:
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: null,
          rId: null,
          zId: null,
          tId: null,
          yr: null,
        });
        break;
      default:
        setFilterState({
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          yr: null,
        });
        break;
    }
  }, []);

  const [bgData, setBgData] = useState([]);

  const getBusinesSegmentInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      console.log("Bye", window.localStorage.getItem("userinfo").c_id);
      setBgData(
        apires.filter(
          (item) =>
            item.isDeleted === false &&
            Number(item.c_id) ===
              JSON.parse(window.localStorage.getItem("userinfo")).c_id
        )
      );
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
    if (!filterState.bgId) return;
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

  const handleSave = () => {};

  return (
    <Layout>
      <div className="w-full font-arial bg-white">
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="flex flex-row m-4 w-full gap-2">
          <DatePicker
            className="border p-1 rounded ml-2 w-72"
            showYearDropdown
            dateFormat="yyyy"
            placeholderText="Enter Year"
            yearDropdownItemNumber={15}
            selected={filterState.yr}
            scrollableYearDropdown
            onChange={(date) => setFilterState({ ...filterState, yr: date })}
            hand
            showYearPicker
            minDate={new Date(new Date().getFullYear(), 0, 1)}
          />
          <select
            id="attendanceType"
            className="border p-1 rounded ml-2 w-72"
            value={filterState.bgId}
            onChange={(e) =>
              setFilterState({ ...filterState, bgId: e.target.value })
            }
            disabled
          >
            <option value={""}>Business Segment</option>
            {bgData.map((item) => (
              <option value={item.bg_id}>{item.business_segment}</option>
            ))}
          </select>

          <select
            id="attendanceType"
            className="  border p-1 rounded ml-2 w-72"
            value={filterState.buId}
            onChange={(e) =>
              setFilterState({ ...filterState, buId: e.target.value })
            }
            disabled
          >
            <option value={""}>Business Unit</option>
            {buData.map((item) => (
              <option value={item.bu_id}>{item.business_unit_name}</option>
            ))}
          </select>
          <select
            id="attendanceType"
            className="  border p-1 rounded ml-2 w-72"
            value={filterState.zId}
            onChange={(e) =>
              setFilterState({ ...filterState, zId: e.target.value })
            }
            disabled
          >
            <option value={""}>Zone</option>
            {zoneData.map((item) => (
              <option value={item.z_id}>{item.zone_name}</option>
            ))}
          </select>
          <select
            id="attendanceType"
            className="  border p-1 rounded ml-2 w-72"
            value={filterState.rId}
            onChange={(e) =>
              setFilterState({ ...filterState, rId: e.target.value })
            }
            disabled
          >
            <option value={""}>Region</option>
            {zoneData.map((item) => (
              <option value={item.r_id}>{item.region_name}</option>
            ))}
          </select>
          <select
            id="attendanceType"
            className="  border p-1 rounded ml-2 w-72"
            value={filterState.tId}
            onChange={(e) =>
              setFilterState({ ...filterState, tId: e.target.value })
            }
            disabled
          >
            <option value={""}>Territory</option>
            {zoneData.map((item) => (
              <option value={item.t_id}>{item.territory_name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-row my-4 mx-5 w-full gap-8">
          <div className="flex flex-row gap-2">
            <span className="font-bold self-center">M.R. Executive</span>
            <select
              id="attendanceType"
              className="border p-1 rounded  w-52"
              value={filterState.bgId}
              onChange={(e) =>
                setFilterState({ ...filterState, bgId: e.target.value })
              }
              disabled
            >
              <option value={""}>Business Segment</option>
              {bgData.map((item) => (
                <option value={item.bg_id}>{item.business_segment}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold self-center">Dealer</span>
            <select
              id="attendanceType"
              className="border p-1 rounded  w-52"
              value={filterState.bgId}
              onChange={(e) =>
                setFilterState({ ...filterState, bgId: e.target.value })
              }
              disabled
            >
              <option value={""}>Business Segment</option>
              {bgData.map((item) => (
                <option value={item.bg_id}>{item.business_segment}</option>
              ))}
            </select>
          </div>
        </div>
        <h2 className="font-bold mx-4">
          MR - Dealer Sales Target Plan of the Year {filterState.yr}
        </h2>
        <div className="bg-white  max-w-full pb-12 mx-4">
          <div className=" text-black font-arial  w-full p-1 h-[760px] overflow-y-auto scrollbar-">
            <table className="min-w-full divide-y border- divide-gray-200 font-bold">
              <thead className="border-b w-max">
                <tr className=" font-arial w-max ">
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    Party COde
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    Name of Distributors
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    Focus Product
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                    F.Y -22-23 Sale
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                    F.Y -22-23 Sale
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    APR
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    MAY
                  </th>

                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    JUNE
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                    Q1-Total
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    JUL
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    AUG
                  </th>

                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    SEP
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                    Q2-Total
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    OCT
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    NOV
                  </th>

                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    DEC
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                    Q3-Total
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    JAN
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    FEB
                  </th>

                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium bg-sky-800 text-white  tracking-wider">
                    MAR
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider bg-gray-300">
                    Q4-Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                <tr className="dark:border-2">
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    1212
                  </td>
                  <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                    Karan
                  </td>

                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Product"
                          disabled
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Nucleus"
                          disabled
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Focus "
                          disabled
                        />
                      </li>
                      <li className="  flex justify-center  text-black   p-1  ">
                        <input
                          className="p-0 w-16 h-6  font-bold "
                          value="Tot-Party"
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 ">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black    p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Dummy"
                          disabled
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Dummy"
                          disabled
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Dummy"
                          disabled
                        />
                      </li>
                      <li className="  flex justify-center font-bold  text-black   p-1  ">
                        <input
                          className="p-0 w-16 h-6    "
                          value="Dummy"
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 ">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black    p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Dummy"
                          disabled
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Dummy"
                          disabled
                        />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input
                          className="p-0 w-16  h-6  "
                          value="Dummy"
                          disabled
                        />
                      </li>
                      <li className="  flex justify-center font-bold  text-black   p-1  ">
                        <input
                          className="p-0 w-16 h-6    "
                          value="Dummy"
                          disabled
                        />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300   bg-gray-300">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300 bg-gray-300 ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300 bg-gray-300 ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300 bg-gray-300 ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300 bg-gray-300 ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 ">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  bg-gray-300">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white ">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 ">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                  <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                    <ul>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                        <input className="p-0 w-16  h-6  " value="" disabled />
                      </li>
                      <li className="  flex justify-center   text-black   p-1  bg-gray-300  ">
                        <input className="p-0 w-16 h-6    " value="" disabled />
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            {router.query.type === "Add" || router.query.type === "Edit" ? (
              <div className="flex w-full h-8 gap-4 m-2 ">
                <button
                  className="bg-green-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
                  onClick={() => handleSave()}
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/MR_Portal_Web/Table_MR_ActivityTarget",
                    });
                  }}
                  className="bg-red-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex w-full  gap-4 m-2 "></div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DealerTarget;
