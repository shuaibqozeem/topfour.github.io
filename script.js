// Build the navbar
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    const sectionId = section.id;
    const sectionName = section.getAttribute('data-nav');
    const listItem = document.createElement('li');
    
    listItem.innerHTML = `<a class="menu__link" href="#${sectionId}">${sectionName}</a>`;
    navbarList.appendChild(listItem);
});

// Scroll to anchor ID using smooth scroll
document.querySelectorAll('a.menu__link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Set sections as active
window.addEventListener('scroll', function () {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href').includes(current)) {
            anchor.classList.add('active');
        }
    });
});

// Typing effect
const typingTexts = document.querySelectorAll('.typing-text');

function typeEffect(element, text) {
    let index = 0;
    const speed = 100; // Speed of typing effect

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing'); // Remove cursor after typing is done
        }
    }

    element.classList.add('typing'); // Add 'typing' class to show the cursor
    type();
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.getAttribute('data-text');
            if (!element.classList.contains('typing')) {
                typeEffect(element, text);
            }
            observer.unobserve(element); // Stop observing after typing is done
        }
    });
}, { threshold: 0.1 });

typingTexts.forEach(element => {
    observer.observe(element);
});

// Scroll to Top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Collapsible Sections
document.addEventListener('DOMContentLoaded', () => {
    const collapsibleButtons = document.querySelectorAll('.collapsible');

    collapsibleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            
            if (content.style.display === "block") {
                content.style.display = "none";
                content.style.maxHeight = null;
                content.style.padding = "0";
            } else {
                content.style.display = "block";
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.padding = "20px";
            }
        });
    });
});




let timer; 

function showNavbar() {
    document.getElementById('navbar').style.opacity = '1';
}

function hideNavbar() {
    document.getElementById('navbar').style.opacity = '0';
}

function handleScroll() {
    
    clearTimeout(timer);
    
    showNavbar();

    timer = setTimeout(hideNavbar, 8000);
}

window.addEventListener('scroll', handleScroll);

handleScroll();
