
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Circularpage from './pages/Circularpage'
import DataUpload from './pages/DataUploads'
import Events from './pages/Events'
import SemesterDetails from './pages/SemasterDetail'
import Login from './pages/Loginpage'
import { useEffect, useState } from 'react'
import { getAccessToken, getloginUser } from './api/auth.api'
import Admindashboard from './pages/Admindashboard'
import Subjectadmin from './pages/Subjectadmin'
import Circularadmin from './pages/Circularadmin'
import Seeuploads from './pages/Seeuploadds'
import Eventadmin from './Eventadmin'
import Semesterupdata from './pages/Semesterupdate'
import { Toaster } from 'react-hot-toast'

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(()=>{
    getAccessToken()
    .then(()=>{
      console.log("access token can get")
      getloginUser()
      .then(res=>{
        setUser(_=>res.data)
        console.log(res)
      }).catch(err=>{

      })
    })
    .catch(err=>{
      navigate('/login')
    })
  },[navigate])
  console.log("user", user);
  return (
    <>
    <Toaster />
        {/* <h1 className='text-primary'>Hello , World</h1> */}
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path="/" element={<Layout user={user}/>}>
          
          
          {
            user.role == "admin"?
            <>
             <Route index element={<Admindashboard />} />
             <Route path='/subject' element={<Subjectadmin />} />
             <Route path='/addcircular' element={<Circularadmin />} />
             <Route path='/seeuploads' element={<Seeuploads />} />
             <Route path='/addevents' element={<Eventadmin />} />
             <Route path='/update-semester' element={<Semesterupdata />} />
            </>
            :
            <>
              <Route index element={<Dashboard user={user}/>} />
              <Route path='/circular' element={<Circularpage />} />
              <Route path='/uploads' element={<DataUpload userId={user._id} />} />
              <Route path='/events' element={<Events UserId={user._id}/>} />
              <Route path='/semester' element={<SemesterDetails user={user}/>} />

            </>
          }
          
          {/* test */}
          
          
        </Route>
      </Routes>
    </>
  )
}

export default App
