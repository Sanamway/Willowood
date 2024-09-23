import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout1";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const CropForm = () => {
  const router = useRouter();

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_crop`, {
        headers: headers,
        params: { cr_id: router.query.id },
      });
      const apires = await respond.data.data[0];
     
      setCropState({
        crop_id: apires.cr_id,
        companyId: apires.c_id,
        cropName: apires.crop_name,
        season: apires.season_name,
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
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

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

  const [cropState, setCropState] = useState({
    
    crop_id: "",
    companyId: "",
    cropName: "",
    season: "",
 
  });

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    cropName: Yup.string().required("Crop is required"),
    season: Yup.string().required("Season is required"),
  });

  const [formErrors, setFormErrors] = useState({});
  const handleSaveCrop = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(cropState, {
        abortEarly: false,
      });
      const data = {
        c_id: cropState.companyId,
        season_name: cropState.season,
        crop_name: cropState.cropName,
        c_name: "No Worries",
        ul_name: "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_crop`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Crop added successfully!");
          setTimeout(() => {
            router.push("/MR_Portal_Web/Crop_table");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("crop_name_1")) {
        toast.error("Crop already exist");
      }  else {
        toast.error(errorMessage);
      }

      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const handleEditCrop = async (e) => {
    e.preventDefault();
    try {
      // Validate the form data
      await validationSchema.validate(cropState, {
        abortEarly: false,
      });
      const data = {
        c_id: cropState.companyId,
        season_name: cropState.season,
        crop_name: cropState.cropName,
        c_name: "No Worries",
        ul_name: "No Man",
      };

      const respond = await axios
        .put(
          `${url}/api/update_crop/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Crop edited successfully!");
          setTimeout(() => {
            router.push("/MR_Portal_Web/Crop_table");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("crop_name_1")) {
        toast.error("Crop already exist");
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
    if (router.query.type === "Add") handleSaveCrop(e);
    else {
      handleEditCrop(e);
    }
  };

  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className=" w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Crop</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/MR_Portal_Web/Crop_table");
                }}
                className="text-gray-400"
                size={35}
              ></TiArrowBack>
            </h2>
           
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start h-screen ">
          <form
            className=" bg-white rounded shadow p-4 w-full "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Crop Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Crop I.D"
                disabled={router.query.type === "Add"}
                value={
                  router.query.type === "Add"
                    ? "Auto Generated"
                    : router.query.id
                }
              />
            </div>
            <div className="w-1/2 mb-2 relatve">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Crop Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Crop Name"
                value={cropState.cropName}
                onChange={(e) =>
                  setCropState({
                    ...cropState,
                    cropName: e.target.value,
                  })
                }
              />
              {formErrors.cropName && (
                <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                     {formErrors.cropName}
                </p>
              )}
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="citySelect"
                >
                  <small className="text-red-600 mt-2">*</small> Season
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                  value={cropState.season}
                  onChange={(e) =>
                    setCropState({
                      ...cropState,
                      season: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    -- Select --
                  </option>
                  <option value="Rabi">Rabi</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Zaid">Zaid</option>
                </select>
                {formErrors.season && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.season}
                  </p>
                )}
              </div>
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="citySelect"
                >
                  <small className="text-red-600">*</small> Company
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                  value={cropState.companyId}
                  onChange={(e) =>
                    setCropState({
                      ...cropState,
                      companyId: e.target.value,
                    })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    -- Select --
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
                    router.push("/MR_Portal_Web/Crop_table");
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

export default CropForm;
