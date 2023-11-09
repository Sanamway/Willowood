import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const BusinessUnit = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_business_unit`, {
        headers: headers,
        params: { bu_id: router.query.id },
      });
      const apires = await respond.data.data;

      setBusinessUnitState({
        companyId: apires[0].c_id,
        bgId: apires[0].bg_id,
        unitDivision: apires[0].business_unit_name,
        hod: apires[0].hod_name,
        mobile: apires[0].mobile_no,
        email: apires[0].email_id,
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
  const [businessSegmentData, setBusinessSegmentData] = useState([]);

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

  const getBusinessSegmentInfo = async (companyId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_company_wise_business_segment/${companyId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBusinessSegmentData(
        apires.filter((item, idx) => item.isDeleted === false)
      );
    } catch (error) {
      setBusinessSegmentData([]);
    }
  };

  const [businessUnitState, setBusinessUnitState] = useState({
    companyId: "",
    bgId: "",
    unitDivision: "",
    hod: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    getBusinessSegmentInfo(businessUnitState.companyId);
  }, [businessUnitState.companyId]);
  useEffect(() => {
    getCompanyInfo();
  }, []);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company  is required"),
    bgId: Yup.string().required("Business Segment is required"),
    unitDivision: Yup.string().required("Business Unit Division is required"),
    email: Yup.string()
      .required("Email is required")
      .email()
      .matches(/^(?!.*@[^,]*,)/),
    mobile: Yup.number()
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
      .typeError("Mobile No must be a valid number"),
    hod: Yup.string().required("H.O.D is required"),
  });

  const [formErrors, setFormErrors] = useState({});
  const handleSaveBusinessUnit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(businessUnitState, {
        abortEarly: false,
      });
      const data = {
        c_id: businessUnitState.companyId,
        bg_id: businessUnitState.bgId,
        business_unit_name: businessUnitState.unitDivision,
        mobile_no: businessUnitState.mobile,
        hod_name: businessUnitState.hod,
        email_id: businessUnitState.email,
        c_name: "No Worries",
        ul_name: "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_business_unit`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Business Unit added successfully!");
          setTimeout(() => {
            router.push("/table/table_business_unit_division");
          }, [2000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("business_unit_name_1")) {
        toast.error("Business Unit already exist");
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

  const handleEditBusinessUnit = async (e) => {
    e.preventDefault();
    try {
      // Validate the form data

      await validationSchema.validate(businessUnitState, {
        abortEarly: false,
      });
      const data = {
        c_id: businessUnitState.companyId,
        bg_id: businessUnitState.bgId,
        business_unit_name: businessUnitState.unitDivision,
        mobile_no: businessUnitState.mobile,
        hod_name: businessUnitState.hod,
        email_id: businessUnitState.email,
        c_name: "No Worries",
        ul_name: "No Man",
      };
      const respond = await axios
        .put(
          `${url}/api/update_business_unit/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Business Unit Division edited successfully!");
          setTimeout(() => {
            router.push("/table/table_business_unit_division");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("business_unit_name_1")) {
        toast.error("Business Unit already exist");
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
    if (router.query.type !== "Edit") handleSaveBusinessUnit(e);
    handleEditBusinessUnit(e);
  };
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Business Unit Division
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_business_unit_division");
                }}
                className="text-gray-400"
                size={35}
              />
            </h2>
            <h2>
              <AiTwotoneHome
                className="text-red-500"
                size={34}
                onClick={() => {
                  router.push("/");
                }}
              />
            </h2>
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start h-full ">
          <form
            className=" bg-white rounded shadow p-4 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                B.U Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                disabled={true}
                value={
                  router.query.type === "Edit" || router.query.type === "View"
                    ? router.query.id
                    : "Auto Genrated"
                }
                placeholder="B.U Id"
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
                  value={businessUnitState.companyId}
                  onChange={(e) =>
                    setBusinessUnitState({
                      ...businessUnitState,
                      companyId: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    - Select -
                  </option>
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
                  htmlFor="citySelect"
                >
                  <small className="text-red-600">*</small> Business Segment
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                  value={businessUnitState.bgId}
                  disabled={!businessUnitState.companyId}
                  onChange={(e) =>
                    setBusinessUnitState({
                      ...businessUnitState,
                      bgId: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    - Select -
                  </option>
                  {businessSegmentData.map((item, idx) => (
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
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Unit Division
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Unit Division"
                  value={businessUnitState.unitDivision}
                  onChange={(e) =>
                    setBusinessUnitState({
                      ...businessUnitState,
                      unitDivision: e.target.value,
                    })
                  }
                />
                {formErrors.unitDivision && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.unitDivision}
                  </p>
                )}
              </div>
            </div>

            <div className="w-1/2 px-2 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> H.O.D Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="H.O.D Name"
                value={businessUnitState.hod}
                onChange={(e) =>
                  setBusinessUnitState({
                    ...businessUnitState,
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
            <div className="flex w-full justify-between gap-4 mt-4 mb-4">
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Mobile
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 "
                  type="text"
                  id="inputField"
                  placeholder="Mobile"
                  value={businessUnitState.mobile}
                  onChange={(e) =>
                    setBusinessUnitState({
                      ...businessUnitState,
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
                  value={businessUnitState.email}
                  onChange={(e) =>
                    setBusinessUnitState({
                      ...businessUnitState,
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

            {router.query.type !== "View" && (
              <div className="button flex items-center gap-3 mt-6">
                <div
                  className="bg-green-700 px-4 py-1 text-white cursor-pointer"
                  onClick={(e) => handleSave(e)}
                >
                  {router.query.type === "Edit" ? "Update" : "Save"}{" "}
                </div>
                <button
                  className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                  onClick={() => {
                    router.push("/table/table_business_segment");
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

export default BusinessUnit;
