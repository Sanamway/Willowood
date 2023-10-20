import React from "react";
import Layout from "./Layout";
import { AiFillFileExcel, AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
const UserProfileForm = () => {
  const router = useRouter();

  const menus = [
    {
      id: 1,
      name: "Menu Admin Check This"
    },
    {
      id: 2,
      name: "Menu 2"
    },
    {
      id: 3,
      name: "Menu 3"
    }
    // Add more menus as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
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
                className="text-red-500" size={34}></AiTwotoneHome>
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
                {/* <div className="flex items-center justify-center gap-4 ">
                  <h1 className="">
                    User Profile<span className="text-red-500">*</span>
                  </h1>
                  <select
                    id="userProfile"
                    name="userProfile"
                    className="bg-inherit border rounded-sm p-1 outline-none w-48 sm:w-56"
                  >
                    <option value="profile1">Super Administration User</option>
                    <option value="profile2">Admin User</option>
                    <option value="profile3">Business Head User</option>
                    <option value="profile4">Zonal Manager User</option>
                    <option value="profile4">Regional Manager User</option>
                    <option value="profile4">Territory Manager User</option>
                    <option value="profile4">Marketing Represententative User</option>
                  </select>
                </div> */}
                 <div className="w-1/3 flex items-center justify-center">
                  <label className="w-full text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                    <span className="text-red-500 p-1">*</span>User Name
                  </label>
                  <select
                    className="w-full px-3 py-2 border-b border-gray-500 rouded bg-white focus:outline-none focus:border-b focus-border-indigo-500"
                    id="userName"
                  >
                    <option value="" className="focus:outline-none focus:border-b bg-white">
                      {/* Option */}
                    </option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
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
                      </tr>
                    </thead>
                    <tbody className="font-arial text- text-center">
                      {menus.map((menu, index) => (
                        <tr className="bg-white divide-y border divide-gray-200 text-xs" key={menu.id}>
                          <td className="border px-4 py-2 flex items-center gap-4">
                            <input type="checkbox" />
                            {index + 1}
                          </td>
                          <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                            {menu.name}
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" />
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" />
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" />
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" />
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" />
                          </td>
                          <td className="border px-4 py-2">
                            <input type="checkbox" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="button flex items-center gap-3 mt-6">
                  <div className="bg-green-700 px-4 py-1 text-white">Save</div>
                  <div  onClick={() => {
                      router.push("/table/table_user_profile");
                    }} className="bg-yellow-500 px-4 py-1 text-white">Close</div>
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
