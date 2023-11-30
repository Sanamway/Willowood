import React, { useState, useEffect } from "react";

const Bank = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [bankData, setBankData] = useState({
    bankName: "",
    beneficiaryName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    reimbursement: "",
  });
  useEffect(() => {
    if (props)
      setBankData({
        bankName: props.data?.bank_name || "",
        beneficiaryName: props.data?.benef_name || "",
        accountNumber: props.data?.baccount_no || "",
        branch: props.data?.baccount_branch || "",
        ifsc: props.data?.ifsc_code || "",
        reimbursement: props.data?.reimburse_P_mode || "",
      });
  }, [props]);

  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20 h-[80%]"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex bg-gray-100  h-8 w-2/3  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Bank Information
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
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
                bankName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
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
                beneficiaryName: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Account No
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Account No"
            value={bankData.accountNumber}
            onChange={(e) =>
              setBankData({
                ...bankData,
                accountNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
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
                branch: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
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
                ifsc: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex bg-gray-100  w-2/3  h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Reimbursement
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Reimbursement Pay Mode
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={bankData.reimbursement}
            onChange={(e) =>
              setBankData({
                ...bankData,
                reimbursement: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="state1">Mr.</option>
            <option value="state2">Mrs.</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between  gap-2 w-2/3 mt-12  flex gap-1 lg:w-1/2   overflow-hidden  px-4 py-1 text-white  pointer">
        <div
          className="w-full  text-center  bg-green-700 px-4 py-1 text-white cursor-pointer"
          onClick={() => props.formType("Family")}
        >
          ...Prev
        </div>
        <div
          className=" w-full text-center bg-orange-400 px-4 py-1 text-white cursor-pointer"
          onClick={() => props.formType("Document")}
        >
          Next..
        </div>
      </div>
    </form>
  );
};

export default Bank;
