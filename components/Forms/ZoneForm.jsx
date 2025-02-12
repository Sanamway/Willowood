import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const ZoneForm = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
        params: { z_id: router.query.id },
      });
      const apires = await respond.data.data;

      setZoneState({
        companyId: apires[0].c_id,
        bgId: apires[0].bg_id,
        buId: apires[0].bu_id,
        zone: apires[0].zone_name,
        hod: apires[0].hod_name,
        mobile: apires[0].mobile_no,
        email: apires[0].email_id,
        mrkt: apires[0].zdm_name,
        mrktMobile: apires[0].zdm_mobile_no,
        mrktEmail: apires[0].zdm_email_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, [router]);

  const [companyData, setCompanyData] = useState([]);

  // Getting Company Information for the dropdown values
  const getCompanyInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setCompanyData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const [bgData, setBGData] = useState([]);
  const [zoneState, setZoneState] = useState({
    bgId: "",
    buId: "",
    companyId: "",
    zone: "",
    hod: "",
    mobile: "",
    email: "",
    mrkt: "",
    mrktMobile: "",
    mrktEmail: "",
  });
  // Getting Company Information for the dropdown values
  const getBGInfo = async (companyId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_company_wise_business_segment/${companyId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBGData(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      setBGData([]);
    }
  };

  useEffect(() => {
    getBGInfo(zoneState.companyId);
  }, [zoneState.companyId]);

  const [buData, setBUData] = useState([]);

  const getBUInfo = async (businessSegmentId, companyId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBUData(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBUInfo(zoneState.bgId, zoneState.companyId);
  }, [zoneState.bgId, zoneState.companyId]);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    zone: Yup.string().required("Zone is required"),
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),

    // Email validation: simplify it while retaining the no-commas rule
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .matches(/^(?!.*@[^,]*,)/, "Email cannot contain commas"),

    // Mobile validation: use string instead of number and correct the transformation logic
    mobile: Yup.string()
      .required("Mobile No is required")

      .typeError("Mobile No must be a valid number"),

    hod: Yup.string().required("HOD is required"),
    mrkt: Yup.string().required("Market is required"),

    // Market mobile validation: similarly corrected as the mobile field
    mrktMobile: Yup.string()
      .required("Market Mobile No is required")

      .typeError("Mobile No must be a valid number"),

    // Market email validation: simplified as the email field
    mrktEmail: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .matches(/^(?!.*@[^,]*,)/, "Email cannot contain commas"),
  });

  const [formErrors, setFormErrors] = useState({});
  const handleSaveZone = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(zoneState, {
        abortEarly: false,
      });
      const data = {
        c_id: zoneState.companyId,
        bu_id: zoneState.buId,
        bg_id: zoneState.bgId,
        mobile_no: zoneState.mobile,
        hod_name: zoneState.hod,
        email_id: zoneState.email,
        zone_name: zoneState.zone,
        c_name: "No Worries",
        ul_name: "No Man",
        zdm_name: zoneState.mrkt,
        zdm_mobile_no: zoneState.mrktMobile,
        zdm_email_id: zoneState.mrktEmail,
      };
      const respond = await axios
        .post(`${url}/api/add_zone`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Zone added successfully!");
          setTimeout(() => {
            router.push("/table/table_zone");
          }, [3000]);
        });
    } catch (errors) {
      console.log("zxc", errors)
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("zone_name_1")) {
        toast.error("Zone already exist");
      } else {
        toast.error(errorMessage);
      }

      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const handleEditZone = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(zoneState, {
        abortEarly: false,
      });
      const data = {
        c_id: zoneState.companyId,
        bu_id: zoneState.buId,
        bg_id: zoneState.bgId,
        mobile_no: zoneState.mobile,
        hod_name: zoneState.hod,
        email_id: zoneState.email,
        zone_name: zoneState.zone,
        c_name: "No Worries",
        ul_name: "No Man",
        zdm_name: zoneState.mrkt,
        zdm_mobile_no: zoneState.mrktMobile,
        zdm_email_id: zoneState.mrktEmail,
      };
      const respond = await axios
        .put(
          `${url}/api/update_zone/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Zone edited successfully!");
          setTimeout(() => {
            router.push("/table/table_zone");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("zone_name_1")) {
        toast.error("Zone already exist");
      } else {
        toast.error(errorMessage);
      }
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const handleSave = (e) => {
    if (router.query.type === "Add") handleSaveZone(e);
    else {
      handleEditZone(e);
    }
  };

  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className=" w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Zone</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_zone");
                }}
                className="text-gray-400"
                size={35}
              />
            </h2>
            <h2>
              <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
            </h2>
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  flex items-start w-full h-screen  ">
          <form
            className=" bg-white rounded shadow p-4 w-full  "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Zone ID
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Zone ID"
                value={
                  router.query.type === "Edit" || router.query.type === "View"
                    ? router.query.id
                    : "Auto Generated"
                }
                disabled
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="citySelect"
                >
                  <small className="text-red-600">*</small> Company
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                  value={zoneState.companyId}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      companyId: e.target.value,
                    })
                  }
                >
                  <option value="">- Select -</option>
                  {companyData.map((item, idx) => (
                    <option value={item.c_id} key={idx}>
                      {item.cmpny_name}
                    </option>
                  ))}
                </select>
                {formErrors.companyId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.companyId}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                >
                  <small className="text-red-600">*</small> Business Segment
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={zoneState.bgId}
                  disabled={!zoneState.companyId}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      bgId: e.target.value,
                    })
                  }
                >
                  <option value="">- Select -</option>
                  {bgData.map((item, idx) => (
                    <option value={item.bg_id} key={idx}>
                      {item.business_segment}
                    </option>
                  ))}
                </select>
                {formErrors.bgId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.bgId}
                  </p>
                )}
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userSelect"
                >
                  <small className="text-red-600">*</small> Unit Division
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="userSelect"
                  value={zoneState.buId}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      buId: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    - Select -
                  </option>
                  {buData.map((item, idx) => (
                    <option value={item.bu_id} key={idx}>
                      {item.business_unit_name}
                    </option>
                  ))}
                </select>
                {formErrors.buId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.buId}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="emailField"
                >
                  <small className="text-red-600">*</small> Zone
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="emailField"
                  placeholder="Zone"
                  value={zoneState.zone}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      zone: e.target.value,
                    })
                  }
                />
                {formErrors.zone && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.zone}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full gap-4 px-2 relative ">
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="emailField"
                >
                  <small className="text-red-600">*</small> Sales Person
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="emailField"
                  placeholder="Sales Person Name"
                  value={zoneState.hod}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      hod: e.target.value,
                    })
                  }
                />
                {formErrors.hod && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.hod}
                  </p>
                )}
              </div>
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Mobile
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="number"
                  id="inputField"
                  placeholder="Mobile"
                  value={zoneState.mobile}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      mobile: e.target.value,
                    })
                  }
                />
                {formErrors.mobile && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.mobile}
                  </p>
                )}
              </div>
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  id="inputField"
                  placeholder="Email"
                  value={zoneState.email}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      email: e.target.value,
                    })
                  }
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row w-full gap-4 px-2 relative mt-2 ">
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="emailField"
                >
                  <small className="text-red-600">*</small> Marketing Person Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="emailField"
                  placeholder="H.O.D Name"
                  value={zoneState.mrkt}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      mrkt: e.target.value,
                    })
                  }
                />
                {formErrors.mrkt && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.mrkt}
                  </p>
                )}
              </div>
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Mobile
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="number"
                  id="inputField"
                  placeholder="Mobile"
                  value={zoneState.mrktMobile}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      mrktMobile: e.target.value,
                    })
                  }
                />
                {formErrors.mrktMobile && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.mrktMobile}
                  </p>
                )}
              </div>
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Email
                </label>
                {console.log("kzs", zoneState)}
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  id="inputField"
                  placeholder="Email"
                  value={zoneState.mrktEmail}
                  onChange={(e) =>
                    setZoneState({
                      ...zoneState,
                      mrktEmail: e.target.value,
                    })
                  }
                />
                {formErrors.mrktEmail && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.mrktEmail}
                  </p>
                )}
              </div>
            </div>

            {router.query.type !== "View" && (
              <div className="button flex items-center gap-3 mt-6">
                <div
                  className="bg-green-700 px-4 py-1 text-white cursor-pointer"
                  onClick={(e) => handleSave(e)}
                >
                  {router.query.type !== "Add" ? "Update" : "Save"}{" "}
                </div>
                <button
                  className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                  onClick={() => {
                    router.push("/table/table_zone");
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ZoneForm;
