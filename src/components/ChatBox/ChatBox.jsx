import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } = useContext(AppContext);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()
          })
        });
        const userIDs = [chatUser.rId, userData.id];

userIDs.forEach(async (id) => {
  const userChatsRef = doc(db, 'chats', id);
  const userChatsSnapshot = await getDoc(userChatsRef);

  if (userChatsSnapshot.exists()) {
    const userChatData = userChatsSnapshot.data();

    const chatIndex = userChatData.chatsData.findIndex(
      (c) => c.messageId === messagesId
    );

    userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
    userChatData.chatsData[chatIndex].updatedAt = Date.now();

    if (userChatData.chatsData[chatIndex].rId === userData.id) {
      userChatData.chatsData[chatIndex].messageSeen = false;
    }

    await updateDoc(userChatsRef, {
      chatsData: userChatData.chatsData
    });
  }
});
      }
    } catch (error) {
      console.error(error);
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

      {/* Header */}
      <div className="chat-user">
        <img src={chatUser?.userData?.avatar || assets.profile_img} alt="" />
        <p>
          {chatUser?.userData?.name}
          <img className='dot' src={assets.green_dot} alt="" />
        </p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

      {/* Messages */}
      <div className="chat-msg">
        {messages?.map((msg, index) => (
          <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
            <p className="msg">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input 
          onChange={(e) => setInput(e.target.value)} 
          value={input} 
          type="text" 
          placeholder='Send a message' 
        />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" onClick={sendMessage} />
      </div>

    </div>
  ) : (
    <div className='chat-welcome'>
      <img src={assets.logo_icon} alt="" />
      <p>chat anytime, anywhere</p>
    </div>
  );
}

export default ChatBox;