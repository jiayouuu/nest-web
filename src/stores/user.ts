import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const user: User = reactive({
      token: '',
      name: '',
      id: '',
    })
    return { user }
  },
  {
    persist: {
      storage: localStorage,
      // pick: ['user.id'],
    },
  },
)
