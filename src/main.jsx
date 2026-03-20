import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import ChatBox from './components/ChatBox/ChatBox.jsx'
import Chat from './pages/chat/chat.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Login/>
    <Chat/>
   
    

  </StrictMode>
)
