import React, { useContext } from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const RightSidebar = () => {
  const { chatUser, messages, messagesId } = useContext(AppContext);

  // Filter only image messages
  const imageMessages = messages?.filter(msg => msg.type === 'image') || [];

  return (
    <div className='rs'>
      {/* Profile Section */}
      <div className="rs-profile">
        <img src={chatUser?.userData?.avatar || assets.profile_img} alt="" />
        <h3>
          {chatUser?.userData?.name || 'Select a friend'}
          {chatUser?.userData?.name && <img src={assets.green_dot} className='dot' alt="" />}
        </h3>
        <p>{chatUser?.userData?.bio || 'Hey, There i am using chat app'}</p>
      </div>

      <hr />

      {/* Media Section */}
      <div className="rs-media">
        <p>Media ({imageMessages.length})</p>
        <div className='rs-img'>
          {imageMessages.length > 0 ? (
            imageMessages.map((msg, index) => (
              <img key={index} src={msg.text} alt="shared image" />
            ))
          ) : (
            <p className='no-media'>No images shared yet</p>
          )}
        </div>
      </div>
     <button onClick={()=>logout()} className=''>
      Logout
     </button>
    </div>
  )
}

export default RightSidebar