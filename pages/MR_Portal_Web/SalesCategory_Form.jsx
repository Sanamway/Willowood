import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout1";
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

  const [formState, setFromState] = useState({
    c_id: "",
    pcat_id: "",
  });


  
  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_mr_sale_cateogory`, {
        headers: headers,
      params: { mrsc_id: router.query.id,
        
       },
      });
      const apires = await respond.data.data[0];
   console.log("nop", apires)
      setFromState({
        c_id: apires.c_id,
        pcat_id: apires.pcat_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, [router]);
  

  const handleSaveCat = async (e) => {
    e.preventDefault();
    try {
      const data = {
        c_id: formState.c_id,  
        pcat_id:formState?.pcat_id,
      };
      const respond = await axios
        .post(`${url}/api/add_mr_sale_cateogory`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
        
          if (!res) return;
          toast.success("Sales Cat added successfully!");
          setTimeout(() => {
            router.push("/MR_Portal_Web/SalesCategory_Table");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;  
        toast.error(errorMessage);    
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
    }
  };


  const handleEditCat = async (e) => {
    e.preventDefault();
    try {
      
      const data = {
        c_id: formState.c_id,  
        pcat_id:formState?.pcat_id,
      };
      const respond = await axios
        .put(
          `${url}/api/update_mr_sale_cateogory/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Sales Cat edited successfully!");
          setTimeout(() => {
            router.push("/MR_Portal_Web/SalesCategory_Table");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;  
        toast.error(errorMessage);    
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
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

  useEffect(()=>{
    getCompanyInfo();
  },[])

  const [allProductCat, setAllProductCat] = useState([]);
  const getProductCat = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_product_category`, {
        headers: headers,
        params:{
          c_id: JSON.parse(window.localStorage.getItem("c_id"))[0],

         }
      });
      const respdata = await resp.data.data;
      setAllProductCat(respdata);
     
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(()=>{
    getProductCat();
  },[])

  

  return (
    <>
      <Layout>
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className=" overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl tabletitle py-2">Sale Category </h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h2>
                <TiArrowBack
                  onClick={() => {
                    router.push("/MR_Portal_Web/SalesCategory_Table");
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
                <div className="flex -mx-2 mb-4 flex-col">
                  <div className="w-full lg:w-1/6 px-2 mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap" htmlFor="inputField">
                      Category ID
                    </label>
                    <input
                      disabled
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      id="inputField"
                      placeholder=""
                      value={ router.query.type=="Add" ? "Auto Generated" :router.query.id }
                    />
                  </div>
                  <div className="w-full lg:w-1/2 px-2 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap" htmlFor="inputField">
                      <span className="text-red-500 px-1">*</span>Product Category
                    </label>
                    
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                      id="userSelect"
                      value={formState?.pcat_id}
                      onChange={(e) => {
                        setFromState({
                          ...formState,
                          pcat_id: e.target.value
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
                      {allProductCat.map((option) => (
                        <option
                          // value={option?.description}
                          value={option?.pcat_id}
                          className="focus:outline-none focus:border-b bg-white"
                        >
                          {option?.pcat_name}
                        </option>
                      ))}
                    </select>
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

                {router.query.type !== "View" && (
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
                        router.push("/MR_Portal_Web/SalesCategory_Table");
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
