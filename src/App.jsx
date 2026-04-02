import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProfileUpdate from './pages/ProfileUpdate/profileUpdate'
import Chat from './pages/Chat/Chat'   // ✅ FIXED
import Login from './pages/login/Login'
import { ToastContainer ,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './config/firebase'
import AppContext from './context/AppContext'

const App = () => {
  const navigate = useNavigate(AppContext);

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=> {
      if (user) {
   navigate('/chat')
  
      } else{
        navigate('/')
      }
    })
  },[])
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>} />
        <Route path='/profile' element={<ProfileUpdate/>} />
      </Routes>
    </>
  )
}

export default App