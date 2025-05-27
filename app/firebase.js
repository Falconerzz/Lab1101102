import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVBPptuflwfTtgbyay4rGm_r4SiHJIGv0",
  authDomain: "lab8-353b0.firebaseapp.com",
  projectId: "lab8-353b0",
  storageBucket: "lab8-353b0.firebasestorage.app",
  messagingSenderId: "336068489719",
  appId: "1:336068489719:web:c9ccbe59789e9d7a8ebef2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
