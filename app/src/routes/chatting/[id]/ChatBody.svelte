<script lang="ts" context="module">
	const chatBodyEl = new Set<HTMLUListElement>();

  export const scrollDown = () => {
    chatBodyEl.forEach((el) => {
      el.scrollTo({ top: el.scrollHeight })
    })
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
	import ChatBubble from './ChatBubble.svelte';

  let chatBodyElement: HTMLUListElement
  export let messages: Array<{
    channelId: string;
    datetime: Date;
    message: string;
    sender: string;
  }>
  export let userId: string

  onMount(() => {
		chatBodyEl.add(chatBodyElement);
		return () => chatBodyEl.delete(chatBodyElement);
	});
</script>

<div class="w-full flex-grow max-h-[calc(667px-1rem)]] relative overflow-hidden bg-[#B2C6D9]">
  <ul bind:this={chatBodyElement} class="w-[calc(100%+1rem)] h-full top-0 -right-4 px-2 absolute overflow-y-scroll rounded-t-[70px]">
    <div class="h-16" />
    {#each messages as message}
      <ChatBubble message={message} userId={userId}/>
    {/each}
  </ul>
</div>