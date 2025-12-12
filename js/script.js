// Search Functionality
const searchIcon = document.querySelector('.search-icon');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Search data (products, fragrances, etc.)
const searchData = [
    { title: 'GTG Perfumes', description: 'Premium fragrance collection', url: 'shop.html', category: 'Product' },
    { title: 'Original Fragrance', description: 'Our signature scent', url: 'shop.html#fragrances', category: 'Fragrance' },
    { title: 'Lily Fragrance', description: 'Fresh and floral', url: 'shop.html#fragrances', category: 'Fragrance' },
    { title: 'Rose Fragrance', description: 'Elegant and romantic', url: 'shop.html#fragrances', category: 'Fragrance' },
    { title: 'Single Subscription', description: 'Monthly fragrance delivery', url: 'shop.html#subscriptions', category: 'Subscription' },
    { title: 'Double Subscription', description: 'Two fragrances monthly', url: 'shop.html#subscriptions', category: 'Subscription' },
    { title: 'Gift Sets', description: 'Perfect gift collections', url: 'shop.html#gifts', category: 'Gift' },
    { title: 'About Us', description: 'Learn about GTG Perfumes', url: 'about.html', category: 'Page' },
    { title: 'Blog', description: 'Fragrance tips and news', url: 'blog.html', category: 'Page' },
    { title: 'Contact', description: 'Get in touch with us', url: 'contact.html', category: 'Page' }
];

function openSearch() {
    if (searchModal) {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    }
}

function closeSearch() {
    if (searchModal) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        if (searchInput) {
            searchInput.value = '';
        }
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }
}

function performSearch(query) {
    if (!searchResults || !query.trim()) {
        if (searchResults) searchResults.innerHTML = '';
        return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><p>No results found</p></div>';
        return;
    }

    searchResults.innerHTML = results.map(item => `
        <div class="search-result-item" onclick="window.location.href='${item.url}'">
            <h4>${item.title}</h4>
            <p>${item.description} - ${item.category}</p>
        </div>
    `).join('');
}

// Search event listeners
if (searchIcon) {
    searchIcon.addEventListener('click', openSearch);
}

if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
}

if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            closeSearch();
        }
    });
}

// Hamburger Menu Toggle - Initialize on DOM ready
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    const navClose = document.getElementById('navClose');

    if (!hamburger || !mainNav) {
        console.warn('Hamburger menu elements not found');
        return;
    }

    // Create overlay element if it doesn't exist
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    function openMenu() {
        hamburger.classList.add('active');
        mainNav.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    // Use onclick for better compatibility
    hamburger.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked', mainNav.classList.contains('active'));
        if (mainNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
        return false;
    };
    
    // Also add event listener as backup
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked (listener)', mainNav.classList.contains('active'));
        if (mainNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }, { passive: false });

    // Close menu when clicking on close button
    if (navClose) {
        navClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', (e) => {
            if (e.target === navOverlay) {
                closeMenu();
            }
        });
    }

    // Close menu when clicking on a link (but not dropdown toggles)
    const navLinks = document.querySelectorAll('.nav-list > li > a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's a dropdown toggle
            if (link.classList.contains('dropdown-toggle')) {
                e.stopPropagation();
                return; // Let dropdown handler take over
            }
            closeMenu();
        });
    });

    // Close menu when clicking on dropdown menu items (not the toggle itself)
    const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when window is resized to desktop size
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
}

// Improved Dropdown Menu Functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

