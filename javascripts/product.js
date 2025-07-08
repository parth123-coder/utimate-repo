// 

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
        
        // Debug
        console.log('Mobile menu toggled. Active:', mobileMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach((link, index) => {
        // Add animation delay based on index
        link.style.animationDelay = `${0.1 * (index + 1)}s`;
        
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.info-card, .l1');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effects for feature list items
const featureItems = document.querySelectorAll('.l1');
featureItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        item.style.transitionDelay = '0s';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Popup Form Functionality
const inquiryBtn = document.getElementById('inquiryBtn');
const downloadBtn = document.getElementById('downloadBtn');
const formPopup = document.getElementById('formPopup');
const closeFormBtn = document.getElementById('closeFormBtn');
const contactForm = document.getElementById('contactForm');

// Open popup when inquiry button is clicked
inquiryBtn.addEventListener('click', () => {
    formPopup.style.display = 'flex';
    // Allow scrolling on the popup content instead of preventing body scroll
    
    // Set form purpose as inquiry
    const formTitle = document.querySelector('.popup-title');
    formTitle.textContent = 'Product Inquiry';
    
    // Add animation
    formPopup.classList.add('active');
});

// Open popup when download button is clicked
downloadBtn.addEventListener('click', () => {
    formPopup.style.display = 'flex';
    // Allow scrolling on the popup content instead of preventing body scroll
    
    // Set form purpose as download
    const formTitle = document.querySelector('.popup-title');
    formTitle.textContent = 'Download Product Details';
    
    // Add animation
    formPopup.classList.add('active');
});

// Close popup when close button is clicked
closeFormBtn.addEventListener('click', () => {
    closePopup();
});

// Close popup when clicking outside the form
formPopup.addEventListener('click', (e) => {
    if (e.target === formPopup) {
        closePopup();
    }
});

// Close popup when Escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formPopup.style.display === 'flex') {
        closePopup();
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, phone, message });
    
    // Show success message
    const formContent = document.querySelector('.popup-content');
    formContent.innerHTML = `
        <h2 class="popup-title" style="color: #effe8b;">Thank You!</h2>
        <p style="color: #ffffff; text-align: center; margin-bottom: 20px;">Your message has been submitted successfully.</p>
        <button class="submit-btn" id="closeSuccessBtn">Close</button>
    `;
    
    // Add event listener to close button
    document.getElementById('closeSuccessBtn').addEventListener('click', closePopup);
});

// Function to close the popup
function closePopup() {
    formPopup.style.display = 'none';
    // No need to re-enable body scroll since we're not disabling it
    
    // Reset form after a delay
    setTimeout(() => {
        if (contactForm) {
            contactForm.reset();
        }
    }, 300);
}
