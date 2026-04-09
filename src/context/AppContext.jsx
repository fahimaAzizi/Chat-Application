/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import {  auth,db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import App from "../App";

export const AppContext = createContext();

const AppContextProvider = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data()
      setUserData(userData);

      if (userData.avatar && userData.name) {
        navigate('/chat')
      }else{
        navigate('/profile')
      }
      await updateDoc(userRef,{
        lastSeen:Date.now()
      })
      setInterval(async () =>{
        if (auth.chatUser) {
            await updateDoc(userRef,{
                lastSeen:Date.now()
            })
        }
      },60000)

    } catch (error) {
      console.log(error);
    }
  };
  

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData
  };

  return (
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
  );
};

export default AppContextProvider;