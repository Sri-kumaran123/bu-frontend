import { Outlet } from "react-router-dom";
import Slidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";

export default function Layout({user}){

    return <div className="flex h-screen">
    {/* Sidebar with fixed width */}
    
      <Slidebar user={user}/>
    
  
    {/* Main Content Area */}
    <div className="flex-1 h-full overflow-y-auto p-8">
        <Navbar user={user}/>
      <Outlet />
    </div>
  </div>
}