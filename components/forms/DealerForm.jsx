import React, { useState, useEffect, useCallback, useRef } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import Basic from "../DealerForms/Basic";
import Personal from "../DealerForms/Personal";
import SecurityDeposit from "../DealerForms/SecurityDeposit";
import AdditionalInfo from "../DealerForms/AdditionalInfo";
import BusinessInfo from "../DealerForms/BusinessInfo";
import Assessment from "../DealerForms/Assessment";
import Approval from "../DealerForms/Approval";
import Documents from "../DealerForms/Documents";
import Agreement from "../DealerForms/Agreement";
import SAPinfo from "../DealerForms/SAPinfo";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";
import { SlDocs } from "react-icons/sl";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdOutlineAssessment } from "react-icons/md";
import { GrShieldSecurity } from "react-icons/gr";
import { TbZoomMoney } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";
import { FaArrowCircleUp } from "react-icons/fa";

const DealerForm = () => {
  const router = useRouter();

  const [role_id, setRole_Id] = useState(null);
  const [hide, setHide] = useState(null);
  const [disable, setDisable] = useState(null);
  const [hideAssess, setHideAssess] = useState(null);
  const [hideSap, setHideSap] = useState(null);
  const [hideSecu, setHideSecu] = useState(null);
  const scrollRef = useRef(null)

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  

  useEffect(() => {
    switch (router.query.formType) {
      case "Assessment":
        setTimeout(() => {
          setFormType("Assessment");
          // scrollRef.current?.scrollIntoView()
        }, 1000);
        break;
      case "SAP Info":
        setTimeout(() => {
          setFormType("SAP Info");
          // scrollRef.current?.scrollIntoView()
        }, 1000);
        break;
      case "Approval":
        setTimeout(() => {
          setFormType("Approval");
          // scrollRef.current?.scrollIntoView()
        }, 1000);
      default:
        break;
    }
  }, [router.query.formType]);

  const [dealerData, setDealerData] = useState(null);
  const [tabName, setTabName] = useState("Personal");

  const getDataById = async () => {
    if (router.query.id == undefined) {
      return;
    }
    let params = { d_id: router.query.id, additional_data: true };

    try {
      const respond = await axios.get(`${url}/api/get_dealer`, { headers: headers, params: params });
      const apires = await respond.data.data;
      setDealerData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById(router.query.id);
  }, [router, router.query.id]);

  const [formType, setFormType] = useState("Basic");

  useEffect(() => {
    getDataById();
  }, [formType]);

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage.getItem("userinfo");
      setRole_Id(JSON?.parse(userinfo)?.role_id);
    }
  }, [role_id]);

  useEffect(() => {
    switch (role_id) {
      case 6:
        setHideAssess(false);
        setHideSap(true);
        setHideSecu(true);
        break;
      case 4:
        setHideAssess(true);
        setHideSap(true);
        setHideSecu(true);
        break;
      case 5:
        setHideAssess(true);
        setHideSap(true);
        setHideSecu(true);
        break;
      case 3:
        setHideAssess(true);
        setHideSap(false);
        setHideSecu(true);
        break;
      case 12:
        setDisable(true);
        setHideAssess(false);
        setHideSap(false);
        setHideSecu(true);
        break;
      default:
        setHide(true);
    }
  }, [role_id]);

  // function handleGrab(acceptName) {
  //   setTabName(acceptName);
  // }
  const handleGrab = useCallback((e) => {
    setTabName(e.target.value);
  }, []);

  // const handleGrab = useCallback(()=>{
  //   setTabName(prevItem => ({ ...prevItem, name: prevItem.name }));
  // },[])

  useEffect(() => {
    if (dealerData?.[0]?.nature_firm == "Residential Individual") {
      setTabName("Personal Info");
    }
    if (dealerData?.[0]?.nature_firm == "Domestic Company") {
      setTabName("Company Info");
    }
    if (dealerData?.[0]?.nature_firm == "Proprietary Concern") {
      setTabName("Proprietar Info");
    }
    if (dealerData?.[0]?.nature_firm == "Partnership Firm") {
      setTabName("Partner Info");
    }
  }, [dealerData?.[0]?.nature_firm]);

  //function to disable form tab
  const [addiTabDIsable, setaddiTabDisable] = useState(null);
  const [perTabDIsable, setPerTabDisable] = useState(null);
  const [busiTabDIsable, setBusiTabDisable] = useState(null);

  useEffect(() => {
    switch (role_id) {
      case 6:
        if (dealerData?.[0]?.app_status == "Update Basic") {
          setaddiTabDisable(false);
        } else {
          setaddiTabDisable(true);
        }
        if (dealerData?.[0]?.app_status == "Update Additional") {
          setPerTabDisable(false);
          setaddiTabDisable(false);
        } else {
          setPerTabDisable(true);
        }
        if (dealerData?.[0]?.app_status == "Update Additional") {
          setPerTabDisable(false);
          setaddiTabDisable(false);
        } else {
          setPerTabDisable(true);
        }
        break;
      default:
    }
  }, [dealerData]);

  //Scroll to Top

  const scrollToTop = () => {
    console.log("Clicked Scroll");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* <Layout> */}
      <div className="w-full font-arial bg-white text-black mb-12" id="topbar">
        <button
          className={`fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full transition-opacity`}
          onClick={scrollToTop}
        >
          <FaArrowCircleUp className="w-6 h-6" />
        </button>
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-xl lg:text-3xl  py-2">Dealer Details </h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <AiTwotoneHome
              onClick={() => {
                router.push("/table/table_dealer?name=New+Dealer+Appointment+");
              }}
              className="text-red-500"
              size={34}
            />
          </span>
        </div>

        <div className=" flex items-center justify-center lg:justify-between lg:w-full ">
          <div  className="buttons flex items-center gap-1 lg:gap-  lg:px-2 overflow-scroll no-scrollbar w-[340px] lg:w-full ">
            <button
              onClick={() => setFormType("Basic")}
              className={`${
                formType === "Basic"
                  ? "py-1 px-2 text-sm rounded-lg text-white  bg-orange-500"
                  : "py-1 px-2 text-sm rounded-sm text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[0.6rem] md:text-sm ">
                <AiTwotoneHome></AiTwotoneHome>
                Basic
              </div>
            </button>

            <button
              onClick={() => setFormType("AdditionalInfo")}
              className={`${
                formType === "AdditionalInfo"
                  ? "py-1 px-2 text-sm  text-white rounded-lg bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1 whitespace-nowrap  text-[0.6rem] md:text-sm">
                <IoMdBusiness />
                Company Info
              </div>
            </button>

            <button
              onClick={() => setFormType("Personal")}
              className={`${
                formType === "Personal"
                  ? "py-1 px-2 text-sm rounded-lg  text-white  bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center whitespace-nowrap justify-center gap-1 text-[0.6rem] md:text-sm">
                <MdOutlinePersonalInjury />
                {tabName}
              </div>
            </button>

            <button
              onClick={() => setFormType("BusinessInfo")}
              className={`${
                formType === "BusinessInfo"
                  ? "py-1 px-2 text-sm  text-white rounded-lg bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1  text-[0.6rem] md:text-sm">
                <IoMdBusiness />
                BusinessInfo
              </div>
            </button>

            {hideSecu ? (
              <button
                onClick={() => setFormType("Security")}
                className={`${
                  formType === "Security"
                    ? "py-1 px-2 text-sm rounded-lg  text-white  bg-orange-500"
                    : "py-1 px-2 text-sm  text-black  bg-white"
                }`}
              >
                <div className="flex items-center justify-center gap-1  text-[0.6rem] md:text-sm">
                  <TbZoomMoney></TbZoomMoney>
                  Security
                </div>
              </button>
            ) : null}

            <button
              onClick={() => setFormType("Documents")}
              className={`${
                formType === "Documents"
                  ? "py-1 px-2 text-sm rounded-2 text-white rounded-lg  bg-orange-500"
                  : "py-1 px-2 text-sm rounded-2 text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1  text-[0.6rem] md:text-sm">
                <SlDocs></SlDocs>
                Documents
              </div>
            </button>

            <button
              onClick={() => setFormType("Agreement")}
              className={`${
                formType === "Agreement"
                  ? "py-1 px-2 text-sm rounded-lg text-white  bg-orange-500"
                  : "py-1 px-2 text-sm rounded-2 text-black  bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1  text-[0.6rem] md:text-sm">
                <FcAcceptDatabase></FcAcceptDatabase>
                Agreement
              </div>
            </button>

            {!hideSap ? (
              <button
                onClick={() => setFormType("SAP Info")}
                className={`${
                  formType === "SAP Info"
                    ? "py-1 px-2 text-sm rounded-lg text-white  bg-orange-500"
                    : "py-1 px-2 text-sm  text-black  bg-white"
                }`}
                ref={scrollRef}
              >
                <div className="flex items-center justify-center whitespace-nowrap gap-1  text-[0.6rem] md:text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 9h10v2H7zm0 4h5v2H7z"
                    ></path>
                  </svg>
                  SAP Info
                </div>
              </button>
            ) : null}

           

            {hideAssess ? (
              <button
                onClick={() => setFormType("Assessment")}
                className={`${
                  formType === "Assessment"
                    ? "py-1 px-2 text-sm rounded-lg text-white  bg-orange-500"
                    : "py-1 px-2 text-sm  text-black  bg-white"
                }`}
                ref={scrollRef}
              >
                <div className="flex items-center justify-center gap-1  text-[0.6rem] md:text-sm">
                  <MdOutlineAssessment></MdOutlineAssessment>
                  Assessment
                </div>
              </button>
            ) : (
              ""
            )}

            <button
              onClick={() => setFormType("Approval")}
              className={`${
                formType === "Approval"
                  ? "py-1 px-2 text-sm rounded-lg text-white  bg-orange-500"
                  : "py-1 px-2 text-sm  text-black  bg-white"
              }`}
              ref={scrollRef}
            >
              <div className="flex items-center justify-center gap-1  text-[0.6rem] md:text-sm">
                <FcApproval></FcApproval>
                Approval
              </div>
            </button>
          </div>
        </div>

        {formType === "Basic" && <Basic formType={setFormType} data={dealerData} />}
        {formType === "Personal" && <Personal formType={setFormType} data={dealerData} />}
        {formType === "AdditionalInfo" && (
          <AdditionalInfo formType={setFormType} data={dealerData} handleGrab={handleGrab} />
        )}
        {formType === "Security" && <SecurityDeposit formType={setFormType} data={dealerData} />}
        {formType === "BusinessInfo" && <BusinessInfo formType={setFormType} data={dealerData} />}
        {formType === "Assessment" && <Assessment formType={setFormType} data={dealerData} />}
        {formType === "Agreement" && <Agreement formType={setFormType} data={dealerData} />}
        {formType === "Documents" && <Documents formType={setFormType} data={dealerData} />}
        {formType === "SAP Info" && <SAPinfo formType={setFormType} data={dealerData} />}
        {formType === "Approval" && <Approval formType={setFormType} data={dealerData} />}
      </div>
      {/* </Layout> */}
    </>
  );
};

export default DealerForm;
