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
    dId: null,
    yr: null,
    empCode: null,
    roleId: null,
  });

  useEffect(() => {
    if (router.query.type !== "Add") {
      setSelectedYr(new Date(router.query.yr));
      getAllMRSalesTarget();
    }
  }, []);

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
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
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

  const [allEmployee, setAllEmployee] = useState([]);
  const getAllEmployeeData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });

      const apires = await respond.data.data;
      console.log("new", apires);
      setAllEmployee(apires);
    } catch (error) {}
  };
  useEffect(() => {
    getAllEmployeeData();
  }, []);

  const [allDealer, setAllDealer] = useState([]);
  const getAllDealerData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_dealer`, {
        headers: headers,
        params: {
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });

      const apires = await respond.data.data;
      console.log("new", apires);
      setAllDealer(apires);
    } catch (error) {}
  };
  useEffect(() => {
    getAllDealerData();
  }, []);

  const [allMRSalesTarget, setAllMRSalesTarget] = useState([]);
  const getAllMRSalesTarget = async () => {
    const { tId, yr, empCode, dId } = filterState;
    let tDes;
    let paramsData = {};
    if (router.query.type !== "Add") {
      tDes = router.query.tDes;
      paramsData = {
        t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_des: tDes,
        year: router.query.yr,
        appl_no: router.query.empId,
        customer_code: router.query.custCode,
      };
    } else {
      tDes = territoryData.filter((item) => item.t_id === tId)[0]
        .territory_name;
      paramsData = {
        t_id: tId,
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_des: tDes,
        year: selectedYr.getFullYear(),
        appl_no: empCode,
        party_Name: dId,
      };
    }
    try {
      const respond = await axios.get(`${url}/api/mr_sales_target`, {
        headers: headers,
        params: paramsData,
      });

      const apires = await respond.data.data;
      setAllMRSalesTarget(apires);
    } catch (error) {}
  };
  const [selectedYr, setSelectedYr] = useState(null);

  console.log("Nol", allMRSalesTarget);

  const handleSave = async () => {
    try {
      let endPoint = "api/add_mr_sales_target";

      const data = allMRSalesTarget
        ?.map((item, idx) => {
          let { category_result } = item;
          return category_result.map((el) => {
            return {
              ...el,
              t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
              c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
              bg_id: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
              bu_id: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
              r_id: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
              z_id: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
              year: selectedYr.getFullYear(),
              product_category: el.category_name,

              emp_code: item.emp_code,
              customer_code: item.party_code,
              distribution_name: item.distribution_name,
            };
          });
        })
        .flatMap((innerArray) => innerArray);

      const respond = await axios
        .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/NewDealerTarget_Table",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      console.log("koi", errors);
      if (!errorMessage) return;
      getAllMRSalesTarget();
    }
  };
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
            yearDropdownItemNumber={15} // Uncommented and provided a value
            selected={selectedYr}
            onChange={(date) => setSelectedYr(date)}
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
            {regionData.map((item) => (
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
            {territoryData.map((item) => (
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
              value={filterState.empCode}
              onChange={(e) =>
                setFilterState({ ...filterState, empCode: e.target.value })
              }
            >
              <option value={""}>Mr. Executive</option>
              {allEmployee.map((item) => (
                <option value={item.appl_no}>
                  {item.fname} {item.mname} {item.lname}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold self-center">Dealer</span>
            <select
              id="attendanceType"
              className="border p-1 rounded  w-52"
              value={filterState.dId}
              onChange={(e) =>
                setFilterState({ ...filterState, dId: e.target.value })
              }
            >
              <option value={""}>Dealer</option>
              {allDealer.map((item) => (
                <option value={item.party_Name}>{item.party_Name}</option>
              ))}
            </select>
          </div>
        </div>
        {router.query.type === "Add" && (
          <button
            className="bg-blue-500 px-4 py-1 text-white cursor-pointer ml-4 mb-4"
            onClick={() => {
              getAllMRSalesTarget();
            }}
          >
            View Data
          </button>
        )}

        <h2 className="font-bold mx-4">
          MR - Dealer Sales Target Plan of the Year {filterState.yr}
        </h2>
        <div className="bg-white  max-w-full pb-12 mx-4">
          <div className=" text-black font-arial  w-full p-1 h-[760px] overflow-y-auto scrollbar-">
            <table className="min-w-full divide-y border- divide-gray-200 font-bold">
              <thead className="border-b w-max">
                <tr className=" font-arial w-max ">
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    Emp Code
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    Emp Name
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    MR HQ
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium  tracking-wider">
                    Party Code
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
                {allMRSalesTarget.map((item) => (
                  <tr className="dark:border-2">
                    <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {item.emp_code}
                    </td>
                    <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {item.emp_name}
                    </td>

                    <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {item.mr_hq}
                    </td>
                    <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {item.party_code}
                    </td>
                    <td className="pl-4 w-52 text-left border-2 border-black justify-center whitespace-nowrap font-arial text-xs ">
                      {item.distribution_name}
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                      <ul>
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  "
                              value={item[Object.keys(item)[0]]}
                              disabled
                            />
                          </li>
                        ))}
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
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6 text-right "
                              value={item[Object.keys(item)[1]]}
                              disabled
                            />
                          </li>
                        ))}{" "}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16  h-6 text-right "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300 ">
                      <ul>
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6 text-right "
                              value={item[Object.keys(item)[2]]}
                              disabled
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16  h-6 text-right "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white">
                      <ul>
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6 text-right "
                              value={catItem[Object.keys(catItem)[3]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[3]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}

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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6 text-right "
                              value={catItem[Object.keys(catItem)[4]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[4]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[5]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[5]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                      <ul>
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  "
                              value="Total"
                              disabled
                            />
                          </li>
                        ))}{" "}
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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[6]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[6]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 ">
                      <ul>
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[7]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[7]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-white ">
                      <ul>
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6 text-right "
                              value={catItem[Object.keys(catItem)[8]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[8]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                      <ul>
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  "
                              value="Dummy"
                              disabled
                            />
                          </li>
                        ))}
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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[9]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[9]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0">
                      <ul>
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6 text-right "
                              value={catItem[Object.keys(catItem)[10]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[10]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[11]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[11]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                      <ul>
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  "
                              value="Dummy"
                              disabled
                            />
                          </li>
                        ))}
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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[12]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[12]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 ">
                      <ul>
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[13]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[13]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
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
                        {item.category_result.map((catItem, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  text-right"
                              value={catItem[Object.keys(catItem)[14]]}
                              onChange={(e) =>
                                setAllMRSalesTarget(
                                  allMRSalesTarget.map((el) => {
                                    if (el.party_code === item.party_code) {
                                      return {
                                        ...el,
                                        category_result: el.category_result.map(
                                          (pl) => {
                                            if (
                                              catItem[
                                                Object.keys(catItem)[0]
                                              ] === pl[Object.keys(pl)[0]]
                                            ) {
                                              return {
                                                ...pl,
                                                [Object.keys(pl)[14]]:
                                                  e.target.value,
                                              };
                                            } else {
                                              return pl;
                                            }
                                          }
                                        ),
                                      };
                                    } else {
                                      return el;
                                    }
                                  })
                                )
                              }
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap  p-0 bg-gray-300">
                      <ul>
                        {item.category_result.map((item, idx) => (
                          <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                            <input
                              className="p-0 w-16  h-6  "
                              value="Dummy"
                              disabled
                            />
                          </li>
                        ))}
                        <li className="  flex justify-center font-bold  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6    "
                            value="Dummy"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {router.query.type === "Add" && (
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
            )}

            {/* ) : (
              <div className="flex w-full  gap-4 m-2 "></div>
            )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DealerTarget;
