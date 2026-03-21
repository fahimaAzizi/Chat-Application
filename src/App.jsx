import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat/Chat'
import Login from './pages/login/Login'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </>
  )
}

export default App