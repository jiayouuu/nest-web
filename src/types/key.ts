import type { InjectionKey } from 'vue'
import type { User } from '@/types/user'

export const userKey = Symbol() as InjectionKey<User>
