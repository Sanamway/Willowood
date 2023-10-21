import React from "react";

const Documents = () => {
  const menus = [
    {
      id: 1,
      name: "Menu Admin Check This",
    },
    {
      id: 2,
      name: "Menu 2",
    },
    {
      id: 3,
      name: "Menu 3",
    },
  ];
  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="self-end mt-4 text-sm text-green-700">
        DOWNLOAD ALL DOCUMENTS
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-gray-100 pb-12 pt-4 ">
        <h1 className="text-4xl font-bold text-gray-300">DROP FILES HERE</h1>
        <a href="#" className="mt-4 underline">
          Click to upload
        </a>
      </div>

      <table className="min-w-full">
        <thead className="font-arial border-b">
          <tr className="border bg-gray-50 font-arial">
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider ">
              SR NO.
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Document Name
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              File Name
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Last Updated
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Date of expiry
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Download file
            </td>
            <td className="px-6 py-2 text-center dark:border-2 text-xs font-medium text-gray-500  tracking-wider">
              Sample document
            </td>
          </tr>
        </thead>
        <tbody className="font-arial text- text-center">
          {menus.map((menu, index) => (
            <tr
              className="bg-white divide-y border divide-gray-200 text-xs"
              key={menu.id}
            >
              <td className="border px-4 py-2 flex items-center gap-4">
                <input type="checkbox" />
                {index + 1}
              </td>
              <td className="px-6 py-2 dark:border-2 whitespace-nowrap font-arial text-xs">
                hye
              </td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
              <td className="border px-4 py-2">hye</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button flex justify-end  gap-3 mt-6">
        <div className="bg-green-700 px-4 py-1 text-white">Edit</div>
      </div>
    </div>
  );
};

export default Documents;
