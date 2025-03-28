import { INSTITUTION_NAME } from "../assets/constants";

export default function Navbar({user}){
    const name = "example student";
    const class_name ="II MCA";
    return <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold capitalize">{INSTITUTION_NAME}</h1>
    <div className="flex items-center gap-4">
      <span>{user.username}</span>
      <span className="text-gray-600">{class_name}</span>
      {
        user.profile?
        <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=faces"
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />:
      <img
        src="/Profile.png"
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      }
      
    </div>
  </div>
}