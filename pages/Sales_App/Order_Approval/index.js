import React, { useState, useEffect } from "react";
// import { Check, AlertCircle, ThumbsUp, RotateCcw, X, ClipboardCheck } from "lucide-react";
import { FiMinus, FiPlus } from "react-icons/fi";
import axios from "axios";
import { url } from "@/constants/url";
import TabForm from "../../../components/Sales_Portal_Apps/order_approval/TabForm";
import { FcInfo } from "react-icons/fc";
import { BiRefresh } from "react-icons/bi";
import YTDModal from "../../../components/Sales_Portal_Apps/order_approval/modals/YTDModals"
import { useRouter } from 'next/router';
const defaultData = {
  sapCode: "SAP123456",
  creditPolicy: "1,2,3,4,5",
  partyName: " . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .",
  sapOrder: {
    number: "XXXXXXXXXXX",
    value: "XXXXXXXXXXX"
  },
  creditLimit: "XXXXXXXXXXXXX",
  totalOutstanding: "XXXXXXXXXXXXX",
  totalOverdue: "₹750,000.00",
  agingBuckets: {
    "0-30": "₹2,250,000.00",
    "30-60": "₹750,000.00",
    "60-90": "₹500,000.00",
    "90-120": "₹250,000.00",
    "1Year": "₹0.00",
    ">1Year": "₹0.00"
  },
  tabInfo: {
    region: "North",
    zone: "Delhi NCR",
    bu: "Enterprise",
    ch: "Direct",
    b2c: "No"
  },
  regionalManager: "Raj Sharma",
  designation: "Senior Regional Manager",
  approveDate: "15/05/2023",
  recommendDate: "10/05/2023",
  recommendRemarks: "Good payment history",
  rejectDate: "",
  rejectionRemarks: "",
  reRecommendDate: "",
  reRecommendRemarks: "",
  regionStatus: "Approved"
};

