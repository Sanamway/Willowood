import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSpring, animated } from "react-spring";

const PopupModals = ({ closeModal, gridData }) => {


  const [data, setData] = useState([]);

  useEffect(() => {
    setData(gridData || []);
  }, [gridData]);




  const springProps = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  });


  return (
    <>
      <animated.div className=" bg-gray-300/40 opacity-1 backdrop-blur-[4px]  from-gray-50 to-transparent z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0 ">
        <animated.div style={springProps} className="mainContainer lg:w-[55%] w-full mx-2 h-auto   bg-white rounded-lg  ">
          <div className="flex items-center justify-between py-1.5 px-2 border-b-2">
            <div className="px-2 text-[0.89rem] font-semibold text-gray-500 py-1">New Customer ({data.length})</div>
            <button className="" onClick={closeModal}>
              <IoCloseOutline
                className="text-gray-900 bg-gray-50 rounded-full border"
                size={25}
              ></IoCloseOutline>
            </button>
          </div>
          {/* tabs  */}

          {/* tables  */}



          <div className="orderwrapper px-2 py-2 ">
            <div className="w-full px- mt-2 flex lg:flex-row flex-col gap-3 font-arial rounded-md">
              <div className="bg-white  flex-1 md:flex items-center justify-center gap-4 rounded-md shadow- text-white text-center">
                <div className="overflow-x-auto chat-scrollbar select-none w-full h-72">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-full ">
                    <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md ">
                      <tr className="">
                        <th
                          className="px-2 text-left cursor-pointer  py-1 text-[0.78rem] text-blue-400 font-bold"
                        >
                          <span className="flex items-center">
                            SAP Customer No
                          </span>
                        </th>
                        <th

                          className="px-4 cursor-pointer text-left  py-1  text-[0.78rem] text-blue-400 font-bold"
                        >
                          <span className="flex items-center">
                            Party Name
                          </span>
                        </th>


                        <th className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                          <span className="flex t items-center justify-center w-full">
                            Status

                          </span>
                        </th>
                        <th className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold">
                          <span className="flex t items-center justify-center w-full">
                            Territory Name

                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 break-normal ">
                      {data.length ? (
                        data.map((item, idx) => (
                          <tr key={idx}>
                            <td
                              className={`px-2 font-semibold text-center whitespace-nowrap py-1 text-[0.75rem] text-gray-600 border `}
                            >
                              {item?.SAP_customerSAPNoL}
                            </td>
                            <td
                              className={`px-4 font-normal gap-1 text-left whitespace-nowrap py-1 text-[0.6rem] text-gray-500 border `}
                            >
                              <div className="flex items-center gap-4">


                                {item?.party_Name}
                              </div>
                            </td>

                            <td
                              className={`px-4 text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                            >
                              {item?.SAP_customer_status}
                            </td>
                            <td
                              className={`px-4 text-center whitespace-nowrap  py-1 text-[0.74rem] text-gray-500 border `}
                            >
                              {item?.territory_name}
                            </td>
                          </tr>
                        ))
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>




        </animated.div>
      </animated.div>
    </>
  );
};
export default PopupModals;
