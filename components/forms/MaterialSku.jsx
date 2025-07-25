import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import WillLog from "../../public/Willowood.png";
import Image from "next/image";
import Select from "react-select";
import axios from "axios";
import { url } from "@/constants/url";
import { uomlist } from "@/constants/uomlist";
import toast, { Toaster } from "react-hot-toast";

const MaterialSkuInfo = () => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [banner, setSelectBanner] = useState(null);
  const [prdCat, setPrdCat] = useState([]);
  const [prdSeg, setPrdSegment] = useState([]);
  const [prdBrand, setPrdBrand] = useState([]);
  const [cropIds, setCropId] = useState([]);
  const banImage = new FormData();
  banImage.append("banner", banner);

  //New State

  const [tempBanner, setTempBanner] = useState([]);
  const [BannerPrevImg, setBannerPrevImg] = useState([]);

  const [tempImages, setTempImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [tempDocs, setTempDocs] = useState([]);
  const [docsPreview, setDocsPreview] = useState([]);

  const [tempVideos, setTempVideos] = useState([]);
  const [vidsPreview, setVidsPreview] = useState([]);

  let { id, view, CREATE } = router.query;

  const [formData, setFormData] = useState({
    mat_code: "",
    mat_name: "",
    matnr: "",
    techn_spec: "",
    uom: "",
    crop_id: "",
    pcat_id: "",
    pseg_id: "",
    brand_code: "",
    wgt_uom: "",
    batch: "",
    c_name: "",
    c_id: "",
    gross_wgt: "",
    net_wgt: "",
    packing_size: "",
    pack_size: "",
    division: "",
    brand_name: ""
  });

  //appending Images

  // const handleImageUpload = (e) => {
  //   e.preventDefault();
  //   const files = e.target.files;

  //   const newImages = Array.from(files);
  //   setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  // };

  //////////////////////// Image Banner Handler ////////////////////////////////

  const handleBannerChange = (e) => {
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

    setTempBanner(file);
    const previewUrl = URL.createObjectURL(file);
    setBannerPrevImg(previewUrl);
  };

  /////////////////////Image Handler ////////////////////////

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file?.type)) {
        toast.error(`${file.name} is not a valid image. Only JPG, JPEG, or PNG allowed.`);
        return false;
      }
      if (file?.size > maxSize) {
        toast.error(`${file.name} exceeds the 2MB size limit.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setTempImages((prevImages) => [...prevImages, ...validFiles]);

    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setTempImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  ////////////////////// Handle Documents Uplaoding     ////

  const handleDocsChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["application/pdf", "application/msword"];
    const maxSize = 5 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file?.type)) {
        toast.error(`${file.name} is not a valid document. Only PDF, DOCX, or TXT allowed.`);
        return false;
      }
      if (file?.size > maxSize) {
        toast.error(`${file.name} exceeds the 5MB size limit.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setTempDocs((prevDocs) => [...prevDocs, ...validFiles]);

    setDocsPreview((prevPreviews) => [...prevPreviews, ...validFiles.map((file) => file.name)]);
  };

  const handleRemoveDocs = (index) => {
    setDocsPreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setTempDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  ////////////////////// Handler For Video Upload ////////////////////

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["video/mp4"];
    const maxSize = 50 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file?.type)) {
        toast.error(`${file.name} is not a valid video. Only MP4, AVI, or MOV allowed.`);
        return false;
      }
      if (file?.size > maxSize) {
        toast.error(`${file.name} exceeds the 50MB size limit.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setTempVideos((prevVideos) => [...prevVideos, ...validFiles]);

    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setVidsPreview((prevPreviews) => [...prevPreviews, ...newPreviewUrls]);
  };

  const handleRemoveVideo = (index) => {
    setVidsPreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setTempVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  const openFileInput = (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };

  const openDocsInput = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("docsUpload");
    fileInput.click();
  };
  const openVideoInput = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("videoUpload");
    fileInput.click();
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeDocs = (index) => {
    selectedDocs((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const options = [
    { value: "rabi", label: "Rabi" },
    { value: "kharif", label: "Kharif" }
  ];

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  //dropdown list

  const [allCompanyInfo, setAllCompanyInfo] = useState([]);

  const getCompanyInfo = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_company_information`, { headers: headers });
      const respda = await resp.data.data;
      setAllCompanyInfo(respda.filter((item) => item.isDeleted == false));
    } catch (error) {
      console.log(error);
    }
  };

  const getProductCategory = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_category`, { headers: headers });
      const respdata = await resp.data.data;
      setPrdCat(respdata.filter((item) => item.isDeleted == false));
    } catch (error) {
      console.log("ee", error);
    }
  };

  const gettingProductSegment = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_segment`, { headers: headers });
      const respData = await resp.data.data;
      setPrdSegment(respData.filter((item) => item.isDeleted == false));
    } catch (error) {
      console.log(error);
    }
  };

  const gettingPrdBrand = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_brand`, { headers: headers });
      const respData = await resp.data.data;
      setPrdBrand(respData.filter((item) => item.isDeleted == false));
    } catch (error) {
      console.log("err", error);
    }
  };

  const gettingCropId = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_crop`, { headers: headers });
      const respData = await resp.data.data;
      setCropId(respData.filter((item) => item.isDeleted == false));
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getProductCategory();
    gettingProductSegment();
    gettingPrdBrand();
    getCompanyInfo();
    gettingCropId();
  }, []);

  const handleBannerUpload = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setSelectBanner(e.target.files[0]);
  };

  const handleSaveMatSku = async (e) => {
    e.preventDefault();
    try {
      const data = {
        mat_code: formData?.mat_code,
        mat_name: formData?.mat_name,
        matnr: formData?.matnr,
        techn_spec: formData?.techn_spec,
        uom: formData?.uom,
        crop_id: formData?.crop_id,
        pcat_id: formData?.pcat_id,
        pseg_id: formData?.pseg_id,
        brand_code: formData?.brand_code,
        wgt_uom: formData?.wgt_uom,
        batch: formData?.batch,
        c_name: formData?.c_name,
        c_id: formData?.c_id,
        gross_wgt: formData?.gross_wgt,
        net_wgt: formData?.net_wgt,
        packing_size: formData?.packing_size,
        pack_size: formData?.pack_size,
        division: formData?.division
      };
      const resp = await axios.post(`${url}/api/create_product_material_sku`, JSON.stringify(data), {
        headers: headers
      });
      const respData = await resp.data.data;
      console.log("post", respData);

      const respdata = await resp.data;
      console.log("saved", respdata);
      if (respdata) {
        toast.success(respdata.message);

        const uploadPromises = [];

        if (tempBanner) {
          const bannerFormData = new FormData();
          bannerFormData.append("myFile", tempBanner);

          uploadPromises.push(
            axios.post(
              `${url}/api/upload_file?matnr=${
                formData?.matnr
              }&c_id=${+formData?.c_id}&file_path=product_material&image_name=${tempBanner?.name}`,
              bannerFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        }

        if (tempImages && tempImages.length > 0) {
          const imageFormData = new FormData();
          tempImages.forEach((image) => {
            imageFormData.append("images", image);
          });

          uploadPromises.push(
            axios.post(
              `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
              imageFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        }

        if (tempDocs && tempDocs.length > 0) {
          const docsFormData = new FormData();
          tempDocs.forEach((image) => {
            docsFormData.append("docs", image);
          });

          uploadPromises.push(
            axios.post(
              `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
              docsFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        }

        if (tempVideos && tempVideos.length > 0) {
          const videoFormData = new FormData();
          tempVideos.forEach((image) => {
            videoFormData.append("videos", image);
          });

          uploadPromises.push(
            axios.post(
              `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
              videoFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        }

        await Promise.all(uploadPromises);
        console.log("All files uploaded successfully");
        toast.success("All files uploaded successfully");

        setTimeout(() => {
          router.push("/table/table_material_sku");
        }, 300);
      }
    } catch (errors) {
      const ermsg = errors?.response?.data?.message;
      if (ermsg) {
        toast.error(ermsg);
        return;
      }
      const errmsg = errors?.response?.data?.error;
      console.log("fefef", errmsg);
      if (errmsg?.includes("mat_name_1")) {
        toast.error("Material Name already exist");
      } else if (errmsg?.includes("techn_spec_1")) {
        toast.error("Technical Spec already exist");
      } else if (errmsg?.includes("matnr_1")) {
        toast.error("Material Code already exist.");
      } else {
        toast.error(errmsg);
      }
    }
  };

  /////////////////////Edit MatSku//////////////////////////////////////

  // const handleEditMatSku = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const Editdata = {
  //       mat_code: formData?.mat_code,
  //       mat_name: formData?.mat_name,
  //       matnr: formData?.matnr,
  //       techn_spec: formData?.techn_spec,
  //       uom: formData?.uom,
  //       crop_id: formData?.crop_id,
  //       pcat_id: formData?.pcat_id,
  //       pseg_id: formData?.pseg_id,
  //       brand_code: formData?.brand_code,
  //       wgt_uom: formData?.wgt_uom,
  //       batch: formData?.batch,
  //       // c_name: formData?.c_name,
  //       c_id: formData?.c_id,
  //       net_wgt: formData?.net_wgt,
  //       gross_wgt: formData?.gross_wgt,
  //       packing_size: formData?.packing_size,
  //       pack_size: formData?.pack_size,
  //       division: formData?.division
  //     };

  //     try {
  //       const uploadPromises = [tempBanner].map((image) => {
  //         const bannerFormData = new FormData();
  //         bannerFormData.append("banner", image);

  //         return axios.post(
  //           `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
  //           bannerFormData,
  //           {
  //             headers: {
  //               ...headers,
  //               "Content-Type": "multipart/form-data"
  //             }
  //           }
  //         );
  //       });

  //       const responses = await Promise.all(uploadPromises);
  //       console.log("Image uploaded", responses);

  //       toast.success("Image uploaded successfully");

  //     } catch (error) {
  //       console.error("Error uploading image", error);
  //       toast.error("Failed to upload image");
  //     }

  //     try {
  //       const uploadPromises = tempImages.map((image) => {
  //         const imageFormData = new FormData();
  //         imageFormData.append("images", image);

  //         return axios.post(
  //           `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,

  //           imageFormData,
  //           {
  //             headers: {
  //               ...headers,
  //               "Content-Type": "multipart/form-data"
  //             }
  //           }
  //         );
  //       });

  //       const responses = await Promise.all(uploadPromises);
  //       console.log("All images uploaded", responses);

  //       toast.success("All images uploaded successfully");
  //     } catch (error) {
  //       console.error("Error uploading images", error);
  //       toast.error("Failed to upload one or more images");
  //     }

  //     try {
  //       const uploadPromises = tempDocs.map((doc) => {
  //         const docsFormData = new FormData();
  //         docsFormData.append("docs", doc);

  //         return axios.post(
  //           `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,

  //           docsFormData,
  //           {
  //             headers: {
  //               ...headers,
  //               "Content-Type": "multipart/form-data"
  //             }
  //           }
  //         );
  //       });

  //       const responses = await Promise.all(uploadPromises);
  //       console.log("All docs uploaded", responses);

  //       toast.success("All docs uploaded successfully");
  //     } catch (error) {
  //       console.error("Error uploading images", error);
  //       toast.error("Failed to upload one or more images");
  //     }

  //     return;
  //     const emptyFields = Object.entries(Editdata)
  //       .filter(([key, value]) => value === "")
  //       .map(([key]) => key);
  //     if (emptyFields.length > 0) {
  //       const customMessages = {
  //         mat_name: "Material Name",
  //         matnr: "Material Code",
  //         techn_spec: "Technical Spec"
  //       };
  //       const requiredFields = emptyFields.map((field) => customMessages[field] || field);
  //       toast.error(`${requiredFields.join(", ")} is required.`);
  //     } else {
  //       const resp = await axios.put(
  //         `${url}/api/update_product_material_sku/${id}`,
  //         JSON.stringify(Editdata),
  //         {
  //           headers: headers
  //         }
  //       );
  //       const respdata = await resp.data;
  //       if (respdata) {
  //         toast.success(respdata.message);
  //         setTimeout(() => {
  //           router.push("/table/table_material_sku");
  //         }, 2500);
  //       }
  //     }
  //   } catch (errors) {
  //     const ermsg = errors.response.data.message;
  //     // if(ermsg){
  //     //   toast.error(ermsg)
  //     //   return
  //     // }
  //     const errmsg = errors.response.data.error;
  //     console.log("fefef", errors);
  //     if (errmsg?.includes("mat_name_1")) {
  //       toast.error("Material Name already exist");
  //     } else if (errmsg?.includes("techn_spec_1")) {
  //       toast.error("Technical Spec already exist");
  //     } else if (errmsg?.includes("matnr_1")) {
  //       toast.error("Material Code already exist.");
  //     } else {
  //       toast.error(errmsg);
  //     }
  //   }
  // };

  const handleEditMatSku = async (e) => {
    e.preventDefault();

    try {
      const Editdata = {
        mat_code: formData?.mat_code,
        mat_name: formData?.mat_name,
        matnr: formData?.matnr,
        techn_spec: formData?.techn_spec,
        uom: formData?.uom,
        crop_id: formData?.crop_id,
        pcat_id: formData?.pcat_id,
        pseg_id: formData?.pseg_id,
        brand_code: formData?.brand_code,
        wgt_uom: formData?.wgt_uom,
        batch: formData?.batch,
        c_id: formData?.c_id,
        net_wgt: formData?.net_wgt,
        gross_wgt: formData?.gross_wgt,
        packing_size: formData?.packing_size,
        pack_size: formData?.pack_size,
        division: formData?.division
      };

      const resp = await axios.put(`${url}/api/update_product_material_sku/${id}`, JSON.stringify(Editdata), {
        headers: headers
      });

      const respdata = await resp.data;
      if (respdata) {
        toast.success(respdata.message);

        const uploadPromises = [];

        // if (tempBanner) {
        //   const bannerFormData = new FormData();
        //   bannerFormData.append("myFile", tempBanner);

        //   uploadPromises.push(
        //     axios.post(
        //       `${url}/api/upload_file?matnr=${
        //         formData?.matnr
        //       }&c_id=${+formData?.c_id}&file_path=product_material&image_name=${tempBanner?.name}`,
        //       bannerFormData,
        //       {
        //         headers: { ...headers, "Content-Type": "multipart/form-data" }
        //       }
        //     )
        //   );
        // }

        if (typeof tempBanner === "string") {
          const response = await fetch(tempBanner);
          const blob = await response.blob();

          const file = new File([blob], "existing_banner.jpg", { type: blob.type });

          const bannerFormData = new FormData();
          bannerFormData.append("myFile", file);

          uploadPromises.push(
            axios.post(
              `${url}/api/upload_file?matnr=${
                formData?.matnr
              }&c_id=${+formData?.c_id}&file_path=product_material&image_name=${file.name}`,
              bannerFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        } else if (tempBanner instanceof File) {
          const bannerFormData = new FormData();
          bannerFormData.append("myFile", tempBanner);

          uploadPromises.push(
            axios.post(
              `${url}/api/upload_file?matnr=${
                formData?.matnr
              }&c_id=${+formData?.c_id}&file_path=product_material&image_name=${tempBanner?.name}`,
              bannerFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        }

        // if (tempImages && tempImages.length > 0) {
        //   const imageFormData = new FormData();
        //   imagePreviews.forEach((url) => {
        //     imageFormData.append("previousImages", url);
        //   });
        //   tempImages.forEach((image) => {
        //     imageFormData.append("images", image);
        //   });

        //   uploadPromises.push(
        //     axios.post(
        //       `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
        //       imageFormData,
        //       {
        //         headers: { ...headers, "Content-Type": "multipart/form-data" }
        //       }
        //     )
        //   );
        // }

        // if (tempDocs && tempDocs.length > 0) {
        //   const docsFormData = new FormData();
        //   tempDocs.forEach((image) => {
        //     docsFormData.append("docs", image);
        //   });

        //   uploadPromises.push(
        //     axios.post(
        //       `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
        //       docsFormData,
        //       {
        //         headers: { ...headers, "Content-Type": "multipart/form-data" }
        //       }
        //     )
        //   );
        // }

        // if (tempVideos && tempVideos.length > 0) {
        //   const videoFormData = new FormData();
        //   tempVideos.forEach((image) => {
        //     videoFormData.append("videos", image);
        //   });

        //   uploadPromises.push(
        //     axios.post(
        //       `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
        //       videoFormData,
        //       {
        //         headers: { ...headers, "Content-Type": "multipart/form-data" }
        //       }
        //     )
        //   );
        // }

        if (
          (tempImages && tempImages.length > 0) ||
          (tempDocs && tempDocs.length > 0) ||
          (tempVideos && tempVideos.length > 0)
        ) {
          const combinedFormData = new FormData();

          if (tempImages && tempImages.length > 0) {
            imagePreviews.forEach((url) => {
              combinedFormData.append("previousImages", url);
            });
            tempImages.forEach((image) => {
              combinedFormData.append("images", image);
            });
          }

          if (tempDocs && tempDocs.length > 0) {
            tempDocs.forEach((doc) => {
              combinedFormData.append("docs", doc);
            });
          }

          if (tempVideos && tempVideos.length > 0) {
            tempVideos.forEach((video) => {
              combinedFormData.append("videos", video);
            });
          }

          uploadPromises.push(
            axios.post(
              `${url}/api/upload-multiple?matnr=${formData?.matnr}&c_id=${+formData?.c_id}`,
              combinedFormData,
              {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
              }
            )
          );
        }

        await Promise.all(uploadPromises);
        console.log("All files uploaded successfully");
        toast.success("All files uploaded successfully");

        setTimeout(() => {
          router.push("/table/table_material_sku");
        }, 300);
      }
    } catch (error) {
      console.error("Error", error);
      const errmsg = error.response?.data?.error || error.message;

      if (errmsg?.includes("mat_name_1")) {
        toast.error("Material Name already exists");
      } else if (errmsg?.includes("techn_spec_1")) {
        toast.error("Technical Spec already exists");
      } else if (errmsg?.includes("matnr_1")) {
        toast.error("Material Code already exists");
      } else {
        toast.error(errmsg || "Failed to update material");
      }
    }
  };

  const gettingMatSkuid = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_product_material_sku/?mat_id=${id}`, { headers: headers });
      const respdata = await resp.data.data;
      setFormData({
        mat_code: respdata[0]?.mat_id,
        mat_name: respdata[0]?.mat_name,
        matnr: respdata[0]?.matnr,
        techn_spec: respdata[0]?.techn_spec,
        uom: respdata[0]?.uom,
        crops: [],
        crop_id: respdata[0]?.crop_id,
        pcat_id: respdata[0]?.pcat_id,
        pseg_id: respdata[0]?.pseg_id,
        brand_code: respdata[0]?.brand_code,
        wgt_uom: respdata[0]?.wgt_uom,
        batch: respdata[0]?.batch,
        c_name: respdata[0]?.c_name,
        c_id: respdata[0]?.c_id,
        gross_wgt: respdata[0]?.gross_wgt,
        packing_size: respdata[0]?.packing_size,
        net_wgt: respdata[0]?.net_wgt,
        pack_size: respdata[0]?.pack_size,
        division: respdata[0]?.division,
        brand_name: respdata[0]?.brand_name
      });
      setBannerPrevImg(respdata[0]?.product_banner);
      const validImages = respdata[0]?.images?.filter((image) => image !== null);
      const validDocs = respdata[0]?.docs?.filter((doc) => doc !== null);
      const validVideos = respdata[0]?.videos?.filter((vid) => vid !== null);
      setDocsPreview(validDocs || []);
      setImagePreviews(validImages || []);
      setVidsPreview(validVideos || []);
      console.log("getbyid", respdata);
    } catch (error) {}
  };

  // useEffect(() => {
  //   gettingMatSkuid(id);
  // }, [id]);

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (id || view) gettingMatSkuid(id);
  }, [id, view]);

  const handleSubmit = (e) => {
    if (router.query.type !== "Edit") {
      handleSaveMatSku(e);
    } else {
      handleEditMatSku(e);
    }
  };

  console.log("Images", imagePreviews);

  return (
    <>
      <Layout>
        <div className=" overflow-auto w-full font-arial bg-white ">
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">Material SKU Information </h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h2>
                <TiArrowBack
                  onClick={() => {
                    router.push("/table/table_material_sku");
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

          <div className="text-black  ">
            <div className="bg-gray-100 p-4   ">
              <form
                // onSubmit={handleSubmit}
                onSubmit={(e) => e.preventDefault()}
                disabled={router.query.type === "CREATE"}
                className=" mx-2 mt mb-12 bg-white rounded shadow p-2"
              >
                <div className="flex -mx-2 mb-4 flex-col">
                  <div className="w-1/2 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      <span className="text-red-500 ">*</span> Mat Code
                    </label>
                    <input
                      className="w-1/ px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      pattern="[0-9]*"
                      value={formData?.mat_code}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mat_code: e.target.value
                        });
                      }}
                      placeholder="Input Unique Material Code"
                    />
                  </div>

                  <div className="w-1/2 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      <span className="text-red-500 ">*</span> Material Code
                    </label>
                    <input
                      className="w-1/2 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      maxLength={10}
                      minLength={10}
                      id="inputField"
                      pattern="[0-9]*"
                      value={formData?.matnr}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          matnr: e.target.value
                        });
                      }}
                      placeholder="Input Unique Matnr Code"
                    />
                  </div>
                  <div className="wrapban flex mr-12">
                    <div className="group w-full">
                      <div className="w-1/2 px-2 ">
                        <label
                          className="bpcatIdlock text-gray-700 text-sm font-bold mb-2"
                          htmlFor="inputField"
                        >
                          <span className="text-red-500 px-1">*</span>Material Name
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          value={formData?.mat_name}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              mat_name: e.target.value
                            });
                          }}
                          placeholder="Input Material Name"
                        />
                      </div>

                      <div className="w-1/2 px-2 mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                          <span className="text-red-500 px-1">*</span>Techincal Spec
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
                          value={formData?.techn_spec}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              techn_spec: e.target.value
                            });
                          }}
                          placeholder="Input Technical Spec"
                        />
                      </div>
                    </div>
                    {/* <div className="banner border- flex flex-col items-center justify-center w-1/3">
                      <div className=" ">
                        <h2 className="text-lg text-center mb-2">Upload Banner Image</h2>
                        <input type="file" onChange={handleBannerChange} />
                      </div>
                      <Image className="w-auto h-32" src={WillLog} alt="" />
                    </div> */}

                    <div className="absolute right-20">
                      <label className="block text-gray-700 text-center text-sm font-bold mb-2">
                        Upload Banner Image
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center flex-col space-x-4">
                        {BannerPrevImg && (
                          <div className="relative">
                            <img
                              src={BannerPrevImg}
                              alt="Preview"
                              className="lg:w-32 lg:h-32 w-20 h-20 object-cover rounded-full"
                            />
                            {router.query.type !== "view" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setTempBanner("");
                                  setBannerPrevImg("");
                                }}
                                className="absolute lg:w-8 lg:h-8 w-4 h-4 top-1 right-2 lg:top-0 lg:right-0 bg-red-500 text-white rounded-full "
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
                            onChange={handleBannerChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
                            // disabled={!formState.brand_name || !formState.c_name}
                          />
                        )}
                      </div>
                      {/* {(!formState.brand_name || !formState.c_name) && (
                      <p className="text-sm text-gray-500 mt-1">
                        Please fill in Product Brand and Company first
                      </p>
                    )} */}
                    </div>
                  </div>

                  <div className="w-1/2 px-2 mt-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>UOM
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formData?.uom}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          uom: e.target.value
                        });
                      }}
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        UOM
                      </option>
                      {uomlist.map((list) => (
                        <option value={list.unit}>{list.text}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* wrapper box */}
                <div className="flex items-center w-full">
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Product Category
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formData?.pcat_id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          pcat_id: e.target.value
                        });
                      }}
                    >
                      <option value={""} className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      {prdCat.map((item) => (
                        <option value={item.pcat_id}>{item.pcat_name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="tepcatIdxt-red-500 p-1">*</span>Product Segment
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formData?.pseg_id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          pseg_id: e.target.value
                        });
                      }}
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      {prdSeg.map((item) => (
                        <option value={item.pseg_id}>{item.pseg_name}</option>
                      ))}
                    </select>
                  </div>
                  {/* </div> */}
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Product Brand
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formData?.brand_code}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          brand_code: e.target.value
                        });
                      }}
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      {prdBrand.map((item) => (
                        <option value={item.brand_code}>{item.brand_name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className=" secondWrapper flex items-center w-full">
                  <div className="w-1/2 px-2 mt-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Division
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formData?.division}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          division: e.target.value
                        });
                      }}
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      <option value="Fungicides">Fungicides</option>
                      <option value="Herbicides">Herbicides</option>
                      <option value="Insecticides">Insecticides</option>
                      <option value="PGR">PGR</option>
                      <option value="PGP & Others">PGP & Others</option>
                    </select>
                  </div>

                  <div className="w-1/2 px-2 mt-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Crop
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formData?.crop_id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          crop_id: e.target.value
                        });
                      }}
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      {cropIds.map((item) => (
                        <option value={item.cr_id}>
                          {item.crop_name} ({item.season_name})
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="w-1/2 px-2 mt-2 ">
                    <label
                      className="block border-none text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <span className="text-red-500 p-1">*</span>Crop
                    </label>
                    <Select
                      options={options}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={options.filter((option) => formData.crops.includes(option.value))}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          crops: e.map((option) => option.value)
                        });
                      }}
                    />
                  </div> */}
                </div>

                <div className="thirdWrapper flex flex-col items-start justify-start w-full mt-4 py-1 px-4 border-b border-2 ">
                  <h2 className="w-full my-2 ">Packging Standard Information</h2>
                  <div className="flex w-full flex-wrap ">
                    <div className="w-1/6 px-1 mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                        Gross Wt.
                      </label>
                      <input
                        className="placeholder:text-xs w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        placeholder="Input Gross Wt."
                        value={formData?.gross_wgt}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            gross_wgt: e.target.value
                          });
                        }}
                      />
                    </div>

                    <div className="w-1/6 px-2 mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                        Net Wt.
                      </label>
                      <input
                        className="placeholder:text-xs w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        value={formData?.net_wgt}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            net_wgt: e.target.value
                          });
                        }}
                        placeholder="Input Net Wt."
                      />
                    </div>

                    <div className="w-1/4 px-2 mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                        <span className="text-red-500 p-1">*</span>Weight UM
                      </label>
                      <select
                        className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                        id="userSelect"
                        value={formData?.wgt_uom}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            wgt_uom: e.target.value
                          });
                        }}
                      >
                        <option value="" className="focus:outline-none focus:border-b bg-white">
                          Select
                        </option>
                        {uomlist.map((list) => (
                          <option value={list.unit}>{list.text}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-1/6 px-2 mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                        Pack Size
                      </label>
                      <input
                        className=" placeholder:text-xs w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        value={formData?.pack_size}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            pack_size: e.target.value
                          });
                        }}
                        placeholder="Input Pack Size"
                      />
                    </div>

                    <div className="w-1/6 px-2 mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                        Packing Des.
                      </label>
                      <input
                        className=" placeholder:text-xs w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        value={formData?.packing_size}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            packing_size: e.target.value
                          });
                        }}
                        placeholder="Input Packing Des"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="inputField">
                        Batch Active
                      </label>
                      <input
                        className="px-1 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="radio"
                        id="option1"
                        value="true"
                        checked={formData?.batch === "true" || formData?.batch === true}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            batch: e.target.value === "true"
                          });
                        }}
                      />
                      <label htmlFor="option1">Yes</label>
                      <input
                        className="px-1 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="radio"
                        id="option2"
                        value="false"
                        checked={formData?.batch === "false" || formData?.batch === false}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            batch: e.target.value === "true"
                          });
                        }}
                      />
                      <label htmlFor="option2">No</label>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 px-2 mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                    <span className="text-red-500 p-1">*</span>Company
                  </label>
                  <select
                    className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="userSelect"
                    value={formData.c_id}
                    onChange={(e) => {
                      // const selectedCId = e.target.value;
                      setFormData({
                        ...formData,
                        c_id: e.target.value
                      });
                    }}
                  >
                    <option value="" className="focus:outline-none focus:border-b bg-white">
                      Select
                    </option>
                    {allCompanyInfo.map((option) => (
                      <option
                        value={option?.c_id}
                        onChange={(e) => {
                          setFormData({
                            ...formState,
                            c_id: e.target.value
                          });
                        }}
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        {option?.cmpny_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="uploadImageDiv w-1/2 px-2 mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUpload">
                    <span className="text-red-500 p-1">*</span>Upload Image
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    id="imageUpload"
                    onChange={handleImageChange}
                  />
                  <div className="borde border-gray-300 p-2 rounded mt-2 flex">
                    {imagePreviews?.map((image, index) => (
                      <div className="w-32 h-32  flex items-center justify-center gap-2 px-2">
                        <div key={index} className="mb-2 relative">
                          <img src={image} alt={`Uploaded Image ${index}`} className="max-w-full" />
                          {router.query.type !== "view" && (
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded-full absolute top-2 right-2"
                            >
                              X
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-indigo-500 hover-bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={openFileInput}
                  >
                    Select Image
                  </button>
                </div>

                <div className="uplpoadDocs w-1/2 px-2 mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUpload">
                    <span className="text-red-500 p-1">*</span>Upload Documents
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    id="docsUpload"
                    onChange={handleDocsChange}
                  />
                  <div className="borde border-gray-300 p-2 rounded mt-2 flex">
                    {docsPreview?.map((doc, index) => (
                      <div className="w-32 h-32  flex items-center justify-center gap-2 px-2">
                        <div key={index} className="mb-2 relative">
                          <iframe title="PDF Viewer" src={doc} width="100%" height="50px" />

                          {router.query.type !== "view" && (
                            <button
                              onClick={() => handleRemoveDocs(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded-full absolute top-2 right-2"
                            >
                              X
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-indigo-500 hover-bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={openDocsInput}
                  >
                    Select Docs
                  </button>
                </div>

                <div className="uplpoadVideos w-1/2 px-2 mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUpload">
                    <span className="text-red-500 p-1">*</span>Upload Video
                  </label>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="video/mp4"
                    onChange={handleVideoChange}
                    id="videoUpload"
                  />
                  <div className="borde border-gray-300 p-2 rounded mt-2 flex">
                    {vidsPreview.map((video, index) => (
                      <div className="w-32 h-32  flex items-center justify-center gap-2 px-2">
                        <div key={index} className="mb-2 relative">
                          <video src={video} controls className="w-64 h-36 rounded-lg shadow-md" />
                          {router.query.type !== "view" && (
                            <button
                              onClick={() => handleRemoveVideo(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded-full absolute top-2 right-2"
                            >
                              X
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-indigo-500 hover-bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={openVideoInput}
                  >
                    Select Video
                  </button>
                </div>

                {/* <div className="button flex items-center gap-3 mt-6">
                  <button className="bg-green-700 px-4 py-1 text-white">Save</button>
                  <button
                    onClick={() => {
                      router.push("/table/table_material_sku");
                    }}
                    className="bg-yellow-500 px-4 py-1 text-white"
                  >
                    Close
                  </button>
                </div> */}

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
                        router.push("/table/table_material_sku");
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

export default MaterialSkuInfo;
