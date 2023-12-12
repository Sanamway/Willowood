import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const UserProfileForm = () => {
  const router = useRouter();
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [companyData, setCompanyData] = useState([]);

  const getDataById = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_warehousedepot`, {
        headers: headers,
        params: { w_id: router.query.id },
      });
      const apires = await respond.data.data;

      setDepotState({
        companyId: apires[0].c_id,
        address: apires[0].daddress,
        city: apires[0].dcity,
        country: apires[0].dcountry,
        depotName: apires[0].depot_name,
        pinCode: apires[0].dpin,
        state: apires[0].dstate,
        email: apires[0].email_id,
        hodName: apires[0].hod_name,
        mobile: apires[0].mobile_no,
        c_name: "New Man",
        ul_name: "No Man",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.type === "Add") return;
    getDataById();
  }, [router]);

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

  const [depotState, setDepotState] = useState({
    depotName: "",
    companyId: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    hodName: "",
    mobile: "",
    email: "",
  });

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    depotName: Yup.string().required("Depot Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pinCode: Yup.string().required("Pin Code is required"),
    hodName: Yup.string().required("HOD is required"),
    mobile: Yup.string().matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Enter a valid Mobile"
    ),
    email: Yup.string()
      .required("Email is required")
      .email()
      .matches(/^(?!.*@[^,]*,)/),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSaveDepot = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(depotState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(depotState.companyId),
        daddress: depotState.address,
        dcity: depotState.city,
        dcountry: depotState.country,
        depot_name: depotState.depotName,
        dpin: depotState.pinCode,
        dstate: depotState.state,
        email_id: depotState.email,
        hod_name: depotState.hodName,
        mobile_no: depotState.mobile,
        c_name: "New Man",
        ul_name: "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_warehousedepot`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("Warehouse added successfully!");
          setTimeout(() => {
            router.push("/table/table_depot_warehouse");
          }, [1000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage) {
        toast.error(errorMessage);
      }
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const handleEditFarmer = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(depotState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(depotState.companyId),
        daddress: depotState.address,
        dcity: depotState.city,
        dcountry: depotState.country,
        depot_name: depotState.depotName,
        dpin: depotState.pinCode,
        dstate: depotState.state,
        email_id: depotState.email,
        hod_name: depotState.hodName,
        mobile_no: depotState.mobile,
        c_name: "New Man",
        ul_name: "No Man",
      };
      const respond = await axios
        .put(
          `${url}/api/update_warehousedepot/${router.query.id}`,
          JSON.stringify(data),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (!res) return;
          toast.success("Warehouse edited successfully!");
          setTimeout(() => {
            router.push("/table/table_depot_warehouse");
          }, [1000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage) {
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
    if (router.query.type === "Add") handleSaveDepot(e);
    else {
      handleEditFarmer(e);
    }
  };
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
          }}
        />
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">
            Depot/Warehouse
          </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_depot_warehouse");
                }}
                className="text-gray-400"
                size={35}
              ></TiArrowBack>
            </h2>
            <h2>
              <AiTwotoneHome
                className="text-red-500"
                size={34}
                onClick={() => {
                  router.push("/");
                }}
              ></AiTwotoneHome>
            </h2>
          </div>
        </div>

        <div className="bg-gray-0 p-4 bg-gray-100  w-full flex items-start h-full ">
          <form
            className=" bg-white rounded shadow p-4 w-full "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4 w-1/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                Depot Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500 mt-2"
                type="text"
                id="inputField"
                placeholder="Farmer Id"
                value={
                  router.query.type === "Edit" || router.query.type === "View"
                    ? router.query.id
                    : "Auto Genrated"
                }
                disabled={true}
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="flex flex-col w-1/2 gap-1">
                <div className=" px-2 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="inputField"
                  >
                    <small className="text-red-600">*</small> Depot Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    id="inputField"
                    placeholder="Depot Name"
                    value={depotState.depotName}
                    onChange={(e) =>
                      setDepotState({
                        ...depotState,
                        depotName: e.target.value,
                      })
                    }
                  />
                  {formErrors.depotName && (
                    <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                      {formErrors.depotName}
                    </p>
                  )}
                </div>
                <div className="  relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="inputField"
                  >
                    <small className="text-red-600">*</small> Company
                  </label>
                  <select
                    className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                    id="citySelect"
                    value={depotState.companyId}
                    onChange={(e) =>
                      setDepotState({
                        ...depotState,
                        companyId: e.target.value,
                      })
                    }
                  >
                    <option value={""}>- Select -</option>
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

              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="textareaField"
                >
                  Address
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="textareaField"
                  placeholder="Address"
                  value={depotState.address}
                  onChange={(e) =>
                    setDepotState({ ...depotState, address: e.target.value })
                  }
                ></textarea>
                {formErrors.address && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.address}
                  </p>
                )}
              </div>
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="citySelect"
                >
                  City
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                  value={depotState.city}
                  onChange={(e) =>
                    setDepotState({ ...depotState, city: e.target.value })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    - Select -
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
                {formErrors.city && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.city}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                  value={depotState.state}
                  onChange={(e) =>
                    setDepotState({ ...depotState, state: e.target.value })
                  }
                >
                  State
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="stateSelect"
                  value={depotState.state}
                  onChange={(e) =>
                    setDepotState({ ...depotState, state: e.target.value })
                  }
                >
                  <option
                    value={""}
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    - Select -
                  </option>
                  <option value="U.P">U.P</option>
                  <option value="Haryana">Haryana</option>
                </select>
                {formErrors.state && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.state}
                  </p>
                )}
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="citySelect"
                >
                  Country
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded-md bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="citySelect"
                  value={depotState.country}
                  disabled
                  onChange={(e) =>
                    setDepotState({ ...depotState, country: e.target.value })
                  }
                >
                  <option
                    value=""
                    className="focus:outline-none focus:border-b bg-white"
                  >
                    Option
                  </option>
                  <option value="India">India</option>
                  <option value="city2">City 2</option>
                </select>
                {formErrors.country && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.country}
                  </p>
                )}
              </div>
              <div className="w-1/2 px-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stateSelect"
                  value={depotState.pinCode}
                  onChange={(e) =>
                    setDepotState({ ...depotState, pinCode: e.target.value })
                  }
                >
                  Pincode
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="phoneField"
                  placeholder="Pin Code"
                  value={depotState.pinCode}
                  onChange={(e) =>
                    setDepotState({
                      ...depotState,
                      pinCode: e.target.value,
                    })
                  }
                />
                {formErrors.pinCode && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.pinCode}
                  </p>
                )}
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2 mt-2 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneField"
                >
                  <small className="text-red-600">*</small> H.O.D Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="phoneField"
                  placeholder="H.O.D Name"
                  value={depotState.hodName}
                  onChange={(e) =>
                    setDepotState({
                      ...depotState,
                      hodName: e.target.value,
                    })
                  }
                />
                {formErrors.hodName && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.hodName}
                  </p>
                )}
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
                  value={depotState.mobile}
                  onChange={(e) => {
                    e.target.value.length !== 11 &&
                      setDepotState({
                        ...depotState,
                        mobile: e.target.value,
                      });
                  }}
                />
                {formErrors.mobile && (
                  <p className="text-red-500 text-sm absolute bottom-12 right-3 cursor-pointer">
                    {formErrors.mobile}
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
                  value={depotState.email}
                  onChange={(e) =>
                    setDepotState({
                      ...depotState,
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

            <span className="button flex items-center gap-3 mt-6">
              {router.query.type !== "View" && (
                <div className="button flex items-center gap-3 mt-6">
                  <div
                    className="bg-green-700 px-4 py-1 text-white cursor-pointer"
                    onClick={(e) => handleSave(e)}
                  >
                    {router.query.type !== "Add" ? "Update" : "Save"}{" "}
                  </div>
                  <button
                    className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                    onClick={() => {
                      router.push("/table/table_depot_warehouse");
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileForm;
