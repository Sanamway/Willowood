import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout1";
import nmg from "./banner.jpg";
import ReactPaginate from "react-paginate";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFileDownload } from "react-icons/tb";
import * as XLSX from "xlsx";
import { IoTerminal } from "react-icons/io5";
const FeePayout = () => {

  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState({ selected: 0 }); // Current page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };


  const [downloadLoading, setDownloadLoading] = useState(false)
  const getFeeData = async (
    yr,
    month,
    bg,
    bu,
    z,
    r,
    t,
    empCode,
    status
  ) => {

    try {
      setDownloadLoading(true)

      const allMonths = [
        { month: "January", number: 1 },
        { month: "February", number: 2 },
        { month: "March", number: 3 },
        { month: "April", number: 4 },
        { month: "May", number: 5 },
        { month: "June", number: 6 },
        { month: "July", number: 7 },
        { month: "August", number: 8 },
        { month: "September", number: 9 },
        { month: "October", number: 10 },
        { month: "November", number: 11 },
        { month: "December", number: 12 }
      ];

      console.log("nop", month, allMonths.filter((item) => item.month === month))
      const respond = await axios.get(`${url}/api/get_employee_payout`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode,
          year: yr,
          month: month ? allMonths.filter((item) => item.month === month)[0].number : "",
          status: status,
          zrt: true

        },
      });
      const apires = await respond.data.data.employeeData;

      setData(apires);
      setDownloadLoading(false)
    } catch (error) {
      setDownloadLoading(false)
      setData([]);
    }
  };

  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
  });

  // All Filters
  const [filterState, setFilterState] = useState({
    yr: moment().year(),
    month: "",
    newFil: "All",
    bgId: null,
    buId: null,
    zId: null,
    rId: null,
    tId: null,
    tDes: null,
    rDes: null,
    zDes: null,
    buDes: null,
    bgDes: null,
    newFil: "All",
    empCode: ""

  });


  const [payoutItems, setPayoutItems] = useState(
    {
      mark: {},
      verify: {},
      approve: {}
    }
  );
  const getMarkData = async (
    yr,
    month,
    empCode) => {
    try {
      const allMonths = [
        { month: "January", number: 1 },
        { month: "February", number: 2 },
        { month: "March", number: 3 },
        { month: "April", number: 4 },
        { month: "May", number: 5 },
        { month: "June", number: 6 },
        { month: "July", number: 7 },
        { month: "August", number: 8 },
        { month: "September", number: 9 },
        { month: "October", number: 10 },
        { month: "November", number: 11 },
        { month: "December", number: 12 }
      ];

      console.log("nop", month, allMonths.filter((item) => item.month === month))
      const respond = await axios.get(`${url}/api/get_employee_payout_emp`, {
        headers: headers,
        params: {
          emp_code: empCode,
          year: yr,
          month: month ? allMonths.filter((item) => item.month === month)[0].number : "",
          c_id: 1
        },
      });
      const apires = await respond.data.data.employeeData;
      console.log("nos", apires)
      setPayoutItems((prevItems) => ({
        ...prevItems,
        mark: apires.length ? apires[0] : {}
      }));

    } catch (error) {
      setPayoutItems((prevItems) => ({
        ...prevItems
      }));;
    }
  };
  const getVerifyData = async (
    yr,
    month,
    empCode) => {
    try {
      const allMonths = [
        { month: "January", number: 1 },
        { month: "February", number: 2 },
        { month: "March", number: 3 },
        { month: "April", number: 4 },
        { month: "May", number: 5 },
        { month: "June", number: 6 },
        { month: "July", number: 7 },
        { month: "August", number: 8 },
        { month: "September", number: 9 },
        { month: "October", number: 10 },
        { month: "November", number: 11 },
        { month: "December", number: 12 }
      ];


      const respond = await axios.get(`${url}/api/get_employee_payout_emp`, {
        headers: headers,
        params: {
          emp_code: empCode,
          year: yr,
          month: month ? allMonths.filter((item) => item.month === month)[0].number : "",
          c_id: 1,
          status: "verify"
        },
      });
      const apires = await respond.data.data.employeeData;
      console.log("nop", apires)

      setPayoutItems((prevItems) => ({
        ...prevItems,
        verify: apires.length ? apires[0] : {}
      }));

    } catch (error) {
      setPayoutItems((prevItems) => ({
        ...prevItems
      }));;
    }
  };

  const getApproveData = async (
    yr,
    month,
    empCode
  ) => {
    try {
      const allMonths = [
        { month: "January", number: 1 },
        { month: "February", number: 2 },
        { month: "March", number: 3 },
        { month: "April", number: 4 },
        { month: "May", number: 5 },
        { month: "June", number: 6 },
        { month: "July", number: 7 },
        { month: "August", number: 8 },
        { month: "September", number: 9 },
        { month: "October", number: 10 },
        { month: "November", number: 11 },
        { month: "December", number: 12 }
      ];
      const respond = await axios.get(`${url}/api/get_employee_payout_emp`, {
        headers: headers,
        params: {
          emp_code: empCode,
          year: yr,
          month: month ? allMonths.filter((item) => item.month === month)[0].number : "",
          c_id: 1,
          status: "approve"
        },
      });
      const apires = await respond.data.data.employeeData;
      console.log("noa", apires)
      setPayoutItems((prevItems) => ({
        ...prevItems,
        approve: apires.length ? apires[0] : {}
      }));

    } catch (error) {
      setPayoutItems((prevItems) => ({
        ...prevItems
      }));;
    }
  };

  useEffect(() => {
    getMarkData(
      moment().format("YYYY"),
      moment().format("MMMM"),
      filterState.empCode
    ),
      getVerifyData(
        moment().format('YYYY'),
        moment().format("MMMM"),
        filterState.empCode
      ),
      getApproveData(
        moment().format('YYYY'),
        moment().format("MMMM"),
        filterState.empCode
      )
  }, [filterState.empCode])





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

  const [allZoneData, setAllZoneData] = useState([]);
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
    } catch (error) { }
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId) return;
    getAllZoneData(filterState.bgId, filterState.buId);
  }, [filterState.bgId, filterState.buId]);

  const [allRegionData, setAllRegionData] = useState([]);

  const getAllRegionData = async (segmentId, businessUnitId, zoneId) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllRegionData(apires);
      setAllRegionData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
      );
    } catch (error) { }
  };

  useEffect(() => {
    if (!filterState.bgId || !filterState.buId || !filterState.zId) return;
    getAllRegionData(filterState.bgId, filterState.buId, filterState.zId);
  }, [filterState.bgId, filterState.buId, filterState.zId]);

  const [allTerritoryData, setAllTerritoryData] = useState([]);

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
      setAllTerritoryData(
        apires
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) { }
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
  const getAllEmployeeData = async (bg, bu, z, r, t) => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          zrt: true,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
      });
      const apires = await respond.data.data;
      setAllEmployee(apires);
    } catch (error) {
      setAllEmployee([]);
    }
  };
  useEffect(() => {
    getAllEmployeeData(
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId
    );
  }, [
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
  ]);
  useEffect(() => {
    const roleId = 6;
    let filterState = {
      bgId: "All",
      buId: "All",
      zId: "All",
      rId: "All",
      tId: "All",
    };
    switch (roleId) {
      case 6:
        filterState = {
          yr: moment().year(),
          month: "",
          newFil: "All",
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id,

        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 5:
        filterState = {
          yr: moment().year(),
          month: "",
          newFil: "All",
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          tId: "All",

        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 4:
        filterState = {
          yr: moment().year(),
          month: "",
          newFil: "All",
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId: "All",
          tId: "All",

        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
              "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 3:
        filterState = {
          yr: moment().year(),
          month: "",
          newFil: "All",
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",

        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
              "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      case 10:
        filterState = {
          yr: moment().year(),
          month: "",
          newFil: "All",
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",

        };
        setLocalStorageItems({
          bgId:
            JSON.parse(window.localStorage.getItem("userinfo")).bg_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId:
            JSON.parse(window.localStorage.getItem("userinfo")).bu_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).bu_id,

          zId:
            JSON.parse(window.localStorage.getItem("userinfo")).z_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).z_id,

          rId:
            JSON.parse(window.localStorage.getItem("userinfo")).r_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).r_id ||
              "All",
          tId:
            JSON.parse(window.localStorage.getItem("userinfo")).t_id === 0
              ? "All"
              : JSON.parse(window.localStorage.getItem("userinfo")).t_id ||
              "All",
          roleId: JSON.parse(window.localStorage.getItem("userinfo")).role_id,
        });

        setFilterState(filterState);

        break;
      default:
        setLocalStorageItems({
          cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        });

        setFilterState({
          yr: moment().year(),
          month: "",
          newFil: "All",
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,

        });
        setFilterState(filterState);

        break;
    }
  }, []);
  useEffect(() => {

    getFeeData(
      filterState.yr,
      filterState.month,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.empCode,
      filterState.newFil
    );
  }, [
    filterState.yr,
    filterState.month,
    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
    filterState.empCode,
    filterState.newFil
  ]);

  const { name } = router.query;



  const [excelLoading, setExcelLoading] = useState(false)
  const getExcelsheet = async (
    yr,
    month,
    bg,
    bu,
    z,
    r,
    t,
    empCode,
    status
  ) => {
    const allMonths = [
      { month: "January", number: 1 },
      { month: "February", number: 2 },
      { month: "March", number: 3 },
      { month: "April", number: 4 },
      { month: "May", number: 5 },
      { month: "June", number: 6 },
      { month: "July", number: 7 },
      { month: "August", number: 8 },
      { month: "September", number: 9 },
      { month: "October", number: 10 },
      { month: "November", number: 11 },
      { month: "December", number: 12 }
    ];
    try {
      setExcelLoading(true)
      const respond = await axios.get(`${url}/api/get_employee_payout`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode,
          year: yr,
          month: month ? allMonths.filter((item) => item.month === month)[0].number : "",
          status: status,
          zrt: true
        },
      });
      const apires = await respond.data.data.employeeData;
      const ws = XLSX.utils.json_to_sheet(apires.map((item, idx) => {
        return {

          ["Sr. No"]: idx + 1,
          ["Employee Code"]: item.empcode,
          ["Employee Name"]: item.emp_name,
          ["Designation"]: item.design,
          ["Reporting HQ"]: item.reporting_hq,
          ["Territory"]: item.territory_name,
          ["Application Fee Amount"]: item.in_appl_amt,
          ["Festival Amt"]: item.in_fest_amount_e,
          ["Incentive Amt"]: item.in_special_allowance_e,
          ["Other Amount"]: item.in_other_amt_e,
          ["Gross Salary"]: item.grass_salary,
          ["Calendar Days"]: item.calender_w_d,
          ["Present Day"]: item.total_mr_present,
          ["Half Day"]: item.hd_count,
          ["Holiday"]: item.h_count,

          ["Weekly Off"]: item.emp_wo_count,
          ["Mannual Attendance"]: item.manual_attendance,
          ["Paid Working Days"]: item.total_working_day,
          ["Absent"]: item.a_count,
          ["Total Half Day"]: item.total_hd_count,
          ["Diff W.O"]: item.w_o_diff,
          ["Total Calendar Days"]: item.total_calender_day,
          ["Earning Salary"]: item.earning_salary,
          ["Bonus Amount"]: item.bonus_amt,
          ["Other Amount"]: item.other_amt,
          ["Total Deduction"]: item.total_deduc,
          ["Net Salary"]: item.net_salary,
          ["Total Demo"]: item.total_mr_demo_present,
          ["Total Field_Day"]: item.mr_field_present,
          ["Total Group_Meet"]: item.mr_meet_1,
          ["Total OFM"]: item.mr_meet_2,
          ["Activity Score"]: item.total_activity_score,
          ["Total Accumulateri ve Salary"]: item.total_accumulative_vs_salary,
          ["TDs %"]: item.tds_percent,
          ["Tds Amt"]: item.tds_amount,
          ["Incentive Disincentive"]: item.incentive_or_disincemtive,
          ["Status"]: item.emp_status,
          ["Reporting Person"]: item.rp_manager,
          ["Region"]: item.region_name,
          ["Zone"]: item.zone_name,
          ["Business Unit Name"]: item.business_unit_name,
          ["Resignsstion Date"]: item.resignation_request_date ? moment(item.resignation_request_date).format("DD-MM-YYYY") : "-",
          ["App Status"]: item.app_status,
        }
      }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `payout.xlsx`);
      setExcelLoading(false)
    } catch (error) {
      setExcelLoading(false)
      console.log("notch", error)
    }
  };
  const [total, setTotal] = useState({})
  useEffect(() => {
    const totals = data?.reduce(
      (acc, item) => {
        acc.applicationFeeAmount += parseFloat(item.in_appl_amt) || 0;
        acc.festivalAmount += parseFloat(item.in_fest_amount_e) || 0;
        acc.incentiveAmount += parseFloat(item.in_special_allowance_e) || 0;
        acc.otherAmount += parseFloat(item.in_other_amt_e) || 0;
        acc.grossSalary += parseFloat(item.grass_salary) || 0;
        acc.earningSalary += parseFloat(item.earning_salary) || 0;
        acc.bonusAmount += parseFloat(item.bonus_amt) || 0;
        acc.totalDeduction += parseFloat(item.total_deduc) || 0;
        acc.netSalary += parseFloat(item.net_salary) || 0;
        return acc;
      },
      {
        applicationFeeAmount: 0,
        festivalAmount: 0,
        incentiveAmount: 0,
        otherAmount: 0,
        grossSalary: 0,
        earningSalary: 0,
        bonusAmount: 0,
        totalDeduction: 0,
        netSalary: 0
      }
    );
    setTotal(totals)
  }, [data])

  const Loader = () => {
    return (
      <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <img
          className="w-20 h-20 animate-spin"
          src="https://www.svgrepo.com/show/448500/loading.svg"
          alt="Loading icon"
        />
      </div>
    );
  };
  const LoaderExcel = () => {
    return (
      <div class="flex space-x-1   justify-center items-center bg-white  ">
        <div class="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    );
  };

  const filterDisableOption = (currentFilter) => {
    function getLastAssignedKey(filterState) {
      // Define an array of keys in the order you want to check
      const keys = ['bgId', 'buId', 'zId', 'rId', 'tId'];

      // Iterate through the keys in reverse order
      for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        if (typeof filterState[key] === 'number' && !isNaN(filterState[key])) {
          return key;
        }
      }

      // If no valid number is found, return null or undefined
      return null;
    }

    console.log("zpo", currentFilter)
    const role = localStorageItems.roleId
    console.log("pop", getLastAssignedKey(filterState) === "tId")
    if (role === 9) {

      switch (currentFilter) {
        case "Teritory": if (
          getLastAssignedKey(filterState) === "tId") { return true }
        else {
          return false

        }
        case "Region": if (
          getLastAssignedKey(filterState) === "tId" || getLastAssignedKey(filterState) === "rId") { return true }
        else {
          return false

        }
        case "Zone": if (
          getLastAssignedKey(filterState) === "tId" ||
          getLastAssignedKey(filterState) === "rId" ||
          getLastAssignedKey(filterState) === "zId") { return true }
        else {
          return false

        }
        case "BU": if (
          getLastAssignedKey(filterState) === "tId" ||
          getLastAssignedKey(filterState) === "rId" ||
          getLastAssignedKey(filterState) === "zId" || getLastAssignedKey(filterState) === "buId") { return true }
        else {
          return false

        }
        case "BG": if (
          getLastAssignedKey(filterState) === "tId" ||
          getLastAssignedKey(filterState) === "rId" ||
          getLastAssignedKey(filterState) === "zId" || getLastAssignedKey(filterState) === "buId" || getLastAssignedKey(filterState) === "bgId") { return true }
        else {
          return false

        }
      }

    }
    else {
      switch (currentFilter) {
        case "Territory": if (
          role === 6) { return true }
        else {
          return false

        }
        case "Region": if (role === 6 || role === 5
        ) { return true }
        else { return false }
        case "Zone": if (role === 6 ||
          role === 5 ||
          role === 4) {
          return true
        }
        else { return false }
        case "BU": if (role === 6 ||
          role === 5 ||
          role === 4 ||
          role === 3) {
          return true
        }
        else {
          false
        }
        case "BG": if (role === 6 ||
          role === 5 ||
          role === 4 ||
          role === 3 ||
          role === 10) {
          return true
        }
        else {
          return false
        }

      }

    }

  }
  return (
    <Layout>
      <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            {name ? name : "Fee Payout"}
          </h2>
          <div className="flex items-center gap-2 cursor-pointer pr-4">
            <div className="flex flex-row gap-2 ">
              {" "}

              {excelLoading ? <LoaderExcel
              /> : <TbFileDownload
                className="text-green-600 cursor-pointer "
                size={32}
                onClick={() => getExcelsheet(
                  filterState.yr,
                  filterState.month,
                  filterState.bgId,
                  filterState.buId,
                  filterState.zId,
                  filterState.rId,
                  filterState.tId,
                  filterState.empCode,
                  filterState.newFil
                )
                }
              ></TbFileDownload>}


            </div>
            <h2>
              <AiTwotoneHome
                className="text-black-500"
                size={34}
                onClick={() => {
                  router.push("/");
                }}
              ></AiTwotoneHome>
            </h2>
          </div>
        </div>

        <div className="flex flex-row gap-4  px-4 pr-8 pb-2">
          <select
            className=" w-full max px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={filterState.yr}
            onChange={(e) =>
              setFilterState({
                ...filterState,
                yr: e.target.value,
              })
            }

          >
            <option value="" className="font-bold" >
              -- Select --
            </option>
            <option value="2021" className="font-bold" >
              2021
            </option>
            <option value="2022" className="font-bold" >
              2022
            </option>
            <option value="2023" className="font-bold" >
              2023
            </option>
            <option value="2024" className="font-bold" >
              2024
            </option>
            <option value="2025" className="font-bold" >
              2025
            </option>
            <option value="2026" className="font-bold" >
              2026
            </option>

          </select>
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
            disabled={!filterState.yr}
          >
            <option value="" className="font-bold">
              Select Month
            </option>

            {
              ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"].map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
          </select>


          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.bgId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                  buId: "All",
                  zId: "All",
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                });
              }
            }}
            disabled={
              filterDisableOption("BG")
            }
          >
            <option value={"All"} className="font-bold">
              - All Business Segment -
            </option>

            {bgData.map((item, idx) => (
              <option value={item.bg_id} key={idx}>
                {item.business_segment}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.buId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,

                  zId: "All",
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                });
              }
            }}
            disabled={filterDisableOption("BU")
            }
          >
            <option value={"All"}>- All Business Unit -</option>

            {buData.map((item, idx) => (
              <option value={item.bu_id} key={idx}>
                {item.business_unit_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.zId}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                  rId: "All",
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                });
              }
            }}
            disabled={filterDisableOption("Zone")
            }
          >
            <option value={"All"}>- All Zone -</option>

            {allZoneData.map((item, idx) => (
              <option value={item.z_id} key={idx}>
                {item.zone_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1  w-1/2 h-8"
            id="stateSelect"
            value={filterState.rId}
            disabled={
              filterDisableOption("Region")}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "All",
                });
              } else {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                });
              }
            }}
          >
            <option value={"All"}>-All Region -</option>

            {allRegionData.map((item, idx) => (
              <option value={item.r_id} key={idx}>
                {item.region_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-1/2 h-8"
            id="stateSelect"
            value={filterState.tId}
            disabled={filterDisableOption("Territory")}
            onChange={(e) =>
              setFilterState({
                ...filterState,
                tId: e.target.value,
              })
            }
          >
            <option value="All">- All Territory -</option>

            {allTerritoryData.map((item, idx) => (
              <option value={item.t_id} key={idx}>
                {item.territory_name}
              </option>
            ))}
          </select>
          <select
            id="attendanceType"
            className="border rounded px-2 py-1 w-full h-8"
            value={filterState.empCode}
            onChange={(e) =>
              setFilterState({ ...filterState, empCode: e.target.value })
            }
          >
            <option value={""}>MR Executive</option>
            {allEmployee.map((item) => (
              <option value={item.empcode}>
                {item.fname} {item.mname} {item.lname} {item.empcode}
              </option>
            ))}
          </select>
          <select
            id="attendanceType"
            className="border rounded px-2 py-1 w-full h-8"
            value={filterState.newFil}
            onChange={(e) =>
              setFilterState({ ...filterState, newFil: e.target.value })
            }
          >
            <option value={"Verify"}>Verify</option>

            <option value={"Approve"}>Approve</option>

            <option value={"All"}>All</option>

          </select>


        </div>

        <div className="overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2 select-none items-start justify-between w-[98%] mx-4 no-scrollbar">
          {downloadLoading ? (
            <Loader />
          ) : (
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Sr. No</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Employee Code</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Employee Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Designation</th>

                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Reporting HQ</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Territory</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Application Fee Amount</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Festival Amt.</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Incentive Amt</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Other Amount</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Gross Salary</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Calendar Days</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Present Day</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Half Day</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Holiday</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Weekly Off</th>

                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Manual Attendance</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Paid Working Days</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Absent</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Total Half Day</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Diff W.O</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Total Calendar Days</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Earning Salary</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Bonus Amount</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Other Amount</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Total Deduction</th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Net Salary
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Total Demo
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Total Field Day
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Total Group Meet
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Total OFM
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Activity Score
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Total Accumulateri ve Salart
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    TDs %
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Tds Amt
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Incentive Disincentive
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Reporting Person
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Region
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Zone
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Business Unit
                  </th>
                  <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                    Resignsstion Date
                  </th>  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">App Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2" key={idx}>
                    <td className="px-4 py-2 text-left">{idx + 1}</td>
                    <td className="px-4 py-2">{item.empcode}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.emp_name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.design}</td>
                    <td className="px-4 py-2">{item.reporting_hq}</td>
                    <td className="px-4 py-2">{item.territory_name}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.in_appl_amt) ? parseFloat(item.in_appl_amt)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.in_fest_amount_e) ? parseFloat(item.in_fest_amount_e)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.in_special_allowance_e) ? parseFloat(item.in_special_allowance_e)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.in_other_amt_e) ? parseFloat(item.in_other_amt_e)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right bg-green-200">{parseFloat(item.grass_salary) ? parseFloat(item.grass_salary)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{item.calender_w_d}</td>
                    <td className="px-4 py-2 text-right">{item.total_mr_present}</td>
                    <td className="px-4 py-2 text-right">{item.hd_count}</td>
                    <td className="px-4 py-2 text-right">{item.h_count}</td>
                    <td className="px-4 py-2 text-right">{item.emp_wo_count}</td>

                    <td className="px-4 py-2 text-right">{item.manual_attendance}</td>
                    <td className="px-4 py-2 text-right bg-green-200">{item.total_working_day}</td>
                    <td className="px-4 py-2 text-right">{item.a_count}</td>
                    <td className="px-4 py-2 text-right">{item.total_hd_count}</td>
                    <td className="px-4 py-2 text-right">{item.w_o_diff}</td>
                    <td className={`px-4 py-2 text-right ${item.calender_w_d !== item.total_calender_day ? "text-red-200" : ""} `}>{item.total_calender_day}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.earning_salary) ? parseFloat(item.earning_salary)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.bonus_amt) ? parseFloat(item.bonus_amt)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.other_amt) ? parseFloat(item.other_amt)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right">{parseFloat(item.total_deduc) ? parseFloat(item.total_deduc)?.toFixed(2) : "-"}</td>
                    <td className="px-4 py-2 text-right bg-green-200">{parseFloat(item.net_salary) ? parseFloat(item.net_salary)?.toFixed(2) : "-"}</td>

                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.total_mr_demo_present ? item.total_mr_demo_present : "-"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.mr_field_present ? item.mr_field_present : "-"}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.mr_meet_1 ? item.mr_meet_1 : "-"
                      }
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.
                        mr_meet_2 ? item.
                        mr_meet_2 : '-'
                      }
                    </td>

                    <td className={`px-4 py-2 dark:border-2 bg-green-200 whitespace-nowrap ${item.total_activity_score < 5 ? "text-red-400" : ""}`}>
                      {parseFloat(item.total_activity_score) ? parseFloat(item.total_activity_score)?.toFixed(2) : "-"}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {parseFloat(item.
                        total_accumulative_vs_salary) ? parseFloat(item.
                          total_accumulative_vs_salary)?.toFixed(2) : "-"}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.
                        tds_percent ? item.
                        tds_percent : "-"
                      }
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">

                      {parseFloat(item.tds_amount) ? parseFloat(item.tds_amount)?.toFixed(2) : "-"}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.incentive_or_disincemtive ? item.incentive_or_disincemtive : "-"}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.emp_status}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.rp_manager}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.region_name}

                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.zone_name}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.business_unit_name}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.resignation_request_date ? moment(item.resignation_request_date).format("DD-MM-YYYY") : "-"}
                    </td>

                    <td className="px-4 py-2 whitespace-nowrap">{item.app_status}</td>
                  </tr>
                ))}
                <tr className="bg-gray-200 font-semibold">
                  <td className="px-4 py-2 text-right" colSpan="6">Total</td>
                  <td className="px-4 py-2 text-right">{total?.applicationFeeAmount ? total?.applicationFeeAmount?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right">{total?.festivalAmount ? total?.festivalAmount?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right">{total?.incentiveAmount ? total?.incentiveAmount?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right">{total?.otherAmount ? total?.otherAmount?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right">{total?.grossSalary ? total?.grossSalary?.toFixed(2) : "-"}</td>

                  <td className="px-4 py-2 text-right" colSpan="11"></td>
                  <td className="px-4 py-2 text-right">{total?.earningSalary ? total?.earningSalary?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right">{total?.bonusAmount ? total?.bonusAmount?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right"></td>
                  <td className="px-4 py-2 text-right">{total?.totalDeduction ? total?.totalDeduction?.toFixed(2) : "-"}</td>
                  <td className="px-4 py-2 text-right">{total?.netSalary ? total?.netSalary?.toFixed(2) : "-"}</td>

                  <td className="px-4 py-2 text-right" colSpan="5"></td>
                </tr>
              </tbody>
            </table>
          )}



          <div className="text-right font-semibold mt-2">Total Rows: {data?.length}</div>
        </div>

      </div>





    </Layout>
  );
};

export default FeePayout;
