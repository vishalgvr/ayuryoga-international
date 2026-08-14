document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const ctas = document.querySelector('.header-ctas');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
                if(window.innerWidth <= 1024) ctas.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = 'white';
                navMenu.style.padding = '1rem 2rem';
                navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                
                if(window.innerWidth <= 1024) {
                    ctas.style.display = 'flex';
                    ctas.style.position = 'absolute';
                    ctas.style.top = '100%';
                    ctas.style.left = '0';
                    ctas.style.width = '100%';
                    ctas.style.backgroundColor = 'white';
                    ctas.style.padding = '0 2rem 1rem';
                    ctas.style.marginTop = navMenu.offsetHeight + 'px';
                }
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isOpen = answer.style.display === 'block';
                
                // Close all others
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.display = 'none';
                });
                
                if (!isOpen) {
                    answer.style.display = 'block';
                }
            });
        }
    });

    // Luxury Scroll Animations
    const animatedElements = document.querySelectorAll('h1, h2, h3, .service-card, .trust-item, .treatment-card, .menu-item, .physio-card, .package-card, .location-card, .gallery-item, .hero p, .section-header p');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-up');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Dynamic Booking Form Logic
    const categorySelect = document.getElementById('categorySelect');
    const treatmentSelect = document.getElementById('treatmentSelect');

    if (categorySelect && treatmentSelect) {
        const treatments = {
            ayurveda: ['Abhyangam', 'Sirodhara', 'Padabhyangam', 'Kizhi Therapies', 'Vasthi', 'Nasyam', 'Other'],
            wellness: ['Ayurvedic Massage', 'Swedish Massage', 'Deep Tissue', 'Aroma Massage', 'Stone Massage', 'Reflexology', 'Other'],
            beauty: ['Herbal Body Scrub', 'Navara Facial', 'Panchagavya Facial', 'Deep Cleansing Facial', 'Anti-Aging Facial', 'Other']
        };

        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            treatmentSelect.innerHTML = '<option value="" disabled selected>Select a Treatment</option>';
            
            if (treatments[selectedCategory]) {
                treatments[selectedCategory].forEach(function(treatment) {
                    const option = document.createElement('option');
                    option.value = treatment;
                    option.textContent = treatment;
                    treatmentSelect.appendChild(option);
                });
                treatmentSelect.disabled = false;
            } else {
                treatmentSelect.disabled = true;
            }
        });
    }
});
