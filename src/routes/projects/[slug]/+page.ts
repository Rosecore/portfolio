import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) throw error(404, `No project called "${params.slug}"`);
	return { project };
};

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));
