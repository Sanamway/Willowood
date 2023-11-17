import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const FarmerInfo = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [companyData, setCompanyData] = useState([]);

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_village`, {
        headers: headers,
        params: { v_id: router.query.id },
      });
      const apires = await respond.data.data;

      setFarmerState({
        companyId: apires[0].c_id,
        bgId: apires[0].bg_id,
        buId: apires[0].bu_id,
        zoneId: apires[0].z_id,
        regionId: apires[0].r_id,
        territoryId: apires[0].t_id,
        districtId: apires[0].ds_id,
        pincode: apires[0].village_pin_code,
        postoffice: apires[0].village_post_office,
        village: apires[0].village_town_name,
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
  const [farmerState, setFarmerState] = useState({
    farmerName: "",
    fatherName: "",
    farmerAddress: "",
    farmerTypes: "",
    farmerCategory: "",
    landInfo: "",
    mobile: "",
    email: "",
    bgId: "",
    buId: "",
    companyId: "",
    zoneId: "",
    regionId: "",
    territoryId: "",
    districtId: "",
    villageId: "",
    pincode: "",
    postoffice: "",
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
    getBGInfo(farmerState.companyId);
  }, [farmerState.companyId]);

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
    if (farmerState.bgId && farmerState.companyId && farmerState.buId) {
      getAllZoneData(farmerState.companyId, farmerState.bgId, farmerState.buId);
    } else {
      return;
    }
  }, [farmerState.bgId, farmerState.companyId, farmerState.buId]);

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

  const [villagetData, setVillageData] = useState([]);
  const getAllVillageData = async (
    companyId,
    segmentId,
    businessUnitId,
    zoneId,
    regionId,
    territoryId,
    districtId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_village`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setVillageData(
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
          .filter((item) => Number(item.t_id) === Number(territoryId))
          .filter((item) => Number(item.ds_id) === Number(districtId))
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("jklop", villagetData);
  useEffect(() => {
    if (
      farmerState.bgId &&
      farmerState.companyId &&
      farmerState.buId &&
      farmerState.zoneId &&
      farmerState.regionId &&
      farmerState.territoryId &&
      farmerState.districtId
    ) {
      getAllVillageData(
        farmerState.companyId,
        farmerState.bgId,
        farmerState.buId,
        farmerState.zoneId,
        farmerState.regionId,
        farmerState.territoryId,
        farmerState.districtId
      );
    } else {
      return;
    }
  }, [
    farmerState.bgId,
    farmerState.companyId,
    farmerState.buId,
    farmerState.zoneId,
    farmerState.regionId,
    farmerState.territoryId,
    farmerState.districtId,
  ]);

  const [districtData, setDistrictData] = useState([]);
  const getAllDistrictData = async (
    companyId,
    segmentId,
    businessUnitId,
    zoneId,
    regionId,
    territoryId
  ) => {
    try {
      const respond = await axios.get(`${url}/api/get_district`, {
        headers: headers,
      });

      const apires = await respond.data.data;

      setDistrictData(
        apires
          .filter((item) => Number(item.c_id) === Number(companyId))
          .filter((item) => Number(item.bg_id) === Number(segmentId))
          .filter((item) => Number(item.bu_id) === Number(businessUnitId))
          .filter((item) => Number(item.z_id) === Number(zoneId))
          .filter((item) => Number(item.r_id) === Number(regionId))
          .filter((item) => Number(item.t_id) === Number(territoryId))
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (
      farmerState.bgId &&
      farmerState.companyId &&
      farmerState.buId &&
      farmerState.zoneId
    ) {
      getAllRegionData(
        farmerState.companyId,
        farmerState.bgId,
        farmerState.buId,
        farmerState.zoneId
      );
    } else {
      return;
    }
  }, [
    farmerState.bgId,
    farmerState.companyId,
    farmerState.buId,
    farmerState.zoneId,
  ]);

  useEffect(() => {
    if (
      farmerState.bgId &&
      farmerState.companyId &&
      farmerState.buId &&
      farmerState.zoneId &&
      farmerState.regionId
    ) {
      getAllTerritoryData(
        farmerState.companyId,
        farmerState.bgId,
        farmerState.buId,
        farmerState.zoneId,
        farmerState.regionId
      );
    } else {
      return;
    }
  }, [
    farmerState.bgId,
    farmerState.companyId,
    farmerState.buId,
    farmerState.zoneId,
    farmerState.regionId,
  ]);

  useEffect(() => {
    if (
      farmerState.bgId &&
      farmerState.companyId &&
      farmerState.buId &&
      farmerState.zoneId &&
      farmerState.regionId &&
      farmerState.territoryId
    ) {
      getAllDistrictData(
        farmerState.companyId,
        farmerState.bgId,
        farmerState.buId,
        farmerState.zoneId,
        farmerState.regionId,
        farmerState.territoryId
      );
    } else {
      return;
    }
  }, [
    farmerState.bgId,
    farmerState.companyId,
    farmerState.buId,
    farmerState.zoneId,
    farmerState.regionId,
    farmerState.territoryId,
  ]);

  useEffect(() => {
    if (!farmerState.bgId && !farmerState.companyId) return;
    getBUInfo(farmerState.companyId, farmerState.bgId);
  }, [farmerState.bgId, farmerState.companyId]);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),
    zoneId: Yup.string().required("Zone is required"),
    regionId: Yup.string().required("Region is required"),
    territoryId: Yup.string().required("Territory is required"),
    districtId: Yup.string().required("District is required"),
    pincode: Yup.string().required("Pincode is required"),
    postoffice: Yup.string().required("Postoffice is required"),
    village: Yup.string().required("Village is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSaveVillage = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(farmerState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(farmerState.companyId),
        bu_id: Number(farmerState.buId),
        bg_id: Number(farmerState.bgId),
        z_id: Number(farmerState.zoneId),
        r_id: Number(farmerState.regionId),
        t_id: Number(farmerState.territoryId),
        ds_id: Number(farmerState.districtId),
        village_town_name: farmerState.village,
        village_pin_code: farmerState.pincode,
        village_post_office: farmerState.postoffice,
        c_name: "New Man",
        ul_name: "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_village`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Village added successfully!");
          setTimeout(() => {
            router.push("/table/table_village");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("village_name_1")) {
        toast.error("Village already exist");
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

  const handleEditVillage = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(farmerState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(farmerState.companyId),
        bu_id: Number(farmerState.buId),
        bg_id: Number(farmerState.bgId),
        z_id: Number(farmerState.zoneId),
        r_id: Number(farmerState.regionId),
        t_id: Number(farmerState.territoryId),
        ds_id: Number(farmerState.districtId),
        village_town_name: farmerState.village,
        village_pin_code: farmerState.pincode,
        village_post_office: farmerState.postoffice,
        c_name: "New Man",
        ul_name: "No Man",
      };
      const respond = await axios
        .put(
          `${url}/api/update_village/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Village edited successfully!");
          setTimeout(() => {
            router.push("/table/table_village");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("village_name_1")) {
        toast.error("Village already exist");
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
    if (router.query.type === "Add") handleSaveVillage(e);
    else {
      handleEditVillage(e);
    }
  };
  console.log("nui", farmerState);
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Farmer Info</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <TiArrowBack
              onClick={() => {
                router.push("/table/table_farmer");
              }}
              className="text-gray-400"
              size={35}
            />

            <AiTwotoneHome className="text-red-500" size={34} />
          </span>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start ">
          <form
            className=" flex flex-col gap-4 bg-white rounded shadow p-4 w-full mb-8 "
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              <small className="text-red-600">*</small> Farmer Id
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                type="text"
                id="inputField"
                placeholder="Farmer Id"
              />
            </label>

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
                  value={farmerState.companyId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
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
                  value={farmerState.bgId}
                  disabled={!farmerState.companyId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      bgId: e.target.value,
                    })
                  }
                >
                  <option value={""}>- Select -</option>
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
                  value={farmerState.buId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      buId: e.target.value,
                    })
                  }
                >
                  <option value={""}>- Select -</option>
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
                  value={farmerState.zoneId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
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
            </div>
            <div className="flex -mx-2 mb-4">
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
                  value={farmerState.regionId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
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
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                >
                  <small className="text-red-600">*</small> Territory
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={farmerState.territoryId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
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
                {formErrors.territoryId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.territoryId}
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
                  <small className="text-red-600">*</small> District
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={farmerState.districtId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      districtId: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  {districtData.map((item, idx) => (
                    <option
                      value={item.ds_id}
                      className="focus:outline-none focus:border-b bg-white"
                      key={idx}
                    >
                      {item.district_name}
                    </option>
                  ))}
                </select>
                {formErrors.districtId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.districtId}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                >
                  <small className="text-red-600">*</small> Village
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={farmerState.villageId}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      villageId: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Select
                  </option>
                  {villagetData.map((item, idx) => (
                    <option
                      value={item.v_id}
                      className="focus:outline-none focus:border-b bg-white"
                      key={idx}
                    >
                      {item.village_town_name}
                    </option>
                  ))}
                </select>
                {formErrors.villageId && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.villageId}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full  gap-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Farmer Name{" "}
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Farmer Name"
                  value={farmerState.farmerName}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      farmerName: e.target.value,
                    })
                  }
                />
              </label>

              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Farmer Father Name
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Farmer Name"
                  value={farmerState.fatherName}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      fatherName: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="flex w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="textareaField"
              >
                <small className="text-red-600">*</small> Farmer Address
                <textarea
                  className="w-full px-2 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  id="textareaField"
                  placeholder="Farmer Address"
                  rows="6"
                  value={farmerState.farmerAddress}
                  onChange={(e) =>
                    setFarmerState({
                      ...farmerState,
                      farmerAddress: e.target.value,
                    })
                  }
                ></textarea>
              </label>

              <div className="flex flex-col gap-2 w-full justify-around mx-2">
                <div className="w-full flex flex-row gap-2 ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="userSelect"
                  >
                    <span className="text-red-500 p-1">*</span>Farmer Types
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                      id="userSelect"
                      value={farmerState.farmerTypes}
                      onChange={(e) =>
                        setFarmerState({
                          ...farmerState,
                          farmerTypes: e.target.value,
                        })
                      }
                    >
                      <option
                        value={""}
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </label>

                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="userSelect"
                  >
                    <span className="text-red-500 p-1">*</span>Farmer Category
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500 mt-2"
                      id="userSelect"
                    >
                      <option
                        value=""
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </label>
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold "
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Land Information
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                    type="text"
                    id="inputField"
                    placeholder="Land Information"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Mobile
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Mobile"
                />
              </label>

              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                Email
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Email"
                />
              </label>
            </div>

            <div className="flex flex-row gap-2 w-full">
              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Pin Code
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Pin Code"
                />
              </label>

              <label
                className="block text-gray-700 text-sm font-bold w-full "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Post Office
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                  type="text"
                  id="inputField"
                  placeholder="Post Office"
                />
              </label>
            </div>

            <span className="button flex items-center gap-3 mt-6">
              <button className="bg-green-700 px-4 py-1 text-white">
                Save
              </button>
              <button
                className="bg-yellow-500 px-4 py-1 text-white"
                onClick={() => {
                  router.push("/table/table_farmer");
                }}
              >
                Close
              </button>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerInfo;
