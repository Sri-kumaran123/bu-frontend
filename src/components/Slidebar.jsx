import { logoutUser } from "../api/auth.api";
import { DEPARTMENT_NAME, INSTITUTION_NAME, LOGO, MENU_ADMIN, MENU_STUDENT } from "../assets/constants";
import { Link, useNavigate } from "react-router-dom";

export default function Slidebar({user}){
  const navigate = useNavigate();
  console.log(user)
    return (<div className="w-64 bg-[#4169E1] text-white min-h-screen p-4">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={LOGO}
            alt="University Logo" 
            className="w-12 h-12"
          />
          <div className="text-sm">
            <h2 className="font-semibold capitalize">{INSTITUTION_NAME}</h2>
            <p className="opacity-80 capitalize">{DEPARTMENT_NAME}</p>
          </div>
        </div>
  
        <nav className="flex flex-col h-[calc(100vh-8rem)] justify-between">
          <div>
            {user.role == "student"?
            MENU_STUDENT.map((item, index) => (
              <Link 
                to={item.path}
                key={index}
                className={`flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer mb-2 ${
                  location.pathname === item.path ? 'bg-white/10' : ''
                }`}
              >
                <item.icon size={20} />
                <span>{item.text}</span>
                {item.count && (
                  <span className="ml-auto bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {item.count}
                  </span>
                )}
              </Link>
            )):
            MENU_ADMIN.map((item, index) => (
              <Link 
                to={item.path}
                key={index}
                className={`flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer mb-2 ${
                  location.pathname === item.path ? 'bg-white/10' : ''
                }`}
              >
                <item.icon size={20} />
                <span>{item.text}</span>
                {item.count && (
                  <span className="ml-auto bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {item.count}
                  </span>
                )}
              </Link>
            ))
            }
          </div>
          
          <button
            // onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer mt-auto w-full"
            onClick={()=>{
              logoutUser().then(()=>{
                navigate('/login');
              }).catch()
            }}
          >
            {/* <LogOut size={20} /> */}
            <span>Logout</span>
          </button>
        </nav>
      </div>);
}