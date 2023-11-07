import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const UserProfileForm = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

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
  const [districtState, setDistrictState] = useState({
    bgId: "",
    buId: "",
    companyId: "",
    zoneId: "",
    regionId: "",
    territoryId: "",
    district: "",
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
    getBGInfo(districtState.companyId);
  }, [districtState.companyId]);

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
    if (districtState.bgId && districtState.companyId && districtState.buId) {
      getAllZoneData(
        districtState.companyId,
        districtState.bgId,
        districtState.buId
      );
    } else {
      return;
    }
  }, [districtState.bgId, districtState.companyId, districtState.buId]);

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

  const [territoryData, setTerritoryData] = useState([]);
  const getAllTerritoryData = async (
    companyId,
    segmentId,
    businessUnitId,
    zoneId,
    regionId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setTerritoryData(
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (
      districtState.bgId &&
      districtState.companyId &&
      districtState.buId &&
      districtState.zoneId
    ) {
      getAllRegionData(
        districtState.companyId,
        districtState.bgId,
        districtState.buId,
        districtState.zoneId
      );
    } else {
      return;
    }
  }, [
    districtState.bgId,
    districtState.companyId,
    districtState.buId,
    districtState.zoneId,
  ]);

  useEffect(() => {
    if (
      districtState.bgId &&
      districtState.companyId &&
      districtState.buId &&
      districtState.zoneId &&
      districtState.regionId
    ) {
      getAllTerritoryData(
        districtState.companyId,
        districtState.bgId,
        districtState.buId,
        districtState.zoneId,
        districtState.regionId
      );
    } else {
      return;
    }
  }, [
    districtState.bgId,
    districtState.companyId,
    districtState.buId,
    districtState.zoneId,
    districtState.regionId,
  ]);

  useEffect(() => {
    if (!districtState.bgId && !districtState.companyId) return;
    getBUInfo(districtState.companyId, districtState.bgId);
  }, [districtState.bgId, districtState.companyId]);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),
    zoneId: Yup.string().required("Zone is required"),
    regionId: Yup.string().required("Region is required"),
    territoryId: Yup.string().required("Territory is required"),
    district: Yup.string().required("District is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSaveDistrict = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(districtState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(districtState.companyId),
        bu_id: Number(districtState.buId),
        bg_id: Number(districtState.bgId),
        z_id: Number(districtState.zoneId),
        r_id: Number(districtState.regionId),
        t_id: Number(districtState.territoryId),
        district_name: districtState.district,
        c_name: localStorage.getItem("c_name")
          ? localStorage.getItem("c_name")
          : "New Man",
        ul_name: localStorage.getItem("ul_name")
          ? localStorage.getItem("ul_name")
          : "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_district`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("District added successfully!");
          setTimeout(() => {
            router.push("/table/table_district");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      toast.error(errorMessage);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">District</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_district");
                }}
                className="text-gray-400"
                size={35}
              ></TiArrowBack>
            </h2>
            <h2>
              <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
            </h2>
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start h-max pb-12 ">
          <form
            className=" bg-white rounded shadow p-4 w-full "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                District Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="District Id"
                value={"Auto Generated"}
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
                  value={districtState.companyId}
                  onChange={(e) =>
                    setDistrictState({
                      ...districtState,
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
                  value={districtState.bgId}
                  disabled={!districtState.companyId}
                  onChange={(e) =>
                    setDistrictState({
                      ...districtState,
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
                  value={districtState.buId}
                  onChange={(e) =>
                    setDistrictState({
                      ...districtState,
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
                  value={districtState.zoneId}
                  onChange={(e) =>
                    setDistrictState({
                      ...districtState,
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
                  value={districtState.regionId}
                  onChange={(e) =>
                    setDistrictState({
                      ...districtState,
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
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                >
                  <small className="text-red-600">*</small> Territory
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={districtState.territoryId}
                  onChange={(e) =>
                    setDistrictState({
                      ...districtState,
                      territoryId: e.target.value,
                    })
                  }
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  {territoryData.map((item, idx) => (
                    <option
                      value={item.t_id}
                      className="focus:outline-none focus:border-b bg-white"
                      key={idx}
                    >
                      {item.territory_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex -mx-2 mb-4 relative">
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                >
                  <small className="text-red-600">*</small> District
                  <input
                    className="w-full mt-2 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    id="phoneField"
                    placeholder="District"
                    value={districtState.district}
                    onChange={(e) =>
                      setDistrictState({
                        ...districtState,
                        district: e.target.value,
                      })
                    }
                  />
                  {formErrors.district && (
                    <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                      {formErrors.district}
                    </p>
                  )}
                </label>
              </div>
            </div>

            <div className="button flex items-center gap-3 mt-6 cursor-pointer">
              <div
                className="bg-green-700 px-4 py-1 text-white"
                onClick={(e) => handleSaveDistrict(e)}
              >
                Save
              </div>
              <button
                className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                onClick={() => {
                  router.push("/table/table_district");
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileForm;
