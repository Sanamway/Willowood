import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import * as Yup from "yup";

const Snapshot = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [snapshotData, setSnapshotData] = useState({
    prefix: "",
    firstName: "",
    midName: "",
    lastName: "",
    dob: "",
    age: "",
    grade: "",
    gender: "",
    bloodGroup: "",
    nationality: "",
    mobile: "",
    skillType: "",
    highestQualification: "",
    totalExperience: "",

    eStatus: "",

    applicationNo: "",
  });
  useEffect(() => {
    if (props)
      setSnapshotData({
        ...snapshotData,
        prefix: props.data?.prefix,
        firstName: props.data?.fname,
        midName: props.data?.mname,
        lastName: props.data?.lname,
        age: props.data?.age,
        grade: props.data?.grade,
        gender: props.data?.gen,
        dob: props.data?.dob,
        bloodGroup: props.data?.blgrp,
        nationality: props.data?.nationa,
        mobile: props.data?.phone_number,
        skillType: props.data?.skilltype,
        highestQualification: props.data?.hgtqual,
        totalExperience: props.data?.tot_exp,
        eStatus: props.data?.emp_status,

        applicationNo: props.data?.appl_no,
        eStatus: "Update Snapshot",
        position: props.data?.emppos,
      });
  }, [props.data]);

  const highestQualificationArray = [
    "10th",
    "10 +2",
    "Undegraduate",
    "Graduate",
    "Master Degree",
  ];

  const BloodGroupArray = [
    "A RhD positive (A+)",
    "A RhD negative (A-) ",
    "B RhD positive (B+)",
    "B RhD negative (B-)",
    "O RhD positive (O+)",
    "O RhD negative (O-)",
    "AB RhD positive (AB+)",
    "AB RhD negative (AB-)",
  ];

  const [skillData, setSkillData] = useState([]);

  // Getting Company Information for the dropdown values
  const getSkillInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employeeskill`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setSkillData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSkillInfo();
  }, []);
  const validationSchema = Yup.object().shape({
    mobile: Yup.string().matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Enter a valid Mobile"
    ),
  });
  const [loading, setLoading] = useState(false);

  const handleEditSnapshot = async () => {
    setLoading(true);
    try {
      await validationSchema.validate(snapshotData, { abortEarly: false });

      const {
        prefix,
        firstName,
        midName,
        lastName,
        dob,
        age,
        grade,
        gender,
        bloodGroup,
        nationality,
        mobile,
        skillType,
        highestQualification,
        totalExperience,
        eStatus,
        applicationNo,
        position,
      } = snapshotData;
      const data = {
        appl_no: applicationNo,
        prefix: prefix,
        fname: firstName,
        mname: midName,
        lname: lastName,
        age: age,
        grade: grade,
        gen: gender,
        dob: moment(dob).utc(),
        blgrp: bloodGroup,
        nationa: nationality,
        phone_number: mobile,
        skilltype: skillType,
        hgtqual: highestQualification,
        tot_exp: totalExperience,
        emp_status: eStatus,
        emppos: position,
        eStatus: "Update Snapshot",
      };
      const respond = await axios
        .put(
          `${url}/api/update_snapshot/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Snapshot edited successfully!");
          setTimeout(() => {
            props.formType("Personal");
            setLoading(false);
          }, [1000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      if (newErrors.mobile) toast.error(newErrors.mobile);
      setLoading(false);
    }
  };

  const allGradeArray = [
    "G1  ",
    "M3",
    "EX1",
    "W2",
    "W1",
    "GM4",
    "O3",
    "W5",
    "WT",
    "W4",
    "O1",
    "GET",
    "VP3",
    "GM3",
    "VP2",
    "MGT",
    "OT",
    "GT",
    "PGT",
    "ZM1",
    "ZM2",
    "M4",
    "ZM3",
    "M5",
    "M6",
    "RM1",
    "RM2",
    "RM3",
    "ZDM1",
    "ZDM2",
    "DM1",
    "O2",
    "DM2",
    "DM3",
    "DE1",
    "DE2",
    "DO1",
    "DO2",
    "SE1",
    "SE2",
    "SO1",
    "SO2",
    "EX3",
    "SO3",
    "DO3",
    "AM1",
    "AM2",
    "AM3",
    "SOT",
    "DOT",
    "GM1",
    "MR",
    "M1",
    "GM2",
    "EX2",
    "W3",
  ];
  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
        }}
      />

      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Basic Information
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-2 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Prefix
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.prefix}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, prefix: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
            </option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
        </div>
        <div className="w-2/3  lg:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> First Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="First Name"
            value={snapshotData.firstName}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, firstName: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  lg:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Middle Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Middle Name"
            value={snapshotData.midName}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, midName: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2  ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Last Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Last Name"
            value={snapshotData.lastName}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, lastName: e.target.value })
            }
          />
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Date of birth
          </label>

          {snapshotData.dob ? (
            <DatePicker
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
              dateFormat="dd-MM-yyyy"
              selected={new Date(snapshotData.dob)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>
                setSnapshotData({
                  ...snapshotData,
                  age: moment(new Date()).diff(moment(date), "years"),
                  dob: moment(date).format("LL"),
                })
              }
              maxDate={new Date(moment().subtract(18, "years"))}
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
                setSnapshotData({
                  ...snapshotData,
                  age: moment(new Date()).diff(moment(date), "years"),
                  dob: moment(date).format("LL"),
                })
              }
              maxDate={new Date(moment().subtract(18, "years"))}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-2 mt-2">
        <div className="w-2/3  px-2  lg:w-1/3 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Age
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Age"
            disabled
            value={snapshotData.age}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, age: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/3 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Grade
          </label>

          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.grade}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, grade: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
            </option>
            {allGradeArray.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-2 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Gender
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.gender}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, gender: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Blood Group
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.bloodGroup}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, bloodGroup: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {BloodGroupArray.map((item, idx) => (
              <option value={item} key={idx}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Nationality
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.nationality}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, nationality: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            <option value="Indian">Indian</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-2 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Mobile Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Mobile Number"
            value={snapshotData.mobile}
            onChange={(e) => {
              e.target.value.length !== 11 &&
                setSnapshotData({ ...snapshotData, mobile: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Skill Type
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.skillType}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, skillType: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {skillData.map((item) => (
              <option
                value={item.type_skill}
                className="focus:outline-none focus:border-b bg-white"
              >
                {item.type_skill}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Highest Qualification
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={snapshotData.highestQualification}
            onChange={(e) =>
              setSnapshotData({
                ...snapshotData,
                highestQualification: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              Option
            </option>
            {highestQualificationArray.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            <small className="text-red-600">*</small> Total Experience
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="inputField"
            placeholder="Total Experience"
            value={snapshotData.totalExperience}
            onChange={(e) =>
              setSnapshotData({
                ...snapshotData,
                totalExperience: e.target.value,
              })
            }
          />
        </div>
      </div>

      {router.query.type === "Edit" && (
        <div className="flex justify-start w-full ">
          <button
            className="text-center w-2/3 mt-12 bg-orange-500 lg: w-40   bg-green-700 px-4 py-1 text-white  cursor-pointer"
            disabled={loading === true}
            onClick={() => {
              handleEditSnapshot();
            }}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default Snapshot;
