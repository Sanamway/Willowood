import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const Village = () => {
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

      setVillageState({
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
  const [villageState, setVillageState] = useState({
    bgId: "",
    buId: "",
    companyId: "",
    zoneId: "",
    regionId: "",
    territoryId: "",
    districtId: "",
    village: "",
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
    getBGInfo(villageState.companyId);
  }, [villageState.companyId]);

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
    if (villageState.bgId && villageState.companyId && villageState.buId) {
      getAllZoneData(
        villageState.companyId,
        villageState.bgId,
        villageState.buId
      );
    } else {
      return;
    }
  }, [villageState.bgId, villageState.companyId, villageState.buId]);

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
      villageState.bgId &&
      villageState.companyId &&
      villageState.buId &&
      villageState.zoneId
    ) {
      getAllRegionData(
        villageState.companyId,
        villageState.bgId,
        villageState.buId,
        villageState.zoneId
      );
    } else {
      return;
    }
  }, [
    villageState.bgId,
    villageState.companyId,
    villageState.buId,
    villageState.zoneId,
  ]);

  useEffect(() => {
    if (
      villageState.bgId &&
      villageState.companyId &&
      villageState.buId &&
      villageState.zoneId &&
      villageState.regionId
    ) {
      getAllTerritoryData(
        villageState.companyId,
        villageState.bgId,
        villageState.buId,
        villageState.zoneId,
        villageState.regionId
      );
    } else {
      return;
    }
  }, [
    villageState.bgId,
    villageState.companyId,
    villageState.buId,
    villageState.zoneId,
    villageState.regionId,
  ]);

  useEffect(() => {
    if (
      villageState.bgId &&
      villageState.companyId &&
      villageState.buId &&
      villageState.zoneId &&
      villageState.regionId &&
      villageState.territoryId
    ) {
      getAllDistrictData(
        villageState.companyId,
        villageState.bgId,
        villageState.buId,
        villageState.zoneId,
        villageState.regionId,
        villageState.territoryId
      );
    } else {
      return;
    }
  }, [
    villageState.bgId,
    villageState.companyId,
    villageState.buId,
    villageState.zoneId,
    villageState.regionId,
    villageState.territoryId,
  ]);

  useEffect(() => {
    if (!villageState.bgId && !villageState.companyId) return;
    getBUInfo(villageState.companyId, villageState.bgId);
  }, [villageState.bgId, villageState.companyId]);

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
      await validationSchema.validate(villageState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(villageState.companyId),
        bu_id: Number(villageState.buId),
        bg_id: Number(villageState.bgId),
        z_id: Number(villageState.zoneId),
        r_id: Number(villageState.regionId),
        t_id: Number(villageState.territoryId),
        ds_id: Number(villageState.districtId),
        village_town_name: villageState.village,
        village_pin_code: villageState.pincode,
        village_post_office: villageState.postoffice,
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
      await validationSchema.validate(villageState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(villageState.companyId),
        bu_id: Number(villageState.buId),
        bg_id: Number(villageState.bgId),
        z_id: Number(villageState.zoneId),
        r_id: Number(villageState.regionId),
        t_id: Number(villageState.territoryId),
        ds_id: Number(villageState.districtId),
        village_town_name: villageState.village,
        village_pin_code: villageState.pincode,
        village_post_office: villageState.postoffice,
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

  console.log("olp", villageState);
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Village</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_village");
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

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start h-full ">
          <form
            className=" bg-white rounded shadow p-4 w-full pb-24"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Village Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="District Id"
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
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Pin Code
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Pin Code"
                  value={villageState.pincode}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
                      pincode: e.target.value,
                    })
                  }
                />
                {formErrors.pincode && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.pincode}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Post Office
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Post Office"
                  value={villageState.postoffice}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
                      postoffice: e.target.value,
                    })
                  }
                />
                {formErrors.postoffice && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.postoffice}
                  </p>
                )}
              </div>
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
                  value={villageState.companyId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
                  value={villageState.bgId}
                  disabled={!villageState.companyId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
                  value={villageState.buId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
                  value={villageState.zoneId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
                  value={villageState.regionId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
                  value={villageState.territoryId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
                  value={villageState.districtId}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
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
            </div>
            <div className="flex -mx-2 mb-4 ">
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Village Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Village Name"
                  value={villageState.village}
                  onChange={(e) =>
                    setVillageState({
                      ...villageState,
                      village: e.target.value,
                    })
                  }
                />
                {formErrors.village && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.village}
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
                    router.push("/table/table_district");
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

export default Village;
