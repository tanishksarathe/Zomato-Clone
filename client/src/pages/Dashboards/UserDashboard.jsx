import React, { useEffect } from "react";
import SidebarDashboard from "../../components/userDashboard/SidebarDashboard";
import { useState } from "react";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrder from "../../components/userDashboard/UserOrder";
import UserTransactions from "../../components/userDashboard/UserTransactions";
import UserHelpdesk from "../../components/userDashboard/UserHelpdesk";
import { Ban, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AddToCartPage from "../../components/userDashboard/AddToCartPage";

const UserDashboard = ({cart}) => {
 
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

  const { user, role, isLogin } = useAuth();

  useEffect(()=>{
    if(!isLogin){
      navigate('/login');
    }
  })


  if(role !== 'customer'){
    return (
      <div className="w-fit flex gap-3 p-5 mx-auto text-center bg-gray-100 border rounded-xl mt-5"><Ban color="red" />You are not logged in as Customer.</div>
    )
  }


  return (
    <>
      <div className="flex w-full h-full bg-(--color-background) border">
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
