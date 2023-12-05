import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
const Family = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [formActive, setFormActive] = useState(false);
  const [familyData, setFamilyData] = useState({
    fatherName: "",
    motherName: "",
    maritialStatus: "",
    spouseName: "",
    dom: "",
  });
  useEffect(() => {
    if (props)
      setFamilyData({
        fatherName: props.data?.ffname || "",
        motherName: props.data?.mname || "",
        maritialStatus: props.data?.mstatus || "",
        spouseName: props.data?.spouse || "",
        dom: props.data?.dateofmar || new Date(),
      });
  }, [props]);

  const handleEditFamily = async () => {
    try {
      const { fatherName, motherName, maritialStatus, spouseName, dom } =
        familyData;
      const data = {
        ffname: fatherName,
        mname: motherName,
        mstatus: maritialStatus,
        spouse: spouseName,
        dateofmar: dom,
        emp_status: "Update Family",
      };
      const respond = await axios
        .put(
          `${url}/api/update_family/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Family edited successfully!");
          setTimeout(() => {
            props.formType("Bank");
          }, [1000]);
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

  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 500,
        }}
      />
      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Parental Information
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Father Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Father Name"
            value={familyData.fatherName}
            onChange={(e) =>
              setFamilyData({ ...familyData, fatherName: e.target.value })
            }
          />
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Mother Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Mother Name"
            value={familyData.motherName}
            onChange={(e) =>
              setFamilyData({ ...familyData, motherName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Martial Status & Children Details
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Maritial Status
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={familyData.maritialStatus}
            onChange={(e) => {
              e.target.value !== "Married"
                ? setFamilyData({
                    ...familyData,
                    maritialStatus: e.target.value,
                    spouseName: "",
                    dom: "",
                  })
                : setFamilyData({
                    ...familyData,
                    maritialStatus: e.target.value,
                  });
            }}
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="Married">Married</option>
            <option value="Seprated">Un-Married</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {familyData.maritialStatus === "Married" && (
          <div className="w-2/3  px-2  lg:w-1/2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              Spouse Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="inputField"
              placeholder="Spouse Name"
              value={familyData.spouseName}
              onChange={(e) =>
                setFamilyData({ ...familyData, spouseName: e.target.value })
              }
            />
          </div>
        )}
      </div>
      {familyData.maritialStatus === "Married" && (
        <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
          <div className="w-2/3  px-2  lg:w-1/2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small> Date of Marriage
            </label>

            {familyData.dom ? (
              <DatePicker
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                dateFormat="dd-MM-yyyy"
                selected={new Date(familyData.dom)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(date) =>
                  setFamilyData({
                    ...familyData,
                    dom: moment(date).format("LL"),
                  })
                }
              />
            ) : (
              <DatePicker
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                dateFormat="dd-MM-yyyy"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(date) =>
                  setFamilyData({
                    ...familyData,
                    dom: moment(date).format("LL"),
                  })
                }
              />
            )}
          </div>
        </div>
      )}

      {router.query.type === "Edit" && (
        <div className="flex justify-between  gap-2 w-2/3 mt-12  flex gap-1 lg:w-1/2   overflow-hidden  px-4 py-1 text-white  pointer">
          <div
            className="w-full  text-center  bg-green-700 px-4 py-1 text-white cursor-pointer"
            onClick={() => props.formType("Personal")}
          >
            ...Prev
          </div>
          <div
            className=" w-full text-center bg-orange-400 px-4 py-1 text-white cursor-pointer"
            onClick={() => handleEditFamily()}
          >
            Next..
          </div>
        </div>
      )}
    </form>
  );
};

export default Family;
