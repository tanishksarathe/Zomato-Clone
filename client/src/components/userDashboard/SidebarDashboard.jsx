import { HandHelping, Headset, ScanLine, ShoppingBag, Target, UserRoundPen } from 'lucide-react'
import React from 'react'

const SidebarDashboard = ({active, setActive}) => {
  return (
    <>
     <div className='p-3'>
        
        <div className='font-bold text-xl'>User Dashboard</div>
        <hr />

        <div className='flex flex-col p-3 gap-3 font-semibold'>
            <button onClick={() => setActive("overview")} className='flex gap-3 items-center'><Target size={15}/>Overview</button>
            <button onClick={() => setActive("profile")} className='flex gap-3 items-center'><UserRoundPen size={15}/> Profile</button>
            <button onClick={() => setActive("order")} className='flex gap-3 items-center'><ShoppingBag size={15}/>Orders</button>
            <button onClick={() => setActive("transaction")} className='flex gap-3 items-center'><ScanLine size={15}/>Transactions</button>
            <button onClick={() => setActive("help")} className='flex gap-3 items-center'><Headset size={15} />Help Desk</button>
        </div>

        </div> 
    </>
  )
}

export default SidebarDashboard
