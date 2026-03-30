import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfileUpdate from './pages/ProfileUpdate/profileUpdate'
import Chat from './pages/Chat/Chat'   // ✅ FIXED
import Login from './pages/login/Login'
import { ToastContainer ,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
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