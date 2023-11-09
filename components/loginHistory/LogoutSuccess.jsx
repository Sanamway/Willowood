import React from "react";
import { useRouter } from "next/router";

const LogoutSuccess = () => {
  const router = useRouter();

  return (
    <div className=" relative flex-1 bg-banner bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-center font-arial">
      <div className="bg-white text-black p-4 md:w-1/2 lg:w-1/3 shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-2xl lg:text-4xl font-normal mb-4 pt-4">
          You have been logged out successfully
        </h1>
        <p className="mb-4 text-lg md:text-xl lg:text-2xl pt-4">Thank you for using our application.</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {router.push('/login')}}
            className="bg-green-500 px-2 py-1.5 text-white rounded-md font-arial font-"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutSuccess;
