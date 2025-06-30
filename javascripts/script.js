
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class on hamburger for animation
            hamburger.classList.toggle('active');
            
            // Toggle active class on mobile menu
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced fade in animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced parallax effect for hero section
    const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.2;
        
        if (parallax && scrolled < window.innerHeight) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Enhanced button interactions with ripple effect
    const buttons = document.querySelectorAll('.hero-button, .cta-button, .footer-hero-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple-animation 0.8s linear;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('.section, .new-footer');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sectionObserver.observe(section);
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.expertise-card, .specialization-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.position = 'relative';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Intersection Observer for animations on expertise and specialization cards
    const expSpecObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const expSpecObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, expSpecObserverOptions);

    // Observe expertise and specialization cards for animation
    const expSpecAnimatedElements = document.querySelectorAll('.expertise-card, .specialization-card');
    
    expSpecAnimatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        expSpecObserver.observe(el);
    });

    // Interactive Services Section Functionality
    const serviceOptions = document.querySelectorAll('.service-option');
    const serviceImage = document.getElementById('serviceImage');
    const serviceTitle = document.getElementById('serviceTitle');
    const serviceDescription = document.getElementById('serviceDescription');
    const feature1 = document.getElementById('feature1');
    const feature2 = document.getElementById('feature2');
    const feature3 = document.getElementById('feature3');
    const feature4 = document.getElementById('feature4');

    const serviceData = {
        'mobile-crane': {
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
            title: 'Mobile Crane Services',
            description: 'Offering cutting-edge mobile crane services, we employ advanced techniques to handle heavy lifting operations, providing comprehensive data for informed decision-making.',
            features: [
                'Heavy lifting precision',
                'Informed project assessment',
                'Professional operation success',
                '100% Safety compliance'
            ]
        },
        'exploration': {
            image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
            title: 'Exploration Services',
            description: 'Advanced exploration techniques to identify promising construction sites, providing comprehensive geological data for informed decision-making.',
            features: [
                'Geological mapping precision',
                'Informed prospect assessment',
                'Site exploration success',
                '100% Technical compliance'
            ]
        },
        'excavation': {
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
            title: 'Excavation and Haulage',
            description: 'Professional excavation and haulage services with modern equipment and safety protocols for efficient project completion.',
            features: [
                'Precision excavation techniques',
                'Efficient material transport',
                'Safety protocol adherence',
                '100% Project completion'
            ]
        },
        'drilling': {
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=800&auto=format&fit=crop',
            title: 'Drilling and Blasting',
            description: 'Specialized drilling and controlled blasting operations conducted by certified professionals with strict safety measures.',
            features: [
                'Controlled blasting precision',
                'Professional drilling techniques',
                'Safety compliance standards',
                '100% Operational excellence'
            ]
        },
        'environmental': {
            image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop',
            title: 'Environmental Management',
            description: 'Comprehensive environmental management services ensuring sustainable construction practices and regulatory compliance.',
            features: [
                'Environmental impact assessment',
                'Sustainability protocols',
                'Regulatory compliance',
                '100% Environmental standards'
            ]
        },
        'responsible': {
            image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
            title: 'Responsible Construction',
            description: 'Committed to responsible construction practices with focus on community impact, safety, and environmental stewardship.',
            features: [
                'Community engagement',
                'Safety-first approach',
                'Environmental stewardship',
                '100% Responsible practices'
            ]
        }
    };

    serviceOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            // Remove active class from all options
            serviceOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to hovered option
            this.classList.add('active');
            
            // Get service data
            const service = this.getAttribute('data-service');
            const data = serviceData[service];
            
            if (data) {
                // Update content with smooth transition
                serviceImage.style.opacity = '0.5';
                setTimeout(() => {
                    serviceImage.src = data.image;
                    serviceTitle.textContent = data.title;
                    serviceDescription.textContent = data.description;
                    feature1.textContent = data.features[0];
                    feature2.textContent = data.features[1];
                    feature3.textContent = data.features[2];
                    feature4.textContent = data.features[3];
                    serviceImage.style.opacity = '1';
                }, 200);
            }
        });
    });
    document.getElementById("closeCookieBtn").addEventListener("click", function () {
  document.getElementById("cookieBanner").style.display = "none";
});

});