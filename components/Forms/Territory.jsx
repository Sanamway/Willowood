import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const Territory = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [companyData, setCompanyData] = useState([]);

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
        params: { t_id: router.query.id },
      });
      const apires = await respond.data.data;

      setTerritoryState({
        companyId: apires[0].c_id,
        bgId: apires[0].bg_id,
        buId: apires[0].bu_id,
        zoneId: apires[0].z_id,
        hod: apires[0].hod_name,
        mobile: apires[0].mobile_no,
        email: apires[0].email_id,
        regionId: apires[0].r_id,
        territory: apires[0].territory_name,
        costCenter: apires[0].cost_center,
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
  const [territoryState, setTerritoryState] = useState({
    bgId: "",
    buId: "",
    companyId: "",
    zoneId: "",
    regionId: "",
    territory: "",
    hod: "",
    costCenter: "",
    mobile: "",
    email: "",
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
      console.log(error);
      setBGData([]);
    }
  };

  useEffect(() => {
    getBGInfo(territoryState.companyId);
  }, [territoryState.companyId]);

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
  const getAllZoneData = async (companyId, segmentId, businessUnitId) => {
    try {
      const respond = await axios.get(`${url}/api/get_zone`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllZoneData(
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (
      territoryState.bgId &&
      territoryState.companyId &&
      territoryState.buId
    ) {
      getAllZoneData(
        territoryState.companyId,
        territoryState.bgId,
        territoryState.buId
      );
    } else {
      return;
    }
  }, [territoryState.bgId, territoryState.companyId, territoryState.buId]);

  const [regionData, setAllRegionData] = useState([]);
  const getAllRegionData = async (
    companyId,
    segmentId,
    businessUnitId,
    zoneId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_region`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setAllRegionData(
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (
      territoryState.bgId &&
      territoryState.companyId &&
      territoryState.buId &&
      territoryState.zoneId
    ) {
      getAllRegionData(
        territoryState.companyId,
        territoryState.bgId,
        territoryState.buId,
        territoryState.zoneId
      );
    } else {
      return;
    }
  }, [
    territoryState.bgId,
    territoryState.companyId,
    territoryState.buId,
    territoryState.zoneId,
  ]);

  useEffect(() => {
    if (!territoryState.bgId && !territoryState.companyId) return;
    getBUInfo(territoryState.companyId, territoryState.bgId);
  }, [territoryState.bgId, territoryState.companyId]);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),
    zoneId: Yup.string().required("Zone is required"),
    regionId: Yup.string().required("Region is required"),
    territory: Yup.string().required("Territory is required"),
    hod: Yup.string().required("hod is required"),
    costCenter: Yup.string().required("Cost Center is required"),
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
    email: Yup.string().required("Email is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSaveTerritory = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(territoryState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(territoryState.companyId),
        bu_id: Number(territoryState.buId),
        bg_id: Number(territoryState.bgId),
        z_id: Number(territoryState.zoneId),
        r_id: Number(territoryState.regionId),
        territory_name: territoryState.territory,
        hod_name: territoryState.hod,
        c_name: "No Worries",
        ul_name: "No Man",
        mobile_no: territoryState.mobile,
        email_id: territoryState.email,
        cost_center: territoryState.costCenter,
      };
      const respond = await axios
        .post(`${url}/api/add_territory`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Territory added successfully!");
          setTimeout(() => {
            router.push("/table/table_territory");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("territory_name_1")) {
        toast.error("Territory already exist");
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

  const handleEditTerritory = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(territoryState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(territoryState.companyId),
        bu_id: Number(territoryState.buId),
        bg_id: Number(territoryState.bgId),
        z_id: Number(territoryState.zoneId),
        r_id: Number(territoryState.regionId),
        territory_name: territoryState.territory,
        hod_name: territoryState.hod,
        c_name: "No Worries",
        ul_name: "No Man",
        mobile_no: territoryState.mobile,
        email_id: territoryState.email,
        cost_center: territoryState.costCenter,
      };
      const respond = await axios
        .put(
          `${url}/api/update_territory/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Territory edited successfully!");
          setTimeout(() => {
            router.push("/table/table_territory");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("territory_name_1")) {
        toast.error("Territory already exist");
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
    if (router.query.type === "Add") handleSaveTerritory(e);
    else {
      handleEditTerritory(e);
    }
  };
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="  w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Territory</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_territory");
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

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start  min-h-screen   ">
          <form
            className="bg-white rounded shadow p-4 w-full    "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Territory Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Territory Id"
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
                  value={territoryState.companyId}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
                      companyId: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
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
            </div>

            <div className="flex -mx-2 mb-4">
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
                  value={territoryState.bgId}
                  disabled={!territoryState.companyId}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
                      bgId: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
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
                  value={territoryState.buId}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
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
            </div>

            <div className="flex -mx-2 mb-4">
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
                  value={territoryState.zoneId}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
                      zoneId: e.target.value,
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
                {formErrors.zoneId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.zoneId}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userSelect"
                >
                  <small className="text-red-600">*</small> Region
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="userSelect"
                  value={territoryState.regionId}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
                      regionId: e.target.value,
                    })
                  }
                >
                  <option value={""}>- Select -</option>
                  {regionData.map((item, idx) => (
                    <option value={item.r_id} key={idx}>
                      {item.region_name}
                    </option>
                  ))}
                </select>
                {formErrors.regionId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.regionId}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4 w-1/2 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Territory Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Territory"
                value={territoryState.territory}
                onChange={(e) =>
                  setTerritoryState({
                    ...territoryState,
                    territory: e.target.value,
                  })
                }
              />
              {formErrors.territory && (
                <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                  {formErrors.territory}
                </p>
              )}
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2 mt-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneField"
                >
                  <small className="text-red-600">*</small> Cost Center
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="phoneField"
                  placeholder="Cost Center"
                  value={territoryState.costCenter}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
                      costCenter: e.target.value,
                    })
                  }
                />
                {formErrors.costCenter && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.costCenter}
                  </p>
                )}
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
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
                  value={territoryState.hod}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
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
                  value={territoryState.mobile}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
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
                  value={territoryState.email}
                  onChange={(e) =>
                    setTerritoryState({
                      ...territoryState,
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
                  {router.query.type !== "Add" ? "Update" : "Save"}{" "}
                </div>
                <button
                  className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                  onClick={() => {
                    router.push("/table/table_territory");
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

export default Territory;
