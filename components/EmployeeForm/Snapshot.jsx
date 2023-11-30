import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Snapshot = (props) => {
  const [formActive, setFormActive] = useState(false);
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

    company: "",
    bSegment: "",
    bUnit: "",
    zone: "",
    region: "",
    territory: "",
  });
  useEffect(() => {
    if (props)
      setSnapshotData({
        ...snapshotData,
        prefix: props.data?.prefix || "",
        firstName: props.data?.fname || "",
        midName: props.data?.mname || "",
        lastName: props.data?.lname || "",
        age: props.data?.age || "",
        grade: props.data?.grade || "",
        gender: props.data?.gen || "",
        dob: props.data?.dob || "",
        bloodGroup: props.data?.blgrp || "",
        nationality: props.data?.nationa || "",
        mobile: props.data?.phone_number || "",
        skillType: props.data?.skillType || "",
        highestQualification: props.data?.hgtqual || "",
        totalExperience: props.data?.tot_exp || "",
        eStatus: props.data?.emp_status || "",

        company: props.data?.c_id || "",
        bSegment: props.data?.bg_id || "",
        bUnit: props.data?.bu_id || "",
        zone: props.data?.z_id || "",
        region: props.data?.r || "",
        territory: props.data?.t_id || "",
        eStatus: props.data?.emp_status,
      });
  }, [props]);

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

  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
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
            <small className="text-red-600">*</small> Middle Name
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
          <DatePicker
            value={snapshotData.dob}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
          />
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
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Grade"
            value={snapshotData.grade}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, grade: e.target.value })
            }
          />
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
            type="text"
            id="inputField"
            placeholder="Mobile Number"
            value={snapshotData.mobile}
            onChange={(e) =>
              setSnapshotData({ ...snapshotData, mobile: e.target.value })
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
            <option value="state1">Mr.</option>
            <option value="state2">Mrs.</option>
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
            type="text"
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

      

      <div className="flex justify-start w-full ">
        <div
          className="text-center w-2/3 mt-12 bg-orange-500 lg: w-40   bg-green-700 px-4 py-1 text-white  pointer"
          onClick={() => props.formType("Personal")}
        >
          Next
        </div>
      </div>
    </form>
  );
};

export default Snapshot;
