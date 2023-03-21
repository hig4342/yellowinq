import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { load_FindIdMessage } from "$houdini";
import { userStore } from '$lib/stores';

export const load = async (event) => {
  const { isLogin } = get(userStore)
  if (!isLogin) throw error(403, 'Forbidden')
  
  const variables = {
    id: event.params.id
  };
  return {
    ...await load_FindIdMessage({ event, variables }),
    channelId: event.params.id
  }
}