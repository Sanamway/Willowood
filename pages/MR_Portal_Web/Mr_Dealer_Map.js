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

  const [data, setData] = useState([]);
  const getData = async (currentPage) => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_target_grid`, {
        params: {
          c_id: JSON.parse(window.localStorage.getItem("userinfo")).c_id,
          t_id: JSON.parse(window.localStorage.getItem("userinfo")).t_id,
          //   paging: true,
          //   page: currentPage,
          //   size: 50,
        },
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
      const count = await respond.data.data.length;
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedYr, setSelectedYr] = useState(false);
  return (
    <Layout>
      <div className="absolute h-full w-full overflow-x-auto no-scrollbar ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            M.R. Dealer Mapping
          </h2>
        </div>
        <div className="flex flex-row px-4  py-2 gap-6 w-full">
          <div className="flex flex-row gap-2">
            <span className="text-sm ">Select Year</span>
            <DatePicker
              className="border p-1 rounded  w-16 h-6  text-sm"
              showYearDropdown
              dateFormat="yyyy"
              placeholderText="Enter Year"
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
            <select
              id="attendanceType"
              className="border p-1 rounded  w-80 h-6  text-sm"
              //   value={filterState.bgId}
              //   onChange={(e) =>
              //     setFilterState({ ...filterState, bgId: e.target.value })
              //   }
              disabled
            >
              <option value={""}>M.R. Executive</option>
              {/* {bgData.map((item) => (
                <option value={item.bg_id}>{item.business_segment}</option>
              ))} */}
            </select>
          </div>
        </div>
        <div className="flex flex-row px-4  py-2 gap-5 w-full">
          <div className="flex flex-row gap-2 justify-start items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onClick={() => setSelectAll(!selectAll)}
            />
            <span className="text-sm">Select All</span>
          </div>{" "}
          <div className="flex flex-row gap-2 justify-start items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onClick={() => setSelectAll(!selectAll)}
            />
            <span className="text-sm">Deselect All</span>
          </div>{" "}
        </div>

        <div className="bg-white h-screen flex flex-col gap-2  select-none items-start justify-between w-full absolute p-2 ">
          <table className="min-w-full divide-y border- divide-gray-200 mb-20">
            <thead className="border-b">
              <tr className="bg-gray-50 font-arial w-100">
                <th className="px-4  py-2  text-left dark:border-2  text-xs font-medium text-gray-500    ">
                  Action
                </th>
                <th className="px-4 py-2 text-left dark:border-2 w-12 text-xs font-medium text-gray-500   tracking-wider whitespace-nowrap ">
                  Party Code
                </th>
                <th className="px-4 py-2 text-left dark:border-2  w-80 text-xs font-medium text-gray-500  tracking-wider ">
                  Party Name
                </th>
                <th className="px-4 py-2 text-left dark:border-2  text-xs font-medium text-gray-500  tracking-wider ">
                  Address
                </th>
                <th className="px-4 py-2 text-left dark:border-2  text-xs font-medium text-gray-500  tracking-wider ">
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
                <th className="px-4 py-2 text-left dark:border-2 text-xs  font-medium text-gray-500  tracking-wider ">
                  Sale
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
              {data.map((item, idx) => (
                <tr className="dark:border-2 w-100" key={idx}>
                  <td className="px-4  text-left dark:border-2    whitespace-nowrap font-arial text-xs font-bold">
                    <input
                      type="checkbox"
                      className="w-4"
                      // disabled={!menu.isEditable}
                      // checked={menu.Delete}
                      // onChange={() => {
                      //   setAllMenus(
                      //     allMenus.map((el) =>
                      //       el._id === menu._id ? { ...el, Delete: !el.Delete } : el
                      //     )
                      //   );
                      // }}
                    />
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    Party
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    PARTY NAME
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    931/2 Bhartiya Calony Minlana Rd, Bhagpat, UP
                    <br />
                    931/2 Bhartiya Calony Minlana Rd, Bhagpat, UP
                    <br />
                    931/2 Bhartiya Calony Minlana Rd, Bhagpat, UP
                    <br />
                    931/2 Bhartiya Calony Minlana Rd, Bhagpat, UP
                  </td>

                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.customer_code}
                  </td>
                  <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                    {item.customer_code}
                  </td>
                </tr>
              ))}
            </tbody>
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
                    pathname: "/MR_Portal_Web/NewDealerTarget_Table",
                  });
                }}
                className="bg-red-500 flex items-center justify-center whitespace-nowrap  px-2 py-1.5 rounded-sm h-8"
              >
                Close
              </button>
            </div>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default NewDealer;
