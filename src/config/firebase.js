import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-Li45VMRhmZDkYfumZq-BBQz8OcHTaIY',
  authDomain: 'chat-app-630a2.firebaseapp.com',
  projectId: 'chat-app-630a2',
  storageBucket: 'chat-app-630a2.firebasestorage.app',
  messagingSenderId: '371734881883',
  appId: '1:371734881883:web:81dc3fc5a137c2a8c0c17e',
  measurementId: 'G-2SG73FH74M'
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
