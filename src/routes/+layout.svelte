<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<style>
	main {
		min-height: 100vh;
	}
</style>
