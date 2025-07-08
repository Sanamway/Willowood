import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { agreement } from "@/constants/agreement";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../../public/logowillnew.png";
import Stamp from "../../public/signature2.png";
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

  const [roleId, setRoleId] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //handler for agreement

  const handleAgree = async () => {
    if (acceptCheck?.isAgreed) {
      const data = {
        accept_the_policy: acceptCheck?.isAgreed,
        app_status: "Update Agreement"
      };

      try {
        const res = await axios.put(
          `${url}/api/update_dealeraggrement/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers
          }
        );
        const apires = await res.data;
        if (!apires) {
          return;
        }
        toast.success("Agreement Accepted Successfully");
        setFinalSubBtn(true);
        setDisableSubButton(true);
      } catch (error) {
        console.log("Errooror", error);
      }
    } else {
      toast.error("Please accept the agreement to proceed");
    }
  };

  useEffect(() => {
    if (props) {
      setAcceptCheck({
        ...acceptCheck,
        isAgreed: props?.data[0]?.accept_the_policy
      });
    }

    if (props?.data[0]?.accept_the_policy) {
      setFinalSubBtn(true);
    }
  }, [props]);

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

  // const handleDownloadPDF = () => {
  //   const input = document.getElementById("pdf-content");

  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: "a4"
  //     });

  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     // Set margins
  //     const margin = 6;
  //     const contentWidth = pdfWidth - 2 * margin;
  //     const contentHeight = pdfHeight - 2 * margin;

  //     // Add logo
  //     const logoWidth = 90;
  //     const logoHeight = 28.5;
  //     const logoX = (pdfWidth - logoWidth) / 2;
  //     const logoY = margin;

  //     pdf.addImage(Logo.src, "PNG", logoX, logoY, logoWidth, logoHeight);

  //     // Calculate content position and size
  //     const contentY = logoY + logoHeight + 2;
  //     const availableHeight = contentHeight - (contentY - margin);

  //     // Add content
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       margin,
  //       contentY,
  //       contentWidth,
  //       availableHeight,
  //       "",
  //       "FAST",
  //       0,
  //       (contentY - margin) / 2
  //     );

  //     //yellow green line

  //     pdf.setFont("Halvetica");
  //     pdf.setFontSize(20);
  //     pdf.setTextColor(10);
  //     const companyNameY = pdfHeight - 22;
  //     pdf.text("WILLOWOOD CHEMICALS LIMITED", pdfWidth / 2, companyNameY, { align: "center" });

  //     // Add office address below the company name
  //     pdf.setFontSize(8);
  //     const addressY = companyNameY + 5;
  //     pdf.text(
  //       "Corporate Office: 406 - 409, 4th Floor Salcon Aurum, District Centre, Jasola, New Delhi-110025, India",
  //       pdfWidth / 2,
  //       addressY,
  //       { align: "center" }
  //     );

  //     const secondLineY = addressY + 5;
  //     pdf.text(
  //       "Tel.:+91 11 45686868 Email : wcspl@willowood.com, CIN : U74999WB2011PTC166751",
  //       pdfWidth / 2,
  //       secondLineY,
  //       { align: "center" }
  //     );

  //     pdf.setFontSize(8);
  //     const ThirdLineY = secondLineY + 4;
  //     pdf.text(
  //       "Registered Office: Madgul Lounge, 4th Floor Flat-41,23, Chelta Central Road, Kolkata, West Bengal-700027 Tel.: +91 33 24489045/46/47",
  //       pdfWidth / 2,
  //       ThirdLineY,
  //       { align: "center" }
  //     );

  //     // Adding yellow and green lines at bottom....
  //     const stripeHeight = 6;
  //     const tiltAngle = -5;
  //     const yellowWidth = pdfWidth * 0.33;
  //     const greenWidth = pdfWidth * 0.67;
  //     const stripeY = pdfHeight - stripeHeight;

  //     // Draw the yellow stripe....
  //     pdf.setFillColor(255, 204, 0);
  //     pdf.triangle(0, stripeY, yellowWidth, stripeY, 0, stripeY + stripeHeight, "F");
  //     pdf.triangle(yellowWidth, stripeY, yellowWidth, stripeY + stripeHeight, 0, stripeY + stripeHeight, "F");

  //     // Draw the green stripe (67% width) with tilt, starting where the yellow stripe ends
  //     pdf.setFillColor(0, 153, 76);
  //     pdf.triangle(yellowWidth, stripeY, pdfWidth, stripeY, yellowWidth, stripeY + stripeHeight, "F");
  //     pdf.triangle(
  //       pdfWidth,
  //       stripeY,
  //       pdfWidth,
  //       stripeY + stripeHeight,
  //       yellowWidth,
  //       stripeY + stripeHeight,
  //       "F"
  //     );

  //     // Draw tilted transition area...
  //     pdf.setFillColor(255, 204, 0);
  //     pdf.triangle(
  //       yellowWidth,
  //       stripeY,
  //       yellowWidth + tiltAngle,
  //       stripeY + stripeHeight,
  //       yellowWidth,
  //       stripeY + stripeHeight,
  //       "F"
  //     );

  //     pdf.setFillColor(0, 153, 76);
  //     pdf.triangle(
  //       yellowWidth,
  //       stripeY,
  //       yellowWidth + tiltAngle,
  //       stripeY + stripeHeight,
  //       pdfWidth,
  //       stripeY + stripeHeight,
  //       "F"
  //     );

  //     pdf.save("dealer-agreement.pdf");
  //   });
  // };

  const handleDownloadPDF = () => {
    const firstPageContent = document.getElementById("first-page-content");
    const secondPageContent = document.getElementById("second-page-content");

    html2canvas(firstPageContent, { scale: 2 }).then((canvas1) => {
      const imgData1 = canvas1.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Set margins for first page
      const margin = 6;
      const contentWidth = pdfWidth - 2 * margin;
      const contentHeight = pdfHeight - 2 * margin;

      // Add logo to the first page
      const logoWidth = 90;
      const logoHeight = 28.5;
      const logoX = (pdfWidth - logoWidth) / 2;
      const logoY = margin;

      pdf.addImage(Logo.src, "PNG", logoX, logoY, logoWidth, logoHeight);

      // Add first page content
      const contentY = logoY + logoHeight + 2;
      const availableHeight = contentHeight - (contentY - margin);
      pdf.addImage(
        imgData1,
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

      // Add second page
      pdf.addPage();

      html2canvas(secondPageContent, { scale: 2 }).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/png");

        // Add the content for the second page
        pdf.addImage(
          imgData2,
          "PNG",
          margin,
          margin,
          contentWidth,
          availableHeight,
          "",
          "FAST",
          0,
          (contentY - margin) / 2
        );
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
        pdf.triangle(
          yellowWidth,
          stripeY,
          yellowWidth,
          stripeY + stripeHeight,
          0,
          stripeY + stripeHeight,
          "F"
        );

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

        pdf.save("dealer-agreement.pdf");
      });
    });
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

  //handler for prevbutton on rolebased
  const handlePrev = () => {
    if (roleId == 6 || roleId == 3 || roleId == 12) {
      props.formType("Documents");
    } else {
      props.formType("Assessment");
    }
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const dayOfWeek = currentDate.getDay();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[dayOfWeek];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const monthName = monthsOfYear[month - 1];

  console.log(`Today is: ${dayName}, ${monthName} ${date}, ${year}`);
  console.log(`Current Time: ${hours}:${minutes}:${seconds}`);

  console.log("AgreeProps", props);

  return (
    <>
      <section className="outer section">
        <form className="bg-white rounded p-4 w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="flex my-2">
            <div className="w-full px-2 border py-2 rounded-md h-screen overflow-y-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                <small className="text-red-600"></small>
              </label>

              <div className="flex items-center justify-center w-[200mm] h-[600mm] bg-white shadow-lg mx-auto  p-6 flex-col my-">
                <div id="first-page-content" className="font-hale py-2">
                  <h1 className="font-bold text-md underline font-hale flex items-center justify-center w-full py-1.5">
                    {agreement.title}
                  </h1>
                  <h1 className="font-hale flex  font-sem text-xs py-0.5">
                    {agreement.semiTitle}
                    <span className="font-semibold mx-1">{props?.data[0]?.city}</span>
                    <span>
                      {"on this"}
                      <span className="mx-1 font-semibold">{dayName}</span>
                    </span>
                    <span>{"day of"}</span>
                    <span className="mx-1">{monthName}</span>
                    <span className="mx-0.5">
                      {date}th<span className="mx-0.5">{year}</span>
                    </span>
                    <h2 className="font-semibold px-0.5">{props.data.fname}</h2>
                  </h1>
                  <h1 className="font-hale text-xs py-0.5 ">{agreement.paraOne}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwo}<span>{props?.data[0]?.party_Name}</span>
                  <span className="mx-1">{agreement.paraTwoOne}<span>{props?.data[0]?.state}</span></span>
                  </h1>
                  <h1 className="font underline font-bold">{agreement.thirdTitle}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraFour}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraFive}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraSix}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraSeven}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraEight}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraNine}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraEleven}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwelve}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraThirteen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraFourteen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.clause_a}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.clause_b}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.clause_c}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.clause_d}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.clause_e}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraFifteen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraClause14a}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraClause14b}</h1>
                </div>
                {/* this below content should be in second page */}

                <div id="second-page-content">
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraClause14c}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraSixteen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraSeventeen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraEighteen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraNineTeen}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwenty}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwenty}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwentyOne}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwentyTwo}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.para21a}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.para21b}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.para21c}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwentyThree}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwentyFour}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwentyFive}</h1>
                  <h1 className="font-hale text-xs py-0.5">{agreement.paraTwentySix}</h1>

                  <div className="flex items-center justify-between w-full px-4 py-12">
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
                      <h2 className="">{acceptCheck?.isAgreed && <FcCheckmark size={25} />}</h2>
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
                  {/* <br /> */}
                </div>

                <div className="flex items-center justify-center w-1/2 gap-2 flex-wrap my-4">
                  <label className="inline-flex items-center ml-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-orange-500"
                      value={acceptCheck?.isAgreed}
                      checked={acceptCheck?.isAgreed}
                      onChange={(e) => {
                        if (!finalSubBtn) {
                          setAcceptCheck({
                            ...acceptCheck,
                            isAgreed: e.target.checked
                          });
                        }
                      }}
                    />
                    <span className="ml-2 text-gray-700 whitespace-nowrap">Accept the Agreement Policy</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          {router.query.type === "Edit" && (
            <div className="my-6 flex items-center justify-end ">
              <div className="flex items-center justify-center w-full gap-4 py-4">
                <button
                  onClick={handlePrev}
                  className={`text-center rounded-md hover:bg-green-500 ${
                    formActive ? "bg-green-400" : "bg-gray-400"
                  }  text-white py-1 px-4 text-lg`}
                >
                  Prev
                </button>
                {!props?.data?.accept_the_policy && !finalSubBtn && (
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

                {finalSubBtn && (
                  <button
                    // disabled={disableNext}
                    className={`px-2 py-1 my-3 text-lg  ${
                      acceptCheck?.isAgreed ? "bg-green-500" : "bg-orange-500"
                    } text-white whitespace-nowrap rounded-md ${disSubmit && "bg-gray-500"}`}
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default Agreement;
