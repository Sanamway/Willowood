import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const Region = (props) => {
  const { uid, user, roleID } = props?.userData;
  // const orderStatus = props?.orderStatus;
  const orderCredit = props?.orderCredit;
  const { sap_order_no, party_code } = props?.hardcodedData;
  const [orderStatus, setOrderStatus] = useState(null);
  const [userDesig, setuserDesig] = useState(null);

  const buttons = [props.btn_1, props.btn_2, props.btn_3];

  const [btnDis, setBtnDis] = useState(false);

  useEffect(() => {
    getApprovalStatus();
  }, [props, btnDis]);

  const [regionForm, setRegionForm] = useState({
    Apwf_r_userid: uid,
    Apwf_r_hod_name: "",
    Apwf_r_desig: "",
    Apwf_r_ap_date: "",
    Apwf_r_recom_date: "",
    Apwf_r_rej_date: "",
    Apwf_r_rerecom_date: "",
    Apwf_r_recom_rem: "",
    Apwf_r_reject_rem: "",
    Apwf_r_re_rec_rem: "",
    Apwf_r_status: "",
    // sap_order_no: "11965555", //hardcoded
    sap_order_no: orderCredit[0]?.sap_order_no, //hardcoded
    party_code: orderCredit[0]?.party_code, //hardcoded
    c_id: "1",
    Apwf_z_reject_rem: "",

  });

  console.log("Region ", userDesig?.phone_details?.r_id_desig);

  useEffect(() => {
    if (!orderStatus || orderStatus.length === 0) return;
    setRegionForm({
      ...regionForm,
      Apwf_r_desig: userDesig?.phone_details?.r_id_desig || "",
      Apwf_r_hod_name: userDesig?.phone_details?.r_hod_name || "",
      Apwf_r_status: orderStatus?.SapaprovalStatus[0]?.Apwf_r_status || "",
      Apwf_r_ap_date: orderStatus?.SapaprovalStatus[0]?.Apwf_r_ap_date || "",
      Apwf_r_recom_date: orderStatus?.SapaprovalStatus[0]?.Apwf_r_recom_date || "",
      Apwf_r_rej_date: orderStatus?.SapaprovalStatus[0]?.Apwf_r_rej_date || "",
      Apwf_r_rerecom_date: orderStatus?.SapaprovalStatus[0]?.Apwf_r_rerecom_date || "",
      Apwf_r_recom_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_r_recom_rem || "",
      Apwf_r_reject_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_r_reject_rem || "",
      Apwf_r_re_rec_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_r_re_rec_rem || "",
      Apwf_z_reject_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_z_reject_rem || ""

    });
  }, [orderStatus]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  // For WhatsApp Message Data

  const whatsAppData = {
    // sendNumber: orderStatus?.phone_details?.z_mobile_no,
    sendNumber: "7277766100",
    nextname: orderStatus?.phone_details?.z_hod_name,
    currentName: orderStatus?.phone_details?.r_hod_name,
    partyName: "Hello Test",
    sapOrderNo: orderCredit[0]?.sap_order_no,
    sapOrderValue: orderCredit[0]?.sap_order_value,
    days_91_180: orderCredit[0]?.days_91_120 + orderCredit[0]?.days_121_150 + orderCredit[0]?.days_151_180,
    days_181_210: orderCredit[0]?.days_181_210,
    days_211_300: orderCredit[0]?.days_211_240 + orderCredit[0]?.days_241_270 + orderCredit[0]?.days_271_300,
    days_300_plus: orderCredit[0]?.days_300_plus
  };


  const handleRecommend = async () => {
    const {
      Apwf_r_userid,
      Apwf_r_desig,
      Apwf_r_ap_date,
      Apwf_r_recom_date,
      Apwf_r_rej_date,
      Apwf_r_rerecom_date,
      Apwf_r_recom_rem,
      Apwf_r_reject_rem,
      Apwf_r_re_rec_rem,
      Apwf_r_status,
      sap_order_no,
      party_code,
      c_id
    } = regionForm;

    const payload = {
      Apwf_r_userid,
      Apwf_r_desig,
      Apwf_r_ap_date: Apwf_r_ap_date ? Apwf_r_ap_date : new Date(),
      Apwf_r_recom_date: Apwf_r_recom_date ? Apwf_r_recom_date : new Date(),
      Apwf_r_rej_date: Apwf_r_rej_date ? Apwf_r_rej_date : new Date(),
      Apwf_r_rerecom_date: Apwf_r_rerecom_date ? Apwf_r_rerecom_date : new Date(),
      Apwf_r_recom_rem,
      Apwf_r_reject_rem,
      Apwf_r_re_rec_rem,
      Apwf_r_status: `${props.btn_1} by RM` ,
      sap_order_no,
      party_code,
      c_id
    };

    console.log("Recopay", payload);
    // return
    if (payload?.Apwf_r_recom_rem === "" || payload?.Apwf_r_recom_date === "") {
      toast.error("Please enter Recommendation Remarks and Date");
      return;
    }

    // return;
    try {
      const res = await axios.post(`${url}/api/order_status_approval?r_update=true`, payload, {
        headers: headers
      });
      const resp = await res.data;
      if (resp.status == true) {
        toast.success(resp.message);
        setBtnDis(true);
        whatsAppMsg(
          whatsAppData?.sendNumber,
          whatsAppData?.nextname,
          whatsAppData?.partyName,
          whatsAppData?.sapOrderNo,
          whatsAppData?.sapOrderValue,
          whatsAppData?.days_91_180,
          whatsAppData?.days_181_210,
          whatsAppData?.days_211_300,
          whatsAppData?.days_300_plus,
          whatsAppData?.currentName
        );
      }
      console.log(resp);
      // setYtdData(resp);
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////// handle Reject //////////////////////////////

  const handlReject = async () => {
    const {
      Apwf_r_userid,
      Apwf_r_desig,
      Apwf_r_ap_date,
      Apwf_r_recom_date,
      Apwf_r_rej_date,
      Apwf_r_rerecom_date,
      Apwf_r_recom_rem,
      Apwf_r_reject_rem,
      Apwf_r_re_rec_rem,
      Apwf_r_status,
      sap_order_no,
      party_code,
      c_id
    } = regionForm;

    const payload = {
      Apwf_r_userid,
      Apwf_r_desig,
      Apwf_r_ap_date: Apwf_r_ap_date ? Apwf_r_ap_date : new Date(),
      Apwf_r_recom_date: Apwf_r_recom_date ? Apwf_r_recom_date : new Date(),
      Apwf_r_rej_date: Apwf_r_rej_date ? Apwf_r_rej_date : new Date(),
      Apwf_r_rerecom_date: Apwf_r_rerecom_date ? Apwf_r_rerecom_date : new Date(),
      Apwf_r_recom_rem,
      Apwf_r_reject_rem,
      Apwf_r_re_rec_rem,
      Apwf_r_status: `${props.btn_2} by RM`,
      sap_order_no,
      party_code,
      c_id
    };

    

    if (payload?.Apwf_r_reject_rem === "" || payload?.Apwf_r_rej_date === "") {
      toast.error("Please enter Rejection Remarks and Date");
      return;
    }

    console.log("Payload", payload);

    // return;
    try {
      const res = await axios.post(`${url}/api/order_status_approval?r_update=true`, payload, {
        headers: headers
      });
      const resp = await res.data;
      if (resp.status == true) {
        toast.success(resp.message);
        setBtnDis(true);
        
      }
      console.log(resp);
      // setYtdData(resp);
    } catch (error) {
      console.log(error);
    }
  };

  //Whatsup Message Sender//

  async function whatsAppMsg(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
    try {
      const payLoad = {
        recipient: String(p1),
        tem_id: "770207",
        placeholders: [p2, p3, p4, p5, p6, p7, p8, p9, p10]
      };
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

  

  const getApprovalStatus = async () => {
    try {
      const res = await axios.get(
        `${url}/api/get_order_approval_status?sap_order_no=${sap_order_no}&party_code=${party_code}&c_id=1`,
        {
          headers: headers
        }
      );
      const resp = await res.data.data;
      setOrderStatus(resp);
      setuserDesig(resp);
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////// Handle Re-Recommend /////////////////////////////////////

  const handleReRecommend = async () => {
    console.log("Re-Recommend button clicked");
    const {
      Apwf_r_userid,
      Apwf_r_desig,
      Apwf_r_ap_date,
      Apwf_r_recom_date,
      Apwf_r_rej_date,
      Apwf_r_rerecom_date,
      Apwf_r_recom_rem,
      Apwf_r_reject_rem,
      Apwf_r_re_rec_rem,
      Apwf_z_status,
      sap_order_no,
      party_code,
      c_id
    } = regionForm;

    const payload = {
      Apwf_r_userid,
      Apwf_r_desig,
      Apwf_r_ap_date: Apwf_r_ap_date ? Apwf_r_ap_date : new Date(),
      Apwf_r_recom_date: Apwf_r_recom_date ? Apwf_r_recom_date : new Date(),
      Apwf_r_rej_date: Apwf_r_rej_date ? Apwf_r_rej_date : new Date(),
      Apwf_r_rerecom_date: Apwf_r_rerecom_date ? Apwf_r_rerecom_date : new Date(),
      Apwf_r_recom_rem:"",
      Apwf_r_reject_rem:"",
      Apwf_r_re_rec_rem,
      Apwf_r_status: `${props.btn_3} by RM`,
      sap_order_no,
      party_code,
      c_id,
      Apwf_r_reject_rem: Apwf_r_reject_rem,
      // Apwf_r_reject_rem: "",
      Apwf_r_rej_date: Apwf_r_rej_date ? Apwf_r_rej_date : new Date(),
      Apwf_z_status: "",
      Apwf_z_recom_rem: ""


    };

    if (payload?.Apwf_r_re_rec_rem === "" || payload?.Apwf_r_rerecom_date === "") {
      toast.error("Please enter Re-Recommend Remarks and Date");
      return;
    }

    console.log("rform", payload)

    // return
    try {
      const res = await axios.post(`${url}/api/order_status_approval?z_update=true&r_update=true`, payload, {
        headers: headers
      });
      const resp = await res.data;
      if (resp.status == true) {
        toast.success(resp.message);
        setBtnDis(true);
        whatsAppMsg(
          whatsAppData?.sendNumber,
          whatsAppData?.nextname,
          whatsAppData?.partyName,
          whatsAppData?.sapOrderNo,
          whatsAppData?.sapOrderValue,
          whatsAppData?.days_91_180,
          whatsAppData?.days_181_210,
          whatsAppData?.days_211_300,
          whatsAppData?.days_300_plus,
          whatsAppData?.currentName
        );
      }
      // setYtdData(resp);
    } catch (error) {
      console.log(error);
    }



  };

  ///Buttons/////////////////////

  const handlers = {
    [props.btn_1]: handleRecommend,
    // [props.btn_2]: handleReject,
    [props.btn_3]: handleReRecommend
  };

  return (
    <>
      <div className="mb-4 w-full ">
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 500
          }}
        />
        <div className="space-y-">
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium">Regional Manager</div>
                <div className="text-sm">{regionForm?.Apwf_r_hod_name}</div>
              </div>
              <div>
                <div className="text-xs font-medium">Designation</div>
                <div className="text-sm">{regionForm?.Apwf_r_desig}</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-xs font-medium">Approve Date</div>
                <DatePicker
                  className="w-full px-3 py-2 border- border-gray- bg-slate-50  focus:outline-none focus:border-b focus:border-indigo-500"
                  selected={new Date(regionForm?.Apwf_r_ap_date ? regionForm?.Apwf_r_ap_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_ap_date: moment(date).format("LL")
                    });
                  }}
                  onChangeRaw={(e) => {
                    e.preventDefault();
                  }}
                  minDate={new Date()} 
                  maxDate={new Date()}
                />
              </div>
              {/* <div>
                <div className="text-xs font-medium">Not Approved Yet</div>
                <div className="text-sm">{"Mandatory"}</div>
              </div> */}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium">Recommend Date</div>
                <DatePicker
                  className="w-full px-3 py-2 border- border-gray- bg-slate-50  focus:outline-none focus:border-b focus:border-indigo-500"
                  selected={
                    new Date(regionForm?.Apwf_r_recom_date ? regionForm?.Apwf_r_recom_date : new Date())
                  }
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_recom_date: moment(date).format("LL")
                    });
                  }}
                  onChangeRaw={(e) => {
                    e.preventDefault();
                  }}
                  minDate={new Date()} 
                  maxDate={new Date()}
                />
              </div>
              <div>
                <div className="text-xs font-medium">Recommend Remarks</div>
                <input
                  className="text bg-slate-50 px-1"
                  type="text"
                  value={regionForm.Apwf_r_recom_rem}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_recom_rem: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium">Reject Date</div>
                <DatePicker
                  className="w-full px-3 py-2 border- border-gray- bg-slate-50  focus:outline-none focus:border-b focus:border-indigo-500"
                  selected={new Date(regionForm?.Apwf_r_rej_date ? regionForm?.Apwf_r_rej_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_rej_date: moment(date).format("LL")
                    });
                  }}
                  onChangeRaw={(e) => {
                    e.preventDefault();
                  }}
                  minDate={new Date()} 
                  maxDate={new Date()}
                />
              </div>
              <div>
                <div className="text-xs font-medium">Rejection Remarks</div>
                <input
                  className="text bg-slate-50"
                  type="text"
                  value={regionForm.Apwf_r_reject_rem}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_reject_rem: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium">Re-Recommend Date</div>
                <DatePicker
                  className="w-full px-3 py-2 border- border-gray- bg-slate-50  focus:outline-none focus:border-b focus:border-indigo-500"
                  selected={
                    new Date(regionForm?.Apwf_r_rerecom_date ? regionForm?.Apwf_r_rerecom_date : new Date())
                  }
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_rerecom_date: moment(date).format("LL")
                    });
                  }}
                  onChangeRaw={(e) => {
                    e.preventDefault();
                  }}
                  minDate={new Date()} 
                  maxDate={new Date()}
                />
              </div>
              <div>
                <div className="text-xs font-medium">Re-Recommend Remarks</div>
                <input
                  className="text bg-slate-50"
                  type="text"
                  value={regionForm.Apwf_r_re_rec_rem}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_re_rec_rem: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium">Region Status</div>
                <input
                  className="text bg-slate-50"
                  type="text"
                  value={regionForm.Apwf_r_status}
                  onChange={(e) => {
                    setRegionForm({
                      ...regionForm,
                      Apwf_r_status: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* buttons  */}
        {roleID == 5 && (
          // <div className="flex items-center justify-center w-full gap-4 py-4">
          //   <button
          //     disabled={
          //       btnDis ||
          //       regionForm?.Apwf_r_status == `${props.btn_1} by RM` ||
          //       regionForm?.Apwf_r_status == `${props.btn_2} by RM`
          //     }
          //     className={`text-center rounded-md ${
          //       regionForm?.Apwf_r_status == `${props.btn_2} by RM` || regionForm?.Apwf_r_status == `${props.btn_1} by RM`
          //         ? "bg-gray-500"
          //         : "bg-green-500"
          //     } text-white py-1 px-4 text-lg`}
          //     onClick={() => {
          //       handleRecommend();
          //     }}
          //   >
          //     {props.btn_1}
          //   </button>

          //   <button
          //     // disabled={
          //     //   btnDis ||
          //     //   regionForm?.Apwf_r_status == "Reject Order by RM" ||
          //     //   regionForm?.Apwf_r_status == "Approve"
          //     // }
          //     disabled
          //     // className={`text-center rounded-md ${
          //     //   regionForm?.Apwf_r_status == "Reject Order by RM" || regionForm?.Apwf_r_status == "Approve"
          //     //     ? "bg-gray-500"
          //     //     : "bg-green-500"
          //     // } text-white py-1 px-4 text-lg`}

          //     className={`text-center rounded-md bg-gray-500 text-white py-1 px-4 text-lg`}
          //     onClick={() => handlReject()}
          //   >
          //     {props.btn_2}
          //   </button>
          // </div>


          <div className="flex items-center justify-center w-full gap-4 py-4">
          {buttons.map((btnName, index) => {
            const isInitial = regionForm?.Apwf_z_reject_rem == "";

            if (isInitial && btnName !== props.btn_1 ) return null;

            let isDisabled = btnDis;

            if (btnName === props?.btn_1) {
              isDisabled =
              regionForm?.Apwf_r_status === `${props.btn_1} by RM` ||
              regionForm?.Apwf_r_status === `${props.btn_2} by RM`;
            }

            if (btnName === props?.btn_3) {
              isDisabled =
              regionForm?.Apwf_z_reject_rem === "" || regionForm?.Apwf_r_status == `${props.btn_3} by RM`;
            }

            const isHidden = !isInitial && (btnName === props.btn_1 || btnName === props.btn_2);

            const isAnyButtonClicked = buttons.some((btn) => regionForm?.Apwf_r_status === `${btn} by RM`);
            const buttonColorClass = isDisabled ? "bg-gray-500" : "bg-green-500";

            if (isHidden) return null;

            return (
              <button
                key={index}
                disabled={isDisabled}
                className={`text-center rounded-md ${buttonColorClass} text-white py-1 px-4 text-lg`}
                onClick={() => {
                  const handler = handlers[btnName];
                  if (typeof handler === "function") {
                    handler();
                  } else {
                    console.error(`Handler for ${btnName} not found`);
                  }
                }}
              >
                {btnName}
              </button>
            );
          })}
        </div>
        )}
      </div>
    </>
  );
};

export default Region;
