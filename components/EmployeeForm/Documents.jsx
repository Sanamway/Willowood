import React, { useState, Fragment, useEffect } from "react";
import Aadhar from "../../public/aadhaar.png";
import defaultXlsx from "../../public/xlsx.jpg";
import defaultMsWord from "../../public/mswordicon.jpg";
import defaultImage from "../../public/default_image.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import UploadModal from "../modals/UploadModal";
import FileViewModal from "../modals/FileViewModal";
import axios from "axios";
import { url } from "@/constants/url";
import { data } from "autoprefixer";
import toast, { Toaster } from "react-hot-toast";

const Documents = (props) => {
  let [isOpen, setisOpen] = useState(false);
  let [isVOpen, setisVOpen] = useState(false);
  const router = useRouter();
  const [text, setText] = useState([]);
  const [text1, setText1] = useState([]);
  const [titleUp, setTitleUp] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [fileFullName, setFileFullName] = useState(null);
  const [extfields, setExtFields] = useState(null);
  const [isRefresh, setRefresh] = useState(false);

  //Header Config Details
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //Static Datas to show the Desired Fields for Uploading...

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

  const [staticData, setStaticData] = useState(datas);
  const [roleId, setRoleId] = useState(null);

  //Using Side Effect to Manipulate the data

  useEffect(() => {
    if (props) {
      setStaticData((prevState) =>
        prevState.map((item) => ({
          ...item,
          c_id: props?.data?.c_id,
          e_id: props?.data?.e_id,
          appl_no: props?.data?.appl_no,
          app_date: props?.data?.appl_dt
        }))
      );
    }
  }, [props, isVOpen]);

  //Getting All the Index Images For Thumbnail

  const getThumbnail = async () => {
    try {
      const res = await axios.get(
        `${url}/api/get_image?file_path=employee&c_id=1&e_id=${router.query.id}&view="thumbnail"`,
        {
          headers: headers
        }
      );
      const resAPI = await res.data.data.src;
      setStaticData((prevState) =>
        prevState.map((item) => {
          const matchedSrc = resAPI.filter((srcItem) => srcItem.doc_type === item.short_name);
          return {
            ...item,
            src: matchedSrc?.length > 0 ? matchedSrc : item.src
          };
        })
      );
      console.log("rger", resAPI);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThumbnail();
  }, [props, isRefresh]);

  const [formActive, setFormActive] = useState(false);
  const [upindex, setUpIndex] = useState(0);

  const handleUpload = (index, item) => {
    // const genrandomID = crypto.randomUUID();
    // const randomID = genrandomID.substring(4, 11);
    // const fileRenamed = item?.short_name + "_" + item?.appl_no + "_" + randomID;
    const fileRenamed = item?.short_name + "_" + item?.appl_no;
    setFileFullName(fileRenamed);
    setTitleUp(item?.name);
    setShortName(item?.short_name);
    setExtFields(item);
    setUpIndex(index);
    setisOpen(true);
  };

  const handleView = (index, item) => {
    setTitleUp(item?.name);
    setUpIndex(index);
    setShortName(item?.short_name);
    setisVOpen(true);
  };

  //Getting the uploaded Images

  const getUploadImages = async (index, e_id, doc_type) => {
    try {
      const res = await axios.get(
        `${url}/api/get_image?file_path=employee&c_id=1&e_id=${e_id}&doc_type=${doc_type}`,
        {
          headers: headers
        }
      );
      const respData = await res.data.data.src;
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

      console.log("getthumb", staticData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    switch (upindex) {
      case 0:
        getUploadImages(upindex, router.query.id, "CV");
        break;
      case 1:
        getUploadImages(upindex, router.query.id, "PP");
        break;
      case 2:
        getUploadImages(upindex, router.query.id, "AD");
        break;
      case 3:
        getUploadImages(upindex, router.query.id, "PC");
        break;
      case 4:
        getUploadImages(upindex, router.query.id, "DL");
        break;
      case 5:
        getUploadImages(upindex, router.query.id, "CCP");
        break;
      case 6:
        getUploadImages(upindex, router.query.id, "US");
        break;
      case 7:
        getUploadImages(upindex, router.query.id, "AEC");
        break;
      case 8:
        getUploadImages(upindex, router.query.id, "AEL");
        break;
      case 9:
        getUploadImages(upindex, router.query.id, "CRL");
        break;
      case 10:
        getUploadImages(upindex, router.query.id, "ARL");
      case 11:
        getUploadImages(upindex, router.query.id, "FNF");
        break;
      default:
    }
  }, [upindex, isOpen, isRefresh, isVOpen]);

  const refreshData = (status) => {
    setisVOpen(false);
    setRefresh((prevRef) => !prevRef);

    setStaticData((prevData) => {
      const newData = [...prevData];
      newData[upindex] = { ...newData[upindex], src: [] };
      return newData;
    });
  };

  // const found = staticData?.find((item)=> item.src =="")
  // console.log("Yee", found)

  function getStatus(staticData) {
    return staticData.map((doc) => ({
      id: doc.id,
      status: doc.src.length > 0
    }));
  }

  // Get status for each document
  const statusArray = getStatus(staticData);
  const statusTF = statusArray?.find((item) => item.status == true);
  console.log("statusTF", statusTF?.status);

  //disbaling next button

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

  //getting the localStorage Role_id

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage.getItem("userinfo");
      const role_id = JSON?.parse(userinfo)?.role_id;
      setRoleId(role_id);
    }
  }, []);

  const nextDocHandler = () => {
    if (statusTF?.status == true) {
      props.formType("Interview");
    } else {
      toast.error("Upload atleast one document");
    }
  };

  console.log("EmpProps", props);

  return (
    <>
      <div className="mx-2  px-4 my-4 py-1 overflow-x-auto  ">
        <UploadModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          onOpen={() => setisOpen(true)}
          method="delete"
          title={titleUp ? titleUp : "Docs"}
          shortName={shortName ? shortName : "Docs"}
          fileFullName={fileFullName ? fileFullName : "Docs"}
          upindex={upindex}
          extfields={extfields}
          filePath={"employee"}
        ></UploadModal>

        <FileViewModal
          isOpen={isVOpen}
          onClose={() => setisVOpen(false)}
          onOpen={() => setisOpen(true)}
          method="delete"
          title={titleUp ? titleUp : "Docs"}
          upindex={upindex}
          shortName={shortName ? shortName : "Docs"}
          srcs={staticData[upindex]?.src || []}
          refreshData={refreshData}
          deleteType={"employee"}
        ></FileViewModal>

        <div className="inline-block min-w-full rounded-md overflow-hidden relative z-999">
          <Toaster position="bottom-center" reverseOrder={false} />
          <table className="min-w-full leading-normal ">
            <thead className="">
              <tr>
                <th className="px-5 py-2 border-gray-200 bg-[#f0f1f2] text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Images
                </th>
                <th className="px- py-2 border-gray-200 bg-[#f0f1f2] text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Documents
                </th>
                <th className="px- py-2 border-gray-200 bg-[#f0f1f2] text-left text-xs font-semibold text-gray-600 tracking-wider">
                  Options
                </th>
              </tr>
            </thead>

            <tbody>
              {staticData?.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                    <div className="flex items-center">
                      <div className="w-20 h-20">
                        <>
                          {item?.src && item.src[0] && typeof item.src[0].src === "string" ? (
                            <>
                              {item.src[0].src.endsWith(".jpg") || item.src[0].src.endsWith(".png") ? (
                                <img
                                  alt="dealer"
                                  width={100}
                                  height={100}
                                  className="object-contain w-full h-full"
                                  src={item.src[0].src ? item.src[0].src : defaultImage}
                                />
                              ) : item.src[0].src.endsWith(".pdf") ? (
                                <div className="iframeCont overflow-hidden w-full h-[70px]">
                                  <iframe
                                    title="pdfViewer"
                                    alt="dealer"
                                    src={item.src[0].src}
                                    width="100%"
                                  ></iframe>
                                </div>
                              ) : item.src[0].src.endsWith(".doc") ? (
                                <Image
                                  alt="doc"
                                  width={100}
                                  height={100}
                                  className="object-contain w-full h-full"
                                  src={defaultMsWord}
                                />
                              ) : item.src[0].src.endsWith(".docx") ? (
                                <Image
                                  alt="docx"
                                  width={100}
                                  height={100}
                                  className="object-contain w-full h-full"
                                  src={defaultMsWord}
                                />
                              ) : item.src[0].src.endsWith(".xlsx") ? (
                                <Image
                                  alt="xlsx"
                                  width={100}
                                  height={100}
                                  className="object-contain w-full h-full"
                                  src={defaultXlsx}
                                />
                              ) : null}
                            </>
                          ) : (
                            <Image
                              alt="default"
                              width={100}
                              height={100}
                              className="object-contain w-full h-full"
                              src={defaultImage}
                            />
                          )}
                        </>
                      </div>
                    </div>
                  </td>
                  <td className="px- py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold">{item.name}</p>
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        style={{ backgroundColor: item.color }}
                        className=" inset-0 opacity-60 rounded-full"
                      ></span>
                      <span className="relative text-white whitespace-no-wrap text-xs font-semibold">
                        {item.status}
                      </span>
                    </span>
                    <div className="popop">
                      <Popover as="div" className="relative lg:relative border-none outline-none ">
                        {({ open }) => (
                          <>
                            <Popover.Button className="focus:outline-none">
                              <BsThreeDotsVertical className="text-[#626364] cursor-pointer" size={20} />
                            </Popover.Button>

                            <Popover.Panel
                              as="div"
                              className={`${
                                open ? "block" : "hidden"
                              } absolute select-none lg:absolute z-40 -top-10 right-0 mt-2 w-32 bg-white text-black border rounded-md shadow-md`}
                            >
                              <ul className="text-black text-xs flex flex-col font-Rale cursor-pointer">
                                {router.query.type == "Edit" && (
                                  <li
                                    onClick={() => handleUpload(index, item)}
                                    className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-lg"
                                  >
                                    <FaUpload className="mt-1" /> Upload
                                  </li>
                                )}
                                <li
                                  onClick={() => handleView(index, item)}
                                  className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md text-lg"
                                >
                                  <FaEye className="mt-1" /> View
                                </li>
                              </ul>
                            </Popover.Panel>
                          </>
                        )}
                      </Popover>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {router.query.type === "Edit" && (
          <div className="my-6 flex items-center justify-end ">
            <div className="flex items-center justify-center py-4 w-full gap-4 ">
              <button
                onClick={() => props.formType("Bank")}
                className={`text-center rounded-md hover:bg-green-500 ${
                  formActive ? "bg-green-400" : "bg-gray-400"
                }  text-white py-1 px-4 text-lg`}
              >
                Prev
              </button>
              <button
                disabled={disableNext}
                onClick={nextDocHandler}
                className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Documents;
