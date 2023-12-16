import React, { useState, useEffect } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import Image from "next/image";
import ProfImg from "../../public/userimg.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = () => {
  const router = useRouter();
  const now = new Date();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userData, setUserData] = useState([]);
  const[businessStr, setBusinessStr] = useState([])
  const [formData, setFormdata] = useState({
    about_me: ""
  });

  const [userID, setUserID] = useState("");

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  const closeHandle = () => {
    setShowEdit(false);
  };

  // getting user data from the apires

  const getUserData = async (userID) => {
    try {
      const res = await axios.get(`${url}/api/get_user/${userID}`, { headers: headers });
    // const respdata = await res?.data?.data;
    const respdata = await res?.data;
    console.log("apires", [{...respdata.data[0]}])
    setUserData([{...respdata.data[0]}]);
    setBusinessStr([{...respdata.data[1].bst_details[0]}]);
    } catch (error) {
      console.log("error:", error)
    }
    
  };

  useEffect(() => {
    const current = localStorage.getItem("uid");
    if (current) {
      setUserID(current);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      getUserData(userID);
    }
  }, [userID]);

  //updating aboutme
  const saveHandle = async () => {
    try {
      const data = {
        about_me: formData.about_me
      };
      const res = await axios.put(`${url}/api/update_user/${userID}`, JSON.stringify(data), {
        headers: headers
      });
      const respdata = await res?.data;
      console.log("update", respdata?.message);
      if (respdata?.message) {
        getUserData(userID);
        closeHandle();
        toast.success(respdata?.message);
      }
    } catch (error) {
      console.log("dd", error);
    }
  };

  console.log("business", businessStr)

  return (
    <>
      <div className=" mx-auto px-4 sm:px-8 bg-gray-100 p-4 pb-5  text-black  ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Profile </h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_user_profile");
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
          <div className="bg-gray-100 pt-1  pb-10  ">
            {userData?.length > 0 &&
              userData?.map((item) => (
                <div className="relative flex rounded-lg bg-white mt-8  items-center justify-start max-w-full p-12 mx-20 gap-12 ">
                  <div className="flex ">
                    <Image className=" w-52 h-52 rounded-full" src={ProfImg}></Image>
                  </div>
                  <div className="flex md:flex-col flex-items-center justify-between">
                    <div className="grid grid-cols-2 w-full gap-4">
                      <div className="flex items-center">
                        <h2>Employee Code</h2>
                      </div>
                      <div>
                        <div>{item?._id}</div>
                      </div>

                      <div className="flex items-center">
                        <h2>Name</h2>
                      </div>
                      <div>
                        <div>{item?.user_name}</div>
                      </div>

                      <div className="flex items-center">
                        <h2>Designation</h2>
                      </div>
                      <div>
                        <div>{item?.position}</div>
                      </div>

                      <div className="flex items-center">
                        <h2>Mobile</h2>
                      </div>
                      <div>
                        <div>{item?.phone_number}</div>
                      </div>

                      <div className="flex items-center">
                        <h2>Email</h2>
                      </div>
                      <div>
                        <div>{item?.email}</div>
                      </div>

                      <div className="flex items-center">
                        <h2>Status</h2>
                      </div>
                      <div>
                        <div>{item?.status == 1 ? "Enable" : "Disable"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="edit absolute top-2 right-4 flex items-center  ">
                    <h2 className="text-gray-400">
                      Last Check in:{new Date(item?.date_active).toLocaleString()}
                    </h2>
                  </div>
                </div>
              ))}

            {/* strip */}

            <div className=" flex bg-white mt-2 mx-20 rounded-lg items-center justify-start max-w-full px-5 ">
              <h1 className="font-arial font-normal text-3xl  py-2">Business Structure</h1>
            </div>

           {businessStr.length > 0 && businessStr?.map((item)=>
           ( <div className=" flex mx-20 mt-2 bg-white  items-center justify-start max-w-full px-2 ">
           <div className="flex  items-center flex-wrap justify-start py-5 px-12 gap-4 ">
             <div className="mb-4">
               <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                 Territory
               </label>
               <input
                 disabled
                 className="w-full text-center px-2 py-2 borde rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
                 type="text"
                 id="inputField"
                 value={item.territory_name}
                 placeholder="Territory"
               />
             </div>

             <div className="mb-4">
               <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                 Region
               </label>
               <input
                 disabled
                 className="w-full text-center px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                 type="text"
                 id="inputField"
                 value={item.region_name}
                 placeholder="Region"
               />
             </div>

             <div className="mb-4">
               <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                 Zone
               </label>
               <input
                 disabled
                 className="w-full text-center px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                 type="text"
                 id="inputField"
                 value={item.zone_name}
                 placeholder="Zone"
               />
             </div>

             <div className="mb-4">
               <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                 Business Unit
               </label>
               <input
                 disabled
                 className="w-full text-center px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                 type="text"
                 id="inputField"
                 value={item.business_unit_name}
                 placeholder="Business Unit"
               />
             </div>

             <div className="mb-4">
               <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
                 Segment
               </label>
               <input
                 disabled
                 className="w-full text-center px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                 type="text"
                 id="inputField"
                 value={item.business_segment}
                 placeholder="Segment"
               />
             </div>

             <div className="mb-4">
               <label className="block text-gray-700 text-center text-sm font-bold mb-2" htmlFor="inputField">
                 Company
               </label>
               <input
                 disabled
                 className="w-full px-3 py-2 borde rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                 type="text"
                 id="inputField"
                 value={item.cmpny_name}
                 placeholder="Company"
               />
             </div>
           </div>
         </div>)
           ) 
           }

            <div className=" flex bg-white mt-2 mx-20 items-center justify-start max-w-full px-5 ">
              <h1 className="font-arial font-normal text-3xl  py-2">Target vs Actual</h1>
            </div>

            <div className=" flex flex-col bg-white mt-2 mx-20 items-center justify-start max-w-full px-5 ">
              <div className="flex flex-col w-full p-2 mt-4">
                <h2>Rolling Vs Actual Sales</h2>
               
                <div className="demo-preview ">
                  <div className="progress progress-striped active">
                    <div
                      role="progressbar "
                      style={{ width: `80%` }}
                      className="progress-bar progress-bar-success rounded-md h-4"
                    >
                      <span className="inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full p-2 ">
                <h2>Collection Plain Vs Actual Plain</h2>
                <div className="demo-preview">
                  <div className="progress progress-striped active">
                    <div
                      role="progressbar "
                      style={{ width: `80%` }}
                      className="progress-bar progress-bar-success rounded-md h-4"
                    >
                      <span className="inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full p-2">
                <h2>Sales Vs Collection</h2>
                <div className="demo-preview">
                  <div className="progress progress-striped active">
                    <div
                      role="progressbar "
                      style={{ width: `80%` }}
                      className="progress-bar progress-bar-success rounded-md h-4"
                    >
                      <span className="inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex bg-white mt-2 mx-20  rounded-lg items-center justify-start max-w-full px-5 ">
              <h1 className="font-arial font-normal text-3xl  py-2">About Me</h1>
            </div>

            {userData?.length > 0 &&
              userData?.map((item) => (
                <div className="text-black relative rounded-lg h-64  flex flex-col bg-white mt-2 mb-10 mx-20 items-center justify-start max-w-full px-5 ">
                  {!showEdit ? (
                    <div className="flex items-center justify-start w-full p-4 ">{item?.about_me}</div>
                  ) : (
                    <div className="flex flex-col items-center justify-start w-full p-4 ">
                      <textarea
                        rows={6}
                        defaultValue={item?.about_me}
                        className="w-full px-3 py-1.5  border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                        id="textareaField"
                        placeholder=""
                        onChange={(e) => {
                          setFormdata({ ...formData, about_me: e.target.value });
                        }}
                      ></textarea>
                      <div className="button flex items-center gap-3 mt-1">
                        <button onClick={saveHandle} className="bg-green-700 px-4 py-1 text-white">
                          Save
                        </button>
                        <button onClick={closeHandle} className="bg-yellow-500 px-4 py-1 text-white">
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="btn absolute top-2 right-0">
                    <Popover as="div" className="relative border-none outline-none z-50">
                      {({ open }) => (
                        <>
                          <Popover.Button className="focus:outline-none">
                            <div className="btn absolute top-2 right-0">
                              <BsThreeDotsVertical
                                onClick={toggleDropdown}
                                className="text-black cursor-pointer"
                                size={25}
                              ></BsThreeDotsVertical>
                            </div>
                          </Popover.Button>

                          <Popover.Panel
                            as="div"
                            className={`${
                              open ? "block" : "hidden"
                            } absolute right-2 mt-2 w-40 bg-white text-black borde rounded-md shadow-md`}
                          >
                            <ul className="py-2 p text-text-black flex flex-col gap-2 px-4 font-Rale cursor-pointer">
                              <li
                                // onClick={() => {
                                //   router.push("/profile");
                                // }}

                                onClick={handleEdit}
                              >
                                Edit
                              </li>
                            </ul>
                          </Popover.Panel>
                        </>
                      )}
                    </Popover>
                  </div>
                </div>
              ))}

            {/* end container */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
