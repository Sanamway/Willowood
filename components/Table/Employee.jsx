import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { url } from "@/constants/url";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
import { CSVLink } from "react-csv";
import { TbFileDownload } from "react-icons/tb";
import Image from "next/image";
import EmpImage from "../../public/EmpImage.jpeg";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const Employee = () => {
  const csvHeaders = [
    { label: "Id", key: "ds_id" },
    { label: "District", key: "district_name" },
    { label: "Territory", key: "t_id" },
    { label: "Region", key: "r_id" },
    { label: "Zone", key: "z_id" },
    { label: "Unit Division", key: "bu_id" },
    { label: "Business Segment", key: "bg_id" },
    { label: "Company", key: "c_id" },
    { label: "Status", key: "isDeleted" },
  ];
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const [data, setData] = useState([]);
  const getAllEmployees = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_employee`, {
        headers: headers,
      });
      const apires = await respond.data.data;
      setData(apires);
    } catch (error) {}
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const deleteHandler = (id) => {
    setisOpen(true);
    setEmployeeId(id);
  };

  const [isOpen, setisOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const resetData = () => {
    getAllEmployees();
    setisOpen(false);
  };

  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    midName: "",
    lastName: "",
    mobile: "",
    email: "",
    position: "",
    commpany: "",
    territory: "",
  });

  //Defining the Validation Schema
  const validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Company Id is required"),
    bgId: Yup.string().required("Business Segment is required"),
    buId: Yup.string().required("Business Unit is required"),
    zoneId: Yup.string().required("Zone is required"),
    regionId: Yup.string().required("Region is required"),
    territoryId: Yup.string().required("Territory is required"),
    district: Yup.string().required("District is required"),
    // territory: Yup.string().required("Territory is required"),
  });

  const [formErrors, setFormErrors] = useState({});

  const handleGenerateEmployee = async () => {
    try {
      await validationSchema.validate(districtState, {
        abortEarly: false,
      });
      const data = {
        c_id: Number(districtState.companyId),
        bu_id: Number(districtState.buId),
        bg_id: Number(districtState.bgId),
        z_id: Number(districtState.zoneId),
        r_id: Number(districtState.regionId),
        t_id: Number(districtState.territoryId),
        district_name: districtState.district,
        c_name: localStorage.getItem("c_name")
          ? localStorage.getItem("c_name")
          : "New Man",
        ul_name: localStorage.getItem("ul_name")
          ? localStorage.getItem("ul_name")
          : "No Man",
      };
      const respond = await axios
        .post(`${url}/api/add_district`, JSON.stringify(data), {
          headers: headers,
        })
        .then((res) => {
          if (!res) return;
          toast.success("District added successfully!");
          setTimeout(() => {
            router.push("/table/table_district");
          }, [3000]);
        });
    } catch (errors) {
      const errorMessage = errors?.response?.data?.error;
      if (errorMessage?.includes("email_1")) {
        toast.error("Email already exist");
      } else if (errorMessage?.includes("gst_no_1")) {
        toast.error("GST number already exist");
      } else if (errorMessage?.includes("district_name_1")) {
        toast.error("District already exist");
      } else {
        toast.error(errorMessage);
      }
      const newErrors = {};
      errors?.inner?.forEach((error) => {
        newErrors[error?.path] = error?.message;
      });
      setFormErrors(newErrors);
    }
  };

  const [companyData, setCompanyData] = useState([]);
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
  const [allTerritory, setAllTerritory] = useState([]);
  const getTerritoryInfo = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_territory`, {
        headers: headers,
      });
      const apires = await respond.data.data;

      setAllTerritory(apires.filter((item, idx) => item.isDeleted === false));
    } catch (error) {
      console.log(error);
      setAllTerritory([]);
    }
  };

  useEffect(() => {
    getTerritoryInfo();
    getCompanyInfo();
  }, []);
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="flex flex-row justify-between px-2  h-max  px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Employee</h2>
          <span className="flex items-center gap-2 cursor-pointer">
            <span className="flex flex-row">
              <input
                type="search"
                placeholder="Search"
                className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-md p-1 "
              >
                <AiOutlineSearch className="mx-2 my-1" size={20} />
              </button>
            </span>
            <h2>
              <CSVLink data={data} headers={csvHeaders}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
            </h2>
            <AiTwotoneHome className="text-red-500" size={34} />
            <button
              className=" text-white py-1 px-2 rounded-md bg-green-500 hover:bg-orange-500"
              onClick={() => setisOpen(true)}
            >
              Generate Application
            </button>
          </span>
        </div>

        <div className="bg-white h-screen flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-[1000px]">
            <table className=" border divide-gray-200 table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial w-max">
                  <th className="px-4 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App No.
                  </th>
                  <th className="px-4 py-2  text-left w-max dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Date
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp No
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Emp Name
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile No
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Email Id
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Position
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Territory
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-2   text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200 text-xs">
                {data?.map((item, idx) => (
                  <tr className="dark:border-2" key={idx}>
                    <td className="  px-4 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/district_form",
                            query: { id: item.ds_id, type: "View" },
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/district_form",
                            query: { id: item.ds_id, type: "Edit" },
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        className="b text-black hover:text-red-500 ml-2"
                        onClick={() => {
                          deleteHandler(item.ds_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.appl_dt}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.e_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.fname} {item.mname} {item.lname}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.phone_number}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.pemail}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.emppos}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.t_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.c_id}
                    </td>
                    <td className="px-4 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted == false ? "Enabled" : "Disabled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10   "
          onClose={() => setisOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto mt-2">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" max-h-full overflow-hidden  font-arial  max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <p className="text-sm  text-gray-500 ">
                      Its incredible to have a young, fresh and talented mew
                      member join our team. By working together, we can take the
                      company a great heights, Welcome Aboard!
                    </p>
                  </div>
                  <hr className="mt-1 mb-1" />
                  <div className="flex flex-col justify-center">
                    <h4 className="text-center text-gray-500">Welcome!</h4>
                    <h3 className="text-center text-gray-500 text-lg">
                      Uttam Chand Aggarwal
                    </h3>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      className="max-w-full "
                      height={100}
                      src={EmpImage}
                      alt="Picture of the author"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 justify-between px-2 ">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        First Name
                      </label>
                      <input
                        className=" px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="First Name"
                        value={employeeDetails.firstName}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row gap-2 justify-between px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        Mid Name
                      </label>
                      <input
                        className=" px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="Middle Name"
                        value={employeeDetails.midName}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            midName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row gap-2 justify-between px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        Last Name
                      </label>
                      <input
                        className=" px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="Last Name"
                        value={employeeDetails.lastName}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row gap-2 justify-between px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        Mobile No
                      </label>
                      <input
                        className=" px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="Mobile No"
                        value={employeeDetails.mobile}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            mobile: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-row gap-2 justify-between px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        Email
                      </label>
                      <input
                        className=" px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="Email"
                        value={employeeDetails.email}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-row gap-2 justify-between px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        Position
                      </label>
                      <input
                        className=" px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="Position"
                        value={employeeDetails.position}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            position: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row gap-2 justify-between px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold justify-self-center"
                        htmlFor="inputField"
                      >
                        Territory
                      </label>
                      <input
                        className=" px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="small-input"
                        placeholder="Territory"
                        value={employeeDetails.territory}
                        onChange={(e) =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            territory: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-around bg-green-400 m-4">
                      <button
                        type="button"
                        className="text-white"
                        onClick={() => handleGenerateEmployee()}
                      >
                        Generate
                      </button>

                      <button type="button" className="text-white">
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default Employee;
