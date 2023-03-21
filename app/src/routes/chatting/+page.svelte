<script lang="ts">
  import { goto } from "$app/navigation";
  import { userStore } from "$lib/stores";
  let userId: string
  let channelId: string

  const handleLogin = () => {
    userStore.set({ isLogin: true, userId })
    goto(`/chatting/${channelId}`)
  }
</script>

<div class="hero bg-base-200">
  <div class="hero-content flex-col text-center">
    <input type="text" placeholder="User" class="input input-bordered w-full max-w-xs" bind:value={userId}/>
    <input type="text" placeholder="Channel ID" class="input input-bordered w-full max-w-xs" bind:value={channelId}/>
    <button on:click={handleLogin} class="btn">접속</button>
  </div>
</div>