import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const B2C = (props) => {
  const { uid, user, roleID } = props?.userData;
  // const orderStatus = props?.orderStatus;
  const { cpolicy } = props;
  const orderCredit = props?.orderCredit;
  const [orderStatus, setOrderStatus] = useState([]);
  const { sap_order_no, party_code } = props?.hardcodedData;

  const [userDesig, setuserDesig] = useState(null);

  const [btnDis, setBtnDis] = useState(false);

  const buttons = [props.btn_1, props.btn_2, props.btn_3];


  console.log("CPOLICY", cpolicy);

  useEffect(() => {
    getApprovalStatus();
  }, [props, btnDis]);

  const [bgForm, setbgForm] = useState({
    Apwf_bg_userid: uid,
    Apwf_bg_desig: "",
    Apwf_bg_ap_date: "",
    Apwf_bg_recom_date: "",
    Apwf_bg_rej_date: "",
    Apwf_bg_rerecom_date: "",
    Apwf_bg_recom_rem: "",
    Apwf_bg_reject_rem: "",
    Apwf_bg_re_rec_rem: "",
    Apwf_bg_status: "",

    // sap_order_no: "11965555", //hardcoded
    // party_code: "111837", //hardcoded
    sap_order_no: orderCredit[0]?.sap_order_no, //hardcoded
    party_code: orderCredit[0]?.party_code,
    c_id: "1",
    Apwf_ch_reject_rem:""
  });

  useEffect(() => {
    if (!orderStatus || orderStatus.length === 0) return;
    setbgForm({
      ...bgForm,
      Apwf_bg_desig: userDesig?.phone_details?.bg_id_desig || "",
      Apwf_bg_hod_name: userDesig?.phone_details?.bg_hod_name || "",
      Apwf_bg_status: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_status || "",
      Apwf_bg_ap_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_ap_date || "",
      Apwf_bg_recom_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_recom_date || "",
      Apwf_bg_rej_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_rej_date || "",
      Apwf_bg_rerecom_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_rerecom_date || "",
      Apwf_bg_recom_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_recom_rem || "",
      Apwf_bg_reject_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_reject_rem || "",
      Apwf_bg_re_rec_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_bg_re_rec_rem || ""
    });
  }, [orderStatus]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //For WhatsApp Message Data Prev Level

  function whatAppCpolicy() {
    switch (cpolicy) {
      case 1:
        return {
          sendNumber: "7277766100",
          nextname: orderStatus?.phone_details?.z_hod_name,
          currentName: orderStatus?.phone_details?.bg_hod_name
        };
      case 2:
        return {
          sendNumber: "7277766100",
          nextname: orderStatus?.phone_details?.ch_hod_name,
          currentName: orderStatus?.phone_details?.bg_hod_name
        };
      case 3:
        return {
          sendNumber: "7277766100",
          nextname: null,
          currentName: null
        };
      case 4:
        return {
          sendNumber: "7277766100",
          nextname: null,
          currentName: null
        };
      case 5:
        return {
          sendNumber: "7277766100",
          nextname: orderStatus?.phone_details?.ch_hod_name,
          currentName: orderStatus?.phone_details?.bg_hod_name
        };
      default:
        return null;
    }
  }

  const whatsAppData = {
    // sendNumber: orderStatus?.phone_details?.bu_mobile_no,
    // sendNumber: "7277766100",
    // nextname: orderStatus?.phone_details?.ch_hod_name,
    // currentName: orderStatus?.phone_details?.bg_hod_name,
    ...whatAppCpolicy(),
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
      Apwf_bg_userid,
      Apwf_bg_desig,
      Apwf_bg_ap_date,
      Apwf_bg_recom_date,
      Apwf_bg_rej_date,
      Apwf_bg_rerecom_date,
      Apwf_bg_recom_rem,
      Apwf_bg_reject_rem,
      Apwf_bg_re_rec_rem,
      Apwf_bg_status,
      sap_order_no,
      party_code,
      c_id
    } = bgForm;

    const payload = {
      Apwf_bg_userid,
      Apwf_bg_desig,
      Apwf_bg_ap_date: Apwf_bg_ap_date ? Apwf_bg_ap_date : new Date(),
      Apwf_bg_recom_date: Apwf_bg_recom_date ? Apwf_bg_recom_date : new Date(),
      Apwf_bg_rej_date: Apwf_bg_rej_date ? Apwf_bg_rej_date : new Date(),
      Apwf_bg_rerecom_date: Apwf_bg_rerecom_date ? Apwf_bg_rerecom_date : new Date(),
      Apwf_bg_recom_rem,
      Apwf_bg_reject_rem,
      Apwf_bg_re_rec_rem,
      Apwf_bg_status: `${props.btn_1} by BG`,
      sap_order_no,
      party_code,
      c_id
    };

    console.log("Recopay", payload);
    if (payload?.Apwf_bg_recom_rem === "" || payload?.Apwf_bg_recom_date === "") {
      toast.error("Please enter Recommendation Remarks and Date");
      return;
    }

    // whatsAppMsg(
    //   whatsAppData?.sendNumber,
    //   whatsAppData?.nextname,
    //   whatsAppData?.partyName,
    //   whatsAppData?.sapOrderNo,
    //   whatsAppData?.sapOrderValue,
    //   whatsAppData?.days_91_210,
    //   whatsAppData?.days_151_180,
    //   whatsAppData?.days_181_210,
    //   whatsAppData?.days_271_300,
    //   whatsAppData?.days_300_plus,
    //   whatsAppData?.currentName,

    // );

    console.log("B2C", payload);

    // return;
    try {
      const res = await axios.post(`${url}/api/order_status_approval?bg_update=true`, payload, {
        headers: headers
      });
      const resp = await res.data;
      console.log(resp);
      if (resp.status == true) {
        toast.success(resp.message);
        setBtnDis(true);
        // whatsAppMsg(
        //   whatsAppData?.sendNumber,
        //   whatsAppData?.nextname,
        //   whatsAppData?.partyName,
        //   whatsAppData?.sapOrderNo,
        //   whatsAppData?.sapOrderValue,
        //   whatsAppData?.days_91_210,
        //   whatsAppData?.days_151_180,
        //   whatsAppData?.days_181_210,
        //   whatsAppData?.days_271_300,
        //   whatsAppData?.days_300_plus,
        //   whatsAppData?.currentName,

        // );
      }
      // setYtdData(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    const {
      Apwf_bg_userid,
      Apwf_bg_desig,
      Apwf_bg_ap_date,
      Apwf_bg_recom_date,
      Apwf_bg_rej_date,
      Apwf_bg_rerecom_date,
      Apwf_bg_recom_rem,
      Apwf_bg_reject_rem,
      Apwf_bg_re_rec_rem,
      Apwf_bg_status,
      sap_order_no,
      party_code,
      c_id
    } = bgForm;

    const payload = {
      Apwf_bg_userid,
      Apwf_bg_desig,
      Apwf_bg_ap_date: Apwf_bg_ap_date ? Apwf_bg_ap_date : new Date(),
      Apwf_bg_recom_date: Apwf_bg_recom_date ? Apwf_bg_recom_date : new Date(),
      Apwf_bg_rej_date: Apwf_bg_rej_date ? Apwf_bg_rej_date : new Date(),
      Apwf_bg_rerecom_date: Apwf_bg_rerecom_date ? Apwf_bg_rerecom_date : new Date(),
      Apwf_bg_recom_rem,
      Apwf_bg_reject_rem,
      Apwf_bg_re_rec_rem,
      Apwf_bg_status: `${props.btn_2} by BG`,
      sap_order_no,
      party_code,
      c_id,
      Apwf_ch_reject_rem: Apwf_bg_reject_rem,
      Apwf_ch_rej_date: Apwf_bg_rej_date ? Apwf_bg_rej_date : new Date(),

      Apwf_z_reject_rem: cpolicy ==1 ? Apwf_bg_reject_rem : "",
      Apwf_z_rej_date: cpolicy ==1 ? Apwf_bg_rej_date ? Apwf_bg_rej_date : new Date() : "",
      Apwf_ch_status:""
    };

    console.log("B2C", payload)
    // return

    if (payload?.Apwf_bg_reject_rem === "" || payload?.Apwf_bg_rej_date === "") {
      toast.error("Please enter Rejection Remarks and Date");
      return;
    }

    // whatsAppMsg(
    //   whatsAppData?.sendNumber,
    //   whatsAppData?.nextname,
    //   whatsAppData?.partyName,
    //   whatsAppData?.sapOrderNo,
    //   whatsAppData?.sapOrderValue,
    //   whatsAppData?.days_91_180,
    //   whatsAppData?.days_181_210,
    //   whatsAppData?.days_211_300,
    //   whatsAppData?.days_300_plus,
    //   whatsAppData?.currentName
    // );

    console.log("B2C", payload);
     let endpoints = cpolicy ==1 ? `&z_update=true`:""
    //  return
    try {
      const res = await axios.post(`${url}/api/order_status_approval?bg_update=true${endpoints}`, payload, {
        headers: headers
      });
      const resp = await res.data;
      console.log(resp);
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
      setOrderStatus(resp || []);
      setuserDesig(resp);
    } catch (error) {
      console.log(error);
    }
  };

///////////////////////////// Handle Re Re-commend ///////////////////////////////
const handleReRecommend = async () => {
  console.log("Re-Recommend button clicked");
  const {
    Apwf_bg_userid,
    Apwf_bg_desig,
    Apwf_bg_ap_date,
    Apwf_bg_recom_date,
    Apwf_bg_rej_date,
    Apwf_bg_rerecom_date,
    Apwf_bg_recom_rem,
    Apwf_bg_reject_rem,
    Apwf_bg_re_rec_rem,
    Apwf_bg_status,
    sap_order_no,
    party_code,
    c_id
  } = buFormForm;

  const payload = {
    Apwf_bg_userid,
    Apwf_bg_desig,
    Apwf_bg_ap_date: Apwf_bg_ap_date ? Apwf_bg_ap_date : new Date(),
    Apwf_bg_recom_date: Apwf_bg_recom_date ? Apwf_bg_recom_date : new Date(),
    Apwf_bg_rej_date: Apwf_bg_rej_date ? Apwf_bg_rej_date : new Date(),
    Apwf_bg_rerecom_date: Apwf_bg_rerecom_date ? Apwf_bg_rerecom_date : new Date(),
    Apwf_bg_recom_rem,
    Apwf_bg_reject_rem,
    Apwf_bg_re_rec_rem,
    Apwf_bg_status: `${props.btn_3} by BG`,
    sap_order_no,
    party_code,
    c_id,
    Apwf_ch_reject_rem: Apwf_bg_reject_rem,
    Apwf_ch_rej_date: Apwf_bg_rej_date ? Apwf_bg_rej_date : new Date(),
    Apwf_ch_status: "",
    Apwf_ch_recom_rem: ""
  };

  console.log("bgform", payload)

  if (payload?.Apwf_bg_re_rec_rem === "" || payload?.Apwf_bg_rerecom_date === "") {
    toast.error("Please enter Re-Recommend Remarks and Date");
    return;
  }

  // return
  try {
    const res = await axios.post(`${url}/api/order_status_approval?bu_update=true&z_update=true`, payload, {
      headers: headers
    });
    const resp = await res.data;
    if (resp.status == true) {
      toast.success(resp.message);
      setBtnDis(true);
      // whatsAppMsg(
      //   whatsAppDataR?.sendNumber,
      //   whatsAppDataR?.nextname,
      //   whatsAppDataR?.partyName,
      //   whatsAppDataR?.sapOrderNo,
      //   whatsAppDataR?.sapOrderValue,
      //   whatsAppDataR?.days_91_180,
      //   whatsAppDataR?.days_181_210,
      //   whatsAppDataR?.days_211_300,
      //   whatsAppDataR?.days_300_plus,
      //   whatsAppDataR?.currentName
      // );
    }
    // setYtdData(resp);
  } catch (error) {
    console.log(error);
  }

};

  const handlers = {
    [props.btn_1]: handleRecommend,
    [props.btn_2]: handleReject,
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
                <div className="text-xs font-medium">B2C Manager</div>
                <div className="text-sm">{bgForm?.Apwf_bg_hod_name}</div>
              </div>
              <div>
                <div className="text-xs font-medium">Designation</div>
                <div className="text-sm">{bgForm?.Apwf_bg_desig}</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-xs font-medium">Approve Date</div>
                <DatePicker
                  className="w-full px-3 py-2 border- border-gray- bg-slate-50  focus:outline-none focus:border-b focus:border-indigo-500"
                  selected={new Date(bgForm?.Apwf_bg_ap_date ? bgForm?.Apwf_bg_ap_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_ap_date: moment(date).format("LL")
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
                  selected={new Date(bgForm?.Apwf_bg_recom_date ? bgForm?.Apwf_bg_recom_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_recom_date: moment(date).format("LL")
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
                  value={bgForm.Apwf_bg_recom_rem}
                  onChange={(e) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_recom_rem: e.target.value
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
                  selected={new Date(bgForm?.Apwf_bg_rej_date ? bgForm?.Apwf_bg_rej_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_rej_date: moment(date).format("LL")
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
                  value={bgForm.Apwf_bg_reject_rem}
                  onChange={(e) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_reject_rem: e.target.value
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
                    new Date(bgForm?.Apwf_bg_rerecom_date ? bgForm?.Apwf_bg_rerecom_date : new Date())
                  }
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_rerecom_date: moment(date).format("LL")
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
                  value={bgForm.Apwf_bg_re_rec_rem}
                  onChange={(e) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_re_rec_rem: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium"> B2C Status</div>
                <input
                  className="text bg-slate-50"
                  type="text"
                  value={bgForm.Apwf_bg_status}
                  onChange={(e) => {
                    setbgForm({
                      ...bgForm,
                      Apwf_bg_status: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* buttons  */}
        {/* {(roleID == 10 && orderStatus[0]?.Apwf_bg_status !== "Approved" ) && ( */}
        {/* {roleID == 10 && (
          <div className="flex items-center justify-center w-full gap-4 py-4">
            <button
              disabled={btnDis || bgForm?.Apwf_bg_status == `${props.btn_1} by BG` || bgForm?.Apwf_bg_status == `${props.btn_2} by BG`}
              className={`text-center rounded-md ${
                (bgForm?.Apwf_bg_status == `${props.btn_1} by BG` || bgForm?.Apwf_bg_status == `${props.btn_2} by BG`) ? "bg-gray-500" : "bg-green-500"
              } text-white py-1 px-4 text-lg`}
              onClick={() => {
                handleRecommend();
              }}
            >
              {props.btn_1}
            </button>

            <button
              disabled={btnDis || bgForm?.Apwf_bg_status == `${props.btn_2} by BG`}
              className={`text-center rounded-md ${
                (bgForm?.Apwf_bg_status == `${props.btn_2} by BG` || bgForm?.Apwf_bg_status == `${props.btn_1} by BG`) ? "bg-gray-500" : "bg-green-500"
              } text-white py-1 px-4 text-lg`}
              onClick={() => {
                handleReject();
              }}
            >
              {props.btn_2}
            </button>
          </div>
        )} */}

        {/* Testing Buttons  */}

        {roleID == 10 && (
         <div className="flex items-center justify-center w-full gap-4 py-4">
         {buttons.map((btnName, index) => {
           const isInitial = bgForm?.Apwf_ch_reject_rem == "";

           if (isInitial && btnName !== props.btn_1 && btnName !== props.btn_2) return null;

           
           let isDisabled = btnDis;

           if (btnName === props?.btn_1 || btnName === props?.btn_2) {
             isDisabled =
             bgForm?.Apwf_bg_status === `${props.btn_1} by BG` ||
             bgForm?.Apwf_bg_status === `${props.btn_2} by BG`;
           }

           if (btnName === props?.btn_3) {
             isDisabled =
             bgForm?.Apwf_bg_reject_rem === "" || bgForm?.Apwf_bg_status == `${props.btn_3} by BG`;
           }

           const isHidden = !isInitial && (btnName === props.btn_1 || btnName === props.btn_2);

           const isAnyButtonClicked = buttons.some((btn) => bgForm?.Apwf_bg_status === `${btn} by BG`);
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

export default B2C;
