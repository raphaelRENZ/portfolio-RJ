function formatProjectDate(value) {
	if (!value) {
		return '';
	}

	const [year, month] = value.split('-');
	if (!year || !month) {
		return value;
	}

	const date = new Date(Number(year), Number(month) - 1, 1);
	return new Intl.DateTimeFormat('fr-FR', {
		month: 'long',
		year: 'numeric'
	}).format(date);
}

function createList(items, className) {
	const list = document.createElement('ul');
	if (className) {
		list.className = className;
	}

	items.forEach((item) => {
		const listItem = document.createElement('li');
		listItem.textContent = item;
		list.appendChild(listItem);
	});

	return list;
}

function createProjectCard(project) {
	const article = document.createElement('article');
	article.id = project.id;

	const header = document.createElement('header');
	const title = document.createElement('h3');
	title.textContent = project.title;

	const meta = document.createElement('p');
	meta.className = 'meta';
	meta.textContent = `${formatProjectDate(project.date)} — ${project.context}`;

	const badgeWrap = document.createElement('p');
	const semesterBadge = document.createElement('span');
	semesterBadge.className = 'badge';
	semesterBadge.textContent = project.semester;
	badgeWrap.appendChild(semesterBadge);

	header.append(title, meta, badgeWrap);

	const summary = document.createElement('p');
	summary.textContent = project.summary;

	const technologies = createList(project.technologies, 'project-technologies');
	technologies.setAttribute('aria-label', 'Technologies utilisees');

	const responsibilitiesTitle = document.createElement('p');
	responsibilitiesTitle.className = 'meta';
	responsibilitiesTitle.textContent = 'Contributions principales';

	const responsibilities = createList(project.responsibilities);

	const outcomesTitle = document.createElement('p');
	outcomesTitle.className = 'meta';
	outcomesTitle.textContent = 'Resultats';

	const outcomes = createList(project.outcomes);

	article.append(header, summary, technologies, responsibilitiesTitle, responsibilities, outcomesTitle, outcomes);

	const links = [];
	if (project.links?.github) {
		const githubLink = document.createElement('a');
		githubLink.href = project.links.github;
		githubLink.textContent = 'Depot GitHub';
		links.push(githubLink);
	}

	if (project.links?.demo) {
		const demoLink = document.createElement('a');
		demoLink.href = project.links.demo;
		demoLink.textContent = 'Voir la demo';
		links.push(demoLink);
	}

	if (links.length > 0) {
		const footer = document.createElement('footer');
		const linkGroup = document.createElement('p');

		links.forEach((link, index) => {
			if (index > 0) {
				linkGroup.append(' • ');
			}
			linkGroup.appendChild(link);
		});

		footer.appendChild(linkGroup);
		article.appendChild(footer);
	}

	return article;
}

async function loadProjects() {
	const projectsContainer = document.getElementById('projects-list');
	if (!projectsContainer) {
		return;
	}

	projectsContainer.textContent = 'Chargement des projets...';

	try {
		const response = await fetch('data/projects.json');
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();
		const projects = Array.isArray(data.projects) ? data.projects.slice() : [];
		projects.sort((left, right) => right.date.localeCompare(left.date));

		projectsContainer.replaceChildren();
		projects.forEach((project) => {
			projectsContainer.appendChild(createProjectCard(project));
		});
	} catch (error) {
		projectsContainer.textContent = 'Les projets ne peuvent pas etre charges pour le moment.';
		console.error('Erreur lors du chargement des projets :', error);
	}
}

document.addEventListener('DOMContentLoaded', loadProjects);
