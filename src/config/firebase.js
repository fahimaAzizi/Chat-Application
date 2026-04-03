import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC-Li45VMRhmZDkYfumZq-BBQz8OcHTaIY",
  authDomain: "chat-app-630a2.firebaseapp.com",
  projectId: "chat-app-630a2",
  storageBucket: "chat-app-630a2.firebasestorage.app",
  messagingSenderId: "371734881883",
  appId: "1:371734881883:web:81dc3fc5a137c2a8c0c17e",
  measurementId: "G-2SG73FH74M"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using chat app",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    });

  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// ✅ IMPORTANT FIX
export { auth, db, signup, login, logout };