import {useState, Fragment,  useEffect} from 'react'
import { useRouter} from 'next/router';
import Layout from "../../components/Layout";
import { Dialog, Transition } from "@headlessui/react";

import { AiTwotoneHome } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { url } from "@/constants/url";
import axios from "axios";
import ConfirmModal from "../modals/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';
import { CSVLink } from "react-csv";
import DealerOn from '../../public/dealeron.png'

const Dealer = () => {
  const router = useRouter();
  const [dealerData, setDealerData] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw",
  };

  const gettingDealerData = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_dealer`, {
        headers: headers,
      });
      const respData = await resp.data.data;
      setDealerData(respData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("ff", dealerData);

  useEffect(() => {
    gettingDealerData();
  }, []);

  const [isOpen, setisOpen] = useState(false);
  const [isGenOpen, setGenOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const deleteHandler = (id) => {
    setisOpen(true);
    setUserId(id);
  };

  const resetData = () => {
    gettingDealerData();
    setisOpen(false);
  };

  const csvHeaders = [
    { label: "Id", key: "d_id" },
    { label: "App No", key: "appl_no" },
    { label: "App Date", key: "app_date" },
    { label: "Party Name", key: "party_Name" },
    { label: "Mobile No.", key: "pmobile" },
    { label: "Email Id", key: "pemail" },
    { label: "Status", key: "isDeleted" },
  ];

  const {name} = router.query

  const [empIdState, setEmpIdState] = useState(false);

  const [ImageLink, setImageLink] = useState(null)

  const [dealerDetails, setdealerDetails] = useState({
    appNo: "",
    partyName: "",
    mobile: "",
    email: "",
  });


  //modal openclose 
  const handleCloseModal = () => {
    setGenOpen(false);
    // getAllEmployees();
    setdealerDetails({
      appNo: "",
      partyName: "",
      mobile: "",
      email: "",
    });
    setEmpIdState(null);
  };

  //setting Image on Generate App

  useEffect(() => {
    if (window.localStorage) {
      const ImageLink = localStorage.getItem("ImageLink");
      setImageLink(ImageLink);
    }
  }, []);


  return (
    <Layout>
      <div className=" overflow-auto w-full ">
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          Segment
          onOpen={() => setisOpen(true)}
          userId={userId}
          method="delete"
          endpoints="delete_product_segment"
          onDeletedData={resetData}
        ></ConfirmModal>
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
        <h2 className="font-arial font-normal text-xl tabletitle  py-2">{name ? name :"Dealer"}</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="search gap-2 mx-8">
              <div className="container">
                <form className="form flex items-center ">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-white border rounded-l-md p-1 outline-none  w-48 sm:w-72"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-md p-1 "
                  >
                    <AiOutlineSearch
                      className="mx-2 my-1"
                      size={20}
                    ></AiOutlineSearch>
                  </button>
                </form>
              </div>
            </div>
            <h2>
              <CSVLink data={dealerData} headers={csvHeaders}>
                <TbFileDownload
                  className="text-green-600"
                  size={34}
                ></TbFileDownload>
              </CSVLink>
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
            <button
              // onClick={() => {
              //   router.push({
              //     pathname: "/form/product_segment",
              //     query: { type: "CREATE" },
              //   });
              // }}
              onClick={() => setGenOpen(true)}

              className=" text-white py-1.5 px-2 rounded-md bg-green-500 hover:bg-orange-500"
            >
              Generate Application
            </button>
          </div>
        </div>

        <div className="bg-white mb-4 flex items-start justify-center max-w-full">
          <div className=" text-black font-arial scrollbar-hide overflow-x-auto w-full px-2">
            <table className="min-w-full divide-y border divide-gray-200">
              <thead className="border-b">
                <tr className="bg-gray-50 font-arial">
                  <th className=" w-[12%] px-6 py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Action
                  </th>
                  <th className="px-6 w-[7%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App No
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    App Date
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Party Name
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Mobile No.
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Email Id
                  </th>
                  <th className="px-6 w-[10%] py-2 text-left dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {dealerData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial ">
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/product_segment",
                            query: { type: "view", id: item?.pseg_id },
                          });
                        }}
                        className="b text-black   hover:text-blue-500  "
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/form/product_segment",
                            query: { type: "Edit", id: item?.pseg_id },
                          });
                        }}
                        className="b text-black hover:text-yellow-400 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteHandler(item?.pseg_id);
                        }}
                        className="b text-black hover:text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.appl_no}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.app_date}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.party_Name}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.pmobile}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.pemail}
                    </td>
                    <td className="px-6 py-2 dark:border-2 whitespace-nowrap">
                      {item.isDeleted ? "Disabled" : "Enabled"}
                    </td>
                  </tr>
                ))}
              </tbody> 
            </table>
          </div>
        </div>
      </div>

      <Transition appear show={isGenOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10   "
          onClose={() => handleCloseModal()}
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

          <div className="fixed inset-0 overflow-y-auto mt-2 ">
            <div className="flex h-full items-center justify-center p-4 text-center  ">
              <Toaster position="bottom-center" reverseOrder={false} />
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="relative  z-20 flex items-center justify-center ">
                  <div className="absolute z-40 flex  -top-6 ">
                    <img
                      className="  h-[3.1rem] w-[3.1rem] rounded-full   "
                      src={ImageLink}
                      alt="img"
                    />
                  </div>
                  <Dialog.Panel className="relative max-h-full overflow-hidden  font-arial  max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <h2 className="text-sm  text-gray-500 ">
                        Its incredible to have a young, fresh and talented mew
                        member join our team. By working together, we can take
                        the company a great heights, Welcome Aboard!
                      </h2>
                    </div>

                    <hr className="mt-1 mb-1" />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-center text-gray-500">Welcome!</h4>
                      <h3 className="text-center text-gray-500 text-lg">
                        {/* {dealerDetails.firstName} {dealerDetails.midName}{" "}
                        {dealerDetails.lastName} */}
                      </h3>
                    </div>
                    {!empIdState && (
                      <div className="flex justify-center py-2">
                        <Image
                          className="max-w-full "
                          height={20}
                          src={DealerOn}
                          alt="Picture of the author"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1 py-2">
                    <div className="flex flex-row gap-2 justify-between px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold justify-self-center"
                          htmlFor="inputField"
                        >
                          Party Name
                        </label>
                        <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Party Name"
                          value={dealerDetails.partyName}
                          disabled={empIdState}
                          onChange={(e) =>
                            setdealerDetails({
                              ...dealerDetails,
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
                          Mobile No
                        </label>
                        <input
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="number"
                          id="small-input"
                          placeholder="Mobile No"
                          value={dealerDetails.mobile}
                          disabled={empIdState}
                          onChange={(e) =>
                            setdealerDetails({
                              ...dealerDetails,
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
                          className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="text"
                          id="small-input"
                          placeholder="Email"
                          value={dealerDetails.email}
                          disabled={empIdState}
                          onChange={(e) =>
                            setdealerDetails({
                              ...dealerDetails,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    

                      {empIdState && (
                        <div className="flex flex-row gap-2 justify-between px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold justify-self-center"
                            htmlFor="inputField"
                          >
                            Application No.
                          </label>

                          <input
                            className="text-black w-1/2 px-3 py-1 text-sm  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="small-input"
                            placeholder="Position"
                            value={dealerDetails.appNo}
                            disabled={empIdState}
                            onChange={(e) =>
                              setdealerDetails({
                                ...dealerDetails,
                                appNo: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                      {empIdState && (
                        <div className="flex flex-col items-center gap-1 w-full mt-3">
                          <BiCheckCircle className="text-green-500 text-4xl" />

                          <p className="text-lg font-bold">
                            Thankyou for filling out the form
                          </p>
                          <small className="text-center">
                            Please don'nt forget your employee application
                            refrence number to your fill the form
                            <br />
                            For any furthur inquery please, contact{" "}
                            <a
                              href="mailto: hr@willowood.com"
                              className="underline"
                            >
                              hr@willowood.com
                            </a>
                          </small>
                        </div>
                      )}
                      {empIdState ? (
                        <div className="flex justify-center mt-2">
                          <div
                            className="text-center w-40   bg-green-700 px-4 py-1 text-white  cursor-pointer"
                            onClick={() => handleCloseModal()}
                          >
                            Close
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-around bg-green-400 m-4 mx-2 rounded-sm w-full">
                          <button
                            type="button"
                            className="text-white"
                            onClick={() => handleGenerateEmployee()}
                            // disabled={generateLoading}
                          >
                            Generate
                          </button>

                          <button
                            type="button"
                            className="text-white"
                            onClick={() => handleCloseModal()}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
     
    </Layout>
  );
};

export default Dealer