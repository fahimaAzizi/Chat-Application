# 💬 Chat App (Real-Time Messaging Application)

A modern **real-time chat application** built using **React.js** and **Firebase**, designed to provide seamless communication similar to WhatsApp. Users can search for others, start conversations, and exchange messages instantly.

---

## 🚀 Features

* 🔍 **User Search** – Find users by username
* 💬 **Real-Time Messaging** – Instant message updates using Firebase
* 👥 **One-to-One Chat** – Private conversations between users
* 🟢 **Live Data Sync** – Automatic updates with Firestore listeners
* 📂 **Chat Management** – Create and manage chat sessions
* ⚡ **Fast & Responsive UI** – Smooth user experience

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend / Database:** Firebase Firestore
* **Authentication:** Firebase Auth *(if implemented)*
* **State Management:** React Context API
* **Styling:** CSS

---

## 📁 Project Structure

```
chat-app/
│── src/
│   ├── components/
│   │   ├── LeftSidebar/
│   │   ├── ChatBox/
│   │   ├── RightSidebar/
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── config/
│   │   └── firebase.js
│   │
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Setup Firebase

* Go to Firebase
* Create a new project
* Enable **Firestore Database**
* (Optional) Enable **Authentication**
* Copy your Firebase config

### 4️⃣ Configure Firebase

Update your `firebase.js` file:

```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);

export default app;
```

---

## ▶️ Run the App

```
npm run dev
```

App will run on:

```
http://localhost:5173/
```

---

## 🧠 How It Works

* Each chat creates a **unique message document**
* Messages are stored in a `messages` collection
* Chat metadata is stored in a `chats` collection
* Real-time updates are handled using Firestore’s `onSnapshot`

---

## 📌 Key Functionalities

### 🔍 Search Users

* Users can search by username
* Prevents duplicate chats

### ➕ Create Chat

* Generates a unique message ID
* Adds chat entry for both users

### 💬 Messaging System

* Stores messages in arrays
* Tracks sender and timestamp
* Updates UI instantly

---


## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repository and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Your Name**

* Passionate about Web Development & AI

---

## ⭐ Support

If you like this project, please ⭐ the repository and share it!

---