// Function to handle dropdown toggle
function setupDropdownToggle(toggle, menu, isMobile) {
    if (!toggle || !menu) return;
    
    // Remove existing event listeners by using a flag
    if (toggle.dataset.listenerAdded === 'true') return;
    toggle.dataset.listenerAdded = 'true';
    
    // Use capture phase to ensure this runs first
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Prevent other handlers from firing
        
        console.log('Dropdown toggle clicked');
        
        if (isMobile) {
            // Mobile: toggle using class
            const isActive = menu.classList.contains('active');
            const parent = toggle.closest('.nav-item-dropdown');
            
            // Close all other dropdowns
            dropdownMenus.forEach(m => {
                if (m !== menu) {
                    m.classList.remove('active');
                    m.style.display = 'none';
                    const otherParent = m.closest('.nav-item-dropdown');
                    if (otherParent) {
                        otherParent.classList.remove('active');
                    }
                }
            });
            
            // Toggle current dropdown
            if (isActive) {
                menu.classList.remove('active');
                menu.style.display = 'none';
                if (parent) {
                    parent.classList.remove('active');
                }
            } else {
                menu.classList.add('active');
                menu.style.display = 'block';
                if (parent) {
                    parent.classList.add('active');
                }
            }
            
            // Don't close the main menu when toggling dropdown
            return false;
        } else {
            // Desktop: toggle opacity/visibility
            const isActive = menu.style.opacity === '1' && menu.style.visibility === 'visible';
            
            // Close all dropdowns
            dropdownMenus.forEach(m => {
                if (m !== menu) {
                    m.style.opacity = '0';
                    m.style.visibility = 'hidden';
                }
            });
            
            // Toggle current dropdown
            if (!isActive) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            } else {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            }
        }
    });
}

// Setup dropdowns based on screen size
function setupDropdowns() {
    const isMobile = window.innerWidth <= 768;
    
    // Reset listener flags
    dropdownToggles.forEach(toggle => {
        toggle.dataset.listenerAdded = 'false';
    });
    
    dropdownToggles.forEach((toggle, index) => {
        const menu = dropdownMenus[index];
        if (menu) {
            // Initialize mobile dropdowns as hidden
            if (isMobile) {
                menu.style.display = 'none';
                menu.classList.remove('active');
            } else {
                menu.style.display = '';
            }
            setupDropdownToggle(toggle, menu, isMobile);
        }
    });
}

// Initial setup
setupDropdowns();

// Re-setup on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        setupDropdowns();
    }, 250);
});

// Close dropdowns when clicking outside (desktop only)
if (window.innerWidth > 768) {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown')) {
            dropdownMenus.forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            });
        }
    });
}

// Gallery Functionality
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const dots = document.querySelectorAll('.dot');
const arrowLeft = document.querySelector('.gallery-arrow-left');
const arrowRight = document.querySelector('.gallery-arrow-right');

// Gallery images array
const galleryImages = [
    'assets/images/gtg-perfumes/product_slider_main.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail-2.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail_3.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail_4.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail_5.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail_6.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail_7.png',
    'assets/images/gtg-perfumes/thumbnails/thumbnail_8.png'
];

let currentImageIndex = 0;

// Function to update gallery
function updateGallery(index) {
    currentImageIndex = index;
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = galleryImages[index];
        mainImage.style.opacity = '1';
    }, 150);

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', parseInt(thumb.dataset.index) === index);
    });
}

// Thumbnail click
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const index = parseInt(thumbnail.dataset.index);
        updateGallery(index);
    });
});

// Dot click
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        updateGallery(index);
    });
});

// Arrow navigation
arrowLeft.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery(currentImageIndex);
});

arrowRight.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGallery(currentImageIndex);
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        arrowLeft.click();
    } else if (e.key === 'ArrowRight') {
        arrowRight.click();
    }
});

// Subscription Radio Buttons
const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
const singleDetails = document.getElementById('singleDetails');
const doubleDetails = document.getElementById('doubleDetails');

subscriptionRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'single') {
            singleDetails.classList.add('active');
            doubleDetails.classList.remove('active');
        } else {
            singleDetails.classList.remove('active');
            doubleDetails.classList.add('active');
        }
        updateAddToCartLink();
    });
});

// Dynamic Add to Cart Link
const addToCartBtn = document.getElementById('addToCartBtn');

