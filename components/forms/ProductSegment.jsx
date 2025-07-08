import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import { url } from "@/constants/url";
import { toast, Toaster } from "react-hot-toast";

const ProductSegment = () => {
  const router = useRouter();
  let { id, view } = router.query;

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [tempImage, setTempImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formState, setFromState] = useState({
    pseg_id: "",
    pseg_name: "",
    c_name: "WCL",
    ul_name: "WCL",
    c_id: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const validationSchema = Yup.object().shape({
    pseg_name: Yup.string().required("Product Segment Name is required"),
    c_name: Yup.string().required("Company Name is required")
  });

  const getPrdSegById = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_product_segment/?pseg_id=${id}`, { headers: headers });
      const respData = await resp.data.data;
      setFromState({
        pseg_name: respData[0]?.pseg_name,
        pseg_id: respData[0]?.pseg_id,
        c_name: respData[0]?.c_name,
        c_id: respData[0]?.c_id
      });
      setImagePreview(respData[0]?.image_name);


      console.log("geprr", respData);
      console.log("segId", respData.pseg_id);
    } catch (error) {
      console.log("ee", error);
    }
  };

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (id) getPrdSegById(id);
  }, [id]);

  //////////////////////////Handle Save//////////////////////////

  // const handleSaveSeg = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await validationSchema.validate(formState, { abortEarly: false });
  //     const Formdata = {
  //       pseg_name: formState?.pseg_name,
  //       pseg_id: formState?.pseg_id,
  //       c_name: formState?.c_name,
  //       c_id: formState?.c_id,
  //       ul_name: formState?.ul_name
  //     };
  //     const resp = await axios.post(`${url}/api/add_product_segment`, JSON.stringify(Formdata), {
  //       headers: headers
  //     });
  //     const respdata = await resp.data;
  //     console.log("saved", respdata);
  //     if (respdata) {
  //       toast.success(respdata.message);
  //       setTimeout(() => {
  //         router.push("/table/table_product_segment");
  //       }, 2500);
  //     }
  //   } catch (errors) {
  //     const ermsg = errors.response.data.message;
  //     if (ermsg) {
  //       toast.error(ermsg);
  //       return;
  //     }
  //     const errmsg = errors.response.data.error;
  //     console.log("fefef", errors);
  //     if (errmsg?.includes("pseg_name_1")) {
  //       toast.error("Product Segment is Duplicate");
  //     } else if (errmsg?.includes("pseg_id")) {
  //       toast.error("Product Id is duplicate");
  //     } else {
  //       toast.error(errmsg);
  //     }
  //   }
  // };

  const handleSaveSeg = async (e) => {
    e.preventDefault();

    if (!formState.pseg_name || !formState.c_id) {
      toast.error("Product Category and Company are required");
      return;
    }

    if (!tempImage) {
      toast.error("Please select an image");
      return;
    }

    try {
      const Formdata = {
        pseg_name: formState?.pseg_name,
        pseg_id: formState?.pseg_id,
        c_name: formState?.c_name,
        c_id: formState?.c_id,
        ul_name: formState?.ul_name
      };

      console.log("formdata", Formdata);

      const resp = await axios.post(`${url}/api/add_product_segment`, JSON.stringify(Formdata), {
        headers: headers
      });

      const respdata = await resp.data;
      console.log("saved", respdata);

      if (respdata) {
        toast.success(respdata.message);

        const imageFormData = new FormData();
        imageFormData.append("myFile", tempImage);

        const imageUploadResp = await axios.post(
          `${url}/api/upload_file/?file_path=product_segment&image_name=${tempImage.name}&c_id=${formState?.c_id}&pseg_name=${formState?.pseg_name}`,
          imageFormData,
          {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log("Image uploaded", imageUploadResp.data);

        if (imageUploadResp.data) {
          toast.success("Image uploaded successfully");

          setTimeout(() => {
            router.push("/table/table_product_segment");
          }, 2500);
        }
      }
    } catch (errors) {
      console.error("Error occurred", errors);

      const errmsg = errors?.response?.data?.error || "Something went wrong";

      if (errmsg?.includes("pseg_name_1")) {
        toast.error("Product Segment is Duplicate");
      } else if (errmsg?.includes("pseg_id")) {
        toast.error("Product Id is duplicate");
      } else if (errors.message === "Network Error") {
        toast.error("Network Error. Please check your connection");
      } else if (errors?.response?.status === 413) {
        toast.error("Image size is too large");
      } else {
        toast.error(errmsg);
      }
    }
  };

  // Handle Edit Brand

  // const handleEditSeg = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const Editdata = {
  //       pseg_name: formState?.pseg_name,
  //       pseg_id: formState?.pseg_id,
  //       c_name: formState?.c_name,
  //       c_id: formState?.c_id
  //     };

  //     const emptyFields = Object.entries(Editdata)
  //       .filter(([key, value]) => value === "")
  //       .map(([key]) => key);
  //     if (emptyFields.length > 0) {
  //       const customMessages = {
  //         c_name: "Company Name",
  //         pseg_id: "Product Segment",
  //         brand_code: "Brand Code",
  //         pseg_name: "Product Segment"
  //       };
  //       const requiredFields = emptyFields.map((field) => customMessages[field] || field);
  //       toast.error(`${requiredFields.join(", ")} is required.`);
  //     } else {
  //       const resp = await axios.put(`${url}/api/update_product_segment/${id}`, JSON.stringify(Editdata), {
  //         headers: headers
  //       });
  //       const respdata = await resp.data;
  //       console.log("resap", respdata);
  //       if (respdata) {
  //         toast.success(respdata.message);
  //         setTimeout(() => {
  //           router.push("/table/table_product_segment");
  //         }, 2500);
  //       }
  //     }
  //   } catch (errors) {
  //     const ermsg = errors.response.data.message;
  //     // if(ermsg){
  //     //   toast.error(ermsg)

  //     // }
  //     const errmsg = errors.response.data.error;
  //     console.log("fefef", errors);
  //     if (errmsg?.includes("pseg_name_1")) {
  //       toast.error("Product Segment is Duplicate");
  //     } else if (errmsg?.includes("pseg_id")) {
  //       toast.error("Product ID is duplicate");
  //     } else {
  //       toast.error(errmsg);
  //     }
  //   }
  // };

  const handleEditSeg = async (e) => {
    e.preventDefault();
  
    try {
      const { pseg_name, pseg_id, c_name, c_id } = formState;
  
      // Prepare data
      const Editdata = { pseg_name, pseg_id, c_name, c_id };
  
      // Validate required fields
      const emptyFields = Object.entries(Editdata)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
  
      if (emptyFields.length > 0) {
        const customMessages = {
          c_name: "Company Name",
          pseg_id: "Product Segment ID",
          pseg_name: "Product Segment Name"
        };
  
        const requiredFields = emptyFields.map((field) => customMessages[field] || field);
        toast.error(`${requiredFields.join(", ")} is required`);
        return;
      }
  
      const resp = await axios.put(
        `${url}/api/update_product_segment/${id}`,
        JSON.stringify(Editdata),
        { headers }
      );
  
      const respdata = resp.data;
      console.log("Response:", respdata);
  
     
      if (respdata) {
        toast.success(respdata.message);

        if (tempImage) {
          const imageFormData = new FormData();
          imageFormData.append("myFile", tempImage);

          const imageUploadResp = await axios.post(
            `${url}/api/upload_file/?file_path=product_segment&image_name=${tempImage.name}&c_id=${formState?.c_id}&pseg_name=${formState?.pseg_name}`,
            imageFormData,
            {
              headers: {
                ...headers,
                "Content-Type": "multipart/form-data"
              }
            }
          );

          console.log("Image uploaded", imageUploadResp.data);

          if (imageUploadResp.data) {
            toast.success("Image uploaded successfully");
          }
        }

        setTimeout(() => {
          router.push("/table/table_product_segment");
        }, 2500);
      }
    } catch (errors) {
      console.error("Error occurred:", errors);
  
      const errmsg = errors?.response?.data?.error || "Something went wrong";
  
      if (errmsg?.includes("pseg_name_1")) {
        toast.error("Product Segment is Duplicate");
      } else if (errmsg?.includes("pseg_id")) {
        toast.error("Product ID is Duplicate");
      } else if (errors.message === "Network Error") {
        toast.error("Network Error. Please check your connection.");
      } else if (errors?.response?.status === 413) {
        toast.error("Image size is too large");
      } else {
        toast.error(errmsg);
      }
    }
  };
  

  const handleSubmit = (e) => {
    if (router.query.type !== "Edit") {
      handleSaveSeg(e);
    } else {
      handleEditSeg(e);
    }
  };

  //Getting Company Info:
  const [companyInfo, setCompanyInfo] = useState([]);
  const getCompanyInfo = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_company_information`, { headers: headers });
      const respda = await resp.data.data;
      const filterCompanyInfo = respda.filter((item) => item.isDeleted == false);
      setCompanyInfo(filterCompanyInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  //////Handle Image Change////////

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file?.type)) {
      toast.error("Please upload only JPG, JPEG or PNG images");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file?.size > maxSize) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setTempImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  return (
    <>
      <Layout>
        <div className=" overflow-auto w-full font-arial bg-white ">
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">Product Segment </h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h2>
                <TiArrowBack
                  onClick={() => {
                    router.push("/table/table_product_segment");
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
          <div className="text-black h-screen  ">
            <div className="bg-gray-100 p-4  h-screen ">
              <form
                onSubmit={(e) => e.preventDefault()}
                disabled={router.query.type === "CREATE"}
                className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4"
              >
                <div className="flex -mx-2 mb-4 flex-col relative">
                  <div className="absolute right-20">
                    <label className="block text-gray-700 text-center text-sm font-bold mb-2">
                      Product Segment Image
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center flex-col space-x-4">
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-full"
                          />
                          {router.query.type !== "view" && (
                            <button
                              type="button"
                              onClick={() => {
                                setTempImage("");
                                setImagePreview("");
                              }}
                              className="absolute w-8 h-8 top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      )}
                      {router.query.type !== "view" && (
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
                          disabled={!formState.pseg_name || !formState.c_id}
                        />
                      )}
                    </div>
                    {(!formState.pseg_name || !formState.c_id) && (
                      <p className="text-sm text-gray-500 mt-1">
                        Please fill in Product Segment and Company first
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-1/6 px-2 mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
                      htmlFor="inputField"
                    >
                      Segment ID
                    </label>
                    <input
                      disabled
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder=""
                      value={router.query.type == "CREATE" ? "Auto Generated" : formState?.pseg_id}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-2 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      <span className="text-red-500 px-1 whitespace-nowrap">*</span>Product Segment
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder="Input Product Segment"
                      value={formState?.pseg_name}
                      onChange={(e) => {
                        setFromState({
                          ...formState,
                          pseg_name: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-full lg:w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1 whitespace-nowrap">*</span>Company
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formState?.c_id}
                      onChange={(e) => {
                        setFromState({
                          ...formState,
                          c_id: e.target.value
                        });
                      }}
                    >
                      <option value={""} className="focus:outline-none focus:border-b bg-white">
                        Select Options
                      </option>
                      {companyInfo.map((option) => (
                        <option value={option?.c_id} className="focus:outline-none focus:border-b bg-white">
                          {option?.cmpny_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {router.query.type !== "view" && (
                  <div className="button flex items-center gap-3 mt-6">
                    <div
                      className="bg-green-700 px-4 py-1 text-white cursor-pointer"
                      onClick={(e) => handleSubmit(e)}
                    >
                      {router.query.type === "Edit" ? "Update" : "Save"}{" "}
                    </div>
                    <button
                      className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                      onClick={() => {
                        router.push("/table/table_product_segment");
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductSegment;
