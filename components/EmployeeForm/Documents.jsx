import React, { useState, Fragment } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover } from "@headlessui/react";
const Documents = () => {
  let [isOpen, setIsOpen] = useState(false);
  const menus = [
    {
      id: 1,
      name: "Bank Details",
    },
    {
      id: 2,
      name: "Declaration Forms",
    },
    {
      id: 2,
      name: "Education Details",
    },
    {
      id: 2,
      name: "Employee Identity Card",
    },
    {
      id: 2,
      name: "Employement Details",
    },
    {
      id: 2,
      name: "Identification Details",
    },
    {
      id: 2,
      name: "Other",
    },
    {
      id: 2,
      name: "Personal Details",
    },
    {
      id: 2,
      name: "Requistion for Visiting Cards",
    },
    {
      id: 2,
      name: "Training Details",
    },
  ];
  const handleUploadImage = (e) => {
    console.log("ys", e.target.files[0]);
    if (e.target.files[0]) {
      setIsOpen(true);
    }
  };
  const [formActive, setFormActive] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-2 pb-24">
      <table className="w-2/3 border-collapse block md:table lg:w-full">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">
              SR NO.
            </th>
            <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Document Name
            </th>

            <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {menus.map((item, index) => (
            <tr className=" border border-grey-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {index + 1}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {item.name}
              </td>
              <td className="p-2 md:border md:border-grey-500  block md:table-cell sm  ">
                <div className="popop">
                  <Popover
                    as="div"
                    className="relative lg:relative border-none outline-none "
                  >
                    {({ open }) => (
                      <>
                        <Popover.Button className="focus:outline-none">
                          <BsThreeDotsVertical
                            className="text-[#626364] cursor-pointer"
                            size={20}
                          ></BsThreeDotsVertical>
                        </Popover.Button>

                        <Popover.Panel
                          as="div"
                          className={`${
                            open ? "block" : "hidden"
                          }  absolute left-0 lg:absolute z-40 top-1 right-0 mt-2 w-40 bg-white  text-black border rounded-md shadow-md`}
                        >
                          <ul className=" text-black text-xs flex flex-col gap-  font-Rale cursor-pointer">
                            <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                              New
                            </li>
                            <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                              Edit
                            </li>
                            <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                              View
                            </li>
                            <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
                              Previous Period
                            </li>
                          </ul>
                        </Popover.Panel>
                      </>
                    )}
                  </Popover>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
