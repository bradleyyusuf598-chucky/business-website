// script.js

let cartCount = 0;

// Smooth scrolling navigation
const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Mobile menu toggle
const mobileMenuToggle = () => {
    const menuButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuButton.classList.remove('active');
        });
    });
};

// Product interactions
const productInteractions = () => {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.classList.add('hovered');
        });
        product.addEventListener('mouseleave', () => {
            product.classList.remove('hovered');
        });
        product.addEventListener('click', () => {
            const productName = product.dataset.name;
            alert(`${productName} added to cart! Visit our store at Trans Hotel, Mosque Road, Nakuru for more details.`);
        });
    });
};

// Add to cart functionality
const addToCart = (productName) => {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    
    // Show confirmation
    const cartInfo = document.querySelector('.cart-info');
    cartInfo.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        cartInfo.style.animation = '';
    }, 500);
};

// Contact form validation and submission
const contactFormSetup = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');

        // Validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all required fields!';
            formMessage.className = 'error';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address!';
            formMessage.className = 'error';
            return;
        }

        // Phone validation (optional, but if provided, check format)
        if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
            formMessage.textContent = 'Please enter a valid phone number!';
            formMessage.className = 'error';
            return;
        }

        // Simulate form submission
        const mailtoLink = `mailto:JAYBMerchants@gmail.com?subject=New Contact from ${name}&body=Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
        
        formMessage.textContent = `Thank you, ${name}! Your message has been sent. We'll contact you at ${email} soon!`;
        formMessage.className = 'success';

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.className = '';
            formMessage.textContent = '';
        }, 5000);

        // Optional: Open mailto in case user wants to send email directly
        console.log('Message would be sent to: ' + mailtoLink);
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    mobileMenuToggle();
    productInteractions();
    contactFormSetup();

    // Add smooth scroll behavior for all internal links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                smoothScroll(href, 1000);
            }
        });
    });
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);
