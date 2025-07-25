import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
const Bank = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };
  const [formActive, setFormActive] = useState(false);

  const [bankData, setBankData] = useState({
    bankName: "",
    beneficiaryName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    reimbursement: "",
    salaryMode: ""
  });

  const [roleId, setRoleId] = useState(null);


  useEffect(() => {
    if (props)
      setBankData({
        ...bankData,
        bankName: props.data?.bank_name || "",
        beneficiaryName: props.data?.benef_name || "",
        accountNumber: props.data?.baccount_no || "",
        branch: props.data?.baccount_branch || "",
        ifsc: props.data?.ifsc_code || "",
        reimbursement: props.data?.reimburse_P_mode || "",
        salaryMode: props.data?.Salary_P_mode || ""
      });
      if (window.localStorage) {
        const userInfo = JSON?.parse(localStorage?.getItem("userinfo"));
        setRoleId(userInfo?.role_id);
       
      }
  }, [props]);

  const handleEditBank = async () => {
    try {
      const { bankName, beneficiaryName, accountNumber, branch, ifsc, reimbursement, salaryMode } = bankData;
      let appStatus = "Update Bank"
      const data = {
        // app_status: "Update Bank",
        bank_name: bankName,
        benef_name: beneficiaryName,
        baccount_no: accountNumber,
        baccount_branch: branch,
        ifsc_code: ifsc,
        reimburse_P_mode: reimbursement,
        Salary_P_mode: salaryMode,
        // emp_status: "Update Bank",
        same_as_salary: "Yes"
      };

      const modifiedData =  ![1,8,17].includes(roleId) ? { ...data, app_status: appStatus } : data;

      const respond = await axios
        .put(`${url}/api/update_bank/${router.query.id}`, JSON.stringify(modifiedData), {
          headers: headers,
          params:{roleId}
        })
        .then((res) => {
          if (!res) return;
          toast.success("Bank edited successfully!");
          setTimeout(() => {
            props.formType("Documents");
          }, 1500);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
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

  /////////////////////////////////////////// JSX ////////////////////////////////////////////////////////////////////

  return (
    <form className=" bg-white rounded shadow p-4 w-full pb-20 h-[80%]" onSubmit={(e) => e.preventDefault()}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 500
        }}
      />
      <div className="flex bg-gray-100  h-8 w-full  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Bank Information
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Bank Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Bank Name"
            value={bankData.bankName}
            onChange={(e) =>
              setBankData({
                ...bankData,
                bankName: e.target.value
              })
            }
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Beneficiary Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Beneficiary Name"
            value={bankData.beneficiaryName}
            onChange={(e) =>
              setBankData({
                ...bankData,
                beneficiaryName: e.target.value
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Account No
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Account No"
            value={bankData.accountNumber}
            minLength={21}
            maxLength={21}
            onChange={(e) => {
              if (e.target.value.length > 21) {
                return;
              }

              setBankData({
                ...bankData,
                accountNumber: e.target.value
              });
            }}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Branch
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Branch"
            value={bankData.branch}
            onChange={(e) =>
              setBankData({
                ...bankData,
                branch: e.target.value
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> IFSC Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="IFSC Code"
            value={bankData.ifsc}
            onChange={(e) =>
              setBankData({
                ...bankData,
                ifsc: e.target.value
              })
            }
          />
        </div>
      </div>

      <div className="flex bg-gray-100 text-slate-400 w-full h-8  items-center  pl-2 mb-2 relative lg:w-full">
        Reimbursement
        <span className="absolute right-10">
          <input
            className="mr-4 self-center"
            type="checkbox"
            onClick={() =>
              setBankData({
                ...bankData,
                reimbursement: bankData.salaryMode
              })
            }
          />
          Same as salary
        </span>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Salary Pay Mode
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={bankData.salaryMode}
            onChange={(e) =>
              setBankData({
                ...bankData,
                salaryMode: e.target.value
              })
            }
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="Pay Mode">Pay Mode</option>
            <option value="Bank Transffer">Bank Transffer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Reimbursement Pay Mode
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={bankData.reimbursement}
            onChange={(e) =>
              setBankData({
                ...bankData,
                reimbursement: e.target.value
              })
            }
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              Option
            </option>
            <option value="Pay Mode">Pay Mode</option>
            <option value="Bank Transffer">Bank Transffer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
      </div>

      {router.query.type === "Edit" && (
        <div className="flex items-center justify-center w-full gap-4 py-4">
          <button
            className="text-center cursor-pointer rounded-md bg-green-500 text-white py-1 px-4 text-lg"
            onClick={() => props.formType("Professional")}
          >
            Prev
          </button>
          <button
            disabled={disableNext}
            className=" text-center cursor-pointer rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            onClick={() => handleEditBank()}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default Bank;
