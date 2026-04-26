import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

const ChatBox = () => {
  const { messagesId, chatUser, messages, setMessages } = useContext(AppContext);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), { messages: arrayUnion({ text: input, createdAt: new Date() }) });
        const userIDs = [chatUser.rId, 'default'];
        for (const id of userIDs) {
          const userChatsRef = doc(db, 'chats', id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messagesId);
            if (chatIndex === -1) continue;
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === 'default') {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, { chatsData: userChatData.chatsData });
          }
        }
        setInput('');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unsub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
        const msgs = res.data()?.messages || [];
        setMessages(msgs.reverse());
      });
      return () => unsub();
    }
  }, [messagesId]);

  return messagesId ? (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={chatUser?.userData?.avatar || assets.profile_img} alt='avatar' />
        <p>{chatUser?.userData?.name}<img className='dot' src={assets.green_dot} alt='online' /></p>
        <img src={assets.help_icon} className='help' alt='help' />
      </div>
      <div className='chat-msg'>
        {messages?.map((msg, index) => (
          <div key={index} className='r-msg'>
            <p className='msg'>{msg.text}</p>
            <span className='msg-time'>{msg.createdAt?.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>
        ))}
      </div>
      <div className='chat-input'>
        <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Send a message' />
        <input type='file' id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'><img src={assets.gallery_icon} alt='gallery' /></label>
        <img src={assets.send_button} alt='send' onClick={sendMessage} />
      </div>
    </div>
  ) : (
    <div className='chat-welcome'>
      <img src={assets.logo_icon} alt='logo' />
      <p>chat anytime, anywhere</p>
    </div>
  );
}
export default ChatBox
