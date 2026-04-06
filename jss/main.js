
console.log('HydroRush JavaScript loaded successfully');

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const progressBars = document.querySelectorAll(".skill-track span[data-progress]");
const statValues = document.querySelectorAll(".stat-card strong");
const aboutHighlightValues = document.querySelectorAll(".about-highlight-item strong, .about-highlight-card strong");
const galleryTrack = document.querySelector(".gallery-track");
const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const faqItems = document.querySelectorAll(".faq-item");
const heroVideo = document.querySelector("#heroVideo");
const videoToggle = document.querySelector("#videoToggle");
const muteToggle = document.querySelector("#muteToggle");
const themeToggle = document.querySelector("#themeToggle");
const dirToggle = document.querySelector("#dirToggle");
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialPrev = document.querySelector(".testimonial-prev");
const testimonialNext = document.querySelector(".testimonial-next");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const feedbacksTrack = document.querySelector(".feedbacks-track");
const feedbackCards = document.querySelectorAll(".feedback-card");
const feedbacksPrev = document.querySelector(".feedbacks-prev");
const feedbacksNext = document.querySelector(".feedbacks-next");
const feedbackDots = document.querySelectorAll(".feedbacks-dot");
const pricingTabs = document.querySelectorAll(".pricing-tab");
const pricingPanels = document.querySelectorAll(".pricing-panel");
const scrollTopBtn = document.querySelector("#scrollTopBtn");
const passwordToggle = document.querySelector("[data-password-toggle]");
const passwordField = document.querySelector("[data-password-field]");
const revealTargets = document.querySelectorAll(`
    .section-heading,
    .trust-item,
    .promo-card,
    .service-tile,
    .gallery-slide,
    .package-card,
    .faq-item,
    .wash-intro-media,
    .wash-intro-content,
    .about-story-heading,
    .about-story-media,
    .about-story-content,
    .about-highlight-item,
    .about-highlight-card,
    .popular-service-card,
    .why-copy,
    .why-card,
    .booking-step,
    .contact-booking-card,
    .location-card,
    .testimonial-slide,
    .login-card,
    .pricing-card,
    .pricing-offer,
    .experts-panel,
    .stat-card,
    .footer-brand,
    .footer-column,
    .footer-bottom
`);

let index = 0;
let galleryIndex = 0;
let testimonialIndex = 0;
let feedbackIndex = 0;

function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.body.classList.toggle("theme-dark", nextTheme === "dark");
    localStorage.setItem("hydrorush-theme", nextTheme);

    const icon = themeToggle?.querySelector("i");
    if (icon) {
        icon.className = nextTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
}

function applyDirection(direction) {
    const nextDirection = direction === "rtl" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", nextDirection);
    localStorage.setItem("hydrorush-direction", nextDirection);

    const label = dirToggle?.querySelector(".dir-label");
    if (label) {
        label.textContent = nextDirection.toUpperCase();
    }
}

function showSlide(i) {
    if (!slides.length) return;

    slides.forEach((slide) => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

applyTheme(localStorage.getItem("hydrorush-theme"));
applyDirection(localStorage.getItem("hydrorush-direction"));

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("theme-dark");
        applyTheme(isDark ? "light" : "dark");
    });
}

if (dirToggle) {
    dirToggle.addEventListener("click", () => {
        const currentDirection = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
        applyDirection(currentDirection === "rtl" ? "ltr" : "rtl");
    });
}

if (passwordToggle && passwordField) {
    passwordToggle.addEventListener("click", () => {
        const isPasswordHidden = passwordField.type === "password";
        passwordField.type = isPasswordHidden ? "text" : "password";
        passwordToggle.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");

        const passwordIcon = passwordToggle.querySelector("i");
        if (passwordIcon) {
            passwordIcon.className = isPasswordHidden ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        }
    });
}

const registerPasswordToggle = document.querySelector("#registerPasswordToggle");
const registerPasswordField = document.querySelector("#registerPassword");

if (registerPasswordToggle && registerPasswordField) {
    registerPasswordToggle.addEventListener("click", () => {
        const isPasswordHidden = registerPasswordField.type === "password";
        registerPasswordField.type = isPasswordHidden ? "text" : "password";
        registerPasswordToggle.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");

        const passwordIcon = registerPasswordToggle.querySelector("i");
        if (passwordIcon) {
            passwordIcon.className = isPasswordHidden ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        }
    });
}

if (slides.length && next && prev) {
    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });

    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 5000);
}

function getGalleryPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
}

