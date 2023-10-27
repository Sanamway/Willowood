import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { AiFillFileExcel, AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "@/constants/url";

const UserProfileForm = () => {
  const router = useRouter();
  const [menuRole, setMenusRole] = useState([]);
  const [menuName, setMenusName] = useState([]);
  const [selected, setSelected] = useState('');
  const [isChecked, setChecked] = useState({});

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

  const gettingMenuName = async () => {
    try {
      const respond = await axios.get(`${url}/api/menus`, { headers: headers });
      const apires = await respond.data.data;
      setMenusName(apires);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingMenuRole();
    gettingMenuName();
  }, []);

 

  const filteredData = menuName.filter((item) => item?.type_menu === '2');


  const handleCheckAll = (menuId) => {
    const newChecked = { ...isChecked };
    newChecked[menuId] = !newChecked[menuId];
    setChecked(newChecked);
  };

  const handleCheck = (menuId, colIndex) => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };
  
      if (!newChecked[menuId]) {
        newChecked[menuId] = [];
      }
  
      newChecked[menuId][colIndex] = !newChecked[menuId][colIndex];
      console.log("dj",newChecked)
      return newChecked;
    });
  };

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };



  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-full font-arial h-[52px] px-5">
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

          {/* <div className="bg-gray-300"></div> */}
          <div className="bg-gray-100 py-4 h-screen rounded-md">
            <div className="text-black mx-12 bg-white p-4">
              <div className="text-black flex items-center gap-4">
                <h2 className=" text-md">Role</h2>
                <input disabled type="text" className="px-2 py-1 bg-gray-100 w-1/6" />
              </div>
              <div className=" text-black flex items-center justify-start mt-4">
                <div className="w-1/2 flex items-center justify-center">
                  <label className="w-1/2 text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                    <span className="text-red-500 p-1">*</span>User Profile
                  </label>
                  <select
                    className="w-full px-1 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                    id="userName"
                    value={selected}
                    onChange={handleSelected}
                  >
                    {menuRole.map((role) => (
                      <option
                        key={role.id}
                        className="focus:outline-none focus:border-b bg-white whitespace-nowrap w-full"
                        value={role.role}
                      >
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-8 font-arial">
                <h2 className="text-sm mb-4">Assign Menu Rights</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="font-arial border-b">
                      <tr className="border bg-gray-50 font-arial">
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider ">
                          SR NO.
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
                          Approve
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Reject
                        </td>
                        <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
                          Select ALL
                        </td>
                      </tr>
                    </thead>
                    <tbody className="font-arial text- text-center">
                      {filteredData.map((item, index) => (
                        <tr className="bg-white divide-y border divide-gray-200 text-xs" key={item.menu_id}>
                          <td className=" px-4 py-2 flex items-center gap-4">
                            <input type="checkbox" />
                            {item.menu_id + 1}
                          </td>
                          <td className="px-6 py-2 text-left dark:border-2 whitespace-nowrap font-arial text-xs">
                            {item.menu_name}
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" onChange={(e) => handleCheck(e, item.menu_id)} checked={isChecked[item.menu_id] || false}/>

                          </td>
                          <td className="border px-4 py-2">
                          <input type="checkbox" onChange={(e) => handleCheck(e, item.menu_id)} checked={isChecked[item.menu_id] || false}/>

                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" onChange={(e) => handleCheck(e, item.menu_id)} checked={isChecked[item.menu_id] || false}/>
                            
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" onChange={(e) => handleCheck(e, item.menu_id)} checked={isChecked[item.menu_id] || false}/>

                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" onChange={(e) => handleCheck(e, item.menu_id)} checked={isChecked[item.menu_id] || false}/>
                          </td>
                          <td className="border px-4 py-2">
                             <input type="checkbox" onChange={(e) => handleCheck(e, item.menu_id)} checked={isChecked[item.menu_id] || false}/>
                          </td>
                          <td className="border px-4 py-2 selectAll">
                          <input type="checkbox" onChange={() => handleCheckAll(item.menu_id)} checked={isChecked[item.menu_id]}/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="button flex items-center gap-3 mt-6">
                  <div className="bg-green-700 px-4 py-1 text-white">Save</div>
                  <div
                    onClick={() => {
                      router.push("/table/table_user_profile");
                    }}
                    className="bg-yellow-500 px-4 py-1 text-white"
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfileForm;
