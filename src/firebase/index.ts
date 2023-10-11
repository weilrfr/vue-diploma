// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBd351y0inonTAvUFzzAMrr5bs0ubmyyyI',
  authDomain: 'vue-diploma-bd090.firebaseapp.com',
  projectId: 'vue-diploma-bd090',
  storageBucket: 'vue-diploma-bd090.appspot.com',
  messagingSenderId: '659813575007',
  appId: '1:659813575007:web:ee4c9e6eeeb40a4404aeea'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
const authentification = getAuth(app)

export { db, storage, authentification }
