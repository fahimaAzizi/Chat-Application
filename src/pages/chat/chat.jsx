import React from 'react'
import './Lefght'
import './chat.css'

import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
function Chat() {
  return (
    <div className='chat'>
      <div className='chat-container'>
        <RightSidebar/>
        <LeftSidebar/>
        <ChatBox/>
      </div>
    </div>
  )
}

export default Chat