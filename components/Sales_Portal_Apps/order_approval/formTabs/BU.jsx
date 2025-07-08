import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const BU = (props) => {
  const { uid, user, roleID } = props?.userData;
  // const orderStatus = props?.orderStatus;
  const { cpolicy } = props;

  const orderCredit = props?.orderCredit;
  const [orderStatus, setOrderStatus] = useState([]);
  const { sap_order_no, party_code } = props?.hardcodedData;
  const [userDesig, setuserDesig] = useState(null);

  const buttons = [props.btn_1, props.btn_2, props.btn_3];


  const [btnDis, setBtnDis] = useState(false);

  useEffect(() => {
    getApprovalStatus();
  }, [props, btnDis]);

  console.log("props", orderCredit[0]?.sap_order_no);

  const [buForm, setbuForm] = useState({
    Apwf_bu_userid: uid,
    Apwf_bu_desig: "",
    Apwf_bu_ap_date: "",
    Apwf_bu_recom_date: "",
    Apwf_bu_rej_date: "",
    Apwf_bu_rerecom_date: "",
    Apwf_bu_recom_rem: "",
    Apwf_bu_reject_rem: "",
    Apwf_bu_re_rec_rem: "",
    Apwf_bu_status: "",
    // sap_order_no: "11965555", //hardcoded
    // party_code: "111837", //hardcoded
    sap_order_no: orderCredit[0]?.sap_order_no, //hardcoded
    party_code: orderCredit[0]?.party_code,
    c_id: "1",
    Apwf_ch_reject_rem: ""

  });

  useEffect(() => {
    if (!orderStatus || orderStatus.length === 0) return;
    setbuForm({
      ...buForm,
      Apwf_bu_desig: userDesig?.phone_details?.bu_id_desig || "",
      Apwf_bu_hod_name: userDesig?.phone_details?.bu_hod_name || "",
      Apwf_bu_status: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_status || "",
      Apwf_bu_ap_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_ap_date || "",
      Apwf_bu_recom_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_recom_date || "",
      Apwf_bu_rej_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_rej_date || "",
      Apwf_bu_rerecom_date: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_rerecom_date || "",
      Apwf_bu_recom_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_recom_rem || "",
      Apwf_bu_reject_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_reject_rem || "",
      Apwf_bu_re_rec_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_bu_re_rec_rem || "",
      Apwf_ch_reject_rem: orderStatus?.SapaprovalStatus[0]?.Apwf_ch_reject_rem || ""

    });
  }, [orderStatus]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //For WhatsApp Message Data


  function whatAppCpolicy() {
    switch (cpolicy) {
      case 1:
        return {
          sendNumber: "7277766100",
          nextname: null,
          currentName: null
        };
      case 2:
        return {
          sendNumber: "7277766100",
          nextname: orderStatus?.phone_details?.ch_hod_name,
          currentName: orderStatus?.phone_details?.bu_hod_name
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
          currentName: orderStatus?.phone_details?.z_hod_name
        };
      default:
        return null;
    }
  }

  const whatsAppData = {
    // sendNumber: orderStatus?.phone_details?.bu_mobile_no,
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
      Apwf_bu_userid,
      Apwf_bu_desig,
      Apwf_bu_ap_date,
      Apwf_bu_recom_date,
      Apwf_bu_rej_date,
      Apwf_bu_rerecom_date,
      Apwf_bu_recom_rem,
      Apwf_bu_reject_rem,
      Apwf_bu_re_rec_rem,
      Apwf_bu_status,
      sap_order_no,
      party_code,
      c_id
    } = buForm;

    const payload = {
      Apwf_bu_userid,
      Apwf_bu_desig,
      Apwf_bu_ap_date: Apwf_bu_ap_date ? Apwf_bu_ap_date : new Date(),
      Apwf_bu_recom_date: Apwf_bu_recom_date ? Apwf_bu_recom_date : new Date(),
      Apwf_bu_rej_date: Apwf_bu_rej_date ? Apwf_bu_rej_date : new Date(),
      Apwf_bu_rerecom_date: Apwf_bu_rerecom_date ? Apwf_bu_rerecom_date : new Date(),
      Apwf_bu_recom_rem,
      Apwf_bu_reject_rem,
      Apwf_bu_re_rec_rem,
      Apwf_bu_status: `${props.btn_1} by BU`,
      sap_order_no,
      party_code,
      c_id,
      
      
    };

    console.log("Recopay", payload);
    if (payload?.Apwf_bu_recom_rem === "" || payload?.Apwf_bu_recom_date === "") {
      toast.error("Please enter Recommendation Remarks and Date");
      return;
    }

    

    // return;
    try {
      const res = await axios.post(`${url}/api/order_status_approval?bu_update=true`, payload, {
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

  ///////////////////////////////////// Handle Reject ////////////////////////////////


  function whatAppCpolicyR() {
    switch (cpolicy) {
      case 1:
        return {
          sendNumber: "7277766100",
          nextname: null,
          currentName: null
        };
      case 2:
        return {
          sendNumber: "7277766100",
          nextname: orderStatus?.phone_details?.z_hod_name,
          currentName: orderStatus?.phone_details?.bu_hod_name
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
          nextname: orderStatus?.phone_details?.z_hod_name,
          currentName: orderStatus?.phone_details?.bu_hod_name
        };
      case 5:
        return {
          sendNumber: "7277766100",
          nextname: orderStatus?.phone_details?.z_hod_name,
          currentName: orderStatus?.phone_details?.bu_hod_name
        };
      default:
        return null;
    }
  }

  const whatsAppDataR = {
    // sendNumber: orderStatus?.phone_details?.bu_mobile_no,
    ...whatAppCpolicyR(),
    partyName: "Hello Test",
    sapOrderNo: orderCredit[0]?.sap_order_no,
    sapOrderValue: orderCredit[0]?.sap_order_value,
    days_91_180: (orderCredit[0]?.days_91_120 +  orderCredit[0]?.days_121_150  + orderCredit[0]?.days_151_180 ) ,
    days_181_210: orderCredit[0]?.days_181_210,
    days_211_300: (orderCredit[0]?.days_211_240 +  orderCredit[0]?.days_241_270 + orderCredit[0]?.days_271_300),
    days_300_plus: orderCredit[0]?.days_300_plus
  };

  const handleReject = async () => {
    const {
      Apwf_bu_userid,
      Apwf_bu_desig,
      Apwf_bu_ap_date,
      Apwf_bu_recom_date,
      Apwf_bu_rej_date,
      Apwf_bu_rerecom_date,
      Apwf_bu_recom_rem,
      Apwf_bu_reject_rem,
      Apwf_bu_re_rec_rem,
      Apwf_bu_status,
      sap_order_no,
      party_code,
      c_id
    } = buForm;

    const payload = {
      Apwf_bu_userid,
      Apwf_bu_desig,
      Apwf_bu_ap_date: Apwf_bu_ap_date ? Apwf_bu_ap_date : new Date(),
      Apwf_bu_recom_date: Apwf_bu_recom_date ? Apwf_bu_recom_date : new Date(),
      Apwf_bu_rej_date: Apwf_bu_rej_date ? Apwf_bu_rej_date : new Date(),
      Apwf_bu_rerecom_date: Apwf_bu_rerecom_date ? Apwf_bu_rerecom_date : new Date(),
      Apwf_bu_recom_rem,
      Apwf_bu_reject_rem,
      Apwf_bu_re_rec_rem,
      Apwf_bu_status: `${props.btn_2} by BU`,
      sap_order_no,
      party_code,
      c_id,
      Apwf_z_reject_rem: Apwf_bu_reject_rem,
      Apwf_z_rej_date: Apwf_bu_rej_date ? Apwf_bu_rej_date : new Date(),
      Apwf_z_status: ""

    };

    console.log("BUPAY",payload)

    // return


    if (payload?.Apwf_bu_reject_rem === "" || payload?.Apwf_bu_rej_date === "") {
      toast.error("Please enter Rejection Remarks and Date");
      return;
    }

    whatsAppMsg(
      whatsAppDataR?.sendNumber,
      whatsAppDataR?.nextname,
      whatsAppDataR?.partyName,
      whatsAppDataR?.sapOrderNo,
      whatsAppDataR?.sapOrderValue,
      whatsAppData?.days_91_180,
      whatsAppData?.days_181_210,
      whatsAppData?.days_211_300,
      whatsAppData?.days_300_plus,
      whatsAppDataR?.currentName
    );

    console.log("reject", payload);

    // return;
    try {
      const res = await axios.post(`${url}/api/order_status_approval?bu_update=true&z_update=true`, payload, {
        headers: headers
      });
      const resp = await res.data;
      console.log(resp);
      if (resp.status == true) {
        toast.success(resp.message);
        setBtnDis(true);
        whatsAppMsg(
          whatsAppDataR?.sendNumber,
          whatsAppDataR?.nextname,
          whatsAppDataR?.partyName,
          whatsAppDataR?.sapOrderNo,
          whatsAppDataR?.sapOrderValue,
          whatsAppData?.days_91_180,
          whatsAppData?.days_181_210,
          whatsAppData?.days_211_300,
          whatsAppData?.days_300_plus,
          whatsAppDataR?.currentName
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

  ////////////////////Handle Re Re-commend /////////////////////////////////////////

  const handleReRecommend = async () => {
    console.log("Re-Recommend button clicked");
    const {
      Apwf_bu_userid,
      Apwf_bu_desig,
      Apwf_bu_ap_date,
      Apwf_bu_recom_date,
      Apwf_bu_rej_date,
      Apwf_bu_rerecom_date,
      Apwf_bu_recom_rem,
      Apwf_bu_reject_rem,
      Apwf_bu_re_rec_rem,
      Apwf_bu_status,
      sap_order_no,
      party_code,
      c_id
    } = buForm;

    const payload = {
      Apwf_bu_userid,
      Apwf_bu_desig,
      Apwf_bu_ap_date: Apwf_bu_ap_date ? Apwf_bu_ap_date : new Date(),
      Apwf_bu_recom_date: Apwf_bu_recom_date ? Apwf_bu_recom_date : new Date(),
      Apwf_bu_rej_date: Apwf_bu_rej_date ? Apwf_bu_rej_date : new Date(),
      Apwf_bu_rerecom_date: Apwf_bu_rerecom_date ? Apwf_bu_rerecom_date : new Date(),
      Apwf_bu_recom_rem,
      Apwf_bu_reject_rem,
      Apwf_bu_re_rec_rem,
      Apwf_bu_status: `${props.btn_3} by BU`,
      sap_order_no,
      party_code,
      c_id,
      Apwf_z_reject_rem: Apwf_bu_reject_rem,
      Apwf_z_rej_date: Apwf_bu_rej_date ? Apwf_bu_rej_date : new Date(),
      Apwf_ch_status: "",
      Apwf_ch_recom_rem: ""
    };

    console.log("BUREFOrm", payload)

    if (payload?.Apwf_bu_re_rec_rem === "" || payload?.Apwf_bu_rerecom_date === "") {
      toast.error("Please enter Re-Recommend Remarks and Date");
      return;
    }

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
          whatsAppDataR?.sendNumber,
          whatsAppDataR?.nextname,
          whatsAppDataR?.partyName,
          whatsAppDataR?.sapOrderNo,
          whatsAppDataR?.sapOrderValue,
          whatsAppDataR?.days_91_180,
          whatsAppDataR?.days_181_210,
          whatsAppDataR?.days_211_300,
          whatsAppDataR?.days_300_plus,
          whatsAppDataR?.currentName
        );
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
                <div className="text-xs font-medium">BU Manager</div>
                <div className="text-sm">{buForm?.Apwf_bu_hod_name}</div>
              </div>
              <div>
                <div className="text-xs font-medium">Designation</div>
                <div className="text-sm">{buForm?.Apwf_bu_desig}</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-xs font-medium">Approve Date</div>
                <DatePicker
                  className="w-full px-3 py-2 border- border-gray- bg-slate-50  focus:outline-none focus:border-b focus:border-indigo-500"
                  selected={new Date(buForm?.Apwf_bu_ap_date ? buForm?.Apwf_bu_ap_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_ap_date: moment(date).format("LL")
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
                  selected={new Date(buForm?.Apwf_bu_recom_date ? buForm?.Apwf_bu_recom_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_recom_date: moment(date).format("LL")
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
                  value={buForm.Apwf_bu_recom_rem}
                  onChange={(e) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_recom_rem: e.target.value
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
                  selected={new Date(buForm?.Apwf_bu_rej_date ? buForm?.Apwf_bu_rej_date : new Date())}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_rej_date: moment(date).format("LL")
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
                  value={buForm.Apwf_bu_reject_rem}
                  onChange={(e) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_reject_rem: e.target.value
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
                    new Date(buForm?.Apwf_bu_rerecom_date ? buForm?.Apwf_bu_rerecom_date : new Date())
                  }
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_rerecom_date: moment(date).format("LL")
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
                  value={buForm.Apwf_bu_re_rec_rem}
                  onChange={(e) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_re_rec_rem: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs font-medium">BU Status</div>
                <input
                  className="text bg-slate-50"
                  type="text"
                  value={buForm.Apwf_bu_status}
                  onChange={(e) => {
                    setbuForm({
                      ...buForm,
                      Apwf_bu_status: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* buttons  */}
        {/* {orderStatus[0]?.Apwf_bu_status !== "Approved" && ( */}
        {/* {roleID == 3 && (
          <div className="flex items-center justify-center w-full gap-4 py-4">
            <button
              // disabled={btnDis || buForm?.Apwf_bu_status == `${props.btn_1} by BU` || buForm?.Apwf_bu_status == `${props.btn_2} by BU`}
              className={`text-center rounded-md ${
                (buForm?.Apwf_bu_status ==`${props.btn_1} by BU` || buForm?.Apwf_bu_status == `${props.btn_2} by BU`) ? "bg-gray-500" : "bg-green-500"
              } text-white py-1 px-4 text-lg`}
              onClick={() => {
                handleRecommend();
              }}
            >
              {props.btn_1}
            </button>

            <button
              disabled={btnDis || buForm?.Apwf_bu_status == `${props.btn_2} by BU` || buForm?.Apwf_bu_status == `${props.btn_1} by BU`}
              className={`text-center rounded-md ${
                (buForm?.Apwf_bu_status == `${props.btn_2} by BU` || buForm?.Apwf_bu_status == `${props.btn_1} by BU`) ? "bg-gray-500" : "bg-green-500"
              } text-white py-1 px-4 text-lg`}
              onClick={() => {
                handleReject();
              }}
            >
              {props.btn_2}
            </button>
          </div>
        )} */}


        {/* Teting btttt */}
        {roleID == 3 && (
          <div className="flex items-center justify-center w-full gap-4 py-4">
          {buttons.map((btnName, index) => {
            const isInitial = buForm?.Apwf_ch_reject_rem == "";

            if (isInitial && btnName !== props.btn_1 && btnName !== props.btn_2) return null;

            
            let isDisabled = btnDis;

            if (btnName === props?.btn_1 || btnName === props?.btn_2) {
              isDisabled =
              buForm?.Apwf_bu_status === `${props.btn_1} by BU` ||
              buForm?.Apwf_bu_status === `${props.btn_2} by BU`;
            }

            if (btnName === props?.btn_3) {
              isDisabled =
              buForm?.Apwf_ch_reject_rem === "" || buForm?.Apwf_bu_status == `${props.btn_3} by BU`;
            }

            const isHidden = !isInitial && (btnName === props.btn_1 || btnName === props.btn_2);

            const isAnyButtonClicked = buttons.some((btn) => buForm?.Apwf_bu_status === `${btn} by BU`);
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

export default BU;
