import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { agreement } from "@/constants/empAgree";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../../public/logowillnew.png";
import Stamp from "../../public/signature2.png";
import moment from "moment";
import Image from "next/image";
import { FcCheckmark } from "react-icons/fc";

const Agreement = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  //   const [isAgreed, setIsAgreed] = useState(false);
  const [finalSubBtn, setFinalSubBtn] = useState(null);
  const [disableSubButton, setDisableSubButton] = useState(null);
  const [disSubmit, setDisSubmit] = useState(null);
  const [acceptCheck, setAcceptCheck] = useState({
    isAgreed: false
  });
  const [localAcceptPolicy, setLocalAcceptPolicy] = useState("false");

  const [roleId, setRoleId] = useState(null);
  const eId = router.query.id;

  const [appCost, setAppCost] = useState({
    app_amt: "",
    empcode: "",
    renewal: "",
    agg_enddate: "",
    agg_startdate: ""
  });

  //showhidnextnewbtn
  const [isNextNewBtn, setIsNextNewBtn] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (props) {
      setAcceptCheck({
        ...acceptCheck,
        isAgreed: props?.data?.accept_the_policy == "true" ? true : false
      });
    }

    if (props?.data?.accept_the_policy) {
      setFinalSubBtn(false);
    }
  }, [props]);

  //handler for agreement

  const handleAgree = async () => {
    if (acceptCheck?.isAgreed) {
      let appStatus = "Update Agreement";
      const data = {
        accept_the_policy: acceptCheck?.isAgreed
        // app_status: "Update Agreement"
      };
      // console.log("Checked", acceptCheck)
      // setFinalSubBtn(true);
      // setDisableSubButton(true);
      console.log(data);

      // if (props?.app_status !== "Update Interview" || props?.app_status !== "MR Dealer Map") {
      //   toast.error("Update Interview");
      //   // return
      // }
      const modifiedData = ![1, 8, 7, 17].includes(roleId) ? { ...data, app_status: appStatus } : data;
      // console.log("Heveve", modifiedData)
      console.log("Modified Data", modifiedData);

      // return;
      try {
        const res = await axios.put(
          `${url}/api/update_emp_aggrement/${router.query.id}`,
          JSON.stringify(modifiedData),
          {
            headers: headers,
            params: { roleId }
          }
        );
        const apires = await res.data;
        if (!apires) {
          return;
        }
        toast.success("Agreement Accepted Successfully");
        setFinalSubBtn(true);
        setDisableSubButton(true);
        setLocalAcceptPolicy("true");
      } catch (error) {
        console.log("Errooror", error);
      }
    } else {
      toast.error("Please accept the agreement to proceed");
    }
  };

  const nextTabHandler = () => {
    if (finalSubBtn && acceptCheck?.isAgreed) {
      props.formType("SAP Info");
    } else {
      toast.error("Please Accept the Agreement to proceed");
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage.getItem("userinfo");
      setRoleId(JSON?.parse(userinfo)?.role_id);
    }
  }, []);

  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Set margins
      const margin = 6;
      const contentWidth = pdfWidth - 2 * margin;
      const contentHeight = pdfHeight - 2 * margin;

      // Add logo
      const logoWidth = 90;
      const logoHeight = 28.5;
      const logoX = (pdfWidth - logoWidth) / 2;
      const logoY = margin;

      pdf.addImage(Logo.src, "PNG", logoX, logoY, logoWidth, logoHeight);

      // Calculate content position and size
      const contentY = logoY + logoHeight + 2;
      const availableHeight = contentHeight - (contentY - margin);

      // Add content
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        contentY,
        contentWidth,
        availableHeight,
        "",
        "FAST",
        0,
        (contentY - margin) / 2
      );

      //yellow green line

      pdf.setFont("Halvetica");
      pdf.setFontSize(20);
      pdf.setTextColor(10);
      const companyNameY = pdfHeight - 22;
      pdf.text("WILLOWOOD CHEMICALS LIMITED", pdfWidth / 2, companyNameY, { align: "center" });

      // Add office address below the company name
      pdf.setFontSize(8);
      const addressY = companyNameY + 5;
      pdf.text(
        "Corporate Office: 406 - 409, 4th Floor Salcon Aurum, District Centre, Jasola, New Delhi-110025, India",
        pdfWidth / 2,
        addressY,
        { align: "center" }
      );

      const secondLineY = addressY + 5;
      pdf.text(
        "Tel.:+91 11 45686868 Email : wcspl@willowood.com, CIN : U74999WB2011PTC166751",
        pdfWidth / 2,
        secondLineY,
        { align: "center" }
      );

      pdf.setFontSize(8);
      const ThirdLineY = secondLineY + 4;
      pdf.text(
        "Registered Office: Madgul Lounge, 4th Floor Flat-41,23, Chelta Central Road, Kolkata, West Bengal-700027 Tel.: +91 33 24489045/46/47",
        pdfWidth / 2,
        ThirdLineY,
        { align: "center" }
      );

      // Adding yellow and green lines at bottom....
      const stripeHeight = 6;
      const tiltAngle = -5;
      const yellowWidth = pdfWidth * 0.33;
      const greenWidth = pdfWidth * 0.67;
      const stripeY = pdfHeight - stripeHeight;

      // Draw the yellow stripe....
      pdf.setFillColor(255, 204, 0);
      pdf.triangle(0, stripeY, yellowWidth, stripeY, 0, stripeY + stripeHeight, "F");
      pdf.triangle(yellowWidth, stripeY, yellowWidth, stripeY + stripeHeight, 0, stripeY + stripeHeight, "F");

      // Draw the green stripe (67% width) with tilt, starting where the yellow stripe ends
      pdf.setFillColor(0, 153, 76);
      pdf.triangle(yellowWidth, stripeY, pdfWidth, stripeY, yellowWidth, stripeY + stripeHeight, "F");
      pdf.triangle(
        pdfWidth,
        stripeY,
        pdfWidth,
        stripeY + stripeHeight,
        yellowWidth,
        stripeY + stripeHeight,
        "F"
      );

      // Draw tilted transition area...
      pdf.setFillColor(255, 204, 0);
      pdf.triangle(
        yellowWidth,
        stripeY,
        yellowWidth + tiltAngle,
        stripeY + stripeHeight,
        yellowWidth,
        stripeY + stripeHeight,
        "F"
      );

      pdf.setFillColor(0, 153, 76);
      pdf.triangle(
        yellowWidth,
        stripeY,
        yellowWidth + tiltAngle,
        stripeY + stripeHeight,
        pdfWidth,
        stripeY + stripeHeight,
        "F"
      );

      pdf.save("letterhead-agreement.pdf");
    });
  };

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

  //handler for prevbutton on rolebased
  const handlePrev = () => {
    if (roleId == 6 || roleId == 3 || roleId == 12) {
      props.formType("DealerMap");
    } else {
      props.formType("DealerMap");
    }
  };

  const handleNewNext = () => {
    const status = props?.data?.app_status;
    // if (status === "Update Interview" || status === "MR Dealer Map") {
    props.formType("Approval");
    // } else {
    //   toast.error("Update Interview or Dealer First");
    // }
  };

  //Conveting into words

  function numberToWords(num) {
    if (num === 0) return "Zero";
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen"
    ];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];

    let words = "";

    function helper(num) {
      let str = "";

      if (Math.floor(num / 100) > 0) {
        str += ones[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num > 0) {
        if (num < 10) {
          str += ones[num];
        } else if (num < 20) {
          str += teens[num - 10];
        } else {
          str += tens[Math.floor(num / 10)];
          if (num % 10 > 0) {
            str += " " + ones[num % 10];
          }
        }
      }

      return str.trim();
    }

    let index = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        words = helper(num % 1000) + " " + thousands[index] + " " + words;
      }
      num = Math.floor(num / 1000);
      index++;
    }

    return words.trim();
  }

  //Calling the Interview Get API

  const interViewGet = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
        params: { e_id: eId, additional_data: true }
      });

      const apiRes = resp.data.data;
      console.log("InterAgreee", apiRes);
      if (apiRes) {
        setAppCost({
          ...appCost,
          app_amt: apiRes?.app_amt,
          empcode: apiRes?.empcode,
          renewal: apiRes?.aggrement,
          agg_startdate: apiRes?.agg_startdate,
          agg_enddate: apiRes?.agg_enddate
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (props) {
      interViewGet();
    }
  }, [props]);

  console.log("Props", props?.data?.accept_the_policy);

  return (
    <>
      <section className="outer section">
        <form className="bg-white rounded p-4 w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="flex my-2">
            {/* <div className="w-full px-2 border py-2 rounded-md max-h-[35rem] overflow-y-auto"> */}
            <div className="w-full px-2 border py-2 rounded-md  overflow-y-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                <small className="text-red-600"></small>
              </label>

              <div className="flex items-center justify-center w-[200mm] h-[300mm] bg-white shadow-lg mx-auto  p-6 flex-col my-">
                {/* <div className="flex items-center justify-center  flex-col my-"> */}
                <div id="pdf-content" className="font-hale">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="font-hale text-xs py-0.5">
                        {agreement.ref}
                        {props?.data?.appl_no}
                      </h1>
                      <h1 className="font-hale text-xs py-0.5">
                        {agreement.date}
                        {/* {moment(props?.data?.renewal_date ?? props?.data?.appl_dt ).format("DD/MM/Y")} */}
                        {moment(appCost?.agg_startdate).format("DD/MM/Y")}
                      </h1>
                      <h1 className="font-hale  flex gap-1 font-sem text-xs py-0.5">
                        {agreement.mr}
                        <h2 className="font-semibold">{props?.data?.fname}</h2>
                      </h1>
                      <h1 className="font-hale  flex gap-1 font-sem text-xs py-0.5">
                        {agreement.emp}
                        <h2 className="font-semibold">{appCost?.empcode}</h2>
                      </h1>
                    </div>
                    <div className="flex items-center">
                      {/* <h2>Renewal: </h2> <span className="uppercase">{appCost?.renewal}</span> */}
                      {appCost?.renewal === "yes" && <span className="font-hale text-sm ">Renewal</span>}
                    </div>
                  </div>

                  <h1 className="font-bold text-md underline font-hale flex items-center justify-center w-full py-1">
                    {agreement.title}
                  </h1>
                  <h1 className="font-hale flex  font-sem text-xs py-0.5">
                    {agreement.dearmr}
                    <h2 className="font-semibold px-0.5">{props?.data?.fname}</h2>
                  </h1>
                  <h1 className="font-hale text-xs py-0.5 ">{agreement.content3}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.content4}</h1>
                  <h1 className="font underline font-bold">{agreement.subtitle2}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.content5}</h1>
                  <h1 className="font underline font-bold">{agreement.subtitle3}</h1>
                  <h1 className="font-hale text-xs py-0.5">
                    {agreement.content6}
                    <span className="font-semibold underline ">{appCost?.app_amt}</span>/- (Rupees{" "}
                    <span className="font-semibold underline">{numberToWords(appCost?.app_amt)}</span>)
                    <span>{agreement.content7}</span>
                  </h1>
                  <h1 className="font underline font-bold">{"Reimbursement"}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.reimbursement}</h1>
                  <h1 className="font underline font-bold">{"Period of Agreement"}</h1>
                  <h1 className="font-hale text-xs py-2">
                    {agreement.poa}{" "}
                    <span className="font-semibold">{moment(appCost?.agg_startdate).format("DD/MM/Y")}</span>
                    {agreement.poaAgS}{" "}
                    <span className="font-semibold">{moment(appCost?.agg_enddate).format("DD/MM/Y")}</span>
                    {agreement.poaAgE}
                    <span>{}</span>
                  </h1>
                  <h1 className="font underline font-bold">{"Termination"}</h1>

                  <h1 className="font-hale text-xs py-2">{agreement.termination}</h1>
                  <h1 className="font underline font-bold">{"Non-Disclosure Clause"}</h1>
                  <h1 className="font-hale text-xs py-2">{agreement.non_disclosure_clause}</h1>

                  <div className="flex items-center justify-between w-full px-4">
                    <div className="flex flex-col items-center justify-center my-2">
                      <h2 className="font-hale text-xs">For Willowood Chemicals Ltd.</h2>
                      <div className="flex w-full items-center justify-center ">
                        <img src={Stamp.src} className="stampimg " width={120} height={40} alt="" />
                      </div>
                      <h2 className="font-hale text-xs">Authorized Signatory</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="font-hale text-xs">Accepted</h2>
                      <br />
                      {/* <br /> */}
                      <h2 className="">{acceptCheck?.isAgreed ? <FcCheckmark size={25} /> : null} </h2>
                      <br />
                      <br />
                      <h2 className="font-hale text-xs">{"(______________)"}</h2>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>

                <div className="flex items-center justify-center w-1/2 gap-2 flex-wrap my-4">
                  <label className="inline-flex items-center ml-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-orange-500"
                      value={acceptCheck?.isAgreed}
                      checked={acceptCheck?.isAgreed}
                      disabled={props?.data?.accept_the_policy == "true"}
                      onChange={(e) => {
                        // if (!finalSubBtn) {
                        setAcceptCheck({
                          ...acceptCheck,
                          isAgreed: e.target.checked
                        });
                        // }
                      }}
                    />
                    <span className="ml-2 text-gray-700 whitespace-nowrap">Accept the Agreement Policy</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}

          {/* buttons */}
          {router.query.type === "Edit" && (
            <div className="my-6 flex items-center justify-end ">
              <div className="flex items-center justify-center w-full gap-4 py-4">
                {router.query.profile !== "yes" && (
                  <button
                    onClick={handlePrev}
                    className={`text-center rounded-md hover:bg-green-500 ${
                      formActive ? "bg-green-400" : "bg-gray-400"
                    }  text-white py-1 px-4 text-lg`}
                  >
                    Prev
                  </button>
                )}

                {props?.data?.accept_the_policy=="false"  && localAcceptPolicy=="false"   && (
                  <button
                    disabled={disableSubButton}
                    className={`px-2 py-1 my-3 text-lg  ${
                      acceptCheck?.isAgreed ? "bg-green-500" : "bg-orange-500"
                    } text-white whitespace-nowrap rounded-md ${disSubmit && "bg-gray-500"}`}
                    onClick={handleAgree}
                  >
                    Final Submit
                  </button>
                )}

                {(props?.data?.accept_the_policy == "true" || localAcceptPolicy == "true") && (
                  <button
                    disabled={disableNext}
                    className={`px-2 py-1 my-3 text-lg  ${
                      acceptCheck?.isAgreed ? "bg-green-500" : "bg-orange-500"
                    } text-white whitespace-nowrap rounded-md ${disSubmit && "bg-gray-500"}`}
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </button>
                )}

                {props?.data?.accept_the_policy=="true" && router.query.profile !== "yes" && (
                  <button
                    disabled={disableNext}
                    className={`px-2 py-1 my-3 text-lg  ${
                      acceptCheck?.isAgreed ? "bg-green-500" : "bg-orange-500"
                    } text-white whitespace-nowrap rounded-md ${disSubmit && "bg-gray-500"}`}
                    onClick={handleNewNext}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          {/* buttons  */}

          
        </form>
      </section>
    </>
  );
};

export default Agreement;
