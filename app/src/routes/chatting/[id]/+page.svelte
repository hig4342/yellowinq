<script lang="ts">
  import { writable } from 'svelte/store'
	import { graphql } from '$houdini';
	import type { PageData } from './$houdini'
	import ChatBubble from './ChatBubble.svelte';
	import ChatFooter from './ChatFooter.svelte';
  export let data: PageData

  const messages = writable<Array<{
    channelId: string;
    datetime: Date;
    message: string;
    sender: string;
  }>>([])

  data.FindIdMessage.subscribe((v) => messages.set(v.data?.findIdMessage!))

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

  $: followMessage.listen({ channelId: data.channelId })
  followMessage.subscribe((result) => {
    if (result.data)
      messages.update((prev) => [...prev, result.data?.followMessage!])
  })

  $: ({ channelId } = data)
</script>

<section class="flex justify-center">
  <div class="mockup-phone">
    <div class="camera" />
    <div class="display">
      <div class="artboard artboard-demo phone-2 flex flex-col overflow-x-hidden">
        <div class="w-full h-8 px-2 bg-[#B2C6D9] flex flex-row justify-between items-center">
          <div class="w-[calc((100%-150px)/2)] text-center">4:28</div>
          <div class="w-[calc((100%-150px)/2)] text-center">test</div>
        </div>
        <ul class="w-full max-h-[calc(667px-6rem)]] flex-grow px-2 bg-[#B2C6D9] overflow-y-auto">
          {#each $messages as message}
            <ChatBubble message={message} user='Hwang'/>
          {/each}
        </ul>
        <ChatFooter channelId={channelId}/>
      </div>
    </div>
  </div>
</section>
