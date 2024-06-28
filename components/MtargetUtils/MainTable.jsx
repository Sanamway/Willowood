import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

function MainTable({
  gridType,
  rTableData,
  setRTableData,
  getRollingPlanData,
  isRegionSelected,
}) {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const handleSubmitRollingPlan = async (e) => {
    e.preventDefault();
    try {
      const respond = await axios
        .post(
          `${url}/api/update_m_target`,
          JSON.stringify({ data: rTableData }),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          getRollingPlanData();
          toast.success("Rolling Plan Edited successfully!");
        });
    } catch (errors) {}
  };
  const getProgressBar = (item) => {
    let mTarget = item.m_target;
    let percentage = (item.actual / item.m_target) * 100;
    if (percentage <= 50 || !isFinite(percentage)) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap"></span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.m_target) * 100}%`,
            }}
            className=" bg-red-500 rounded-md flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap  ">
              {(Number(item.actual / item.m_target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    } else if (percentage > 50 && percentage <= 74) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap"></span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.m_target) * 100}%`,
            }}
            className=" bg-blue-500 rounded-md flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap ">
              {(Number(item.actual / item.m_target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    } else if (percentage > 74 && percentage <= 90) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap"></span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.m_target) * 100}%`,
            }}
            className=" bg-orange-500 rounded-md flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap ">
              {(Number(item.actual / item.m_target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    } else if (percentage > 90) {
      return (
        <div className="progress progress-striped active flex flex-row pr-4 justify-between">
          <span className="font-bold text-xs whitespace-nowrap"></span>
          <div
            role="progressbar"
            style={{
              width: `${(item.actual / item.m_target) * 100}%`,
            }}
            className=" bg-green-500 rounded-md  flex    justify-end"
          >
            <span className="inline-block text-xs font-bold whitespace-nowrap ">
              {(Number(item.actual / item.m_target) * 100).toFixed(2)} %
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end w-full px-12 gap-2 mt-2">
        <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Upload
        </button>
        <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Download
        </button>
      </div>

      {gridType === "Rolling" ? (
        <div className="bg-white h-screen flex items-start justify-center max-w-full mt-4">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-4 min-h-screen">
            <table className="min-w-full divide-y border- divide-gray-200">
              <thead className="">
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Month-Year
                  </th>

                  <th className="pl-4 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white">
                    Segment
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Unit
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Zone
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Region
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Budget
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    RSP
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    M.Target
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Sale
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    B.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    R.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    M.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Overall Achievement
                  </th>
                </tr>
              </thead>
              <tbody>
                {rTableData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {moment(item.m_year).format("MMM YYYY")}
                    </td>

                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.business_segment}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      {item.business_unit_name}
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.zone_name}
                    </td>

                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {item.region_name}
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {item.budget}
                    </td>

                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.target}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      <input
                        className="border-2 border-solid border-black-500 px-2 py-2 text-right  w-16"
                        placeholder="Enter M.Target"
                        value={item.m_target}
                        disabled={isRegionSelected === false}
                        onChange={(e) =>
                          setRTableData(
                            rTableData.map((el) => {
                              if (el._id === item._id) {
                                return { ...el, m_target: e.target.value };
                              } else {
                                return el;
                              }
                            })
                          )
                        }
                      />
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.actual}
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {((item.actual / item.budget) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.budget) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.budget) * 100).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {((item.actual / item.target) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.target) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.target) * 100).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {((item.actual / item.m_target) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.m_target) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.m_target) * 100).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      <div className="demo-preview">{getProgressBar(item)}</div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="px-5 py-1 border-b border-gray-200 bg-white font-bold">
                    Total
                  </td>

                  <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>
                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                    -
                  </td>

                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>

                  <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                    -
                  </td>
                  <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                    -
                  </td>

                  <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>
                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-center">
                    -
                  </td>

                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>

                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>
                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>
                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>
                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    -
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 flex items-center justify-start gap-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={(e) => {
                  handleSubmitRollingPlan(e);
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-screen flex items-start justify-center max-w-full mt-4">
          {/* <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-4 min-h-screen">
            <table className="min-w-full divide-y border- divide-gray-200  ">
              <thead className="">
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Month-Year
                  </th>

                  <th className="pl-4 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white">
                    Segment
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Unit
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Zone
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Region
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    Budget
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    RSP
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    M.Target
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    Sale
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white  ">
                    B.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    R.Ach
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-[#626364] text-left text-xs font-semibold text-white ">
                    M.Ach
                  </th>
                </tr>
              </thead>
              <tbody>
                {cTableData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {moment(item.m_year).format("MMM YYYY")}
                    </td>

                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.business_segment}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      {item.business_unit_name}
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.zone_name}
                    </td>

                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {item.region_name}
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                      {item.budget}
                    </td>

                    <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.target}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                      <input
                        className="border-2 border-solid border-black-500 px-2 py-2"
                        placeholder="Enter M.Target"
                        value={item.m_target}
                      />
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.target}
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {((item.actual / item.m_target) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.m_target) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.m_target) * 100).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {(
                        (summaryData.actualH2 / summaryData.mTargetH2) *
                        100
                      ).toFixed(2) === "NaN" ||
                      (
                        (summaryData.actualH2 / summaryData.mTargetH2) *
                        100
                      ).toFixed(2) === "Infinity"
                        ? 0
                        : (
                            (summaryData.actualH2 / summaryData.mTargetH2) *
                            100
                          ).toFixed(2)}
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                      {((item.actual / item.m_target) * 100).toFixed(2) ===
                        "NaN" ||
                      ((item.actual / item.m_target) * 100).toFixed(2) ===
                        "Infinity"
                        ? 0
                        : ((item.actual / item.m_target) * 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex items-center justify-start gap-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div> */}
        </div>
      )}
    </Fragment>
  );
}

export default MainTable;
