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

function createProjectGallery(placeholders) {
	const gallery = document.createElement('div');
	gallery.className = 'project-gallery';

	placeholders.forEach((label) => {
		const placeholder = document.createElement('figure');
		placeholder.className = 'project-shot-placeholder';

		const caption = document.createElement('figcaption');
		caption.textContent = label;

		placeholder.appendChild(caption);
		gallery.appendChild(placeholder);
	});

	return gallery;
}

function createProjectCard(project) {
	const article = document.createElement('article');
	article.id = project.id;
	article.className = 'project-item';

	// ── Header : titre (gauche) + date/semestre (droite) ──
	const header = document.createElement('header');
	header.className = 'project-item-header';

	const titleWrap = document.createElement('div');
	const title = document.createElement('h3');
	title.textContent = project.title;
	const badge = document.createElement('span');
	badge.className = 'badge neutral';
	badge.textContent = project.semester;
	titleWrap.append(title, badge);

	const metaWrap = document.createElement('div');
	metaWrap.className = 'project-item-meta';
	const dateEl = document.createElement('time');
	dateEl.textContent = formatProjectDate(project.date);
	const ctxEl = document.createElement('span');
	ctxEl.textContent = project.context;
	metaWrap.append(dateEl, document.createElement('br'), ctxEl);

	header.append(titleWrap, metaWrap);

	// ── Résumé toujours visible ──
	const summary = document.createElement('p');
	summary.textContent = project.summary;

	// ── Bouton toggle ──
	const toggleButton = document.createElement('button');
	toggleButton.type = 'button';
	toggleButton.className = 'button project-toggle';
	toggleButton.textContent = 'Voir plus de détails';
	toggleButton.setAttribute('aria-expanded', 'false');

	// ── Détails masqués ──
	const details = document.createElement('div');
	details.className = 'project-details';
	details.hidden = true;

	// Technologies (tags)
	if (project.technologies?.length) {
		const techTitle = document.createElement('p');
		techTitle.className = 'meta';
		techTitle.textContent = 'Technologies';
		const techRow = document.createElement('div');
		techRow.className = 'project-tech-tags';
		project.technologies.forEach((tech) => {
			const tag = document.createElement('span');
			tag.className = 'tech-tag';
			tag.textContent = tech;
			techRow.appendChild(tag);
		});
		details.append(techTitle, techRow);
	}

	// Contributions
	const respTitle = document.createElement('p');
	respTitle.className = 'meta';
	respTitle.textContent = 'Contributions principales';
	details.append(respTitle, createList(project.responsibilities));

	// Résultats
	const outTitle = document.createElement('p');
	outTitle.className = 'meta';
	outTitle.textContent = 'Résultats';
	details.append(outTitle, createList(project.outcomes));

	// Captures
	if (Array.isArray(project.screenshotsPlaceholders) && project.screenshotsPlaceholders.length > 0) {
		const galleryTitle = document.createElement('p');
		galleryTitle.className = 'meta';
		galleryTitle.textContent = 'Captures (à ajouter)';
		details.append(galleryTitle, createProjectGallery(project.screenshotsPlaceholders));
	}

	// Liens
	const links = [];
	if (project.links?.github) {
		const a = document.createElement('a');
		a.href = project.links.github;
		a.textContent = 'Dépôt GitHub';
		links.push(a);
	}
	if (project.links?.demo) {
		const a = document.createElement('a');
		a.href = project.links.demo;
		a.textContent = 'Voir la démo';
		links.push(a);
	}
	if (links.length > 0) {
		const foot = document.createElement('footer');
		const linkGroup = document.createElement('p');
		links.forEach((link, i) => {
			if (i > 0) linkGroup.append(' • ');
			linkGroup.appendChild(link);
		});
		foot.appendChild(linkGroup);
		details.appendChild(foot);
	}

	// Toggle
	toggleButton.addEventListener('click', () => {
		const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
		toggleButton.setAttribute('aria-expanded', expanded ? 'false' : 'true');
		toggleButton.textContent = expanded ? 'Voir plus de détails' : 'Voir moins';
		details.hidden = expanded;
	});

	article.append(header, summary, toggleButton, details);
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
		projectsContainer.classList.add('projects-list');
		projects.forEach((project) => {
			projectsContainer.appendChild(createProjectCard(project));
		});
	} catch (error) {
		projectsContainer.textContent = 'Les projets ne peuvent pas etre charges pour le moment.';
		console.error('Erreur lors du chargement des projets :', error);
	}
}

document.addEventListener('DOMContentLoaded', loadProjects);
