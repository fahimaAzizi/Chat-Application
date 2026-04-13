import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import './LeftSidebar.css'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from '../../context/AppContext';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [user, setUser] = useState(null)
  const [showSearch, setShowSearch] = useState(false);



  const inputHandler = async (e) => {
    try {
      const input = e.target.value;

      const userRef = collection(db, "users");

      const q = query(
        userRef,
        where("username", "==", input.toLowerCase())
      );

      const querySnap = await getDocs(q);

      if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
      setUser(querySnap.docs[0].data());
      }



    } catch (error) {
      console.error("Error searching user:", error);
    }
  }

  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} className='logo' alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className='sub-menu'>
              <p>Edit profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>


        {/* Search */}
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder='Search here..' />
        </div>
      </div>
      {/* Friends List */}
      <div className="ls-list">
        {Array(12).fill("").map((item, index) => (
          <div key={index} className="friends">
            <img src={assets.profile_img} alt="" />
            <div>
              <p>Richard Sanford</p>
              <span>Hello , how are you?</span>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default LeftSidebar