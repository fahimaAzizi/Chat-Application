import React from 'react'
import './Lefght'
import './chat.css'

import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
function chat() {
  return (
    <div>
      <div>
        <RightSidebar/>
        <LeftSidebar/>
        <ChatBox/>
      </div>
    </div>
  )
}

export default chat