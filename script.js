// Smooth scrolling for navigation links
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
// Search Bar 
// Search Bar - Fixed Version
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const blogCards = document.querySelectorAll('.blog-card');

    // Check if search input exists
    if (!searchInput) {
        console.error('Search input with ID "searchInput" not found! Make sure your HTML has: <input id="searchInput" type="text" placeholder="Search blogs...">');
        return;
    }

    // Check if blog cards exist
    if (blogCards.length === 0) {
        console.warn('No elements with class "blog-card" found! Make sure your blog cards have the class "blog-card"');
        return;
    }

    console.log(`Found ${blogCards.length} blog cards to search through`);

    // Add search functionality
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();

        blogCards.forEach(card => {
            // Look for title in multiple possible selectors
            const titleElement = card.querySelector('h3') ||
                card.querySelector('h2') ||
                card.querySelector('.blog-title') ||
                card.querySelector('.card-title');

            // Also check content/description
            const contentElement = card.querySelector('p') ||
                card.querySelector('.blog-content') ||
                card.querySelector('.card-content');

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const content = contentElement ? contentElement.textContent.toLowerCase() : '';

            // Search in both title and content
            const matchesTitle = title.includes(query);
            const matchesContent = content.includes(query);
            const hasMatch = matchesTitle || matchesContent || query === '';

            // Show/hide the card with smooth transition
            if (hasMatch) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                // Hide after transition completes
                setTimeout(() => {
                    if (!card.style.opacity || card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Show "no results" message if no cards are visible
        showNoResultsMessage(query);
    });

    // Add CSS transitions for smooth animations
    blogCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// Function to show/hide "no results" message
function showNoResultsMessage(query) {
    let noResultsMsg = document.getElementById('noResultsMessage');

    // Create message if it doesn't exist
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'noResultsMessage';
        noResultsMsg.style.cssText = `
            text-align: center;
            padding: 2rem;
            color: #666;
            font-size: 1.1rem;
            display: none;
        `;

        // Insert after search input or at the beginning of blog container
        const searchInput = document.getElementById('searchInput');
        const blogContainer = document.querySelector('.blog-container') ||
            document.querySelector('.blogs-section') ||
            document.querySelector('.blog-grid') ||
            searchInput.parentNode;

        if (blogContainer) {
            blogContainer.appendChild(noResultsMsg);
        }
    }

    // Check if any blog cards are visible
    const visibleCards = document.querySelectorAll('.blog-card[style*="display: none"]').length;
    const totalCards = document.querySelectorAll('.blog-card').length;

    if (query && visibleCards === totalCards) {
        noResultsMsg.textContent = `No blogs found for "${query}"`;
        noResultsMsg.style.display = 'block';
    } else {
        noResultsMsg.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

// Also initialize on window load as backup
window.addEventListener('load', initializeSearch);

// Alternative initialization if the above doesn't work
// (for cases where the search input is added dynamically)
function tryInitializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && !searchInput.hasAttribute('data-search-initialized')) {
        searchInput.setAttribute('data-search-initialized', 'true');
        initializeSearch();
    } else if (!searchInput) {
        // Try again after a short delay
        setTimeout(tryInitializeSearch, 500);
    }
}

// Start trying to initialize
tryInitializeSearch();


// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typeWriter(typingElement, 'BlogCraft', 150);
    }
});

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .about-text, .about-image, .team-card, .blog-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '🌙 Dark';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️ Light';
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Modal functionality
function openModal(title, content) {
    const modal = document.getElementById('blogModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = title;
    modalContent.textContent = content;
    modal.style.display = 'block';

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('blogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('blogModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Navbar background on scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
        }
    }
}

// Event listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    updateScrollProgress();
    updateNavbar();
});

window.addEventListener('resize', revealOnScroll);

// Initial calls
revealOnScroll();
updateScrollProgress();

// Add stagger delay to animations
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const teamCards = document.querySelectorAll('.team-card');
    const blogCards = document.querySelectorAll('.blog-card');

    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    teamCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    blogCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth animations for service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(-10px)';
    });
});