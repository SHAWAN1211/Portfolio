const carouselTrack = document.querySelector('.carousel-track');
const carouselCards = Array.from(document.querySelectorAll('.carousel-card'));
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const dots = Array.from(document.querySelectorAll('.dot'));
const revealElements = Array.from(document.querySelectorAll('.reveal'));

let currentSlide = 0;
let carouselTimer = null;

function updateCarousel(nextSlide) {
	currentSlide = (nextSlide + carouselCards.length) % carouselCards.length;
	carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

	dots.forEach((dot, index) => {
		dot.classList.toggle('active', index === currentSlide);
	});
}

function restartAutoPlay() {
	clearInterval(carouselTimer);
	carouselTimer = setInterval(() => updateCarousel(currentSlide + 1), 5000);
}

prevButton?.addEventListener('click', () => {
	updateCarousel(currentSlide - 1);
	restartAutoPlay();
});

nextButton?.addEventListener('click', () => {
	updateCarousel(currentSlide + 1);
	restartAutoPlay();
});

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		updateCarousel(index);
		restartAutoPlay();
	});
});

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));

if (carouselCards.length > 0) {
	updateCarousel(0);
	restartAutoPlay();
}
