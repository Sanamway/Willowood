import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import { url } from "@/constants/url";
import { toast, Toaster } from "react-hot-toast";

const ProductCategory = () => {
  const router = useRouter();

  let { id, view } = router.query;

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [userImage, setUserImage] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const [tempImage, setTempImage] = useState(null);

  const [formState, setFromState] = useState({
    cat_id: "",
    pcat_name: "",
    brand_code: "",
    pseg_id: "",
    c_name: "WCL",
    status: false,
    c_id: "",
    pcat_id: "",
    ul_name: "WCL"
  });

  const [formErrors, setFormErrors] = useState({});

  const validationSchema = Yup.object().shape({
    pcat_name: Yup.string().required("Product Category Name is required"),
    c_name: Yup.string().required("Company Name is required")
  });

  const getPrdCatById = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_product_category/${id}`, { headers: headers });
      const respData = await resp.data.data;
      setFromState({
        pcat_name: respData?.pcat_name,
        brand_code: respData?.brand_code,
        pseg_id: respData?.pseg_id,
        c_name: respData?.c_name,
        c_id: respData?.c_id,
        pcat_id: respData?.pcat_id
      });
      setImagePreview(respData?.image_name);

      console.log("geprr", respData);
    } catch (error) {
      console.log("ee", error);
    }
  };

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (id) getPrdCatById(id);
  }, [id]);

  // const handleSaveCat = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // await validationSchema.validate(formState, { abortEarly: false });
  //     const Formdata = {
  //       c_name: formState.c_name,
  //       c_id: formState.c_id,
  //       ul_name: formState.ul_name,
  //       pcat_name: formState?.pcat_name,
  //       pcat_id:formState?.pcat_id,
  //       status:formState?.status
  //     };
  //     console.log("formdata",Formdata)
  //     // return
  //     const resp = await axios.post(`${url}/api/add_product_category`, JSON.stringify(Formdata), {
  //       headers: headers
  //     });
  //     const respdata = await resp.data;
  //     console.log("saved", respdata);
  //     if (respdata) {
  //       toast.success(respdata.message);
  //       setTimeout(() => {
  //         router.push("/table/table_product_category");
  //       }, 2500);
  //     }
  //   } catch (errors) {
  //     console.log("ee", errors);
  //     const ermsg = errors?.response?.data?.message;
  //     // if(ermsg){
  //     //   toast.error(ermsg)

  //     // }
  //     const errmsg = errors?.response?.data?.error;
  //     console.log("fefef", errors)
  //     if (errmsg?.includes('pcat_name_1')) {
  //       toast.error('Product Category is Duplicate');
  //     }else if(errmsg?.includes('brand_code_1')){
  //       toast.error('Brand Id is duplicate')
  //     }else{
  //       toast.error(errmsg)
  //     }

  //   }
  // };

  //Edit Brand

  // const handleSaveCat = async (e) => {
  //   e.preventDefault();

  //   if (!formState.pcat_name || !formState.c_id) {
  //     toast.error("Product Category and Company are required");
  //     return;
  //   }

  //   if (!tempImage) {
  //     toast.error("Please select an image");
  //     return;
  //   }

  //   console.log("trmefoege", tempImage)

  //   try {
  //     const imageFormData = new FormData();
  //     imageFormData.append("myFile", tempImage);

  //     const imageUploadResp = await axios.post(`${url}/api/upload_file/?file_path=product_category&image_name=${tempImage.name}&c_id=${formState?.c_id}&pcat_name=${formState?.pcat_name}`, imageFormData, {
  //       headers: {
  //         ...headers,
  //         "Content-Type": "multipart/form-data"
  //       }
  //     });

  //     if (imageUploadResp.data) {
  //       const Formdata = {
  //         c_name: formState.c_name,
  //         c_id: formState.c_id,
  //         ul_name: formState.ul_name,
  //         pcat_name: formState?.pcat_name,
  //         pcat_id: formState?.pcat_id,
  //         status: formState?.status,
  //         image_url: imageUploadResp.data.image_url
  //       };

  //       console.log("formdata", Formdata);

  //       const resp = await axios.post(`${url}/api/add_product_category`, JSON.stringify(Formdata), {
  //         headers: headers
  //       });

  //       const respdata = await resp.data;
  //       console.log("saved", respdata);

  //       if (respdata) {
  //         toast.success(respdata.message);
  //         setTimeout(() => {
  //           router.push("/table/table_product_category");
  //         }, 2500);
  //       }
  //     }
  //   } catch (errors) {
  //     console.log("ee", errors);
  //     const ermsg = errors?.response?.data?.message;
  //     const errmsg = errors?.response?.data?.error;
  //     console.log("fefef", errors);

  //     if (errmsg?.includes("pcat_name_1")) {
  //       toast.error("Product Category is Duplicate");
  //     } else if (errmsg?.includes("brand_code_1")) {
  //       toast.error("Brand Id is duplicate");
  //     } else if (errors.message === "Network Error") {
  //       toast.error("Network Error. Please check your connection");
  //     } else if (errors?.response?.status === 413) {
  //       toast.error("Image size is too large");
  //     } else {
  //       toast.error(errmsg || "Something went wrong");
  //     }
  //   }
  // };

  const handleSaveCat = async (e) => {
    e.preventDefault();

    if (!formState.pcat_name || !formState.c_id) {
      toast.error("Product Category and Company are required");
      return;
    }

    if (!tempImage) {
      toast.error("Please select an image");
      return;
    }

    try {
      const Formdata = {
        c_name: formState.c_name,
        c_id: formState.c_id,
        ul_name: formState.ul_name,
        pcat_name: formState?.pcat_name,
        pcat_id: formState?.pcat_id,
        status: formState?.status
      };

      console.log("formdata", Formdata);

      const resp = await axios.post(`${url}/api/add_product_category`, JSON.stringify(Formdata), {
        headers: headers
      });

      const respdata = await resp.data;
      console.log("saved", respdata);

      if (respdata) {
        toast.success(respdata.message);

        const imageFormData = new FormData();
        imageFormData.append("myFile", tempImage);

        const imageUploadResp = await axios.post(
          `${url}/api/upload_file/?file_path=product_category&image_name=${tempImage.name}&c_id=${formState?.c_id}&pcat_name=${formState?.pcat_name}`,
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
            router.push("/table/table_product_category");
          }, 2500);
        }
      }
    } catch (errors) {
      console.error("Error occurred", errors);

      const errmsg = errors?.response?.data?.error || "Something went wrong";

      if (errmsg?.includes("pcat_name_1")) {
        toast.error("Product Category is Duplicate");
      } else if (errmsg?.includes("brand_code_1")) {
        toast.error("Brand Id is duplicate");
      } else if (errors.message === "Network Error") {
        toast.error("Network Error. Please check your connection");
      } else if (errors?.response?.status === 413) {
        toast.error("Image size is too large");
      } else {
        toast.error(errmsg);
      }
    }
  };

  ////////////////////////Handle Edit/////////////////////////////////////////
  // const handleEditCat = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const Editdata = {
  //       c_name: formState.c_name,
  //       c_id: formState.c_id,
  //       ul_name: formState.ul_name,
  //       pcat_name: formState?.pcat_name,
  //       pcat_id: formState?.pcat_id
  //     };
  //     const emptyFields = Object.entries(Editdata)
  //       .filter(([key, value]) => value === "")
  //       .map(([key]) => key);
  //     if (emptyFields.length > 0) {
  //       const customMessages = {
  //         c_name: "Company Name",
  //         pcat_name: "Product Category",
  //         pcat_id: "Product Id",
  //         brand_name: "Brand Name"
  //       };
  //       const requiredFields = emptyFields.map((field) => customMessages[field] || field);
  //       toast.error(`${requiredFields.join(", ")} is required.`);
  //     } else {
  //       const resp = await axios.put(`${url}/api/update_product_category/${id}`, JSON.stringify(Editdata), {
  //         headers: headers
  //       });
  //       const respdata = await resp.data;
  //       console.log("resap", respdata);
  //       if (respdata) {
  //         toast.success(respdata.message);
  //         setTimeout(() => {
  //           router.push("/table/table_product_category");
  //         }, 2500);
  //       }
  //     }
  //   } catch (errors) {
  //     console.log("e", errors);
  //     const ermsg = errors?.response?.data?.message;
  //     if (ermsg) {
  //       toast.error(ermsg);
  //       return;
  //     }
  //     const errmsg = errors?.response?.data?.error;
  //     console.log("fefef", errors);
  //     if (errmsg?.includes("pcat_name_1")) {
  //       toast.error("Product Category is Duplicate");
  //     } else if (errmsg?.includes("brand_code_1")) {
  //       toast.error("Brand Id is duplicate");
  //     } else {
  //       toast.error(errmsg);
  //     }
  //   }
  // };

  const handleEditCat = async (e) => {
    e.preventDefault();
    try {
      const Editdata = {
        c_name: formState.c_name,
        c_id: formState.c_id,
        ul_name: formState.ul_name,
        pcat_name: formState?.pcat_name,
        pcat_id: formState?.pcat_id
      };

      
      const emptyFields = Object.entries(Editdata)
        .filter(([key, value]) => value === "")
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        const customMessages = {
          c_name: "Company Name",
          pcat_name: "Product Category",
          pcat_id: "Product Id",
          brand_name: "Brand Name"
        };
        const requiredFields = emptyFields.map((field) => customMessages[field] || field);
        toast.error(`${requiredFields.join(", ")} is required.`);
        return;
      }

      const resp = await axios.put(`${url}/api/update_product_category/${id}`, JSON.stringify(Editdata), {
        headers: headers
      });

      const respdata = await resp.data;
      console.log("resap", respdata);

      if (respdata) {
        toast.success(respdata.message);

        if (tempImage) {
          const imageFormData = new FormData();
          imageFormData.append("myFile", tempImage);

          const imageUploadResp = await axios.post(
            `${url}/api/upload_file/?file_path=product_category&image_name=${tempImage.name}&c_id=${formState?.c_id}&pcat_name=${formState?.pcat_name}`,
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
          router.push("/table/table_product_category");
        }, 2500);
      }
    } catch (errors) {
      console.log("e", errors);
      const ermsg = errors?.response?.data?.message;

      if (ermsg) {
        toast.error(ermsg);
        return;
      }

      const errmsg = errors?.response?.data?.error;
      console.log("fefef", errors);

      if (errmsg?.includes("pcat_name_1")) {
        toast.error("Product Category is Duplicate");
      } else if (errmsg?.includes("brand_code_1")) {
        toast.error("Brand Id is duplicate");
      } else if (errors.message === "Network Error") {
        toast.error("Network Error. Please check your connection");
      } else if (errors?.response?.status === 413) {
        toast.error("Image size is too large");
      } else {
        toast.error(errmsg || "Something went wrong");
      }
    }
  };

  const handleSubmit = (e) => {
    if (router.query.type !== "Edit") {
      handleSaveCat(e);
    } else {
      handleEditCat(e);
    }
  };

  const [companyInfo, setCompanyInfo] = useState([]);

  const getCompanyInfo = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_company_information`, { headers: headers });
      const respda = await resp.data.data;
      const filterCompanyInfo = respda.filter((item) => item?.isDeleted == false);
      setCompanyInfo(filterCompanyInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const filterCompanyInfo = companyInfo.filter((item) => item.isDeleted == false);
  console.log("hcekc", filterCompanyInfo);

  // Uploading Image....................................

  //Check File Size

  const checkFileSize = (file) => {
    const maxSize = 200000;
    if (file.size > maxSize) {
      toast.error("Image Size Must be Less than 200 KB");
      return false;
    }
    return true;
  };

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const renamedBlob = new Blob([file], { type: file?.type });
      if (!checkFileSize(file)) {
        return;
      }

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      if (file) {
        setUserImage(URL.createObjectURL(file));
      }
      if (renamedBlob) {
        const formData = new FormData();
        formData.append("myFile", renamedBlob, `${file.name}`);
        console.log("Named", formData);

        if (!renamedBlob) {
          console.error("Error creating renamed file.");
          return;
        }

        // return;
        const res = await axios.post(
          `${url}/api/upload_file/?file_path=product_category&image_name=${file.name}&c_id=${formState?.c_id}&pcat_name=${formState?.pcat_name}`,
          formData
        );
        const respo = await res.data;

        console.log("fileupres", respo);
      }
      if (file) {
        setUserImage(URL.createObjectURL(file));
        // setUserImage(file);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Second Handle Image Upload

  // const handleImageCreate = async (e) => {
  //   try {
  //     const file = e.target.files[0];
  //     if (!checkFileSize(file)) {
  //       return;
  //     }
  //     setTempImage(file);

  //     if (file) {
  //       setUserImage(URL.createObjectURL(file));
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

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
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className=" overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl tabletitle py-2">Product Category </h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h2>
                <TiArrowBack
                  onClick={() => {
                    router.push("/table/table_product_category");
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
                  {/* <div className="absolute right-20">
                    <div className="profpic relative group">
                      <img
                        src={userImage ? userImage : userImage}
                        className="h-32 w-32 rounded-full bg-gray-200"
                        width={100}
                        height={100}
                      />
                      <input
                        type="file"
                        accept=".jpeg,.jpg"
                        onChange={handleImageCreate}
                        style={{ display: "none" }}
                        id="fileInput"
                        ref={fileInputRef}
                        disabled={router.query.type == "view"}
                      />

                      <label
                        htmlFor="fileInput"
                        here
                        make
                        the
                        opacity-0
                        to
                        get
                        hover
                        text
                        effect
                        className={`text-black absolute text-center font-semibold top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                          userImage == "" ? "opacity-50" : "opacity-0"
                        } ${
                          userImage !== "" ? "group-hover:opacity-100" : "group-hover:opacity-0"
                        }  transition-opacity duration-300`}
                      >
                        <span className="text-red-500 ">*</span>
                        <span className="cursor-pointer px-2">Upload Image</span>
                      </label>
                    </div>
                  </div> */}

                  <div className="absolute right-20">
                    <label className="block text-gray-700 text-center text-sm font-bold mb-2">
                      Product Category Image
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
                          disabled={!formState.pcat_name || !formState.c_id}
                        />
                      )}
                    </div>
                    {(!formState.pcat_name || !formState.c_id) && (
                      <p className="text-sm text-gray-500 mt-1">
                        Please fill in Product Category and Company first
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-1/6 px-2 mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
                      htmlFor="inputField"
                    >
                      Category ID
                    </label>
                    <input
                      disabled
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder=""
                      value={router.query.type == "CREATE" ? "Auto Generated" : formState?.pcat_id}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-2 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap"
                      htmlFor="inputField"
                    >
                      <span className="text-red-500 px-1">*</span>Product Category
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder="Input Product Category"
                      value={formState.pcat_name}
                      onChange={(e) => {
                        setFromState({
                          ...formState,
                          pcat_name: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-full lg:w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Company
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
                      {/* <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select Company Name
                      </option>
                      <option value="WCL">WCL</option>
                      <option value="PCL">PCL</option> */}
                      <option value={""} className="focus:outline-none focus:border-b bg-white">
                        Select Options
                      </option>
                      {companyInfo.map((option) => (
                        <option
                          // value={option?.description}
                          value={option?.c_id}
                          className="focus:outline-none focus:border-b bg-white"
                        >
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
                        router.push("/table/table_product_category");
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

export default ProductCategory;
