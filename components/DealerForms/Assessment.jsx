import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const Assessment = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);

  const [assessmentInfo, setAssessmentInfo] = useState({
    party_Name: "",
    general: "",
    prop_rel: "",
    goodwill: "",
    financial: "",
    family_back: "",
    demrit_dist: ""
  });

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (props) {
      setAssessmentInfo({
        party_Name: props?.data?.[0]?.party_Name || "",
        general: props?.data?.[0]?.general || "",
        prop_rel: props?.data?.[0]?.prop_rel || "",
        goodwill: props?.data?.[0]?.goodwill || "",
        financial: props?.data?.[0]?.financial || "",
        family_back: props?.data?.[0]?.family_back || "",
        demrit_dist: props?.data?.[0]?.demrit_dist || ""
      });
    }
  }, [props]);

  const handleGeneralCheckBox = (checkboxId) => {
    setAssessmentInfo({
      ...assessmentInfo,
      general: checkboxId
    });
  };

  const handlePropRelCheckBox = (checkboxId) => {
    setAssessmentInfo({
      ...assessmentInfo,
      prop_rel: checkboxId
    });
  };

  const handleGoodWillCheckBox = (checkboxId) => {
    setAssessmentInfo({
      ...assessmentInfo,
      goodwill: checkboxId
    });
  };

  const handleFinancialCheckBox = (checkboxId) => {
    setAssessmentInfo({
      ...assessmentInfo,
      financial: checkboxId
    });
  };
  const handleFamilBgCheckBox = (checkboxId) => {
    setAssessmentInfo({
      ...assessmentInfo,
      family_back: checkboxId
    });
  };

  const handleDemeritCheckBox = (checkboxId) => {
    setAssessmentInfo({
      ...assessmentInfo,
      demrit_dist: checkboxId
    });
  };

  const handleAssessMent = async () => {
    try {
      const { party_Name, general, prop_rel, goodwill, financial, family_back, demrit_dist } = assessmentInfo;

      if (!general || !prop_rel || !goodwill || !financial || !family_back || !demrit_dist) {
        throw new Error("Assessment review needs to be completed and cannot be left blank");
      }
      const data = {
        party_Name,
        general,
        prop_rel,
        goodwill,
        financial,
        family_back,
        demrit_dist,
        app_status: "Update Assessment"
      };
      const res = await axios.put(
        `${url}/api/update_dealerassessment/${router.query.id}`,
        JSON.stringify(data),
        {
          headers: headers
        }
      );
      const resp = await res.data;
      console.log("Response", resp);
      if (!resp) {
        return;
      }
      toast.success("Assessment Added Successully");
      setTimeout(() => {
        setAssessmentInfo({
          general: "",
          prop_rel: "",
          goodwill: "",
          financial: "",
          family_back: "",
          demrit_dist: ""
        });
        props.formType("Approval");
      }, 2000);
    } catch (error) {
      console.log("hello", error);
      toast.error(error.message);
    }
  };

  //handle Previous Button
  const handlePrevButton = () => {
    props.formType("Security");
  };

  //disbaling next button

  const [disableNext, setDisableNext] = useState(null);
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

  {
    /****************************************************JSX END HERE***********************************************************/
  }

  return (
    <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            value={assessmentInfo?.party_Name}
            placeholder="Party Name"
            disabled
          />
        </div>
      </div>
      <div className="w-full px-2 flex justify-center">
        <label className="block text-gray-700 text-md font-bold mb-2 pt-2">
          <span className="flex gap-1">
            <small className="text-red-600 "></small> Distributor Assessment Report
          </span>
        </label>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (A) General{" "}
            <span className="text-xs  font-thin">(To be Filled by Regional Manager)</span> Review about
            distributor
          </label>

          <div className="flex my-2 mb-2 justify-between lg:flex-row rounded-md p-4 flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fairCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.general === "fair"}
                  onChange={(e) => handleGeneralCheckBox("fair")}
                />
                <label htmlFor="fairCheckbox">Fair</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goodCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.general === "good"}
                  onChange={(e) => handleGeneralCheckBox("good")}
                />
                <label htmlFor="goodCheckbox">Good</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="veryGoodCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.general === "very good"}
                  onChange={(e) => handleGeneralCheckBox("very good")}
                />
                <label htmlFor="veryGoodCheckbox">Very Good</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="excellentCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.general === "excellent"}
                  onChange={() => handleGeneralCheckBox("excellent")}
                />
                <label htmlFor="excellentCheckbox">Excellent</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="outstandingCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.general === "outstanding"}
                  onChange={() => handleGeneralCheckBox("outstanding")}
                />
                <label htmlFor="outstandingCheckbox">Outstanding</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (B) Proprietor Relationship with our Company Staff
          </label>
          <div className="flex my-2 mb-2 justify-between rounded-md p-4 lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2 ">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.prop_rel === "Yes"}
                  onChange={(e) => handlePropRelCheckBox("Yes")}
                />
                <label htmlFor="ownedCheckbox">Yes</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  className="mr-2"
                  disabled={formActive}
                  checked={assessmentInfo.prop_rel === "No"}
                  onChange={(e) => handlePropRelCheckBox("No")}
                />
                <label htmlFor="rentedCheckbox">No</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2 invisible">
              <div className="flex items-center">
                <input type="checkbox" id="rentedCheckbox" className="mr-2" disabled={formActive} />
                <label htmlFor="rentedCheckbox">No</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (C) Goodwill / Reputation Status of Distributor in Market
          </label>
          <div className="flex my-2 mb-2  justify-between rounded-md p-4 lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  checked={assessmentInfo.goodwill === "poor"}
                  onChange={(e) => handleGoodWillCheckBox("poor")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="ownedCheckbox">Poor</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.goodwill === "average"}
                  onChange={(e) => handleGoodWillCheckBox("average")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Average</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.goodwill === "good"}
                  onChange={(e) => handleGoodWillCheckBox("good")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox"> Good</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.goodwill === "excellent"}
                  onChange={(e) => handleGoodWillCheckBox("excellent")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Excellent</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2 invisible">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.goodwill === "outstanding"}
                  onChange={(e) => handleGoodWillCheckBox("outstanding")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Oustanding</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (D) Financial Status of Distributor
          </label>
          <div className="flex my-2 mb-2  justify-between rounded-md p-4 lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  checked={assessmentInfo.financial === "less than 50 L"}
                  onChange={(e) => handleFinancialCheckBox("less than 50 L")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="ownedCheckbox">Less than 50 L</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.financial === "50+ Lac"}
                  onChange={(e) => handleFinancialCheckBox("50+ Lac")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">50 Lac +</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.financial === "1 Cr+"}
                  onChange={(e) => handleFinancialCheckBox("1 Cr+")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox"> 1Cr +</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.financial === "5Cr+"}
                  onChange={(e) => handleFinancialCheckBox("5Cr+")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">5Cr +</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.financial === "10 Cr+"}
                  onChange={(e) => handleFinancialCheckBox("10 Cr+")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">10Cr+</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (E) Family Background Of Distributor
          </label>
          <div className="flex my-2 mb-2  justify-between rounded-md p-4 lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  checked={assessmentInfo?.family_back === "family"}
                  onChange={(e) => handleFamilBgCheckBox("family")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="ownedCheckbox">Family Background</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.family_back === "service"}
                  onChange={(e) => handleFamilBgCheckBox("service")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Service Backround</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.family_back === "business family"}
                  onChange={(e) => handleFamilBgCheckBox("business family")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Business Family Root</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.family_back === "Distrurbed Family"}
                  onChange={(e) => handleFamilBgCheckBox("Distrurbed Family")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Distributed Family</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600"></small> (F) Any Demerit about Distributor
          </label>
          <div className="flex my-2 mb-2  justify-between rounded-md p-4 lg:flex-row flex-col items-center accent-lime-400 border-[0.006rem] lg:py-6 border-gray-400 ">
            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ownedCheckbox"
                  checked={assessmentInfo.demrit_dist === "trader"}
                  onChange={(e) => handleDemeritCheckBox("trader")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="ownedCheckbox">Trader Wholesale Type</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.demrit_dist === "wholesale"}
                  onChange={(e) => handleDemeritCheckBox("wholesale")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Wholesale Only</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.demrit_dist === "retail"}
                  onChange={(e) => handleDemeritCheckBox("retail")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Retail Only</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.demrit_dist === "live credit"}
                  onChange={(e) => handleDemeritCheckBox("live credit")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Live Credit Only</label>
              </div>
            </div>

            <div className="w-full lg:w-auto px-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rentedCheckbox"
                  checked={assessmentInfo.demrit_dist === "sell only"}
                  onChange={(e) => handleDemeritCheckBox("sell only")}
                  className="mr-2"
                  disabled={formActive}
                />
                <label htmlFor="rentedCheckbox">Can sell only service</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
     {props?.data[0]?.app_status !== "Approved By Region"  ? ( <div>
        {(router.query.type === "Edit" || router.query.role == 5) && (
          <div className="my-6 flex items-center justify-end ">
            <div className="flex items-center justify-center py-4 w-full gap-4 ">
              {/* <button
                onClick={handlePrevButton}
                className={`text-center rounded-md hover:bg-green-500 ${
                  formActive ? "bg-green-400" : "bg-gray-400"
                }  text-white py-1 px-4 text-lg`}
              >
                Prev
              </button> */}
              <button
                // onClick={() => props.formType("Approval")}
                // disabled={disableNext}
                onClick={handleAssessMent}
                className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>):null}
    </form>
  );
};

export default Assessment;
