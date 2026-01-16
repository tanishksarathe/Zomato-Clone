import React from "react";
import SidebarDashboard from "../../components/userDashboard/SidebarDashboard";
import { useState } from "react";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrder from "../../components/userDashboard/UserOrder";
import UserTransactions from "../../components/userDashboard/UserTransactions";
import UserHelpdesk from "../../components/userDashboard/UserHelpdesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");

  return (
    <>
      <div className="flex w-full h-[86vh]">
        <div className="border border-green-500 w-1/7 bg-(--color-accent-soft)">
          <SidebarDashboard active={active} setActive={setActive} />
        </div>
        <div className="border border-red-500 w-6/7">
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "order" && <UserOrder />}
          {active === "transaction" && <UserTransactions />}
          {active === "help" && <UserHelpdesk />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
