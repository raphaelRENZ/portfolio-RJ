document.addEventListener('DOMContentLoaded', () => {
	const yearTarget = document.getElementById('current-year');
	if (yearTarget) {
		yearTarget.textContent = String(new Date().getFullYear());
	}

	const samePageLinks = document.querySelectorAll('a[href^="#"]');
	samePageLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			const targetId = link.getAttribute('href');
			if (!targetId || targetId === '#') {
				return;
			}

			const target = document.querySelector(targetId);
			if (!target) {
				return;
			}

			event.preventDefault();
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});
});
