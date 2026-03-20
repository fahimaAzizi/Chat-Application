import React from 'react'
import './Chat.css'

import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'

function Chat() {
  return (
    <div className='chat'>
      <div className='chat-container'>
        
        <LeftSidebar />
        <ChatBox />
        <RightSidebar />

      </div>
    </div>
  )
}

export default Chat