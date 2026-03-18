import React from 'react'
import assets from '../../assets/assets'

function LeftSidebar() {
  return (
    <div className='ls'>
      <div className='ls-nav'>
        <img src={assets.logo} className='logo' alt="" />
        <div>
          <img src={assets.menu_icon} alt="" />
        </div>
      </div>
      <div>
        <img src={assets.search_icon} alt="" />
        <input type='text' placeholder='Search here..'/>
      </div>
    </div>
    
   
  )
}

export default LeftSidebar