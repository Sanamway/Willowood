import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const DuePopup = ({ closeModal, regionData, catData, dueData }) => {
  const [selected, setSelected] = useState("category");
  const [nameSort, setNameSort] = useState(true);
  const [catdata, setCatData] = useState([]);
  const [regiondata, setRegionData] = useState([]);

  useEffect(() => {
   let timer = setTimeout(()=>{
    setCatData(dueData)
}, 2000)

    return () => {
      clearTimeout(timer);
      
    };
  }, [selected, catData, regionData]);

  const handleSort = () => {
    const sortData = [...catdata].sort((a, b) =>
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
        {Array.from({ length: dueData?.length }).map((_, index) => (
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
      <div className=" bg-gray-300/40 opacity-1 backdrop-blur-[4px] from-gray-50 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 ">
        <div className="mainContainer lg:w-[55%] w-full mx-2 h-auto   bg-white rounded-lg  ">
          <div className="flex items-center justify-between py-1.5 px-2 border-b-2">
            <div className="px-2 text-[0.89rem] font-semibold text-gray-500 py-1">Customer with Overdue</div>
            <button className="" onClick={closeModal}>
              <IoCloseOutline
                className="text-gray-900 bg-gray-50 rounded-full border"
                size={25}
              ></IoCloseOutline>
            </button>
          </div>
          {/* tabs  */}
          {/* <div className="wrapTitle flex items-center justify-start mt-4 px-6 ">
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
          </div> */}

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
                              Customer Name{" "}
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
                              Customer Code{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th onClick={handleSort} className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                            <span className="flex t items-center justify-center w-full">
                              Overdue Amount{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>


                          <th onClick={handleSort} className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                            <span className="flex t items-center justify-center w-full">
                              Inactive since{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th onClick={handleSort} className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                            <span className="flex t items-center justify-center w-full">
                              No. of Invoices{" "}
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
                                className={`px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.66rem] text-gray-500 border `}
                              >
                                <div className="flex items-center gap-4">
                                  {" "}
                                  <input type="checkbox" className="" />
                                  {item?.name}
                                </div>
                              </td>
                              <td
                                className={`px-2  text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                              >
                                {item?.code}
                               
                              </td>
                              <td
                                className={`px-4 font-semibold text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                              >
                                 ₹ {item?.amount}
                              </td>

                              <td
                                className={`px-4 font-semibold text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                              >
                                 ₹ {item?.inactive}
                              </td>

                              <td
                                className={`px-2  text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                              >
                                {item?.invoice}
                               
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
export default DuePopup;
