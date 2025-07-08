import React, { useState, useEffect } from "react";
import Region from "./formTabs/Region";
import Zone from "./formTabs/Zone";
import B2C from "./formTabs/B2C";
import BU from "./formTabs/BU";
import CH from "./formTabs/CH";

const TabForm = ({ policy, roleId, userData, orderStatus, orderCredit, hardcodedData }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [visibleTabs, setVisibleTabs] = useState([]);

  console.log("Policy", policy[0])
  const currentPolicy = policy[0];

  useEffect(() => {
    if (policy?.length > 0) {
      const currentPolicy = policy[0];

      console.log("policiesee", currentPolicy)

      let defaultTab = currentPolicy.bst;
      switch (roleId) {
        case 4:
          defaultTab = currentPolicy?.tab_2;
          break;
        case 5:
          defaultTab = currentPolicy?.tab_1;
          break;
        case 10:
          defaultTab = currentPolicy?.tab_5;
          break;
        case 3:
          defaultTab = currentPolicy?.tab_3;
          break;
        case 16:
          // defaultTab = currentPolicy?.tab_5;
          defaultTab = currentPolicy?.tab_4;
          break;
        default:
          defaultTab = currentPolicy.bst;
      }

      setActiveTab(defaultTab);

      const tabs = [];
      if (currentPolicy.tab_1) tabs.push(currentPolicy.tab_1);
      if (currentPolicy.tab_2) tabs.push(currentPolicy.tab_2);
      if (currentPolicy.tab_3) tabs.push(currentPolicy.tab_3);
      if (currentPolicy.tab_4) tabs.push(currentPolicy.tab_4);
      if (currentPolicy.tab_5) tabs.push(currentPolicy.tab_5);

      setVisibleTabs(tabs);
    }
  }, [policy, roleId]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  if (!policy || policy.length === 0) {
    return null;
  }


  console.log("FromTac", policy[0]?.tab_3)

  return (
    <>
      <ul className="flex border-b overflow-scroll no-scrollbar max-w-sm items-center justify-between">
        {visibleTabs.map((tabName, index) => (
          <li key={index} className="-mb-px text-xs mr-1">
            <button
              className={`${activeTab === tabName
                ? "flex gap-2 rounded-sm py-2 px-4 font-semibold bg-blue-800 text-white"
                : "flex gap-2 bg-white text-black rounded-sm py-2 px-4 font-semibold"
                }`}
              onClick={() => handleTabClick(tabName)}
            >
              {tabName}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === policy[0]?.tab_1 && (
        <Region
          {...currentPolicy}
          tabForm={setActiveTab}
          userData={userData}
          orderStatus={orderStatus}
          orderCredit={orderCredit}
          activeTab={activeTab}
          hardcodedData={hardcodedData}
        />
      )}
      {activeTab === policy[0]?.tab_2 && (
        <Zone
          {...currentPolicy}
          tabForm={setActiveTab}
          userData={userData}
          orderStatus={orderStatus}
          orderCredit={orderCredit}
          hardcodedData={hardcodedData}
        />
      )}
      {activeTab === policy[0]?.tab_3 && (
        <BU
          {...currentPolicy}
          tabForm={setActiveTab}
          userData={userData}
          orderStatus={orderStatus}
          orderCredit={orderCredit}
          hardcodedData={hardcodedData}
        />
      )}
      {activeTab === policy[0]?.tab_5 && (
        <B2C
          {...currentPolicy}
          tabForm={setActiveTab}
          userData={userData}
          orderStatus={orderStatus}
          orderCredit={orderCredit}
          hardcodedData={hardcodedData}

        />
      )}
      {activeTab === policy[0]?.tab_4 && (
        <CH
          {...currentPolicy}
          tabForm={setActiveTab}
          userData={userData}
          orderStatus={orderStatus}
          orderCredit={orderCredit}
          hardcodedData={hardcodedData}
        />
      )}
    </>
  );
};

export default TabForm;
