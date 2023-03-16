<script lang="ts">
	import { graphql } from '$houdini';
  import Icon from '@iconify/svelte'

  const broadcastMessage = graphql(`
    mutation BroadcastMessage($message: String!, $sender: String!, $channelId: String!) {
      broadcastMessage(message: {message: $message, sender: $sender, channelId: $channelId})
    }
  `)

  export let channelId: string
  let text: string = ""
  $: isEntering = text !== ""

  const sendMessage = (message: string) => broadcastMessage.mutate({
    message,
    sender: 'Hwang',
    channelId
  })

  const handleClick = (e: MouseEvent) => {
    if (isEntering) sendMessage(text)
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && isEntering) {
      e.preventDefault()
      sendMessage(text)
      text = ""
    }
  }
</script>
<div class="w-full h-16 p-1">
  <label class="input-group input-group-sm">
    <span class="w-12 bg-white p-0 justify-center opacity-50">
      <Icon icon="material-symbols:add-rounded" width="28" height="28" />
    </span>
    <input
      type="text"
      class="input input-sm w-full bg-gray-50 !rounded-l-full"
      bind:value={text}
      on:keydown={handleEnter}
    />
    <span class="bg-gray-50 w-12 p-0 justify-center opacity-50">
      <Icon icon="material-symbols:sentiment-satisfied-outline-rounded" width="24" height="24" />
    </span>
    <span class="bg-gray-50 w-12 p-0 justify-center !rounded-r-full">
      {#if isEntering}
        <button class="bg-[#fae100] rounded-full" on:click={handleClick}>
          <Icon icon="material-symbols:arrow-upward-rounded" width="24" height="24"/>
        </button>
      {:else}
        <div class="opacity-50">
          <Icon icon="material-symbols:numbers-rounded" width="24" height="24" />
        </div>
      {/if}
    </span>
  </label>
</div>

<style>
  .input:focus {
    outline: none;
  }
</style>