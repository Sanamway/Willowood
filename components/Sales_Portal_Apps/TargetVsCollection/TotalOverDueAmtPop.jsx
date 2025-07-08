import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSpring, animated } from "react-spring";

const TotalOutStandPop = ({ closeModal, regionData, catData, dueData, specialColumn }) => {
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
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  });

  function Skeleton() {
    return (
      <>
        {Array.from({ length: dueData?.length }).map((_, index) => (
          <tr key={index}>
            {[...Array(5)].map((_, idx) => (
              <td key={idx} className="px-2 py-1 text-center whitespace-nowrap border">
                <div className="w-3/4 h-3 bg-gray-300 rounded-md animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      <animated.div className="bg-gray-100/40 backdrop-blur-[4px] z-10 w-full flex items-center justify-center min-h-screen fixed top-0 right-0 left-0 bottom-0">
        <animated.div
          style={springProps}
          className="mainContainer w-full h-full bg-white rounded-none overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between py-1.5 px-2 border-b-2">
            <div className="px-2 text-[0.89rem] font-semibold text-gray-500 py-1">Total Overdue</div>
            <button onClick={closeModal}>
              <IoCloseOutline className="text-gray-900 bg-gray-50 rounded-full border" size={25} />
            </button>
          </div>

          {/* Content */}
          {selected === "category" && (
            <div className="orderwrapper px-2 py-2">
              <div className="w-full mt-2 flex flex-col gap-3 font-arial rounded-md">
                <div className="bg-white flex-1 md:flex items-center justify-center gap-4 rounded-md text-white text-center">
                  <div className="overflow-x-auto w-full h-[85vh]">
                    <table className="w-full text-sm text-left text-gray-500 rounded-full">
                      <thead className="text-xs text-gray-900 text-center bg-blue-50 rounded-md">
                        <tr>
                          {
                            specialColumn ?
                              [
                                { label: "Id" },
                                { label: "Account" },
                                { label: "Net Balance Amount" },
                                { label: "120-180" },
                                { label: "180-365" },
                                { label: "366-720" },
                                { label: "720 And Above" },
                              ] : [
                                { label: "Id" },
                                { label: "Account" },
                                { label: "Net Balance Amount" },
                                { label: "180-365" },
                                { label: "366-720" },
                                { label: "720 And Above" },
                              ].map(({ label }) => (
                                <th
                                  key={label}
                                  onClick={handleSort}
                                  className="px-2 py-1 cursor-pointer text-[0.78rem] text-blue-400 font-bold"
                                >
                                  <span className="flex items-center justify-center w-full">
                                    {label}
                                    {nameSort ? <IoMdArrowDropdown size={20} /> : <IoMdArrowDropup size={20} />}
                                  </span>
                                </th>
                              ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 break-normal">
                        {catdata?.length ? (
                          catdata.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-4 font-normal text-left py-1 text-[0.66rem] text-gray-500 border">
                                {item._id}
                              </td>
                              <td className="px-2 text-left py-1 text-[0.75rem] text-gray-600 border">
                                {item.Account}
                              </td>
                              <td className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border">
                                {item["Net Balance Amt(INR)"]}
                              </td>
                              {
                                specialColumn && <td className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border">
                                  {item["121-180"]}
                                </td>
                              }
                              <td className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border">
                                {item["180-365"]}
                              </td>
                              <td className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border">
                                {item["366-720"]}
                              </td>
                              <td className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border">
                                {item["720 And Above"]}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <Skeleton />
                        )}

                        <tr>
                          <td className="px-4 font-normal text-left py-1 text-[0.66rem] text-gray-500 border">
                            Total
                          </td>
                          <td className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border"></td>
                          {
                            specialColumn ? ["Net Balance Amt(INR)", "120-180", "180-365", "366-720", "720 And Above"] : ["Net Balance Amt(INR)", "180-365", "366-720", "720 And Above"].map((key, idx) => (
                              <td
                                key={idx}
                                className="px-2 text-center py-1 text-[0.75rem] text-gray-600 border"
                              >
                                {catdata.reduce((acc, curr) => acc + curr[key], 0).toFixed(2)}
                              </td>
                            ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add your region view logic here if needed */}
        </animated.div>
      </animated.div>
    </>
  );
};

export default TotalOutStandPop;