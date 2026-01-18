import React from "react";
import SidebarDashboard from "../../components/userDashboard/SidebarDashboard";
import { useState } from "react";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrder from "../../components/userDashboard/UserOrder";
import UserTransactions from "../../components/userDashboard/UserTransactions";
import UserHelpdesk from "../../components/userDashboard/UserHelpdesk";
import { Menu } from "lucide-react";

const UserDashboard = () => {
 
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <div className="flex w-full h-[86vh]">
        <div className={`transition-all duration-200 scroll-smooth ${collapsed ? "w-1/20" : "w-2/10"}`}>
    
        <SidebarDashboard collapsed={collapsed} setCollapsed={setCollapsed}  active={active} setActive={setActive} />
        
        </div>
        <div className={`${collapsed ? "w-19/20" : "w-8/10"}`}>
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
