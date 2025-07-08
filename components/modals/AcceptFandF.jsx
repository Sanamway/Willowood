import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import AddViewModal from "./AddViewModal";

function AcceptFanF({
  onClose,
  isOpen,
  onOpen,
  isAcOpen,
  empData,
  empCode,
  userId,
  onDeletedData,
  method,
  endpoints
}) {
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const router = useRouter();
  const [acceptFormData, setAcceptFormData] = useState({
    Noc_all_party: "",
    F_F_option: "no",
    F_F_date: "",
    F_F_User_Name: `${empData?.emp_name}`,
    View_NOC: ""
  });

  const methodDelete = async (userId) => {
    const { Noc_all_party, F_F_option, F_F_date, F_F_User_Name, View_NOC } = acceptFormData;
    const paydata = {
      Noc_all_party,
      F_F_option,
      F_F_date,
      F_F_User_Name,
      View_NOC,
      app_status: "Accept FNF"
    };

    console.log("payload", paydata);

    try {
      // return;
      const resp = await axios[method](`${url}/api/${endpoints}/${empData.e_id}`, paydata, {
        headers
      });
      const respdata = await resp.data.data;
      const respData = await resp.data;
      console.log("neww", respData);
      console.log("modres", respdata);
      // if (respdata) {
      //   onDeletedData();
      //   onClose();
      // }
      const msgg = respData.message;
      if (msgg) {
        toast.error(msgg);
        onDeletedData();
        onClose();
      }
    } catch (error) {
      console.log("moderr", error?.response?.data.message);
      const errMsg = error?.response?.data.message;
      if (errMsg) {
        toast.error(errMsg);
        onClose();
      }
      // toast.error(error)
      console.log(error);
    }
  };

  //View PAN , GST Uploaded Images

  const datas = [
    {
      id: 0,
      short_name: "CV",
      name: "Curriculum Vitae",
      src: []
    },
    {
      id: 1,
      short_name: "PP",
      name: "Passport Photo",
      src: []
    },
    {
      id: 2,
      short_name: "AD",
      name: "Aadhar Card",
      src: []
    },
    {
      id: 3,
      short_name: "PC",
      name: "Pan Card",
      src: []
    },
    {
      id: 4,
      short_name: "DL",
      name: "Driver License",
      src: []
    },
    {
      id: 5,
      short_name: "CCP",
      name: "Cancel Cheque/Passbook",
      src: []
    },
    {
      id: 6,
      short_name: "US",
      name: "Signature",
      src: []
    },
    {
      id: 7,
      short_name: "AEC",
      name: "All Education Certificate",
      src: []
    },
    {
      id: 8,
      short_name: "AEL",
      name: "Any Experience Letter",
      src: []
    },

    {
      id: 9,
      short_name: "CRL",
      name: "Company Relieving Letter",
      src: []
    },
    {
      id: 10,
      short_name: "ARL",
      name: "Acceptance Resignation Letter",
      src: []
    },
    {
      id: 11,
      short_name: "FNF",
      name: "Accept FNF",
      src: []
    }
  ];

  let [isVOpen, setisVOpen] = useState(false);
  const [titleUp, setTitleUp] = useState("Random");
  const [upindex, setUpIndex] = useState(0);
  const [shortName, setShortName] = useState(null);
  const [staticData, setStaticData] = useState(datas);

  const getUploadImages = async (index, e_id, doc_type) => {
    try {
      const res = await axios.get(
        `${url}/api/get_image?file_path=employee&c_id=1&e_id=${e_id}&doc_type=${doc_type}`,
        {
          headers: headers
        }
      );
      const respData = await res.data.data.src;

      if (respData.length > 0) {
        setAcceptFormData((prevData) => ({
          ...prevData,
          View_NOC: true
        }));
      }
      setStaticData(
        staticData.map((item) =>
          item.id === index
            ? {
                ...item,
                src: respData.map((src, index) => ({
                  id: index + 1 ? index + 1 : "",
                  src: src.src ? src.src : "",
                  document: src.file_name ? src.file_name : "",
                  name: src.doc_type ? src.doc_type : "",
                  _id: src?._id
                }))
              }
            : item
        )
      );

    } catch (error) {
      const responseError = error.response.data.status;
      if (!responseError) {
        setAcceptFormData((prevData) => ({
          ...prevData,
          View_NOC: false
        }));
      }
      console.log("insideget", acceptFormData);
      setStaticData((prevData) => {
        const newData = [...prevData];
        newData[upindex] = { ...newData[upindex], src: [] };
        return newData;
      });

      console.log("error", error.response.data.status);
    }
  };

  const handleView = (index, name) => {
    setTitleUp(name);
    setUpIndex(index);
    setShortName("Shortname");
    setisVOpen(true);
  };

  useEffect(() => {
    // if(isVOpen || onOpen){
    switch (upindex) {
      case 6:
        getUploadImages(upindex, router.query.id, "CPL");
        break;
      case 7:
        getUploadImages(upindex, router.query.id, "CPC");
        break;
      case 10:
        getUploadImages(upindex, router.query.id, "BS");
        break;
      case 11:
        getUploadImages(upindex, empData.e_id, "FNF");
        break;
      default:
        break;
    }
    // }
  }, [upindex, isVOpen, isAcOpen]);

  const closeHandler =()=>{
    onClose();
    setAcceptFormData({
      Noc_all_party: "",
      F_F_option: "no",
      F_F_date: "",
      F_F_User_Name: `${empData?.emp_name}`,
      View_NOC: ""
    })
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
                <Dialog.Panel className=" font-arial max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.78rem] font-semibold leading-6 text-center text-gray-900"
                  >
                    Accep F&F
                  </Dialog.Title>
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="nocReceived"
                      value={acceptFormData.Noc_all_party}
                      onChange={(e) =>
                        setAcceptFormData({
                          ...acceptFormData,
                          Noc_all_party: e.target.checked ? "yes" : "no"
                        })
                      }
                      className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="nocReceived" className="text-sm text-gray-700">
                      Have all NOC party documents been received?
                    </label>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleView(11, "FNF")}
                    >
                      View Document NOC
                    </button>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="ffOption" className="block text-sm font-medium text-gray-700">
                      Full & final ok
                    </label>
                    <select
                      id="ffOption"
                      name="ffOption"
                      value={acceptFormData.F_F_option}
                      onChange={(e) => {
                        setAcceptFormData({
                          ...acceptFormData,
                          F_F_option: e.target.value
                        });
                      }}
                      className="mt-1 block px-1 py-2 w-full bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="ffDate" className="block text-sm font-medium text-gray-700">
                      F&F Date
                    </label>
                    <input
                      type="date"
                      id="ffDate"
                      name="ffDate"
                      value={acceptFormData?.F_F_date}
                      onChange={(e) => {
                        setAcceptFormData({
                          ...acceptFormData,
                          F_F_date: e.target.value
                        });
                      }}
                      className="mt-1 block w-full px-1 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        methodDelete(userId);
                      }}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{
                        closeHandler()
                      }}
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
      <AddViewModal
        isOpen={isVOpen}
        onClose={() => setisVOpen(false)}
        onOpen={() => setisOpen(true)}
        method="delete"
        title={titleUp ? titleUp : "Docs"}
        upindex={upindex}
        shortName={shortName ? shortName : "Docs"}
        srcs={staticData[upindex]?.src || []}
        // refreshData={refreshData}
      ></AddViewModal>
    </>
  );
}

export default AcceptFanF;
