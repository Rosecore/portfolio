export type Stat = {
	value: string;
	label: string;
};

export type Section = {
	/** step label this section maps to in the process arc */
	step: string;
	heading: string;
	body: string;
	stats?: Stat[];
};

export type Project = {
	slug: string;
	index: number;
	title: string;
	/** short line for the project card */
	card: string;
	/** one-liner shown at the top of the detail page */
	tagline: string;
	stack: string[];
	/** ordered labels rendered around the process arc */
	steps: string[];
	sections: Section[];
	links?: { label: string; href: string }[];
};

export const projects: Project[] = [
	{
		slug: 'nestjs-microservices',
		index: 1,
		title: 'MICROSERVICES',
		card: 'Event-driven backend split into independent NestJS services.',
		tagline: 'A backend broken into small, independently deployable NestJS services talking over a message broker.',
		stack: ['NestJS', 'TypeScript', 'RabbitMQ', 'PostgreSQL', 'Redis', 'Docker'],
		steps: ['PROBLEM', 'DESIGN', 'SERVICES', 'MESSAGING', 'DEPLOY'],
		sections: [
			{
				step: 'PROBLEM',
				heading: 'The problem',
				body: 'A single monolith made every change risky — one deploy shipped everything, and a slow endpoint could drag the whole app down. I wanted services that could scale, fail and ship on their own.',
				stats: [
					{ value: '1', label: 'monolith → many services' },
					{ value: '0', label: 'shared database coupling' }
				]
			},
			{
				step: 'DESIGN',
				heading: 'The design',
				body: 'I split the domain into bounded contexts — a gateway plus focused services — each owning its own data. The API gateway is the only public surface; everything behind it is private and communicates asynchronously.'
			},
			{
				step: 'SERVICES',
				heading: 'The services',
				body: 'Every service is its own NestJS app with its own Postgres schema, DTO validation and health checks. Shared contracts live in a common package so the boundaries stay honest and typed end to end.'
			},
			{
				step: 'MESSAGING',
				heading: 'The messaging layer',
				body: 'Services publish and consume events through RabbitMQ instead of calling each other directly, so a slow or down service just queues work instead of cascading failures. Redis handles caching and short-lived state.'
			},
			{
				step: 'DEPLOY',
				heading: 'Shipping it',
				body: 'Everything runs in Docker with a compose stack for local dev that mirrors production. Each service builds and deploys independently.'
			}
		]
	},
	{
		slug: 'claude-approval-bot',
		index: 2,
		title: 'APPROVAL BOT',
		card: 'Telegram bot that routes Claude`s action requests to me for approval.',
		tagline: 'A Telegram bot that puts a human in the loop — Claude asks, I tap approve or deny, the agent continues.',
		stack: ['NestJS', 'Telegraf', 'Claude API', 'Webhooks', 'TypeScript'],
		steps: ['PROBLEM', 'FLOW', 'BOT', 'BRIDGE', 'DEPLOY'],
		sections: [
			{
				step: 'PROBLEM',
				heading: 'The problem',
				body: 'Letting an agent act on its own is fast but scary. I wanted Claude to be able to work autonomously and still ask me before doing anything I hadn`t pre-approved — without me sitting at a terminal.',
				stats: [
					{ value: '2', label: 'taps to approve or deny' },
					{ value: '24/7', label: 'reachable from my phone' }
				]
			},
			{
				step: 'FLOW',
				heading: 'The flow',
				body: 'Claude reaches a step that needs sign-off and emits an approval request. It lands in Telegram as a message with inline Approve / Deny buttons. My choice is sent back and the agent either continues or stops.'
			},
			{
				step: 'BOT',
				heading: 'The bot',
				body: 'Built with Telegraf inside a NestJS service. It renders requests, tracks which message maps to which pending request, and handles callback queries idempotently so a double-tap never double-approves.'
			},
			{
				step: 'BRIDGE',
				heading: 'The bridge to Claude',
				body: 'A small API sits between the agent and the bot: the agent posts a request and long-waits on the decision; the bot resolves it. Requests are persisted so nothing is lost on a restart.'
			},
			{
				step: 'DEPLOY',
				heading: 'Shipping it',
				body: 'Runs as a webhook-driven service in Docker with secrets kept out of the repo. Low-latency, always-on, and easy to point at any agent.'
			}
		]
	},
	{
		slug: 'discord-bot',
		index: 3,
		title: 'DISCORD BOT',
		card: 'Community automation bot built on discord.js.',
		tagline: 'A Discord bot that handles the repetitive server work so moderators don`t have to.',
		stack: ['NestJS', 'discord.js', 'TypeScript', 'PostgreSQL'],
		steps: ['PROBLEM', 'COMMANDS', 'EVENTS', 'DATA', 'DEPLOY'],
		sections: [
			{
				step: 'PROBLEM',
				heading: 'The problem',
				body: 'Running a server means the same chores over and over — onboarding, roles, moderation. I wanted a bot that handles the routine parts reliably and gets out of the way.'
			},
			{
				step: 'COMMANDS',
				heading: 'The commands',
				body: 'Slash commands registered per guild, each a small handler with typed options and permission checks, so the surface stays discoverable and safe to extend.'
			},
			{
				step: 'EVENTS',
				heading: 'The events',
				body: 'The bot reacts to gateway events — joins, messages, reactions — to automate onboarding and moderation, with rate-limit-aware handling so it stays a good citizen.'
			},
			{
				step: 'DATA',
				heading: 'The data',
				body: 'Per-guild configuration and state live in Postgres so behaviour is customisable per server and survives restarts.'
			},
			{
				step: 'DEPLOY',
				heading: 'Shipping it',
				body: 'Packaged in Docker alongside my other services and deployed the same way, so one workflow covers everything.'
			}
		]
	},
	{
		slug: 'portfolio',
		index: 4,
		title: 'THIS PORTFOLIO',
		card: 'The site you`re on — designed and built from scratch.',
		tagline: 'This very site: I designed every frame myself, then built it in SvelteKit.',
		stack: ['SvelteKit', 'Svelte 5', 'TypeScript', 'CSS'],
		steps: ['DESIGN', 'BUILD', 'MOTION', 'DETAILS', 'DEPLOY'],
		sections: [
			{
				step: 'DESIGN',
				heading: 'I designed it myself',
				body: 'Before writing a line of code I designed the whole thing frame by frame — the "best of two worlds" idea, the rainbow gradient, the monospace-meets-heavy-display type pairing, and the circle that stitches the pages together. The look is mine, not a template.',
				stats: [
					{ value: '100%', label: 'designed from scratch' },
					{ value: '0', label: 'UI templates used' }
				]
			},
			{
				step: 'BUILD',
				heading: 'The build',
				body: 'Built with SvelteKit and Svelte 5 runes. Every screen is a component, the projects are data-driven from a single file, and the whole thing is typed end to end.'
			},
			{
				step: 'MOTION',
				heading: 'The motion',
				body: 'The home page is a locked two-panel deck — you reach the work only by clicking, so you never rest on the middle of the gradient. One shared circle straddles the seam between the panels, and each project`s process is a clickable dial that tracks the paragraph you`re reading.'
			},
			{
				step: 'DETAILS',
				heading: 'The details',
				body: 'The rainbow is a single blurred gradient masked into a halo that hugs the circle and bleeds out to both screen edges. Type is two families on a strict black-and-white palette, and the layout scales from phone to widescreen.'
			},
			{
				step: 'DEPLOY',
				heading: 'Shipping it',
				body: 'Compiled to a static build and deployed — the exact site you are reading right now.'
			}
		]
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
