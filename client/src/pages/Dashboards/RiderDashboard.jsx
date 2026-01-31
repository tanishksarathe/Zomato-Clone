import React, { useEffect } from "react";
import { useState } from "react";
import { Ban, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RiderSidebar from "../../components/riderDashboard/RiderSidebar";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderProfile from "../../components/riderDashboard/RiderProfile";
import RiderOrder from "../../components/riderDashboard/RiderOrder";
import RiderTransactions from "../../components/riderDashboard/RiderTransactions";
import RiderHelpdesk from "../../components/riderDashboard/RiderHelpdesk";

const RiderDashboard = () => {
 
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

  const { user, role, isLogin } = useAuth();

  useEffect(()=>{
    if(!isLogin){
      navigate('/login');
    }
  })


  if(role !== 'partner'){
    return (
      <div className="w-fit flex gap-3 p-5 mx-auto text-center bg-gray-100 border rounded-xl mt-5"><Ban color="red" />You are not logged in as Delivery Partner.</div>
    )
  }


  return (
    <>
      <div className="flex w-full h-full bg-(--color-background) border">
        <div className={`transition-all duration-200 scroll-smooth ${collapsed ? "w-1/20" : "w-2/10"}`}>
    
        <RiderSidebar collapsed={collapsed} setCollapsed={setCollapsed}  active={active} setActive={setActive} />
        
        </div>
        <div className={`${collapsed ? "w-19/20" : "w-8/10"}`}>
          {active === "overview" && <RiderOverview />}
          {active === "profile" && <RiderProfile />}
          {active === "order" && <RiderOrder />}
          {active === "transaction" && <RiderTransactions />}
          {active === "help" && <RiderHelpdesk />}
        </div>
      </div>
    </>
  );
};

export default RiderDashboard;