export default function orderApproval({ data = defaultData, className }) {
  let [isOpen, setisOpen] = useState(false);
  const [isOpenOne, setIsopenOne] = useState(true);
  const [isOpenTwo, setIsopenTwo] = useState(true);
  const [policyData, setPolicyData] = useState("");
  const [orderCredit, setOrderCredit] = useState([]);
  const [roleId, setRoleId] = useState(null);
  const [ytdData, setYtdData] = useState([]);
  const [usersData, setusersData] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  const router = useRouter()
  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage?.getItem("userinfo");
      const roleID = JSON?.parse(userinfo)?.role_id
      const uid = localStorage?.getItem("uid");
      const user = localStorage?.getItem("user_name");
      const userData = { uid, user, roleID }
      setusersData(userData)
      // console.log("userData", userData);

      setRoleId(JSON?.parse(userinfo)?.role_id);
    }
  }, []);


  console.log("Heya", orderCredit)


  //hardcoded Data

  const [hardcodedData, setHardCodeData] = useState({
    "sap_order_no": "",
    "party_code": "",
  })

  useEffect(() => {
    if (!router.query.sap_code) return
    setHardCodeData({
      "sap_order_no": router?.query.sap_code,
      "party_code": router?.query.order_no,
      "party_name": router?.query.party_name,

    })
  }, [router.query])

  console.log(hardcodedData?.party_code, "hadda")


  useEffect(() => {
    getorderCredit(hardcodedData?.party_code, hardcodedData?.sap_order_no);
  }, [hardcodedData])


  const handleAction = (action) => {
    toast({
      title: `${action} action triggered`,
      description: `You have ${action.toLowerCase()}d this order.`,
      variant: action === "Reject" ? "destructive" : "default"
    });
  };

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const getCpolicy = async (roleId) => {
    const roleTypes = {
      ZONE: { id: 4, value: "Zone" },
      REGION: { id: 5, value: "Region" },
      B2C: { id: 10, value: "B-2-C" },
      CH: { id: 16, value: "CH" },
      BU: { id: 3, value: "BU" },
      DEFAULT: { value: "NULL" }
    };

    const getRoleValue = (roleId) => {
      const role = Object.values(roleTypes).find((r) => r.id === roleId);
      return role?.value || roleTypes.DEFAULT.value;
    };

    let cpolicy = orderCredit[0]?.cpolicy || "";

    const roleValue = getRoleValue(roleId);

    console.log("ROLEVALUE", roleValue)
    //hardcoded cpolicy
    try {
      const res = await axios.get(`${url}/api/get_order_approval_policy?c_id=1&cpolicy=${cpolicy}&bst=${roleValue}`, {
        headers: headers
      });
      const resp = await res.data.data;
      console.log("getPolicyRes", resp)
      setPolicyData(resp);

    } catch (error) {
      console.log("Err")
    }

  };

  useEffect(() => {
    if (roleId, orderCredit) {
      getCpolicy(roleId, orderCredit);
    }
  }, [roleId, orderCredit]);

  const getorderCredit = async (sapCode, orderNo) => {
    try {
      const res = await axios.get(
        `${url}/api/get_order_credit_status?c_id=1&bg_id=1&sap_order_no=${sapCode}&party_code=${orderNo}`,
        {
          headers: headers
        }
      );
      const resp = await res.data.data;
      setOrderCredit(resp);
      // setOrderCredit((prev) => [...(prev || [])]);
    } catch (error) {
      console.log(error);
    }
  };




  //Getting YTD Monthly Data

  const gettingYTDdata = async () => {
    try {
      const res = await axios.get(
        `${url}/api/get_collection_plan_monthly?c_id=1&bg_id=1&year=2024&customer_name=MH Shree Sangameswar Krushi Se Khojanwadi&c_id=1`,
        {
          headers: headers
        }
      );
      const resp = await res.data;
      setYtdData(resp);
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    // getorderCredit();
    gettingYTDdata()
  }, []);


  // const getApprovalStatus =async()=>{
  //   try {
  //     const res = await axios.get(`${url}/api/get_order_approval_status?sap_order_no=null&party_code=null&c_id=1`,{
  //       headers: headers
  //     });
  //     const resp = await res.data.data;
  //     setOrderStatus(resp || [])
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  console.log("ordererce", orderCredit)








  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <YTDModal ytdData={ytdData} isOpen={isOpen} onClose={() => setisOpen(false)} onOpen={() => setisOpen(true)}></YTDModal>
      <div className="">
        <div className={`space-y- m bg-slate-50 ${isOpenOne ? "h-[40px]" : "h-auto"} overflow-y-hidden`}>
          <div className="bg-slate-50 rounded-sm p- border border-slate-100">
            <div className="bg-blu text-black text ">
              <div className="flex items-center justify-between bg-blue-900 text-white px-2 py-2">
                <div className="">
                  <h1 className="text-lg font-bold">Party Outstanding Information</h1>
                </div>
                <div
                  onClick={() => setIsopenOne(!isOpenOne)}
                  className="flex items-center justify-end cursor-pointer"
                >
                  {isOpenOne ? <FiPlus></FiPlus> : <FiMinus />}
                </div>
              </div>
              <div className="flex bg-yellow-400 items-center justify-between flex-wrap gap-3  text-black px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">SAP Code:</span>
                  <button className="bg-white/10 hover:bg-white/20 text-black border-none text-sm">
                    {hardcodedData?.sap_order_no}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Credit Policy:</span>
                  <button className=" text-black border-none text-xs">{orderCredit[0]?.cpolicy}</button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Party:</span>
                  <span className="text-sm font-semibold truncate">{hardcodedData?.party_name}</span>
                  <span className="cursor-pointer">
                    <BiRefresh className="text-blue-500" size={27}></BiRefresh>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg px-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className=" text-sm font-medium">SAP Order No</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.sap_order_no}</div>
              </div>
              <div>
                <div className=" text-sm font-medium">SAP Order Value</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.sap_order_value}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className="text-sm font-medium flex items-center justify-center gap-2">
                  BS Value
                  <span className="cursor-pointer">
                    <FcInfo
                      onClick={() => {
                        // setisOpen(true);
                      }}
                      className=""
                      size={18}
                    ></FcInfo>
                  </span>
                </div>
                <div className=" text-xs text-slate-500">{orderCredit[0]?.bs_value}</div>
              </div>
              <div>
                <div className="text-sm font-medium">MEL Value</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.mel_value}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">Opening Balance</div>
                <div className=" text-xs text-slate-500">{orderCredit[0]?.opening_balance}</div>
              </div>
              <div>
                <div className="text-sm font-medium flex items-center justify-center gap-2">
                  YTD Collection
                  <span className="cursor-pointer">
                    <FcInfo
                      onClick={() => {
                        setisOpen(true);
                      }}
                      className=""
                      size={18}
                    ></FcInfo>
                  </span>
                </div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.ytd_collection}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">Other Cr Bal</div>
                <div className=" text-xs text-slate-500">{orderCredit[0]?.other_cr_bal}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Credit Limit</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.credit_limit}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium"> Available Credit Limit</div>
                <div className="text-xs text-slate-500 ">{orderCredit[0]?.available_credit_limit}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Total Outstanding</div>
                <div className="text-xs text-slate-500  ">{orderCredit[0]?.total_outstanding}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">Total undue</div>
                <div className="text-xs text-slate-500 ">{orderCredit[0]?.total_undue}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Total Overdue</div>
                <div className="text-xs text-slate-500  ">{orderCredit[0]?.total_overdue}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className="text-sm font-medium">91-120 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_91_120}</div>
              </div>
              <div>
                <div className="text-sm font-medium">121-150 Days</div>
                <div className="text-xs  text-slate-600">{orderCredit[0]?.days_121_150}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className=" text-sm font-medium">151-180 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_151_180}</div>
              </div>
              <div>
                <div className="text-sm font-medium ">181-210 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_181_210}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className=" text-sm font-medium">211-240 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_211_240}</div>
              </div>
              <div>
                <div className="text-sm font-medium">241-270 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_241_270}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className=" text-sm font-medium">271-300 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_271_300}</div>
              </div>
              <div>
                <div className="text-sm font-medium"> 300 Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.days_300_plus}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Information */}

        <div className={`space-y- m bg-slate-50 ${isOpenTwo ? "h-[40px]" : "h-auto"} overflow-y-hidden`}>
          <div className="bg-slate-50 rounded-sm p- border border-slate-100">
            <div className="bg-blu text-black text ">
              <div className="flex items-center justify-between bg-blue-900 text-white px-2 py-2">
                <div className="">
                  <h1 className="text-lg font-bold">Sales Information</h1>
                </div>
                <div
                  onClick={() => setIsopenTwo(!isOpenTwo)}
                  className="flex items-center justify-end cursor-pointer"
                >
                  {isOpenTwo ? <FiPlus></FiPlus> : <FiMinus />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg px-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className=" text-sm font-medium">YTD Gross Sale</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.ytd_gross_sale}</div>
              </div>
              <div>
                <div className=" text-sm font-medium">MTD Gross Sale</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.mtd_gross_sale}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">YTD Net Sale</div>
                <div className=" text-xs text-slate-500">{orderCredit[0]?.ytd_net_sale}</div>
              </div>
              <div>
                <div className="text-sm font-medium">MTD Net Sale</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.mtd_net_sale}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">YTD Sales Rtrn</div>
                <div className=" text-xs text-slate-500">{orderCredit[0]?.ytd_sales_rtrn}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Average Outstanding Days</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.avg_outstanding_days}</div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 rounded-lg p-1 border border-slate-100 text-center">
            <h2>Previous Sales</h2>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">Year 24-25 Sales</div>
                <div className=" text-xs text-slate-500">{orderCredit[0]?.prev_sales_year_3}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Year 23-24 Sales</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.prev_sales_year_2}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium"> Year 22-23 Sales </div>
                <div className="text-xs text-slate-500 ">{orderCredit[0]?.prev_sales_year_1}</div>
              </div>
              <div>
                <div className="text-sm font-medium">AVERA`</div>
                <div className="text-xs text-slate-500  ">{orderCredit[0]?.totalOutstanding}</div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 rounded-lg p-1 border border-slate-100 text-center">
            <h2>Nucleaus</h2>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">Year 24-25 Sales</div>
                <div className="text-xs text-slate-500 ">{orderCredit[0]?.nucleus_sales_year_3}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Year 23-24 Sales</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.nucleus_sales_year_2}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className="text-sm font-medium">Year 22-23 Sales</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.nucleus_sales_year_1}</div>
              </div>
              <div>
                <div className="text-sm font-medium"></div>
                <div className="text-xs  text-slate-600">{ }</div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 rounded-lg p-1 border border-slate-100 text-center">
            <h2>X-Factor</h2>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-2 ">
              <div>
                <div className="text-sm font-medium">Year 24-25 Sales</div>
                <div className="text-xs text-slate-500 ">{orderCredit[0]?.xfactor_sales_year_3}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Year 23-24 Sales</div>
                <div className="text-xs text-slate-500  ">{orderCredit[0]?.xfactor_sales_year_2}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
            <div className="flex items-center justify-between px-2 py-1 ">
              <div>
                <div className="text-sm font-medium">Year 22-23 Sales</div>
                <div className="text-xs text-slate-500">{orderCredit[0]?.xfactor_sales_year_1}</div>
              </div>
              <div>
                <div className="text-sm font-medium"></div>
                <div className="text-xs  text-slate-600">{ }</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex flex-wrap gap-2 justify-center">
              <TabForm policy={policyData} roleId={roleId} userData={usersData} orderStatus={orderStatus} orderCredit={orderCredit} hardcodedData={hardcodedData}></TabForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
