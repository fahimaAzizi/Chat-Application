import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import { AppContext } from '../../context/AppContext'

function Chat() {
  const {chatData} = useContext(AppContext)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    if (chatData) {
      setLoading(false)
    }
  },[chatData])
  return (
    <div className='chat'>
      {
        loading
        ?<p className='loading'>Loading...</p>
        :
        <div className='chat-container'>
        <LeftSidebar />
        <ChatBox />
        <RightSidebar />
        </div>
      }
    </div>
  )
  
}

export default Chat
