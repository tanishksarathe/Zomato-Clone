import { HandHelping, Headset, Menu, ScanLine, ShoppingBag, Target, UserRoundPen } from 'lucide-react'
import React from 'react'

const SidebarDashboard = ({active, setActive, collapsed, setCollapsed}) => {
  return (
    <>
     <div>
        
        <div className={`p-3 font-bold pb-3 border-b flex text-xl justify-start items-center gap-2`}><button onClick={() => setCollapsed(!collapsed)} className={`flex ${collapsed ? `mx-auto p-1.5` :""}`}><Menu size={15}/></button> {collapsed ? "" : "User Dashboard"}</div>
    
        <div className='flex flex-col p-3 gap-3 font-semibold'>

            <button onClick={() => setActive("overview")} className={`flex gap-3 items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` :""} ${(active === "overview") ? 'bg-(--color-surface)':'transition-all hover:scale-105'}`}><Target size={15}/> {collapsed ? "" : "Overview"}</button>

            <button onClick={() => setActive("profile")} className={`flex gap-3 items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` :""} ${(active === "profile") ? 'bg-(--color-surface)':'transition-all hover:scale-105'}`}><UserRoundPen size={15}/> {collapsed ? "" : "Profile"}</button>

            <button onClick={() => setActive("order")} className={`flex gap-3 items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` :""} ${(active === "order") ? 'bg-(--color-surface)':'transition-all hover:scale-105'}`}><ShoppingBag size={15}/>{collapsed ? "" : "Orders"}</button>

            <button onClick={() => setActive("transaction")} className={`flex gap-3 items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` :""} ${(active === "transaction") ? 'bg-(--color-surface)':'transition-all hover:scale-105'}`}><ScanLine size={15}/>{collapsed ? "" : "Transactions"}</button>

            <button onClick={() => setActive("help")} className={`flex gap-3 items-center hover:text-(--color-text-primary) p-2 rounded-xl ${collapsed ? `mx-auto` :""} ${(active === "help") ? 'bg-(--color-surface)':'transition-all hover:scale-105'}`}><Headset size={15} />{collapsed ? "" : "Help Desk"}</button>

        </div>

        </div> 
    </>
  )
}

export default SidebarDashboard
