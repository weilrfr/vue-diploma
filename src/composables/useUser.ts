import {
  collection,
  getDocs,
  addDoc,
  type DocumentData,
  getDoc,
  doc,
  setDoc
} from 'firebase/firestore'
import { db } from '@/firebase'
import { ref, computed, watch } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const user = ref()
const userList = ref([] as DocumentData)

const loading = ref({
  user: false,
  userList: false
})

const userToObject = computed(() => {
  if (user.value) {
    return {
      uid: user.value.uid,
      email: user.value.email,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      favourites: user.value.favourites ?? [],
      status: user.value.status ?? 'user',
      reviews: user.value.reviews ?? []
    }
  }
  return null
})

export const useUser = () => {
  const auth = getAuth()

  // войти с помощью окна гугл
  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user

        // проверка первый ли раз он зашел
        await addUserToMainDatabase()

        // достаем данные если не первый раз
        await getFromMainDatabase()

        // добавляем в локал сторадж
        addToLocalStorage()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true
    try {
      if (userToObject.value) {
        await getAllUsers()
        if (!checkUserInDatabase()) {
          await addDoc(collection(db, 'users'), userToObject.value)
        } else {
          console.error('User already in database')
        }
      }
      loading.value.user = false
    } catch (error) {
      console.error(error)
    }
  }

  // получить всех юзеров
  async function getAllUsers() {
    loading.value.userList = true
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        userList.value.push(doc.data())
      })
      loading.value.userList = false
    } catch (error) {
      console.error(error)
    }
  }

  // проверка есть ли юзер в базе данных
  function checkUserInDatabase() {
    return userList.value.some((item: any) => item.uid === userToObject.value?.uid)
  }

  // получить данные из базы данных
  async function getFromMainDatabase() {
    await getAllUsers()
    user.value = userList.value.find((item: any) => item.uid === user.value?.uid)
  }

  // обновить данные в базе данных
  async function updateUserInDatabase() {
    if (user.value) {
      try {
        const userDocRef = doc(db, 'users', user.value.uid)
        const existingUserDoc = await getDoc(userDocRef)
        if (existingUserDoc.exists()) {
          const userData = existingUserDoc.data()
          const updatedData = {
            ...userData,
            ...user.value
          }
          await setDoc(userDocRef, updatedData)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  function addToLocalStorage() {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  function getUserFromLocalStorage() {
    const userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      user.value = JSON.parse(userFromLocalStorage)
    }
  }

  function removeFromLocalStorage() {
    localStorage.removeItem('user')
  }

  // выйти из гугла
  function googleLogout() {
    auth.signOut()
    user.value = null

    // удаляем из локал сторадж
    removeFromLocalStorage()
  }

  // это надо не всем
  // для постоянной связи сервиса с базой данных
  watch(user.value, async (newValue) => {
    if (newValue) {
      await updateUserInDatabase()
    }
  })
  

  return {
    user,
    loading,
    googleRegister,
    googleLogout,
    getAllUsers,
    userToObject,
    userList,
    addToLocalStorage,
    getUserFromLocalStorage,
    removeFromLocalStorage
  }
}
