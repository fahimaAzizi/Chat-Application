import { createContext, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const AppContext = createContext();

const AppContext = (props) => {

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userDats = userSnap.data()

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
                lastSeen:Date.now
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
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;