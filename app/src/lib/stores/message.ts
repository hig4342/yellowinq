import { writable } from 'svelte/store'

export const messageStore = writable<Array<{
  channelId: string;
  datetime: Date;
  message: string;
  sender: string;
}>>([])