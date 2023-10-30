import React, { useState } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import WillLog from "../public/Willowood.png";
import Image from "next/image";
import Select from "react-select";

const MaterialSkuInfo = () => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);

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

  const handleSubmit =(e)=>{
    e.preventDefault()
  }

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

          {/* <div className="bg-gray-300"></div> */}
          <div className="text-black h-screen  ">
            <div className="bg-gray-100 p-4  h-sceen ">
              <form onSubmit={handleSubmit} className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4">
                <div className="flex -mx-2 mb-4 flex-col">
                  <div className="w-1/6 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      Material Code
                    </label>
                    <input
                      disabled
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder=""
                    />
                  </div>
                  <div className="wrapban flex mr-12">
                    <div className="group w-full">
                      <div className="w-1/2 px-2 ">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                          <span className="text-red-500 px-1">*</span>Material Name
                        </label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="inputField"
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
                          placeholder="Input Technical Spec"
                        />
                      </div>
                    </div>
                    <div className="banner border-2 flex flex-col items-center justify-center w-1/2  ">
                      <div className=" ">
                        <h2 className="text-lg text-center mb-2">Upload Banner Image</h2>
                        <input type="file" />
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
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        UOM
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>
                </div>

                {/* wrapper box */}
                <div className="flex items-center w-full">
                  {/* <div className="flex -mx-2 mb-4"> */}
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Product Category
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>
                  {/* </div> */}
                  {/* <div className="flex -mx-2 mb-4"> */}
                  <div className="w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Product Segment
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
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
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
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
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>

                  {/* <div className="w-1/2 px-2 mt-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Crop
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                    >
                      <option value="" className="focus:outline-none focus:border-b bg-white">
                        Select
                      </option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div> */}

                  <div className="w-1/2 px-2 mt-2 ">
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
                    />
                  </div>
                </div>

                <div className="thirdWrapper flex flex-col items-start justify-start w-full mt-4 py-1 px-4 border-b border-2 ">
                  <h2 className="w-full my-2 ">Packging Standard Information</h2>
                  <div className="flex w-full flex-wrap">
                    <div className="w-1/6 px-1 mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                        Gross Wt.
                      </label>
                      <input
                        className="placeholder:text-xs w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="inputField"
                        placeholder="Input Gross Wt."
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
                      >
                        <option value="" className="focus:outline-none focus:border-b bg-white">
                          Select
                        </option>
                        <option value="user1">User 1</option>
                        <option value="user2">User 2</option>
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
                        placeholder="Input Packing Des"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-gray-700 text-sm font-bold " htmlFor="inputField">
                        Batch Active
                      </label>
                      <input
                        className=" px-1 py-1 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="radio"
                        id="inputField"
                        placeholder=""
                      />
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
                  >
                    <option value="" className="focus:outline-none focus:border-b bg-white">
                      Select
                    </option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
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
