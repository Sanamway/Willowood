import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useRouter } from "next/router";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import Profile from "../../public/userimg.jpg";

function ResignModal({
  onClose,
  isOpen,
  onOpen,
  id,
  empdata,
  empCode,
  empData,
  successDel,
  userId,
  onDeletedData,
  method,
  endpoints,
  deleteType,
  userID
}) {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

console.log("empada", empData)

  const [resignFormData, setResignFormData] = useState({
    resignReqDate: new Date(),
    noticePeriod: 15,
    lwd: new Date(moment().add(15, "days").format("MM DD YYYY")),
    reason: "",
    purposedLWD: new Date(),
    comment: ""
  });

  useEffect(() => {
    setResignFormData((prevFormData) => ({
      ...prevFormData,
      lwd: new Date(moment(prevFormData.resignReqDate).add(prevFormData.noticePeriod, "days").format("MM DD YYYY")),
    }));
  }, [resignFormData.resignReqDate, resignFormData.noticePeriod]);
  

  const handleSaveResignation = async (userId) => {
    const { resignReqDate, noticePeriod, lwd, reason, purposedLWD, comment } = resignFormData;
    try {
      const payload = {
        resignation_request_date: resignReqDate,
        notice_period_in_days: noticePeriod,
        last_working_date: lwd,
        reason: reason,
        proposed_lwd: purposedLWD,
        comment: comment,
        resig_by_hr:true,
        app_status: "Resignation Submitted",
        user_id:userID
        
      };
      console.log("payload", payload);
      //WhatsAPP Details
      const {
        t_mobile_no,
        t_hod_name,
        r_hod_name,
        emp_name,
        caddress,
        emergency_conno,
        pemail,
        business_unit_name,
        zone_name,
        region_name,
        territory_name,
        reporting_hq,
        e_id
      } = empData;
      const bst = `${business_unit_name}-${zone_name}-${region_name}-${territory_name}-${reporting_hq}`;
      whatsAppMsg(
        // 7277766100,
        t_mobile_no,
        t_hod_name,
        emp_name,
        emp_name,
        caddress,
        emergency_conno,
        pemail,
        bst
      );

      

      const apiUrl = method === "put" ? `${url}/api/${endpoints}/${e_id}` : `${url}/api/${endpoints}`;
      // return
      const resp = await axios[method](apiUrl, payload, {
        headers,
        params: {
          emp_code: empCode,
          c_id: empData?.c_id,
          app_status: "Resignation Submitted"
        }
      });
      const respdata = await resp.data.data;
      const respData = await resp.data;
      console.log("neww", respData);
      console.log("modres", respdata);
      if (respdata) {
        onClose();
        setResignFormData({
          resignReqDate: new Date(),
          noticePeriod: 0,
          lwd: new Date(),
          reason: "",
          purposedLWD: new Date(),
          comment: ""
        });
      }
      const msgg = respData.message;
      const status = respData.status;
      if (msgg) {
        toast.error(msgg);
        onDeletedData();
        onClose();
        successDel(status);
      }
    } catch (error) {
      const errMsg = error?.response?.data.message;
      if (errMsg) {
        toast.error(errMsg);
        // onClose();
        onDeletedData();
      }
      // toast.error(error)
      console.log(error);
    }
  };

  //WhatsApp Handler

  async function whatsAppMsg(recipientMob, mrname, mrtwo, emp_name, address, emergency_conno, pemail, bst) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        tem_id: "632981",
        placeholders: [mrname, mrtwo, emp_name, address, emergency_conno, pemail, bst]
      };
      console.log("Wtspaylod", payLoad);

      // return;
      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: headers
      });
      const respData = await res.data;
      console.log("WA", respData);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <Dialog.Panel className=" font-arial  w-full lg:w-[40%] transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.14rem] font-bold leading-6 text-center text-gray-900"
                  ></Dialog.Title>
                  <div className="h-screen py-16 -my-5 md:py-4 md:-my-5 items-center justify-center">
                    <h2 className="text-black text-center justify-center  mb- flex flex-row  font-bold  ">
                      Resignation
                    </h2>
                    <form
                      className=" bg-white rounded  w-full px-2  fixed"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <Toaster position="bottom-center" reverseOrder={false} />
                      <div className="flex items-start justify-between ml-5 w-full">
                        <div className="flex mb-2 items-start  justify-center  gap-4  mt-1">
                          <div className="img">
                            <Image
                              className="h-[4.1rem] w-[4.1rem] rounded-full mt-2"
                              src={Profile}
                              alt="img"
                            />
                          </div>
                          <div className="empdet">
                            <div className="flex  flex-col  w-full mt-2">
                              <div className="flex md:w-full  w-28">
                                <div className="flex">
                                  <p className=" font-bold text-xs text-blue-800 w-28">Emp Code</p>
                                  <span>:</span>
                                </div>
                                <span className="w-28 ml-3">{empCode}</span>
                              </div>
                              <div className="flex  md:w-full  w-28 ">
                                <div className="flex">
                                  <p className=" font-bold text-xs text-blue-800 w-28">Name</p>
                                  <span>:</span>
                                </div>
                                <span className="w-28 ml-3 whitespace-nowrap"> {empData?.emp_name}</span>
                              </div>

                              <div className="flex md:w-full  w-28">
                                <div className="flex">
                                  <p className=" font-bold text-xs text-blue-800 w-28">Reporting HQ</p>
                                  <span>:</span>
                                </div>
                                <span className="w-28 ml-3">{empData?.reporting_hq}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full px-3">
                        <div className="flex flex-col gap-1 w-full px-2 pt-2">
                          <label
                            className="text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                            htmlFor="inputField"
                          >
                            Resignation Request Date <small className="text-red-600">*</small>
                          </label>

                          <DatePicker
                            className="w-full px-3 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            dateFormat="dd-MM-yyyy"
                            peekNextMonth
                            showMonthDropdown
                            selected={resignFormData.resignReqDate}
                            onChange={(date) => setResignFormData({ ...resignFormData, resignReqDate: date })}
                            showYearDropdown
                            dropdownMode="select"
                            // disabled
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full px-2 pt-2">
                          <label
                            className="text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                            htmlFor="inputField"
                          >
                            Notice Period in Days <small className="text-red-600">*</small>
                          </label>

                          <input
                            className="w-full px-3 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="number"
                            value={resignFormData.noticePeriod}
                            onChange={(e) =>
                              setResignFormData({ ...resignFormData, noticePeriod: e.target.value })
                            }
                            disabled
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full px-2 pt-2">
                          <label
                            className="text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                            htmlFor="inputField"
                          >
                            Last Working Date <small className="text-red-600">*</small>
                          </label>

                          <DatePicker
                            className="w-full px-3 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            dateFormat="dd-MM-yyyy"
                            selected={resignFormData.lwd}
                            peekNextMonth
                            showMonthDropdown
                            onChange={(date) => setResignFormData({ ...resignFormData, lwd: date })}
                            showYearDropdown
                            dropdownMode="select"
                            // disabled
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full px-2 pt-2">
                          <label
                            className="text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                            htmlFor="inputField"
                          >
                            Reason <small className="text-red-600">*</small>
                          </label>

                          <select
                            className="w-full px-3 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            id="userSelect"
                            value={resignFormData.reason}
                            onChange={(e) => setResignFormData({ ...resignFormData, reason: e.target.value })}
                          >
                            <option value={""} className="focus:outline-none focus:border-b bg-white">
                              Reason
                            </option>
                            <option value="Salary Growth">Salary Growth</option>
                            <option value="Benifit">Benifit</option>
                            <option value="Reporting Manager Issue">Reporting Manager Issue</option>
                            <option value="Disatisfaction">Disatisfaction</option>
                            <option value="Job Role">Job Role</option>
                            <option value="Re-Location">Re-Location</option>
                            <option value="Higher Study">Higher Study</option>
                            <option value="Growth Opportunity">Growth Opportunity</option>
                            <option value="Personal Reason">Personal Reason</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 w-full px-2 pt-2">
                          <label
                            className="text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                            htmlFor="inputField"
                          >
                            Proposed LWD <small className="text-red-600">*</small>
                          </label>

                          <DatePicker
                            className="w-full px-3 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            dateFormat="dd-MM-yyyy"
                            selected={resignFormData.purposedLWD}
                            peekNextMonth
                            showMonthDropdown
                            onChange={(date) => setResignFormData({ ...resignFormData, purposedLWD: date })}
                            showYearDropdown
                            dropdownMode="select"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full px-2 pt-2">
                          <textarea
                            className="w-full px-2 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                            id="textareaField"
                            placeholder="Remarks"
                            rows="2"
                            value={resignFormData.comment}
                            onChange={(e) =>
                              setResignFormData({ ...resignFormData, comment: e.target.value })
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-center gap-2 my-4 w-full">
                        <div className=" gap-2  flex items-center justify-center">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={onClose}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              // methodDelete(userId);
                              handleSaveResignation();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                    {/* </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ResignModal;
