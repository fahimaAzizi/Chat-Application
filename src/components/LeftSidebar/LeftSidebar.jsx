import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import './LeftSidebar.css'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from '../../context/AppContext';
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const navigate = useNavigate();

  // ✅ get chatData also
  const { userData, chatData } = useContext(AppContext);

  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  // 🔍 Search User
  const inputHandler = async (e) => {
    try {
      const input = e.target.value;

      if (!input) {
        setShowSearch(false);
        setUser(null);
        return;
      }

      const userRef = collection(db, "users");

      const q = query(
        userRef,
        where("username", "==", input.toLowerCase())
      );

      const querySnap = await getDocs(q);

      if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
        let userExist = false;

        chatData?.map((item) => {
          if (item.rId === querySnap.docs[0].data().id) {
            userExist = true;
          }
        });

        if (!userExist) {
          setUser(querySnap.docs[0].data());
          setShowSearch(true); // ✅ FIX
        }

      } else {
        setUser(null);
        setShowSearch(false);
      }

    } catch (error) {
      console.error(error);
    }
  };

  // ➕ Add Chat
  const addChat = async () => {
    if (!user) return;

    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");

    try {
      const newMessageRef = doc(messagesRef);

      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: []
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true
        })
      });

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: false
        })
      });

      toast.success("Chat added");
      setShowSearch(false);
      setUser(null);

    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const setChat = async (item) =>{
    
  }

  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} className='logo' alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className='sub-menu'>
              <p onClick={() => navigate('/profile')}>Edit profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>

        {/* 🔍 Search */}
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input 
            type="text" 
            placeholder='Search here..' 
            onChange={inputHandler}
          />
        </div>
      </div>

      {/* 👥 List */}
      <div className="ls-list">

        {showSearch && user ? (
          <div className='friend add-user' onClick={addChat}>
            <img src={user.avatar} alt="" />
            <p>{user.name}</p>
          </div>
        ) : (
          chatData?.map((item, index) => (
            <div onClick={()=>setChat()} key={index} className="friends">
              <img src={item.userData?.avatar} alt="" />
              <div>
                <p>{item.userData?.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default LeftSidebar;