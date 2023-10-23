import { collection, getDocs, addDoc, deleteDoc, doc, type DocumentData } from 'firebase/firestore'
import { db } from '@/firebase'
import { ref } from 'vue'
import { useUser } from './useUser';

export const useContent = () => {

  const content = ref()
  const contentList = ref([] as DocumentData)
  const newContent = ref({
    author: '',
    songName: '',
    genre: '',
    image: ''
  })

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

  async function addContent() {
    const { userRemake } = useUser();
    loading.value.newContent = true
    try {
      if (newContent.value && userRemake.value) {
        const {user} = useUser()
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
    loading,
    getAllContent,
    deleteContent,
    addContent,
    getContentById,
  }
}