import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import * as XLSX from "xlsx";

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
  const handleTableDownloadRSP = () => {
    const ws = XLSX.utils.json_to_sheet(
      rTableData.map((item) => {
        return {
          Year: item.t_year,
          Month: item.m_year,
          Region: item.region_name,
          Budget: item.budget,
          RSP: item.actual,
          MTarget: item.m_target,
          Acutal: item.actual,
          plan_id: item.plan_id,
          tran_id: item.tran_id,
          r_id: item.r_id,
          z_id: item.z_id,
          bu_id: item.bu_id,
          bg_id: item.bg_id,
          c_id: item.c_id,
        };
      })
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `RSP.xlsx`);
  };
  const [fileData, setFileData] = useState(null);

  const handleAddExcel = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          blankrows: false,
        });
        json.shift();
        console.log(
          "pop",
          json.map((item) => {
            return {
              t_year: item[0],
              m_year: item[1],
              region_name: item[2],
              budget: item[3],
              actual: item[4],
              m_target: item[5],
              actual: item[6],
              plan_id: item[7],
              tran_id: item[8],
              r_id: item[9],
              z_id: item[10],
              bu_id: item[11],
              bg_id: item[12],
              c_id: item[13],
            };
          })
        );

        setFileData(
          json.map((item) => {
            return {
              t_year: item[0],
              m_year: item[1],
              region_name: item[2],
              budget: item[3],
              actual: item[4],
              m_target: item[5],
              actual: item[6],
              plan_id: item[7],
              tran_id: item[8],
              r_id: item[9],
              z_id: item[10],
              bu_id: item[11],
              bg_id: item[12],
              c_id: item[13],
            };
          })
        );
      };
      reader.readAsBinaryString(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    try {
      const respond = await axios
        .post(
          `${url}/api/update_m_target`,
          JSON.stringify({ data: fileData }),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          getRollingPlanData();
          setUploadModal(false);
          toast.success("Rolling Plan Edited successfully!");
        });
    } catch (errors) {}
  };

  const [uploadModal, setUploadModal] = useState(false);

  return (
    <Fragment>
      <div className="flex justify-end w-full px-12 gap-2 mt-2">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setUploadModal(true)}
        >
          Upload
        </button>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => handleTableDownloadRSP()}
        >
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
                    {rTableData.reduce((acc, curr) => {
                      return (acc = Number(acc) + Number(curr.budget));
                    }, 0)}
                  </td>

                  <td className="pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                    {rTableData.reduce((acc, curr) => {
                      acc = Number(acc) + Number(curr.target);
                    }, 0) || 0}
                  </td>
                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm text-center">
                    {rTableData.reduce((acc, curr) => {
                      return (acc = Number(acc) + Number(curr.m_target));
                    }, 0)}
                  </td>

                  <td className="pl-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {rTableData.reduce((acc, curr) => {
                      return (acc = Number(acc) + Number(curr.actual));
                    }, 0)}
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
      <Transition appear show={uploadModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setUploadModal(false)}
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
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="font-arial transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-medium leading-6 text-center text-gray-900"
                  >
                    Upload Excel
                  </Dialog.Title>
                  <div className="mt-4">
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      className="file-input"
                      onChange={handleAddExcel}
                    />
                  </div>
                  <div className="mt-4 flex justify-around space-x-4">
                    <button
                      onClick={() => {
                        // Add your submit logic here
                        handleConvert();
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setUploadModal(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}

export default MainTable;
