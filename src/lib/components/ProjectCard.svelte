<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project, total = 1 }: { project: Project; total?: number } = $props();

	// give every card its own window onto the spectrum
	let hue = $derived(total > 1 ? `${((project.index - 1) / (total - 1)) * 100}%` : '50%');
</script>

<a class="card" href="/projects/{project.slug}" style="--hue:{hue}">
	<span class="glow" aria-hidden="true"></span>

	<span class="idx">0{project.index}</span>
	<div class="body">
		<h3>{project.title}</h3>
		<p>{project.card}</p>
	</div>
	<span class="cta">OPEN <span class="arrow">→</span></span>
</a>

<style>
	.card {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 28px;
		min-height: 232px;
		padding: 28px 30px;
		border-radius: 22px;
		background: var(--bg);
		border: 2px solid var(--ink);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	/* each card's slice of the rainbow, glowing out of the bottom-right */
	.glow {
		position: absolute;
		right: -34px;
		bottom: -34px;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background-image: var(--spectrum);
		background-size: 360% 100%;
		background-position: var(--hue) 50%;
		filter: blur(26px) saturate(1.3);
		opacity: 0.9;
		pointer-events: none;
		transition:
			transform 0.35s ease,
			opacity 0.35s ease;
	}

	.card:hover .glow {
		transform: scale(1.55) translate(-6%, -6%);
		opacity: 1;
	}

	.idx,
	.body,
	.cta {
		position: relative;
		z-index: 1;
	}

	.idx {
		font-family: var(--font-display);
		font-size: 18px;
		opacity: 0.5;
	}

	h3 {
		font-family: var(--font-display);
		font-size: clamp(24px, 3vw, 34px);
		margin-bottom: 10px;
	}

	.body p {
		margin: 0;
		max-width: 34ch;
		font-size: 15px;
		line-height: 1.5;
	}

	.cta {
		font-family: var(--font-display);
		font-size: 15px;
		letter-spacing: 0.02em;
	}

	.arrow {
		display: inline-block;
		transition: transform 0.2s ease;
	}

	.card:hover .arrow {
		transform: translateX(6px);
	}
</style>
