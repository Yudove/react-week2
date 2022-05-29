//firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVyRzq-r_88UJhj58qTdLd2akm6OAEJnc",
  authDomain: "dictionary-1e2c9.firebaseapp.com",
  projectId: "dictionary-1e2c9",
  storageBucket: "dictionary-1e2c9.appspot.com",
  messagingSenderId: "283599242561",
  appId: "1:283599242561:web:c613655bbe166083644dc0",
  measurementId: "G-BNL00RG480"
};

// firebaseConfig 정보로 firebase 시작
initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
export const db = getFirestore();

