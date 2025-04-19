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

  const springProps = useSpring({
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
  });

  function Skeleton() {
    return (
      <>
        {Array.from({ length: dueData?.length }).map((_, index) => (
          <tr key={index}>
            {[...Array(5)].map((_, i) => (
              <td key={i} className="px-2 py-1 text-center whitespace-nowrap border">
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
      <animated.div className="fixed inset-0 z-50 bg-gray-100/50 backdrop-blur-sm flex items-center justify-center">
        <animated.div
          style={springProps}
          className="w-full h-full bg-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between py-2 px-4 border-b">
            <div className="text-base font-semibold text-gray-600">
              Total Outstanding
            </div>
            <button onClick={closeModal}>
              <IoCloseOutline
                className="text-gray-800 bg-gray-200 rounded-full border"
                size={25}
              />
            </button>
          </div>

          {/* Tab: Category View */}
          {selected === "category" && (
            <div className="p-4 overflow-auto h-[calc(100%-50px)]">
              <table className="w-full text-sm text-gray-600 border rounded">
                <thead className="text-xs bg-blue-50 text-blue-500 font-bold text-center">
                  <tr>
                    <th
                      onClick={handleSort}
                      className="px-2 py-2 cursor-pointer text-left"
                    >
                      <div className="flex items-center justify-start gap-1">
                        Id {nameSort ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                      </div>
                    </th>
                    <th
                      onClick={handleSort}
                      className="px-2 py-2 cursor-pointer text-left"
                    >
                      <div className="flex items-center justify-start gap-1">
                        Account {nameSort ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                      </div>
                    </th>
                    <th
                      onClick={handleSort}
                      className="px-2 py-2 cursor-pointer text-center"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Net Balance Amount
                        {nameSort ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {catdata?.length ? (
                    <>
                      {catdata.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-2 py-2 border text-left text-[0.75rem]">
                            {item._id}
                          </td>
                          <td className="px-2 py-2 border text-left text-[0.75rem]">
                            {item.Account}
                          </td>
                          <td className="px-2 py-2 border text-center text-[0.75rem]">
                            {item["Net Balance Amt(INR)"]}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold">
                        <td className="px-2 py-2 border text-left">Total</td>
                        <td className="px-2 py-2 border"></td>
                        <td className="px-2 py-2 border text-center">
                          {catdata
                            .reduce(
                              (acc, curr) =>
                                acc + (curr["Net Balance Amt(INR)"] || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* You can add the "region" tab content the same way inside here */}
        </animated.div>
      </animated.div>
    </>
  );
};

export default TotalOutStandPop;