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
        const icon = item.querySelector('.faq-icon');
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isOpen = answer && answer.style.display === 'block';
                
                // Close all others
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    if (otherIcon) otherIcon.textContent = '+';
                    otherItem.classList.remove('active');
                });
                
                if (!isOpen && answer) {
                    answer.style.display = 'block';
                    if (icon) icon.textContent = '−';
                    item.classList.add('active');
                }
            });
        }
    });

    // Luxury Scroll Animations
    const animatedElements = document.querySelectorAll('h1, h2, h3, .service-card, .therapy-card, .review-card, .faq-item, .google-badge-card, .trust-item, .treatment-card, .menu-item, .physio-card, .package-card, .location-card, .gallery-item, .hero p, .section-header p');
    
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

    // Services Category Filtering
    const filterButtons = document.querySelectorAll('.services-filter-wrapper .filter-btn');
    const serviceCards = document.querySelectorAll('.services-grid .service-card');

    if (filterButtons.length > 0 && serviceCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                serviceCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    if (filter === 'all' || categories.split(' ').includes(filter)) {
                        card.style.display = 'flex';
                        card.classList.add('animate');
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'none';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            if (!btn.classList.contains('active') || (filter !== 'all' && !categories.split(' ').includes(filter))) {
                                card.style.display = 'none';
                            }
                        }, 250);
                    }
                });
            });
        });
    }

    // Dynamic Booking Form Logic
    const categorySelect = document.getElementById('categorySelect');
    const treatmentSelect = document.getElementById('treatmentSelect');
    const treatmentChipsWrapper = document.getElementById('treatmentChipsWrapper');
    const treatmentChips = document.getElementById('treatmentChips');
    const bookingForm = document.getElementById('bookingForm');
    const whatsappBookBtn = document.getElementById('whatsappBookBtn');

    if (categorySelect && treatmentSelect) {
        const treatments = {
            ayurveda: [
                'Abhyangam (Ayurvedic Full Body Massage)',
                'Sirodhara (Warm Medicated Oil Stream)',
                'Kizhi Therapies (Herbal Bolus Pouch)',
                'Vasthi (Kati / Greeva / Janu Vasthi)',
                'Nasyam (Nasal Therapy)',
                'Padabhyangam (Ayurvedic Foot Massage)',
                'Ksheeradhara (Medicated Milk Flow)',
                'Udvarthanam (Herbal Powder Scrub)',
                'Ayurvedic Doctor Consultation'
            ],
            wellness: [
                'Ayur Relax (Massage + Steam)',
                'Abhyangam Wellness Massage',
                'Swedish Massage',
                'Deep Tissue Massage',
                'Aroma Massage',
                'Stone Massage',
                'Reflexology Massage',
                'Herbal Steam Bath',
                'Sanjeevani Therapy',
                'Aishwarya Treatment'
            ],
            beauty: [
                'Herbal Body Scrub',
                'Navara Facial (Ayurvedic Facial)',
                'Panchagavya Facial',
                'Deep Cleansing Herbal Facial',
                'Anti-Aging Herbal Facial',
                'Natural Hair & Scalp Treatment',
                'Fruit & Herbal Face Pack'
            ],
            facecare: [
                'Njavara Facial (60 min · Rs 1,500.00)',
                'Panchagavya Facial (60 min · Rs 1,500.00)',
                'Red Sandal Facial (60 min · Rs 1,500.00)',
                'Deep Cleansing Facial (60 min · Rs 1,500.00)',
                'Anti-Aging Facial (60 min · Rs 1,500.00)',
                'Brightening Facial (60 min · Rs 1,500.00)',
                'Manjishta Facial (60 min · Rs 1,800.00)',
                'Eladi Facial (60 min · Rs 1,800.00)',
                'Nalpamaradi Facial (60 min · Rs 1,800.00)',
                'Threading (10 min · Rs 90.00)'
            ],
            bodycare: [
                'Herbal Body Scrub (60 min · Rs 1,980.00)'
            ],
            haircare: [
                'Herbal Hair Pack (30 min · Rs 1,200.00)',
                'Keshavardhini - Hair Strengthening (60 min · Rs 1,800.00)'
            ],
            handfoot: [
                'Pedicure & Manicure (90 min · Rs 1,800.00)',
                'Pedicure (60 min · Rs 1,440.00)',
                'Manicure (30 min · Rs 600.00)',
                'Royal Pedicure (60 min · Rs 1,800.00)',
                'Paraffin Foot Spa (90 min · Rs 2,160.00)'
            ],
            packages: [
                'Ayur Relax (60 min · Rs 1,800.00)',
                'Jeevani (90 min · Rs 2,700.00)',
                'Manasanthi (60 min · Rs 1,800.00)',
                'Rujahari (60 min · Rs 1,800.00)',
                'Punarjeeva (120 min · Rs 3,600.00)',
                'Padamrutha (45 min · Rs 1,000.00)',
                'Svaastha (120 min · Rs 3,600.00)',
                'Ayur Express (60 min · Rs 1,800.00)',
                'Aromatic Journey (120 min · Rs 3,600.00)'
            ]
        };

        function updateTreatments(selectedCategory, preselectedTreatment = null) {
            treatmentSelect.innerHTML = '<option value="" disabled selected>Select a Treatment</option>';
            if (treatmentChips) treatmentChips.innerHTML = '';
            
            if (treatments[selectedCategory]) {
                treatments[selectedCategory].forEach(function(treatment) {
                    // Populate Select Dropdown
                    const option = document.createElement('option');
                    option.value = treatment;
                    option.textContent = treatment;
                    if (preselectedTreatment && (treatment.toLowerCase().includes(preselectedTreatment.toLowerCase()) || preselectedTreatment.toLowerCase().includes(treatment.toLowerCase()))) {
                        option.selected = true;
                    }
                    treatmentSelect.appendChild(option);

                    // Populate Clickable Treatment Chips
                    if (treatmentChips) {
                        const chip = document.createElement('span');
                        chip.className = 'treatment-chip';
                        chip.textContent = treatment;
                        if (option.selected) {
                            chip.classList.add('active');
                        }
                        chip.addEventListener('click', () => {
                            treatmentSelect.value = treatment;
                            document.querySelectorAll('.treatment-chip').forEach(c => c.classList.remove('active'));
                            chip.classList.add('active');
                        });
                        treatmentChips.appendChild(chip);
                    }
                });

                treatmentSelect.disabled = false;
                if (treatmentChipsWrapper) treatmentChipsWrapper.style.display = 'block';
            } else {
                treatmentSelect.disabled = true;
                if (treatmentChipsWrapper) treatmentChipsWrapper.style.display = 'none';
            }
        }

        categorySelect.addEventListener('change', function() {
            updateTreatments(this.value);
        });

        treatmentSelect.addEventListener('change', function() {
            const val = this.value;
            if (treatmentChips) {
                document.querySelectorAll('.treatment-chip').forEach(c => {
                    if (c.textContent === val) {
                        c.classList.add('active');
                    } else {
                        c.classList.remove('active');
                    }
                });
            }
        });

        // URL Parameters Pre-fill (e.g. ?category=packages&treatment=Ayur%20Relax)
        const urlParams = new URLSearchParams(window.location.search);
        const urlCategory = urlParams.get('category');
        const urlTreatment = urlParams.get('treatment') || urlParams.get('package');

        if (urlCategory && treatments[urlCategory.toLowerCase()]) {
            categorySelect.value = urlCategory.toLowerCase();
            updateTreatments(urlCategory.toLowerCase(), urlTreatment);
        } else if (urlTreatment) {
            // Find which category has this treatment
            for (const [cat, list] of Object.entries(treatments)) {
                if (list.some(t => t.toLowerCase().includes(urlTreatment.toLowerCase()))) {
                    categorySelect.value = cat;
                    updateTreatments(cat, urlTreatment);
                    break;
                }
            }
        }
    }

    // Booking Form Submit Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName')?.value || '';
            const location = document.getElementById('locationSelect')?.value || '';
            const treatment = document.getElementById('treatmentSelect')?.value || '';
            const date = document.getElementById('dateInput')?.value || '';
            const time = document.getElementById('timeInput')?.value || '';

            alert(`Thank you, ${fullName}! Your appointment request for "${treatment}" at our ${location} branch on ${date} at ${time} has been received. Our team will contact you shortly to confirm.`);
            bookingForm.reset();
            if (treatmentSelect) treatmentSelect.disabled = true;
            if (treatmentChipsWrapper) treatmentChipsWrapper.style.display = 'none';
        });
    }

    // WhatsApp Instant Booking Button Handler
    if (whatsappBookBtn) {
        whatsappBookBtn.addEventListener('click', () => {
            const name = document.getElementById('fullName')?.value || '';
            const gender = document.getElementById('genderSelect')?.value || '';
            const phone = document.getElementById('phoneInput')?.value || '';
            const location = document.getElementById('locationSelect')?.value || '';
            const category = document.getElementById('categorySelect')?.value || '';
            const treatment = document.getElementById('treatmentSelect')?.value || '';
            const date = document.getElementById('dateInput')?.value || '';
            const time = document.getElementById('timeInput')?.value || '';
            const notes = document.getElementById('notesInput')?.value || '';

            let msg = `Hello Ayuryoga International,%0A%0AI would like to book an appointment:%0A`;
            if (name) msg += `*Name:* ${encodeURIComponent(name)}%0A`;
            if (gender) msg += `*Gender:* ${encodeURIComponent(gender)}%0A`;
            if (phone) msg += `*Phone:* ${encodeURIComponent(phone)}%0A`;
            if (location) msg += `*Location:* ${encodeURIComponent(location)}%0A`;
            if (category) msg += `*Category:* ${encodeURIComponent(category)}%0A`;
            if (treatment) msg += `*Treatment:* ${encodeURIComponent(treatment)}%0A`;
            if (date) msg += `*Preferred Date:* ${encodeURIComponent(date)}%0A`;
            if (time) msg += `*Preferred Time:* ${encodeURIComponent(time)}%0A`;
            if (notes) msg += `*Notes:* ${encodeURIComponent(notes)}%0A`;

            window.open(`https://wa.me/23058074009?text=${msg}`, '_blank');
        });
    }
});