function updateGallery() {
    if (!galleryTrack || !gallerySlides.length || !galleryPrev || !galleryNext) return;

    const perView = getGalleryPerView();
    const maxIndex = Math.max(0, gallerySlides.length - perView);
    galleryIndex = Math.min(galleryIndex, maxIndex);

    const slideWidth = gallerySlides[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(galleryTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    const offset = galleryIndex * (slideWidth + gap);

    galleryTrack.style.transform = `translateX(-${offset}px)`;
    galleryPrev.disabled = galleryIndex === 0;
    galleryNext.disabled = galleryIndex >= maxIndex;
}

if (galleryTrack && gallerySlides.length && galleryPrev && galleryNext) {
    galleryPrev.addEventListener("click", () => {
        galleryIndex -= 1;
        updateGallery();
    });

    galleryNext.addEventListener("click", () => {
        galleryIndex += 1;
        updateGallery();
    });

    window.addEventListener("resize", updateGallery);
    updateGallery();
}

function updateTestimonials() {
    if (!testimonialTrack || !testimonialSlides.length) return;

    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

    testimonialSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === testimonialIndex);
    });

    testimonialDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === testimonialIndex);
    });
}

function getFeedbacksPerView() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
}

function updateFeedbacks() {
    if (!feedbacksTrack || !feedbackCards.length || !feedbacksPrev || !feedbacksNext) return;

    const perView = getFeedbacksPerView();
    const maxIndex = Math.max(0, feedbackCards.length - perView);
    feedbackIndex = Math.min(feedbackIndex, maxIndex);

    const slideWidth = feedbackCards[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(feedbacksTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    const offset = feedbackIndex * (slideWidth + gap);

    feedbacksTrack.style.transform = `translateX(-${offset}px)`;
    feedbacksPrev.disabled = feedbackIndex === 0;
    feedbacksNext.disabled = feedbackIndex >= maxIndex;

    feedbackDots.forEach((dot, dotIndex) => {
        dot.hidden = dotIndex > maxIndex;
        dot.classList.toggle("active", dotIndex === feedbackIndex);
    });
}

if (testimonialTrack && testimonialSlides.length && testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener("click", () => {
        testimonialIndex = (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        updateTestimonials();
    });

    testimonialNext.addEventListener("click", () => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        updateTestimonials();
    });

    testimonialDots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            testimonialIndex = dotIndex;
            updateTestimonials();
        });
    });

    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        updateTestimonials();
    }, 6000);

    updateTestimonials();
}

if (feedbacksTrack && feedbackCards.length && feedbacksPrev && feedbacksNext) {
    feedbacksPrev.addEventListener("click", () => {
        feedbackIndex -= 1;
        updateFeedbacks();
    });

    feedbacksNext.addEventListener("click", () => {
        feedbackIndex += 1;
        updateFeedbacks();
    });

    feedbackDots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            feedbackIndex = dotIndex;
            updateFeedbacks();
        });
    });

    window.addEventListener("resize", updateFeedbacks);

    setInterval(() => {
        const perView = getFeedbacksPerView();
        const maxIndex = Math.max(0, feedbackCards.length - perView);
        feedbackIndex = feedbackIndex >= maxIndex ? 0 : feedbackIndex + 1;
        updateFeedbacks();
    }, 5000);

    updateFeedbacks();
}

if (pricingTabs.length && pricingPanels.length) {
    pricingTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.priceTab;

            pricingTabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle("active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            pricingPanels.forEach((panel) => {
                panel.classList.toggle("active", panel.dataset.pricePanel === target);
            });
        });
    });
}

function updateScrollTopVisibility() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle("is-visible", window.scrollY > 280);
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    updateScrollTopVisibility();
}

function updateVideoButtons() {
    if (!heroVideo) return;

    const videoIcon = videoToggle?.querySelector("i");
    const muteIcon = muteToggle?.querySelector("i");

    if (videoToggle && videoIcon) {
        videoToggle.setAttribute("aria-label", heroVideo.paused ? "Play video" : "Pause video");
        videoIcon.className = heroVideo.paused ? "fa-solid fa-play" : "fa-solid fa-pause";
    }

    if (muteToggle && muteIcon) {
        muteToggle.setAttribute("aria-label", heroVideo.muted ? "Unmute video" : "Mute video");
        muteIcon.className = heroVideo.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
    }
}

if (heroVideo && videoToggle && muteToggle) {
    videoToggle.addEventListener("click", () => {
        if (heroVideo.paused) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }

        updateVideoButtons();
    });

    muteToggle.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        updateVideoButtons();
    });

    heroVideo.addEventListener("play", updateVideoButtons);
    heroVideo.addEventListener("pause", updateVideoButtons);
    heroVideo.addEventListener("volumechange", updateVideoButtons);
    updateVideoButtons();
}

if (faqItems.length) {
    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        const icon = button?.querySelector("i");

        if (!button) return;

        button.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            faqItems.forEach((faqItem) => {
                const faqButton = faqItem.querySelector(".faq-question");
                const faqIcon = faqButton?.querySelector("i");

                faqItem.classList.remove("active");
                faqButton?.setAttribute("aria-expanded", "false");

                if (faqIcon) {
                    faqIcon.classList.remove("fa-minus");
                    faqIcon.classList.add("fa-plus");
                }
            });

            if (!isActive) {
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }
            }
        });
    });
}

revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.classList.add(`reveal-delay-${index % 4}`);
});

