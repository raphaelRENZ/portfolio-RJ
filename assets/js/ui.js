// Gestion des modales
document.addEventListener('DOMContentLoaded', () => {
	// Sélectionner tous les boutons qui ouvrent des modales
	const modalTriggers = document.querySelectorAll('[data-modal]');
	const modalCloses = document.querySelectorAll('[data-modal-close]');
	
	// Ouvrir une modale
	modalTriggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			const modalId = trigger.getAttribute('data-modal');
			const modal = document.getElementById(modalId);
			
			if (modal) {
				modal.classList.add('active');
				document.body.classList.add('modal-open');
				modal.setAttribute('aria-hidden', 'false');
			}
		});
	});
	
	// Fermer une modale
	const closeModal = (modal) => {
		modal.classList.remove('active');
		document.body.classList.remove('modal-open');
		modal.setAttribute('aria-hidden', 'true');
	};
	
	modalCloses.forEach(closeBtn => {
		closeBtn.addEventListener('click', () => {
			const modal = closeBtn.closest('.modal');
			if (modal) {
				closeModal(modal);
			}
		});
	});
	
	// Fermer avec la touche Escape
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			const activeModal = document.querySelector('.modal.active');
			if (activeModal) {
				closeModal(activeModal);
			}
		}
	});
});