function updateAddToCartLink() {
    const subscriptionType = document.querySelector('input[name="subscription"]:checked').value;
    let fragrance = '';
    
    if (subscriptionType === 'single') {
        fragrance = document.querySelector('input[name="fragrance"]:checked')?.value || 'original';
        const cartUrl = `https://example.com/cart?subscription=single&fragrance=${fragrance}`;
        addToCartBtn.href = cartUrl;
    } else {
        const fragrance1 = document.querySelector('input[name="fragrance1"]:checked')?.value || 'original';
        const fragrance2 = document.querySelector('input[name="fragrance2"]:checked')?.value || 'original';
        const cartUrl = `https://example.com/cart?subscription=double&fragrance1=${fragrance1}&fragrance2=${fragrance2}`;
        addToCartBtn.href = cartUrl;
    }
}

// Listen to fragrance changes
const fragranceRadios = document.querySelectorAll('.fragrance-radio');
fragranceRadios.forEach(radio => {
    radio.addEventListener('change', updateAddToCartLink);
});

// Initialize cart link
updateAddToCartLink();

// Count-up Animation for Statistics
function animateCount(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Intersection Observer for count-up animation
const statsSection = document.querySelector('.stats-section');
let hasAnimated = false;

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            const statPercentages = document.querySelectorAll('.stat-percentage');
            
            statPercentages.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCount(stat, target);
            });
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        const icon = header.querySelector('.accordion-icon');
        
        // Close all accordion items with smooth animation
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove('active');
                const itemIcon = item.querySelector('.accordion-icon');
                if (itemIcon) itemIcon.textContent = '+';
            }
        });
        
        // Toggle clicked item
        if (isActive) {
            accordionItem.classList.remove('active');
            if (icon) icon.textContent = '+';
        } else {
            accordionItem.classList.add('active');
            if (icon) icon.textContent = '−';
        }
    });
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message (you can customize this)
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}


// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize - moved to initHamburgerMenu function

// Comparison Table Column Selection
function initComparisonTable() {
    const selectableCols = document.querySelectorAll('.selectable-col');
    const comparisonTable = document.querySelector('.comparison-table');
    
    if (!comparisonTable || selectableCols.length === 0) return;
    
    function setActiveColumn(colIndex) {
        // Remove active-col class from all cells
        comparisonTable.querySelectorAll('th.active-col, td.active-col').forEach(cell => {
            cell.classList.remove('active-col');
        });
        
        // Add active-col class to all cells in the selected column
        comparisonTable.querySelectorAll(`th[data-col-index="${colIndex}"], td[data-col-index="${colIndex}"]`).forEach(cell => {
            cell.classList.add('active-col');
        });
    }
    
    // Initialize with first column (GTG) as active
    setActiveColumn('1');
    
    // Add click handlers to column headers
    selectableCols.forEach(header => {
        header.addEventListener('click', () => {
            const colIndex = header.getAttribute('data-col-index');
            setActiveColumn(colIndex);
        });
    });
}

// Initialize hamburger menu immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    // DOM is already ready
    initHamburgerMenu();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('GTG Perfumes website loaded successfully');
    
    // Initialize hamburger menu (backup initialization)
    initHamburgerMenu();
    
    // Simple scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Animate header on load
    const header = document.querySelector('.header.fade-in-up');
    if (header) {
        setTimeout(() => {
            header.classList.add('animate');
        }, 100);
    }
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero .fade-in-up, .hero .fade-in-left');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, 200 + (index * 100));
    });
    
    // Animate other sections on scroll
    animateOnScroll();
    
    // Set initial state
    if (typeof updateAddToCartLink === 'function') {
        updateAddToCartLink();
    }
    
    // Initialize comparison table
    if (typeof initComparisonTable === 'function') {
        initComparisonTable();
    }
    
    // Add loaded class to images that are already cached
    lazyImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Make all buttons with href functional
    document.querySelectorAll('.btn-primary, .btn-add-cart').forEach(btn => {
        if (btn.tagName === 'BUTTON' && btn.getAttribute('data-href')) {
            btn.addEventListener('click', () => {
                window.location.href = btn.getAttribute('data-href');
            });
        }
    });
});


