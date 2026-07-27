<script lang="ts">
	import Dial from '$lib/components/Dial.svelte';
	import { projects } from '$lib/data/projects';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	// prev/next between projects
	let idx = $derived(projects.findIndex((p) => p.slug === project.slug));
	let next = $derived(projects[(idx + 1) % projects.length]);

	// this project's slice of the spectrum (matches its grid card)
	let hue = $derived(projects.length > 1 ? `${(idx / (projects.length - 1)) * 100}%` : '50%');

	// scroll-spy: which section is in view drives the active dial label
	let activeStep = $state(0);
	let sectionEls: HTMLElement[] = $state([]);

	$effect(() => {
		project.slug; // re-run when the project changes
		activeStep = 0;
		const els = sectionEls.filter(Boolean);
		if (!els.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						const i = els.indexOf(e.target as HTMLElement);
						if (i >= 0) activeStep = i;
					}
				}
			},
			{ rootMargin: '-45% 0px -45% 0px', threshold: 0 }
		);
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{project.title} — Mariia</title>
	<meta name="description" content={project.tagline} />
</svelte:head>

<article>
	<!-- project info block, with the dial dropped into its bottom -->
	<header class="shell">
		<div class="card" style="--hue:{hue}">
			<span class="glow" aria-hidden="true"></span>
			<div class="card-text">
				<span class="idx display">PROJECT {project.index}</span>
				<h1>{project.title}</h1>
				<p class="tagline">{project.tagline}</p>
				<ul class="stack">
					{#each project.stack as tech (tech)}
						<li>{tech}</li>
					{/each}
				</ul>
			</div>

			<Dial steps={project.steps} active={activeStep} onselect={(i) => (activeStep = i)} />
		</div>
	</header>

	<!-- content sections, one per dial step -->
	<div class="shell sections">
		{#each project.sections as section, i (section.heading)}
			<section class="block" id="step-{section.step}" bind:this={sectionEls[i]}>
				<span class="step-tag display">{String(i + 1).padStart(2, '0')} · {section.step}</span>
				<h2>{section.heading}</h2>
				<p>{section.body}</p>

				{#if section.stats}
					<div class="stats">
						{#each section.stats as stat (stat.label)}
							<div class="stat">
								<span class="value display">{stat.value}</span>
								<span class="label">{stat.label}</span>
							</div>
						{/each}
					</div>
				{/if}
			</section>
		{/each}
	</div>

	<!-- next -->
	<nav class="shell next">
		<a href="/projects/{next.slug}">
			<span class="label">NEXT PROJECT</span>
			<span class="title display">{next.title} →</span>
		</a>
		<a class="back" href="/#work">← ALL WORK</a>
	</nav>
</article>

<style>
	article {
		padding-top: calc(var(--nav-h) + clamp(20px, 4vw, 48px));
		padding-bottom: clamp(80px, 12vw, 160px);
	}

	.card {
		position: relative;
		background: var(--bg);
		border: 2px solid var(--ink);
		border-radius: 26px;
		padding: clamp(28px, 5vw, 60px) clamp(28px, 5vw, 60px) 0;
		text-align: center;
		overflow: hidden;
	}

	.card > :not(.glow) {
		position: relative;
		z-index: 1;
	}

	/* a glimpse of this project's colour in the corner */
	.glow {
		position: absolute;
		right: -60px;
		bottom: -60px;
		width: 260px;
		height: 260px;
		border-radius: 50%;
		background-image: var(--spectrum);
		background-size: 360% 100%;
		background-position: var(--hue) 50%;
		filter: blur(40px) saturate(1.3);
		opacity: 0.8;
		pointer-events: none;
		z-index: 0;
	}

	.idx {
		font-size: clamp(15px, 1.8vw, 20px);
		opacity: 0.6;
	}

	h1 {
		font-size: clamp(38px, 8vw, 92px);
		margin: 10px 0 18px;
	}

	.tagline {
		margin: 0 auto;
		max-width: 52ch;
		font-size: clamp(15px, 1.8vw, 19px);
	}

	.stack {
		list-style: none;
		margin: 26px 0 4px;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}

	.stack li {
		font-size: 13px;
		padding: 6px 14px;
		border: 2px solid var(--ink);
		border-radius: 999px;
	}

	.sections {
		display: flex;
		flex-direction: column;
		gap: clamp(48px, 8vw, 96px);
		margin-top: clamp(30px, 6vw, 70px);
		max-width: 780px;
	}

	.block {
		scroll-margin-top: calc(var(--nav-h) + 28px);
	}

	.step-tag {
		font-size: 14px;
		opacity: 0.5;
		letter-spacing: 0.03em;
	}

	.block h2 {
		font-size: clamp(28px, 4vw, 44px);
		margin: 10px 0 18px;
	}

	.block p {
		margin: 0;
		font-size: clamp(16px, 1.9vw, 19px);
		line-height: 1.6;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(30px, 6vw, 72px);
		margin-top: 34px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.value {
		font-size: clamp(46px, 8vw, 84px);
		line-height: 0.95;
	}

	.stat .label {
		font-size: 14px;
		opacity: 0.7;
		max-width: 22ch;
	}

	.next {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 24px;
		margin-top: clamp(70px, 12vw, 140px);
		padding-top: 34px;
		border-top: 2px solid var(--ink);
	}

	.next a .label {
		display: block;
		font-size: 13px;
		opacity: 0.6;
		margin-bottom: 8px;
	}

	.next .title {
		font-size: clamp(26px, 4vw, 46px);
	}

	.back {
		font-family: var(--font-display);
		font-size: 15px;
		align-self: center;
	}
</style>
