import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const UserAssignBusiness = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [allUsers, setAllUsers] = useState([]);
  const getAllUserData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_users`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setAllUsers(
        apires.map((item) => {
          return {
            userId: item.user_id,
            name: item.user_name,
            mobile: item.phone_number,
            territoryProfile: item.t_user,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const [companyData, setCompanyData] = useState([]);

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_bstuser`, {
        headers: headers,
        params: { user_id: router.query.id },
      });
      const apires = await respond.data.data;

      setBstState({
        companyId: apires[0].c_id,
        bgId: apires[0].bg_id,
        buId: apires[0].bu_id,
        zoneId: apires[0].z_id,
        regionId: apires[0].r_id,
        territoryId: apires[0].t_id,
        userId: apires[0].user_id,
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
  const [bstState, setBstState] = useState({
    bgId: "",
    buId: "",
    companyId: "",
    zoneId: "",
    regionId: "",
    territoryId: "",
    userId: "",
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
    getBGInfo(bstState.companyId);
  }, [bstState.companyId]);

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
    if (bstState.bgId && bstState.companyId && bstState.buId) {
      getAllZoneData(bstState.companyId, bstState.bgId, bstState.buId);
    } else {
      return;
    }
  }, [bstState.bgId, bstState.companyId, bstState.buId]);

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
      bstState.bgId &&
      bstState.companyId &&
      bstState.buId &&
      bstState.zoneId
    ) {
      getAllRegionData(
        bstState.companyId,
        bstState.bgId,
        bstState.buId,
        bstState.zoneId
      );
    } else {
      return;
    }
  }, [bstState.bgId, bstState.companyId, bstState.buId, bstState.zoneId]);

  useEffect(() => {
    if (
      bstState.bgId &&
      bstState.companyId &&
      bstState.buId &&
      bstState.zoneId &&
      bstState.regionId
    ) {
      getAllTerritoryData(
        bstState.companyId,
        bstState.bgId,
        bstState.buId,
        bstState.zoneId,
        bstState.regionId
      );
    } else {
      return;
    }
  }, [
    bstState.bgId,
    bstState.companyId,
    bstState.buId,
    bstState.zoneId,
    bstState.regionId,
  ]);

  useEffect(() => {
    if (!bstState.bgId && !bstState.companyId) return;
    getBUInfo(bstState.companyId, bstState.bgId);
  }, [bstState.bgId, bstState.companyId]);

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),
    zoneId: Yup.string().required("Zone is required"),
    regionId: Yup.string().required("Region is required"),
    territoryId: Yup.string().required("Territory is required"),
    userId: Yup.string().required("User is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSaveBst = async (e) => {
    e.preventDefault();
    console.log("lkop", bstState);
    try {
      await validationSchema.validate(bstState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(bstState.companyId),
        bu_id: Number(bstState.buId),
        bg_id: Number(bstState.bgId),
        z_id: Number(bstState.zoneId),
        r_id: Number(bstState.regionId),
        t_id: Number(bstState.territoryId),
        user_id: bstState.userId,
        c_name: localStorage.getItem("c_name")
          ? localStorage.getItem("c_name")
          : "New Man",
        ul_name: localStorage.getItem("ul_name")
          ? localStorage.getItem("ul_name")
          : "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_bstuser`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("User added successfully!");
          setTimeout(() => {
            router.push("/table/table_user_assign_business");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("user_id_1")) {
        toast.error("User already map with the territory");
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

  const handleEditBst = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(bstState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(bstState.companyId),
        bu_id: Number(bstState.buId),
        bg_id: Number(bstState.bgId),
        z_id: Number(bstState.zoneId),
        r_id: Number(bstState.regionId),
        t_id: Number(bstState.territoryId),
        user_id: bstState.userId,
        c_name: localStorage.getItem("c_name")
          ? localStorage.getItem("c_name")
          : "New Man",
        ul_name: localStorage.getItem("ul_name")
          ? localStorage.getItem("ul_name")
          : "No Man",
      };
      const respond = await axios
        .put(
          `${url}/api/update_bstuser/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("User edited successfully!");
          setTimeout(() => {
            router.push("/table/table_user_assign_business");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
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
    if (router.query.type === "Add") handleSaveBst(e);
    else {
      handleEditBst(e);
    }
  };

  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className=" overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            User Map With Business Structure{" "}
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_user_assign_business");
                }}
                className="text-gray-400"
                size={35}
              ></TiArrowBack>
            </h2>
            <h2>
              <AiTwotoneHome
                onClick={() => {
                  router.push("/");
                }}
                className="text-red-500"
                size={34}
              ></AiTwotoneHome>
            </h2>
          </div>
        </div>

        {/* <div className="bg-gray-300"></div> */}
        <div className="text-black  h-screen ">
          <div className="bg-gray-100 pt-1 h-screen ">
            <div className="max-w-1/2 mx-4 mt-4 bg-white rounded shadow p-4">
              <div className="mb-3 w-1/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mapId"
                >
                  Map ID
                </label>
                <input
                  disabled
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="mapId"
                  placeholder=" Id"
                  value={
                    router.query.type === "Edit" || router.query.type === "View"
                      ? router.query.id
                      : "Auto Genrated"
                  }
                />
              </div>
              <div className="mb-3 w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userName"
                >
                  <span className="text-red-500 p-1">*</span>User Name
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                  id="userName"
                  value={bstState.userId}
                  onChange={(e) =>
                    setBstState({
                      ...bstState,
                      userId: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    - Select -{" "}
                  </option>

                  {allUsers.map((item) => (
                    <option value={item.userId}>
                      {item.name} ({item.mobile}) - {item.territoryProfile} {item.userId}
                    </option>
                  ))}
                </select>
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
                    className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="citySelect"
                    value={bstState.companyId}
                    onChange={(e) =>
                      setBstState({
                        ...bstState,
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
                    className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="stateSelect"
                    value={bstState.bgId}
                    disabled={!bstState.companyId}
                    onChange={(e) =>
                      setBstState({
                        ...bstState,
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
                    className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="userSelect"
                    value={bstState.buId}
                    onChange={(e) =>
                      setBstState({
                        ...bstState,
                        buId: e.target.value,
                      })
                    }
                  >
                    <option value={""} disabled>
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
                    className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="userSelect"
                    value={bstState.zoneId}
                    onChange={(e) =>
                      setBstState({
                        ...bstState,
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
                    className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="userSelect"
                    value={bstState.regionId}
                    onChange={(e) =>
                      setBstState({
                        ...bstState,
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
                    className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="stateSelect"
                    value={bstState.territoryId}
                    onChange={(e) =>
                      setBstState({
                        ...bstState,
                        territoryId: e.target.value,
                      })
                    }
                  >
                    <option
                      value={""}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAssignBusiness;