progressBars.forEach((bar) => {
    bar.style.width = "0%";
});

function animateCounter(element, target) {
    const duration = 1800;
    const startTime = performance.now();
    const originalText = element.dataset.originalText || element.textContent.trim();
    const prefixMatch = originalText.match(/^[^0-9]*/);
    const suffixMatch = originalText.match(/[^0-9]*$/);
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const suffix = suffixMatch ? suffixMatch[0] : "";

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);

        element.textContent = `${prefix}${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

const animatedSections = new WeakSet();
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || animatedSections.has(entry.target)) return;

            animatedSections.add(entry.target);

            if (entry.target.classList.contains("experts-section")) {
                progressBars.forEach((bar) => {
                    const target = Number(bar.dataset.progress || 0);
                    bar.style.width = `${target}%`;
                });
            }

            if (entry.target.classList.contains("stats-section")) {
                statValues.forEach((stat) => {
                    const target = Number(stat.textContent.replace(/[^0-9]/g, ""));

                    if (!Number.isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
            }

            if (entry.target.classList.contains("about-highlights-strip")) {
                aboutHighlightValues.forEach((stat) => {
                    stat.dataset.originalText = stat.textContent.trim();
                    const target = Number(stat.textContent.replace(/[^0-9]/g, ""));

                    if (!Number.isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
            }

            if (entry.target.classList.contains("reveal")) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    {
        threshold: 0.35,
    }
);

const expertsSection = document.querySelector(".experts-section");
const statsSection = document.querySelector(".stats-section");
const aboutHighlightsSection = document.querySelector(".about-highlights-strip");

if (expertsSection) {
    observer.observe(expertsSection);
}

if (statsSection) {
    observer.observe(statsSection);
}

if (aboutHighlightsSection) {
    observer.observe(aboutHighlightsSection);
}

revealTargets.forEach((element) => {
    observer.observe(element);
});

/* fallback in case intersection observer does not trigger for process steps */
document.querySelectorAll('.pw-step').forEach((step) => {
    step.classList.add('in');
});

/* fallback for all reveal elements */
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .gallery-item').forEach((element) => {
    element.classList.add('in');
});

const pressureTabs = document.querySelectorAll(".tab[data-type]");
const pressureCards = document.querySelectorAll(".service-card");
const serviceTabs = document.querySelectorAll(".tab[data-tab]");
const serviceCards = document.querySelectorAll(".svc-card");

if (pressureTabs.length && pressureCards.length) {
    pressureTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            pressureTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const type = tab.getAttribute("data-type");

            pressureCards.forEach(card => {
                const category = card.getAttribute("data-category");
                card.classList.toggle("hide", category !== type);
            });
        });
    });
}

if (serviceTabs.length && serviceCards.length) {
    serviceTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            serviceTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            serviceCards.forEach(card => {
                card.classList.toggle("hidden-card", target !== "all" && card.dataset.cat !== target);
            });
        });
    });
}

/* rain drops */
const dc = document.getElementById('dropsContainer');
for(let i=0;i<30;i++){
  const d=document.createElement('div');d.className='drop';
  d.style.cssText=`left:${Math.random()*100}%;width:${1+Math.random()*2}px;height:${10+Math.random()*14}px;opacity:${.2+Math.random()*.4};animation-duration:${1.6+Math.random()*2.4}s;animation-delay:${Math.random()*3}s`;
  dc.appendChild(d);
}

/* scroll reveal */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.10});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.pw-step,.svc-card,.gallery-item').forEach(el=>io.observe(el));

/* gallery filter functionality */
const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryFilterBtns.length && galleryItems.length) {
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const matches = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                item.style.display = matches ? 'block' : 'none';

                if (matches) {
                    item.classList.remove('in');
                    setTimeout(() => item.classList.add('in'), 50);
                }
            });
        });
    });
}

/* lightbox */
console.log('Setting up lightbox...');
const lb=document.getElementById('lightbox');
const lbImg=document.getElementById('lbImg');
const lbT=document.getElementById('lbTitle');
const lbD=document.getElementById('lbDesc');
console.log('Lightbox elements found:', lb, lbImg, lbT, lbD);
document.querySelectorAll('.g-tile').forEach(tile=>{
  console.log('Setting up tile:', tile.dataset.title);
  tile.addEventListener('click',()=>{
    console.log('Tile clicked:', tile.dataset.title);
    lbImg.src=tile.dataset.img; lbImg.alt=tile.dataset.title;
    lbT.textContent=tile.dataset.title; lbD.textContent=tile.dataset.desc;
    lb.classList.add('open'); document.body.style.overflow='hidden';
  });
});
const closeLb = () => {
  console.log('Closing lightbox');
  if (lb) {
    lb.classList.remove('open');
  }
  document.body.style.overflow = '';
};

const lbClose = document.getElementById('lbClose');
if (lbClose) {
  lbClose.addEventListener('click', closeLb);
}

if (lb) {
  lb.addEventListener('click', e => {
    if (e.target === lb) closeLb();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLb();
});