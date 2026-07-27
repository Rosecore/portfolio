<script lang="ts">
	import { profile, summary, stats, skills, experience, education, languages } from '$lib/data/work';
</script>

<svelte:head>
	<title>Work — Mariia</title>
	<meta name="description" content="Mariia Trankova — Senior Frontend Engineer. 5+ years with React, Next.js and TypeScript." />
</svelte:head>

<article>
	<!-- header card -->
	<header class="shell">
		<div class="card">
			<span class="glow" aria-hidden="true"></span>
			<span class="idx display">WORK</span>
			<h1>{profile.name}</h1>
			<p class="role display">{profile.role}</p>
			<p class="focus">{profile.focus.join('  ·  ')}</p>
			<p class="loc">{profile.location}</p>
		</div>
	</header>

	<div class="shell body">
		<!-- summary -->
		<section class="block">
			<span class="tag display">01 · SUMMARY</span>
			<p class="lead">{summary}</p>
		</section>

		<!-- headline stats -->
		<div class="stats">
			{#each stats as s (s.label)}
				<div class="stat">
					<span class="value display">{s.value}</span>
					<span class="label">{s.label}</span>
				</div>
			{/each}
		</div>

		<!-- skills -->
		<section class="block">
			<span class="tag display">02 · SKILLS</span>
			<h2>What I work with</h2>
			<div class="skills">
				{#each skills as g (g.label)}
					<div class="skill-group">
						<h3>{g.label}</h3>
						<ul>
							{#each g.items as it (it)}
								<li>{it}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- experience -->
		<section class="block">
			<span class="tag display">03 · EXPERIENCE</span>
			<h2>Where I`ve worked</h2>
			<div class="timeline">
				{#each experience as role (role.company)}
					<div class="role">
						<div class="role-head">
							<h3 class="display">{role.company}</h3>
							<span class="period">{role.period}</span>
						</div>
						<p class="title">{role.title}</p>
						<ul class="highlights">
							{#each role.highlights as h (h)}
								<li>{h}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- education + languages -->
		<section class="block two-col">
			<div>
				<span class="tag display">04 · EDUCATION</span>
				<h3 class="mini">{education.school}</h3>
				<p>{education.degree}</p>
			</div>
			<div>
				<span class="tag display">05 · LANGUAGES</span>
				<ul class="langs">
					{#each languages as l (l.name)}
						<li><strong>{l.name}</strong> — {l.level}</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- CTA to projects -->
		<nav class="next">
			<a href="/#projects" data-sveltekit-noscroll>
				<span class="label">AND HERE`S WHAT I BUILD FOR FUN</span>
				<span class="title display">PROJECTS →</span>
			</a>
		</nav>
	</div>
</article>

<style>
	article {
		padding-top: calc(var(--nav-h) + clamp(20px, 4vw, 48px));
		padding-bottom: clamp(80px, 12vw, 160px);
	}

	/* header card */
	.card {
		position: relative;
		overflow: hidden;
		background: var(--bg);
		border: 2px solid var(--ink);
		border-radius: 26px;
		padding: clamp(30px, 5vw, 64px);
		text-align: center;
	}

	.card > :not(.glow) {
		position: relative;
		z-index: 1;
	}

	/* a glimpse of colour in the corner, matching the project cards */
	.glow {
		position: absolute;
		right: -60px;
		bottom: -60px;
		width: 280px;
		height: 280px;
		border-radius: 50%;
		z-index: 0;
		background-image: var(--spectrum);
		background-size: 300% 100%;
		background-position: 88% 50%;
		filter: blur(42px) saturate(1.3);
		opacity: 0.8;
		pointer-events: none;
	}

	.idx {
		font-size: clamp(15px, 1.8vw, 20px);
		opacity: 0.6;
	}

	h1 {
		font-size: clamp(34px, 6.5vw, 82px);
		margin: 10px 0 16px;
	}

	.role {
		font-size: clamp(18px, 2.4vw, 30px);
	}

	.focus {
		margin: 8px 0 2px;
		font-size: clamp(14px, 1.7vw, 18px);
		opacity: 0.8;
	}

	.loc {
		margin: 4px 0 0;
		font-size: 14px;
		opacity: 0.7;
	}

	/* shared blocks */
	.body {
		max-width: 900px;
		display: flex;
		flex-direction: column;
		gap: clamp(52px, 9vw, 104px);
		margin-top: clamp(40px, 7vw, 84px);
	}

	.tag {
		display: block;
		font-size: 14px;
		opacity: 0.5;
		letter-spacing: 0.03em;
		margin-bottom: 14px;
	}

	h2 {
		font-size: clamp(26px, 4vw, 44px);
		margin: 0 0 26px;
	}

	.lead {
		margin: 0;
		font-size: clamp(18px, 2.2vw, 24px);
		line-height: 1.55;
	}

	/* stats */
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: clamp(20px, 3vw, 40px);
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.value {
		font-size: clamp(40px, 6vw, 72px);
		line-height: 0.95;
	}

	.stat .label {
		font-size: 13px;
		opacity: 0.7;
		max-width: 18ch;
	}

	/* skills */
	.skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: clamp(24px, 4vw, 44px);
	}

	.skill-group h3 {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 15px;
		margin: 0 0 14px;
		opacity: 0.55;
	}

	.skill-group ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.skill-group li {
		font-size: 13px;
		padding: 6px 13px;
		border: 1.5px solid var(--ink);
		border-radius: 999px;
	}

	/* experience timeline */
	.timeline {
		display: flex;
		flex-direction: column;
		gap: clamp(40px, 6vw, 64px);
	}

	.role {
		border-top: 2px solid var(--ink);
		padding-top: 24px;
	}

	.role-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px 20px;
	}

	.role-head h3 {
		font-size: clamp(24px, 3.4vw, 40px);
		margin: 0;
	}

	.period {
		font-size: 14px;
		opacity: 0.65;
		white-space: nowrap;
	}

	.role .title {
		margin: 6px 0 18px;
		font-weight: 700;
		font-size: 16px;
	}

	.highlights {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.highlights li {
		position: relative;
		padding-left: 26px;
		font-size: clamp(15px, 1.8vw, 17px);
		line-height: 1.55;
	}

	.highlights li::before {
		content: '→';
		position: absolute;
		left: 0;
		font-family: var(--font-display);
		opacity: 0.55;
	}

	/* education + languages */
	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(30px, 5vw, 60px);
	}

	.mini {
		font-size: clamp(19px, 2.2vw, 26px);
		margin: 0 0 8px;
	}

	.two-col p {
		margin: 0;
		font-size: 16px;
	}

	.langs {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 16px;
	}

	/* CTA */
	.next {
		border-top: 2px solid var(--ink);
		padding-top: 34px;
	}

	.next .label {
		display: block;
		font-size: 13px;
		opacity: 0.6;
		margin-bottom: 10px;
	}

	.next .title {
		font-size: clamp(30px, 5vw, 56px);
	}

	@media (max-width: 680px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.two-col {
			grid-template-columns: 1fr;
		}
	}
</style>
