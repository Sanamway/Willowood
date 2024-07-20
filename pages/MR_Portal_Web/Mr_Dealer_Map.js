import React, { useState, useEffect, Fragment } from "react";
import Layout from "@/components/Layout1";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
// import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const NewDealer = () => {
  const csvHeaders = [
    { label: "Id", key: "ds_id" },
    { label: "District", key: "district_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "cmpny_name" },
    { label: "Status", key: "isDeleted" },
  ];

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const router = useRouter();

  const [selectedYr, setSelectedYr] = useState(false);

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
  const [filterState, setFilterState] = useState({
    empCode: null,
  });

  const [allDealer, setAllDealer] = useState([]);
  const getAllDealerData = async () => {
    if (!selectedYr) return;
    let data;
    if (router.query.type !== "Add") {
      data = {
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        t_des: router.query.tDes,
        year: new Date(selectedYr).getFullYear(),
        emp_code: router.query.empCode,
        edit: true,
      };
    } else {
      data = {
        c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
        t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
        t_des: territoryData.filter(
          (item) =>
            item.t_id ===
            JSON.parse(window.localStorage.getItem("userinfo")).t_id
        )[0].territory_name,
        year: new Date(selectedYr).getFullYear(),
        add: true,
      };
    }
    try {
      const respond = await axios.get(`${url}/api/get_mr_dealer_sales`, {
        headers: headers,
        params: data,
      });

      const apires = await respond.data.data;
      if (router.query.type !== "Add") {
        setAllDealer(
          apires.map((item) => {
            return {
              ...item,
              selected: item.is_mapped === "true" ? true : false,
            };
          })
        );
      } else {
        setAllDealer(
          apires.map((item) => {
            return { ...item, selected: false };
          })
        );
      }
    } catch (error) {}
  };

  const [territoryData, setTerritoryData] = useState([]);

  const getAllTerritoryData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setTerritoryData(apires);
    } catch (error) {}
  };
  useEffect(() => {
    getAllTerritoryData();
  }, []);

  useEffect(() => {
    if (router.query.type !== "Add") {
      setSelectedYr(new Date(router.query.yr));
    } else {
      return;
    }
  }, [router.query.type]);
  useEffect(() => {
    // if (!territoryData.length) return;   correction
    getAllDealerData();
  }, [selectedYr]);

  const handleSave = async () => {
    if (allDealer?.filter((el) => el.selected === true).length) {
      try {
        let endPoint = "api/add_mr_dealer_map";
        let params;

        if (router.query.type === "Add") {
          endPoint = "api/add_mr_dealer_map";
        } else {
          endPoint = "api/update_mr_dealer_map";
          params = {
            emp_code: router.query.empCode,
            year: selectedYr.getFullYear(),
          };
        }

        const data =
          router.query.type !== "Add"
            ? allDealer.map((item, idx) => {
                return {
                  t_id: JSON.parse(window.localStorage.getItem("userinfo"))
                    .t_id,
                  c_id: JSON.parse(window.localStorage.getItem("userinfo"))
                    .c_id,
                  bg_id: JSON.parse(window.localStorage.getItem("userinfo"))
                    .bg_id,
                  bu_id: JSON.parse(window.localStorage.getItem("userinfo"))
                    .bu_id,
                  r_id: JSON.parse(window.localStorage.getItem("userinfo"))
                    .r_id,
                  z_id: JSON.parse(window.localStorage.getItem("userinfo"))
                    .z_id,
                  year: selectedYr.getFullYear(),
                  customer_code: item.party_code,
                  checked: item.selected,
                  party_name: item.distribution_name,
                  emp_code:
                    router.query.type !== "Add"
                      ? router.query.empCode
                      : filterState.empCode,
                };
              })
            : allDealer
                ?.filter((el) => el.selected === true)
                .map((item, idx) => {
                  return {
                    t_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .t_id,
                    c_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .c_id,
                    bg_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .bg_id,
                    bu_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .bu_id,
                    r_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .r_id,
                    z_id: JSON.parse(window.localStorage.getItem("userinfo"))
                      .z_id,
                    year: selectedYr.getFullYear(),
                    customer_code: item.party_code,
                    emp_code:
                      router.query.type !== "Add"
                        ? router.query.empCode
                        : filterState.empCode,
                  };
                });

        const respond = await axios
          .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
            headers: headers,
            params: params,
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
            router.push({
              pathname: "/MR_Portal_Web/Mr_Dealer_Map_Table",
            });
          });
      } catch (errors) {
        const errorMessage = errors?.response?.data?.message;

        toast.error(errorMessage);
        if (!errorMessage) return;
      }
    } else {
      toast.error("please select atleast 1 party");
    }
  };

  return (
    <Layout>
      <div className="absolute h-full w-full overflow-x-auto no-scrollbar mx-4">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial  ">
          <h2 className="font-arial font-normal text-3xl  py-2 pl-4">
            M.R. Dealer Mapping
          </h2>
        </div>
        <div className="flex flex-row px-4  py-2 gap-6 w-full">
          <div className="flex flex-row gap-2">
            <span className="text-sm self-center">Select Year</span>
            <DatePicker
              className="border p-1 rounded  w-16 h-6  text-sm text-[12px]"
              showYearDropdown
              dateFormat="yyyy"
              placeholderText="Year"
              yearDropdownItemNumber={15} // Uncommented and provided a value
              selected={selectedYr}
              onChange={(date) => setSelectedYr(date)}
              hand
              showYearPicker
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              //   disabled={router.query.type !== "Add"}
            />
          </div>

          <div className="flex flex-row gap-2">
            <span className="text-sm self-center">M.R. Executive</span>

            {router.query.type !== "Add" ? (
              <input
                id="attendanceType"
                className="border p-1 rounded  w-80 h-6  text-[12px]"
                value={router.query.empName}
              />
            ) : (
              <select
                id="attendanceType"
                className="border p-1 rounded  w-80 h-6  text-[12px]"
                value={filterState.empCode}
                onChange={(e) =>
                  setFilterState({ ...filterState, empCode: e.target.value })
                }
              >
                <option value={""}>M.R. Executive</option>

                {allEmployee.map((item) => (
                  <option value={item.empcode}>
                    {item.fname} {item.mname} {item.lname} {item.empcode}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {allDealer.length ? (
          <div className="flex flex-row px-4  py-2 gap-5 w-full">
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={
                  !allDealer.map((item) => item.selected).includes(false)
                }
                onClick={() => {
                  setAllDealer(
                    allDealer.map((item) => {
                      return { ...item, selected: true };
                    })
                  );
                }}
              />
              <span className="text-sm">Select All</span>
            </div>{" "}
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={!allDealer.map((item) => item.selected).includes(true)}
                onClick={() => {
                  setAllDealer(
                    allDealer.map((item) => {
                      return { ...item, selected: false };
                    })
                  );
                }}
              />
              <span className="text-sm">Deselect All</span>
            </div>{" "}
          </div>
        ) : (
          <div className="flex flex-row px-4  py-2 gap-5 w-full">
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={false}
              />
              <span className="text-sm">Select All</span>
            </div>{" "}
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={false}
              />
              <span className="text-sm">Deselect All</span>
            </div>{" "}
          </div>
        )}

        <div className="bg-white h-max flex flex-col gap-2  select-none items-start justify-between w-full absolute p-2 ">
          <table className="min-w-[98%] divide-y border- divide-gray-200  h-min">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial ">
                <th className="px-4  py-2  text-left dark:border-2  text-xs font-medium text-gray-500    ">
                  Action
                </th>
                <th className="px-4 py-2 text-left dark:border-2  text-xs font-medium text-gray-500   tracking-wider whitespace-nowrap ">
                  Party Code
                </th>
                <th className="px-4 py-2 text-left dark:border-2   text-xs font-medium text-gray-500  tracking-wider ">
                  Party Name
                </th>
                <th className=" py-2 px-4  text-left dark:border-2  text-xs font-medium text-gray-500  tracking-wider ">
                  Address
                </th>
                <th className=" py-2 px-4  text-right dark:border-2  text-xs font-medium text-gray-500  tracking-wider ">
                  Sale FY{" "}
                  {selectedYr ? (
                    <div>
                      {String(selectedYr.getFullYear() - 1).slice(-2) +
                        "-" +
                        String(selectedYr.getFullYear()).slice(-2)}
                    </div>
                  ) : (
                    "-"
                  )}{" "}
                </th>
                <th className=" py-2 text-right dark:border-2 text-xs  font-medium text-gray-500  tracking-wider ">
                  Sale FY
                  {selectedYr ? (
                    <div>
                      {String(selectedYr.getFullYear() - 2).slice(-2) +
                        "-" +
                        String(selectedYr.getFullYear() - 1).slice(-2)}
                    </div>
                  ) : (
                    "-"
                  )}{" "}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200 text-xs ">
              {allDealer.map((item, idx) => (
                <tr className="dark:border-2 w-100" key={idx}>
                  <td className="px-4  text-left dark:border-2    whitespace-nowrap font-arial text-xs font-bold">
                    <input
                      type="checkbox"
                      disabled={router.query.type === "View"}
                      className="w-4"
                      checked={item.selected}
                      onChange={() => {
                        setAllDealer(
                          allDealer.map((el) =>
                            el.party_code === item.party_code
                              ? { ...el, selected: !el.selected }
                              : el
                          )
                        );
                      }}
                    />
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.party_code}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.distribution_name}
                  </td>
                  <td className=" py-2  dark:border-2 ">{item.address}</td>

                  <td className="px-4 py-2 dark:border-2  text-right whitespace-nowrap">
                    {item.fy_result.fy_1}
                  </td>
                  <td className=" py-2 dark:border-2    text-right whitespace-nowrap">
                    {item.fy_result.fy_2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {router.query.type === "View" ? (
            <div className="flex w-full h-8 gap-4 mb-4 "></div>
          ) : (
            <div className="flex w-full h-8 gap-4 mb-4 ">
              <button
                className="bg-green-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
                onClick={() => handleSave()}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/MR_Portal_Web/Mr_Dealer_Map_Table",
                  });
                }}
                className="bg-red-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewDealer;
