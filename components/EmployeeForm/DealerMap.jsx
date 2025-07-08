import React, { useState, useEffect } from "react";
// import Layout from "@/components/Layout1";

import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DealerMap = (props) => {
  console.log("Dealerporps", props);

  const csvHeaders = [
    { label: "Id", key: "ds_id" },
    { label: "District", key: "district_name" },
    { label: "Territory", key: "territory_name" },
    { label: "Region", key: "region_name" },
    { label: "Zone", key: "zone_name" },
    { label: "Unit Division", key: "business_unit_name" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "cmpny_name" },
    { label: "Status", key: "isDeleted" }
  ];

  const [roleId, setRoleId] = useState(null);
  useEffect(() => {
    if (window.localStorage) {
      const userInfo = JSON?.parse(localStorage?.getItem("userinfo"));
      setRoleId(userInfo?.role_id);
    }
  }, [props]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const [localStorageItems, setLocalStorageItems] = useState({
    cId: null,
    bgId: null,
    buId: null,
    rId: null,
    zId: null,
    tId: null,
    roleId: null,
    empCode: null
  });

  const router = useRouter();

  const [selectedYr, setSelectedYr] = useState(new Date());

  const [allDealer, setAllDealer] = useState([]);

  const getAllDealerData = async () => {
    let data = {
      c_id: props?.data?.c_id,
      t_id: props?.data?.t_id,
      t_des: props?.data?.territory_name,
      year: new Date(selectedYr).getFullYear(),
      // emp_code: props?.data?.empcode,
      e_id: props?.data?.e_id,
      edit: true
    };

    try {
      const apires = await axios.get(`${url}/api/get_mr_dealer_sales`, {
        headers: headers,
        params: data
      });
      setAllDealer(
        apires?.data?.data?.map((item) => {
          return {
            ...item,
            selected: item.is_mapped === "true" ? true : false,
            from_date: item.from_date ? new Date(item.from_date) : "",
            to_date: item.to_date ? new Date(item.to_date) : ""
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (props?.data?.bg_id) {
      getAllDealerData();
    }
  }, [props?.data?.bg_id, selectedYr]);

  const handleSave = async () => {
    const selectedDealers = allDealer?.filter((el) => el.selected === true);
    if (selectedDealers.length) {
      const invalidDates = selectedDealers.some((dealer) => !dealer.from_date || !dealer.to_date);

      if (invalidDates) {
        toast.error("Please select From and To dates for all selected dealers");
        return;
      }

      try {
        let params;
        let appStatus = "MR Dealer Map";

        params = {
          e_id: props?.data?.e_id,
          year: selectedYr.getFullYear(),
          roleId
        };
        const modifiedParams = ![1, 8,17].includes(roleId) ? { ...params, app_status: appStatus } : params;

        let endPoint = "api/update_mr_dealer_map";

        const data = selectedDealers.map((item) => {
          return {
            t_id: props?.data?.t_id,
            c_id: props?.data?.c_id,
            bg_id: props?.data?.bg_id,
            bu_id: props?.data?.bu_id,
            r_id: props?.data?.r_id,
            z_id: props?.data?.z_id,
            year: selectedYr.getFullYear(),
            customer_code: Number(item.party_code),
            checked: item.selected,
            party_name: item.distribution_name,
            emp_code: props?.data?.empcode,
            e_id: props?.data?.e_id,
            from_date: item.from_date,
            to_date: item.to_date
          };
        });

        // return
        const respond = await axios
          .post(`${url}/${endPoint}`, JSON.stringify({ data: data }), {
            headers: headers,
            params: modifiedParams
          })
          .then((res) => {
            if (!res) return;
            toast.success(res.data.message);
            setTimeout(() => {
              props.formType("Approval");
            }, 1500);
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

  useEffect(() => {
    setLocalStorageItems({
      cId: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
      bgId: JSON.parse(window.localStorage.getItem("userinfo")).bg_id,
      buId: JSON.parse(window.localStorage.getItem("userinfo")).bu_id,
      rId: JSON.parse(window.localStorage.getItem("userinfo")).r_id,
      zId: JSON.parse(window.localStorage.getItem("userinfo")).z_id,
      tId: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
      empCode: window.localStorage.getItem("emp_code")
    });
  }, []);

  const [disableNext, setDisableNext] = useState(false);
  useEffect(() => {
    switch (roleId) {
      case 1:
      case 8:
        if (
          props?.data?.app_status == "Approved By Region" ||
          props?.data?.app_status == "Approved By Zonal" ||
          props?.data?.app_status == "Approved By Business Unit" ||
          props?.data?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(false);
        }
        break;
      default:
        if (
          props?.data?.app_status == "Approved By Region" ||
          props?.data?.app_status == "Approved By Zonal" ||
          props?.data?.app_status == "Approved By Business Unit" ||
          props?.data?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(true);
        }
    }
  }, [props]);

  const handleFromDateChange = (date, partyCode) => {
    setAllDealer(
      allDealer.map((dealer) => (dealer.party_code === partyCode ? { ...dealer, from_date: date } : dealer))
    );
  };

  const handleToDateChange = (date, partyCode) => {
    setAllDealer(
      allDealer.map((dealer) => (dealer.party_code === partyCode ? { ...dealer, to_date: date } : dealer))
    );
  };


  

  return (
    <>
      <div className="absolute h-full w-full overflow-x-auto no-scrollbar mx-4">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial  ">
          <h2 className="font-arial font-normal text-3xl  py-2 pl-4">M.R. Dealer Mapping</h2>
        </div>
        <div className="flex flex-row gap-4  px-4 pr-8 pb-2">
          <DatePicker
            className="border rounded px-2 py-1  w-32 h-8"
            showYearDropdown
            dateFormat="yyyy"
            placeholderText="Year"
            selected={selectedYr}
            onChange={(date) => setSelectedYr(date)}
            hand
            showYearPicker
          />
        </div>

        {allDealer.length ? (
          <div className="flex flex-row px-4  py-2 gap-5 w-full">
            <div className="flex flex-row gap-2 justify-start items-center">
              <input
                type="checkbox"
                disabled={router.query.type === "View"}
                checked={!allDealer.map((item) => item.selected).includes(false)}
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
              <input type="checkbox" disabled={router.query.type === "View"} checked={false} />
              <span className="text-sm">Select All</span>
            </div>{" "}
            <div className="flex flex-row gap-2 justify-start items-center">
              <input type="checkbox" disabled={router.query.type === "View"} checked={false} />
              <span className="text-sm">Deselect All</span>
            </div>{" "}
          </div>
        )}

        <div className="bg-white h-max flex flex-col gap-4  select-none items-start justify-between w-full absolute p-2 ">
          <table className="min-w-[98%] divide-y border- divide-gray-200  h-min ">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial ">
                <th className="px-4  py-2  text-left dark:border-2  text-xs font-medium text-gray-500    ">
                  Action
                </th>
                <th className="px-4  py-2  text-left dark:border-2  text-xs font-medium text-gray-500    ">
                  From
                </th>
                <th className="px-4  py-2  text-left dark:border-2  text-xs font-medium text-gray-500    ">
                  To
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
                <th className=" py-2 px-4 mx-4 text-right dark:border-2 text-xs  font-medium text-gray-500  tracking-wider ">
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
              {allDealer?.map((item, idx) => (
                <tr className="dark:border-2 w-100" key={idx}>
                  <td className="px-4  text-left dark:border-2    whitespace-nowrap font-arial text-xs font-bold">
                    <input
                      type="checkbox"
                      disabled={router.query.type == "View"}
                      className="w-4"
                      checked={item.selected}
                      onChange={() => {
                        setAllDealer(
                          allDealer.map((el) =>
                            el.party_code === item.party_code ? { ...el, selected: !el.selected } : el
                          )
                        );
                      }}
                    />
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap from-date">
                    <DatePicker
                      className="border rounded px-2 py-1  w-20 h-8"
                      showYearDropdown
                      dateFormat="dd/MM/yyyy"
                      selected={ item.from_date}
                      onChange={(date) => handleFromDateChange(date, item.party_code)}
                      disabled={!item.selected || router.query.type == "View"}
                    />
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap to-date">
                    <DatePicker
                      className="border rounded px-2 py-1  w-20 h-8"
                      showYearDropdown
                      dateFormat="dd/MM/yyyy"
                      selected={item.to_date}
                      onChange={(date) => handleToDateChange(date, item.party_code)}
                      disabled={!item.selected || router.query.type == "View"}
                    />
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.party_code}</td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">{item.distribution_name}</td>
                  <td className=" py-2  dark:border-2 ">{item.address}</td>

                  <td className="px-4 py-2 dark:border-2  text-right whitespace-nowrap">
                    {item.fy_result.fy_1}
                  </td>
                  <td className=" px-4 py-2 dark:border-2    text-right whitespace-nowrap">
                    {item.fy_result.fy_2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {router.query.type == "Edit" && (
            <div className="flex items-center justify-center w-full gap-4 py-4">
              <button
                className="text-center cursor-pointer rounded-md bg-green-500 text-white py-1 px-4 text-lg"
                onClick={() => props.formType("Interview")}
              >
                Prev
              </button>
              <button
                disabled={disableNext}
                className=" text-center cursor-pointer rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
                onClick={() => handleSave()}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DealerMap;
