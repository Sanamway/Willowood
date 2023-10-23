import React from "react";
import Layout from "../Layout";
import { AiTwotoneHome } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/router";
const UserProfileForm = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="h-screen overflow-auto w-full font-arial bg-white ">
        <div className="text-black flex items-center justify-between bg-white max-w-6/12 font-arial h-[52px] px-5">
          <h2 className="font-arial font-normal text-3xl  py-2"> Season </h2>

          <div className="flex items-center gap-2 cursor-pointer">
            <h2>
              <TiArrowBack
                onClick={() => {
                  router.push("/table/table_season");
                }}
                className="text-gray-400"
                size={35}
              />
            </h2>
            <h2>
              <AiTwotoneHome className="text-red-500" size={34}></AiTwotoneHome>
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
                Season Id
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                disabled
                placeholder="Season Id"
              />
            </div>

            <div className="w-1/2 px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="inputField"
              >
                <small className="text-red-600">*</small> Season Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="inputField"
                placeholder="Season Name"
              />
            </div>
            <div className="button flex items-center gap-3 mt-6">
              <div className="bg-green-700 px-4 py-1 text-white">Save</div>
              <button
                className="bg-yellow-500 px-4 py-1 text-white"
                onClick={() => {
                  router.push("/table/table_season");
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileForm;
