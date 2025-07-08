import React, { useState, useEffect, use } from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

const UserProfileForm = () => {
  const router = useRouter();
  const [menuRole, setMenusRole] = useState([]);
  const [menus, setMenus] = useState([]);
  const [isSelect, setSelect] = useState(false);
  const [check, setCheck] = useState([]);

  const [user, setUser] = useState("");
  const [userName, setUsername] = useState("");
  const [ui, setUid] = useState("");
  const [email_id, setEmailId] = useState("");
  const [compList, setCompList] = useState("");

  const [comDisable, setcomDisable] = useState(true);
  const [clearCompList, setClearCompList] = useState(false);
  const [cid, setCid] = useState(null);

  let { role_id, view, CREATE, mode, app_type } = router.query;

  const [selectedRole, setSelectedRole] = useState({
    role_id: "",
    description: ""
  });

  const [formState, setFormState] = useState({
    mode: "",
    app_type: "Field Force Apps"
  });

  
  

  const [ciid, setciid] = useState({
    ciid: []
  });

  const handleCompChange = (selectedOptions) => {
    const arr = selectedOptions.map((option) => ({ label: option.label, value: option.value }));
    setciid({ ...ciid, ciid: arr });
  };

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
      const resp = await axios.get(`${url}/api/get_menu_rights/?role_id=${role_id}`, {
        headers: headers,
        params: { mode }
      });
      const respData = await resp.data.data;

      setCheck(respData);
    } catch (error) {
      console.log("ee", error);
    }
  };

  useEffect(() => {
    if (router.query.type === "CREATE") return;
    if (role_id) getMenusById(role_id);
  }, [role_id]);
  
  console.log("hcdvberv", formState?.app_type)
  const gettingMenuName = async () => {
    try {
      const respond = await axios.get(`${url}/api/menus`, { headers: headers });
      const apires = await respond.data.data;

      let updatedMenus = apires.map((item) => ({
        ...item,
        isEditable: false
      }));

      // if (formState?.mode === "web") {
      //   updatedMenus = updatedMenus.filter((item) => item.Ul_name === "Web");
      //   // updatedMenus = updatedMenus.filter((item) => item.mode === "Web");
      // }else if(formState?.mode== "mobile"){
      //   updatedMenus = updatedMenus.filter((item) => item.Ul_name == formState?.app_type  );
      // }
      // setMenus(updatedMenus);
      // // setMenus(
      // //   apires.map((item) => {
      // //     return {
      // //       ...item,
      // //       isEditable: false
      // //     };
      // //   })
      // // );

      if (formState?.mode === "web") {
        updatedMenus = updatedMenus.filter((item) => item.Ul_name === "Web");
        setMenus(updatedMenus);
      } else if (formState?.mode === "mobile" && formState?.app_type) {
        updatedMenus = updatedMenus.filter(
          (item) => item.Ul_name.toLowerCase() === formState.app_type.toLowerCase()
        );
        setMenus(updatedMenus);
      } else {
        setMenus(updatedMenus);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingMenuRole();
  }, []);

  useEffect(() => {
    gettingMenuName();
  }, [formState.mode, formState?.app_type]);

  const payload = menus
    .filter((item) => item && item.isEditable === true)
    .map((item) => ({
      menu_id: item?.menu_id,
      role_id: selectedRole?.role_id,
      U_profile_name: selectedRole?.description,
      app_type: formState?.mode =="web" ? "" :formState?.app_type,
      mode: formState?.mode,
      umenu_Name: item.menu_name,
      New: item.AddRight,
      modify: item.EditRight,
      view: item.ViewRight,
      Delete: item.DeleteRight,
      wf_approval: item.ApproveRight,
      menutype: item?.type_menu,
      c_name: userName,
      ul_name: userName,
      mode: formState?.mode,
      c_id: ciid.ciid
    }));

  console.log("Payload", payload);

  async function makingLoopApi(datas) {
    console.log("datas", datas);
    if (datas.length <= 0) {
      toast.error("Select Options");
      return;
    }
    if (!isSelect) {
      return;
    } else {
      try {
        let toastDisplayed = false;

      //  return
        for (const item of datas) {
          const response = await axios.post(`${url}/api/assign_menu_rights`, JSON.stringify(item), {
            headers: headers,
            params: {
              app_type: formState?.app_type,
              mode: formState?.mode
            }
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
      setEmailId(email_id);
      setUsername(userName);
      setUid(uid);
    }

    if (!localStorage.getItem("uid")) {
      router.push("/login");
    }
  }, []);

  // get all companies list

  const getAllCompIds = async (ciiid, cid) => {
    const res = await axios.get(`${url}/api/get_company_information${ciiid}${cid}`, { headers: headers });
    const respdata = await res.data.data;
    setCompList(respdata);
    console.log("complist", respdata);
  };

  useEffect(() => {
    switch (selectedRole.role_id) {
      case "1":
        getAllCompIds("", "");
        break;
      default:
        const ciiid = "?c_id=";
        getAllCompIds(ciiid, cid);
    }
  }, [selectedRole?.role_id, cid]);

  useEffect(() => {
    if (window.localStorage) {
      const c_id = localStorage.getItem("c_id");
      setCid(c_id);
    }
  }, []);

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

              {/* user profile  */}

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
                      onChange={(e) => {
                        if (e) {
                          setcomDisable(false);
                          setClearCompList(true);
                          setciid({ ...ciid, ciid: [] });
                        }
                        handleSelectRole(e);
                      }}
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

              {router.query.type == "view" ? (
                <div className="w-full flex mt-4 ">
                  <div className="w-1/2 px-2 relative  ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500">*</span> Mode
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                      id="statusSelect"
                      disabled
                      name="status"
                      value={mode}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          mode: e.target.value
                        })
                      }
                    >
                      <option
                        // defaultValue="enabled"
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select Option
                      </option>
                      <option value="mobile">Mobile</option>
                      <option value="web">Web</option>
                    </select>
                  </div>
                  {mode == "mobile" && (
                    <div className="w-1/2 px-2 relative ">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                        <span className="text-red-500">*</span> Application Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                        id="statusSelect"
                        name="status"
                        disabled
                        value={app_type}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            app_type: e.target.value
                          })
                        }
                      >
                        <option value="Field Force Apps">Field Force Apps</option>
                        <option value="Sales Force Automation Apps">Sales Force Automation Apps</option>
                        <option value="B-2-B Dealer Apps">B-2-B Dealer Apps</option>
                        <option value="Crop Advisor Apps">Crops Advisor Apps</option>
                        <option value="Loyalty Program Apps">Loyalty Program Apps</option>
                        <option value="Farmer Apps">Farmer Apps</option>
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full flex mt-4 ">
                  <div className="w-1/2 px-2 relative  ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                      <span className="text-red-500">*</span> Mode
                    </label>
                    <select
                      className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                      id="statusSelect"
                      name="status"
                      value={formState.mode}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          mode: e.target.value
                        })
                      }
                    >
                      <option
                        // defaultValue="enabled"
                        className="focus:outline-none focus:border-b bg-white"
                      >
                        Select Option
                      </option>
                      <option value="mobile">Mobile</option>
                      <option value="web">Web</option>
                    </select>
                  </div>
                  {formState.mode == "mobile" && (
                    <div className="w-1/2 px-2 relative ">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userSelect">
                        <span className="text-red-500">*</span> Application Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border-b border-gray-500  bg-white focus:outline-none focus:border-b focus:border-gray-500"
                        id="statusSelect"
                        name="status"
                        value={formState?.app_type}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            app_type: e.target.value
                          })
                        }
                      >
                        <option value="Field Force Apps">Field Force Apps</option>
                        <option value="Sales Force Automation Apps">Sales Force Automation Apps</option>
                        <option value="B-2-B Dealer Apps">B-2-B Dealer Apps</option>
                        <option value="Crop Advisor Apps">Crops Advisor Apps</option>
                        <option value="Loyalty Program Apps">Loyalty Program Apps</option>
                        <option value="Farmer Apps">Farmer Apps</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* company dropdown */}

              {/* <div className=" text-black flex items-center justify-start mt-4">
                {router.query.type == "CREATE" && (
                  <div className="w-1/2 flex items-center justify-center">
                    <label className="w-1/2 text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                      <span className="text-red-500 p-1">*</span>Company
                    </label>
                    <Select
                      isDisabled={comDisable}
                      isMulti
                      isClearable={clearCompList}
                      value={ciid.ciid}
                      options={compList}
                      onChange={handleCompChange}
                      className="border-b-2 w-full"
                    />
                  </div>
                )}

                {router.query.type == "view" && (
                  <div className="w-1/2 flex items-center justify-center">
                    <label className="w-1/2 text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                      <span className="text-red-500 p-1">*</span>Company
                    </label>
                    <Select
                      isDisabled={comDisable}
                      isMulti
                      isClearable={clearCompList}
                      value={check[0]?.c_names}
                      options={compList}
                      onChange={handleCompChange}
                      className="border-b-2 w-full"
                    />
                  </div>
                )}
              </div> */}

              {/* Assign Menu Rights  */}

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
                        {router.query.type=="view" &&(
                          <td className="px-6 py-2 text-center dark:border-2 text-xs whitespace-nowrap font-medium text-gray-500  tracking-wider">
                          App Type
                          </td>
                        )}
                      </tr>
                    </thead>
                    <tbody className="font-arial text- text-center">
                      {router.query.type == "CREATE" &&
                        menus?.map((menu, index) => (
                          <tr
                            className={`bg-white divide-y ${
                              rowdisable(menu) ? "border-2 border-red-200" : ""
                            }  text-xs`}
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
                        ))}

                      {check?.map(
                        (menu, index) => (
                          console.log("dd", menu.menutype),
                          (
                            <tr
                              className={`bg-white divide-y ${
                                rowdisable2(menu) ? "border-2 border-red-200" : ""
                              }  text-xs`}
                              key={menu._id}
                            >
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
                              <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-left text-xs">
                                {menu?.app_type ? menu?.app_type : "NA"}
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
