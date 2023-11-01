import { collection, getDocs, addDoc, deleteDoc, doc, type DocumentData } from 'firebase/firestore'
import { db } from '@/firebase'
import { getStorage } from 'firebase/storage'
import * as firebase from 'firebase/storage'
import { ref } from 'vue'
import { useUser } from './useUser'
import { createId } from '@/services/methods'

const content = ref()
const contentList = ref([] as DocumentData)
const newContent = ref({
  id: createId(),
  author: '',
  songName: '',
  genre: '',
  image: '',
  song: '',
  play: false
})

export const useContent = () => {
  const loading = ref({
    content: false,
    contentList: false,
    newContent: false
  })

  async function getAllContent() {
    loading.value.contentList = true
    try {
      const querySnapshot = await getDocs(collection(db, 'contents'))
      querySnapshot.forEach((doc) => {
        contentList.value.push(doc.data())
      })
      loading.value.contentList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadImage(file: any) {
    loading.value.newContent = true
    const storage = getStorage()
    const storageRef = firebase.ref(storage, `images/${file.name}`)
    await firebase.uploadBytes(storageRef, file).then(() => {
      console.log('Image uploaded successfully')

      firebase
        .getDownloadURL(storageRef)
        .then((url) => {
          console.log('URL uploaded successfully')
          newContent.value.image = url
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    })
    loading.value.newContent = false
  }

  async function uploadSong(file: any) {
    loading.value.newContent = true
    const storage = getStorage()
    const storageRef = firebase.ref(storage, `songs/${file.name}`)
    await firebase.uploadBytes(storageRef, file).then(() => {
      console.log('Song uploaded successfully')

      firebase
        .getDownloadURL(storageRef)
        .then((url) => {
          console.log('URL uploaded successfully')
          newContent.value.song = url
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
    })
    loading.value.newContent = false
  }

  async function onUpload(e: any) {
    const file = e.target.files[0]
    if (e.target.accept == '.jpg, .png') {
      await uploadImage(file)
    } else {
      await uploadSong(file)
    }
  }

  async function addContent() {
    const { user } = useUser()
    loading.value.newContent = true
    try {
      if (newContent.value && user.value) {
        const { user } = useUser()
        newContent.value.author = user.value
        await addDoc(collection(db, 'contents'), newContent.value)
        loading.value.newContent = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getContentById(id: string) {
    loading.value.content = true
    try {
      const querySnapshot = await getDocs(collection(db, 'contents'))
      content.value = querySnapshot.docs
        .map((doc) => doc.data())
        .find((item: any) => item.id === id)
      loading.value.content = false
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteContent(id: string) {
    try {
      if (content.value) {
        await deleteDoc(doc(db, 'contents', id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    content,
    contentList,
    newContent,
    loading,
    getAllContent,
    deleteContent,
    addContent,
    getContentById,
    onUpload,
    uploadSong
  }
}
