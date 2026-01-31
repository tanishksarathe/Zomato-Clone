import React, { useEffect } from "react";
import { useState } from "react";
import { Ban, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RestaurantSidebar from "../../components/restaurantDashboard/RestaurantSidebar";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview";
import RestaurantProfile from "../../components/restaurantDashboard/RestaurantProfile";
import RestaurantMenu from "../../components/restaurantDashboard/RestaurantMenu";
import RestaurantAccount from "../../components/restaurantDashboard/RestaurantAccount";
import RestaurantHelpdesk from "../../components/restaurantDashboard/RestaurantHelpdesk";
import RestaurantOrder from "../../components/restaurantDashboard/RestaurantOrder";

const RestaurantDashboard = () => {
 
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

  const { user, role, isLogin } = useAuth();

  useEffect(()=>{
    if(!isLogin){
      navigate('/login');
    }
  })


  if(role !== 'manager'){
    return (
      <div className="w-fit flex gap-3 p-5 mx-auto text-center bg-gray-100 border rounded-xl mt-5"><Ban color="red" />You are not logged in as Restaurant Manager.</div>
    )
  }


  return (
    <>
      <div className="flex w-full h-full bg-(--color-background) border">
        <div className={`transition-all duration-200 scroll-smooth ${collapsed ? "w-1/20" : "w-2/10"}`}>
    
        <RestaurantSidebar collapsed={collapsed} setCollapsed={setCollapsed}  active={active} setActive={setActive} />
        
        </div>
        <div className={`${collapsed ? "w-19/20" : "w-8/10"}`}>
          {active === "overview" && <RestaurantOverview />}
          {active === "profile" && <RestaurantProfile />}
          {active === "order" && <RestaurantOrder />}
          {active === "menu" && <RestaurantMenu />}
          {active === "transaction" && <RestaurantAccount />}
          {active === "help" && <RestaurantHelpdesk />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;
