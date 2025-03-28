import { BookOpen,  Upload, Calendar, LogOut, LayoutDashboard, Bell, BookOpenCheck} from 'lucide-react';


export const INSTITUTION_NAME = "bharathiar university";

export const DEPARTMENT_NAME = "department of computer applications";

export const LOGO = "https://b-u.ac.in/sites/b-u.ac.in/files/About%20University/bu-logo_0.png";

export const MENU_STUDENT = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/', count: null },
    { icon: Bell, text: 'Circular and Notification', path: '/circular', count: 5 },
    { icon: Upload, text: 'Data Uploads', path: '/uploads', count: null },
    { icon: Calendar, text: 'Events', path: '/events', count: null },
    { icon: BookOpen, text: 'Semester Details', path: '/semester', count: null },
  ];

export const MENU_ADMIN = [
  {icon: LayoutDashboard, text:'Dashboard', path:'/'},
  {icon: BookOpen, text:"Subjects", path:'/subject'},
  {icon:Bell, text:"Circular and Notification", path:'/addcircular'},
  {icon:Upload, text:"Data Uploads", path:'/seeuploads'},
  {icon:Calendar, text:"Events", path:"/addevents"},
  {icon:BookOpenCheck, text:"Semester Details", path:"/update-semester"}
]
export const ACCESS_TOKEN = "access_token";