import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

     const UserProfileForm = () => {
  const router = useRouter();
  const [menuRole, setMenusRole] = useState([]);
  const [menus, setMenus] = useState([]);
  const [isSelect, setSelect] = useState(false);
  const [check, setCheck] = useState([]);



  const [user, setUser] = useState("")
  const [userName, setUsername] = useState("")
  const [ui, setUid] = useState("")
  const [email_id, setEmailId] = useState("")

  let { role_id, view, CREATE } = router.query;

  const [selectedRole, setSelectedRole] = useState({
    role_id: "",
    description: ""
  });

  const handleSelectRole = (e) => {
    const [role_id, description] = e.target.value.split(",");
    setSelectedRole({
      role_id,
      description
    });
  };

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const gettingMenuRole = async () => {
    try {
      const respond = await axios.get(`${url}/api/user_profiles`, { headers: headers });
      const apires = await respond.data.data;
      setMenusRole(apires);
    } catch (error) {
      console.log(error);
    }
  };

  const getMenusById = async (id) => {
    try {
      const resp = await axios.get(`${url}/api/get_menu_rights/?role_id=${role_id}`, { headers: headers });
      const respData = await resp.data.data;
      console.log("apires", respData);

      setCheck(respData);
    } catch (error) {
      console.log("ee", error);
    }
  };

  console.log("role id", role_id);

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (role_id) getMenusById(role_id);
  }, [role_id]);

  const gettingMenuName = async () => {
    try {
      const respond = await axios.get(`${url}/api/menus`, { headers: headers });
      const apires = await respond.data.data;
      setMenus(
        apires.map((item) => {
          return {
            ...item,
            isEditable: false
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingMenuRole();
    gettingMenuName();
  }, []);

  const payload = menus
    .filter((item) => item && item.isEditable === true)
    .map((item) => ({
      menu_id: item?.menu_id,
      role_id: selectedRole?.role_id,
      U_profile_name: selectedRole?.description,
      umenu_Name: item.menu_name,
      New: item.AddRight,
      modify: item.EditRight,
      view: item.ViewRight,
      Delete: item.DeleteRight,
      wf_approval: item.ApproveRight,
      menutype: item?.type_menu,
      c_name: userName,
      ul_name: userName
    }));

  async function makingLoopApi(datas) {
    if(datas.length<=0){
      toast.error("Select Options")
      return 
    }
    if (!isSelect) {
      return;
    } else {
      try {
        let toastDisplayed = false;
        for (const item of datas) {
          const response = await axios.post(`${url}/api/assign_menu_rights`, JSON.stringify(item), {
            headers: headers
          });
          const responseData = response.data;
          console.log("fdvfv", responseData.message);

          if (responseData.message && !toastDisplayed) {
            toast.success(responseData.message);
            toastDisplayed = true;
            setTimeout(() => {
              router.push("/table/table_user_profile");
            }, 2500);
          }
        }
        console.log("completed.");
      } catch (errors) {
        console.error("error:", errors);

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
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    makingLoopApi(payload);
  };

  console.log("nerev", check);

  console.log("iveee", router.query.type == "view");

  const rowdisable = (menu) => {
    if (menu?.type_menu === "0" || menu?.type_menu === "1") {
      return true;
    } else {
      return false;
    }
  };
  const rowdisable2 = (menu) => {
    if (menu?.menutype === 0 || menu?.menutype === 1) {
      return true;
    } else {
      return false;
    }
  };


  //getting user local

  useEffect(() => {
    if (window.localStorage) {
      const isLoggedInInLocalStorage = !!localStorage.getItem("uid");
      const userName = localStorage.getItem("user_name");
      const uid = localStorage.getItem("uid");
      setUser(isLoggedInInLocalStorage);
      setEmailId(email_id)
      setUsername(userName)
      setUid(uid)
    }

    if(!localStorage.getItem("uid")){
      router.push('/login')
    }
  
  }, []);

  console.log("userporof",userName)

  return (
    <>
      <Layout>
        <div className=" w-full font-arial">
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="text-black flex items-center justify-between  max-w-full font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">User Profile</h2>
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

          <div className="bg-gray-100 py-4 rounded-md  ">
            <div className="text-black mx-12 bg-white p-4 ">
              <div className=" text-black flex items-center justify-between mt-4">
                <div className="w-1/2 flex items-center justify-center">
                  <label className="w-1/2 text-gray-700 text-sm font-bold " htmlFor="userName">
                    <span className="text-red-500 p-1"></span>Role
                  </label>
                  <input
                    disabled
                    placeholder={role_id}
                    type="text"
                    className="px-2 py-1 bg-gray-100 w-full"
                  />
                </div>
                {router.query.type == "Edit" && (
                  <div
                    onClick={() => {
                      router.push({
                        pathname: "/form/user_profile_form",
                        query: { type: "CREATE", role_id: role_id }
                      });
                    }}
                    className="bg-green-700 rounded-md px-4 py-1 cursor-pointer text-white"
                  >
                    Refresh Menu
                  </div>
                )}
              </div>
              <div className=" text-black flex items-center justify-start mt-4">
                {router.query.type == "CREATE" && (
                  <div className="w-1/2 flex items-center justify-center">
                    <label className="w-1/2 text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                      <span className="text-red-500 p-1">*</span>User Profile
                    </label>

                    <select
                      className="w-full px-1 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                      id="userName"
                      value={`${selectedRole.role_id},${selectedRole.description}`}
                      onChange={handleSelectRole}
                    >
                      <option
                        className="focus:outline-none focus:border-b bg-white whitespace-nowrap w-full"
                        value=""
                      >
                        Select Options
                      </option>
                      {menuRole.map((role) => (
                        <option
                          key={role.id}
                          className="focus:outline-none focus:border-b bg-white whitespace-nowrap w-full"
                          value={`${role.role_id},${role.description}`}
                        >
                          {role.role}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {router.query.type == "Edit" && (
                  <div className="w-1/2 flex items-center justify-center">
                    <label className="w-1/2 text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                      <span className="text-red-500 p-1">*</span>User Profile
                    </label>
                    <input
                      disabled
                      placeholder={check[0]?.U_profile_name}
                      type="text"
                      className="w-full px-1 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                    />
                  </div>
                )}

                {router.query.type == "view" && (
                  <div className="w-1/2 flex items-center justify-center">
                    <label className="w-1/2 text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                      <span className="text-red-500 p-1">*</span>User Profile
                    </label>
                    <input
                      disabled
                      placeholder={check[0]?.U_profile_name}
                      type="text"
                      className="w-full px-1 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                    />
                  </div>
                )}
              </div>
              <div className="mt-8 font-arial">
                <h2 className="text-sm mb-4">Assign Menu Rights</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="font-arial border-b">
                      <tr className="border bg-gray-50 font-arial">
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider ">
                          SR NO.
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          Menus Name
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          New
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          Modify
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          View
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          Delete
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          Approve
                        </td>
                        {/* <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          Select All
                        </td> */}
                      </tr>
                    </thead>
                    <tbody className="font-arial text- text-center">
                      {router.query.type == "CREATE" &&
                        menus?.map(
                          (menu, index) => (
                            (
                              <tr
                                className={`bg-white divide-y ${rowdisable(menu) ? 'border-2 border-red-200':""}  text-xs`}
                                key={menu._id}
                              >
                                <td className={`border-b px-4 py-2 flex items-center gap-4 `}>
                                  <input
                                    type="checkbox"
                                    checked={menu?.isEditable}
                                    // disabled={rowdisable(menu)}
                                    onChange={() => {
                                      setMenus(
                                        menus.map((el) =>
                                          el._id === menu._id ? { ...el, isEditable: !el.isEditable } : el
                                        )
                                      );
                                      setSelect(true);
                                    }}
                                  />
                                  {menu.menu_id}
                                </td>
                                <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-left text-xs">
                                  {menu?.menu_name}
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="checkbox"
                                    disabled={!menu.isEditable}
                                    checked={menu.isEditable ? menu.AddRight : false}
                                    onChange={() => {
                                      setMenus(
                                        menus.map((el) =>
                                          el._id === menu._id ? { ...el, AddRight: !el.AddRight } : el
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="checkbox"
                                    disabled={!menu.isEditable}
                                    // checked={menu.EditRight}
                                    checked={menu.isEditable ? menu.EditRight : false}
                                    onChange={() => {
                                      setMenus(
                                        menus.map((el) =>
                                          el._id === menu._id ? { ...el, EditRight: !el.EditRight } : el
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="checkbox"
                                    disabled={!menu.isEditable}
                                    checked={menu.isEditable ? menu.ViewRight : false}
                                    onChange={() => {
                                      setMenus(
                                        menus.map((el) =>
                                          el._id === menu._id ? { ...el, ViewRight: !el.ViewRight } : el
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="checkbox"
                                    disabled={!menu.isEditable}
                                    checked={menu.isEditable ? menu.DeleteRight : false}
                                    onChange={() => {
                                      setMenus(
                                        menus.map((el) =>
                                          el._id === menu._id ? { ...el, DeleteRight: !el.DeleteRight } : el
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
                                    checked={menu.isEditable ? menu.ApproveRight : false}
                                    onChange={() => {
                                      setMenus(
                                        menus.map((el) =>
                                          el._id === menu._id ? { ...el, ApproveRight: !el.ApproveRight } : el
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                {/* <td className="border px-4 py-2">
                            <input
                              type="checkbox"
                              disabled={!menu?.isEditable}
                              checked={menu.isEditable ? menu.RejectRight : false}
                              onChange={() => {
                                setMenus(
                                  menus.map((el) =>{
                                    console.log("dfd",el)
                                    el._id === menu._id ? { ...el, RejectRight: !el.RejectRight } : el
                                  })
                                );
                              }}
                            />
                          </td> */}
                              </tr>
                            )
                          )
                        )}

                      {check?.map(
                        (menu, index) => (
                          console.log("dd", menu.menutype),
                          (
                            <tr  className={`bg-white divide-y ${rowdisable2(menu) ? 'border-2 border-red-200':""}  text-xs`}
                            key={menu._id}>
                              <td className="border-b px-4 py-2 flex items-center gap-4">
                                {/* <input
                                  type="checkbox"
                                  checked={menu.isEditable}
                                  disabled={true}
                                  onChange={() => {
                                    setMenus(
                                      menus.map((el) =>
                                        el._id === menu._id ? { ...el, isEditable: !el.isEditable } : el
                                      )
                                    );
                                    setSelect(true);
                                  }}
                                /> */}
                                {menu.menu_id}
                              </td>
                              <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-left text-xs">
                                {menu.umenu_Name}
                              </td>
                              <td className="border px-4 py-2">
                                <input
                                  type="checkbox"
                                  disabled={!menu.isEditable}
                                  // checked={menu.isEditable ? menu.AddRight : false}
                                  checked={menu.New}
                                />
                              </td>
                              <td className="border px-4 py-2">
                                <input
                                  type="checkbox"
                                  disabled={!menu.isEditable}
                                  // checked={menu.EditRight}
                                  checked={menu.modify}
                                />
                              </td>
                              <td className="border px-4 py-2">
                                <input type="checkbox" disabled={!menu.isEditable} checked={menu.view} />
                              </td>
                              <td className="border px-4 py-2">
                                <input type="checkbox" disabled={!menu.isEditable} checked={menu.Delete} />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  className="border px-4 py-2"
                                  disabled={!menu.isEditable}
                                  checked={menu.wf_approval}
                                />
                              </td>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {router.query.type == "CREATE" && (
                  <div className="button flex items-center gap-3 mt-6 mb-10">
                    <div onClick={handleSave} className="bg-green-700 px-4 py-1 cursor-pointer text-white">
                      Save
                    </div>
                    <div
                      onClick={() => {
                        router.push("/table/table_user_profile");
                      }}
                      className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                    >
                      Close
                    </div>
                  </div>
                )}

                {router.query.type == "Edit" && (
                  <div className="button flex items-center gap-3 mt-6 mb-10">
                    <div onClick={handleSave} className="bg-green-700 px-4 py-1 cursor-pointer text-white">
                      Update
                    </div>
                    <div
                      onClick={() => {
                        router.push("/table/table_user_profile");
                      }}
                      className="bg-yellow-500 px-4 py-1 text-white cursor-pointer"
                    >
                      Close
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfileForm;
