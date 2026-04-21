import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import './LeftSidebar.css'
import { useNavigate } from 'react-router-dom';
import { 
  collection, query, where, getDocs, 
  doc, setDoc, updateDoc, serverTimestamp, arrayUnion, getDoc 
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from '../../context/AppContext';
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const navigate = useNavigate();

  // ✅ FIXED
  const { userData, chatData, setMessagesId, setChatUser } = useContext(AppContext);

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

        const foundUser = querySnap.docs[0].data();

        const userExist = chatData?.some(
          (item) => item.rId === foundUser.id
        );

        if (!userExist) {
          setUser(foundUser);
          setShowSearch(true);
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

      const chatObjUser = {
        messageId: newMessageRef.id,
        lastMessage: "",
        rId: user.id,
        updatedAt: Date.now(),
        messageSeen: true
      };

      const chatObjOther = {
        messageId: newMessageRef.id,
        lastMessage: "",
        rId: userData.id,
        updatedAt: Date.now(),
        messageSeen: false
      };

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion(chatObjUser)
      });

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion(chatObjOther)
      });

      // ✅ IMPORTANT FIX
      setMessagesId(newMessageRef.id);
      setChatUser({
        ...chatObjUser,
        userData: user
      });

      toast.success("Chat added");

      setShowSearch(false);
      setUser(null);

    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // 💬 Open Chat
  const setChat = async (item) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item);

      const userChatsRef = doc(db, 'chats', userData.id);
      const snap = await getDoc(userChatsRef);

      if (!snap.exists()) return;

      const data = snap.data();

      const index = data.chatsData.findIndex(
        (c) => c.messageId === item.messageId
      );

      if (index === -1) return;

      data.chatsData[index].messageSeen = true;

      await updateDoc(userChatsRef, {
        chatsData: data.chatsData
      });

    } catch (error) {
      toast.error(error.message);
    }
  };

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
            <div 
              onClick={() => setChat(item)} 
              key={item.messageId || index} 
              className="friends"
            >
              <img src={item.userData?.avatar || assets.profile_img} alt="" />
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