import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat/Chat'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Chat/>} />
      </Routes>
    </>
  )
}

export default App