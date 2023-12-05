import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const RegionForm = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [companyData, setCompanyData] = useState([]);

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
        params: { r_id: router.query.id },
      });
      const apires = await respond.data.data;

      setRegionState({
        companyId: apires[0].c_id,
        bgId: apires[0].bg_id,
        buId: apires[0].bu_id,
        zId: apires[0].z_id,
        hod: apires[0].hod_name,
        mobile: apires[0].mobile_no,
        email: apires[0].email_id,
        region: apires[0].region_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, [router]);

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
  const [regionState, setRegionState] = useState({});
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
      console.log(error);
      setBGData([]);
    }
  };

  useEffect(() => {
    getBGInfo(regionState.companyId);
  }, [regionState.companyId]);

  const [buData, setBUData] = useState([]);

  const getBUInfo = async (companyId, businessSegmentId) => {
    try {
      const respond = await axios.get(
        `${url}/api/get_business_unit_by_segmentId/${businessSegmentId}`,
        {
          headers: headers,
        }
      );
      const apires = await respond.data.data;

      setBUData(
        apires.filter((item) => Number(item.c_id) === Number(companyId))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [zoneData, setAllZoneData] = useState([]);
  const getAllRegionData = async (companyId, segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });

      const apires = await respond.data.data;
      console.log(
        "nio",
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
      setAllZoneData(
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (regionState.bgId && regionState.companyId && regionState.buId) {
      getAllRegionData(
        regionState.companyId,
        regionState.bgId,
        regionState.buId
      );
    } else {
      return;
    }
  }, [regionState.bgId, regionState.companyId, regionState.buId]);

  useEffect(() => {
    if (!regionState.bgId && !regionState.companyId) return;
    getBUInfo(regionState.companyId, regionState.bgId);
  }, [regionState.bgId, regionState.companyId]);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),
    zId: Yup.string().required("Zone is required"),
    region: Yup.string().required("Region is required"),
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
    hod: Yup.string().required("hod is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSaveRegion = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(regionState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(regionState.companyId),
        bu_id: Number(regionState.buId),
        bg_id: Number(regionState.bgId),
        z_id: Number(regionState.zId),
        mobile_no: regionState.mobile,
        hod_name: regionState.hod,
        email_id: regionState.email,
        region_name: regionState.region,
        c_name: "No Worries",
        ul_name: "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_region`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Region added successfully!");
          setTimeout(() => {
            router.push("/table/table_region");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("region_name_1")) {
        toast.error("Region already exist");
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

  const handleEditRegion = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(regionState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(regionState.companyId),
        bu_id: Number(regionState.buId),
        bg_id: Number(regionState.bgId),
        z_id: Number(regionState.zId),
        mobile_no: regionState.mobile,
        hod_name: regionState.hod,
        email_id: regionState.email,
        region_name: regionState.region,
        c_name: "No Worries",
        ul_name: "No Man",
      };
      const respond = await axios
        .put(
          `${url}/api/update_region/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Region edited successfully!");
          setTimeout(() => {
            router.push("/table/table_region");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("region_name_1")) {
        toast.error("Region already exist");
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
    if (router.query.type === "Add") handleSaveRegion(e);
    else {
      handleEditRegion(e);
    }
  };
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Region</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_region");
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

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start w-full ">
          <form
            className=" bg-white rounded shadow p-4 w-full  pb-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Region ID
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Region ID"
                value={
                  router.query.type === "Edit" || router.query.type === "View"
                    ? router.query.id
                    : "Auto Genrated"
                }
                disabled={true}
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
                  value={regionState.companyId}
                  onChange={(e) =>
                    setRegionState({
                      ...regionState,
                      companyId: e.target.value,
                    })
                  }
                >
                  <option value={""}>- Select -</option>
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
                  value={regionState.bgId}
                  disabled={!regionState.companyId}
                  onChange={(e) =>
                    setRegionState({
                      ...regionState,
                      bgId: e.target.value,
                    })
                  }
                >
                  <option value={""} >
                    - Select -
                  </option>
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
                  value={regionState.buId}
                  onChange={(e) =>
                    setRegionState({
                      ...regionState,
                      buId: e.target.value,
                    })
                  }
                >
                  <option value={" "}>- Select -</option>
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
                  htmlFor="userSelect"
                >
                  <small className="text-red-600">*</small> Zone
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="userSelect"
                  value={regionState.zId}
                  onChange={(e) =>
                    setRegionState({
                      ...regionState,
                      zId: e.target.value,
                    })
                  }
                >
                  <option value={""}>- Select -</option>
                  {zoneData.map((item, idx) => (
                    <option value={item.z_id} key={idx}>
                      {item.zone_name}
                    </option>
                  ))}
                </select>
                {formErrors.zId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.zId}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2 px-2 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneField"
              >
                <small className="text-red-600">*</small> Region
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                id="phoneField"
                placeholder="Region"
                value={regionState.region}
                onChange={(e) =>
                  setRegionState({ ...regionState, region: e.target.value })
                }
              />
              {formErrors.region && (
                <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                  {formErrors.region}
                </p>
              )}
            </div>
            <div className="w-1/2 px-2 mt-2 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneField"
              >
                <small className="text-red-600">*</small> H.O.D Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                id="phoneField"
                placeholder="H.O.D Name"
                value={regionState.hod}
                onChange={(e) =>
                  setRegionState({ ...regionState, hod: e.target.value })
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
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Mobile"
                  value={regionState.mobile}
                  onChange={(e) =>
                    setRegionState({ ...regionState, mobile: e.target.value })
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
                  value={regionState.email}
                  onChange={(e) =>
                    setRegionState({ ...regionState, email: e.target.value })
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
                  {router.query.type === "Edit" ? "Update" : "Save"}
                </div>
                <button
                  className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                  onClick={() => {
                    router.push("/table/table_region");
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

export default RegionForm;
