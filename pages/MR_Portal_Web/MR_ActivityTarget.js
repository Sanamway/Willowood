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

const BusinessSegment = () => {
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

  const [filter, setFilter] = useState({
    cId: "",
    bgId: "",
    buId: "",
    yr: "",
    mrCat: "",
  });

  useEffect(() => {
    if (router.query.type === "Add") return;
    setFilter({
      cId: router.query.cId,
      bgId: router.query.bgId,
      buId: router.query.buId,
      yr: router.query.yr,
      mrCat: router.query.mrcId,
      yr: new Date(router.query.yr),
    });
  }, [
    router.query.mraId,
    router.query.mrcId,
    router.query.cId,
    router.query.bgId,
    router.query.buId,
  ]);

  const [companyInfo, setCompanyInfo] = useState([]);
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setCompanyInfo(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const [bgData, setBgData] = useState([]);
  const getBusinesSegmentInfo = async (cId) => {
    try {
      const respond = await axios.get(`${url}/api/get_business_segment`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setBgData(apires.filter((item) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesSegmentInfo(filter.cId);
  }, [filter.cId]);

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
    if (!filter.bgId) return;
    getBusinessUnitInfo(filter.bgId);
  }, [filter.bgId]);

  const { name } = router.query;

  const [selectedYear, setSelectedYear] = useState(null);
  const [monthList, setMonthList] = useState([]);
 
  const handleYearChange = (date) => {
    if (date) {
      const selectedYear = date.getFullYear();
      setSelectedYear(date);
      generateMonthList(selectedYear);
    }
  };

  const generateMonthList = (year, data) => {
    const months = [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ];
    let monthList;
    if (router.query.type === "Add") {
      monthList = months.map((month, index) => {
        return {
          month: month,
          year: year,

          t_demo: "",
          t_f_day: "",
          t_ifc: "",
          t_fgm: "",
          t_ofm: "",
          t_mfm: "",
          t_rtp: "",
          t_shc: "",

          m_demo: "",
          m_f_day: "",
          m_ifc: "",
          m_fgm: "",
          m_ofm: "",
          m_mfm: "",
          m_rtp: "",
          m_shc: "",

          w_demo: "",
          w_f_day: "",
          w_ifc: "",
          w_fgm: "",
          w_ofm: "",
          w_mfm: "",
          w_rtp: "",
          w_shc: "",
        };
      });
    } else {
      monthList = months.map((month) => {
        let newData = data.filter((item) => item.month === month)[0];
        return {
          month: month,
          year: year,
          t_demo: newData.t_demo,
          t_f_day: newData.t_f_day,
          t_ifc: newData.t_ifc,
          t_fgm: newData.t_fgm,
          t_ofm: newData.t_ofm,
          t_mfm: newData.t_mfm,
          t_rtp: newData.t_rtp,
          t_shc: newData.t_shc,

          m_demo: newData.m_demo,
          m_f_day: newData.m_f_day,
          m_ifc: newData.m_ifc,
          m_fgm: newData.m_fgm,
          m_ofm: newData.m_ofm,
          m_mfm: newData.m_mfm,
          m_rtp: newData.m_rtp,
          m_shc: newData.m_shc,

          w_demo: newData.w_demo,
          w_f_day: newData.w_f_day,
          w_ifc: newData.w_ifc,
          w_fgm: newData.w_fgm,
          w_ofm: newData.w_ofm,
          w_mfm: newData.w_mfm,
          w_rtp: newData.w_rtp,
          w_shc: newData.w_shc,
        };
      });
    }
    setMonthList(monthList);
  };

  const [allMrData, setAllMrData] = useState([]);
  const [localItems, setLocalItems] = useState({
    cId: "",
  });
  const getMrCatData = async (cId) => {
    try {
      setLocalItems({
        cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      });
      const respond = await axios.get(`${url}/api/get_mr_category`, {
        params: {
          c_id: 1,
        },
        headers: headers,
      });
      const apires = await respond.data.data;
      setAllMrData(apires);
    } catch (error) {}
  };
  useEffect(() => {
    getMrCatData();
  }, []);

  const handleSave = () => {
    if (router.query.type === "Add") {
      handleAdd();
    } else {
      handleEdit();
    }
  };
  const handleEdit = async () => {
    try {
      const data = {
        data: monthList.map((item) => {
          return {
            ...item,
            bg_id: Number(filter.bgId),
            bu_id: Number(filter.buId),
            c_id: Number(filter.cId),
            mrc_id: filter.mrCat,
            mr_Category_name: allMrData.filter(
              (item) => Number(item.mrc_id) === Number(filter.mrCat)
            )[0].mr_Category_name,

            activity_score_demo:
              (item.m_demo * item.w_demo ) / 100,
            activity_score_f_day:
              (item.m_f_day * item.w_f_day ) / 100,
            activity_score_ifc: (item.m_ifc  * item.w_ifc) / 100,
            activity_score_fgm: (item.m_fgm  * item.w_fgm) / 100,
            activity_score_ofm: (item.m_ofm  * item.w_ofm) / 100,
            activity_score_mfm: (item.m_mfm  * item.w_mfm) / 100,
          
          };
        }),
      };

      const respond = await axios
        .post(`${url}/api/update_mr_activity`, JSON.stringify(data), {
          headers: headers,
          params: {
            c_id: router.query.cId,
            bg_id: router.query.bgId,
            bu_id: router.query.buId,
            mrc_id: router.query.mrcId,
            mra_id: router.query.mraId,
            year: router.query.yr,
          },
        })
        .then((res) => {
          console.log("res", res.data);
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/Table_MR_ActivityTarget",
          });
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("All Filters are mandatory");
      }
    }
  };
  const handleAdd = async () => {
    try {
      const data = {
        data: monthList.map((item) => {
          return {
            ...item,
            bg_id: Number(filter.bgId) || null,
            bu_id: Number(filter.buId) || null,
            c_id: localItems.cId || null,
            mrc_id: filter.mrCat || null,
            mr_Category_name:
              allMrData.filter(
                (item) => Number(item.mrc_id) === Number(filter.mrCat)
              )[0].mr_Category_name || null,
            activity_score_demo:
              (item.m_demo * item.w_demo ) / 100,
            activity_score_f_day:
              (item.m_f_day * item.w_f_day ) / 100,
            activity_score_ifc: (item.m_ifc  * item.w_ifc) / 100,
            activity_score_fgm: (item.m_fgm  * item.w_fgm) / 100,
            activity_score_ofm: (item.m_ofm  * item.w_ofm) / 100,
            activity_score_mfm: (item.m_mfm  * item.w_mfm) / 100,
          
          };
        }),
      };

      const respond = await axios
        .post(`${url}/api/add_mr_activity`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          toast.success(res.data.message);
          router.push({
            pathname: "/MR_Portal_Web/Table_MR_ActivityTarget",
          });
        });
    } catch (errors) {
      console.log("pop", errors);
      const errorMessage = errors?.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("All Filters are mandatory");
      }
    }
  };

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_activity`, {
        headers: headers,
        params: {
          c_id: router.query.cId,
          bg_id: router.query.bgId,
          bu_id: router.query.buId,
          mrc_id: router.query.mrcId,
          mra_id: router.query.mraId,
          year: router.query.yr,
        },
      });
      const apires = await respond.data.data;
      generateMonthList(router.query.yr, apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, [
    router.query.mraId,
    router.query.mrcId,
    router.query.cId,
    router.query.bgId,
    router.query.buId,
  ]);

  return (
    <Layout>
      <div className="w-full font-arial bg-white h-full absolute overflow-y-auto overflow-x-hidden no-scrollbar ">
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="flex flex-row m-4 w-full gap-2">
          <select
            id="attendanceType"
            className="  border p-1 rounded ml-2 w-72"
            value={localItems.cId}
            onChange={(e) => setFilter({ ...filter, cId: e.target.value })}
            disabled
          >
            <option value={""}>Company Info</option>
            {companyInfo.map((item) => (
              <option value={item.c_id}>{item.cmpny_name}</option>
            ))}
          </select>

          <select
            id="attendanceType"
            className="border p-1 rounded ml-2 w-72"
            value={filter.bgId}
            onChange={(e) => setFilter({ ...filter, bgId: e.target.value })}
            disabled={router.query.type !== "Add"}
          >
            <option value={""}>Business Segment</option>
            {bgData.map((item) => (
              <option value={item.bg_id}>{item.business_segment}</option>
            ))}
          </select>

          <select
            id="attendanceType"
            className="  border p-1 rounded ml-2 w-72"
            value={filter.buId}
            onChange={(e) => setFilter({ ...filter, buId: e.target.value })}
            disabled={router.query.type !== "Add"}
          >
            <option value={""}>Business Unit</option>
            {buData.map((item) => (
              <option value={item.bu_id}>{item.business_unit_name}</option>
            ))}
          </select>

          {router.query.type === "Add" ? (
            <DatePicker
              className="border p-1 rounded ml-2 w-72"
              showYearDropdown
              dateFormat="yyyy"
              placeholderText="Enter Year"
              yearDropdownItemNumber={15}
              selected={selectedYear}
              scrollableYearDropdown
              onChange={handleYearChange}
              hand
              showYearPicker
              minDate={new Date(new Date().getFullYear(), 0, 1)}
            />
          ) : (
            <input
              value={moment(filter.yr).format("YYYY")}
              disabled
              className="border p-1 rounded ml-2 w-72"
            />
          )}
          <select
            id="attendanceType"
            className="w-72  border p-1 rounded ml-2  w-72"
            value={filter.mrCat}
            onChange={(e) => setFilter({ ...filter, mrCat: e.target.value })}
            disabled={router.query.type !== "Add"}
          >
            <option value={""}>Select MR Category</option>
            {allMrData.map((item) => (
              <option value={item.mrc_id}>{item.mr_Category_name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white  max-w-full pb-12 ">
          <div className=" text-black font-arial  w-full p-1 h-max  ">
            <table className="min-w-full divide-y border- divide-gray-200 font-bold">
              <thead className="border-b w-max">
                <tr className="bg-sky-800 font-arial w-max ">
                  <th className="px-4 py-2 text-left border-black border-x-2  border-t-2 text-xs font-medium text-white whitespace-nowrap  tracking-wider">
                    Month-Year
                  </th>
                  <th className="px-4 py-2  text-left w-max border-black border-x-2  border-t-2 text-xs font-medium text-white  tracking-wider">
                    Activity
                  </th>

                  <th className="px-4 py-2   text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    Demo
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    F.Day
                  </th>

                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    IFC
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    FGM
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    OFM
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    MFM
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    RTP
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    SHC
                  </th>

                  <th className="w-40 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {monthList.map((item, index) => (
                  <tr className="dark:border-2">
                    <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {`${item.month} - ${item.year}`}
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Expect Target"
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="HR Min Ach."
                            disabled
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-left text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-28 text-white h-6 bg-sky-800 "
                            value="Weightage %"
                            disabled
                          />
                        </li>
                        <li className="  flex justify-left bg-green-400  text-black   p-1  ">
                          <input
                            className="p-0 w-28 h-6   text-white bg-green-400"
                            value="Activity Score"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_demo ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_demo}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_demo: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center  text-black   p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_demo ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_demo}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_demo: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center  text-black p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_demo ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_demo}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_demo: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>

                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${"bg-yellow-100"}`}
                            type="number"
                            value={
                              ((item.m_demo * item.w_demo ) / 100).toFixed(2)
                            }
                          />
                        </li>
                      </ul>
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_f_day ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_f_day}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_f_day: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_f_day ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_f_day}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_f_day: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_f_day ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_f_day}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_f_day: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${"bg-yellow-100"}`}
                            type="number"
                            value={
                              ((item.m_f_day * item.w_f_day) /
                              100).toFixed(2)
                            }
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_ifc ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_ifc}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_ifc: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_ifc ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_ifc}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_ifc: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_ifc ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_ifc}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_ifc: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${"bg-yellow-100"}`}
                            type="number"
                            value={
                              ((item.m_ifc * item.w_ifc) / 100).toFixed(2)
                            }
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_fgm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_fgm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_fgm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_fgm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_fgm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_fgm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_fgm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_fgm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_fgm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${"bg-yellow-100"}`}
                            type="number"
                            value={
                              ((item.m_fgm * item.w_fgm ) / 100).toFixed(2)
                            }
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_ofm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_ofm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_ofm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_ofm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_ofm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_ofm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_ofm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_ofm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_ofm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${"bg-yellow-100"}`}
                            type="number"
                            value={
                              ((item.m_ofm * item.w_ofm) / 100).toFixed(2)
                            }
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_mfm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_mfm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_mfm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_mfm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_mfm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_mfm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_mfm ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_mfm}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_mfm: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${"bg-yellow-100"}`}
                            type="number"
                            value={
                              ((item.m_mfm * item.w_mfm) / 100).toFixed(2)
                            }
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_rtp ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_rtp}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_rtp: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_rtp ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_rtp}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_rtp: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_rtp ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_rtp}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_rtp: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 h-6 text-right ${"bg-green-400"}`}
                            type="number"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.t_shc ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.t_shc}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_shc: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                        <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.m_shc ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.m_shc}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_shc: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className={`p-0 w-16 border-2 h-6 border-black text-right ${
                              item.w_shc ? "bg-white-100" : "bg-yellow-100"
                            }`}
                            type="number"
                            value={item.w_shc}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_shc: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className={`p-0 w-16 h-6 text-right ${"bg-green-400"}`}
                            type="number"
                            disabled
                          />
                        </li>
                      </ul>
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-gray-400  p-1">
                          <input
                            className="p-0 w-16 text-white h-6  bg-gray-400 "
                            disabled
                            value={
                              Number(item.t_demo) +
                              Number(item.t_f_day) +
                              Number(item.t_ifc) +
                              Number(item.t_fgm) +
                              Number(item.t_ofm) +
                              Number(item.t_mfm) +
                              Number(item.t_rtp) +
                              Number(item.t_shc)
                            }
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-gray-400  p-1">
                        <input
                            className="p-0 w-16 text-white h-6  bg-gray-400 "
                            disabled
                            value={
                              Number(item.m_demo) +
                              Number(item.m_f_day) +
                              Number(item.m_ifc) +
                              Number(item.m_fgm) +
                                Number(item.m_ofm) +
                              Number(item.m_mfm) +
                              Number(item.m_rtp) +
                              Number(item.m_shc)}
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black bg-gray-400  p-1">
                          <input
                            className="p-0 w-16 text-white h-6  bg-gray-400 "
                            disabled
                            value={
                              Number(item.w_demo) +
                              Number(item.w_f_day) +
                              Number(item.w_ifc) +
                              Number(item.w_fgm) +
                              Number(item.w_ofm) +
                              Number(item.w_mfm) +
                              Number(item.w_rtp) +
                              Number(item.w_shc)
                            }
                          />
                        </li>

                        <li className="  flex justify-center  bg-gray-400  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6   text-white  bg-gray-400"
                            disabled
                            value={
                              Number(((item.m_demo * item.w_demo ) /
                              100).toFixed(2)) +
                              Number(((item.m_f_day * item.w_f_day ) /
                              100).toFixed(2))+
                              Number(((item.m_ifc * item.w_ifc ) /
                              100).toFixed(2))+
                              Number(((item.m_fgm * item.w_fgm ) /
                              100).toFixed(2))+
                              Number(((item.m_ofm * item.w_ofm ) /
                              100).toFixed(2))+
                              Number(((item.m_mfm * item.w_mfm ) /
                              100).toFixed(2))
                             
                            }
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="pl-4 w-20 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {index !== 0 && (
                        <button
                          className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm h-8"
                          onClick={() => {
                            setMonthList(
                              monthList.map((el) => {
                                if (el.month === item.month) {
                                  return {
                                    ...monthList[index - 1],
                                    month: el.month,
                                  };
                                } else {
                                  return el;
                                }
                              })
                            );
                          }}
                        >
                          Copy
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {router.query.type === "Add" || router.query.type === "Edit" ? (
              <div className="flex w-full h-8 gap-4 m-2 ">
                <button
                  className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm h-8 w-16"
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
                  className="bg-red-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm h-8 w-16"
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

export default BusinessSegment;
