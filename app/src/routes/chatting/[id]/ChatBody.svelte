<script lang="ts">
  import { scrollToBottomAction } from "svelte-legos"
	import ChatBubble from './ChatBubble.svelte';

  export let messages: Array<{
    channelId: string;
    datetime: Date;
    message: string;
    sender: string;
  }>
  export let userId: string
</script>

<div class="w-full flex-grow max-h-[calc(667px-1rem)]] relative overflow-hidden bg-[#B2C6D9]">
  <ul class="w-[calc(100%+1rem)] h-full top-0 -right-4 px-2 absolute overflow-y-scroll rounded-t-[70px]" use:scrollToBottomAction>
    <div class="h-16" />
      {#each messages as message}
        <ChatBubble message={message} userId={userId}/>
      {/each}
  </ul>
</div>