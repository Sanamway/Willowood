import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const PopupModals = ({ closeModal, regionData, catData }) => {
  const [selected, setSelected] = useState("category");
  const [nameSort, setNameSort] = useState(true);
  const [catdata, setCatData] = useState([]);
  const [regiondata, setRegionData] = useState([]);

  useEffect(() => {
    let catTimer;
    let regionTimer;

    if (selected === "category") {
      catTimer = setTimeout(() => {
        setCatData(catData || []);
      }, 2000);
    }

    if (selected === "region") {
      regionTimer = setTimeout(() => {
        setRegionData(regionData || []);
      }, 2000);
    }

    return () => {
      clearTimeout(catTimer);
      clearTimeout(regionTimer);
    };
  }, [selected, catData, regionData]);

  const handleSort = () => {
    const sortData = [...(selected === "category" ? catData : regionData)].sort((a, b) =>
      nameSort ? a.id - b.id : b.id - a.id
    );

    if (selected === "category") {
      setCatData(sortData);
    } else {
      setRegionData(sortData);
    }

    setNameSort(!nameSort);
  };

  function Skeleton() {
    return (
      <>
        {Array.from({ length: catData?.length }).map((_, index) => (
          <tr key={index}>
            <td className="px-2 py-1 text-center whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
            <td className="px-2 py-1 text-center whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
            <td className="px-2 py-1 text-center whitespace-nowrap border">
              <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      <div className=" bg-gray-300/40 opacity-1  from-gray-50 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 ">
        <div className="mainContainer lg:w-[55%] w-full mx-2 h-auto   bg-white rounded-lg  ">
          <div className="flex items-center justify-between py-1.5 px-2 border-b-2">
            <div className="px-2 text-[0.89rem] font-semibold text-gray-500 py-1">Active Customer</div>
            <button className="" onClick={closeModal}>
              <IoCloseOutline
                className="text-gray-900 bg-gray-50 rounded-full border"
                size={25}
              ></IoCloseOutline>
            </button>
          </div>
          {/* tabs  */}
          <div className="wrapTitle flex items-center justify-start mt-4 px-6 ">
            <button
              onClick={() => setSelected("category")}
              className={`text-[0.75rem] font-semibold pb-1  ${
                selected == "category"
                  ? "border-b-[3px] px-2 text-blue-400 border-blue-400"
                  : "border-b-2 px-2 text-gray-500 "
              }`}
            >
              Category Based
            </button>
            <button
              onClick={() => setSelected("region")}
              className={`text-[0.75rem] font-semibold pb-1  ${
                selected == "region"
                  ? "border-b-[3px] px-2 text-blue-400 border-blue-400"
                  : "border-b-2 px-2 text-gray-500 "
              }`}
            >
              Region Based
            </button>
          </div>

          {/* tables  */}

          {selected == "category" && (
            <div className="orderwrapper px-2 py-2 ">
              <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                <div className="bg-white  flex-1 md:flex items-center justify-center gap-4 rounded-md shadow- text-white text-center">
                  <div className="overflow-x-auto chat-scrollbar select-none w-full h-72">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                      <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
                        <tr className="">
                          <th
                            onClick={handleSort}
                            className="px-4 cursor-pointer text-left  py-1  text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex items-center">
                              Category{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th
                            onClick={handleSort}
                            className="px-2 text-left cursor-pointer  py-1 text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Sales Amount{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th onClick={handleSort} className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                            <span className="flex t items-center justify-center w-full">
                              No. of Customers{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 break-normal ">
                        {catdata.length ? (
                          catdata.map((item) => (
                            <tr key={item?.id}>
                              <td
                                className={`px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.6rem] text-gray-500 border `}
                              >
                                <div className="flex items-center gap-4">
                                  {" "}
                                  <input type="checkbox" className="" />
                                  {item?.category}
                                </div>
                              </td>
                              <td
                                className={`px-2 font-semibold text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                              >
                                ₹ {item?.amount} Cr
                              </td>
                              <td
                                className={`px-4 text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                              >
                                {item?.number}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <Skeleton></Skeleton>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Region Table  */}

          {selected == "region" && (
            <div className="orderwrapper px-2 py-2 ">
              <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
                <div className="bg-white  flex-1 md:flex items-center justify-center gap-4 rounded-md shadow- text-white text-center">
                  <div className="overflow-x-auto chat-scrollbar select-none w-full h-72">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                      <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
                        <tr className="">
                          <th
                            onClick={handleSort}
                            className="px-4 cursor-pointer text-left flex items-center justify-start  py-1  text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex items-center justify-start w-full">
                              Region Name{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th onClick={handleSort} className="px-2 cursor-pointer py-1 text-[0.78rem] text-blue-400 font-bold">
                          <span className="flex items-center justify-center w-full">
                              Total Sales{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                           </th>

                          <th onClick={handleSort} className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                          <span className="flex items-center justify-center w-full">
                              No. of Customers{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 break-normal ">
                        {regiondata?.length ? (
                          regiondata?.map((item) => (
                            <tr key={item?.id}>
                              <td
                                className={`px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.6rem] text-gray-500 border `}
                              >
                                <div className="flex items-center gap-4">
                                  {" "}
                                  <input type="checkbox" className="" />
                                  {item?.region}
                                </div>
                              </td>
                              <td
                                className={`px-2 font-semibold text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                              >
                                ₹ {item?.amount} Cr
                              </td>
                              <td
                                className={`px-4 text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                              >
                                {item?.number}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <Skeleton></Skeleton>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};
export default PopupModals;
