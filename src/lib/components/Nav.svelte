<script lang="ts">
	import { linkedinUrl } from '$lib/data/work';
</script>

<nav>
	<div class="group left">
		<a href="/contact">CONTACT</a>
		<a href="/work">WORK</a>
	</div>

	<a class="brand" href="/">ABOUT ME</a>

	<div class="group right">
		<a href={linkedinUrl} target="_blank" rel="noreferrer noopener">LINKEDIN</a>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		height: var(--nav-h);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding-inline: var(--pad);
		background: var(--bg);
		font-family: var(--font-display);
		font-size: clamp(13px, 1.4vw, 18px);
		letter-spacing: 0.01em;
	}

	.group {
		display: flex;
		gap: clamp(14px, 2vw, 26px);
	}

	.right {
		justify-content: flex-end;
	}

	.brand {
		justify-self: center;
		white-space: nowrap;
	}

	a {
		position: relative;
		transition: opacity 0.15s ease;
	}

	a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -4px;
		height: 2px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.2s ease;
	}

	a:hover::after {
		transform: scaleX(1);
	}
</style>
