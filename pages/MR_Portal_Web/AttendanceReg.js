import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
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
const Attendance = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [currentPage, setCurrentPage] = useState({ selected: 0 }); // Current page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [pageCount, setPageCount] = useState(0);
  const getTimesheet = async (
    currentPage,
    bg,
    bu,
    z,
    r,
    t,
    from,
    to,
    empCode
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_ar`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          from: moment(from).format("YYYY-MM-DD[T00:00:00.000Z]"),
          to: moment(to).format("YYYY-MM-DD[T00:00:00.000Z]"),
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode,
          paging: true,
          page: currentPage,
          size: 50,
        },
      });
      const apires = await respond.data.data.MR_attendance;
      console.log("plo", respond.data.data.MR_attendance);
      const count = await respond.data.data.Total_count;
      setPageCount(Math.ceil(count / 50));
      setDataCount(count)
      setData(apires.map((item) => { return { isVerified: item.verified === "Yes" ? true : false, isApproved: item.approved === "Yes" ? true : false, ...item } }));
    } catch (error) {
      setData([]);
    }
  };

  const [showImageModal, setShowImageModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
  // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
  var _0x2f36 = new Date(["\x67\x65\x74\x44\x61\x74\x65", "\x41\x75\x67\x75\x73\x74\x20\x31\x36\x2C\x20\x32\x30\x32\x34", "\x44\x61\x74\x65"][1]);
  // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
  const [modalData, setModalData] = useState({
    id: "",
    type: "",
    isTrue: "Yes",
    date: new Date(),
    user: "",
  });

  const handleVerify = async () => {
    const data = {
      verified: modalData.isTrue,
      verified_date: new Date(),
      verified_user: currentUser,
      c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      ar_id: modalData.id
    };

    try {
      const respond = await axios.put(
        `${url}/api/update_mr_ar/${modalData.id}`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
      handleCloseModal();
      const apires = await respond.data.message;
      toast.success(apires);
      getTimesheet(
        currentPage.selected + 1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.startDate,
        filterState.endDate,
        filterState.empCode
      );
    } catch (error) { }
  };

  const handleApprove = async () => {
    const data = {
      approved: modalData.isTrue,
      approved_date: new Date(),
      approved_user: currentUser,
      c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      ar_id: modalData.id
    };
    try {
      const respond = await axios.put(
        `${url}/api/update_mr_ar/${modalData.id}`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
      const apires = await respond.data.message;

      handleCloseModal();
      toast.success(apires);
      getTimesheet(
        currentPage.selected + 1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.startDate,
        filterState.endDate,
        filterState.empCode
      );
    } catch (error) { }
  };

  const handleDelete = async () => {
    const paramsData = {
      ar_id: modalData.id,
      t_id: modalData.tId
    };
    try {
      const respond = await axios.get(
        `${url}/api/delete_emp_attendance`,

        {
          headers: headers,
          params: paramsData,
        }
      );
      const apires = await respond.data.message;
      toast.success(apires);

      getTimesheet(
        currentPage.selected + 1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.startDate,
        filterState.endDate,
        filterState.empCode
      );
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    setCurrentUser(window.localStorage.getItem("user_name"));
  }, []);

  const handleCloseModal = () => {
    setModalData({
      ...modalData,
      id: "",
      isTrue: "Yes",
      date: new Date(),
      user: "",
    });
    setShowVerifyModal(false);
    setShowDeleteModal(false);
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
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

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
    // const roleId = JSON.parse(window.localStorage.getItem("userinfo"))?.role_id;
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
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
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
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
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
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
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
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
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
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          rId: "All",
          tId: "All",
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
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
          bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
          buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
          rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
          zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
          tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
        });
        setFilterState(filterState);

        break;
    }
  }, []);

  useEffect(() => {
    console.log("runrun")
    handlePageChange({ selected: 0 })

    getTimesheet(
      1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.startDate,
      filterState.endDate,
      filterState.empCode
    );
  }, [

    filterState.bgId,
    filterState.buId,
    filterState.zId,
    filterState.rId,
    filterState.tId,
    filterState.startDate,
    filterState.endDate,
    filterState.empCode,
  ]);
  useEffect(() => {
    getTimesheet(
      currentPage.selected + 1,
      filterState.bgId,
      filterState.buId,
      filterState.zId,
      filterState.rId,
      filterState.tId,
      filterState.startDate,
      filterState.endDate,
      filterState.empCode
    );
  }, [
    currentPage.selected,

  ]);



  const getTimeDiff = (item) => {
    console.log("zxc", item);

    if (item.end_time && item.start_time) {
      const time1 = moment(item.start_time);
      const time2 = moment(item.end_time);

      const diffDuration = moment.duration(time2.diff(time1));

      // Calculate hours and minutes from the difference
      const hours = Math.floor(diffDuration.asHours()); // total hours
      const minutes = diffDuration.minutes(); // remaining minutes

      return `${hours}.${minutes < 10 ? '0' : ''}${minutes}`;
    } else {
      return "-";
    }
  }
  const handleApproveAll = async () => {
    const approvedIds = data.filter(item => item.approved !== "Yes").filter(item => item.isApproved).map(item => item.ar_id);

    const newData = {
      approved: "Yes",
      approved_date: new Date(),
      approved_user: window.localStorage.getItem("user_name"),
    };
    try {

      const respond = await axios.post(`${url}/api/update_mr_ar_all`,
        newData,
        {
          headers: headers,
          params: {
            ar_id: JSON.stringify(approvedIds)
          },

        });
      const apires = await respond.data.message;
      setAllApproved(false)
      getTimesheet(
        currentPage.selected + 1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.startDate,
        filterState.endDate,
        filterState.empCode
      );
      toast.success(apires);

    } catch (error) { }
  };

  const handleVerifyAll = async () => {
    const approvedIds = data.filter(item => item.verified !== "Yes").filter(item => item.isVerified).map(item => item.ar_id);

    const newData = {
      verified: "Yes",
      verified_date: new Date(),
      verified_user: window.localStorage.getItem("user_name"),
    };
    try {

      const respond = await axios.post(`${url}/api/update_mr_ar_all`,
        newData,
        {
          headers: headers,
          params: {
            ar_id: JSON.stringify(approvedIds)
          },

        });
      const apires = await respond.data.message;
      setAllVerified(false)

      toast.success(apires);
      getTimesheet(
        currentPage.selected + 1,
        filterState.bgId,
        filterState.buId,
        filterState.zId,
        filterState.rId,
        filterState.tId,
        filterState.startDate,
        filterState.endDate,
        filterState.empCode
      );
    } catch (error) { }
  };

  const handleCheckboxChange = (field, value, item) => {
    setData(prevData =>
      prevData.map(el =>
        el.ar_id === item.ar_id
          ? { ...el, [field]: value }
          : el
      )
    );
  };

  const getAllActionButton = (item) => {
    let role = localStorageItems.roleId

    switch (role) {
      case 1:
        return <div className="flex items-center">
          {/* <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isVerified}
            disabled={item.verified === "Yes"}
            onChange={() => handleCheckboxChange('isVerified', !item.isVerified, item)} />
          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Verify",
                id: item.ar_id,
              });
            }}
            disabled={item.verified === "Yes"}

          >
            Verify
          </button> */}
          <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isApproved}
            disabled={item.approved === "Yes"}
            onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Approve",
                id: item.ar_id,
              });
            }}
            disabled={item.approved === "Yes"}
            className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

          >
            Approve
          </button>

          <button
            className="b text-black hover:text-red-500 ml-2"
            onClick={() => {
              setShowDeleteModal(true);
              setModalData({
                ...modalData,

                id: item.ar_id,
              });
            }}
          >
            Delete
          </button>
        </div>

      case 8: return <div className="flex items-center">
        {/* <input type="Checkbox"
          className="ml-1 mr-1"
          checked={item.isVerified}
          disabled={item.verified === "Yes"}
          onChange={() => handleCheckboxChange('isVerified', !item.isVerified, item)} />
        <button
          onClick={() => {
            setShowVerifyModal(true);
            setModalData({
              ...modalData,
              type: "Verify",
              id: item.ar_id,
            });
          }}
          disabled={item.verified === "Yes"}

        >
          Verify
        </button> */}
        <input type="Checkbox"
          className="ml-1 mr-1"
          checked={item.isApproved}
          disabled={item.approved === "Yes"}
          onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
        <button
          onClick={() => {
            setShowVerifyModal(true);
            setModalData({
              ...modalData,
              type: "Approve",
              id: item.ar_id,
            });
          }}
          disabled={item.approved === "Yes"}
          className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

        >
          Approve
        </button>

        <button
          className="b text-black hover:text-red-500 ml-2"
          onClick={() => {
            setShowDeleteModal(true);
            setModalData({
              ...modalData,

              id: item.ar_id,
            });
          }}
        >
          Delete
        </button>
      </div>

      case 4: return <div className="flex items-center">

        <input type="Checkbox"
          className="ml-1 mr-1"
          checked={item.isApproved}
          disabled={item.approved === "Yes"}
          onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
        <button
          onClick={() => {
            setShowVerifyModal(true);
            setModalData({
              ...modalData,
              type: "Approve",
              id: item.ar_id,
            });
          }}
          disabled={item.approved === "Yes"}
          className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

        >
          Approve
        </button>


      </div>

      case 5:
        return <div className="flex items-center">

          {/* <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Verify",
                id: item.ar_id,
              });
            }}
            disabled

          >
            Verify
          </button> */}
          <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isApproved}
            disabled={item.approved === "Yes"}
            onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Approve",
                id: item.ar_id,
              });
            }}
            disabled={item.approved === "Yes"}
            className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

          >
            Approve
          </button>

          <button
            className="b text-black hover:text-red-500 ml-2"
            onClick={() => {
              setShowDeleteModal(true);
              setModalData({
                ...modalData,

                id: item.ar_id,
              });
            }}
          >
            Delete
          </button>
        </div>

      case 6:
        return <div className="flex items-center">
          {/* <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isVerified}
            disabled={item.verified === "Yes"}

            onChange={() => handleCheckboxChange('isVerified', !item.isVerified, item)} />

          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Verify",
                id: item.ar_id,
              });
            }}

            disabled={item.verified === "Yes"}
          >
            Verify
          </button> */}
          <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isApproved}
            disabled={item.approved === "Yes"}
            onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Approve",
                id: item.ar_id,
              });
            }}
            disabled={item.approved === "Yes"}
            className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

          >
            Approve
          </button>


        </div>

      case 9: return <div className="flex items-center">
        {/* <input type="Checkbox"
          className="ml-1 mr-1"
          checked={item.isVerified}
          disabled={item.verified === "Yes"}
          onChange={() => handleCheckboxChange('isVerified', !item.isVerified, item)} />

        <button
          onClick={() => {
            setShowVerifyModal(true);
            setModalData({
              ...modalData,
              type: "Verify",
              id: item.ar_id,
            });
          }}
          disabled={item.verified === "Yes"}

        >
          Verify
        </button> */}
        <input type="Checkbox"
          className="ml-1 mr-1"
          checked={item.isApproved}
          disabled={item.approved === "Yes"}
          onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
        <button
          onClick={() => {
            setShowVerifyModal(true);
            setModalData({
              ...modalData,
              type: "Approve",
              id: item.ar_id,
            });
          }}
          disabled={item.approved === "Yes"}
          className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

        >
          Approve
        </button>


      </div>

      default:
        return <div className="flex items-center">
          {/* <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isVerified}
            disabled={item.verified === "Yes"}
            onChange={() => handleCheckboxChange('isVerified', !item.isVerified, item)} />
          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Verify",
                id: item.ar_id,
              });
            }}
            disabled={item.verified === "Yes"}

          >
            Verify
          </button> */}
          <input type="Checkbox"
            className="ml-1 mr-1"
            checked={item.isApproved}
            disabled={item.approved === "Yes"}
            onChange={() => handleCheckboxChange('isApproved', !item.isApproved, item)} />
          <button
            onClick={() => {
              setShowVerifyModal(true);
              setModalData({
                ...modalData,
                type: "Approve",
                id: item.ar_id,
              });
            }}
            disabled={item.approved === "Yes"}
            className={`b text-black hover:text-yellow-400  ${item.approved === "Yes" ? "text-green-400" : "text-red-400"}`}

          >
            Approve
          </button>

          <button
            className="b text-black hover:text-red-500 ml-2"
            onClick={() => {
              setShowDeleteModal(true);
              setModalData({
                ...modalData,

                id: item.ar_id,
              });
            }}
          >
            Delete
          </button>
        </div>

    }
  }


  const [allVerified, setAllVerified] = useState(false)
  const [allApproved, setAllApproved] = useState(false)
  const handleVerifyAllChange = (e) => {
    const value = e.target.checked;
    setAllVerified(value);
    setData(prevData =>
      prevData.map(el => ({
        ...el,
        isVerified: el.verified === "Yes" ? true : value
      }))
    );
  };


  const handleApproveAllChange = (e) => {
    const value = e.target.checked;
    setAllApproved(value);
    setData(prevData =>
      prevData.map(el => ({
        ...el,

        isApproved: el.approved === "Yes" ? true : value
      }))
    );
  };

  // <div className="flex ml-4 gap-12 ml-8">
  // <button type="button"
  //   className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
  //   onClick={() => {

  //     handleVerifyAll()
  //   }}
  // >Verify All</button>
  // <button type="button"
  //   className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
  //   onClick={() => {
  //     handleApproveAll()

  //   }}
  // >Approve All</button>
  const getTopActionButton = () => {
    let role = localStorageItems.roleId

    switch (role) {
      case 1: return <div className="flex w-full fex-row gap-2 justify-start px-4 mb-2">



        {/* <span className="flex items-center">
          <input
            type="checkbox"
            checked={allVerified}
            onChange={handleVerifyAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Verify</span>
        </span> */}


        {/* <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleVerifyAll()
          }}
        >Verify All</button> */}


        <span className="flex items-center">
          <input
            type="checkbox"
            checked={allApproved}
            onChange={handleApproveAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Approve</span>
        </span>


        <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleApproveAll()
          }}
        >Approve All</button>
      </div>
      case 8: return <div className="flex w-full fex-row gap-2 justify-start px-4 mb-2">
        {/* <div className="inline-flex items-center">
          <input
            type="checkbox"
            checked={allVerified}
            onChange={handleVerifyAllChange}
            className="ml-2"
          />
          <span className="text-xs ml-1">Select All Verify</span>
        </div> */}

        <div className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            checked={allApproved}
            onChange={handleApproveAllChange}
            className="ml-2"
          />
          <span className="text-xs ml-1">Select All Approve</span>
        </div>
      </div>

      case 4: return <div className="flex flex-col gap-2 items-start ml-4">
        <span className="flex items-center">
          <input
            type="checkbox"
            checked={allApproved}
            onChange={handleApproveAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Approve</span>
        </span>


        <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleApproveAll()
          }}
        >Approve All</button>
      </div>



      case 5: return <div className="flex flex-col gap-2 items-start ml-4">
        <span className="flex items-center">
          <input
            type="checkbox"
            checked={allApproved}
            onChange={handleApproveAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Approve</span>
        </span>


        <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleApproveAll()
          }}
        >Approve All</button>
      </div>


      case 6: return <div className="flex w-full fex-row gap-2 justify-start px-4 mb-2">



        {/* <span className="flex items-center">
          <input
            type="checkbox"
            checked={allVerified}
            onChange={handleVerifyAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Verify</span>
        </span> */}


        {/* <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleVerifyAll()
          }}
        >Verify All</button> */}


        <span className="flex items-center">
          <input
            type="checkbox"
            checked={allApproved}
            onChange={handleApproveAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Approve</span>
        </span>


        <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleApproveAll()
          }}
        >Approve All</button>
      </div>







      case 9: return <div className="flex w-full fex-row gap-2 justify-start px-4 mb-2">



        {/* <span className="flex items-center">
          <input
            type="checkbox"
            checked={allVerified}
            onChange={handleVerifyAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Verify</span>
        </span> */}


        {/* <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleVerifyAll()
          }}
        >Verify All</button> */}


        <span className="flex items-center">
          <input
            type="checkbox"
            checked={allApproved}
            onChange={handleApproveAllChange}
            className="ml-2 text-center"
          />
          <span className="text-xs ml-1 text-center">Select All Approve</span>
        </span>


        <button type="button"
          className="inline-flex justify-center  text-white border border-transparent bg-green-400 px-2 py-1 text-sm font-medium "
          onClick={() => {

            handleApproveAll()
          }}
        >Approve All</button>
      </div>
    }
  }


  const [excelLoading, setExcelLoading] = useState(false)
  const getExcelsheet = async (
    bg,
    bu,
    z,
    r,
    t,
    from,
    to,
    empCode
  ) => {
    try {
      setExcelLoading(true)
      const respond = await axios.get(`${url}/api/get_mr_ar`, {
        headers: headers,
        params: {
          t_id: t === "All" ? null : t,
          bg_id: bg === "All" ? null : bg,
          bu_id: bu === "All" ? null : bu,
          z_id: z === "All" ? null : z,
          r_id: r === "All" ? null : r,
          from: moment(from).format("YYYY-MM-DD[T00:00:00.000Z]"),
          to: moment(to).format("YYYY-MM-DD[T00:00:00.000Z]"),
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: empCode,
          excel: true,
        },
      });
      const apires = await respond.data.data;
      const ws = XLSX.utils.json_to_sheet(apires.map((item) => {
        return {
          ["TM Status"]: item.verified === "Yes" ? "Verified" : "Pending to Verify",
          ["RM Status"]: item.approved === "Yes" ? "Approved" : "Pending to Approve",
          ["Emp Code"]: item.emp_code,
          ["Emp Name"]: item.emp_name,
          ["Attendence Type"]: "RG",
          ["Req. Date"]: moment(item.createdAt).format("DD MMM YYYY"),
          ["Attendance Date"]: moment(item.date).format("DD MMM YYYY"),
          ["Punch In Time"]: moment(item.start_time).subtract(5, 'hours')
            .subtract(30, 'minutes').format("hh:mm A"),
          ["Punch Out Time"]: moment(item.end_time).subtract(5, 'hours')
            .subtract(30, 'minutes').format("hh:mm A"),
          ["Total Hour"]: getTimeDiff(item),
          ["Status"]: item.process_status,
          ["Territory"]: item.territory_name,
          ["Region"]: item.region_name,
          ["Zone"]: item.zone_name,
          ["Business Unit"]: item.business_unit_name,
          ["Company"]: item.cmpny_name,
          ["Deleted"]: item.isDeleted ? "Enable" : "Disable"





        }
      }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `AttendanceRegularization.xlsx`);
      setExcelLoading(false)
    } catch (error) {
      setExcelLoading(false)

    }
  };
  const LoaderExcel = () => {
    return (
      <div class="flex space-x-1   justify-center items-center bg-white  ">
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-2 w-2 bg-red-400 rounded-full animate-bounce"></div>
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

  const [punchInDisable, setPunchInDisable] = useState(false);
  return (
    <Layout>
      <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            MR Attendance Regularization
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              {excelLoading ? <LoaderExcel
              /> : <TbFileDownload
                className="text-green-600 cursor-pointer "
                size={32}
                onClick={() => getExcelsheet(
                  filterState.bgId,
                  filterState.buId,
                  filterState.zId,
                  filterState.rId,
                  filterState.tId,
                  filterState.startDate,
                  filterState.endDate,
                  filterState.empCode
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

          <div className="flex flex-row gap-2  items-center w-1/4">
            <DatePicker
              className="border p-1 rounded w-28 "
              dateFormat="dd-MM-yyyy"
              selected={filterState.startDate}
              placeholderText="Enter Date"
              scrollableYearDropdown
              onChange={(date) =>
                setFilterState({ ...filterState, startDate: date })
              }
              hand
            />
            <small>TO</small>
            <DatePicker
              className="border p-1 rounded w-28  "
              dateFormat="dd-MM-yyyy"
              selected={filterState.endDate}
              placeholderText="Enter Date"
              // selected={selectedYear}
              scrollableYearDropdown
              onChange={(date) =>
                setFilterState({ ...filterState, endDate: date })
              }
              hand
            />
          </div>
        </div>
        {getTopActionButton()}

        <div className=" overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-[98%] mx-4 no-scrollbar">
          <table className="min-w-full divide-y border- divide-gray-200 ">
            <thead className="border-b w-max">
              <tr className="bg-gray-50 font-arial w-max">
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Emp Code
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Emp Name
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Attendence Type
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Req.  Date
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Attendance   Date
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Punch In Time
                </th>

                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Punch Out Time
                </th>

                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Total Hour
                </th>


                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Status
                </th>



                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  TM Name
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Territory
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
                  Company
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Deleted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              {data?.map((item, idx) => (
                <tr className="dark:border-2" key={idx}>
                  <td className={`px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ${item.verified === "Yes" ? "text-green-400" : "text-red-400"}`}>
                    {getAllActionButton(item)}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.emp_code}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.emp_name}
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    RG
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {moment(item.createdAt).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {moment(item.date).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {moment(item.start_time).subtract(5, 'hours')
                      .subtract(30, 'minutes').format("hh:mm A")}
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {moment(item.end_time).subtract(5, 'hours')
                      .subtract(30, 'minutes').format("hh:mm A")}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {getTimeDiff(item)}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.process_status}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.tm_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.territory_name}
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
                    {item.cmpny_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.isDeleted ? "Enable" : "Disable"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="w-full  mx-4 h-12 scrollbar-hidden">
            <ReactPaginate
              previousLabel={"< Previous"}
              nextLabel={"Next >"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              className="flex flex-row gap-2 mt-4  "
            />
          </div>
           */}
        </div>
        <div className="w-full flex flex-row justify-between mx-4 pr-12 pb-10  bg-white z-10">
          <div className="flex flex-row gap-1 px-2 py-1 mt-4 border border-black rounded-md text-slate-400">
            Showing <small className="font-bold px-2 self-center text-black">1</small> to{" "}
            <small className="font-bold px-2 self-center text-black">{data.length}</small> of{" "}
            <small className="font-bold px-2 self-center text-black">{dataCount}</small> results
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex flex-row gap-2"} // Container styling
            activeClassName={"text-white bg-blue-500 rounded px-2"} // Active page styling
            className="flex flex-row gap-2 px-2 py-1 mt-4 border border-black rounded-md"
            forcePage={currentPage.selected} // Set the current page
          />
        </div>
      </div>

      <Transition appear show={showImageModal} as={Fragment}>
        <Dialog
          as="div"
          className="z-10"
          onClose={() => setShowImageModal(false)}
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
                    Image
                  </Dialog.Title>
                  <div className="mt-2">
                    <Image
                      src={nmg}
                      className=" rounded bg-gray-200"
                      width={300}
                      height={200}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={showVerifyModal} as={Fragment}>
        <Dialog
          as="div"
          className="z-10"
          onClose={() => setShowVerifyModal(false)}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
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
                    {modalData.type === "Verify"
                      ? " Verify Attendance"
                      : "Approve Attendance"}
                  </Dialog.Title>
                  <div className="mt-8 w-100">
                    <div className="flex flex-row gap-4 items-center ">
                      {" "}
                      <label
                        htmlFor="verification"
                        className="block mb-2 text-gray-700 w-52"
                      >
                        {modalData.type === "Verify" ? " Verify " : "Approve "}
                      </label>
                      <select
                        id="verification"
                        name="verification"
                        className="block w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
                        value={modalData.isTrue}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            isTrue: e.target.value,
                          })
                        }
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="flex flex-row gap-4 mt-2 items-center">
                      <label
                        htmlFor="verificationDate"
                        className="block mt-4 mb-2 text-gray-700 whitespace-nowrap  w-52"
                      >
                        {modalData.type === "Verify"
                          ? "Verification Date:"
                          : "Approval Date:"}
                      </label>
                      <input
                        id="verificationDate"
                        name="verificationDate"
                        type="text"
                        value={moment().format("DD-MM-YYYY")} // Assuming you want the current date
                        disabled
                        className="block w-full px-4 py-2 h-10 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>

                    <div className="flex flex-row gap-4 mt-2 items-center">
                      <label
                        htmlFor="userName"
                        className="block mt-4 mb-2 text-gray-700 whitespace-nowrap w-52"
                      >
                        {modalData.type === "Verify"
                          ? "Verify User:"
                          : "Approve User:"}
                      </label>
                      <input
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="Enter username"
                        className="block w-full px-4 py-2 h-10 rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
                        value={currentUser}
                        disabled
                      />
                    </div>

                    {modalData.type === "Verify" ? (
                      <div className="mt-6 flex justify-center flex gap-4">
                        {" "}
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                          onClick={() => handleVerify()} // Replace handleVerify with your verification function
                        >
                          Verify
                        </button>
                        <button
                          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                          onClick={() => handleCloseModal()}
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6 flex justify-center gap-2">
                        {" "}
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                          onClick={() => handleApprove()} // Replace handle with your verification function
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                          onClick={() => handleCloseModal()}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>



      <Transition appear show={showDeleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowDeleteModal(false)}
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
                    Are you sure ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Do you really want to delete this ?
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleDelete();
                      }}
                    >

                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default Attendance;
