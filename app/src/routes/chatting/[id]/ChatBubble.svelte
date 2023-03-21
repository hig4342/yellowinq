<script lang="ts">
  import { format } from 'date-fns'
  import avatar from '$lib/images/avatar.jpg'
  export let message: {
    channelId: string;
    datetime: Date;
    message: string;
    sender: string;
  }
  export let userId: string
  $: isMe = message.sender === userId
</script>

<li class="chat {isMe ? 'chat-end' : 'chat-start'}" >
  {#if !isMe}
    <div class="chat-image avatar">
      <div class="w-10 mask mask-squircle">
        <img src={avatar} alt="avatar"/>
      </div>
    </div>
    <div class="chat-header text-sm opacity-60">
      {message.sender}
    </div>
  {/if}
  <div class="chat-bubble py-1 px-2 min-h-0 rounded-xl">
    <span>{message.message}</span>
    <time class="chat-time absolute bottom-0 w-max text-xs opacity-50">{format(message.datetime, 'p')}</time>
  </div>
</li>

<style>
  .chat-start .chat-bubble {
    background-color: white;
    color: black;
  }
  .chat-end .chat-bubble {
    background-color: #fae100;
    color: black;
  }

  .chat-start .chat-time {
    right: 0;
    transform: translateX(calc(100% + .25rem));
  }
  .chat-end .chat-time {
    left: 0;
    transform: translateX(calc(-100% - .25rem));
  }
</style>