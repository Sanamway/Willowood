import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import DealerPersonal from "../modals/DealerPersonal";
import { MdCancel } from "react-icons/md";
import { Popover } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import AddViewModal from "../modals/AddViewModal";

const AdditionalInfo = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userBackImage, setBackUserImage] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [profitShareData, setProfitShareData] = useState(null);
  const [dynamicField, setDynamicField] = useState("Person");
  const [uploadImgBtn, setuploadImgBtn] = useState(null);
  const [uploadImgBackBtn, setuploadBackImgBtn] = useState(null);

  const currentYear = new Date("1980").getFullYear();
  const nextYears = Array.from({ length: 100 }, (_, index) => currentYear + index);

  // console.log("addi", props);

  const [additionalForm, setAdditionalForm] = useState({
    party_Name: "",
    year_est: "",
    nature_firm: "",
    pan: "",
    gst: "",
    plicense: "",
    pvalidto: "",
    flicense: "",
    fvalidto: "",
    shop_establish: "",
    // shop_status: {
    //   isOwned: "",
    //   isRented: ""
    // },
    shop_status: "",
    d_id: "",
    remarks: "",
    no_part: ""
  });

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (props) {
      setAdditionalForm({
        ...additionalForm,
        d_id: props?.data?.[0]?.d_id || "",
        appl_no: props?.data?.[0]?.appl_no || "",
        app_date: props?.data?.[0]?.app_date || "",
        party_Name: props?.data?.[0]?.party_Name || "",
        nature_firm: props?.data?.[0]?.nature_firm || "",
        year_est: props?.data?.[0]?.year_est || "",
        pan: props?.data?.[0]?.pan || "",
        gst: props?.data?.[0]?.gst || "",
        plicense: props?.data?.[0]?.plicense || "",
        pvalidto: moment(props?.data?.[0]?.pvalidto) || "",
        flicense: props?.data?.[0]?.flicense || "",
        fvalidto: moment(props?.data?.[0]?.fvalidto) || "",
        shop_establish: props?.data?.[0]?.shop_establish || "",
        shop_status: props?.data?.[0]?.shop_status || "",
        remarks: props?.data?.[0]?.remarks || "",
        no_part: props?.data?.[0]?.no_part || ""
      });
    }
  }, [props]);

  const handleEditAdditional = async () => {
    if (constTable?.length > 0 && !isTabLength) {
      // props.formType("Security");

      try {
        const { gst, pan, year_est } = additionalForm;
        const data = {
          ...additionalForm,
          gst: gst,
          year_est: year_est ? year_est : new Date().getFullYear().toString(),
          pan: pan,
          app_status: "Update Additional",
          d_id: props.data[0].d_id
        };
        console.log("Data to be sent", data);
        const res = await axios.put(
          `${url}/api/update_dealeradditional/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers
          }
        );
        const resp = await res.data;
        if (!res) return;
        setApiSuccess(true);
        if (resp.message) {
          toast.success("Additional Info Added Successully", { autoClose: 500 });
          setTimeout(() => {
            props.formType("Personal");
          }, 2200);
        }

        console.log("apiRes", resp);
      } catch (error) {
        console.log("Hcdv", error);
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
        const newErrors = {};
        error?.inner?.forEach((error) => {
          newErrors[error?.path] = error?.message;
        });
        const errorsLength = Object.values(newErrors);
        errorsLength.length > 0 ? toast.error(errorsLength) : "";
      }
    } else {
      toast.error("Atleast one record required for constitution update");
    }
  };

  ///////////////////////////////////********Constitution**********/////////////////////////

  const [constiFrom, setConstiForm] = useState({
    partner_name: "",
    profit_sharing: "",
    relaton: "",
    son_of: "",
    pan: "",
    adhar: "",
    parner_address: ""
  });

  const [constTable, setConstTable] = useState([]);
  const [isTabLength, setTabLength] = useState(false);
  const [constiRender, setConstiRender] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isOpen, setisOpen] = useState(false);

  const handleAddConstitution = async () => {
    try {
      // await validationSchema.validate(constiFrom, { abortEarly: false });
      const profitShareTotal = getProfitShare(constTable);
      if (profitShareTotal > 100) {
        toast.error("Profit Share Should not be exceeded to 100");
        return;
      }
      const { adhar, pan } = constiFrom;
      const data = {
        ...constiFrom,
        adhar: adhar,
        pan: pan,
        d_id: props.data[0].d_id
      };
      const res = await axios.post(`${url}/api/add_dealerconstitution`, JSON.stringify(data), {
        headers: headers
      });
      const apiRes = await res.data;

      if (!apiRes) return;
      toast.success("Constitution Added Successully");
      setTimeout(() => {
        setConstiForm({
          partner_name: "",
          parner_address: "",
          son_of: "",
          relaton: "",
          profit_sharing: "",
          pan: "",
          adhar: ""
        });
        // setBtnStatus(true)
        setConstiRender(!constiRender);
      }, 1000);
    } catch (error) {
      console.log("Hcdv", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      const newErrors = {};
      error?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      const errorsLength = Object.values(newErrors);
      errorsLength.length > 0 ? toast.error(errorsLength) : "";
    }
  };

  const getConstitution = async () => {
    try {
      const res = await axios.get(`${url}/api/get_dealerconstitution?d_id=${router.query.id}`, {
        headers: headers
      });
      const apires = await res.data.data;
      setConstTable(apires);
      setTabLength(false);
      console.log("Get Const", apires);
      // apires[0]
    } catch (error) {
      setTabLength(true);
    }
  };

  const handleConstDelete = async (item) => {
    setisOpen(true);
    setUserId(item);
  };

  const resetData = () => {
    getConstitution();
    setBtnStatus(false);
    setisOpen(false);
  };

  useEffect(() => {
    getConstitution();
  }, [props, constiRender]);

  console.log("Proppp", props);

  const nextTabHandler = () => {
    // handleEditAdditional()
    if (constTable?.length > 0 && !isTabLength) {
      props.formType("Security");
    } else {
      toast.error("Atleast one record required for constitution update");
    }
  };

  ///Profit Ratio Sum
  console.log(constTable, "vbjrbv");

  function getProfitShare(constTable) {
    let sum = 0;
    for (let i = 0; i < constTable.length; i++) {
      let item = Number(constTable[i].profit_sharing);
      sum += item;
    }
    return sum;
  }

  const profisharetotal = getProfitShare(constTable);

  //handle to validate PAN Card No. Client..

  function isValidPanCardNo(panCardNo) {
    let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    if (panCardNo == null) {
      return false;
    }
    if (regex.test(panCardNo) == true) {
      return true;
    } else {
      return false;
    }
  }

  // function natureOfFirmHandler(e) {
  //   const value = e.target.value;
  //   setAdditionalForm({
  //     ...additionalForm,
  //     nature_firm: e.target.value
  //   });

  //   switch (value) {
  //     case "Residential Individual":
  //       props.handleGrab("Personal");
  //       break;
  //     case "Domestic Company":
  //       props.handleGrab("Company");
  //       break;
  //     case "Proprietary Concern":
  //       props.handleGrab("Proprietar");
  //       break;
  //     case "Partnership Firm":
  //       props.handleGrab("Partner");
  //       break;
  //     default:
  //   }
  // }

  // const handleGrabber = (cmp) => {
  //   props.handleGrab(cmp);
  // };

  // function natureOfFirmHandler(e) {
  //   const value = e.target.value;
  //   setAdditionalForm((prevState) => ({
  //     ...prevState,
  //     nature_firm: value
  //   }));

  //   switch (value) {
  //     case "Residential Individual":
  //       // props.handleGrab("Personal");
  //       setDynamicField("Person");
  //       break;
  //     case "Domestic Company":
  //       // props.handleGrab("Company");
  //       handleGrabber("Company")
  //       setDynamicField("Director");
  //       break;
  //     case "Proprietary Concern":
  //       // props.handleGrab("Proprietar");
  //       setDynamicField("Proprietar");
  //       break;
  //     case "Partnership Firm":
  //       // props.handleGrab("Partner");
  //       setDynamicField("Partner");

  //       break;
  //     default:
  //   }
  // }

  // const natureOfFirmHandler = useMemo(() => {
  //   return (e) => {
  //     const value = e.target.value;
  //     setAdditionalForm((prevState) => ({
  //       ...prevState,
  //       nature_firm: value
  //     }));

  //     switch (value) {
  //       case "Residential Individual":
  //         setDynamicField("Person");
  //         break;
  //       case "Domestic Company":
  //         setDynamicField("Director");
  //         break;
  //       case "Proprietary Concern":
  //         setDynamicField("Proprietar");
  //         break;
  //       case "Partnership Firm":
  //         setDynamicField("Partners");
  //         break;
  //       default:
  //     }
  //   };
  // }, [additionalForm?.nature_firm]);

  useEffect(() => {
    switch (props?.data?.[0]?.nature_firm) {
      case "Residential Individual":
        setDynamicField("Person");
        break;
      case "Domestic Company":
        setDynamicField("Director");

        break;
      case "Proprietary Concern":
        setDynamicField("Proprietar");

        break;
      case "Partnership Firm":
        setDynamicField("Partners");

        break;
      default:
    }
  }, [props]);

  console.log("forms", additionalForm);

  //check file size

  const checkFileSize = (file) => {
    const maxSize = 400000;
    if (file.size > maxSize) {
      toast.error("Image Size Must be Less than 200 KB");
      return false;
    }
    return true;
  };

  //State for the Files Upload
  const [isFrontFile, setFrontFile] = useState(null);
  const [isBackFile, setBackFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  //handler for Front Image Upload

  const handleFrontImage = (e) => {
    try {
      const file = e.target.files[0];
      if (!checkFileSize(file)) {
        return;
      }
      setFrontFile(file);

      if (file) {
        setUserImage(URL.createObjectURL(file));
        setuploadImgBtn(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  //handler for Back Image Upload

  const handleBackImage = async (e) => {
    console.log("dcdc", e.target.files[0]);
    try {
      const file = e.target.files[0];
      if (!checkFileSize(file)) {
        return;
      }
      setBackFile(file);

      if (file) {
        setBackUserImage(URL.createObjectURL(file));
        setuploadBackImgBtn(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  //delete file handlers

  const handleDeleteFileFront = (e) => {
    setUserImage("");
  };
  const handleDeleteFileBack = (e) => {
    setBackUserImage("");
  };

  //Upload Front File Handler
  const config = {
    onUploadProgress: (progressEvent) => {
      setProgress((prev) => {
        return { ...prev, pc: progressEvent.progress * 100 };
      });
    }
  };

  const handleUploadFront = () => {
    try {
      if (!isFrontFile) {
        toast.error("No File Selected");
        return;
      }

      if (!checkFileSize(isFrontFile)) {
        return;
      }

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      const renamedBlob = new Blob([isFrontFile], { type: isFrontFile?.type });
      // const genrandomID = crypto.randomUUID();
      // const randomID = genrandomID.substring(4, 23);
      const fd = new FormData();
      fd.append(
        "myFile",
        renamedBlob,
        // `${"ADD" + "_" + "FRONT_IMG" + "_" + props?.data?.[0]?.appl_no + "_" + randomID}.${getFileExtension(
        //   isFrontFile?.name
        // )}`
        `${"ADD" + "_" + "FRONT_IMG" + "_" + props?.data?.[0]?.appl_no}.${getFileExtension(
          isFrontFile?.name
        )}`
      );
      setMsg("Uploading....");
      setProgress((prev) => {
        return { ...prev, started: true };
      });
      axios
        .post(
          `${url}/api/upload_file/?file_path=dealer&c_id=${"1"}&d_id=${router.query.id}&app_date=${
            props?.data?.[0]?.app_date
          }&appl_no=${props?.data?.[0]?.appl_no}&doc_type=AD_FRONT`,
          fd,
          config
        )
        .then((res) => {
          setMsg("Upload Successful");
          toast.success("Uploaded Successfully");
          setTimeout(() => {
            setProgress({ started: false, pc: 0 });
            setFrontFile("");
            setuploadImgBtn(false);
            setMsg(null);
          }, 2000);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("ee", error);
    }
  };

  const handleUploadBack = () => {
    try {
      if (!isBackFile) {
        toast.error("No File Selected");
        return;
      }

      if (!checkFileSize(isBackFile)) {
        return;
      }

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      const renamedBlob = new Blob([isBackFile], { type: isBackFile?.type });
      // const genrandomID = crypto.randomUUID();
      // const randomID = genrandomID.substring(4, 23);
      const fd = new FormData();
      fd.append(
        "myFile",
        renamedBlob,
        // `${"ADD" + "_" + "BACK_IMG" + "_" + props?.data?.[0]?.appl_no + "_" + randomID}.${getFileExtension(
        //   isBackFile?.name
        // )}`
        `${"ADD" + "_" + "BACK_IMG" + "_" + props?.data?.[0]?.appl_no}.${getFileExtension(isBackFile?.name)}`
      );
      setMsg("Uploading....");
      setProgress((prev) => {
        return { ...prev, started: true };
      });
      axios
        .post(
          `${url}/api/upload_file/?file_path=dealer&c_id=${"1"}&d_id=${router.query.id}&app_date=${
            props?.data?.[0]?.app_date
          }&appl_no=${props?.data?.[0]?.appl_no}&doc_type=AD_BACK`,
          fd,
          config
        )
        .then((res) => {
          setMsg("Upload Successful");
          toast.success("Uploaded Successfully");
          setTimeout(() => {
            setProgress({ started: false, pc: 0 });
            setBackFile("");
            setuploadBackImgBtn(false);
            setMsg(null);
          }, 2000);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("ee", error);
    }
  };

  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    if (props) {
      try {
        if (
          props?.data[0]?.app_status == "Approved By Region" ||
          props?.data[0]?.app_status == "Approved By Zonal" ||
          props?.data[0]?.app_status == "Approved By Business Unit" ||
          props?.data[0]?.app_status == "Approved By Zonal A/c Manager"
        ) {
          setDisableNext(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, [props]);

  //View PAN , GST Uploaded Images

  const datas = [
    {
      id: 0,
      short_name: "SD",
      name: "Security Deposit Cheque",
      src: []
    },
    {
      id: 1,
      short_name: "CPD",
      name: "Copy of Partnership Dead",
      src: []
    },
    {
      id: 2,
      short_name: "CCI",
      name: "Copy of Certificate of Incorporation",
      src: []
    },
    {
      id: 3,
      short_name: "PG",
      name: "Personal Guarantee",
      src: []
    },
    {
      id: 4,
      short_name: "PL",
      name: "Profit and Loss",
      src: []
    },
    {
      id: 5,
      short_name: "BSLTY",
      name: "Balance Sheet for Last Two Years",
      src: []
    },
    {
      id: 6,
      short_name: "CPL",
      name: "Copy Of Pesticide License",
      src: []
    },

    {
      id: 7,
      short_name: "CPC",
      name: "Copy of Pan Card",
      src: []
    },
    {
      id: 8,
      short_name: "CAC",
      name: "Copy of Aadhar Card",
      src: []
    },

    {
      id: 9,
      short_name: "CBSV",
      name: "Copy of Bank Signature Verification",
      src: []
    },

    {
      id: 10,
      short_name: "BS",
      name: "Bank Statement",
      src: []
    },
    {
      id: 11,
      short_name: "CFL",
      name: "Copy Of Fertilizer License",
      src: []
    }
  ];

  let [isVOpen, setisVOpen] = useState(false);
  const [titleUp, setTitleUp] = useState("Random");
  const [upindex, setUpIndex] = useState(0);
  const [shortName, setShortName] = useState(null);
  const [staticData, setStaticData] = useState(datas);

  const getingUploadedImages =async (index, d_id, doc_type)=>{
    try {
      const res = await axios.get(
        `${url}/api/get_image?file_path=dealer&c_id=1&d_id=${d_id}&doc_type=${doc_type}`,
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

      console.log("addition", staticData);
    } catch (error) {
      
    }
  }

  const handleView = (index, name) => {
    setTitleUp(name);
    setUpIndex(index);
    setShortName("Shortname");
    setisVOpen(true);
  };


  useEffect(()=>{
    switch(upindex){
      case 6:
        getingUploadedImages(upindex, router.query.id, "CPL");
        break;
      case 7:
        getingUploadedImages(upindex, router.query.id, "CPC");
        break;
      case 10:
        getingUploadedImages(upindex, router.query.id, "BS");
        break;
      case 11:
        getingUploadedImages(upindex, router.query.id, "CFL");
        break;
        default:
          break;
    }
  },[upindex, isVOpen])


  ////////////////////////////////*********JSX Starting********///////////////////////////////

  return (
    <form className=" bg-white rounded  p-4 w-full  overflow-auto " onSubmit={(e) => e.preventDefault()}>
      <DealerPersonal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onOpen={() => setisOpen(true)}
        userId={userId}
        method="get"
        onDeletedData={resetData}
        endpoints="delete_dealerconstitution"
      ></DealerPersonal>
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
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Party Name"
            value={additionalForm?.party_Name}
            disabled
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Year of Establishment
          </label>
          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={new Date(additionalForm?.year_est ? additionalForm?.year_est : new Date())}
            showYearPicker
            dateFormat="yyyy"
            dropdownMode="select"
            onChange={(date) => {
              setAdditionalForm({
                ...additionalForm,
                year_est: moment(date).format("yy")
              });
            }}
            onChangeRaw={(e) => {
              e.preventDefault();
            }}
          />
        </div>

        <div className="flex w-full  my-2 mb-2 lg:flex-row flex-col">
          <div className="w-full px-2 mt-2 ">
            <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="inputField">
              <small className="text-red-600 ">*</small> Nature of Firm
            </label>
            <select
              className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              value={additionalForm?.nature_firm}
              onChange={(e) => {
                // if(e.target.value=="Domestic Company"){
                //   // props.handleGrab("Comapny")
                //   setDynamicField("Director")
                // }
                // if(e.target.value=="Residential Individual"){
                //   props.handleGrab("Personal")
                // }
                setAdditionalForm({
                  ...additionalForm,
                  nature_firm: e.target.value
                });
              }}
              // onChange={(e) => {
              //   natureOfFirmHandler(e);
              // }}
              disabled={props?.data?.[0]?.nature_firm !== "" ? true : false}
            >
              <option value="" className="focus:outline-none focus:border-b bg-white">
                Option
              </option>
              <option value="Residential Individual">Residential Individual</option>
              <option value="Domestic Company">Domestic Company</option>
              <option value="Proprietary Concern">Proprietary Concern</option>
              <option value="Partnership Firm">Partnership Firm</option>
            </select>
          </div>

          <div className="w-full px-2 mt-2 ">
            <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="inputField">
              <small className="text-red-600 ">*</small> {`No of ${dynamicField}`}
            </label>
            <input
              className="w-full px-3 py-1.5 border rounded-lg border-gray-30  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              id="stateSelect"
              placeholder={`Number of ${dynamicField} `}
              value={additionalForm?.no_part}
              onChange={(e) => {
                const inputVal = e.target.value;
                if (inputVal.length > 3) {
                  return;
                }
                setAdditionalForm({
                  ...additionalForm,
                  no_part: e.target.value
                });
              }}
              // disabled={additionalForm?.no_part ? true:false}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> PAN No.
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              maxLength={10}
              placeholder="PAN No."
              disabled={props.data?.[0]?.d_type == "registered"}
              value={additionalForm?.pan}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  pan: e.target.value.toUpperCase()
                });
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 cursor-pointer text-blue-500">
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
                      } absolute select-none lg:absolute z-40 -top-1.5 -right-1.5  w-24 bg-white text-black border rounded-md shadow-md`}
                    >
                      <ul className="text-black text-xs flex flex-col font-Rale cursor-pointer">
                        <li
                          onClick={() => handleView(7, "PAN")}
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
          </div>
        </div>
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> GST Registration No.
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              maxLength={15}
              id="inputField"
              placeholder="GST Registration No."
              disabled={props.data?.[0]?.d_type == "registered"}
              value={additionalForm?.gst}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  gst: e.target.value
                });
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 cursor-pointer text-blue-500">
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
                      } absolute select-none lg:absolute z-40 -top-1.5 -right-1.5   w-24 bg-white text-black border rounded-md shadow-md`}
                    >
                      <ul className="text-black text-xs flex flex-col font-Rale cursor-pointer">
                        <li
                          onClick={() => handleView(10, "GST")}
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
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col gap-2">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Pesticide License No.
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Pesticide License No."
              value={additionalForm?.plicense}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  plicense: e.target.value
                });
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 cursor-pointer text-blue-500">
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
                      } absolute select-none lg:absolute z-40 -top-1.5 -right-1.5   w-24 bg-white text-black border rounded-md shadow-md`}
                    >
                      <ul className="text-black text-xs flex flex-col font-Rale cursor-pointer">
                        <li
                          onClick={() => handleView(6, "Pesticide License")}
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
          </div>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2 " htmlFor="inputField">
            <small className="text-red-600">*</small> Valid to
          </label>
          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={new Date(additionalForm?.pvalidto ? additionalForm?.pvalidto : new Date())}
            // showYearPicker
            // dateFormat="mm/dd/yyyy"
            dateFormat="dd/MM/yyyy"
            dropdownMode="select"
            onChange={(date) => {
              setAdditionalForm({
                ...additionalForm,
                pvalidto: moment(date).format("LL")
              });
            }}
            onChangeRaw={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Fertilizer License No.
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Fertilizer License No."
              value={additionalForm?.flicense}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  flicense: e.target.value
                });
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 cursor-pointer text-blue-500">
              <Popover as="div" className="relative lg:relative border-none outline-none ">
                {({ open }) => (
                  <>
                    <Popover.Button className="focus:outline-none aria-expanded">
                      <BsThreeDotsVertical className="text-[#626364] cursor-pointer" size={20} />
                    </Popover.Button>

                    <Popover.Panel
                      as="div"
                      className={`${
                        open ? "block" : "hidden"
                      } absolute select-none lg:absolute z-40 -top-1.5 -right-1.5   w-24 bg-white text-black border rounded-md shadow-md`}
                    >
                      <ul className="text-black text-xs flex flex-col font-Rale cursor-pointer">
                        <li
                          onClick={() => handleView(11, "Fertilizer License")}
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
          </div>
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2 lg:pt-0 " htmlFor="inputField">
            <small className="text-red-600">*</small> Valid to
          </label>

          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={new Date(additionalForm?.fvalidto ? additionalForm?.fvalidto : "2024")}
            // showYearPicker

            dateFormat="dd/MM/yyyy"
            dropdownMode="select"
            onChange={(date) => {
              setAdditionalForm({
                ...additionalForm,
                fvalidto: moment(date).format("LL")
              });
            }}
            onChangeRaw={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </div>

      <div className="flex  my-2">
        <div className="w-full lg:w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">* </small>Shop & Establishment No.
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Shop & Establishment No."
              value={additionalForm?.shop_establish.toUpperCase()}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  shop_establish: e.target.value
                });
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 cursor-pointer text-blue-500">
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
                      } absolute select-none lg:absolute z-40 -top-1.5 -right-1.5   w-24 bg-white text-black border rounded-md shadow-md`}
                    >
                      <ul className="text-black text-xs flex flex-col font-Rale cursor-pointer">
                        <li
                          onClick={() => handleView(11, "Shop Establish")}
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
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col items-center  ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
            <span className="flex gap-1">
              {" "}
              <small className="text-red-600"></small> Shop Status : Please Tick Mark{" "}
              <BsCheck2Circle className="text-green-500" fontSize={20} />
            </span>
          </label>
        </div>
        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ownedCheckbox"
              className="mr-2"
              value={additionalForm?.shop_status}
              checked={additionalForm?.shop_status === "true"}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  shop_status: "true"
                });
              }}
            />
            <label htmlFor="ownedCheckbox">Owned</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rentedCheckbox"
              className="mr-2"
              value={additionalForm?.shop_status}
              checked={additionalForm?.shop_status === "false"}
              onChange={(e) => {
                setAdditionalForm({
                  ...additionalForm,
                  shop_status: "false"
                });
              }}
            />
            <label htmlFor="rentedCheckbox">Rented</label>
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> If Owner Required any Government approved document
            <h6 className="text-xs font-thin">(Electricity/Water Bill in name of Proprietor)</h6>
          </label>
        </div>
        {/* <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600"></small> If Rented Required Rent Agreement in name of Proprietor
            <h6 className="text-xs font-thin">(Govt. approved documents of the same premises)</h6>
          </label>
        </div> */}
      </div>

      {/* new input fields  */}

      <div className="flex justify-start items-center  w-full my-4">
        <h2 className="font-arial font-normal text-center lg:text-left text-xl py-2 border-dashed  border-t-2 mx-2 w-full border-b-2 border-l-0 border-r-0">
          <small className="text-red-600">* </small>Constitution
        </h2>
      </div>

      <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="md:w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Name of Partner
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Name of Partner"
            value={constiFrom?.partner_name}
            onChange={(e) => {
              setConstiForm({
                ...constiFrom,
                partner_name: e.target.value
              });
            }}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Profit Sharing Ratio.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Profit Sharing Ratio"
            value={constiFrom?.profit_sharing}
            onChange={(e) => {
              const profitShare = e.target.value.length;
              const exceededVal = profisharetotal + Number(e.target.value);
              console.log("exceed", exceededVal);
              if (exceededVal > 100) {
                toast.error("Profit Share Exceeded");
                return;
              }
              if (profitShare > 3) {
                toast.error("Profit Share must be less than or equal to 100");
                return;
              }
              setConstiForm({
                ...constiFrom,
                profit_sharing: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Relationship
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            disabled={formActive}
            value={constiFrom?.relaton}
            onChange={(e) => {
              setConstiForm({
                ...constiFrom,
                relaton: e.target.value
              });
            }}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
          </select>
        </div>
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Son Of
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Son of"
            value={constiFrom?.son_of}
            onChange={(e) => {
              setConstiForm({
                ...constiFrom,
                son_of: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col  my-2 mb-2 lg:flex-row gap-3">
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> PAN No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            maxLength={10}
            placeholder="PAN No."
            value={constiFrom?.pan}
            onChange={(e) => {
              setConstiForm({
                ...constiFrom,
                pan: e.target.value.toUpperCase()
              });
            }}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> AADHAR No.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="AADHAR No."
            maxLength={12}
            value={constiFrom?.adhar}
            onChange={(e) => {
              if (e.target.value.length > 12) {
                return;
              }
              setConstiForm({
                ...constiFrom,
                adhar: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
          <small className="text-red-600">*</small> Address
        </label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          type="text"
          id="inputField"
          placeholder="Address"
          // disabled={!formActive}
          value={constiFrom?.parner_address}
          onChange={(e) => {
            setConstiForm({
              ...constiFrom,
              parner_address: e.target.value
            });
          }}
        />
      </div>

      <div className="w-full px-2">
        {router.query.type === "Edit" && (
          <div className="my-3 flex items-center justify-end ">
            <button
              onClick={() => {
                handleAddConstitution();
              }}
              className="bg-orange-500 flex items-center justify-center whitespace-nowrap text-white px-2 py-1.5 rounded-sm"
            >
              Add +
            </button>
          </div>
        )}
      </div>

      {/* tables */}

      <div className="w-full px-2 ">
        <div className="overflow-x-auto chat-scrollbar select-none w-full md:w-full  md:relative h-30">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
            <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
              <tr className="">
                <th className="px-1 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold ">
                  Name or Adddress of All Partners
                </th>

                <th className="px-4 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                  Profit Sharing Ratio
                </th>

                <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                  Relationship
                </th>
                <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                  Son Of
                </th>
                <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                  Pan No.
                </th>
                <th className="px-2 py-1 text-left lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">
                  Aadhar No.
                </th>
                <th className="px-2 py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            {isTabLength ? (
              <h2>No Data Found</h2>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200 break-normal ">
                {constTable?.length > 0 ? (
                  constTable?.map((item) => (
                    <tr key={item?.id}>
                      <td
                        className={`px-2 text-left  py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                      >
                        {item?.partner_name + " " + item?.parner_address}
                      </td>
                      <td
                        className={`px-2 text-left  py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                      >
                        {item?.profit_sharing}
                      </td>
                      <td
                        className={`px-2 text-left  py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                      >
                        {item?.relaton}
                      </td>
                      <td
                        className={`px-2 text-left  py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                      >
                        {item?.son_of}
                      </td>
                      <td
                        className={`px-2 text-left  py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                      >
                        {item?.pan}
                      </td>
                      <td
                        className={`px-2 text-left  py-1 lg:text-[0.8rem] text-[0.6rem] text-gray-900 border `}
                      >
                        {item?.adhar}
                      </td>
                      <td className="px-2 text-center  py-1 text-[0.6rem] text-gray-900 border">
                        <button
                          onClick={() => handleConstDelete(item)}
                          className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap"
                        >
                          {<AiOutlineDelete className="hover:text-red-500"></AiOutlineDelete>}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <p>No Data Found</p>
                  </>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* photos */}
      <div className="w-full px-2 mt-10 md:mt-1  ">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <small className="text-red-600">* </small>Shop Photograph with Proprietor & Company Staff
          <h6 className="text-xs font-thin">(Shop board must appear in photograph)</h6>
        </label>
      </div>
      <div className="flex items-center justify-center  flex-col md:flex gap-4  my-2 mb-2 lg:flex-row ">
        <div className="wrap flex flex-col items-center ">
          <div className="profpic relative group">
            <img
              src={userImage ? userImage : userImage}
              className="h-52 w-52 bg-gray-200"
              width={100}
              height={100}
            />
            <input
              type="file"
              accept=".jpeg,.jpg, .png"
              onChange={handleFrontImage}
              style={{ display: "none" }}
              id="fileInput"
              disabled={router.query.type == "view"}
            />
            <label
              htmlFor="fileInput"
              className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                userImage == "" ? "opacity-50" : "opacity-0"
              } ${
                userImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
              }  transition-opacity duration-300`}
            >
              <span
                className={`text-red-500 flex items-center absolute -top-14 right-0 justify-center ${
                  userImage == "" ? "group-hover:opacity-0" : "group-hover:opacity-100"
                }`}
              >
                <MdCancel
                  onClick={handleDeleteFileFront}
                  className={`${userImage == "" ? "hidden" : "block"}`}
                  size={29}
                ></MdCancel>
              </span>{" "}
              <span
                className={`${
                  userImage !== "" ? "group-hover:opacity-0" : "group-hover:opacity-100"
                } text-xs whitespace-nowrap`}
              >
                Upload Front Image
              </span>
            </label>
          </div>
          {uploadImgBtn ? (
            <button className="bg-red-100 px-2 py-1 my-2 rounded-md" onClick={handleUploadFront}>
              Upload
            </button>
          ) : null}
        </div>

        <div className="wrap flex flex-col items-center ">
          <div className="profpic relative group">
            <img
              src={userBackImage ? userBackImage : userBackImage}
              className="h-52 w-52 bg-gray-200"
              width={100}
              height={100}
            />
            <input
              type="file"
              accept=".jpeg,.jpg, .png"
              onChange={handleBackImage}
              style={{ display: "none" }}
              id="backInput"
              disabled={router.query.type == "view"}
            />
            <label
              htmlFor="backInput"
              className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                userBackImage == "" ? "opacity-50" : "opacity-0"
              } ${
                userBackImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
              }  transition-opacity duration-300`}
            >
              <span
                className={`text-red-500 flex items-center absolute -top-14 right-0 justify-center ${
                  userBackImage == "" ? "group-hover:opacity-0" : "group-hover:opacity-100"
                }`}
              >
                <MdCancel
                  onClick={handleDeleteFileBack}
                  className={`${userBackImage == "" ? "hidden" : "block"}`}
                  size={29}
                ></MdCancel>
              </span>{" "}
              <span
                className={`${
                  userBackImage !== "" ? "group-hover:opacity-0" : "group-hover:opacity-100"
                } text-xs whitespace-nowrap`}
              >
                Upload Back Image
              </span>
            </label>
          </div>
          {uploadImgBackBtn ? (
            <button className="bg-red-100 px-2 py-1 my-2 rounded-md" onClick={handleUploadBack}>
              Upload
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Remarks
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={additionalForm?.remarks}
            onChange={(e) => {
              setAdditionalForm({
                ...additionalForm,
                remarks: e.target.value
              });
            }}
            placeholder="Remarks"
          />
        </div>
      </div>

      {/* buttons */}
      {router.query.type === "Edit" && (
        <div className="my-6 flex items-center justify-end">
          <div className="flex items-center justify-center w-full gap-4 py-4 ">
            <button
              onClick={() => props.formType("Basic")}
              className={`text-center rounded-md hover:bg-green-500 ${
                formActive ? "bg-green-400" : "bg-gray-400"
              }  text-white py-1 px-4 text-lg`}
            >
              Prev
            </button>
            <button
              // onClick={() => props.formType("Security")}
              // onClick={nextTabHandler}
              disabled={disableNext}
              onClick={() => handleEditAdditional()}
              className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            >
              {/* {btnStatus ? "Next": "Next"} */}
              Next
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AdditionalInfo;
