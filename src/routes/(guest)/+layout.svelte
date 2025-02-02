<script lang="ts">
	import { Header } from '$lib/components/ui/header';

	let { children } = $props();
</script>

<Header />
{@render children()}
