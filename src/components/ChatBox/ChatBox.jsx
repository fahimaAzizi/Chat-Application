import React, { useContext, useEffect, useState, useRef } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../config/firebase'
import { toast } from 'react-toastify'

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } = useContext(AppContext);
   
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        const text = input;
        setInput("");
        
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: text,
            createdAt: new Date(),
            type: "text"
          })
        });
        updateChatUser(text);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateChatUser = async (text) => {
    try {
      const userIDs = [chatUser.rId, userData.id];
      
      for (const id of userIDs) {
        const userChatsRef = doc(db, 'chats', id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();

          const chatIndex = userChatData.chatsData.findIndex(
            (c) => c.messageId === messagesId
          );

          if (chatIndex !== -1) {
            userChatData.chatsData[chatIndex].lastMessage = text.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();

            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !messagesId) return;

    try {
      setLoading(true);
      
      const imageRef = ref(storage, `images/${messagesId}/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      
      const imageUrl = await getDownloadURL(imageRef);
      
      await updateDoc(doc(db, 'messages', messagesId), {
        messages: arrayUnion({
          sId: userData.id,
          text: imageUrl,
          createdAt: new Date(),
          type: "image"
        })
      });
      
      updateChatUser("📷 Image");
      toast.success("Image sent!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      e.target.value = '';
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return messagesId ? (
    <div className='chat-box'>

      {/* Header */}
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>
          {chatUser.userData.name}
        </p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

      {/* Messages */}
      <div className="chat-msg">
        {messages?.map((msg, index) => (
          <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
            {msg.type === "image" ? (
              <img src={msg.text} alt="image" className="msg-image" />
            ) : (
              <p className="msg">{msg.text}</p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <input 
          onChange={(e) => setInput(e.target.value)} 
          value={input} 
          type="text" 
          placeholder='Send a message'
          onKeyPress={handleKeyPress}
        />
        <input type="file" id='image' accept='image/png, image/jpeg, image/gif' hidden onChange={sendImage} disabled={loading} />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="" />
      </div>

    </div>
  ) : 
    <div className='chat-welcome'>
      <img src={assets.logo_icon} alt="" />
      <p>chat anytime, anywhere</p>
    </div>
   
}

export default ChatBox;