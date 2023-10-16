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
      name: "Menu Admin Check This",
    },
    {
      id: 2,
      name: "Menu 2",
    },
    {
      id: 3,
      name: "Menu 3",
    },
    // Add more menus as needed
  ];

  return (
    <>
      <Layout>
        <div className="h-screen overflow-auto w-full font-arial bg-white ">
          <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
            <h2 className="font-arial font-normal text-3xl  py-2">Region</h2>
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
                  className="text-red-500"
                  size={34}
                ></AiTwotoneHome>
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-8 p-10">
            <div className="flex flex-row w-6/12 justify-between">
              <h2>Region Id</h2>
              <input class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" />
            </div>
            <div className="flex flex-row  w-6/12  justify-between">
              <h2>Company</h2>
              <select
                id="userProfile"
                name="userProfile"
                className="bg-inherit border rounded-sm p-1 outline-none w-48 sm:w-56"
              >
                <option value="profile1">Company</option>
                <option value="profile2">Admin User</option>
                <option value="profile3">Business Head User</option>
                <option value="profile4">Zonal Manager User</option>
                <option value="profile4">Regional Manager User</option>
                <option value="profile4">Territory Manager User</option>
                <option value="profile4">
                  Marketing Represententative User
                </option>
              </select>
            </div>
            <div className="flex flex-row  w-6/12  justify-between">
              <h2>Business Segment</h2>
              <select
                id="userProfile"
                name="userProfile"
                className="bg-inherit border rounded-sm p-1 outline-none w-48 sm:w-56"
              >
                <option value="profile1">Business Segment</option>
                <option value="profile2">Admin User</option>
                <option value="profile3">Business Head User</option>
                <option value="profile4">Zonal Manager User</option>
                <option value="profile4">Regional Manager User</option>
                <option value="profile4">Territory Manager User</option>
                <option value="profile4">
                  Marketing Represententative User
                </option>
              </select>
            </div>
            <div className="flex flex-row  w-6/12  justify-between">
              <h2>Unit Division</h2>
              <select
                id="userProfile"
                name="userProfile"
                className="bg-inherit border rounded-sm p-1 outline-none w-48 sm:w-56"
              >
                <option value="profile1">Unit Division</option>
                <option value="profile2">Admin User</option>
                <option value="profile3">Business Head User</option>
                <option value="profile4">Zonal Manager User</option>
                <option value="profile4">Regional Manager User</option>
                <option value="profile4">Territory Manager User</option>
                <option value="profile4">
                  Marketing Represententative User
                </option>
              </select>
            </div>
            <div className="flex flex-row  w-6/12  justify-between">
              <h2>Zone</h2>
              <select
                id="userProfile"
                name="userProfile"
                className="bg-inherit border rounded-sm p-1 outline-none w-48 sm:w-56"
              >
                <option value="profile1">Region</option>
                <option value="profile2">Admin User</option>
                <option value="profile3">Business Head User</option>
                <option value="profile4">Zonal Manager User</option>
                <option value="profile4">Regional Manager User</option>
                <option value="profile4">Territory Manager User</option>
                <option value="profile4">
                  Marketing Represententative User
                </option>
              </select>
            </div>
            <div className="flex flex-row gap-32">
              <h2>Region</h2>
            </div>

            <div className="button flex items-center gap-3 mt-6">
                <div className="bg-green-700 px-4 py-1 text-white">Save</div>
              <div className="bg-yellow-500 px-4 py-1 text-white">Close</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfileForm;
