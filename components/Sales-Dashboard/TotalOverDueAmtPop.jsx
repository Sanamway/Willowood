import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSpring, animated } from "react-spring";

const TotalOutStandPop = ({ closeModal, regionData, catData, dueData }) => {
  const [selected, setSelected] = useState("category");
  const [nameSort, setNameSort] = useState(true);
  const [catdata, setCatData] = useState([]);
  const [regiondata, setRegionData] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCatData(dueData);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [selected, catData, regionData]);

  const handleSort = () => {
    const sortData = [...catdata].sort((a, b) => (nameSort ? a.id - b.id : b.id - a.id));

    if (selected === "category") {
      setCatData(sortData);
    } else {
      setRegionData(sortData);
    }
    setNameSort(!nameSort);
  };

  const springProps = useSpring({
    from: { opacity: 0, scale: 0.8, },
    to: { opacity: 1, scale: 1 },
  });


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
      <animated.div className=" bg-gray-100/40  backdrop-blur-[4px] from-gray-10 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 ">
        {/* <div className=" bg-gray-100/40  opacity-1 backdrop-blur-[4px] from-gray-10 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 "> */}
        <animated.div style={springProps} className="mainContainer lg:w-[55%] w-full mx-2 h-auto  bg-white rounded-lg  ">
          <div className="flex items-center justify-between py-1.5 px-2 border-b-2">
            <div className="px-2 text-[0.89rem] font-semibold text-gray-500 py-1">Total Overdue</div>
            <button className="" onClick={closeModal}>
              <IoCloseOutline
                className="text-gray-900 bg-gray-50 rounded-full border"
                size={25}
              ></IoCloseOutline>
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
                        <tr>
                          <th
                            onClick={handleSort}
                            className="px-2 text-left cursor-pointer py-1 text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Id{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Account{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>
                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Net Balance Amount
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              180-365
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>
                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              366-720
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>
                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              720 And Above
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
                        {catdata?.length ? (
                          catdata?.map((item, idx) => {
                            // Check if all three values are 0
                            if (
                              item["180-365"] === 0 &&
                              item["366-720"] === 0 &&
                              item["720 And Above"] === 0
                            ) {
                              return null; // Don't render the row if all values are 0
                            }

                            return (
                              <tr key={idx}>
                                <td className="px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.66rem] text-gray-500 border">
                                  {item._id}
                                </td>
                                <td className="px-2 text-left whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                                  {item.Account}
                                </td>
                                <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                                  {item["Net Balance Amt(INR)"]}
                                </td>
                                {item["180-365"] !== 0 && (
                                  <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                                    {item["180-365"]}
                                  </td>
                                )}
                                {item["366-720"] !== 0 && (
                                  <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                                    {item["366-720"]}
                                  </td>
                                )}
                                {item["720 And Above"] !== 0 && (
                                  <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                                    {item["720 And Above"]}
                                  </td>
                                )}
                              </tr>
                            );
                          })
                        ) : (
                          <Skeleton />
                        )}

                        <tr>
                          <td className="px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.66rem] text-gray-500 border">
                            Total
                          </td>
                          <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border"></td>
                          <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                            {catdata
                              .reduce((acc, curr) => acc + curr["Net Balance Amt(INR)"], 0)
                              .toFixed(2)}
                          </td>
                          {catdata.reduce((acc, curr) => acc + curr["180-365"], 0) !== 0 && (
                            <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                              {catdata.reduce((acc, curr) => acc + curr["180-365"], 0).toFixed(2)}
                            </td>
                          )}
                          {catdata.reduce((acc, curr) => acc + curr["366-720"], 0) !== 0 && (
                            <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                              {catdata.reduce((acc, curr) => acc + curr["366-720"], 0).toFixed(2)}
                            </td>
                          )}
                          {catdata.reduce((acc, curr) => acc + curr["720 And Above"], 0) !== 0 && (
                            <td className="px-2 text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border">
                              {catdata.reduce((acc, curr) => acc + curr["720 And Above"], 0).toFixed(2)}
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                            className="px-4 cursor-pointer text-left  py-1  text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex items-center">
                              Invoice No{" "}
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
                              Invoice Date{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Invoice Amount{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Payment Status{" "}
                              {nameSort ? (
                                <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
                              ) : (
                                <IoMdArrowDropup size={20}></IoMdArrowDropup>
                              )}
                            </span>
                          </th>

                          <th
                            onClick={handleSort}
                            className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                          >
                            <span className="flex t items-center justify-center w-full">
                              Due since{" "}
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
                        {catdata?.length ? (
                          catdata?.map((item) => (
                            <tr key={item?.id}>
                              <td
                                className={`px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.66rem] text-gray-500 border `}
                              >
                                <div className="flex items-center gap-4">
                                  {" "}
                                  <input type="checkbox" className="" />
                                  {item?.invoice_no}
                                </div>
                              </td>
                              <td
                                className={`px-2  text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                              >
                                {item?.invoice_date}
                              </td>
                              <td
                                className={`px-4 font-semibold text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                              >
                                ₹ {item?.invoice_amount}
                              </td>

                              <td
                                className={`px-2  text-left whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                              >
                                <div
                                  className={`bg-${item.color}-500 px-2  rounded-md text-[0.67rem] text-white font-semibold`}
                                >
                                  {item?.payment_status}
                                </div>
                              </td>

                              <td
                                className={`px-4 font-semibold text-left whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                              >
                                {item?.due_since}
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
        </animated.div>
        {/* </div> */}
      </animated.div>
    </>
  );
};
export default TotalOutStandPop;
