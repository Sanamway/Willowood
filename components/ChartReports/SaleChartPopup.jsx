import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSpring, animated } from "react-spring";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";
import { url } from "@/constants/url";
import * as XLSX from "xlsx";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
const SaleChartPopup = ({
  handleClose,
  regionData,
  bgData,
  buData,
  zoneData,
  tData,
  backgorundFilters,
}) => {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const springProps = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  });

  const [filterState, setFilterState] = useState({
    from: new Date(
      new Date(backgorundFilters.month).getFullYear(),
      new Date(backgorundFilters.month).getMonth(),
      1
    ),
    to: new Date(
      new Date(backgorundFilters.month).getFullYear(),
      new Date(backgorundFilters.month).getMonth() + 1,
      0
    ),
    custInfo: "",
  });

  const [custSearch, setCustSearch] = useState("");
  const [filteredOptn, setFilteredOptn] = useState([]);

  const getCityData = async (cust) => {
    try {
      const resp = await axios.get(`${url}/api/get_customer_name`, {
        params: {
          searchKey: cust,
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        },
        headers: headers,
      });
      const response = await resp.data.data;
      console.log("pop", response);
      setFilteredOptn(
        response.map((item) => {
          return {
            value: item?.customer_code,
            label: item?.customer_name,
          };
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    if (custSearch) {
      getCityData(custSearch);
    }
  }, [custSearch]);
  const [tableData, setTableData] = useState([]);
  const [tabelLoading, setTableLoading] = useState(false);
  const getTableData = async (from, to, cust) => {
    try {
      setTableLoading(true);
      const resp = await axios.get(`${url}/api/get_sales_registed`, {
        params: {
          start_date: moment(from).format("YYYY-MM-DD[T00:00:00.000Z]"),
          end_date: moment(to).format("YYYY-MM-DD[T00:00:00.000Z]"),
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          customer_code: cust.value,
          t_des:
            backgorundFilters.tId === "All" || !backgorundFilters.tId
              ? null
              : tData.filter(
                  (item) => Number(item.t_id) === Number(backgorundFilters.tId)
                )[0].territory_name,
          r_des:
            backgorundFilters.rId === "All" || !backgorundFilters.rId
              ? null
              : regionData.filter(
                  (item) => Number(item.r_id) === Number(backgorundFilters.rId)
                )[0].region_name,

          z_des:
            backgorundFilters.zId === "All" || !backgorundFilters.zId
              ? null
              : zoneData.filter(
                  (item) => Number(item.z_id) === Number(backgorundFilters.zId)
                )[0].zone_name,
          bu_des:
            backgorundFilters.buId === "All" || !backgorundFilters.buId
              ? null
              : buData.filter(
                  (item) =>
                    Number(item.bu_id) === Number(backgorundFilters.buId)
                )[0].business_unit_name,
          bg_des:
            backgorundFilters.bgId === "All" || !backgorundFilters.bgId
              ? null
              : bgData.filter(
                  (item) =>
                    Number(item.bg_id) === Number(backgorundFilters.bgId)
                )[0].business_segment,
        },
        headers: headers,
      });
      const response = await resp.data.data;

      setTableData(
        response.map((item) => {
          return {
            ...item,
            "Bill Date": moment(item["Bill Date"]).format("DD-MM-YYYY"),
          };
        })
      );
      setTableLoading(false);
    } catch (error) {
      console.log("zop", error);
      setTableData([]);
      setTableLoading(false);
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, `Sales.xlsx`);
  };

  return (
    <>
      <animated.div className=" bg-gray-100/40  backdrop-blur-[4px] from-gray-10 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 ">
        {/* <div className=" bg-gray-100/40  opacity-1 backdrop-blur-[4px] from-gray-10 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 "> */}
        <animated.div
          style={springProps}
          className="mainContainer lg:w-[55%] w-full mx-2 h-auto  bg-white rounded-lg  "
        >
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="flex items-center justify-between py-1.5 px-2 border-b-2">
            <div className="px-2 text-[0.89rem] font-semibold text-gray-500 py-1">
              {" "}
              {console.log("lop", backgorundFilters)}
              Sales Register (
              {[
                backgorundFilters.bgId !== "All" &&
                backgorundFilters.bgId !== ""
                  ? bgData.filter(
                      (item) =>
                        Number(item.bg_id) === Number(backgorundFilters.bgId)
                    )[0].business_segment
                  : "",

                backgorundFilters.buId !== "All" &&
                backgorundFilters.buId !== ""
                  ? buData.filter(
                      (item) =>
                        Number(item.bu_id) === Number(backgorundFilters.buId)
                    )[0].business_unit_name
                  : "",

                backgorundFilters.zId !== "All" && backgorundFilters.zId !== ""
                  ? zoneData.filter(
                      (item) =>
                        Number(item.z_id) === Number(backgorundFilters.zId)
                    )[0].zone_name
                  : "",

                backgorundFilters.rId !== "All" && backgorundFilters.rId !== ""
                  ? regionData.filter(
                      (item) =>
                        Number(item.r_id) === Number(backgorundFilters.rId)
                    )[0].region_name
                  : "",

                backgorundFilters.tId !== "All" && backgorundFilters.tId !== ""
                  ? tData.filter(
                      (item) =>
                        Number(item.t_id) === Number(backgorundFilters.tId)
                    )[0].territory_name
                  : "",
              ].join(", ")}
              )
            </div>
            <button className="" onClick={() => handleClose()}>
              <IoCloseOutline
                className="text-gray-900 bg-gray-50 rounded-full border"
                size={25}
              ></IoCloseOutline>
            </button>
          </div>

          <div className="flex flex-col  mt-4 px-6  w-full  lg:flex-row justify-between">
            <div className="flex flex-row gap-2 w-full items-center lg:w-[80%]">
              <DatePicker
                className="w-24 px-3 text-xs h-8  rounded-lg  border-2 border-blue-400 focus:outline-none focus:border-indigo-500 "
                dateFormat="dd-MM-yyyy"
                selected={filterState.from}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                placeholderText="Start Date"
                onChange={(date) =>
                  setFilterState({
                    ...filterState,
                    from: date ? new Date(date) : "",
                  })
                }
                dropdownMode="select"
              />

              <span>To</span>

              <DatePicker
                className="w-24 px-3 text-xs h-8  rounded-lg  border-2 border-blue-400 focus:outline-none focus:border-indigo-500 "
                dateFormat="dd-MM-yyyy"
                selected={filterState.to}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                placeholderText="End Date"
                onChange={(date) =>
                  setFilterState({
                    ...filterState,
                    to: date ? new Date(date) : "",
                  })
                }
                dropdownMode="select"
              />
              <Select
                className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 text-sm"
                value={filterState?.custInfo}
                isSearchable={true}
                name="color"
                options={filteredOptn}
                placeholder={"Cust. Info"}
                onChange={(value) =>
                  setFilterState({
                    ...filterState,
                    custInfo: value,
                  })
                }
                onInputChange={(searchVal) => setCustSearch(searchVal)}
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <button
                className="bg-blue-500 px-4 py-1 text-white"
                onClick={() => {
                  if (filterState.from && filterState.to) {
                    getTableData(
                      filterState.from,
                      filterState.to,
                      filterState.custInfo
                    );
                  } else {
                    toast.error("From and To Date is Mandatory");
                  }
                }}
              >
                View
              </button>
              <TbFileDownload
                className="text-green-600"
                size={34}
                onClick={() => handleDownloadExcel()}
              ></TbFileDownload>
            </div>
          </div>

          {/* tables  */}

          <div className="orderwrapper px-2 py-2  ">
            <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
              <div className="bg-white  flex-1 md:flex items-center justify-center gap-4 rounded-md shadow- text-white text-center w-full">
                <div className=" overflow-x-auto chat-scrollbar select-none w-full h-72 ">
                  {tabelLoading ? (
                    <div className="flex items-center justify-center">
                      <img
                        className="w-20 h-20 animate-spin"
                        src="https://www.svgrepo.com/show/448500/loading.svg"
                        alt="Loading icon"
                      />
                    </div>
                  ) : (
                    tableData.length && (
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                        <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md">
                          <tr>
                            {Object.keys(tableData[0]).map((header, index) => (
                              <th
                                key={index}
                                className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className=" overflow-auto bg-white divide-y divide-gray-200 break-normal">
                          {tableData.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.keys(tableData[0]).map(
                                (header, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className={`px-4 font-semibold ${
                                      typeof item[header] === "number"
                                        ? "text-right"
                                        : "text-left"
                                    } whitespace-nowrap py-1 text-[0.74rem] text-gray-500 border`}
                                  >
                                    {item[header]}
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                          {[tableData[0]].map((item, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.keys(tableData[0]).map(
                                (header, cellIndex) => {
                                  if (cellIndex === 13) {
                                    return (
                                      <td
                                        key={cellIndex}
                                        className={`px-4 font-semibold ${"text-right"} whitespace-nowrap py-1 text-[0.74rem] text-gray-500 border`}
                                      >
                                        {tableData.reduce((acc, curr) => {
                                          console.log("jki", acc, curr);
                                          acc += curr.Qty;
                                          return acc;
                                        }, 0)}
                                      </td>
                                    );
                                  } else if (cellIndex === 16) {
                                    return (
                                      <td
                                        key={cellIndex}
                                        className={`px-4 font-semibold ${"text-right"} whitespace-nowrap py-1 text-[0.74rem] text-gray-500 border`}
                                      >
                                        {tableData.reduce((acc, curr) => {
                                          console.log("jki", acc, curr);
                                          acc += curr.Price;
                                          return acc;
                                        }, 0)}
                                      </td>
                                    );
                                  } else if (cellIndex === 17) {
                                    return (
                                      <td
                                        key={cellIndex}
                                        className={`px-4 font-semibold ${"text-right"} whitespace-nowrap py-1 text-[0.74rem] text-gray-500 border`}
                                      >
                                        {tableData.reduce((acc, curr) => {
                                          console.log("jki", acc, curr);
                                          acc += curr["Bill Value"];
                                          return acc;
                                        }, 0)}
                                      </td>
                                    );
                                  } else if (cellIndex === 0) {
                                    return (
                                      <td
                                        key={cellIndex}
                                        className={`px-4 font-semibold ${"text-center"} whitespace-nowrap py-1 text-[0.74rem] text-gray-500 border`}
                                      >
                                        Total
                                      </td>
                                    );
                                  } else {
                                    return (
                                      <td
                                        key={cellIndex}
                                        className={`px-4 font-semibold ${"text-right"} whitespace-nowrap py-1 text-[0.74rem] text-gray-500 border`}
                                      >
                                        -
                                      </td>
                                    );
                                  }
                                }
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </animated.div>
        {/* </div> */}
      </animated.div>
    </>
  );
};
export default SaleChartPopup;
