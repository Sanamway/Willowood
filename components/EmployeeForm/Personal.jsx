import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import Select from "react-select";
const Personal = (props) => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [roleId, setRoleId] = useState(null);
  useEffect(() => {
    if (window.localStorage) {
      const userInfo = JSON?.parse(localStorage?.getItem("userinfo"));
      setRoleId(userInfo?.role_id);
     
    }
  }, [props]);

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

    currentPin: "",
    permanentAddress: "",

    permanentPin: "",
    selectedPresentCity: {
      value: "",
      label: "",
      state: "",
      country: ""
    },
    selectedPermanentCity: {
      value: "",
      label: "",
      state: "",
      country: ""
    }
  });
  useEffect(() => {
    if (props)
      setPersonalData({
        ...personalData,
        pan: props.data?.pan || "",
        aadhar: props.data?.adhar || "",
        passport: props.data?.passport || "",
        DL: props.data?.dlno || "",
        email: props.data?.pemail || "",
        contactName: props.data?.emergency_con || "",
        contactNo: props.data?.emergency_conno || "",
        relation: props.data?.relation || "",
        currentAddress: props.data?.caddress || "",

        currentPin: props.data?.cpin || "",
        permanentAddress: props.data?.paddress || "",

        permanentPin: props.data?.ppin || "",
        selectedPresentCity: {
          value: props.data?.ccity,
          label: props.data?.ccity,
          state: props.data?.pstate,
          country: props.data?.pcountry
        },
        selectedPermanentCity: {
          value: props.data?.ccity,
          label: props.data?.ccity,
          state: props.data?.pstate,
          country: props.data?.pcountry
        }
      });
  }, [props]);

  const relationArray = ["Wife", "Husband", "Son", "Daughter", "Others"];

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email()
      .matches(/^(?!.*@[^,]*,)/),
    pan: Yup.string().matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Enter a valid PAN!!"),
    aadhar: Yup.string().matches(
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
      "Enter a valid Aadhar!!"
    ),
    contactNo: Yup.number()
      .transform((value, originalValue) => {
        if (originalValue === "") return undefined;
        return Number(value);
      })
      .required("Mobile No is required")
      .test("is-valid-number", "Invalid Mobile Number", (value) => {
        if (!value) return false;
        const stringValue = value.toString();
        return /^[6-9]\d{9}$/.test(stringValue);
      })
      .typeError("Mobile No must be a valid number")
  });

  const handleEditPersonal = async () => {
    try {
      // await validationSchema.validate(personalData, { abortEarly: false });
      let appStatus = "Update Personal"
      const {
        pan,
        aadhar,
        passport,
        DL,
        email,
        contactName,
        contactNo,
        relation,
        currentAddress,

        currentPin,
        permanentAddress,

        permanentPin,
        selectedPresentCity,
        selectedPermanentCity
      } = personalData;
      const data = {
        pan: pan,
        adhar: aadhar,
        passport: passport,
        // app_status: "Update Personal",
        dlno: DL,
        pemail: email,
        emergency_con: contactName,
        emergency_conno: contactNo,
        relation: relation,
        caddress: currentAddress,
        ccountry: selectedPresentCity.country,
        cstate: selectedPresentCity.state,
        ccity: selectedPresentCity.value,
        cpin: Number(currentPin),
        paddress: permanentAddress,
        pcountry: selectedPermanentCity.country,
        pstate: selectedPermanentCity.state,
        pcity: selectedPermanentCity.value,
        ppin: Number(permanentPin),
        sameabove: "Yes",
        emp_status: "Update Personal"
      };

      const modifiedData =  ![1,8,17].includes(roleId) ? { ...data, app_status: appStatus } : data;

      const respond = await axios
        .put(`${url}/api/update_personal/${router.query.id}`, JSON.stringify(modifiedData), {
          headers: headers,
          params :{roleId}
          
        })
        .then((res) => {
          if (!res) return;
          toast.success("Personal edited successfully!");
          setTimeout(() => {
            props.formType("Family");
          }, 1600);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      if (errorMessage) toast.error(errorMessage);

      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      if (newErrors.email) {
        toast.error(newErrors.email);
      } else if (newErrors.contactNo) {
        toast.error(newErrors.contactNo);
      } else if (newErrors.pan) {
        toast.error(newErrors.pan);
      } else if (newErrors.aadhar) {
        toast.error(newErrors.aadhar);
      } else {
        return;
      }
    }
  };

  const [filteredCityOptn, setFilteredCityOptn] = useState([]);
  const [citySearchState, setCitySearchState] = useState("");

  useEffect(() => {
    if (!citySearchState) return;
    getAllCityData(citySearchState);
  }, [citySearchState]);

  const getAllCityData = async (city) => {
    try {
      const respond = await axios.get(`${url}/api/get_citystate`, {
        params: { city: city, search: true },
        headers: headers
      });
      const apires = await respond.data.data;

      setFilteredCityOptn(
        apires.map((item) => {
          return {
            value: item.city,
            label: item.city,
            state: item.state,
            country: item.country
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log("PersonalDetails", personalData);

  const [prevPostAdd, setPrevPostAdd] = useState({
    address: "",
    city: "",
    state: "",
    pin: ""
  });

  const handleSameasPresent = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setPersonalData({
        ...personalData,
        permanentAddress: personalData.currentAddress,
        selectedPermanentCity: personalData.selectedPresentCity,
        selectedPermanentState: personalData.selectedPresentCity.state,
        selectedPermanentCountry: personalData.selectedPresentCity.country,
        permanentPin: personalData.currentPin
      });
      setPrevPostAdd({
        ...prevPostAdd,
        address: personalData.permanentAddress,
        city: personalData.selectedPermanentCity,
        state: personalData.selectedPermanentCity.state,
        pin: personalData.permanentPin
      });
    } else {
      setPersonalData({
        ...personalData,
        permanentAddress: prevPostAdd.address,
        selectedPermanentCity: prevPostAdd.city,
        selectedPermanentState: prevPostAdd.state,
        permanentPin: prevPostAdd.pin
      });
    }
  };

  const [disableNext, setDisableNext] = useState(false);
  
  // useEffect(() => {
  //   if (props) {
  //     try {
  //       if (
  //         props?.data?.app_status == "Approved By Region" ||
  //         props?.data?.app_status == "Approved By Zonal" ||
  //         props?.data?.app_status == "Approved By Business Unit" ||
  //         props?.data?.app_status == "Approved By Zonal A/c Manager"
  //       ) {
  //         setDisableNext(false);
  //       }
  //     } catch (error) {
  //       // console.log("Error", error);
  //     }
  //   }
  // }, [props]);

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

  return (
    <form className=" bg-white rounded shadow p-4 w-full pb-20" onSubmit={(e) => e.preventDefault()}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 500
        }}
      />
      <div className="flex bg-gray-100 w-full h-8  text-slate-400  items-center text-slate-00  pl-2 mb-2 lg:w-full">
        Identification Details
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">*</span> PAN no
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="Pan"
            placeholder="PAN no"
            value={personalData.pan}
            onChange={(e) => {
              e.target.value.length !== 13 &&
                setPersonalData({
                  ...personalData,
                  pan: e.target.value.toUpperCase()
                });
            }}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">*</span> Aadhar no.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="aadhar"
            placeholder="Aadhar no."
            value={personalData.aadhar}
            onChange={(e) => {
              e.target.value.length !== 13 && setPersonalData({ ...personalData, aadhar: e.target.value });
            }}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            {/* <span className="text-red-500">* </span> */}
            Passport no.
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="passport"
            placeholder="Passport no."
            value={personalData.passport}
            onChange={(e) => setPersonalData({ ...personalData, passport: e.target.value.toUpperCase() })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/3 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">* </span>
            D.L Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="dl number"
            placeholder="D.L Number"
            value={personalData.DL}
            onChange={(e) => setPersonalData({ ...personalData, DL: e.target.value.toUpperCase() })}
          />
        </div>
      </div>

      <div className="flex bg-gray-100 text-slate-400 w-full h-8  items-center pl-2 mb-2 lg:w-full">
        Contact Details
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">*</span> Personal email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="email"
            placeholder="Personal Email"
            value={personalData.email}
            onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">*</span> Emergency contact name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            placeholder="Emergency contact name"
            value={personalData.contactName}
            onChange={(e) => {
              setPersonalData({
                ...personalData,
                contactName: e.target.value
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <small className="text-red-600">*</small> Emergency contact no
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="phone"
            placeholder="Emergency contact no"
            value={personalData.contactNo}
            minLength={10}
            maxLength={10}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                return;
              }
              setPersonalData({ ...personalData, contactNo: e.target.value });
            }}
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">*</span> Relation
          </label>
          <select
            className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
            id="stateSelect"
            value={personalData.relation}
            onChange={(e) => setPersonalData({ ...personalData, relation: e.target.value })}
          >
            <option value="" className="focus:outline-none focus:border-b bg-white">
              -- Select --
            </option>
            {relationArray.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex bg-gray-100 text-slate-400 w-full h-8 text-sm items-center  pl-2 mb-2 lg:w-full">
        Present Residence
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            <span className="text-red-500">*</span> Current Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="address"
            placeholder="Current Address"
            value={personalData.currentAddress}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                currentAddress: e.target.value
              })
            }
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Current City
          </label>
          <Select
            className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            value={personalData.selectedPresentCity}
            isSearchable={true}
            name="color"
            options={filteredCityOptn}
            onChange={(value) =>
              setPersonalData({
                ...personalData,
                selectedPresentCity: value
              })
            }
            onInputChange={(searchVal) => setCitySearchState(searchVal)}
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Current State
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="state"
            value={personalData.selectedPresentCity.state}
            placeholder="State"
            disabled
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Current Country
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="country"
            placeholder="Country"
            value={personalData.selectedPresentCity.country}
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Current pin
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="pincode"
            placeholder="Current pin"
            maxLength={6}
            minLength={6}
            value={personalData.currentPin}
            onChange={(e) => {
              if (e.target.value.length > 6) {
                return;
              }
              setPersonalData({ ...personalData, currentPin: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex bg-gray-100 text-sm text-slate-400 w-full h-8   items-center  pl-2 mb-2 relative lg:w-full">
        Permanent Residence
        <span className="absolute right-8 text-sm">
          <input
            className="mr-2 text-center"
            type="checkbox"
           
            onChange={handleSameasPresent}
          />
          Same as present
        </span>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Permanent Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            id="address"
            placeholder="Permanent Address"
            value={personalData.permanentAddress}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                permanentAddress: e.target.value
              })
            }
          />
        </div>
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Permanent City
          </label>
          <Select
            className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            value={personalData.selectedPermanentCity}
            isSearchable={true}
            name="color"
            options={filteredCityOptn}
            onChange={(value) =>
              setPersonalData({
                ...personalData,
                selectedPermanentCity: value
              })
            }
            onInputChange={(searchVal) => setCitySearchState(searchVal)}
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Permanent State
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="phoneField"
            placeholder="State"
            value={personalData.selectedPermanentCity.state}
            disabled
          />
        </div>
      </div>
      <div className="flex flex-col gap-2   lg:flex-row -mx-2 mb-8 ">
        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Permanent Country
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            id="phoneField"
            placeholder="Country"
            value={personalData.selectedPermanentCity.country}
            disabled
          />
        </div>

        <div className="w-full  px-2  lg:w-1/2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
            Permanent pin
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
            type="number"
            id="pincode"
            maxLength={6}
            minLength={6}
            placeholder="Permanent pin"
            value={personalData.permanentPin}
            onChange={(e) => {
              if (e.target.value.length > 6) {
                return;
              }
              setPersonalData({ ...personalData, permanentPin: e.target.value });
            }}
          />
        </div>
      </div>
      {router.query.type === "Edit" && (
        <div className="flex items-center justify-center w-full gap-4 py-4">
          <button
            className="text-center rounded-md bg-green-500 text-white py-1 px-4 text-lg"
            onClick={() => props.formType("Snapshot")}
          >
            Prev
          </button>
          <button
            disabled={disableNext}
            className=" text-center rounded-md bg-orange-500 text-white py-1 px-4 text-lg"
            onClick={() => {
              handleEditPersonal();
            }}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default Personal;
