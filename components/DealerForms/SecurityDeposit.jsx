import React, { useState, useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import { useToaster } from "react-hot-toast/headless";

const SecurityDeposit = (props) => {
  const router = useRouter();
  const [formActive, setFormActive] = useState(false);
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  const [securityForm, setSecurtiyForm] = useState({
    party_Name: "",
    amt_deposit: "",
    amt_paidby: "",
    rec_utrno: "",
    recutr_date: "",
    cheque_one: "",
    cheque_two: "",
    cheque_three: "",
    cheque_dateOne: "",
    cheque_dateTwo: "",
    cheque_dateThree: "",
    bank_nameOne: "",
    bank_nameTwo: "",
    bank_nameThree: "",
    ac_no_one: "",
    ac_no_two: "",
    ac_no_three: "",
    amount_one: "",
    amount_two: "",
    amount_three: ""
  });

  // const currentDate = new Date();
  // const day = currentDate.getDate().toString().padStart(2, "0");
  // const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  // const year = currentDate.getFullYear();

  // const formattedDate = `${day}/${month}/${year}`;

  const [roleId, setRoleId] = useState(null);

  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (props) {
      setSecurtiyForm({
        ...securityForm,
        party_Name: props?.data[0]?.party_Name || "",
        amt_deposit: props?.data[0]?.amt_deposit || "",
        amt_paidby: props?.data[0]?.amt_paidby || "",
        rec_utrno: props?.data[0]?.rec_utrno || "",
        recutr_date: props?.data[0]?.recutr_date || "",
        cheque_one: props?.data[0]?.cheque_one || "",
        cheque_two: props?.data[0]?.cheque_two || "",
        cheque_three: props?.data[0]?.cheque_three || "",
        cheque_dateOne: props?.data[0]?.cheque_dateOne || "",
        cheque_dateTwo: props?.data[0]?.cheque_dateTwo || "",
        cheque_dateThree: props?.data[0]?.cheque_dateThree || "",
        bank_nameOne: props?.data[0]?.bank_nameOne || "",
        bank_nameTwo: props?.data[0]?.bank_nameTwo || "",
        bank_nameThree: props?.data[0]?.bank_nameThree || "",
        ac_no_one: props?.data[0]?.ac_no_one || "",
        ac_no_two: props?.data[0]?.ac_no_two || "",
        ac_no_three: props?.data[0]?.ac_no_three || "",
        amount_one: props?.data[0]?.amount_one || "",
        amount_two: props?.data[0]?.amount_two || "",
        amount_three: props?.data[0]?.amount_three || ""
      });
    }
  }, [props]);

  const handleSecurityUpdate = async () => {
    
    try {
      const {
        amt_deposit,
        amt_paidby,
        rec_utrno,
        recutr_date,
        cheque_one,
        cheque_two,
        cheque_three,
        cheque_dateOne,
        cheque_dateTwo,
        cheque_dateThree,
        bank_nameOne,
        bank_nameTwo,
        bank_nameThree,
        ac_no_one,
        ac_no_two,
        ac_no_three,
        amount_one,
        amount_two,
        amount_three
      } = securityForm;
      const data = {
        amt_deposit,
        amt_paidby,
        rec_utrno,
        cheque_one,
        cheque_two,
        cheque_three,
        cheque_dateOne,
        cheque_dateTwo,
        cheque_dateThree,
        bank_nameOne,
        bank_nameTwo,
        bank_nameThree,
        ac_no_one,
        ac_no_two,
        ac_no_three,
        amount_one,
        amount_two,
        amount_three,
        recutr_date: recutr_date ? recutr_date : formattedDate,
        app_status: "Update Security",
        d_id: props.data[0].d_id
      };
      // return
      const res = await axios.put(
        `${url}/api/update_dealersecuritydeposit/${router.query.id}`,
        JSON.stringify(data),
        { headers: headers }
      );
      const apiRes = await res.data;
      if (!apiRes) return;
      toast.success("Security Deposit Info Added Successully", { duration: 1000 });
      setTimeout(() => {
        setSecurtiyForm({
          amt_deposit: "",
          amt_paidby: "",
          rec_utrno: "",
          recutr_date: ""
        });
        // if (roleId == 6 || roleId == 12) {
        //   props.formType("Approval");
        // } else {
        //   props.formType("Assessment");
        // }
        props.formType("Documents")
      }, 1600);
      console.log("Reponse", apiRes);
    } catch (error) {
      console.log("Err", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  //handlers to copyform data

  function copyFormData() {
    if (!securityForm.cheque_one) {
      toast.error("Atleast fill the above details");
    }
    if (securityForm.cheque_one) {
      setSecurtiyForm({
        ...securityForm,
        cheque_two: securityForm.cheque_one,
        cheque_dateTwo: securityForm.cheque_dateOne,
        bank_nameTwo: securityForm.bank_nameOne,
        ac_no_two: securityForm.ac_no_one,
        amount_two: securityForm.amount_one
      });
    }
  }

  function copyFormDataTwo() {
    if (!securityForm.cheque_two) {
      toast.error("Atleast fill the above details");
    }
    if (securityForm.cheque_two) {
      setSecurtiyForm({
        ...securityForm,
        cheque_three: securityForm.cheque_two,
        cheque_dateThree: securityForm.cheque_dateTwo,
        bank_nameThree: securityForm.bank_nameTwo,
        ac_no_three: securityForm.ac_no_two,
        amount_three: securityForm.amount_two
      });
    }
  }

  //Getting the roleId

  useEffect(() => {
    if (window.localStorage) {
      const userinfo = localStorage.getItem("userinfo");
      setRoleId(JSON?.parse(userinfo)?.role_id);
    }
  }, []);

  //disbaling next button

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

  //////*****************************JSX*********************************///////

  return (
    <form className=" bg-white rounded  p-4 w-full  overflow-auto" onSubmit={(e) => e.preventDefault()}>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Party Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Party Name"
            value={securityForm?.party_Name}
            disabled
          />
        </div>
      </div>
      <div className="w-full px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2">
          <span className="flex gap-1">
            <small className="text-red-600">*</small> Please Type Or Write in Bold Letters & Tick in
            Appropriate Boxes <BsCheck2Circle className="text-green-500" fontSize={20} />
          </span>
        </label>
      </div>

      <div className="flex my-2">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Amount of Deposit
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            maxLength={10}
            id="inputField"
            placeholder="Amount of Deposit"
            value={securityForm?.amt_deposit}
            onChange={(e) => {
              const inputVal = Number(e.target.value);
              if (e.target.value.length == 1) {
                if (inputVal < 20000) {
                  toast("Less than 20,000 security deposit may be cancel/reject the dealer application");
                }
              }
              setSecurtiyForm({
                ...securityForm,
                amt_deposit: e.target.value
              });
            }}
            disabled={formActive}
          />
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col items-center accent-lime-400 md:py-2 ">
        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ownedCheckbox"
              className="mr-2"
              checked={securityForm?.amt_paidby === "CHEQUE"}
              onChange={() => {
                setSecurtiyForm({
                  ...securityForm,
                  amt_paidby: "CHEQUE"
                });
              }}
              disabled={formActive}
            />
            <label htmlFor="ownedCheckbox">Cheque</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rentedCheckbox"
              className="mr-2"
              checked={securityForm.amt_paidby === "DEMAND_DRAFT"}
              onChange={() => {
                setSecurtiyForm({
                  ...securityForm,
                  amt_paidby: "DEMAND_DRAFT"
                });
              }}
            />
            <label htmlFor="rentedCheckbox">Demand Draft</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rentedCheckbox"
              className="mr-2"
              checked={securityForm.amt_paidby === "RTGS"}
              onChange={() => {
                setSecurtiyForm({
                  ...securityForm,
                  amt_paidby: "RTGS"
                });
              }}
            />
            <label htmlFor="rentedCheckbox">RTGS</label>
          </div>
        </div>

        <div className="w-full px-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rentedCheckbox"
              className="mr-2"
              checked={securityForm.amt_paidby === "NEFT"}
              onChange={() => {
                setSecurtiyForm({
                  ...securityForm,
                  amt_paidby: "NEFT"
                });
              }}
            />
            <label htmlFor="rentedCheckbox">NEFT</label>
          </div>
        </div>
      </div>

      <div className="flex my-2 mb-2 lg:flex-row flex-col md:py-2 ">
        <div className="w-full px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Reciept No/UTR Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            maxLength={22}
            id="inputField"
            placeholder=" Reciet Number/UTR No"
            value={securityForm?.rec_utrno}
            onChange={(e) => {
              setSecurtiyForm({
                ...securityForm,
                rec_utrno: e.target.value
              });
            }}
          />
        </div>
        <div className="w-full px-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Dated
          </label>
          <DatePicker
            className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            selected={new Date(securityForm?.recutr_date ? securityForm?.recutr_date : new Date())}
            dateFormat="dd/MM/yyyy"
            dropdownMode="select"
            maxDate={new Date()}
            onChange={(date) => {
              setSecurtiyForm({
                ...securityForm,
                recutr_date: moment(date).format("LL")
              });
            }}
            onChangeRaw={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </div>

      {/* Adding extra Fields... */}

      <div className="chequeextrafieild rounded-md border-[0.08rem] border-gray-200 my-2 md:my-2 ">
        <div className="flex my-2 mb-2 lg:flex-row md:py-2 ">
          <div className="w-full px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Cheque No.
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={6}
              id="inputField"
              placeholder="Cheque No"
              value={securityForm?.cheque_one}
              onChange={(e) => {
                if (e.target.value.length > 6) {
                  return;
                }
                setSecurtiyForm({
                  ...securityForm,
                  cheque_one: e.target.value
                });
              }}
            />
          </div>
          <div className="w-full px-2 ">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Date
            </label>
            <DatePicker
              className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              selected={new Date(securityForm?.cheque_dateOne ? securityForm?.cheque_dateOne : new Date())}
              dateFormat="dd/MM/yyyy"
              dropdownMode="select"
              // maxDate={new Date()}
              onChange={(date) => {
                setSecurtiyForm({
                  ...securityForm,
                  cheque_dateOne: moment(date).format("LL")
                });
              }}
              onChangeRaw={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </div>

        <div className="flex my-2 mb-2 lg:flex-row  md:py-2">
          <div className="w-3/4  px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Bank Name
            </label>
            <input
              className="w-full px-2 py-2  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              maxLength={22}
              id="inputField"
              placeholder="Bank Name"
              value={securityForm?.bank_nameOne}
              onChange={(e) => {
                setSecurtiyForm({
                  ...securityForm,
                  bank_nameOne: e.target.value
                });
              }}
            />
          </div>
          <div className="w-full  px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> A/c No.
            </label>
            <input
              className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={22}
              id="inputField"
              placeholder="A/c No."
              value={securityForm?.ac_no_one}
              onChange={(e) => {
                if (e.target.value.length > 11) {
                  return;
                }
                setSecurtiyForm({
                  ...securityForm,
                  ac_no_one: e.target.value
                });
              }}
            />
          </div>

          <div className="w-3/4 px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Amount
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={22}
              id="inputField"
              placeholder="Amount"
              value={securityForm?.amount_one}
              onChange={(e) => {
                setSecurtiyForm({
                  ...securityForm,
                  amount_one: e.target.value
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* second checkbank details  */}

      <div className="chequeextrafieild rounded-md border-[0.08rem] border-gray-200 my-2 md:my-2 ">
        <div className="flex my-2 mb-2 lg:flex-row md:py-2 ">
          <div className="w-full px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Cheque No.
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={6}
              id="inputField"
              placeholder="Cheque No"
              value={securityForm?.cheque_two}
              onChange={(e) => {
                if (e.target.value.length > 6) {
                  return;
                }
                setSecurtiyForm({
                  ...securityForm,
                  cheque_two: e.target.value
                });
              }}
            />
          </div>
          <div className="w-full px-2 ">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Date
            </label>
            <DatePicker
              className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              selected={new Date(securityForm?.cheque_dateTwo ? securityForm?.cheque_dateTwo : new Date())}
              dateFormat="dd/MM/yyyy"
              dropdownMode="select"
              // maxDate={new Date()}
              onChange={(date) => {
                setSecurtiyForm({
                  ...securityForm,
                  cheque_dateTwo: moment(date).format("LL")
                });
              }}
              onChangeRaw={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div
            onClick={() => {
              copyFormData();
            }}
            className="cursor-pointer px-2 py-1 text-orange-500 text-2xl font-bold "
          >
            +
          </div>
        </div>

        <div className="flex my-2 mb-2 lg:flex-row  md:py-2">
          <div className="w-3/4  px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Bank Name
            </label>
            <input
              className="w-full px-2 py-2  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              maxLength={22}
              id="inputField"
              placeholder="Bank Name"
              value={securityForm?.bank_nameTwo}
              onChange={(e) => {
                setSecurtiyForm({
                  ...securityForm,
                  bank_nameTwo: e.target.value
                });
              }}
            />
          </div>
          <div className="w-full  px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> A/c No.
            </label>
            <input
              className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={22}
              id="inputField"
              placeholder="A/c No."
              value={securityForm?.ac_no_two}
              onChange={(e) => {
                if (e.target.value.length > 11) {
                  return;
                }
                setSecurtiyForm({
                  ...securityForm,
                  ac_no_two: e.target.value
                });
              }}
            />
          </div>

          <div className="w-3/4 px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Amount
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={22}
              id="inputField"
              placeholder="Amount"
              value={securityForm?.amount_two}
              onChange={(e) => {
                setSecurtiyForm({
                  ...securityForm,
                  amount_two: e.target.value
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* third checkbank details  */}

      <div className="chequeextrafieild rounded-md border-[0.08rem] border-gray-200 my-2 md:my-2 ">
        <div className="flex my-2 mb-2 lg:flex-row md:py-2 ">
          <div className="w-full px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Cheque No.
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={6}
              id="inputField"
              placeholder="Cheque No"
              value={securityForm?.cheque_three}
              onChange={(e) => {
                if (e.target.value.length > 6) {
                  return;
                }
                setSecurtiyForm({
                  ...securityForm,
                  cheque_three: e.target.value
                });
              }}
            />
          </div>
          <div className="w-full px-2 ">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Date
            </label>
            <DatePicker
              className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
              selected={
                new Date(securityForm?.cheque_dateThree ? securityForm?.cheque_dateThree : new Date())
              }
              dateFormat="dd/MM/yyyy"
              dropdownMode="select"
              // maxDate={new Date()}
              onChange={(date) => {
                setSecurtiyForm({
                  ...securityForm,
                  cheque_dateThree: moment(date).format("LL")
                });
              }}
              onChangeRaw={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div
            onClick={() => {
              copyFormDataTwo();
            }}
            className="cursor-pointer px-2 py-1 text-orange-500 text-2xl font-bold "
          >
            +
          </div>
        </div>

        <div className="flex my-2 mb-2 lg:flex-row  md:py-2">
          <div className="w-3/4  px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Bank Name
            </label>
            <input
              className="w-full px-2 py-2  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              maxLength={22}
              id="inputField"
              placeholder="Bank Name"
              value={securityForm?.bank_nameThree}
              onChange={(e) => {
                setSecurtiyForm({
                  ...securityForm,
                  bank_nameThree: e.target.value
                });
              }}
            />
          </div>
          <div className="w-full  px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> A/c No.
            </label>
            <input
              className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={22}
              id="inputField"
              placeholder="A/c No."
              value={securityForm?.ac_no_three}
              onChange={(e) => {
                if (e.target.value.length > 11) {
                  return;
                }
                setSecurtiyForm({
                  ...securityForm,
                  ac_no_three: e.target.value
                });
              }}
            />
          </div>

          <div className="w-3/4 px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="inputField">
              <small className="text-red-600">*</small> Amount
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="number"
              maxLength={22}
              id="inputField"
              placeholder="Amount"
              value={securityForm?.amount_three}
              onChange={(e) => {
                setSecurtiyForm({
                  ...securityForm,
                  amount_three: e.target.value
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* buttons */}

      {(router.query.type === "Edit") && (
        <div className="my-6 flex items-center justify-end  ">
          <div className="flex items-center justify-center w-full gap-4 py-12">
            <button
              onClick={() => props.formType("BusinessInfo")}
              className={`text-center rounded-md hover:bg-green-500 ${
                formActive ? "bg-green-400" : "bg-gray-400"
              }  text-white py-1 px-4 text-lg`}
            >
              Prev
            </button>
            <button
              // disabled={disableNext}
              onClick={handleSecurityUpdate}
              className="text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SecurityDeposit;
