/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import App from "../App";

export const AppContext = createContext();

const AppContextProvider = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  // ✅ Load User Data
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();
      setUserData(data);

      // Navigation
      if (data.avatar && data.name) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }

      // Update last seen
      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });

      // Interval with cleanup
      const interval = setInterval(async () => {
        if (auth.currentUser) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);

      return () => clearInterval(interval);

    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  // ✅ Chat Listener
  useEffect(() => {
    if (!userData) return;

    const chatRef = doc(db, "chats", userData.id);

    const unSub = onSnapshot(chatRef, async (res) => {
      try {
        if (!res.exists()) return;

        const chatItems = res.data()?.chatsData || [];

        const tempData = await Promise.all(
          chatItems.map(async (item) => {
            const userRef = doc(db, "users", item.rId);
            const userSnap = await getDoc(userRef);

            return {
              ...item,
              userData: userSnap.data()
            };
          })
        );

        setChatData(
          tempData.sort((a, b) => b.updatedAt - a.updatedAt)
        );

      } catch (error) {
        console.error("Chat fetch error:", error);
      }
    });

    return () => unSub();
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,
  };

  return (
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
  );
};

export default AppContextProvider;