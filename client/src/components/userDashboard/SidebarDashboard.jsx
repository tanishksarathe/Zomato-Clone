import {
  HandHelping,
  Headset,
  Menu,
  ScanLine,
  ShoppingBag,
  SquareMenu,
  Target,
  UserRoundPen,
} from "lucide-react";
import React from "react";

const SidebarDashboard = ({ active, setActive, collapsed, setCollapsed }) => {


  const list = [
    {
      key: "overview",
      icon: <Target size={15} />,
      title : "Overview",
    },
    {
      key: "profile",
      icon: <UserRoundPen size={15} />,
      title : "Profile",
    },
    {
      key: "order",
      icon: <ShoppingBag size={15} />,
      title : "Orders",
    },
    {
      key: "transaction",
      icon: <ScanLine size={15} />,
      title : "Transactions",
    },
    {
      key: "help",
      icon: <Headset size={15} />,
      title : "Help Desk",
    },
  ]

  return (
    <>
      <div className="shadow-2xl rounded-xl mt-1 ml-1 bg-(--color-accent-soft)">
        <div
          className={`p-3 text-nowrap font-bold pb-3 border-b flex text-xl justify-start items-center gap-2`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex ${collapsed ? `mx-auto p-1.5` : ""}`}
          >
            <SquareMenu size={15} />
          </button>{" "}
          {collapsed ? "" : "User Dashboard"}
        </div>

        <div className="flex flex-col p-3 h-70 gap-3 font-semibold">

          {
            list.map((item, idx)=> (
              <button key={idx}
            onClick={() => setActive(item.key)}
            className={`flex gap-3 h-12 text-nowrap overflow-hidden items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` : ""} ${active === item.key ? "bg-(--color-surface)" : "transition-all hover:scale-105"}`}
          >
            {item.icon} {collapsed ? "" : item.title}
          </button>

            ))
          }

        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
