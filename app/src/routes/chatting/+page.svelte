<script lang="ts">
  let user: string
  let channelId: string
</script>

<div class="hero bg-base-200">
  <div class="hero-content flex-col text-center">
    <input type="text" placeholder="User" class="input input-bordered w-full max-w-xs" bind:value={user}/>
    <input type="text" placeholder="Channel ID" class="input input-bordered w-full max-w-xs" bind:value={channelId}/>
    <a href="/chatting/{channelId}"><button class="btn">접속</button></a>
  </div>
</div>