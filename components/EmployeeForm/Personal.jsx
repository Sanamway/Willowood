import React, { useState, useEffect } from "react";

const Personal = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [personalData, setPersonalData] = useState({
    pan: "",
    aadhar: "",
    passport: "",
    DL: "",
    email: "",
    contactName: "",
    contactNo: "",
    relation: "",
    currentAddress: "",
    currentCountry: "",
    currentState: "",
    currentCity: "",
    currentPin: "",
    permanentAddress: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentPin: "",
  });
  useEffect(() => {
    if (props)
      setPersonalData({
        ...personalData,
        pan: props.data?.pan || "",
        aadhar: props.data?.adhar || "",
        passport: props.data?.pan || "",
        DL: props.data?.pan || "",
        email: props.data?.pan || "",
        contactName: props.data?.emergency_con || "",
        contactNo: props.data?.emergency_conno || "",
        relation: props.data?.relation || "",
        currentAddress: props.data?.caddress || "",
        currentCountry: props.data?.ccountry || "",
        currentState: props.data?.cstate || "",
        currentCity: props.data?.ccity || "",
        currentPin: props.data?.cpin || "",
        permanentAddress: props.data?.paddress || "",
        permanentCountry: props.data?.pcountry || "",
        permanentState: props.data?.pstate || "",
        permanentCity: props.data?.pcity || "",
        permanentPin: props.data?.ppin || "",
      });
  }, [props]);

  const relationArray = ["Wife", "Husband", "Son", "Daughter", "Others"];
  return (
    <form
      className=" bg-white rounded shadow p-4 w-full pb-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex bg-gray-100 w-2/3 h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Identification Details
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            PAN no
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="PAN no"
            value={personalData.pan}
            onChange={(e) =>
              setPersonalData({ ...personalData, pan: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Aadhar no.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Aadhar no."
            value={personalData.aadhar}
            onChange={(e) =>
              setPersonalData({ ...personalData, aadhar: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Passport no.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Passport no."
            value={personalData.passport}
            onChange={(e) =>
              setPersonalData({ ...personalData, passport: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/3 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            D.L Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="D.L Number"
            value={personalData.DL}
            onChange={(e) =>
              setPersonalData({ ...personalData, DL: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex bg-gray-100 text-slate-400 w-2/3 h-8  items-center pl-2 mb-2 lg:w-full">
        Contact Details
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Personal email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Personal Email"
            value={personalData.email}
            onChange={(e) =>
              setPersonalData({ ...personalData, email: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Emergency contact name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Emergency contact name"
            value={personalData.contactName}
            onChange={(e) =>
              setPersonalData({ ...personalData, contactName: e.target.value })
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
            <small className="text-red-600">*</small> Emergency contact no
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Emergency contact no"
            value={personalData.contactNo}
            onChange={(e) =>
              setPersonalData({ ...personalData, contactNo: e.target.value })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Relation
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.relation}
            onChange={(e) =>
              setPersonalData({ ...personalData, relation: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
            </option>
            {relationArray.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex bg-gray-100 text-slate-400 w-2/3 h-8  items-center  pl-2 mb-2 lg:w-full">
        Present Residence
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Current Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Current Address"
            value={personalData.currentAddress}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                currentAddress: e.target.value,
              })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Current Country
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.currentCountry}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                currentCountry: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
            </option>
            <option value="Others">Others</option>
            <option value="India">India</option>
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Current State
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.currentState}
            onChange={(e) =>
              setPersonalData({ ...personalData, currentState: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
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
            Current City
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.currentCity}
            onChange={(e) =>
              setPersonalData({ ...personalData, currentCity: e.target.value })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
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
            Current pin
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Current pin"
            value={personalData.currentPin}
            onChange={(e) =>
              setPersonalData({ ...personalData, currentPin: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex bg-gray-100 text-slate-400 w-2/3 h-8  items-center  pl-2 mb-2 relative lg:w-full">
        Permanent Residence
        <span className="absolute right-10">
          <input
            className="mr-4 self-center"
            type="checkbox"
            onClick={() =>
              setPersonalData({
                ...personalData,
                permanentAddress: personalData.currentAddress,
                permanentCountry: personalData.currentCountry,
                permanentState: personalData.currentState,
                permanentCity: personalData.currentCity,
                permanentPin: personalData.currentPin,
              })
            }
          />
          Same as present
        </span>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Permanent Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Permanent Address"
            value={personalData.permanentAddress}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                permanentAddress: e.target.value,
              })
            }
          />
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Permanent Country
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.permanentCountry}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                permanentCountry: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
            </option>
            <option value="Others">Others</option>
            <option value="India">India</option>
          </select>
        </div>
        <div className="w-2/3  px-2  lg:w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Permanent State
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.permanentState}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                permanentState: e.target.value,
              })
            }
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
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
            value={personalData.permanentCity}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                permanentCity: e.target.value,
              })
            }
          >
            Permanent City
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
          >
            <option
              value=""
              className="focus:outline-none focus:border-b bg-white"
            >
              -- Select --
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
            Permanent pin
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="inputField"
            placeholder="Permanent pin"
            value={personalData.permanentPin}
            onChange={(e) =>
              setPersonalData({ ...personalData, permanentPin: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex justify-between  gap-2 w-2/3 mt-12  flex gap-1 lg:w-1/2   overflow-hidden  px-4 py-1 text-white  pointer">
        <div
          className="w-full  text-center  bg-green-700 px-4 py-1 text-white cursor-pointer"
          onClick={() => props.formType("Snapshot")}
        >
          ...Prev
        </div>
        <div
          className=" w-full text-center bg-orange-400 px-4 py-1 text-white cursor-pointer"
          onClick={() => props.formType("Family")}
        >
          Next..
        </div>
      </div>
    </form>
  );
};

export default Personal;
