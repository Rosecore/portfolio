<script lang="ts">
	type Props = {
		/** 'hero' = glow rising from the bottom, big circle at bottom-center.
		    'band' = glow across the top, circle hanging from the top-center. */
		variant?: 'hero' | 'band';
		children?: import('svelte').Snippet;
	};

	let { variant = 'hero', children }: Props = $props();
</script>

<div class="glow glow--{variant}" aria-hidden="true">
	<div class="spectrum"></div>
</div>

<div class="circle circle--{variant}">
	{#if children}
		<div class="circle-content">{@render children()}</div>
	{/if}
</div>

<style>
	.glow {
		position: absolute;
		left: 50%;
		translate: -50% 0;
		width: 150%;
		pointer-events: none;
		z-index: 0;
	}

	.spectrum {
		width: 100%;
		height: 100%;
		background: var(--spectrum);
		filter: blur(66px) saturate(1.25);
		opacity: 1;
	}

	/* --- hero: rainbow rises from the bottom --- */
	.glow--hero {
		bottom: 0;
		height: 62%;
	}
	.glow--hero .spectrum {
		-webkit-mask-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%);
		mask-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%);
	}

	/* --- band: rainbow sits across the top --- */
	.glow--band {
		top: 0;
		height: 42%;
	}
	.glow--band .spectrum {
		-webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.5) 45%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.5) 45%, transparent 100%);
	}

	/* --- the white circle punched over the rainbow --- */
	.circle {
		position: absolute;
		left: 50%;
		translate: -50% 0;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--bg);
		z-index: 1;
	}

	.circle--hero {
		bottom: 0;
		width: min(62vw, 700px);
	}

	.circle--band {
		top: 0;
		translate: -50% -55%;
		width: min(46vw, 520px);
	}

	.circle-content {
		position: absolute;
		left: 50%;
		translate: -50% 0;
		text-align: center;
	}

	.circle--hero .circle-content {
		top: clamp(28px, 5vw, 60px);
	}

	@media (max-width: 640px) {
		.circle--hero {
			width: 82vw;
		}
		.circle--band {
			width: 68vw;
		}
	}
</style>
