import React from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'

const RightSidebar = () => {

  const {chatUser, messages}
  return (
    <div className='rs'>

      {/* Profile Section */}
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>
          Richard Sanford 
          <img src={assets.green_dot} className='dot' alt="" />
        </h3>
        <p>Hey, There i am Richard Sanford using chat app</p>
      </div>

      <hr />

      {/* Media Section */}
      <div className="rs-media">
        <p>Media</p>
        <div className='rs-img'>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic3} alt="" />
        </div>
      </div>
     <button onClick={()=>logout()} className=''>
      Logout
     </button>
    </div>
  )
}

export default RightSidebar