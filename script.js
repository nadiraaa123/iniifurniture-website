document.addEventListener("DOMContentLoaded", () => {
    // Loading Screen
    const loadingScreen = document.querySelector(".loading-screen");
    setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 500);
    }, 1500);

    // Navbar Elements
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    
    // Navbar Scroll Effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Update active nav link
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
            
            if (navMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.style.overflow = "auto";
            });
        });

        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    }

    // Intersection Observer for Reveal Animation
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // Testimonial Slider
    const slides = document.querySelectorAll(".testi-item");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            dots[i].classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if(dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                clearInterval(slideInterval);
                showSlide(i);
                slideInterval = setInterval(nextSlide, 8000);
            });
        });

        slideInterval = setInterval(nextSlide, 8000);
        showSlide(0);
    }

    // Process Video Controls
    const mainProcessVideo = document.getElementById("mainProcessVideo");
    const playBtn = document.getElementById("playBtn");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const rewindBtn = document.getElementById("rewindBtn");
    const forwardBtn = document.getElementById("forwardBtn");
    const volumeSlider = document.getElementById("volumeSlider");
    const videoWrapper = document.querySelector(".video-wrapper");
    
    if (mainProcessVideo) {
        playBtn.addEventListener("click", () => {
            mainProcessVideo.play();
            videoWrapper.classList.add("playing");
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
        });
        
        playPauseBtn.addEventListener("click", () => {
            if (mainProcessVideo.paused) {
                mainProcessVideo.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
                videoWrapper.classList.add("playing");
            } else {
                mainProcessVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
            }
        });
        
        rewindBtn.addEventListener("click", () => {
            mainProcessVideo.currentTime = Math.max(0, mainProcessVideo.currentTime - 10);
        });
        
        forwardBtn.addEventListener("click", () => {
            mainProcessVideo.currentTime = Math.min(mainProcessVideo.duration, mainProcessVideo.currentTime + 10);
        });
        
        volumeSlider.addEventListener("input", () => {
            mainProcessVideo.volume = volumeSlider.value / 100;
        });
        
        mainProcessVideo.addEventListener("ended", () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
            videoWrapper.classList.remove("playing");
        });
        
        mainProcessVideo.addEventListener("pause", () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
        });
        
        mainProcessVideo.addEventListener("play", () => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
            videoWrapper.classList.add("playing");
        });
        
        mainProcessVideo.addEventListener("click", () => {
            if (mainProcessVideo.paused) {
                videoWrapper.classList.remove("playing");
            } else {
                videoWrapper.classList.add("playing");
            }
        });
    }

    // Testimonial Video Controls
    const testimonialVideo = document.getElementById("testimonialVideo");
    const testimonialPlayBtn = document.getElementById("testimonialPlayBtn");
    const testimonialPauseBtn = document.querySelector(".testimonial-pause-btn");
    const testimonialProgress = document.getElementById("testimonialProgress");
    const testimonialVolume = document.getElementById("testimonialVolume");
    const testimonialVideoWrapper = document.querySelector(".testimonial-video-wrapper");
    
    if (testimonialVideo) {
        testimonialPlayBtn.addEventListener("click", () => {
            testimonialVideo.play();
            testimonialVideoWrapper.classList.add("playing");
        });
        
        testimonialPauseBtn.addEventListener("click", () => {
            if (testimonialVideo.paused) {
                testimonialVideo.play();
                testimonialPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
                testimonialVideoWrapper.classList.add("playing");
            } else {
                testimonialVideo.pause();
                testimonialPauseBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
            }
        });
        
        testimonialVideo.addEventListener("timeupdate", () => {
            const percent = (testimonialVideo.currentTime / testimonialVideo.duration) * 100;
            testimonialProgress.value = percent || 0;
        });
        
        testimonialProgress.addEventListener("input", () => {
            const time = testimonialVideo.duration * (testimonialProgress.value / 100);
            testimonialVideo.currentTime = time;
        });
        
        testimonialVolume.addEventListener("input", () => {
            testimonialVideo.volume = testimonialVolume.value / 100;
        });
        
        testimonialVideo.addEventListener("ended", () => {
            testimonialPauseBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
            testimonialVideoWrapper.classList.remove("playing");
        });
        
        testimonialVideo.addEventListener("pause", () => {
            testimonialPauseBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
        });
        
        testimonialVideo.addEventListener("play", () => {
            testimonialPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
            testimonialVideoWrapper.classList.add("playing");
        });
        
        testimonialVideo.addEventListener("click", () => {
            if (testimonialVideo.paused) {
                testimonialVideoWrapper.classList.remove("playing");
            } else {
                testimonialVideoWrapper.classList.add("playing");
            }
        });
    }

    // Process Steps Interaction
    const processSteps = document.querySelectorAll(".process-step");
    
    processSteps.forEach((step, index) => {
        step.addEventListener("click", () => {
            processSteps.forEach(s => s.classList.remove("active"));
            step.classList.add("active");
        });
    });

    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll(".stat-number");
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
            }
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute("data-count"));
                    animateCounter(stat, target, 2000);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        const heroStats = document.querySelector(".hero-stats");
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Newsletter Form
    const newsletterForm = document.getElementById("newsletterForm");
    
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector("input");
            const email = emailInput.value;
            
            if (!validateEmail(email)) {
                alert("Silakan masukkan alamat email yang valid.");
                return;
            }
            
            emailInput.disabled = true;
            const submitBtn = newsletterForm.querySelector("button");
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                newsletterForm.innerHTML = `
                    <div class="newsletter-success">
                        <i class="fas fa-check-circle"></i>
                        <p>Terima kasih! Anda telah berlangganan newsletter kami.</p>
                    </div>
                `;
            }, 1500);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                if (navMenu && navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    if (hamburger) {
                        hamburger.classList.remove("active");
                        document.body.style.overflow = "auto";
                    }
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                if (hamburger) {
                    hamburger.classList.remove("active");
                    document.body.style.overflow = "auto";
                }
            }
        }, 250);
    });
});