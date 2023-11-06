import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import { url } from "@/constants/url";
import { toast, Toaster } from "react-hot-toast";

const ProductSegment = () => {
  const router = useRouter()
  let { id, view } = router.query;
  

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [formState, setFromState] = useState({
    pseg_id: "",
    pseg_name: "",
    c_name: "WCL",
    ul_name: "WCL",
    c_id: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validationSchema = Yup.object().shape({
    pseg_name: Yup.string().required("Product Segment Name is required"),
    c_name: Yup.string().required("Company Name is required")
  });

  const getPrdSegById = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_product_segment/${id}`, { headers: headers });
      const respData = await resp.data.data;
      setFromState({
        pseg_name: respData?.pseg_name,
        pseg_id: respData?.pseg_id,
        c_name: respData?.c_name,
        c_id: respData?.c_id,
      });

      console.log("geprr", respData);
    } catch (error) {
      console.log("ee", error);
    }
  };

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (id) getPrdSegById(id);
  }, [id]);

  const handleSaveSeg = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formState, { abortEarly: false });
      const Formdata = {
        pseg_name: formState?.pseg_name,
        pseg_id: formState?.pseg_id,
        c_name: formState?.c_name,
        c_id: formState?.c_id,
        ul_name: formState?.ul_name
      };
      const resp = await axios.post(`${url}/api/add_product_segment`, JSON.stringify(Formdata), {
        headers: headers
      });
      const respdata = await resp.data;
      console.log("saved", respdata);
      if (respdata) {
        toast.success(respdata.message);
        setTimeout(() => {
          router.push("/table/table_product_segment");
        }, 2500);
      }
    } catch (errors) {
      console.log("ee", errors);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
      switch (true) {
        case !!newErrors?.pcat_name:
          toast.error(newErrors.pcat_name);
          break;
        case !!newErrors?.c_id:
          toast.error(newErrors.c_id);
        case !!newErrors?.c_name:
          toast.error(newErrors.c_name);
          break;
        default:
      }
    }
  };

  //Edit Brand

  const handleEditSeg = async (e) => {
    e.preventDefault();
    try {
      const Editdata = {
        pseg_name: formState?.pseg_name,
        pseg_id: formState?.pseg_id,
        c_name: formState?.c_name,
        c_id: formState?.c_id
      };
      await validationSchema.validate(Editdata, { abortEarly: false });
      const resp = await axios.put(`${url}/api/update_product_segment/${id}`, JSON.stringify(Editdata), {
        headers: headers
      });
      const respdata = await resp.data;
      console.log("resap", respdata);
      if (respdata) {
        toast.success(respdata.message);
        setTimeout(() => {
          router.push("/table/table_product_segment");
        }, 2500);
      }
    } catch (errors) {
      console.log("e", errors);
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      switch (true) {
        case !!newErrors?.pcat_name:
          toast.error(newErrors.pcat_name);
          break;
        case !!newErrors?.c_id:
          toast.error(newErrors.c_id);
        case !!newErrors?.c_name:
          toast.error(newErrors.c_name);
          break;
        default:
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
      setCompanyInfo(respda);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getCompanyInfo();
  },[])

  const filterCompanyInfo = companyInfo.filter((item) => item.isDeleted == false);



  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
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
              <form  onSubmit={(e) => e.preventDefault()}
                disabled={router.query.type === "CREATE"} className="max-w-1/2 mx-4 mt mb-12 bg-white rounded shadow p-4">
                <div className="flex -mx-2 mb-4 flex-col">
                  <div className="w-1/6 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      Segment ID
                    </label>
                    <input
                      disabled
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder=""
                      value={ router.query.type=="CREATE" ? "Auto Generated" :formState?.pseg_id }
                    />
                  </div>
                  <div className="w-1/2 px-2 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                      <span className="text-red-500 px-1">*</span>Product Segment
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
                  <div className="w-1/2 px-2">
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
                      {filterCompanyInfo.map((option) => (
                        <option
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
