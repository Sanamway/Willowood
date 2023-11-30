import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const History = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [ctcData, setCtcData] = useState({
    employeeCode: "",
    department: "",
    subDepartment: "",
    designation: "",
    workEmail: "",
    doj: "",
    doc: "",
    functionalManager: "",
    reportingManager: "",
    retirementDate: "",
    employementType: "",
    employementStatus: "",
    approvalFee: "",
    mostExpensiveBudget: "",

    agreeStartDate: "",
    agreeEndDate: "",
    company: "",
    bg: "",
    bu: "",
    zone: "",
    region: "",
    territory: "",
    remarks: "",
  });
  useEffect(() => {
    if (props)
      setCtcData({
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
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Employee Code
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Employee Code"
            value={ctcData.employeeCode}
            onChange={(e) =>
              setCtcData({ ...ctcData, employeeCode: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Department
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.department}
            onChange={(e) =>
              setCtcData({ ...ctcData, department: e.target.value })
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Sub department
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.subDepartment}
            onChange={(e) =>
              setCtcData({ ...ctcData, subDepartment: e.target.value })
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

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Designation
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={ctcData.designation}
            onChange={(e) =>
              setCtcData({ ...ctcData, designation: e.target.value })
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Work email
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Work email"
            value={ctcData.workEmail}
            onChange={(e) =>
              setCtcData({ ...ctcData, workEmail: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date of joining
          </label>

          <DatePicker
            value={ctcData.doj}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date of Confirmation
          </label>

          <DatePicker
            value={ctcData.doc}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Functional Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Functional Manager"
            value={ctcData.functionalManager}
            onChange={(e) =>
              setCtcData({ ...ctcData, functionalManager: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Reporting Manager
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Reporting Manager"
            value={ctcData.reportingManager}
            onChange={(e) =>
              setCtcData({ ...ctcData, reportingManager: e.target.value })
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
            Retirement date
          </label>

          <DatePicker
            value={ctcData.retirementDate}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Employment Type
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Employment Type"
            value={ctcData.employementType}
            onChange={(e) =>
              setCtcData({ ...ctcData, employementType: e.target.value })
            }
          />
        </div>
        <div className="  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Employment Status
          </label>

          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Employment Type"
            value={ctcData.employementStatus}
            onChange={(e) =>
              setCtcData({ ...ctcData, employementStatus: e.target.value })
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
            <small className="text-red-600">*</small> Approval Fee Amt.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Approval Fee Amt."
            value={ctcData.approvalFee}
            onChange={(e) =>
              setCtcData({ ...ctcData, approvalFee: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  lg:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
            disabled={!formActive}
          >
            <small className="text-red-600">*</small> Most Expensive Budget
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder=" Most Expensive Budget"
            value={ctcData.mostExpensiveBudget}
            onChange={(e) =>
              setCtcData({ ...ctcData, mostExpensiveBudget: e.target.value })
            }
          />
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Agreement Start Date
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Middle Name"
            disabled={!formActive}
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Agreement End Date
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Middle Name"
            disabled={!formActive}
          />
        </div>
      </div>
      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Business Structure
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Company Info
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Business Segment
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Business Unit Division
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Zone
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Region
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Territory
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
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
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Remarks
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="textareaField"
            placeholder="Remarks"
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default History;
