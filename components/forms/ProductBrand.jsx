import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const ProductBrand = () => {
  const router = useRouter();

  let { id, view, CREATE } = router.query;

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [formState, setFromState] = useState({
    brand_name: "",
    brand_code: "",
    pseg_id: "",
    c_name: "",
    status: true,
    c_id: "",
    pseg_name: "",
    ul_name: "WPCL"
  });

  const getPrdBrandById = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_product_brand/${id}`, { headers: headers });
      const respData = await resp.data.data;
      setFromState({
        brand_name: respData?.brand_name,
        brand_code: respData?.brand_code,
        pseg_id: respData?.pseg_id,
        c_name: respData?.c_name
      });
    } catch (error) {
      console.log("ee", error);
    }
  };

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (id) getPrdBrandById(id);
  }, [id]);

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    try {
      const Formdata = {
        brand_name: formState?.brand_name,
        brand_code: formState?.brand_code,
        pseg_id: formState?.pseg_id,
        c_name: formState?.c_name,
        status: formState?.status,
        c_id: formState?.c_name,
        pseg_name: formState?.pseg_name,
        ul_name: formState?.ul_name
      };
      const resp = await axios.post(`${url}/api/create_product_brand`, JSON.stringify(Formdata), {
        headers: headers
      });
      const respdata = await resp.data;
      console.log("saved", respdata);
      if (respdata) {
        toast.success(respdata.message);
        setTimeout(() => {
          router.push("/table/table_product_brand");
        }, 2500);
      }
    } catch (errors) {
      const ermsg = errors.response.data.message;
      const errmsg = errors.response.data.error;
      if(ermsg){
        toast.error(ermsg)
        return
      }
      console.log("fefef", errors)
      if (errmsg?.includes('brand_name_1')) {
        toast.error('Brand Name is Duplicate');
      }else if(errmsg?.includes('brand_code_1')){
        toast.error('Brand Id is duplicate')
      }else{
        toast.error(errmsg)
      }
    }
  };

  //Edit Brand

  const handleEditBrand = async (e) => {
    e.preventDefault();
    try {
      const Editdata = {
        brand_name: formState.brand_name,
        brand_code: formState.brand_code,
        pseg_id: formState.pseg_id,
        c_name: formState.c_name
      };
      const emptyFields = Object.entries(Editdata)
        .filter(([key, value]) => value === "")
        .map(([key]) => key);
      if (emptyFields.length > 0) {
        const customMessages = {
          c_name: "Company Name",
          pseg_id: "Product Segment",
          brand_code: "Brand Code",
          brand_name: "Brand Name"
        };
        const requiredFields = emptyFields.map((field) => customMessages[field] || field);
        toast.error(`${requiredFields.join(", ")} is required.`);
      } else {
        const resp = await axios.put(`${url}/api/update_product_brand/${id}`, JSON.stringify(Editdata), {
          headers: headers
        });
        const respdata = await resp.data;
        if (respdata) {
          toast.success(respdata.message);
          setTimeout(() => {
            router.push("/table/table_product_brand");
          }, 2500);
        }
      }
    } catch (errors) {
      const ermsg = errors.response.data.message;
      // if(ermsg){
      //   toast.error(ermsg)
        
      // }
      const errmsg = errors.response.data.error;
      console.log("fefef", errors)
      if (errmsg?.includes('brand_name_1')) {
        toast.error('Brand Name is Duplicate');
      }else if(errmsg?.includes('brand_code_1')){
        toast.error('Brand Id is duplicate')
      }else{
        toast.error(errmsg)
      }
    }
  };

  const handleSubmit = (e) => {
    if (router.query.type !== "Edit") {
      handleSaveBrand(e);
    } else {
      handleEditBrand(e);
    }
  };

  //getting companyinfo options

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

  //getting product segment descriptionn

  const [prdSegment, setPrdSegment] = useState([]);

  useEffect(() => {
    getCompanyInfo();
  }, []);

  useEffect(() => {
    gettingProductSegment(formState.c_name);
  }, [formState.c_name]);

  const gettingProductSegment = async (cId) => {
    try {
      const response = await axios.get(`${url}/api/get_product_segment`, { headers });
      const respdata = await response.data.data;
      setPrdSegment(respdata.filter((item) => Number(item.c_id) === Number(cId)));
    } catch (error) {}
  };

  console.log("fddf", prdSegment);

 

  return (
    <>
      <Layout>
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className=" overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">Product Brand </h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h2>
                <TiArrowBack
                  onClick={() => {
                    router.push("/table/table_product_brand");
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
                disabled={router.query.type === "CREATE" }
                className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4"
              >
                <div className="flex -mx-2 mb-4 flex-col">
                  <div className="lg:w-1/6 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      Brand Code
                    </label>
                    <input
                      disabled={router.query.type === "Edit" || router.query.type === "view"}
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      maxLength={4}
                      minLength={4}
                      placeholder=""
                      value={formState.brand_code}
                      onChange={(e) => {
                        setFromState({
                          ...formState,
                          brand_code: e.target.value
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
                      value={formState.c_name}
                      onChange={(e) => {
                        // const selectedCId = e.target.value;

                        setFromState({
                          ...formState,
                          c_name: e.target.value
                        });
                      }}
                    >
                      <option value={""} className="focus:outline-none focus:border-b bg-white">
                        Select Options
                      </option>
                      {allCompanyInfo.map((option) => (
                        <option
                          value={option?.c_id}
                          onChange={(e) => {
                            setFromState({
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
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-full lg:w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500 p-1">*</span>Product Segment
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formState.pseg_id}
                      onChange={(e) => {
                        setFromState({
                          ...formState,
                          pseg_id: e.target.value
                        });
                      }}
                    >
                      <option value={""} className="focus:outline-none focus:border-b bg-white">
                        Select Options
                      </option>
                      {prdSegment.map(
                        (option, idx) => (
                          console.log("ff", option),
                          (
                            <option
                              key={idx}
                              value={option?.pseg_id ? option?.pseg_id : ""}
                              className="focus:outline-none focus:border-b bg-white"
                            >
                              {option?.pseg_name ? option?.pseg_name : "Select Option"}
                            </option>
                          )
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 px-2 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                    <span className="text-red-500 px-1">*</span>Brand Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Input Brand Name"
                    value={formState.brand_name}
                    onChange={(e) => {
                      setFromState({
                        ...formState,
                        brand_name: e.target.value
                      });
                    }}
                  />
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
                        router.push("/table/table_product_brand");
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

export default ProductBrand;
