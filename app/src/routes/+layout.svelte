<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<main class="h-[calc(100vh-4rem)]">
		<slot />
	</main>
	<Footer />
</div>

<!-- <style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style> -->
