document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Background Particle Grid System ---
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(65, Math.floor(width / 20));

    class DataNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = "#38bdf8";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initNetwork() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new DataNode());
        }
    }

    function animateNetwork() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 130) {
                    ctx.strokeStyle = `rgba(71, 85, 105, ${1 - distance / 130})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    initNetwork();
    animateNetwork();

    // --- 2. Fully Accessible Smartphone Hamburger Navigation Logic ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        hamburger.classList.toggle("open");
        navMenu.classList.toggle("open");
    }

    hamburger.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    });

    // --- 3. Dynamic Smooth Scroll Interceptor / Viewport Active Link Sync ---
    const sections = document.querySelectorAll("section");
    
    const scrollOptions = {
        root: null,
        threshold: 0.25,
        rootMargin: "-20px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set Link Highlight matching visible section ID
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${entry.target.id}`) {
                        link.classList.add("active");
                    }
                });
                // Trigger smooth on-scroll transition entry styling
                entry.target.classList.add("visible");
            }
        });
    }, scrollOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 4. Robust Textimonial Endorsement Carousel Engine ---
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("carousel-dots");
    let currentSlideIndex = 0;
    let slideInterval;

    // Dynamically compile active configuration pagination nodes
    slides.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.classList.add("dot-node");
        if (idx === 0) dot.classList.add("active");
        dot.addEventListener("click", () => renderSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot-node");

    function renderSlide(targetIndex) {
        slides[currentSlideIndex].classList.remove("active");
        dots[currentSlideIndex].classList.remove("active");
        
        currentSlideIndex = (targetIndex + slides.length) % slides.length;
        
        slides[currentSlideIndex].classList.add("active");
        dots[currentSlideIndex].classList.add("active");
        resetCarouselTimer();
    }

    function nextSlide() {
        renderSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        renderSlide(currentSlideIndex - 1);
    }

    function resetCarouselTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000); // Transitions automatically every 7 seconds
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    resetCarouselTimer();
});