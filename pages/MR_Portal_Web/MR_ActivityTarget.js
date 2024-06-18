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

  const generateMonthList = (year) => {
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
    const monthList = months.map((month) => {
      return {
        month: month,
        year: year,

        t_demo: 12,
        t_f_day: 12,
        t_o2o: 12,
        t_gmt: 12,
        t_svn: 12,
        t_gvm: 12,
        t_cap: 12,
        t_shc: 12,
        m_demo: 21,
        m_f_day: 21,
        m_o2o: 32,
        m_gmt: 32,
        m_svn: 32,
        m_gvm: 32,
        m_cap: 32,
        m_shc: 32,
        w_demo: 22,
        w_f_day: 22,
        w_o2o: 11,
        w_gmt: 11,
        w_svn: 11,
        w_gvm: 11,
        w_cap: 11,
        w_shc: 11,
        score: 11,
      };
    });
    setMonthList(monthList);
  };

  const [allMrData, setAllMrData] = useState([]);
  // const getMrCatData = async (cId) => {
  //   try {
  //     const respond = await axios.get(`${url}/api/get_mr_category`, {
  //       params: {
  //         c_id: cId,
  //       },
  //       headers: headers,
  //     });
  //     const apires = await respond.data.data;
  //     setAllMrData(apires);
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   getMrCatData(filter.cId);
  // }, [filter.cId]);

  const handleAdd = async () => {
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
      console.log("pol", errors);
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };

  const getEx = async (cId) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_activity`, {
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_idd,
        },
        headers: headers,
      });
      const apires = await respond.data.data;
    } catch (error) {}
  };
  useEffect(() => {
    getEx(filter.cId);
  }, [filter.cId]);

  return (
    <Layout>
      <div className="w-full font-arial bg-white">
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="flex flex-row m-4  w-full gap-12">
          <div>
            <label
              htmlFor="attendanceType"
              className="font-bold mb-2  self-end "
            >
              Company:
            </label>
            <select
              id="attendanceType"
              className="w-72  border p-1 rounded ml-4"
              value={filter.cId}
              onChange={(e) => setFilter({ ...filter, cId: e.target.value })}
            >
              <option value={""}>Company</option>
              {companyInfo.map((item) => (
                <option value={item.c_id}>{item.cmpny_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="attendanceType"
              className="font-bold mb-2  self-end "
            >
              Business Segment:
            </label>
            <select
              id="attendanceType"
              className="w-72  border p-1 rounded ml-4"
              value={filter.bgId}
              onChange={(e) => setFilter({ ...filter, bgId: e.target.value })}
            >
              <option value={""}>Segment</option>
              {bgData.map((item) => (
                <option value={item.bg_id}>{item.business_segment}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="attendanceType"
              className="font-bold mb-2  self-end "
            >
              Business Unit:
            </label>
            <select
              id="attendanceType"
              className="w-72  border p-1 rounded ml-4"
              value={filter.buId}
              onChange={(e) => setFilter({ ...filter, buId: e.target.value })}
            >
              <option value={""}>Unit</option>
              {buData.map((item) => (
                <option value={item.bu_id}>{item.business_unit_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row m-4  w-full gap-12">
          <div>
            <label
              htmlFor="attendanceType"
              className="font-bold mb-2  self-end "
            >
              Year:
            </label>
            <DatePicker
              className="w-68  border p-1 rounded ml-4"
              showYearDropdown
              dateFormat="yyyy"
              yearDropdownItemNumber={15}
              selected={selectedYear}
              scrollableYearDropdown
              onChange={handleYearChange}
              hand
              showYearPicker
            />
          </div>
          <div>
            <label
              htmlFor="attendanceType"
              className="font-bold mb-2  self-end "
            >
              MR Category:
            </label>
            <select
              id="attendanceType"
              className="w-72  border p-1 rounded ml-4"
              value={filter.mrCat}
              onChange={(e) => setFilter({ ...filter, mrCat: e.target.value })}
            >
              <option value={""}>MR Cat.</option>
              {allMrData.map((item) => (
                <option value={item.mrc_id}>{item.mr_Category_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white  max-w-full pb-12 ">
          <div className=" text-black font-arial  w-full p-1 h-[700px] overflow-y-auto scrollbar-">
            <table className="min-w-full divide-y border- divide-gray-200">
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
                    O2O
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    GMT
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    SVN
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    CAP
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    SHC
                  </th>
                  <th className="px-4 py-2  text-left border-black border-x-2  border-t-2 text-xs font-medium text-white tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {monthList.map((item) => (
                  <tr className="dark:border-2">
                    <td className="pl-4 w-52 text-left border-2 border-black whitespace-nowrap font-arial text-xs ">
                      {`${item.month} - ${item.year}`}
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-16 text-white h-6 bg-sky-800 "
                            value="Target"
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-16 text-white h-6 bg-sky-800 "
                            value="Min Ach."
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black bg-sky-800  p-1">
                          <input
                            className="p-0 w-16 text-white h-6 bg-sky-800 "
                            value="Weightage"
                          />
                        </li>
                        <li className="  flex justify-center bg-green-400  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6   text-white bg-green-400"
                            value="Score"
                          />
                        </li>
                      </ul>
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black   p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right "
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
                        <li className="border-b-2 border-black  flex justify-center     p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right  text-black"
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
                        <li className="border-b-2 border-black  flex justify-center   p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right text-black"
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.score}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, score: e.target.value };
                                  } else {
                                    return el;
                                  }
                                })
                              );
                            }}
                          />
                        </li>
                      </ul>
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right"
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
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
                            className="p-0 w-16 border-2 h-6 border-green-400 bg-green-400 text-right"
                            type="number"
                            disabled
                            value={"-"}
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.t_o2o}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_o2o: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.m_o2o}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_o2o: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.w_o2o}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_o2o: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-green-400 bg-green-400 text-right"
                            type="number"
                            value={"-"}
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.t_gmt}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_gmt: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.m_gmt}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_gmt: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.w_gmt}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_gmt: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-green-400 bg-green-400 text-right"
                            type="number"
                            value={"-"}
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.t_svn}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_svn: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.m_svn}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_svn: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.w_svn}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_svn: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-green-400 bg-green-400 text-right"
                            type="number"
                            value={"-"}
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.t_cap}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, t_cap: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.m_cap}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, m_cap: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
                            type="number"
                            value={item.w_cap}
                            onChange={(e) => {
                              setMonthList(
                                monthList.map((el) => {
                                  if (el.month === item.month) {
                                    return { ...el, w_cap: e.target.value };
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
                            className="p-0 w-16 border-2 h-6 border-green-400 bg-green-400 text-right"
                            type="number"
                            value={"-"}
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  p-1">
                          <input
                            className="p-0 w-16 border-2 h-6 border-black text-right"
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
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
                            className="p-0 w-16 border-2 h-6 border-black text-right"
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
                            className="p-0 w-16 border-2 h-6 border-green-400 bg-green-400 text-right"
                            type="number"
                            value={"-"}
                          />
                        </li>
                      </ul>
                    </td>

                    <td className="  border-2 border-black  whitespace-nowrap text-white p-0 bg-white">
                      <ul>
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-gray-400  p-1">
                          <input
                            className="p-0 w-16 text-white h-6  bg-gray-400 "
                            value={
                              Number(item.t_demo) +
                              Number(item.t_f_day) +
                              Number(item.t_o2o) +
                              Number(item.t_gmt) +
                              Number(item.t_svn) +
                              Number(item.t_cap) +
                              Number(item.t_shc)
                            }
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black  bg-gray-400  p-1">
                          <input
                            className="p-0 w-16 text-white h-6  bg-gray-400 "
                            value={
                              Number(item.m_demo) +
                              Number(item.m_f_day) +
                              Number(item.m_o2o) +
                              Number(item.m_gmt) +
                              Number(item.m_svn) +
                              Number(item.m_cap) +
                              Number(item.m_shc)
                            }
                          />
                        </li>
                        <li className="border-b-2 border-black  flex justify-center text-black bg-gray-400  p-1">
                          <input
                            className="p-0 w-16 text-white h-6  bg-gray-400 "
                            value={
                              Number(item.w_demo) +
                              Number(item.w_f_day) +
                              Number(item.w_o2o) +
                              Number(item.w_gmt) +
                              Number(item.w_svn) +
                              Number(item.w_cap) +
                              Number(item.w_shc)
                            }
                          />
                        </li>
                        <li className="  flex justify-center  bg-gray-400  text-black   p-1  ">
                          <input
                            className="p-0 w-16 h-6   text-white  bg-gray-400"
                            value={item.score}
                          />
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex w-full  gap-4 m-2 ">
            <button
              className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
              onClick={() => handleAdd()}
            >
              Submit
            </button>
            <button
              onClick={() => {}}
              className="bg-green-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessSegment;
