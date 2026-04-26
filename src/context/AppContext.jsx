/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import App from '../App';

export const AppContext = createContext();

const AppContextProvider = () => {
  const [chatData, setChatData] = useState([]);
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    const chatRef = doc(db, 'chats', 'default');
    const unSub = onSnapshot(chatRef, async (res) => {
      if (!res.exists()) {
        setChatData([]);
        return;
      }
      const chatItems = res.data().chatsData || [];
      const tempData = [];
      for (const item of chatItems) {
        const userRef = doc(db, 'users', item.rId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        tempData.push({ ...item, userData });
      }
      setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
    });
    return () => { unSub(); };
  }, []);

  const value = { chatData, setChatData, messages, setMessages, messagesId, setMessagesId, chatUser, setChatUser };
  return (
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
  );
};
export default AppContextProvider;
