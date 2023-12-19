import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2fzAcUTJ7_p-e1Fvu0OLrTWBMpa4L7x8",
  authDomain: "journeyman-f849b.firebaseapp.com",
  projectId: "journeyman-f849b",
  storageBucket: "journeyman-f849b.appspot.com",
  messagingSenderId: "696314558851",
  appId: "1:696314558851:web:cf61f2a685db98b4b21eb6",
  measurementId: "G-L1WM8HDL00"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)