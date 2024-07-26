import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import nmg from "./banner.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import Layout from "@/components/Layout1";
import moment from "moment";
const DemoTable = () => {
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
  const [pageCount, setPageCount] = useState(0);
  const getFarmerDemo = async (currentPage) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_form_demo`, {
        headers: headers,
        params: {
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          emp_code: window.localStorage.getItem("emp_code"),
          paging: true,
          page: currentPage,
          size: 50,
        },
      });
      const apires = await respond.data.data.MR_demo;
      const count = await respond.data.data.Total_count;

      setPageCount(Math.ceil(count / 50));
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getFarmerDemo(currentPage.selected + 1);
  }, [currentPage.selected]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    };

    try {
      const respond = await axios.put(
        `${url}/api/update_mr_demo/${modalData.id}`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
      const apires = await respond.data.message;

      toast.success(apires);

      getFarmerDemo(currentPage.selected + 1);
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
    }
  };

  const handleApprove = async () => {
    const data = {
      approved: modalData.isTrue,
      approved_date: new Date(),
      approved_user: currentUser,
    };
    try {
      const respond = await axios.put(
        `${url}/api/update_mr_demo/${modalData.id}`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
      const apires = await respond.data.message;

      handleCloseModal();
      toast.success(apires);
      getFarmerDemo(currentPage.selected + 1);
    } catch (error) {
      handleCloseModal();
    }
  };

  const handleDelete = async () => {
    const paramsData = {
      f_demo_id: modalData.id,
    };
    try {
      const respond = await axios.get(
        `${url}/api/delete_mr_form_demo`,

        {
          headers: headers,
          params: paramsData,
        }
      );
      const apires = await respond.data.message;
      toast.success(apires);

      getFarmerDemo(currentPage.selected + 1);
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
      id: "",
      type: "",
      isTrue: "Yes",
      date: "",
      user: "",
    });
    setShowVerifyModal(false);
    setShowDeleteModal(false);
  };
  const tableRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

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
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
    } catch (error) {}
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
    } catch (error) {}
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

      setAllEmployee(apires);
    } catch (error) {}
  };
  useEffect(() => {
    getAllEmployeeData();
  }, []);
  2;
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
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        });
        setFilterState(filterState);

        break;
    }
  }, []);
  return (
    <Layout>
      <div className="absolute h-full overflow-y-auto  mx-4 w-full overflow-x-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Farmer Demo Table
          </h2>
          <div className="flex items-center gap-2 cursor-pointer pr-4">
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
                  buId: "",
                  zId: "",
                  rId: "",
                  tId: "",
                });
              } else {
                setFilterState({
                  ...filterState,
                  bgId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3 ||
              localStorageItems.roleId === 10
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

                  zId: "",
                  rId: "",
                  tId: "",
                });
              } else {
                setFilterState({
                  ...filterState,
                  buId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4 ||
              localStorageItems.roleId === 3
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
                  rId: "",
                  tId: "",
                });
              } else {
                setFilterState({
                  ...filterState,
                  zId: e.target.value,
                });
              }
            }}
            disabled={
              localStorageItems.roleId === 6 ||
              localStorageItems.roleId === 5 ||
              localStorageItems.roleId === 4
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
              localStorageItems.roleId === 6 || localStorageItems.roleId === 5
            }
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterState({
                  ...filterState,
                  rId: e.target.value,
                  tId: "",
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
            disabled={localStorageItems.roleId === 6}
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
              // onChange={handleYearChange}
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
              // onChange={handleYearChange}
              hand
            />
          </div>
        </div>

        <div className=" absolute overflow-x-auto overflow-y-hidden bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-[98%] mx-4 no-scrollbar">
          <table className="min-w-full divide-y border- divide-gray-200 ">
            <thead className="border-b w-max">
              <tr className="bg-gray-50 font-arial w-max">
                <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                  F Demo Code
                </th>

                <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Purpose
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Dealer
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Farmer Mobile No
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Farmer Id
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Farmer Name
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Farmer Father Name
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Farmer Type
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Plot Size
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Village
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Demo Photo
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Field Photo
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Potential
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Next Visit Date
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Territory
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  User
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Deleted
                </th>
                <th className="px-4 py-2  text-left dark:border-2 text-xs font-medium text-gray-500 tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs">
              {data.map((item, idx) => (
                <tr className="dark:border-2" key={idx}>
                  <td className="px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                    <button
                      onClick={() => {
                        setImgUrl(item.field_photo_url);
                        setIsOpen(true);
                      }}
                      className="b text-black hover:text-blue-500 mr-2  "
                    >
                      View Field Image
                    </button>
                    <button
                      onClick={() => {
                        setShowVerifyModal(true);
                        setModalData({
                          ...modalData,
                          type: "Verify",
                          id: item.f_demo_id,
                        });
                      }}
                      disabled={item.verified === "Yes"}
                      className="b text-black hover:text-blue-500  "
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => {
                        setShowVerifyModal(true);
                        setModalData({
                          ...modalData,
                          type: "Approve",
                          id: item.f_demo_id,
                        });
                      }}
                      disabled={item.approved === "Yes"}
                      className="b text-black hover:text-yellow-400 ml-2"
                    >
                      Approve
                    </button>
                    <button
                      className="b text-black hover:text-red-500 ml-2"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setModalData({
                          ...modalData,

                          id: item.f_demo_id,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.f_demo_code}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {moment(item.demo_date).format("MM/DD/YYYY")}
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.purpose_of_demo}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.dealer_des}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.farmer_mob_no}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.farmer_id}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.farmer_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.farmer_father_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.farmer_type}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.plot_size}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.village}
                  </td>
                  <td
                    className="px-4 py-2 dark:border-2 whitespace-nowrap"
                    onClick={() => setShowImageModal(true)}
                  >
                    View
                  </td>
                  <td
                    className="px-4 py-2 dark:border-2 whitespace-nowrap"
                    onClick={() => setShowImageModal(true)}
                  >
                    View
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.potential_farmer}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {moment(item.next_visit_date).format("MM/DD/YYYY")}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.territory_name}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.user_name}
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.isDeleted ? "Yes" : "No"}
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full  mx-4 h-12 ">
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

          {/* <div className="w-full flex flex-row justify-between mx-4   pr-8">
          <div className="flex flex-row justify-center items-center">
            Showing <small className="font-bold px-2 self-center">1</small> to{" "}
            <small className="font-bold px-2 self-center">1</small> of{" "}
            <small className="font-bold px-2 self-center">2</small> results
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            className="flex flex-row gap-2 px-2 py-1 mt-4 border-2 border-black rounded-md"
          />
        </div> */}
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
                      ? " Verify Demo"
                      : "Approve Demo"}
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
                        value={new Date().toLocaleDateString()} // Assuming you want the current date
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
                      <div className="mt-6 flex justify-between">
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
                      <div className="mt-6 flex justify-between">
                        {" "}
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                          onClick={() => handleApprove()} // Replace handleVerify with your verification function
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

                  <div className="mt-4 flex items-center justify-between">
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
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
                    Farmer Filed Day Image
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
    </Layout>
  );
};

export default DemoTable;
