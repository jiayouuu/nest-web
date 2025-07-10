import { defineStore } from "pinia"
import { reactive } from "vue"
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user: User = reactive({
    name: '',
    id: ''
  })

  const setUser = (newUser: User) => {
    Object.assign(user, newUser)
  }
  const getUser = () => {
    return user
  }
  return { setUser, getUser }
})
