import {
  HandHelping,
  Headset,
  LogOut,
  Menu,
  Notebook,
  ScanLine,
  ShoppingBag,
  SquareMenu,
  Target,
  UserRoundPen,
} from "lucide-react";
import React from "react";
import api from '../../config/API'
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const RestaurantSidebar = ({ active, setActive, collapsed, setCollapsed }) => {
  const { setUser, setIsLogin, user } = useAuth();

  const list = [
    {
      key: "overview",
      icon: <Target size={15} />,
      title: "Overview",
    },
    {
      key: "profile",
      icon: <UserRoundPen size={15} />,
      title: "Profile",
    },
    {
      key: "menu",
      icon: <Notebook size={15} />,
      title: "Menu & Dishes",
    },
    {
      key: "order",
      icon: <ShoppingBag size={15} />,
      title: "Orders",
    },
    {
      key: "account",
      icon: <ScanLine size={15} />,
      title: "Accounts",
    },
    {
      key: "help",
      icon: <Headset size={15} />,
      title: "Help Desk",
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout"); // backend bhraman to clear cookie
      setUser(""); //auth clear
      setIsLogin(false); // auth login clear
      sessionStorage.removeItem("GrabMyMeal User");// session clear
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(err?.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <>
      <div className="shadow-2xl fixed rounded-xl mt-1 ml-1 bg-(--color-accent-soft)">
        <div
          className={`p-3 text-nowrap font-bold pb-3 border-b flex text-xl justify-start items-center gap-2`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex ${collapsed ? `mx-auto p-1.5` : ""}`}
          >
            <SquareMenu size={15} />
          </button>{" "}
          {collapsed ? "" : `${(user?.role === "admin") ? "Admin" :
            (user?.role === "partner")? "Rider" :
            (user?.role === "manager")? "Restaurant" : "Customer" 
          } Dashboard`}
        </div>

        <div className="flex flex-col p-3 h-80 gap-3 font-semibold">
          {list.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActive(item.key)}
              className={`flex gap-3 h-12 text-nowrap overflow-hidden items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` : ""} ${active === item.key ? "bg-(--color-surface)" : "transition-all hover:scale-105"}`}
            >
              {item.icon} {collapsed ? "" : item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="shadow-2xl rounded-xl fixed bottom-5 self-start mt-1 ml-1 bg-(--color-accent-soft) h-fit">
        <div className="flex flex-col p-3 h-fit gap-3 font-semibold">
          <button
            onClick={handleLogout}
            className={`flex gap-3 h-12 text-nowrap text-red-700 overflow-hidden items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` : ""} ${active === 'logout' ? "bg-(--color-surface)" : "transition-all hover:scale-105"}`}
          >
            <LogOut /> {collapsed ? "" : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSidebar;
