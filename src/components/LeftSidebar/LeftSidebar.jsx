import React from 'react'
import assets from '../../assets/assets'
import './LeftSidebar.css'

const LeftSidebar = () => {
  return (
    <div className='ls'>

      {/* Top Navbar */}
      <div className='ls-nav'>
        <img src={assets.logo} className='logo' alt="" />
        <div className="menu">
          <img src={assets.menu_icon} alt="" />
        </div>
      </div>

      {/* Search */}
      <div className="ls-search">
        <img src={assets.search_icon} alt="" />
        <input type="text" placeholder='Search here..' />
      </div>

      {/* Friends List */}
      <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
           
          </div>
        </div>
      </div>
       <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
            
           
          </div>
        </div>
      </div>
       <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
           
          </div>
        </div>
      </div>
       <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
           
          </div>
        </div>
      </div>
       <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
           
          </div>
        </div>
      </div>
       <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
           
          </div>
        </div>
      </div>
       <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
           
          </div>
        </div>
      </div>

    </div>
  )
}

export default LeftSidebar