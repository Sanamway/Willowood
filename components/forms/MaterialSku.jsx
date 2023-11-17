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

  const [formData, setFormData] = useState({
    mat_code: "",
    mat_name: "",
    matnr: "",
    techn_spec: "",
    uom: "",
    crops: [],
    crop_id: "",
    pcat_id: "",
    pseg_id: "",
    brand_code: "",
    wuom: "",
    batch: false,
    c_name: "",
    c_id: "",
    gross_wt: "",
    pack_desc: "",
    pack_size: "",
    division: "",
    banner: banImage
  });

  //appending Images

  const handleImageUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const newImages = Array.from(files);
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDocsUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const newDocs = Array.from(files);

    setSelectedDocs((prevImages) => [...prevImages, ...newDocs]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sub", formData);
    const formImage = new FormData();
    formImage.append("banner", banner);

    try {
      const resp = await axios.post(`${url}/api/create_product_material_sku`, formData, { headers: headers });
      const respData = await resp.data.data;
      console.log("post", respData);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("fdf", formData);

  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
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

          <div className="text-black h-screen  ">
            <div className="bg-gray-100 p-4  h-sceen ">
              <form onSubmit={handleSubmit} className=" mx-2 mt mb-12 bg-white rounded shadow p-2">
                <div className="flex -mx-2 mb-4 flex-col">
                  <div className="w-1/6 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      <span className="text-red-500 ">*</span> Mat Code
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
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

                  <div className="w-1/6 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      <span className="text-red-500 ">*</span> Material Code
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      maxLength={14}
                      minLength={14}
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
                    <div className="banner border-2 flex flex-col items-center justify-center w-1/2  ">
                      <div className=" ">
                        <h2 className="text-lg text-center mb-2">Upload Banner Image</h2>
                        <input type="file" onChange={handleBannerUpload} />
                      </div>
                      {/* <Image className="w-auto h-32" src={WillLog} alt="" /> */}
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
                      <option value="" className="focus:outline-none focus:border-b bg-white">
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
                      value={formData?.pseg_name}
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
                      value={formData?.brand_name}
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
                        value={formData?.gross_wt}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            gross_wt: e.target.value
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
                        value={formData?.net_wt}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            net_wt: e.target.value
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
                        value={formData?.wuom}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            wuom: e.target.value
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
                        value={formData?.pack_desc}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            pack_desc: e.target.value
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
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    onChange={handleImageUpload}
                  />
                  <div className="borde border-gray-300 p-2 rounded mt-2 flex">
                    {selectedImages.map((image, index) => (
                      <div className="w-32 h-32  flex items-center justify-center gap-2 px-2">
                        <div key={index} className="mb-2 relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded Image ${index}`}
                            className="max-w-full"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-full absolute top-2 right-2"
                          >
                            X
                          </button>
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
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    className="hidden"
                    id="docsUpload"
                    onChange={handleDocsUpload}
                  />
                  <div className="borde border-gray-300 p-2 rounded mt-2 flex">
                    {selectedDocs.map((image, index) => (
                      <div className="w-32 h-32  flex items-center justify-center gap-2 px-2">
                        <div key={index} className="mb-2 relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded Image ${index}`}
                            className="max-w-full"
                          />
                          <button
                            onClick={() => removeDocs(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-full absolute top-2 right-2"
                          >
                            X
                          </button>
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
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    className="hidden"
                    id="docsUpload"
                    onChange={handleDocsUpload}
                  />
                  <div className="borde border-gray-300 p-2 rounded mt-2 flex">
                    {selectedDocs.map((image, index) => (
                      <div className="w-32 h-32  flex items-center justify-center gap-2 px-2">
                        <div key={index} className="mb-2 relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded Image ${index}`}
                            className="max-w-full"
                          />
                          <button
                            onClick={() => removeDocs(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-full absolute top-2 right-2"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-indigo-500 hover-bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={openDocsInput}
                  >
                    Select Video
                  </button>
                </div>

                <div className="button flex items-center gap-3 mt-6">
                  <button className="bg-green-700 px-4 py-1 text-white">Save</button>
                  <button
                    onClick={() => {
                      router.push("/table/table_material_sku");
                    }}
                    className="bg-yellow-500 px-4 py-1 text-white"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MaterialSkuInfo;
