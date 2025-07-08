import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { url } from "@/constants/url";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";

function RejectApproval({
  onClose,
  isOpen,
  title,
  refreshData,
  formData,
  setFormData,
  getDataFrom,
  whatsAppData,
  onClosee
}) {
  const [closeBtn, setCloseBtn] = useState(null);
  const router = useRouter();

  console.log("ModaWhatsApp", whatsAppData);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const closeButtonHandler = () => {
    setFormData({});
    onClose(false);
    if (onClosee) {
      onClosee();
    }
  };

  // WhatsApp message function
  async function whatsAppMsg(recipientMob, levelPerson, empName, rejectionReason, userPerson) {
    try {
      const payLoad = {
        recipient: String(recipientMob),
        tem_id: "848983",
        placeholders: [levelPerson, empName, rejectionReason, userPerson]
      };

      const res = await axios.post(`${url}/api/whatsAppChat`, JSON.stringify(payLoad), {
        headers: {
          "Content-Type": "application/json",
          secret: "fsdhfgsfuiweifiowefjewcewcebjw"
        }
      });
      console.log("WhatsApp message sent:", res.data);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  }

  const submitButtonHandler = async () => {
    try {
      let data = {};
      let isValid = false;
      if (title === "RDM Reject" && formData?.rdm_r_date && formData?.rdm_r_reason) {
        data = {
          rdm_r_date: formData.rdm_r_date,
          rdm_r_reason: formData.rdm_r_reason,
          rdm_id_status: "Rejected HR Onboarding by RDM",
          app_status: "Rejected HR Onboarding by RDM",
          reject: true,
          rdm: true
        };
        isValid = true;
      } else if (title === "RM Reject" && formData?.rm_r_date && formData?.rm_r_reason) {
        data = {
          rm_r_date: formData.rm_r_date,
          rm_r_reason: formData.rm_r_reason,
          r_id_status: "Rejected HR Onboarding by RM",
          app_status: "Rejected HR Onboarding by RM",
          reject: true,
          rm: true
        };
        isValid = true;
      } else if (title === "ZDM Reject" && formData?.zdm_r_date && formData?.zdm_r_reason) {
        data = {
          zdm_r_date: formData.zdm_r_date,
          zdm_r_reason: formData.zdm_r_reason,
          zdm_id_status: "Rejected HR Onboarding by ZDM",
          app_status: "Rejected HR Onboarding by ZDM",
          reject: true,
          zdm: true
        };
        isValid = true;
      } else if (title === "ZM Reject" && formData?.zm_r_date && formData?.zm_r_reason) {
        data = {
          zm_r_date: formData.zm_r_date,
          zm_r_reason: formData.zm_r_reason,
          z_id_status: "Rejected HR Onboarding by ZM",
          app_status: "Rejected HR Onboarding by ZM",
          reject: true,
          zm: true
        };
        isValid = true;
      } else if (title === "BU Reject" && formData?.bu_r_date && formData?.bu_r_reason) {
        data = {
          bu_r_date: formData.bu_r_date,
          bu_r_reason: formData.bu_r_reason,
          bu_id_status: "Rejected HR Onboarding by BU",
          app_status: "Rejected HR Onboarding by BU",
          reject: true,
          bu: true
        };
        isValid = true;
      }

      if (isValid) {
        if (whatsAppData && Object.keys(whatsAppData).length > 0) {
          await whatsAppMsg(
            whatsAppData.recipientMob,
            whatsAppData.levelPerson,
            whatsAppData.empName,
            whatsAppData.rejectionReason,
            whatsAppData.userPerson
          );
        }
       
        console.log("data", data)
        // return;
        const res = await axios.put(
          `${url}/api/update_emp_reject_status/${router.query.id}`,
          JSON.stringify(data),
          { headers }
        );

        if (res?.data?.status === 200 || res?.data) {
          toast.success("Rejected Successfully");
          refreshData();
          getDataFrom(
            formData
          );

          onClose(false);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.error("Error submitting rejection:", error);
      toast.error(errMsg);
    }
  };

  return (
    <>
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
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-arial">
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="select-none w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl sm:text-2xl font-bold text-center text-gray-800">
                    {title} Reject - HR Onboarding
                  </Dialog.Title>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 gap-4">
                    <div className="flex flex-col select-none">
                      <label className="text-sm font-medium text-gray-700 mb-1">Reject Date</label>
                      <input
                        type="date"
                        value={
                          formData?.rdm_r_date
                            ? moment(formData.rdm_r_date).format("YYYY-MM-DD")
                            : formData?.rm_r_date
                            ? moment(formData.rm_r_date).format("YYYY-MM-DD")
                            : formData?.zdm_r_date
                            ? moment(formData.zdm_r_date).format("YYYY-MM-DD")
                            : formData?.zm_r_date
                            ? moment(formData.zm_r_date).format("YYYY-MM-DD")
                            : formData?.bu_r_date
                            ? moment(formData.bu_r_date).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={(e) => {
                          const dateValue = moment(new Date(e.target.value)).format("YYYY-MM-DD");
                          if (title === "RDM Reject") {
                            setFormData((prev) => ({ ...prev, rdm_r_date: dateValue }));
                          } else if (title === "RM Reject") {
                            setFormData((prev) => ({ ...prev, rm_r_date: dateValue }));
                          } else if (title === "ZDM Reject") {
                            setFormData((prev) => ({ ...prev, zdm_r_date: dateValue }));
                          } else if (title === "ZM Reject") {
                            setFormData((prev) => ({ ...prev, zm_r_date: dateValue }));
                          } else if (title === "BU Reject") {
                            setFormData((prev) => ({ ...prev, bu_r_date: dateValue }));
                          }
                        }}
                        className="select-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">Reason for Rejection</label>
                      <textarea
                        onChange={(e) => {
                          if (title === "RDM Reject") {
                            setFormData((prev) => ({ ...prev, rdm_r_reason: e.target.value }));
                          } else if (title === "RM Reject") {
                            setFormData((prev) => ({ ...prev, rm_r_reason: e.target.value }));
                          } else if (title === "ZDM Reject") {
                            setFormData((prev) => ({ ...prev, zdm_r_reason: e.target.value }));
                          } else if (title === "ZM Reject") {
                            setFormData((prev) => ({ ...prev, zm_r_reason: e.target.value }));
                          } else if (title === "BU Reject") {
                            setFormData((prev) => ({ ...prev, bu_r_reason: e.target.value }));
                          }
                        }}
                        placeholder="Enter reason"
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-center gap-3">
                    <button
                      type="button"
                      disabled={closeBtn}
                      onClick={submitButtonHandler}
                      className="w-full sm:w-auto inline-flex justify-center rounded-md bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      disabled={closeBtn}
                      onClick={closeButtonHandler}
                      className="w-full sm:w-auto inline-flex justify-center rounded-md bg-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
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
    </>
  );
}

export default RejectApproval;
