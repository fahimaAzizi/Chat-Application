import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import './LeftSidebar.css'
import { 
  collection, query, where, getDocs, 
  doc, setDoc, updateDoc, serverTimestamp, arrayUnion, getDoc 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const LeftSidebar = () => {

  const { chatData, setMessagesId, setChatUser } = useContext(AppContext);

  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (!input) {
        setShowSearch(false);
        setUser(null);
        return;
      }
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', input.toLowerCase()));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        const foundUser = querySnap.docs[0].data();
        const userExist = chatData?.some((item) => item.rId === foundUser.id);
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

  const addChat = async () => {
    if (!user) return;
    const messagesRef = collection(db, 'messages');
    const chatsRef = collection(db, 'chats');
    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, { createAt: serverTimestamp(), messages: [] });
      const chatObjUser = {
        messageId: newMessageRef.id,
        lastMessage: '',
        rId: user.id,
        updatedAt: Date.now(),
        messageSeen: true
      };
      const chatObjOther = {
        messageId: newMessageRef.id,
        lastMessage: '',
        rId: 'default',
        updatedAt: Date.now(),
        messageSeen: false
      };
      await updateDoc(doc(chatsRef, 'default'), { chatsData: arrayUnion(chatObjUser) });
      await updateDoc(doc(chatsRef, user.id), { chatsData: arrayUnion(chatObjOther) });
      setMessagesId(newMessageRef.id);
      setChatUser({ ...chatObjUser, userData: user });
      toast.success('Chat added');
      setShowSearch(false);
      setUser(null);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const setChat = async (item) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item);
      const userChatsRef = doc(db, 'chats', 'default');
      const snap = await getDoc(userChatsRef);
      if (!snap.exists()) return;
      const data = snap.data();
      const index = data.chatsData.findIndex((c) => c.messageId === item.messageId);
      if (index === -1) return;
      data.chatsData[index].messageSeen = true;
      await updateDoc(userChatsRef, { chatsData: data.chatsData });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} className='logo' alt='logo' />
          <div className='menu'>
            <img src={assets.menu_icon} alt='menu' />
            <div className=' sub-menu'>
              <p>Chat App</p>
              <hr />
              <p>Settings</p>
            </div>
          </div>
        </div>
        <div className='ls-search'>
          <img src={assets.search_icon} alt='search' />
          <input type='text' placeholder='Search here..' onChange={inputHandler} />
        </div>
      </div>
      <div className='ls-list'>
        {showSearch && user ? (
          <div className='friend add-user' onClick={addChat}>
            <img src={user.avatar} alt='avatar' />
            <p>{user.name}</p>
          </div>
        ) : (
          <>
            {chatData?.filter((item, index, self) => index === self.findIndex((t) => t.rId === item.rId)).sort((a, b) => b.updatedAt - a.updatedAt).map((item) => (
                <div onClick={() => setChat(item)} key={item.messageId} className='friends'>
                  <img src={item.userData?.avatar || assets.profile_img} alt='avatar' />
                  <div>
                    <p>{item.userData?.name}</p>
                    <span>{item.lastMessage}</span>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}
export default LeftSidebar
