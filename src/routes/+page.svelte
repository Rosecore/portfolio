<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';

	// The home page is a locked two-panel deck. You only reach the projects
	// by clicking PROJECTS (which sets #work); the browser never rests on the
	// middle of the gradient circle. State is driven by the URL hash so the
	// nav's WORK link and the back button work too.
	let atProjects = $derived(page.url.hash === '#projects');

	// don't animate the very first paint (e.g. landing straight on /#work)
	let ready = $state(false);
	onMount(() => {
		ready = true;
	});

	let workEl: HTMLElement | undefined = $state();
	$effect(() => {
		if (!atProjects && workEl) workEl.scrollTop = 0; // reset when returning to hero
	});
</script>

<div class="home" class:at-projects={atProjects} class:ready>
	<div class="deck">
		<!-- HERO -->
		<section class="hero">
			<div class="intro shell">
				<p class="lead">
					Hi! My name is Mariia and I`m taking best out of the two
					<span class="display accent">worlds</span>
				</p>
			</div>

			<a class="scroll" href="#projects" data-sveltekit-noscroll>
				<span class="display">PROJECTS</span>
				<svg viewBox="0 0 40 22" width="40" aria-hidden="true">
					<path d="M2 2 L20 19 L38 2" fill="none" stroke="currentColor" stroke-width="4" />
				</svg>
			</a>
		</section>

		<!-- SHARED SEAM: one gradient + one white circle straddling the boundary.
		     Top half shows in the hero, bottom half shows in the work panel. -->
		<div class="seam" aria-hidden="true">
			<div class="band"></div>
			<div class="orb"></div>
		</div>

		<!-- WORK / PROJECTS PANEL (scrolls internally) -->
		<section class="work" bind:this={workEl}>
			<div class="work-scroll">
				<a class="back" href="#top" data-sveltekit-noscroll aria-label="Back to top">
					<svg viewBox="0 0 40 22" width="34" aria-hidden="true">
						<path d="M2 20 L20 3 L38 20" fill="none" stroke="currentColor" stroke-width="4" />
					</svg>
				</a>

				<h2 class="sr-only">Work</h2>
				<div class="grid">
					{#each projects as project (project.slug)}
						<ProjectCard {project} total={projects.length} />
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.home {
		position: relative;
		height: 100dvh;
		overflow: hidden;
	}

	.deck {
		transform: translateY(0);
	}
	.home.ready .deck {
		transition: transform 0.62s cubic-bezier(0.7, 0, 0.24, 1);
	}
	.home.at-projects .deck {
		transform: translateY(-100dvh);
	}

	/* --- hero panel --- */
	.hero {
		position: relative;
		z-index: 1;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.intro {
		width: 100%;
		text-align: center;
		padding-top: clamp(110px, 24vh, 260px);
	}

	.lead {
		margin: 0 auto;
		max-width: 22ch;
		font-size: clamp(24px, 3.6vw, 40px);
		line-height: 1.3;
	}

	.accent {
		display: inline-block;
		font-size: clamp(34px, 5vw, 58px);
		line-height: 1;
	}

	.scroll {
		position: absolute;
		left: 50%;
		translate: -50% 0;
		bottom: clamp(46px, 9vh, 120px);
		z-index: 2;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(10px, 2vw, 22px);
		font-size: clamp(20px, 2.6vw, 30px);
	}

	.scroll svg {
		transition: transform 0.25s ease;
	}
	.scroll:hover svg {
		transform: translateY(6px);
	}

	/* --- shared seam glow, behind the panels (z:0) --- */
	.seam {
		--orb: min(64vw, 720px);
		position: relative;
		z-index: 0;
		height: 0;
	}

	/* Wide, short rainbow glow: thick to the sides of the circle (bleeding
	   out to both screen edges), thin arching over its top, and faded out
	   before it reaches the title. The white .orb punches the hug. */
	.band {
		position: absolute;
		top: 0;
		left: 50%;
		translate: -50% -50%;
		width: 150vw;
		height: 96vh;
		background: var(--spectrum);
		filter: blur(55px) saturate(1.3);
		-webkit-mask-image: radial-gradient(
			72vw 46vh at 50% 50%,
			#000 0 20%,
			rgba(0, 0, 0, 0.92) 42%,
			transparent 90%
		);
		mask-image: radial-gradient(
			72vw 46vh at 50% 50%,
			#000 0 20%,
			rgba(0, 0, 0, 0.92) 42%,
			transparent 90%
		);
	}

	.orb {
		position: absolute;
		top: 0;
		left: 50%;
		translate: -50% -50%;
		width: var(--orb);
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--bg);
	}

	/* --- work panel (internally scrollable) --- */
	.work {
		position: relative;
		z-index: 1;
		height: 100dvh;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
	}

	.work-scroll {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		/* top padding clears the bottom half of the shared circle */
		padding: clamp(96px, 14vh, 150px) var(--pad) clamp(70px, 10vw, 150px);
		max-width: calc(var(--maxw) + 2 * var(--pad));
		margin-inline: auto;
		width: 100%;
	}

	.back {
		z-index: 2;
		display: inline-flex;
		padding: 8px 16px;
		border-radius: 999px;
		transition:
			transform 0.2s ease,
			background 0.18s ease;
	}
	.back:hover {
		background: color-mix(in srgb, var(--ink) 9%, transparent);
		transform: translateY(-4px);
	}

	.grid {
		width: 100%;
		margin-top: clamp(150px, 20vw, 250px);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(20px, 3vw, 40px);
	}

	@media (max-width: 720px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
