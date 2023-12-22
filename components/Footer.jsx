import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex w-full ">
        <div className="bg-yellow-500 h-6 w-1/3 flex items-center justify-start">
          <h2 className="italic text-[0.6rem] px-4">
            Willowood Chemicals Limited
          </h2>
        </div>
        <div className="bg-green-700 h-6 w-3/4 flex items-center justify-center">
          <h2 className="text-[0.6rem]">
            Copyright@2023 Willowood All Rights Reserved
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
