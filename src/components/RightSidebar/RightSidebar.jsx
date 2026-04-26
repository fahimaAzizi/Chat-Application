import React from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className='rs-profile'>
        <img src={assets.profile_img} alt='avatar' />
        <h3>Richard Sanford <img src={assets.green_dot} className='dot' alt='online' /></h3>
        <p>Hey, There i am Richard Sanford using chat app</p>
      </div>
      <hr />
      <div className='rs-media'>
        <p>Media</p>
        <div className='rs-img'>
          <img src={assets.pic1} alt='media1' />
          <img src={assets.pic2} alt='media2' />
          <img src={assets.pic3} alt='media3' />
          <img src={assets.pic4} alt='media4' />
          <img src={assets.pic1} alt='media5' />
          <img src={assets.pic3} alt='media6' />
        </div>
      </div>
    </div>
  )
}
export default RightSidebar
