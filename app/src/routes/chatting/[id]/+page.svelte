<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
	import { format } from 'date-fns';
	import { graphql } from '$houdini';
	import type { PageData } from './$houdini'
	import { goto } from '$app/navigation';
  import { messageStore, userStore } from '$lib/stores';
  import toast, { Toaster } from 'svelte-french-toast'

	import Icon from '@iconify/svelte';
	import ChatFooter from './ChatFooter.svelte';
	import ChatBody from './ChatBody.svelte';
	import ChatToast from './ChatToast.svelte';

  export let data: PageData

  const followMessage = graphql(`
    subscription FollowMessage($channelId: String!) {
      followMessage(channelId: $channelId) {
        channelId
        datetime
        message
        sender
      }
    }
  `)

  data.FindIdMessage.subscribe((v) => {
    if(v.data) messageStore.set(v.data.findIdMessage)
  })
  followMessage.subscribe((result) => {
    if (result.data) {
      toast(ChatToast, {
        className: 'test'
      })
      messageStore.update((prev) => [...prev, result.data?.followMessage!])
    }
  })

  let time = new Date()

  onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

  onDestroy(() => {
    followMessage.unlisten()
  })
  const handleLogout = () => {
    userStore.update(prev => ({...prev, isLogin: false}))
    goto('/chatting')
  }

  $: followMessage.listen({ channelId: data.channelId })
  $: ({ channelId } = data)
</script>

<section class="flex justify-center">
  <Toaster />
  <div class="mockup-phone">
    <div class="camera" />
    <div class="display">
      <div class="artboard artboard-demo phone-2 flex flex-col relative">
        <div class="w-full h-8 px-2 bg-[#B2C6D9] bg-opacity-90 flex flex-row justify-between items-center absolute top-0 z-10 rounded-t-full text-center">
          <div class="w-[calc((100%-150px)/2)] text-sm pl-2">{format(time, "p")}</div>
          <div class="w-[calc((100%-150px)/2)] flex flex-row justify-center items-center pr-2 gap-2">
            <Icon icon="material-symbols:signal-cellular-alt-rounded" width="20" height="20" />
            <Icon icon="material-symbols:wifi-rounded" width="20" height="20" />
            <Icon icon="material-symbols:battery-5-bar-rounded" width="20" height="20" rotate={1} />
          </div>
        </div>
        <div class="w-full h-8 px-2 bg-[#B2C6D9] bg-opacity-90 flex flex-row justify-between items-center absolute top-8 z-10 text-center ">
          <div class="w-16 opacity-50 flex justify-start items-center">
            <button on:click={handleLogout}>
              <Icon icon="material-symbols:arrow-back-ios-new-rounded" width="24" height="24" />
            </button>
          </div>
          <span class="font-semibold text-lg">{data.channelId}</span>
          <div class="w-16 flex flex-row gap-2 opacity-50">
            <Icon icon="material-symbols:search-rounded" width="24" height="24" />
            <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
          </div>
        </div>
        <ChatBody messages={$messageStore || []} userId={$userStore.userId} />
        <ChatFooter channelId={channelId} userId={$userStore.userId} />
      </div>
    </div>
  </div>
</section>