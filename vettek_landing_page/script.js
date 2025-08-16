// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Reusable animation function
    function animateText(element) {
        gsap.set(element, { 
            autoAlpha: 0,
            y: 20
        });

        gsap.to(element, {
            duration: 3,
            autoAlpha: 1,
            y: 0,
            ease: "power2.out"
        });
    }

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateText(entry.target);
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Animate hero title immediately (since it's at the top)
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) animateText(heroTitle);

    // Observe recruiters title for scroll animation
    const recruitersTitle = document.getElementById('recruiters-title');
    if (recruitersTitle) {
        gsap.set(recruitersTitle, { autoAlpha: 0, y: 20 }); // Set initial state
        observer.observe(recruitersTitle);
    }

    // Solutions grid toggling
    const solutionsSection = document.querySelector('.solutions');
    if (solutionsSection) {
        const buttonsWrapper = solutionsSection.querySelector('.solutions-content > div');
        const businessBtn = buttonsWrapper?.querySelectorAll('.btn')[0];
        const candidatesBtn = buttonsWrapper?.querySelectorAll('.btn')[1];
        const businessGrid = solutionsSection.querySelector('.solutions-grid.businesses');
        const candidatesGrid = solutionsSection.querySelector('.solutions-grid.candidates');

        function showBusiness() {
            if (businessGrid && candidatesGrid) {
                businessGrid.classList.remove('is-hidden');
                candidatesGrid.classList.add('is-hidden');
            }
        }
        function showCandidates() {
            if (businessGrid && candidatesGrid) {
                candidatesGrid.classList.remove('is-hidden');
                businessGrid.classList.add('is-hidden');
            }
        }

        // Default state: show businesses, hide candidates
        if (businessGrid && candidatesGrid) {
            businessGrid.classList.remove('is-hidden');
            candidatesGrid.classList.add('is-hidden');
        }

        businessBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            showBusiness();
        });
        candidatesBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            showCandidates();
        });
    }

    // Interview buttons toggling
    const interviewSection = document.querySelector('.interview-section');
    if (interviewSection) {
        const btns = interviewSection.querySelectorAll('.interview-btn .btn');
        const screeningContent = interviewSection.querySelector('.interview-content.screening');
        const interviewContent = interviewSection.querySelector('.interview-content.interview');
        const predictionContent = interviewSection.querySelector('.interview-content.prediction');

        function showScreening() {
            screeningContent?.classList.remove('is-hidden');
            interviewContent?.classList.add('is-hidden');
            predictionContent?.classList.add('is-hidden');
        }
        function showInterview() {
            interviewContent?.classList.remove('is-hidden');
            screeningContent?.classList.add('is-hidden');
            predictionContent?.classList.add('is-hidden');
        }
        function showPrediction() {
            predictionContent?.classList.remove('is-hidden');
            screeningContent?.classList.add('is-hidden');
            interviewContent?.classList.add('is-hidden');
        }

        // Default: show screening only
        showScreening();

        // Bind clicks based on button order
        btns[0]?.addEventListener('click', (e) => { e.preventDefault(); showScreening(); });
        btns[1]?.addEventListener('click', (e) => { e.preventDefault(); showInterview(); });
        btns[2]?.addEventListener('click', (e) => { e.preventDefault(); showPrediction(); });
    }

    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const hamburgerIcon = document.querySelector('.hamburger .hamburger-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    function openMenu() {
        mobileMenu?.classList.add('open');
        document.body.classList.add('body-no-scroll');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
        if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
        if (hamburger) hamburger.setAttribute('aria-label', 'Close menu');
        if (hamburgerIcon) {
            hamburgerIcon.setAttribute('src', 'Assets/Images/close.svg');
            hamburgerIcon.setAttribute('alt', 'close');
        }
    }
    function closeMenu() {
        mobileMenu?.classList.remove('open');
        document.body.classList.remove('body-no-scroll');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
        if (hamburger) hamburger.setAttribute('aria-label', 'Open menu');
        if (hamburgerIcon) {
            hamburgerIcon.setAttribute('src', 'Assets/Images/menu.svg');
            hamburgerIcon.setAttribute('alt', 'menu');
        }
    }
    hamburger?.addEventListener('click', () => {
        if (mobileMenu?.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    mobileMenu?.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof Element && target.matches('a')) {
            closeMenu();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}); 