<script lang="ts">
	let {
		steps,
		active = 0,
		onselect
	}: { steps: string[]; active?: number; onselect?: (i: number) => void } = $props();

	function pos(i: number, n: number) {
		const pad = 0.12; 
		const t = n === 1 ? 0.5 : i / (n - 1);
		const angle = Math.PI * (1 - (pad + t * (1 - 2 * pad))); 
		const rx = 47;
		const ry = 94;
		const x = 50 + rx * Math.cos(angle);
		const y = 100 - ry * Math.sin(angle);
		return `left:${x}%;top:${y}%`;
	}

	function go(e: MouseEvent, i: number, step: string) {
		e.preventDefault();
		onselect?.(i); 
		document
			.getElementById(`step-${step}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div class="dial">
	<div class="dome"></div>
	{#each steps as step, i (step)}
		<a
			class="step"
			class:active={i === active}
			style={pos(i, steps.length)}
			href="#step-{step}"
			aria-current={i === active ? 'step' : undefined}
			onclick={(e) => go(e, i, step)}
		>
			<span>{step}</span>
		</a>
	{/each}
</div>

<style>
	.dial {
		position: relative;
		width: min(74%, 460px);
		margin: clamp(70px, 10vw, 120px) auto 0;
		aspect-ratio: 2 / 1; /* semicircle bounding box */
		overflow: visible;
		z-index: 1;
	}

	.dome {
		position: absolute;
		left: 50%;
		bottom: 0;
		translate: -50% 0;
		width: 70%;
		aspect-ratio: 2 / 1;
		background: var(--bg);
		border: 2px solid var(--ink);
		border-bottom: none;
		border-radius: 999px 999px 0 0;
	}

	.step {
		position: absolute;
		translate: -50% -50%;
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
		padding: 9px 14px;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: clamp(11px, 1.25vw, 15px);
		letter-spacing: 0.02em;
		color: var(--ink);
		cursor: pointer;
		opacity: 0.5;
		transition:
			opacity 0.18s ease,
			background 0.18s ease,
			scale 0.12s ease;
	}

	.step:hover {
		opacity: 1;
		background: color-mix(in srgb, var(--ink) 9%, transparent);
	}

	.step:active {
		scale: 0.94;
	}

	.step:focus-visible {
		outline: 2px solid var(--ink);
		outline-offset: 2px;
	}

	.step.active {
		opacity: 1;
		background: var(--ink);
		color: var(--bg);
	}
</style>
