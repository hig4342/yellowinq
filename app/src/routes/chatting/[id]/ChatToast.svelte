<script lang="ts">
  import toast_, { type ToastOptions } from 'svelte-french-toast';

  export let toast: ToastOptions;
</script>

<span>
  Custom and <b>bold</b>
  <button on:click={() => toast_.dismiss(toast.id)}>Dismiss</button>
</span>