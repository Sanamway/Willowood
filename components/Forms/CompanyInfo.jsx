import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import { url } from "@/constants/url";
import { useRouter } from "next/router";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
const CompanyInfo = () => {
  const router = useRouter();

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_company_information`, {
        headers: headers,
        params: { c_id: router.query.id },
      });
      const apires = await respond.data.data;
      setCompanyState({
        _id: apires._id,
        cId: apires.c_id,
        companyName: apires.cmpny_name,
        corpAdress: apires.corp_address,
        corpAddressCity: apires.corp_address_city,
        corpAddressState: apires.corp_address_state,
        saleAddress: apires.sale_address,
        saleAddressCity: apires.sale_address_city,
        saleAddressState: apires.sale_address_state,
        email: apires.email,
        phoneNumber: apires.phone_number,
        contactPerson: apires.contact_person,
        gstNum: apires.gst_no,
        selectedCorpCity: {
          value: apires.corp_address_city,
          label: apires.corp_address_city,
          state: apires.corp_address_state,
        },
        selectedSaleCity: {
          value: apires.sale_address_city,
          label: apires.sale_address_city,
          state: apires.sale_address_state,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, []);
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };
  const [companyState, setCompanyState] = useState({
    cId: "",
    companyName: "",
    corpAdress: "",
    corpAddressCity: "",
    corpAddressState: "",
    saleAddress: "",
    saleAddressCity: "",
    saleAddressState: "",
    email: "",
    phoneNumber: "",
    contactPerson: "",
    gstNum: "",
    cName: "",
    ulName: "",
    selectedCorpCity: {
      value: "",
      label: "",
      state: "",
    },
    selectedSaleCity: {
      value: "",
      label: "",
      state: "",
    },
  });

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    corpAdress: Yup.string().required("Corp. Address is required"),

    saleAddress: Yup.string().required("Sale. State is required"),

    email: Yup.string()
      .required("Email is required")
      .email()
      .matches(/^(?!.*@[^,]*,)/),
    phoneNumber: Yup.number()
      .transform((value, originalValue) => {
        if (originalValue === "") return undefined;
        return Number(value);
      })
      .required("Mobile No is required")
      .test("is-valid-number", "Invalid Mobile Number", (value) => {
        if (!value) return false;
        const stringValue = value.toString();
        return /^[6-9]\d{9}$/.test(stringValue);
      })
      .typeError("Mobile No must be a valid number"),
    contactPerson: Yup.string().required("Contact Person is required"),
    gstNum: Yup.string().required("GST no is required"),
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSaveCompanyInfo = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(companyState, { abortEarly: false });
      const data = {
        cmpny_name: companyState.companyName,
        corp_address: companyState.corpAdress,
        corp_address_city: companyState.selectedCorpCity.value,
        corp_address_state: companyState.selectedCorpCity.state,
        sale_address: companyState.saleAddress,
        sale_address_city: companyState.selectedSaleCity.value,
        sale_address_state: companyState.selectedSaleCity.state,
        email: companyState.email,
        phone_number: companyState.phoneNumber,
        contact_person: companyState.contactPerson,
        gst_no: companyState.gstNum,
        c_name: companyState.companyName,
        ul_name: "Ultimate Leader",
      };

      const respond = await axios
        .post(`${url}/api/add_company_informations`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Company added successfully!");
          setTimeout(() => {
            router.push("/table/table_company_info");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      if (errorMessage) {
        toast.error(errorMessage);
      }
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      console.log("lop", newErrors);
      setFormErrors(newErrors);
    }
  };

  const handleEditCompanyInfo = async (e) => {
    e.preventDefault();
    try {
      // Validate the form data

      await validationSchema.validate(companyState, { abortEarly: false });
      const data = {
        cmpny_name: companyState.companyName,
        corp_address: companyState.corpAdress,
        corp_address_city: companyState.selectedCorpCity.value,
        corp_address_state: companyState.selectedCorpCity.state,
        sale_address: companyState.saleAddress,
        sale_address_city: companyState.selectedSaleCity.value,
        sale_address_state: companyState.selectedSaleCity.state,
        email: companyState.email,
        phone_number: companyState.phoneNumber,
        contact_person: companyState.contactPerson,
        gst_no: companyState.gstNum,
        c_name: companyState.companyName,
        ul_name: "Ultimate Leader",
      };

      const respond = await axios
        .put(
          `${url}/api/update_company_information/${companyState._id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Company edited successfully!");
          setTimeout(() => {
            router.push("/table/table_company_info");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.message;

      if (errorMessage) {
        toast.error("Email already exist");
      }

      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const handleSave = (e) => {
    if (router.query.type !== "Edit") handleSaveCompanyInfo(e);
    else {
      handleEditCompanyInfo(e);
    }
  };

  const [filteredCityOptn, setFilteredCityOptn] = useState([]);

  const [citySearchState, setCitySearchState] = useState("");
  useEffect(() => {
    if (!citySearchState) return;
    getAllCityData(citySearchState);
  }, [citySearchState]);
  const getAllCityData = async (city) => {
    try {
      const respond = await axios.get(`${url}/api/get_citystate`, {
        params: { city: city, search: true },
        headers: headers,
      });
      const apires = await respond.data.data;

      setFilteredCityOptn(
        apires.map((item) => {
          return {
            value: item.city,
            label: item.city,
            state: item.state,
            country: item.country,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className=" overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Company Info
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_company_info");
                }}
                className="text-gray-400"
                size={35}
              />
            </h2>
            <h2>
              <AiTwotoneHome
                className="text-red-500"
                size={34}
                onClick={() => {
                  router.push("/");
                }}
              />
            </h2>
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start ">
          <form
            className=" bg-white rounded shadow p-4 w-full mb-8 "
            onSubmit={(e) => e.preventDefault()}
            disabled={router.query.type === "View"}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Company Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Comapany Id"
                value={
                  router.query.type === "Edit" || router.query.type === "View"
                    ? router.query.id
                    : "Auto Generated"
                }
                disabled={true}
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Company Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Company Name"
                value={companyState.companyName}
                onChange={(e) =>
                  setCompanyState({
                    ...companyState,
                    companyName: e.target.value,
                  })
                }
              />
              {formErrors.companyName && (
                <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                  {formErrors.companyName}
                </p>
              )}
            </div>
            <div className="flex w-full justify-between gap-4">
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 flex space-between"
                  htmlFor="textareaField"
                >
                  <small className="text-red-600">* </small> Corporate Address
                </label>
                {formErrors.corpAdress && (
                  <p className="text-red-500 text-sm absolute top-0 right-3 cursor-pointer">
                    {formErrors.corpAdress}
                  </p>
                )}
                <textarea
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="textareaField"
                  placeholder="Corporate Address"
                  rows="6"
                  value={companyState.corpAdress}
                  onChange={(e) =>
                    setCompanyState({
                      ...companyState,
                      corpAdress: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="textareaField"
                >
                  <small className="text-red-600">*</small> Sale. Address
                </label>
                {formErrors.saleAddress && (
                  <p className="text-red-500 text-sm absolute top-0 right-3 cursor-pointer">
                    {formErrors.saleAddress}
                  </p>
                )}
                <textarea
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="textareaField"
                  rows="6"
                  placeholder="Sale Address"
                  value={companyState.saleAddress}
                  onChange={(e) =>
                    setCompanyState({
                      ...companyState,
                      saleAddress: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex w-full justify-between gap-4 mt-4">
              <div className="w-full">
                <div className="flex w-full justify-between gap-4">
                  <div className="w-1/2 px-2 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <small className="text-red-600">*</small> City
                    </label>
                    <Select
                      className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      value={companyState.selectedCorpCity}
                      isSearchable={true}
                      name="color"
                      options={filteredCityOptn}
                      onChange={(value) =>
                        setCompanyState({
                          ...companyState,
                          selectedCorpCity: value,
                        })
                      }
                      onInputChange={(searchVal) =>
                        setCitySearchState(searchVal)
                      }
                    />
                  </div>

                  <div className="w-1/2 px-2 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <small className="text-red-600">*</small> State
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      id="phoneField"
                      placeholder="State"
                      value={companyState.selectedCorpCity.state}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex w-full justify-between gap-4"></div>
              </div>

              <div className="w-full">
                <div className="flex w-full justify-between gap-4">
                  <div className="w-1/2 px-2 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <small className="text-red-600">*</small> City
                    </label>
                    <Select
                      className="w-full px-1  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      value={companyState.selectedSaleCity}
                      isSearchable={true}
                      name="color"
                      options={filteredCityOptn}
                      onChange={(value) =>
                        setCompanyState({
                          ...companyState,
                          selectedSaleCity: value,
                        })
                      }
                      onInputChange={(searchVal) =>
                        setCitySearchState(searchVal)
                      }
                    />
                  </div>

                  <div className="w-1/2 px-2 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="userSelect"
                    >
                      <small className="text-red-600">*</small> State
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                      id="phoneField"
                      placeholder="State"
                      value={companyState.selectedSaleCity.state}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between gap-4 mt-4 mb-4">
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Mobile
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="inputField"
                  placeholder="Mobile"
                  value={companyState.phoneNumber}
                  onChange={(e) =>
                    setCompanyState({
                      ...companyState,
                      phoneNumber: e.target.value,
                    })
                  }
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="w-full relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inputField"
                >
                  <small className="text-red-600">*</small> Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  id="inputField"
                  placeholder="Email"
                  value={companyState.email}
                  onChange={(e) =>
                    setCompanyState({
                      ...companyState,
                      email: e.target.value,
                    })
                  }
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Contact Person
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Contact Person"
                value={companyState.contactPerson}
                onChange={(e) =>
                  setCompanyState({
                    ...companyState,
                    contactPerson: e.target.value,
                  })
                }
              />
              {formErrors.contactPerson && (
                <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                  {formErrors.contactPerson}
                </p>
              )}
            </div>
            <div className="w-1/2 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> GST Number
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="GST Number"
                value={companyState.gstNum}
                onChange={(e) =>
                  setCompanyState({
                    ...companyState,
                    gstNum: e.target.value,
                  })
                }
              />
              {formErrors.gstNum && (
                <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                  {formErrors.gstNum}
                </p>
              )}
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
                    router.push("/table/table_company_info");
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

export default CompanyInfo;
