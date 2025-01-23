<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { buttonVariants, type ButtonVariant } from '$lib/components/ui/button/index';

	export type ModeWatcherButtonProps = WithElementRef<Omit<HTMLButtonAttributes, 'type'>> & {
		variant?: ButtonVariant;
		type?: 'switch' | 'dropdown';
		label?: {
			light: string;
			dark: string;
			system: string;
		};
	};
</script>

<script lang="ts">
	import { resetMode, setMode, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	let {
		class: className,
		variant = 'ghost',
		ref = $bindable(null),
		type = 'switch',
		label = {
			light: 'Light',
			dark: 'Dart',
			system: 'System'
		},
		children,
		...restProps
	}: ModeWatcherButtonProps = $props();
</script>

{#if type === 'switch'}
	<Button bind:ref onclick={toggleMode} {variant} size="icon">
		{#if children}
			{@render children()}
		{:else}
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
		{/if}
	</Button>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={buttonVariants({ variant, size: 'icon' })}>
			{#if children}
				{@render children()}
			{:else}
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
			{/if}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Item onclick={() => setMode('light')}>{label.light}</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => setMode('dark')}>{label.dark}</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => resetMode()}>{label.system}</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
