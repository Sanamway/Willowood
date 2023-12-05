import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

const AssignRoleCopy = () => {
  const router = useRouter();
  let { user_id, view, CREATE } = router.query;

  const [selectedRole, setSelectedRole] = useState({
    role_id: "",
    U_profile_name: ""
  });

  const [Uprofile, selectUprofile] = useState("");

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [allUsers, setAllUsers] = useState([]);

  const getAllUserData = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_users`, {
        headers: headers
      });
      const apires = await respond.data.data;
      setAllUsers(
        apires.map((item) => {
          return {
            userId: item.user_id,
            name: item.user_name,
            mobile: item.phone_number,
            territoryProfile: item.t_user
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const [allUserProfile, setAllUserProfile] = useState([]);

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  //   const getUserProfile = async () => {
  //     try {
  //       const resp = await axios.get(`${url}/api/get_menu_rights`, {
  //         headers: headers
  //       });
  //       const respdata = await resp.data.data;
  //       console.log("dfhdhfdhfhfhf", respdata);
  //       setAllUserProfile(
  //         respdata
  //           .map((item) => item.U_profile_name)
  //           .filter((value, index, array) => array.indexOf(value) === index)
  //       );
  //     } catch (error) {
  //       console.log("err", error);
  //     }
  //   };

  //here is new thing

  useEffect(() => {
    // getUserProfile();
    getNewUserProfile();
  }, []);

  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [allMenus, setAllMenus] = useState([]);

  const getAssignMenuRights = async (Uprofile) => {
    console.log("uuu", Uprofile);

    try {
      const resp = await axios.get(`${url}/api/get_menu_rights`, {
        headers: headers
      });
      const respdata = await resp.data.data;
      setAllMenus(respdata.filter((item) => item.U_profile_name === Uprofile));
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (!Uprofile) return;
    getAssignMenuRights(Uprofile);
  }, [Uprofile]);

  //New Work is Starting Here ...

  const [allNewUserProfile, setAllNewUserProfile] = useState([]);
  const handleSelectRole = (e) => {
    const [role_id, U_profile_name] = e.target.value.split(",");
    setSelectedRole({
      role_id,
      U_profile_name
    });
    selectUprofile(U_profile_name);
  };

  //get new user profile

  const getNewUserProfile = async () => {
    try {
      const respond = await axios.get(`${url}/api/get_menu_rights`, { headers: headers });
      const apires = await respond.data.data;
      setAllNewUserProfile(apires);
    } catch (error) {
      console.log(error);
    }
  };

  //Post api data

  const payload = {
    role_id: selectedRole?.role_id,
    user_id: userName
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${url}/api/assign_role_profile`, JSON.stringify(payload), {
        headers: headers
      });
      const respData = await resp.data;
      console.log("api res", respData);
      if (respData) {
        toast.success(respData.message);
        setTimeout(() => {
          router.push("/table/table_assign_role");
        }, 2500);
      }
    } catch (errors) {
      console.log("rvrv", errors);
      const ermsg = errors.response.data.message;
      const errmsg = errors.response.data.error;
      if (ermsg) {
        toast.error(ermsg);
        return;
      }
      console.log("fefef", errors);
      if (errmsg?.includes("brand_name_1")) {
        toast.error("Brand Name is Duplicate");
      } else if (errmsg?.includes("brand_code_1")) {
        toast.error("Brand Id is duplicate");
      } else {
        toast.error(errmsg);
      }
    }
  };

  //get all menus by id

  const [allViewMenus, setAllViewMenus] = useState([]);

  const getAllMenuById = async () => {
    try {
      const resp = await axios.get(`${url}/api/get_assign_role_profile/?user_id=${user_id}`, {
        headers: headers
      });
      const respdata = await resp.data.data;
      setAllViewMenus(respdata);
      console.log("getbyid", respdata);
    } catch (errors) {
      console.log("err", errors);
    }
  };

  useEffect(() => {
    if (user_id) getAllMenuById(user_id);
  }, [user_id]);

  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-gray-100 ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2">Assign Role Profile to User</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_assign_role");
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

        <div className="bg-gray py-4 h-screen rounded-md">
          <div className="text-black mx-12 bg-white p-4 ">
            <div className="flex flex-col ">
              { router.query.type ==="view" &&
                (<div className="w-1/3 px-2 flex whitespace-nowrap">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                    <span className="text-red-500 p-1">*</span>User Name
                  </label>
                  <input
                    disabled
                    placeholder={allViewMenus[0]?.U_profile_name}
                    type="text"
                    className="w-full px-1 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                  />
                </div>)
              }

             {router.query.type =="CREATE"&&( <div className="w-1/3 px-2 flex whitespace-nowrap">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                  <span className="text-red-500 p-1">*</span>User Name
                </label>
                <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="userSelect"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                >
                  <option value={""} className="focus:outline-none focus:border-b bg-white">
                    -- Select --
                  </option>
                  {allUsers.map((item) => (
                    <option value={item.userId}>
                      {item.name} ({item.mobile}) - {item.territoryProfile} {item.userId}
                    </option>
                  ))}
                </select>
              </div>)}


              {router.query.type ==="view" && (<div className="w-1/3 px-2 flex mt-8 whitespace-nowrap">
                <label className=" text-gray-700 text-sm font-bold flex" htmlFor="userSelect">
                  <span className="text-red-500 p-1">*</span> User Profile
                </label>
                <input
                    disabled
                    placeholder={allViewMenus[0]?.U_profile_name}
                    type="text"
                    className="w-full px-1 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                  />
                
              </div>)}

              {router.query.type ==="CREATE" && (<div className="w-1/3 px-2 flex mt-8 whitespace-nowrap">
                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="userSelect">
                  <span className="text-red-500 p-1">*</span> User Profile
                </label>
                {/* <select
                  className="w-full px-3 py-2 border-b border-gray-500 rounded- bg-white focus:outline-none focus:border-b focus:border-indigo-500"
                  id="userSelect"
                  value={userProfile}
                  onChange={(e) => setUserProfile(e.target.value)}
                >
                  <option value={""} className="focus:outline-none focus:border-b bg-white">
                    -- Select --
                  </option>
                  {allUserProfile.map((item) => (
                  console.log("userpr", item),
                    <option value={item}>{item}</option>
                  ))}
                </select> */}

                <select
                  className="w-full px-1 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                  id="userName"
                  value={`${selectedRole.role_id},${selectedRole.U_profile_name}`}
                  onChange={handleSelectRole}
                >
                  <option
                    className="focus:outline-none focus:border-b bg-white whitespace-nowrap w-full"
                    value=""
                  >
                    Select Options
                  </option>
                  {[
                    ...new Set(allNewUserProfile.map((role) => `${role.role_id},${role.U_profile_name}`))
                  ].map((uniqueRole, index) => {
                    const [role_id, U_profile_name] = uniqueRole.split(",");
                    return (
                      <option
                        key={index}
                        className="focus:outline-none focus:border-b bg-white whitespace-nowrap w-full"
                        value={`${role_id},${U_profile_name}`}
                      >
                        {U_profile_name}
                      </option>
                    );
                  })}
                </select>
              </div>)}
            </div>
            <div className="mt-4 font-arial">
              <h2 className="text-sm mb-4"> Display Assign Menu Rights</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full mb-4">
                  <thead className="font-arial border-b">
                    <tr className="border bg-gray-50 font-arial">
                      <td className=" py-2 text-center dark:border-2 text-xs font-medium text-gray-500   ">
                        Menu Id
                      </td>
                      <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                        Menus Name
                      </td>
                      <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                        New
                      </td>
                      <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                        Modify
                      </td>
                      <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                        View
                      </td>
                      <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                        Delete
                      </td>
                      <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                        Workflow
                      </td>
                    </tr>
                  </thead>
                  <tbody className="font-arial text- text-center">
                    {allMenus.map((menu, index) => (
                      <tr className="bg-white divide-y border  divide-gray-200 text-xs" key={menu._id}>
                        <td className="border-b px-4 py-2 flex items-center gap-4">{index + 1}</td>
                        <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                          {menu?.umenu_Name}
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            disabled={!menu.isEditable}
                            checked={menu.New}
                            onChange={() => {
                              setAllMenus(
                                allMenus.map((el) => (el._id === menu._id ? { ...el, New: !el.New } : el))
                              );
                            }}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            disabled={!menu.isEditable}
                            checked={menu.modify}
                            onChange={() => {
                              setAllMenus(
                                allMenus.map((el) =>
                                  el._id === menu._id ? { ...el, modify: !el.modify } : el
                                )
                              );
                            }}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            disabled={!menu.isEditable}
                            checked={menu.view}
                            onChange={() => {
                              setAllMenus(
                                allMenus.map((el) => (el._id === menu._id ? { ...el, view: !el.view } : el))
                              );
                            }}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            disabled={!menu.isEditable}
                            checked={menu.Delete}
                            onChange={() => {
                              setAllMenus(
                                allMenus.map((el) =>
                                  el._id === menu._id ? { ...el, Delete: !el.Delete } : el
                                )
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            className="border px-4 py-2"
                            disabled={!menu.isEditable}
                            checked={menu.wf_approval}
                            onChange={() => {
                              setAllMenus(
                                allMenus.map((el) =>
                                  el._id === menu._id
                                    ? {
                                        ...el,
                                        wf_approval: !el.wf_approval
                                      }
                                    : el
                                )
                              );
                            }}
                          />
                        </td>
                      </tr>
                    ))}

                    {router.query.type === "view" &&
                      allViewMenus.map((menu, index) => (
                        <tr className="bg-white divide-y border  divide-gray-200 text-xs" key={menu._id}>
                          <td className="border-b px-4 py-2 flex items-center gap-4">{index + 1}</td>
                          <td className="px-6 py-2 dark:border-2 text-left whitespace-nowrap font-arial text-xs">
                            {menu?.umenu_Name}
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="checkbox"
                              disabled={!menu.isEditable}
                              checked={menu.New}
                              onChange={() => {
                                setAllMenus(
                                  allMenus.map((el) => (el._id === menu._id ? { ...el, New: !el.New } : el))
                                );
                              }}
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="checkbox"
                              disabled={!menu.isEditable}
                              checked={menu.modify}
                              onChange={() => {
                                setAllMenus(
                                  allMenus.map((el) =>
                                    el._id === menu._id ? { ...el, modify: !el.modify } : el
                                  )
                                );
                              }}
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="checkbox"
                              disabled={!menu.isEditable}
                              checked={menu.view}
                              onChange={() => {
                                setAllMenus(
                                  allMenus.map((el) => (el._id === menu._id ? { ...el, view: !el.view } : el))
                                );
                              }}
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="checkbox"
                              disabled={!menu.isEditable}
                              checked={menu.Delete}
                              onChange={() => {
                                setAllMenus(
                                  allMenus.map((el) =>
                                    el._id === menu._id ? { ...el, Delete: !el.Delete } : el
                                  )
                                );
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="border px-4 py-2"
                              disabled={!menu.isEditable}
                              checked={menu.wf_approval}
                              onChange={() => {
                                setAllMenus(
                                  allMenus.map((el) =>
                                    el._id === menu._id
                                      ? {
                                          ...el,
                                          wf_approval: !el.wf_approval
                                        }
                                      : el
                                  )
                                );
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
             {router.query.type =="CREATE" && ( <div className="button flex items-center gap-3 mt-6 mb-20">
                <div className="bg-green-700 px-4 py-1 text-white cursor-pointer" onClick={handleSaveData}>
                  Save
                </div>
                <div
                  onClick={() => {
                    router.push("/table/table_assign_role");
                  }}
                  className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                >
                  Close
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssignRoleCopy;
