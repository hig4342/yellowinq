import { writable } from 'svelte/store'

export const userStore = writable<{
  isLogin: boolean
  userId: string
}>({
  isLogin: false,
  userId: ""
})