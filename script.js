// script.js

// Smooth scrolling navigation
const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
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

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuButton.classList.toggle('active');
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
            alert(`You clicked on ${product.dataset.name}`);
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    mobileMenuToggle();
    productInteractions();
});
