<script lang="ts">
	import { contacts, profile } from '$lib/data/work';

	function hue(i: number) {
		return contacts.length > 1 ? `${(i / (contacts.length - 1)) * 100}%` : '50%';
	}
</script>

<svelte:head>
	<title>Contact — Mariia</title>
	<meta name="description" content="Get in touch with Mariia Trankova — email, LinkedIn, GitHub." />
</svelte:head>

<section class="contact">
	<div class="shell inner">
		<span class="eyebrow display">CONTACT</span>
		<h1>LET`S BUILD <span class="accent">something</span></h1>
		<p class="lead">
			I`m a {profile.role} in {profile.location}. Open to interesting frontend work and
			collaborations — pick whichever way is easiest.
		</p>

		<div class="cards">
			{#each contacts as c, i (c.href)}
				<a
					class="card"
					href={c.href}
					style="--hue:{hue(i)}"
					target={c.href.startsWith('http') ? '_blank' : undefined}
					rel="noreferrer noopener"
				>
					<span class="glow" aria-hidden="true"></span>
					<span class="kind display">{c.kind}</span>
					<span class="value">{c.value}</span>
					<span class="cta display">→</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.contact {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		padding-block: calc(var(--nav-h) + clamp(30px, 6vw, 80px)) clamp(60px, 10vw, 120px);
	}

	.inner {
		width: 100%;
	}

	.eyebrow {
		display: block;
		font-size: clamp(14px, 1.6vw, 18px);
		opacity: 0.55;
		margin-bottom: 18px;
	}

	h1 {
		font-size: clamp(40px, 8vw, 96px);
		line-height: 1;
		margin: 0;
	}

	.accent {
		background-image: var(--spectrum);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.lead {
		margin: clamp(22px, 3vw, 34px) 0 clamp(40px, 6vw, 64px);
		max-width: 46ch;
		font-size: clamp(17px, 2vw, 21px);
		line-height: 1.55;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: clamp(18px, 2.5vw, 32px);
	}

	.card {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 14px;
		min-height: 190px;
		padding: 26px 28px;
		border-radius: 22px;
		background: var(--bg);
		border: 2px solid var(--ink);
		transition: transform 0.2s ease;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.glow {
		position: absolute;
		right: -40px;
		bottom: -40px;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-image: var(--spectrum);
		background-size: 360% 100%;
		background-position: var(--hue) 50%;
		filter: blur(28px) saturate(1.3);
		opacity: 0.9;
		pointer-events: none;
		transition:
			transform 0.35s ease,
			opacity 0.35s ease;
	}

	.card:hover .glow {
		transform: scale(1.5) translate(-6%, -6%);
	}

	.kind,
	.value,
	.cta {
		position: relative;
		z-index: 1;
	}

	.kind {
		font-size: clamp(22px, 3vw, 30px);
	}

	.value {
		font-size: 15px;
		word-break: break-word;
	}

	.cta {
		margin-top: auto;
		font-size: 22px;
		transition: transform 0.2s ease;
	}

	.card:hover .cta {
		transform: translateX(6px);
	}
</style>
