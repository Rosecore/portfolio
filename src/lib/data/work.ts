export type SkillGroup = { label: string; items: string[] };
export type Role = {
	company: string;
	title: string;
	period: string;
	highlights: string[];
};

export const profile = {
	name: 'MARIIA TRANKOVA',
	role: 'Senior Frontend Engineer',
	focus: ['React', 'Next.js', 'TypeScript'],
	location: 'Belgrade, Serbia · GMT+1'
};

export const contacts = [
	{ kind: 'Email', value: 'reynsvort@gmail.com', href: 'mailto:reynsvort@gmail.com' },
	{ kind: 'Telegram', value: '@leaisalreadytaken', href: 'https://t.me/leaisalreadytaken' },
	{ kind: 'LinkedIn', value: 'in/reynsvort', href: 'https://linkedin.com/in/reynsvort' },
	{ kind: 'GitHub', value: 'Rosecore', href: 'https://github.com/Rosecore' }
];

export const linkedinUrl = 'https://linkedin.com/in/reynsvort';

export const summary = `I\`m a frontend engineer with 5+ years of turning high-fidelity designs into fast, accessible, pixel-perfect interfaces. I care most about the things users actually feel — Core Web Vitals, render performance, clean architecture — and I\`ve started folding AI-assisted workflows into how I build.`;

export const stats = [
	{ value: '5+', label: 'years shipping frontend' },
	{ value: '90+', label: 'Lighthouse, up from the mid-60s' },
	{ value: '40%', label: 'faster LCP on consumer pages' },
	{ value: '45%', label: 'fewer wasted re-renders' }
];

export const skills: SkillGroup[] = [
	{ label: 'Frontend', items: ['React 18/19', 'Next.js — SSR / ISR / SSG', 'TypeScript', 'Tailwind'] },
	{ label: 'State & data', items: ['Redux Toolkit', 'RTK Query', 'Zustand', 'GraphQL', 'REST'] },
	{ label: 'Performance', items: ['Core Web Vitals', 'code splitting', 'memoization', 'profiling'] },
	{
		label: 'Testing & tooling',
		items: ['Playwright', 'Jest', 'Storybook', 'Claude Code', 'OpenAI / Anthropic APIs']
	}
];

export const experience: Role[] = [
	{
		company: 'Playtronix',
		title: 'Senior Frontend Engineer',
		period: 'Dec 2025 — Present',
		highlights: [
			'Took Lighthouse from the mid-60s to 90+ and cut LCP by 40%+ — asset preloading, WebP/AVIF via imgix, and deferring everything off-screen.',
			'Owned frontend architecture end to end, balancing "ship it now" against performance and long-term scale.',
			'Killed ~45% of render time on data-heavy dashboards by hunting down wasteful re-renders with the React Profiler.'
		]
	},
	{
		company: 'JetRockets',
		title: 'Frontend Engineer',
		period: 'Apr 2025 — Dec 2025',
		highlights: [
			'Built virtualized tables and filtering over large datasets with optimistic UI, so everything feels instant.',
			'Integrated PayPal behind a fully custom UI — secure tokenization, webhook-driven confirmation, real error recovery.',
			'Built SVG + D3 visualizations for big datasets with animated transitions and zoom/pan, tuned to stay smooth.'
		]
	},
	{
		company: 'LifeIT',
		title: 'Middle Frontend Engineer',
		period: 'Nov 2023 — Apr 2025',
		highlights: [
			'Cut rendering time ~50% through systematic profiling and strategic component splitting.',
			'Leaned on Next.js SSR/ISR for speed and SEO, and tamed data fetching with RTK Query.'
		]
	},
	{
		company: 'Terralink',
		title: 'Frontend Developer',
		period: 'Feb 2021 — Nov 2023',
		highlights: [
			'Built complex enterprise apps with heavy business logic and layered state.',
			'Set up AWS CloudFront delivery and helped shape CI/CD with GitHub Actions.'
		]
	}
];

export const education = {
	school: 'Moscow Power Engineering Institute',
	degree: 'BSc, Computer Science & Engineering'
};

export const languages = [
	{ name: 'English', level: 'Professional' },
	{ name: 'Russian', level: 'Native' },
	{ name: 'Serbian', level: 'Basic' }
];
