<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { ModeWatcherButton } from '../mode-watcher-button';
</script>

<nav class="relative flex h-16 items-center border-b px-4">
	<div class="flex items-center">
		<img src={logo} alt="Yellowinq logo" class="h-12" />
		<span class="text-xl font-semibold">Yellowinq</span>
	</div>
	<div class="flex-1"></div>
	<div><ModeWatcherButton /></div>
</nav>
